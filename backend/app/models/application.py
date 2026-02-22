from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String, Text

from ..database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    github_url = Column(String, nullable=False)
    role_applied = Column(String, nullable=False)
    status = Column(
        String,
        nullable=False,
        default="pending",
        index=True,
    )

    # Scoring fields
    master_score = Column(Float, nullable=True)
    trust_score = Column(Float, nullable=True)
    confidence_band = Column(String, nullable=True)

    # Candidate input data
    personal_json = Column(Text, nullable=True)
    education_json = Column(Text, nullable=True)
    experience_json = Column(Text, nullable=True)
    professional_json = Column(Text, nullable=True)
    motivation_json = Column(Text, nullable=True)

    # AI + Agentic outputs
    github_metrics_json = Column(Text, nullable=True)
    resume_analysis_json = Column(Text, nullable=True)
    score_breakdown_json = Column(Text, nullable=True)
    learning_gaps_json = Column(Text, nullable=True)
    verification_report_json = Column(Text, nullable=True)
    background_report_json = Column(Text, nullable=True)
    training_plan_json = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
