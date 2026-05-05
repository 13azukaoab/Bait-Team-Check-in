const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/mobile-checkin.html');
  await page.waitForLoadState('domcontentloaded');
  const result = await page.evaluate(() => {
    const hasSetter = typeof window.wsDebugSetSession === 'function';
    const hasRender = typeof window.wsRenderState === 'function';
    if (hasSetter) window.wsDebugSetSession({ date: '01-01-2026', startTime: new Date(), status: 'started' });
    let error = null;
    if (hasRender) { try { window.wsRenderState(); } catch(e) { error = e.message; } }
    const btn = document.getElementById('wsBtnStart');
    return { hasSetter, hasRender, btnClass: btn ? btn.className : 'null', error };
  });
  console.log(JSON.stringify(result));
  await browser.close();
})();
