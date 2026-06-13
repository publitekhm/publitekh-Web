import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import { Solutions } from "@/components/sections/solutions";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="marketing-page">
      <Navbar />
      <Hero />
      <Solutions />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
