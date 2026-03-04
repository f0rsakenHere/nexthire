"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Mic,
  CheckCircle2,
  Bot,
  Terminal,
  Activity,
  Brain,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "resume",
    title: "AI Resume Analysis",
    description:
      "Deep scanning of your resume to identify missing keywords and formatting issues.",
    icon: FileText,
  },
  {
    id: "interview",
    title: "Adaptive Interviewing",
    description:
      "Dynamic questions that evolve based on your responses, just like a real interviewer.",
    icon: Mic,
  },
  {
    id: "insight",
    title: "Instant Insight Report",
    description:
      "Get a comprehensive breakdown of your performance immediately after the session.",
    icon: Activity,
  },
];

export function FeatureShowreel() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
<<<<<<< HEAD
    <section className="py-24 bg-black relative overflow-hidden">
=======
    <section className="py-24 bg-background relative overflow-hidden">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
      {/* Background Image */}
      <div className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        <Image
          src="/fox.webp"
          alt="Feature Background"
          fill
<<<<<<< HEAD
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
=======
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
<<<<<<< HEAD
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Experience the <span className="text-cyan-400">Future</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-lg">
=======
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience the <span className="text-primary">Future</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
            See how NextHire transforms your preparation with advanced AI tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side: Triggers */}
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveFeature(index)}
                className={cn(
                  "group p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-md",
                  activeFeature === index
<<<<<<< HEAD
                    ? "bg-white/[0.05] border-cyan-500/50"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10",
                )}
              >
                {activeFeature === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-100 transition-opacity duration-300 pointer-events-none" />
=======
                    ? "bg-card border-primary/50"
                    : "bg-card/40 border-border hover:bg-card/60 hover:border-border/80",
                )}
              >
                {activeFeature === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-100 transition-opacity duration-300 pointer-events-none" />
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                )}

                {/* Badge for Insight Report */}
                {feature.id === "insight" && (
<<<<<<< HEAD
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
=======
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-primary/10 text-primary border border-primary/20">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                    LIVE
                  </div>
                )}

                <div className="flex items-start gap-4 relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 shrink-0",
                      activeFeature === index
<<<<<<< HEAD
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                        : "bg-white/5 border-white/10 text-zinc-500 group-hover:text-zinc-300",
=======
                        ? "bg-primary/20 border-primary/50 text-primary"
                        : "bg-muted border-border text-muted-foreground group-hover:text-foreground",
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                    )}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "text-lg font-semibold mb-1 transition-colors duration-300",
                        activeFeature === index
<<<<<<< HEAD
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-zinc-200",
=======
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                      )}
                    >
                      {feature.title}
                    </h3>
<<<<<<< HEAD
                    <p className="text-sm text-zinc-500 leading-relaxed">
=======
                    <p className="text-sm text-muted-foreground leading-relaxed">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: The Display Terminal */}
<<<<<<< HEAD
          <div className="relative h-[500px] w-full bg-zinc-900/50 rounded-3xl border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Window Controls */}
            <div className="absolute top-0 w-full h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
              <div className="ml-auto flex items-center gap-2 text-[10px] text-zinc-600 font-mono">
=======
          <div className="relative h-[500px] w-full bg-card/50 rounded-3xl border border-border backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Window Controls */}
            <div className="absolute top-0 w-full h-12 bg-muted/40 border-b border-border flex items-center px-4 gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
              <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                <Terminal className="w-3 h-3" />
                <span>AI_ENGINE_V2.0</span>
              </div>
            </div>

            <div className="p-8 pt-20 h-full w-full relative">
              <AnimatePresence mode="wait">
                {activeFeature === 0 && (
                  <motion.div
                    key="resume-ui"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex flex-col"
                  >
                    <div className="flex justify-between items-end mb-6">
                      <div>
<<<<<<< HEAD
                        <h4 className="text-zinc-400 text-xs uppercase tracking-wider mb-1">
                          Resume Score
                        </h4>
                        <div className="text-5xl font-bold text-white">
                          92<span className="text-2xl text-zinc-500">/100</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full">
=======
                        <h4 className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                          Resume Score
                        </h4>
                        <div className="text-5xl font-bold text-foreground">
                          92
                          <span className="text-2xl text-muted-foreground">
                            /100
                          </span>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-full">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                        Match Found
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        "React.js",
                        "TypeScript",
                        "Node.js",
                        "System Design",
                      ].map((skill, i) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
<<<<<<< HEAD
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5"
                        >
                          <span className="text-sm text-zinc-300">{skill}</span>
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        </motion.div>
                      ))}
                      <div className="flex items-center justify-between p-3 bg-red-500/5 rounded-lg border border-red-500/10 opacity-60">
                        <span className="text-sm text-zinc-400 line-through">
                          jQuery
                        </span>
                        <span className="text-[10px] text-red-400">
=======
                          className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border"
                        >
                          <span className="text-sm text-foreground/80">
                            {skill}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </motion.div>
                      ))}
                      <div className="flex items-center justify-between p-3 bg-rose-500/5 rounded-lg border border-rose-500/10 opacity-60">
                        <span className="text-sm text-muted-foreground line-through">
                          jQuery
                        </span>
                        <span className="text-[10px] text-rose-500">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                          Outdated
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeFeature === 1 && (
                  <motion.div
                    key="interview-ui"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex flex-col justify-center items-center gap-8"
                  >
                    {/* Voice Wave */}
                    <div className="flex items-center gap-1 h-12">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ["20%", "100%", "20%"] }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                            delay: i * 0.05,
                          }}
<<<<<<< HEAD
                          className="w-1 bg-cyan-400 rounded-full"
=======
                          className="w-1 bg-primary rounded-full"
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                          style={{ height: "40%" }}
                        />
                      ))}
                    </div>

                    {/* Chat Bubble */}
<<<<<<< HEAD
                    <div className="w-full max-w-sm bg-zinc-800/80 border border-white/10 p-4 rounded-2xl rounded-tr-none relative shadow-xl">
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-black">
                        <Bot className="w-4 h-4 text-black" />
                      </div>
                      <p className="text-sm text-zinc-200">
=======
                    <div className="w-full max-w-sm bg-card border border-border p-4 rounded-2xl rounded-tr-none relative shadow-xl">
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="text-sm text-foreground/90">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                        &quot;That explains the CAP theorem, but how would you
                        handle consistency in a distributed system with high
                        latency?&quot;
                      </p>
                    </div>

                    <div className="flex gap-2">
<<<<<<< HEAD
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs text-zinc-500 uppercase tracking-widest">
=======
                      <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                        Recording
                      </span>
                    </div>
                  </motion.div>
                )}

                {activeFeature === 2 && (
                  <motion.div
                    key="insight-ui"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex flex-col gap-4"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
<<<<<<< HEAD
                      <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
=======
                      <span className="text-[10px] font-mono text-primary animate-pulse">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                        &gt;_ ANALYSING_SESSION_DATA...
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 h-full">
                      {/* Skill Bars Card */}
<<<<<<< HEAD
                      <div className="col-span-2 bg-zinc-900/50 rounded-xl border border-white/5 p-5 relative overflow-hidden backdrop-blur-md">
=======
                      <div className="col-span-2 bg-muted/30 rounded-xl border border-border p-5 relative overflow-hidden backdrop-blur-md">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                        <div className="space-y-4">
                          {[
                            {
                              label: "COMMUNICATION",
                              value: 85,
<<<<<<< HEAD
                              color: "bg-cyan-400",
=======
                              color: "bg-primary",
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                            },
                            {
                              label: "TECHNICAL ACCURACY",
                              value: 94,
<<<<<<< HEAD
                              color: "bg-emerald-400",
                            },
                          ].map((stat, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1 tracking-wider">
=======
                              color: "bg-emerald-500",
                            },
                          ].map((stat, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1 tracking-wider">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                                <span>{stat.label}</span>
                                <span
                                  className={stat.color.replace("bg-", "text-")}
                                >
                                  {stat.value / 10}/10
                                </span>
                              </div>
<<<<<<< HEAD
                              <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
=======
                              <div className="w-full h-[2px] bg-muted rounded-full overflow-hidden">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${stat.value}%` }}
                                  transition={{ duration: 1, delay: i * 0.2 }}
                                  className={cn(
                                    "h-full shadow-[0_0_10px_currentColor]",
                                    stat.color,
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Strength Card */}
<<<<<<< HEAD
                      <div className="bg-zinc-900/50 rounded-xl border border-white/5 p-4 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                          <Brain className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                          KEY_STRENGTH
                        </div>
                        <div className="text-sm font-medium text-white">
                          Problem Solving
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-1">
=======
                      <div className="bg-muted/30 rounded-xl border border-border p-4 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                          <Brain className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                          KEY_STRENGTH
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          Problem Solving
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                          Consistently identified edge cases.
                        </div>
                      </div>

                      {/* Confidence Chart Card */}
<<<<<<< HEAD
                      <div className="bg-zinc-900/50 rounded-xl border border-white/5 p-4 flex flex-col justify-between backdrop-blur-md">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
=======
                      <div className="bg-muted/30 rounded-xl border border-border p-4 flex flex-col justify-between backdrop-blur-md">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                          CONFIDENCE
                        </div>
                        <div className="flex-1 flex items-end gap-1">
                          {[40, 65, 55, 80, 75, 90, 85].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{
                                duration: 0.5,
                                delay: 0.5 + i * 0.1,
                              }}
<<<<<<< HEAD
                              className="flex-1 bg-cyan-500/20 rounded-sm border-t border-cyan-500/50"
=======
                              className="flex-1 bg-primary/20 rounded-sm border-t border-primary/50"
>>>>>>> 56aeb6ea095a946240509154bb178e79e1d0625b
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
