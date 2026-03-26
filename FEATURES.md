# NextHire — Full Implementation List

> A complete overview of everything built in the NextHire AI-powered interview preparation platform.

---

## 1. Project Overview

**NextHire** is a full-stack SaaS web application that helps job seekers prepare for interviews, improve resumes, track job applications, and land their dream jobs.

| Attribute | Detail |
|-----------|--------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI Library** | React 19 |
| **Database** | MongoDB Atlas |
| **Authentication** | Firebase Auth |
| **AI Providers** | NVIDIA API, OpenAI, Groq, Cerebras |
| **Payments** | Stripe |
| **Analytics** | PostHog |
| **Deployment** | Vercel |

---

## 2. Pages & Routes

### Public Pages (No Login Required)

| Route | Purpose |
|-------|---------|
| `/` | Landing page — hero, features overview, testimonials, stats, CTA |
| `/about` | About page — company story, mission, team, tech stack |
| `/features` | Detailed feature showcase |
| `/pricing` | Pricing plans (Free, Basic, Premium) with Stripe checkout |
| `/faqs` | Frequently asked questions |

### Authentication Pages

| Route | Purpose |
|-------|---------|
| `/sign-in` | Login with email/password, Google, or GitHub |
| `/sign-up` | Register with email/password or social auth |
| `/forgot-password` | Password reset via email |

### Protected Dashboard Pages (Login Required)

| Route | Purpose |
|-------|---------|
| `/dashboard` | Main dashboard — analytics matrix (Resume Quality, Technical Accuracy, Behavioral Confidence, Communication Clarity, Problem Solving) |
| `/dashboard/mock-interview` | AI-powered mock interview — choose role, company, and difficulty; get follow-up questions and feedback |
| `/dashboard/resume-scorer` | Upload resume for AI-powered ATS scoring, formatting feedback, and improvement suggestions |
| `/dashboard/video-interaction` | Video interview practice with speech-to-text transcription and AI evaluation |
| `/dashboard/keyword-gap-analysis` | Paste a job description to identify missing keywords in your resume |
| `/dashboard/frontend-question` | Practice technical/frontend interview questions with a Monaco code editor |
| `/dashboard/analytics` | Personal performance metrics and progress over time with Recharts visualizations |
| `/dashboard/tracker` | Job application tracker — add, update, and manage application statuses |
| `/dashboard/resume-history` | View all previous resume analyses and scores |
| `/dashboard/interview-history` | View all past mock interview sessions and scores |
| `/dashboard/keyword-history` | View all previous keyword gap analysis results |
| `/dashboard/payment/success` | Stripe checkout success confirmation page |
| `/dashboard/payment/cancel` | Stripe checkout cancellation page |

### Admin Pages

| Route | Purpose |
|-------|---------|
| `/nexthire-admin` | Admin dashboard overview |
| `/nexthire-admin/users` | View all users, manage accounts, impersonate users |
| `/nexthire-admin/analytics` | System-wide usage analytics |

---

## 3. REST API Endpoints

### User & Authentication

| Endpoint | Method(s) | Purpose |
|----------|-----------|---------|
| `/api/users` | `GET`, `POST` | Create or retrieve user records in MongoDB |
| `/api/user/plan` | `GET` | Fetch the current user's subscription plan |

### Core AI Features

| Endpoint | Method(s) | Purpose |
|----------|-----------|---------|
| `/api/chat` | `POST` (streaming) | Streaming AI chat responses for interview follow-ups |
| `/api/mock-interview` | `POST` | Generate AI mock interview questions |
| `/api/resume-score` | `POST` | Analyze a resume and return ATS score + feedback |
| `/api/video-interview` | `POST` | Evaluate a video interview response |
| `/api/keyword-gap-analysis` | `POST` | Compare resume keywords against a job description |
| `/api/keyword-gap` | `POST` | Alternate keyword gap endpoint |
| `/api/practice_question` | `POST` | Generate technical/frontend practice questions |
| `/api/transcribe` | `POST` | Transcribe audio to text (speech-to-text for video mode) |

### History

| Endpoint | Method(s) | Purpose |
|----------|-----------|---------|
| `/api/interview-history` | `GET`, `POST` | Save and retrieve interview session history |
| `/api/resume-history` | `GET`, `POST` | Save and retrieve resume analysis history |
| `/api/keyword-history` | `GET`, `POST` | Save and retrieve keyword gap analysis history |

### Analytics

| Endpoint | Method(s) | Purpose |
|----------|-----------|---------|
| `/api/analytics/[userId]` | `GET`, `POST` | Read/write user-specific analytics data |

### Job Application Tracker

| Endpoint | Method(s) | Purpose |
|----------|-----------|---------|
| `/api/applications` | `GET`, `POST` | List all applications or create a new one |
| `/api/applications/[id]` | `GET`, `PATCH`, `DELETE` | Read, update, or delete a single application |

### Payments (Stripe)

| Endpoint | Method(s) | Purpose |
|----------|-----------|---------|
| `/api/stripe/checkout` | `POST` | Create a Stripe checkout session |
| `/api/stripe/webhook` | `POST` | Handle Stripe subscription lifecycle webhooks |

### Admin

| Endpoint | Method(s) | Purpose |
|----------|-----------|---------|
| `/api/admin/users` | `GET` | Fetch all users (admin only) |
| `/api/admin/users-list` | `GET` | Paginated user list for admin table |
| `/api/admin/check` | `GET` | Verify if the current user is an admin |
| `/api/admin/analytics` | `GET` | System-wide analytics for admin dashboard |
| `/api/admin/stats` | `GET` | Platform statistics (user counts, session counts, etc.) |
| `/api/admin/bootstrap` | `POST` | One-time admin account setup |
| `/api/admin/impersonate` | `POST` | Allow admin to impersonate a user |

---

## 4. Components

### Home / Landing Page Components (`components/home/`)

| Component | Purpose |
|-----------|---------|
| `HeroSection.tsx` | Full-width hero banner with headline and CTA buttons |
| `FeaturesSection.tsx` | Feature overview grid with icons |
| `FeatureShowreel.tsx` | Animated interactive feature showcase |
| `HowItWorksSection.tsx` | Step-by-step walkthrough of the platform |
| `Testimonials.tsx` | User testimonial carousel |
| `FAQSection.tsx` | Collapsible FAQ accordion |
| `StatsSection.tsx` | Platform statistics (users, sessions, etc.) |
| `TrustedBySection.tsx` | Trusted-by company logo strip |
| `CtaSection.tsx` | Bottom call-to-action section |

### About Page Components (`components/about/`)

| Component | Purpose |
|-----------|---------|
| `hero.tsx` | About page hero banner |
| `mission.tsx` | Company mission statement |
| `mission-story.tsx` | Narrative of the mission |
| `story.tsx` | Company founding story |
| `features.tsx` | Company feature highlights |
| `highlights.tsx` | Key platform highlights |
| `states.tsx` | Statistics and metrics |
| `why-standout.tsx` | Differentiators vs. competitors |
| `platform.tsx` | Platform overview section |
| `techStack.tsx` | Technology stack display |
| `team-section.tsx` | Team members showcase |
| `team/team-card.tsx` | Individual team member card |

### Layout & Navigation Components

| Component | Purpose |
|-----------|---------|
| `shared/Navbar.tsx` | Top navigation bar (public pages) |
| `shared/Footer.tsx` | Footer with links and credits |
| `app-sidebar.tsx` | Collapsible dashboard sidebar |
| `nav-main.tsx` | Sidebar primary navigation menu |
| `nav-user.tsx` | User profile dropdown in the sidebar |
| `nav-projects.tsx` | Project/workspace switcher items |
| `team-switcher.tsx` | Team or workspace switcher |

### Theme Components

| Component | Purpose |
|-----------|---------|
| `theme-provider.tsx` | Dark/light mode context provider (`next-themes`) |
| `theme-toggle.tsx` | Dark/light mode toggle button |

### Feature Page Components

| Component | Purpose |
|-----------|---------|
| `features/FeaturesPage.tsx` | Full features page layout |
| `faq/Faq.tsx` | Standalone FAQ component |
| `AppPreview.tsx` | App preview/demo component |

### Authentication Components

| Component | Purpose |
|-----------|---------|
| `auth/AuthGuard.tsx` | Higher-order component that redirects unauthenticated users to `/sign-in` |

### Admin Components

| Component | Purpose |
|-----------|---------|
| `admin/users-table.tsx` | Data table of all users for admin view |
| `admin/impersonate-button.tsx` | Button to impersonate a selected user (admin only) |

### UI Components (`components/ui/` — Shadcn/UI)

| Component | Purpose |
|-----------|---------|
| `accordion.tsx` | Collapsible accordion sections |
| `alert-dialog.tsx` | Confirmation/alert modal dialogs |
| `avatar.tsx` | User avatar with fallback initials |
| `badge.tsx` | Status/tag badge |
| `breadcrumb.tsx` | Page breadcrumb navigation |
| `button.tsx` | Styled action button (multiple variants) |
| `card.tsx` | Card container with header/content/footer |
| `collapsible.tsx` | Generic expand/collapse section |
| `combobox.tsx` | Searchable dropdown/combobox |
| `dotted-glow-background.tsx` | Decorative dotted glow background |
| `dropdown-menu.tsx` | Context/dropdown menu |
| `field.tsx` | Form field wrapper with label and error |
| `input-group.tsx` | Input field with prefix/suffix icons |
| `input.tsx` | Styled text input |
| `label.tsx` | Accessible form label |
| `select.tsx` | Styled select/dropdown |
| `separator.tsx` | Horizontal/vertical visual divider |
| `sheet.tsx` | Side panel / drawer overlay |
| `sidebar.tsx` | Full collapsible sidebar shell |
| `skeleton.tsx` | Animated loading placeholder |
| `textarea.tsx` | Multi-line text area |
| `tooltip.tsx` | Hover tooltip |

---

## 5. Library Utilities (`lib/`)

| File | Purpose |
|------|---------|
| `mongodb.ts` | MongoDB Atlas connection pool and client singleton |
| `firebase-admin.ts` | Firebase Admin SDK initialisation for server-side auth verification |
| `stripe.ts` | Stripe API client initialisation |
| `chat.ts` | Helper for streaming AI chat completions |
| `posthog.ts` | PostHog analytics client initialisation |
| `utils.ts` | General utilities — `cn()` class-name merging helper (clsx + tailwind-merge) |

---

## 6. Hooks (`hooks/`)

| File | Purpose |
|------|---------|
| `use-mobile.ts` | Detects whether the current viewport is a mobile device |

---

## 7. Authentication & Security

- **Firebase Authentication** — Email/password, Google OAuth, GitHub OAuth
- **Password Reset** — Firebase email-based password recovery flow
- **Protected Routes** — `AuthGuard` component redirects unauthenticated users
- **Server-side Auth Verification** — Firebase Admin SDK verifies tokens in API routes
- **Admin Role Check** — `/api/admin/check` endpoint gates admin-only routes
- **User Impersonation** — Admins can log in as any user for support/debugging

---

## 8. AI & Machine Learning Features

- **Mock Interview Question Generation** — Role-specific and company-specific interview questions powered by NVIDIA/OpenAI/Groq
- **Streaming AI Chat** — Real-time streaming responses for follow-up interview questions
- **Resume ATS Scoring** — Detailed resume analysis with score, feedback, and improvement tips
- **Video Interview Evaluation** — AI evaluates recorded/transcribed video interview responses
- **Keyword Gap Analysis** — Identifies keywords present in a job description but missing from a resume
- **Technical Practice Questions** — Frontend/backend/full-stack coding and conceptual questions
- **Audio Transcription** — Converts spoken interview answers to text via the `/api/transcribe` endpoint

---

## 9. Database (MongoDB Atlas)

**Collections used:**

| Collection | Stores |
|------------|--------|
| `users` | User profile data linked to Firebase UID |
| `resumeScores` | Resume analysis results per user |
| `interviewSessions` | Mock interview sessions and Q&A |
| `keywordAnalyses` | Keyword gap analysis results |
| `analytics` | Per-user analytics and progress data |
| `applications` | Job application tracker entries |

---

## 10. Payments & Subscriptions (Stripe)

- **Three pricing tiers:** Free, Basic, Premium
- **Stripe Checkout** — Hosted checkout session creation (`/api/stripe/checkout`)
- **Stripe Webhooks** — Subscription lifecycle events (created, updated, cancelled) handled at `/api/stripe/webhook`
- **Plan Gating** — Users' active plan is stored and checked to gate premium features
- **Success / Cancel pages** — Post-checkout redirect pages

---

## 11. Analytics & Monitoring

- **PostHog** — Product analytics (page views, feature usage, funnels)
- **Dashboard Analytics Page** — Personal performance matrix visualised with Recharts
- **Admin Analytics** — System-wide usage stats for admin users

---

## 12. Technologies & Dependencies

### Core Framework
- **Next.js 16** — App Router, Server Components, API Routes
- **React 19** — UI rendering
- **TypeScript** — Type safety throughout

### Styling & UI
- **Tailwind CSS 4** — Utility-first CSS
- **Shadcn/UI** — Accessible component primitives
- **Radix UI** — Headless UI primitives
- **Framer Motion / Motion** — Animations and transitions
- **Lucide React** — Icon library
- **React Icons** — Additional icon sets
- **tw-animate-css** — Tailwind animation utilities

### Backend & Data
- **MongoDB (v7)** — NoSQL database
- **Firebase (v12) + Firebase Admin (v13)** — Auth and server-side token verification
- **Stripe (v20)** — Payment processing
- **@stripe/react-stripe-js** — React Stripe components

### AI & APIs
- **OpenAI SDK** — GPT models integration
- **Groq SDK** — Groq LLM integration
- **Cerebras Cloud SDK** — Cerebras AI integration
- **@monaco-editor/react** — In-browser VS Code-style code editor for practice questions

### Analytics & Observability
- **PostHog JS + Node** — Product analytics

### Charts & Data Visualisation
- **Recharts** — Chart components for analytics dashboard

### Other Utilities
- **react-hot-toast** — Toast notification system
- **react-firebase-hooks** — Firebase React hooks
- **next-themes** — Dark/light mode theming
- **clsx + tailwind-merge** — Conditional class name utilities

---

## 13. Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration (image domains, etc.) |
| `tsconfig.json` | TypeScript compiler options |
| `postcss.config.mjs` | PostCSS / Tailwind CSS configuration |
| `eslint.config.mjs` | ESLint rules |
| `components.json` | Shadcn/UI component configuration |
| `.env.example` | Template for required environment variables |
| `instrumentation-client.ts` | PostHog client-side initialisation |

---

## 14. Documentation (`docs/`)

| Document | Description |
|----------|-------------|
| `docs/README.md` | Documentation index |
| `docs/MONGODB_TROUBLESHOOTING_AND_IMPLEMENTATION.md` | Full MongoDB setup, architecture diagrams, and troubleshooting guide |
| `docs/RESUME_SCORER_DOCS.md` | Resume scorer feature deep-dive documentation |

---

## 15. Scripts (`scripts/`)

Automation scripts for setup and build tasks included in the `scripts/` directory.

---

*Generated from the NextHire codebase — 27 pages, 25 API routes, 60 components, 6 library utilities.*
