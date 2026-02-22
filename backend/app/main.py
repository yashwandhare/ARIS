from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.applications import router as applications_router
from .database import Base, engine

app = FastAPI(title="ARIS Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    from . import models  # noqa: F401

    Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"status": "ARIS backend running"}


app.include_router(
    applications_router,
    prefix="/applications",
    tags=["applications"],
)
