"use client";

import { motion } from "motion/react";
<<<<<<< HEAD
import { lazy, Suspense } from "react";
import {
  FileText,
  Mic,
  Zap,
  TrendingUp,
  Code,
=======
import { 
  FileText, 
  Mic, 
  Zap, 
  TrendingUp, 
  Code, 
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
  Brain,
  DollarSign,
  Building2,
  GitBranch,
  Lightbulb,
  Shield,
<<<<<<< HEAD
  FileCheck,
  GraduationCap,
  Briefcase,
  Users,
  Rocket,
  Database,
} from "lucide-react";
import {
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiSpringboot,
  SiGo,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiAmazon,
  SiDocker,
  SiRedis,
} from "react-icons/si";

// Lazy load the heavy DottedGlowBackground component
const DottedGlowBackground = lazy(() =>
  import("@/components/ui/dotted-glow-background").then((mod) => ({
    default: mod.DottedGlowBackground,
  })),
);

// Lightweight fallback for loading state
const CardSkeleton = () => (
  <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-sm animate-pulse" />
);
=======
  FileCheck
} from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784

export function FeaturesPage() {
  const coreFeatures = [
    {
      title: "AI Resume Scorer",
      description:
        "Get a detailed breakdown of your ATS score, formatting errors, and impact analysis. Know exactly what recruiters see.",
<<<<<<< HEAD
      icon: (
        <FileText className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      category: "Resume Tools",
=======
      icon: <FileText className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Resume Tools"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Role-Based Mock Interviews",
      description:
        "Select specific roles (Frontend, Backend, DevOps) for targeted questions. Practice with context-aware scenarios.",
<<<<<<< HEAD
      icon: (
        <Mic className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      category: "Interview Practice",
=======
      icon: <Mic className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Interview Practice"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Real-time Voice Interaction",
      description:
        "Speech-to-Text integration for a realistic verbal interview experience. Practice speaking your answers confidently.",
<<<<<<< HEAD
      icon: (
        <Zap className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      category: "Interview Practice",
=======
      icon: <Zap className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Interview Practice"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Progress Analytics",
      description:
        "Charts showing improvement in confidence and technical accuracy over time. Track your journey to success.",
<<<<<<< HEAD
      icon: (
        <TrendingUp className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      category: "Analytics",
=======
      icon: <TrendingUp className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Analytics"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Keyword Gap Analysis",
      description:
        "Compares your resume against specific job descriptions to find missing skills. Never miss a critical keyword again.",
<<<<<<< HEAD
      icon: (
        <FileCheck className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      category: "Resume Tools",
=======
      icon: <FileCheck className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Resume Tools"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Instant Feedback Loop",
      description:
        "Immediate 'Better Answer' suggestions after every interview response. Learn while you practice.",
<<<<<<< HEAD
      icon: (
        <Lightbulb className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
      category: "Interview Practice",
    },
=======
      icon: <Lightbulb className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
      category: "Interview Practice"
    }
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
  ];

  const uniqueFeatures = [
    {
<<<<<<< HEAD
      title: '"Roast My Resume" Mode',
      description:
        "A fun, strict mode where the AI ruthlessly critiques your resume to highlight major flaws. Gamified feedback that makes improvement engaging.",
      icon: (
        <Brain className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
=======
      title: "\"Roast My Resume\" Mode",
      description:
        "A fun, strict mode where the AI ruthlessly critiques your resume to highlight major flaws. Gamified feedback that makes improvement engaging.",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-red-500 to-orange-500"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Code Snippet Validator",
      description:
        "During technical interviews, paste code snippets and get real-time syntax/logic validation. Catch errors before the interviewer does.",
<<<<<<< HEAD
      icon: (
        <Code className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
=======
      icon: <Code className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Behavioral Tone Detector",
      description:
        "Analyzes your audio/text to detect confidence levels, nervousness, or aggression using sentiment analysis.",
<<<<<<< HEAD
      icon: (
        <Brain className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
=======
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Salary Negotiation Simulator",
      description:
        "A special module to practice negotiating salary with an AI HR bot. Master the art of getting what you deserve.",
<<<<<<< HEAD
      icon: (
        <DollarSign className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
=======
      icon: <DollarSign className="w-8 h-8" />,
      gradient: "from-yellow-500 to-amber-500"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Company-Specific Drills",
      description:
<<<<<<< HEAD
        '"Mock Interview for Google" vs "Mock Interview for a Startup" – different difficulty levels and question styles.',
      icon: (
        <Building2 className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
=======
        "\"Mock Interview for Google\" vs \"Mock Interview for a Startup\" – different difficulty levels and question styles.",
      icon: <Building2 className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Resume Version Control",
      description:
        "Track changes in your resume and see which version scored higher. Never lose a good iteration.",
<<<<<<< HEAD
      icon: (
        <GitBranch className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
=======
      icon: <GitBranch className="w-8 h-8" />,
      gradient: "from-indigo-500 to-violet-500"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "STAR Method Wizard",
      description:
        "A tool that guides you to write resume bullet points in the Situation-Task-Action-Result format.",
<<<<<<< HEAD
      icon: (
        <FileText className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
=======
      icon: <FileText className="w-8 h-8" />,
      gradient: "from-teal-500 to-cyan-500"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
    },
    {
      title: "Blind Resume Review",
      description:
        "Compare your resume score against an anonymized database of successful hires in your target role.",
<<<<<<< HEAD
      icon: (
        <Shield className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: 'Interview "Panic Button"',
      description:
        "If you get stuck during a mock interview, hit the hint button to get a nudge without revealing the full answer.",
      icon: (
        <Lightbulb className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: '"Did You Mean?" Skill Mapper',
      description:
        'If you write "ReactJS", the system suggests adding "Redux" or "Hooks" based on industry skill clusters.',
      icon: (
        <Brain className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
  ];

  const targetAudience = [
    {
      title: "Students & Fresh Graduates",
      description:
        "Build confidence and master interview skills before entering the job market. Get your first job faster.",
      icon: (
        <GraduationCap className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: "Career Switchers",
      description:
        "Transition smoothly into a new role or industry. Learn the right keywords and interview patterns.",
      icon: (
        <Briefcase className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: "Experienced Professionals",
      description:
        "Stay sharp and up-to-date with the latest interview trends. Negotiate better offers with confidence.",
      icon: (
        <Users className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
    {
      title: "Aspiring Tech Leaders",
      description:
        "Prepare for senior and leadership roles. Master system design and behavioral interviews.",
      icon: (
        <Rocket className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      ),
    },
  ];

  return (
    <div
      className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans"
      suppressHydrationWarning
    >
=======
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
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
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
<<<<<<< HEAD
            Everything you need to master your resume, ace your interviews, and
            land your dream job.
=======
            Everything you need to master your resume, ace your interviews, and land your dream job.
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
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
<<<<<<< HEAD
              className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
            >
              Core <span className="text-cyan-400">Features</span>
=======
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Core Features
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
<<<<<<< HEAD
              className="text-blue-200/60 max-w-2xl mx-auto text-xl font-light"
=======
              className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light"
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
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
<<<<<<< HEAD
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="h-[320px] w-full rounded-[2rem] overflow-hidden border border-white/5 relative group bg-white/[0.01] backdrop-blur-sm"
              >
                <Suspense fallback={<CardSkeleton />}>
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
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-blue-200/60 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-white/80 transition-colors">
                        {feature.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </DottedGlowBackground>
                </Suspense>
=======
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
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Unique Innovations Section - System Grid Layout */}
      <section className="py-32 px-4 relative bg-black overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
=======
      {/* Unique Features Section */}
      <section className="py-24 px-4 relative bg-black">
        <div className="absolute top-1/2 right-0 w-[50%] h-[1000px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
<<<<<<< HEAD
              className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
            >
              Unique <span className="text-cyan-400">Innovations</span>
=======
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Unique Innovations
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
<<<<<<< HEAD
              className="text-blue-200/60 max-w-2xl mx-auto text-xl font-light"
            >
              Breakthrough features designed to give you the unfair advantage
            </motion.p>
          </div>

          {/* Unified Border Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
            {uniqueFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="group relative border-b border-r border-white/10 bg-black/20 p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-colors duration-300">
                      <div className="text-cyan-300">{feature.icon}</div>
                    </div>
                    <span className="text-xs font-mono text-white/20 group-hover:text-cyan-400/50 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-blue-200/50 text-sm leading-relaxed flex-grow">
=======
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
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Who is NextHire For Section */}
      {/* Who is NextHire For Section */}
      {/* Who is NextHire For Section - Interactive List Layout */}
      <section className="py-32 px-4 relative bg-black overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-bold mb-6 text-white tracking-tight"
            >
              Built for <span className="text-cyan-400">Every Stage</span>{" "}
              <br />
              of Your Journey
            </motion.h2>
          </div>

          <div className="flex flex-col">
            {targetAudience.map((audience, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative border-b border-white/10 py-12 md:py-16 px-6 md:px-10 transition-colors duration-500 cursor-default"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                  {/* Left Column: Index & Title - Fixed Width for Alignment */}
                  <div className="flex items-baseline gap-6 md:gap-12 w-full md:w-[55%]">
                    <span className="text-xl md:text-2xl font-mono text-cyan-500/50 group-hover:text-cyan-400 transition-colors duration-300 shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:text-cyan-400/90 transition-colors duration-300">
                      {audience.title}
                    </h3>
                  </div>

                  {/* Right Column: Description & Icon */}
                  <div className="flex items-center justify-between gap-8 w-full md:w-[45%] pl-0 md:pl-8">
                    <p className="text-lg text-blue-200/50 group-hover:text-blue-100/80 transition-colors duration-300 leading-relaxed max-w-md">
                      {audience.description}
                    </p>

                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/10 text-cyan-500/50 group-hover:text-cyan-400 group-hover:border-cyan-500/50 group-hover:scale-110 transition-all duration-500 transform shrink-0">
                      {audience.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Tech Stack Section */}
      <section className="py-24 px-4 relative bg-black overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[50%] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
            >
              Supported <span className="text-cyan-400">Tech Stack</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-200/60 max-w-2xl mx-auto text-xl font-light"
            >
              Practice interviews for the most in-demand technologies across all
              domains
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <TechCategoryCard
              title="Frontend Development"
              description="Master modern UI libraries and frameworks."
              icon={<Code className="w-6 h-6 text-blue-400" />}
              delay={0}
              items={[
                { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
                {
                  name: "Vue.js",
                  icon: <SiVuedotjs className="text-[#4FC08D]" />,
                },
                {
                  name: "Angular",
                  icon: <SiAngular className="text-[#DD0031]" />,
                },
                {
                  name: "Next.js",
                  icon: <SiNextdotjs className="text-white" />,
                },
                {
                  name: "Tailwind",
                  icon: <SiTailwindcss className="text-[#38B2AC]" />,
                },
              ]}
            />

            {/* Backend */}
            <TechCategoryCard
              title="Backend Services"
              description="Build robust APIs and server-side logic."
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              delay={0.1}
              items={[
                {
                  name: "Node.js",
                  icon: <SiNodedotjs className="text-[#339933]" />,
                },
                {
                  name: "Python",
                  icon: <SiPython className="text-[#3776AB]" />,
                },
                {
                  name: "Java",
                  icon: <SiSpringboot className="text-[#6DB33F]" />,
                },
                { name: "Go", icon: <SiGo className="text-[#00ADD8]" /> },
                {
                  name: "NestJS",
                  icon: <SiNestjs className="text-[#E0234E]" />,
                },
              ]}
            />

            {/* Database & Cloud */}
            <TechCategoryCard
              title="Database & Cloud"
              description="Scale your applications with ease."
              icon={<Database className="w-6 h-6 text-purple-400" />}
              delay={0.2}
              items={[
                {
                  name: "PostgreSQL",
                  icon: <SiPostgresql className="text-[#336791]" />,
                },
                {
                  name: "MongoDB",
                  icon: <SiMongodb className="text-[#47A248]" />,
                },
                {
                  name: "AWS",
                  icon: <SiAmazon className="text-[#FF9900]" />,
                },
                {
                  name: "Docker",
                  icon: <SiDocker className="text-[#2496ED]" />,
                },
                { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
              ]}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-blue-200/40 text-sm mt-16"
          >
            And many more technologies added regularly based on industry
            trends...
          </motion.p>
        </div>
      </section>

=======
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
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
<<<<<<< HEAD
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className="text-blue-200/60 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have already improved their
              interview skills and landed their dream jobs.
=======
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Career?
            </h2>
            <p className="text-blue-200/60 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have already improved their interview skills and landed their dream jobs.
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
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
<<<<<<< HEAD

// Helper Component for Tech Categories
function TechCategoryCard({
  title,
  description,
  icon,
  items,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: { name: string; icon: React.ReactNode }[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative h-full bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 rounded-3xl p-8 overflow-hidden transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <p className="text-blue-200/50 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
          {icon}
        </div>
      </div>

      {/* Grid of Icons */}
      <div className="relative z-10 grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-300 group/item"
          >
            <span className="text-2xl filter drop-shadow-lg group-hover/item:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="text-sm font-medium text-gray-400 group-hover/item:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
=======
>>>>>>> 573dacd5002552e7cc206a282c014d87106ee784
