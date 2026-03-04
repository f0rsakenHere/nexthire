"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Glass Portal Container */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-card backdrop-blur-xl border border-border px-6 py-20 md:px-20 text-center shadow-2xl">
          {/* Grid Pattern Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] z-0 pointer-events-none" />

          {/* Aurora Gradient Glow (Pulsing) */}
          <motion.div
            animate={{
              opacity: [0.2, 0.35, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/25 via-violet-600/15 to-blue-600/5 blur-3xl opacity-40 z-0 pointer-events-none mix-blend-screen"
          />

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Badge/Icon */}
            <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-widest backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Sparkles className="w-3 h-3" />
              <span>AI-Powered Success</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                ace your next interview?
              </span>
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of candidates who are getting hired at top tech
              companies. Start practicing with our AI agent today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 px-8 rounded-full bg-primary text-primary-foreground hover:opacity-90 font-bold text-lg shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started For Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full border border-border text-foreground hover:bg-muted font-medium text-lg transition-all duration-300"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
