from dataclasses import dataclass
import os

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("ARIS_APP_NAME", "ARIS Backend")
    database_url: str = os.getenv("ARIS_DATABASE_URL", "sqlite:///./aris.db")
    github_token: str | None = os.getenv("GITHUB_TOKEN", None)
    groq_api_key: str | None = os.getenv("GROQ_API_KEY", None)
    model: str = os.getenv("MODEL", "llama3-70b-8192")


settings = Settings()
