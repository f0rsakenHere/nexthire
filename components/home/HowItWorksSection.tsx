"use client";

import { motion } from "motion/react";
import { Rocket } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      id: "01",
      title: "Upload Resume",
      description:
        "Start by uploading your current resume. Our AI analyzes your skills and experience.",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          <motion.div
            initial={{ rotateX: 10, rotateY: -10, rotateZ: 5, y: 0 }}
            animate={{
              rotateX: [10, 0, 10],
              rotateY: [-10, -5, -10],
              y: [0, -15, 0], // Slower float
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-32 md:w-32 md:h-40 bg-cyan-500/5 backdrop-blur-xl rounded-xl border border-cyan-500/30 relative overflow-hidden shadow-2xl flex flex-col p-3 gap-2 shadow-[inset_0_0_20px_rgba(34,211,238,0.15)] group-hover:border-cyan-400/50 transition-colors"
          >
            <div className="h-2 w-16 bg-cyan-400/20 rounded-full" />
            <div className="h-2 w-24 bg-cyan-400/10 rounded-full" />
            <div className="h-2 w-20 bg-cyan-400/10 rounded-full" />
            <div className="h-2 w-full bg-cyan-400/5 rounded-full mt-2" />
            <div className="h-2 w-full bg-cyan-400/5 rounded-full" />
            <div className="h-2 w-2/3 bg-cyan-400/5 rounded-full" />

            {/* Scan Beam */}
            <motion.div
              animate={{ top: ["-20%", "120%", "-20%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-8 bg-gradient-to-b from-cyan-500/0 via-cyan-400/50 to-cyan-500/0 blur-md shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-2 right-2 px-2 py-1 bg-cyan-500 text-black text-[10px] font-bold rounded shadow-lg shadow-cyan-500/20"
            >
              92%
            </motion.div>
          </motion.div>
        </div>
      ),
    },
    {
      id: "02",
      title: "Audio Simulation",
      description:
        "Answer technical questions in a realistic voice interview environment.",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center gap-2 md:gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((bar, i) => (
            <motion.div
              key={i}
              animate={{
                height: [20, Math.random() * 80 + 30, 20],
              }}
              transition={{
                duration: 0.4 + Math.random() * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
              className="w-3 md:w-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] border border-cyan-200/30"
              style={{ height: 40 }}
            />
          ))}
        </div>
      ),
    },
    {
      id: "03",
      title: "Get Hired",
      description:
        "Receive instant feedback and improve your skills to land your dream job.",
      renderVisual: () => (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {/* Rocket Container */}
          <motion.div
            className="relative z-10"
            animate={{
              y: [0, -15, 0],
              rotateZ: [-2, 2, -2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative w-24 h-24 bg-black/40 rounded-3xl shadow-[inset_0_0_20px_rgba(34,211,238,0.1),0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400/80 transition-all duration-500 backdrop-blur-xl">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                className="text-cyan-400 group-hover:text-white drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]"
              >
                <Rocket className="w-12 h-12 md:w-14 md:h-14 fill-cyan-500/10" />
              </motion.div>
            </div>

            {/* Rocket Thruster Particles */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 direction-col items-center flex-col">
              <motion.div
                animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 bg-gradient-to-b from-cyan-400 to-transparent blur-[1px]"
              />
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <section
      className="py-32 px-4 bg-black relative overflow-hidden"
      id="how-it-works"
    >
      {/* Background Ambience - Deep Blue/Cyan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light"
          >
            Three simple steps to master your interview skills.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Flow Line (Desktop) - Continuous Laser Beam */}
          <div className="hidden lg:block absolute top-[8rem] left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50 z-0">
            {/* Pulse Animation */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[4px]"
              animate={{ left: ["-50%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative flex flex-col gap-8"
              >
                {/* Card Container - Glass HUD Panel */}
                <div className="relative h-64 w-full rounded-[2rem] bg-white/[0.01] backdrop-blur-sm overflow-hidden transition-all duration-500">
                  {/* Gradient Border (Simulated via overlay) */}
                  <div className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-500" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-50" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-30" />

                  {/* Volumetric Spotlight (Behind Icon) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 mix-blend-screen" />

                  {/* Step Number Watermark (MASSIVE & CENTERED) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-bold text-white/10 select-none leading-none z-0 pointer-events-none group-hover:text-cyan-400/20 transition-colors duration-500">
                    {step.id}
                  </div>

                  {/* The Visual Content (Foreground) */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    {step.renderVisual()}
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center px-4 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-blue-200/80 transition-colors">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
