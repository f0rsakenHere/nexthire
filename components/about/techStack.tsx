"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiOpenai,
  SiFramer,
  SiShadcnui,
} from "react-icons/si";

const icons = [
  { icon: <SiNextdotjs />, color: "text-white" },
  { icon: <SiTypescript />, color: "text-blue-500" },
  { icon: <SiTailwindcss />, color: "text-cyan-400" },
  { icon: <SiOpenai />, color: "text-green-500" },
  { icon: <SiShadcnui />, color: "text-gray-400" },
  { icon: <SiFramer />, color: "text-purple-500" },
];

const duplicatedIcons = [...icons, ...icons];

export default function TechStack() {
  return (
    <section className="py-10 overflow-hidden ">
      <h2 className="text-center text-4xl font-bold mb-10">Tech Stack</h2>

      <div className="relative flex max-w-[100vw] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex flex-none gap-12 pr-12"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedIcons.map((item, i) => (
            <div
              key={i}
              className={`text-5xl ${item.color} hover:scale-125 transition-transform duration-300 cursor-pointer`}
            >
              {item.icon}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
