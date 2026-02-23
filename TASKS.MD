# ARIS – Task Tracker
> Tracks every deliverable from the PRD against what has been shipped.

---

## 🏗️ System Architecture & Setup

- [x] FastAPI backend bootstrapped (`backend/app/main.py`)
- [x] SQLAlchemy ORM + SQLite (dev) / PostgreSQL (prod) data layer (`backend/app/database.py`)
- [x] Application model with all PRD columns (`backend/app/models/application.py`)
- [x] Pydantic schemas for request/response validation (`backend/app/schemas/application.py`)
- [x] React 18 + TypeScript + Vite frontend scaffolded (`frontend/`)
- [x] Tailwind CSS + shadcn/ui design system configured (`frontend/tailwind.config.js`)
- [x] TanStack Query (React Query) wired up (`frontend/src/main.tsx`)
- [x] React Router v6 with admin and intern route groups (`frontend/src/App.tsx`)
- [x] `render.yaml` — Render deployment config (backend web service + frontend static site + managed PostgreSQL)

---

## 🔗 API Endpoints

### Candidate Intake
- [x] `POST /applications` — Submit application + trigger full agent pipeline
- [x] `GET /applications` — List all applications (summary fields)
- [x] `GET /applications/{id}` — Full candidate intelligence object
- [x] `PATCH /applications/{id}/status` — Update hiring status with valid state transitions
- [x] `GET /applications/stats` — Dashboard stats (total, pending, accepted, rejected, new this week)

### Agentic Verification
- [x] `POST /applications/{id}/verify` — Trigger full CrewAI verification crew
- [x] `GET /applications/{id}/government-verification` — DigiLocker + ABC mock data endpoint

### Training Plans
- [x] `POST /applications/{id}/generate-plan` — Generate AI training plan (LLM + deterministic fallback)
- [x] `POST /applications/{id}/modify-plan` — Refine plan via natural-language chat

---

## 🤖 Agentic Verification Pipeline (CrewAI)

- [x] **Agent 1 — GitHub Analyst** — Fetches top repos, commits (90 days), language distribution, stars, consistency score (`backend/app/services/github_service.py`)
- [x] **Agent 2 — Fraud Detector** — Cross-references resume skill claims against GitHub evidence, flags timeline gaps (`backend/app/agents/verification_crew.py`)
- [x] **Agent 3 — Compliance Manager** — Computes Trust Score (0–100), risk category, human-readable verification report
- [x] **Agent 4 — Onboarding Planner** — Generates week-by-week training curriculum from learning gaps
- [x] CrewAI pipeline auto-triggered on `POST /applications` when API key is present
- [x] `CREWAI_TELEMETRY_OPTOUT` env var set to prevent threading signal crashes
- [x] OPENAI_API_KEY placeholder injected to satisfy CrewAI internal init when using Groq
- [x] CrewAI custom tools for GitHub fetching (`backend/app/agents/tools.py`)

---

## 🔍 Backend Services

- [x] **GitHub Service** — Fetches metrics, repo analysis, language breakdown (`backend/app/services/github_service.py`)
- [x] **Resume Service** — pdfplumber PDF parsing, keyword/skill extraction (`backend/app/services/resume_service.py`)
- [x] **Scoring Service** — Deterministic master score + confidence band + learning gaps (`backend/app/services/scoring_service.py`)
- [x] **LLM Service** — Groq (`llama-3.3-70b-versatile`) profile analysis, ATS analysis, training plan generation, plan modification via chat (`backend/app/services/llm_service.py`)
- [x] **Training Plan Service** — Deterministic fallback training plan generator (`backend/app/services/training_plan_service.py`)
- [x] **DigiLocker Service** — Mock DigiLocker + Academic Bank of Credits government verification (`backend/app/services/digilocker_service.py`)

---

## 🗄️ Data & Seeding

- [x] Mock candidate data seed script (`backend/seed_mock_data.py`)
- [x] Audit/audit-trail seed script (`backend/seed_audit.py`)
- [x] Seed scripts run automatically on Render startup before gunicorn

---

## 🖥️ Admin Frontend (HR Command Center)

- [x] **Dashboard** (`/`) — Stats cards, candidate list overview (`frontend/src/pages/Dashboard.tsx`)
- [x] **Review Room** (`/review-room`) — Candidate queue with filters and status management (`frontend/src/pages/ReviewRoom.tsx`)
- [x] **Candidate Detail** (`/candidate/:id`) — Full intelligence view: trust score, verification report, GitHub metrics, resume analysis, training plan, per-claim evidence (`frontend/src/pages/CandidateDetail.tsx`)
- [x] **Interns** (`/interns`) — Talent management view for accepted → intern candidates (`frontend/src/pages/Interns.tsx`)
- [x] **Analytics** (`/analytics`) — Hiring funnel and stats charts (`frontend/src/pages/Analytics.tsx`)
- [x] **Settings** (`/settings`) — App settings page (`frontend/src/pages/Settings.tsx`)
- [x] Admin sidebar navigation (`frontend/src/components/layout/Sidebar.tsx`)
- [x] Admin header (`frontend/src/components/layout/Header.tsx`)

---

## 🎓 Intern Portal (`/intern`)

- [x] Intern layout with own navigation (`frontend/src/features/intern/portal/InternLayout.tsx`)
- [x] **Intern Dashboard** (`/intern`) — Welcome, progress overview
- [x] **Tasks Page** (`/intern/tasks`) — Assigned tasks list
- [x] **Task Detail Page** (`/intern/tasks/:taskId`) — Individual task view
- [x] **Training Plan Page** (`/intern/training`) — Week-by-week curriculum view
- [x] **Performance Page** (`/intern/performance`) — Performance metrics
- [x] **Certificate Page** (`/intern/certificate`) — Completion certificate

---

## 📝 Candidate Application Portal

- [x] **Apply Page** (`/apply`) — Public candidate application form (`frontend/src/pages/Apply.tsx`)
- [x] Multi-part form with: personal info, education, experience, professional skills, motivation, GitHub URL, resume PDF upload

---

## 🔐 Security

- [x] CORS configuration in FastAPI
- [x] Pydantic input validation on all endpoints
- [x] File size / type restrictions on resume upload
- [x] GitHub URL validation before API calls
- [x] API keys managed via environment variables (`.env`, never committed)
- [x] Status transition guard — only valid `pending → in_review → accepted → intern` / `→ rejected` moves allowed

---

## 🚀 Deployment

- [x] `render.yaml` with backend web service, frontend static site, and managed PostgreSQL
- [x] gunicorn + uvicorn workers for production server
- [x] `DATABASE_URL` auto-injected from Render managed DB
- [x] `LLM_API_KEY` / `LLM_MODEL` env vars configured
- [x] Frontend `VITE_API_URL` auto-wired to backend service host
- [x] SPA fallback rewrite (`/* → /index.html`)
- [x] `npm install && npm run build` frontend build pipeline
- [x] `dist/` as static publish directory

---

## ✅ Core Delivery Criteria

- [x] Candidate submits application via `/apply` portal
- [x] ARIS automatically runs full agentic verification pipeline on submission
- [x] Admin sees candidate in dashboard with Trust Score and Verification Badge
- [x] Admin opens full Verification Report with per-claim evidence
- [x] Admin triggers training plan generation via button
- [x] Training plan appears; admin refines via natural-language chat (`modify-plan`)
- [x] Admin accepts candidate → candidate moves to Talent Management / Interns view

---

## 🔮 Future Enhancements

- [ ] LinkedIn scraping for employment history verification
- [ ] Multi-company tenancy with JWT + RBAC
- [ ] Semantic search across candidate database
- [ ] Integration with Workday / Greenhouse ATS
- [ ] Fine-tuned internal LLM for proprietary domain verification
- [ ] Real DigiLocker & Academic Bank of Credits API integration (replace mock)
- [ ] Progress countdown / live status updates during verification (WebSocket or polling)
