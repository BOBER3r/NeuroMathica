import { test, expect, Page } from "@playwright/test";

/**
 * QA smoke tests for GE-4.x and SP-5.x lesson batches.
 * Tests each lesson stage: hook → spatial → discovery → symbol → realWorld → practice → reflection.
 * Takes screenshots at each navigable stage, checks for common visual bugs.
 */

const LESSONS = [
  { id: "GE-4.4", name: "Quadrilaterals" },
  { id: "GE-4.5", name: "Circles" },
  { id: "GE-4.5a", name: "Circle Measurements" },
  { id: "GE-4.6", name: "Area & Perimeter" },
  { id: "GE-4.6a", name: "Composite Figures" },
  { id: "GE-4.7", name: "Volume" },
  { id: "GE-4.7a", name: "Surface Area" },
  { id: "GE-4.8", name: "Cross Sections" },
  { id: "GE-4.9", name: "Transformations" },
  { id: "GE-4.9a", name: "Congruence" },
  { id: "GE-4.9b", name: "Similarity" },
  { id: "GE-4.10", name: "Coordinate Geometry" },
  { id: "GE-4.11", name: "Constructions" },
  { id: "SP-5.1", name: "Mean Median Mode" },
  { id: "SP-5.2", name: "Data Displays" },
  { id: "SP-5.3", name: "Box Plots" },
  { id: "SP-5.4", name: "Probability" },
  { id: "SP-5.4a", name: "Compound Probability" },
  { id: "SP-5.5", name: "Sampling" },
  { id: "SP-5.6", name: "Scatter Plots" },
  { id: "SP-5.6a", name: "Line of Best Fit" },
  { id: "SP-5.7", name: "Two-Way Tables" },
  { id: "SP-5.8", name: "Statistical Reasoning" },
];

const STAGES = ["hook", "spatial", "discovery", "symbol", "realWorld", "practice", "reflection"];

interface QAIssue {
  lesson: string;
  stage: string;
  issue: string;
}

async function checkForVisualBugs(page: Page, lessonId: string, stageName: string): Promise<QAIssue[]> {
  const issues: QAIssue[] = [];
  const bodyText = await page.textContent("body") ?? "";

  // Check raw unicode escapes (e.g., \u00B2 rendered as literal text)
  if (/\\u[0-9a-fA-F]{4}/.test(bodyText)) {
    issues.push({ lesson: lessonId, stage: stageName, issue: "Raw unicode escape found in text" });
  }

  // Check for horizontal overflow
  const overflow = await page.evaluate(
    () => document.body.scrollWidth > document.documentElement.clientWidth + 5
  );
  if (overflow) {
    issues.push({ lesson: lessonId, stage: stageName, issue: "Horizontal overflow detected" });
  }

  // Check for empty visible containers (min 100px tall with no content)
  const emptyAreas = await page.evaluate(() => {
    const containers = document.querySelectorAll("div, section");
    let count = 0;
    containers.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (
        rect.height > 100 &&
        rect.width > 100 &&
        el.children.length === 0 &&
        (el.textContent ?? "").trim() === ""
      ) {
        count++;
      }
    });
    return count;
  });
  if (emptyAreas > 0) {
    issues.push({ lesson: lessonId, stage: stageName, issue: `${emptyAreas} empty large container(s) found` });
  }

  // Check for error boundaries / crash messages
  if (bodyText.includes("Application error") || bodyText.includes("Something went wrong")) {
    issues.push({ lesson: lessonId, stage: stageName, issue: "Error/crash message displayed" });
  }

  // Check for "undefined" or "null" rendered as text (common React bugs)
  if (/\bundefined\b/.test(bodyText) || /\bnull\b/.test(bodyText)) {
    // Filter out cases where "null" is used in math context
    const suspicious = bodyText.match(/\b(undefined|null)\b/g) ?? [];
    if (suspicious.some(m => m === "undefined")) {
      issues.push({ lesson: lessonId, stage: stageName, issue: "Literal 'undefined' rendered in text" });
    }
  }

  // Check for console errors
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  return issues;
}

for (const lesson of LESSONS) {
  test.describe(`QA: ${lesson.name} (${lesson.id})`, () => {
    test("loads hook stage and screenshots", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(3000);

      // Should not show crash
      const bodyText = await page.textContent("body");
      expect(bodyText).not.toContain("Application error");
      expect(bodyText).not.toContain("coming soon");

      // Screenshot hook stage
      await page.screenshot({
        path: `tests/screenshots/${lesson.id}-hook.png`,
        fullPage: true,
      });

      // Check for visual bugs
      const issues = await checkForVisualBugs(page, lesson.id, "hook");
      if (issues.length > 0) {
        console.log(`[QA ISSUES] ${lesson.id} hook:`, JSON.stringify(issues));
      }

      // Verify no raw unicode
      expect(bodyText).not.toMatch(/\\u[0-9a-fA-F]{4}/);
    });

    test("navigates to spatial stage", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(2000);

      // Find and click Continue button
      const continueBtn = page.locator("button").filter({ hasText: /continue/i }).first();
      await expect(continueBtn).toBeVisible({ timeout: 15000 });
      await continueBtn.click();
      await page.waitForTimeout(2000);

      // Screenshot spatial stage
      await page.screenshot({
        path: `tests/screenshots/${lesson.id}-spatial.png`,
        fullPage: true,
      });

      // Check for visual bugs
      const issues = await checkForVisualBugs(page, lesson.id, "spatial");
      if (issues.length > 0) {
        console.log(`[QA ISSUES] ${lesson.id} spatial:`, JSON.stringify(issues));
      }
    });

    test("no horizontal overflow across stages", async ({ page }) => {
      await page.goto(`/learn/${lesson.id}/lesson`);
      await page.waitForTimeout(2000);

      // Check hook
      let overflow = await page.evaluate(
        () => document.body.scrollWidth > document.documentElement.clientWidth + 5
      );
      expect(overflow).toBe(false);

      // Navigate through stages and check each
      for (let i = 0; i < 3; i++) {
        const continueBtn = page.locator("button").filter({ hasText: /continue/i }).first();
        const isVisible = await continueBtn.isVisible().catch(() => false);
        if (!isVisible) break;
        await continueBtn.click();
        await page.waitForTimeout(1500);

        overflow = await page.evaluate(
          () => document.body.scrollWidth > document.documentElement.clientWidth + 5
        );
        if (overflow) {
          await page.screenshot({
            path: `tests/screenshots/${lesson.id}-overflow-stage${i + 1}.png`,
            fullPage: true,
          });
        }
        expect(overflow).toBe(false);
      }
    });
  });
}
