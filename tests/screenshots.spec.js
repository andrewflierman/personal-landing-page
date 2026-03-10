const { test } = require('@playwright/test');

test('desktop screenshot (1280x720)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/desktop.png', fullPage: false });
});

test('mobile screenshot (375x667)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/mobile.png', fullPage: true });
});
