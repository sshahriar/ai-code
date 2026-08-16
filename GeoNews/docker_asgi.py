"""Docker ASGI entry: FastAPI app + optional Next static export.

DevOps-owned glue (not feature routes). Serves ``/app/static`` when present so
``http://localhost:8000`` returns the UI while ``/api/*`` stays on FastAPI.
"""

from __future__ import annotations

from pathlib import Path

from fastapi.staticfiles import StaticFiles

from main import app

_STATIC_DIR = Path("/app/static")
if _STATIC_DIR.is_dir() and (_STATIC_DIR / "index.html").is_file():
    app.mount(
        "/",
        StaticFiles(directory=str(_STATIC_DIR), html=True),
        name="frontend",
    )
