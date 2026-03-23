# Agent Prompt Templates — NeuroMathica Lesson Pipeline

> Copy these prompts to dispatch agents for lesson creation.
> Two-phase pipeline: SPEC first, then IMPLEMENT.

---

## Phase 1: Spec Agent Prompt

```
Create a detailed interactive lesson design document at
/Users/bober4ik/WebstormProjects/MathApp/specs/lessons/{CONCEPT_ID}-{slug}.md

Read these reference documents first:
- TEMPLATE: /Users/bober4ik/WebstormProjects/MathApp/specs/lessons/TEMPLATE.md
- NEUROSCIENCE: /Users/bober4ik/WebstormProjects/MathApp/specs/lessons/NEUROSCIENCE-PATTERNS.md
- EXISTING EXAMPLE: /Users/bober4ik/WebstormProjects/MathApp/specs/lessons/NO-1.1-place-value.md

Lesson Details:
- Concept ID: {CONCEPT_ID}
- Name: {CONCEPT_NAME}
- Grade: {GRADE}
- Domain: {DOMAIN}
- Prerequisites: {PREREQ_LIST}
- Core Insight: {ONE_SENTENCE_INSIGHT}
- Common Misconceptions: {LIST}
- Primary Spatial Model: {MODEL} (see NEUROSCIENCE-PATTERNS.md §5)

Follow the TEMPLATE exactly. Fill in EVERY section. Be extremely specific about:
1. Hook animation — frame-by-frame with timings
2. Spatial interactions — every input, output, visual feedback, edge case
3. Discovery prompts — exact text, what visual changes, what insight
4. Practice problems — 9 problems, NO free-text answers, all multiple-choice/interactive
5. Colors, sizes, animation springs — pixel-level precision

The document must be detailed enough that a developer can build
the component WITHOUT asking any questions.
```

---

## Phase 2: Implementation Agent Prompt

```
Build the complete interactive lesson component for NeuroMathica.

Read the design doc first:
/Users/bober4ik/WebstormProjects/MathApp/specs/lessons/{CONCEPT_ID}-{slug}.md

Also read the template for technical rules:
/Users/bober4ik/WebstormProjects/MathApp/specs/lessons/TEMPLATE.md

Create a single self-contained component at:
/Users/bober4ik/WebstormProjects/MathApp/src/components/lessons/{PascalName}Lesson.tsx

Technical requirements:
- "use client" React component
- TypeScript strict, no `any`
- useRef() must have an argument (React 19)
- Array access needs `!` for noUncheckedIndexedAccess
- Framer Motion for all animations
- @use-gesture/react for drag interactions (if any)
- 44px minimum touch targets
- spring({ damping: 20, stiffness: 300 }) default
- Mobile-first layout, max-w-lg for content
- Self-contained stage management (no external stores)
- Props: { onComplete?: () => void }
- Export: export function {PascalName}Lesson

Practice problem rules:
- NO free-text for graded answers
- Use: multiple choice, tap-to-select, drag-to-arrange, numeric input
- Feedback stays visible until student taps "Next →"
- NO auto-advance (setTimeout)
- Reflection textarea is NOT graded (participation only)

After creating, run `pnpm build` to verify no type errors.
```

---

## Lesson Router Update

After implementation, add to the switch statement in:
`/src/app/(app)/learn/[topicId]/[lessonId]/page.tsx`

```typescript
// Add lazy import at top:
const {Name}Lesson = lazy(() =>
  import("@/components/lessons/{Name}Lesson")
    .then((m) => ({ default: m.{Name}Lesson }))
);

// Add case in switch:
case "{CONCEPT_ID}":
  return <{Name}Lesson onComplete={handleComplete} />;
```

---

## Batch Dispatch Example

To create 5 lessons in parallel:

```
// Phase 1: Dispatch 5 spec agents
Agent 1: Spec for NO-1.3 (Decimals)
Agent 2: Spec for NO-1.5 (Ratios)
Agent 3: Spec for AL-3.1 (Variables & Expressions)
Agent 4: Spec for AL-3.2 (One-Step Equations)
Agent 5: Spec for SP-5.1 (Mean, Median, Mode)

// Wait for all 5 to complete

// Phase 2: Dispatch 5 implementation agents
Agent 1: Implement NO-1.3 from spec
Agent 2: Implement NO-1.5 from spec
Agent 3: Implement AL-3.1 from spec
Agent 4: Implement AL-3.2 from spec
Agent 5: Implement SP-5.1 from spec

// Wait for all 5 to complete

// Phase 3: Fix types + update router
Agent: Fix all type errors, update lesson router
```
