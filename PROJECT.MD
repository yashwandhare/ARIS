# ARIS — Agentic Recruitment Intelligence System
ARIS is an evidence-based hiring platform that uses AI agents to verify candidate claims, score technical risk, and generate onboarding plans.

## Core Flow

- Candidate submits an application.
- FastAPI stores the submission and triggers the crew.
- CrewAI checks GitHub activity, compares it to resume claims, and computes a Trust Score.
- The verified profile is saved to PostgreSQL and surfaced in the admin and intern portals.

## Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- Backend: FastAPI, SQLAlchemy, PostgreSQL, SQLite
- AI: CrewAI, Groq LLM, GitHub REST API

## Key Endpoints

- `POST /applications`
- `GET /applications`
- `GET /applications/{id}`
- `PATCH /applications/{id}/status`
- `POST /applications/{id}/verify`
- `POST /applications/{id}/generate-plan`

---

## Folder Structure

### Backend

```
backend/
├── requirements.txt
├── seed_mock_data.py
├── seed_audit.py
└── app/
    ├── main.py
    ├── database.py
    ├── models/
    │   └── application.py
    ├── schemas/
    │   └── application.py
    ├── routes/
    │   └── applications.py
    ├── agents/
    │   ├── verification_crew.py
    │   └── tools.py
    └── services/
        ├── github_service.py
        ├── resume_service.py
        ├── scoring_service.py
        ├── llm_service.py
        ├── training_plan_service.py
        └── digilocker_service.py
```

### Frontend

```
frontend/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── pages/
    │   ├── Dashboard.tsx
    │   ├── ReviewRoom.tsx
    │   ├── CandidateDetail.tsx
    │   ├── Interns.tsx
    │   ├── Analytics.tsx
    │   ├── Settings.tsx
    │   └── Apply.tsx
    ├── components/
    │   └── layout/
    │       ├── Sidebar.tsx
    │       └── Header.tsx
    ├── features/
    │   └── intern/
    │       └── portal/
    │           ├── InternLayout.tsx
    │           └── pages/
    │               ├── InternDashboard.tsx
    │               ├── TasksPage.tsx
    │               ├── TaskDetailPage.tsx
    │               ├── TrainingPlanPage.tsx
    │               ├── PerformancePage.tsx
    │               └── CertificatePage.tsx
    ├── lib/
    ├── types/
    └── data/
```

---

## Deployment

ARIS is deployed on **Render** via `render.yaml`:

- **Backend** — Python Web Service, gunicorn + uvicorn, auto-deploys on push to `main`
- **Frontend** — Static Site, Vite build → `dist/`, SPA fallback rewrite
- **Database** — Render managed PostgreSQL, connection string auto-injected as `DATABASE_URL`
- **Secrets** — `LLM_API_KEY`, `GITHUB_TOKEN` set manually in Render dashboard

CI/CD: every push to `main` triggers automatic redeploy of both services.
