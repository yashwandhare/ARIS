# ARIS — Agentic Recruitment Intelligence System

**Live:** [https://aris-frontend-6574.onrender.com/](https://aris-frontend-6574.onrender.com/)

---

## What is ARIS?

ARIS is an autonomous, evidence-based hiring platform. It replaces manual candidate screening with a coordinated team of AI agents that investigate, audit, score, and onboard candidates — without human intervention at each step.

ARIS is not an Applicant Tracking System. An ATS filters resumes by keywords. ARIS **verifies** them. It treats every candidate application as an investigation: it pulls real GitHub data, cross-references it against resume claims, detects exaggerations and inconsistencies, produces an auditable Trust Score, and then immediately generates a personalized onboarding curriculum for verified candidates.

---

## Why It Exists

Technical hiring has three compounding failures:

1. **Resume fraud is systemic.** Skills like "5 years of Python" or "built three production systems" are impossible to verify from a document. The output of that experience — commits, repos, code quality — is publicly available, but nobody checks it systematically.

2. **Manual verification is too slow and too expensive.** Traditional background checks take 3–14 business days and verify identity and employment dates — not technical competence. Senior engineers burn hours on candidates who never should have reached them.

3. **Verification and onboarding are completely disconnected.** Even when a hire is confirmed, onboarding plans are built from scratch by hand. Nobody inherits the verified skill profile from the verification step.

ARIS solves all three with a single autonomous pipeline.

---

## What It Solves

| Problem | ARIS Solution |
|---|---|
| Unverifiable resume claims | GitHub audit cross-referenced against every stated skill |
| Slow, expensive background checks | Automated pipeline completes in under 2 minutes |
| No proof of technical competency | Trust Score (0–100) backed by real commit and repo data |
| Manual onboarding planning | AI-generated week-by-week training plan from verified gaps |
| No handoff from verify → onboard | Trust Score feeds directly into training plan generation |

---

## How It Solves It — The Agentic Pipeline

ARIS uses **CrewAI** to run a multi-agent crew on every new application. Agents run sequentially, each feeding the next.

```
Candidate submits application (/apply)
          │
          ▼
┌─────────────────────────┐
│  POST /applications     │  ← FastAPI receives multipart form + PDF
│  (Application created)  │
└────────────┬────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────┐
│               CrewAI Verification Crew                 │
│                                                        │
│  ┌──────────────────────────────────────┐              │
│  │ Agent 1 — GitHub Analyst             │              │
│  │  · Fetch top 10 active repos         │              │
│  │  · Count commits (last 90 days)      │              │
│  │  · Extract language distribution     │              │
│  │  · Score repo complexity & stars     │              │
│  └──────────────┬───────────────────────┘              │
│                 │ github_metrics{}                     │
│                 ▼                                      │
│  ┌──────────────────────────────────────┐              │
│  │ Agent 2 — Fraud Detector             │              │
│  │  · Extract skill claims from resume  │              │
│  │  · Cross-reference with GitHub data  │              │
│  │  · Tag each: ✅ Verified / ⚠️ Partial / ❌ Contradiction│
│  │  · Flag timeline gaps & bulk commits │              │
│  └──────────────┬───────────────────────┘              │
│                 │ fraud_report{}                       │
│                 ▼                                      │
│  ┌──────────────────────────────────────┐              │
│  │ Agent 3 — Compliance Manager         │              │
│  │  · Compute Trust Score (0–100)       │              │
│  │  · Assign risk category              │              │
│  │  · Write HR verification report      │              │
│  └──────────────┬───────────────────────┘              │
│                 │ trust_score, verification_report{}   │
│                 ▼                                      │
│  ┌──────────────────────────────────────┐              │
│  │ Agent 4 — Onboarding Planner         │              │
│  │  · Identify provable skill gaps      │              │
│  │  · Generate week-by-week curriculum  │              │
│  │  · Calibrate duration to score tier  │              │
│  └──────────────┬───────────────────────┘              │
│                 │ training_plan{}                      │
└─────────────────┼──────────────────────────────────────┘
                  │
                  ▼
         Saved to PostgreSQL
                  │
          ┌───────┴────────┐
          │                │
          ▼                ▼
  Admin Dashboard    Intern Portal
  (HR Command Ctr)   (/intern/*)
```

### Trust Score Weights

| Component | Weight |
|---|---|
| GitHub Activity | 25% |
| Resume Skill Match | 30% |
| Project Depth | 20% |
| Role Alignment | 15% |
| Activity Recency | 10% |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ARIS — System Architecture                  │
└─────────────────────────────────────────────────────────────────────┘

  Browser
  ┌──────────────────────────────────────────────────────────────┐
  │  React 18 + TypeScript + Vite (Tailwind CSS + shadcn/ui)     │
  │                                                              │
  │  /apply          → Candidate Application Portal              │
  │  /               → Admin Dashboard                           │
  │  /review-room    → Candidate Queue & Review                  │
  │  /candidate/:id  → Full Candidate Intelligence View          │
  │  /interns        → Talent Management                         │
  │  /analytics      → Hiring Funnel & Analytics                 │
  │  /intern/*       → Intern Portal (tasks, training, certs)    │
  └────────────────────────┬─────────────────────────────────────┘
                           │  REST  (VITE_API_URL)
                           ▼
  ┌──────────────────────────────────────────────────────────────┐
  │  FastAPI (Python 3.11)  — Routes Layer                       │
  │                                                              │
  │  POST   /applications                                        │
  │  GET    /applications                                        │
  │  GET    /applications/{id}                                   │
  │  PATCH  /applications/{id}/status                            │
  │  GET    /applications/stats                                  │
  │  POST   /applications/{id}/verify                            │
  │  GET    /applications/{id}/government-verification           │
  │  POST   /applications/{id}/generate-plan                     │
  │  POST   /applications/{id}/modify-plan                       │
  └───────────┬──────────────────────┬───────────────────────────┘
              │                      │
              ▼                      ▼
  ┌────────────────────┐   ┌─────────────────────────────────────┐
  │  Service Layer     │   │  CrewAI Agent Orchestration Layer   │
  │                    │   │                                     │
  │  github_service    │   │  Agent 1 — GitHub Analyst           │
  │  resume_service    │   │  Agent 2 — Fraud Detector           │
  │  scoring_service   │   │  Agent 3 — Compliance Manager       │
  │  llm_service       │   │  Agent 4 — Onboarding Planner       │
  │  training_service  │   │                                     │
  │  digilocker_svc    │   │  LLM: Groq llama-3.3-70b-versatile  │
  └─────────┬──────────┘   └──────────────────┬──────────────────┘
            │                                 │
            └─────────────┬───────────────────┘
                          │
                          ▼
  ┌──────────────────────────────────────────────────────────────┐
  │  SQLAlchemy ORM — Data Layer                                 │
  │  PostgreSQL (prod, Render managed) / SQLite (dev)            │
  │                                                              │
  │  Table: applications                                         │
  │  ├── id, full_name, email, github_url, role_applied          │
  │  ├── status (pending/in_review/accepted/rejected/intern)     │
  │  ├── master_score, trust_score, confidence_band              │
  │  ├── github_metrics_json, resume_analysis_json               │
  │  ├── score_breakdown_json, learning_gaps_json                │
  │  ├── verification_report_json, training_plan_json            │
  │  └── created_at, updated_at                                  │
  └──────────────────────────────────────────────────────────────┘

  External APIs
  ┌─────────────────────────────────┐
  │  GitHub REST API                │  ← repo/commit/language data
  │  Groq API (llama-3.3-70b)       │  ← LLM reasoning + generation
  │  DigiLocker / ABC (mock)        │  ← government verification
  └─────────────────────────────────┘
```

---

## Folder Structure

### Backend

```
backend/
├── requirements.txt
├── seed_mock_data.py          # Populates DB with demo candidates on startup
├── seed_audit.py              # Seeds audit trail data
└── app/
    ├── main.py                # FastAPI app + CORS + router registration
    ├── database.py            # SQLAlchemy engine + session factory
    ├── models/
    │   └── application.py     # Application ORM model (all columns)
    ├── schemas/
    │   └── application.py     # Pydantic request/response schemas
    ├── routes/
    │   └── applications.py    # All REST endpoints
    ├── agents/
    │   ├── verification_crew.py  # CrewAI crew definition (4 agents + tasks)
    │   └── tools.py              # Custom CrewAI tools (GitHub fetcher)
    └── services/
        ├── github_service.py       # GitHub REST API client
        ├── resume_service.py       # pdfplumber PDF parser
        ├── scoring_service.py      # Deterministic score engine
        ├── llm_service.py          # Groq LLM calls (analysis, ATS, plan gen)
        ├── training_plan_service.py # Deterministic training plan fallback
        └── digilocker_service.py   # Mock government verification
```

### Frontend

```
frontend/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── src/
    ├── App.tsx                # Root router (admin routes + intern routes)
    ├── main.tsx               # ReactDOM + QueryClientProvider
    ├── index.css              # Global styles
    ├── pages/                 # Admin-facing pages
    │   ├── Dashboard.tsx          # HR overview + stats
    │   ├── ReviewRoom.tsx         # Candidate queue + filters
    │   ├── CandidateDetail.tsx    # Full candidate intelligence view
    │   ├── Interns.tsx            # Talent management
    │   ├── Analytics.tsx          # Hiring funnel charts
    │   ├── Settings.tsx           # App settings
    │   └── Apply.tsx              # Public candidate application portal
    ├── components/
    │   └── layout/
    │       ├── Sidebar.tsx        # Admin navigation sidebar
    │       └── Header.tsx         # Admin top header
    ├── features/
    │   └── intern/
    │       └── portal/
    │           ├── InternLayout.tsx           # Intern shell + nav
    │           └── pages/
    │               ├── InternDashboard.tsx    # Welcome + progress
    │               ├── TasksPage.tsx          # Assigned tasks list
    │               ├── TaskDetailPage.tsx     # Individual task view
    │               ├── TrainingPlanPage.tsx   # Week-by-week curriculum
    │               ├── PerformancePage.tsx    # Performance metrics
    │               └── CertificatePage.tsx    # Completion certificate
    ├── lib/                   # API client, utilities, hooks
    ├── types/                 # TypeScript type definitions
    └── data/                  # Static/mock data helpers
```

---

## Deployment

ARIS is deployed on **Render** via `render.yaml`:

- **Backend** — Python Web Service, gunicorn + uvicorn, auto-deploys on push to `main`
- **Frontend** — Static Site, Vite build → `dist/`, SPA fallback rewrite
- **Database** — Render managed PostgreSQL, connection string auto-injected as `DATABASE_URL`
- **Secrets** — `LLM_API_KEY`, `GITHUB_TOKEN` set manually in Render dashboard

CI/CD: every push to `main` triggers automatic redeploy of both services.
