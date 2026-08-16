# GeoNews Windows stop — tears down containers; keeps named volume geonews-data

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "Stopping GeoNews (docker compose down; volume geonews-data preserved)..."
docker compose -f (Join-Path $Root "docker-compose.yml") down
if ($LASTEXITCODE -ne 0) {
    throw "docker compose down failed with exit code $LASTEXITCODE"
}
Write-Host "Stopped. SQLite volume 'geonews-data' was not deleted."
