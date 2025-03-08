import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav"
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CTASection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MarketplaceSection } from "@/components/sections/marketplace-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav/>
      <main className="flex-1">
        <HeroSection/>
        <AboutSection/>
        <PricingSection/>
        <MarketplaceSection/>
        <TestimonialsSection/>
        <ContactSection/>
        <CTASection/>
        </main>
        <Footer/>
    </div>
   
  );
}
