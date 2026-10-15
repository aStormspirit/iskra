import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Markdown } from "@/components/markdown";
import { siteName } from "@/lib/site";

const policy = readFileSync(path.join(process.cwd(), "content/policy.md"), "utf8");

export const metadata: Metadata = {
  title: "Правовая информация",
  description: `Политика обработки персональных данных сервиса ${siteName}.`,
  alternates: {
    canonical: "/policy/",
  },
  openGraph: {
    url: "/policy/",
    title: `Правовая информация — ${siteName}`,
    description: `Политика обработки персональных данных сервиса ${siteName}.`,
  },
};

export default function PolicyPage() {
  return (
    <>
      <Header />
      <main id="main" className="doc-main">
        <article className="doc wrap">
          <Markdown source={policy} />
        </article>
      </main>
      <Footer />
    </>
  );
}
