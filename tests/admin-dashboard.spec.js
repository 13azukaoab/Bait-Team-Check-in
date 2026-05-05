// @ts-check
const { test, expect } = require('@playwright/test');

// ===================================
// 🖥️ Admin Dashboard Tests (หน้าแอดมิน)
// ===================================

test.describe('Admin Dashboard Page', () => {
  // Admin dashboard is desktop-only — runs on chromium & Mobile Chrome only
  // (Mobile Safari excluded in playwright.config.js testIgnore)
  test.use({ viewport: { width: 1280, height: 800 }, isMobile: false });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin-dashboard.html');
    await page.waitForSelector('.sidebar', { timeout: 10000 });
  });

  // =====================
  // Test 1: Load & Display
  // =====================
  
  test('1️⃣ Should load admin dashboard page', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
    console.log('✅ Admin Dashboard โหลดเสร็จ');
  });

  test('2️⃣ Should display stat cards', async ({ page }) => {
    await expect(page.locator('[data-test="stat-cards"]')).toBeVisible();
    await expect(page.locator('[data-test="stat-checkins"]')).toBeVisible();
    console.log('✅ Stat cards แสดงผลถูกต้อง');
  });

  test('3️⃣ Should display map container', async ({ page }) => {
    await expect(page.locator('[data-test="map-container"]')).toBeVisible();
    console.log('✅ Map container มีอยู่');
  });

  // =====================
  // Test 2: Filters
  // =====================

  test('4️⃣ Should have team filter', async ({ page }) => {
    await expect(page.locator('[data-test="filter-team"]')).toBeVisible();
    const options = await page.locator('[data-test="filter-team"] option').count();
    expect(options).toBeGreaterThan(1);
    console.log('✅ Team filter มี options');
  });

  test('5️⃣ Should have zone filter', async ({ page }) => {
    await expect(page.locator('[data-test="filter-zone"]')).toBeVisible();
    const options = await page.locator('[data-test="filter-zone"] option').count();
    expect(options).toBeGreaterThan(1);
    console.log('✅ Zone filter มี options');
  });

  test('6️⃣ Should have branch filter', async ({ page }) => {
    await expect(page.locator('[data-test="filter-branch"]')).toBeVisible();
    const options = await page.locator('[data-test="filter-branch"] option').count();
    expect(options).toBeGreaterThan(1);
    console.log('✅ Branch filter มี options');
  });

  test('7️⃣ Should have date filter', async ({ page }) => {
    await expect(page.locator('[data-test="filter-date-start"]')).toBeVisible();
    await expect(page.locator('[data-test="filter-date-end"]')).toBeVisible();
    console.log('✅ Date filters มีอยู่');
  });

  test('8️⃣ Should have apply filter button', async ({ page }) => {
    await expect(page.locator('[data-test="apply-filter-btn"]')).toBeVisible();
    console.log('✅ Apply filter button มีอยู่');
  });

  // =====================
  // Test 3: Filter Actions
  // =====================

  test('9️⃣ Should select team filter', async ({ page }) => {
    await page.locator('[data-test="filter-team"]').selectOption('A');
    const value = await page.locator('[data-test="filter-team"]').inputValue();
    expect(value).toBe('A');
    console.log('✅ เลือก Team filter ได้');
  });

  test('🔟 Should select zone filter', async ({ page }) => {
    await page.locator('[data-test="filter-zone"]').selectOption('เขต 1');
    const value = await page.locator('[data-test="filter-zone"]').inputValue();
    expect(value).toBe('เขต 1');
    console.log('✅ เลือก Zone filter ได้');
  });

  test('1️⃣1️⃣ Should change date filter', async ({ page }) => {
    await page.locator('[data-test="filter-date-start"]').fill('2026-01-01');
    await page.locator('[data-test="filter-date-end"]').fill('2026-01-31');
    const startValue = await page.locator('[data-test="filter-date-start"]').inputValue();
    const endValue = await page.locator('[data-test="filter-date-end"]').inputValue();
    expect(startValue).toBe('2026-01-01');
    expect(endValue).toBe('2026-01-31');
    console.log('✅ เลือกวันที่ได้');
  });

  test('1️⃣2️⃣ Should click apply filter button', async ({ page }) => {
    await page.locator('[data-test="apply-filter-btn"]').click();
    console.log('✅ คลิก Apply filter ได้');
  });

  // =====================
  // Test 4: Search
  // =====================

  test('1️⃣3️⃣ Should have global search input', async ({ page }) => {
    await expect(page.locator('[data-test="global-search"]')).toBeVisible();
    console.log('✅ Global search input มีอยู่');
  });

  test('1️⃣4️⃣ Should type in global search', async ({ page }) => {
    await page.locator('[data-test="global-search"]').fill('test search');
    const value = await page.locator('[data-test="global-search"]').inputValue();
    expect(value).toBe('test search');
    console.log('✅ พิมพ์ใน search ได้');
  });

  // =====================
  // Test 5: Responsive
  // =====================

  test('1️⃣5️⃣ Should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ ทำงานบน Desktop viewport');
  });

  test('1️⃣6️⃣ Should work on laptop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ ทำงานบน Laptop viewport');
  });
});

// =============================================
// 📋 Work Sessions Tab Tests (Admin Dashboard)
// =============================================

test.describe('Work Sessions Tab', () => {
  // Admin dashboard is desktop-only — runs on chromium & Mobile Chrome only
  // (Mobile Safari excluded in playwright.config.js testIgnore)
  test.use({ viewport: { width: 1280, height: 800 }, isMobile: false });

  test.beforeEach(async ({ page }) => {
    await page.goto('/admin-dashboard.html');
    await page.waitForSelector('.sidebar', { timeout: 10000 });
  });

  test('WS-A1️⃣ Work Sessions nav item exists in sidebar', async ({ page }) => {
    await expect(page.locator('[data-page="worksessions"]')).toBeAttached();
    console.log('✅ Work Sessions nav item มีอยู่');
  });

  test('WS-A2️⃣ Click nav → Work Sessions page becomes visible', async ({ page }) => {
    await page.locator('[data-page="worksessions"]').click();
    await expect(page.locator('#page-worksessions')).toBeVisible();
    console.log('✅ คลิก nav แล้ว #page-worksessions visible');
  });

  test('WS-A3️⃣ Date filter and team filter inputs exist', async ({ page }) => {
    await page.locator('[data-page="worksessions"]').click();
    await expect(page.locator('[data-test="ws-filter-date"]')).toBeAttached();
    await expect(page.locator('[data-test="ws-filter-team"]')).toBeAttached();
    const teamOpts = await page.locator('[data-test="ws-filter-team"] option').count();
    expect(teamOpts).toBeGreaterThan(1);
    console.log('✅ WS filter inputs มีอยู่');
  });

  test('WS-A4️⃣ Export CSV button exists', async ({ page }) => {
    await page.locator('[data-page="worksessions"]').click();
    await expect(page.locator('[data-test="ws-export-csv"]')).toBeVisible();
    console.log('✅ Export CSV button มีอยู่');
  });

  test('WS-A5️⃣ Sessions table has ≥10 columns in thead', async ({ page }) => {
    await page.locator('[data-page="worksessions"]').click();
    const cols = await page.locator('#page-worksessions table thead th').count();
    expect(cols).toBeGreaterThanOrEqual(10);
    console.log(`✅ WS table มี ${cols} columns`);
  });

  test('WS-A6️⃣ Summary stat cards are present', async ({ page }) => {
    await page.locator('[data-page="worksessions"]').click();
    await expect(page.locator('[data-test="ws-summary-cards"]')).toBeAttached();
    const cards = await page.locator('[data-test="ws-summary-cards"] > div').count();
    expect(cards).toBe(4);
    console.log('✅ Summary cards 4 ใบมีอยู่');
  });
});
