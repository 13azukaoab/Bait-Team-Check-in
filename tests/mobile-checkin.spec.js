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

// =============================================
// 🔄 Work Session Feature Tests
// =============================================

test.describe('Work Session Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/mobile-checkin.html');
    // Simulate logged-in state: show appPage, set selectedTeam
    await page.evaluate(() => {
      window.selectedTeam = 'A';
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('appPage').style.display = 'flex';
    });
  });

  test('WS-1️⃣ Work Session card is present in DOM', async ({ page }) => {
    await expect(page.locator('[data-test="work-session-card"]')).toBeAttached();
    console.log('✅ Work Session card อยู่ใน DOM');
  });

  test('WS-2️⃣ All 3 work session buttons are visible', async ({ page }) => {
    await expect(page.locator('[data-test="ws-start-btn"]')).toBeVisible();
    await expect(page.locator('[data-test="ws-lastjob-btn"]')).toBeVisible();
    await expect(page.locator('[data-test="ws-arrival-btn"]')).toBeVisible();
    console.log('✅ ทั้ง 3 ปุ่มแสดงอยู่พร้อมกัน');
  });

  test('WS-3️⃣ Check-in button enabled (no ws-disabled)', async ({ page }) => {
    const cls = await page.locator('[data-test="checkin-btn"]').getAttribute('class');
    expect(cls).not.toContain('ws-disabled');
    console.log('✅ Check-in button enabled');
  });

  test('WS-4️⃣ Warning message hidden by default', async ({ page }) => {
    const el = page.locator('#wsCheckinWarning');
    const isHidden = await el.evaluate(node => node.style.display === 'none' || !node.classList.contains('visible'));
    expect(isHidden).toBe(true);
    console.log('✅ Warning message ซ่อนอยู่');
  });

  test('WS-5️⃣ ws-start-btn gets done class after wsRenderState with startTime', async ({ page }) => {
    await page.evaluate(() => {
      if (window.wsDebugSetSession) window.wsDebugSetSession({ date: '01-01-2026', startTime: new Date(), status: 'started' });
      if (window.wsRenderState) window.wsRenderState();
    });
    const cls = await page.locator('[data-test="ws-start-btn"]').getAttribute('class');
    expect(cls).toContain('done');
    console.log('✅ ws-start-btn ได้ class done เมื่อมี startTime');
  });

  test('WS-6️⃣ ws-arrival-btn always visible', async ({ page }) => {
    await expect(page.locator('[data-test="ws-arrival-btn"]')).toBeVisible();
    console.log('✅ ws-arrival-btn visible เสมอ');
  });

  test('WS-7️⃣ ws-lastjob-btn gets done class after wsRenderState with lastJobTime', async ({ page }) => {
    await page.evaluate(() => {
      if (window.wsDebugSetSession) window.wsDebugSetSession({ date: '01-01-2026', lastJobTime: new Date(), status: 'last_done' });
      if (window.wsRenderState) window.wsRenderState();
    });
    const cls = await page.locator('[data-test="ws-lastjob-btn"]').getAttribute('class');
    expect(cls).toContain('done');
    console.log('✅ ws-lastjob-btn ได้ class done เมื่อมี lastJobTime');
  });

  test('WS-8️⃣ wsSumCheckinCount badge exists in DOM', async ({ page }) => {
    await expect(page.locator('#wsSumCheckinCount')).toBeAttached();
    await expect(page.locator('#wsSumCheckinNum')).toBeAttached();
    console.log('✅ wsSumCheckinCount badge มีใน DOM');
  });

  test('WS-9️⃣ ws-arrival-btn gets done class after wsRenderState with arrivalTime', async ({ page }) => {
    await page.evaluate(() => {
      if (window.wsDebugSetSession) window.wsDebugSetSession({ date: '01-01-2026', arrivalTime: new Date(), status: 'arrived' });
      if (window.wsRenderState) window.wsRenderState();
    });
    const cls = await page.locator('[data-test="ws-arrival-btn"]').getAttribute('class');
    expect(cls).toContain('done');
    console.log('✅ ws-arrival-btn ได้ class done เมื่อมี arrivalTime');
  });
});
