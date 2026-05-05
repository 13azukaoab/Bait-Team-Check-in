const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('PAGEERROR:', err.stack || err.message));
  page.on('requestfailed', r => console.log('404:', r.url()));
  await page.goto('http://localhost:8080/mobile-checkin.html');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
