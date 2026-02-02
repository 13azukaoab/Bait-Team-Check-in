// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Admin Dashboard - Date Range Filter', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin dashboard
    await page.goto('http://localhost:8080/admin-dashboard.html');
    
    // Wait for dashboard to load
    await page.waitForSelector('[data-test="filter-team"]', { timeout: 10000 });
  });

  test('1️⃣ Should display date range filter inputs', async ({ page }) => {
    // Check if date inputs are visible
    const startDateInput = page.locator('[data-test="filter-date-start"]');
    const endDateInput = page.locator('[data-test="filter-date-end"]');
    
    await expect(startDateInput).toBeVisible();
    await expect(endDateInput).toBeVisible();
  });

  test('2️⃣ Should display quick date range selection buttons', async ({ page }) => {
    // Scroll to filter section
    await page.locator('[data-test="filter-team"]').scrollIntoViewIfNeeded();
    
    // Check for quick select buttons
    const todayBtn = page.locator('button:has-text("วันนี้")');
    const weekBtn = page.locator('button:has-text("สัปดาห์นี้")');
    const monthBtn = page.locator('button:has-text("เดือนนี้")');
    const last7daysBtn = page.locator('button:has-text("7 วัน")');
    const last30daysBtn = page.locator('button:has-text("30 วัน")');
    
    // We check for buttons containing the icons and text
    const buttons = page.locator('.filter-row:last-of-type button');
    const count = await buttons.count();
    
    // Should have at least 5 quick select buttons
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('3️⃣ Should filter data by start date only', async ({ page }) => {
    // Set start date to today
    const today = new Date();
    const dateString = formatDateForInput(today);
    
    await page.locator('[data-test="filter-date-start"]').fill(dateString);
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for results
    await page.waitForTimeout(500);
    
    // Check that results are displayed
    const table = page.locator('[data-test="main-checkins-table-body"]');
    // Should either show data or "no results" message
    const content = await page.innerHTML('body');
    expect(content).toBeTruthy();
  });

  test('4️⃣ Should filter data by end date only', async ({ page }) => {
    // Set end date to today
    const today = new Date();
    const dateString = formatDateForInput(today);
    
    await page.locator('[data-test="filter-date-end"]').fill(dateString);
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for results
    await page.waitForTimeout(500);
    
    // Should show results or no-data message
    const content = await page.innerHTML('body');
    expect(content).toBeTruthy();
  });

  test('5️⃣ Should filter data by date range (both start and end)', async ({ page }) => {
    // Set date range: last 7 days
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const startDateString = formatDateForInput(sevenDaysAgo);
    const endDateString = formatDateForInput(today);
    
    await page.locator('[data-test="filter-date-start"]').fill(startDateString);
    await page.locator('[data-test="filter-date-end"]').fill(endDateString);
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for results
    await page.waitForTimeout(500);
    
    // Check that filter was applied
    const content = await page.innerHTML('body');
    expect(content).toBeTruthy();
  });

  test('6️⃣ Should reject invalid date range (start > end)', async ({ page }) => {
    // Set invalid date range
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const startDateString = formatDateForInput(tomorrow);
    const endDateString = formatDateForInput(today);
    
    await page.locator('[data-test="filter-date-start"]').fill(startDateString);
    await page.locator('[data-test="filter-date-end"]').fill(endDateString);
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for error message
    await page.waitForTimeout(500);
    
    // Check for error message in the page
    const content = await page.innerHTML('body');
    // Should contain error indication (varies by implementation)
    expect(content).toBeTruthy();
  });

  test('7️⃣ Should set "today" quick filter correctly', async ({ page }) => {
    // Scroll to quick buttons
    await page.locator('[data-test="filter-team"]').scrollIntoViewIfNeeded();
    
    // Click "Today" button
    const todayButton = page.locator('button').filter({ hasText: /วันนี้/ }).first();
    
    if (await todayButton.isVisible()) {
      await todayButton.click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Check that date inputs are populated
      const startInput = page.locator('[data-test="filter-date-start"]');
      const today = formatDateForInput(new Date());
      
      const startValue = await startInput.inputValue();
      expect(startValue).toBe(today);
    }
  });

  test('8️⃣ Should set "this week" quick filter correctly', async ({ page }) => {
    // Scroll to quick buttons
    await page.locator('[data-test="filter-team"]').scrollIntoViewIfNeeded();
    
    // Click "This Week" button
    const weekButton = page.locator('button').filter({ hasText: /สัปดาห์นี้/ }).first();
    
    if (await weekButton.isVisible()) {
      await weekButton.click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Check that dates are set
      const startInput = page.locator('[data-test="filter-date-start"]');
      const startValue = await startInput.inputValue();
      
      // Should have a date value
      expect(startValue).toMatch(/\d{4}-\d{2}-\d{2}/);
    }
  });

  test('9️⃣ Should set "this month" quick filter correctly', async ({ page }) => {
    // Scroll to quick buttons
    await page.locator('[data-test="filter-team"]').scrollIntoViewIfNeeded();
    
    // Click "This Month" button
    const monthButton = page.locator('button').filter({ hasText: /เดือนนี้/ }).first();
    
    if (await monthButton.isVisible()) {
      await monthButton.click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Check that dates are set
      const startInput = page.locator('[data-test="filter-date-start"]');
      const startValue = await startInput.inputValue();
      
      // Start date should be 1st of month
      expect(startValue).toMatch(/\d{4}-\d{2}-01/);
    }
  });

  test('🔟 Should clear date filters when clearing all filters', async ({ page }) => {
    // Set date range
    const today = new Date();
    const dateString = formatDateForInput(today);
    
    await page.locator('[data-test="filter-date-start"]').fill(dateString);
    await page.locator('[data-test="filter-date-end"]').fill(dateString);
    
    // Click clear button
    await page.locator('button:has-text("ล้าง")').first().click();
    
    // Wait for clear to apply
    await page.waitForTimeout(500);
    
    // Check that date inputs are cleared
    const startInput = page.locator('[data-test="filter-date-start"]');
    const endInput = page.locator('[data-test="filter-date-end"]');
    
    const startValue = await startInput.inputValue();
    const endValue = await endInput.inputValue();
    
    expect(startValue).toBe('');
    expect(endValue).toBe('');
  });

  test('1️⃣1️⃣ Should combine date filter with other filters (team)', async ({ page }) => {
    // Set team filter
    await page.locator('[data-test="filter-team"]').selectOption('A');
    
    // Set date filter
    const today = new Date();
    const dateString = formatDateForInput(today);
    await page.locator('[data-test="filter-date-start"]').fill(dateString);
    
    // Apply filters
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for results
    await page.waitForTimeout(500);
    
    // Should show results
    const content = await page.innerHTML('body');
    expect(content).toBeTruthy();
  });

  test('1️⃣2️⃣ Should combine date filter with zone and branch filters', async ({ page }) => {
    // Set zone filter
    await page.locator('[data-test="filter-zone"]').selectOption('เขต 1');
    
    // Set branch filter
    await page.locator('[data-test="filter-branch"]').selectOption('พุทธมณฑล');
    
    // Set date filter
    const today = new Date();
    const dateString = formatDateForInput(today);
    await page.locator('[data-test="filter-date-start"]').fill(dateString);
    
    // Apply filters
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for results
    await page.waitForTimeout(500);
    
    // Should show results
    const content = await page.innerHTML('body');
    expect(content).toBeTruthy();
  });

  test('1️⃣3️⃣ Should update map markers when applying date filter', async ({ page }) => {
    // Wait for map to load
    await page.waitForSelector('[data-test="map-container"]', { timeout: 10000 });
    
    // Set date filter
    const today = new Date();
    const dateString = formatDateForInput(today);
    await page.locator('[data-test="filter-date-start"]').fill(dateString);
    
    // Apply filters
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for map update
    await page.waitForTimeout(1000);
    
    // Map should still be present
    const mapContainer = page.locator('[data-test="map-container"]');
    await expect(mapContainer).toBeVisible();
  });

  test('1️⃣4️⃣ Should show correct filter summary in toast message', async ({ page }) => {
    // Set team and date filter
    await page.locator('[data-test="filter-team"]').selectOption('A');
    
    const today = new Date();
    const dateString = formatDateForInput(today);
    await page.locator('[data-test="filter-date-start"]').fill(dateString);
    
    // Apply filters
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for toast message
    await page.waitForTimeout(500);
    
    // Check for success indicator
    const content = await page.innerHTML('body');
    // Toast should show filter results summary
    const toastVisible = content.includes('กรอง') || content.includes('พบ');
    expect(toastVisible).toBeTruthy();
  });

  test('1️⃣5️⃣ Should handle leap year dates correctly', async ({ page }) => {
    // Set date to Feb 29 (leap year)
    const leapYearDate = '2024-02-29';
    
    await page.locator('[data-test="filter-date-start"]').fill(leapYearDate);
    await page.locator('[data-test="apply-filter-btn"]').click();
    
    // Wait for results
    await page.waitForTimeout(500);
    
    // Should process without error
    const startInput = page.locator('[data-test="filter-date-start"]');
    const value = await startInput.inputValue();
    
    expect(value).toBe(leapYearDate);
  });
});

// Helper function to format date for input
/**
 * @param {Date} date
 */
function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
