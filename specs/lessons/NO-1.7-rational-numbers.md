# Lesson Design: NO-1.7 Rational Numbers

**Version**: 1.0.0 | **Date**: 2026-03-23 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NO-1.7 | **Domain**: Numbers & Operations | **Grade**: 7
**Prerequisites**: NO-1.2b (Integer Multiplication & Division) | **Successors**: NO-1.7a (Percent Change), AL-3.3 (Two-Step Equations)
**Content Path**: `src/content/domains/numbers-operations/NO-1.7/`
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

Rational numbers include ALL numbers that can be written as a fraction p/q (where q is not 0) -- integers, decimals, and fractions are all part of the same family, and they all live on the same number line.

**Secondary insights**:
- Every integer is a rational number (e.g., 5 = 5/1).
- Every terminating or repeating decimal is a rational number (e.g., 0.75 = 3/4, 0.333... = 1/3).
- Fractions, decimals, and integers are different notations for the same points on the number line.
- The number line has no gaps in the rational numbers between any two rational numbers -- there is always another rational number between them.

**Key misconception to defeat**: Students think integers, fractions, and decimals are fundamentally different "types" of numbers. The number line shows they are all points on the same line -- 2, 2.0, 4/2, and 200% are all the same point.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | The number line is the primary spatial model. Students place integers, fractions, and decimals on the SAME line, seeing them as equivalent positions. The IPS maps spatial position to numerical magnitude regardless of notation. |
| PF-2: Dual Coding Theory | Each placed point shows all three representations simultaneously: integer/fraction/decimal. Labels are spatially co-located with the point on the number line. |
| PF-3: Embodied Cognition | Students drag number tokens to their correct position on the number line. Motor cortex engagement during placement creates strong positional memory traces. |
| PF-4: Spacing Effect | Rational number items enter the FSRS queue at all three layers. Interleaving with integer and fraction items reinforces the unification concept. |
| PF-5: Interleaving | Practice problems interleave classification, conversion, and ordering tasks -- never blocked by sub-type. |
| PF-6: Math Anxiety Reduction | Hook uses a "family reunion" metaphor. Spatial stage is exploratory. Practice has no timer. |

### 2.2 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "Integers and fractions are different types of numbers" | Very high (~60%) | Number line shows 3, 3.0, 3/1, and 6/2 all land on the same point. | 2, 3 |
| "Decimals can't be fractions" | High (~45%) | Point 0.75 placed on line, then labeled 3/4 -- same position. | 2, 4 |
| "Negative numbers aren't rational" | Moderate (~25%) | Number line extends left; -2 = -2/1 = -4/2 placed visually. | 2, 3 |
| "There are no numbers between 0 and 1" | Moderate (~30%) | Zoom feature reveals 1/4, 1/3, 1/2, 2/3, 3/4 etc. between 0 and 1. | 2, 3 |

---

## 3. Stage 1 -- Hook (30-60s)

### 3.1 Narrative Arc

A number line appears with three "neighborhoods": INTEGER TOWN (left), FRACTION VILLAGE (middle), DECIMAL CITY (right). Residents (number characters) live in separate neighborhoods. Then the walls between neighborhoods dissolve, and the numbers rearrange onto a single unified number line. The visual punchline: 0.5, 1/2, and "half" are the same resident -- they just wore different outfits.

### 3.2 Animation Script

```
t=0.0s: Dark background
t=0.5s: Three labeled boxes appear side by side: "Integers", "Fractions", "Decimals"
t=1.0s: Numbers pop into their boxes: {-2, 0, 1, 3} | {1/2, 3/4, -1/3} | {0.5, 0.75, -0.33...}
t=2.5s: Question fades in: "Are these really different?"
t=3.5s: Box walls dissolve (fade out)
t=4.0s: All numbers slide onto a single horizontal number line
t=5.0s: 0.5 and 1/2 collide at the same point -- merge with glow
t=5.5s: 0.75 and 3/4 collide at the same point -- merge with glow
t=6.0s: Tagline: "One family. One line."
t=7.0s: Continue button fades in
```

### 3.3 Visual Design

- Background: #0f172a
- Integer box: #818cf8 (indigo)
- Fraction box: #34d399 (emerald)
- Decimal box: #fbbf24 (amber)
- Number line: #475569
- Merge glow: #fbbf24 (amber pulse)

---

## 4. Stage 2 -- Spatial Experience (3-4 min)

### 4.1 Scene Layout

```
+----------------------------------------------+
|  "Place numbers on the number line"           |
+----------------------------------------------+
|                                               |
|  <---|----|----|----|----|----|----|--->        |
|  -3  -2   -1    0    1    2    3              |
|                                               |
|  Number tokens to place:                      |
|  [1/2] [0.75] [-1] [2.5] [-3/2] [0.333...]  |
|                                               |
|  Placed: 3/8         Interactions: 5/8        |
+----------------------------------------------+
|  [Continue] (appears at 8 interactions)       |
+----------------------------------------------+
```

### 4.2 Interactions

| Interaction | Input | Visual Feedback | State Change |
|---|---|---|---|
| Drag number token to number line | Drag | Token follows finger; snaps to correct position with spring when within tolerance; shows all-format label | `placedNumbers` updates, `interactions++` |
| Tap zoom button | Tap | Number line zooms in between two integers, revealing more points | `zoomLevel` changes |
| Tap placed point | Tap | Tooltip shows all representations: "0.75 = 3/4 = 75%" | No state change (informational) |
| Tap Reset | Tap | All tokens return to tray | Reset, `interactions++` |

### 4.3 Constraints

- Number line range: -3 to 3 (expandable with zoom)
- Snap tolerance: within 0.15 of correct position
- Each successful placement counts as one interaction
- Minimum 8 interactions (placements + zooms + resets) before Continue
- Wrong placement: token bounces back to tray with gentle shake

---

## 5. Stage 3 -- Guided Discovery (3-5 min)

### 5.1 Prompts

| # | Prompt Text | Visual | Insight Target | Button |
|---|---|---|---|---|
| 1 | "Look at where 1/2 and 0.5 are on the line. What do you notice?" | Both points highlighted, connected by an arc | Same position = same number in different notation | "I see it!" |
| 2 | "Every integer is on this line too. Can you write 3 as a fraction?" | 3 highlighted, then "3/1" label appears next to it | Integers are rational (q = 1) | "I see it!" |
| 3 | "Zoom in between 0 and 1. How many fractions fit there?" | Line zooms, revealing 1/4, 1/3, 1/2, 2/3, 3/4 and more | Infinite density of rationals | "I see it!" |
| 4 | "Any number you can write as a fraction p/q (q not zero) is called a RATIONAL number. Integers, fractions, and decimals that terminate or repeat -- they're all rational." | All points glow, "RATIONAL NUMBERS" title appears | Definition through experience | "Got it!" |

---

## 6. Stage 4 -- Symbol Bridge (2-3 min)

### 6.1 Notation Sequence

| Step | Notation | Visual Connection | Color |
|---|---|---|---|
| 1 | `p/q where q is not 0` | Generic fraction label | indigo |
| 2 | `5 = 5/1` (integer as fraction) | Arrow from integer 5 to fraction form | indigo |
| 3 | `0.75 = 75/100 = 3/4` (decimal as fraction) | Arrow from decimal point to fraction | emerald |
| 4 | `0.333... = 1/3` (repeating decimal) | Arrow from repeating decimal to fraction | amber |
| 5 | `-2 = -2/1 = -4/2` (negative integer) | Arrow from negative point | rose |

### 6.2 Final Summary

```
Rational Number = p/q where q is not 0
Integers: n = n/1
Decimals: terminating or repeating = some p/q
All live on the same number line.
```

---

## 7. Stage 5 -- Real-World Anchor (1-2 min)

### 7.1 Scenarios

| Scenario | Icon | Example | Highlighted Math |
|---|---|---|---|
| Temperature | Thermometer | "-3.5 degrees Celsius -- rational! (-7/2)" | Negative decimals are rational |
| Cooking | Measuring cup | "Add 2/3 cup of flour -- rational!" | Fractions in daily life |
| Money | Coins | "$4.99 = 499/100 -- rational!" | Decimals as fractions |
| Sports | Scoreboard | "Batting average .333 = 1/3 -- rational!" | Repeating decimals |

---

## 8. Stage 6 -- Practice (5-10 min)

### 8.1 Problems (9 total, 3 per layer)

| # | Layer | Type | Prompt | Options | Correct | Feedback |
|---|---|---|---|---|---|---|
| 1 | Recall | MC | "Which of these is a rational number?" | A) Pi, B) 3/7, C) sqrt(2), D) sqrt(5) | B | "3/7 is rational because it's written as a fraction p/q. Pi and square roots of non-perfect squares are irrational." |
| 2 | Recall | MC | "Is -4 a rational number?" | A) Yes, B) No | A | "Yes! -4 = -4/1, which is p/q form." |
| 3 | Recall | True/False | "0.75 is rational because it can be written as 3/4." | True / False | True | "Correct! 0.75 = 75/100 = 3/4, a fraction." |
| 4 | Procedure | MC | "Convert 0.6 to a fraction in simplest form." | A) 6/10, B) 3/5, C) 6/100, D) 1/6 | B | "0.6 = 6/10 = 3/5 after simplifying." |
| 5 | Procedure | MC | "Write 7 as a fraction." | A) 7/0, B) 1/7, C) 7/1, D) 0/7 | C | "7 = 7/1. The denominator is 1, not 0 (division by zero is undefined)." |
| 6 | Procedure | MC | "Which decimal equals 1/3?" | A) 0.3, B) 0.33, C) 0.333..., D) 0.13 | C | "1/3 = 0.333... (repeating). 0.3 = 3/10 and 0.33 = 33/100, which are close but not equal." |
| 7 | Understanding | MC | "Why is every integer also a rational number?" | A) Because integers are fractions, B) Because any integer n = n/1, C) Because integers are decimals, D) They're not | B | "Any integer n can be written as n/1, which is p/q form with q not zero." |
| 8 | Understanding | MC | "On a number line, 0.5 and 1/2 are:" | A) Different points, B) The same point, C) Close but not equal, D) Only equal sometimes | B | "0.5 = 5/10 = 1/2. Same value, same point on the number line." |
| 9 | Understanding | MC | "Is 0.101001000100001... (non-repeating, non-terminating) rational?" | A) Yes, B) No | B | "No! A rational number's decimal must terminate or repeat. This decimal has a pattern but does NOT repeat -- it's irrational." |

---

## 9. Stage 7 -- Reflection (~1 min)

**Prompt**: "Explain in your own words why integers, fractions, and decimals are all part of the same 'family' of numbers."

- Minimum 20 characters
- Not graded (participation only)
- Skip available (de-emphasized)
- Encouraging feedback on submission + XP earned

---

## 10. Technical Specifications

### 10.1 Component File
`src/components/lessons/RationalNumbersLesson.tsx`

### 10.2 Export
`export function RationalNumbersLesson({ onComplete }: { onComplete?: () => void })`

### 10.3 Color Palette

| Token | Hex | Usage |
|---|---|---|
| integer | #818cf8 | Integer points and labels |
| fraction | #34d399 | Fraction points and labels |
| decimal | #fbbf24 | Decimal points and labels |
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
- @use-gesture/react (useDrag -- for placing tokens on number line)
- @/lib/utils/cn
