# ARIS — Agentic Background Verification & Enterprise Hiring System
## PPT Briefing Document (For Presentation Team)
## Team Kaizen (Team No. 45) | TechAlfa Hackathon — Day 2

---

# 1. What is ARIS?

ARIS is a **corporate-grade, agentic AI hiring platform** that automates the most critical and costly part of recruitment:

**Background Verification.**

It addresses **Problem Statement #9: Agentic AI for Background Verification with Automated Workflow.**

Unlike traditional ATS systems that simply filter resumes, ARIS deploys an autonomous team of specialized AI agents to **investigate, audit, and verify** every candidate before a human ever reads a single word.

The full pipeline:

**Apply → Investigate → Audit → Verify → Score → Onboard**

---

# 2. Problem Statement

Corporate hiring is broken in three specific ways:

### The Resume Padding Problem
- 78% of resumes contain at least one exaggerated or fabricated claim
- "5 years of React experience" is unverifiable from a resume alone
- Fraudulent credentials cost companies millions in bad hires

### The Manual Verification Bottleneck
- Background checks currently take 3–14 business days
- They rely on phone calls to previous employers and static database lookups
- They cannot verify *technical competency*, only identity and employment dates

### The Screening Inefficiency
- Senior engineers spend 40% of their time reviewing candidates who should never have passed screening
- Traditional ATS tools are static filters, not intelligent auditors

**No existing platform autonomously cross-references technical claims against real-world evidence.**

ARIS solves this.

---

# 3. The Solution: Multi-Agent Verification Crew

ARIS uses **CrewAI** to orchestrate a team of specialized autonomous agents:

```
[Candidate Submission]
        │
        ▼
┌─────────────────────┐
│  AGENT 1            │
│  GitHub Analyst     │ ──► Audits repositories, commit history,
│                     │     language proficiency, code quality
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  AGENT 2            │
│  Fraud Detector     │ ──► Cross-references resume claims vs
│                     │     GitHub reality, flags mismatches
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  AGENT 3            │
│  Compliance Officer │ ──► Computes Trust Score (0-100),
│                     │     writes final Verification Report
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  AGENT 4            │
│  Onboarding Planner │ ──► Generates personalized week-by-week
│                     │     training plan for verified gaps
└─────────────────────┘
        │
        ▼
[HR Dashboard — Verified Profile + Trust Score + Training Plan]
```

---

# 4. Agentic Workflow in Detail

### Agent 1 — GitHub Analyst
- Pulls candidate's public repositories via GitHub REST API
- Measures: commit frequency (last 90 days), language distribution, repo complexity, star ratings
- Extracts: top 3 strongest real-world skills, programming consistency, project depth

### Agent 2 — Fraud Detection Specialist
- Parses resume PDF to extract all skill and experience claims
- Cross-references every major claim against Agent 1's findings
- Example: Candidate claims "Expert Python Dev" → Agent finds 0 Python commits in 12 months → **RED FLAG**
- Assigns risk level per claim: ✅ Verified / ⚠️ Partially Verified / ❌ Contradicted

### Agent 3 — Compliance Manager
- Synthesizes all evidence into a **Trust Score (0–100)**
- Identifies critical red flags vs acceptable discrepancies
- Produces a structured Verification Report for HR
- Makes a recommendation: ✅ Clear / ⚠️ Manual Review Required / ❌ High Risk

### Agent 4 — Onboarding Planner
- Takes the *verified* technical profile (not the claimed one)
- Identifies provable gaps between current skills and role requirements
- Generates a personalized week-by-week training curriculum to bridge those gaps
- Editable by HR through a natural language chat interface

---

# 5. What HR Sees (Admin Dashboard)

The admin command center gives HR teams:

- **Ranked Candidate Table** — sorted by Trust Score, not just resume score
- **Verification Status** per candidate — ✅ / ⚠️ / ❌ per claim category
- **Full Audit Report** — complete agent findings with evidence
- **Training Plan** — ready-to-assign onboarding curriculum
- **Analytics** — role distribution, trust score bands, verification throughput
- **One-click Status** — Shortlist / Hold / Reject

---

# 6. Technology Stack

| Layer | Technology |
|---|---|
| **Agentic Framework** | CrewAI (Multi-Agent Orchestration) |
| **LLM** | Groq (llama3-70b-8192) — sub-500ms responses |
| **Backend** | Python 3.11 · FastAPI · SQLAlchemy |
| **Database** | PostgreSQL (production) · SQLite (development) |
| **Data Sources** | GitHub REST API · PDF Resume Parsing (pdfplumber) |
| **Frontend** | React 18 · TypeScript · Vite · Tailwind CSS |
| **Deployment** | Render (Backend + Frontend) |

---

# 7. Core Innovations

### 1. First Agentic Background Verification Pipeline
The system does not run a fixed script. The agents **reason and adapt** — if GitHub data is missing, Agent 1 searches by name; if a project is private, it uses commit metadata.

### 2. Deterministic Trust Score (Not a Black Box)
Every point of the 0-100 Trust Score is traceable to a specific piece of evidence:
- GitHub commits → 25 pts
- Skills match → 30 pts
- Project quality → 20 pts
- Role alignment → 15 pts
- Activity recency → 10 pts

### 3. Evidence-Based Hiring (Not Claim-Based)
For the first time: HR shortlists candidates based on **what they can provably do**, not what they claim to have done.

### 4. Automated Onboarding from Day 1
The same system that verifies the candidate immediately generates their first-week onboarding plan. No manual handoff required.

---

# 8. What Makes ARIS Different

| Feature | Traditional ATS | ARIS |
|---|---|---|
| Resume Parsing | ✅ | ✅ |
| Background Verification | ❌ (manual, external) | ✅ Automated, < 2 min |
| GitHub Audit | ❌ | ✅ Deep behavioral analysis |
| AI Agents | ❌ | ✅ Multi-agent CrewAI |
| Trust Scoring | ❌ | ✅ Deterministic + explainable |
| Fraud Detection | ❌ | ✅ Automatic claim-vs-reality |
| Onboarding Plan | ❌ | ✅ Personalized, role-aligned |
| Time to Verify | 3–14 days | **< 2 minutes** |

---

# 9. Target Market

### Primary
- Corporate HR departments (tech companies, consultancies)
- Recruitment agencies handling high-volume technical hiring
- Startups that cannot afford bad early hires

### Secondary
- University placement cells hiring for internships
- Government departments processing public sector technical roles

---

# 10. Monetization (SaaS)

| Tier | Price | Includes |
|---|---|---|
| **Pay-Per-Verify** | $2/candidate | Full agentic verification report |
| **Pro** | $199/mo | 500 candidates/mo + dashboard analytics |
| **Enterprise** | Custom | White-label, SSO, ATS integration (Workday, Greenhouse), fine-tuned models |

**ROI:** Replacing even 1 bad senior hire (avg. cost: $50,000+) more than covers a full year of Enterprise licensing.

---

# 11. Scalability

- **Stateless Agent Execution** — each verification crew runs independently and in parallel
- **Async Pipelines** — GitHub API calls and LLM generation run concurrently, not sequentially
- **Easy DB Migration** — 1-line switch from SQLite → PostgreSQL via `DATABASE_URL` environment variable
- **Horizontal Scaling** — additional FastAPI workers can be added with zero code changes

---

# 12. Vision

To become the global standard for evidence-based technical hiring—replacing the era of "trust me" resumes with a world where every hire is backed by autonomous, auditable, AI-verified proof of competence.

**ARIS: Don't trust the resume. Verify the engineer.**
