"use client";

import { motion } from "motion/react";
import { FileText, Mic, Zap, TrendingUp } from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export function FeaturesSection() {
  const features = [
    {
      title: "AI Resume Scanner",
      description:
        "Beat the ATS with detailed scoring. We analyze your resume against job descriptions.",
      icon: <FileText className="w-10 h-10 text-primary" />,
    },
    {
      title: "Mock Interviews",
      description:
        "Practice voice-based technical interviews. Our AI adapts to your responses.",
      icon: <Mic className="w-10 h-10 text-primary" />,
    },
    {
      title: "Real-time Feedback",
      description:
        "Get instant suggestions on your answers. Improve your communication skills.",
      icon: <Zap className="w-10 h-10 text-primary" />,
    },
    {
      title: "Progress Tracking",
      description:
        "See your improvement over time with detailed analytics and performance charts.",
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <section className="py-24 px-4 relative bg-background" id="features">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[800px] bg-primary/8 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Smart tools for your career
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg font-light"
          >
            We have built the best in class tools to help you{" "}
            <span className="text-primary font-medium">master</span> the
            interview process.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="h-[300px] w-full rounded-[2rem] overflow-hidden border border-border hover:border-primary/20 hover:shadow-[0_8px_40px_oklch(0.62_0.26_278/0.1)] transition-all duration-300 relative group bg-card"
            >
              <DottedGlowBackground
                className="h-full w-full mask-radial-to-90% mask-radial-at-center"
                gap={15}
                radius={1.5}
                opacity={0.12}
                glowColorDarkVar="--color-violet-500"
                colorDarkVar="--color-violet-900"
                speedMin={0.5}
                speedMax={1.5}
              >
                {/* Top shimmer line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">
                  {/* Icon */}
                  <div className="flex items-center justify-center p-4 rounded-2xl bg-primary/10 border border-primary/15 mb-6">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {feature.description}
                  </p>
                </div>
              </DottedGlowBackground>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
