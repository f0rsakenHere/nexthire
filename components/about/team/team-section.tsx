import TeamCard from "./team-card";

export default function TeamSection() {
  const teamMembers = [
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
    </section>
  );
}
