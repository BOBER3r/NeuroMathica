# Lesson Design: NO-1.6a Percent Applications

**Version**: 1.0.0 | **Date**: 2026-03-23 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NO-1.6a | **Domain**: Numbers & Operations | **Grade**: 7
**Prerequisites**: NO-1.6 (Percents) | **Successors**: NO-1.7a (Percent Change)
**Content Path**: `src/content/domains/numbers-operations/NO-1.6a/`
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

Percents solve real problems -- discounts, tax, tips, interest, and percent change. "Finding X% of a number" is always multiplication: `number * X/100`, and all everyday percent calculations are variations of this one idea.

**Secondary insights**:
- A discount is subtracting a percent of the original price.
- Tax/tip is adding a percent of the base amount.
- Percent change = (new - old) / old * 100.
- The bar model makes the relationship between original, percent portion, and result visually obvious.

**Key misconception to defeat**: Students often compute "20% off $80" as "$80 - 20 = $60" (subtracting the percent number directly instead of computing 20% of 80 first). The bar model shows that 20% of $80 is $16, so the final price is $64.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | A horizontal bar model is the primary spatial representation. The full bar = original price. A colored segment = the percent portion (discount/tax/tip). Students see the relationship as physical proportions, activating the intraparietal sulcus (IPS). |
| PF-2: Dual Coding Theory | KaTeX notation ($80 * 0.20 = $16; $80 - $16 = $64) appears directly on the bar segments. Percent labels, dollar amounts, and fraction equivalents are spatially co-located. |
| PF-3: Embodied Cognition | Students drag a slider to set the discount percentage, watching the bar segment resize in real-time. Tapping scenario cards triggers animated bar decomposition. Motor cortex engagement strengthens memory traces. |
| PF-4: Spacing Effect | After this lesson, percent-application items enter the FSRS queue at all three layers. Interleaving with basic percent (NO-1.6) items reinforces the connection. |
| PF-5: Interleaving | Practice problems interleave discount, tax, tip, and percent change calculations -- never blocked by sub-type. |
| PF-6: Math Anxiety Reduction | Hook uses a relatable shopping scenario. Spatial stage is exploratory (no right/wrong). Practice has no timer. Wrong answers receive neutral, instructive feedback. |

### 2.2 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "20% off $80 = $80 - 20 = $60" | Very high (~50%) | Bar shows 20% of the bar is $16 (not $20). The segment labeled "20%" is visually 1/5 of 80, revealing the multiplicative nature. | 2, 3 |
| "Tax is added to the percent, not the price" | Moderate (~25%) | Bar extends beyond 100% to show tax as an addition of a percent of the base. | 3, 6 |
| "50% off then 50% off again = free" | Moderate (~30%) | Discovery prompt shows 50% of $100 = $50, then 50% of $50 = $25. Two successive 50% discounts = 75% off, not 100%. | 3 |
| "Percent change is just the difference" | Moderate (~30%) | Bar model shows change relative to original -- a $20 increase on $100 is 20%, but a $20 increase on $50 is 40%. | 3, 6 |

---

## 3. Stage 1 -- Hook (30-60s)

### 3.1 Narrative Arc

A sneaker appears with a price tag of $120. A "SALE: 25% OFF" badge animates in. The price tag splits into two segments: the discount portion ($30) peels away and fades, leaving the final price ($90) glowing. The visual punchline: percent off means removing a fraction of the original -- not subtracting the percent number.

### 3.2 Animation Script

```
t=0.0s: Dark background fades in
t=0.5s: Sneaker silhouette slides in from right
t=1.0s: Price tag "$120" pops in above sneaker (spring pop)
t=2.0s: "SALE 25% OFF" badge stamps onto screen with scale bounce
t=3.0s: Price bar appears under tag, full width = $120
t=3.5s: Bar splits: 75% segment (indigo) stays, 25% segment (rose) separates right
t=4.5s: Rose segment fades out with "$30 saved" label
t=5.0s: Indigo segment pulses, "$90" label appears
t=6.0s: Tagline fades in: "Percents in action -- every day"
t=7.0s: Continue button fades in
```

### 3.3 Visual Design

- Background: #0f172a (slate-900)
- Sneaker: simple geometric silhouette in #334155
- Price tag: white text on #1e293b rounded card
- Sale badge: #fb7185 (rose) with white text
- Bar segments: indigo (#818cf8) for kept portion, rose (#fb7185) for discount
- Typography: clamp(24px, 6vw, 40px) for price, clamp(16px, 4vw, 24px) for labels

---

## 4. Stage 2 -- Spatial Experience (3-4 min)

### 4.1 Scene Layout

```
+----------------------------------------------+
|  "Set the discount"          [Reset button]   |
+----------------------------------------------+
|                                               |
|  Original Price: $100                         |
|  +-----------------------------------------+ |
|  |  FULL BAR ($100)                         | |
|  +-----------------------------------------+ |
|                                               |
|  Discount: [===slider===] 35%                 |
|                                               |
|  +--------------------------+---------------+ |
|  | You Pay: $65 (indigo)    | Saved: $35    | |
|  +--------------------------+---------------+ |
|                                               |
|  Interactions: 4/8                            |
+----------------------------------------------+
|  [Continue] (appears at 8 interactions)       |
+----------------------------------------------+
```

### 4.2 Interactions

| Interaction | Input | Visual Feedback | State Change |
|---|---|---|---|
| Drag discount slider | Horizontal drag | Bar segment resizes in real-time, dollar amounts update | `discountPercent` (0-100) |
| Tap preset buttons (10%, 25%, 50%, 75%) | Tap | Slider jumps to position with spring animation, bar animates | `discountPercent` snaps |
| Tap "Reset" | Tap | Slider returns to 0, bar resets | `discountPercent = 0, interactions++` |

### 4.3 Constraints

- Slider range: 0-100 in integer steps
- Bar always shows two segments: "You Pay" and "Saved"
- Dollar amounts update in real-time with tabular-nums
- Minimum 8 slider movements/taps before Continue appears
- Each significant slider change (>5% movement) counts as one interaction

---

## 5. Stage 3 -- Guided Discovery (3-5 min)

### 5.1 Prompts

| # | Prompt Text | Visual | Insight Target | Button |
|---|---|---|---|---|
| 1 | "Set the slider to 25%. How much do you save on $100?" | Bar shows 25% segment = $25, 75% = $75 | 25% of 100 = 25 (simple case) | "I see it!" |
| 2 | "Now the price is $80. Set 25% again. Is the discount still $25?" | Bar rescales: 25% of $80 = $20, not $25 | Percent is relative to the amount, not absolute | "I see it!" |
| 3 | "What if you get 50% off, then another 50% off the sale price? Is it free?" | Two bars: $100 -> $50 -> $25. Total discount = 75%, not 100% | Successive discounts multiply, they don't add | "Got it!" |
| 4 | "Tax works the other way -- it ADDS a percent. Watch 8% tax on $50." | Bar extends beyond original: $50 + $4 = $54 | Tax/tip = adding a percent of the base | "Got it!" |

---

## 6. Stage 4 -- Symbol Bridge (2-3 min)

### 6.1 Notation Sequence

| Step | Notation | Visual Connection | Color |
|---|---|---|---|
| 1 | `Discount = Price * Rate` | Arrow from full bar to percent segment | indigo |
| 2 | `$80 * 0.25 = $20` | Numbers appear on bar segments | amber |
| 3 | `Final = Price - Discount` | Arrow showing subtraction on bar | emerald |
| 4 | `$80 - $20 = $60` | Final segment highlighted | emerald |
| 5 | `Tax: Final = Price + (Price * Rate)` | Extended bar with tax portion | rose |
| 6 | `$50 + ($50 * 0.08) = $54` | Tax segment highlighted | rose |

### 6.2 Final Summary

```
Discount: Final = Price - (Price * Rate)
Tax/Tip:  Final = Price + (Price * Rate)
```

---

## 7. Stage 5 -- Real-World Anchor (1-2 min)

### 7.1 Scenarios

| Scenario | Icon | Example | Highlighted Math |
|---|---|---|---|
| Shopping | Cart icon | "Sneakers marked 30% off $95" | $95 * 0.30 = $28.50 saved |
| Restaurant | Fork/knife icon | "18% tip on a $42 meal" | $42 * 0.18 = $7.56 tip |
| Sales Tax | Receipt icon | "7% tax on a $15 book" | $15 * 0.07 = $1.05 tax |
| Savings | Piggy bank icon | "Your $200 savings grew 5% interest" | $200 * 0.05 = $10 earned |

---

## 8. Stage 6 -- Practice (5-10 min)

### 8.1 Problems (9 total, 3 per layer)

| # | Layer | Type | Prompt | Options | Correct | Feedback |
|---|---|---|---|---|---|---|
| 1 | Recall | MC | "What does '20% off' mean?" | A) Subtract 20, B) Multiply by 0.20 and subtract, C) Divide by 20, D) Add 20% | B | "20% off means finding 20% of the price, then subtracting that amount." |
| 2 | Recall | MC | "A shirt costs $50. The discount is 10%. How much is the discount?" | A) $10, B) $5, C) $40, D) $15 | B | "$50 * 0.10 = $5. The discount is $5." |
| 3 | Recall | MC | "Tax is 8% on a $25 item. Is the final price more or less than $25?" | A) More, B) Less, C) Same, D) Can't tell | A | "Tax adds to the price, so $25 + tax > $25." |
| 4 | Procedure | MC | "A jacket costs $80 and is 25% off. What's the sale price?" | A) $55, B) $60, C) $65, D) $20 | B | "$80 * 0.25 = $20 discount. $80 - $20 = $60." |
| 5 | Procedure | Numeric | "You leave an 18% tip on a $40 meal. How much is the tip in dollars?" | Input | 7.20 | "$40 * 0.18 = $7.20." |
| 6 | Procedure | MC | "A $60 item has 6% sales tax. What's the total?" | A) $63.60, B) $66, C) $56.40, D) $3.60 | A | "$60 * 0.06 = $3.60 tax. $60 + $3.60 = $63.60." |
| 7 | Understanding | MC | "A store marks an item 40% off, then takes another 10% off the sale price. Is this the same as 50% off?" | A) Yes, B) No -- it's less than 50% off, C) No -- it's more than 50% off, D) Only for items over $100 | B | "40% off then 10% off the new price: 0.60 * 0.90 = 0.54, so you pay 54%. That's only 46% off, less than 50%." |
| 8 | Understanding | MC | "Item A costs $200 and is 30% off. Item B costs $150 and is 40% off. Which is cheaper?" | A) Item A at $140, B) Item B at $90, C) They're the same, D) Can't tell | B | "A: $200 * 0.70 = $140. B: $150 * 0.60 = $90. Item B is cheaper at $90." |
| 9 | Understanding | MC | "A price goes from $80 to $100. What is the percent increase?" | A) 20%, B) 25%, C) 80%, D) 125% | B | "Change = $20. Percent change = 20/80 = 0.25 = 25%. Always divide by the ORIGINAL amount." |

---

## 9. Stage 7 -- Reflection (~1 min)

**Prompt**: "Explain in your own words why '20% off $80' is NOT the same as subtracting 20 from 80."

- Minimum 20 characters
- Not graded (participation only)
- Skip available (de-emphasized)
- Encouraging feedback on submission + XP earned

---

## 10. Technical Specifications

### 10.1 Component File
`src/components/lessons/PercentAppsLesson.tsx`

### 10.2 Export
`export function PercentAppsLesson({ onComplete }: { onComplete?: () => void })`

### 10.3 Color Palette

| Token | Hex | Usage |
|---|---|---|
| primary | #818cf8 | Main accent, "you pay" bar segment |
| discount | #fb7185 | Discount/saved segment |
| tax | #34d399 | Tax/tip segment |
| amber | #fbbf24 | Highlight, insight moments |
| success | #34d399 | Correct answers |
| error | #f87171 | Wrong answers |
| bgPrimary | #0f172a | Background |
| surface | #1e293b | Cards, elevated surfaces |
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
- @use-gesture/react (useDrag -- for discount slider)
- @/lib/utils/cn
