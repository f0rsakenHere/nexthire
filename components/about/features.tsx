<<<<<<< HEAD
"use client";

import { motion } from "framer-motion";
import { Brain, FileText, Bot, Zap, BarChart, ShieldCheck } from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
const features = [
  {
    title: "AI Resume Analyzer",
    icon: <Brain className="w-7 h-7 text-cyan-400" />,
    category: "AI Tool",
    description: "Smart AI analyzes your resume and suggests improvements.",
  },
  {
    title: "ATS Score Checker",
    icon: <FileText className="w-7 h-7 text-cyan-400" />,
    category: "Optimization",
    description: "Check how well your resume matches ATS systems.",
  },
  {
    title: "Mock Interview Bot",
    icon: <Bot className="w-7 h-7 text-cyan-400" />,
    category: "Practice",
    description: "Practice interviews with realistic AI simulation.",
  },
  {
    title: "Instant Feedback",
    icon: <Zap className="w-7 h-7 text-cyan-400" />,
    category: "Insights",
    description: "Receive performance feedback immediately.",
  },
  {
    title: "Performance Analytics",
    icon: <BarChart className="w-7 h-7 text-cyan-400" />,
    category: "Tracking",
    description: "Track your progress with detailed analytics.",
  },
  {
    title: "Secure Data",
    icon: <ShieldCheck className="w-7 h-7 text-cyan-400" />,
    category: "Security",
    description: "Your data is encrypted and fully protected.",
  },
=======
import { Card, CardContent } from "@/components/ui/card";

const features = [
  "AI Resume Analyzer",
  "ATS Score Checker",
  "Mock Interview Bot",
  "Instant Feedback",
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
];

export default function Features() {
  return (
<<<<<<< HEAD
    <section className="py-4 px-4 relative bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Features
          </motion.h2>

          <p className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light">
            Powerful tools to boost your job preparation journey
          </p>
        </div>

        {/* grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                x: [0, i % 2 === 0 ? 6 : -6, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
              className="h-[300px] rounded-[2rem] overflow-hidden border border-white/5 relative group bg-white/[0.02] backdrop-blur-sm"
            >
              <DottedGlowBackground
                className="h-full w-full mask-radial-to-90% mask-radial-at-center"
                gap={15}
                radius={1.5}
                opacity={0.15}
                glowColorDarkVar="--color-cyan-500"
                colorDarkVar="--color-cyan-900"
              >
                <div className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-cyan-500/30 transition" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="relative mb-6">
                    <div className="absolute w-20 h-20 bg-cyan-500/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition" />
                    <div className="relative p-4 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition">
                      {feature.icon}
                    </div>
                  </div>

                  <div className="text-xs uppercase tracking-widest text-cyan-400/60 mb-2">
                    {feature.category}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition">
                    {feature.title}
                  </h3>

                  <p className="text-blue-200/60 text-sm group-hover:text-white/80 transition">
                    {feature.description}
                  </p>
                </div>
              </DottedGlowBackground>
            </motion.div>
          ))}
        </div>
=======
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
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
      </div>
    </section>
  );
}
