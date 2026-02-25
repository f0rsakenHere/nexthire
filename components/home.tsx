import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CtaSection } from "@/components/home/CtaSection";

import { Testimonials } from "./home/Testimonials";
import { FAQSection } from "./home/FAQSection";
import { TrustedBySection } from "./home/TrustedBySection";
import { FeatureShowreel } from "./home/FeatureShowreel";

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <HeroSection />

      <StatsSection />

      <FeaturesSection />
      <HowItWorksSection />
      <FeatureShowreel />
      <Testimonials />
      <FAQSection />
      <TrustedBySection />
      <CtaSection />
    </div>
  );
}
