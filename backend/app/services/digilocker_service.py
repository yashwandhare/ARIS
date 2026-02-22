"""Mock DigiLocker & Academic Bank of Credits (ABC) Verification Service.

NOTE: This is a MOCK implementation demonstrating the integration architecture.
Real DigiLocker API: https://developer.digitallocker.gov.in
Real ABC API:        https://www.abc.gov.in

API access requires 15-30 days approval. This mock shows the scalability —
replace `_mock_digilocker_call` and `_mock_abc_call` with real HTTP calls
once credentials are approved.
"""

from __future__ import annotations

import hashlib
import random
from datetime import datetime, timedelta
from typing import Any


# ── Deterministic seed from candidate_id for consistent mock data ────────────

def _seed(candidate_id: int, salt: str = "") -> random.Random:
    digest = hashlib.md5(f"{candidate_id}{salt}".encode()).hexdigest()
    return random.Random(int(digest[:8], 16))


# ── Institution pools ────────────────────────────────────────────────────────

UNIVERSITIES = [
    "IIT Bombay", "IIT Delhi", "NIT Trichy", "BITS Pilani",
    "VIT Vellore", "COEP Pune", "IIIT Hyderabad", "Symbiosis International",
    "Amity University", "Manipal Institute of Technology",
]

BOARDS = ["CBSE", "ICSE", "Maharashtra State Board", "RBSE", "MPBSE", "WBBSE"]

DEGREE_PROGRAMS = [
    ("B.Tech", "Computer Science & Engineering"),
    ("B.Tech", "Information Technology"),
    ("B.E.", "Electronics & Communication"),
    ("B.Sc.", "Computer Science"),
    ("BCA", "Computer Applications"),
    ("B.Tech", "Artificial Intelligence & ML"),
]

ABC_COURSES = [
    ("CS101", "Data Structures & Algorithms", 4),
    ("CS201", "Database Management Systems", 3),
    ("CS301", "Operating Systems", 4),
    ("CS302", "Computer Networks", 3),
    ("CS401", "Machine Learning Fundamentals", 4),
    ("CS402", "Cloud Computing", 3),
    ("CS403", "Software Engineering", 3),
    ("CS404", "Web Technologies", 3),
    ("MA101", "Discrete Mathematics", 4),
    ("MA201", "Probability & Statistics", 3),
    ("CS501", "Artificial Intelligence", 4),
    ("CS502", "Natural Language Processing", 3),
    ("CS503", "Cybersecurity Essentials", 3),
    ("CS504", "DevOps & CI/CD", 2),
    ("CS505", "Blockchain Technology", 2),
]

GRADE_MAP = ["A+", "A", "A", "A", "B+", "B+", "B", "B"]


# ── DigiLocker mock ──────────────────────────────────────────────────────────

def verify_digilocker(candidate_id: int, full_name: str) -> dict[str, Any]:
    """Simulate a DigiLocker API call.

    Returns verified government & academic documents for the candidate.
    In production: POST https://api.digitallocker.gov.in/public/oauth2/1/token
    then GET /public/oauth2/1/files/issued to fetch issued documents.
    """
    rng = _seed(candidate_id, "digilocker")

    degree_prog = rng.choice(DEGREE_PROGRAMS)
    university   = rng.choice(UNIVERSITIES)
    board_10     = rng.choice(BOARDS)
    board_12     = rng.choice(BOARDS)

    grad_year    = rng.randint(2020, 2024)
    cgpa         = round(rng.uniform(7.2, 9.8), 2)
    pct_10       = round(rng.uniform(78, 98), 1)
    pct_12       = round(rng.uniform(75, 97), 1)

    # 95% chance fully verified; 5% chance one doc is pending
    all_verified = rng.random() > 0.05
    deg_status   = "verified" if all_verified else "pending"

    documents = [
        {
            "doc_type": "AADHAR",
            "name": "Aadhaar Card",
            "issuer": "UIDAI",
            "status": "verified",
            "verified_at": _fmt_date(rng, 2023),
            "doc_id": f"AADHAR-{candidate_id:04d}-{rng.randint(1000,9999)}",
        },
        {
            "doc_type": "PAN",
            "name": "PAN Card",
            "issuer": "Income Tax Department",
            "status": "verified",
            "verified_at": _fmt_date(rng, 2022),
            "doc_id": f"PAN-{candidate_id:04d}-{rng.randint(1000,9999)}",
        },
        {
            "doc_type": "DEGREE",
            "name": f"{degree_prog[0]} {degree_prog[1]}",
            "issuer": university,
            "status": deg_status,
            "year": grad_year,
            "cgpa": cgpa,
            "verified_at": _fmt_date(rng, grad_year) if deg_status == "verified" else None,
            "doc_id": f"DEG-{university[:3].upper()}-{candidate_id:04d}",
        },
        {
            "doc_type": "MARKSHEET_12",
            "name": "Class XII Marksheet",
            "issuer": board_12,
            "status": "verified",
            "percentage": pct_12,
            "year": grad_year - 4,
            "verified_at": _fmt_date(rng, grad_year - 4),
            "doc_id": f"XII-{board_12[:3].upper()}-{candidate_id:04d}",
        },
        {
            "doc_type": "MARKSHEET_10",
            "name": "Class X Marksheet",
            "issuer": board_10,
            "status": "verified",
            "percentage": pct_10,
            "year": grad_year - 6,
            "verified_at": _fmt_date(rng, grad_year - 6),
            "doc_id": f"X-{board_10[:3].upper()}-{candidate_id:04d}",
        },
    ]

    verified_count = sum(1 for d in documents if d["status"] == "verified")
    overall_status = "fully_verified" if verified_count == len(documents) else "partially_verified"

    return {
        "provider": "DigiLocker",
        "api_endpoint": "https://api.digitallocker.gov.in/public/oauth2/1/files/issued",
        "status": overall_status,
        "candidate_name": full_name,
        "aadhaar_linked": True,
        "total_documents": len(documents),
        "verified_documents": verified_count,
        "documents": documents,
        "verification_timestamp": datetime.utcnow().isoformat() + "Z",
        "note": "MOCK — Awaiting DigiLocker API credentials (15-30 day approval process)",
    }


# ── Academic Bank of Credits mock ────────────────────────────────────────────

def verify_abc(candidate_id: int, full_name: str) -> dict[str, Any]:
    """Simulate an Academic Bank of Credits (ABC) API call.

    Returns the candidate's verified academic credit history.
    In production: GET https://www.abc.gov.in/api/v1/student/{abc_id}/credits
    """
    rng = _seed(candidate_id, "abc")

    university  = rng.choice(UNIVERSITIES)
    abc_id      = f"ABC{candidate_id:06d}{rng.randint(100,999)}"
    num_courses = rng.randint(8, min(15, len(ABC_COURSES)))
    courses_done = rng.sample(ABC_COURSES, num_courses)

    credits_earned = []
    total_credits  = 0
    total_points   = 0.0

    for code, name, credit in courses_done:
        grade = rng.choice(GRADE_MAP)
        gp    = {"A+": 10, "A": 9, "B+": 8, "B": 7}.get(grade, 7)
        credits_earned.append({
            "course_code": code,
            "course_name": name,
            "credits": credit,
            "grade": grade,
            "grade_points": gp,
            "institution": university,
            "semester": f"Sem {rng.randint(1,8)}",
            "year": rng.randint(2021, 2024),
            "status": "credited",
        })
        total_credits += credit
        total_points  += gp * credit

    sgpa = round(total_points / total_credits, 2) if total_credits else 0

    return {
        "provider": "Academic Bank of Credits (ABC)",
        "api_endpoint": "https://www.abc.gov.in/api/v1/student/credits",
        "status": "verified",
        "abc_id": abc_id,
        "candidate_name": full_name,
        "institution": university,
        "total_credits_earned": total_credits,
        "credits_required": 160,
        "completion_percentage": round((total_credits / 160) * 100, 1),
        "sgpa": sgpa,
        "courses": credits_earned,
        "verification_timestamp": datetime.utcnow().isoformat() + "Z",
        "note": "MOCK — Awaiting ABC API credentials (15-30 day approval process)",
    }


# ── Combined entry point ─────────────────────────────────────────────────────

def run_government_verification(candidate_id: int, full_name: str) -> dict[str, Any]:
    """Run both DigiLocker and ABC verification and return combined result."""
    digilocker = verify_digilocker(candidate_id, full_name)
    abc        = verify_abc(candidate_id, full_name)

    overall = (
        "fully_verified"
        if digilocker["status"] == "fully_verified" and abc["status"] == "verified"
        else "partially_verified"
    )

    return {
        "overall_status": overall,
        "digilocker": digilocker,
        "abc": abc,
    }


# ── helpers ──────────────────────────────────────────────────────────────────

def _fmt_date(rng: random.Random, year: int) -> str:
    start = datetime(year, 1, 1)
    offset = rng.randint(0, 364)
    return (start + timedelta(days=offset)).strftime("%Y-%m-%d")
