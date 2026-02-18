import { FooterSection } from "@/components/home/FooterSection";
import TeamCard from "./team-card";

export default function TeamSection() {
  const teamMembers = [
    { name: "Mehedi Hasan Tushar", role: "Backend Developer" },
    { name: "Saad Ferozee", role: "Next JS Developer" },
    { name: "Moksina Akter", role: "Frontend Developer" },
    { name: "Nusrat Islam Bonna", role: "Frontend Developer" },
    { name: "Tonmoy  Biswas", role: "UI Designer" },
    { name: "Samia Islam Safa", role: "Backend Developer" },
  ];

  return (
    <section className="text-center px-6">
      <h2 className="text-4xl font-semibold mb-10">Our Team</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mb-10 mx-auto">
        {teamMembers.map((member, i) => (
          <TeamCard key={i} member={member} />
        ))}
      </div>
      <FooterSection></FooterSection>
    </section>
  );
}
