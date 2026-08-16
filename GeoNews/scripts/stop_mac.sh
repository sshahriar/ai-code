#!/usr/bin/env bash
# GeoNews macOS/Linux stop — containers down; named volume geonews-data kept

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "Stopping GeoNews (docker compose down; volume geonews-data preserved)..."
docker compose -f "$ROOT/docker-compose.yml" down
echo "Stopped. SQLite volume 'geonews-data' was not deleted."
