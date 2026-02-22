"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is the AI feedback real-time?",
    answer:
      "Yes. Our voice analysis engine processes your audio instantly, providing tone, pace, and content feedback within milliseconds of your response.",
  },
  {
    question: "Can I upload my own resume?",
    answer:
      "Absolutely. You can upload a PDF or DOCX file. The AI scans your resume to tailor interview questions specifically to your experience and skills.",
  },
  {
    question: "How does the billing work?",
    answer:
      "We offer a flexible tiered model. You can start for free with limited interviews, or upgrade to Pro for unlimited practice and advanced analytics. Cancel anytime.",
  },
  {
    question: "What kind of roles do you support?",
    answer:
      "We currently specialize in software engineering, product management, and data science roles, with system design and behavioral tracks for each.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden" id="faq">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            System Queries
          </motion.h2>
          <p className="text-blue-200/60">
            Common questions about the NextHire platform.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b-0"
            >
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline [&>svg]:hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-data-[state=open]:opacity-100 transition-opacity" />

                <span className="text-lg font-medium text-gray-400 group-hover:text-gray-200 group-data-[state=open]:text-white transition-colors text-left flex-1 mr-4">
                  {faq.question}
                </span>

                <div className="relative w-6 h-6 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-gray-500 group-data-[state=open]:text-cyan-400 group-data-[state=open]:rotate-45 transition-all duration-300 transform origin-center" />
                </div>
              </AccordionTrigger>

              <AccordionContent className="bg-white/[0.02] px-6 pb-6 pt-2 border-x border-b border-white/5 group-data-[state=open]:border-cyan-500/20 text-gray-400 leading-relaxed">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                {faq.answer}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-cyan-500 ml-1 align-middle"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
