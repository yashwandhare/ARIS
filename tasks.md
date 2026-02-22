# ARIS – Development Task Plan
## Hackathon Day 2 Execution Checklist

Problem Statement: #9 — Agentic AI for Background Verification with Automated Workflow

---

## PHASE 0 – Foundation & Planning

### Task 0.1 – Project Initialization
- Set up ARIS repository with clean folder structure
- Backend: `app/core`, `app/models`, `app/schemas`, `app/routes`, `app/services`, `app/agents`
- Frontend: initialize fresh React/Vite/Tailwind application

### Task 0.2 – Documentation
- PRD.md drafted and finalized for ARIS
- ppt_doc.md briefing document written for presentation team
- tasks.md execution plan created
- README.md updated with ARIS branding and architecture

---

## PHASE 1 – Core Backend Infrastructure

### Task 1.1 – FastAPI Application Setup
- Initialize FastAPI app with CORS middleware
- Connect SQLAlchemy ORM to SQLite (dev) / PostgreSQL (prod)
- Auto-create tables on startup via `Base.metadata.create_all`
- Health check endpoint: `GET /`

### Task 1.2 – Application Data Model
- Create `Application` SQLAlchemy model with all required fields:
  - Identity: full_name, email, github_url, role_applied
  - Status: pending / in_review / accepted / rejected / intern
  - Scores: master_score, trust_score, confidence_band
  - JSON blobs: github_metrics, resume_analysis, score_breakdown, verification_report, training_plan

### Task 1.3 – Pydantic Schemas
- `ApplicationCreate` — intake payload validation
- `ApplicationResponse` — full candidate object for frontend
- `StatusUpdate` — status transition payload

---

## PHASE 2 – Data Services

### Task 2.1 – GitHub Service
- Fetch top 10 non-fork repositories by recency
- Aggregate: star count, language distribution (%), commit count (last 90 days)
- Compute: consistency score, recency score
- Handle: invalid URL, private profile, API rate limit (graceful fallback)

### Task 2.2 – Resume Parsing Service
- Accept PDF upload via `python-multipart`
- Extract text using `pdfplumber`
- Identify skill keywords, frameworks, project complexity indicators
- Return structured `resume_data` dict

### Task 2.3 – Deterministic Scoring Engine
- Compute component scores:
  - Resume skill match: 30%
  - GitHub activity: 25%
  - Project depth: 20%
  - Role alignment: 15%
  - Activity recency: 10%
- Output: `master_score` (0–100), `confidence_band` (High / Medium / Low)
- Explainable: return `score_breakdown_json` detailing each component

---

## PHASE 3 – Agentic Verification Crew (Core Innovation)

### Task 3.1 – CrewAI Setup
- Install `crewai` and `crewai-tools`
- Configure LLM provider: Groq (llama3-70b-8192) via OpenAI-compatible API
- Build tool functions for: GitHub data fetch, resume parse, score compute

### Task 3.2 – GitHub Analyst Agent
- Role: "Senior GitHub Activity Analyst"
- Goal: Fetch and evaluate candidate's GitHub coding history
- Tools: `github_fetch_tool`
- Output: Structured commit + language + repo quality report

### Task 3.3 – Fraud Detection Agent
- Role: "Background Verification Specialist"
- Goal: Cross-reference every resume claim against GitHub evidence
- Tools: `resume_parse_tool`, `claim_compare_tool`
- Output: Per-claim JSON with ✅/⚠️/❌ status and evidence

### Task 3.4 – Compliance Manager Agent
- Role: "Hiring Compliance Officer"
- Goal: Synthesize all findings into a Trust Score and HR report
- Tools: `score_compute_tool`
- Output: Trust Score (0–100), risk level, final Verification Report

### Task 3.5 – Onboarding Planner Agent
- Role: "Technical Onboarding Specialist"
- Goal: Build a personalized training plan based on verified gaps
- Tools: `training_plan_tool`
- Output: Week-by-week JSON curriculum

### Task 3.6 – Crew Orchestration
- Define Crew with sequential process: Analyst → Fraud Detector → Compliance → Planner
- Expose via `POST /applications/{id}/verify` endpoint
- Store results in DB: `verification_report_json`, `trust_score`, `training_plan_json`

---

## PHASE 4 – API Layer

### Task 4.1 – POST /applications
- Accept multipart form + resume PDF
- Run: resume parse → GitHub fetch → scoring engine
- Store all outputs to DB
- Return created application with initial scores

### Task 4.2 – GET /applications
- Return all applications ordered by created_at desc
- Include: summary fields, trust_score, confidence_band, status

### Task 4.3 – GET /applications/{id}
- Return full candidate intelligence object
- Map all JSON blobs to structured fields

### Task 4.4 – PATCH /applications/{id}/status
- Validate status transitions
- Update DB and return updated record

### Task 4.5 – GET /applications/stats
- Return: total, pending, accepted, rejected, new_this_week counts

### Task 4.6 – POST /applications/{id}/generate-plan
- Trigger Agent 4 (Onboarding Planner) independently if full crew already ran
- Store and return training plan JSON

### Task 4.7 – POST /applications/{id}/modify-plan
- Accept natural language message
- Feed to LLM to refine existing training plan
- Persist and return updated plan

---

## PHASE 5 – Frontend Integration

### Task 5.1 – Rebrand UI to ARIS
- Update sidebar: "ARIS" logo, "Review Room" → "Verification Center", "Interns" → "Talent Management"
- Update page titles and copy to corporate hiring language
- Update app `<title>` in index.html

### Task 5.2 – Candidate Portal
- Connect multi-step form to `POST /applications`
- Show loading indicator during agentic verification processing
- Display success with application ID

### Task 5.3 – Admin Dashboard
- Load live candidates from `GET /applications`
- Display Trust Score badge alongside master score
- Show verification status indicator (✅/⚠️/❌) per candidate row

### Task 5.4 – Verification Report UI
- On candidate detail page, add "Verification Report" tab
- Show per-claim evidence breakdown with color-coded badges
- Display Trust Score prominently

### Task 5.5 – Training Plan UI
- Display generated training plan with week-by-week view
- Chat interface for natural language plan refinement
- Admin can accept candidate → moves to Talent Management

### Task 5.6 – Analytics Dashboard
- Role distribution chart
- Trust score distribution histogram
- Verification status breakdown (Clear / Review / High Risk)
- Application volume over time

---

## PHASE 6 – Deployment

### Task 6.1 – Render Backend Deployment
- Root directory: `backend`
- Build: `pip install -r requirements.txt`
- Start: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:$PORT`
- Env vars: `GROQ_API_KEY`, `GITHUB_TOKEN`, `DATABASE_URL`

### Task 6.2 – Render Frontend Deployment
- Root directory: `frontend`
- Build: `npm install && npm run build`
- Publish: `dist`
- Env vars: `VITE_API_URL` → backend URL
- Rewrite rule: `/* → /index.html` (SPA routing)

### Task 6.3 – Render PostgreSQL
- Create managed PostgreSQL service on Render
- Use internal connection URL in backend env vars
- Verify auto-table-creation on first startup

---

## PHASE 7 – Demo Hardening

### Task 7.1 – Seed Mock Data
- Run `seed_mock_data.py` in production Render shell
- Seed 15 diverse candidates with varied trust scores and roles

### Task 7.2 – End-to-End Demo Run
Full demo flow rehearsal:
1. Submit new application via `/apply`
2. Watch agentic verification run (show progress/log)
3. Open admin dashboard — new candidate appears with Trust Score
4. Open Verification Report — per-claim evidence visible
5. Generate and edit training plan via chat
6. Accept candidate → Talent Management view

### Task 7.3 – Error Handling Audit
- GitHub API failure: safe fallback with error message
- LLM timeout: use deterministic fallback output
- Resume parse failure: continue with empty resume_data
- DB error: meaningful HTTP 500 with detail

---

# FINAL DEMO OBJECTIVE

Show judges a live candidate go from **"zero to verified"** in under 2 minutes:

> Anonymous resume + GitHub URL → ARIS agents investigate autonomously → Trust Score appears → Verification Report with evidence → Training Plan generated → Candidate onboarded.

If this flow works reliably → ARIS wins PS #9.
