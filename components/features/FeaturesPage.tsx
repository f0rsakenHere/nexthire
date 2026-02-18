"use client";

import { motion } from "motion/react";
import { lazy, Suspense } from "react";
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
  FileCheck,
  GraduationCap,
  Briefcase,
  Users,
  Rocket
} from "lucide-react";

// Lazy load the heavy DottedGlowBackground component
const DottedGlowBackground = lazy(() => 
  import("@/components/ui/dotted-glow-background").then(mod => ({ 
    default: mod.DottedGlowBackground 
  }))
);

// Lightweight fallback for loading state
const CardSkeleton = () => (
  <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-sm animate-pulse" />
);

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
      icon: <Brain className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Code Snippet Validator",
      description:
        "During technical interviews, paste code snippets and get real-time syntax/logic validation. Catch errors before the interviewer does.",
      icon: <Code className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Behavioral Tone Detector",
      description:
        "Analyzes your audio/text to detect confidence levels, nervousness, or aggression using sentiment analysis.",
      icon: <Brain className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Salary Negotiation Simulator",
      description:
        "A special module to practice negotiating salary with an AI HR bot. Master the art of getting what you deserve.",
      icon: <DollarSign className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Company-Specific Drills",
      description:
        "\"Mock Interview for Google\" vs \"Mock Interview for a Startup\" – different difficulty levels and question styles.",
      icon: <Building2 className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Resume Version Control",
      description:
        "Track changes in your resume and see which version scored higher. Never lose a good iteration.",
      icon: <GitBranch className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "STAR Method Wizard",
      description:
        "A tool that guides you to write resume bullet points in the Situation-Task-Action-Result format.",
      icon: <FileText className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Blind Resume Review",
      description:
        "Compare your resume score against an anonymized database of successful hires in your target role.",
      icon: <Shield className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Interview \"Panic Button\"",
      description:
        "If you get stuck during a mock interview, hit the hint button to get a nudge without revealing the full answer.",
      icon: <Lightbulb className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "\"Did You Mean?\" Skill Mapper",
      description:
        "If you write \"ReactJS\", the system suggests adding \"Redux\" or \"Hooks\" based on industry skill clusters.",
      icon: <Brain className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    }
  ];

  const targetAudience = [
    {
      title: "Students & Fresh Graduates",
      description: "Build confidence and master interview skills before entering the job market. Get your first job faster.",
      icon: <GraduationCap className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Career Switchers",
      description: "Transition smoothly into a new role or industry. Learn the right keywords and interview patterns.",
      icon: <Briefcase className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Experienced Professionals",
      description: "Stay sharp and up-to-date with the latest interview trends. Negotiate better offers with confidence.",
      icon: <Users className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    },
    {
      title: "Aspiring Tech Leaders",
      description: "Prepare for senior and leadership roles. Master system design and behavioral interviews.",
      icon: <Rocket className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    }
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Angular", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Laravel", category: "Backend" },
    { name: "Spring Boot", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "FastAPI", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Database" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "AWS", category: "Cloud" },
    { name: "Azure", category: "Cloud" },
    { name: "GCP", category: "Cloud" }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans" suppressHydrationWarning>
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
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-blue-200/60 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-white/80 transition-colors">
                        {feature.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </DottedGlowBackground>
                </Suspense>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="h-[280px] w-full rounded-[2rem] overflow-hidden border border-white/5 relative group bg-white/[0.01] backdrop-blur-sm"
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

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-auto">
                      <div className="relative mb-4">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyan-500/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen" />
                        <div className="relative flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition-all shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] backdrop-blur-md">
                          {feature.icon}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-blue-200/60 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-white/80 transition-colors">
                        {feature.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </DottedGlowBackground>
                </Suspense>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is NextHire For Section */}
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
              Who is NextHire For?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light"
            >
              Whether you&apos;re just starting out or leveling up, we&apos;ve got you covered
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targetAudience.map((audience, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="h-[280px] w-full rounded-[2rem] overflow-hidden border border-white/5 relative group bg-white/[0.01] backdrop-blur-sm"
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
                          {audience.icon}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {audience.title}
                      </h3>
                      <p className="text-blue-200/60 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-white/80 transition-colors">
                        {audience.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </DottedGlowBackground>
                </Suspense>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Tech Stack Section */}
      <section className="py-24 px-4 relative bg-black">
        <div className="absolute top-1/2 left-0 w-[50%] h-[800px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Supported Tech Stack
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light"
            >
              Practice interviews for the most in-demand technologies
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-wrap gap-3 justify-center">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  transition={{ delay: idx * 0.02, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group relative"
                >
                  <div className="px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-sm group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                        {tech.name}
                      </span>
                      <span className="text-xs text-blue-200/40 group-hover:text-cyan-400/60 transition-colors">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center text-blue-200/40 text-sm mt-8"
            >
              And many more technologies added regularly...
            </motion.p>
          </motion.div>
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
