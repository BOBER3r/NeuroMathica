# Lesson Design — AL-3.5 Inequalities

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `AL-3.5` |
| **Name** | Inequalities |
| **Grade** | 7 |
| **Domain** | algebra |
| **Prerequisites** | AL-3.3 (Two-Step Equations) |
| **Successors** | AL-3.6 (Coordinate Plane) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/InequalitiesLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Inequalities describe ranges of solutions, not single answers — and multiplying or dividing by a negative flips the direction because it reverses order on the number line.

### 1.2 Learning Objectives
- Students can interpret inequality symbols (<, >, ≤, ≥) as comparisons
- Students can solve one- and two-step inequalities
- Students understand and can apply the sign-flip rule when multiplying/dividing by a negative
- Students can represent solutions on a number line (open vs closed circles)
- Students can explain WHY the sign flips with negative multiplication

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Flip the sign for every step" | Overgeneralizing the flip rule | Only flip when multiplying/dividing by NEGATIVE — visual highlights which operations trigger flip |
| "< means the answer is less than" | Confusing direction | Number line shading shows solution SET, not single value |
| "Open and closed circles are the same" | Not understanding ≤ vs < | Animation shows point sliding to boundary — does it include the boundary or not? |
| "Inequality solutions are single numbers" | Carrying equation mindset | Shaded region on number line shows infinitely many solutions |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | "More than one answer?!" surprise |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Number line with shading builds range concept |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers the flip rule through negative multiplication |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps number line regions to inequality notation |
| Real World | Hippocampus | Episodic memory | Relevance | Height requirements, budget constraints |
| Practice | Basal ganglia | Procedural encoding | Mastery | Solving and graphing inequalities |
| Reflection | Prefrontal | Metacognition | Pride | Explains flip rule |

### 2.2 Key Neuroscience Principles Applied
- **Spatial before symbolic**: Number line shading before inequality symbols
- **Productive struggle window**: Discovery of flip rule through guided exploration
- **Spaced interleaving**: Practice mixes solving with graphing
- **Self-explanation effect**: Reflection on WHY flip rule works

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: Dark background. Text: "x = 3" with a single glowing dot on a number line.
t=1.0s: Text morphs to "x > 3". The dot dissolves into an arrow ray extending right.
t=2.0s: Infinite dots appear along the ray: 3.1, 3.5, 4, 5, 10, 100...
t=3.0s: Text: "Not one answer — infinitely many!"
t=4.0s: Number line flips: "x < 3" ray extends LEFT. All dots reorganize.
t=5.0s: Text: "Welcome to inequalities."
t=6.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Equality dot: purple `#a78bfa`
- Inequality ray: cyan gradient `#22d3ee` to transparent
- Boundary: open circle `#f59e0b` outline

**Continue Trigger**: Appears after 6 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Students solve simple inequalities and see solutions shade on a number line.

**Scene Layout**:
```
+---------------------------------------------+
|  Inequality: x + 3 > 7                      |
+---------------------------------------------+
|  Number Line SVG (-2 to 12)                  |
|  - Boundary point (open or closed)           |
|  - Shaded region for solution                |
+---------------------------------------------+
|  "What is x?"  [Multiple choice answers]     |
|  e.g., [x > 4] [x > 7] [x < 4] [x > 10]   |
+---------------------------------------------+
|  Feedback area                               |
|  [Continue] (after 6 correct)                |
+---------------------------------------------+
```

**Problems** (6 scenarios):
1. `x + 3 > 7` → `x > 4` (open circle at 4, shade right)
2. `x - 2 ≤ 5` → `x ≤ 7` (closed circle at 7, shade left)
3. `2x < 10` → `x < 5` (open circle at 5, shade left)
4. `x + 1 ≥ 4` → `x ≥ 3` (closed circle at 3, shade right)
5. `-x > 2` → `x < -2` (FLIP! open circle at -2, shade left)
6. `-2x ≤ 6` → `x ≥ -3` (FLIP! closed circle at -3, shade right)

**Continue Trigger**: `correctCount >= 4 && interactions >= 6`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (5 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "An equation x + 3 = 7 has ONE answer: x = 4. But x + 3 > 7 has MANY answers." | Number line: single dot vs shaded region | Ranges vs points | "I see it!" |
| 2 | "The circle at the boundary tells you: OPEN means 'not included' (>), CLOSED means 'included' (≥)." | Open vs closed circle comparison | Open vs closed circles | "I see it!" |
| 3 | "Now watch carefully: 2 < 5. Multiply both by -1: -2 ? -5. Which is bigger?" | Number line shows 2 < 5, then -2 and -5 highlighted | Negative reverses order | "I see it!" |
| 4 | "-2 > -5! Multiplying by a negative FLIPPED the order! So we must flip the inequality sign too." | < symbol rotates 180° to > | Flip rule | "Got it!" |
| 5 | "Rule: When you multiply or divide both sides by a NEGATIVE number, flip the inequality sign." | Rule card with visual emphasis | Formal rule | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `x + 3 > 7` → `x > 4` | Subtract 3: no flip | cyan |
| 2 | `2x ≤ 10` → `x ≤ 5` | Divide by +2: no flip | cyan |
| 3 | `-x > 3` → `x < -3` | Divide by -1: FLIP! | red highlight on flip |
| 4 | Number line: open/closed circle notation | Circle types side by side | amber |

**Final Summary**: "Solve like equations. Flip the sign when multiplying/dividing by negative."

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Roller Coaster | Coaster | "Must be at least 48 inches tall" | `h ≥ 48` |
| Budget | Wallet | "Spend less than $50 on books at $8 each" | `8x < 50` |
| Speed Limit | Car | "Drive no more than 65 mph" | `s ≤ 65` |
| Temperature | Thermometer | "Water freezes below 0°C" | `t < 0` |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "What does the open circle mean on a number line?" | 4 options | "The boundary value is NOT included" | "Open circle = strict inequality (< or >). The point itself is not a solution." |
| 2 | Recall | multiple-choice | "When do you flip the inequality sign?" | 4 options | "When multiplying or dividing by a negative" | "Only negative multiplication/division reverses the order, requiring a sign flip." |
| 3 | Recall | true-false | "x > 5 means x could equal 5." | True/False | False | "False! > means strictly greater than. x = 5 is not included (open circle)." |
| 4 | Procedure | multiple-choice | "Solve: x + 4 > 9" | 4 options | "x > 5" | "Subtract 4: x > 5. No flip needed (we subtracted, not multiplied by negative)." |
| 5 | Procedure | multiple-choice | "Solve: -3x ≤ 12" | 4 options | "x ≥ -4" | "Divide by -3 AND flip: x ≥ -4. Remember: divide by negative = flip!" |
| 6 | Procedure | multiple-choice | "Solve: 2x - 1 ≥ 7" | 4 options | "x ≥ 4" | "Add 1: 2x ≥ 8. Divide by 2: x ≥ 4. No flip (divided by positive)." |
| 7 | Understanding | multiple-choice | "Why does -2 > -5 even though 2 < 5?" | 4 options | "Negatives reverse order on the number line" | "On a number line, -2 is to the RIGHT of -5, so -2 is greater." |
| 8 | Understanding | multiple-choice | "How many solutions does x > 3 have?" | 4 options | "Infinitely many" | "Every number greater than 3 is a solution: 3.001, 4, 100, 1000000..." |
| 9 | Understanding | multiple-choice | "Graph of x ≤ 2: which direction is shaded?" | 4 options | "Left (toward smaller numbers)" | "x ≤ 2 includes all numbers less than or equal to 2, so shade LEFT." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Explain to a friend WHY the inequality sign flips when you multiply both sides by a negative number. Use the number line to help your explanation."

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
| solution | #22d3ee | Solution region shading |
| boundary | #f59e0b | Boundary circles |
| flip | #f87171 | Flip warning highlight |
| variable | #a78bfa | Variable terms |
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
// Single file: src/components/lessons/InequalitiesLesson.tsx
// Named export: export function InequalitiesLesson({ onComplete }: Props)
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
- SVG number line positions calculated from coordinate system
