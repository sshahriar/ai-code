#!/usr/bin/env bash
set -e

# ==============================================================================
# FinAlly AI Trading Workstation - Start Script (macOS / Linux)
# ==============================================================================
# Description: Builds the Docker image and launches the FinAlly container with
#              volume mounting for SQLite persistence and environment variables.
# Usage:       ./scripts/start_mac.sh
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}"

echo "======================================================"
echo " Starting FinAlly AI Trading Workstation (macOS/Linux) "
echo "======================================================"

# Ensure .env file exists; create from .env.example if missing
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "[INFO] .env file not found. Creating .env from .env.example..."
        cp .env.example .env
    else
        echo "[INFO] Creating default .env file..."
        cat << 'EOF' > .env
OPENROUTER_API_KEY=
MASSIVE_API_KEY=
LLM_MOCK=false
EOF
    fi
fi

# Ensure db directory exists for volume mounting
mkdir -p "${PROJECT_ROOT}/db"

CONTAINER_NAME="finally"
IMAGE_NAME="finally:latest"

if docker info > /dev/null 2>&1; then
    echo "[INFO] Docker daemon detected. Starting via Docker..."
    if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
        echo "[INFO] Stopping running container '${CONTAINER_NAME}'..."
        docker stop "${CONTAINER_NAME}" > /dev/null
    fi

    if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
        echo "[INFO] Removing existing container '${CONTAINER_NAME}'..."
        docker rm "${CONTAINER_NAME}" > /dev/null
    fi

    echo "[INFO] Building Docker image '${IMAGE_NAME}'..."
    docker build -t "${IMAGE_NAME}" -f Dockerfile .

    echo "[INFO] Launching container '${CONTAINER_NAME}' on port 8000..."
    docker run -d \
        --name "${CONTAINER_NAME}" \
        -p 8000:8000 \
        --env-file .env \
        -v "${PROJECT_ROOT}/db:/app/db" \
        "${IMAGE_NAME}"

    echo ""
    echo "======================================================"
    echo " FinAlly AI Trading Workstation is running (Docker)!"
    echo " Access the workstation at: http://localhost:8000"
    echo "======================================================"
    exit 0
else
    echo "[WARN] Docker daemon is not running. Starting in local native mode..."
fi

# Local execution fallback
if [ ! -f "frontend/out/index.html" ]; then
    echo "[INFO] Building frontend static assets..."
    cd frontend && npm run build && cd ..
fi

cd backend
if [ -f ".venv/bin/uvicorn" ]; then
    echo "[INFO] Launching Uvicorn server on http://localhost:8000 ..."
    .venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
elif command -v uv > /dev/null 2>&1; then
    echo "[INFO] Launching Uvicorn server via uv on http://localhost:8000 ..."
    uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
else
    echo "[INFO] Launching Uvicorn server via python3 on http://localhost:8000 ..."
    python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
fi
