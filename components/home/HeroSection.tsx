"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  FileText,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const avatarSeeds = ["Alex", "Maria", "Sam", "Jordan"];

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-background pt-20">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/8 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
          {/* ── Left: Text + CTA ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              New: AI Interview Coach
            </motion.div>

            {/* Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
              >
                Master Your
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] bg-gradient-to-r from-primary via-violet-400 to-blue-500 bg-clip-text text-transparent"
              >
                Next Interview
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-lg"
            >
              Score your resume with AI, practice mock interviews, and get
              real-time feedback. Land your dream job faster with NextHire.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-13 px-8 rounded-full bg-primary text-primary-foreground hover:opacity-90 font-semibold text-base shadow-[0_0_30px_oklch(0.62_0.26_278/0.35)] border-0 transition-all duration-300"
                >
                  <FileText className="mr-2 w-4 h-4" />
                  Get Started Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 rounded-full border-border text-foreground hover:bg-muted font-medium text-base transition-all duration-300"
              >
                <Play className="mr-2 w-4 h-4 fill-current" />
                View Demo
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {avatarSeeds.map((seed, i) => (
                  <Image
                    key={i}
                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${seed}`}
                    alt={seed}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border-2 border-background bg-muted"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by{" "}
                <span className="text-foreground font-semibold">2,000+</span>{" "}
                job seekers
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Mock Dashboard ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {/* Main card */}
            <div className="relative z-20 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
              {/* Card header — profile + badges in one row */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      John Doe
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Senior Product Designer
                    </p>
                  </div>
                </div>
                {/* Badges row — no longer floating */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    + Match High
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    ATS Optimized
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-border">
                {/* Left panel */}
                <div className="p-5 space-y-5">
                  {/* Overall score */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-3">
                      Overall Score
                    </p>
                    <div className="flex items-end gap-1 mb-3">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-4xl font-bold text-foreground"
                      >
                        87
                      </motion.span>
                      <span className="text-muted-foreground text-sm mb-1">
                        / 100
                      </span>
                    </div>
                    {/* Score bar */}
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "87%" }}
                        transition={{
                          delay: 1.1,
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
                      />
                    </div>
                  </div>

                  {/* Key matches */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-2">
                      Key Matches
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["UX Research", "Figma", "Prototyping"].map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-destructive/10 text-destructive border border-destructive/20 font-medium">
                        React Native
                      </span>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-4 pt-1">
                    {[
                      { label: "Keywords", value: "24", icon: TrendingUp },
                      { label: "Sections", value: "8", icon: FileText },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-primary/60" />
                        <span className="text-sm font-bold text-foreground">
                          {value}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right panel: suggestions */}
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-3">
                    Suggested Improvements
                  </p>
                  <ul className="space-y-3">
                    {[
                      {
                        icon: Lightbulb,
                        color: "text-amber-400",
                        text: 'Add quantifiable metrics to your "Senior Designer" role.',
                      },
                      {
                        icon: AlertTriangle,
                        color: "text-orange-400",
                        text: 'Missing keyword: "Design Systems" found in job description.',
                      },
                      {
                        icon: CheckCircle2,
                        color: "text-emerald-400",
                        text: "Great use of action verbs in summary section.",
                      },
                    ].map(({ icon: Icon, color, text }, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
                        className="flex items-start gap-2"
                      >
                        <Icon
                          className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${color}`}
                        />
                        <span className="text-[11px] text-muted-foreground leading-relaxed">
                          {text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-border">
                    <button className="w-full text-xs font-medium text-foreground/70 hover:text-foreground py-2 rounded-lg border border-border hover:border-primary/30 transition-colors">
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-5 py-3 border-t border-border bg-muted/30 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">
                    AI Analysis
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Deep learning scan
                  </p>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
              </div>
            </div>

            {/* Interview Score — clean stat strip below card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="relative z-10 flex items-center gap-4 px-5 py-3 rounded-xl border border-border bg-card shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">
                  Interview Score Improving
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Based on your last 3 sessions
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                ↑ 23% this week
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
