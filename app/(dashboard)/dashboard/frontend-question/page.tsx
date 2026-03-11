"use client";

import { useState, useMemo, useEffect } from "react"; 
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
  SearchIcon, Code2, X, Play, BookOpen, CheckCircle2
} from "lucide-react";

// Category Map
const CATEGORY_MAP = {
  Frontend: ["All", "HTML","CSS","JavaScript", "React", "Next.js"],
  Backend: ["All", "Node.js", "Express", "API Design", "Authentication"],
  Database: ["All", "MongoDB", "PostgreSQL", "SQL", "NoSQL"],
  Tools: ["All", "Git", "Docker"],
  System: ["All", "System Design", "Scalability", "Security"]
};

// 1. Practice modal component editor (একই থাকছে)
function PracticeModal({ question, onClose }: { question: any; onClose: () => void }) {
  const [showFullSolution, setShowFullSolution] = useState(false);
  const [code, setCode] = useState(question.initialCode || `// Write your code here...`);
  const [output, setOutput] = useState("");

  // React
  {
    id: 9,
    category: "React",
    difficulty: "Medium",
    question: "What is the Virtual DOM?",
    answer:
      "The Virtual DOM is an in-memory representation of the real DOM. React diffs the new virtual tree against the previous one and applies only the minimal set of real DOM updates needed.",
    tags: ["virtual-dom", "rendering"],
    followUps: ["How does React reconciliation work?"],
  },
  {
    id: 10,
    category: "React",
    difficulty: "Easy",
    question: "What are React hooks?",
    answer:
      "Hooks let you use state and lifecycle features in functional components. Core hooks include useState, useEffect, useContext, useRef, useMemo, and useCallback.",
    tags: ["hooks"],
    followUps: ["What are the rules of hooks?"],
  },
  {
    id: 11,
    category: "React",
    difficulty: "Medium",
    question: "Difference between useState and useReducer?",
    answer:
      "useState is ideal for simple, independent state values. useReducer is better for complex state with multiple sub-values or when next state depends on the previous one in non-trivial ways.",
    tags: ["state", "hooks"],
    followUps: ["When would you migrate from useState to useReducer?"],
  },
  {
    id: 12,
    category: "React",
    difficulty: "Easy",
    question: "What is prop drilling?",
    answer:
      "Prop drilling is passing data through multiple component layers via props, even though intermediate components don't need it. It makes code harder to maintain.",
    tags: ["props", "architecture"],
    followUps: ["How can you avoid prop drilling?"],
  },
  {
    id: 13,
    category: "React",
    difficulty: "Medium",
    question: "What is the Context API?",
    answer:
      "Context API provides a way to share values across the component tree without explicit prop passing. It consists of React.createContext, a Provider, and the useContext hook.",
    tags: ["context", "state"],
    followUps: [
      "When should you not use Context?",
      "How does Context compare to Redux?",
    ],
  },
  {
    id: 14,
    category: "React",
    difficulty: "Medium",
    question: "What is React.memo?",
    answer:
      "React.memo is a HOC that prevents a functional component from re-rendering if its props haven't changed, using shallow comparison.",
    tags: ["performance", "memoization"],
    followUps: ["What is the difference between React.memo and useMemo?"],
  },
  {
    id: 15,
    category: "React",
    difficulty: "Medium",
    question: "What is useEffect used for?",
    answer:
      "useEffect runs side effects after render — data fetching, subscriptions, or manual DOM manipulation. The dependency array controls when it re-runs.",
    tags: ["hooks", "lifecycle"],
    followUps: [
      "How do you clean up a useEffect?",
      "What happens with an empty dependency array?",
    ],
  },

  // CSS
  {
    id: 16,
    category: "CSS",
    difficulty: "Easy",
    question: "What is the CSS box model?",
    answer:
      "Every element is a rectangular box composed of content, padding, border, and margin. box-sizing: border-box includes padding and border in the element's total width.",
    tags: ["box-model", "layout"],
    followUps: ["What does box-sizing: border-box change?"],
  },
  {
    id: 17,
    category: "CSS",
    difficulty: "Easy",
    question: "Difference between display:none and visibility:hidden?",
    answer:
      "display:none removes the element from the document flow entirely. visibility:hidden hides it but the space it occupied remains.",
    tags: ["display", "layout"],
    followUps: ["Which one affects accessibility?"],
  },
  {
    id: 18,
    category: "CSS",
    difficulty: "Medium",
    question: "What is Flexbox and when do you use it?",
    answer:
      "Flexbox is a one-dimensional layout model for distributing space along a row or column. Use it for navigation bars, card rows, or centering elements.",
    tags: ["flexbox", "layout"],
    followUps: ["What is the difference between Flexbox and CSS Grid?"],
  },
  {
    id: 19,
    category: "CSS",
    difficulty: "Medium",
    question: "What is CSS specificity?",
    answer:
      "Specificity is a weight assigned to CSS selectors that determines which rule applies. Order (lowest to highest): element < class < ID < inline styles < !important.",
    tags: ["specificity", "selectors"],
    followUps: ["Which selector has the highest specificity?"],
  },
  {
    id: 20,
    category: "CSS",
    difficulty: "Easy",
    question: "What is responsive design?",
    answer:
      "Responsive design adapts layout and content to different viewport sizes using fluid grids, flexible images, and CSS media queries.",
    tags: ["responsive", "media-queries"],
    followUps: ["What are CSS breakpoints?"],
  },

  // HTML
  {
    id: 21,
    category: "HTML",
    difficulty: "Easy",
    question: "What are semantic HTML elements?",
    answer:
      "Semantic elements clearly describe their purpose to both the browser and developer — e.g. <header>, <nav>, <main>, <article>, <footer>. They improve accessibility and SEO.",
    tags: ["semantic", "accessibility"],
    followUps: ["Why are semantic elements important for SEO?"],
  },
  {
    id: 22,
    category: "HTML",
    difficulty: "Easy",
    question: "Difference between <div> and <span>?",
    answer:
      "<div> is a block-level container, taking full width. <span> is an inline container for text or inline elements. Neither has semantic meaning.",
    tags: ["elements"],
    followUps: ["Can span be styled as block?"],
  },
  {
    id: 23,
    category: "HTML",
    difficulty: "Medium",
    question: "What is web accessibility (a11y)?",
    answer:
      "Accessibility means making web apps usable by people with disabilities. This includes proper use of ARIA roles, keyboard navigation, color contrast, and alt text.",
    tags: ["accessibility", "aria"],
    followUps: ["What is ARIA and when should you use it?"],
  },

  // Browser
  {
    id: 24,
    category: "Browser",
    difficulty: "Medium",
    question: "What is CORS?",
    answer:
      "Cross-Origin Resource Sharing is a browser security mechanism that restricts HTTP requests made from one origin to a different origin. Servers must explicitly allow cross-origin requests via response headers.",
    tags: ["cors", "security", "http"],
    followUps: ["How do you fix a CORS error?", "What is a preflight request?"],
  },
  {
    id: 25,
    category: "Browser",
    difficulty: "Easy",
    question: "Difference between localStorage and sessionStorage?",
    answer:
      "Both are Web Storage APIs. localStorage persists data with no expiry across sessions. sessionStorage stores data only for the duration of the browser tab.",
    tags: ["storage", "web-api"],
    followUps: ["Is localStorage secure for sensitive data?"],
  },

  // Performance
  {
    id: 26,
    category: "Performance",
    difficulty: "Medium",
    question: "How do you improve frontend performance?",
    answer:
      "Key techniques: code splitting, lazy loading, image optimization, memoization, avoiding layout thrashing, using a CDN, and reducing bundle size with tree shaking.",
    tags: ["performance", "optimization"],
    followUps: ["What is lazy loading?", "What is tree shaking?"],
  },
  {
    id: 27,
    category: "Performance",
    difficulty: "Medium",
    question: "What causes unnecessary re-renders in React?",
    answer:
      "Re-renders occur when state or props change. Unnecessary ones happen when parent re-renders pass new object/function references to children. Fix with React.memo, useMemo, and useCallback.",
    tags: ["react", "performance", "rendering"],
    followUps: ["How does useCallback help prevent re-renders?"],
  },

  // Git
  {
    id: 28,
    category: "Git",
    difficulty: "Easy",
    question: "Difference between git merge and git rebase?",
    answer:
      "git merge creates a merge commit, preserving full history. git rebase rewrites commits onto the target branch for a linear history. Rebasing makes history cleaner but should not be used on shared branches.",
    tags: ["git", "version-control"],
    followUps: ["When is rebasing dangerous?"],
  },
  {
    id: 29,
    category: "Git",
    difficulty: "Easy",
    question: "What is git stash?",
    answer:
      "git stash temporarily shelves uncommitted changes so you can switch context without committing. Use git stash pop to reapply the latest stash.",
    tags: ["git"],
    followUps: ["How do you name a stash?"],
  },

  // Security
  {
    id: 30,
    category: "Security",
    difficulty: "Medium",
    question: "What is XSS and how do you prevent it?",
    answer:
      "Cross-Site Scripting (XSS) is an attack where malicious scripts are injected into pages viewed by other users. Prevent it by sanitizing user input, using Content Security Policy headers, and avoiding dangerouslySetInnerHTML in React.",
    tags: ["security", "xss"],
    followUps: ["What is the difference between stored and reflected XSS?"],
  },

  // Testing
  {
    id: 31,
    category: "Testing",
    difficulty: "Medium",
    question: "What is unit testing in frontend?",
    answer:
      "Unit testing verifies individual functions or components in isolation. Popular tools include Jest for test running and assertions, and React Testing Library for component behavior testing.",
    tags: ["testing", "jest"],
    followUps: ["What is the difference between unit and integration tests?"],
  },
];

const CATEGORIES = [
  "All",
  "JavaScript",
  "React",
  "CSS",
  "HTML",
  "Browser",
  "Performance",
  "Git",
  "Security",
  "Testing",
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-emerald-500 text-white",
  Medium: "bg-orange-500 text-white",
  Hard: "bg-red-600 text-white",
};

const CATEGORY_COLORS: Record<string, string> = {
  JavaScript: "bg-blue-600 text-white",
  React: "bg-cyan-600 text-white",
  CSS: "bg-purple-600 text-white",
  HTML: "bg-orange-500 text-white",
  Browser: "bg-indigo-600 text-white",
  Performance: "bg-pink-600 text-white",
  Git: "bg-zinc-600 text-white",
  Security: "bg-red-700 text-white",
  Testing: "bg-teal-600 text-white",
};

function QuestionCard({ q, index }: { q: Question; index: number }) {
  const [open, setOpen] = useState(false);

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
        <div className="w-1/3 border-r p-6 overflow-y-auto bg-slate-50/50">
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Task Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.isCoding ? question.answer : `Task: Demonstrate "${question.question}" through code.`}
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Helpful Hints</h4>
            {(question.hints || ["Think about the core concept"]).map((hint: string, i: number) => (
              <div key={i} className="p-3 rounded-lg border border-amber-200 bg-amber-50 text-xs text-amber-800 flex gap-2">
                <span className="font-bold">💡</span> {hint}
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <Button 
              variant={showFullSolution ? "secondary" : "outline"} 
              className="w-full border-dashed"
              onClick={handleToggleSolution}
            >
              <Code2 className="mr-2 h-4 w-4" /> 
              {showFullSolution ? "Hide Solution & Clear" : "Stuck? See Solution"}
            </Button>
          </div>
        </div>

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

export default function FrontendQuestionPage() {
  const [search, setSearch] = useState("");
  const [activeMain, setActiveMain] = useState<keyof typeof CATEGORY_MAP>("Frontend");
  const [activeSub, setActiveSub] = useState("All");

 //
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

  const difficultyOrder: Record<string, number> = { 
    "Easy": 1, 
    "Medium": 2, 
    "Hard": 3 
  };

  const filteredAndSorted = useMemo(() => {
    const matches = questions.filter((q) => {
      const matchesMain = q.mainCategory === activeMain;
      const matchesSub = activeSub === "All" || q.subCategory === activeSub;
      const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
      return matchesMain && matchesSub && matchesSearch;
    });

    return matches.sort((a, b) => {
      return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
    });
  }, [questions, activeMain, activeSub, search]);

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
            <h1 className="text-3xl font-bold tracking-tight">Full Stack Developer Interview Questions & Answers | Frontend & Backend</h1>
            <p className="text-muted-foreground text-sm">Get ready for Full Stack Developer interviews with curated Frontend & Backend questions. React, Node.js, Express, MongoDB, and more.</p>
          </div>

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

          <div className="relative w-full md:max-w-sm mb-8">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search concepts..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="text-center py-20 font-medium">Loading questions from Database...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSorted.map((q) => (
                <QuestionCard key={q._id} q={q} />
              ))}
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}