const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('http://localhost:8080/mobile-checkin.html');
  await page.waitForLoadState('networkidle').catch(() => {});
  console.log('Errors:', JSON.stringify(errors.slice(0,5)));
  const has = await page.evaluate(() => ({
    setter: typeof window.wsDebugSetSession,
    render: typeof window.wsRenderState,
    firebase: typeof window.firebase,
    db: typeof window.db,
  }));
  console.log('Has:', JSON.stringify(has));
  await browser.close();
})();
