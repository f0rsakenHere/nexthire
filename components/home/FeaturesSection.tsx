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
      icon: (
        <FileText className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: "Mock Interviews",
      description:
        "Practice voice-based technical interviews. Our AI adapts to your responses.",
      icon: (
        <Mic className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: "Real-time Feedback",
      description:
        "Get instant suggestions on your answers. Improve your communication skills.",
      icon: (
        <Zap className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: "Progress Tracking",
      description:
        "See your improvement over time with detailed analytics and performance charts.",
      icon: (
        <TrendingUp className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
  ];

  return (
    <section className="py-24 px-4 relative bg-black" id="features">
      {/* Background Ambience - Deep Blue/Cyan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Smart tools for your career
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light"
          >
            We have built the best in class tools to help you{" "}
            <span className="text-cyan-400 font-medium">master</span> the
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
              whileHover={{ y: -5 }}
              className="h-[300px] w-full rounded-[2rem] overflow-hidden border border-white/5 relative group bg-white/[0.01] backdrop-blur-sm"
            >
              <DottedGlowBackground
                className="h-full w-full mask-radial-to-90% mask-radial-at-center"
                gap={15}
                radius={1.5}
                opacity={0.15}
                glowColorDarkVar="--color-cyan-500"
                colorDarkVar="--color-cyan-900"
                speedMin={0.5}
                speedMax={1.5}
              >
                {/* Card Container Overlay Styles */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-500 z-10 pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-30 z-10 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20 pointer-events-auto">
                  {/* Icon Container with Glow */}
                  <div className="relative mb-6">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyan-500/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen" />

                    <div className="relative flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition-all shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] backdrop-blur-md">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200/60 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Internal Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </DottedGlowBackground>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
