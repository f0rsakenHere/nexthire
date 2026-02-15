"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Meta",
    quote:
      "I struggled with behavioral questions until I found NextHire. The real-time tone analysis is a game changer.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Ross",
    role: "Frontend Dev at Vercel",
    quote:
      "Got the job in 2 weeks! The technical questions were spot on with what I was actually asked.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Patel",
    role: "Senior Engineer at Microsoft",
    quote:
      "The system design feedback helped me identify gaps I didn't even know I had. Crushed the onsite!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Kim",
    role: "Full Stack at Airbnb",
    quote:
      "This is the best investment I made for my career. It feels like having a senior staff engineer coaching you 24/7.",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Data Scientist at Netflix",
    quote:
      "The SQL challenges were harder than the real interview. I felt over-prepared, which is a good thing!",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "James Wilson",
    role: "DevOps Engineer at AWS",
    quote:
      "Mock interviews helped me get rid of my anxiety. The AI interviewer actually sounds human.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Anita Roy",
    role: "UX Designer at Google",
    quote:
      "I used to freeze up during whiteboard sessions. The practice mode built my confidence massively.",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    name: "Omar Hassan",
    role: "Backend Lead at Uber",
    quote:
      "Incredible depth in the system design scenarios. Highly recommended for senior level candidates.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Sophie Anderson",
    role: "Mobile Dev at Spotify",
    quote:
      "The resume scanner picked up on keywords I was missing. My callback rate doubled after fixing it.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "Kenji Tanaka",
    role: "AI Researcher at OpenAI",
    quote:
      "Ironically, using an AI to practice for an AI role was the best decision. The feedback is brutally honest.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

export function Testimonials() {
  const row1 = testimonials.slice(0, 5);
  const row2 = testimonials.slice(5, 10);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Ambience - Cyan/Blue Mix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6 text-white"
        >
          Tried & Tested by <span className="text-cyan-400">Thousands</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-blue-200/60 text-lg max-w-2xl mx-auto"
        >
          Join a community of developers landing their dream jobs at top tech
          companies.
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex flex-col gap-8">
        {/* Edge Masks (Fade to Black) */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden relative w-full group">
          <div className="flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused] w-max items-center">
            {[...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`row1-${i}`} {...t} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden relative w-full group">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max items-center">
            {[...row2, ...row2, ...row2].map((t, i) => (
              <TestimonialCard key={`row2-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes Injection */}
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 50s linear infinite;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  avatar,
}: {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}) {
  return (
    <div className="w-[350px] md:w-[450px] flex-shrink-0 relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300 group/card">
      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover/card:ring-1 ring-cyan-500/20 shadow-none group-hover/card:shadow-[0_0_30px_-10px_rgba(34,211,238,0.15)] transition-all duration-300 pointer-events-none" />

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/10 relative overflow-hidden">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg">{name}</h4>
            <p className="text-blue-200/50 text-xs uppercase tracking-wider font-medium">
              {role}
            </p>
          </div>
        </div>
        <Quote className="text-white/10 w-8 h-8 group-hover/card:text-cyan-500/20 transition-colors" />
      </div>

      <p className="text-blue-100/70 leading-relaxed font-light">
        &quot;{quote}&quot;
      </p>
    </div>
  );
}
