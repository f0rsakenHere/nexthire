<<<<<<< HEAD
=======
import { FooterSection } from "@/components/home/FooterSection";
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
import TeamCard from "./team-card";

export default function TeamSection() {
  const teamMembers = [
<<<<<<< HEAD
    { name: "Mehedi Hasan Tushar", role: "Senior FullStack Developer" },
    { name: "Saad Ferozee", role: "MERN Stack Developer" },
    { name: "Moksina Akter", role: "Frontend Developer" },
    { name: "Nusrat Islam Bonna", role: "MERN Stack Developer" },
    { name: "Tonmoy  Biswas", role: "MERN Stack Developer" },
    { name: "Samia Islam Safa", role: "MERN Stack Developer" },
  ];

  return (
    <section className="text-center px-6 py-6 bg-gradient-to-b from-black via-neutral-900 to-black">
      {/* Heading */}
      <h2 className="text-4xl md:text-4xl font-bold mb-14 bg-white bg-clip-text text-transparent tracking-wide">
        Our Team
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl  mx-auto">
        {teamMembers.map((member, i) => (
          <div key={i}>
            <TeamCard member={member} />
          </div>
        ))}
      </div>
=======
    { name: "Mehedi Hasan Tushar", role: "Backend Developer" },
    { name: "Saad Ferozee", role: "Next JS Developer" },
    { name: "Moksina Akter", role: "Frontend Developer" },
    { name: "Nusrat Islam Bonna", role: "Frontend Developer" },
    { name: "Tonmoy  Biswas", role: "UI Designer" },
    { name: "Samia Islam Safa", role: "Backend Developer" },
  ];

  return (
    <section className="text-center px-6">
      <h2 className="text-3xl font-semibold mb-10">Our Team</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mb-10 mx-auto">
        {teamMembers.map((member, i) => (
          <TeamCard key={i} member={member} />
        ))}
      </div>
      <FooterSection></FooterSection>
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    </section>
  );
}
