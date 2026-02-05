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
    Write-Host "Testing Mobile browsers (Android + iOS)..." -ForegroundColor Yellow
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

# Run tests and capture output
$startTime = Get-Date
$testOutput = Invoke-Expression "$command 2>&1" | Tee-Object -Variable testLines
$exitCode = $LASTEXITCODE
$endTime = Get-Date
$duration = ($endTime - $startTime).TotalSeconds

# Parse test results from output
$testSummary = @{
    totalTests = 0
    passed = 0
    failed = 0
}

# Look for pattern like "87 passed" or "50 failed" in output
$outputText = $testOutput -join "`n"
if ($outputText -match "(\d+)\s+passed") {
    $testSummary.passed = [int]$matches[1]
}
if ($outputText -match "(\d+)\s+failed") {
    $testSummary.failed = [int]$matches[1]
}
$testSummary.totalTests = $testSummary.passed + $testSummary.failed

# Show test output
Write-Host $outputText

# Check result
if ($exitCode -eq 0) {
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
    
    $status = "PASSED"
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

Write-Host "  ✅ Logged to: test-history.log" -ForegroundColor Cyan

# ============================================
# Update Test report by Playwright.md
# ============================================
$reportPath = Join-Path $projectRoot "Test report by Playwright.md"
$thaiTime = Get-Date -Format "dd-MM-yyyy, HH:mm"
$passRate = if ($testSummary.totalTests -gt 0) { [math]::Round(($testSummary.passed / $testSummary.totalTests) * 100, 1) } else { 0 }
$statusEmoji = if ($status -eq "PASSED") { "✅ PASSED" } else { "❌ FAILED" }

if (Test-Path $reportPath) {
    try {
        $content = Get-Content $reportPath -Raw
        
        # Update summary table
        $content = $content -replace '\| \*\*Total Tests\*\* \| \d+ \|', "| **Total Tests** | $($testSummary.totalTests) |"
        $content = $content -replace '\| \*\*Passed\*\* \| \d+ ✅ \|', "| **Passed** | $($testSummary.passed) ✅ |"
        $content = $content -replace '\| \*\*Failed\*\* \| \d+ \|', "| **Failed** | $($testSummary.failed) |"
        $content = $content -replace '\| \*\*Pass Rate\*\* \| [\d.]+% 🎯? \|', "| **Pass Rate** | $passRate% $(if($passRate -eq 100){'🎯'}else{''}) |"
        $content = $content -replace '\| \*\*Last Run\*\* \| [\d-]+, [\d:]+ น\. \|', "| **Last Run** | $thaiTime น. |"
        
        # Add new entry to history table (find last row and append)
        $newHistoryRow = "| $(Get-Date -Format 'dd-MM-yyyy') | $(Get-Date -Format 'HH:mm') น. | $($testSummary.passed)/$($testSummary.totalTests) ($passRate%) | $($testSummary.failed) | $statusEmoji | Auto-logged by test.ps1 |"
        
        # Find history section and add row before the separator line
        if ($content -match '(\| [\d-]+ \| [\d:]+ น\. \| [\d/]+ \([\d.]+%\) \| \d+ \| [✅❌] [A-Z]+ \| [^|]+\|[\r\n]+)---') {
            # Already has entries, add after last entry
            $content = $content -replace '(## 📝 ประวัติการรันทดสอบ.*?\n\n\|[^\n]+\n\|[^\n]+\n)((?:\|[^\n]+\n)+)(---)', "`$1`$2$newHistoryRow`n---"
        }
        
        # Update footer timestamp
        $content = $content -replace '\*\*อัปเดตล่าสุด:\*\* [\d-]+, [\d:]+ น\.', "**อัปเดตล่าสุด:** $thaiTime น."
        
        Set-Content -Path $reportPath -Value $content -NoNewline
        Write-Host "  ✅ Updated: Test report by Playwright.md" -ForegroundColor Cyan
    } catch {
        Write-Host "  ⚠️ Could not update Test report by Playwright.md: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host ""

# Show report if requested
if ($Report) {
    Write-Host "Opening Playwright HTML Report..." -ForegroundColor Yellow
    Write-Host ""
    npx playwright show-report
}

# Exit with appropriate code
exit $exitCode
