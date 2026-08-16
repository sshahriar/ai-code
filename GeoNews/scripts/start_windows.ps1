# GeoNews Windows start (idempotent) — brings up Docker Compose on :8000
# Requires: Docker Desktop running. Does not delete volumes.

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Ensure-EnvFile {
    $envPath = Join-Path $Root ".env"
    $example = Join-Path $Root ".env.example"
    if (-not (Test-Path $envPath)) {
        if (-not (Test-Path $example)) {
            throw ".env.example missing; cannot create .env"
        }
        Copy-Item $example $envPath
        Write-Host "Created .env from .env.example (LLM_MOCK/INGEST_MOCK default true for free demo)."
    }
}

function Wait-Healthy {
    param([int]$TimeoutSec = 90)
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $deadline) {
        try {
            $r = Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/health" -UseBasicParsing -TimeoutSec 3
            if ($r.StatusCode -eq 200) { return $true }
        } catch {
            Start-Sleep -Seconds 2
        }
    }
    return $false
}

Ensure-EnvFile

Write-Host "Starting GeoNews (docker compose up -d --build)..."
docker compose -f (Join-Path $Root "docker-compose.yml") up -d --build
if ($LASTEXITCODE -ne 0) {
    throw "docker compose up failed with exit code $LASTEXITCODE"
}

if (Wait-Healthy) {
    Write-Host "GeoNews is up: http://localhost:8000"
    try {
        Start-Process "http://localhost:8000"
    } catch {
        Write-Host "Open http://localhost:8000 in your browser."
    }
} else {
    Write-Host "Container started but /api/health not ready yet. Check: docker compose logs -f"
    Write-Host "URL: http://localhost:8000"
}
