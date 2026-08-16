# GeoNews multi-stage image (plan §18)
# Stage 1: Node 20 — npm ci && npm run build → frontend/out
# Stage 2: Python 3.12 + uv — backend + static export, port 8000
# Production image does NOT include Playwright browsers.

# ---------------------------------------------------------------------------
# Stage 1 — Next.js static export
# ---------------------------------------------------------------------------
FROM node:20-bookworm-slim AS frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
# Ignore any host `out/` copied in; always produce a fresh export in-image.
RUN rm -rf out .next \
  && npm run build \
  && test -f /frontend/out/index.html

# ---------------------------------------------------------------------------
# Stage 2 — FastAPI + static files
# ---------------------------------------------------------------------------
FROM python:3.12-slim-bookworm AS runtime

COPY --from=ghcr.io/astral-sh/uv:0.6.14 /uv /usr/local/bin/uv

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_SYSTEM_PYTHON=1 \
    HOST=0.0.0.0 \
    PORT=8000

WORKDIR /app

COPY backend/pyproject.toml /app/backend/pyproject.toml
COPY backend/ /app/backend/
COPY docker_asgi.py /app/backend/docker_asgi.py
COPY --from=frontend-build /frontend/out /app/static

RUN mkdir -p /app/db \
  && uv pip install --system --no-cache -e /app/backend

WORKDIR /app/backend

EXPOSE 8000

CMD ["uvicorn", "docker_asgi:app", "--host", "0.0.0.0", "--port", "8000"]
