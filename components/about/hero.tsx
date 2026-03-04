"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-grid-foreground/[0.02] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] z-0 pointer-events-none" />

      {/* Animated glow orb */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
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
          className="absolute w-[800px] h-[800px] flex items-center justify-center opacity-30 blur-3xl mix-blend-screen"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.26_278/0.3),transparent_70%)]" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6 md:gap-8 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-light tracking-tight text-foreground drop-shadow-lg"
        >
          About <br />
          <span className="font-medium bg-gradient-to-r from-primary via-violet-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)]">
            NextHire
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-lg md:text-xl text-muted-foreground font-light tracking-wide"
        >
          NextHire is an AI-powered platform designed to help job seekers
          analyze resumes, prepare for interviews, and track progress.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 z-20 animate-bounce">
        <ArrowDown className="text-primary w-5 h-5" />
      </div>
    </section>
  );
}
