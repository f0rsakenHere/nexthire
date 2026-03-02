"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

import { motion } from "motion/react";

const CustomAccordionItem = ({
  value,
  question,
  children,
}: {
  value: string;
  question: string;
  children: React.ReactNode;
}) => {
  return (
    <AccordionItem value={value} className="border-b-0">
      <AccordionTrigger className="group py-6 px-6 bg-card hover:bg-muted data-[state=open]:bg-primary/10 data-[state=open]:border-primary/50 border border-border rounded-none transition-all duration-300 relative overflow-hidden no-underline hover:no-underline [&>svg]:hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-data-[state=open]:opacity-100 transition-opacity" />
        <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground group-data-[state=open]:text-foreground transition-colors text-left flex-1 mr-4">
          {question}
        </span>
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Plus className="w-5 h-5 text-muted-foreground group-data-[state=open]:text-primary group-data-[state=open]:rotate-45 transition-all duration-300 transform origin-center" />
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-card px-6 pb-6 pt-2 border-x border-b border-border group-data-[state=open]:border-primary/20 text-muted-foreground leading-relaxed text-lg">
        <span className="text-primary mr-2">{`>`}</span>
        {children}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default function Faq() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="max-w-5xl mx-auto p-4 py-20 mt-18">
        {/* 🔹 Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(var(--primary),0.3)]  font-medium mb-4">
            NextHire <span className="text-foreground">FAQ</span>
          </h1>
          <p className="text-muted-foreground font-light tracking-wide">
            Everything you need to know about AI resume analysis and mock
            interviews.
          </p>
        </motion.div>

        {/* 🔹 Resume AI */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Resume AI
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <CustomAccordionItem
              value="resume-1"
              question="How does the ATS score work?"
            >
              Our AI evaluates keyword density, formatting, section structure,
              <br />
              and readability to generate a score out of 100
            </CustomAccordionItem>

            <CustomAccordionItem
              value="resume-2"
              question="What file formats are supported?"
            >
              You can upload PDF and DOCX files. Your data is processed <br />
              securely through server-side API routes
            </CustomAccordionItem>

            <CustomAccordionItem
              value="resume-3"
              question="Does the AI rewrite my resume?"
            >
              We provide actionable bullet-point suggestions so you can <br />
              rewrite each section with stronger impact
            </CustomAccordionItem>
          </Accordion>
        </div>

        {/* 🔹 Interview AI */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Interview AI
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <CustomAccordionItem
              value="interview-1"
              question="How does the AI mock interview work?"
            >
              You select a role and difficulty level. The AI generates <br />{" "}
              dynamic questions and adapts based on your responses
            </CustomAccordionItem>

            <CustomAccordionItem
              value="interview-2"
              question="Do I get feedback after each answer?"
            >
              Yes. The AI evaluates correctness, structure, and clarity <br />{" "}
              and gives instant improvement suggestions
            </CustomAccordionItem>

            <CustomAccordionItem
              value="interview-3"
              question="Can I answer using voice input?"
            >
              Yes. Speech-to-text converts your spoken answers into text <br />{" "}
              for real-time evaluation
            </CustomAccordionItem>
          </Accordion>
        </div>

        {/* 🔹 Platform & Pricing */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Platform & Pricing
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <CustomAccordionItem
              value="platform-1"
              question="Is my data secure?"
            >
              All uploads are processed securely via server-side <br /> API
              routes and we never expose API keys
            </CustomAccordionItem>

            <CustomAccordionItem
              value="platform-2"
              question="Is NextHire free?"
            >
              We offer a free tier with limited resume scans and mock <br />
              interviews. Pro unlocks unlimited access
            </CustomAccordionItem>

            <CustomAccordionItem
              value="platform-3"
              question="Can I cancel anytime?"
            >
              Yes. You can upgrade or cancel your subscription at any time
            </CustomAccordionItem>
          </Accordion>
        </div>

        {/* Feedback  */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Feedback & Analytics
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <CustomAccordionItem
              value="feedback-1"
              question="Will I see my improvement over time?"
            >
              Yes. You can track: <br />
              1. Score history <br />
              2. Skill progression <br />
              3. Performance against industry trends
            </CustomAccordionItem>

            <CustomAccordionItem
              value="feedback-2"
              question="Does the AI give model answers?"
            >
              Yes. It shows example high-quality answers so you can learn <br />{" "}
              how to respond better
            </CustomAccordionItem>
          </Accordion>
        </div>

        {/* platform & data security */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Platform & Data Security
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <CustomAccordionItem
              value="security-1"
              question="Is my data secure?"
            >
              Yes. Your data is: <br />
              1.Encrypted in transit and at rest <br />
              2.Never sold or shared without consent <br />
              3.Protected under privacy standards (e.g., GDPR)
            </CustomAccordionItem>

            <CustomAccordionItem
              value="security-2"
              question="Who can see my resume?"
            >
              Only you. Recruiters cannot access your data unless you <br />{" "}
              choose to share it
            </CustomAccordionItem>
          </Accordion>
        </div>

        {/* Pricing & Plans */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Pricing & Plans
          </h2>

          <Accordion type="single" collapsible className="flex flex-col gap-4">
            <CustomAccordionItem value="plans-1" question="Is NextHire free?">
              Yes. The free plan includes: <br />
              1. Limited resume analysis <br />
              2. Cover letter generation <br />
              3. Mock interview questions <br />
              4. Daily usage credits
            </CustomAccordionItem>

            <CustomAccordionItem
              value="plans-2"
              question="What do I get with Pro?"
            >
              Pro typically includes: <br />
              1. Unlimited generations <br />
              2. Priority processing <br />
              3. Advanced feedback <br />
              4. Full Interview simulations
            </CustomAccordionItem>

            <CustomAccordionItem
              value="plans-3"
              question="Can I cancel anytime?"
            >
              Yes. You can upgrade, downgrade, or cancel your subscription{" "}
              <br />
              anytime
            </CustomAccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
