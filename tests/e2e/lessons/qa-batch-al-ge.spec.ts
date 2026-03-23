import { test, expect, type Page } from "@playwright/test";

/**
 * QA smoke-test for AL-3.x and GE-4.x lessons.
 * For each lesson:
 *  1. Navigate to hook stage, wait, screenshot
 *  2. Click Continue to advance to spatial stage, screenshot
 *  3. Check for visual bugs: raw unicode, horizontal overflow, empty areas, broken buttons
 */

const LESSONS = [
  { id: "AL-3.1", name: "Variables & Expressions" },
  { id: "AL-3.2", name: "One-Step Equations" },
  { id: "AL-3.3", name: "Two-Step Equations" },
  { id: "AL-3.4", name: "Multi-Step Equations" },
  { id: "AL-3.5", name: "Inequalities" },
  { id: "AL-3.6", name: "Coordinate Plane" },
  { id: "AL-3.7", name: "Functions" },
  { id: "AL-3.7a", name: "Function Notation" },
  { id: "AL-3.8", name: "Linear Equations" },
  { id: "AL-3.8a", name: "Slope" },
  { id: "AL-3.8b", name: "Slope-Intercept" },
  { id: "AL-3.9", name: "Systems of Equations" },
  { id: "AL-3.10", name: "Polynomials" },
  { id: "AL-3.10a", name: "Polynomial Operations" },
  { id: "AL-3.11", name: "Factoring" },
  { id: "AL-3.12", name: "Quadratic Equations" },
  { id: "AL-3.13", name: "Sequences" },
  { id: "AL-3.14", name: "Variation" },
  { id: "GE-4.1", name: "Angles" },
  { id: "GE-4.1a", name: "Angle Relationships" },
  { id: "GE-4.2", name: "Triangles" },
  { id: "GE-4.2a", name: "Triangle Properties" },
  { id: "GE-4.3", name: "Pythagorean Theorem" },
  { id: "GE-4.3a", name: "Pythagorean Applications" },
];

interface QAIssue {
  lesson: string;
  stage: string;
  issue: string;
}

async function checkForVisualBugs(page: Page, lessonId: string, stage: string): Promise<QAIssue[]> {
  const issues: QAIssue[] = [];

  const bodyText = (await page.textContent("body")) ?? "";

  // 1. Raw unicode escapes (e.g., \u00D7 showing as literal text)
  if (/\\u[0-9a-fA-F]{4}/.test(bodyText)) {
    issues.push({ lesson: lessonId, stage, issue: "Raw unicode escape visible in text" });
  }

  // 2. Horizontal overflow
  const overflow = await page.evaluate(
    () => document.body.scrollWidth > document.documentElement.clientWidth + 5
  );
  if (overflow) {
    issues.push({ lesson: lessonId, stage, issue: "Horizontal overflow detected" });
  }

  // 3. Check for empty body (no meaningful content rendered)
  if (bodyText.trim().length < 10) {
    issues.push({ lesson: lessonId, stage, issue: "Page appears mostly empty" });
  }

  // 4. Check for "Application error" or "Unhandled Runtime Error"
  if (bodyText.includes("Application error") || bodyText.includes("Unhandled Runtime Error")) {
    issues.push({ lesson: lessonId, stage, issue: "Application/runtime error on page" });
  }

  // 5. Check for "coming soon" (unmapped lesson route)
  if (bodyText.includes("coming soon")) {
    issues.push({ lesson: lessonId, stage, issue: "Lesson route not implemented (coming soon)" });
  }

  // 6. Check for console errors
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  return issues;
}

for (const lesson of LESSONS) {
  test.describe(`QA: ${lesson.name} (${lesson.id})`, () => {
    test("hook stage loads and screenshots", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(4000); // Allow animations + 3s timer for Continue

      // Screenshot the hook stage
      await page.screenshot({
        path: `tests/screenshots/${lesson.id}-hook.png`,
        fullPage: true,
      });

      // Visual bug checks
      const issues = await checkForVisualBugs(page, lesson.id, "hook");
      if (issues.length > 0) {
        console.log(`[QA ISSUES] ${lesson.id} hook:`, JSON.stringify(issues));
      }

      // Verify no crash
      const bodyText = await page.textContent("body");
      expect(bodyText).not.toContain("Application error");
    });

    test("Continue button visible and spatial stage screenshots", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);

      // Wait for Continue button
      const continueBtn = page.locator("button").filter({ hasText: /Continue/i }).first();
      await expect(continueBtn).toBeVisible({ timeout: 15000 });

      // Click Continue to advance to spatial
      await continueBtn.click();
      await page.waitForTimeout(2000); // Allow transition

      // Screenshot the spatial stage
      await page.screenshot({
        path: `tests/screenshots/${lesson.id}-spatial.png`,
        fullPage: true,
      });

      // Visual bug checks on spatial
      const issues = await checkForVisualBugs(page, lesson.id, "spatial");
      if (issues.length > 0) {
        console.log(`[QA ISSUES] ${lesson.id} spatial:`, JSON.stringify(issues));
      }

      // Verify no crash
      const bodyText = await page.textContent("body");
      expect(bodyText).not.toContain("Application error");
    });

    test("no raw unicode escapes", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(2000);
      const bodyText = (await page.textContent("body")) ?? "";
      expect(bodyText).not.toMatch(/\\u[0-9a-fA-F]{4}/);
    });

    test("no horizontal overflow on hook", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(2000);
      const overflow = await page.evaluate(
        () => document.body.scrollWidth > document.documentElement.clientWidth + 5
      );
      expect(overflow).toBe(false);
    });
  });
}
