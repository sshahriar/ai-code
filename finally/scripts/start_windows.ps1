# ==============================================================================
# FinAlly AI Trading Workstation - Start Script (Windows PowerShell)
# ==============================================================================
# Description: Launches the FinAlly Workstation. Checks for Docker daemon;
#              if Docker is active, launches via Docker container.
#              If Docker is inactive, falls back to local Python server.
# Usage:       .\scripts\start_windows.ps1
# ==============================================================================

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Resolve-Path "$ScriptDir\.." | Select-Object -ExpandProperty Path
Set-Location -Path $ProjectRoot

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " Starting FinAlly AI Trading Workstation (Windows)   " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

# Ensure .env file exists; create from .env.example if missing
$EnvFile = Join-Path -Path $ProjectRoot -ChildPath ".env"
$EnvExample = Join-Path -Path $ProjectRoot -ChildPath ".env.example"

if (-not (Test-Path -Path $EnvFile)) {
    if (Test-Path -Path $EnvExample) {
        Write-Host "[INFO] .env file not found. Copying from .env.example..." -ForegroundColor Yellow
        Copy-Item -Path $EnvExample -Destination $EnvFile
    } else {
        Write-Host "[INFO] Creating default .env file..." -ForegroundColor Yellow
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

# Check if Docker engine is active
$DockerRunning = $false
try {
    $dockerCheck = docker info 2>&1
    if ($LASTEXITCODE -eq 0) {
        $DockerRunning = $true
    }
} catch {
    $DockerRunning = $false
}

if ($DockerRunning) {
    Write-Host "[INFO] Docker daemon detected. Starting via Docker..." -ForegroundColor Green
    $ContainerName = "finally"
    $ImageName = "finally:latest"

    $RunningContainer = docker ps -q -f "name=^/${ContainerName}$"
    if ($RunningContainer) {
        Write-Host "[INFO] Stopping running container '$ContainerName'..." -ForegroundColor Yellow
        docker stop $ContainerName | Out-Null
    }

    $ExistingContainer = docker ps -aq -f "name=^/${ContainerName}$"
    if ($ExistingContainer) {
        Write-Host "[INFO] Removing existing container '$ContainerName'..." -ForegroundColor Yellow
        docker rm $ContainerName | Out-Null
    }

    Write-Host "[INFO] Building Docker image '$ImageName'..." -ForegroundColor Green
    docker build -t $ImageName -f Dockerfile .

    if ($LASTEXITCODE -eq 0) {
        Write-Host "[INFO] Launching container '$ContainerName' on port 8000..." -ForegroundColor Green
        docker run -d `
            --name $ContainerName `
            -p 8000:8000 `
            --env-file .env `
            -v "${DbDir}:/app/db" `
            $ImageName

        Write-Host ""
        Write-Host "======================================================" -ForegroundColor Cyan
        Write-Host " FinAlly AI Trading Workstation is running (Docker)!" -ForegroundColor Green
        Write-Host " Access the workstation at: http://localhost:8000" -ForegroundColor Yellow
        Write-Host "======================================================" -ForegroundColor Cyan
        exit 0
    } else {
        Write-Host "[WARN] Docker build failed. Falling back to local execution..." -ForegroundColor Yellow
    }
} else {
    Write-Host "[WARN] Docker engine is not running. Starting in local native mode..." -ForegroundColor Yellow
}

# Local Fallback Execution Mode
$FrontendOut = Join-Path -Path $ProjectRoot -ChildPath "frontend\out\index.html"
if (-not (Test-Path -Path $FrontendOut)) {
    Write-Host "[INFO] Building frontend static assets..." -ForegroundColor Yellow
    Set-Location -Path "$ProjectRoot\frontend"
    cmd /c "npm run build"
    Set-Location -Path $ProjectRoot
}

$VenvPython = Join-Path -Path $ProjectRoot -ChildPath "backend\.venv\Scripts\python.exe"
Set-Location -Path "$ProjectRoot\backend"

if (Test-Path -Path $VenvPython) {
    Write-Host "[INFO] Launching local Uvicorn server on port 8000 using virtual environment..." -ForegroundColor Green
    Write-Host ""
    Write-Host "======================================================" -ForegroundColor Cyan
    Write-Host " FinAlly AI Trading Workstation is running (Local)!" -ForegroundColor Green
    Write-Host " Access the workstation at: http://localhost:8000" -ForegroundColor Yellow
    Write-Host " Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host "======================================================" -ForegroundColor Cyan
    & $VenvPython -m uvicorn app.main:app --host 0.0.0.0 --port 8000
} else {
    Write-Host "[INFO] Launching local Uvicorn server using Python system launcher..." -ForegroundColor Green
    Write-Host ""
    Write-Host "======================================================" -ForegroundColor Cyan
    Write-Host " FinAlly AI Trading Workstation is running (Local)!" -ForegroundColor Green
    Write-Host " Access the workstation at: http://localhost:8000" -ForegroundColor Yellow
    Write-Host " Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host "======================================================" -ForegroundColor Cyan
    py -3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
}
