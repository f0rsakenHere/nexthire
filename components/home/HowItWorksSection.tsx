"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Upload Resume",
      description: "Our AI scans your resume to identify key skills and gaps.",
      renderVisual: () => (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
          <div className="w-32 h-40 bg-zinc-900 border border-zinc-800 rounded-lg relative overflow-hidden flex flex-col p-3 gap-2 shadow-2xl">
            {/* Header Lines */}
            <div className="flex gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500/20" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
              <div className="w-2 h-2 rounded-full bg-green-500/20" />
            </div>

            {/* Skeleton Lines */}
            <div className="space-y-2">
              <div className="h-2 w-3/4 bg-zinc-800 rounded-sm" />
              <div className="h-2 w-1/2 bg-zinc-800 rounded-sm" />
              <div className="h-2 w-full bg-zinc-800 rounded-sm" />
              <div className="h-2 w-5/6 bg-zinc-800 rounded-sm" />
              <div className="h-2 w-4/5 bg-zinc-800 rounded-sm" />
            </div>

            {/* Scanning Beam */}
            <motion.div
              animate={{ top: ["-10%", "120%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent w-full blur-sm"
            />
          </div>
        </div>
      ),
    },
    {
      step: "02",
      title: "AI Simulation",
      description:
        "Answer technical questions in a realistic voice environment.",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="flex items-center gap-1 h-32">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ["20%", "80%", "20%"] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
                className="w-1.5 bg-cyan-500/80 rounded-full"
                style={{ height: "40%" }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      step: "03",
      title: "Get Hired",
      description:
        "Receive detailed feedback and clear your interviews with confidence.",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 shadow-2xl relative overflow-hidden"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-50" />

            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 text-cyan-500">
              <Check size={18} strokeWidth={3} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Offer Received
              </h4>
              <p className="text-xs text-zinc-500">Google • L4 Engineer</p>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-medium text-white mb-6 tracking-tight"
          >
            How it works
          </motion.h2>
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting Line (Behind) */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10 hidden md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              {/* Card */}
              <div className="aspect-[3/4] bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden relative hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-500">
                {/* Label */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  // STEP {step.step}
                </div>

                {/* Visual Area */}
                <div className="absolute inset-0 top-10 bottom-24">
                  {step.renderVisual()}
                </div>

                {/* Text Area */}
                <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
