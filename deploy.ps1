# ============================================
# Bait Check-in Webapp - Firebase Deploy Script
# ============================================
# Usage: .\deploy.ps1
# 
# ⚠️ IMPORTANT: User must run this manually
# AI must NOT run this script (Rule 1)
# ============================================

param(
    [switch]$HostingOnly,
    [switch]$RulesOnly,
    [switch]$IndexesOnly,
    [switch]$FunctionsOnly,
    [switch]$All
)

$ErrorActionPreference = "Stop"

# Get script directory and project root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $scriptDir

# Get current info
$timestamp = Get-Date -Format "dd-MM-yyyy HH:mm:ss"
$commitHash = & git rev-parse --short HEAD 2>$null
$commitMsg = & git log -1 --pretty=%s 2>$null
$branch = & git branch --show-current 2>$null

# Display header
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Bait Check-in Webapp - Firebase Deploy" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Time    : $timestamp"
Write-Host "  Branch  : $branch"
Write-Host "  Commit  : $commitHash"
Write-Host "  Message : $commitMsg"
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Deploy based on flags
if ($HostingOnly) {
    Write-Host "Deploying Hosting only..." -ForegroundColor Yellow
    & firebase deploy --only hosting
}
elseif ($RulesOnly) {
    Write-Host "Deploying Firestore Rules only..." -ForegroundColor Yellow
    & firebase deploy --only firestore:rules
}
elseif ($IndexesOnly) {
    Write-Host "Deploying Firestore Indexes only..." -ForegroundColor Yellow
    Write-Host "(This may take 5-30 minutes to build)" -ForegroundColor Cyan
    & firebase deploy --only firestore:indexes
}
elseif ($FunctionsOnly) {
    Write-Host "Deploying Cloud Functions only..." -ForegroundColor Yellow
    & firebase deploy --only functions
}
elseif ($All) {
    Write-Host "Deploying ALL - Hosting + Rules + Functions..." -ForegroundColor Yellow
    & firebase deploy
}
else {
    # Default: Hosting only (safest)
    Write-Host "Deploying Hosting..." -ForegroundColor Yellow
    & firebase deploy --only hosting
}

# Check result
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "  Deploy Successful!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  URL: https://bait-check-in-webapp.web.app" -ForegroundColor Cyan
    Write-Host "  Console: https://console.firebase.google.com/project/bait-check-in-webapp" -ForegroundColor Cyan
    Write-Host ""
    
    # Log to history
    $logEntry = "$timestamp | $branch | $commitHash | SUCCESS | $commitMsg"
    $logPath = Join-Path $projectRoot "deploy-history.log"
    Add-Content -Path $logPath -Value $logEntry -ErrorAction SilentlyContinue
}
else {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "  Deploy Failed!" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Check the error messages above." -ForegroundColor Yellow
    Write-Host "  Try running: firebase login" -ForegroundColor Yellow
    Write-Host ""
    
    # Log failure
    $logEntry = "$timestamp | $branch | $commitHash | FAILED | $commitMsg"
    $logPath = Join-Path $projectRoot "deploy-history.log"
    Add-Content -Path $logPath -Value $logEntry -ErrorAction SilentlyContinue
    
    exit 1
}

# ============================================
# Usage Examples:
# ============================================
# .\deploy.ps1                    # Hosting only (default)
# .\deploy.ps1 -HostingOnly       # Hosting only
# .\deploy.ps1 -RulesOnly         # Firestore rules only
# .\deploy.ps1 -IndexesOnly       # Firestore indexes only
# .\deploy.ps1 -FunctionsOnly     # Cloud functions only
# .\deploy.ps1 -All               # Everything
# ============================================
