"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="text-center pt-42"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        About <span className="text-cyan-400">NextHire</span>
      </motion.h1>

      <motion.p
        className="text-blue-200/60 text-lg md:text-lg mt-4 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        NextHire is an AI-powered platform designed to help job seekers analyze
        resumes, prepare for interviews, and track progress.
      </motion.p>
    </motion.section>
  );
}
