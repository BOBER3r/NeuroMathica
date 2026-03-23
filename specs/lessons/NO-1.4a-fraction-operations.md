# Lesson Design: NO-1.4a Fraction Operations (Add, Subtract, Multiply, Divide)

**Version**: 1.0.0 | **Date**: 2026-03-22 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NO-1.4a | **Domain**: Numbers & Operations | **Grade**: 6-7
**Prerequisites**: NO-1.4 (Fractions), NT-2.3 (GCF & LCM) | **Successors**: NO-1.4b (Fractions/Decimals/Percents), AL-3.2 (Evaluating Expressions), NO-1.6 (Order of Operations), GE-4.5 (Perimeter & Area), SP-5.5 (Compound Probability)
**Content Path**: `src/content/domains/numbers-operations/NO-1.4a/`
**Constitution Compliance**: All 7 Core Principles verified. Full NLS 7-stage sequence implemented.

---

## Table of Contents

1. [Core Insight](#1-core-insight)
2. [Neuroscience Framework](#2-neuroscience-framework)
3. [Stage 1 -- Hook (30-60s)](#3-stage-1--hook-30-60s)
4. [Stage 2 -- Spatial Experience (3-4 min)](#4-stage-2--spatial-experience-3-4-min)
5. [Stage 3 -- Guided Discovery (4-5 min)](#5-stage-3--guided-discovery-4-5-min)
6. [Stage 4 -- Symbol Bridge (2-3 min)](#6-stage-4--symbol-bridge-2-3-min)
7. [Stage 5 -- Real-World Anchor (1-2 min)](#7-stage-5--real-world-anchor-1-2-min)
8. [Stage 6 -- Practice (Adaptive)](#8-stage-6--practice-adaptive)
9. [Stage 7 -- Reflection (~1 min)](#9-stage-7--reflection-1-min)
10. [Technical Specifications](#10-technical-specifications)
11. [Accessibility](#11-accessibility)
12. [Performance Budget](#12-performance-budget)
13. [Content Files](#13-content-files)
14. [Gamification Integration](#14-gamification-integration)
15. [AI Tutor Guidance](#15-ai-tutor-guidance)
16. [Edge Cases & Error Handling](#16-edge-cases--error-handling)
17. [Testing Requirements](#17-testing-requirements)

---

## 1. Core Insight

To add or subtract fractions, you need common denominators -- same-sized pieces -- so you are combining like with like. To multiply fractions, you multiply numerators together and denominators together (the area model makes this visible). To divide by a fraction, you "flip and multiply," because dividing by 1/4 is asking "how many quarter-sized groups fit in here?"

**Secondary insights** (built progressively through stages):
- Adding fractions with different denominators without finding common denominators is like adding inches and centimeters -- you must convert to the same unit first.
- Multiplying two proper fractions gives a SMALLER result, not a bigger one. The area model reveals why: you are taking a fraction OF a fraction.
- Dividing by a fraction less than 1 gives a result LARGER than what you started with. Dividing 3 by 1/4 = 12, because there are twelve quarter-sized pieces in 3 wholes.
- The LCM (from NT-2.3) provides the most efficient common denominator, but any common multiple works.

**Key misconception to defeat**: "1/2 + 1/3 = 2/5" (adding both numerators AND denominators). This is the single most dangerous fraction arithmetic error. The hook directly confronts it by showing that 2/5 of a bar is visibly LESS than 1/2 alone -- so how could adding 1/3 make it smaller? The spatial experience then reveals WHY you need same-sized pieces before combining.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | Fraction bars for addition/subtraction show WHY common denominators are necessary -- the pieces literally cannot be combined until they are the same size. The area model for multiplication uses a rectangle where the two fraction dimensions define shaded area, making "fraction OF a fraction" spatial. |
| PF-2: Dual Coding Theory | KaTeX notation is placed directly ON the fraction bars during the Symbol Bridge. The equation `1/2 + 1/3 = 3/6 + 2/6 = 5/6` is synchronized with the visual splitting and recombining of bars. |
| PF-3: Embodied Cognition | Students physically drag fraction bar dividers to split bars into common denominators. For multiplication, they drag the edges of a rectangle to set fraction dimensions. Motor cortex activation creates stronger memory traces than passively watching. |
| PF-4: Spacing Effect | After this lesson, fraction operation items enter the FSRS queue at all three layers. Initial stability is low (~1 day for recall, ~2 days for procedure, ~3 days for understanding). |
| PF-5: Interleaving | Practice problems interleave all four operations (add, subtract, multiply, divide). Students must identify WHICH operation to use, not just execute a known procedure. |
| PF-6: Math Anxiety Reduction | The hook validates the most common mistake ("lots of people think this!") rather than shaming it. The spatial experience is exploratory -- no right/wrong during manipulation. Practice has no timer. Wrong answers receive neutral, instructive feedback. |

### 2.2 Cognitive Load Management

- **Intrinsic load**: Four operations is high complexity. The lesson decomposes into two sub-groups: (1) add/subtract (common denominator method), (2) multiply/divide (numerator-denominator method). Each sub-group is introduced separately in the Spatial and Discovery stages before being combined in Practice.
- **Extraneous load**: Minimized by reusing the fraction bar model from NO-1.4 (familiar tool = lower load). The area model for multiplication is introduced as a single new visual. No menus, no settings, no distractions during any stage.
- **Germane load**: Maximized by the "why does this NOT work?" framing of the hook (prediction error drives learning), and by the area model making multiplication visible as geometry (cross-domain connection strengthens encoding).

### 2.3 Prior Knowledge Activation

This lesson builds directly on NO-1.4 (Fractions) and NT-2.3 (GCF & LCM). The student already understands:
- Fractions as parts of a whole (fraction bar model)
- Equivalent fractions (multiplying top and bottom by the same number)
- LCM (the efficient way to find common denominators)

The hook deliberately uses the fraction bar from NO-1.4 so the student recognizes the tool and feels confident. The common denominator method extends equivalent fractions (a concept they already own) to a new application. The LCM from NT-2.3 provides the "which common denominator should I pick?" answer.

### 2.4 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "1/2 + 1/3 = 2/5" (add tops and bottoms) | Very high (~65% of entering Grade 6) | Hook: 2/5 is visibly LESS than 1/2 alone. Spatial: bars with different-sized pieces literally cannot be stacked. Discovery: guided through the common denominator process. | 1, 2, 3 |
| "Multiplying fractions makes them bigger" | High (~50%) | Area model: 1/2 x 1/3 = a rectangle where only 1/6 of the total area is shaded. Visually obvious the result is SMALLER than either factor. | 2, 3 |
| "Dividing always makes things smaller" | High (~45%) | Spatial: 3 whole bars divided into quarter-sized pieces = 12 pieces. "How many 1/4-sized groups fit in 3?" Clearly more than 3. | 3, 6 |
| "You need common denominators for multiplication too" | Moderate (~30%) | Discovery Prompt 4: explicitly contrasts add (needs common denominators) vs multiply (does not). The area model works WITHOUT common denominators. | 3 |
| "Flip and multiply is a magic trick with no reason" | Moderate (~25%) | Discovery Prompt 5: "How many groups of 1/4 fit in 3?" modeled spatially, then connected to 3 x 4/1 = 12. The "flip" is revealed as asking "how many of this size fit?" | 3 |

---

## 3. Stage 1 -- Hook (30-60s)

### 3.1 Narrative Arc

The hook presents a common wrong answer (1/2 + 1/3 = 2/5) as a believable claim, then visually demolishes it. A character "adds" the fractions by combining numerators and denominators, producing 2/5. Then fraction bars appear showing 1/2, 1/3, and 2/5 side by side -- revealing that 2/5 is actually LESS than 1/2 alone. This is an impossible result: adding a positive amount cannot make things smaller. The cognitive dissonance (prediction error) primes the dopamine system for learning.

### 3.2 Scene Definition

```json
{
  "id": "NO-1.4a-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 400],
  "background": "transparent",
  "objects": [
    {
      "type": "annotation",
      "id": "equation-text",
      "position": [200, 40],
      "latex": "\\frac{1}{2} + \\frac{1}{3} = \\,?",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 28 }
    },
    {
      "type": "annotation",
      "id": "wrong-answer",
      "position": [200, 40],
      "latex": "\\frac{1}{2} + \\frac{1}{3} = \\frac{2}{5}",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 28 }
    },
    {
      "type": "fractionBar",
      "id": "bar-half",
      "numerator": 1,
      "denominator": 2,
      "width": 300,
      "height": 40,
      "position": [50, 100],
      "shadedColor": "#818cf8",
      "unshadedColor": "#334155",
      "showLabel": true,
      "style": {
        "stroke": "#64748b",
        "strokeWidth": 1.5
      }
    },
    {
      "type": "fractionBar",
      "id": "bar-third",
      "numerator": 1,
      "denominator": 3,
      "width": 300,
      "height": 40,
      "position": [50, 160],
      "shadedColor": "#a78bfa",
      "unshadedColor": "#334155",
      "showLabel": true,
      "style": {
        "stroke": "#64748b",
        "strokeWidth": 1.5
      }
    },
    {
      "type": "fractionBar",
      "id": "bar-two-fifths",
      "numerator": 2,
      "denominator": 5,
      "width": 300,
      "height": 40,
      "position": [50, 240],
      "shadedColor": "#f87171",
      "unshadedColor": "#334155",
      "showLabel": true,
      "style": {
        "stroke": "#64748b",
        "strokeWidth": 1.5
      }
    },
    {
      "type": "annotation",
      "id": "comparison-arrow",
      "position": [200, 210],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 14 }
    },
    {
      "type": "annotation",
      "id": "narration-bottom",
      "position": [200, 320],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 16 }
    },
    {
      "type": "annotation",
      "id": "correct-answer-reveal",
      "position": [200, 370],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 22 }
    }
  ]
}
```

### 3.3 Animation Sequence

The hook runs as a single auto-triggered animation sequence. The student does not need to interact -- they watch.

**Timeline (total: ~42 seconds):**

| Time (s) | Action | Duration | Details |
|---|---|---|---|
| 0.0-0.5 | Equation question fades in | 0.5s | `ease: "easeInOut"`. Large equation appears at top: `1/2 + 1/3 = ?` |
| 0.5-2.5 | Hold question | 2.0s | Student reads the question. Curiosity primes -- they want to know the answer. |
| 2.5-3.5 | Wrong answer appears | 1.0s | The `?` morphs to `2/5` via crossfade (300ms). A "confident" checkmark icon briefly appears next to it (`#34d399`, 200ms pop, then fades to gray after 400ms). This frames the wrong answer as something someone confidently believed. |
| 3.5-5.5 | Hold wrong answer | 2.0s | Narration fades in below equation: "Lots of people think you just add the tops and add the bottoms..." |
| 5.5-6.5 | 1/2 bar slides in | 1.0s | Bar slides in from the left (spring: `damping: 20, stiffness: 300`). 1 of 2 parts shaded indigo. Label `1/2` appears below. |
| 6.5-7.0 | Hold | 0.5s | Student sees the 1/2 bar clearly. |
| 7.0-8.0 | 1/3 bar slides in | 1.0s | Bar slides in from the left below the 1/2 bar. 1 of 3 parts shaded purple. Label `1/3` appears below. |
| 8.0-8.5 | Hold | 0.5s | |
| 8.5-10.0 | Narration update | 0.5s | Narration changes: "Let's check. Here's 1/2 and 1/3..." |
| 10.0-11.0 | 2/5 bar slides in | 1.0s | Bar slides in below the 1/3 bar. 2 of 5 parts shaded RED (`#f87171`). Label `2/5` appears below. |
| 11.0-11.5 | Hold | 0.5s | All three bars are now visible, left-aligned, stacked vertically. |
| 11.5-13.0 | Comparison alignment lines draw | 1.5s | A vertical dashed line (`#fbbf24`, amber, 1.5px, dash array `4 4`) draws downward from the right edge of the 1/2 shaded region. A second vertical dashed line draws from the right edge of the 2/5 shaded region. The 2/5 line is visibly to the LEFT of the 1/2 line. |
| 13.0-15.0 | Red flash on 2/5 bar | 0.5s | The 2/5 bar border flashes red (`#f87171`, 3 pulses at 200ms each). A large red X icon (`#f87171`, 32px) appears to the right of the `2/5` label. |
| 15.0-18.0 | Key narration | 3.0s | Narration updates to: "Wait -- 2/5 is LESS than 1/2 alone! Adding 1/3 can't make it SMALLER!" Text uses bold via KaTeX `\textbf{}` on "LESS" and "SMALLER". The word "LESS" is colored `#f87171` (red). |
| 18.0-20.0 | Hold + sink in | 2.0s | The cognitive dissonance lands. The prediction error activates the ACC. |
| 20.0-22.0 | Bars animate to common denominators | 2.0s | The 1/2 bar smoothly splits into 6 parts (3 shaded). The 1/3 bar splits into 6 parts (2 shaded). Each split uses the familiar "breathing" animation from NO-1.4 (spring: `damping: 20, stiffness: 300`). Labels update: `3/6` and `2/6`. The 2/5 bar fades out (300ms). |
| 22.0-24.0 | Narration update | 0.5s | "The pieces need to be the SAME SIZE first!" The word "SAME SIZE" is colored `#34d399` (emerald) and bold. |
| 24.0-26.0 | Combine animation | 2.0s | The shaded region of the 2/6 bar (2 parts) slides upward and merges into the 3/6 bar. The 3/6 bar now shows 5 of 6 parts shaded. The combined bar pulses gently (`scale: 1.02`, 400ms, then back). |
| 26.0-28.0 | Hold combined result | 2.0s | The bar shows 5/6 shaded. Label updates to `5/6`. |
| 28.0-30.0 | Correct answer reveal | 2.0s | At the bottom, the correct equation fades in large: `\frac{1}{2} + \frac{1}{3} = \frac{3}{6} + \frac{2}{6} = \frac{5}{6}`. Color-coded: `3/6` in indigo, `2/6` in purple, `5/6` in emerald (`#34d399`). |
| 30.0-34.0 | Final narration | 4.0s | "To add fractions, you need the SAME-SIZED PIECES. That's what this lesson is all about." |
| 34.0-38.0 | Hold on final state | 4.0s | Everything holds. The student absorbs. |

**Continue button**: Appears at `t = 15.0s` (after the "LESS than 1/2" reveal), positioned bottom-right, 48x48px touch target, subtle fade-in (`opacity: 0 -> 1` over 500ms). The button does NOT interrupt the animation -- the hook continues playing while the button is available. If the student taps Continue before the hook finishes, the animation stops gracefully (all objects snap to their final states over 200ms).

### 3.4 Visual Design Details

- **Equation text**: `#e2e8f0` (slate-200) on dark backgrounds. Font: system sans-serif. 28px for main equation, 16px for narration.
- **1/2 bar shading**: `#818cf8` (indigo-400) -- same as NO-1.4, providing continuity.
- **1/3 bar shading**: `#a78bfa` (violet-400) -- distinct from 1/2 but in the same hue family, signaling "fraction" but "different fraction."
- **2/5 bar shading (wrong answer)**: `#f87171` (red-400) -- error color. Immediately signals this is problematic.
- **5/6 bar shading (correct answer)**: After combination, the 5 shaded parts transition to `#34d399` (emerald-400) over 500ms, signaling correctness.
- **Alignment lines**: `#fbbf24` (amber-400), dashed (`4 4`), 1.5px. Visually lightweight but clearly mark the comparison points.
- **Background**: Inherits from app theme (dark: `#0f172a` slate-900, light: `#f8fafc` slate-50).

### 3.5 Sound Design

| Moment | Sound | Duration | Notes |
|---|---|---|---|
| Wrong answer checkmark appears | Confident "ding" | 200ms | Deliberately positive-sounding to set up the subversion. |
| Red X appears on 2/5 | Error buzz (low "bzzt") | 150ms | Gentle, not punitive. A "that doesn't work" signal. |
| Bar splitting into sixths | Soft "click-click-click" | 300ms | Same split sound from NO-1.4 (continuity). |
| Shaded parts merge | Satisfying "snap" + rising tone | 400ms | The combination feels good. Pieces clicking together. |
| Correct answer reveal | Discovery chime (rising two-note) | 400ms | Same as platform-wide "insight" cue. |

All sounds respect the `soundEnabled` user preference. Sounds are loaded as 22kHz mono WAV files, <10KB each, cached by service worker.

### 3.6 Gamification: Hook XP

No XP is awarded for watching the hook. The hook's purpose is activation of curiosity and the reward-prediction system, not assessment. Watching the full hook (>30s without skipping) is tracked in analytics for pedagogical review but has no gamification consequence.

---

## 4. Stage 2 -- Spatial Experience (3-4 min)

### 4.1 Overview

The spatial experience is split into two workspaces that the student navigates via tabs (or swipe): **Workspace A: Fraction Bar Addition/Subtraction** and **Workspace B: Area Model Multiplication**. Division is introduced conceptually in the Guided Discovery stage (Stage 3) since it builds on multiplication understanding.

**Minimum interaction count**: 12 distinct interactions before the "Continue to Guided Discovery" button activates. An "interaction" is defined as: changing a fraction value, tapping to split into common denominators, dragging area model edges, or tapping to combine/separate bars. This ensures genuine manipulation (PF-3: Embodied Cognition) rather than click-through behavior.

**Interaction counter**: Displayed as a subtle progress ring around the Continue button (not as a number). The ring fills as the student interacts. At 12 interactions the ring completes and the button glows softly.

### 4.2 Layout

```
Desktop (>=768px):
┌──────────────────────────────────────────────────────┐
│  [Tab: Add/Subtract]  [Tab: Multiply]                │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─ Workspace A: Fraction Bar Addition ────────────┐ │
│  │                                                   │ │
│  │  Fraction A:  [num picker] / [denom picker]      │ │
│  │  ┌──────────────────────────────────────────┐    │ │
│  │  │  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░ │    │ │
│  │  └──────────────────────────────────────────┘    │ │
│  │  Label: 3/6                                      │ │
│  │                                                   │ │
│  │  Fraction B:  [num picker] / [denom picker]      │ │
│  │  ┌──────────────────────────────────────────┐    │ │
│  │  │  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │    │ │
│  │  └──────────────────────────────────────────┘    │ │
│  │  Label: 2/6                                      │ │
│  │                                                   │ │
│  │  [Split to Common Denominator]                   │ │
│  │  [Combine (Add)]  [Separate (Subtract)]          │ │
│  │                                                   │ │
│  │  Result Bar:                                      │ │
│  │  ┌──────────────────────────────────────────┐    │ │
│  │  │  ████████████████████░░░░░░░░░░░░░░░░░░ │    │ │
│  │  └──────────────────────────────────────────┘    │ │
│  │  Label: 5/6                                      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                       │
│  [Continue button with progress ring]                 │
└──────────────────────────────────────────────────────┘

Mobile (<768px):
Same layout but single column, fraction pickers above bars,
full-width bars, stacked vertically.
```

### 4.3 Workspace A: Fraction Bar Addition/Subtraction

#### 4.3.1 Fraction Input Controls

Two fraction pickers (one for Fraction A, one for Fraction B). Each picker consists of:
- **Numerator stepper**: Two buttons (- and +) flanking a number display. Range: 0 to denominator. Touch target: 48px per button.
- **Denominator stepper**: Two buttons (- and +) flanking a number display. Range: 2 to 12. Touch target: 48px per button.
- **Visual**: The fraction is displayed between the steppers as `\frac{num}{denom}` via KaTeX, updating in real time.
- **Default values**: Fraction A starts at 1/2, Fraction B starts at 1/3 (matching the hook to reinforce continuity).

#### 4.3.2 Fraction Bar Rendering

Each fraction is rendered as a horizontal fraction bar (reusing the `FractionBar` component from NO-1.4):
- **Width**: 320px (desktop) / full container width minus 32px padding (mobile).
- **Height**: 48px.
- **Shaded color A**: `#818cf8` (indigo-400).
- **Shaded color B**: `#a78bfa` (violet-400).
- **Unshaded**: `#334155` (slate-700 dark theme).
- **Division lines**: `#64748b` (slate-500), 1.5px.
- **Label**: KaTeX fraction below each bar, updated in real time.

When the student changes a fraction's numerator or denominator, the bar re-renders with the familiar split animation from NO-1.4 (spring: `damping: 20, stiffness: 300`). Shading updates to reflect the new numerator.

#### 4.3.3 "Split to Common Denominator" Button

A primary action button positioned between the two bars and the result area.

**Visual**: Background `#818cf8`, text white, border-radius 8px, height 48px, full-width on mobile / 280px on desktop. Label: "Split to Same-Sized Pieces".

**Behavior when pressed**:
1. The system computes the LCM of the two denominators (using the LCM algorithm from NT-2.3).
2. Both bars animate simultaneously to the LCM denominator:
   - Bar A splits its current parts into finer parts. For example, if A = 1/2 and LCM = 6, the 2-part bar splits into 6 parts (3 shaded). The split uses the NO-1.4 breathing animation.
   - Bar B does the same. If B = 1/3 and LCM = 6, the 3-part bar splits into 6 parts (2 shaded).
3. Both bars now have the same number of parts. A vertical alignment line (`#fbbf24`, amber, dashed) draws from the right edge of each bar's total width, confirming they are the same size.
4. Labels update to the equivalent fractions: `3/6` and `2/6`.
5. A brief annotation fades in: "Now the pieces are the same size!" (300ms fade, held for 2s, then fades out).

**Edge case**: If the denominators are already equal, the button briefly pulses amber and shows: "Already the same size!" (400ms). No animation plays. Interaction counter still increments by 1.

**Edge case**: If the LCM exceeds 12 (e.g., fractions with denominators 7 and 11, LCM = 77), the system clamps to the LCM but renders a simplified visual with fewer visible division lines (every nth line thicker) and a note: "That's a lot of pieces! The LCM of 7 and 11 is 77." The bars render at full width with thin division lines. This is a rare edge case given the stepper range of 2-12.

#### 4.3.4 Combine (Add) and Separate (Subtract) Buttons

Two side-by-side buttons below the "Split" button.

**"Combine (Add)" button**:
- Enabled only when both bars have the same denominator.
- When pressed:
  1. The shaded parts of Bar B slide upward and merge into Bar A over 600ms (spring: `damping: 20, stiffness: 300`). Each part moves individually with 50ms stagger.
  2. A Result Bar appears below, showing the combined fraction. The result bar uses `#34d399` (emerald-400) for shaded parts.
  3. The result label shows the sum fraction (e.g., `5/6`).
  4. If the sum exceeds 1 (e.g., 3/4 + 3/4 = 6/4 = 1 2/4), the Result Bar extends to show an improper fraction. A note appears: "That's more than 1 whole! 6/4 = 1 and 2/4."

**"Separate (Subtract)" button**:
- Enabled only when both bars have the same denominator AND Fraction A >= Fraction B.
- When pressed:
  1. The shaded parts of Bar B "peel off" from Bar A: the overlapping shaded region desaturates to `#334155` (unshaded) from right to left over 600ms.
  2. A Result Bar appears showing the difference.
  3. Label shows the difference fraction.
  4. If the result is 0/n, the bar shows all parts unshaded and the label reads `0`.

**Disabled state**: When denominators differ, both buttons are grayed out (opacity 0.4) and a tooltip appears on tap: "Split to same-sized pieces first!" with an arrow pointing to the Split button.

#### 4.3.5 Scene Definition

```json
{
  "id": "NO-1.4a-spatial-add-sub",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 450],
  "objects": [
    {
      "type": "fractionBar",
      "id": "bar-a",
      "numerator": 1,
      "denominator": 2,
      "width": 320,
      "height": 48,
      "position": [40, 40],
      "shadedColor": "#818cf8",
      "unshadedColor": "#334155",
      "showLabel": true,
      "style": { "stroke": "#64748b", "strokeWidth": 1.5 }
    },
    {
      "type": "fractionBar",
      "id": "bar-b",
      "numerator": 1,
      "denominator": 3,
      "width": 320,
      "height": 48,
      "position": [40, 140],
      "shadedColor": "#a78bfa",
      "unshadedColor": "#334155",
      "showLabel": true,
      "style": { "stroke": "#64748b", "strokeWidth": 1.5 }
    },
    {
      "type": "fractionBar",
      "id": "bar-result",
      "numerator": 0,
      "denominator": 6,
      "width": 320,
      "height": 48,
      "position": [40, 340],
      "shadedColor": "#34d399",
      "unshadedColor": "#334155",
      "showLabel": true,
      "visible": false,
      "style": { "stroke": "#64748b", "strokeWidth": 1.5 }
    }
  ]
}
```

### 4.4 Workspace B: Area Model Multiplication

#### 4.4.1 Overview

The area model represents fraction multiplication as the area of a rectangle. One fraction defines the horizontal dimension (width), the other defines the vertical dimension (height). The product is the doubly-shaded region.

#### 4.4.2 Layout

```
┌─ Area Model ──────────────────────────────────┐
│                                                │
│  Fraction A (width): [num] / [denom]          │
│  Fraction B (height): [num] / [denom]         │
│                                                │
│  ┌────────────────────────────┐                │
│  │        1     │             │  ← whole       │
│  │    (shaded   │ (unshaded   │    height      │
│  │     blue +   │  columns)   │                │
│  │     purple   │             │                │
│  │   = product) │             │                │
│  ├──────────────┤             │  ← fraction B  │
│  │   (shaded    │             │    boundary    │
│  │    blue      │             │                │
│  │    only)     │             │                │
│  └────────────────────────────┘                │
│       ↑ fraction A boundary                    │
│                                                │
│  Result: 1/2 x 1/3 = 1/6 of the rectangle    │
│                                                │
└────────────────────────────────────────────────┘
```

#### 4.4.3 Scene Definition

```json
{
  "id": "NO-1.4a-spatial-multiply",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 420],
  "objects": [
    {
      "type": "group",
      "id": "area-model",
      "children": [
        {
          "type": "geometricShape",
          "id": "unit-square",
          "shape": "rectangle",
          "position": [40, 60],
          "width": 300,
          "height": 300,
          "style": {
            "fill": "#334155",
            "stroke": "#64748b",
            "strokeWidth": 2
          }
        }
      ]
    },
    {
      "type": "annotation",
      "id": "width-label",
      "position": [190, 375],
      "latex": "\\frac{1}{2}",
      "anchor": "center",
      "style": { "fontSize": 20 }
    },
    {
      "type": "annotation",
      "id": "height-label",
      "position": [15, 210],
      "latex": "\\frac{1}{3}",
      "anchor": "center",
      "style": { "fontSize": 20 }
    },
    {
      "type": "annotation",
      "id": "result-label",
      "position": [200, 400],
      "latex": "\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 18 }
    }
  ]
}
```

#### 4.4.4 Rectangle Rendering Details

The unit square represents "1 whole." It is divided into a grid based on the two fractions' denominators:
- **Columns**: `denominator_A` vertical columns. Each column width = `squareWidth / denominator_A`.
- **Rows**: `denominator_B` horizontal rows. Each row height = `squareHeight / denominator_B`.
- **Grid lines**: `#64748b` (slate-500), 1px width for inner grid, 2px for outer border.

**Shading layers** (three layers, composited):
1. **Horizontal shading** (Fraction B): The top `numerator_B` rows are shaded `#a78bfa` (violet-400) at 30% opacity. This represents "the fraction of the height."
2. **Vertical shading** (Fraction A): The left `numerator_A` columns are shaded `#818cf8` (indigo-400) at 30% opacity. This represents "the fraction of the width."
3. **Overlap (Product)**: The cells that are shaded in BOTH directions receive a combined fill: `#c084fc` (purple-400) at 60% opacity. This is the product region. A subtle diagonal hatch pattern is overlaid for additional differentiation.

**Default values**: Fraction A = 1/2, Fraction B = 1/3, producing a 2x3 grid where the top-left cell (1 of 6) is the product region.

#### 4.4.5 Interactions

| Interaction | Input | Visual Feedback | State Change |
|---|---|---|---|
| Change Fraction A numerator/denominator | Stepper buttons (tap +/-) | Bar splits into new columns, vertical shading updates | `fractionA` state |
| Change Fraction B numerator/denominator | Stepper buttons (tap +/-) | Bar splits into new rows, horizontal shading updates | `fractionB` state |
| Tap on product region | Tap/click | Product region pulses (`scale: 1.05`, 200ms) and a label appears counting "X out of Y total cells = X/Y" | Reveals result label |
| Tap on non-product shaded region | Tap/click | Region briefly highlights with a tooltip: "This part is shaded for only ONE fraction, not both" | No state change |

#### 4.4.6 Grid Animation on Fraction Change

When a fraction's denominator changes:
1. Existing grid lines fade out (150ms).
2. New grid lines draw in (300ms, staggered 30ms apart) -- vertical lines for Fraction A, horizontal for Fraction B.
3. A brief "settle" animation: each cell scales to `0.95` then springs back to `1.0` (spring: `damping: 20, stiffness: 300`).
4. Shading layers recalculate and transition (300ms crossfade).

When a fraction's numerator changes:
- Shading updates immediately with a 300ms fill transition. No grid line changes needed.

### 4.5 Interaction Tracking

Each of these actions increments the interaction counter:

1. Changing either fraction's numerator (+1 per change).
2. Changing either fraction's denominator (+1 per change).
3. Pressing "Split to Same-Sized Pieces" (+1).
4. Pressing "Combine (Add)" (+1).
5. Pressing "Separate (Subtract)" (+1).
6. Tapping the product region in the area model (+1).
7. Switching between Workspace A and Workspace B tabs (+1, max 2 counted).

The counter does NOT increment for:
- Tapping a disabled button.
- Changing a value to the same value (e.g., pressing + then - immediately).
- Rapid repeated taps on the same stepper (debounced at 200ms).

**Exploration diversity tracking** (for XP bonus, not shown to student):
```typescript
interface ExplorationMetrics {
  additionsPerformed: number;         // how many add operations
  subtractionsPerformed: number;      // how many subtract operations
  multiplicationsViewed: number;      // how many area model results viewed
  uniqueFractionPairsExplored: Set<string>; // "1/2+1/3", "2/3+1/4", etc.
  commonDenominatorsSplit: number;    // how many times they split to common denom
  improperFractionEncountered: boolean; // did they create a sum > 1?
  areaModelUsed: boolean;            // did they visit Workspace B?
  totalTimeSpentMs: number;
}
```

If `uniqueFractionPairsExplored.size >= 4` AND `areaModelUsed` AND `commonDenominatorsSplit >= 2`: "exploration bonus" = 40 XP.
If `uniqueFractionPairsExplored.size >= 2` AND `commonDenominatorsSplit >= 1`: "exploration bonus" = 20 XP.
Otherwise: 0 bonus.

### 4.6 Mobile Adaptations

- **< 768px width**: Tabs become a swipeable header. Each workspace takes full viewport width. The fraction pickers stack horizontally (numerator stepper left, denominator stepper right) with the fraction bar below.
- **< 400px width**: Area model square reduces from 300px to 240px. Bar width reduces to `full - 24px`. Stepper buttons increase to 48px for fat-finger accommodation.
- **Landscape mobile**: Workspace A shows fraction pickers to the left, bars to the right (side by side). Area model maintains square aspect ratio.
- **Touch behavior**: All tap targets >= 44x44px. Stepper buttons have 48px touch areas. Disabled buttons still respond to touch with the tooltip/explanation.

---

## 5. Stage 3 -- Guided Discovery (4-5 min)

### 5.1 Prompt Sequence

The guided discovery stage presents 6 prompts. The spatial models from Stage 2 remain visible and interactive. The prompts guide the student through discovering WHY each operation works.

#### Prompt 1: Why Can't We Just Add Tops and Bottoms?

**Setup**: Workspace A is visible. Fraction A = 1/2, Fraction B = 1/3. Bars show different-sized pieces.

**Prompt text**: "Look at the bars for 1/2 and 1/3. The pieces are different sizes. What happens if you try to count them together without making them the same size?"

**Expected insight**: The pieces are different sizes, so "1 piece + 1 piece = 2 pieces" is meaningless because the pieces are not the same kind of thing.

**Visual support**: The 1/2 bar and 1/3 bar are highlighted with color-coded borders. Arrows point to individual parts with labels: "This piece = 1/2 of the whole" and "This piece = 1/3 of the whole". A brief animation shows the two differently-sized pieces floating next to each other with a question mark between them: "1/2-sized piece + 1/3-sized piece = ???"

**Auto-response trigger**: When the student taps "I see it!" or provides a response acknowledging the size difference:
- AI tutor: "Exactly! You can't add pieces that are different sizes. It's like adding 1 apple + 1 orange and saying you have 2 appanges. You need to convert them to the same unit first."
- The "appanges" humor is deliberate -- age-appropriate absurdity reinforces the point through emotional encoding.

**Button text**: "I see it!"

#### Prompt 2: Make Common Denominators

**Prompt text**: "Now press 'Split to Same-Sized Pieces.' What happened to both bars? What's the new denominator?"

**Expected interaction**:
1. Student presses the "Split to Same-Sized Pieces" button.
2. Both bars split into sixths. 1/2 becomes 3/6, 1/3 becomes 2/6.

**Auto-response trigger**: When bars are split:
- Annotation: "Both bars now have 6 equal parts!"
- AI tutor: "Now the pieces are the same size! 1/2 became 3/6, and 1/3 became 2/6. Notice that the SHADED AREA didn't change -- we just cut the pieces smaller. Now you CAN count them together."

**Visual support**: Vertical alignment lines confirm both bars have the same total width and the same number of divisions. The shaded areas are color-coded: 3 indigo parts + 2 violet parts.

**Button text**: "Got it!"

#### Prompt 3: Combine and See the Result

**Prompt text**: "Press 'Combine' to add the fractions. How many sixths do you have?"

**Expected interaction**:
1. Student presses "Combine (Add)."
2. The violet parts merge into the indigo bar. Result bar shows 5/6.

**Auto-response trigger**: When combination completes:
- AI tutor: "3 sixths + 2 sixths = 5 sixths. See? Once the pieces are the SAME SIZE, adding is just counting: 3 + 2 = 5."
- Annotation on the result bar: `\frac{3}{6} + \frac{2}{6} = \frac{3+2}{6} = \frac{5}{6}`

**Key insight delivery**: "The denominator stays the same (we're still dealing with sixths). Only the numerators add."

**Button text**: "Makes sense!"

#### Prompt 4: Why Multiplication is Different

**Prompt text**: "Switch to the Multiply tab. Set the fractions to 1/2 and 1/3. Tap the purple overlap region. How much of the rectangle is purple?"

**Expected interaction**:
1. Student switches to Workspace B (Area Model).
2. Fractions default to 1/2 x 1/3.
3. The 2x3 grid shows: top-left cell is purple (overlap). 2 cells are blue-only (rest of left column). 1 cell is violet-only (rest of top row). 2 cells are unshaded.
4. Student taps the purple region.

**Auto-response trigger**: When product region is tapped:
- Annotation: "1 out of 6 total cells = 1/6"
- AI tutor: "1/2 of the width times 1/3 of the height = 1/6 of the total area. Notice: you did NOT need common denominators! You just multiplied 1x1 = 1 for the top, and 2x3 = 6 for the bottom."
- A brief visual: the equation `\frac{1 \times 1}{2 \times 3} = \frac{1}{6}` fades in below the area model, with arrows connecting `1x1` to the purple cell count and `2x3` to the total cell count.

**Misconception interception**: "Multiplication does NOT need common denominators. Addition does. Multiplication has its own beautiful geometry."

**Button text**: "I see it!"

#### Prompt 5: Try a Bigger Multiplication

**Prompt text**: "Now try 2/3 times 3/4. What fraction of the rectangle is purple? Is the answer BIGGER or SMALLER than 2/3?"

**Expected interaction**:
1. Student sets Fraction A = 2/3, Fraction B = 3/4.
2. The 3x4 grid appears. 6 cells are purple (overlap: left 2 columns x top 3 rows). Total cells = 12. Product = 6/12 = 1/2.
3. Student taps purple region.

**Auto-response trigger**: When product region is tapped:
- Annotation: "6 out of 12 = 6/12 = 1/2"
- AI tutor: "2/3 times 3/4 = 6/12, which simplifies to 1/2. And look: 1/2 is SMALLER than both 2/3 and 3/4! When you multiply two fractions less than 1, the result is always smaller. You're taking a fraction OF a fraction -- a piece of a piece."
- The "piece of a piece" phrasing is critical -- it is the spatial metaphor that defeats the "multiplication makes bigger" misconception.

**Misconception confrontation**: If the student initially says the result should be bigger, the AI responds: "That's a really common thought! With whole numbers, multiplying makes things bigger. But with fractions less than 1, you're taking a PART of something. Half of 2/3 is less than 2/3. Let the area model show you."

**Button text**: "That's surprising!"

#### Prompt 6: Division as "How Many Groups Fit?"

**Prompt text**: "Final challenge. Imagine you have 3 whole chocolate bars. Each serving is 1/4 of a bar. How many servings do you have? Think about it before scrolling down."

**Expected insight**: 3 divided by 1/4 = 12, because each bar has 4 quarter-servings, and 3 x 4 = 12.

**Visual support**: Three whole fraction bars appear, each split into 4 parts (quarters). All parts are shaded with alternating colors to show individual servings. A counter labels each serving: 1, 2, 3, ... 12.

**Animation** (triggered after 10-second delay or student tap):
1. Three whole bars appear stacked vertically.
2. Each bar splits into 4 parts (spring: `damping: 20, stiffness: 300`).
3. Numbers 1-12 appear on each part, counting left-to-right, top-to-bottom (300ms stagger).
4. Annotation: "12 servings! Dividing by 1/4 is the same as multiplying by 4."

**AI tutor**: "Dividing by a fraction LESS than 1 gives you MORE, not less. 3 / (1/4) = 3 x 4 = 12. The 'flip and multiply' rule isn't magic -- it's asking 'how many groups of this size fit in?'"

**Button text**: "Mind blown!"

### 5.2 Discovery Scoring

Guided discovery insights contribute to XP:
- Identifying why common denominators are needed (Prompt 1) without AI hints: 15 XP bonus (`guided_discovery_insight`).
- Correctly predicting the multiplication result is smaller (Prompt 5) before seeing the answer: 15 XP bonus.
- Understanding division as "how many groups" (Prompt 6): no extra XP, but flags understanding for reflection evaluation.

### 5.3 State Persistence

If the student leaves and returns mid-discovery, the state is persisted in the lesson store (Zustand + IndexedDB via Dexie.js):
```typescript
interface DiscoveryState {
  currentPromptIndex: number;     // 0-5
  promptResponses: Array<{
    promptId: string;
    acknowledged: boolean;
    timeSpentMs: number;
    hintsUsed: number;
  }>;
  commonDenominatorDiscovered: boolean;
  areaModelExplored: boolean;
  divisionUnderstood: boolean;
}
```

---

## 6. Stage 4 -- Symbol Bridge (2-3 min)

### 6.1 Overview

The symbol bridge formally introduces the four operation formulas by overlaying symbolic notation onto the spatial models from Stages 2 and 3. Every symbol is anchored to a visual element.

### 6.2 Scene Design

The symbol bridge is divided into three steps, presented sequentially.

#### 6.2.1 Step 1: Addition/Subtraction Formula (0:00-1:00)

**Animation sequence**:

1. (0:00-0:15) The fraction bar from Stage 2 appears, showing 1/2 + 1/3 = 5/6. Both bars are at 6 parts each. Notation appears to the right:
   ```
   1/2 + 1/3
   ```
   in large type (24px), white.

2. (0:15-0:30) The bars split into common denominators (replay of Stage 2 animation, compressed to 1s). Simultaneously, the notation transforms:
   ```
   1/2 + 1/3 = 3/6 + 2/6
   ```
   The `3/6` is colored `#818cf8` (indigo) with an arrow drawing from it to Bar A's shaded region. The `2/6` is colored `#a78bfa` (violet) with an arrow to Bar B's shaded region.

3. (0:30-0:45) The combination animation plays. The notation extends:
   ```
   3/6 + 2/6 = (3+2)/6 = 5/6
   ```
   The `(3+2)` highlights in `#fbbf24` (amber) with an arrow pointing to the combined count. The `/6` highlights in `#60a5fa` (blue) with a note: "denominator stays the same."

4. (0:45-1:00) General formula fades in below:
   ```
   a/b + c/b = (a+c)/b
   ```
   Annotation: "When the denominators are the same, just add the numerators."

   A second line fades in (300ms delay):
   ```
   a/b - c/b = (a-c)/b
   ```
   "Subtraction works the same way."

**KaTeX rendering**: Uses `\textcolor{}` for color coding throughout.

#### 6.2.2 Step 2: Multiplication Formula (1:00-1:45)

1. (1:00-1:15) The area model from Workspace B appears, showing 1/2 x 1/3. The grid is visible with the purple product region.

2. (1:15-1:30) Notation appears to the right:
   ```
   1/2 x 1/3 = (1x1)/(2x3) = 1/6
   ```
   - `1x1` is colored `#c084fc` (purple) -- matching the product region.
   - `2x3` is colored `#60a5fa` (blue) -- matching the total grid.
   - An arrow draws from `1x1` to the purple cell, and from `2x3` to the full rectangle border.

3. (1:30-1:45) General formula fades in:
   ```
   a/b x c/d = (a x c)/(b x d)
   ```
   "Multiply tops. Multiply bottoms. No common denominator needed."

#### 6.2.3 Step 3: Division Formula (1:45-2:45)

1. (1:45-2:00) The three chocolate bars from Prompt 6 reappear, each split into quarters. The count "12 servings" is visible.

2. (2:00-2:15) Notation appears:
   ```
   3 / (1/4) = 3 x (4/1) = 12
   ```
   The `1/4` flips to `4/1` with a rotation animation (180-degree y-axis rotation, 500ms, spring: `damping: 15, stiffness: 200`). An arrow connects the flipped fraction to the multiplication.

3. (2:15-2:30) Second example:
   ```
   1/2 / (1/3) = 1/2 x (3/1) = 3/2
   ```
   Two fraction bars appear: 1/2 and 1/3. The question "How many 1/3-sized pieces fit in 1/2?" is shown. The answer: 3/2 = 1.5 times. A visual shows 1.5 copies of the 1/3 bar fitting inside the 1/2 bar.

4. (2:30-2:45) General formula fades in:
   ```
   a/b / (c/d) = a/b x (d/c)
   ```
   "To divide by a fraction, flip it and multiply."

   Below, in smaller text: "Because dividing asks 'how many groups of this size fit?' Flipping converts the question to multiplication."

### 6.3 Animation Specifications

All animations in this stage use Framer Motion:
- Arrow draw: `pathLength` animation from 0 to 1, duration 300ms, `ease: "easeInOut"`.
- Crossfade: `AnimatePresence` with `mode="wait"`, exit opacity 0 (150ms), enter opacity 1 (150ms).
- Color transitions: `animate={{ color: newColor }}`, duration 300ms.
- Fraction flip (division): 3D rotation around y-axis using `rotateY: 180`, duration 500ms, spring: `damping: 15, stiffness: 200`.
- Bar transitions: Reuse split animation from NO-1.4 (spring: `damping: 20, stiffness: 300`).

**Continue Trigger**: All three steps revealed. Button appears at bottom.

---

## 7. Stage 5 -- Real-World Anchor (1-2 min)

### 7.1 Four Real-World Contexts

Each example is presented as a card with an illustration and a fraction operation connection. The student swipes through them (mobile) or clicks arrows (desktop).

#### 7.1.1 Baking: Doubling a Recipe

**Illustration**: A stylized mixing bowl SVG with ingredient labels.

**Text**: "A recipe calls for 2/3 cup of sugar. You want to make a double batch."

**Interactive element**: Two fraction bars appear side-by-side, each showing 2/3 shaded. A "Combine" button merges them into a single bar showing 4/3 = 1 and 1/3 cups. The student sees that doubling means `2/3 + 2/3 = 4/3`.

**Fraction operation connection**: "2/3 + 2/3 = 4/3 = 1 and 1/3 cups. You'll need more than one whole cup!"

**Highlighted math**: Addition with like denominators, improper fraction result.

#### 7.1.2 Sharing Pizza (Division)

**Illustration**: A circular pizza (reusing the NO-1.4 pizza SVG) divided into 8 slices, with 3 people icons.

**Text**: "3 friends share 3/4 of a pizza equally. How much does each friend get?"

**Interactive element**: A fraction bar shows 3/4 shaded. The student taps "Divide by 3" and the shaded region splits into 3 equal portions, each highlighted in a different color. Each portion = 3/4 / 3 = 3/12 = 1/4.

**Fraction operation connection**: "3/4 / 3 = 3/4 x 1/3 = 3/12 = 1/4. Each friend gets 1/4 of the whole pizza."

**Highlighted math**: Division of a fraction by a whole number.

#### 7.1.3 Land Area (Multiplication)

**Illustration**: A bird's-eye view SVG of a rectangular garden plot with grid lines.

**Text**: "A garden is 3/4 of a yard long and 2/3 of a yard wide. What fraction of a square yard is the garden?"

**Interactive element**: The area model appears with Fraction A = 3/4, Fraction B = 2/3. The grid shows the product region. The student taps it to reveal: "6 out of 12 cells = 6/12 = 1/2 square yard."

**Fraction operation connection**: "3/4 x 2/3 = 6/12 = 1/2. The garden covers half a square yard."

**Highlighted math**: Multiplication with area model, simplification.

#### 7.1.4 Running a Race (Subtraction)

**Illustration**: A horizontal track with distance markers.

**Text**: "You've run 5/8 of a race. Your friend has run 1/4 of the race. How much further ahead are you?"

**Interactive element**: Two fraction bars appear, both split into eighths (common denominator). Your bar shows 5/8 shaded in indigo. Your friend's bar shows 2/8 shaded in violet. The difference (3/8) highlights in emerald.

**Fraction operation connection**: "5/8 - 1/4 = 5/8 - 2/8 = 3/8 of the race ahead."

**Highlighted math**: Subtraction with unlike denominators, common denominator conversion.

### 7.2 Presentation

- Cards are 320px wide (desktop), full width minus 16px padding (mobile).
- Swipe gesture: horizontal swipe via `@use-gesture/react`, with spring physics for overscroll. Snap to nearest card.
- Pagination dots below the cards: 4 dots, active dot is indigo, inactive dots are slate-500. 8px diameter, 12px spacing.
- Auto-advance: Does NOT auto-advance. Student controls pacing (PF-6: no time pressure).

**Continue Trigger**: Immediate (button always visible).

---

## 8. Stage 6 -- Practice (Adaptive)

### 8.1 Problem Bank

9 problems total, organized across three layers. Problems are served in interleaved order (PF-5) -- NOT blocked by sub-type or operation. The IRT engine selects the next problem based on the student's current ability estimate and the problem's difficulty parameter.

**Answer Format Rules** (strictly enforced):
- NO free-text input for graded answers.
- All answers use multiple choice, interactive fraction bar manipulation, tap-to-select, or numeric fraction input (two integer fields for numerator/denominator with exact match validation).

### 8.2 Layer 0 -- Recall (3 problems)

#### Problem R1: Identify the Operation Needed

**Type**: `multiple-choice`
**Difficulty B**: 0.3 (easy)
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "To add fractions with DIFFERENT denominators, what must you do first?",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "Multiply the numerators", "correct": false },
    { "id": "b", "text": "Find a common denominator", "correct": true },
    { "id": "c", "text": "Add the denominators together", "correct": false },
    { "id": "d", "text": "Flip the second fraction", "correct": false }
  ],
  "feedback": {
    "correct": "Right! You need a common denominator so the pieces are the same size before you can add them.",
    "incorrect_a": "Multiplying the numerators is what you do for multiplication, not addition. For addition, you need same-sized pieces first.",
    "incorrect_c": "Adding denominators is the classic mistake! 1/2 + 1/3 is NOT 2/5. You need to find a COMMON denominator.",
    "incorrect_d": "Flipping the second fraction is for division ('flip and multiply'). For addition, you need common denominators."
  }
}
```

#### Problem R2: Identify the Multiplication Rule

**Type**: `multiple-choice`
**Difficulty B**: 0.35
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "What is the rule for multiplying fractions?",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "Find a common denominator, then multiply numerators", "correct": false },
    { "id": "b", "text": "Multiply numerators together, multiply denominators together", "correct": true },
    { "id": "c", "text": "Add numerators, keep the denominator", "correct": false },
    { "id": "d", "text": "Flip the second fraction, then add", "correct": false }
  ],
  "feedback": {
    "correct": "Exactly! Multiply tops, multiply bottoms. No common denominator needed for multiplication.",
    "incorrect_a": "Common denominators are needed for addition, not multiplication. For multiplication, just multiply straight across: tops with tops, bottoms with bottoms.",
    "incorrect_c": "That's the rule for addition (when denominators are already the same). Multiplication is different: multiply numerators AND denominators.",
    "incorrect_d": "Flipping is for division. Multiplication is simpler: multiply numerators together and denominators together."
  }
}
```

#### Problem R3: What Happens When You Divide by a Fraction?

**Type**: `multiple-choice`
**Difficulty B**: 0.4
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "When you divide a number by a fraction less than 1, the result is:",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "Always smaller than the original number", "correct": false },
    { "id": "b", "text": "Always larger than the original number", "correct": true },
    { "id": "c", "text": "Always equal to the original number", "correct": false },
    { "id": "d", "text": "Sometimes larger, sometimes smaller", "correct": false }
  ],
  "feedback": {
    "correct": "Yes! Dividing by a fraction less than 1 gives a LARGER result. Think of it as: 'How many small pieces fit in this big amount?' There are always MORE small pieces than whole ones.",
    "incorrect_a": "This is the most common misconception! With whole numbers, dividing makes things smaller. But dividing by a fraction less than 1 is like asking 'how many half-cups fit in 3 cups?' -- the answer (6) is BIGGER.",
    "incorrect_c": "Dividing by 1 gives you the same number, but dividing by a fraction LESS than 1 gives you more.",
    "incorrect_d": "When dividing by a proper fraction (less than 1), the result is ALWAYS larger. Try it: 6 / (1/2) = 12."
  }
}
```

### 8.3 Layer 1 -- Procedure (3 problems)

#### Problem P1: Add Fractions with Unlike Denominators

**Type**: `interactive-fraction-bar`
**Difficulty B**: 0.6
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Add 1/4 + 2/3. Use the fraction bars to find the answer.",
  "visualization": {
    "type": "additionBars",
    "fractionA": { "numerator": 1, "denominator": 4 },
    "fractionB": { "numerator": 2, "denominator": 3 },
    "barWidth": 280,
    "barHeight": 40,
    "shadedColorA": "#818cf8",
    "shadedColorB": "#a78bfa",
    "unshadedColor": "#334155"
  },
  "interactiveSteps": [
    {
      "instruction": "Press 'Split to Same-Sized Pieces' to find the common denominator.",
      "expectedAction": "split",
      "resultDenominator": 12,
      "resultA": { "numerator": 3, "denominator": 12 },
      "resultB": { "numerator": 8, "denominator": 12 }
    },
    {
      "instruction": "Now press 'Combine' to add them.",
      "expectedAction": "combine",
      "result": { "numerator": 11, "denominator": 12 }
    }
  ],
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "3/7", "correct": false },
    { "id": "b", "text": "11/12", "correct": true },
    { "id": "c", "text": "2/12", "correct": false },
    { "id": "d", "text": "3/12", "correct": false }
  ],
  "hints": [
    "The LCM of 4 and 3 is 12. Convert both fractions to twelfths.",
    "1/4 = 3/12 (multiply top and bottom by 3). 2/3 = 8/12 (multiply top and bottom by 4).",
    "3/12 + 8/12 = 11/12."
  ],
  "feedback": {
    "correct": "11/12 is right! 1/4 = 3/12, 2/3 = 8/12, and 3 + 8 = 11. The answer is 11/12.",
    "incorrect_a": "3/7 comes from adding numerators (1+2=3) and denominators (4+3=7). That's the classic mistake! You need common denominators first.",
    "incorrect_c": "2/12 would mean the numerator is 2, but 1/4 = 3/12 and 2/3 = 8/12. 3 + 8 = 11, not 2.",
    "incorrect_d": "3/12 is just 1/4 converted to twelfths. You still need to add the 8/12 from the 2/3."
  }
}
```

**Visual confirmation**: After answering correctly (or seeing the correct answer), the fraction bars show 3/12 + 8/12 = 11/12 with the combined result bar in emerald.

#### Problem P2: Multiply Fractions

**Type**: `interactive-area-model`
**Difficulty B**: 0.65
**Discrimination A**: 1.1

**Content**:
```json
{
  "stem": "Multiply 3/4 x 2/5. Use the area model to find the answer.",
  "visualization": {
    "type": "areaModel",
    "fractionA": { "numerator": 3, "denominator": 4 },
    "fractionB": { "numerator": 2, "denominator": 5 },
    "squareSize": 240,
    "horizontalColor": "#818cf8",
    "verticalColor": "#a78bfa",
    "productColor": "#c084fc",
    "unshadedColor": "#334155"
  },
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "6/20", "correct": true },
    { "id": "b", "text": "5/9", "correct": false },
    { "id": "c", "text": "6/9", "correct": false },
    { "id": "d", "text": "3/10", "correct": false }
  ],
  "hints": [
    "Count the total cells in the grid (4 columns x 5 rows = 20 cells).",
    "Count the purple cells (the overlap region): 3 columns x 2 rows = 6 cells.",
    "The answer is 6/20. You can simplify: 6/20 = 3/10."
  ],
  "feedback": {
    "correct": "6/20 is correct! 3x2 = 6 on top, 4x5 = 20 on the bottom. You can simplify to 3/10. Notice the answer is SMALLER than either 3/4 or 2/5 -- that's because you're taking a fraction OF a fraction.",
    "incorrect_b": "5/9 comes from adding numerators (3+2=5) and denominators (4+5=9). For multiplication, multiply tops with tops and bottoms with bottoms: 3x2=6, 4x5=20.",
    "incorrect_c": "6/9 has the right numerator (3x2=6) but the wrong denominator. The denominator should be 4x5=20, not 4+5=9.",
    "incorrect_d": "3/10 is actually the simplified form! 6/20 simplifies to 3/10. Both are correct, but 6/20 is the direct result of 3x2 / 4x5."
  },
  "acceptedEquivalents": [
    { "numerator": 3, "denominator": 10 }
  ]
}
```

#### Problem P3: Divide Fractions

**Type**: `multiple-choice`
**Difficulty B**: 0.7
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Divide 2/3 by 1/4. What is 2/3 / 1/4?",
  "visualization": {
    "type": "fractionBar",
    "fractionA": { "numerator": 2, "denominator": 3 },
    "fractionB": { "numerator": 1, "denominator": 4 },
    "barWidth": 280,
    "barHeight": 40,
    "showDivisionGrouping": true
  },
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "2/12", "correct": false },
    { "id": "b", "text": "8/3", "correct": true },
    { "id": "c", "text": "3/8", "correct": false },
    { "id": "d", "text": "2/7", "correct": false }
  ],
  "hints": [
    "To divide by a fraction, flip the second fraction and multiply.",
    "2/3 / 1/4 = 2/3 x 4/1.",
    "2 x 4 = 8, 3 x 1 = 3. So the answer is 8/3."
  ],
  "feedback": {
    "correct": "8/3 is right! Flip 1/4 to get 4/1, then multiply: 2/3 x 4/1 = 8/3. That's 2 and 2/3. Makes sense: you can fit about 2.67 quarter-sized pieces into 2/3 of a whole.",
    "incorrect_a": "2/12 would come from multiplying (not dividing): 2/3 x 1/4 = 2/12. But the question asks you to DIVIDE. Flip the 1/4 to 4/1, then multiply.",
    "incorrect_c": "3/8 is the reciprocal of the correct answer. You flipped the wrong fraction! Flip the SECOND fraction (1/4 becomes 4/1), not the first.",
    "incorrect_d": "2/7 doesn't follow any fraction operation rule. To divide: flip the second fraction (1/4 becomes 4/1) and multiply: 2/3 x 4/1 = 8/3."
  }
}
```

### 8.4 Layer 2 -- Understanding (3 problems)

#### Problem U1: Explain Why Common Denominators Are Needed

**Type**: `multiple-choice`
**Difficulty B**: 0.8
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "Maria says: '1/2 + 1/3 = 2/5 because you add tops and bottoms.' Which fraction bar diagram BEST shows why she is wrong?",
  "inputType": "multiple-choice",
  "visualization": {
    "type": "comparisonBars",
    "showThreeBars": true,
    "barA": { "numerator": 1, "denominator": 2, "color": "#818cf8" },
    "barB": { "numerator": 1, "denominator": 3, "color": "#a78bfa" },
    "barC": { "numerator": 2, "denominator": 5, "color": "#f87171" },
    "barWidth": 280,
    "barHeight": 36,
    "showAlignmentLines": true
  },
  "options": [
    { "id": "a", "text": "2/5 is LESS than 1/2 alone, so adding 1/3 can't give 2/5", "correct": true },
    { "id": "b", "text": "The bars have different colors, so you can't add them", "correct": false },
    { "id": "c", "text": "You should subtract instead of add", "correct": false },
    { "id": "d", "text": "Fractions can't be added at all", "correct": false }
  ],
  "feedback": {
    "correct": "Exactly! The fraction bars show that 2/5 takes up LESS space than 1/2 alone. Since 1/3 is positive, adding it to 1/2 MUST give something bigger than 1/2. The answer 2/5 fails this basic check. The real answer is 5/6.",
    "incorrect_b": "Colors don't affect whether fractions can be added! The issue is that 2/5 is smaller than 1/2, which is impossible if you're adding a positive amount.",
    "incorrect_c": "The problem is with the method (adding tops and bottoms), not the operation. Addition is correct, but you need common denominators first.",
    "incorrect_d": "Fractions can absolutely be added! You just need common denominators. 1/2 + 1/3 = 3/6 + 2/6 = 5/6."
  }
}
```

#### Problem U2: Why Does Multiplying Fractions Give a Smaller Result?

**Type**: `multiple-choice`
**Difficulty B**: 0.85
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "When you multiply 3/4 x 1/2, the answer (3/8) is SMALLER than both 3/4 and 1/2. Why?",
  "visualization": {
    "type": "areaModel",
    "fractionA": { "numerator": 3, "denominator": 4 },
    "fractionB": { "numerator": 1, "denominator": 2 },
    "squareSize": 200,
    "highlightProduct": true
  },
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "Because you are taking a PART of a part -- half of 3/4 is less than 3/4", "correct": true },
    { "id": "b", "text": "Because multiplication always makes numbers smaller", "correct": false },
    { "id": "c", "text": "Because you divided instead of multiplied", "correct": false },
    { "id": "d", "text": "Because you made a calculation error", "correct": false }
  ],
  "feedback": {
    "correct": "Exactly right! 3/4 x 1/2 means 'half OF 3/4.' You're taking a fraction of a fraction -- a piece of a piece. The area model shows this perfectly: the purple overlap is smaller than either the blue columns or the violet rows alone.",
    "incorrect_b": "Multiplication doesn't ALWAYS make things smaller! 3 x 4 = 12, which is bigger. But when you multiply by a number LESS than 1, the result shrinks. You're taking a portion, not scaling up.",
    "incorrect_c": "No, 3/4 x 1/2 = 3/8 is correctly computed. The point is that multiplying by a fraction less than 1 genuinely gives a smaller result -- and the area model shows why.",
    "incorrect_d": "3/4 x 1/2 = (3x1)/(4x2) = 3/8. The calculation is correct! The result really is smaller than both inputs when both are less than 1."
  }
}
```

#### Problem U3: When Does Division Give a Bigger Result?

**Type**: `multiple-choice`
**Difficulty B**: 0.9
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "You have 2 meters of ribbon. Each bow needs 1/3 of a meter. How many bows can you make? Set up the problem and choose the correct answer.",
  "visualization": {
    "type": "fractionBar",
    "wholes": 2,
    "divisor": { "numerator": 1, "denominator": 3 },
    "barWidth": 280,
    "barHeight": 40,
    "showGrouping": true
  },
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "2/3 bows (2 x 1/3)", "correct": false },
    { "id": "b", "text": "6 bows (2 / 1/3 = 6)", "correct": true },
    { "id": "c", "text": "3 bows (2 + 1/3 rounded)", "correct": false },
    { "id": "d", "text": "1 bow (there's not enough ribbon)", "correct": false }
  ],
  "feedback": {
    "correct": "6 bows! 2 / (1/3) = 2 x 3 = 6. Each meter has 3 thirds, so 2 meters have 6 thirds. The fraction bar shows 6 groups of 1/3 fitting into the 2 meters.",
    "incorrect_a": "2/3 is what you get from 2 x 1/3 (multiplication). But the question asks how many 1/3-meter pieces FIT in 2 meters. That's division: 2 / (1/3) = 6.",
    "incorrect_c": "Each meter contains 3 thirds, so 2 meters contain 6 thirds. You need to divide, not add.",
    "incorrect_d": "2 meters is plenty! Each bow only needs 1/3 of a meter. You can make 6 bows from 2 meters."
  }
}
```

### 8.5 Problem Presentation

#### ProblemCard Layout

Each problem is displayed in a `ProblemCard` component:
- Background: `#1e293b` (slate-800) with 1px `#334155` border. Border-radius: 12px.
- Padding: 20px (desktop), 16px (mobile).
- Stem text: 16px, `#e2e8f0`, line-height 1.6.
- Visualization: centered below stem, 16px top margin.
- Input area: below visualization, 16px top margin.
- Submit button (for multiple-choice, triggers on option selection): full-width on mobile, 200px on desktop. Background `#818cf8`. Text white. Border-radius 8px. Height 48px.
- Feedback area: appears below after selection. 12px top margin. Background `#0f172a20` with left border 3px solid (green for correct, amber for incorrect). Padding 12px.

#### Transition Between Problems

- Current problem card slides left + fades out (300ms, `ease: "easeInOut"`).
- Next problem card slides in from right + fades in (300ms, `ease: "easeInOut"`).
- Progress dots above the problem area: 9 dots, filled = completed, outlined = current, dimmed = upcoming. Colors: correct = `#34d399` (emerald-400), incorrect = `#f87171` (red-400), current = `#818cf8`, upcoming = `#475569`.

#### Hint System

- Hints are available for Layer 1 (procedure) problems only. Layer 0 (recall) problems are too simple. Layer 2 (understanding) problems require the student's own reasoning.
- A "Hint" button appears after 30 seconds of no interaction. First hint is free. Second hint reduces max XP for this problem by 25%. Third hint reduces by 50%.
- Hint appearance: slides in from the left below the visualization. Background `#1e1b4b` (indigo-950). Text `#c7d2fe` (indigo-200). Left border 3px `#818cf8`.
- Hints used are recorded in `ReviewLog.hintsUsed` for analytics and IRT model.

### 8.6 Adaptive Difficulty

The IRT engine selects problems to maximize information gain:
- Start with a Layer 0 problem (R1) to establish baseline.
- If correct with high confidence (response time < 15s, no hints): jump to Layer 1.
- If incorrect or slow: stay at Layer 0.
- Problems from different operations are interleaved: never two addition problems in a row.
- The 9 problems are drawn from a larger pool; the exact 9 shown depend on the student's performance.

---

## 9. Stage 7 -- Reflection (~1 min)

### 9.1 Reflection Prompt

**Prompt text**: "Explain WHY you need common denominators to add fractions, but NOT to multiply them. Use the fraction bars or area model in your explanation."

**Input**: Free-text, minimum 30 characters. The text area is:
- Full width, 120px height (expandable).
- Placeholder text: "Think about the fraction bars for addition and the area model for multiplication. What's different about how they work?"
- Character counter in bottom-right: `{count}/30 minimum`.
- Background: `#0f172a`. Border: 1px `#475569`. Focus border: `#818cf8`.

### 9.2 AI Evaluation

The response is submitted to `lesson.submitReflection`:

**Evaluation criteria**:
1. Explains that common denominators make pieces the same size so they can be counted together.
2. Explains that multiplication is "fraction OF a fraction" / area model, which does not require same-sized pieces.
3. (Bonus) Uses spatial language (bars, pieces, area, overlap, grid).
4. (Bonus) Gives a specific example.
5. (Bonus) Mentions that division is the inverse of multiplication or "how many groups fit."

**Scoring rubric**:
| Score | Description | XP Bonus |
|---|---|---|
| 5 | Complete explanation covering both criteria + bonus items. Could teach someone. | 80 |
| 4 | Strong explanation covering both core criteria. | 64 |
| 3 | Adequate: covers 1 of 2 core criteria clearly, touches on the other. | 48 |
| 2 | Partial: covers 1 criterion or is vague on both. | 32 |
| 1 | Minimal: restates the question or is mostly off-topic. | 16 |
| 0 | No meaningful content. | 0 |

### 9.3 Feedback & XP Award

After AI evaluation:

1. **Quality score visual**: A 5-star display where stars fill based on the score. Stars are amber (`#f59e0b`), empty stars are slate-700.
2. **Personalized feedback**: AI-generated text based on the specific response. Example for score 4: "Great explanation! You clearly understand why common denominators are needed for addition. To make it even stronger, you could contrast this with how the area model works for multiplication."
3. **XP award animation**: The XP amount flies upward from the reflection area to the XP counter in the lesson nav. Number color: `#f59e0b`. Duration: 800ms, ease: spring.
4. **Multiplier check**: If `referencesPriorConcept` is true (student mentions LCM, equivalent fractions, NO-1.4 concepts), the Connection Maker multiplier (1.3x) applies. The multiplier is shown as a badge next to the XP: "1.3x Connection Maker!"
5. **Struggle bonus**: If the student initially selected "2/5" or a wrong add-tops-and-bottoms answer in Practice, but now correctly explains why common denominators are needed, the Struggle Bonus (1.4x) triggers.

### 9.4 Aha Moment Detection

If the student's explanation quality score jumps significantly compared to their historical average (delta >= 2 points), OR if the student spent >3 minutes in spatial exploration AND now writes a strong reflection (score >= 4), the Aha Moment celebration fires:

1. Neural network flash animation: brief particle burst from the text area (8 indigo particles, expand outward 60px, fade over 600ms).
2. Discovery chime sound (major chord resolve, 500ms).
3. Toast notification: "Deep understanding unlocked!" -- 3s display, bottom-center.
4. Reflection prompt: "What clicked?" -- optional one-line input below the main reflection. If filled, stored in analytics.
5. Struggle Badge (if applicable): "This took effort. Understanding is STRONGER because it was hard."

---

## 10. Technical Specifications

### 10.1 SVG Component Architecture

#### Fraction Bar Component (reused from NO-1.4)

```
FractionBar.tsx (reused from NO-1.4)
├── Props: { denominator, shadedParts, width, height, shadedColor, unshadedColor, interactive, onPartToggle }
├── Internal state: none (fully controlled)
├── SVG structure:
│   ├── <rect> — outer border (rx=4)
│   ├── <g> — parts group
│   │   ├── <rect> x denominator — individual parts (animated fill)
│   │   └── <line> x (denominator - 1) — division lines
│   └── <text> — KaTeX label (via foreignObject)
├── Animations: Framer Motion `motion.rect` for fill transitions
└── Accessibility: role="group", each part role="checkbox"
```

#### Addition Workspace Component (new)

```
FractionAddSubWorkspace.tsx
├── Props: { onResult, onInteraction }
├── Internal state:
│   ├── fractionA: { numerator, denominator }
│   ├── fractionB: { numerator, denominator }
│   ├── commonDenominator: number | null
│   ├── result: { numerator, denominator } | null
│   └── operation: 'add' | 'subtract' | null
├── Subcomponents:
│   ├── FractionPicker x 2 — stepper controls for num/denom
│   ├── FractionBar x 2 — visual bars for A and B
│   ├── FractionBar x 1 — result bar (hidden until operation performed)
│   ├── SplitButton — "Split to Same-Sized Pieces"
│   ├── CombineButton — "Combine (Add)"
│   └── SeparateButton — "Separate (Subtract)"
├── Animations:
│   ├── Split: reuse NO-1.4 bar split animation
│   ├── Combine: shaded parts from B slide up into A (spring)
│   └── Separate: shaded parts desaturate right-to-left
└── Accessibility: buttons have aria-labels, live region announces results
```

#### Area Model Component (new)

```
AreaModelWorkspace.tsx
├── Props: { onProductTapped, onInteraction }
├── Internal state:
│   ├── fractionA: { numerator, denominator }
│   ├── fractionB: { numerator, denominator }
│   └── productRevealed: boolean
├── SVG structure:
│   ├── <rect> — unit square border
│   ├── <g> — grid lines group
│   │   ├── <line> x (denomA - 1) — vertical grid lines
│   │   └── <line> x (denomB - 1) — horizontal grid lines
│   ├── <g> — shading layers
│   │   ├── <rect> — horizontal shading (Fraction B rows)
│   │   ├── <rect> — vertical shading (Fraction A columns)
│   │   └── <rect> — product overlap (purple, tappable)
│   └── <text> — labels (via foreignObject)
├── Animations:
│   ├── Grid redraw: lines stagger in (30ms apart)
│   ├── Shading: 300ms fill transition
│   └── Product pulse: scale 1.05 on tap
└── Accessibility: product region is role="button" with aria-label
```

### 10.2 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `fraction-a` | `#818cf8` | Indigo-400. Fraction A shading, primary accent. |
| `fraction-b` | `#a78bfa` | Violet-400. Fraction B shading. |
| `product` | `#c084fc` | Purple-400. Multiplication product region (overlap). |
| `result-correct` | `#34d399` | Emerald-400. Correct results, combined fraction. |
| `error` | `#f87171` | Red-400. Wrong answers, the "2/5" mistake. |
| `highlight` | `#fbbf24` | Amber-400. Alignment lines, insight highlights. |
| `info` | `#60a5fa` | Blue-400. Denominator labels, neutral info. |
| `unshaded-dark` | `#334155` | Slate-700. Unshaded parts on dark theme. |
| `unshaded-light` | `#e2e8f0` | Slate-200. Unshaded parts on light theme. |
| `surface-dark` | `#0f172a` | Slate-900. Background on dark theme. |
| `surface-card` | `#1e293b` | Slate-800. Card backgrounds. |
| `border` | `#64748b` | Slate-500. Division lines, bar borders. |
| `text-primary` | `#e2e8f0` | Slate-200. Body text on dark. |
| `text-secondary` | `#94a3b8` | Slate-400. Labels, hints. |
| `correct` | `#34d399` | Emerald-400. Correct answer feedback. |
| `incorrect` | `#f87171` | Red-400. Incorrect answer feedback. |
| `flip-animation` | `#22d3ee` | Cyan-400. Division "flip" animation accent. |

### 10.3 Animation Configuration

All animations in this lesson use Framer Motion with these shared configurations:

```typescript
// Shared spring config for physical interactions (split, combine)
const SPRING_PHYSICAL = {
  type: "spring" as const,
  damping: 20,
  stiffness: 300,
};

// Shared spring config for gentle transitions (labels, annotations)
const SPRING_GENTLE = {
  type: "spring" as const,
  damping: 25,
  stiffness: 200,
};

// Spring config for the division "flip" animation
const SPRING_FLIP = {
  type: "spring" as const,
  damping: 15,
  stiffness: 200,
};

// Shared ease config for draws and fades
const EASE_SMOOTH = {
  type: "tween" as const,
  duration: 0.3,
  ease: "easeInOut" as const,
};

// Tap feedback
const TAP_SCALE = {
  whileTap: { scale: 0.95 },
  transition: { type: "spring", damping: 15, stiffness: 400 },
};

// Crossfade for labels
const CROSSFADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

// Combine animation (parts sliding upward)
const COMBINE_SLIDE = {
  type: "spring" as const,
  damping: 20,
  stiffness: 300,
  staggerChildren: 0.05,
};
```

### 10.4 Gesture Configuration

All gestures use `@use-gesture/react`:

```typescript
// Real-world cards swipe (Stage 5)
const cardBind = useDrag(({ movement: [mx], direction: [dx], velocity: [vx], cancel }) => {
  if (Math.abs(vx) > 0.5) {
    const newIndex = clamp(currentCard + (dx > 0 ? -1 : 1), 0, CARD_COUNT - 1);
    setCurrentCard(newIndex);
    cancel();
  }
}, {
  axis: "x",
  filterTaps: true,
  bounds: { left: -200, right: 200 },
  rubberband: 0.2,
});

// Workspace tab swipe (Stage 2)
const tabBind = useDrag(({ movement: [mx], direction: [dx], velocity: [vx], cancel }) => {
  if (Math.abs(vx) > 0.3) {
    const newTab = dx > 0 ? 0 : 1; // 0 = Add/Sub, 1 = Multiply
    setActiveTab(newTab);
    cancel();
  }
}, {
  axis: "x",
  filterTaps: true,
});
```

### 10.5 Responsive Breakpoints

| Breakpoint | Layout | Bar Width | Area Model Size | Stack |
|---|---|---|---|---|
| >= 1024px | Tabs, generous spacing | 320px | 300x300px | No |
| 768-1023px | Tabs, compact | 280px | 260x260px | No |
| 480-767px | Swipeable tabs, full width | Full - 32px | 240x240px | Yes |
| < 480px | Swipeable tabs, compact | Full - 24px | Full - 24px (square) | Yes |

### 10.6 Math Correctness Requirements (DR-2)

The following computations MUST have corresponding Vitest tests:

| Computation | Test |
|---|---|
| LCM calculation: `lcm(a, b)` | Exact for all denominator pairs in range 2-12 |
| Common denominator conversion: `(n/d) -> (n*k)/(d*k)` where `k = lcm/d` | Verified: `n*k / (d*k)` equals original fraction for all test cases |
| Fraction addition: `a/b + c/d = (a*d + c*b) / (b*d)` | Integer arithmetic, verified against known sums |
| Fraction subtraction: `a/b - c/d = (a*d - c*b) / (b*d)` | Integer arithmetic, verified for all practice problems. Result >= 0 when A >= B. |
| Fraction multiplication: `a/b * c/d = (a*c) / (b*d)` | Integer arithmetic, no floating point |
| Fraction division: `a/b / c/d = (a*d) / (b*c)` | Integer arithmetic, c != 0 precondition |
| GCF for simplification: `gcf(a, b)` | Euclidean algorithm, tested for all problem bank fractions |
| Fraction simplification: divide both by GCF | Verified: simplified form has GCF(n,d) = 1 |
| Area model cell counting: `product = numA * numB`, `total = denomA * denomB` | Exact integer arithmetic |
| Bar part width: `barWidth / denominator` | Floating point; sum of parts equals barWidth within epsilon 0.01px |
| Improper fraction detection: `numerator > denominator` | Boolean check for all practice results |
| Mixed number conversion: `n/d = floor(n/d) and (n mod d)/d` | Tested for all improper fraction results in problem bank |

### 10.7 Component Structure

```typescript
"use client";

// Single file: src/components/lessons/FractionOperationsLesson.tsx
// Named export: export function FractionOperationsLesson({ onComplete }: Props)

// Internal stage components (not exported):
// - HookStage
// - SpatialStage (tabs between AddSubWorkspace and AreaModelWorkspace)
// - DiscoveryStage
// - SymbolBridgeStage
// - RealWorldStage
// - PracticeStage
// - ReflectionStage

// Stage progression via internal useState
// AnimatePresence for transitions between stages
// Progress bar showing 7 dots at top
```

### 10.8 Dependencies (only these)

- `react` (useState, useEffect, useCallback, useMemo, useRef)
- `framer-motion` (motion, AnimatePresence, useMotionValue)
- `@use-gesture/react` (useDrag -- for card swipe and tab swipe)
- `@/lib/utils/cn` (className merging)
- `@/components/ui/Button` (optional, for styled buttons)

### 10.9 Rules

- TypeScript strict, no `any` (DR-1)
- `useRef()` must have an argument: `useRef(null)` or `useRef(undefined)`
- No external state stores -- self-contained
- No tRPC calls -- pure UI component
- All interactive elements: `min-h-[44px] min-w-[44px]`
- Array access with `noUncheckedIndexedAccess`: use `arr[i]!` or null checks
- `motion.text` textAnchor must be typed: `"middle" as const`

---

## 11. Accessibility

### 11.1 ARIA Structure

```html
<!-- Fraction Picker -->
<div role="group" aria-label="Fraction A: 1 over 2">
  <button aria-label="Decrease numerator" min-h-[44px] min-w-[44px]>-</button>
  <span aria-live="polite">1</span>
  <button aria-label="Increase numerator" min-h-[44px] min-w-[44px]>+</button>
  <hr aria-hidden="true" />
  <button aria-label="Decrease denominator" min-h-[44px] min-w-[44px]>-</button>
  <span aria-live="polite">2</span>
  <button aria-label="Increase denominator" min-h-[44px] min-w-[44px]>+</button>
</div>

<!-- Fraction Bar (reused from NO-1.4) -->
<svg role="img" aria-label="Fraction bar showing 3 out of 6 parts shaded">
  <rect role="presentation" aria-label="Part 1 of 6, shaded" />
  <!-- ... -->
</svg>

<!-- Area Model -->
<svg role="img" aria-label="Area model showing 1/2 times 1/3. Grid has 6 cells, 1 cell is the product.">
  <rect role="button" aria-label="Product region: 1 out of 6 cells. Tap to reveal result."
        tabindex="0" />
</svg>

<!-- Operation Buttons -->
<button aria-label="Split both bars to common denominator of 6" min-h-[48px]>
  Split to Same-Sized Pieces
</button>
<button aria-label="Combine fractions: add 3 sixths plus 2 sixths"
        aria-disabled="true" min-h-[48px]>
  Combine (Add)
</button>
```

### 11.2 Keyboard Navigation

| Key | Action |
|---|---|
| Tab | Move focus between: fraction pickers, stepper buttons, action buttons, workspace tabs, continue button |
| Enter / Space | Activate buttons. Toggle fraction stepper. Tap product region. |
| Arrow Up/Down | Increment/decrement focused stepper value |
| Arrow Left/Right | Switch between workspace tabs |
| Escape | Close any open tooltip or hint |

### 11.3 Screen Reader Announcements

| Event | Announcement (aria-live="polite") |
|---|---|
| Fraction A changed | "Fraction A is now 1 over 4. Bar shows 1 part shaded out of 4." |
| Fraction B changed | "Fraction B is now 2 over 3. Bar shows 2 parts shaded out of 3." |
| Split to common denominator | "Both bars split to 12 parts. Fraction A is now 3 twelfths. Fraction B is now 8 twelfths." |
| Combine (Add) | "Fractions combined. Result: 11 twelfths. 3 plus 8 equals 11, denominator stays 12." |
| Separate (Subtract) | "Fractions subtracted. Result: 5 twelfths." |
| Area model product tapped | "Product is 1 out of 6 cells. 1/2 times 1/3 equals 1/6." |
| Practice answer selected | "Selected: 11/12. Correct! 1/4 plus 2/3 equals 11/12." |
| Workspace tab switched | "Now viewing: Multiply workspace. Area model for fraction multiplication." |

### 11.4 Color Blind Safety

- Fraction A (indigo) vs Fraction B (violet): distinguishable by position (A always on top, B always below) and by pattern (B uses diagonal hatch overlay in addition to color).
- Product region (purple): Uses both color AND diagonal hatch pattern for differentiation from single-shaded regions.
- Correct vs incorrect feedback: Green checkmark has distinct shape (checkmark) vs red X (cross). Shape is the primary differentiator, not color.
- The wrong answer "2/5" in the hook uses red color AND a cross icon AND a pulsing border -- three independent signals.

### 11.5 Reduced Motion

If `prefers-reduced-motion: reduce` is active:
- All spring/transition animations resolve immediately (duration: 0).
- The hook plays as a slideshow (each frame appears instantly, held for the specified duration).
- Bar split animations show the final state without the "breathing" effect.
- Combine animation: parts appear in the result bar instantly without sliding.
- Division "flip" animation: fraction changes instantly without rotation.
- Area model grid redraws instantly without stagger.

---

## 12. Performance Budget

| Metric | Target | Measurement |
|---|---|---|
| Total SVG elements (max, area model at d=12x12) | < 200 | Grid lines + cells + labels + borders |
| Frame rate during split animation | >= 55fps P95 | Framer Motion spring on mid-range mobile (Samsung Galaxy A54) |
| Frame rate during combine animation | >= 55fps P95 | Multiple parts sliding with stagger |
| Frame rate during area model grid redraw | >= 55fps P95 | Grid lines stagger + shading transition |
| Time to interactive (Stage 2 load) | < 500ms | From stage transition to first interaction possible |
| KaTeX render time per label update | < 16ms | Must not drop a frame. Pre-render common fractions. |
| Memory footprint (Stage 2) | < 10MB | SVG DOM + component state + gesture handlers |
| JS bundle for this lesson's unique code | < 18KB gzipped | Excluding shared FractionBar component and MathScene |

### 12.1 Optimization Strategies

1. **Reuse NO-1.4 components**: FractionBar is imported, not re-implemented. Shared component = shared cache.
2. **Pre-rendered KaTeX**: Common fractions (all n/d for d in 2-12, n in 0-d) are pre-rendered to SVG at build time.
3. **SVG element pooling**: When the area model grid changes from 4x5 to 3x4, existing `<rect>` and `<line>` elements are reused where possible.
4. **GPU-accelerated animations**: Framer Motion's `transform` and `opacity` are GPU-composited. Fill color transitions use CSS transitions on the `fill` property.
5. **Lazy workspace loading**: The Area Model workspace SVG is not rendered until the "Multiply" tab is first selected. Unmounted when hidden.
6. **Debounced stepper**: 150ms debounce on fraction stepper changes prevents triggering rapid re-renders during held +/- buttons.

---

## 13. Content Files

### 13.1 File Structure

```
src/content/domains/numbers-operations/NO-1.4a/
├── lesson.mdx             # NLS stage content (prose, prompts, hints)
├── animations.json         # MathScene scene definitions for all 7 stages
├── problems.json           # Practice problem bank (9 core + extras for adaptivity)
└── meta.json               # Topic metadata
```

### 13.2 meta.json

```json
{
  "id": "NO-1.4a",
  "name": "Fraction Operations",
  "domain": "numbers-operations",
  "gradeLevel": [6, 7],
  "prerequisites": ["NO-1.4", "NT-2.3"],
  "successors": ["NO-1.4b", "AL-3.2", "NO-1.6", "GE-4.5", "SP-5.5"],
  "estimatedDuration": {
    "hook": 42,
    "spatialExperience": 210,
    "guidedDiscovery": 270,
    "symbolBridge": 165,
    "realWorldAnchor": 90,
    "practice": 480,
    "reflection": 60,
    "total": 1317
  },
  "hook": {
    "title": "The Fraction Trap",
    "description": "1/2 + 1/3 = 2/5? Watch the fraction bars reveal why that answer is IMPOSSIBLE."
  },
  "tags": ["fraction-addition", "fraction-subtraction", "fraction-multiplication", "fraction-division", "common-denominators", "area-model", "flip-and-multiply"],
  "misconceptions": [
    {
      "id": "add-numerators-and-denominators",
      "description": "1/2 + 1/3 = 2/5 (adding tops and bottoms)",
      "prevalence": "very-high",
      "confrontedInStage": "hook"
    },
    {
      "id": "multiplication-makes-bigger",
      "description": "Multiplying fractions should give a bigger result",
      "prevalence": "high",
      "confrontedInStage": "guided-discovery"
    },
    {
      "id": "division-makes-smaller",
      "description": "Dividing by a fraction should give a smaller result",
      "prevalence": "high",
      "confrontedInStage": "guided-discovery"
    },
    {
      "id": "common-denom-for-multiplication",
      "description": "You need common denominators for multiplication too",
      "prevalence": "moderate",
      "confrontedInStage": "guided-discovery"
    },
    {
      "id": "flip-and-multiply-is-magic",
      "description": "No understanding of WHY flipping works for division",
      "prevalence": "moderate",
      "confrontedInStage": "guided-discovery"
    }
  ],
  "crossDomainConnections": [
    {
      "targetId": "GE-4.5",
      "relationship": "Perimeter and area calculations use fraction operations when dimensions are fractional",
      "directionality": "forward"
    },
    {
      "targetId": "SP-5.5",
      "relationship": "Compound probability requires fraction multiplication",
      "directionality": "forward"
    },
    {
      "targetId": "AL-3.4",
      "relationship": "Multi-step equations with fractional coefficients require fraction operations",
      "directionality": "forward"
    }
  ]
}
```

### 13.3 animations.json Structure

The `animations.json` file contains one `SceneDefinition` per NLS stage (keyed by stage name). Each definition follows the MathScene DSL schema defined in `specs/001-middle-school-math-mvp/contracts/animation-dsl.md`.

```json
{
  "hook": {
    "equation": { /* Scene from Section 3.2 */ },
    "comparisonBars": { /* Three fraction bars: 1/2, 1/3, 2/5 */ },
    "commonDenominatorReveal": { /* Bars splitting to sixths and combining */ }
  },
  "spatialExperience": {
    "addSubWorkspace": { /* Scene from Section 4.3.5 */ },
    "areaModelWorkspace": { /* Scene from Section 4.4.3 */ }
  },
  "guidedDiscovery": {
    "mismatchedPieces": { /* Visual showing different-sized pieces can't combine */ },
    "commonDenominatorSplit": { /* Bars splitting to common denominator */ },
    "combineAnimation": { /* Parts sliding and merging */ },
    "areaModelMultiplication": { /* Grid with product highlight */ },
    "divisionGrouping": { /* 3 bars split into quarters, counted to 12 */ }
  },
  "symbolBridge": {
    "additionFormula": { /* Bars with overlay notation */ },
    "multiplicationFormula": { /* Area model with overlay notation */ },
    "divisionFlip": { /* Fraction rotation animation */ }
  },
  "realWorldAnchor": {
    "baking": { /* Double batch mixing bowl */ },
    "pizza": { /* Pizza sharing division */ },
    "garden": { /* Area model garden */ },
    "race": { /* Running track subtraction */ }
  }
}
```

### 13.4 problems.json Structure

```json
{
  "topicId": "NO-1.4a",
  "problems": [
    { /* Problem R1 from Section 8.2 */ },
    { /* Problem R2 from Section 8.2 */ },
    { /* Problem R3 from Section 8.2 */ },
    { /* Problem P1 from Section 8.3 */ },
    { /* Problem P2 from Section 8.3 */ },
    { /* Problem P3 from Section 8.3 */ },
    { /* Problem U1 from Section 8.4 */ },
    { /* Problem U2 from Section 8.4 */ },
    { /* Problem U3 from Section 8.4 */ }
  ],
  "adaptivePool": {
    "layer0_extras": [
      {
        "type": "multiple-choice",
        "difficulty": 0.25,
        "config": {
          "stem": "To divide fractions, you should:",
          "correctOption": "Flip the second fraction and multiply"
        }
      },
      {
        "type": "multiple-choice",
        "difficulty": 0.3,
        "config": {
          "stem": "What is the first step to add 1/3 + 1/5?",
          "correctOption": "Find a common denominator (15)"
        }
      }
    ],
    "layer1_extras": [
      {
        "type": "interactive-fraction-bar",
        "difficulty": 0.55,
        "config": {
          "stem": "Subtract: 3/4 - 1/6",
          "correctAnswer": { "numerator": 7, "denominator": 12 }
        }
      },
      {
        "type": "interactive-area-model",
        "difficulty": 0.6,
        "config": {
          "stem": "Multiply: 2/5 x 3/4",
          "correctAnswer": { "numerator": 6, "denominator": 20 }
        }
      },
      {
        "type": "multiple-choice",
        "difficulty": 0.7,
        "config": {
          "stem": "Divide: 3/5 / 2/3",
          "correctAnswer": { "numerator": 9, "denominator": 10 }
        }
      }
    ],
    "layer2_extras": [
      {
        "type": "multiple-choice",
        "difficulty": 0.85,
        "config": {
          "stem": "A student says 2/3 x 4/5 = 8/8 = 1 because 'the answer should be a whole number.' Use the area model to explain why this is wrong."
        }
      },
      {
        "type": "multiple-choice",
        "difficulty": 0.9,
        "config": {
          "stem": "Why does 4 / (1/2) = 8? Explain using the 'how many groups fit' model."
        }
      }
    ]
  }
}
```

---

## 14. Gamification Integration

### 14.1 XP Breakdown for Full Lesson Completion

| Source | Base XP | Possible Bonus | Multiplier | Max Total |
|---|---|---|---|---|
| Lesson completion (all 7 stages) | 100 | -- | -- | 100 |
| Reflection quality (0-5 score) | -- | 0-80 | -- | 80 |
| Interactive exploration (Stage 2) | -- | 20-40 | -- | 40 |
| Guided discovery insights (Stage 3) | -- | 0-30 | -- | 30 |
| Practice set completion (Stage 6) | 50 | -- | -- | 50 |
| **Subtotal before multipliers** | | | | **300** |
| Deep Dive multiplier (>2 min in spatial beyond minimum) | -- | -- | 1.5x | -- |
| Connection Maker (references LCM or equivalent fractions in reflection) | -- | -- | 1.3x | -- |
| Struggle Bonus (wrong -> retried -> explained correctly) | -- | -- | 1.4x | -- |
| First Try Clarity (first explanation rated high-quality) | -- | -- | 1.2x | -- |

**Theoretical maximum XP**: 300 base x 1.5 x 1.3 x 1.4 x 1.2 = 300 x 3.276 = 982 XP (extremely unlikely; requires all multipliers simultaneously).

**Typical XP range**: 200-350 XP for a solid completion.

### 14.2 Achievement Triggers

| Achievement | Trigger in This Lesson |
|---|---|
| Operation Master (Mastery, Uncommon) | Correctly answers at least 1 problem from each operation type (add, subtract, multiply, divide) in practice without hints. |
| Misconception Slayer (Mastery, Rare) | Initially selects "2/5" as 1/2+1/3 in practice, then correctly explains WHY common denominators are needed in the reflection (score >= 4). |
| Area Architect (Exploration, Uncommon) | Explores 5+ different fraction pairs in the area model workspace. |
| The Teacher (Mastery, Uncommon) | Reflection quality score = 5/5. |
| Pattern Hunter (Creativity, Uncommon) | Identifies that division = "flip and multiply" BEFORE Discovery Prompt 6 reveals it. |
| Second Wind (Persistence, Common) | Gets a practice problem wrong, reviews the concept, then solves a harder version correctly. |

### 14.3 SRS Entry

After lesson completion, three `StudentConceptState` records are created (or updated):

| Layer | Initial Stability | Initial Difficulty | First Review |
|---|---|---|---|
| 0 (recall) | 1.0 day | Derived from practice accuracy | Tomorrow |
| 1 (procedure) | 2.0 days | Derived from Layer 1 problem accuracy | ~2 days |
| 2 (understanding) | 3.0 days | Derived from reflection quality | ~3 days |

---

## 15. AI Tutor Guidance

### 15.1 System Prompt Context

When the AI tutor is active during this lesson, the system prompt includes:

```
You are helping a Grade 6-7 student understand fraction operations (topic NO-1.4a).

Current stage: {stage_name}
Student has completed: {completed_stages}
Known misconceptions detected: {detected_misconceptions}
Prerequisite mastery: NO-1.4 ({mastery_level}), NT-2.3 ({mastery_level})

Key pedagogical rules for this topic:
1. ALWAYS reference the visual model first. "Look at the bars" before "the formula says."
2. For addition/subtraction: emphasize "same-sized pieces" language. Do NOT just say "find common denominator" without connecting to WHY.
3. If the student says "1/2 + 1/3 = 2/5", do NOT correct directly. Ask "Let's check: is 2/5 bigger or smaller than 1/2? What does that tell us?"
4. For multiplication: use "fraction OF a fraction" language. "1/2 OF 1/3" not just "1/2 times 1/3."
5. For division: use "how many groups fit" language. "How many 1/4-sized pieces fit in 3?"
6. Never present the formula BEFORE the spatial model. Always visual first, symbol second.
7. Validate emotional state: if student seems frustrated (3+ wrong in a row), switch to confidence-building mode with easier problems.

Available scene commands: create/modify fraction bars, area models, comparison overlays.
```

### 15.2 Misconception Response Patterns

| Student Says | AI Response Strategy |
|---|---|
| "1/2 + 1/3 = 2/5" | "Interesting! Let's check that with the bars. Make 1/2 and 2/5 on the bars. Is 2/5 bigger or smaller than 1/2? If it's smaller, can adding 1/3 really give you 2/5?" |
| "I multiplied and got a bigger number" | "Let's look at the area model. Set up 3/4 x 1/2. Tap the purple overlap. How much of the whole rectangle is purple? Is it more or less than 3/4 of the rectangle?" |
| "Why do I need to flip for division?" | "Great question! Think of it this way: 6 / (1/2) means 'how many half-sized groups fit in 6?' Each whole has 2 halves, so 6 wholes have 12 halves. That's the same as 6 x 2. Flipping 1/2 gives 2/1 = 2. See?" |
| "Why can't I add tops and bottoms?" | "Because the pieces are different sizes! Make 1/2 and 1/3 on the bars. Look -- the 1/2 piece and the 1/3 piece are different sizes. Adding them needs same-sized pieces, like adding inches -- you wouldn't add 3 inches + 2 centimeters and say '5 inchtimeters.'" |
| "I don't understand common denominators" | "You actually already know this from equivalent fractions! Remember how 1/2 = 2/4 = 3/6? You're just making the pieces smaller without changing how much is shaded. We do the SAME thing to both fractions so their pieces match." |
| "Division by fractions doesn't make sense" | "Let's make it concrete. You have 3 chocolate bars. Each serving is 1/4 of a bar. How many servings? Let's count on the bars: split each bar into quarters. Count all the quarters. How many?" |

### 15.3 Scene Commands for Tutoring

The AI tutor can generate MathScene commands to illustrate points:

```json
[
  {
    "action": "create",
    "object": {
      "type": "additionBars",
      "id": "tutor-add-demo",
      "fractionA": { "numerator": 1, "denominator": 2 },
      "fractionB": { "numerator": 1, "denominator": 3 },
      "barWidth": 240,
      "barHeight": 36,
      "shadedColorA": "#818cf8",
      "shadedColorB": "#a78bfa",
      "unshadedColor": "#334155"
    }
  },
  {
    "action": "animate",
    "sequence": {
      "trigger": "auto",
      "steps": [
        { "action": "splitToCommonDenominator", "target": "tutor-add-demo", "lcm": 6, "duration": 1.0 },
        { "action": "wait", "duration": 1.0 },
        { "action": "combine", "target": "tutor-add-demo", "duration": 0.8 }
      ]
    }
  }
]
```

---

## 16. Edge Cases & Error Handling

### 16.1 Interaction Edge Cases

| Scenario | Handling |
|---|---|
| Student tries to add fractions with different denominators without splitting first | Combine and Separate buttons are disabled. Tooltip on tap: "Split to same-sized pieces first!" |
| Student creates a sum greater than 1 (improper fraction) | Accepted and shown. Result bar extends with a note: "That's more than 1 whole! X/Y = Z and W/Y." The bar renders as 1 full bar + a partial bar. |
| Subtraction where A < B | Separate button is disabled. Tooltip: "Can't subtract a bigger fraction from a smaller one here. Try swapping them!" Negative fractions are a future topic (NO-1.2a-level). |
| Denominator set to same value on both fractions | Split button shows "Already the same size!" toast. Combine/Separate buttons enable immediately. |
| LCM of denominators exceeds 12 (e.g., 7 and 11) | The system handles it mathematically but the visual shows a note: "That's 77 pieces! Too many to draw clearly, but the math works the same way." Bars render with thicker lines at every 7th or 11th position. |
| Student taps product region in area model before setting fractions | Product region always exists (even at default 1/2 x 1/3). Tap reveals the label for the current state. |
| Fraction numerator set to 0 | Valid state. Bar shows 0 parts shaded. Addition/subtraction proceeds normally (0/n + a/b = a/b). Area model shows no product overlap. |
| Rapid stepper tapping | 200ms debounce. Only final value triggers bar re-render. Intermediate visual: number display updates immediately but bar animation waits for debounce. |
| Student leaves mid-lesson | All state persisted to IndexedDB via Dexie.js. On return, lesson resumes at the exact stage and prompt. Spatial exploration state (fractions, interaction count, workspace tab) is restored. |
| Network loss during AI evaluation | Queued in IndexedDB. Retry on reconnect. Reflection shows "Saving your response..." with a spinner. After 10s offline: "We'll evaluate your response when you're back online." Practice problems continue working fully offline (all answer validation is client-side). |
| Student submits empty reflection | Submit button is disabled until minimum character count (30) is reached. The button shows the remaining character count. |

### 16.2 Device-Specific Edge Cases

| Device Scenario | Handling |
|---|---|
| iOS Safari: SVG tap not registering on area model cells | Use `pointer-events: visible` on all interactive SVG elements. Add `cursor: pointer`. Use `touch-action: manipulation` to prevent 300ms tap delay. |
| Android: Keyboard covering fraction input in practice | Scroll the input into view using `scrollIntoView({ behavior: 'smooth', block: 'center' })` on focus. |
| Low-end device: Area model grid redraw drops frames | `useGpuTier()` hook detects GPU tier. If tier <= 1: disable grid line stagger (draw all at once). Shading transitions reduce from 300ms to 100ms. Combine animation slides all parts simultaneously instead of staggered. |
| Screen rotation during spatial experience | Responsive layout recalculates. Bar widths and area model dimensions recompute. Fraction state and shading are preserved. |
| iPad split-screen mode | Layout detects available width and switches to stacked tabs if < 768px effective width. |
| Very small screen (< 320px width) | Fraction pickers switch to a compact inline layout. Area model minimum size: 200x200px. If viewport can't fit it, horizontal scroll is enabled on the area model container only. |

---

## 17. Testing Requirements

### 17.1 Unit Tests (Vitest)

| Test | File | What It Verifies |
|---|---|---|
| LCM calculation | `tests/unit/math/fraction-operations.test.ts` | `lcm(2,3)=6`, `lcm(4,6)=12`, `lcm(7,11)=77`, all pairs in 2-12 |
| Fraction addition (integer arithmetic) | `tests/unit/math/fraction-operations.test.ts` | `add(1,2,1,3)={5,6}`, `add(1,4,2,3)={11,12}`, handles improper results |
| Fraction subtraction | `tests/unit/math/fraction-operations.test.ts` | `sub(3,4,1,4)={2,4}`, `sub(5,8,1,4)={3,8}`, rejects negative results |
| Fraction multiplication | `tests/unit/math/fraction-operations.test.ts` | `mul(1,2,1,3)={1,6}`, `mul(3,4,2,5)={6,20}`, integer arithmetic |
| Fraction division | `tests/unit/math/fraction-operations.test.ts` | `div(2,3,1,4)={8,3}`, `div(1,2,1,3)={3,2}`, rejects division by zero |
| GCF calculation | `tests/unit/math/fraction-operations.test.ts` | Euclidean algorithm for all problem bank fractions |
| Simplification | `tests/unit/math/fraction-operations.test.ts` | `simplify(6,20)={3,10}`, `simplify(8,3)={8,3}`, GCF(n,d)=1 |
| Common denominator conversion | `tests/unit/math/fraction-operations.test.ts` | `toCommonDenom(1,2,1,3)=({3,6},{2,6})`, preserves fraction values |
| Area model cell counting | `tests/unit/math/fraction-operations.test.ts` | Product cells = numA*numB, total cells = denomA*denomB |
| Improper fraction to mixed number | `tests/unit/math/fraction-operations.test.ts` | `toMixed(8,3)={2,2,3}`, `toMixed(11,12)=null` (proper) |
| Practice problem validation | `tests/unit/content/NO-1.4a.test.ts` | All problems in problems.json parse correctly, have valid answers |
| XP calculation | `tests/unit/gamification/xp-NO-1.4a.test.ts` | Given exploration metrics, verify XP bonus is 0, 20, or 40 |

### 17.2 Integration Tests

| Test | File | What It Verifies |
|---|---|---|
| Stage progression | `tests/integration/lesson-flow/NO-1.4a.test.ts` | Completing all 7 stages in order creates correct `StudentConceptState` records |
| Reflection submission | `tests/integration/trpc/reflection.test.ts` | Submitting reflection via `lesson.submitReflection` returns quality score and XP |
| SRS entry creation | `tests/integration/srs/NO-1.4a.test.ts` | After lesson completion, 3 SRS records exist (layers 0, 1, 2) with correct initial stability |
| Practice adaptivity | `tests/integration/lesson-flow/NO-1.4a.test.ts` | Getting R1 correct immediately leads to a Layer 1 problem, not another Layer 0 |
| Prerequisite check | `tests/integration/lesson-flow/NO-1.4a.test.ts` | Lesson is locked if NO-1.4 or NT-2.3 is not completed |

### 17.3 Visual Tests (Storybook)

| Story | What It Shows |
|---|---|
| `FractionAddSubWorkspace/Default` | Two bars at 1/2 and 1/3, buttons below. Static. |
| `FractionAddSubWorkspace/CommonDenominator` | Both bars split to sixths. Combine button enabled. |
| `FractionAddSubWorkspace/CombineAnimation` | Parts from Bar B sliding into Bar A. Animated. |
| `FractionAddSubWorkspace/ImproperResult` | Sum > 1 (e.g., 3/4 + 3/4 = 6/4). Extended result bar. |
| `AreaModelWorkspace/Default` | 2x3 grid with 1/2 x 1/3. Product highlighted. |
| `AreaModelWorkspace/LargerFractions` | 4x5 grid with 3/4 x 2/5. Product region visible. |
| `AreaModelWorkspace/AllDenominators` | Gallery of area models at various denominator combinations. |
| `Hook/FullSequence` | Complete hook animation playing through. |
| `SymbolBridge/AdditionFormula` | Bars with notation overlay for addition. |
| `SymbolBridge/MultiplicationFormula` | Area model with notation overlay. |
| `SymbolBridge/DivisionFlip` | Fraction rotation animation for division. |
| `PracticeCard/AdditionProblem` | P1 with interactive bars and multiple choice. |
| `PracticeCard/MultiplicationProblem` | P2 with area model and multiple choice. |
| `PracticeCard/DivisionProblem` | P3 with multiple choice and visual. |

### 17.4 E2E Tests (Playwright)

| Test | File | What It Verifies |
|---|---|---|
| Full lesson completion | `tests/e2e/lessons/NO-1.4a.spec.ts` | A student can complete all 7 stages, answer all practice problems, submit reflection, and see XP awarded. |
| Spatial exploration minimum | `tests/e2e/lessons/NO-1.4a.spec.ts` | Continue button does not activate until 12 interactions are performed. |
| Common denominator split | `tests/e2e/lessons/NO-1.4a.spec.ts` | Setting 1/2 and 1/3, pressing Split, produces bars with 6 parts each (3 and 2 shaded). |
| Area model product tap | `tests/e2e/lessons/NO-1.4a.spec.ts` | Setting 1/2 x 1/3 and tapping the purple region shows "1/6" label. |
| Combine animation | `tests/e2e/lessons/NO-1.4a.spec.ts` | After splitting to common denom, pressing Combine shows the correct sum. |
| Offline resume | `tests/e2e/lessons/NO-1.4a.spec.ts` | Go offline mid-Stage 3, reload, state is preserved. |
| Mobile layout | `tests/e2e/lessons/NO-1.4a.spec.ts` | At viewport 375x667 (iPhone SE), all elements are visible and interactive. Touch targets >= 44px. |
| Keyboard navigation | `tests/e2e/lessons/NO-1.4a.spec.ts` | Entire spatial experience can be completed using only keyboard (Tab, Enter, Arrow keys). |
| Screen reader | `tests/e2e/lessons/NO-1.4a.spec.ts` | Verify aria-labels update correctly when fractions change, bars split, and operations are performed. |
| Workspace tab switching | `tests/e2e/lessons/NO-1.4a.spec.ts` | Switching between Add/Sub and Multiply tabs preserves state in each workspace. |

### 17.5 Performance Tests

| Test | Target | How Measured |
|---|---|---|
| Split animation frame rate | >= 55fps P95 | Playwright `page.evaluate(() => performance.now())` frame timing during split on emulated mid-range device |
| Combine animation frame rate | >= 55fps P95 | Same technique during parts sliding |
| Area model grid redraw frame rate | >= 55fps P95 | Same technique during 4x5 -> 3x4 transition |
| KaTeX render latency | < 16ms per update | `performance.measure()` around KaTeX render calls |
| Stage 2 TTI | < 500ms | Lighthouse audit on Stage 2 entry |

---

## Appendix A: i18n String Keys

All user-facing strings are externalized to `src/lib/i18n/messages/en.json`:

```json
{
  "lesson.NO-1.4a.hook.narration.lotsOfPeople": "Lots of people think you just add the tops and add the bottoms...",
  "lesson.NO-1.4a.hook.narration.letsCheck": "Let's check. Here's 1/2 and 1/3...",
  "lesson.NO-1.4a.hook.narration.lessThanHalf": "Wait -- 2/5 is LESS than 1/2 alone! Adding 1/3 can't make it SMALLER!",
  "lesson.NO-1.4a.hook.narration.sameSizeFirst": "The pieces need to be the SAME SIZE first!",
  "lesson.NO-1.4a.hook.narration.whatItsAbout": "To add fractions, you need the SAME-SIZED PIECES. That's what this lesson is all about.",
  "lesson.NO-1.4a.spatial.tab.addSub": "Add / Subtract",
  "lesson.NO-1.4a.spatial.tab.multiply": "Multiply",
  "lesson.NO-1.4a.spatial.split.button": "Split to Same-Sized Pieces",
  "lesson.NO-1.4a.spatial.split.alreadySame": "Already the same size!",
  "lesson.NO-1.4a.spatial.split.nowSameSize": "Now the pieces are the same size!",
  "lesson.NO-1.4a.spatial.combine.button": "Combine (Add)",
  "lesson.NO-1.4a.spatial.separate.button": "Separate (Subtract)",
  "lesson.NO-1.4a.spatial.disabled.tooltip": "Split to same-sized pieces first!",
  "lesson.NO-1.4a.spatial.subtract.tooSmall": "Can't subtract a bigger fraction from a smaller one here. Try swapping them!",
  "lesson.NO-1.4a.spatial.improper": "That's more than 1 whole! {fraction} = {whole} and {remainder}.",
  "lesson.NO-1.4a.spatial.areaModel.productLabel": "{product} out of {total} cells = {fraction}",
  "lesson.NO-1.4a.spatial.areaModel.singleShade": "This part is shaded for only ONE fraction, not both",
  "lesson.NO-1.4a.spatial.areaModel.tooManyPieces": "That's a lot of pieces! The LCM of {a} and {b} is {lcm}.",
  "lesson.NO-1.4a.discovery.prompt1": "Look at the bars for 1/2 and 1/3. The pieces are different sizes. What happens if you try to count them together without making them the same size?",
  "lesson.NO-1.4a.discovery.prompt2": "Now press 'Split to Same-Sized Pieces.' What happened to both bars? What's the new denominator?",
  "lesson.NO-1.4a.discovery.prompt3": "Press 'Combine' to add the fractions. How many sixths do you have?",
  "lesson.NO-1.4a.discovery.prompt4": "Switch to the Multiply tab. Set the fractions to 1/2 and 1/3. Tap the purple overlap region. How much of the rectangle is purple?",
  "lesson.NO-1.4a.discovery.prompt5": "Now try 2/3 times 3/4. What fraction of the rectangle is purple? Is the answer BIGGER or SMALLER than 2/3?",
  "lesson.NO-1.4a.discovery.prompt6": "Final challenge. Imagine you have 3 whole chocolate bars. Each serving is 1/4 of a bar. How many servings do you have?",
  "lesson.NO-1.4a.discovery.appanges": "You can't add pieces that are different sizes. It's like adding 1 apple + 1 orange and saying you have 2 appanges.",
  "lesson.NO-1.4a.discovery.bothSixths": "Both bars now have 6 equal parts!",
  "lesson.NO-1.4a.discovery.justCounting": "3 sixths + 2 sixths = 5 sixths. Once the pieces are the SAME SIZE, adding is just counting.",
  "lesson.NO-1.4a.discovery.noCommonDenom": "Multiplication does NOT need common denominators.",
  "lesson.NO-1.4a.discovery.pieceOfPiece": "You're taking a fraction OF a fraction -- a piece of a piece.",
  "lesson.NO-1.4a.discovery.divisionReveal": "12 servings! Dividing by 1/4 is the same as multiplying by 4.",
  "lesson.NO-1.4a.discovery.flipAndMultiply": "The 'flip and multiply' rule isn't magic -- it's asking 'how many groups of this size fit in?'",
  "lesson.NO-1.4a.symbolBridge.sameAddNumerators": "When the denominators are the same, just add the numerators.",
  "lesson.NO-1.4a.symbolBridge.subtractionSame": "Subtraction works the same way.",
  "lesson.NO-1.4a.symbolBridge.multiplyTopsBottoms": "Multiply tops. Multiply bottoms. No common denominator needed.",
  "lesson.NO-1.4a.symbolBridge.flipAndMultiply": "To divide by a fraction, flip it and multiply.",
  "lesson.NO-1.4a.symbolBridge.whyFlipWorks": "Because dividing asks 'how many groups of this size fit?' Flipping converts the question to multiplication.",
  "lesson.NO-1.4a.realWorld.baking.text": "A recipe calls for 2/3 cup of sugar. You want to make a double batch.",
  "lesson.NO-1.4a.realWorld.pizza.text": "3 friends share 3/4 of a pizza equally. How much does each friend get?",
  "lesson.NO-1.4a.realWorld.garden.text": "A garden is 3/4 of a yard long and 2/3 of a yard wide. What fraction of a square yard is the garden?",
  "lesson.NO-1.4a.realWorld.race.text": "You've run 5/8 of a race. Your friend has run 1/4 of the race. How much further ahead are you?",
  "lesson.NO-1.4a.reflection.prompt": "Explain WHY you need common denominators to add fractions, but NOT to multiply them. Use the fraction bars or area model in your explanation.",
  "lesson.NO-1.4a.reflection.placeholder": "Think about the fraction bars for addition and the area model for multiplication. What's different about how they work?",
  "lesson.NO-1.4a.practice.feedback.commonDenomMistake": "That comes from adding numerators AND denominators. You need common denominators first!"
}
```

---

## Appendix B: Dependency Graph Context

```
NO-1.1 (Place Value)
  └──→ NO-1.4 (Fractions)
         └──→ NO-1.4a (Fraction Operations) ← THIS LESSON
                ├──→ NO-1.4b (Fractions/Decimals/Percents)
                ├──→ AL-3.2 (Evaluating Expressions)
                ├──→ NO-1.6 (Order of Operations)
                ├──→ GE-4.5 (Perimeter & Area)
                └──→ SP-5.5 (Compound Probability)

NT-2.1 (Factors & Multiples)
  └──→ NT-2.2 (Prime & Composite)
         └──→ NT-2.2a (Prime Factorization)
                └──→ NT-2.3 (GCF & LCM) ──→ NO-1.4a (this lesson)
```

**Backward links**:
- **NO-1.4 (Fractions)**: Students must understand fractions as parts of a whole, equivalent fractions, and fraction comparison. The fraction bar model from this lesson is the foundation for the addition/subtraction workspace.
- **NT-2.3 (GCF & LCM)**: Students must understand LCM to find efficient common denominators. The "Split to Same-Sized Pieces" button relies on LCM computation. GCF is used for simplification.

**Forward links**:
- **NO-1.4b (Fractions/Decimals/Percents)**: Converting between representations requires fluent fraction operations.
- **AL-3.2 (Evaluating Expressions)**: Algebraic expressions with fractional coefficients require fraction arithmetic.
- **NO-1.6 (Order of Operations)**: Expressions combining fraction operations with other operations.
- **GE-4.5 (Perimeter & Area)**: Area calculations with fractional dimensions directly use fraction multiplication.
- **SP-5.5 (Compound Probability)**: P(A and B) = P(A) x P(B) requires fraction multiplication.

**Cross-domain connections** (surfaced in Knowledge Nebula):
- **AL-3.4 (Multi-Step Equations)**: Solving equations with fractional coefficients (e.g., 2/3 x = 8).
- **GE-4.6a (Arc Length & Sector Area)**: Sector area = (angle/360) x pi r^2 requires fraction multiplication.

---

## Appendix C: Review Checklist

### Pedagogical Review (DR-3)

- [ ] Hook activates curiosity by showing a common mistake, not by lecturing
- [ ] Spatial Experience precedes ALL symbolic notation (CP-II verified)
- [ ] Addition/subtraction uses fraction bars with common denominator conversion
- [ ] Multiplication uses area model (geometry, not just procedure)
- [ ] Division is motivated as "how many groups fit" before introducing "flip and multiply"
- [ ] All four operations are covered but decomposed into manageable chunks
- [ ] Misconception "add tops and bottoms" is directly confronted in the hook
- [ ] Misconception "multiplication makes bigger" is defeated by the area model
- [ ] Practice problems interleave all four operations
- [ ] No free-text input for graded practice answers

### Technical Review

- [ ] All 7 stages render without errors
- [ ] Stage progression works (each stage leads to next)
- [ ] Continue buttons appear at correct triggers
- [ ] All practice problems have correct answers validated
- [ ] Feedback stays visible until "Next" is tapped
- [ ] Reflection accepts text and shows response
- [ ] `onComplete` fires after Stage 7
- [ ] Split animation preserves fraction equivalence (visual width unchanged)
- [ ] Combine animation produces correct sum
- [ ] Area model cell count matches numerator product / denominator product
- [ ] LCM computation is correct for all denominator pairs 2-12

### Visual Quality

- [ ] Animations are smooth (no janky transitions)
- [ ] Colors are consistent with lesson's palette
- [ ] Text is readable on dark background
- [ ] No layout overflow on mobile (375px width)
- [ ] Numbers use `tabular-nums` for alignment
- [ ] Progress bar at top shows current stage
- [ ] Area model grid is square (aspect ratio preserved)

### Interactions

- [ ] All touch targets >= 44px
- [ ] Disabled buttons show tooltips explaining why
- [ ] Stepper buttons have correct min/max bounds
- [ ] Visual feedback on every tap/click (scale, color, or highlight)
- [ ] No dead states (always a way to progress)

### Accessibility

- [ ] Interactive elements have aria-labels
- [ ] Live regions announce state changes
- [ ] Keyboard navigation possible for all interactions
- [ ] Color-blind safe patterns on overlapping shading

### Build

- [ ] `pnpm build` passes with no type errors
- [ ] No console errors in browser DevTools
- [ ] Bundle size for unique code < 18KB gzipped
