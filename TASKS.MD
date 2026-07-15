# ARIS – Task Tracker
> Tracks shipped work against the PRD.

---

## System Setup

- [x] FastAPI backend bootstrapped
- [x] SQLAlchemy ORM + SQLite / PostgreSQL data layer
- [x] Application model and Pydantic schemas
- [x] React 18 + TypeScript + Vite frontend
- [x] Tailwind CSS + shadcn/ui
- [x] TanStack Query and React Router v6
- [x] `render.yaml` deployment config

---

## API Endpoints

### Candidate Intake
- [x] `POST /applications`
- [x] `GET /applications`
- [x] `GET /applications/{id}`
- [x] `PATCH /applications/{id}/status`
- [x] `GET /applications/stats`

### Agentic Verification
- [x] `POST /applications/{id}/verify`
- [x] `GET /applications/{id}/government-verification`

### Training Plans
- [x] `POST /applications/{id}/generate-plan`
- [x] `POST /applications/{id}/modify-plan`

---

## Agent Pipeline

- [x] GitHub Analyst
- [x] Fraud Detector
- [x] Compliance Manager
- [x] Onboarding Planner
- [x] CrewAI auto-triggers on `POST /applications`
- [x] CrewAI environment and tool wiring

---

## Backend Services

- [x] GitHub Service
- [x] Resume Service
- [x] Scoring Service
- [x] LLM Service
- [x] Training Plan Service
- [x] DigiLocker Service

---

## Data & Seeding

- [x] Mock candidate seed script
- [x] Audit seed script
- [x] Seed scripts run on startup

---

## Admin Frontend

- [x] Dashboard
- [x] Review Room
- [x] Candidate Detail
- [x] Interns
- [x] Analytics
- [x] Settings
- [x] Sidebar and header

---

## Intern Portal

- [x] Intern layout and navigation
- [x] Intern Dashboard
- [x] Tasks Page
- [x] Task Detail Page
- [x] Training Plan Page
- [x] Performance Page
- [x] Certificate Page

---

## Candidate Portal

- [x] Apply Page
- [x] Multi-part application form

---

## Security

- [x] CORS configuration
- [x] Pydantic validation
- [x] Resume upload restrictions
- [x] GitHub URL validation
- [x] Environment-managed secrets
- [x] Valid status transitions

---

## Deployment

- [x] `render.yaml`
- [x] gunicorn + uvicorn
- [x] `DATABASE_URL`
- [x] `LLM_API_KEY` / `LLM_MODEL`
- [x] `VITE_API_URL`
- [x] SPA fallback rewrite
- [x] Frontend build pipeline
- [x] `dist/` publish directory

---

## Core Delivery

- [x] Application submission via `/apply`
- [x] Automatic verification pipeline
- [x] Trust Score and verification report in admin
- [x] Training plan generation and refinement
- [x] Accepted candidates move to Interns

---

## Future Enhancements

- [ ] LinkedIn scraping for employment history verification
- [ ] Multi-company tenancy with JWT + RBAC
- [ ] Semantic search across candidate database
- [ ] Integration with Workday / Greenhouse ATS
- [ ] Fine-tuned internal LLM for proprietary domain verification
- [ ] Real DigiLocker & Academic Bank of Credits API integration (replace mock)
- [ ] Progress countdown / live status updates during verification (WebSocket or polling)
