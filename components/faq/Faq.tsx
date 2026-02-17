"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

import { motion } from "motion/react";
export default function Faq() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="max-w-5xl mx-auto p-4 py-20  mt-18">
        {/* 🔹 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-cyan-200 to-blue-500 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]  font-bold mb-4">
            NextHire FAQ
          </h1>
          <p className="text-blue-200/80 font-light tracking-wide">
            Everything you need to know about AI resume analysis and mock
            interviews.
          </p>
        </motion.div>

        {/* 🔹 Resume AI */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Resume AI
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="resume-1" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg font-medium text-gray-400 group-hover:text-gray-200 group-data-[state=open]:text-white transition-colors text-left flex-1 mr-4">
                  How does the ATS score work?
                </span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="bg-white/[0.02] px-6 pb-6 pt-2 border-x border-b border-white/5 group-data-[state=open]:border-cyan-500/20 text-gray-400 leading-relaxed text-lg">
                <span className="text-cyan-400  mr-2">{`>`}</span>
                Our AI evaluates keyword density, formatting, section structure,
                <br />
                and readability to generate a score out of 100{" "}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 H-4 bg-cyan-500 ml-1 align-middle"
                >
                  |
                </motion.span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resume-2" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className=" text-lg">
                  What file formats are supported?
                </span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                You can upload PDF and DOCX files. Your data is processed <br />
                securely through server-side API routes
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 H-4 bg-cyan-500 ml-1 align-middle"
                >
                  |
                </motion.span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resume-3" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">Does the AI rewrite my resume?</span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400  mr-2">{`>`}</span>
                We provide actionable bullet-point suggestions so you can <br />
                rewrite each section with stronger impact.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* 🔹 Interview AI */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Interview AI
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="interview-1" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">
                  How does the AI mock interview work?
                </span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400 mr-2 ">{`>`}</span>
                You select a role and difficulty level. The AI generates <br />{" "}
                dynamic questions and adapts based on your responses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="interview-2" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">
                  Do I get feedback after each answer?
                </span>
                <Plus className="faq-icon" />
              </AccordionTrigger>
              <AccordionContent className=" text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                Yes. The AI evaluates correctness, structure, and clarity <br />{" "}
                and gives instant improvement suggestions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="interview-3" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="faq-title text-lg">
                  Can I answer using voice input?
                </span>
                <Plus className="faq-icon" />
              </AccordionTrigger>
              <AccordionContent className="faq-content text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                Yes. Speech-to-text converts your spoken answers into text{" "}
                <br /> for real-time evaluation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* 🔹 Platform & Pricing */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Platform & Pricing
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="platform-1" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="faq-title text-lg">Is my data secure?</span>
                <Plus className="faq-icon" />
              </AccordionTrigger>
              <AccordionContent className="faq-content text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                All uploads are processed securely via server-side <br /> API
                routes and we never expose API keys.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="platform-2" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="faq-title text-lg">Is NextHire free?</span>
                <Plus className="faq-icon" />
              </AccordionTrigger>
              <AccordionContent className="faq-content text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                We offer a free tier with limited resume scans and mock <br />
                interviews. Pro unlocks unlimited access.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="platform-3" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="faq-title text-lg">Can I cancel anytime?</span>
                <Plus className="faq-icon" />
              </AccordionTrigger>
              <AccordionContent className="faq-content text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                Yes. You can upgrade or cancel your subscription at any time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Feedback  */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Feedback & Analytics
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="interview-1" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">
                  Will I see my improvement over time?
                </span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400 mr-2 ">{`>`}</span>
                Yes. You can track: <br />
                1. Score history <br />
                2. Skill progression <br />
                3. Performance against industry trends.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="interview-2" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">Does the AI give model answers?</span>
                <Plus className="faq-icon" />
              </AccordionTrigger>
              <AccordionContent className=" text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                Yes. It shows example high-quality answers so you can learn{" "}
                <br /> how to respond better.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* platform & data security */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Platform & Data Security
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="interview-1" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">Is my data secure?</span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400 mr-2 ">{`>`}</span>
                Yes. Your data is: <br />
                1.Encrypted in transit and at rest <br />
                2.Never sold or shared without consent <br />
                3.Protected under privacy standards (e.g., GDPR)
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="interview-2" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">Who can see my resume?</span>
                <Plus className="faq-icon" />
              </AccordionTrigger>
              <AccordionContent className=" text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                Only you. Recruiters cannot access your data unless you <br />{" "}
                choose to share it.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Pricing & Plans */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Pricing & Plans
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="resume-1" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="faq-title text-lg">Is NextHire free?</span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg font-medium text-gray-500">
                <span className="text-cyan-400  mr-2">{`>`}</span>
                Yes. The free plan includes: <br />
                1. Limited resume analysis <br />
                2. Cover letter generation <br />
                3. Mock interview questions <br />
                4. Daily usage credits
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resume-2" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className=" text-lg">What do I get with Pro?</span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                Pro typically includes: <br />
                1. Unlimited generations <br />
                2. Priority processing <br />
                3. Advanced feedback <br />
                4. Full Interview simulations
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resume-3" className="border-b-0">
              <AccordionTrigger className="group py-6 px-6 bg-white/[0.02] hover:bg-white/[0.04] data-[state=open]:bg-cyan-950/20 data-[state=open]:border-cyan-500/50 border border-white/5 rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline ">
                <span className="text-lg">Can I cancel anytime?</span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400  mr-2">{`>`}</span>
                Yes. You can upgrade, downgrade, or cancel your subscription{" "}
                <br />
                anytime.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
