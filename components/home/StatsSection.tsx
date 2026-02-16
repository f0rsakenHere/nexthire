"use client";

import { motion } from "motion/react";
import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";

const stats = [
  {
    label: "INTERVIEWS PRACTICED",
    value: "10k+",
    icon: TrendingUp,
  },
  {
    label: "SUCCESS RATE",
    value: "95%",
    icon: CheckCircle,
  },
  {
    label: "AI COACH",
    value: "24/7",
    icon: Clock,
  },
  {
    label: "USERS HIRED",
    value: "2000+",
    icon: Users,
  },
];

export function StatsSection() {
  return (
    <section className="relative border-y border-white/5 bg-black/40 backdrop-blur-lg overflow-hidden">
      {/* Ambient Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center bg-black/20 border border-white/5 rounded-2xl p-2 md:p-8 backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex-1 flex flex-col items-center justify-center p-6 md:p-4 text-center relative w-full hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon
                  className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </span>
              </div>

              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 group-hover:to-cyan-200 transition-all duration-300 tracking-tight">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
