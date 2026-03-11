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
  Frontend: ["All", "JavaScript", "React", "Next.js", "CSS", "HTML"],
  Backend: ["All", "Node.js", "Express", "Python", "Java", "Auth"],
  Database: ["All", "MongoDB", "PostgreSQL", "Redis"],
  Others: ["All", "Git", "System Design", "Security"]
};

//Sample Data
const initialQuestions = [
  // --- FRONTEND QUESTIONS ---
  { 
    id: 1, 
    mainCategory: "Frontend", 
    subCategory: "JavaScript", 
    difficulty: "Medium", 
    question: "How to implement a Debounce function in JavaScript?", 
    answer: "Debouncing limits the rate at which a function gets invoked. It waits for a specific time after the last call.", 
    tags: ["performance", "functions"], 
    followUps: ["Difference between debounce and throttle?", "Use cases for debounce?"], 
    isCoding: true 
  },
  { 
    id: 2, 
    mainCategory: "Frontend", 
    subCategory: "React", 
    difficulty: "Hard", 
    question: "Explain the difference between useMemo and useCallback.", 
    answer: "useMemo returns a memoized value, while useCallback returns a memoized callback function. Both are used for performance optimization to prevent unnecessary re-renders.", 
    tags: ["hooks", "optimization"], 
    followUps: ["When should you NOT use them?", "How does shallow comparison work in React?"], 
    isCoding: true 
  },
  { 
    id: 3, 
    mainCategory: "Frontend", 
    subCategory: "CSS", 
    difficulty: "Easy", 
    question: "Explain the CSS Box Model.", 
    answer: "The CSS box model is a container that contains multiple properties including margins, borders, padding, and the actual content.", 
    tags: ["layout", "basics"], 
    followUps: ["What is box-sizing: border-box?", "Difference between margin and padding?"], 
    isCoding: false 
  },

  // --- BACKEND QUESTIONS ---
  { 
    id: 4, 
    mainCategory: "Backend", 
    subCategory: "Node.js", 
    difficulty: "Hard", 
    question: "How does the Node.js Event Loop work?", 
    answer: "The event loop allows Node.js to perform non-blocking I/O operations despite being single-threaded by offloading tasks to the system kernel whenever possible.", 
    tags: ["architecture", "async"], 
    followUps: ["What are the phases of the event loop?", "What is process.nextTick()?"], 
    isCoding: false 
  },
  { 
    id: 5, 
    mainCategory: "Backend", 
    subCategory: "Auth", 
    difficulty: "Medium", 
    question: "What is the difference between JWT and Session-based authentication?", 
    answer: "Sessions are stored on the server side, while JWT is stateless and stored on the client side (usually in cookies or local storage).", 
    tags: ["security", "auth"], 
    followUps: ["Where is the safest place to store a JWT?", "What is a Refresh Token?"], 
    isCoding: true 
  },

  // --- DATABASE QUESTIONS ---
  { 
    id: 6, 
    mainCategory: "Database", 
    subCategory: "MongoDB", 
    difficulty: "Medium", 
    question: "What is an Index in MongoDB and why is it used?", 
    answer: "Indexes are special data structures that store a small portion of the collection's data set in an easy-to-traverse form to improve query performance.", 
    tags: ["performance", "queries"], 
    followUps: ["What is a Compound Index?", "Does indexing slow down write operations?"], 
    isCoding: false 
  },
  { 
    id: 7, 
    mainCategory: "Database", 
    subCategory: "PostgreSQL", 
    difficulty: "Hard", 
    question: "Explain ACID properties in relational databases.", 
    answer: "ACID stands for Atomicity, Consistency, Isolation, and Durability. It ensures that database transactions are processed reliably.", 
    tags: ["sql", "transactions"], 
    followUps: ["What is the difference between INNER and LEFT JOIN?", "What is a Foreign Key?"], 
    isCoding: true 
  }
];

// 1.Practice modal component editor
function PracticeModal({ question, onClose }: { question: any; onClose: () => void }) {
  const [code, setCode] = useState(`// Problem: ${question.question}\n\nfunction solution() {\n  // Write your code here\n  console.log("Hello NextHire!");\n}\n`);
  const [output, setOutput] = useState("");

  const runCode = () => {
    setOutput("Running...\n> Success: Your code looks good!");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      <div className="h-14 border-b flex items-center justify-between px-6 bg-muted/30">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/10 text-primary">PRACTICE MODE</Badge>
          <h2 className="text-sm font-bold truncate max-w-[300px]">{question.question}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r p-6 overflow-y-auto hidden md:block bg-slate-50/20">
          <h3 className="text-lg font-bold mb-4">Description</h3>
          <p className="text-sm text-muted-foreground mb-6">{question.answer}</p>
          <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Hints</p>
          {question.followUps.map((fu: string, i: number) => (
            <div key={i} className="p-2 border rounded mb-2 text-xs bg-background">{fu}</div>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor height="100%" defaultLanguage="javascript" theme="vs-dark" value={code} onChange={(v) => setCode(v || "")} />
          </div>
          <div className="h-32 border-t bg-zinc-950 text-green-500 p-4 font-mono text-xs overflow-y-auto">
             <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                <span className="text-white/40">CONSOLE OUTPUT</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-6 text-[10px] text-white" onClick={() => setCode("")}><RotateCcw className="h-3 w-3 mr-1" /> Reset</Button>
                  <Button size="sm" className="h-6 text-[10px] bg-green-600 text-white" onClick={runCode}><Play className="h-3 w-3 mr-1" /> Run Code</Button>
                </div>
             </div>
             <pre>{output || "> Ready..."}</pre>
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
    <div className="w-full"> {/* Parent wrapper to ensure independent height */}
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

        <CardHeader className="pb-3">
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
          {/* স্মুথ এবং ইনডিপেন্ডেন্ট রিভিল এনিমেশন */}
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
            className="flex-1 text-xs h-9 font-bold transition-all" 
            onClick={() => setShow(!show)}
          >
            {show ? "Hide Solution" : "View Solution"}
          </Button>
          
          <Button 
            variant="outline"
            className="h-9 px-4 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all"
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

  const filtered = useMemo(() => {
    return initialQuestions.filter((q) => {
      const matchesMain = q.mainCategory === activeMain;
      const matchesSub = activeSub === "All" || q.subCategory === activeSub;
      const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
      return matchesMain && matchesSub && matchesSearch;
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
            {filtered.map((q) => (
              <QuestionCard key={q.id} q={q} />
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}