import { MainNav } from "@/components/main-nav"
import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav/>
      <main className="flex-1">
        <HeroSection/>

        </main>
    </div>
   
  );
}
