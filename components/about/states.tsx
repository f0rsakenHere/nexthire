const stats = [
  { label: "Users", value: "100+" },
  { label: "Resumes Analyzed", value: "2K+" },
  { label: "Mock Interviews", value: "5K+" },
];

export default function Stats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 -mt-20 relative z-20">
      {stats.map((s, i) => (
        <div
          key={i}
          className="border border-border bg-card/80 backdrop-blur-xl rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.62_0.26_278/0.15)] hover:border-primary/30 group"
        >
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent mb-2 group-hover:from-primary group-hover:to-violet-400 transition-all">
            {s.value}
          </h3>
          <p className="text-muted-foreground uppercase tracking-widest text-sm font-medium">
            {s.label}
          </p>
        </div>
      ))}
    </section>
  );
}
