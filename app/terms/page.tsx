import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Markdown } from "@/components/markdown";
import { siteName } from "@/lib/site";

const terms = readFileSync(path.join(process.cwd(), "content/terms.md"), "utf8");

export const metadata: Metadata = {
  title: "Условия использования",
  description: `Лицензионное соглашение на использование программы сервиса ${siteName}.`,
  alternates: {
    canonical: "/terms/",
  },
  openGraph: {
    url: "/terms/",
    title: `Условия использования — ${siteName}`,
    description: `Лицензионное соглашение на использование программы сервиса ${siteName}.`,
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main" className="doc-main">
        <article className="doc wrap">
          <Markdown source={terms} />
        </article>
      </main>
      <Footer />
    </>
  );
}
