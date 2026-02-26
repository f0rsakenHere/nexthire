const stats = [
  { label: "Users", value: "100+" },
  { label: "Resumes Analyzed", value: "2K+" },
  { label: "Mock Interviews", value: "5K+" },
];

export default function Stats() {
  return (
<<<<<<< HEAD
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 -mt-20 relative z-20">
      {stats.map((s, i) => (
        <div
          key={i}
          className="border border-white/10 bg-black/50 backdrop-blur-xl rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:border-cyan-500/30 group"
        >
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-2 group-hover:from-cyan-200 group-hover:to-cyan-400 transition-all">
            {s.value}
          </h3>
          <p className="text-blue-200/60 uppercase tracking-widest text-sm font-medium">
            {s.label}
          </p>
=======
    <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
      {stats.map((s, i) => (
        <div key={i} className="border rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold">{s.value}</h3>
          <p className="text-muted-foreground">{s.label}</p>
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
        </div>
      ))}
    </section>
  );
}
