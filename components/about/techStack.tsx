import { Badge } from "@/components/ui/badge";

const stack = ["Next.js", "TypeScript", "Tailwind", "OpenAI API", "Shadcn UI"];

export default function TechStack() {
  return (
    <section className="text-center max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-6">Tech Stack</h2>

      <div className="flex flex-wrap gap-3  justify-center">
        {stack.map((t, i) => (
          <Badge key={i}>{t}</Badge>
        ))}
      </div>
    </section>
  );
}
