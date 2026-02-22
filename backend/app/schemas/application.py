from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ApplicationCreate(BaseModel):
    full_name: str
    email: str
    github_url: str
    role_applied: str
    status: str = "pending"
    resume_text: Optional[str] = None

    master_score: Optional[float] = None
    trust_score: Optional[float] = None
    confidence_band: Optional[str] = None

    personal_json: Optional[str] = None
    education_json: Optional[str] = None
    experience_json: Optional[str] = None
    professional_json: Optional[str] = None
    motivation_json: Optional[str] = None
    github_metrics_json: Optional[str] = None
    resume_analysis_json: Optional[str] = None
    score_breakdown_json: Optional[str] = None
    learning_gaps_json: Optional[str] = None
    verification_report_json: Optional[str] = None
    background_report_json: Optional[str] = None
    training_plan_json: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: int
    full_name: str
    email: str
    github_url: str
    role_applied: str
    status: str

    master_score: Optional[float] = None
    trust_score: Optional[float] = None
    confidence_band: Optional[str] = None

    personal_json: Optional[str] = None
    education_json: Optional[str] = None
    experience_json: Optional[str] = None
    professional_json: Optional[str] = None
    motivation_json: Optional[str] = None
    github_metrics_json: Optional[str] = None
    resume_analysis_json: Optional[str] = None
    score_breakdown_json: Optional[str] = None
    learning_gaps_json: Optional[str] = None
    verification_report_json: Optional[str] = None
    background_report_json: Optional[str] = None
    training_plan_json: Optional[str] = None

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ApplicationStatusUpdate(BaseModel):
    status: str
