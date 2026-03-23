# Lesson Design — AL-3.3 Two-Step Equations

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `AL-3.3` |
| **Name** | Two-Step Equations |
| **Grade** | 7 |
| **Domain** | algebra |
| **Prerequisites** | AL-3.2 (One-Step Equations) |
| **Successors** | AL-3.4 (Multi-Step Equations) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/TwoStepEquationsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Two-step equations need two inverse operations — undo in reverse order
> (like taking off shoes then socks = putting on socks then shoes).

### 1.2 Learning Objectives
- Students can identify the two operations applied to the variable in a two-step equation
- Students understand that inverse operations must be applied in reverse order (undo addition/subtraction first, then multiplication/division)
- Students can solve equations of the form `ax + b = c` and `ax - b = c`
- Students can explain WHY order matters when undoing operations
- Students can verify solutions by substituting back

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| Divide first, then subtract | Students try operations in "reading order" left-to-right | Layer metaphor shows outer layer (addition) must come off first |
| Forget to apply to both sides | Carried from one-step, but now two steps means two chances to forget | Balance scale tilts when only one side is changed |
| Combine unlike terms (e.g., 2x + 3 = 5x) | Confuse constants with variable terms | Color-coding separates variable terms (purple) from constants (amber) |
| Sign errors with subtraction | Negative numbers are confusing | Visual shows subtraction as "removing blocks" not abstract negation |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity, wonder | "Two locks on a treasure chest" creates question |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement, flow | Balance scale with layered operations builds embodied model |
| Discovery | Prefrontal | Pattern recognition | Productive struggle then insight | Student discovers reverse-order principle |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps balance-scale actions to algebraic notation |
| Real World | Hippocampus | Episodic memory | Relevance | Connects to buying items, temperature conversion |
| Practice | Basal ganglia | Procedural encoding | Mastery | Consolidates two-step solving procedure |
| Reflection | Prefrontal | Metacognition | Pride, ownership | Explains why order matters |

### 2.2 Key Neuroscience Principles Applied
- **Spatial before symbolic**: Balance scale with layered blocks before any notation
- **Productive struggle window**: Discovery prompts target 60-80% success
- **Spaced interleaving**: Practice mixes recall, procedure, understanding
- **Self-explanation effect**: Reflection asks WHY reverse order works

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Purpose**: Create curiosity — a number is locked behind TWO operations.

**Animation Script**:
```
t=0.0s: Dark background. A glowing number "5" appears center.
t=0.5s: First layer wraps around — a golden "multiply by 3" ring. 5 becomes 15.
t=1.5s: Second layer wraps — a blue "+ 7" shell. 15 becomes 22.
t=2.5s: Original 5 is now hidden. Display shows: "? -> 22"
t=3.5s: Text: "Two disguises. Two steps to reveal."
t=4.5s: The layers peel off in REVERSE — first the +7 shell (22 becomes 15), then the x3 ring (15 becomes 5)
t=6.0s: The 5 is revealed with a glow
t=7.0s: Tagline: "Always undo the OUTER layer first."
t=8.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a` (dark slate)
- Number: purple `#a78bfa`, glowing
- Multiply ring: amber `#f59e0b`
- Addition shell: cyan `#22d3ee`

**Animation Specs**:
- Layer wrapping: spring(damping: 20, stiffness: 300)
- Peel-off: spring(damping: 15, stiffness: 400)

**Continue Trigger**: Appears after 8 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Balance scale with two-layer operations. Student removes layers in correct order.

**Scene Layout**:
```
+---------------------------------------------+
|  Equation display: 3x + 5 = 17              |
+---------------------------------------------+
|  Balance Scale SVG                           |
|  Left pan: [x-box][x-box][x-box] + [1][1]...|
|  Right pan: [number display: 17]             |
+---------------------------------------------+
|  Step indicator: "Step 1: Undo +5"           |
|  Action buttons:                             |
|  [Subtract from both] [Divide both]          |
+---------------------------------------------+
|  [Continue] (after solving 3 equations)      |
+---------------------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap "Subtract from both" | Tap button | Blocks fly off both sides with spring animation, scale rebalances | Removes constant, step advances |
| Tap "Divide both" | Tap button | Groups split apart, x-boxes separate, scale rebalances | Divides coefficient, reveals x |
| Wrong order tap | Tap divide first | Shake animation, hint text appears: "Undo the outer layer first!" | No state change, interaction counted |
| New equation | Auto after solve | New equation slides in from right | Reset to step 1 |

**Equations** (3 scenarios):
1. `2x + 4 = 12` (x = 4)
2. `3x + 5 = 17` (x = 4)
3. `4x + 2 = 18` (x = 4)

**Constraints**:
- Wrong-order tap shows hint but does not block progress permanently
- After 2 wrong-order taps, a stronger hint appears
- All solutions are positive integers for simplicity

**Continue Trigger**: `solvedCount >= 2 && interactions >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (4 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Look at 3x + 5 = 17. There are TWO things happening to x. What are they?" | Highlights the "3x" in purple and "+5" in amber | Identify two operations | "I see it!" |
| 2 | "When you get dressed, you put on socks THEN shoes. To undress, you take off shoes THEN socks. Same idea here!" | Animation: sock+shoe layering visual | Reverse order concept | "I see it!" |
| 3 | "The +5 is the OUTER layer (last thing done to x). So we undo it FIRST by subtracting 5 from both sides." | Balance scale animates: -5 from both sides, equation becomes 3x = 12 | Undo outer first | "Got it!" |
| 4 | "Now only ONE layer remains: multiply by 3. Undo it by dividing both sides by 3. x = 4!" | Balance scale: divide both by 3, x = 4 revealed | Complete two-step process | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `3x + 5 = 17` | Full equation with color-coded parts | purple (3x), amber (+5), white (17) |
| 2 | `3x + 5 - 5 = 17 - 5` | "-5" appears on both sides with cyan highlight | cyan for inverse |
| 3 | `3x = 12` | Simplified, +5 fades away | purple = amber gone |
| 4 | `3x / 3 = 12 / 3` | "/3" appears on both sides | cyan for inverse |
| 5 | `x = 4` | Solution glows green | green for solution |

**Final Summary**: "Two-step equations: undo addition/subtraction first, then multiplication/division."

**Continue Trigger**: All 5 notation steps revealed (auto-advance with 2s delays)

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Shopping | Cart icon | "3 identical shirts + $5 tax = $32 total. How much is each shirt?" | `3x + 5 = 32` |
| Temperature | Thermometer | "Double the temperature then add 32 for Fahrenheit. If F = 98, what was the original?" | `2x + 32 = 98` |
| Gaming | Controller | "You earn 4 coins per level + 10 bonus coins = 50 total. How many coins per level?" | `4x + 10 = 50` |
| Cooking | Chef hat | "Triple a recipe and add 2 extra cups = 14 cups total. Original recipe?" | `3x + 2 = 14` |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "In 2x + 7 = 15, which operation do you undo FIRST?" | 4 options | "Subtract 7" | "The +7 is the outer layer, so we undo it first by subtracting 7 from both sides." |
| 2 | Recall | multiple-choice | "After subtracting 7 from both sides of 2x + 7 = 15, what equation remains?" | 4 options | "2x = 8" | "15 - 7 = 8, so we get 2x = 8." |
| 3 | Recall | true-false | "To solve 5x + 3 = 18, the first step is to divide by 5." | True/False | False | "False! Undo the outer layer first: subtract 3 before dividing by 5." |
| 4 | Procedure | multiple-choice | "Solve: 3x + 4 = 19" | 4 options | "x = 5" | "Step 1: 19 - 4 = 15, so 3x = 15. Step 2: 15 / 3 = 5, so x = 5." |
| 5 | Procedure | numeric-input | "Solve: 2x + 6 = 20. x = ?" | Single number | 7 | "20 - 6 = 14, then 14 / 2 = 7. x = 7!" |
| 6 | Procedure | multiple-choice | "Solve: 4x + 1 = 25" | 4 options | "x = 6" | "25 - 1 = 24, then 24 / 4 = 6. x = 6." |
| 7 | Understanding | multiple-choice | "Why must we subtract before dividing in 3x + 5 = 20?" | 4 options | "Because +5 was the last operation applied to x" | "The last operation applied is the first we undo, like taking off the outer coat first." |
| 8 | Understanding | multiple-choice | "If you accidentally divide 3x + 5 = 20 by 3 first, you get x + 5/3 = 20/3. Why is this harder?" | 4 options | "It creates fractions that are harder to work with" | "Undoing in the wrong order creates messy fractions. Reverse order keeps things clean!" |
| 9 | Understanding | multiple-choice | "Kim solved 2x + 8 = 22 and got x = 7. Is she correct? Verify: 2(7) + 8 = ?" | 4 options | "22 - Yes, correct!" | "2(7) = 14, and 14 + 8 = 22. The solution checks out!" |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Explain to a friend why you have to subtract before dividing when solving 3x + 5 = 20. Use the 'getting dressed' analogy or the balance scale idea."

**Rules**:
- Minimum 20 characters
- NOT graded
- Skip button available (smaller styling)
- After submission: encouraging feedback + celebration

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| variable | #a78bfa | Variable x and coefficient |
| operation | #f59e0b | Addition/subtraction constant |
| inverse | #22d3ee | Inverse operation highlights |
| solution | #34d399 | Correct answers, solution |
| error | #f87171 | Wrong answers |
| bgPrimary | #0f172a | Main background |
| bgSurface | #1e293b | Cards, panels |
| textPrimary | #f8fafc | Headers |
| textSecondary | #e2e8f0 | Body text |
| textMuted | #94a3b8 | Hints, labels |

### 4.2 Component Sizing
- Touch targets: 48px preferred
- Font sizes: `clamp(14px, 3.5vw, 18px)` body, `clamp(24px, 6vw, 40px)` display
- Spacing: 8px grid

### 4.3 Animation Presets
```typescript
const SPRING = { type: "spring", damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring", damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" };
```

### 4.4 Layout
- Mobile-first, max-w: 640px
- Fixed progress dots at top
- Continue button anchored to bottom

---

## 5. Technical Implementation

### 5.1 Component Structure
```typescript
"use client";
// Single file: src/components/lessons/TwoStepEquationsLesson.tsx
// Named export: export function TwoStepEquationsLesson({ onComplete }: Props)
// Internal stages: HookStage, SpatialStage, DiscoveryStage,
//   SymbolBridgeStage, RealWorldStage, PracticeStage, ReflectionStage
```

### 5.2 Dependencies
- react (useState, useEffect, useCallback, useMemo, useRef)
- framer-motion (motion, AnimatePresence)
- No drag interactions needed (button-based)

### 5.3 Rules
- TypeScript strict, no `any`
- `useRef()` with argument
- All touch targets 44px+
- No setTimeout auto-advance in practice
- Feedback stays until Next tap
