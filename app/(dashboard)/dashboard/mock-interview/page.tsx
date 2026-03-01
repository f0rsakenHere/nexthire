"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  FileTextIcon,
  BriefcaseIcon,
  BuildingIcon,
  ZapIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  RotateCcwIcon,
  MessageSquareIcon,
  SendIcon,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  category: string;
}

interface Review {
  score: number;
  feedback: string;
  improvement: string;
}

function EmptyHero() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Text Interview Status Card */}
      <div className="rounded-none bg-card border border-border/50 shadow-sm p-8 flex flex-col flex-1 items-center justify-center text-center">
        <div className="relative my-10">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full scale-150 animate-pulse" />
          <div className="absolute inset-0 bg-blue-500/10 rounded-full scale-[2] animate-pulse delay-75" />
          <div className="relative size-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <MessageSquareIcon className="size-8 text-white" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-3">
          Ready to practice?
        </h2>
        <p className="text-muted-foreground text-sm max-w-[260px] leading-relaxed">
          Generate tailored questions and the AI will evaluate your written
          responses as an expert interviewer.
        </p>

        <div className="w-full mt-8 pt-6 border-t border-border/50 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Format</span>
            <span className="flex items-center gap-1.5 text-blue-600 font-medium">
              Text-based Q&A
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Questions</span>
            <span className="font-medium text-foreground/80">5 Tailored</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MockInterviewPage() {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepText, setStepText] = useState("");

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [evaluations, setEvaluations] = useState<Review[] | null>(null);

  async function handleGenerate() {
    if (!role.trim()) {
      setError("Please enter a target role.");
      return;
    }
    setError(null);
    setLoading(true);
    setStepText("Generating tailored questions...");

    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate",
          role,
          company,
          jobDescription: jobDesc,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.error ?? "Failed to generate questions");
      setQuestions(data.questions);
      setAnswers({});
      setEvaluations(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleEvaluate() {
    if (!questions) return;

    // Check if all answered
    const allAnswered = questions.every(
      (_, i) => answers[i]?.trim().length > 10,
    );
    if (!allAnswered) {
      setError(
        "Please provide meaningful answers to all questions before submitting.",
      );
      return;
    }

    setError(null);
    setLoading(true);
    setStepText("Evaluating your responses...");

    const qna = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] || "",
    }));

    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "evaluate", role, qna }),
      });
      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.error ?? "Failed to evaluate answers");
      setEvaluations(data.reviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setRole("");
    setCompany("");
    setJobDesc("");
    setQuestions(null);
    setAnswers({});
    setEvaluations(null);
    setError(null);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground min-h-screen">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-border"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground/20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground/80 text-sm">
                    Role-Based Mock Interview
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              AI Interviewer Online
            </span>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-8">
          {/* Page title */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                Interview Practice
              </p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                Mock{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Interviewer
                </span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Practice tailored interview questions and get actionable
                feedback.
              </p>
            </div>
            {(questions || evaluations) && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                <RotateCcwIcon className="size-3" /> New Session
              </button>
            )}
          </div>

          {!questions && (
            <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-start">
              {/* Left — Setup form */}
              <div className="flex flex-col gap-4">
                <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden focus-within:border-primary/40 transition-colors duration-300 p-6 flex flex-col gap-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                        <BriefcaseIcon className="size-3.5 text-primary/70" />
                        Target Role
                      </label>
                      <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Product Designer"
                        className="w-full bg-background border border-border/50 rounded-none px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                        <BuildingIcon className="size-3.5 text-primary/70" />
                        Target Company (Optional)
                      </label>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Google, Airbnb"
                        className="w-full bg-background border border-border/50 rounded-none px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                      <FileTextIcon className="size-3.5 text-primary/70" />
                      Job Description (Optional)
                    </label>
                    <textarea
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      placeholder="Paste the job description to get highly specific questions..."
                      style={{ minHeight: "120px" }}
                      className="w-full bg-background border border-border/50 rounded-none px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                    <div className="mt-3 flex items-start gap-2 px-1">
                      <ZapIcon className="size-3.5 text-blue-500 fill-blue-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <strong className="font-medium text-foreground/80">
                          Pro Tip:
                        </strong>{" "}
                        Providing specific keywords helps the AI tailor the
                        interview questions more effectively.
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm mb-4">
                    <AlertTriangleIcon className="size-4 shrink-0 text-rose-500" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={loading || !role.trim()}
                  className="relative w-full flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-none text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span className="font-medium tracking-wide">
                        {stepText}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="absolute left-6">
                        <ZapIcon className="size-5 fill-white text-white" />
                      </div>
                      Generate Interview Questions
                    </>
                  )}
                </button>
              </div>

              {/* Right — Empty State */}
              <div className="h-full">
                <EmptyHero />
              </div>
            </div>
          )}

          {questions && (
            <div className="flex flex-col gap-6">
              {!evaluations ? (
                <div className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm p-6 lg:p-10 flex flex-col gap-8">
                  <div className="flex items-center justify-between border-b border-border/50 pb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Interview in Progress
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Answer the questions below as if you were in a real
                        interview.
                      </p>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-widest uppercase">
                      {questions.length} Questions
                    </div>
                  </div>

                  {error && !evaluations && (
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-none bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                      <AlertTriangleIcon className="size-4 shrink-0 text-rose-500" />
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col gap-8">
                    {questions.map((q, i) => (
                      <div key={i} className="flex flex-col gap-3">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0 mt-0.5 shadow-sm">
                            {i + 1}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70 mb-1 block">
                              {q.category}
                            </span>
                            <h3 className="text-base md:text-lg font-medium text-foreground leading-snug">
                              {q.question}
                            </h3>
                          </div>
                        </div>
                        <div className="pl-12">
                          <textarea
                            value={answers[i] || ""}
                            onChange={(e) =>
                              setAnswers((prev) => ({
                                ...prev,
                                [i]: e.target.value,
                              }))
                            }
                            placeholder="Type your response here..."
                            className="w-full bg-background border border-border/50 rounded-none px-5 py-4 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none leading-relaxed min-h-[140px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleEvaluate}
                      disabled={loading}
                      className="group flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 rounded-none text-primary-foreground text-sm font-bold shadow-[0_0_30px_oklch(0.62_0.26_278/0.4)] hover:shadow-[0_0_45px_oklch(0.62_0.26_278/0.6)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span className="font-mono text-xs tracking-wide">
                            {stepText}
                          </span>
                        </>
                      ) : (
                        <>
                          <SendIcon className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Submit Responses For Review
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="rounded-none bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-8 flex flex-col items-center text-center">
                    <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircleIcon className="size-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Interview Complete
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                      Great job! The AI has reviewed your responses. Review your
                      personalized feedback below to see where you excelled and
                      what you can improve.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    {questions.map((q, i) => {
                      const review = evaluations[i];

                      let scoreColor =
                        "text-amber-500 bg-amber-50 border-amber-200";
                      if (review.score >= 8)
                        scoreColor =
                          "text-emerald-600 bg-emerald-50 border-emerald-200";
                      else if (review.score <= 4)
                        scoreColor = "text-rose-600 bg-rose-50 border-rose-200";

                      return (
                        <div
                          key={i}
                          className="rounded-none bg-card/50 backdrop-blur-xl border border-border/50 shadow-sm overflow-hidden line-clamp-none"
                        >
                          <div className="p-6 md:p-8 border-b border-border/50 bg-muted/20">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/70 mb-2 flex items-center gap-1.5">
                                  <MessageSquareIcon className="size-3" />{" "}
                                  Question {i + 1} • {q.category}
                                </span>
                                <h3 className="text-lg font-medium text-foreground leading-snug">
                                  {q.question}
                                </h3>
                              </div>
                              <div
                                className={`shrink-0 flex flex-col items-center justify-center size-14 rounded-none border ${scoreColor}`}
                              >
                                <span className="text-xl font-bold leading-none">
                                  {review.score}
                                </span>
                                <span className="text-[9px] font-mono uppercase font-bold mt-0.5">
                                  / 10
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 md:p-8 flex flex-col gap-6">
                            <div>
                              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                                Your Answer
                              </p>
                              <div className="p-4 rounded-none bg-muted/40 text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap font-light italic">
                                &quot;{answers[i]}&quot;
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                                  Feedback
                                </p>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                  {review.feedback}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-3 flex items-center gap-2">
                                  How to Improve
                                </p>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                  {review.improvement}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
