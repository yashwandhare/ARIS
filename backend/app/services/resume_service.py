"""Resume PDF parsing service using pdfplumber.

Extracts text, detects tech keywords, and computes an ATS-style score.
"""

from __future__ import annotations

import io
import re
from typing import Any

import pdfplumber


# Comprehensive tech keyword set for matching
TECH_KEYWORDS: set[str] = {
    # Languages
    "python", "javascript", "typescript", "java", "go", "rust", "c++", "c#",
    "ruby", "php", "swift", "kotlin", "scala", "r", "dart", "lua",
    # Frameworks / Libraries
    "react", "vue", "angular", "next.js", "nuxt", "svelte", "django",
    "flask", "fastapi", "express", "spring", "spring boot", "rails",
    "laravel", ".net", "flutter", "react native",
    # Data / ML
    "pandas", "numpy", "tensorflow", "pytorch", "sklearn", "scikit-learn",
    "keras", "opencv", "matplotlib", "seaborn", "jupyter", "spark",
    "airflow", "hadoop", "dbt",
    # Databases
    "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch",
    "dynamodb", "firebase", "supabase", "sqlite", "cassandra",
    # DevOps / Cloud
    "docker", "kubernetes", "aws", "gcp", "azure", "terraform",
    "ansible", "jenkins", "github actions", "ci/cd", "nginx", "linux",
    "shell", "bash", "prometheus", "grafana",
    # Tools / Concepts
    "git", "rest", "graphql", "microservices", "api", "agile", "scrum",
    "jira", "figma", "html", "css", "sass", "tailwind", "webpack",
    "vite", "node.js",
}


def parse_resume_pdf(file_bytes: bytes) -> dict[str, Any]:
    """Parse a PDF resume and extract structured data.

    Args:
        file_bytes: Raw bytes of the PDF file.

    Returns:
        Dict with keys: raw_text, keywords_detected, ats_score, project_quality,
        sections_found.
    """
    raw_text = _extract_text(file_bytes)
    if not raw_text or len(raw_text.strip()) < 20:
        return {
            "raw_text": raw_text or "",
            "keywords_detected": [],
            "ats_score": 0,
            "project_quality": 0,
            "sections_found": [],
        }

    keywords = _detect_keywords(raw_text)
    sections = _detect_sections(raw_text)
    project_quality = _assess_project_quality(raw_text, keywords, sections)
    ats_score = _compute_ats_score(keywords, sections, raw_text)

    return {
        "raw_text": raw_text,
        "keywords_detected": sorted(keywords),
        "ats_score": round(ats_score, 1),
        "project_quality": round(project_quality, 1),
        "sections_found": sections,
    }


def _extract_text(file_bytes: bytes) -> str:
    """Extract all text from PDF using pdfplumber."""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            pages = []
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    pages.append(text)
            return "\n".join(pages)
    except Exception:
        return ""


def _detect_keywords(text: str) -> list[str]:
    """Find tech keywords present in the resume text."""
    text_lower = text.lower()
    found = []
    for kw in TECH_KEYWORDS:
        # Use word boundary matching for short keywords
        if len(kw) <= 3:
            if re.search(rf"\b{re.escape(kw)}\b", text_lower):
                found.append(kw)
        else:
            if kw in text_lower:
                found.append(kw)
    return found


def _detect_sections(text: str) -> list[str]:
    """Detect common resume sections."""
    text_lower = text.lower()
    section_keywords = {
        "education": ["education", "academic", "university", "degree", "gpa", "cgpa"],
        "experience": ["experience", "work history", "internship", "employment"],
        "projects": ["project", "portfolio", "built", "developed", "created"],
        "skills": ["skill", "technical", "technology", "proficient", "competenc"],
        "certifications": ["certif", "credential", "award", "achievement"],
        "summary": ["summary", "objective", "about me", "profile"],
    }
    found = []
    for section, keywords in section_keywords.items():
        if any(kw in text_lower for kw in keywords):
            found.append(section)
    return found


def _assess_project_quality(
    text: str, keywords: list[str], sections: list[str]
) -> float:
    """Assess project quality from resume content (0-100)."""
    score = 0.0

    # Has projects section
    if "projects" in sections:
        score += 25.0

    # Project-related action verbs
    action_verbs = [
        "built", "developed", "designed", "implemented", "created",
        "deployed", "integrated", "architected", "optimized", "automated",
        "configured", "maintained", "contributed",
    ]
    text_lower = text.lower()
    verb_count = sum(1 for v in action_verbs if v in text_lower)
    score += min(verb_count * 5.0, 25.0)

    # Deployment / production indicators
    deploy_indicators = [
        "deploy", "production", "live", "hosted", "aws", "heroku",
        "vercel", "netlify", "docker", "ci/cd", "kubernetes",
    ]
    deploy_count = sum(1 for d in deploy_indicators if d in text_lower)
    score += min(deploy_count * 5.0, 20.0)

    # Tech keyword richness
    score += min(len(keywords) * 2.0, 20.0)

    # Resume length bonus (longer = more detail)
    word_count = len(text.split())
    if word_count > 300:
        score += 10.0
    elif word_count > 150:
        score += 5.0

    return min(score, 100.0)


def _compute_ats_score(
    keywords: list[str], sections: list[str], text: str
) -> float:
    """Compute an ATS compatibility score (0-100)."""
    score = 0.0

    # Keyword richness (up to 40 pts)
    score += min(len(keywords) * 4.0, 40.0)

    # Section completeness (up to 30 pts)
    expected = {"education", "experience", "skills", "projects"}
    present = set(sections)
    score += (len(present.intersection(expected)) / len(expected)) * 30.0

    # Contact info indicators (up to 15 pts)
    text_lower = text.lower()
    if "@" in text_lower:
        score += 5.0
    if any(x in text_lower for x in ["github", "linkedin", "portfolio"]):
        score += 5.0
    if re.search(r"\d{10}", text):
        score += 5.0

    # Formatting quality (up to 15 pts)
    lines = text.split("\n")
    if len(lines) > 20:
        score += 5.0
    if any(line.isupper() and len(line.strip()) > 3 for line in lines):
        score += 5.0  # Has section headers
    word_count = len(text.split())
    if 200 < word_count < 1500:
        score += 5.0  # Good length

    return min(score, 100.0)
