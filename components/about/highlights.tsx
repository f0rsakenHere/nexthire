const features = [
  {
    title: "AI-Powered Interviews",
    desc: "Practice with real interview simulations powered by smart AI analysis.",
  },
  {
    title: "Instant Feedback",
    desc: "Get detailed performance insights immediately after each session.",
  },
  {
    title: "Personalized Learning",
    desc: "Questions adapt based on your resume, skills and goals.",
  },
  {
    title: "Real-World Experience",
    desc: "Simulates real recruiter behavior and interview pressure.",
  },
];

export default function Highlights() {
  return (
    <section className="py-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold">Platform Highlights</h2>
        <p className="text-muted-foreground mt-3">
          Everything you need to prepare smarter, faster, and better.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <div
            key={i}
            className="p-6 border rounded-2xl bg-card hover:shadow-xl hover:-translate-y-1 transition"
          >
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
