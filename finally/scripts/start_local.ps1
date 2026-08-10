# ==============================================================================
# FinAlly AI Trading Workstation - Start Local Script (Windows PowerShell)
# ==============================================================================
# Description: Launches FinAlly directly on local machine using Python & Uvicorn.
# Usage:       .\scripts\start_local.ps1
# ==============================================================================

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Resolve-Path "$ScriptDir\.." | Select-Object -ExpandProperty Path
Set-Location -Path $ProjectRoot

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " Starting FinAlly AI Trading Workstation (Local)      " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# Ensure .env file exists
$EnvFile = Join-Path -Path $ProjectRoot -ChildPath ".env"
$EnvExample = Join-Path -Path $ProjectRoot -ChildPath ".env.example"
if (-not (Test-Path -Path $EnvFile)) {
    if (Test-Path -Path $EnvExample) {
        Copy-Item -Path $EnvExample -Destination $EnvFile
    } else {
        @"
OPENROUTER_API_KEY=
MASSIVE_API_KEY=
LLM_MOCK=false
"@ | Out-File -FilePath $EnvFile -Encoding utf8
    }
}

# Ensure db directory exists
$DbDir = Join-Path -Path $ProjectRoot -ChildPath "db"
if (-not (Test-Path -Path $DbDir)) {
    New-Item -ItemType Directory -Path $DbDir -Force | Out-Null
}

# Ensure frontend static assets are built
$FrontendOut = Join-Path -Path $ProjectRoot -ChildPath "frontend\out\index.html"
if (-not (Test-Path -Path $FrontendOut)) {
    Write-Host "[INFO] Building frontend static assets..." -ForegroundColor Yellow
    Set-Location -Path "$ProjectRoot\frontend"
    cmd /c "npm run build"
    Set-Location -Path $ProjectRoot
}

$VenvPython = Join-Path -Path $ProjectRoot -ChildPath "backend\.venv\Scripts\python.exe"
Set-Location -Path "$ProjectRoot\backend"

Write-Host "[INFO] Launching local Uvicorn server on http://localhost:8000 ..." -ForegroundColor Green
if (Test-Path -Path $VenvPython) {
    & $VenvPython -m uvicorn app.main:app --host 0.0.0.0 --port 8000
} else {
    py -3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
}
