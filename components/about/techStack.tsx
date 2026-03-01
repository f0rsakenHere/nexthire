"use client";

import { motion } from "motion/react";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiOpenai,
  SiFramer,
  SiShadcnui,
  SiReact,
  SiPostgresql,
  SiPrisma,
  SiVercel,
  SiDocker,
  SiGraphql,
  SiStripe,
  SiSupabase,
} from "react-icons/si";

const techStack = [
<<<<<<< HEAD
  { name: "Next.js 15", icon: <SiNextdotjs />, color: "text-white" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
  { name: "OpenAI API", icon: <SiOpenai />, color: "text-green-500" },
  { name: "Framer Motion", icon: <SiFramer />, color: "text-purple-500" },
  { name: "Shadcn UI", icon: <SiShadcnui />, color: "text-white" },
  { name: "React 19", icon: <SiReact />, color: "text-cyan-400" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400" },
  { name: "Prisma ORM", icon: <SiPrisma />, color: "text-white" },
  { name: "Vercel", icon: <SiVercel />, color: "text-white" },
  { name: "Docker", icon: <SiDocker />, color: "text-blue-600" },
  { name: "GraphQL", icon: <SiGraphql />, color: "text-pink-600" },
  { name: "Stripe", icon: <SiStripe />, color: "text-purple-400" },
=======
  { name: "Next.js 15", icon: <SiNextdotjs />, color: "text-foreground" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
  { name: "OpenAI API", icon: <SiOpenai />, color: "text-emerald-400" },
  { name: "Framer Motion", icon: <SiFramer />, color: "text-violet-400" },
  { name: "Shadcn UI", icon: <SiShadcnui />, color: "text-foreground" },
  { name: "React 19", icon: <SiReact />, color: "text-cyan-400" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400" },
  { name: "Prisma ORM", icon: <SiPrisma />, color: "text-foreground" },
  { name: "Vercel", icon: <SiVercel />, color: "text-foreground" },
  { name: "Docker", icon: <SiDocker />, color: "text-blue-500" },
  { name: "GraphQL", icon: <SiGraphql />, color: "text-pink-500" },
  { name: "Stripe", icon: <SiStripe />, color: "text-violet-400" },
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
  { name: "Supabase", icon: <SiSupabase />, color: "text-emerald-500" },
];

// Duplicate for seamless loop
const marqueeItems = [...techStack, ...techStack];

const Card = ({ item }: { item: (typeof techStack)[0] }) => (
<<<<<<< HEAD
  <div className="flex flex-col items-center justify-center gap-4 w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-cyan-500/30 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] group">
=======
  <div className="flex flex-col items-center justify-center gap-4 w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl border border-border bg-card backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:border-primary/30 hover:scale-105 hover:shadow-[0_0_20px_oklch(0.62_0.26_278/0.15)] group">
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
    <div
      className={`text-4xl md:text-5xl ${item.color} filter drop-shadow-md transition-transform duration-300 group-hover:scale-110`}
    >
      {item.icon}
    </div>
<<<<<<< HEAD
    <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
=======
    <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
      {item.name}
    </span>
  </div>
);

export default function TechStack() {
  return (
<<<<<<< HEAD
    <section className="py-24 overflow-hidden relative">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Powered by <br />
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Cutting-Edge Tech
          </span>
        </h2>
        <p className="text-blue-200/60 max-w-2xl mx-auto text-lg">
=======
    <section className="py-24 overflow-hidden relative bg-background">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
          Powered by <br />
          <span className="bg-gradient-to-r from-primary via-violet-400 to-blue-500 bg-clip-text text-transparent">
            Cutting-Edge Tech
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
          We use the latest modern web technologies to ensure speed, security,
          and scalability.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden py-10">
<<<<<<< HEAD
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
=======
        {/* Gradient Masks — match background color */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3

        <motion.div
          className="flex flex-nowrap gap-6 md:gap-8 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
