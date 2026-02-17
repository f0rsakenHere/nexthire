import { Card, CardContent } from "@/components/ui/card";

const features = [
  "AI Resume Analyzer",
  "ATS Score Checker",
  "Mock Interview Bot",
  "Instant Feedback",
];

export default function Features() {
  return (
    <section>
      {/* <h2 className="text-3xl pb-8 text-center font-bold">Features</h2> */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-6">
        {features.map((f, i) => (
          <Card key={i}>
            <CardContent className="p-6 text-center font-medium">
              {f}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
