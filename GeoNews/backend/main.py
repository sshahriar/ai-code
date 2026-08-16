"""GeoNews FastAPI application.

Run from ``backend/``:

    uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""

from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import init_db
from errors import http_exception_handler
from ingest import start_scheduler
from routes import (
    brief,
    chat,
    events,
    health,
    hotspots,
    incidents,
    ingest,
    places,
    stream,
    watchlist,
)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    conn = init_db()
    conn.close()
    start_scheduler()
    yield


app = FastAPI(title="GeoNews API", version="0.1.0", lifespan=lifespan)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(events.router)
app.include_router(hotspots.router)
app.include_router(stream.router)
app.include_router(places.router)
app.include_router(watchlist.router)
app.include_router(incidents.router)
app.include_router(ingest.router)
app.include_router(brief.router)
app.include_router(chat.router)
