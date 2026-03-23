import { test, expect } from "@playwright/test";

test.describe("Onboarding Flow", () => {
  test("should display welcome page with hook animation", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.getByText("Welcome to NeuroMathica")).toBeVisible();
    await expect(page.getByText("Continue")).toBeVisible();
  });

  test("should navigate through taste page", async ({ page }) => {
    await page.goto("/onboarding/taste");
    await expect(page.getByText("Try it yourself")).toBeVisible();
    // Interact with the triangle to enable continue
    const svg = page.locator("svg").first();
    await svg.click();
    await expect(page.getByText("Amazing! Create Account")).toBeVisible();
  });

  test("should show identity creation form", async ({ page }) => {
    await page.goto("/onboarding/identity");
    await expect(page.getByText("Who are you?")).toBeVisible();
    await page.fill('input[type="text"]', "Test Student");
    await page.getByText("Grade 7").click();
    await expect(page.getByText("Continue")).toBeEnabled();
  });

  test("should display diagnostic assessment", async ({ page }) => {
    await page.goto("/onboarding/diagnostic");
    await expect(page.getByText("Question 1 of 15")).toBeVisible();
  });

  test("should show completion page with level reveal", async ({ page }) => {
    await page.goto("/onboarding/complete");
    await expect(page.getByText("Spark I")).toBeVisible();
    await expect(page.getByText("Start Learning")).toBeVisible();
  });
});
