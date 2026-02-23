# ARIS — Project Report

## Current State

ARIS is fully operational and deployed on Render at [https://aris-frontend-6574.onrender.com/](https://aris-frontend-6574.onrender.com/). The complete agentic pipeline is live: candidates submit applications through the public portal at `/apply`, triggering an automated CrewAI crew — comprising a GitHub Analyst, Fraud Detector, Compliance Manager, and Onboarding Planner — that runs background verification against real GitHub data, computes a Trust Score, and generates a personalized training plan, all without any manual intervention. The admin command center provides a full HR dashboard with candidate queues, deep-dive verification reports, per-claim evidence, agentic audit logs, government verification (DigiLocker mock), an analytics view, and a training plan chat interface for natural-language refinement. The intern portal is also live, offering assigned tasks, week-by-week training plans, performance metrics, and certificate tracking. The backend (FastAPI + PostgreSQL via Render managed DB) and frontend (React + Vite static site) are both auto-deployed on push to `main`, with mock candidate data seeded on each deployment startup.

---

## Log

| Date & Time | Entry |
|---|---|
| 2026-02-23 21:41 IST | Initial report filed. Project deployed and fully functional on Render. All core features shipped: agentic verification, trust scoring, training plan generation, admin dashboard, intern portal, and candidate application portal. |
