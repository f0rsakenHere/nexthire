"use client";
import { motion } from "motion/react";

export default function MissionStory() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Mission Statement */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wider uppercase">
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Empowering Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Career Journey
            </span>
          </h2>
          <p className="text-blue-200/70 text-lg leading-relaxed">
            Our mission is to empower job seekers with intelligent tools that
            improve confidence, technical skills, and interview performance. We
            believe everyone deserves a fair chance to land their dream job.
          </p>
        </motion.div>

        {/* Right: The Story */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group hover:border-cyan-500/20 transition-colors"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyan-500 rounded-full" />
            The Origin Story
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            We created NextHire because we noticed a gap. Many talented
            candidates struggle not because of a lack of skill, but because they
            don&apos;t know what recruiters are looking for.
          </p>
          <p className="text-gray-400 leading-relaxed">
            By leveraging advanced AI, we analyze resumes, simulate
            psychologically accurate interviews, and provide the actionable
            feedback that was previously only available through expensive career
            coaches.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
