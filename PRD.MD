# ARIS – Agentic Recruitment Intelligence System
## Product Requirements Document (PRD)

Version: 2.0  
Author: Team Kaizen (Team No. 45)  
Status: Day 2 Hackathon Sprint  
Problem Statement: #9 — Agentic AI for Background Verification with Automated Workflow

---

# 1. Executive Summary

## 1.1 What is ARIS?

ARIS (Agentic Recruitment Intelligence System) is a corporate-grade, autonomous hiring platform that uses multi-agent AI to:

- Automatically verify candidate background claims against real evidence
- Audit technical skills via GitHub behavioral analysis
- Detect resume fraud and skill exaggerations
- Generate explainable Trust Scores backed by real data
- Produce personalized onboarding training plans for verified candidates

ARIS is not an ATS. It is an **Evidence-Based Hiring Engine** — the first of its kind to autonomously investigate candidates using a collaborative team of specialized AI agents.

---

## 1.2 Problem Statement

Corporate technical hiring faces three compounding problems:

### 1. Resume Fraud is Pervasive
- 78% of resumes contain at least one exaggerated claim
- Skills like "5 years of Python" are impossible to verify from a document alone
- Bad hires cost companies $50,000+ per incident

### 2. Manual Verification is Slow and Expensive
- Traditional background checks take 3–14 business days
- They verify identity and employment dates — not technical competency
- Senior engineers waste 40% of their time screening candidates who shouldn't have passed

### 3. No Platform Connects Verification to Onboarding
- Even when verification is complete, onboarding plans are built manually from scratch
- There is no automated handoff from "candidate verified" to "training plan ready"

**ARIS solves all three problems with a single, autonomous pipeline.**

---

## 1.3 Target Users

### Primary Users
- Corporate HR departments (tech companies, consultancies)
- High-volume recruitment agencies
- Engineering leads responsible for technical hiring

### Secondary Users
- Startup founders hiring their first engineering team
- University placement cells staffing technical internships

---

# 2. Product Vision

To build the global standard for evidence-based technical hiring — where every hire is backed by autonomous, auditable, AI-verified proof of competence.

**Tagline: "Know who you're hiring."**

---

# 3. System Architecture

## 3.1 High-Level Flow

```
Candidate Application Portal (Frontend)
        ↓
FastAPI Backend (Orchestrator)
        ↓
CrewAI Agent Pipeline
  ├── Agent 1: GitHub Analyst
  ├── Agent 2: Fraud Detector
  ├── Agent 3: Compliance Manager
  └── Agent 4: Onboarding Planner
        ↓
PostgreSQL / SQLite (Persistence)
        ↓
Admin Command Center (Frontend)
        ↓
Talent Management / Intern Portal (Frontend)
```

## 3.2 Backend Layers

1. **Routes Layer** — REST API endpoints
2. **Agent Orchestration Layer** — CrewAI crew management
3. **Service Layer** — GitHub, scoring, and planning logic
4. **Data Layer** — SQLAlchemy ORM + PostgreSQL/SQLite

---

# 4. Technology Stack

## 4.1 Backend

- Python 3.11+
- FastAPI
- CrewAI (Multi-Agent Framework)
- SQLAlchemy (ORM)
- PostgreSQL (production) / SQLite (development)
- GitHub REST API
- Groq LLM (llama3-70b-8192) — sub-500ms responses
- pdfplumber (resume parsing)
- python-multipart (file uploads)
- gunicorn + uvicorn (production server)

## 4.2 Frontend

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query (React Query)
- React Router v6

## 4.3 Deployment

- Render (Backend Web Service + Frontend Static Site)
- PostgreSQL via Render managed database
- GitHub-triggered CI/CD (auto-deploy on push to main)

---

# 5. Agentic Verification Pipeline (Core Feature)

## 5.1 Agent 1 — GitHub Analyst

**Input:** GitHub profile URL  
**Actions:**
- Fetch top 10 active repositories (exclude forks)
- Count commits in the last 90 days
- Extract language distribution (as percentages)
- Score repository complexity and star ratings
- Evaluate activity recency and consistency

**Output:**
```json
{
  "top_languages": {"Python": 60, "JavaScript": 30},
  "commits_90_days": 42,
  "total_repos": 12,
  "total_stars": 87,
  "consistency_score": 78
}
```

## 5.2 Agent 2 — Fraud Detection Specialist

**Input:** Agent 1 output + parsed resume text  
**Actions:**
- Extract all skill claims from resume
- Cross-reference each claim against GitHub evidence
- Assign per-claim verification status: ✅ Verified / ⚠️ Partial / ❌ Contradicted
- Flag timeline gaps and suspicious commit patterns (e.g. bulk commits before an interview)

**Output:** Red flag list with evidence, per-skill verification status

## 5.3 Agent 3 — Compliance Manager

**Input:** Agent 2 output  
**Actions:**
- Compute Trust Score (0–100) using weighted evidence
- Categorize overall risk: Clear / Review Required / High Risk
- Write a human-readable Verification Report for HR

**Trust Score Weights:**
| Component | Weight |
|---|---|
| GitHub Activity | 25% |
| Resume Skill Match | 30% |
| Project Depth | 20% |
| Role Alignment | 15% |
| Activity Recency | 10% |

## 5.4 Agent 4 — Onboarding Planner

**Input:** Verified skill profile + target role  
**Actions:**
- Identify provable learning gaps (verified skills vs. role requirements)
- Generate week-by-week training curriculum
- Allow HR to refine via natural language chat

**Output:** Structured JSON training plan (4–8 weeks based on confidence tier)

---

# 6. Data Schema

## 6.1 Applications Table

| Column | Type |
|---|---|
| id | Integer (PK) |
| full_name | String |
| email | String (indexed) |
| github_url | String |
| role_applied | String |
| status | String (pending/in_review/accepted/rejected/intern) |
| master_score | Float |
| trust_score | Float |
| confidence_band | String |
| personal_json | Text (JSON) |
| education_json | Text (JSON) |
| experience_json | Text (JSON) |
| professional_json | Text (JSON) |
| github_metrics_json | Text (JSON) |
| resume_analysis_json | Text (JSON) |
| score_breakdown_json | Text (JSON) |
| verification_report_json | Text (JSON) |
| learning_gaps_json | Text (JSON) |
| training_plan_json | Text (JSON) |
| created_at | DateTime |
| updated_at | DateTime |

---

# 7. API Endpoints

## Candidate Intake
- `POST /applications` — Submit application + trigger full agent pipeline
- `GET /applications` — List all applications with summary fields
- `GET /applications/{id}` — Full candidate intelligence object
- `PATCH /applications/{id}/status` — Update hiring status
- `GET /applications/stats` — Dashboard stats (total, pending, accepted, rejected)

## Agentic Verification
- `POST /applications/{id}/verify` — Trigger CrewAI verification crew
- `GET /applications/{id}/verification-report` — Retrieve full verification report

## Training Plans
- `POST /applications/{id}/generate-plan` — Generate AI training plan
- `POST /applications/{id}/modify-plan` — Refine plan via natural language

---

# 8. Security Considerations

- CORS configuration (restricted to known frontend origins in production)
- Input validation via Pydantic schemas
- File size and type restrictions on resume uploads
- GitHub URL validation before API calls
- API key management via environment variables (never committed to repo)

---

# 9. Deployment Configuration

- **Backend:** Render Web Service, `backend/` root directory, gunicorn workers
- **Frontend:** Render Static Site, `frontend/` root directory, `dist/` publish dir
- **Database:** Render managed PostgreSQL, injected via `DATABASE_URL` env var
- **CI/CD:** Auto-deploy on push to `main` branch

---

# 10. Success Criteria (Demo Day)

1. Candidate submits application via portal.
2. ARIS automatically runs full agentic verification (< 2 minutes visible countdown or progress).
3. Admin sees candidate in dashboard with Trust Score and Verification Badge.
4. Admin opens full Verification Report with per-claim evidence.
5. Admin triggers training plan generation.
6. Training plan appears, admin refines via chat.
7. Admin accepts candidate → candidate moves to Talent Management view.

---

# 11. Future Enhancements

- LinkedIn scraping for employment history verification
- Multi-company tenancy with JWT + RBAC
- Semantic search across candidate database
- Integration with Workday / Greenhouse ATS
- Fine-tuned internal LLM for proprietary domain verification

---

END OF PRD
