// app/frontend-question/page.tsx

type Question = {
  role: string;
  level: string;
  category: string;
  difficulty: string;
  question: string;
  answer: string;
  tags: string[];
  followUps: string[];
};

const questions: Question[] = [
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is the difference between var, let, and const?",
    answer: "var is function scoped, let and const are block scoped. const cannot be reassigned.",
    tags: ["javascript", "variables"],
    followUps: ["What is temporal dead zone?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is closure in JavaScript?",
    answer: "A closure allows a function to access variables from its outer scope even after execution.",
    tags: ["javascript", "closure"],
    followUps: ["Where are closures used?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "JavaScript",
    difficulty: "Medium",
    question: "Explain event delegation.",
    answer: "Event delegation handles events using a parent element instead of multiple child listeners.",
    tags: ["javascript", "events"],
    followUps: ["Why is event delegation useful?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "JavaScript",
    difficulty: "Medium",
    question: "Difference between == and ===?",
    answer: "== compares value with type coercion, === compares value and type.",
    tags: ["javascript", "comparison"],
    followUps: ["Why is === recommended?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "JavaScript",
    difficulty: "Medium",
    question: "What is hoisting?",
    answer: "Hoisting moves variable and function declarations to the top of their scope.",
    tags: ["javascript", "hoisting"],
    followUps: ["Are let and const hoisted?"]
  },

  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "React",
    difficulty: "Medium",
    question: "What is Virtual DOM?",
    answer: "Virtual DOM is a lightweight copy of the real DOM used for efficient updates.",
    tags: ["react", "virtual-dom"],
    followUps: ["How does reconciliation work?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "React",
    difficulty: "Medium",
    question: "What are React hooks?",
    answer: "Hooks allow using state and lifecycle features in functional components.",
    tags: ["react", "hooks"],
    followUps: ["Rules of hooks?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "React",
    difficulty: "Medium",
    question: "Difference between useState and useReducer?",
    answer: "useState is simple state handling, useReducer is for complex logic.",
    tags: ["react", "state"],
    followUps: ["When to use useReducer?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "React",
    difficulty: "Medium",
    question: "What is prop drilling?",
    answer: "Passing props through multiple component levels unnecessarily.",
    tags: ["react", "props"],
    followUps: ["How to avoid prop drilling?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "React",
    difficulty: "Medium",
    question: "What is Context API?",
    answer: "Context API provides global state without passing props manually.",
    tags: ["react", "context"],
    followUps: ["When should context not be used?"]
  },

  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "CSS",
    difficulty: "Medium",
    question: "What is the CSS box model?",
    answer: "Box model consists of content, padding, border, and margin.",
    tags: ["css", "box-model"],
    followUps: ["What is box-sizing?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "CSS",
    difficulty: "Medium",
    question: "Difference between display:none and visibility:hidden?",
    answer: "display:none removes element from layout, visibility:hidden keeps space.",
    tags: ["css", "display"],
    followUps: ["Which one affects layout?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "CSS",
    difficulty: "Medium",
    question: "What is Flexbox?",
    answer: "Flexbox is a layout system for creating responsive layouts.",
    tags: ["css", "flexbox"],
    followUps: ["Difference between Flexbox and Grid?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "CSS",
    difficulty: "Medium",
    question: "What is CSS specificity?",
    answer: "Specificity decides which CSS rule is applied.",
    tags: ["css", "specificity"],
    followUps: ["Which selector has highest priority?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "CSS",
    difficulty: "Medium",
    question: "What is responsive design?",
    answer: "Design that adapts to different screen sizes.",
    tags: ["css", "responsive"],
    followUps: ["What are media queries?"]
  },

  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "HTML",
    difficulty: "Medium",
    question: "What are semantic HTML elements?",
    answer: "Elements that describe their meaning clearly, like header, article.",
    tags: ["html", "semantic"],
    followUps: ["Why are they important?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "HTML",
    difficulty: "Medium",
    question: "Difference between div and span?",
    answer: "div is block-level, span is inline-level.",
    tags: ["html", "elements"],
    followUps: ["Can span be styled as block?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "HTML",
    difficulty: "Medium",
    question: "What is accessibility (a11y)?",
    answer: "Making web apps usable for people with disabilities.",
    tags: ["html", "accessibility"],
    followUps: ["What is ARIA?"]
  },

  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "Browser",
    difficulty: "Medium",
    question: "What is CORS?",
    answer: "A browser security policy restricting cross-origin requests.",
    tags: ["browser", "cors"],
    followUps: ["How to fix CORS errors?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "Browser",
    difficulty: "Medium",
    question: "Difference between localStorage and sessionStorage?",
    answer: "localStorage persists data, sessionStorage clears on tab close.",
    tags: ["browser", "storage"],
    followUps: ["Is localStorage secure?"]
  },

  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "Performance",
    difficulty: "Medium",
    question: "How to improve frontend performance?",
    answer: "Use code splitting, lazy loading, memoization.",
    tags: ["performance"],
    followUps: ["What is lazy loading?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "Performance",
    difficulty: "Medium",
    question: "What is re-render in React?",
    answer: "Re-render happens when state or props change.",
    tags: ["react", "performance"],
    followUps: ["How to prevent unnecessary re-renders?"]
  },

  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "Git",
    difficulty: "Medium",
    question: "Difference between git merge and git rebase?",
    answer: "Merge keeps history, rebase rewrites history.",
    tags: ["git"],
    followUps: ["Which one is safer?"]
  },
  {
    role: "Frontend Developer",
    level: "Mid-level",
    category: "Git",
    difficulty: "Medium",
    question: "What is git stash?",
    answer: "Temporarily saves uncommitted changes.",
    tags: ["git"],
    followUps: ["When is git stash useful?"]
  }
];

export default function FrontendQuestionPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Frontend Interview Questions (Mid-Level)
      </h1>

      <section className="mx-auto max-w-4xl space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="rounded-lg bg-white p-6 shadow">
            <div className="mb-2 flex gap-2 text-sm">
              <span className="rounded bg-blue-100 px-2 py-1">{q.category}</span>
              <span className="rounded bg-green-100 px-2 py-1">{q.level}</span>
              <span className="rounded bg-purple-100 px-2 py-1">{q.difficulty}</span>
            </div>

            <h2 className="font-semibold">
              Q{index + 1}. {q.question}
            </h2>

            <p className="mt-2 text-gray-700">
              <strong>Answer:</strong> {q.answer}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {q.tags.map((tag, i) => (
                <span key={i} className="text-xs text-gray-600">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}


