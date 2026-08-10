# ==============================================================================
# FinAlly AI Trading Workstation - Stop Script (Windows PowerShell)
# ==============================================================================
# Description: Stops and removes the FinAlly Docker container while preserving
#              the SQLite database volume in .\db.
# Usage:       .\scripts\stop_windows.ps1
# ==============================================================================

$ErrorActionPreference = "Continue"

# Determine project root directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Resolve-Path "$ScriptDir\.." | Select-Object -ExpandProperty Path
Set-Location -Path $ProjectRoot

$ContainerName = "finally"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " Stopping FinAlly AI Trading Workstation (Windows)    " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

$RunningContainer = docker ps -q -f "name=^/${ContainerName}$"
if ($RunningContainer) {
    Write-Host "[INFO] Stopping container '$ContainerName'..." -ForegroundColor Yellow
    docker stop $ContainerName
    Write-Host "[INFO] Container stopped." -ForegroundColor Green
} else {
    Write-Host "[INFO] Container '$ContainerName' is not currently running." -ForegroundColor Yellow
}

$ExistingContainer = docker ps -aq -f "name=^/${ContainerName}$"
if ($ExistingContainer) {
    Write-Host "[INFO] Removing container '$ContainerName'..." -ForegroundColor Yellow
    docker rm $ContainerName
    Write-Host "[INFO] Container removed." -ForegroundColor Green
} else {
    Write-Host "[INFO] Container '$ContainerName' does not exist." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " FinAlly container stopped and removed successfully." -ForegroundColor Green
Write-Host " Note: Database files in .\db were preserved." -ForegroundColor Yellow
Write-Host "======================================================" -ForegroundColor Cyan
