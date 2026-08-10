#!/usr/bin/env bash
set -e

# ==============================================================================
# FinAlly AI Trading Workstation - Stop Script (macOS / Linux)
# ==============================================================================
# Description: Stops and removes the FinAlly Docker container while preserving
#              the SQLite database volume in ./db.
# Usage:       ./scripts/stop_mac.sh
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}"

CONTAINER_NAME="finally"

echo "======================================================"
echo " Stopping FinAlly AI Trading Workstation (macOS/Linux) "
echo "======================================================"

if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "[INFO] Stopping container '${CONTAINER_NAME}'..."
    docker stop "${CONTAINER_NAME}"
    echo "[INFO] Container stopped."
else
    echo "[INFO] Container '${CONTAINER_NAME}' is not currently running."
fi

if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "[INFO] Removing container '${CONTAINER_NAME}'..."
    docker rm "${CONTAINER_NAME}"
    echo "[INFO] Container removed."
else
    echo "[INFO] Container '${CONTAINER_NAME}' does not exist."
fi

echo ""
echo "======================================================"
echo " FinAlly container stopped and removed successfully."
echo " Note: Database files in ./db were preserved."
echo "======================================================"
