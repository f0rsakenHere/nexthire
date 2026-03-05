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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
// Extracted here for easy replacement with a MongoDB fetch in the future.
// Shape matches the planned DB schema: { category, difficulty, question, answer, tags, followUps }

type Question = {
  id: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  answer: string;
  tags: string[];
  followUps: string[];
};

const questions: Question[] = [
  // JavaScript
  {
    id: 1,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is the difference between var, let, and const?",
    answer:
      "var is function-scoped and hoisted. let and const are block-scoped. const cannot be reassigned, but its object properties can be mutated.",
    tags: ["variables", "scope"],
    followUps: [
      "What is the temporal dead zone?",
      "Can you reassign a const object's property?",
    ],
  },
  {
    id: 2,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is a closure?",
    answer:
      "A closure is a function that retains access to its outer scope's variables even after the outer function has returned.",
    tags: ["closure", "scope"],
    followUps: [
      "Give a real-world use case for closures.",
      "How do closures relate to memory leaks?",
    ],
  },
  {
    id: 3,
    category: "JavaScript",
    difficulty: "Medium",
    question: "Explain event delegation.",
    answer:
      "Event delegation attaches a single listener to a parent element to handle events from its children using event bubbling. It improves performance when dealing with many child nodes.",
    tags: ["events", "DOM"],
    followUps: ["What is event bubbling vs capturing?"],
  },
  {
    id: 4,
    category: "JavaScript",
    difficulty: "Easy",
    question: "What is the difference between == and ===?",
    answer:
      "== performs type coercion before comparing values. === checks both value and type without coercion, making it safer and more predictable.",
    tags: ["comparison"],
    followUps: ["When would you use == intentionally?"],
  },
  {
    id: 5,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is hoisting?",
    answer:
      "Hoisting moves variable and function declarations to the top of their scope at compile time. var declarations are hoisted and initialized as undefined; function declarations are fully hoisted.",
    tags: ["hoisting"],
    followUps: ["Are let and const hoisted?"],
  },
  {
    id: 6,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is debouncing?",
    answer:
      "Debouncing delays a function's execution until after a specified wait time has passed since the last call. Useful for search inputs and resize handlers.",
    tags: ["performance", "async"],
    followUps: ["How is debouncing different from throttling?"],
  },
  {
    id: 7,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is throttling?",
    answer:
      "Throttling ensures a function runs at most once per specified time interval, regardless of how many times it is called. Useful for scroll and mousemove events.",
    tags: ["performance", "async"],
    followUps: ["When should you prefer throttle over debounce?"],
  },
  {
    id: 8,
    category: "JavaScript",
    difficulty: "Hard",
    question: "How does the JavaScript event loop work?",
    answer:
      "The event loop continuously checks the call stack. When it's empty, it moves the first task from the macrotask queue to the stack. Microtasks (Promises) are processed after each task before the next macrotask.",
    tags: ["event-loop", "async", "concurrency"],
    followUps: ["What is the difference between microtasks and macrotasks?"],
  },

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

// ─── Constants ─────────────────────────────────────────────────────────────────

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
  Medium: "bg-amber-500 text-white",
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

// ─── Question Card ─────────────────────────────────────────────────────────────

function QuestionCard({ q, index }: { q: Question; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="border border-border/60 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        {/* Badges row */}
        <div className="mb-3 flex flex-wrap gap-2">
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[q.category] ?? "bg-muted text-muted-foreground"}`}
          >
            {q.category}
          </span>
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[q.difficulty]}`}
          >
            {q.difficulty}
          </span>
        </div>

        {/* Question */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-3 text-left"
        >
          <span className="font-semibold text-foreground text-sm leading-snug">
            Q{index + 1}. {q.question}
          </span>
          {open ? (
            <ChevronUpIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDownIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          )}
        </button>

        {/* Expandable answer */}
        {open && (
          <div className="mt-4 space-y-4">
            <div className="rounded-md bg-muted/50 px-4 py-3 text-sm text-foreground leading-relaxed border border-border/40">
              {q.answer}
            </div>

            {q.followUps.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Follow-up questions
                </p>
                <ul className="space-y-1">
                  {q.followUps.map((fu, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/50" />
                      {fu}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {q.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function FrontendQuestionPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = questions.filter((q) => {
    const matchesCategory =
      activeCategory === "All" || q.category === activeCategory;
    const matchesSearch =
      search.trim() === "" ||
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 px-4 border-b border-border/50 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Interview Questions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content */}
        <div className="flex flex-col gap-6 p-6">
          {/* Page title */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Frontend Interview Questions
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse curated questions by category. Click a question to reveal
              the answer.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search questions or tags..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-xs text-muted-foreground -mt-2">
            Showing {filtered.length} of {questions.length} questions
          </p>

          {/* Question list */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {filtered.map((q, i) => (
                <QuestionCard key={q.id} q={q} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
              <SearchIcon className="size-10 mb-3 opacity-30" />
              <p className="font-medium">No questions found</p>
              <p className="text-sm">
                Try a different search term or category.
              </p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
