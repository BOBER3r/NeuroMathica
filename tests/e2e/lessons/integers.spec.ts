import { test, expect } from "@playwright/test";

test.describe("Integers Lesson (NO-1.2)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/learn/NO-1.2/lesson");
    await page.waitForSelector("[class*='bg-nm']", { timeout: 10000 });
  });

  test("hook: thermometer renders", async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.screenshot({ path: "tests/screenshots/integers-01-hook.png", fullPage: true });
  });

  test("no raw unicode escapes", async ({ page }) => {
    const bodyText = await page.textContent("body");
    expect(bodyText).not.toMatch(/\\u[0-9a-fA-F]{4}/);
  });

  test("can advance to spatial", async ({ page }) => {
    await page.waitForSelector("button:has-text('Continue')", { timeout: 15000 });
    await page.click("button:has-text('Continue')");
    await page.waitForTimeout(500);
    await page.screenshot({ path: "tests/screenshots/integers-02-spatial.png", fullPage: true });
  });
});
