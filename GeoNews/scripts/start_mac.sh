#!/usr/bin/env bash
# GeoNews macOS/Linux start (idempotent) — Docker Compose on :8000
# Does not delete volumes.

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ensure_env() {
  if [[ ! -f "$ROOT/.env" ]]; then
    if [[ ! -f "$ROOT/.env.example" ]]; then
      echo "error: .env.example missing; cannot create .env" >&2
      exit 1
    fi
    cp "$ROOT/.env.example" "$ROOT/.env"
    echo "Created .env from .env.example (LLM_MOCK/INGEST_MOCK default true for free demo)."
  fi
}

wait_healthy() {
  local timeout="${1:-90}"
  local i=0
  while (( i < timeout )); do
    if curl -fsS "http://127.0.0.1:8000/api/health" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
    i=$((i + 2))
  done
  return 1
}

ensure_env

echo "Starting GeoNews (docker compose up -d --build)..."
docker compose -f "$ROOT/docker-compose.yml" up -d --build

if wait_healthy; then
  echo "GeoNews is up: http://localhost:8000"
  if command -v open >/dev/null 2>&1; then
    open "http://localhost:8000" || true
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:8000" || true
  fi
else
  echo "Container started but /api/health not ready yet. Check: docker compose logs -f"
  echo "URL: http://localhost:8000"
fi
