# My Contributions to NextHire

**Contributor:** Mehedi Hasan (`f0rsakenHere`)  
**Role:** Lead Developer / Project Owner  
**Project:** NextHire — AI-powered interview preparation platform  

> This document lists exclusively the features, improvements, and implementations I worked on across the project's development history.

---

## Summary

| Area | What I Built |
|------|-------------|
| Project setup | Initialized the project, configured Next.js, TypeScript, Tailwind, Shadcn/UI |
| Landing page | Built every section of the marketing homepage |
| Shared layout | Navbar, Footer, route structure, dark-mode theming |
| Authentication pages | Sign-in, sign-up, and forgot-password pages with OAuth support |
| Auth protection | `AuthGuard` component for all protected routes |
| Dashboard | Main dashboard with performance analytics matrix |
| AI Resume Scorer | Full page UI + `/api/resume-score` backend with ATS scoring |
| AI Mock Interview | Full page UI + `/api/mock-interview` backend with question generation |
| Streaming AI Chat | `/api/chat` streaming endpoint powering follow-up feedback |
| Video Interview | Full video recording page + `/api/transcribe` speech-to-text endpoint |
| Keyword Gap Analysis | Improvements and integrations on the keyword gap page |
| Job Application Tracker | Full CRUD tracker page with status management |
| History pages | Resume History, Interview History, and Keyword History pages |
| Analytics | Analytics page with Recharts charts + `/api/analytics/[userId]` API |
| Admin utilities | Admin check route, admin bootstrap route, sidebar admin links |
| PostHog analytics | Product analytics integration (client + server) |
| Stripe payments | Complete payment flow — pricing page, checkout, webhooks, user plan API |
| Env & config | `.env.example`, `next.config.ts`, build fixes throughout development |

---

## Phase 1 — Project Initialization & Home Page (Feb 15–17, 2026)

### Project Bootstrap
- Initialized the Next.js 16 project with TypeScript, Tailwind CSS, and Shadcn/UI
- Set up base configuration (`next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `components.json`)
- Created `app/layout.tsx` and global CSS baseline

### Landing Page — Built Every Section
| Component | Description |
|-----------|-------------|
| `components/home/HeroSection.tsx` | Full-width hero banner with headline, subtitle, and CTA buttons |
| `components/home/FeaturesSection.tsx` | Feature overview grid with icons and descriptions |
| `components/home/FeatureShowreel.tsx` | Animated interactive showcase of platform capabilities |
| `components/home/HowItWorksSection.tsx` | Step-by-step guide to using the platform |
| `components/home/StatsSection.tsx` | Platform statistics display |
| `components/home/TrustedBySection.tsx` | Company logo strip / "trusted by" section |
| `components/home/FAQSection.tsx` | Collapsible FAQ accordion section |
| `components/home/CtaSection.tsx` | Bottom call-to-action section |
| `components/AppPreview.tsx` | App preview / demo visualization |
| `components/home.tsx` | Home page root composition component |

---

## Phase 2 — Shared Layout & Navigation (Feb 17–19, 2026)

### Shared Layout Components
- **`components/shared/Navbar.tsx`** — Built the top navigation bar; iterated multiple times to add links, responsiveness, and dark-mode support
- **`components/shared/Footer.tsx`** — Built the site footer with navigation links and branding (refactored from `FooterSection.tsx`)
- **`app/(main)/layout.tsx`** — Created the layout wrapper for all public marketing pages

### Theme & Styling
- `components/theme-provider.tsx` — Dark/light mode provider using `next-themes`
- `components/theme-toggle.tsx` — Mode toggle button
- `app/globals.css` — Custom CSS variables, dark mode utilities, and global styles (iterated several times)

### Route Structure Cleanup
- Reorganized public routes into the `(main)` route group
- Removed obsolete standalone page files
- Updated `next.config.ts` for image domain configuration and build fixes

### Environment Configuration
- Created **`.env.example`** with all required environment variable templates
- Updated **`.gitignore`** to exclude `.env.local`

---

## Phase 3 — Dashboard & Resume Scorer (Feb 23, 2026)

### Dashboard Page
- **`app/(dashboard)/dashboard/page.tsx`** — Main dashboard with analytics matrix showing scores across five dimensions (Resume Quality, Technical Accuracy, Behavioral Confidence, Communication Clarity, Problem Solving)
- **`app/(dashboard)/layout.tsx`** and **`app/(dashboard)/dashboard/layout.tsx`** — Protected route layout wrappers
- Created the `(dashboard)` route group structure

### AI Resume Scorer
- **`app/(dashboard)/dashboard/resume-scorer/page.tsx`** — Full resume upload and analysis UI with score display, feedback cards, and improvement suggestions
- **`app/api/resume-score/route.ts`** — Backend API: accepts resume text, calls AI model, returns ATS score + structured feedback
- Iterated through multiple rounds of bug fixes and UI polish on this feature

### Streaming AI Chat
- **`app/api/chat/route.ts`** — Streaming chat endpoint using NVIDIA/OpenAI API; powers real-time follow-up answers and interview feedback
- **`lib/chat.ts`** — Helper utility for managing streaming AI completions

---

## Phase 4 — Authentication Pages & Mock Interview (Feb 26, 2026)

### Authentication Pages (Built from scratch)
- **`app/(auth)/sign-in/page.tsx`** — Email/password login with Google and GitHub OAuth support
- **`app/(auth)/sign-up/page.tsx`** — Registration page with social auth
- **`app/(auth)/forgot-password/page.tsx`** — Password reset via Firebase email
- **`app/(auth)/layout.tsx`** — Centered auth layout wrapper

### Auth Protection
- **`components/auth/AuthGuard.tsx`** — Higher-order component that reads Firebase auth state and redirects unauthenticated users to `/sign-in`

### Mock Interview Feature
- **`app/(dashboard)/dashboard/mock-interview/page.tsx`** — Full mock interview page: select role, company, and difficulty; display AI-generated questions; send answers and receive real-time feedback via streaming chat
- **`app/api/mock-interview/route.ts`** — Backend: accepts role/company/difficulty parameters and returns tailored interview questions using AI

---

## Phase 5 — UI Polish (Mar 1–2, 2026)

- Refined the mock interview, dashboard, and resume scorer pages for consistency and responsiveness
- Cleaned up unused imports and components
- Improved layout spacing and component sizing across dashboard pages

---

## Phase 6 — Video Interview Feature (Mar 5, 2026)

### Video Interaction Page
- **`app/(dashboard)/dashboard/video-interaction/page.tsx`** — Full video interview practice page: record video/audio in the browser, transcribe speech to text, submit transcription to AI for evaluation, display score and feedback

### Transcription API
- **`app/api/transcribe/route.ts`** — Accepts audio blob, sends to transcription service, returns text transcript

### Additional Changes
- Added layout files for dashboard sub-sections (`mock-interview/layout.tsx`, `keyword-gap-analysis/layout.tsx`, `frontend-question/layout.tsx`, `resume-scorer/layout.tsx`, `video-interaction/layout.tsx`)
- Updated `app/api/mock-interview/route.ts` with improved prompting and error handling
- Bug fixes across resume scorer and keyword gap analysis

---

## Phase 7 — Job Tracking & History Pages (Mar 9, 2026)

### Job Application Tracker
- **`app/(dashboard)/dashboard/tracker/page.tsx`** — Full-featured application tracker: add jobs with company, role, location, status; update status (Applied, Phone Screen, Interview, Offer, Rejected); delete entries; filter and sort

### History Pages (Built all three from scratch)
- **`app/(dashboard)/dashboard/interview-history/page.tsx`** — Lists all past mock interview sessions with scores and Q&A
- **`app/(dashboard)/dashboard/resume-history/page.tsx`** — Lists all previous resume analyses with ATS scores
- **`app/(dashboard)/dashboard/keyword-history/page.tsx`** — Lists all previous keyword gap analysis results

### Admin Utilities
- **`app/api/admin/check/route.ts`** — Verifies if the authenticated user has admin privileges
- **`app/api/admin/bootstrap/route.ts`** — One-time endpoint for setting up the first admin account

---

## Phase 8 — Analytics Feature (Mar 10, 2026)

### Analytics Page
- **`app/(dashboard)/dashboard/analytics/page.tsx`** — Performance metrics page with Recharts visualizations: line charts for scores over time, bar charts for skill breakdown, aggregate stats

### Analytics API
- **`app/api/analytics/[userId]/route.ts`** — Reads and writes per-user analytics data from MongoDB; aggregates session history into chart-ready format

### Resume Score Integration
- Updated `app/api/resume-score/route.ts` to save each analysis result to the analytics collection in MongoDB, enabling progress tracking over time

### Sidebar Update
- Added Analytics and other new links to `components/app-sidebar.tsx`

---

## Phase 9 — Major UI Overhaul (Mar 12, 2026)

This was a large cross-cutting improvement pass across the entire dashboard:

### Dashboard & Navigation
- **`components/app-sidebar.tsx`** — Fully rebuilt the collapsible sidebar: grouped navigation sections (Dashboard, Tools, History, Admin), user profile section, plan badge
- **`components/nav-main.tsx`** — Rebuilt navigation menu component with icons and active-state styling
- **`components/nav-user.tsx`** — User profile dropdown in the sidebar
- **`components/shared/Navbar.tsx`** — Added mobile responsiveness, updated links, dark-mode improvements

### Page Redesigns
- **`app/(dashboard)/dashboard/page.tsx`** — Redesigned main dashboard with metric cards, progress charts, and recent activity
- **`app/(dashboard)/dashboard/analytics/page.tsx`** — Full analytics page redesign with multiple chart types and performance summary
- **`app/(dashboard)/dashboard/frontend-question/page.tsx`** — Major UI overhaul for the technical questions page
- **`app/(dashboard)/dashboard/tracker/page.tsx`** — Tracker page UI improvements
- **`app/(dashboard)/dashboard/interview-history/page.tsx`** — Interview history UI improvements
- **`app/(auth)/sign-in/page.tsx`** — Sign-in page design improvements

### Styling & System
- **`app/globals.css`** — Comprehensive dark-mode variables, sidebar styles, custom scrollbar, animation utilities
- Multiple build error fixes across the codebase

---

## Phase 10 — PostHog Product Analytics (Mar 25, 2026)

- **`lib/posthog.ts`** — PostHog client initialization for server-side event tracking
- **`instrumentation-client.ts`** — PostHog client-side initialization; bootstraps analytics on page load
- Integrated `posthog-js` and `posthog-node` packages into the project

---

## Phase 11 — Stripe Payment Integration (Mar 25, 2026)

Built on top of the initial Stripe scaffolding and completed the full payment system:

### New Pages
- **`app/(dashboard)/dashboard/payment/success/page.tsx`** — Post-checkout success page with plan confirmation, feature unlocks, and navigation
- **`app/(dashboard)/dashboard/payment/cancel/page.tsx`** — Cancellation page with re-engagement messaging and redirect options

### Pricing Page
- **`app/(main)/pricing/page.tsx`** — Complete pricing page with three tiers (Free, Basic, Premium), feature comparison table, and Stripe checkout buttons

### Backend APIs
- **`app/api/stripe/checkout/route.ts`** — Refactored to create proper Stripe checkout sessions with correct metadata, redirect URLs, and plan mapping
- **`app/api/stripe/webhook/route.ts`** — Handles Stripe subscription lifecycle events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- **`app/api/user/plan/route.ts`** — New API: reads the user's active subscription plan from MongoDB and returns it to the frontend

### UI Updates for Payments
- Updated `components/app-sidebar.tsx` to display the user's active plan and upgrade prompt
- Updated `components/shared/Footer.tsx` with pricing links and legal copy

---

## Files I Authored or Significantly Refactored

### Pages & Layouts
- `app/layout.tsx`
- `app/(main)/layout.tsx`, `app/(main)/page.tsx`
- `app/(auth)/layout.tsx`, `app/(auth)/sign-in/page.tsx`, `app/(auth)/sign-up/page.tsx`, `app/(auth)/forgot-password/page.tsx`
- `app/(dashboard)/layout.tsx`, `app/(dashboard)/dashboard/layout.tsx`
- `app/(dashboard)/dashboard/page.tsx`
- `app/(dashboard)/dashboard/mock-interview/page.tsx`
- `app/(dashboard)/dashboard/resume-scorer/page.tsx`
- `app/(dashboard)/dashboard/video-interaction/page.tsx`
- `app/(dashboard)/dashboard/analytics/page.tsx`
- `app/(dashboard)/dashboard/tracker/page.tsx`
- `app/(dashboard)/dashboard/interview-history/page.tsx`
- `app/(dashboard)/dashboard/resume-history/page.tsx`
- `app/(dashboard)/dashboard/keyword-history/page.tsx`
- `app/(dashboard)/dashboard/payment/success/page.tsx`
- `app/(dashboard)/dashboard/payment/cancel/page.tsx`
- `app/(main)/pricing/page.tsx`

### API Routes
- `app/api/chat/route.ts`
- `app/api/resume-score/route.ts`
- `app/api/mock-interview/route.ts`
- `app/api/transcribe/route.ts`
- `app/api/analytics/[userId]/route.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `app/api/user/plan/route.ts`
- `app/api/admin/check/route.ts`
- `app/api/admin/bootstrap/route.ts`

### Components
- `components/home/HeroSection.tsx`
- `components/home/FeaturesSection.tsx`
- `components/home/FeatureShowreel.tsx`
- `components/home/HowItWorksSection.tsx`
- `components/home/StatsSection.tsx`
- `components/home/TrustedBySection.tsx`
- `components/home/FAQSection.tsx`
- `components/home/CtaSection.tsx`
- `components/home.tsx`
- `components/AppPreview.tsx`
- `components/app-sidebar.tsx`
- `components/nav-main.tsx`
- `components/nav-user.tsx`
- `components/shared/Navbar.tsx`
- `components/shared/Footer.tsx`
- `components/auth/AuthGuard.tsx`
- `components/theme-provider.tsx`
- `components/theme-toggle.tsx`

### Library & Config
- `lib/chat.ts`
- `lib/posthog.ts`
- `instrumentation-client.ts`
- `.env.example`
- `app/globals.css`
- `next.config.ts`

---

## Commit Reference

All commits below are authored by **Mehedi Hasan** (`mehedi@99robots.com`):

| Date | Commit | Description |
|------|--------|-------------|
| 2026-02-15 | `2e6ab98` | Project Initialized |
| 2026-02-16 | `16d17e4` | Created Home Page UI |
| 2026-02-16 | `9ea0943` | Made Changes to Homepage UI |
| 2026-02-16 | `672404f` | Changed Homepage UI (FeatureShowreel, Navbar) |
| 2026-02-17 | `c883075` | Minor UI Changes |
| 2026-02-17 | `2344be4` | UI Updates (Footer, Navbar, FAQ, layout) |
| 2026-02-19 | `8566c0e` | Fixed Build Issues |
| 2026-02-19 | `f02df05` | Resolved Issues (FAQ, cleanup) |
| 2026-02-19 | `c64d325` | UI Improvements (about page, FAQ) |
| 2026-02-19 | `40ad9c0` | UI Issues Resolved (Navbar, config) |
| 2026-02-25 | `88aef57` | Env Sample Added |
| 2026-02-23 | `5eb338a` | Dashboard and Resume Scorer Implemented |
| 2026-02-23 | `559bd8d` | Bug Fixes (resume scorer, globals) |
| 2026-02-23 | `f6d7d4f` | Bug Fixes (resume scorer UI) |
| 2026-02-23 | `8ee7c97` | Bug Fixes (resume scorer, API) |
| 2026-02-26 | `32e88cc` | UI Changed (sign-in, globals, dashboard) |
| 2026-02-26 | `7f13c7a` | UI Changed (sign-in rework) |
| 2026-02-26 | `0120e96` | Bug Fixes (resume scorer) |
| 2026-02-26 | `6b37d3aa` | Mock Interview Added + Auth pages |
| 2026-02-26 | `2eb727f` | Back to Home Button |
| 2026-03-01 | `56aeb6e` | UI Improved (mock interview, dashboard) |
| 2026-03-02 | `5e42285` | UI Updates (minor cleanup) |
| 2026-03-05 | `dd531e0` | Video Interview Feature |
| 2026-03-05 | `c91fddc` | Bug Fixed |
| 2026-03-05 | `500dac8` | Bug Fixed |
| 2026-03-05 | `5fc9a4e` | Bug Fixed |
| 2026-03-06 | `13a1ab8` | Merge Conflict Resolved |
| 2026-03-06 | `d0ac207` | Merge Conflict Resolved |
| 2026-03-09 | `7c459cf` | Job Tracking Feature + History pages |
| 2026-03-10 | `d2787cd` | Route added for analytics |
| 2026-03-12 | `f52db89` | UI Updated (major overhaul) |
| 2026-03-12 | `80738d9` | UI Updates (frontend-question, video) |
| 2026-03-12 | `970e940` | UI Updates (analytics, interview-history, Navbar) |
| 2026-03-12 | `1e2e3dc` | Resolved Build Errors |
| 2026-03-12 | `f8133cc` | Resolved Build Errors |
| 2026-03-12 | `795992d` | Resolved Build Errors |
| 2026-03-25 | `c43e631` | PostHog Implemented |
| 2026-03-25 | `703466c` | Stripe Payment Fully Working |
