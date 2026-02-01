# ============================================
# Bait Check-in Webapp - Git History Cleanup Script
# ============================================
# 
# WARNING: This script rewrites Git history!
# 
# Before running:
# 1. Make sure you have a backup
# 2. Notify all collaborators
# 3. They will need to re-clone the repository
#
# Usage: .\cleanup-history-fixed.ps1
# ============================================

param(
    [switch]$DryRun,    # Preview only
    [switch]$Confirm    # Actually do it
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Bait Check-in Webapp - Git History Cleanup" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check if git-filter-repo is installed
$filterRepoInstalled = $null
try {
    $filterRepoInstalled = Get-Command git-filter-repo -ErrorAction SilentlyContinue
} catch {
    $filterRepoInstalled = $null
}

if (-not $filterRepoInstalled) {
    Write-Host "ERROR: git-filter-repo is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install it first:" -ForegroundColor Yellow
    Write-Host "  pip install git-filter-repo" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host "OK: git-filter-repo is installed" -ForegroundColor Green
Write-Host ""

# Files to remove from history
$filesToRemove = @(
    "src/config.js",
    "docs/api-guide.md",
    "URL-ใช้งานจริง.md",
    "deploy-history.log"
)

# Patterns to search for sensitive data
$sensitivePatterns = @(
    "AIzaSy",
    "f9f10eb0f366",
    "bait-check-in-webapp.web.app"
)

Write-Host "Files to remove from history:" -ForegroundColor Yellow
foreach ($file in $filesToRemove) {
    Write-Host "   - $file" -ForegroundColor White
}
Write-Host ""

Write-Host "Checking for sensitive data in history..." -ForegroundColor Yellow
Write-Host ""

foreach ($pattern in $sensitivePatterns) {
    Write-Host "Searching for: $pattern" -ForegroundColor Cyan
    $result = git log -p --all -S $pattern 2>$null | Select-Object -First 1
    if ($result) {
        Write-Host "  FOUND in history!" -ForegroundColor Red
    } else {
        Write-Host "  Not found" -ForegroundColor Green
    }
}
Write-Host ""

if ($DryRun) {
    Write-Host "============================================================" -ForegroundColor Yellow
    Write-Host "  DRY RUN MODE - No changes will be made" -ForegroundColor Yellow
    Write-Host "============================================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To actually clean history, run:" -ForegroundColor White
    Write-Host "  .\cleanup-history-fixed.ps1 -Confirm" -ForegroundColor Cyan
    Write-Host ""
    exit 0
}

if (-not $Confirm) {
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "  WARNING: This will rewrite Git history!" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "This action:" -ForegroundColor Yellow
    Write-Host "  - Will remove sensitive files from ALL commits" -ForegroundColor White
    Write-Host "  - Will change commit hashes" -ForegroundColor White
    Write-Host "  - Requires force push (git push --force)" -ForegroundColor White
    Write-Host "  - Will break existing clones (others must re-clone)" -ForegroundColor White
    Write-Host ""
    Write-Host "To proceed, run:" -ForegroundColor White
    Write-Host "  .\cleanup-history-fixed.ps1 -Confirm" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To preview changes first:" -ForegroundColor White
    Write-Host "  .\cleanup-history-fixed.ps1 -DryRun" -ForegroundColor Cyan
    Write-Host ""
    exit 0
}

# Actual cleanup
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  Starting Git History Cleanup..." -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""

# Create backup branch
$backupBranch = "backup-before-cleanup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "Creating backup branch: $backupBranch" -ForegroundColor Yellow
git branch $backupBranch

Write-Host ""
Write-Host "Removing sensitive files from history..." -ForegroundColor Yellow

foreach ($file in $filesToRemove) {
    Write-Host "  Removing: $file" -ForegroundColor Cyan
    git filter-repo --path $file --invert-paths --force 2>$null
}

Write-Host ""
Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS:" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Verify the cleanup worked:" -ForegroundColor Yellow
Write-Host "   git log --oneline -20" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Force push to remote:" -ForegroundColor Yellow
Write-Host "   git push origin main --force" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Delete backup branch (after verifying):" -ForegroundColor Yellow
Write-Host "   git branch -D $backupBranch" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Notify collaborators to re-clone the repository" -ForegroundColor Yellow
Write-Host ""
Write-Host "5. Rotate API keys in Firebase Console!" -ForegroundColor Red
Write-Host "   https://console.firebase.google.com" -ForegroundColor Cyan
Write-Host ""
