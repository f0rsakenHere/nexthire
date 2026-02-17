const stats = [
  { label: "Users", value: "100+" },
  { label: "Resumes Analyzed", value: "2K+" },
  { label: "Mock Interviews", value: "5K+" },
];

export default function Stats() {
  return (
    <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
      {stats.map((s, i) => (
        <div key={i} className="border rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold">{s.value}</h3>
          <p className="text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
