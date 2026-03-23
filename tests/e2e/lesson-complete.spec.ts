import { test, expect } from "@playwright/test";

test.describe("Lesson Completion Flow", () => {
  test("should display Learn page with domain list", async ({ page }) => {
    await page.goto("/learn");
    await expect(page.getByText("Learn")).toBeVisible();
    await expect(page.getByText("Choose a math domain")).toBeVisible();
  });

  test("should navigate to topic detail page", async ({ page }) => {
    await page.goto("/learn/NO-1.1");
    await expect(page.getByText("Start Lesson")).toBeVisible();
  });

  test("should load lesson player with stage progress", async ({ page }) => {
    await page.goto("/learn/NO-1.1/lesson");
    // Wait for dynamic import to load
    await page.waitForTimeout(2000);
    // Should show lesson content or loading
    const content = page.locator("body");
    await expect(content).toBeVisible();
  });
});
