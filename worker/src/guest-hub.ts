import { DurableObject } from "cloudflare:workers";

import { ChatApi } from "./chat-api";

export const GUEST_ID_HEADER = "X-Guest-Id";

const PING_INTERVAL_MS = 25_000;
const IDLE_CLOSE_MS = 60_000;
const MAX_RETRY_MS = 30_000;

type UpstreamEvent = {
  to?: { bot_key?: string; user_id?: number | string };
  [key: string]: unknown;
};

/**
 * Один экземпляр на всех гостей: держит upstream /events/web к Chat API
 * и раздаёт события браузерным сокетам по guest_id.
 */
export class GuestHub extends DurableObject<Env> {
  private readonly guests = new Map<number, Set<WebSocket>>();
  private upstream: WebSocket | null = null;
  private connecting: Promise<void> | null = null;
  private retry = 0;
  private retryTimer: number | null = null;
  private idleTimer: number | null = null;
  private pingTimer: number | null = null;

  async fetch(request: Request): Promise<Response> {
    const guestId = Number(request.headers.get(GUEST_ID_HEADER));
    if (!Number.isSafeInteger(guestId) || guestId <= 0) {
      return new Response("Не указан гость", { status: 400 });
    }

    const [client, server] = Object.values(new WebSocketPair());
    server.accept();
    this.addGuest(guestId, server);
    server.addEventListener("close", () => this.removeGuest(guestId, server));
    server.addEventListener("error", () => this.removeGuest(guestId, server));

    this.ensureUpstream();
    return new Response(null, { status: 101, webSocket: client });
  }

  private addGuest(guestId: number, socket: WebSocket): void {
    let sockets = this.guests.get(guestId);
    if (!sockets) {
      sockets = new Set();
      this.guests.set(guestId, sockets);
    }
    sockets.add(socket);
    clearTimeout(this.idleTimer);
    this.idleTimer = null;
    this.pingTimer ??= setInterval(() => this.ping(), PING_INTERVAL_MS);
  }

  private removeGuest(guestId: number, socket: WebSocket): void {
    const sockets = this.guests.get(guestId);
    if (!sockets) return;
    sockets.delete(socket);
    if (sockets.size === 0) this.guests.delete(guestId);
    if (this.guests.size > 0) return;

    // Держим upstream ещё минуту: перезагрузка страницы не должна терять события.
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => this.shutdown(), IDLE_CLOSE_MS);
  }

  private ensureUpstream(): void {
    if (this.upstream || this.connecting) return;
    this.connecting = this.connectUpstream().finally(() => {
      this.connecting = null;
    });
  }

  private async connectUpstream(): Promise<void> {
    try {
      const socket = await new ChatApi(this.env).openEvents();
      socket.accept();
      this.upstream = socket;
      this.retry = 0;
      socket.addEventListener("message", (event) => {
        if (typeof event.data === "string") this.dispatch(event.data);
      });
      socket.addEventListener("close", (event) => this.onUpstreamLost(socket, `close ${event.code}`));
      socket.addEventListener("error", () => this.onUpstreamLost(socket, "error"));
      console.log(JSON.stringify({ message: "upstream connected" }));
    } catch (error) {
      console.error(JSON.stringify({ message: "upstream connect failed", error: String(error) }));
      this.scheduleReconnect();
    }
  }

  private onUpstreamLost(socket: WebSocket, reason: string): void {
    if (this.upstream !== socket) return;
    this.upstream = null;
    console.warn(JSON.stringify({ message: "upstream lost", reason }));
    this.scheduleReconnect();
  }

  private scheduleReconnect(): void {
    if (this.retryTimer || this.guests.size === 0) return;
    const delay = Math.min(1000 * 2 ** this.retry, MAX_RETRY_MS);
    this.retry += 1;
    this.retryTimer = setTimeout(() => {
      this.retryTimer = null;
      if (this.guests.size > 0) this.ensureUpstream();
    }, delay);
  }

  private dispatch(raw: string): void {
    let guestId: number;
    let payload: string;
    try {
      const { to, ...event } = JSON.parse(raw) as UpstreamEvent;
      if (to?.bot_key !== this.env.WEB_BOT_KEY) return;
      guestId = Number(to.user_id);
      payload = JSON.stringify(event);
    } catch {
      console.warn(JSON.stringify({ message: "bad upstream event", raw: raw.slice(0, 200) }));
      return;
    }
    for (const socket of this.guests.get(guestId) ?? []) {
      try {
        socket.send(payload);
      } catch {
        this.removeGuest(guestId, socket);
      }
    }
  }

  /** Без трафика соединения через прокси рвутся по простою. */
  private ping(): void {
    try {
      this.upstream?.send("ping");
    } catch {
      /* close/error обработчик переподключит */
    }
    const ping = JSON.stringify({ type: "ping" });
    for (const [guestId, sockets] of this.guests) {
      for (const socket of sockets) {
        try {
          socket.send(ping);
        } catch {
          this.removeGuest(guestId, socket);
        }
      }
    }
  }

  private shutdown(): void {
    this.idleTimer = null;
    if (this.guests.size > 0) return;
    clearInterval(this.pingTimer);
    this.pingTimer = null;
    clearTimeout(this.retryTimer);
    this.retryTimer = null;
    const socket = this.upstream;
    this.upstream = null;
    socket?.close(1000, "no guests");
  }
}
