# Lesson Design — NO-1.7a Rational Number Operations

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `NO-1.7a` |
| **Name** | Rational Number Operations |
| **Grade** | 7 |
| **Domain** | numbers-operations |
| **Prerequisites** | NO-1.7 (Rational Numbers) |
| **Successors** | AL-3.4 (Multi-Step Equations) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/RationalOpsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Rational number operations follow the same rules regardless of form (fraction, decimal, negative) — convert to a common form, then apply the operation.

### 1.2 Learning Objectives
- Students can add and subtract rational numbers including negatives, fractions, and decimals
- Students can multiply and divide rational numbers, applying sign rules correctly
- Students understand that fractions and decimals are interchangeable representations
- Students can explain why dividing by a fraction means multiplying by its reciprocal

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Negative times negative is negative" | Extending single-negative rule | Number line animation shows direction reversal |
| "Add fractions by adding tops and bottoms" | Overgeneralizing whole-number addition | Visual fraction bars show why common denominators are needed |
| "0.1 + 0.2 = 0.12" | Treating decimals like whole numbers | Place-value columns animate alignment |
| "Dividing makes smaller" | True for positives > 1, not for fractions | Visual shows 6 ÷ ½ = 12 with grouping |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity, wonder | "Same number, different disguises" primes attention |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement, flow | Number line with fraction/decimal equivalence builds embodied model |
| Discovery | Prefrontal | Pattern recognition | Productive struggle then insight | Discovers sign rules and operation patterns |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps visual operations to notation |
| Real World | Hippocampus | Episodic memory | Relevance | Temperature, money, cooking contexts |
| Practice | Basal ganglia | Procedural encoding | Mastery | Consolidates all four operations |
| Reflection | Prefrontal | Metacognition | Pride, ownership | Explains conversion strategy |

### 2.2 Key Neuroscience Principles Applied
- **Spatial before symbolic**: Number line and fraction bars before notation
- **Productive struggle window**: Discovery targets 60-80% success
- **Spaced interleaving**: Practice mixes all four operations
- **Self-explanation effect**: Reflection asks about strategy choice

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Purpose**: Show that the same quantity appears in many forms.

**Animation Script**:
```
t=0.0s: Dark background. Three cards appear: "0.5", "1/2", "-(-1/2)"
t=1.0s: Cards animate together, merge into a single glowing "½"
t=2.0s: Text: "Same value. Different disguises."
t=3.0s: The ½ splits into two copies, one becomes 0.25 and they add: ½ + 0.25
t=4.0s: Result animates: = 0.75 = ¾
t=5.0s: Text: "Mix fractions, decimals, negatives — one set of rules."
t=6.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Cards: purple `#a78bfa` with surface `#1e293b`
- Result: green `#34d399`

**Continue Trigger**: Appears after 6 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Interactive number line where students combine rational numbers.

**Scene Layout**:
```
+---------------------------------------------+
|  Operation display: -3/4 + 1/2 = ?          |
+---------------------------------------------+
|  Number Line SVG (-2 to 2)                   |
|  - Dot at first number (draggable result)    |
|  - Arrow showing operation                   |
+---------------------------------------------+
|  Result: [computed value]                    |
|  [New Problem] (after correct placement)     |
+---------------------------------------------+
|  [Continue] (after 8 interactions)           |
+---------------------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap operation button (+, -, ×, ÷) | Tap | Button highlights, new problem generates | `operation` changes |
| Tap answer option | Tap | Correct: green glow. Wrong: red shake | `solvedCount` increments on correct |

**Problems** (randomly cycled, 8 minimum):
- Addition: -3/4 + 1/2, 1.5 + (-0.75), -2/3 + (-1/3)
- Subtraction: 1/2 - 3/4, -0.5 - 0.25, 2/3 - 5/6
- Multiplication: -1/2 × 2/3, 0.5 × (-4), -3 × (-1/3)
- Division: 3/4 ÷ 1/2, -1 ÷ 0.25, -2/3 ÷ (-1/3)

**Continue Trigger**: `solvedCount >= 6 && interactions >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (5 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Watch: positive × positive = positive. Negative × positive = negative." | Arrow on number line flips direction | Sign rules for multiplication | "I see it!" |
| 2 | "Now: negative × negative = ... positive! Reversing a reversal goes forward." | Two flips return to original direction | Double-negative rule | "I see it!" |
| 3 | "For fractions: to add 1/3 + 1/4, we need the same size pieces. Convert to 4/12 + 3/12." | Fraction bars subdivide to match | Common denominators | "I see it!" |
| 4 | "Dividing by 1/2 means: how many halves fit? 3 ÷ 1/2 = 6 halves!" | Groups of ½ fill up to 3 | Division by fraction | "Got it!" |
| 5 | "The shortcut: dividing by a fraction = multiplying by its flip (reciprocal)." | ÷ 1/2 transforms to × 2/1 | Reciprocal rule | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `a/b + c/d = (ad + bc) / bd` | Fraction bars merge | purple |
| 2 | `a/b × c/d = ac / bd` | Multiply across | amber |
| 3 | `a/b ÷ c/d = a/b × d/c` | Flip and multiply | cyan |
| 4 | `(−a) × (−b) = +ab` | Direction arrows | green |

**Final Summary**: "Convert to common form, apply the operation, simplify."

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Temperature | Thermometer | "It was -3.5°C and dropped 2¾ degrees" | `-3.5 + (-2.75) = -6.25` |
| Cooking | Measuring cup | "Recipe needs ⅔ cup, making 1½ batches" | `2/3 × 3/2 = 1` |
| Money | Wallet | "Owe $4.50, pay back half" | `-4.50 ÷ 2 = -2.25` |
| Elevation | Mountain | "Submarine at -120.5m rises ⅓ of that" | `-120.5 × 1/3 = -40.17` |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "What is -3 × (-4)?" | 4 options | "12" | "Negative × negative = positive. 3 × 4 = 12." |
| 2 | Recall | multiple-choice | "What is 1/2 + 1/3?" | 4 options | "5/6" | "Common denominator 6: 3/6 + 2/6 = 5/6." |
| 3 | Recall | true-false | "Dividing by ½ gives a smaller number." | True/False | False | "False! Dividing by ½ doubles the number." |
| 4 | Procedure | multiple-choice | "Compute: -2/3 + 5/6" | 4 options | "1/6" | "-4/6 + 5/6 = 1/6. Convert to common denominator first." |
| 5 | Procedure | numeric-input | "Compute: -0.75 × 4 = ?" | Single number | -3 | "-0.75 × 4 = -3. Negative × positive = negative." |
| 6 | Procedure | multiple-choice | "Compute: 3/4 ÷ 1/2" | 4 options | "3/2 or 1½" | "3/4 × 2/1 = 6/4 = 3/2. Flip and multiply!" |
| 7 | Understanding | multiple-choice | "Why do we need common denominators to add fractions?" | 4 options | "So the pieces are the same size" | "We can only combine pieces of equal size — that's what common denominators ensure." |
| 8 | Understanding | multiple-choice | "Why does negative × negative = positive?" | 4 options | "Reversing a reversal returns to the original direction" | "Each negative flips direction. Two flips = back to start = positive." |
| 9 | Understanding | multiple-choice | "Which gives the largest result: 6 ÷ 2, 6 ÷ 1, or 6 ÷ ½?" | 4 options | "6 ÷ ½ = 12" | "Dividing by a smaller number gives a larger result. 6 ÷ ½ = 12." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "A friend says 'dividing always makes numbers smaller.' Explain why this isn't true using an example with fractions."

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
| positive | #34d399 | Positive results |
| negative | #f87171 | Negative results |
| fraction | #a78bfa | Fraction displays |
| decimal | #60a5fa | Decimal displays |
| operation | #f59e0b | Operation symbols |
| bgPrimary | #0f172a | Main background |
| bgSurface | #1e293b | Cards, panels |

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

---

## 5. Technical Implementation

### 5.1 Component Structure
```typescript
"use client";
// Single file: src/components/lessons/RationalOpsLesson.tsx
// Named export: export function RationalOpsLesson({ onComplete }: Props)
// Internal stages: HookStage, SpatialStage, DiscoveryStage,
//   SymbolBridgeStage, RealWorldStage, PracticeStage, ReflectionStage
```

### 5.2 Dependencies
- react (useState, useEffect, useCallback, useMemo, useRef)
- framer-motion (motion, AnimatePresence)
- No drag interactions needed (tap/button-based)

### 5.3 Rules
- TypeScript strict, no `any`
- `useRef()` with argument
- All touch targets 44px+
- No setTimeout auto-advance in practice
- Feedback stays until Next tap
