# Lesson Design: NO-1.5a Proportions

**Version**: 1.0.0 | **Date**: 2026-03-23 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NO-1.5a | **Domain**: Numbers & Operations | **Grade**: 7
**Prerequisites**: NO-1.5 (Ratios & Proportions) | **Successors**: NO-1.7 (Percent Applications), AL-3.6 (Proportional Relationships), AL-3.7 (Linear Equations)
**Content Path**: `src/content/domains/numbers-operations/NO-1.5a/`
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

Proportions are equivalent ratios -- 2:3 = 4:6 = 6:9. They describe relationships that SCALE. Cross multiplication proves equality (2 x 6 = 3 x 4 = 12), and solving proportions means finding the missing value in a pair of equivalent ratios.

**Secondary insights** (built progressively through stages):
- A proportion is a statement that two ratios are equal. You can test this visually: when two rectangles have the same width-to-height ratio, they look like scaled copies of each other -- same shape, different size.
- Cross multiplication is not a magic trick -- it is a consequence of multiplying both sides of a fraction equation by both denominators, which clears the fractions.
- Proportional relationships are fundamentally MULTIPLICATIVE. If you scale one quantity by a factor, the other quantity scales by the same factor. Adding the same amount to both parts of a ratio does NOT preserve the proportion.
- The double number line reveals proportional reasoning visually: equivalent ratios always line up vertically when the two number lines are scaled together.

**Key misconception to defeat**: "To keep a ratio the same, add the same number to both parts" (additive fallacy). For example, students think 2:3 can become 3:4 by adding 1 to each. The spatial experience demolishes this: a rectangle with width:height = 2:3 is visibly a different shape from width:height = 3:4. When you ADD the same amount, the rectangle stretches unevenly. When you MULTIPLY, it scales uniformly -- same shape, bigger size.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | Scaling rectangles make proportional equivalence visible -- same shape = same ratio. The double number line shows equivalent ratios as aligned vertical pairs. Both models activate the intraparietal sulcus (IPS) for magnitude comparison. |
| PF-2: Dual Coding Theory | KaTeX notation (a/b = c/d, cross products) is overlaid directly ON the scaling rectangles and double number line during the Symbol Bridge. The equation is color-coded to match the visual elements it represents. |
| PF-3: Embodied Cognition | Students physically drag a rectangle corner to scale it, watching the ratio readout in real time. They drag markers on the double number line to find equivalent ratios. Motor cortex activation creates stronger memory traces than passively watching. |
| PF-4: Spacing Effect | After this lesson, proportion items enter the FSRS queue at all three layers. Initial stability is low (~1 day for recall, ~2 days for procedure, ~3 days for understanding). |
| PF-5: Interleaving | Practice problems interleave identification of proportions, cross-multiplication verification, and solving for unknowns. Students must decide WHICH operation to use, not just execute a known procedure. |
| PF-6: Math Anxiety Reduction | The hook validates the additive misconception without shaming ("lots of people think this!"). The spatial experience is exploratory -- no right/wrong during manipulation. Practice has no timer. Wrong answers receive neutral, instructive feedback. |

### 2.2 Cognitive Load Management

- **Intrinsic load**: Proportional reasoning is moderately complex. The lesson decomposes into three sub-skills: (1) recognizing equivalent ratios, (2) testing with cross multiplication, (3) solving for a missing value. Each is introduced separately before being combined in Practice.
- **Extraneous load**: Minimized by reusing the double number line model from NO-1.5 (familiar tool = lower load). The scaling rectangle is introduced as a single new visual metaphor. No menus, no settings, no distractions during any stage.
- **Germane load**: Maximized by the additive-vs-multiplicative contrast in the hook (prediction error drives learning), and by the rectangle scaling making proportionality visible as geometry (cross-domain connection strengthens encoding).

### 2.3 Prior Knowledge Activation

This lesson builds directly on NO-1.5 (Ratios & Proportions). The student already understands:
- Ratios as comparisons of two quantities (a:b or a/b)
- Equivalent ratios via multiplication (2:3 = 4:6 because both multiply by 2)
- Double number lines for visualizing ratio relationships
- Ratio tables with scaling patterns

The hook deliberately uses the double number line from NO-1.5 so the student recognizes the tool and feels confident. The scaling rectangle extends the ratio concept to a new spatial metaphor. Cross multiplication formalizes what the student already knows intuitively from equivalent fractions (NO-1.4).

### 2.4 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "Add the same number to both sides to keep the ratio" (additive fallacy) | Very high (~60% of entering Grade 7) | Hook: Rectangle 2:3 becomes 3:4 by adding 1 -- visibly different shape. Spatial: drag to scale shows only multiplication preserves shape. Discovery: explicit additive vs multiplicative contrast. | 1, 2, 3 |
| "2:3 and 4:6 are different because the numbers are different" (failing to recognize equivalent ratios) | High (~45%) | Spatial: two rectangles with ratios 2:3 and 4:6 overlap perfectly when scaled to the same height. Double number line shows them aligning vertically. | 2, 3 |
| "Cross multiply always means multiply the tops" (procedural confusion) | Moderate (~35%) | Symbol Bridge: arrows show explicitly which numbers cross. Color coding links each product to its visual origin. Practice provides interactive arrow-drawing. | 4, 6 |
| "Proportions only apply to whole numbers" | Moderate (~25%) | Real-World Anchor: recipe scaling (1.5 cups flour for 3 servings = how much for 5 servings?) and speed calculations use non-integer proportions. | 5, 6 |
| "The larger ratio is always the one with bigger numbers" | Low (~15%) | Discovery Prompt 3: 3:5 vs 6:10 -- same ratio despite different magnitudes. The rectangle test proves it. | 3 |

---

## 3. Stage 1 -- Hook (30-60s)

### 3.1 Narrative Arc

The hook presents the additive fallacy as a believable claim, then visually demolishes it. A character claims that to keep a photo's proportions when enlarging, you "just add the same amount to width and height." A small photo (2 cm wide, 3 cm tall) is enlarged to 3 cm x 4 cm by adding 1 to each dimension. Then the original and enlarged photos are overlaid -- revealing that the enlarged one is STRETCHED wider. The person in the photo looks squished. A second enlargement using multiplication (4 cm x 6 cm) overlays perfectly -- same shape, just bigger. The cognitive dissonance (why does adding NOT work?) primes the dopamine system for learning.

### 3.2 Scene Definition

```json
{
  "id": "NO-1.5a-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 440],
  "background": "transparent",
  "objects": [
    {
      "type": "annotation",
      "id": "title-text",
      "position": [200, 30],
      "latex": "\\text{Enlarging a Photo}",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 22 }
    },
    {
      "type": "geometricShape",
      "id": "photo-original",
      "shape": "rectangle",
      "position": [40, 70],
      "width": 80,
      "height": 120,
      "style": {
        "fill": "#818cf8",
        "fillOpacity": 0.3,
        "stroke": "#818cf8",
        "strokeWidth": 2,
        "rx": 4
      }
    },
    {
      "type": "annotation",
      "id": "label-original",
      "position": [80, 205],
      "latex": "2 \\times 3",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 16 }
    },
    {
      "type": "geometricShape",
      "id": "photo-additive",
      "shape": "rectangle",
      "position": [150, 70],
      "width": 120,
      "height": 160,
      "visible": false,
      "style": {
        "fill": "#f87171",
        "fillOpacity": 0.3,
        "stroke": "#f87171",
        "strokeWidth": 2,
        "rx": 4
      }
    },
    {
      "type": "annotation",
      "id": "label-additive",
      "position": [210, 245],
      "latex": "3 \\times 4",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 16 }
    },
    {
      "type": "geometricShape",
      "id": "photo-multiplicative",
      "shape": "rectangle",
      "position": [150, 70],
      "width": 160,
      "height": 240,
      "visible": false,
      "style": {
        "fill": "#34d399",
        "fillOpacity": 0.3,
        "stroke": "#34d399",
        "strokeWidth": 2,
        "rx": 4
      }
    },
    {
      "type": "annotation",
      "id": "label-multiplicative",
      "position": [230, 325],
      "latex": "4 \\times 6",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 16 }
    },
    {
      "type": "annotation",
      "id": "narration",
      "position": [200, 380],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 16 }
    },
    {
      "type": "annotation",
      "id": "ratio-display",
      "position": [200, 420],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 20 }
    }
  ]
}
```

### 3.3 Animation Sequence

The hook runs as a single auto-triggered animation sequence. The student does not need to interact -- they watch.

**Timeline (total: ~45 seconds):**

| Time (s) | Action | Duration | Details |
|---|---|---|---|
| 0.0-0.5 | Title fades in | 0.5s | `ease: "easeInOut"`. "Enlarging a Photo" appears at top center. |
| 0.5-2.0 | Original photo appears | 1.5s | A blue rectangle (80x120px = 2:3 ratio) slides in from the left (spring: `damping: 20, stiffness: 300`). A simple stick-figure face SVG is drawn inside the rectangle (proportioned correctly). Label "2 x 3" fades in below. |
| 2.0-4.0 | Hold on original | 2.0s | Student observes the small photo. Narration fades in: "This photo is 2 cm wide and 3 cm tall." |
| 4.0-6.0 | Additive enlargement narration | 2.0s | Narration updates: "To make it bigger, let's add 1 to each side..." The word "add" is colored `#f87171` (red) and bold. |
| 6.0-8.0 | Additive photo appears | 2.0s | A red rectangle (120x160px = 3:4 ratio) slides in from the right (spring: `damping: 20, stiffness: 300`). Same stick-figure face SVG is drawn inside, but now stretched -- the face is visibly WIDER relative to its height. Label "3 x 4" fades in below. The "+1" annotation appears next to each dimension change. |
| 8.0-10.0 | Hold both photos | 2.0s | Both photos visible side by side. Student can compare the shapes. |
| 10.0-12.0 | Overlay animation | 2.0s | The original photo smoothly slides rightward and overlays onto the additive photo (centered). The original is scaled up proportionally to match the additive photo's height (160px). At this scale, the original's width would be ~106px, but the additive photo is 120px wide. The mismatch is visible -- the red rectangle sticks out on both sides. A red X icon (`#f87171`, 28px) appears. |
| 12.0-14.0 | Distortion highlight | 2.0s | The stick-figure face in the additive version wobbles side to side (2 cycles, 300ms each), exaggerating the horizontal stretch. Narration: "The photo looks STRETCHED! The face is wider than it should be." Bold on "STRETCHED" in red. |
| 14.0-16.0 | Ratio comparison | 2.0s | Two ratio labels appear: `2:3 = 0.667` (blue) and `3:4 = 0.750` (red). Narration: "2:3 is not the same ratio as 3:4. Adding doesn't preserve the shape!" |
| 16.0-18.0 | Clear additive photo | 2.0s | The red rectangle and its labels fade out (300ms). The original photo slides back to its starting position. |
| 18.0-20.0 | Multiplicative narration | 2.0s | Narration: "What if we MULTIPLY each side by 2 instead?" The word "multiply" is colored `#34d399` (emerald) and bold. |
| 20.0-22.0 | Multiplicative photo appears | 2.0s | A green rectangle (160x240px = 4:6 ratio) slides in from the right (spring: `damping: 20, stiffness: 300`). Same stick-figure face SVG, perfectly proportioned. Label "4 x 6" fades in below. The "x2" annotation appears next to each dimension change. |
| 22.0-24.0 | Hold both photos | 2.0s | Both photos visible side by side. |
| 24.0-26.0 | Overlay animation | 2.0s | The original photo slides rightward and overlays onto the multiplicative photo (top-left aligned). The original is drawn as a dashed outline at its original size inside the larger rectangle, showing it fits perfectly in the corner with the same proportions. The aspect ratios visibly match. A green checkmark (`#34d399`, 28px) appears. |
| 26.0-28.0 | Perfect match highlight | 2.0s | The dashed outline of the original inside the larger rectangle pulses (`opacity: 0.5 -> 1.0`, 2 cycles at 500ms). Narration: "Same shape, just BIGGER! The ratio 2:3 = 4:6." |
| 28.0-30.0 | Ratio comparison | 2.0s | Two ratio labels appear: `2:3 = 0.667` (blue) and `4:6 = 0.667` (green). Both values glow amber (`#fbbf24`). Narration: "2:3 and 4:6 are the SAME ratio. That's a PROPORTION!" Bold on "PROPORTION" in emerald. |
| 30.0-34.0 | Cross multiplication preview | 4.0s | Below the rectangles, cross-multiplication appears: `2 \times 6 = 12` and `3 \times 4 = 12`. Both products glow amber. Narration: "There's a quick test: cross multiply. If the products are equal, the ratios are equal." |
| 34.0-38.0 | Additive failure cross-check | 4.0s | Brief flash: `2 \times 4 = 8` vs `3 \times 3 = 9` (from the 2:3 vs 3:4 additive attempt). The `8 \neq 9` is shown in red. Narration: "The additive version? 8 does not equal 9. NOT a proportion." |
| 38.0-42.0 | Final hold | 4.0s | Everything holds on the successful multiplicative version with the proportion equation. The student absorbs. |

**Continue button**: Appears at `t = 16.0s` (after the distortion reveal), positioned bottom-right, 48x48px touch target, subtle fade-in (`opacity: 0 -> 1` over 500ms). The button does NOT interrupt the animation -- the hook continues playing while the button is available. If the student taps Continue before the hook finishes, the animation stops gracefully (all objects snap to their final states over 200ms).

### 3.4 Visual Design Details

- **Title text**: `#e2e8f0` (slate-200) on dark backgrounds. Font: system sans-serif. 22px.
- **Original photo**: `#818cf8` (indigo-400) border and 30% opacity fill -- same as NO-1.5 for continuity.
- **Additive (wrong) photo**: `#f87171` (red-400) border and 30% opacity fill -- error color signals problem.
- **Multiplicative (correct) photo**: `#34d399` (emerald-400) border and 30% opacity fill -- correct color signals success.
- **Narration text**: `#e2e8f0` (slate-200), 16px. Keywords are colored and bolded via KaTeX `\textcolor{}` and `\textbf{}`.
- **Ratio labels**: 20px, color-coded to match their respective rectangles.
- **Background**: Inherits from app theme (dark: `#0f172a` slate-900, light: `#f8fafc` slate-50).

### 3.5 Sound Design

| Moment | Sound | Duration | Notes |
|---|---|---|---|
| Original photo appears | Soft "pop" | 150ms | Establishes the object. |
| Additive photo stretches | Low "creak" / stretch sound | 300ms | Signals distortion. Something is wrong. |
| Red X appears | Error buzz (low "bzzt") | 150ms | Gentle, not punitive. |
| Multiplicative photo appears | Satisfying "pop" (higher pitch) | 200ms | Positive signal. |
| Green checkmark appears | Discovery chime (rising two-note) | 400ms | Same as platform-wide "insight" cue. |
| Cross multiply equal | Gentle "ding-ding" (matched pair) | 300ms | Two matching tones signal equality. |

All sounds respect the `soundEnabled` user preference. Sounds are loaded as 22kHz mono WAV files, <10KB each, cached by service worker.

### 3.6 Gamification: Hook XP

No XP is awarded for watching the hook. The hook's purpose is activation of curiosity and the reward-prediction system, not assessment. Watching the full hook (>30s without skipping) is tracked in analytics for pedagogical review but has no gamification consequence.

---

## 4. Stage 2 -- Spatial Experience (3-4 min)

### 4.1 Overview

The spatial experience is split into two workspaces that the student navigates via tabs (or swipe): **Workspace A: Scaling Rectangles** and **Workspace B: Double Number Line**. Both models reinforce the same core concept -- proportions are multiplicative relationships -- through different spatial representations.

**Minimum interaction count**: 10 distinct interactions before the "Continue to Guided Discovery" button activates. An "interaction" is defined as: dragging a rectangle corner to scale, toggling ratio equivalence check, moving markers on the double number line, or tapping to add a new equivalent ratio. This ensures genuine manipulation (PF-3: Embodied Cognition) rather than click-through behavior.

**Interaction counter**: Displayed as a subtle progress ring around the Continue button (not as a number). The ring fills as the student interacts. At 10 interactions the ring completes and the button glows softly.

### 4.2 Layout

```
Desktop (>=768px):
┌──────────────────────────────────────────────────────┐
│  [Tab: Scaling Rectangles]  [Tab: Double Number Line] │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─ Workspace A: Scaling Rectangles ──────────────┐  │
│  │                                                  │  │
│  │  Base Ratio:  W [stepper] : H [stepper]         │  │
│  │  ┌──────────────────┐                            │  │
│  │  │                  │  ← Original rectangle      │  │
│  │  │   2 : 3          │    (blue outline)          │  │
│  │  │                  │                            │  │
│  │  └──────────────────┘                            │  │
│  │                                                  │  │
│  │  ┌──────────────────────────┐                    │  │
│  │  │                          │  ← Scaled          │  │
│  │  │   4 : 6                  │    rectangle       │  │
│  │  │   [drag corner to scale] │    (draggable)     │  │
│  │  │                          │                    │  │
│  │  └──────────────────────────┘                    │  │
│  │                                                  │  │
│  │  Ratio: 4:6  ✓ Same shape!  Cross: 2×6=12 3×4=12│  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                       │
│  [Continue button with progress ring]                 │
└──────────────────────────────────────────────────────┘

Mobile (<768px):
Same layout but single column, rectangles stacked vertically,
stepper controls above rectangles, full-width.
```

### 4.3 Workspace A: Scaling Rectangles

#### 4.3.1 Base Ratio Controls

A ratio picker for the base (reference) rectangle. It consists of:
- **Width stepper**: Two buttons (- and +) flanking a number display. Range: 1 to 10. Touch target: 48px per button.
- **Height stepper**: Two buttons (- and +) flanking a number display. Range: 1 to 10. Touch target: 48px per button.
- **Visual**: The ratio is displayed between the steppers as `W : H` with a colon separator, updating in real time.
- **Default values**: Width = 2, Height = 3 (matching the hook for continuity).

#### 4.3.2 Original Rectangle Rendering

The original (base) rectangle is rendered as a fixed-size reference:
- **Max dimension**: Scaled so the larger dimension = 100px. The other dimension is computed to maintain the ratio. For 2:3, width = 67px, height = 100px.
- **Border**: `#818cf8` (indigo-400), 2px solid. Fill: `#818cf8` at 15% opacity.
- **Label**: Centered inside the rectangle, showing `W : H` (e.g., "2 : 3") in `#e2e8f0`, 16px.
- **Position**: Fixed at left side of workspace.

#### 4.3.3 Scaled Rectangle (Draggable)

The scaled rectangle starts as a copy of the original (same ratio) and can be resized by dragging its bottom-right corner.

**Drag behavior** (via `@use-gesture/react` `useDrag`):
- The student drags the bottom-right corner handle (a 20px circle with `#fbbf24` fill, 44px touch target).
- As the student drags, the rectangle resizes in real time.
- **Constrained mode** (default, toggled on): Dragging locks the aspect ratio -- both width and height scale together proportionally. The rectangle always maintains the base ratio. The ratio label shows the current equivalent ratio in whole numbers when possible (e.g., dragging 2:3 larger shows "4:6", "6:9", "8:12" at grid snap points).
- **Free mode** (toggled off): Dragging allows independent width/height change. The ratio readout updates in real time. When the ratio does NOT match the base, the rectangle border turns `#f87171` (red) and a "Different shape!" label appears. When it DOES match, the border turns `#34d399` (emerald) and "Same shape!" appears.
- **Toggle switch**: "Lock ratio" toggle, 48px touch target, positioned above the scaled rectangle. Default: ON. When toggled off, narration hint: "Try dragging freely -- can you find a size that matches the original shape?"
- **Grid snap**: In constrained mode, the rectangle snaps to integer multiples of the base ratio (1x, 2x, 3x, 4x, 5x scale factors). Snap spring: `damping: 20, stiffness: 300`. In free mode, snaps to integer width/height values.

**Rendering**:
- **Border**: Dynamic color -- `#34d399` (emerald) when ratio matches base, `#f87171` (red) when it does not, `#fbbf24` (amber) while actively dragging.
- **Fill**: Same color as border at 15% opacity.
- **Label**: Centered inside, showing `W : H` (current dimensions). Font: 16px.
- **Drag handle**: Bottom-right corner, 20px circle, `#fbbf24` fill, with a subtle pulse animation (scale 1.0 -> 1.1 -> 1.0, 2s cycle) when idle to signal interactivity.

#### 4.3.4 Ratio Comparison Display

Below both rectangles, a comparison panel shows:
- **Base ratio**: e.g., "2 : 3" in indigo.
- **Scaled ratio**: e.g., "4 : 6" in emerald (if matching) or red (if not matching).
- **Scale factor**: "x2" (when matching) in amber. Hidden when not matching.
- **Cross multiplication check**: `2 x 6 = 12` and `3 x 4 = 12` with both products shown. Products are colored `#34d399` when equal, `#f87171` when unequal.
- **Shape match indicator**: Checkmark + "Same shape! This is a proportion." or X + "Different shape! Not a proportion."

The cross multiplication values animate (counter increments from 0 to the product over 400ms) each time the ratio changes.

#### 4.3.5 Overlap Comparison

A "Compare" button (48px height, `#60a5fa` fill, white text) is positioned between the two rectangles.

**Behavior when pressed**:
1. The original rectangle smoothly slides rightward and overlays onto the scaled rectangle (spring: `damping: 20, stiffness: 300`). The original is proportionally scaled up to match the scaled rectangle's height.
2. If the ratios match: the outlines perfectly overlap. A green glow pulse appears around the combined shape (800ms). Label: "Perfect match!"
3. If the ratios do NOT match: the outlines visibly do not align. The parts that stick out are highlighted in red. Label: "Not the same shape."
4. After 3 seconds, the original slides back to its starting position.

#### 4.3.6 Scene Definition

```json
{
  "id": "NO-1.5a-spatial-rectangles",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 420],
  "objects": [
    {
      "type": "geometricShape",
      "id": "rect-original",
      "shape": "rectangle",
      "position": [30, 60],
      "width": 67,
      "height": 100,
      "style": {
        "fill": "#818cf8",
        "fillOpacity": 0.15,
        "stroke": "#818cf8",
        "strokeWidth": 2,
        "rx": 4
      }
    },
    {
      "type": "annotation",
      "id": "label-original-ratio",
      "position": [63, 110],
      "latex": "2:3",
      "anchor": "center",
      "style": { "fontSize": 16 }
    },
    {
      "type": "geometricShape",
      "id": "rect-scaled",
      "shape": "rectangle",
      "position": [180, 60],
      "width": 134,
      "height": 200,
      "draggable": true,
      "dragHandle": "bottom-right",
      "style": {
        "fill": "#34d399",
        "fillOpacity": 0.15,
        "stroke": "#34d399",
        "strokeWidth": 2,
        "rx": 4
      }
    },
    {
      "type": "annotation",
      "id": "label-scaled-ratio",
      "position": [247, 160],
      "latex": "4:6",
      "anchor": "center",
      "style": { "fontSize": 16 }
    },
    {
      "type": "annotation",
      "id": "cross-multiply-display",
      "position": [200, 340],
      "latex": "2 \\times 6 = 12 \\quad 3 \\times 4 = 12",
      "anchor": "center",
      "visible": true,
      "style": { "fontSize": 16 }
    },
    {
      "type": "annotation",
      "id": "match-indicator",
      "position": [200, 380],
      "latex": "\\text{Same shape! This is a proportion.}",
      "anchor": "center",
      "style": { "fontSize": 14 }
    }
  ]
}
```

### 4.4 Workspace B: Double Number Line

#### 4.4.1 Overview

The double number line shows two parallel horizontal number lines. The top line represents one quantity in the ratio, the bottom line represents the other. Equivalent ratios appear as vertically aligned pairs of markers. This model is reused from NO-1.5 but now extended with interactive marker placement for discovering proportions.

#### 4.4.2 Layout

```
┌─ Double Number Line ────────────────────────────────┐
│                                                      │
│  Top line (quantity A):                              │
│  0────2────4────6────8────10───12                    │
│       │         │              │                     │
│       ▼         ▼              ▼     ← aligned      │
│  0────3────6────9────12───15───18     markers        │
│  Bottom line (quantity B):                           │
│                                                      │
│  Ratio pairs: 2:3, 4:6, 6:9, ...                   │
│                                                      │
│  [Add marker]  [Clear]  [Change ratio: W:H]         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### 4.4.3 Number Line Rendering

Two horizontal SVG lines, each 320px wide (desktop) / full container width minus 32px (mobile):
- **Top line**: `#818cf8` (indigo-400), 2px. Labeled "Quantity A" or the custom label (e.g., "Width"). Tick marks every unit, labeled at every interval matching the base ratio's first value.
- **Bottom line**: `#a78bfa` (violet-400), 2px. Positioned 80px below the top line. Labeled "Quantity B" or the custom label (e.g., "Height"). Tick marks every unit, labeled at every interval matching the base ratio's second value.
- **Scale**: Both lines start at 0. The top line extends to `baseRatioA * 6` (e.g., for 2:3, top goes to 12). The bottom line extends to `baseRatioB * 6` (e.g., for 2:3, bottom goes to 18). Both lines are the same pixel width, meaning the unit spacing differs between lines (this is the key visual -- equivalent ratios line up vertically ONLY because the scales are different).
- **Tick marks**: `#64748b`, 8px tall, 1px wide. Major ticks (at base ratio multiples) are 12px tall and 1.5px wide.

#### 4.4.4 Marker Placement

**Pre-placed markers**: The first equivalent ratio pair (e.g., 2:3) is pre-placed as a vertical pair of colored dots connected by a dashed vertical line (`#fbbf24`, amber, 1px, dash `4 4`).

**"Add marker" button**: Touch target 48px. When pressed:
1. A new marker pair appears at the next equivalent ratio (e.g., 4:6, then 6:9, etc.).
2. The marker dots (top: indigo, bottom: violet, both 10px diameter) slide in from the left edge to their positions (spring: `damping: 20, stiffness: 300`).
3. A vertical dashed line connects them.
4. The ratio label appears below: "4:6" in a rounded badge (`#1e293b` background, `#e2e8f0` text, border-radius 8px).
5. Up to 6 marker pairs can be added (at 1x through 6x the base ratio).

**Drag-to-explore mode**: The student can drag any marker dot horizontally along its number line. As they drag:
- The marker snaps to tick marks (spring snap: `damping: 25, stiffness: 200`).
- If the top marker is at a value that forms an equivalent ratio with the bottom marker's current position, the connecting dashed line turns emerald (`#34d399`) and a checkmark appears.
- If the values do NOT form an equivalent ratio, the line turns red (`#f87171`) and an X appears.
- The ratio readout updates in real time: e.g., "5 : 7 -- Not a proportion with 2:3."

**Clear button**: Removes all markers except the original pair. Fade-out animation (300ms).

#### 4.4.5 Interactions

| Interaction | Input | Visual Feedback | State Change |
|---|---|---|---|
| Change base ratio width | Stepper tap (+/-) | Both number lines rescale, markers reposition | `baseRatio` state |
| Change base ratio height | Stepper tap (+/-) | Both number lines rescale, markers reposition | `baseRatio` state |
| Add marker pair | Tap "Add marker" | New dot pair slides in with connecting line | `markers` array grows |
| Drag marker on top line | @use-gesture drag (horizontal) | Dot follows finger, ratio label updates, line color changes | `markerPosition` state |
| Drag marker on bottom line | @use-gesture drag (horizontal) | Dot follows finger, ratio label updates, line color changes | `markerPosition` state |
| Compare overlay (Workspace A) | Tap "Compare" | Original slides onto scaled, overlap check | No persistent state |
| Drag rectangle corner (Workspace A) | @use-gesture drag (2D) | Rectangle resizes, ratio updates, color changes | `scaledRect` state |
| Toggle ratio lock (Workspace A) | Tap toggle | Switch between constrained/free scaling | `lockRatio` boolean |

#### 4.4.6 Scene Definition

```json
{
  "id": "NO-1.5a-spatial-double-number-line",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 300],
  "objects": [
    {
      "type": "group",
      "id": "top-number-line",
      "children": [
        {
          "type": "annotation",
          "id": "top-label",
          "position": [10, 60],
          "latex": "\\text{Width}",
          "anchor": "start",
          "style": { "fontSize": 14 }
        },
        {
          "type": "geometricShape",
          "id": "top-line",
          "shape": "line",
          "from": [40, 80],
          "to": [380, 80],
          "style": { "stroke": "#818cf8", "strokeWidth": 2 }
        }
      ]
    },
    {
      "type": "group",
      "id": "bottom-number-line",
      "children": [
        {
          "type": "annotation",
          "id": "bottom-label",
          "position": [10, 140],
          "latex": "\\text{Height}",
          "anchor": "start",
          "style": { "fontSize": 14 }
        },
        {
          "type": "geometricShape",
          "id": "bottom-line",
          "shape": "line",
          "from": [40, 160],
          "to": [380, 160],
          "style": { "stroke": "#a78bfa", "strokeWidth": 2 }
        }
      ]
    },
    {
      "type": "group",
      "id": "marker-pair-1",
      "children": [
        {
          "type": "geometricShape",
          "id": "marker-top-1",
          "shape": "circle",
          "center": [97, 80],
          "radius": 6,
          "style": { "fill": "#818cf8" }
        },
        {
          "type": "geometricShape",
          "id": "marker-bottom-1",
          "shape": "circle",
          "center": [97, 160],
          "radius": 6,
          "style": { "fill": "#a78bfa" }
        },
        {
          "type": "geometricShape",
          "id": "connector-1",
          "shape": "line",
          "from": [97, 86],
          "to": [97, 154],
          "style": {
            "stroke": "#fbbf24",
            "strokeWidth": 1,
            "strokeDasharray": "4 4"
          }
        }
      ]
    },
    {
      "type": "annotation",
      "id": "ratio-badges",
      "position": [200, 220],
      "latex": "2:3",
      "anchor": "center",
      "style": { "fontSize": 14 }
    }
  ]
}
```

### 4.5 Interaction Tracking

Each of these actions increments the interaction counter:

1. Changing the base ratio's width or height (+1 per change).
2. Dragging the scaled rectangle's corner to a new snap point (+1 per snap).
3. Toggling the ratio lock on/off (+1, max 2 counted).
4. Pressing "Compare" (+1 per press).
5. Adding a marker pair on the double number line (+1 per marker).
6. Dragging a marker on either number line to a new position (+1 per snap).
7. Switching between Workspace A and Workspace B tabs (+1, max 2 counted).

The counter does NOT increment for:
- Tapping a disabled button.
- Changing a value to the same value.
- Rapid repeated taps on the same stepper (debounced at 200ms).
- Dragging without reaching a new snap point.

**Exploration diversity tracking** (for XP bonus, not shown to student):
```typescript
interface ExplorationMetrics {
  uniqueBaseRatios: Set<string>;           // "2:3", "3:5", etc.
  uniqueScaleFactors: Set<number>;         // 1, 2, 3, 4, 5
  freeModeMismatches: number;              // how many non-proportional ratios explored
  freeModeMatchesFound: number;            // how many proportional ratios found in free mode
  markerPairsAdded: number;                // double number line markers
  markersDragged: number;                  // manual exploration on double number line
  compareButtonUsed: boolean;              // overlap comparison used
  doubleNumberLineUsed: boolean;           // visited Workspace B
  totalTimeSpentMs: number;
}
```

If `uniqueScaleFactors.size >= 3` AND `doubleNumberLineUsed` AND `freeModeMismatches >= 2`: "exploration bonus" = 40 XP.
If `uniqueScaleFactors.size >= 2` AND `markerPairsAdded >= 2`: "exploration bonus" = 20 XP.
Otherwise: 0 bonus.

### 4.6 Mobile Adaptations

- **< 768px width**: Tabs become a swipeable header. Each workspace takes full viewport width. The ratio picker stacks horizontally above the rectangles.
- **< 400px width**: Rectangle max dimension reduces from 100px to 80px for the original. Scaled rectangle is capped at 280px. Double number line reduces to full width minus 24px. Stepper buttons increase to 48px for fat-finger accommodation.
- **Landscape mobile**: Workspace A shows ratio picker to the left, rectangles to the right (side by side). Double number line occupies full width.
- **Touch behavior**: All tap targets >= 44x44px. Stepper buttons have 48px touch areas. Drag handle for rectangle corner has 44px touch area. Marker dots on double number line have 44px touch area (visual dot is 12px but touch target extends to 44px).

---

## 5. Stage 3 -- Guided Discovery (4-5 min)

### 5.1 Prompt Sequence

The guided discovery stage presents 5 prompts. The spatial models from Stage 2 remain visible and interactive. The prompts guide the student through discovering WHY proportions work multiplicatively, how cross multiplication tests equality, and how to solve for a missing value.

#### Prompt 1: Additive vs Multiplicative (The Key Distinction)

**Setup**: Workspace A is visible. Base ratio = 2:3. Ratio lock is OFF (free mode). The scaled rectangle starts at 3:4 (the additive "+1" result from the hook).

**Prompt text**: "The rectangle below has width 3 and height 4 -- we added 1 to each dimension. Does it look like the SAME SHAPE as 2:3? Now try multiplying each part by 2 instead (width 4, height 6). Which one matches?"

**Expected insight**: Adding the same number does NOT preserve the ratio. Multiplying by the same number DOES.

**Visual support**: The scaled rectangle starts at 3:4 with a red border ("Different shape!"). The cross multiplication display shows `2 x 4 = 8` and `3 x 3 = 9` -- unequal, in red. The student is expected to drag the rectangle to 4:6 (or use steppers). When they reach 4:6, the border turns green, cross multiplication shows `2 x 6 = 12` and `3 x 4 = 12` -- equal, in emerald. A brief overlay comparison confirms perfect shape match.

**Auto-response trigger**: When the student achieves a matching ratio (border turns green):
- AI tutor: "See the difference? Adding 1 to both sides gave you 3:4, which is a DIFFERENT shape. But multiplying both by 2 gave you 4:6 -- the SAME shape. Ratios are about MULTIPLICATION, not addition. This is the most important thing about proportions."
- The word "multiplication" is colored emerald, "addition" is colored red.

**Button text**: "I see it!"

#### Prompt 2: Recognizing Equivalent Ratios on the Double Number Line

**Setup**: Switch to Workspace B (Double Number Line). Base ratio = 2:3. One marker pair at 2:3 is pre-placed.

**Prompt text**: "Add more markers to the double number line. Notice how equivalent ratios line up vertically. Can you find all the equivalent ratios up to 12:18?"

**Expected interaction**:
1. Student adds marker pairs by pressing "Add marker" repeatedly.
2. Markers appear at 4:6, 6:9, 8:12, 10:15, 12:18.
3. All connecting lines are emerald (vertical alignment = equivalent ratio).

**Auto-response trigger**: When at least 4 marker pairs are placed:
- Annotation: "All these ratios are EQUIVALENT -- they're all different ways to say 2:3!"
- AI tutor: "Notice the pattern: 2, 4, 6, 8, 10, 12 on top. 3, 6, 9, 12, 15, 18 on bottom. Each pair is a MULTIPLE of 2:3. The double number line makes this beautifully visible -- equivalent ratios always line up vertically."
- A brief animation draws horizontal arrows labeled "x2", "x3", "x4" between consecutive markers on the top line, and matching arrows on the bottom line.

**Button text**: "I see it!"

#### Prompt 3: The Cross Multiplication Test

**Setup**: Switch back to Workspace A. Two test cases are presented:
- Test 1: Is 3:5 proportional to 6:10?
- Test 2: Is 3:5 proportional to 5:8?

**Prompt text**: "How can you QUICKLY test if two ratios form a proportion without drawing rectangles? Look at the cross multiplication display below the rectangles. What do you notice when the ratios ARE equal vs when they're NOT?"

**Expected insight**: Cross multiplication produces equal products when ratios are proportional, unequal products when they are not.

**Visual support**: The workspace displays two side-by-side comparisons:
- Left: Rectangles for 3:5 and 6:10. Cross products: `3 x 10 = 30` and `5 x 6 = 30`. Both in emerald. Checkmark.
- Right: Rectangles for 3:5 and 5:8. Cross products: `3 x 8 = 24` and `5 x 5 = 25`. In red. X mark.

Animated crossing arrows draw from the first ratio's numerator to the second ratio's denominator, and vice versa, showing which numbers are multiplied together. Arrows are color-coded: amber during the "crossing", then emerald or red on result.

**Auto-response trigger**: When the student taps "I see it!":
- AI tutor: "Cross multiplication is the shortcut! For a/b = c/d, you check if a x d equals b x c. If the cross products are equal, the ratios form a proportion. This works because of how equivalent fractions work -- it's the same math underneath."

**Button text**: "Got it!"

#### Prompt 4: Solving for the Missing Value

**Setup**: A new interactive panel appears. A proportion is displayed with a missing value: `2/3 = x/9`. A scaled rectangle pair is shown: the original is 2:3, and the target has a height of 9 but unknown width (shown as a "?" rectangle with a dashed outline).

**Prompt text**: "If 2:3 = ?:9, what number completes the proportion? Look at the rectangles -- the height tripled from 3 to 9. What must happen to the width?"

**Expected insight**: If the height is multiplied by 3, the width must also be multiplied by 3. So ? = 6. Alternatively, cross multiply: 2 x 9 = 3 x ?, so 18 = 3?, so ? = 6.

**Visual support**:
1. The original rectangle (2:3) is shown with its dimensions labeled.
2. The target rectangle has height 9 labeled, width shown as "?" with a dashed outline.
3. An arrow from the original's height (3) to the target's height (9) is labeled "x3" in amber.
4. A matching arrow from the original's width (2) to the target's width ("?") shows "x3" in amber with a pulsing "?" overlay.
5. Below: cross multiplication setup: `2 x 9 = 18` and `3 x ? = 18`, leading to `? = 18 / 3 = 6`.

**Interactive element**: The student inputs their answer via a numeric stepper (range 1-20, 48px buttons). When they set the value to 6:
1. The dashed outline fills in with emerald border.
2. The "?" transforms to "6" with a spring pop animation.
3. The target rectangle renders as 6:9 with emerald fill.
4. Overlay comparison confirms the shapes match.

**Auto-response trigger**: When the correct value (6) is entered:
- AI tutor: "6 is right! The height went from 3 to 9 -- that's times 3. So the width must also go times 3: 2 x 3 = 6. You can also cross multiply: 2 x 9 = 18, and 3 x ? = 18, so ? = 6. Both methods give the same answer!"

**Button text**: "Makes sense!"

#### Prompt 5: A Harder Proportion to Solve

**Prompt text**: "Now try this one: 4/5 = ?/15. Use whichever method you prefer -- scale factor or cross multiplication."

**Visual support**: The original rectangle is 4:5. The target has height 15. An arrow shows "x3" from 5 to 15.

**Interactive element**: Numeric stepper (range 1-30). Correct answer: 12.

When the student enters 12:
1. Rectangle fills in at 12:15, emerald border.
2. Cross multiplication confirms: `4 x 15 = 60` and `5 x 12 = 60`.
3. Overlay comparison shows perfect match.

**Auto-response trigger**:
- AI tutor: "12 is correct! 5 x 3 = 15, so 4 x 3 = 12. Cross check: 4 x 15 = 60, 5 x 12 = 60. Both methods confirm it. You've got proportional reasoning down!"

If the student enters the wrong answer:
- The rectangle renders with red border. The shapes visibly do not match.
- Hint after 15s: "The height went from 5 to 15. What did you multiply 5 by to get 15?"
- Second hint after 30s: "5 x 3 = 15, so the scale factor is 3. What is 4 x 3?"

**Button text**: "I've got it!"

### 5.2 Discovery Scoring

Guided discovery insights contribute to XP:
- Finding the additive-vs-multiplicative distinction (Prompt 1) without AI hints: 15 XP bonus (`guided_discovery_insight`).
- Correctly solving the first missing value (Prompt 4) on first attempt: 15 XP bonus.
- Correctly solving the harder proportion (Prompt 5) on first attempt: 10 XP bonus.

### 5.3 State Persistence

If the student leaves and returns mid-discovery, the state is persisted in the lesson store (Zustand + IndexedDB via Dexie.js):
```typescript
interface DiscoveryState {
  currentPromptIndex: number;     // 0-4
  promptResponses: Array<{
    promptId: string;
    acknowledged: boolean;
    timeSpentMs: number;
    hintsUsed: number;
    attemptsForNumericInput: number;
  }>;
  additiveVsMultiplicativeDiscovered: boolean;
  crossMultiplicationUnderstood: boolean;
  solvingMethodPreferred: "scale-factor" | "cross-multiply" | "unknown";
}
```

---

## 6. Stage 4 -- Symbol Bridge (2-3 min)

### 6.1 Overview

The symbol bridge formally introduces the three key formulas/notations for proportions by overlaying symbolic notation onto the spatial models from Stages 2 and 3. Every symbol is anchored to a visual element.

### 6.2 Scene Design

The symbol bridge is divided into three steps, presented sequentially.

#### 6.2.1 Step 1: Proportion Notation (0:00-0:50)

**Animation sequence**:

1. (0:00-0:10) The two matched rectangles from Stage 2 appear: 2:3 and 4:6. Both have emerald borders (matching shapes). The notation begins to appear to the right:
   ```
   2:3 = 4:6
   ```
   in large type (24px), white.

2. (0:10-0:25) The ratio notation transforms into fraction notation:
   ```
   2/3 = 4/6
   ```
   An annotation fades in: "A proportion is an equation that says two ratios are equal." The `2/3` is colored `#818cf8` (indigo) with an arrow drawing from it to the original rectangle. The `4/6` is colored `#34d399` (emerald) with an arrow to the scaled rectangle.

3. (0:25-0:40) The general form fades in below:
   ```
   a/b = c/d
   ```
   Annotation: "This reads: 'a is to b as c is to d.'"

4. (0:40-0:50) A visual equivalence chain appears:
   ```
   2:3 = 4:6 = 6:9 = 8:12
   ```
   Each ratio appears with a brief spring pop (200ms stagger). An arrow labeled with the scale factor ("x2", "x3", "x4") connects the base ratio to each equivalent. Colors cycle through indigo shades.

**KaTeX rendering**: Uses `\textcolor{}` for color coding throughout.

#### 6.2.2 Step 2: Cross Multiplication (0:50-1:40)

1. (0:50-1:00) A proportion appears:
   ```
   2/3 = 4/6
   ```
   Both fractions are inside colored boxes (indigo and emerald).

2. (1:00-1:15) Crossing arrows animate:
   - An amber arrow draws from `2` (top-left) diagonally to `6` (bottom-right). Label: `2 x 6 = 12`.
   - An amber arrow draws from `3` (bottom-left) diagonally to `4` (top-right). Label: `3 x 4 = 12`.
   - The arrows physically cross in the middle, forming an "X" shape. This is why it is called "cross multiplication."

3. (1:15-1:25) Both products (`12` and `12`) glow amber, then merge into a single emerald "=" sign in the center. Annotation: "Equal cross products = proportion confirmed!"

4. (1:25-1:40) General formula fades in:
   ```
   If a/b = c/d, then a x d = b x c
   ```
   Below: "Cross products are equal when ratios are proportional."

   A counter-example briefly flashes:
   ```
   2/3 ≠ 3/4  because  2 x 4 = 8  but  3 x 3 = 9
   ```
   The `8` and `9` are colored red with a `≠` between them.

#### 6.2.3 Step 3: Solving Proportions (1:40-2:40)

1. (1:40-1:55) A proportion with a missing value appears:
   ```
   3/5 = x/20
   ```
   The `x` pulses gently in amber, signaling "find me."

2. (1:55-2:10) Cross multiplication step-by-step:
   ```
   3 x 20 = 5 x x
   60 = 5x
   ```
   Each line appears with a 1.5s delay. Arrows show the crossing.

3. (2:10-2:25) Solving step:
   ```
   x = 60 / 5
   x = 12
   ```
   The `x = 12` is highlighted in emerald. The proportion rewrites itself:
   ```
   3/5 = 12/20
   ```
   A checkmark appears. Cross-check: `3 x 20 = 60, 5 x 12 = 60`. Both 60s glow amber.

4. (2:25-2:40) The rectangles from Stage 2 reappear briefly: a 3:5 rectangle and a 12:20 rectangle. Overlay confirms they are the same shape. Annotation: "Same shape, different size. The proportion holds."

   General solving procedure fades in:
   ```
   To solve a/b = c/d for any unknown:
   1. Cross multiply: a x d = b x c
   2. Solve the equation for the unknown
   ```

### 6.3 Animation Specifications

All animations in this stage use Framer Motion:
- Arrow draw: `pathLength` animation from 0 to 1, duration 300ms, `ease: "easeInOut"`.
- Crossfade: `AnimatePresence` with `mode="wait"`, exit opacity 0 (150ms), enter opacity 1 (150ms).
- Color transitions: `animate={{ color: newColor }}`, duration 300ms.
- Spring pop for ratio chain: spring: `damping: 15, stiffness: 400`, 200ms stagger.
- Crossing arrows: Two separate `pathLength` animations, first arrow 0-1 over 400ms, second arrow 0-1 over 400ms with 200ms delay.
- Rectangle overlay: Reuse compare animation from Stage 2 (spring: `damping: 20, stiffness: 300`).

**Continue Trigger**: All three steps revealed. Button appears at bottom.

---

## 7. Stage 5 -- Real-World Anchor (1-2 min)

### 7.1 Four Real-World Contexts

Each example is presented as a card with an illustration and a proportion connection. The student swipes through them (mobile) or clicks arrows (desktop).

#### 7.1.1 Recipe Scaling

**Illustration**: A stylized mixing bowl SVG with ingredient labels and a measuring cup.

**Text**: "A recipe uses 2 cups of flour for 3 cups of milk. If you need 9 cups of milk, how much flour do you need?"

**Interactive element**: A double number line shows flour (top, 0-6) and milk (bottom, 0-9). Pre-placed marker at 2:3. Student taps "Add marker" to find 4:6 and 6:9. The answer (6 cups flour) is highlighted.

**Proportion connection**: "2/3 = 6/9. The recipe SCALES -- triple the milk means triple the flour."

**Highlighted math**: Equivalent ratios, scale factor x3.

#### 7.1.2 Map Distances

**Illustration**: A simplified SVG map with a scale bar showing "1 cm = 5 km."

**Text**: "On a map, 1 cm represents 5 km. Two cities are 3.4 cm apart on the map. How far apart are they really?"

**Interactive element**: A proportion is shown: `1/5 = 3.4/x`. Cross multiplication is animated: `1 x x = 5 x 3.4`, so `x = 17 km`. A ruler SVG shows the 3.4 cm measurement expanding to a road showing 17 km.

**Proportion connection**: "1/5 = 3.4/17. Map scales are proportions!"

**Highlighted math**: Solving a proportion with a decimal value.

#### 7.1.3 Video Game Aspect Ratio

**Illustration**: A monitor SVG with a game displayed, showing the 16:9 aspect ratio grid.

**Text**: "Your game runs at 16:9 aspect ratio. If the width is 1920 pixels, what's the height?"

**Interactive element**: Two rectangles appear: a small 16:9 reference and a large rectangle showing 1920 width with "?" height. Cross multiply: `16/9 = 1920/x`, so `16x = 17280`, so `x = 1080`. The "?" transforms to "1080" with a pop animation. The rectangle fills in as a 1920x1080 display.

**Proportion connection**: "16/9 = 1920/1080. That's why your monitor is called '1080p' -- it's the proportional height for a 16:9 display at 1920 width!"

**Highlighted math**: Solving for missing value, real-world proportion.

#### 7.1.4 Sports Statistics

**Illustration**: A basketball SVG with a scoreboard showing shot statistics.

**Text**: "Player A makes 3 out of every 5 free throws. In a game with 20 free throw attempts, how many would you expect her to make?"

**Interactive element**: A proportion is shown: `3/5 = x/20`. Scale factor arrow: "x4". So `x = 12`. A basketball hoop animation shows 12 balls going in and 8 bouncing off the rim.

**Proportion connection**: "3/5 = 12/20. Proportional reasoning predicts performance!"

**Highlighted math**: Proportion in probability context, scale factor method.

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
- All answers use multiple choice, tap-to-select, numeric input (single integer, exact match), or drag-to-arrange.

### 8.2 Layer 0 -- Recall (3 problems)

#### Problem R1: Identify a Proportion

**Type**: `multiple-choice`
**Difficulty B**: -1.0 (easy)
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "Which of the following is a PROPORTION?",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "2:3 = 4:6", "correct": true },
    { "id": "b", "text": "2:3 = 3:4", "correct": false },
    { "id": "c", "text": "2 + 3 = 5", "correct": false },
    { "id": "d", "text": "2:3 > 4:6", "correct": false }
  ],
  "feedback": {
    "correct": "Right! 2:3 = 4:6 is a proportion because both ratios are equivalent. You can check: 2 x 6 = 12 and 3 x 4 = 12. Equal cross products!",
    "incorrect_b": "2:3 and 3:4 are NOT equivalent ratios. Check: 2 x 4 = 8 but 3 x 3 = 9. Since 8 does not equal 9, this is not a proportion.",
    "incorrect_c": "2 + 3 = 5 is an addition equation, not a proportion. A proportion is a statement that two RATIOS are equal, like a:b = c:d.",
    "incorrect_d": "2:3 and 4:6 are actually EQUAL, not one greater than the other. 2/3 = 4/6 = 0.667. They are the same ratio."
  }
}
```

#### Problem R2: What Does Cross Multiplication Test?

**Type**: `multiple-choice`
**Difficulty B**: -0.5 (easy)
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "Cross multiplication is used to:",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "Add two fractions together", "correct": false },
    { "id": "b", "text": "Test if two ratios form a proportion", "correct": true },
    { "id": "c", "text": "Find the greatest common factor", "correct": false },
    { "id": "d", "text": "Simplify a fraction", "correct": false }
  ],
  "feedback": {
    "correct": "Exactly! Cross multiplication tests whether two ratios are equal. If a/b = c/d, then a x d = b x c. Equal cross products means it IS a proportion.",
    "incorrect_a": "Adding fractions requires common denominators (from NO-1.4a). Cross multiplication is about testing ratio EQUALITY, not adding fractions.",
    "incorrect_c": "The GCF is found using the Euclidean algorithm (from NT-2.3). Cross multiplication is specifically for testing whether two ratios form a proportion.",
    "incorrect_d": "Simplifying a fraction means dividing numerator and denominator by their GCF. Cross multiplication compares two ratios by checking if their cross products are equal."
  }
}
```

#### Problem R3: Identify the Scale Factor

**Type**: `multiple-choice`
**Difficulty B**: -0.5 (easy)
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "In the proportion 3:7 = 9:21, what is the scale factor from the first ratio to the second?",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "x2", "correct": false },
    { "id": "b", "text": "x3", "correct": true },
    { "id": "c", "text": "x6", "correct": false },
    { "id": "d", "text": "+6", "correct": false }
  ],
  "feedback": {
    "correct": "Right! 3 x 3 = 9 and 7 x 3 = 21. Both parts of the ratio are multiplied by 3. The scale factor is x3.",
    "incorrect_a": "Check: 3 x 2 = 6, not 9. And 7 x 2 = 14, not 21. The scale factor is not x2.",
    "incorrect_c": "3 x 6 = 18, not 9. The scale factor is x3: both 3 and 7 are multiplied by 3.",
    "incorrect_d": "Adding 6 to both: 3 + 6 = 9 works, but 7 + 6 = 13, not 21. Adding does NOT preserve ratios! The correct operation is MULTIPLYING by 3."
  }
}
```

### 8.3 Layer 1 -- Procedure (3 problems)

#### Problem P1: Cross Multiply to Verify

**Type**: `tap-to-select`
**Difficulty B**: 0.3 (medium)
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Use cross multiplication to determine which of these pairs of ratios form a proportion. Tap ALL the proportions.",
  "inputType": "tap-to-select-multiple",
  "options": [
    {
      "id": "a",
      "text": "2/5 = 6/15",
      "correct": true,
      "crossProducts": "2 x 15 = 30, 5 x 6 = 30"
    },
    {
      "id": "b",
      "text": "3/4 = 9/16",
      "correct": false,
      "crossProducts": "3 x 16 = 48, 4 x 9 = 36"
    },
    {
      "id": "c",
      "text": "4/7 = 12/21",
      "correct": true,
      "crossProducts": "4 x 21 = 84, 7 x 12 = 84"
    },
    {
      "id": "d",
      "text": "5/8 = 10/15",
      "correct": false,
      "crossProducts": "5 x 15 = 75, 8 x 10 = 80"
    }
  ],
  "visualization": {
    "type": "crossMultiplyChecker",
    "showArrowsOnSelect": true,
    "arrowColor": "#fbbf24"
  },
  "feedback": {
    "correct": "You got them all! 2/5 = 6/15 (cross products: 30 = 30) and 4/7 = 12/21 (cross products: 84 = 84) are proportions. The others have unequal cross products.",
    "partial_missed_a": "You missed 2/5 = 6/15. Cross multiply: 2 x 15 = 30 and 5 x 6 = 30. Equal! It IS a proportion.",
    "partial_missed_c": "You missed 4/7 = 12/21. Cross multiply: 4 x 21 = 84 and 7 x 12 = 84. Equal! It IS a proportion.",
    "incorrect_selected_b": "3/4 = 9/16 is NOT a proportion. Cross multiply: 3 x 16 = 48 but 4 x 9 = 36. 48 does not equal 36.",
    "incorrect_selected_d": "5/8 = 10/15 is NOT a proportion. Cross multiply: 5 x 15 = 75 but 8 x 10 = 80. 75 does not equal 80."
  }
}
```

When each option is selected, animated crossing arrows appear over the fraction pair, computing the cross products in real time. Products are shown in emerald (equal) or red (unequal).

#### Problem P2: Solve for the Missing Value (Scale Factor)

**Type**: `numeric-input`
**Difficulty B**: 0.5 (medium)
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Solve the proportion: 5/8 = x/24. What is x?",
  "inputType": "numeric-input",
  "answer": 15,
  "acceptedRange": null,
  "visualization": {
    "type": "scalingRectangles",
    "original": { "width": 5, "height": 8 },
    "target": { "width": "?", "height": 24 },
    "scaleArrow": { "from": 8, "to": 24, "label": "x3" }
  },
  "hints": [
    "Look at the denominators: 8 and 24. What do you multiply 8 by to get 24?",
    "8 x 3 = 24, so the scale factor is 3. What is 5 x 3?",
    "5 x 3 = 15. You can verify: 5 x 24 = 120, and 8 x 15 = 120. Cross products match!"
  ],
  "feedback": {
    "correct": "15 is correct! The scale factor from 8 to 24 is x3, so 5 x 3 = 15. Cross-check: 5 x 24 = 120 = 8 x 15. The proportion 5/8 = 15/24 holds!",
    "incorrect": "Not quite. Look at the denominators: 8 goes to 24. What's the scale factor? 24 / 8 = 3. Now apply the same factor to the numerator: 5 x 3 = 15."
  }
}
```

**Visual**: The two rectangles appear: 5:8 (indigo, fixed) and ?:24 (dashed outline). An arrow labeled "x3" connects 8 to 24. A matching arrow connects 5 to "?". The student types their answer in a single numeric input field (48px height, centered below). On correct answer, the dashed rectangle fills emerald and the "?" becomes "15".

#### Problem P3: Solve for the Missing Value (Cross Multiplication)

**Type**: `numeric-input`
**Difficulty B**: 0.8 (medium-hard)
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Solve: 7/4 = 21/x. What is x?",
  "inputType": "numeric-input",
  "answer": 12,
  "acceptedRange": null,
  "visualization": {
    "type": "crossMultiplySteps",
    "equation": "7/4 = 21/x",
    "steps": [
      "7 x x = 4 x 21",
      "7x = 84",
      "x = 84 / 7",
      "x = 12"
    ],
    "showStepsOnReveal": true
  },
  "hints": [
    "Cross multiply: 7 times x = 4 times 21.",
    "7x = 84. Now divide both sides by 7.",
    "84 / 7 = 12."
  ],
  "feedback": {
    "correct": "12 is right! Cross multiply: 7 x x = 4 x 21, so 7x = 84, so x = 12. You can also use the scale factor: 7 x 3 = 21, so 4 x 3 = 12. Both methods work!",
    "incorrect": "Not quite. Cross multiply: 7 x x = 4 x 21. That gives 7x = 84. Divide both sides by 7: x = 12."
  }
}
```

**Visual**: The proportion `7/4 = 21/x` is displayed with crossing arrows showing the cross multiplication setup. As the student types, the step-by-step solution is hidden. On submit (correct or after revealing answer), the steps appear one by one with 500ms delay between each.

### 8.4 Layer 2 -- Understanding (3 problems)

#### Problem U1: Additive vs Multiplicative (Misconception Check)

**Type**: `multiple-choice`
**Difficulty B**: 1.2 (hard)
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "Jake says: 'The ratio 3:5 is the same as 5:7 because I added 2 to both parts.' Is Jake correct? Why or why not?",
  "inputType": "multiple-choice",
  "visualization": {
    "type": "scalingRectangles",
    "original": { "width": 3, "height": 5 },
    "comparison": { "width": 5, "height": 7 },
    "showOverlay": true,
    "showCrossProducts": true
  },
  "options": [
    { "id": "a", "text": "Jake is wrong. Adding the same number does NOT keep ratios equal. Cross products: 3 x 7 = 21 but 5 x 5 = 25. Not a proportion.", "correct": true },
    { "id": "b", "text": "Jake is right. Adding the same number to both parts always keeps the ratio the same.", "correct": false },
    { "id": "c", "text": "Jake is right, but only because both numbers are odd.", "correct": false },
    { "id": "d", "text": "Jake is wrong because you need to subtract, not add.", "correct": false }
  ],
  "feedback": {
    "correct": "Exactly! Adding 2 to both parts changes the ratio. 3/5 = 0.60 but 5/7 = 0.71 -- different values. Cross products confirm: 3 x 7 = 21 but 5 x 5 = 25. To keep a ratio, you must MULTIPLY both parts by the same number. 3:5 = 6:10 = 9:15, NOT 5:7.",
    "incorrect_b": "This is the most common proportion mistake! Try the rectangles: a 3x5 rectangle and a 5x7 rectangle are different shapes. Cross multiply: 3 x 7 = 21 but 5 x 5 = 25. Not equal! You must MULTIPLY both parts, not add.",
    "incorrect_c": "Odd or even numbers don't matter. The issue is that ADDING the same number to both parts of a ratio NEVER preserves the proportion (unless the two parts are already equal). You must MULTIPLY.",
    "incorrect_d": "The method (add, subtract, or anything else) doesn't matter -- only MULTIPLICATION preserves ratios. 3:5 = 6:10 (multiply by 2) = 9:15 (multiply by 3), but 3:5 is not equal to 1:3 (subtract 2)."
  }
}
```

The visualization shows two rectangles side by side: 3:5 (indigo) and 5:7 (red). They are visibly different shapes. Overlay comparison shows the mismatch. Cross products are displayed below in red (21 vs 25).

#### Problem U2: Explain Cross Multiplication Visually

**Type**: `multiple-choice`
**Difficulty B**: 1.5 (hard)
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "Look at the two rectangles below. Rectangle A is 2:5 and Rectangle B is 6:15. Without computing, which visual test BEST confirms they are proportional?",
  "inputType": "multiple-choice",
  "visualization": {
    "type": "scalingRectangles",
    "original": { "width": 2, "height": 5 },
    "comparison": { "width": 6, "height": 15 },
    "showOverlay": false,
    "interactive": true
  },
  "options": [
    { "id": "a", "text": "They have the same area", "correct": false },
    { "id": "b", "text": "One is an exact scaled copy of the other -- same shape, different size", "correct": true },
    { "id": "c", "text": "They have the same perimeter", "correct": false },
    { "id": "d", "text": "Their widths are the same", "correct": false }
  ],
  "feedback": {
    "correct": "That's the key insight! Proportional rectangles are SCALED COPIES -- same shape, different size. If you overlay the small one on the large one (scaled up), the outlines match perfectly. That's what a proportion means geometrically: the ratio of width to height is preserved.",
    "incorrect_a": "Same area doesn't mean same ratio! A 1:10 rectangle has area 10, and a 2:5 rectangle also has area 10, but 1:10 and 2:5 are completely different shapes.",
    "incorrect_c": "Same perimeter doesn't mean same shape. A 3:4 rectangle and a 2:5 rectangle both have perimeter 14, but they look very different.",
    "incorrect_d": "Their widths are actually different (2 vs 6). What matters is that the RATIO of width to height is the same: 2/5 = 6/15 = 0.4."
  }
}
```

#### Problem U3: Solve a Real-World Proportion

**Type**: `multiple-choice`
**Difficulty B**: 1.8 (hard)
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "A car travels 150 km on 10 liters of fuel. At the same rate, how many liters does it need for 375 km? Set up and solve the proportion.",
  "inputType": "multiple-choice",
  "visualization": {
    "type": "doubleNumberLine",
    "topLabel": "Distance (km)",
    "bottomLabel": "Fuel (L)",
    "markers": [
      { "top": 150, "bottom": 10 },
      { "top": 375, "bottom": "?" }
    ]
  },
  "options": [
    { "id": "a", "text": "25 liters (150/10 = 375/25 → cross products: 150 x 25 = 3750 and 10 x 375 = 3750)", "correct": true },
    { "id": "b", "text": "37.5 liters (375 / 10 = 37.5)", "correct": false },
    { "id": "c", "text": "235 liters (375 - 150 = 225, then 225 + 10 = 235)", "correct": false },
    { "id": "d", "text": "15 liters (150/10 = 15, done)", "correct": false }
  ],
  "feedback": {
    "correct": "25 liters is correct! Set up the proportion: 150/10 = 375/x. Cross multiply: 150x = 3750. Divide: x = 25. Or use the scale factor: 375/150 = 2.5, so 10 x 2.5 = 25. The double number line confirms the alignment.",
    "incorrect_b": "375 / 10 = 37.5, but this divides the DISTANCE by the fuel from the first situation. You need to set up a proportion: 150/10 = 375/x and solve for x.",
    "incorrect_c": "This uses addition (375 - 150 = 225, then adds to 10). But proportions are MULTIPLICATIVE, not additive. The correct approach: 150/10 = 375/x, so x = 25.",
    "incorrect_d": "150/10 = 15 gives you the rate (15 km per liter), but the question asks for the fuel needed for 375 km. Use that rate: 375/15 = 25 liters."
  }
}
```

The double number line shows distance on top and fuel on bottom. The first marker pair (150:10) is placed. The student's chosen answer determines whether the second marker (375:?) aligns proportionally.

### 8.5 Problem Presentation

#### ProblemCard Layout

Each problem is displayed in a `ProblemCard` component:
- Background: `#1e293b` (slate-800) with 1px `#334155` border. Border-radius: 12px.
- Padding: 20px (desktop), 16px (mobile).
- Stem text: 16px, `#e2e8f0`, line-height 1.6.
- Visualization: centered below stem, 16px top margin.
- Input area: below visualization, 16px top margin.
- For multiple-choice: options are rendered as tappable cards (full width, 48px min-height, 8px border-radius, `#0f172a` background, `#475569` border). Selected option has `#818cf8` border (2px). Correct answer turns `#34d399` border. Incorrect turns `#f87171` border.
- For numeric-input: single input field, centered, 60px width, 48px height, `#0f172a` background, `#475569` border, focus border `#818cf8`, numeric keyboard on mobile. "Check" button below (48px height, `#818cf8` background, white text).
- For tap-to-select-multiple: same as multiple-choice but allows multiple selections. "Submit" button appears after at least one selection.
- Feedback area: appears below after submission. 12px top margin. Background `#0f172a20` with left border 3px solid (green for correct, amber for incorrect). Padding 12px.

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
- Problems from different sub-skills are interleaved: never two "identify proportions" problems in a row.
- The 9 problems are drawn from a larger pool; the exact 9 shown depend on the student's performance.

---

## 9. Stage 7 -- Reflection (~1 min)

### 9.1 Reflection Prompt

**Prompt text**: "Explain WHY adding the same number to both parts of a ratio changes it, but multiplying by the same number keeps it the same. Think about the scaling rectangles."

**Input**: Free-text, minimum 30 characters. The text area is:
- Full width, 120px height (expandable).
- Placeholder text: "Think about what happens to the rectangle's shape when you add vs when you multiply..."
- Character counter in bottom-right: `{count}/30 minimum`.
- Background: `#0f172a`. Border: 1px `#475569`. Focus border: `#818cf8`.

**Skip button**: Available but de-emphasized (text-only, `#475569` color, smaller font 12px, positioned below the text area). Label: "Skip for now."

### 9.2 AI Evaluation

The response is submitted to `lesson.submitReflection`:

**Evaluation criteria**:
1. Explains that multiplication scales both parts equally, preserving the relationship (shape stays the same, just bigger/smaller).
2. Explains that addition changes the parts by different PROPORTIONS of their original values (adding 1 to 2 is a 50% increase, but adding 1 to 3 is only a 33% increase -- uneven scaling).
3. (Bonus) Uses spatial language (rectangles, shapes, scaling, stretching, overlapping).
4. (Bonus) Gives a specific numeric example.
5. (Bonus) Mentions cross multiplication as a verification method.

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
2. **Personalized feedback**: AI-generated text based on the specific response. Example for score 4: "Great explanation! You clearly understand why multiplication preserves ratios. To make it even stronger, you could explain WHY adding by the same amount doesn't work -- it's because adding 1 to a small number is a bigger relative change than adding 1 to a large number."
3. **XP award animation**: The XP amount flies upward from the reflection area to the XP counter in the lesson nav. Number color: `#f59e0b`. Duration: 800ms, ease: spring.
4. **Multiplier check**: If `referencesPriorConcept` is true (student mentions equivalent fractions, ratio tables, NO-1.5 concepts), the Connection Maker multiplier (1.3x) applies. The multiplier is shown as a badge next to the XP: "1.3x Connection Maker!"
5. **Struggle bonus**: If the student initially fell for the additive misconception (selected "+6" in R3, or "Jake is right" in U1), but now correctly explains why multiplication is required, the Struggle Bonus (1.4x) triggers.

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

#### Scaling Rectangle Component (new)

```
ScalingRectangle.tsx
├── Props: { width, height, color, label, draggable, onResize, lockAspectRatio }
├── Internal state: none (fully controlled)
├── SVG structure:
│   ├── <rect> — rectangle body (animated width/height, fill at 15% opacity)
│   ├── <rect> — border (stroke only, animated color based on match state)
│   ├── <text> — center label "W : H" (via foreignObject for KaTeX)
│   └── <circle> — drag handle at bottom-right (if draggable)
├── Animations: Framer Motion `motion.rect` for size transitions
└── Accessibility: role="img" with aria-label describing dimensions and ratio
```

#### Double Number Line Component (reused from NO-1.5, extended)

```
DoubleNumberLine.tsx (extended from NO-1.5)
├── Props: { topRange, bottomRange, topLabel, bottomLabel, baseRatio, markers, onMarkerDrag, onAddMarker }
├── Internal state:
│   ├── markers: Array<{ topValue, bottomValue, isEquivalent }>
│   └── activeMarkerIndex: number | null
├── SVG structure:
│   ├── <line> x 2 — top and bottom number lines
│   ├── <g> — tick marks group (major + minor)
│   ├── <g> — marker pairs
│   │   ├── <circle> x 2 per pair — top and bottom dots (draggable)
│   │   ├── <line> per pair — vertical connector (dashed, color-coded)
│   │   └── <text> per pair — ratio label badge
│   └── <text> — axis labels
├── Animations:
│   ├── Marker slide-in: spring from left edge to position
│   ├── Connector color change: 300ms fill transition
│   └── Tick mark draw: staggered 20ms apart
└── Accessibility: role="group", markers are role="slider" with aria-valuemin/max
```

#### Proportion Comparison Component (new)

```
ProportionCompare.tsx
├── Props: { ratioA, ratioB, showCrossProducts, showOverlay }
├── Internal state:
│   ├── overlayActive: boolean
│   └── crossProductsVisible: boolean
├── Subcomponents:
│   ├── ScalingRectangle x 2 — original and comparison
│   ├── CrossProductDisplay — shows a x d vs b x c with arrows
│   └── OverlayAnimation — slides original onto comparison
├── Animations:
│   ├── Cross arrows: pathLength 0→1
│   ├── Product counter: 0→value over 400ms
│   └── Overlay slide: spring to position + scale
└── Accessibility: aria-live region announces comparison result
```

### 10.2 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `ratio-a` | `#818cf8` | Indigo-400. Original ratio / rectangle, top number line. |
| `ratio-b` | `#a78bfa` | Violet-400. Bottom number line, secondary ratio markers. |
| `proportional` | `#34d399` | Emerald-400. Matching ratios, correct proportions, emerald rectangles. |
| `not-proportional` | `#f87171` | Red-400. Non-matching ratios, wrong answers, additive errors. |
| `highlight` | `#fbbf24` | Amber-400. Cross product arrows, scale factor labels, drag handles. |
| `info` | `#60a5fa` | Blue-400. Compare button, neutral info labels. |
| `scale-factor` | `#fbbf24` | Amber-400. "x2", "x3" labels on scale arrows. |
| `unshaded-dark` | `#334155` | Slate-700. Rectangle fill on dark theme (very low opacity). |
| `surface-dark` | `#0f172a` | Slate-900. Background on dark theme. |
| `surface-card` | `#1e293b` | Slate-800. Card backgrounds. |
| `border` | `#64748b` | Slate-500. Tick marks, borders. |
| `text-primary` | `#e2e8f0` | Slate-200. Body text on dark. |
| `text-secondary` | `#94a3b8` | Slate-400. Labels, hints. |
| `connector` | `#fbbf24` | Amber-400. Dashed lines connecting marker pairs. |

### 10.3 Animation Configuration

All animations in this lesson use Framer Motion with these shared configurations:

```typescript
// Shared spring config for physical interactions (drag, snap, overlay)
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

// Spring config for pop effects (correct answer, scale factor labels)
const SPRING_POP = {
  type: "spring" as const,
  damping: 15,
  stiffness: 400,
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

// Drag handle idle pulse
const HANDLE_PULSE = {
  animate: { scale: [1.0, 1.1, 1.0] },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// Cross multiplication arrow draw
const CROSS_ARROW = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: {
    duration: 0.4,
    ease: "easeInOut" as const,
  },
};
```

### 10.4 Gesture Configuration

All gestures use `@use-gesture/react`:

```typescript
// Rectangle corner drag (Stage 2, Workspace A)
const cornerDrag = useDrag(
  ({ movement: [mx, my], memo = initialSize }) => {
    if (lockRatio) {
      // Constrained mode: scale uniformly based on diagonal distance
      const scale = Math.max(
        0.5,
        Math.min(5, 1 + (mx + my) / (2 * baseSize))
      );
      const snappedScale = Math.round(scale); // snap to integer multiples
      setScaledWidth(baseWidth * snappedScale);
      setScaledHeight(baseHeight * snappedScale);
    } else {
      // Free mode: independent width/height
      const newWidth = Math.max(1, Math.min(10, Math.round(memo.w + mx / pixelsPerUnit)));
      const newHeight = Math.max(1, Math.min(10, Math.round(memo.h + my / pixelsPerUnit)));
      setScaledWidth(newWidth);
      setScaledHeight(newHeight);
    }
    return memo;
  },
  {
    filterTaps: true,
    from: () => [0, 0],
  }
);

// Marker drag on double number line (Stage 2, Workspace B)
const markerDrag = useDrag(
  ({ movement: [mx], memo = initialPosition }) => {
    const newPosition = clamp(memo + mx, 0, lineWidth);
    const snappedValue = Math.round(newPosition / pixelsPerTick) * tickValue;
    setMarkerValue(snappedValue);
    return memo;
  },
  {
    axis: "x",
    filterTaps: true,
    bounds: { left: -lineWidth, right: lineWidth },
    rubberband: 0.2,
  }
);

// Real-world cards swipe (Stage 5)
const cardBind = useDrag(
  ({ movement: [mx], direction: [dx], velocity: [vx], cancel }) => {
    if (Math.abs(vx) > 0.5) {
      const newIndex = clamp(currentCard + (dx > 0 ? -1 : 1), 0, CARD_COUNT - 1);
      setCurrentCard(newIndex);
      cancel();
    }
  },
  {
    axis: "x",
    filterTaps: true,
    bounds: { left: -200, right: 200 },
    rubberband: 0.2,
  }
);

// Workspace tab swipe (Stage 2)
const tabBind = useDrag(
  ({ movement: [mx], direction: [dx], velocity: [vx], cancel }) => {
    if (Math.abs(vx) > 0.3) {
      const newTab = dx > 0 ? 0 : 1;
      setActiveTab(newTab);
      cancel();
    }
  },
  {
    axis: "x",
    filterTaps: true,
  }
);
```

### 10.5 Responsive Breakpoints

| Breakpoint | Layout | Rectangle Max Dim | Number Line Width | Stack |
|---|---|---|---|---|
| >= 1024px | Tabs, generous spacing | 200px scaled | 360px | No |
| 768-1023px | Tabs, compact | 160px scaled | 320px | No |
| 480-767px | Swipeable tabs, full width | 140px scaled | Full - 32px | Yes |
| < 480px | Swipeable tabs, compact | 120px scaled | Full - 24px | Yes |

### 10.6 Math Correctness Requirements (DR-2)

The following computations MUST have corresponding Vitest tests:

| Computation | Test |
|---|---|
| Cross multiplication: `a * d` vs `b * c` | Integer arithmetic, verified for all practice problem ratio pairs |
| Proportion equality: `a/b === c/d` via cross products | Exact: `a * d === b * c` for all test pairs |
| Scale factor computation: `c / a` (or `d / b`) | Float comparison with epsilon 0.001 for non-integer scale factors |
| Proportion solving: `x = (a * d) / b` | Integer arithmetic when result is integer; float with epsilon otherwise |
| Rectangle aspect ratio: `width / height` | Float comparison with epsilon 0.0001 |
| Equivalent ratio generation: `[a*k, b*k]` for k = 1..6 | Exact integer multiplication |
| Number line position: `value * pixelsPerUnit` | Float, sum of positions equals line width within epsilon 0.5px |
| Ratio equality check: `a * d === b * c` (cross product shortcut) | Boolean, tested for all true and false cases in problem bank |
| Additive non-equivalence proof: verify `(a+k)/(b+k) !== a/b` for `a !== b` and `k !== 0` | Tested for 20 representative cases |

### 10.7 Component Structure

```typescript
"use client";

// Single file: src/components/lessons/ProportionsLesson.tsx
// Named export: export function ProportionsLesson({ onComplete }: Props)

// Internal stage components (not exported):
// - HookStage
// - SpatialStage (tabs between ScalingRectangles and DoubleNumberLine)
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
- `@use-gesture/react` (useDrag -- for rectangle corner drag, marker drag, card swipe, tab swipe)
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
<!-- Ratio Picker -->
<div role="group" aria-label="Base ratio: 2 to 3">
  <button aria-label="Decrease width" min-h-[44px] min-w-[44px]>-</button>
  <span aria-live="polite">2</span>
  <button aria-label="Increase width" min-h-[44px] min-w-[44px]>+</button>
  <span aria-hidden="true">:</span>
  <button aria-label="Decrease height" min-h-[44px] min-w-[44px]>-</button>
  <span aria-live="polite">3</span>
  <button aria-label="Increase height" min-h-[44px] min-w-[44px]>+</button>
</div>

<!-- Scaling Rectangle -->
<svg role="img" aria-label="Rectangle with width 2 and height 3, ratio 2 to 3">
  <rect role="presentation" />
  <!-- Drag handle -->
  <circle role="slider" aria-label="Drag to resize. Current scale factor: 2x"
          aria-valuemin="1" aria-valuemax="5" aria-valuenow="2"
          tabindex="0" />
</svg>

<!-- Double Number Line -->
<svg role="img" aria-label="Double number line showing equivalent ratios for 2 to 3">
  <g role="group" aria-label="Top number line: Width values 0 through 12">
    <line role="presentation" />
  </g>
  <g role="group" aria-label="Bottom number line: Height values 0 through 18">
    <line role="presentation" />
  </g>
  <g role="group" aria-label="Marker pair 1: 2 on top, 3 on bottom. Equivalent ratio.">
    <circle role="slider" aria-label="Top marker at 2. Drag to change."
            tabindex="0" />
    <circle role="slider" aria-label="Bottom marker at 3. Drag to change."
            tabindex="0" />
  </g>
</svg>

<!-- Cross Multiplication Display -->
<div role="math" aria-label="Cross multiplication: 2 times 6 equals 12, and 3 times 4 equals 12. Cross products are equal.">
  <span>2 x 6 = 12</span>
  <span>3 x 4 = 12</span>
</div>

<!-- Practice: Numeric Input -->
<label for="proportion-answer">Enter the missing value:</label>
<input id="proportion-answer" type="number" inputmode="numeric"
       aria-label="Answer input for proportion problem"
       min-h-[44px] min-w-[44px] />

<!-- Practice: Multiple Choice -->
<fieldset role="radiogroup" aria-label="Select the correct answer">
  <label>
    <input type="radio" name="answer" value="a" />
    <span min-h-[44px]>Option text</span>
  </label>
</fieldset>
```

### 11.2 Keyboard Navigation

- Tab through: ratio steppers -> lock toggle -> drag handle -> compare button -> continue button.
- Drag handle: Arrow keys adjust scale factor (Up/Right = increase, Down/Left = decrease). Step = 1 scale factor unit.
- Marker dots: Arrow keys move marker along number line. Step = 1 tick mark.
- Multiple choice: Arrow keys navigate options, Enter/Space selects.
- Numeric input: Standard keyboard input, Enter submits.

### 11.3 Screen Reader Announcements

- When ratio changes: "Ratio changed to 4 to 6. This is proportional to the base ratio 2 to 3. Scale factor: times 2."
- When cross products are computed: "Cross products: 2 times 6 equals 12, 3 times 4 equals 12. Products are equal. This is a proportion."
- When overlay comparison runs: "Rectangle shapes compared. The shapes match. This confirms the ratios are proportional."
- When marker is added: "Marker pair added at 4 to 6. This is an equivalent ratio."
- When practice answer is submitted: "Correct! The answer is 15." or "Incorrect. The correct answer is 15. Hint: look at the scale factor."

### 11.4 Reduced Motion

If `prefers-reduced-motion: reduce` is active:
- All spring animations are replaced with `duration: 0.01` (effectively instant).
- Hook animation plays as a sequence of static frames (no movement, just opacity transitions).
- Drag interactions still work but without spring physics (linear movement).
- Particle burst in Aha Moment is replaced with a simple glow effect.

---

## 12. Performance Budget

| Metric | Target | How |
|---|---|---|
| First Contentful Paint | < 1.5s | SVG is inline (no network fetch). Fonts preloaded. |
| Largest Contentful Paint | < 2.5s | All rectangles and number lines render in first paint. |
| Animation frame rate | P95 >= 55fps | SVG transforms only (no reflow). Framer Motion `willChange: "transform"`. |
| Interaction latency | < 100ms | Drag handler updates state synchronously. Debounce on steppers at 200ms. |
| Bundle size contribution | < 40KB gzipped | No 3D libraries. SVG only. Shared Framer Motion instance. |
| Memory | < 20MB | No canvas bitmaps. SVG elements < 200 total across all stages. |

### 12.1 SVG Element Counts (worst case)

| Stage | SVG Elements | Notes |
|---|---|---|
| Hook | ~30 | 3 rectangles + labels + arrows + narration |
| Spatial (Rectangles) | ~25 | 2 rectangles + drag handle + labels + cross products |
| Spatial (Double Number Line) | ~80 | 2 lines + 36 tick marks + 6 marker pairs + connectors + labels |
| Discovery | ~60 | Spatial models + prompts + interactive elements |
| Symbol Bridge | ~40 | Notation + arrows + rectangles |
| Real World | ~30 per card | Double number line or rectangles per card |
| Practice | ~35 per problem | Visualization + options + feedback |
| Reflection | ~5 | Text area + stars + submit |

**Total peak**: ~120 elements (Spatial stage with all markers placed). Well under the 200 budget.

---

## 13. Content Files

### 13.1 File Structure

```
src/content/domains/numbers-operations/NO-1.5a/
├── metadata.json          # Lesson metadata (id, name, grade, prereqs, successors)
├── hook.json              # Hook animation scene definition
├── spatial-rectangles.json # Scaling rectangles scene definition
├── spatial-dnl.json       # Double number line scene definition
├── discovery.json         # Guided discovery prompts and expected responses
├── symbol-bridge.json     # Symbol bridge notation sequence
├── real-world.json        # Real-world scenario cards
├── problems.json          # Practice problem bank (9+ problems)
├── reflection.json        # Reflection prompt and evaluation criteria
└── i18n/
    └── en.json            # All user-facing strings (DR-7)
```

### 13.2 i18n Strings (en.json sample)

```json
{
  "lesson.title": "Proportions",
  "lesson.subtitle": "Equivalent Ratios & Cross Multiplication",
  "hook.narration.1": "This photo is 2 cm wide and 3 cm tall.",
  "hook.narration.2": "To make it bigger, let's add 1 to each side...",
  "hook.narration.3": "The photo looks STRETCHED! The face is wider than it should be.",
  "hook.narration.4": "2:3 is not the same ratio as 3:4. Adding doesn't preserve the shape!",
  "hook.narration.5": "What if we MULTIPLY each side by 2 instead?",
  "hook.narration.6": "Same shape, just BIGGER! The ratio 2:3 = 4:6.",
  "hook.narration.7": "2:3 and 4:6 are the SAME ratio. That's a PROPORTION!",
  "hook.narration.8": "There's a quick test: cross multiply. If the products are equal, the ratios are equal.",
  "spatial.tab.rectangles": "Scaling Rectangles",
  "spatial.tab.dnl": "Double Number Line",
  "spatial.lockRatio": "Lock ratio",
  "spatial.compare": "Compare",
  "spatial.addMarker": "Add marker",
  "spatial.clear": "Clear",
  "spatial.sameShape": "Same shape! This is a proportion.",
  "spatial.differentShape": "Different shape! Not a proportion.",
  "discovery.prompt1": "The rectangle below has width 3 and height 4 -- we added 1 to each dimension. Does it look like the SAME SHAPE as 2:3?",
  "discovery.prompt2": "Add more markers to the double number line. Notice how equivalent ratios line up vertically.",
  "discovery.prompt3": "How can you QUICKLY test if two ratios form a proportion without drawing rectangles?",
  "discovery.prompt4": "If 2:3 = ?:9, what number completes the proportion?",
  "discovery.prompt5": "Now try this one: 4/5 = ?/15.",
  "reflection.prompt": "Explain WHY adding the same number to both parts of a ratio changes it, but multiplying by the same number keeps it the same.",
  "reflection.placeholder": "Think about what happens to the rectangle's shape when you add vs when you multiply...",
  "practice.check": "Check",
  "practice.next": "Next",
  "practice.hint": "Hint"
}
```

---

## 14. Gamification Integration

### 14.1 XP Awards

| Source | Base XP | Condition |
|---|---|---|
| Hook watched (>30s) | 0 | Tracked but no XP |
| Spatial exploration bonus | 20-40 | Based on diversity metrics (see 4.5) |
| Discovery insights | 10-15 each | Correct without hints (see 5.2) |
| Practice: Layer 0 correct | 10 per problem | First attempt |
| Practice: Layer 1 correct | 20 per problem | First attempt |
| Practice: Layer 2 correct | 30 per problem | First attempt |
| Practice: incorrect (any) | 5 per problem | Participation credit |
| Reflection quality | 16-80 | Based on AI evaluation (see 9.2) |
| Lesson completion | 50 | Reaching Stage 7 end |

### 14.2 XP Multipliers

| Multiplier | Value | Trigger |
|---|---|---|
| Connection Maker | 1.3x | References NO-1.5, equivalent fractions, or prior concepts in reflection |
| Struggle Bonus | 1.4x | Initially fell for additive misconception, then correctly explains multiplicative reasoning |
| Perfect Practice | 1.2x | All 9 practice problems correct on first attempt |
| Explorer | 1.1x | Used both workspaces and explored >= 4 unique scale factors |

### 14.3 Achievement Tracking

```typescript
interface LessonAchievements {
  proportionMaster: boolean;        // all practice correct first attempt
  crossMultiplyExpert: boolean;     // all cross-multiply problems correct
  misconceptionDefeated: boolean;   // initially wrong on additive, later correct
  deepExplorer: boolean;            // 15+ spatial interactions, both workspaces
  reflectionScholar: boolean;       // reflection score >= 4
}
```

---

## 15. AI Tutor Guidance

### 15.1 Tutor Personality for This Lesson

The AI tutor should be encouraging and discovery-oriented. Key phrases:
- "Did you notice...?" (directing attention)
- "What happens when you...?" (prompting exploration)
- "That's a really common thought!" (validating misconceptions without shaming)
- "See? You figured it out!" (crediting the student)

### 15.2 Misconception Response Scripts

| Student Error | AI Response |
|---|---|
| Says "add 2 to both sides to keep the ratio" | "Lots of people think that! But try it with the rectangles. A 2:3 shape looks different from a 4:5 shape, even though you added 2 to both. Ratios are about MULTIPLICATION, not addition. Try multiplying both by 2 instead." |
| Can't find the scale factor | "Look at the numbers you DO know. The denominator went from 5 to 15. What did you multiply 5 by to get 15? Now apply that same multiplier to the numerator." |
| Confuses cross multiplication with regular multiplication | "Cross multiplication means you multiply DIAGONALLY -- top-left times bottom-right, and bottom-left times top-right. The arrows make an X shape. Let me show you." |
| Gives a decimal answer when integer expected | "You're on the right track! But this proportion should give a whole number answer. Double-check your division -- make sure you're dividing the larger cross product by the right number." |

### 15.3 Hint Escalation

For each Discovery prompt:
1. **Gentle redirect** (after 15s): Restate the question with a visual cue.
2. **Specific hint** (after 30s): Point to the exact numbers/visual to examine.
3. **Direct guidance** (after 45s): Walk through the first step of the solution.

---

## 16. Edge Cases & Error Handling

### 16.1 Spatial Interaction Edge Cases

| Edge Case | Behavior |
|---|---|
| Drag rectangle corner to minimum size (1:1 base, scale 0.5x) | Clamp at scale factor 1 (cannot go below base ratio dimensions). Handle snaps back with spring. |
| Drag rectangle corner to maximum size (10:10, scale 5x) | Clamp at scale factor 5. Handle resistance increases (rubberband 0.1). |
| Base ratio set to 1:1 (square) | All scaled versions are also squares. Cross products always equal. Note appears: "A square is always proportional to itself!" |
| Base ratio numerator = denominator (e.g., 5:5) | Treated as 1:1 ratio. Scaled versions must maintain equality. |
| Drag marker off number line bounds | Clamp to line endpoints. Rubberband effect at 0.2. |
| Add more than 6 marker pairs | "Add marker" button disables. Tooltip: "Maximum markers reached. Clear some to add new ones." |
| Free mode: student creates ratio with very large numbers (e.g., 10:1) | Rectangle renders at max dimensions (constrained to viewport). Overflow prevented via `Math.min(scaledDim, maxViewportDim)`. |

### 16.2 Practice Edge Cases

| Edge Case | Behavior |
|---|---|
| Student enters 0 in numeric input | Feedback: "A proportion can't have 0 as a value (you'd be dividing by zero). Try a positive number." |
| Student enters negative number | Feedback: "Proportions work with positive values. Try a positive number." Input rejects negative values (min=1). |
| Student enters very large number (>999) | Input field max=999. Feedback: "That's too large for this problem. The answer should be between 1 and [reasonable max]." |
| Rapid "Check" button clicks | Debounced at 500ms. Second click within window is ignored. |
| Student navigates away mid-practice | State is persisted. On return, the student resumes at the same problem with their previous selection intact. |

### 16.3 Network & Offline

- All lesson content is pre-cached via service worker (Serwist).
- Reflection submission is queued in IndexedDB (Dexie.js) if offline, synced when connection restores.
- Practice problem answers are validated client-side (no network needed for correctness checks).
- AI tutor responses are queued offline; fallback static responses are used until sync.

---

## 17. Testing Requirements

### 17.1 Unit Tests (Vitest)

```typescript
describe("Proportion Math (DR-2)", () => {
  test("cross multiplication correctly identifies proportions", () => {
    expect(isProportional(2, 3, 4, 6)).toBe(true);   // 2*6 = 12, 3*4 = 12
    expect(isProportional(2, 3, 3, 4)).toBe(false);   // 2*4 = 8, 3*3 = 9
    expect(isProportional(5, 8, 15, 24)).toBe(true);  // 5*24 = 120, 8*15 = 120
    expect(isProportional(3, 7, 9, 22)).toBe(false);  // 3*22 = 66, 7*9 = 63
  });

  test("scale factor computation", () => {
    expect(getScaleFactor(2, 3, 4, 6)).toBe(2);
    expect(getScaleFactor(2, 3, 6, 9)).toBe(3);
    expect(getScaleFactor(5, 8, 15, 24)).toBe(3);
  });

  test("solving proportion for unknown", () => {
    expect(solveProportion(2, 3, null, 9)).toBe(6);      // 2/3 = x/9
    expect(solveProportion(5, 8, null, 24)).toBe(15);     // 5/8 = x/24
    expect(solveProportion(7, 4, 21, null)).toBe(12);     // 7/4 = 21/x
    expect(solveProportion(3, 5, null, 20)).toBe(12);     // 3/5 = x/20
    expect(solveProportion(null, 3, 4, 6)).toBe(2);       // x/3 = 4/6
  });

  test("equivalent ratio generation", () => {
    const ratios = generateEquivalentRatios(2, 3, 6);
    expect(ratios).toEqual([
      [2, 3], [4, 6], [6, 9], [8, 12], [10, 15], [12, 18]
    ]);
  });

  test("additive change does NOT preserve ratio", () => {
    // For a != b and k != 0, (a+k)/(b+k) !== a/b
    expect(isProportional(2, 3, 3, 4)).toBe(false);   // +1
    expect(isProportional(2, 3, 4, 5)).toBe(false);   // +2
    expect(isProportional(3, 5, 5, 7)).toBe(false);   // +2
    expect(isProportional(4, 7, 7, 10)).toBe(false);  // +3
  });

  test("rectangle aspect ratio comparison", () => {
    expect(Math.abs(2/3 - 4/6)).toBeLessThan(0.0001);    // proportional
    expect(Math.abs(2/3 - 3/4)).toBeGreaterThan(0.01);    // not proportional
  });

  test("number line position computation", () => {
    const lineWidth = 320;
    const maxValue = 12;
    const pixelsPerUnit = lineWidth / maxValue;
    expect(pixelsPerUnit * 2).toBeCloseTo(53.33, 1);      // position of value 2
    expect(pixelsPerUnit * 4).toBeCloseTo(106.67, 1);     // position of value 4
  });
});
```

### 17.2 Component Tests (Vitest + React Testing Library)

```typescript
describe("ProportionsLesson Component", () => {
  test("renders all 7 stages without errors");
  test("stage progression works: each stage leads to next");
  test("continue button appears at correct triggers");
  test("scaling rectangle drag updates ratio display");
  test("ratio lock toggle constrains/frees rectangle scaling");
  test("cross multiplication display shows correct products");
  test("double number line markers snap to correct positions");
  test("practice problems validate answers correctly");
  test("numeric input accepts correct answer and shows feedback");
  test("multiple choice highlights selected option");
  test("tap-to-select-multiple allows multiple selections");
  test("feedback stays visible until Next is tapped");
  test("reflection accepts text >= 30 chars and shows response");
  test("onComplete fires after Stage 7");
  test("progress bar at top shows current stage (7 dots)");
});
```

### 17.3 E2E Tests (Playwright)

```typescript
describe("NO-1.5a Proportions E2E", () => {
  test("complete lesson flow from Hook to Reflection");
  test("hook animation plays and continue button appears");
  test("spatial: drag rectangle corner and verify ratio updates");
  test("spatial: toggle ratio lock and verify constrained vs free mode");
  test("spatial: add markers on double number line");
  test("discovery: solve missing value with numeric input");
  test("practice: answer all 9 problems");
  test("reflection: submit text and see XP award");
  test("mobile viewport (375px): no horizontal overflow");
  test("keyboard navigation through all interactive elements");
});
```

### 17.4 Visual Regression (Storybook)

Stories for:
- `ScalingRectangle` in isolation (various ratios: 1:1, 2:3, 3:5, 7:10)
- `DoubleNumberLine` in isolation (with 1, 3, 6 markers)
- `ProportionCompare` showing matched vs unmatched ratios
- `CrossProductDisplay` with equal and unequal products
- `ProblemCard` for each problem type (multiple-choice, numeric-input, tap-to-select)
- Full lesson at each stage (hook, spatial, discovery, symbol, real-world, practice, reflection)

---

## Quality Checklist

### Functionality
- [ ] All 7 stages render without errors
- [ ] Stage progression works (each stage leads to next)
- [ ] Continue buttons appear at correct triggers
- [ ] All practice problems have correct answers validated
- [ ] Feedback stays visible until "Next" is tapped
- [ ] Reflection accepts text and shows response
- [ ] `onComplete` fires after Stage 7
- [ ] Scaling rectangle drag works with ratio lock on and off
- [ ] Double number line markers snap correctly
- [ ] Cross multiplication display updates in real time
- [ ] Numeric input validates correct answers
- [ ] Tap-to-select-multiple allows multiple selections and validates

### Visual Quality
- [ ] Animations are smooth (no janky transitions)
- [ ] Colors are consistent with lesson's palette
- [ ] Text is readable on dark background
- [ ] No layout overflow on mobile (375px width)
- [ ] Numbers use `tabular-nums` for alignment
- [ ] Progress bar at top shows current stage
- [ ] Rectangles render at correct aspect ratios
- [ ] Cross multiplication arrows draw smoothly

### Interactions
- [ ] All touch targets >= 44px
- [ ] Drag interactions work on touch devices
- [ ] Visual feedback on every tap/click (scale, color, or highlight)
- [ ] No dead states (always a way to progress)
- [ ] Stepper buttons debounce at 200ms
- [ ] Drag handle has idle pulse animation

### Accessibility
- [ ] Interactive elements have aria-labels
- [ ] Live regions announce state changes (ratio changes, cross product results)
- [ ] Keyboard navigation possible for key interactions
- [ ] Reduced motion preference respected
- [ ] Screen reader can follow lesson flow

### Build
- [ ] `pnpm build` passes with no type errors
- [ ] No console errors in browser DevTools
- [ ] All math computation tests pass (DR-2)
- [ ] Lesson renders identically on Chrome, Firefox, Safari
