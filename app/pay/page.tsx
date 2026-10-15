import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Оплата",
  description: `Заглушка страницы оплаты ${siteName}.`,
  alternates: {
    canonical: "/pay/",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PayPage() {
  return (
    <>
      <Header />
      <main id="main" className="doc-main">
        <section className="wrap pay-stub">
          <h1>Оплата</h1>
          <p>Страница pay.chatwithyou пока заглушка. Оплата ещё не подключена.</p>
          <Link className="btn btn-lime" href="/">
            На главную
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
