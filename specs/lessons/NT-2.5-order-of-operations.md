# Lesson Design: NT-2.5 Order of Operations

**Version**: 1.0.0 | **Date**: 2026-03-23 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NT-2.5 | **Domain**: Number Theory | **Grade**: 6
**Prerequisites**: NT-2.4 (Exponents) | **Successors**: AL-3.1 (Variables & Expressions)
**Content Path**: `src/content/domains/number-theory/NT-2.5/`
**Constitution Compliance**: All 7 Core Principles verified. Full NLS 7-stage sequence implemented.

---

## Table of Contents

1. [Core Insight](#1-core-insight)
2. [Neuroscience Framework](#2-neuroscience-framework)
3. [Stage 1 -- Hook (30-60s)](#3-stage-1--hook-30-60s)
4. [Stage 2 -- Spatial Experience (3-4 min)](#4-stage-2--spatial-experience-3-4-min)
5. [Stage 3 -- Guided Discovery (3-5 min)](#5-stage-3--guided-discovery-3-5-min)
6. [Stage 4 -- Symbol Bridge (2-3 min)](#6-stage-4--symbol-bridge-2-3-min)
7. [Stage 5 -- Real-World Anchor (1-2 min)](#7-stage-5--real-world-anchor-1-2-min)
8. [Stage 6 -- Practice (5-10 min)](#8-stage-6--practice-5-10-min)
9. [Stage 7 -- Reflection (~1 min)](#9-stage-7--reflection-1-min)
10. [Technical Specifications](#10-technical-specifications)

---

## 1. Core Insight

PEMDAS/BODMAS gives a universal order so everyone gets the same answer from the same expression. Without it, `2 + 3 * 4` could be 20 or 14 -- the convention removes ambiguity.

**Secondary insights**:
- The hierarchy is: Parentheses first, then Exponents, then Multiplication/Division (left-to-right), then Addition/Subtraction (left-to-right).
- Multiplication and Division are at the SAME level (left-to-right), not "M before D."
- Addition and Subtraction are at the SAME level (left-to-right), not "A before S."
- Parentheses override all other rules -- they're like "do me first!" instructions.
- An expression tree visualizes the hierarchy: operations higher in the tree execute first.

**Key misconception to defeat**: Students think PEMDAS means Multiplication ALWAYS comes before Division (and Addition before Subtraction). The expression tree and step-by-step simplification show that M and D are at the same level, evaluated left-to-right. Similarly for A and S.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | An expression tree is the primary spatial model. Operations are nodes at different heights -- higher = higher priority. Students physically see the hierarchy as vertical position, activating the IPS for magnitude-as-height mapping. |
| PF-2: Dual Coding Theory | The expression string appears at top, and the tree below it. Highlighted portions of the expression correspond to highlighted tree nodes. Both representations are visible simultaneously. |
| PF-3: Embodied Cognition | Students tap tree nodes to "evaluate" them in order. Tapping the wrong node first triggers a gentle bounce-back, guiding discovery of the correct order. Motor cortex engagement during ordered tapping builds procedural memory. |
| PF-4: Spacing Effect | Order-of-operations items enter the FSRS queue interleaved with exponent and variable-expression items. |
| PF-5: Interleaving | Practice problems interleave expressions with different combinations of operations -- not all parentheses problems, then all exponent problems. |
| PF-6: Math Anxiety Reduction | Hook shows a funny disagreement between two calculators. Spatial stage is guided (no wrong answer during exploration). Practice has no timer. |

### 2.2 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "Multiplication always before division" | Very high (~65%) | Expression `12 / 3 * 2`: tree shows M and D at same level; left-to-right gives 8, not 2 | 2, 3, 6 |
| "Addition always before subtraction" | High (~50%) | Expression `10 - 3 + 2`: left-to-right gives 9, not 5 | 3, 6 |
| "Just go left to right, ignore rules" | Moderate (~25%) | `2 + 3 * 4` = 14 not 20; tree shows * is higher priority than + | 2, 3 |
| "Parentheses only mean 'these numbers are grouped'" | Moderate (~20%) | Parentheses force a sub-expression to evaluate first, overriding the default hierarchy. `(2 + 3) * 4 = 20` vs `2 + 3 * 4 = 14`. | 3, 6 |

---

## 3. Stage 1 -- Hook (30-60s)

### 3.1 Narrative Arc

The expression `2 + 3 * 4` appears large on screen. Two "calculators" appear side by side. Calculator A computes left-to-right: `2+3=5, 5*4=20`. Calculator B follows order of operations: `3*4=12, 2+12=14`. They display different answers. A question mark pulses: "Who's right?" The correct calculator (B) gets a checkmark.

### 3.2 Animation Script

```
t=0.0s: Dark background
t=0.5s: Expression "2 + 3 x 4" appears large, centered
t=1.5s: "= ???" fades in to the right
t=2.0s: Two calculator outlines slide in from left and right
t=2.5s: Left calculator: "5 x 4 = 20" (step-by-step, left-to-right)
t=3.5s: Right calculator: "3 x 4 = 12, then 2 + 12 = 14"
t=4.5s: "20" and "14" displayed large, both pulsing
t=5.0s: "Who's right?" text fades in
t=6.0s: Left calculator gets red X, right calculator gets green checkmark
t=6.5s: Tagline: "Rules prevent chaos."
t=7.0s: Continue button fades in
```

### 3.3 Visual Design

- Background: #0f172a
- Expression text: #f8fafc, clamp(28px, 7vw, 48px)
- Left calculator: #1e293b border, red accent (#f87171)
- Right calculator: #1e293b border, green accent (#34d399)
- Question mark: #fbbf24 (amber) pulsing

---

## 4. Stage 2 -- Spatial Experience (3-4 min)

### 4.1 Scene Layout

```
+----------------------------------------------+
|  Expression: 3 + 4 * 2 - 1                   |
+----------------------------------------------+
|                                               |
|         [  -  ]         <-- Level 3 (last)    |
|        /       \                              |
|     [ + ]     [ 1 ]     <-- Level 2           |
|    /     \                                    |
|  [ 3 ]  [ * ]           <-- Level 1 (first)  |
|         /    \                                |
|       [ 4 ] [ 2 ]                             |
|                                               |
|  Tap operations in the correct order!         |
|  Step: 1/3    Interactions: 2/8               |
+----------------------------------------------+
|  [Continue] (appears at 8 interactions)       |
+----------------------------------------------+
```

### 4.2 Interactions

| Interaction | Input | Visual Feedback | State Change |
|---|---|---|---|
| Tap an operation node on the tree | Tap | If correct: node glows green, operands collapse into result with spring animation. If wrong: node shakes red, tooltip says "Not yet! Look for higher-priority operations." | `currentStep++`, `interactions++` |
| Tap "New Expression" button | Tap | New expression and tree appear with slide animation | `expression` changes, `interactions++` |
| Tap "Show Hint" | Tap | Lowest (deepest) unevaluated operation highlights with amber glow | No state change (informational) |

### 4.3 Expressions Pool (cycle through)

1. `3 + 4 * 2` (tree: * first, then +)
2. `8 - 2 + 3` (tree: left-to-right, - then +)
3. `12 / 3 * 2` (tree: left-to-right, / then *)
4. `(2 + 3) * 4` (tree: parentheses force + first)
5. `2 + 3^2` (tree: exponent first, then +)

### 4.4 Constraints

- Each expression must be fully solved before moving to next
- Minimum 8 interactions (correct taps + new expressions) before Continue
- Tree layout uses calculated SVG positions
- Nodes are 44px minimum touch targets

---

## 5. Stage 3 -- Guided Discovery (3-5 min)

### 5.1 Prompts

| # | Prompt Text | Visual | Insight Target | Button |
|---|---|---|---|---|
| 1 | "Notice which operation is DEEPEST in the tree. That one happens first!" | Deepest node highlights with amber glow | Tree depth = priority | "I see it!" |
| 2 | "What about 12 / 3 * 2? Division and multiplication are at the SAME level. When tied, go left to right." | Tree shows / and * at same height, left node (/) highlights first | M and D are equal; left-to-right breaks ties | "I see it!" |
| 3 | "Parentheses are like an elevator -- they push an operation DOWN to the deepest level, so it goes first." | (2+3)*4 tree: + node moves down below *, animated | Parentheses = forced priority | "I see it!" |
| 4 | "The order is: Parentheses, Exponents, then Multiply/Divide (left-to-right), then Add/Subtract (left-to-right). This is PEMDAS." | Full hierarchy displayed as 4-level tower | Complete rule in spatial form | "Got it!" |

---

## 6. Stage 4 -- Symbol Bridge (2-3 min)

### 6.1 Notation Sequence

| Step | Notation | Visual Connection | Color |
|---|---|---|---|
| 1 | `P - Parentheses ( )` | Parentheses glow on expression | purple |
| 2 | `E - Exponents (powers)` | Exponent in expression highlights | amber |
| 3 | `M/D - Multiply & Divide (left to right)` | Both * and / highlight at same level | indigo |
| 4 | `A/S - Add & Subtract (left to right)` | Both + and - highlight at same level | emerald |
| 5 | Step-by-step: `2 + 3 * 4^2` solved | `4^2=16`, `3*16=48`, `2+48=50` | multi-color |

### 6.2 Final Summary

```
PEMDAS:
1. Parentheses    ( )
2. Exponents      ^
3. Multiply/Divide  * /  (left to right)
4. Add/Subtract     + -  (left to right)
```

---

## 7. Stage 5 -- Real-World Anchor (1-2 min)

### 7.1 Scenarios

| Scenario | Icon | Example | Highlighted Math |
|---|---|---|---|
| Shopping | Cart | "2 shirts at $15 + $5 shipping = 2*15+5 = $35, not $40" | Multiply before add |
| Recipes | Mixing bowl | "Double a recipe: 2*(3+4) cups, not 2*3+4" | Parentheses change meaning |
| Gaming | Controller | "Score: base 100 + 3 * bonus 50 = 250, not 150*50" | Multiply before add |
| Coding | Laptop | "Computers follow these EXACT rules in every program" | Universal convention |

---

## 8. Stage 6 -- Practice (5-10 min)

### 8.1 Problems (9 total, 3 per layer)

| # | Layer | Type | Prompt | Options | Correct | Feedback |
|---|---|---|---|---|---|---|
| 1 | Recall | MC | "In PEMDAS, what does the 'E' stand for?" | A) Equals, B) Exponents, C) Equations, D) Everything | B | "E = Exponents. They come after Parentheses and before Multiply/Divide." |
| 2 | Recall | MC | "Are multiplication and division at the same priority level?" | A) Yes, left-to-right, B) No, multiply first, C) No, divide first, D) Depends on the problem | A | "Yes! M and D are at the same level. When both appear, go left to right." |
| 3 | Recall | MC | "What operation do you do FIRST in: 5 + (3 - 1) * 2?" | A) 5+3, B) 3-1, C) 1*2, D) 5+3-1 | B | "Parentheses first! (3-1) = 2, then 2*2 = 4, then 5+4 = 9." |
| 4 | Procedure | MC | "Evaluate: 8 - 2 + 3" | A) 3, B) 9, C) 7, D) 13 | B | "Left to right: 8-2=6, then 6+3=9. Addition and subtraction are the same level!" |
| 5 | Procedure | Numeric | "Evaluate: 4 + 3 * 2" | Input | 10 | "3*2=6 first (multiply before add), then 4+6=10." |
| 6 | Procedure | MC | "Evaluate: (5 + 1) * 3 - 2" | A) 16, B) 14, C) 18, D) 12 | A | "(5+1)=6, then 6*3=18, then 18-2=16." |
| 7 | Understanding | MC | "Why does 2+3*4 equal 14, not 20?" | A) Because 2 is small, B) Because multiply happens before add, C) Because you always start with the bigger number, D) It depends on the calculator | B | "Multiplication has higher priority than addition. 3*4=12 first, then 2+12=14." |
| 8 | Understanding | MC | "12 / 4 * 3 equals:" | A) 1, B) 9, C) 12, D) 36 | B | "Division and multiplication are same level -- go left to right: 12/4=3, then 3*3=9." |
| 9 | Understanding | MC | "How can you make 2+3*4 equal 20?" | A) It's impossible, B) Write (2+3)*4, C) Write 2+(3*4), D) Write 2+3+4*1 | B | "Parentheses override the default order: (2+3)=5, then 5*4=20." |

---

## 9. Stage 7 -- Reflection (~1 min)

**Prompt**: "Explain in your own words why we need an agreed-upon order of operations. What would happen without it?"

- Minimum 20 characters
- Not graded (participation only)
- Skip available (de-emphasized)
- Encouraging feedback on submission + XP earned

---

## 10. Technical Specifications

### 10.1 Component File
`src/components/lessons/OrderOfOpsLesson.tsx`

### 10.2 Export
`export function OrderOfOpsLesson({ onComplete }: { onComplete?: () => void })`

### 10.3 Color Palette

| Token | Hex | Usage |
|---|---|---|
| parentheses | #a78bfa | Parentheses highlights |
| exponent | #fbbf24 | Exponent highlights |
| mulDiv | #818cf8 | Multiply/Divide highlights |
| addSub | #34d399 | Add/Subtract highlights |
| primary | #8b5cf6 | Buttons, accents |
| success | #34d399 | Correct answers |
| error | #f87171 | Wrong answers |
| bgPrimary | #0f172a | Background |
| surface | #1e293b | Cards, surfaces |
| text | #f8fafc | Primary text |

### 10.4 Animation Presets
```typescript
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring" as const, damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" as const };
```

### 10.5 Dependencies
- react (useState, useEffect, useCallback, useMemo, useRef)
- framer-motion (motion, AnimatePresence)
- @/lib/utils/cn
