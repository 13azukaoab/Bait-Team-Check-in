const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => errors.push(msg.type() + ': ' + msg.text()));
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));
  await page.goto('http://localhost:8080/mobile-checkin.html');
  await new Promise(r => setTimeout(r, 3000));
  console.log('All errors:', JSON.stringify(errors));
  await browser.close();
})();
