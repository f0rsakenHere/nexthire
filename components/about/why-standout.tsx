export default function WhyStandOut() {
  return (
    <section className="py-4">
      <h2 className="text-4xl text-center p-6 font-bold">Why We Stand Out</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* left text */}{" "}
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Unlike traditional practice platforms, our AI understands your
            strengths, weaknesses, and career goals to provide a fully
            personalized interview preparation experience.
          </p>

          <ul className="space-y-3 text-sm">
            <li>✔ Smart AI question generation</li>
            <li>✔ Resume-based evaluation</li>
            <li>✔ Performance tracking dashboard</li>
            <li>✔ Real-time improvement tips</li>
          </ul>
        </div>
        {/* right card */}
        <div className="p-8 rounded-3xl border hover:border-cyan-400 hover:bg-card bg-gradient-to-br from-primary/10 to-transparent shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>

          <p className="text-muted-foreground">
            We aim to empower every learner with confidence and real-world
            interview skills through advanced AI technology and intuitive
            design.
          </p>
        </div>
      </div>
    </section>
  );
}
