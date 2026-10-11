import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatRoom } from "@/components/chat-room";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Чат",
  description: `Анонимный чат ${siteName} в браузере — общая очередь с VK и Telegram.`,
  alternates: {
    canonical: "/chat/",
  },
  openGraph: {
    url: "/chat/",
    title: `Чат — ${siteName}`,
  },
};

export default function ChatPage() {
  return (
    <>
      <Header />
      <main id="main" className="chat-main">
        <ChatRoom />
      </main>
      <Footer />
    </>
  );
}
