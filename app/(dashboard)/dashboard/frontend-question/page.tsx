"use client";

import { useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { AppSidebar } from "@/components/app-sidebar";
import { 
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, 
  BreadcrumbPage, BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  ChevronDownIcon, ChevronUpIcon, SearchIcon, Code2, 
  X, Play, RotateCcw, BookOpen, 
  CheckCircle2
} from "lucide-react";

// --- ক্যাটাগরি ম্যাপ ---
const CATEGORY_MAP = {
  Frontend: ["All", "HTML","CSS","JavaScript", "React", "Next.js"],
  Backend: ["All", "Node.js", "Express", "API Design", "Authentication"],
Database: ["All", "MongoDB", "PostgreSQL", "SQL", "NoSQL"],
Tools: ["All", "Git", "Docker"],
System: ["All", "System Design", "Scalability", "Security"]

};

//Sample Data
const initialQuestions = [
  // --- FRONTEND QUESTIONS ---

  // { 
  //   id: 2, 
  //   mainCategory: "Frontend", 
  //   subCategory: "React", 
  //   difficulty: "Hard", 
  //   question: "Explain the difference between useMemo and useCallback.", 
  //   answer: "useMemo returns a memoized value, while useCallback returns a memoized callback function. Both are used for performance optimization to prevent unnecessary re-renders.", 
  //   tags: ["hooks", "optimization"], 
  //   followUps: ["When should you NOT use them?", "How does shallow comparison work in React?"],
  //   isCoding: true,
  //     hints: ["Use a timer variable", "Return a new function"],
  // solutionCode: "function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}",
  // initialCode: "function debounce(fn, delay) {\n  // Start coding...\n}"
     
  // }, 
  
{ id:1,
  mainCategory: "Frontend",
  subCategory: "React",
  difficulty: "Hard",

  question: "Explain the difference between useMemo and useCallback.",

  answer: "useMemo returns a memoized value while useCallback returns a memoized function. Both are used for performance optimization to prevent unnecessary re-renders in React components.",

  tags: ["react","hooks","performance"],

  followUps: [
    "When should you NOT use useMemo?",
    "How does React dependency array work?"
  ],
    title: "Implement a Debounce Function",
    description: "Write a debounce function that delays the execution of a function until after a specified delay.",

    hints: [
      "Use setTimeout",
      "Clear the previous timeout"
    ],

    initialCode: "function debounce(fn, delay) {\n // start coding\n}",

    solutionCode: "function debounce(fn, delay) {\n let timer;\n return function(...args){\n clearTimeout(timer);\n timer = setTimeout(()=>fn.apply(this,args),delay);\n }\n}"
  }



];

// 1.Practice modal component editor
function PracticeModal({ question, onClose }: { question: any; onClose: () => void }) {
  const [showFullSolution, setShowFullSolution] = useState(false);
  
  const [code, setCode] = useState(question.initialCode || `// Write your code here...`);
  const [output, setOutput] = useState("");

  // Hide and revealed solution
  const handleToggleSolution = () => {
    if (!showFullSolution) {

      setShowFullSolution(true);
      setCode(question.solutionCode || "// Complete solution code not found");
    } else {
      
      setShowFullSolution(false);
      setCode(question.initialCode || `// Write your code here...`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      
      <div className="h-14 border-b flex items-center justify-between px-6 bg-muted/30">
        <div className="flex items-center gap-3">
          <Badge className="bg-indigo-100 text-indigo-700">PRACTICE MODE</Badge>
          <h2 className="text-sm font-bold truncate max-w-[400px]">{question.question}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Description, Hints & Toggle Button */}
        <div className="w-1/3 border-r p-6 overflow-y-auto bg-slate-50/50">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Task Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.isCoding ? question.answer : `Task: Demonstrate "${question.question}" through code.`}
            </p>
          </div>
          
          {/* Real Hints Section */}
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Helpful Hints</h4>
            {(question.hints || ["Think about the core concept", "Check for syntax errors"]).map((hint: string, i: number) => (
              <div key={i} className="p-3 rounded-lg border border-amber-200 bg-amber-50 text-xs text-amber-800 flex gap-2">
                <span className="font-bold">💡</span> {hint}
              </div>
            ))}
          </div>

          {/* Toggle View Solution Button */}
          <div className="mt-auto">
            <Button 
              variant={showFullSolution ? "secondary" : "outline"} 
              className={`w-full border-dashed transition-all ${showFullSolution ? 'bg-slate-200' : 'border-primary/50 text-primary hover:bg-primary/5'}`}
              onClick={handleToggleSolution}
            >
              <Code2 className="mr-2 h-4 w-4" /> 
              {showFullSolution ? "Hide Solution & Clear" : "Stuck? See Solution"}
            </Button>
          </div>
        </div>

        {/* Right Side: Monaco Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor 
              height="100%" 
              defaultLanguage="javascript" 
              theme="vs-dark" 
              value={code} 
              onChange={(v) => setCode(v || "")}
              options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
          </div>
          
          {/* Console Area */}
          <div className="h-40 border-t bg-[#1e1e1e] p-4 font-mono text-xs overflow-y-auto">
             <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                <span className="text-white/40 uppercase tracking-tighter">Console Output</span>
                <Button size="sm" className="h-7 bg-green-600 hover:bg-green-700 text-white" onClick={() => setOutput("> Execution Successful!")}>
                  <Play className="h-3 w-3 mr-2" /> Run Code
                </Button>
             </div>
             <pre className="text-green-400">{output || "> Ready to test..."}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

//2.Question Card Component
function QuestionCard({ q }: { q: any }) {
  const [show, setShow] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);

  return (
    <div className="w-full"> 
      <Card 
        className={`relative overflow-hidden transition-all duration-300 border-l-4 shadow-sm hover:shadow-md ${
          isCompleted 
            ? "border-l-emerald-500 bg-emerald-50/20" 
            : "border-l-transparent hover:border-l-primary"
        }`}
      >
        {/* Completion Checkmark */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={() => setIsCompleted(!isCompleted)}
            className={`p-1.5 rounded-full border transition-all ${
              isCompleted 
                ? "bg-emerald-500 border-emerald-500 text-white" 
                : "bg-background text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <CardHeader className="pb-3 min-h-[90px] flex flex-col justify-start">
          <div className="flex gap-2 mb-2">
            <Badge variant="secondary" className="text-[10px] font-bold uppercase px-2 py-0">
              {q.subCategory}
            </Badge>
            <Badge 
              variant="outline" 
              className={`text-[10px] font-bold px-2 py-0 ${
                q.difficulty === 'Hard' ? 'text-rose-600 bg-rose-50' : 
                q.difficulty === 'Medium' ? 'text-amber-600 bg-amber-50' : 
                'text-emerald-600 bg-emerald-50'
              }`}
            >
              {q.difficulty}
            </Badge>
          </div>
          <h3 className="font-bold text-base leading-snug pr-10">
            {q.question}
          </h3>
        </CardHeader>

        <CardContent className="pb-4">
          {/* smooth animation */}
          <div 
            className={`grid transition-all duration-300 ease-in-out ${
              show ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border text-sm leading-relaxed">
                <span className="font-bold text-primary block mb-1">Answer:</span>
                {q.answer}
              </div>
              
              {q.followUps?.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Follow-up</p>
                  <div className="flex flex-wrap gap-1.5">
                    {q.followUps.map((fu: string, i: number) => (
                      <span key={i} className="text-[11px] bg-background border px-2 py-1 rounded-md text-slate-500">
                        {fu}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 p-4 pt-0">
          <Button 
            variant={show ? "secondary" : "default"} 
            className="flex-1 text-xs h-9 font-bold transition-all rounded-full" 
            onClick={() => setShow(!show)}
          >
            {show ?"Hide Answer" : "View Answer"}
          </Button>
          
          <Button 
            variant="outline"
            className="h-9 px-4 border-primary/30 text-primary hover:bg-gray-600  transition-all rounded-full"
            onClick={() => setIsPracticeOpen(true)}
          >
            <Code2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline text-xs font-bold">Practice</span>
          </Button>
        </CardFooter>
      </Card>

      {isPracticeOpen && (
        <PracticeModal question={q} onClose={() => setIsPracticeOpen(false)} />
      )}
    </div>
  );
}

//3.Main Page Component
export default function FullStackQuestionPage() {
  const [search, setSearch] = useState("");
  const [activeMain, setActiveMain] = useState<keyof typeof CATEGORY_MAP>("Frontend");
  const [activeSub, setActiveSub] = useState("All");
 

const difficultyOrder: Record<string, number> = { 
  "Easy": 1, 
  "Medium": 2, 
  "Hard": 3 
};

const filteredAndSorted = useMemo(() => {
  // 1.Filtering Part
  const matches = initialQuestions.filter((q) => {
    const matchesMain = q.mainCategory === activeMain;
    const matchesSub = activeSub === "All" || q.subCategory === activeSub;
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    return matchesMain && matchesSub && matchesSearch;
  });

  //2.Sorting Part (Easy -> Medium -> Hard)
  return matches.sort((a, b) => {
    return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
  });
}, [activeMain, activeSub, search]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-6 border-b sticky top-0 bg-background z-20">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Full Stack Coach</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="p-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Full Stack Interview Hub</h1>
            <p className="text-muted-foreground text-sm">Practice questions by track and category.</p>
          </div>

          {/* Main Category Tabs */}
          <div className="flex border-b mb-6 overflow-x-auto">
            {(Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>).map((main) => (
              <button
                key={main}
                onClick={() => { setActiveMain(main); setActiveSub("All"); }}
                className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
                  activeMain === main ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                }`}
              >
                {main}
              </button>
            ))}
          </div>

          {/* Sub-Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORY_MAP[activeMain].map((sub) => (
              <Button
                key={sub}
                variant={activeSub === sub ? "default" : "outline"}
                size="sm"
                className="rounded-full px-5 h-8 text-xs"
                onClick={() => setActiveSub(sub)}
              >
                {sub}
              </Button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-sm mb-8">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search concepts..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((q) => (
              <QuestionCard key={q.id} q={q} />
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}