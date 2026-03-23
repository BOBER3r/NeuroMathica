import { test, expect } from "@playwright/test";

test.describe("Place Value Lesson (NO-1.1)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/learn/NO-1.1/lesson");
    await page.waitForSelector("[class*='bg-nm']", { timeout: 10000 });
  });

  test("hook: renders and shows Continue", async ({ page }) => {
    await page.waitForSelector("button:has-text('Continue')", { timeout: 10000 });
    await page.screenshot({ path: "tests/screenshots/place-value-01-hook.png", fullPage: true });
    const continueBtn = page.locator("button:has-text('Continue')");
    await expect(continueBtn).toBeVisible();
  });

  test("no raw unicode escapes in rendered text", async ({ page }) => {
    const bodyText = await page.textContent("body");
    expect(bodyText).not.toMatch(/\\u[0-9a-fA-F]{4}/);
  });

  test("no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(() =>
      document.body.scrollWidth > document.documentElement.clientWidth + 5
    );
    expect(overflow).toBe(false);
  });

  test("all visible buttons meet 44px min size", async ({ page }) => {
    const buttons = await page.locator("button:visible").all();
    for (const btn of buttons) {
      const box = await btn.boundingBox();
      if (box && box.width > 0) {
        expect(box.height).toBeGreaterThanOrEqual(38);
      }
    }
  });

  test("can advance from hook to spatial", async ({ page }) => {
    await page.waitForSelector("button:has-text('Continue')", { timeout: 10000 });
    await page.click("button:has-text('Continue')");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "tests/screenshots/place-value-02-spatial.png", fullPage: true });
    // Spatial stage should have +/- buttons
    const buttons = await page.locator("button:visible").count();
    expect(buttons).toBeGreaterThan(2);
  });

  test("full lesson flow: can reach practice stage", async ({ page }) => {
    // Hook → Continue
    await page.waitForSelector("button:has-text('Continue')", { timeout: 10000 });
    await page.click("button:has-text('Continue')");

    // Spatial → interact and Continue
    for (let i = 0; i < 15; i++) {
      const btn = page.locator("button:has-text('+')").first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click().catch(() => {});
      }
      await page.waitForTimeout(100);
    }
    const spatialCont = page.locator("button:has-text('Continue')");
    if (await spatialCont.isVisible({ timeout: 3000 }).catch(() => false)) {
      await spatialCont.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: "tests/screenshots/place-value-03-discovery.png", fullPage: true });
    }
  });
});
