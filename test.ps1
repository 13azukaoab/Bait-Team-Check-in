# ============================================
# Bait Check-in Webapp - Playwright Test Script
# ============================================
# Usage: .\test.ps1
#
# Parameters:
#   -All        Run all browsers (chromium, firefox, webkit, mobile)
#   -Chromium   Test on Chromium only
#   -Firefox    Test on Firefox only
#   -Webkit     Test on Webkit only
#   -Mobile     Test on Mobile browsers only
#   -Headed     Show browser window while testing
#   -UI         Open Playwright UI mode
#   -Report     Show HTML report after tests
#
# Examples:
#   .\test.ps1                    # Run all tests (default)
#   .\test.ps1 -Chromium          # Test on Chromium only
#   .\test.ps1 -Mobile -Headed    # Test mobile with visible browser
#   .\test.ps1 -Report            # Show report after tests
# ============================================

param(
    [switch]$All,
    [switch]$Chromium,
    [switch]$Firefox,
    [switch]$Webkit,
    [switch]$Mobile,
    [switch]$Headed,
    [switch]$UI,
    [switch]$Report
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
Write-Host "  Bait Check-in Webapp - Playwright Test Runner" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Time    : $timestamp"
Write-Host "  Branch  : $branch"
Write-Host "  Commit  : $commitHash"
Write-Host "  Message : $commitMsg"
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Build command
$command = "npx playwright test"

# Add project selection
if ($Chromium) {
    Write-Host "Testing Chromium only..." -ForegroundColor Yellow
    $command += " --project=chromium"
}
elseif ($Firefox) {
    Write-Host "Testing Firefox only..." -ForegroundColor Yellow
    $command += " --project=firefox"
}
elseif ($Webkit) {
    Write-Host "Testing Webkit only..." -ForegroundColor Yellow
    $command += " --project=webkit"
}
elseif ($Mobile) {
    Write-Host "Testing Mobile browsers..." -ForegroundColor Yellow
    $command += " --project='Mobile Chrome' --project='Mobile Safari'"
}
elseif ($UI) {
    Write-Host "Opening Playwright UI..." -ForegroundColor Yellow
    $command = "npx playwright test --ui"
}
else {
    Write-Host "Testing ALL browsers..." -ForegroundColor Yellow
}

# Add options
if ($Headed) {
    $command += " --headed"
    Write-Host "  (Browser window will be visible)" -ForegroundColor Cyan
}

Write-Host ""

# Run tests
$startTime = Get-Date
Invoke-Expression $command
$endTime = Get-Date
$duration = ($endTime - $startTime).TotalSeconds

# Get test results from playwright report
$reportDataPath = Join-Path $projectRoot "test-results/.last-run.json"
$testSummary = @{
    totalTests = 0
    passed = 0
    failed = 0
}

if (Test-Path $reportDataPath) {
    try {
        $lastRun = Get-Content $reportDataPath | ConvertFrom-Json
        $testSummary.totalTests = $lastRun.stats.expected
        $testSummary.passed = $lastRun.stats.passed
        $testSummary.failed = $lastRun.stats.failed
    } catch {
        Write-Host "Note: Could not parse test results file" -ForegroundColor Yellow
    }
}

# Check result
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "  ✅ All Tests Passed!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Total Tests : $($testSummary.totalTests)" -ForegroundColor Cyan
    Write-Host "  Passed      : $($testSummary.passed) ✅" -ForegroundColor Green
    Write-Host "  Failed      : $($testSummary.failed)" -ForegroundColor Cyan
    Write-Host "  Duration    : $([math]::Round($duration, 2))s" -ForegroundColor Cyan
    Write-Host ""
    
    $status = "SUCCESS"
    $statusColor = "SUCCESS"
}
else {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "  ❌ Some Tests Failed!" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Total Tests : $($testSummary.totalTests)" -ForegroundColor Cyan
    Write-Host "  Passed      : $($testSummary.passed) ✅" -ForegroundColor Green
    Write-Host "  Failed      : $($testSummary.failed) ❌" -ForegroundColor Red
    Write-Host "  Duration    : $([math]::Round($duration, 2))s" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  View details:" -ForegroundColor Yellow
    Write-Host "    npx playwright show-report" -ForegroundColor Cyan
    Write-Host ""
    
    $status = "FAILED"
    $statusColor = "FAILED"
}

# Determine test type for logging
if ($Chromium) { $testType = "Chromium" }
elseif ($Firefox) { $testType = "Firefox" }
elseif ($Webkit) { $testType = "Webkit" }
elseif ($Mobile) { $testType = "Mobile" }
elseif ($UI) { $testType = "UI Mode" }
else { $testType = "All Browsers" }

if ($Headed) { $testType += " (Headed)" }

# Log to history
$logEntry = "$timestamp | $branch | $commitHash | $status | $commitMsg | BY: Weerachon | TYPE: $testType | PASSED: $($testSummary.passed)/$($testSummary.totalTests) | DURATION: $([math]::Round($duration, 2))s"
$logPath = Join-Path $projectRoot "test-history.log"

# Create log file if doesn't exist
if (-not (Test-Path $logPath)) {
    Add-Content -Path $logPath -Value "# Bait Check-in Webapp - Test History Log" -ErrorAction SilentlyContinue
    Add-Content -Path $logPath -Value "# Format: TIMESTAMP | BRANCH | COMMIT | STATUS | MESSAGE | BY | TYPE | RESULTS | DURATION" -ErrorAction SilentlyContinue
    Add-Content -Path $logPath -Value "# =============================================" -ErrorAction SilentlyContinue
    Add-Content -Path $logPath -Value "" -ErrorAction SilentlyContinue
}

Add-Content -Path $logPath -Value $logEntry -ErrorAction SilentlyContinue

Write-Host "  Report logged to: test-history.log" -ForegroundColor Cyan
Write-Host ""

# Show report if requested
if ($Report) {
    Write-Host "Opening Playwright HTML Report..." -ForegroundColor Yellow
    Write-Host ""
    npx playwright show-report
}

# Exit with appropriate code
exit $LASTEXITCODE
