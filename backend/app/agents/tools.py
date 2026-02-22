"""ARIS Agentic Tools — CrewAI tool wrappers for verification services.

These tools expose existing ARIS services to the CrewAI agent framework,
allowing agents to autonomously call GitHub audit, resume parsing, and
scoring functions during the verification workflow.
"""

from __future__ import annotations

import json
from typing import Any

from crewai.tools import tool

from app.services.github_service import fetch_github_metrics
from app.services.scoring_service import compute_scores


@tool("Fetch GitHub Profile")
def fetch_github_profile(github_url: str) -> str:
    """Fetch and analyze a candidate's public GitHub profile.

    Retrieves repositories, commit history (last 90 days), language distribution,
    star counts, and activity recency. Returns a structured JSON report.

    Args:
        github_url: The candidate's GitHub profile URL or username.
    """
    try:
        metrics = fetch_github_metrics(github_url)
        return json.dumps(metrics, indent=2)
    except ValueError as e:
        return json.dumps({"error": str(e), "status": "not_found"})
    except Exception as e:
        return json.dumps({"error": f"GitHub API error: {str(e)}", "status": "api_error"})


@tool("Compute Candidate Scores")
def compute_candidate_scores(
    github_metrics_json: str,
    role_applied: str,
    resume_keywords_json: str = "[]",
) -> str:
    """Compute deterministic trust and skill scores for a candidate.

    Uses weighted scoring across 5 dimensions: resume skills (30%),
    GitHub activity (25%), project depth (20%), role alignment (15%),
    and recency (10%). Returns master score, confidence band, and breakdown.

    Args:
        github_metrics_json: JSON string of GitHub metrics from the GitHub Analyst.
        role_applied: The role the candidate applied for.
        resume_keywords_json: JSON array of skill keywords from the candidate's resume.
    """
    try:
        github_metrics = json.loads(github_metrics_json)
    except (json.JSONDecodeError, TypeError):
        github_metrics = {}

    resume_data = None
    try:
        keywords = json.loads(resume_keywords_json)
        if keywords:
            resume_data = {"keywords_detected": keywords}
    except (json.JSONDecodeError, TypeError):
        pass

    result = compute_scores(
        github_metrics,
        resume_data=resume_data,
        role_applied=role_applied,
    )
    return json.dumps(result, indent=2)


@tool("Cross Reference Claims")
def cross_reference_claims(
    resume_skills_json: str,
    github_languages_json: str,
) -> str:
    """Cross-reference resume skill claims against actual GitHub evidence.

    Compares each claimed skill against the candidate's real GitHub language
    distribution and repository activity. Returns per-skill verification status.

    Args:
        resume_skills_json: JSON array of skills claimed on the resume.
        github_languages_json: JSON object of language percentages from GitHub.
    """
    try:
        claimed_skills = json.loads(resume_skills_json)
    except (json.JSONDecodeError, TypeError):
        claimed_skills = []

    try:
        github_langs = json.loads(github_languages_json)
    except (json.JSONDecodeError, TypeError):
        github_langs = {}

    github_lang_set = {lang.lower() for lang in github_langs.keys()}

    # Language-to-technology mapping for indirect verification
    TECH_LANG_MAP = {
        "react": ["javascript", "typescript"],
        "vue": ["javascript", "typescript"],
        "angular": ["typescript", "javascript"],
        "next.js": ["javascript", "typescript"],
        "fastapi": ["python"],
        "django": ["python"],
        "flask": ["python"],
        "express": ["javascript", "typescript"],
        "spring": ["java", "kotlin"],
        "node.js": ["javascript", "typescript"],
        "tensorflow": ["python", "jupyter notebook"],
        "pytorch": ["python", "jupyter notebook"],
        "pandas": ["python", "jupyter notebook"],
        "sklearn": ["python"],
        "docker": [],  # infrastructure, can't verify from languages
        "kubernetes": [],
        "aws": [],
        "sql": [],
        "postgresql": [],
        "mongodb": [],
        "redis": [],
        "git": [],
    }

    verification_results = []
    for skill in claimed_skills:
        skill_lower = skill.lower().strip()

        # Direct match: skill name matches a GitHub language
        if skill_lower in github_lang_set:
            pct = github_langs.get(skill, github_langs.get(skill_lower, 0))
            if pct > 10:
                status = "verified"
                evidence = f"Found {pct}% usage in GitHub repositories"
            else:
                status = "partial"
                evidence = f"Found {pct}% usage — minimal presence"
        elif skill_lower in TECH_LANG_MAP:
            # Indirect match via parent language
            parent_langs = TECH_LANG_MAP[skill_lower]
            if not parent_langs:
                status = "unverifiable"
                evidence = "Infrastructure skill — cannot verify from code alone"
            else:
                found = [l for l in parent_langs if l in github_lang_set]
                if found:
                    status = "partial"
                    evidence = f"Parent language(s) {', '.join(found)} found in GitHub"
                else:
                    status = "contradicted"
                    evidence = f"No {'/'.join(parent_langs)} found in GitHub repositories"
        else:
            # No match at all
            if any(skill_lower in lang.lower() or lang.lower() in skill_lower for lang in github_langs):
                status = "partial"
                evidence = "Loosely related language found in GitHub"
            else:
                status = "unverifiable"
                evidence = "Skill not detectable from public GitHub data"

        verification_results.append({
            "skill": skill,
            "status": status,  # verified | partial | contradicted | unverifiable
            "evidence": evidence,
        })

    # Summary counts
    counts = {"verified": 0, "partial": 0, "contradicted": 0, "unverifiable": 0}
    for r in verification_results:
        counts[r["status"]] = counts.get(r["status"], 0) + 1

    return json.dumps({
        "verification_results": verification_results,
        "summary": counts,
        "total_claims": len(claimed_skills),
    }, indent=2)
