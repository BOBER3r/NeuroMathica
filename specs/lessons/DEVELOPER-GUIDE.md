# Developer Guide — NeuroMathica Lesson Components

> This document is the single source of truth for agents building,
> testing, and shipping lesson components. Read this BEFORE writing code.

---

## 1. Component Architecture

### File Structure
```
src/components/lessons/
├── PlaceValueLesson.tsx      # One file per lesson
├── IntegersLesson.tsx
├── ...
└── __tests__/                # Tests live here
    ├── PlaceValueLesson.test.tsx
    └── ...

tests/e2e/lessons/
├── place-value.spec.ts       # Playwright E2E per lesson
├── integers.spec.ts
└── ...
```

### Component Pattern
```typescript
"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Constants ───────────────────────────────────────
const STAGES = ["hook","spatial","discovery","symbol","realWorld","practice","reflection"] as const;
type Stage = typeof STAGES[number];

const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const COLORS = { /* lesson-specific palette */ };

// ─── Main Component ─────────────────────────────────
export function XxxLesson({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<Stage>("hook");
  const stageIdx = STAGES.indexOf(stage);

  const advance = useCallback(() => {
    const next = STAGES[stageIdx + 1];
    if (next) setStage(next);
    else onComplete?.();
  }, [stageIdx, onComplete]);

  return (
    <div className="flex min-h-dvh flex-col bg-nm-bg-primary">
      {/* Progress bar */}
      <ProgressBar current={stageIdx} total={STAGES.length} />

      {/* Stage content */}
      <AnimatePresence mode="wait">
        <motion.div key={stage} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="flex-1">
          {stage === "hook" && <HookStage onContinue={advance} />}
          {stage === "spatial" && <SpatialStage onContinue={advance} />}
          {/* ... */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Stage Components (internal, not exported) ──────
function HookStage({ onContinue }: { onContinue: () => void }) { ... }
function SpatialStage({ onContinue }: { onContinue: () => void }) { ... }
// etc.
```

---

## 2. Critical Rules (Non-Negotiable)

### TypeScript
- `strict: true`, `noImplicitAny`, `noUncheckedIndexedAccess`
- `useRef()` MUST have an argument: `useRef(null)`, `useRef(undefined)`, `useRef(0)`
- Array indexing returns `T | undefined` — use `arr[i]!` only when you're certain, otherwise null-check
- `textAnchor` in SVG motion elements: `textAnchor={"middle" as const}`
- Framer Motion gesture spreads: `{...(bind() as Record<string, unknown>)}`

### Unicode in JSX
**THE #1 BUG SOURCE.** Unicode escapes in JSX text children render LITERALLY.

```tsx
// ❌ BAD — renders as literal "\u2212"
<button>\u2212 Negative</button>

// ✅ GOOD — renders as −
<button>{"\u2212"} Negative</button>
<button>&minus; Negative</button>
<button>− Negative</button>  // actual character pasted
```

**Rule**: NEVER use `\uXXXX` as raw JSX text. Always wrap in `{"..."}` or use HTML entities.

Common symbols:
- Minus: `&minus;` or `{"\u2212"}` or `−`
- Times: `&times;` or `×`
- Arrow right: `→` or `&rarr;`
- Arrow left: `←` or `&larr;`
- Reset: `↺`
- Check: `✓`
- Cross: `✗`

### Interactions
- ALL touch targets: `min-h-[44px] min-w-[44px]`
- Buttons must have visual feedback: `active:scale-95` or `whileTap={{ scale: 0.95 }}`
- Drag must use `@use-gesture/react`, NOT onMouseDown/onTouchStart
- Every interaction must produce VISIBLE feedback within 100ms

### Practice Problems
- ❌ NO `<textarea>` for graded answers
- ❌ NO `setTimeout(advance, ...)` — NO auto-advance
- ✅ Feedback stays visible until user taps "Next →"
- ✅ Multiple choice, tap-to-select, drag-to-arrange, numeric input only
- ✅ Reflection textarea is NOT graded (participation only, skip available)

### SVG Positioning
- Dots/points on number lines must use the NUMBER LINE'S coordinate system
- Position calculation: `x = marginLeft + ((value - min) / (max - min)) * lineWidth`
- DO NOT stack all elements at position 0 — verify with test data
- SVG viewBox must match the rendered dimensions

---

## 3. Testing Requirements

### Every lesson MUST have:

#### A. Unit Tests (`src/components/lessons/__tests__/{Name}.test.tsx`)
```typescript
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { XxxLesson } from "../XxxLesson";

describe("XxxLesson", () => {
  // Stage rendering
  it("renders hook stage on mount", () => { ... });
  it("shows continue button in hook after delay", () => { ... });
  it("advances to spatial stage on continue click", () => { ... });
  it("advances through all 7 stages", () => { ... });
  it("calls onComplete after reflection", () => { ... });

  // Interactions
  it("spatial: tracks interaction count", () => { ... });
  it("spatial: shows continue after minimum interactions", () => { ... });
  it("practice: shows feedback on answer", () => { ... });
  it("practice: feedback persists until Next tap", () => { ... });
  it("practice: does not auto-advance", () => { ... });

  // Visual correctness
  it("renders correct number of practice problems", () => { ... });
  it("displays correct answer validation", () => { ... });
});
```

#### B. Playwright E2E Tests (`tests/e2e/lessons/{name}.spec.ts`)
```typescript
import { test, expect } from "@playwright/test";

test.describe("Xxx Lesson", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/learn/XX-X.X/lesson");
    await page.waitForLoadState("networkidle");
  });

  // Screenshot tests
  test("hook stage renders correctly", async ({ page }) => {
    await expect(page.getByText("Continue")).toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: "tests/screenshots/xxx-hook.png" });
  });

  // Interaction tests
  test("can progress through all stages", async ({ page }) => {
    // Hook
    await page.getByText("Continue").click();

    // Spatial — interact enough times
    for (let i = 0; i < 10; i++) {
      await page.locator("[data-interactive]").first().click();
    }
    await page.getByText("Continue").click();

    // Discovery — acknowledge prompts
    while (await page.getByText(/I see it|Got it/).isVisible().catch(() => false)) {
      await page.getByText(/I see it|Got it/).click();
      await page.waitForTimeout(500);
    }
    await page.getByText("Continue").click();

    // Symbol Bridge
    await page.getByText("Continue").waitFor({ timeout: 15000 });
    await page.getByText("Continue").click();

    // Real World
    await page.getByText("Continue").click();

    // Practice — answer all problems
    // ... (lesson-specific)

    // Reflection
    await page.fill("textarea", "This concept works because...");
    await page.getByText(/Submit|Complete/).click();

    // Verify completion
    await page.screenshot({ path: "tests/screenshots/xxx-complete.png" });
  });

  // Visual regression
  test("no elements overflow viewport", async ({ page }) => {
    const body = await page.evaluate(() => ({
      scrollW: document.body.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    expect(body.scrollW).toBeLessThanOrEqual(body.clientW + 5);
  });

  // Button functionality
  test("all buttons are clickable", async ({ page }) => {
    const buttons = await page.locator("button:visible").all();
    for (const btn of buttons) {
      const box = await btn.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
```

#### C. Visual Screenshots
Every lesson E2E test must capture screenshots at each stage:
```
tests/screenshots/
├── xxx-hook.png
├── xxx-spatial.png
├── xxx-discovery.png
├── xxx-practice.png
└── xxx-complete.png
```

---

## 4. Common Bugs & Fixes

### SVG Number Line — dots at wrong position
```typescript
// ❌ BAD — all dots stack at x=0
<circle cx={value} cy={dotY} r={6} />

// ✅ GOOD — map value to pixel position
const xPos = MARGIN_LEFT + ((value - rangeMin) / (rangeMax - rangeMin)) * LINE_WIDTH;
<circle cx={xPos} cy={dotY} r={6} />
```

### Framer Motion + @use-gesture type conflict
```typescript
// ❌ BAD — onAnimationStart type mismatch
<motion.div {...bind()} />

// ✅ GOOD — cast to bypass conflict
<motion.div {...(bind() as Record<string, unknown>)} />
```

### State not updating in callbacks
```typescript
// ❌ BAD — stale closure
const handleClick = () => { setCount(count + 1); };

// ✅ GOOD — functional update
const handleClick = () => { setCount(c => c + 1); };
```

### SVG foreignObject rendering issues
```typescript
// ❌ BAD — foreignObject content invisible (wrong namespace)
<foreignObject><div>text</div></foreignObject>

// ✅ GOOD — use SVG text instead (more reliable)
<text x={px} y={py} textAnchor="middle" fill="white">text</text>
```

---

## 5. Quality Checklist (Run Before Shipping)

### Automated (must pass)
- [ ] `pnpm build` — zero type errors
- [ ] `pnpm test` — all unit tests pass
- [ ] `pnpm test:e2e` — all E2E tests pass
- [ ] Screenshots captured at each stage

### Manual Verification
- [ ] Load lesson in browser at 375px width (mobile)
- [ ] Every button/tap target is clickable
- [ ] Every interaction produces visible feedback
- [ ] No text shows raw unicode escapes (\uXXXX)
- [ ] No elements overflow the viewport
- [ ] Progress bar advances correctly
- [ ] Can complete all 7 stages end-to-end
- [ ] Practice feedback stays until "Next" tap
- [ ] Reflection accepts text and shows response
- [ ] `onComplete` fires after final stage

---

## 6. Agent Workflow

### When building a new lesson:
1. Read the design spec in `specs/lessons/{ID}-{name}.md`
2. Read THIS document for rules
3. Create the component file
4. Create unit tests
5. Create E2E test with screenshots
6. Run `pnpm build` — fix type errors
7. Run `pnpm test` — fix test failures
8. Update lesson router in `src/app/(app)/learn/[topicId]/[lessonId]/page.tsx`

### When fixing a broken lesson:
1. Run the E2E test to capture current screenshots
2. Identify visual/functional issues from screenshots
3. Fix the component code
4. Re-run E2E test to verify fix
5. Compare before/after screenshots
