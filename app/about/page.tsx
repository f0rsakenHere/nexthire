import Hero from "@/components/about/hero";
import Stats from "@/components/about/states";
import Platform from "@/components/about/platform";
import Story from "@/components/about/story";
import Features from "@/components/about/features";
import TechStack from "@/components/about/techStack";
import TeamSection from "@/components/about/team/team-section";
import Highlights from "@/components/about/highlights";
import WhyStandOut from "@/components/about/why-standout";
import CallToAction from "@/components/call-to-action";

export default function AboutUs() {
  return (
    <main className="space-y-24">
      <Hero />
      <Stats />
      <Platform />
      <Highlights />
      <Story />
      <Features />
      <WhyStandOut />
      <TechStack />
      <TeamSection />
      <CallToAction />
    </main>
  );
}
