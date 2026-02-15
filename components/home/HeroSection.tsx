"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-grid-white/[0.02] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-0 pointer-events-none" />

      {/* Central 4-Pointed Star Graphic */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {/* Glow Layer (Blurred Background) */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[800px] h-[800px] flex items-center justify-center opacity-40 blur-3xl mix-blend-screen"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" />
                <stop offset="30%" stopColor="#22d3ee" />
                <stop offset="70%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <path
              d="M100 0 C 105 50 120 95 200 100 C 120 105 105 150 100 200 C 95 150 80 105 0 100 C 80 95 95 50 100 0 Z"
              fill="url(#glowGradient)"
            />
          </svg>
        </motion.div>

        {/* Sharp Main Layer */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[700px] h-[700px] flex items-center justify-center mix-blend-screen"
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          >
            <defs>
              <radialGradient id="sharpGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="20%" stopColor="#a5f3fc" stopOpacity="0.9" />{" "}
                {/* Cyan-200 */}
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />{" "}
                {/* Sky-500 */}
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />{" "}
                {/* Blue-900 transparent */}
              </radialGradient>
            </defs>
            {/* Slender, Sharp Path */}
            <path
              d="M100 0 C 102 50 125 98 200 100 C 125 102 102 150 100 200 C 98 150 75 102 0 100 C 75 98 98 50 100 0 Z"
              fill="url(#sharpGradient)"
            />
          </svg>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6 md:gap-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-light tracking-tight text-white drop-shadow-lg"
        >
          Master Your Next <br />
          <span className="font-medium bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Interview
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-lg md:text-xl text-blue-200/80 font-light tracking-wide text-shadow-sm"
        >
          The AI-powered platform to practice, learn, and land your dream job in
          record time.
        </motion.p>
      </div>

      {/* Left Side: System Status */}
      <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-20">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-blue-500/20" />

        <div className="flex flex-col items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span
            className="text-[10px] font-mono font-medium tracking-[0.3em] text-blue-200/60 uppercase rotate-180 whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            System Online // AI Agent Ready
          </span>
        </div>

        <div className="w-px h-24 bg-gradient-to-t from-transparent to-blue-500/20" />
      </div>

      {/* Right Side: Scroll Indicator */}
      <div className="absolute right-8 md:right-12 bottom-12 flex flex-col items-center gap-2 z-20 animate-bounce cursor-pointer">
        <span className="text-xs uppercase tracking-widest text-blue-300/70">
          Scroll Down
        </span>
        <ArrowDown className="text-blue-400 w-4 h-4" />
      </div>
    </section>
  );
}
