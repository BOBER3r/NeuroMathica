# Lesson Design Template — NeuroMathica

> **Usage**: Copy this template for each new lesson. Fill in every section.
> An agent reading this document should be able to build the complete
> interactive lesson component without asking any questions.

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | e.g., `NO-1.4a` |
| **Name** | e.g., "Fraction Operations" |
| **Grade** | 6 / 7 / 8 |
| **Domain** | numbers-operations / number-theory / algebra / geometry / statistics-probability |
| **Prerequisites** | List of concept IDs that must be completed first |
| **Successors** | List of concept IDs this unlocks |
| **Duration** | Estimated total minutes (typically 20-30) |
| **Component File** | `src/components/lessons/{PascalName}Lesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> The single "aha" moment the student should reach by the end.
> Example: "A digit's position determines its value — the same digit means
> different things in different places."

### 1.2 Learning Objectives (3-5 bullets)
- Students can [specific observable behavior]
- Students understand [conceptual understanding]
- Students can explain [transfer/connection]

### 1.3 Common Misconceptions (3-5)
| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| e.g., "-5 > -2 because 5 > 2" | Applies positive number rules to negatives | Number line shows -5 is further LEFT = lesser |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity, wonder | Primes attention for learning |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement, flow | Builds embodied representation before symbols |
| Discovery | Prefrontal | Pattern recognition | Productive struggle → insight | Connects spatial to conceptual |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps symbols onto existing spatial model |
| Real World | Hippocampus | Episodic memory | Relevance | Anchors abstract concept to lived experience |
| Practice | Basal ganglia | Procedural encoding | Mastery | Consolidates through retrieval practice |
| Reflection | Prefrontal | Metacognition | Pride, ownership | Deepest encoding through self-explanation |

### 2.2 Key Neuroscience Principles Applied
- **Spatial before symbolic** (Principle II): Visual/interactive experience MUST precede any notation
- **Productive struggle window**: Discovery stage targets 60-80% success — hard enough to engage, not enough to frustrate
- **Spaced interleaving**: Practice problems mix layers (recall → procedure → understanding)
- **Self-explanation effect**: Reflection multiplies retention 2-3x vs passive review

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Purpose**: Create curiosity and emotional engagement. Pure visual — no interaction needed.

**Animation Script** (frame-by-frame):
```
t=0.0s: [Describe what appears]
t=0.5s: [Describe what animates]
t=1.0s: [Continue...]
...
t=end:  Continue button fades in
```

**Visual Design**:
- Background: [color/gradient]
- Key elements: [what objects, their colors, sizes]
- Typography: [text that appears, font size, color]

**Animation Specs**:
- Entry: [spring/fade/slide, duration, easing]
- Main sequence: [what moves, timing]
- Framer Motion config: `spring({ damping: 20, stiffness: 300 })`

**Continue Trigger**: Appears after [N] seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Build embodied understanding through physical interaction.

**Scene Layout**:
```
┌─────────────────────────────┐
│  [Describe top area]        │
├─────────────────────────────┤
│  [Main interactive area]    │
│  - Element A (draggable)    │
│  - Element B (tappable)     │
│  - Display showing result   │
├─────────────────────────────┤
│  [Controls area]            │
│  [Continue button]          │
└─────────────────────────────┘
```

**Interactions** (list each one):

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| e.g., Drag point on number line | @use-gesture drag | Point follows finger, value updates | `position` state |
| e.g., Tap block to add | Tap/click | Block pops in with spring | `count` increments |

**Constraints & Edge Cases**:
- What happens at min/max values?
- What happens on rapid repeated tapping?
- Mobile vs desktop differences?

**Continue Trigger**: `interactions >= [N]` (typically 8-10)

---

### 3.3 Guided Discovery (3-5 minutes)

**Purpose**: Lead student to the core insight through sequential prompts.

**Prompts** (3-6, each requires acknowledgment):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Notice that..." | [what animates/highlights] | Observation | "I see it!" |
| 2 | "Now look at..." | [what changes] | Comparison | "I see it!" |
| 3 | "The key is..." | [revelation animation] | Core insight | "Got it!" |

**Interactive Elements** (if any):
- e.g., "Drag digits to arrange" with validation

---

### 3.4 Symbol Bridge (2-3 minutes)

**Purpose**: Overlay mathematical notation onto the spatial model.

**Notation Sequence** (each appears with 1.5-2s delay):

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `3 × 1,000 = 3,000` | Arrow from thousands blocks | purple |
| 2 | `a/b` | Labels on fraction bar | indigo |

**Final Summary**: The complete formula/expression shown at the end.

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Purpose**: Connect to student's lived experience.

**Scenarios** (3-4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| e.g., Money | 💰 | "$34.56 price tag" | Place value in decimals |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**Purpose**: Consolidate through retrieval practice across 3 layers.

**9 Problems minimum** (3 per layer):

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "What digit is in the hundreds place of 4,729?" | 4 options, tap one | "7" | "The 7 is in the hundreds place, worth 700" |
| 2 | Recall | tap-to-select | ... | ... | ... | ... |
| 3 | Recall | drag-arrange | ... | ... | ... | ... |
| 4 | Procedure | multiple-choice | ... | ... | ... | ... |
| 5 | Procedure | interactive | ... | ... | ... | ... |
| 6 | Procedure | multiple-choice | ... | ... | ... | ... |
| 7 | Understanding | multiple-choice | ... | ... | ... | ... |
| 8 | Understanding | interactive | ... | ... | ... | ... |
| 9 | Understanding | multiple-choice | ... | ... | ... | ... |

**Answer Format Rules**:
- ❌ NO free-text input for graded answers (can't validate reliably)
- ✅ Multiple choice (3-4 options)
- ✅ Tap to select (tap the correct element in a visual)
- ✅ Drag to arrange/reorder
- ✅ Numeric input (single number, exact match)
- ✅ True/False toggle

**Feedback Rules**:
- Show correct/incorrect immediately with visual highlight
- Keep feedback visible until student taps "Next →"
- NO auto-advance (student controls pacing)
- Show brief explanation with every answer (correct or incorrect)

---

### 3.7 Reflection (1-2 minutes)

**Purpose**: Deepen encoding through self-explanation.

**Prompt**: "[Specific question requiring explanation in own words]"

**Rules**:
- Minimum 20 characters
- NOT graded (participation only)
- "Skip" button available (but discouraged via smaller styling)
- After submission: show encouraging feedback + XP earned

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | #818cf8 | Main accent |
| [Custom 1] | #... | [Specific meaning in this lesson] |
| [Custom 2] | #... | [Specific meaning in this lesson] |

### 4.2 Component Sizing
- Touch targets: 44px minimum (48px preferred)
- Block/element sizes: [specific dimensions]
- Font sizes: `clamp(14px, 3.5vw, 18px)` for body, `clamp(24px, 6vw, 40px)` for display numbers
- Spacing: 8px grid (gap-2, gap-3, gap-4)

### 4.3 Animation Presets
```typescript
const SPRING = { type: "spring", damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring", damping: 15, stiffness: 400 };
const SPRING_GENTLE = { type: "spring", damping: 25, stiffness: 200 };
const FADE = { duration: 0.3, ease: "easeOut" };
```

### 4.4 Layout
- Mobile-first (single column)
- Max width: `max-w-lg` (512px) for content, `max-w-3xl` for wide scenes
- Stage content vertically centered in viewport
- Fixed progress bar at top
- Continue button anchored to bottom

---

## 5. Technical Implementation

### 5.1 Component Structure
```typescript
"use client";

// Single file: src/components/lessons/{Name}Lesson.tsx
// Named export: export function {Name}Lesson({ onComplete }: Props)

// Internal stage components (not exported):
// - HookStage
// - SpatialStage
// - DiscoveryStage
// - SymbolBridgeStage
// - RealWorldStage
// - PracticeStage
// - ReflectionStage

// Stage progression via internal useState
// AnimatePresence for transitions between stages
// Progress bar showing 7 dots at top
```

### 5.2 Dependencies (only these)
- `react` (useState, useEffect, useCallback, useMemo, useRef)
- `framer-motion` (motion, AnimatePresence, useMotionValue)
- `@use-gesture/react` (useDrag — only if drag interactions exist)
- `@/lib/utils/cn` (className merging)
- `@/components/ui/Button` (optional, for styled buttons)

### 5.3 Rules
- TypeScript strict, no `any` (DR-1)
- `useRef()` must have an argument: `useRef(null)` or `useRef(undefined)`
- No external state stores — self-contained
- No tRPC calls — pure UI component
- All interactive elements: `min-h-[44px] min-w-[44px]`
- Array access with `noUncheckedIndexedAccess`: use `arr[i]!` or null checks
- `motion.text` textAnchor must be typed: `"middle" as const`

---

## 6. Quality Checklist

Before marking a lesson as complete, verify:

### Functionality
- [ ] All 7 stages render without errors
- [ ] Stage progression works (each stage leads to next)
- [ ] Continue buttons appear at correct triggers
- [ ] All practice problems have correct answers validated
- [ ] Feedback stays visible until "Next" is tapped
- [ ] Reflection accepts text and shows response
- [ ] `onComplete` fires after Stage 7

### Visual Quality
- [ ] Animations are smooth (no janky transitions)
- [ ] Colors are consistent with lesson's palette
- [ ] Text is readable on dark background
- [ ] No layout overflow on mobile (375px width)
- [ ] Numbers use `tabular-nums` for alignment
- [ ] Progress bar at top shows current stage

### Interactions
- [ ] All touch targets ≥ 44px
- [ ] Drag interactions work on touch devices
- [ ] Visual feedback on every tap/click (scale, color, or highlight)
- [ ] No dead states (always a way to progress)

### Accessibility
- [ ] Interactive elements have aria-labels
- [ ] Live regions announce state changes
- [ ] Keyboard navigation possible for key interactions

### Build
- [ ] `pnpm build` passes with no type errors
- [ ] No console errors in browser DevTools
