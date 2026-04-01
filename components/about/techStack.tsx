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
  SiVercel,
  SiStripe,
  SiMongodb,
} from "react-icons/si";

const GrokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1024 1024" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M395.479 633.828L735.91 381.105C752.599 368.715 776.454 373.548 784.406 392.792C826.26 494.285 807.561 616.253 724.288 699.996C641.016 783.739 525.151 802.104 419.247 760.277L303.556 814.143C469.49 928.202 670.987 899.995 796.901 773.282C896.776 672.843 927.708 535.937 898.785 412.476L899.047 412.739C857.105 231.37 909.358 158.874 1016.4 10.6326C1018.93 7.11771 1021.47 3.60279 1024 0L883.144 141.651V141.212L395.392 633.916"
      fill="currentColor"
    />
    <path
      d="M325.226 695.251C206.128 580.84 226.662 403.776 328.285 301.668C403.431 226.097 526.549 195.254 634.026 240.596L749.454 186.994C728.657 171.88 702.007 155.623 671.424 144.2C533.19 86.9942 367.693 115.465 255.323 228.382C147.234 337.081 113.244 504.215 171.613 646.833C215.216 753.423 143.739 828.818 71.7385 904.916C46.2237 931.893 20.6216 958.87 0 987.429L325.139 695.339"
      fill="currentColor"
    />
  </svg>
);

const FirebaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 600 600" width="1em" height="1em" {...props}>
    <path
      fill="#FF9100"
      d="M213.918 560.499c23.248 9.357 48.469 14.909 74.952 15.834 35.84 1.252 69.922-6.158 100.391-20.234-36.537-14.355-69.627-35.348-97.869-61.448-18.306 29.31-45.382 52.462-77.474 65.848Z"
    />
    <path
      fill="#FFC400"
      d="M291.389 494.66c-64.466-59.622-103.574-145.917-100.269-240.568.108-3.073.27-6.145.46-9.216a166.993 166.993 0 0 0-36.004-5.241 167.001 167.001 0 0 0-51.183 6.153c-17.21 30.145-27.594 64.733-28.888 101.781-3.339 95.611 54.522 179.154 138.409 212.939 32.093-13.387 59.168-36.51 77.475-65.848Z"
    />
    <path
      fill="#FF9100"
      d="M291.39 494.657c14.988-23.986 24.075-52.106 25.133-82.403 2.783-79.695-50.792-148.251-124.942-167.381-.19 3.071-.352 6.143-.46 9.216-3.305 94.651 35.803 180.946 100.269 240.568Z"
    />
    <path
      fill="#DD2C00"
      d="M308.231 20.858C266 54.691 232.652 99.302 212.475 150.693c-11.551 29.436-18.81 61.055-20.929 94.2 74.15 19.13 127.726 87.686 124.943 167.38-1.058 30.297-10.172 58.39-25.134 82.404 28.24 26.127 61.331 47.093 97.868 61.447 73.337-33.9 125.37-106.846 128.383-193.127 1.952-55.901-19.526-105.724-49.875-147.778-32.051-44.477-159.5-194.36-159.5-194.36Z"
    />
  </svg>
);

const techStack = [
  { name: "Next.js 15", icon: <SiNextdotjs />, color: "text-foreground" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
  { name: "OpenAI", icon: <SiOpenai />, color: "text-emerald-400" },
  { name: "Framer Motion", icon: <SiFramer />, color: "text-violet-400" },
  { name: "Shadcn UI", icon: <SiShadcnui />, color: "text-foreground" },
  { name: "React 19", icon: <SiReact />, color: "text-cyan-400" },
  { name: "Vercel", icon: <SiVercel />, color: "text-foreground" },
  { name: "Stripe", icon: <SiStripe />, color: "text-violet-400" },
  { name: "Firebase", icon: <FirebaseIcon />, color: "text-foreground" },
  { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
  { name: "Grok", icon: <GrokIcon />, color: "text-foreground" },
];

// Duplicate for seamless loop
const marqueeItems = [...techStack, ...techStack];

const Card = ({ item }: { item: (typeof techStack)[0] }) => (
  <div className="flex flex-col items-center justify-center gap-4 w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl border border-border bg-card backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:border-primary/30 hover:scale-105 hover:shadow-[0_0_20px_oklch(0.62_0.26_278/0.15)] group">
    <div
      className={`text-4xl md:text-5xl ${item.color} filter drop-shadow-md transition-transform duration-300 group-hover:scale-110`}
    >
      {item.icon}
    </div>
    <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
      {item.name}
    </span>
  </div>
);

export default function TechStack() {
  return (
    <section className="py-24 overflow-hidden relative bg-background">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
          Powered by <br />
          <span className="bg-gradient-to-r from-primary via-violet-400 to-blue-500 bg-clip-text text-transparent">
            Cutting-Edge Tech
          </span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          We use the latest modern web technologies to ensure speed, security,
          and scalability.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden py-10">
        {/* Gradient Masks — match background color */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

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
