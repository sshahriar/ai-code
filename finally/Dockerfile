# ==========================================
# Stage 1: Build Frontend (Next.js export)
# ==========================================
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend

# Copy frontend dependency manifests if present
COPY frontend/package*.json ./

# Install dependencies and build static export
COPY frontend/ ./
RUN if [ -f package.json ]; then \
        if [ -f package-lock.json ]; then npm ci; else npm install; fi && \
        npm run build; \
    else \
        mkdir -p out && echo "<html><body><h1>FinAlly AI Trading Workstation</h1></body></html>" > out/index.html; \
    fi

# ==========================================
# Stage 2: Production Runtime (FastAPI + uv)
# ==========================================
FROM python:3.12-slim AS runner

# Install uv from official Astral image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set working directory to /app
WORKDIR /app

# Set environment variables for Python & uv
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_SYSTEM_PYTHON=0 \
    PATH="/app/.venv/bin:$PATH"

# Copy backend requirements and source code
COPY backend/ /app/

# Install Python dependencies using uv sync
RUN if [ -f pyproject.toml ]; then uv sync --frozen || uv sync; fi

# Copy static frontend export from Stage 1 into FastAPI's static directories
RUN mkdir -p /app/app/static /app/static
COPY --from=frontend-builder /app/frontend/out /app/app/static
COPY --from=frontend-builder /app/frontend/out /app/static

# Create database directory for SQLite persistence volume mount
RUN mkdir -p /app/db

# Expose FastAPI application port
EXPOSE 8000

# Set entrypoint command to launch FastAPI application with uvicorn via uv
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
