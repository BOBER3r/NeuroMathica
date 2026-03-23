# Lesson Design — AL-3.4 Multi-Step Equations

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `AL-3.4` |
| **Name** | Multi-Step Equations |
| **Grade** | 7 |
| **Domain** | algebra |
| **Prerequisites** | AL-3.3 (Two-Step Equations) |
| **Successors** | AL-3.5 (Inequalities) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/MultiStepEquationsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Multi-step equations are solved by simplifying each side first (distribute, combine like terms), then isolating the variable with inverse operations — just more layers to peel.

### 1.2 Learning Objectives
- Students can apply the distributive property to remove parentheses
- Students can combine like terms on each side of an equation
- Students can solve equations with variables on both sides
- Students can verify solutions by substitution
- Students can explain why simplifying before isolating is the best strategy

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Distribute to only the first term" e.g., 3(x+2) = 3x+2 | Partial application of distributive property | Visual shows arrows from 3 to BOTH x and 2 |
| "Move variable without changing sign" | Forgetting subtraction is adding negative | Color-coded sign tracking on both sides |
| "Combine unlike terms (3x + 5 = 8x)" | Confusing variable and constant terms | Different colors for variable vs constant terms |
| "Variables on both sides means no solution" | Haven't encountered this form before | Side-by-side balance shows gathering variables to one side |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | "Unwrapping nested boxes" metaphor |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Visual equation balancing with grouping |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers simplify-then-isolate strategy |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps visual steps to algebraic notation |
| Real World | Hippocampus | Episodic memory | Relevance | Cell phone plans, savings goals |
| Practice | Basal ganglia | Procedural encoding | Mastery | Mixed problem types |
| Reflection | Prefrontal | Metacognition | Pride | Explains strategy choice |

### 2.2 Key Neuroscience Principles Applied
- **Spatial before symbolic**: Balance with grouping blocks before notation
- **Productive struggle window**: 60-80% success in discovery
- **Spaced interleaving**: Practice mixes all equation types
- **Self-explanation effect**: Reflection on strategy selection

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: Dark background. A wrapped gift box appears.
t=0.5s: First wrapping peels off: reveals "3(x + 2)" — distributive property.
t=1.5s: Arrow from 3 hits x, then hits 2: "3x + 6"
t=2.5s: Second layer peels: "3x + 6 + 2x = 21" — like terms glow same color
t=3.5s: Like terms slide together: "5x + 6 = 21"
t=4.5s: Text: "Simplify. Gather. Solve. Layer by layer."
t=5.5s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Distributive arrows: amber `#f59e0b`
- Like terms: purple `#a78bfa` (variables), cyan `#22d3ee` (constants)

**Continue Trigger**: Appears after 5.5 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Scene Layout**:
```
+---------------------------------------------+
|  Equation: 2(x + 3) + x = 15               |
+---------------------------------------------+
|  Step buttons:                               |
|  [Distribute] [Combine Like Terms]           |
|  [Subtract from both] [Divide both]          |
+---------------------------------------------+
|  Current equation state (animated)           |
|  Color coded: variables purple, constants    |
+---------------------------------------------+
|  [Continue] (after 2 equations solved)       |
+---------------------------------------------+
```

**Equations** (3 scenarios):
1. `2(x + 3) + x = 15` → distribute → `2x + 6 + x = 15` → combine → `3x + 6 = 15` → subtract 6 → `3x = 9` → divide 3 → `x = 3`
2. `4x + 3 = 2x + 11` → subtract 2x → `2x + 3 = 11` → subtract 3 → `2x = 8` → divide 2 → `x = 4`
3. `3(x - 1) = 2x + 5` → distribute → `3x - 3 = 2x + 5` → subtract 2x → `x - 3 = 5` → add 3 → `x = 8`

**Continue Trigger**: `solvedCount >= 2 && interactions >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (4 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "See 3(x + 2)? The 3 multiplies EVERYTHING inside the parentheses." | Arrows animate from 3 to x and to 2 | Distributive property | "I see it!" |
| 2 | "After distributing: 3x + 6. Now look for terms that match — 3x and 2x are 'like terms.'" | Same-colored terms pulse | Like terms identification | "I see it!" |
| 3 | "Variables on BOTH sides? Move all variables to one side by subtracting." | Visual shows 4x - 2x gathering on left | Variables to one side | "Got it!" |
| 4 | "Strategy: Distribute first, combine like terms, then use inverse operations." | Flowchart animates | Complete process | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `3(x + 2) = 3·x + 3·2 = 3x + 6` | Distribution arrows | amber |
| 2 | `3x + 2x = 5x` (combining like terms) | Terms slide together | purple |
| 3 | `4x + 3 = 2x + 11 → 2x = 8` | Subtract 2x from both | cyan |
| 4 | `x = 4` ✓ verify: `4(4) + 3 = 19, 2(4) + 11 = 19` ✓ | Check marks | green |

**Final Summary**: "Distribute → Combine like terms → Isolate variable → Verify"

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Cell Plans | Phone | "Plan A: $20 + $5/GB. Plan B: $10 + $8/GB. When equal?" | `20 + 5x = 10 + 8x` |
| Savings | Piggy bank | "You have $50 and save $15/week. Friend has $20 and saves $25/week." | `50 + 15x = 20 + 25x` |
| Perimeter | Fence | "Rectangle: length is 3 more than twice the width. Perimeter = 36." | `2(2w + 3) + 2w = 36` |
| Tickets | Ticket | "Adult ticket: $12. Child: $8. 3 adults + children = $56 total." | `3(12) + 8x = 56` |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "What does 3(x + 4) expand to?" | 4 options | "3x + 12" | "Distribute: 3·x + 3·4 = 3x + 12." |
| 2 | Recall | multiple-choice | "Which terms are 'like terms': 5x, 3, 2x, 7?" | 4 options | "5x and 2x" | "Like terms have the same variable part. 5x and 2x both have x." |
| 3 | Recall | true-false | "In 4x + 3 = 2x + 9, the first step is to divide by 4." | True/False | False | "False! First gather variables to one side: subtract 2x from both sides." |
| 4 | Procedure | multiple-choice | "Solve: 2(x + 5) = 16" | 4 options | "x = 3" | "2x + 10 = 16. Then 2x = 6. Then x = 3." |
| 5 | Procedure | numeric-input | "Solve: 5x + 3 = 3x + 11. x = ?" | Single number | 4 | "5x - 3x = 11 - 3. 2x = 8. x = 4." |
| 6 | Procedure | multiple-choice | "Solve: 3(x - 2) = x + 6" | 4 options | "x = 6" | "3x - 6 = x + 6. 2x = 12. x = 6." |
| 7 | Understanding | multiple-choice | "Why distribute BEFORE combining like terms?" | 4 options | "Parentheses hide terms that might be combinable" | "You can't see all like terms until parentheses are removed." |
| 8 | Understanding | multiple-choice | "Sam got x = 5 for 2x + 3 = x + 7. Check: is 2(5)+3 = 5+7?" | 4 options | "13 = 12. No, incorrect!" | "Always verify: 2(5)+3=13 but 5+7=12. Sam made an error." |
| 9 | Understanding | multiple-choice | "Which equation has variables on both sides?" | 4 options | "3x + 1 = x + 9" | "When x appears on both sides, gather variables to one side first." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "What is the first thing you look for when solving a multi-step equation? Describe your strategy in order."

**Rules**:
- Minimum 20 characters
- NOT graded
- Skip button available
- After submission: encouraging feedback + XP

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| variable | #a78bfa | Variable terms (3x, 2x) |
| constant | #f59e0b | Constant terms |
| distribute | #f59e0b | Distribution arrows |
| inverse | #22d3ee | Inverse operations |
| solution | #34d399 | Correct answers |
| error | #f87171 | Wrong answers |
| bgPrimary | #0f172a | Main background |
| bgSurface | #1e293b | Cards |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring", damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring", damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" };
```

---

## 5. Technical Implementation

### 5.1 Component Structure
```typescript
"use client";
// Single file: src/components/lessons/MultiStepEquationsLesson.tsx
// Named export: export function MultiStepEquationsLesson({ onComplete }: Props)
```

### 5.2 Dependencies
- react (useState, useEffect, useCallback, useMemo, useRef)
- framer-motion (motion, AnimatePresence)

### 5.3 Rules
- TypeScript strict, no `any`
- `useRef()` with argument
- All touch targets 44px+
- No setTimeout auto-advance in practice
- Feedback stays until Next tap
