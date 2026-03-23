# Production Pipeline — NeuroMathica Lesson Factory

> This is the master orchestration document. It defines the EXACT process
> for producing a lesson from concept to shipped, tested, production-ready code.
>
> Every lesson goes through 4 phases. No phase can be skipped.

---

## Phase 1: SPEC (Design Document)

### Input
- Concept ID, name, grade, domain, prerequisites
- Core insight (1 sentence)
- Common misconceptions (3-5)
- Primary spatial model (from NEUROSCIENCE-PATTERNS.md §5)

### Agent Prompt
Use the prompt template from AGENT-PROMPTS.md Phase 1.

### Output
A markdown file at `specs/lessons/{ID}-{slug}.md` following TEMPLATE.md exactly.

### Quality Gate
The spec must contain:
- [ ] All 7 stages fully specified
- [ ] Frame-by-frame hook animation (with timings)
- [ ] Every interaction described (input → visual feedback → state change)
- [ ] 9+ practice problems (NO free-text for graded answers)
- [ ] Color palette defined
- [ ] Edge cases listed

---

## Phase 2: BUILD (Implementation)

### Input
- The spec from Phase 1
- DEVELOPER-GUIDE.md (technical rules)

### Agent Prompt
Use the prompt template from AGENT-PROMPTS.md Phase 2.

### Critical Rules (Learned from Bugs)

#### 1. Unicode in JSX — THE #1 BUG
```tsx
// ❌ NEVER DO THIS — renders as literal text
<button>\u2212 Negative</button>

// ✅ ALWAYS DO THIS
<button>{"\u2212"} Negative</button>
<button>− Negative</button>  // actual unicode char
<button>&minus; Negative</button>  // HTML entity
```

#### 2. SVG Positioning — THE #2 BUG
```tsx
// ❌ NEVER DO THIS — dots all stack at position 0
<circle cx={value} cy={100} r={6} />

// ✅ ALWAYS DO THIS — map value to pixel coordinate
const MARGIN = 40;
const LINE_W = 520;
const valToX = (v: number) => MARGIN + ((v - min) / (max - min)) * LINE_W;
<circle cx={valToX(value)} cy={100} r={6} />
```

#### 3. React 19 useRef
```tsx
// ❌ BREAKS IN REACT 19
const ref = useRef<HTMLDivElement>();

// ✅ CORRECT
const ref = useRef<HTMLDivElement>(null);
const ref = useRef<number>(0);
const ref = useRef<Timer>(undefined);
```

#### 4. Practice Problem Flow
```tsx
// ❌ NEVER AUTO-ADVANCE
setTimeout(onCorrect, 1200);  // User can't read feedback!

// ✅ ALWAYS WAIT FOR USER
{feedback && (
  <div>
    <p>{feedback}</p>
    <button onClick={onNext}>Next →</button>
  </div>
)}
```

#### 5. Framer Motion + @use-gesture
```tsx
// ❌ TYPE CONFLICT
<motion.div {...bind()} />

// ✅ CAST TO BYPASS
<motion.div {...(bind() as Record<string, unknown>)} />
```

#### 6. SVG inside SVG — use SVG elements only
```tsx
// ❌ BROKEN — HTML divs inside SVG
<svg>
  <div className="absolute">text</div>
</svg>

// ✅ CORRECT — SVG elements only
<svg>
  <text x={100} y={50} fill="white">text</text>
</svg>
```

### Output
A single file at `src/components/lessons/{PascalName}Lesson.tsx`

### Quality Gate
- [ ] `pnpm build` passes with zero errors
- [ ] No raw `\uXXXX` in JSX text children
- [ ] All SVG elements use calculated pixel positions (not raw values)
- [ ] All practice answers use MC/tap/drag (no textarea for graded)
- [ ] Feedback persists until "Next" button tap
- [ ] All 7 stages accessible and completable
- [ ] `onComplete` fires after stage 7

---

## Phase 3: TEST (Verification)

### Unit Tests
File: `src/components/lessons/__tests__/{Name}Lesson.test.tsx`

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { {Name}Lesson } from "../{Name}Lesson";

describe("{Name}Lesson", () => {
  it("renders without crashing", () => {
    render(<{Name}Lesson />);
    // Hook stage should be visible
    expect(document.querySelector("[class*='bg-nm']")).toBeTruthy();
  });

  it("calls onComplete when provided", async () => {
    const onComplete = vi.fn();
    render(<{Name}Lesson onComplete={onComplete} />);
    // Verify component mounts without error
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("has no raw unicode escapes in rendered output", () => {
    const { container } = render(<{Name}Lesson />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\\u[0-9a-fA-F]{4}/);
  });
});
```

### E2E Tests (Playwright)
File: `tests/e2e/lessons/{slug}.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("{Name} Lesson", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/learn/{ID}/lesson");
    await page.waitForSelector("[class*='bg-nm']", { timeout: 10000 });
  });

  // SCREENSHOT TESTS — capture every stage
  test("captures hook stage screenshot", async ({ page }) => {
    await page.screenshot({
      path: `tests/screenshots/{slug}-01-hook.png`,
      fullPage: true
    });
    // Verify no raw unicode
    const bodyText = await page.textContent("body");
    expect(bodyText).not.toContain("\\u");
  });

  test("can click Continue on hook", async ({ page }) => {
    await page.waitForSelector("button:has-text('Continue')", { timeout: 15000 });
    await page.click("button:has-text('Continue')");
    await page.screenshot({
      path: `tests/screenshots/{slug}-02-spatial.png`,
      fullPage: true
    });
  });

  // INTERACTION TESTS
  test("spatial stage has interactive elements", async ({ page }) => {
    // Get past hook
    await page.waitForSelector("button:has-text('Continue')", { timeout: 15000 });
    await page.click("button:has-text('Continue')");

    // Verify interactive elements exist
    const buttons = await page.locator("button:visible").count();
    expect(buttons).toBeGreaterThan(0);
  });

  // TOUCH TARGET TEST
  test("all buttons meet 44px minimum", async ({ page }) => {
    const buttons = await page.locator("button:visible").all();
    for (const btn of buttons) {
      const box = await btn.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(40); // 44px with some tolerance
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    }
  });

  // OVERFLOW TEST
  test("no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(() => {
      return document.body.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  // FULL FLOW TEST
  test("can complete all 7 stages", async ({ page }) => {
    // This test walks through the entire lesson
    // Stage 1: Hook — click Continue
    await page.waitForSelector("button:has-text('Continue')", { timeout: 15000 });
    await page.click("button:has-text('Continue')");

    // Stage 2: Spatial — interact and click Continue
    // (interact with whatever interactive elements exist)
    for (let i = 0; i < 12; i++) {
      const clickable = page.locator("button:visible, [role='button'], svg circle, [data-interactive]").first();
      if (await clickable.isVisible().catch(() => false)) {
        await clickable.click().catch(() => {});
      }
      await page.waitForTimeout(200);
    }
    const spatialContinue = page.locator("button:has-text('Continue')");
    if (await spatialContinue.isVisible().catch(() => false)) {
      await spatialContinue.click();
    }

    // Continue clicking through remaining stages...
    for (let stage = 3; stage <= 7; stage++) {
      // Click acknowledgment buttons
      const ack = page.locator("button:has-text('I see it'), button:has-text('Got it'), button:has-text('Continue'), button:has-text('Next'), button:has-text('Submit'), button:has-text('Skip')").first();
      for (let attempt = 0; attempt < 20; attempt++) {
        if (await ack.isVisible().catch(() => false)) {
          await ack.click().catch(() => {});
          await page.waitForTimeout(500);
        }
      }

      // Handle reflection textarea
      const textarea = page.locator("textarea");
      if (await textarea.isVisible().catch(() => false)) {
        await textarea.fill("This concept works because the underlying math shows us a pattern that always holds true.");
        const submit = page.locator("button:has-text('Submit'), button:has-text('Complete')").first();
        if (await submit.isVisible().catch(() => false)) {
          await submit.click();
        }
      }
    }

    // Final screenshot
    await page.screenshot({
      path: `tests/screenshots/{slug}-final.png`,
      fullPage: true
    });
  });
});
```

### Quality Gate
- [ ] All unit tests pass
- [ ] All E2E tests pass
- [ ] Screenshots captured at every stage
- [ ] No horizontal overflow
- [ ] No raw unicode in rendered text
- [ ] All buttons ≥ 44px

---

## Phase 4: QA (Visual Review)

### Agent QA Prompt
```
Review the lesson at /learn/{ID}/lesson using Playwright.

1. Navigate to the lesson URL
2. Take a screenshot at EVERY stage (hook, spatial, discovery, symbol, realWorld, practice, reflection)
3. For each screenshot, check:
   - Are elements properly positioned? (not stacked, not overflowing)
   - Is text readable? (no raw \uXXXX, no overlapping)
   - Are interactive elements visible and properly sized?
   - Is the color scheme consistent?
4. Click through the entire lesson flow:
   - Can you reach every stage?
   - Do all buttons work?
   - Does feedback appear and stay until dismissed?
5. Report any issues found with:
   - Screenshot showing the problem
   - File path and approximate line number
   - Suggested fix

If issues found, fix them and re-test.
```

---

## Batch Orchestration

### Producing 6 lessons in parallel:

```
STEP 1: Dispatch 6 SPEC agents (Phase 1)
  → Each reads TEMPLATE.md + NEUROSCIENCE-PATTERNS.md
  → Each produces a design doc
  → Wait for all 6

STEP 2: Dispatch 6 BUILD agents (Phase 2)
  → Each reads its spec + DEVELOPER-GUIDE.md
  → Each produces a component file
  → Wait for all 6

STEP 3: Dispatch 1 TYPE-FIX agent
  → Runs pnpm build
  → Fixes all type errors across all 6 files
  → Verifies build passes

STEP 4: Dispatch 6 TEST agents (Phase 3)
  → Each creates unit + E2E tests for its lesson
  → Each runs tests and fixes failures
  → Wait for all 6

STEP 5: Dispatch 1 QA agent (Phase 4)
  → Uses Playwright to screenshot all 6 lessons
  → Reports visual issues
  → Fixes and re-tests

STEP 6: Update lesson router
  → Add lazy imports for all 6 new lessons
  → Verify build passes
```

---

## Lessons Learned (Bug Database)

| Bug | Root Cause | Fix | Prevention |
|-----|-----------|-----|------------|
| Raw `\u2212` in UI | Unicode escape in JSX text | Wrap in `{"..."}` | DEVELOPER-GUIDE rule |
| Dots stacked at 0 | No value-to-pixel mapping | Use `valToX()` function | SVG positioning rule |
| `useRef()` crash | React 19 requires argument | Add `null` or `undefined` | TypeScript rule |
| Auto-advance too fast | `setTimeout(advance, 1200)` | Show "Next" button | Practice problem rule |
| Type conflict gesture | `motion.div {...bind()}` | Cast to `Record<string, unknown>` | Framer Motion rule |
| HTML inside SVG | `<div>` inside `<svg>` | Use SVG elements only | SVG rule |
| Array access `undefined` | `noUncheckedIndexedAccess` | Add `!` assertion | TypeScript rule |
| Chips overflow container | No `overflow-hidden` | Add containment CSS | Layout rule |
| Framer Motion `textAnchor` | Strict literal type | Use `as const` | TypeScript rule |

---

## File Inventory

### Infrastructure (read-only, don't modify)
```
specs/lessons/
├── TEMPLATE.md              # Design doc template
├── NEUROSCIENCE-PATTERNS.md  # Brain science patterns
├── DEVELOPER-GUIDE.md        # Technical rules + testing
├── AGENT-PROMPTS.md          # Copy-paste agent prompts
└── PRODUCTION-PIPELINE.md    # This file
```

### Per-Lesson Files (created by pipeline)
```
specs/lessons/{ID}-{slug}.md                          # Phase 1 output
src/components/lessons/{PascalName}Lesson.tsx          # Phase 2 output
src/components/lessons/__tests__/{Name}.test.tsx       # Phase 3 output
tests/e2e/lessons/{slug}.spec.ts                      # Phase 3 output
tests/screenshots/{slug}-{##}-{stage}.png             # Phase 4 output
```
