/** Гостевые JWT (HS256). APP token в браузер не попадает, гость знает только свой id. */

const AUDIENCE = "chat-guest";
const TOKEN_DAYS = 30;
const MAX_GUEST_ID = 2 ** 48 - 1;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function encodeJson(value: unknown): string {
  return toBase64Url(encoder.encode(JSON.stringify(value)));
}

function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export function newGuestId(): number {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const value = bytes.reduce((acc, byte) => acc * 256 + byte, 0);
  return Math.min(Math.max(value, 1), MAX_GUEST_ID);
}

export async function issueGuestToken(guestId: number, secret: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeJson({ alg: "HS256", typ: "JWT" });
  const payload = encodeJson({
    sub: String(guestId),
    aud: AUDIENCE,
    iat: now,
    exp: now + TOKEN_DAYS * 24 * 60 * 60,
  });
  const signingInput = `${header}.${payload}`;
  const signature = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(secret),
    encoder.encode(signingInput),
  );
  return `${signingInput}.${toBase64Url(new Uint8Array(signature))}`;
}

/** id гостя или null, если токен подделан, просрочен или выпущен не для чата. */
export async function verifyGuestToken(token: string, secret: string): Promise<number | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;
  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      fromBase64Url(signature),
      encoder.encode(`${header}.${payload}`),
    );
    if (!valid) return null;
    const { alg } = JSON.parse(decoder.decode(fromBase64Url(header))) as { alg?: string };
    if (alg !== "HS256") return null;
    const claims = JSON.parse(decoder.decode(fromBase64Url(payload))) as {
      sub?: string;
      aud?: string;
      exp?: number;
    };
    if (claims.aud !== AUDIENCE) return null;
    if (typeof claims.exp !== "number" || claims.exp * 1000 <= Date.now()) return null;
    const guestId = Number(claims.sub);
    if (!Number.isSafeInteger(guestId) || guestId <= 0 || guestId > MAX_GUEST_ID) return null;
    return guestId;
  } catch {
    return null;
  }
}
