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
<<<<<<< HEAD
    <section className="text-center px-6 py-6 bg-gradient-to-b from-black via-neutral-900 to-black">
      {/* Heading */}
      <h2 className="text-4xl md:text-4xl font-bold mb-14 bg-white bg-clip-text text-transparent tracking-wide">
        Our Team
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl  mx-auto">
=======
    <section className="text-center px-6 py-16 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4 text-foreground tracking-wide relative z-10">
        Our Team
      </h2>
      <p className="text-muted-foreground text-lg mb-14 relative z-10">
        The people building NextHire
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
        {teamMembers.map((member, i) => (
          <div key={i}>
            <TeamCard member={member} />
          </div>
        ))}
      </div>
    </section>
  );
}
