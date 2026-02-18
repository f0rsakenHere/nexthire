"use client";
import { motion } from "framer-motion";
import { FooterSection } from "./home/FooterSection";

export default function CallToAction() {
  return (
    <section className="px-6 text-center relative overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative bg-card p-15 rounded-2xl mb-14 mt-0 border-cyan-300 max-w-3xl mx-auto "
      >
        <h2 className="text-4xl md:text-4xl font-bold mb-6">
          Ready to Build Your Dream Resume?
        </h2>

        <p className="text-gray-400 mb-10 text-lg">
          Create professional resumes, check ATS score, and land your dream job
          faster.
        </p>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-10 py-4 rounded-full font-semibold text-lg
            bg-white text-black
            hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
            transition
          "
        >
          Get Started Now
        </motion.button>
      </motion.div>
      <FooterSection />
    </section>
  );
}
