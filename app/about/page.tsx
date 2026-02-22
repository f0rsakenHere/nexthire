import Hero from "@/components/about/hero";
import Stats from "@/components/about/states";
import MissionStory from "@/components/about/mission-story";
import TechStack from "@/components/about/techStack";
import TeamSection from "@/components/about/team/team-section";
import { CtaSection } from "@/components/home/CtaSection";

export default function AboutUs() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <Stats />
      <MissionStory />

      <TechStack />
      <TeamSection />
      <CtaSection />
    </main>
  );
}
