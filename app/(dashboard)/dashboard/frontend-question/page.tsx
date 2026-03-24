"use client";

import { useState, useMemo, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  SearchIcon,
  Code2,
  X,
  Play,
  CheckCircle2,
  ChevronUp,
  Zap,
  Database,
  Globe,
  Wrench,
  Server,
  BookMarked,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Question {
  _id?: string;
  id?: number;
  category?: string;
  subCategory?: string;
  mainCategory?: string;
  difficulty: string;
  question: string;
  answer: string;
  tags?: string[];
  followUps?: string[];
  isCoding?: boolean;
  initialCode?: string;
  solutionCode?: string;
  hints?: string[];
}

// ── Category Map ───────────────────────────────────────────────────────────────
const CATEGORY_MAP = {
  Frontend: ["All", "HTML", "CSS", "JavaScript", "React", "Next.js"],
  Backend: ["All", "Node.js", "Express", "API Design", "Authentication"],
  Database: ["All", "MongoDB", "PostgreSQL", "SQL", "NoSQL"],
  Tools: ["All", "Git", "Docker"],
  System: ["All", "System Design", "Scalability", "Security"],
};

const CATEGORY_ICONS = {
  Frontend: Globe,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  System: Zap,
};

// ── 1. Practice Modal ──────────────────────────────────────────────────────────
function PracticeModal({
  question,
  onClose,
}: {
  question: Question;
  onClose: () => void;
}) {
  const [showFullSolution, setShowFullSolution] = useState(false);
  const [code, setCode] = useState(
    question.initialCode || `// Write your code here...\n`,
  );
  const [output, setOutput] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleToggleSolution = () => {
    if (!showFullSolution) {
      setShowFullSolution(true);
      setCode(question.solutionCode || "// Complete solution code not found\n");
    } else {
      setShowFullSolution(false);
      setCode(question.initialCode || `// Write your code here...\n`);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setHasError(false);

    const lines: string[] = [];

    // Intercept console methods
    const origLog = console.log;
    const origWarn = console.warn;
    const origError = console.error;
    const origInfo = console.info;

    const fmt = (args: unknown[]) =>
      args
        .map((a) =>
          typeof a === "object" ? JSON.stringify(a, null, 2) : String(a),
        )
        .join(" ");

    console.log = (...args) => {
      lines.push(`> ${fmt(args)}`);
      origLog(...args);
    };
    console.warn = (...args) => {
      lines.push(`⚠ ${fmt(args)}`);
      origWarn(...args);
    };
    console.error = (...args) => {
      lines.push(`✖ ${fmt(args)}`);
      origError(...args);
    };
    console.info = (...args) => {
      lines.push(`ℹ ${fmt(args)}`);
      origInfo(...args);
    };

    try {
      const fn = new Function(code);
      fn();
      if (lines.length === 0) {
        lines.push("> Code ran successfully — no output.");
      }
      setHasError(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      lines.push(`✖ ${msg}`);
      setHasError(true);
    } finally {
      // Restore console
      console.log = origLog;
      console.warn = origWarn;
      console.error = origError;
      console.info = origInfo;
      setOutput(lines.join("\n"));
      setIsRunning(false);
    }
  };

  const lineCount = code.split("\n").length;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="h-12 shrink-0 border-b border-border flex items-center justify-between px-5 bg-background">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20">
            <Code2 className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
              Practice Mode
            </span>
          </div>
          <span className="text-border">|</span>
          <h2 className="text-sm font-medium truncate text-foreground/80">
            {question.question}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer size-8 flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-[300px] shrink-0 border-r border-border flex flex-col overflow-hidden bg-muted/20">
          {/* Task description */}
          <div className="px-5 pt-5 pb-4 border-b border-border/60">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-3">
              Task Description
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {question.isCoding
                ? question.answer
                : `Demonstrate "${question.question}" through working code. Write a clear, functional example that illustrates the concept.`}
            </p>
          </div>

          {/* Hints */}
          <div className="px-5 py-4 flex-1 overflow-y-auto no-scrollbar">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Helpful Hints
            </p>
            <div className="flex flex-col gap-2">
              {(
                question.hints || [
                  "Think about the core concept",
                  "Start simple, then refine",
                ]
              ).map((hint: string, i: number) => (
                <div
                  key={i}
                  className="p-3 border border-amber-200 bg-amber-50/70 text-xs text-amber-800 flex gap-2 items-start"
                >
                  <span className="shrink-0 mt-0.5">💡</span>
                  <span className="leading-relaxed">{hint}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution toggle */}
          <div className="px-5 py-4 border-t border-border/60">
            <button
              onClick={handleToggleSolution}
              className={`cursor-pointer w-full h-9 flex items-center justify-center gap-2 text-xs font-semibold border transition-colors ${
                showFullSolution
                  ? "bg-muted border-border text-foreground hover:bg-muted/80"
                  : "bg-background border-dashed border-border/80 text-muted-foreground hover:text-primary hover:border-primary/40"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              {showFullSolution
                ? "Hide Solution & Clear"
                : "Stuck? See Solution"}
            </button>
          </div>
        </div>

        {/* Code editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="h-9 shrink-0 bg-[#1e1e1e] border-b border-white/10 flex items-center gap-0">
            <div className="flex items-center gap-1.5 px-4 h-full border-b-2 border-primary bg-[#252526]">
              <Code2 className="h-3 w-3 text-white/40" />
              <span className="text-[11px] text-white/60 font-mono">
                solution.js
              </span>
            </div>
            <div className="flex-1" />
            {showFullSolution && (
              <span className="text-[10px] font-mono text-amber-400/60 uppercase tracking-widest pr-4">
                Solution View
              </span>
            )}
          </div>

          {/* Editor with line numbers */}
          <div className="flex flex-1 overflow-hidden bg-[#1e1e1e]">
            <div
              className="w-12 shrink-0 pt-4 flex flex-col items-end pr-3 select-none pointer-events-none overflow-hidden"
              aria-hidden
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className="font-mono text-[12px] text-white/20 h-[22px] flex items-center justify-end"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent text-[#d4d4d4] font-mono text-[13px] pt-4 pr-4 pb-4 pl-0 resize-none outline-none overflow-y-auto no-scrollbar"
              style={{ lineHeight: "22px" }}
            />
          </div>

          {/* Console */}
          <div className="h-36 shrink-0 border-t border-white/10 bg-[#141414] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  Console
                </span>
                {output && (
                  <button
                    onClick={() => {
                      setOutput("");
                      setHasError(false);
                    }}
                    className="cursor-pointer text-[10px] font-mono text-white/25 hover:text-white/60 transition-colors"
                  >
                    clear
                  </button>
                )}
              </div>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="cursor-pointer flex items-center gap-1.5 h-7 px-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold font-mono transition-colors"
              >
                <Play className="h-3 w-3" />
                {isRunning ? "Running..." : "Run"}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
              <pre
                className={`font-mono text-[12px] leading-relaxed whitespace-pre-wrap ${
                  !output
                    ? "text-white/20"
                    : hasError
                      ? "text-rose-400"
                      : "text-emerald-400"
                }`}
              >
                {output || "> Ready to run..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. Difficulty config ───────────────────────────────────────────────────────
function getDifficultyConfig(difficulty: string) {
  if (difficulty === "Hard")
    return {
      label: "Hard",
      classes: "text-rose-600 bg-rose-50 border-rose-200",
      dot: "bg-rose-500",
      glow: "shadow-rose-100",
    };
  if (difficulty === "Medium")
    return {
      label: "Medium",
      classes: "text-amber-600 bg-amber-50 border-amber-200",
      dot: "bg-amber-400",
      glow: "shadow-amber-100",
    };
  return {
    label: "Easy",
    classes: "text-emerald-600 bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
    glow: "shadow-emerald-100",
  };
}

// ── 3. Question Card ───────────────────────────────────────────────────────────
function QuestionCard({ q }: { q: Question }) {
  const [show, setShow] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const diff = getDifficultyConfig(q.difficulty);

  return (
    <div className="w-full">
      <Card
        className={`relative overflow-hidden border ${
          isCompleted
            ? "border-emerald-200 bg-gradient-to-br from-emerald-50/40 to-background shadow-sm"
            : "border-border/60 bg-card"
        }`}
      >
        {/* Top accent line — static for completed only */}
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 ${
            isCompleted
              ? "bg-gradient-to-r from-emerald-400 to-teal-400"
              : "bg-transparent"
          }`}
        />

        {/* Completed toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            className={`p-1.5 rounded-full border transition-all duration-200 ${
              isCompleted
                ? "bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-200"
                : "bg-background border-border text-muted-foreground hover:border-emerald-400 hover:text-emerald-500"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <CardHeader className="pb-3 pt-5 px-5 min-h-[88px] flex flex-col justify-start">
          <div className="flex gap-2 mb-2.5 flex-wrap items-center">
            {(q.subCategory || q.category) && (
              <Badge
                variant="secondary"
                className="text-[10px] font-bold uppercase px-2 py-0 tracking-wider bg-muted/80 border border-border/60 rounded-none"
              >
                {q.subCategory || q.category}
              </Badge>
            )}
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-none border ${diff.classes}`}
            >
              <span className={`size-1.5 rounded-full ${diff.dot}`} />
              {diff.label}
            </span>
          </div>
          <h3 className="font-semibold text-[15px] leading-snug pr-8 text-foreground">
            {q.question}
          </h3>
        </CardHeader>

        <CardContent className="pb-4 px-5">
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              show
                ? "grid-rows-[1fr] opacity-100 mt-1"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-4 rounded-xl bg-muted/40 border border-border/50 text-sm leading-relaxed mt-1">
                <span className="font-bold text-primary text-xs uppercase tracking-wider block mb-2">
                  Answer
                </span>
                <p className="text-foreground/80">{q.answer}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 px-4 pb-4 pt-3">
          <Button
            variant={show ? "secondary" : "default"}
            className={`flex-1 text-xs h-9 font-semibold rounded-none cursor-pointer transition-all duration-200 ${
              show
                ? "bg-muted hover:bg-muted/80 text-foreground"
                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
            }`}
            onClick={() => setShow(!show)}
          >
            {show ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1.5" />
                Hide Answer
              </>
            ) : (
              <>
                <BookMarked className="h-3.5 w-3.5 mr-1.5" />
                View Answer
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="h-9 px-4 rounded-none cursor-pointer border-primary/25 text-primary hover:bg-primary/5 hover:border-primary/50 gap-1.5 transition-all duration-200 font-semibold text-xs"
            onClick={() => setIsPracticeOpen(true)}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Practice</span>
          </Button>
        </CardFooter>
      </Card>

      {isPracticeOpen && (
        <PracticeModal question={q} onClose={() => setIsPracticeOpen(false)} />
      )}
    </div>
  );
}

// ── 4. Difficulty sort order ──────────────────────────────────────────────────
const DIFFICULTY_ORDER: Record<string, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

// ── 5. Main Page ───────────────────────────────────────────────────────────────
export default function FrontendQuestionPage() {
  const [search, setSearch] = useState("");
  const [activeMain, setActiveMain] =
    useState<keyof typeof CATEGORY_MAP>("Frontend");
  const [activeSub, setActiveSub] = useState("All");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/practice_question");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const filteredAndSorted = useMemo(() => {
    const matches = questions.filter((q) => {
      const matchesMain = q.mainCategory === activeMain;
      const matchesSub = activeSub === "All" || q.subCategory === activeSub;
      const matchesSearch = q.question
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesMain && matchesSub && matchesSearch;
    });
    return matches.sort(
      (a, b) =>
        (DIFFICULTY_ORDER[a.difficulty] || 0) -
        (DIFFICULTY_ORDER[b.difficulty] || 0),
    );
  }, [questions, activeMain, activeSub, search]);

  const totalCount = filteredAndSorted.length;
  const easyCnt = filteredAndSorted.filter(
    (q) => q.difficulty === "Easy",
  ).length;
  const medCnt = filteredAndSorted.filter(
    (q) => q.difficulty === "Medium",
  ).length;
  const hardCnt = filteredAndSorted.filter(
    (q) => q.difficulty === "Hard",
  ).length;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background text-foreground min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-xl">
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
                    Full Stack Coach
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-6 lg:p-8 flex flex-col gap-6 no-scrollbar">
          {/* ── Hero Section ─────────────────────────────────────────────── */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">
                Interview Practice
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Full Stack Interview{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Questions
                </span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Curated Frontend &amp; Backend questions: React, Node.js,
                Express, MongoDB, and more.
              </p>
            </div>

            {/* Stat pills */}
            {!loading && totalCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-muted/60 border border-border/50 text-xs font-medium text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {totalCount}
                  </span>{" "}
                  questions
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {easyCnt} Easy
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700">
                  <span className="size-1.5 rounded-full bg-amber-400" />
                  {medCnt} Medium
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                  <span className="size-1.5 rounded-full bg-rose-500" />
                  {hardCnt} Hard
                </div>
              </div>
            )}
          </div>

          {/* ── Main category tabs ──────────────────────────────────────── */}
          <div className="flex border-b border-border/50 mb-6 overflow-x-auto gap-1 no-scrollbar">
            {(
              Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>
            ).map((main) => {
              const Icon = CATEGORY_ICONS[main];
              const isActive = activeMain === main;
              return (
                <button
                  key={main}
                  onClick={() => {
                    setActiveMain(main);
                    setActiveSub("All");
                  }}
                  className={`relative flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all whitespace-nowrap border-b-2 -mb-px ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground/60"}`}
                  />
                  {main}
                </button>
              );
            })}
          </div>

          {/* ── Sub-category pills + Search row ─────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_MAP[activeMain].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(sub)}
                  className={`inline-flex items-center px-4 h-8 rounded-none text-xs font-semibold border transition-all duration-200 ${
                    activeSub === sub
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-muted-foreground border-border/60 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search concepts..."
                className="pl-9 h-9 rounded-none border-border/60 bg-muted/30 text-sm focus-visible:ring-primary/30 focus-visible:border-primary/40 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* ── Question grid ────────────────────────────────────────────── */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-52 rounded-xl bg-muted/40 border border-border/40 animate-pulse"
                />
              ))}
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 mb-4">
                <SearchIcon className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <p className="font-semibold text-foreground/70">
                No questions found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Try a different category or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAndSorted.map((q) => (
                <QuestionCard key={q._id ?? q.id} q={q} />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
