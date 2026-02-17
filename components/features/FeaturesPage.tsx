"use client";

import { motion } from "motion/react";
import { 
  FileText, 
  Mic, 
  Zap, 
  TrendingUp, 
  Code, 
  Brain,
  DollarSign,
  Building2,
  GitBranch,
  Lightbulb,
  Shield,
  FileCheck
} from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export function FeaturesPage() {
  const coreFeatures = [
    {
      title: "AI Resume Scorer",
      description:
        "Get a detailed breakdown of your ATS score, formatting errors, and impact analysis. Know exactly what recruiters see.",
      icon: <FileText className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Resume Tools"
    },
    {
      title: "Role-Based Mock Interviews",
      description:
        "Select specific roles (Frontend, Backend, DevOps) for targeted questions. Practice with context-aware scenarios.",
      icon: <Mic className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Interview Practice"
    },
    {
      title: "Real-time Voice Interaction",
      description:
        "Speech-to-Text integration for a realistic verbal interview experience. Practice speaking your answers confidently.",
      icon: <Zap className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Interview Practice"
    },
    {
      title: "Progress Analytics",
      description:
        "Charts showing improvement in confidence and technical accuracy over time. Track your journey to success.",
      icon: <TrendingUp className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Analytics"
    },
    {
      title: "Keyword Gap Analysis",
      description:
        "Compares your resume against specific job descriptions to find missing skills. Never miss a critical keyword again.",
      icon: <FileCheck className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Resume Tools"
    },
    {
      title: "Instant Feedback Loop",
      description:
        "Immediate 'Better Answer' suggestions after every interview response. Learn while you practice.",
      icon: <Lightbulb className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Interview Practice"
    }
  ];

  const uniqueFeatures = [
    {
      title: "\"Roast My Resume\" Mode",
      description:
        "A fun, strict mode where the AI ruthlessly critiques your resume to highlight major flaws. Gamified feedback that makes improvement engaging.",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Code Snippet Validator",
      description:
        "During technical interviews, paste code snippets and get real-time syntax/logic validation. Catch errors before the interviewer does.",
      icon: <Code className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Behavioral Tone Detector",
      description:
        "Analyzes your audio/text to detect confidence levels, nervousness, or aggression using sentiment analysis.",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Salary Negotiation Simulator",
      description:
        "A special module to practice negotiating salary with an AI HR bot. Master the art of getting what you deserve.",
      icon: <DollarSign className="w-8 h-8" />,
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      title: "Company-Specific Drills",
      description:
        "\"Mock Interview for Google\" vs \"Mock Interview for a Startup\" – different difficulty levels and question styles.",
      icon: <Building2 className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Resume Version Control",
      description:
        "Track changes in your resume and see which version scored higher. Never lose a good iteration.",
      icon: <GitBranch className="w-8 h-8" />,
      gradient: "from-indigo-500 to-violet-500"
    },
    {
      title: "STAR Method Wizard",
      description:
        "A tool that guides you to write resume bullet points in the Situation-Task-Action-Result format.",
      icon: <FileText className="w-8 h-8" />,
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      title: "Blind Resume Review",
      description:
        "Compare your resume score against an anonymized database of successful hires in your target role.",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-slate-500 to-gray-500"
    },
    {
      title: "Interview \"Panic Button\"",
      description:
        "If you get stuck during a mock interview, hit the hint button to get a nudge without revealing the full answer.",
      icon: <Lightbulb className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "\"Did You Mean?\" Skill Mapper",
      description:
        "If you write \"ReactJS\", the system suggests adding \"Redux\" or \"Hooks\" based on industry skill clusters.",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-0 pointer-events-none" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[600px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6 py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-white drop-shadow-lg"
          >
            Powerful Features for <br />
            <span className="font-medium bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              Career Success
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-blue-200/80 font-light tracking-wide"
          >
            Everything you need to master your resume, ace your interviews, and land your dream job.
          </motion.p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 px-4 relative bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Core Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light"
            >
              Essential tools to transform your job search journey
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-[320px] w-full rounded-[2rem] overflow-hidden border border-white/5 relative group bg-white/[0.01] backdrop-blur-sm"
              >
                <DottedGlowBackground
                  className="h-full w-full mask-radial-to-90% mask-radial-at-center"
                  gap={15}
                  radius={1.5}
                  opacity={0.15}
                  glowColorDarkVar="--color-cyan-500"
                  colorDarkVar="--color-cyan-900"
                  speedMin={0.5}
                  speedMax={1.5}
                >
                  <div className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-500 z-10 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-30 z-10 pointer-events-none" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20 pointer-events-auto">
                    <div className="relative mb-6">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyan-500/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen" />
                      <div className="relative flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition-all shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] backdrop-blur-md">
                        {feature.icon}
                      </div>
                    </div>

                    <div className="text-xs uppercase tracking-widest text-cyan-400/60 mb-2">
                      {feature.category}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-blue-200/60 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-white/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </DottedGlowBackground>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="py-24 px-4 relative bg-black">
        <div className="absolute top-1/2 right-0 w-[50%] h-[1000px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Unique Innovations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light"
            >
              Features you won&apos;t find anywhere else
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden group-hover:border-white/20 transition-all duration-300">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                  
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[600px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className="text-blue-200/60 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have already improved their interview skills and landed their dream jobs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold text-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
