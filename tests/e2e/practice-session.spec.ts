import { test, expect } from "@playwright/test";

test.describe("Practice Session Flow", () => {
  test("should display practice start screen", async ({ page }) => {
    await page.goto("/practice");
    await expect(page.getByText("Daily Practice")).toBeVisible();
    await expect(page.getByText("Start Practice Session")).toBeVisible();
  });

  test("should show progress page with Knowledge Nebula", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByText("Knowledge Nebula")).toBeVisible();
  });

  test("should show profile page with achievements", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.getByText("Achievements")).toBeVisible();
    await expect(page.getByText("Settings")).toBeVisible();
  });
});
