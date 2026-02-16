"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

import { motion } from "motion/react";
export default function MissionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="max-w-5xl mx-auto p-4 mt-18">
        {/* 🔹 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">NextHire FAQ</h1>
          <p className="text-blue-200/60">
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
              <AccordionTrigger className="group faq-trigger">
                <span className="faq-title text-lg">
                  How does the ATS score work?
                </span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg font-medium text-gray-500">
                <span className="text-cyan-400  mr-2">{`>`}</span>
                Our AI evaluates keyword density, formatting, section structure,
                <br />
                and readability to generate a score out of 100.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resume-2" className="border-b-0">
              <AccordionTrigger className="group faq-trigger">
                <span className=" text-lg">
                  What file formats are supported?
                </span>
                <Plus />
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-500">
                <span className="text-cyan-400 mr-2">{`>`}</span>
                You can upload PDF and DOCX files. Your data is processed <br />
                securely through server-side API routes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resume-3" className="border-b-0">
              <AccordionTrigger className="group faq-trigger">
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
              <AccordionTrigger className="group faq-trigger">
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
              <AccordionTrigger className="group faq-trigger">
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
              <AccordionTrigger className="group faq-trigger">
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
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Platform & Pricing
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <AccordionItem value="platform-1" className="border-b-0">
              <AccordionTrigger className="group faq-trigger">
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
              <AccordionTrigger className="group faq-trigger">
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
              <AccordionTrigger className="group faq-trigger">
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
      </div>
    </div>
  );
}
