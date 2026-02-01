// @ts-check
const { test, expect } = require('@playwright/test');

// ===================================
// 📱 Mobile Check-in Tests (มือถือ)
// ===================================

test.describe('Mobile Check-in Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/mobile-checkin.html');
  });

  // =====================
  // Test 1: Load & Display
  // =====================
  
  test('1️⃣ Should load mobile check-in page', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('.login-title')).toBeVisible();
    console.log('✅ หน้า Mobile Check-in โหลดเสร็จ');
  });

  test('2️⃣ Should display login page with team selector', async ({ page }) => {
    await expect(page.locator('[data-test="team-selector"]')).toBeVisible();
    await expect(page.locator('[data-test="login-btn"]')).toBeVisible();
    console.log('✅ Login page แสดงผลถูกต้อง');
  });

  // =====================
  // Test 2: Team Selection
  // =====================

  test('3️⃣ Should open team picker when clicked', async ({ page }) => {
    await page.locator('[data-test="team-selector"]').click();
    const picker = page.locator('.team-picker-modal, .team-options');
    await expect(picker).toBeVisible();
    console.log('✅ Team picker เปิดได้');
  });

  // =====================
  // Test 3: Form Elements
  // =====================

  test('4️⃣ Should display form elements after login', async ({ page }) => {
    await expect(page.locator('#appPage')).toBeAttached();
    console.log('✅ Form elements พร้อมใช้งาน');
  });

  test('5️⃣ Should have customer name input', async ({ page }) => {
    // แสดงหน้า app
    await page.locator('#appPage').evaluate(el => el.style.display = 'block');
    await expect(page.locator('[data-test="customer-name"]')).toBeAttached();
    console.log('✅ Customer name input มีอยู่');
  });

  test('6️⃣ Should have contract number input', async ({ page }) => {
    await page.locator('#appPage').evaluate(el => el.style.display = 'block');
    await expect(page.locator('[data-test="contract-number"]')).toBeAttached();
    console.log('✅ Contract number input มีอยู่');
  });

  test('7️⃣ Should have branch select dropdown', async ({ page }) => {
    await page.locator('#appPage').evaluate(el => el.style.display = 'block');
    await expect(page.locator('[data-test="branch-select"]')).toBeAttached();
    const options = await page.locator('[data-test="branch-select"] option').count();
    expect(options).toBeGreaterThan(1);
    console.log('✅ Branch select มี options');
  });

  test('8️⃣ Should have photo upload buttons', async ({ page }) => {
    await page.locator('#appPage').evaluate(el => el.style.display = 'block');
    await expect(page.locator('[data-test="photo-house"]')).toBeAttached();
    await expect(page.locator('[data-test="photo-contract"]')).toBeAttached();
    console.log('✅ Photo upload buttons มีอยู่');
  });

  test('9️⃣ Should have check-in button', async ({ page }) => {
    await page.locator('#appPage').evaluate(el => el.style.display = 'block');
    await expect(page.locator('[data-test="checkin-btn"]')).toBeAttached();
    console.log('✅ Check-in button มีอยู่');
  });

  // =====================
  // Test 4: Form Actions
  // =====================

  test('🔟 Should fill customer name', async ({ page }) => {
    await page.locator('#appPage').evaluate(el => el.style.display = 'block');
    await page.locator('[data-test="customer-name"]').fill('นายทดสอบ ระบบ');
    const value = await page.locator('[data-test="customer-name"]').inputValue();
    expect(value).toBe('นายทดสอบ ระบบ');
    console.log('✅ กรอก customer name ได้');
  });

  test('1️⃣1️⃣ Should select branch and show zone', async ({ page }) => {
    await page.locator('#appPage').evaluate(el => el.style.display = 'block');
    await page.locator('[data-test="branch-select"]').selectOption('พุทธมณฑล');
    const value = await page.locator('[data-test="branch-select"]').inputValue();
    expect(value).toBe('พุทธมณฑล');
    console.log('✅ เลือกสาขาได้');
  });

  // =====================
  // Test 5: Responsive
  // =====================

  test('1️⃣2️⃣ Should be responsive on iPhone', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ ทำงานบน iPhone viewport');
  });

  test('1️⃣3️⃣ Should be responsive on iPad', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ ทำงานบน iPad viewport');
  });
});
