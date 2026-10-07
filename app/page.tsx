import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Home } from "@/components/home";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Home />
      </main>
      <Footer />
    </>
  );
}
