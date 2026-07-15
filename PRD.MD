# ARIS – Agentic Recruitment Intelligence System
## Product Requirements Document (PRD)

Version: 2.0  
Author: Team Kaizen (Team No. 45)  
Status: Day 2 Hackathon Sprint  
Problem Statement: #9 — Agentic AI for Background Verification with Automated Workflow

---

# 1. Summary

ARIS is an autonomous hiring platform that verifies candidate claims, scores technical risk, and generates onboarding plans from real evidence.

## 2. Goals

- Verify resumes against GitHub and application data
- Produce an explainable Trust Score
- Generate a short onboarding plan for verified candidates
- Keep the workflow fully automated from intake to review

## 3. Users

- HR teams
- Engineering leads
- Recruitment agencies
- Startup hiring teams

## 4. Architecture

- Frontend: Candidate portal, admin dashboard, intern portal
- Backend: FastAPI routes, CrewAI orchestration, service layer, ORM
- Data: PostgreSQL in production, SQLite in development

## 5. Core Pipeline

1. Candidate submits an application
2. GitHub Analyst gathers repo and commit activity
3. Fraud Detector compares claims to evidence
4. Compliance Manager computes Trust Score and report
5. Onboarding Planner generates a training plan

## 6. Stack

- Python 3.11+, FastAPI, CrewAI, SQLAlchemy
- PostgreSQL / SQLite, GitHub REST API, Groq LLM
- React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- Render deployment

## 7. API

- `POST /applications`
- `GET /applications`
- `GET /applications/{id}`
- `PATCH /applications/{id}/status`
- `POST /applications/{id}/verify`
- `GET /applications/{id}/verification-report`
- `POST /applications/{id}/generate-plan`
- `POST /applications/{id}/modify-plan`

## 8. Security

- CORS restricted in production
- Pydantic validation on inputs
- Resume file limits
- GitHub URL validation
- Secrets only through environment variables

## 9. Deployment

- Backend: Render Web Service
- Frontend: Render Static Site
- Database: Render PostgreSQL
- CI/CD: auto-deploy on push to `main`

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
