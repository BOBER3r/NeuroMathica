import { test, expect } from "@playwright/test";

/**
 * Smoke tests for ALL lesson components.
 * Verifies each lesson loads, shows content, and has no rendering bugs.
 */

const LESSONS = [
  // Batch 1
  { id: "NO-1.1", name: "Place Value" },
  { id: "NO-1.2", name: "Integers" },
  { id: "NO-1.2a", name: "Integer Add/Sub" },
  { id: "NO-1.2b", name: "Integer Mult/Div" },
  { id: "NO-1.3", name: "Decimals" },
  { id: "NO-1.4", name: "Fractions" },
  { id: "NO-1.4a", name: "Fraction Operations" },
  { id: "NT-2.1", name: "Factors & Multiples" },
  { id: "NT-2.2", name: "Prime Numbers" },
  { id: "AL-3.1", name: "Variables & Expressions" },
  { id: "GE-4.1", name: "Angles" },
  { id: "SP-5.1", name: "Mean Median Mode" },
  // Batch 3
  { id: "NO-1.5", name: "Ratios" },
  { id: "NO-1.5a", name: "Proportions" },
  { id: "NO-1.6", name: "Percents" },
  { id: "NT-2.3", name: "GCF & LCM" },
  { id: "NT-2.4", name: "Exponents" },
  { id: "AL-3.2", name: "One-Step Equations" },
];

for (const lesson of LESSONS) {
  test.describe(`${lesson.name} (${lesson.id})`, () => {
    test("loads without crashing", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(3000);

      // Should not show a crash/error page
      const bodyText = await page.textContent("body");
      expect(bodyText).not.toContain("Application error");

      // Screenshot
      await page.screenshot({
        path: `tests/screenshots/${lesson.id}-hook.png`,
        fullPage: true,
      });
    });

    test("has no raw unicode escapes", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(2000);
      const bodyText = await page.textContent("body") ?? "";
      // Should not contain literal \uXXXX strings
      expect(bodyText).not.toMatch(/\\u[0-9a-fA-F]{4}/);
    });

    test("has no horizontal overflow", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(2000);
      const overflow = await page.evaluate(
        () => document.body.scrollWidth > document.documentElement.clientWidth + 5
      );
      expect(overflow).toBe(false);
    });

    test("Continue button appears within 15s", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      const continueBtn = page.locator("button:has-text('Continue')");
      await expect(continueBtn).toBeVisible({ timeout: 15000 });
    });
  });
}
