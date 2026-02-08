import { test, expect } from '@playwright/test';

test('screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/46-starter-ionic-react/');
  await page.waitForTimeout(8000);

  // Click on Home tab to ensure content loads
  const homeTab = page.locator('text=Home').first();
  if (await homeTab.isVisible().catch(() => false)) {
    await homeTab.click();
    await page.waitForTimeout(3000);
  }

  await page.screenshot({ path: '/Users/mkazi/60 Projects/screenshots/starters/starter-46.png', fullPage: true });
});
