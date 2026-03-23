# Lesson Design: NO-1.6 Percents

**Version**: 1.0.0 | **Date**: 2026-03-23 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NO-1.6 | **Domain**: Numbers & Operations | **Grade**: 7
**Prerequisites**: NO-1.5 (Ratios & Proportions), NO-1.3 (Decimals) | **Successors**: NO-1.7 (Percent Applications), NO-1.7a (Percent Change)
**Content Path**: `src/content/domains/numbers-operations/NO-1.6/`
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
11. [Accessibility](#11-accessibility)
12. [Performance Budget](#12-performance-budget)
13. [Content Files](#13-content-files)
14. [Gamification Integration](#14-gamification-integration)
15. [AI Tutor Guidance](#15-ai-tutor-guidance)
16. [Edge Cases & Error Handling](#16-edge-cases--error-handling)
17. [Testing Requirements](#17-testing-requirements)

---

## 1. Core Insight

Percent means "per hundred" -- 45% = 45/100 = 0.45. It is a standardized ratio that always uses 100 as the base, making comparisons between different quantities easy and immediate.

**Secondary insights** (built progressively through stages):
- A percent is just a fraction with a denominator of 100. Every percent can be written as a fraction and as a decimal.
- The percent-fraction-decimal triple are three faces of the same number: 75% = 75/100 = 3/4 = 0.75.
- Percent can exceed 100 (150% = 1.5 = 3/2) and can be less than 1 (0.5% = 0.005 = 1/200).
- "Finding X% of a number" means multiplying that number by X/100.

**Key misconception to defeat**: "50% of 80 = 50 + 80 = 130." Students confuse "percent OF" with addition because they parse "50% of 80" as two numbers to combine. The 10x10 grid directly shows that 50% of 80 means shading half of 80 squares worth of value -- the grid makes the multiplicative nature of percent undeniable before any formula appears.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | The 10x10 grid is the primary spatial model. Each cell = 1%, so students physically shade cells to build percents. The intraparietal sulcus (IPS) maps spatial area to numerical magnitude. A secondary bar model and circle chart provide alternative spatial representations. |
| PF-2: Dual Coding Theory | KaTeX notation (45% = 45/100 = 0.45) is rendered directly on top of the shaded grid cells. Fraction labels, decimal readouts, and percent symbols are spatially co-located with the visual they describe -- never in a separate panel. |
| PF-3: Embodied Cognition | Tap-to-shade cells on the 10x10 grid recruits motor cortex. Dragging a slider to set the percent engages proprioceptive pathways. The physical act of shading 45 out of 100 cells builds a motor-encoded memory trace for "45% means 45 out of every 100." |
| PF-4: Spacing Effect | After this lesson, percent items enter the FSRS queue at all three layers (recall, procedure, understanding). Initial stability is low (~1 day), forcing early review. Interleaving with fraction and decimal items strengthens the triple connection. |
| PF-5: Interleaving | Practice problems interleave percent reading, percent-fraction-decimal conversion, and "percent of" calculations -- never blocked by sub-type. |
| PF-6: Math Anxiety Reduction | The hook is a relatable comparison (phone battery), the spatial stage is exploratory (no right/wrong during manipulation), and practice has no timer. Wrong answers receive neutral, instructive feedback. |

### 2.2 Cognitive Load Management

- **Intrinsic load**: Percent is moderate-complexity for Grade 7. The lesson decomposes the concept into three sub-ideas (percent as per-hundred, percent-fraction-decimal equivalence, percent-of computation) and introduces them sequentially.
- **Extraneous load**: Minimized by a single spatial model (10x10 grid) as the primary representation. The percent slider and tap-to-shade are the ONLY controls in Stage 2. Bar model and circle chart appear only as secondary views, toggled by the student.
- **Germane load**: Maximized by the conversion challenge (seeing 45 shaded cells = 45% = 45/100 = 0.45 forces triple-encoding) and the "percent of" guided discovery (connecting multiplicative reasoning to area shading).

### 2.3 Prior Knowledge Activation

Prerequisites NO-1.5 (Ratios) and NO-1.3 (Decimals) provide the foundation:
- From NO-1.3: students know the 10x10 grid model where each cell = 0.01 and the whole grid = 1.00. This lesson reframes the SAME grid: each cell = 1% and the whole grid = 100%.
- From NO-1.5: students understand ratios as comparisons of two quantities. Percent is introduced as a special ratio where the second quantity is always 100, standardizing comparison.
- The hook explicitly connects to phone battery percentage, which every Grade 7 student already intuitively understands.

### 2.4 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "50% of 80 = 50 + 80 = 130" | High (~35% of entering Grade 7) | Grid shows 50% as half the grid shaded, then 50% of 80 as shading half of an 80-item set. Students see the answer is 40, not 130. The multiplicative nature is spatial, not formulaic. | 3, 6 |
| Not connecting percent <-> fraction <-> decimal | Very high (~55%) | The grid has three simultaneous readouts: percent (45%), fraction (45/100), and decimal (0.45). All update in real time as cells are shaded. Students see all three change together. | 2, 4 |
| "Percent can never exceed 100" | Moderate (~30%) | Stage 3 prompt explicitly asks "what would 120% look like?" The grid shows 100 cells fully shaded + 20 additional cells in an overflow row, making >100% concrete and visible. | 3 |
| "25% of 200 = 25" (confusing percent with absolute number) | Moderate (~25%) | Guided discovery separates "25%" from "25 items" by showing 25% as a shaded portion (25 cells out of 100), then applying it to different-sized groups. 25% of 200 = 50, because 25% means "25 out of every 100" applied twice. | 3, 6 |

---

## 3. Stage 1 -- Hook (30-60s)

### 3.1 Narrative Arc

The hook tells a micro-story about phone batteries. Two phones are shown side-by-side: one says "45% charged" and the other says "45/100 charged." Then the phone's battery icon animates from empty to 45%, filling a bar that is unmistakably a 10x10 grid in disguise. The visual punchline: percent is just a way of saying "out of 100" -- and you already understand it every time you look at your phone battery.

### 3.2 Scene Definition

```json
{
  "id": "NO-1.6-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 800, 400],
  "background": "#0f172a",
  "objects": [
    {
      "type": "group",
      "id": "phone-left",
      "children": [
        {
          "type": "geometricShape",
          "id": "phone-body-left",
          "shape": "rect",
          "position": [140, 80],
          "width": 120,
          "height": 220,
          "style": {
            "fill": "#1e293b",
            "stroke": "#475569",
            "strokeWidth": 2,
            "rx": 16
          }
        },
        {
          "type": "geometricShape",
          "id": "battery-bar-left",
          "shape": "rect",
          "position": [160, 140],
          "width": 80,
          "height": 120,
          "style": {
            "fill": "#0f172a",
            "stroke": "#334155",
            "strokeWidth": 1,
            "rx": 4
          }
        },
        {
          "type": "geometricShape",
          "id": "battery-fill-left",
          "shape": "rect",
          "position": [162, 206],
          "width": 76,
          "height": 0,
          "style": {
            "fill": "#34d399",
            "rx": 3
          }
        },
        {
          "type": "annotation",
          "id": "battery-label-left",
          "position": [200, 115],
          "text": "45%",
          "style": {
            "fontSize": 28,
            "fill": "#f8fafc",
            "fontWeight": 700,
            "textAnchor": "middle" as const
          },
          "visible": false
        }
      ]
    },
    {
      "type": "group",
      "id": "phone-right",
      "children": [
        {
          "type": "geometricShape",
          "id": "phone-body-right",
          "shape": "rect",
          "position": [540, 80],
          "width": 120,
          "height": 220,
          "style": {
            "fill": "#1e293b",
            "stroke": "#475569",
            "strokeWidth": 2,
            "rx": 16
          }
        },
        {
          "type": "geometricShape",
          "id": "battery-bar-right",
          "shape": "rect",
          "position": [560, 140],
          "width": 80,
          "height": 120,
          "style": {
            "fill": "#0f172a",
            "stroke": "#334155",
            "strokeWidth": 1,
            "rx": 4
          }
        },
        {
          "type": "geometricShape",
          "id": "battery-fill-right",
          "shape": "rect",
          "position": [562, 206],
          "width": 76,
          "height": 0,
          "style": {
            "fill": "#818cf8",
            "rx": 3
          }
        },
        {
          "type": "annotation",
          "id": "battery-label-right",
          "position": [600, 115],
          "latex": "\\frac{45}{100}",
          "style": {
            "fontSize": 22,
            "fill": "#f8fafc",
            "fontWeight": 700,
            "textAnchor": "middle" as const
          },
          "visible": false
        }
      ]
    },
    {
      "type": "annotation",
      "id": "question-text",
      "position": [400, 50],
      "text": "Which phone has more charge?",
      "style": {
        "fontSize": 28,
        "fill": "#f8fafc",
        "fontWeight": 600,
        "textAnchor": "middle" as const
      },
      "visible": false
    },
    {
      "type": "annotation",
      "id": "equals-sign",
      "position": [400, 200],
      "text": "=",
      "style": {
        "fontSize": 64,
        "fill": "#fbbf24",
        "fontWeight": 700,
        "textAnchor": "middle" as const
      },
      "visible": false
    },
    {
      "type": "annotation",
      "id": "reveal-text",
      "position": [400, 350],
      "text": "\"Per cent\" = \"per hundred.\" You already think in percents every day.",
      "style": {
        "fontSize": 20,
        "fill": "#f8fafc",
        "fontWeight": 500,
        "fontStyle": "italic",
        "textAnchor": "middle" as const
      },
      "visible": false
    }
  ]
}
```

### 3.3 Animation Sequence

The hook runs as a single auto-triggered animation. No student interaction required.

**Timeline (total: ~18 seconds):**

| Time (s) | Action | Duration | Details |
|---|---|---|---|
| 0.0-0.5 | Fade in both phone outlines | 0.5s | `ease: "easeInOut"`. Two phone rectangles appear side by side. |
| 0.5-1.5 | Question text slides in | 0.4s | "Which phone has more charge?" fades in from top. `opacity: 0 -> 1`, `translateY: -12px -> 0`. White text with subtle indigo glow: `text-shadow: 0 0 20px rgba(129, 140, 248, 0.3)`. |
| 1.5-2.0 | Left battery label appears | 0.3s | "45%" fades in above left phone's battery bar. Green color (`#34d399`), 28px, bold. Spring pop: `scale: 0 -> 1`, `spring({ damping: 15, stiffness: 400 })`. |
| 2.0-2.5 | Right battery label appears | 0.3s | KaTeX `\frac{45}{100}` fades in above right phone's battery bar. Indigo color (`#818cf8`), 22px. Same spring pop. |
| 2.5-4.5 | Left battery fills to 45% | 2.0s | Green fill rectangle grows from bottom upward. Height animates from 0 to `120 * 0.45 = 54px`. `y` moves from 260 to 206. `ease: "easeInOut"`. During fill, the battery body subtly glows green: `box-shadow: 0 0 8px #34d39940`. |
| 2.5-4.5 | Right battery fills to 45/100 | 2.0s | Indigo fill rectangle grows identically from bottom. Same 54px height. Simultaneous with left fill. `ease: "easeInOut"`. Body glows indigo. |
| 4.5-5.5 | Hold -- both at same level | 1.0s | Student sees both batteries are filled to the same height. Visual tension builds. |
| 5.5-6.5 | Equals sign appears | 1.0s | A massive `=` sign (64px, amber `#fbbf24`) fades in between the two phones. `opacity: 0 -> 1`, `scale: 0.5 -> 1.0`. Spring: `damping: 12, stiffness: 400`. The `=` pulses once: `scale: 1.0 -> 1.08 -> 1.0`, 0.4s. |
| 6.5-8.0 | Morphing animation | 1.5s | The "45%" label on the left phone morphs: the `%` symbol splits apart. The `%` glyph animates: the two dots expand and a dividing line draws between them, transforming the `%` into a miniature fraction bar with `·/·`. Then the `45` slides to the numerator position and `100` fades in at the denominator. Left phone now shows `45/100` in green. Both phones display the same thing. Duration: 1.5s with spring easing. |
| 8.0-9.5 | Grid morph on right phone | 1.5s | The right phone's battery fill area transforms into a miniature 10x10 grid (within the 80x120px battery area). Grid lines draw in with 0.05s stagger per line. Then 45 cells shade in indigo, filling column by column: 4 full columns (0.1s each) then 5 cells in the 5th column (0.05s each). Each cell pops: `scale: 0 -> 1`, 0.08s, `spring({ damping: 15, stiffness: 400 })`. |
| 9.5-10.5 | Left phone grid morph | 1.0s | Left phone's battery bar also transforms into a 10x10 grid. 45 cells shade in green, same pattern. Now both phones show identical grids, just different colors. |
| 10.5-12.5 | Side-by-side overlay | 2.0s | Both grids slide toward center and partially overlap (left edges align). The grids are semi-transparent (70% opacity). 45 cells match exactly. A dashed outline connects the two grids. Text: "Same amount. Same number. Different notation." fades in below in `#e2e8f0`, 16px. |
| 12.5-15.0 | Reveal text | 0.6s | Grids slide back. The overlapping text fades out. New text slides in from below: `"Per cent" = "per hundred." You already think in percents every day.` White italic, 20px. `opacity: 0 -> 1`, `translateY: 16px -> 0`. The word "per hundred" gets amber highlight: background `#fbbf2420`, padding 2px 6px, border-radius 4px. |
| 15.0-18.0 | Hold + continue | 3.0s | Scene holds. Ambient glow on both phones. |

**Continue button**: Appears at `t = 10.0s` (after both grids are shown), positioned bottom-center, 48px height, `min-width: 160px` touch target. Fade-in over 500ms. Text: "Continue" (i18n key: `lesson.continue`). The button does NOT interrupt the animation. If tapped early, all objects snap to final states over 200ms.

### 3.4 Visual Design Details

- **Phone body**: `#1e293b` (slate-800) with `#475569` (slate-600) stroke, rounded corners 16px. Mimics a simplified smartphone silhouette.
- **Battery fill (left)**: `#34d399` (emerald-400). Represents the "familiar" view -- percent as a number students already know.
- **Battery fill (right)**: `#818cf8` (indigo-400). Represents the "fraction" view -- the mathematical equivalent.
- **Equals sign**: `#fbbf24` (amber-400). The key connector. Large, impossible to miss.
- **Grid cells**: 8x8px each within the 80x120px battery area on mobile. Each cell has 0.5px gap in `#0f172a`.
- **Background**: `#0f172a` (slate-900). Clean, dark stage.

### 3.5 Sound Design

| Moment | Sound | Duration | Notes |
|---|---|---|---|
| Battery fill (both) | Soft rising tone (sine wave, C4 to E4) | 2.0s | Gentle, not alarming. Stereo-panned left/right for each phone. |
| Equals sign appearance | Discovery chime (rising two-note) | 400ms | Platform-wide "notice something" cue. |
| Grid morph | Soft click sequence | 1.5s | Tiny clicks (5ms each, 20 per second) as grid lines draw. Gives a "digital" feel. |
| Reveal text | None | -- | Text speaks for itself. |

All sounds respect `soundEnabled` user preference. Sounds loaded as 22kHz mono WAV, <10KB each, service-worker cached.

### 3.6 Gamification: Hook XP

No XP for watching the hook. The hook activates curiosity and the reward-prediction system. Watching >15s without skipping is tracked analytically but has no gamification effect.

### 3.7 Accessibility

- `aria-live="polite"` region announces: "Two phones shown side by side. Left phone says 45 percent. Right phone says 45 out of 100. Both have the same amount of battery charge. Per cent means per hundred."
- All animated elements have `prefers-reduced-motion` fallback: show final state (both phones with grids, reveal text) immediately with simple fade-in (0.5s total).
- Phone outlines and labels are SVG DOM elements, not canvas, for screen reader access.

---

## 4. Stage 2 -- Spatial Experience (3-4 min)

### 4.1 Overview

The primary spatial model is a 10x10 grid where the entire grid = 100%, each cell = 1%. Students tap cells to shade them and observe three simultaneous readouts (percent, fraction, decimal) update in real time. A secondary bar model and a circle chart are available via toggle. The three readouts reinforce the triple-encoding that defeats the "percent is separate from fractions/decimals" misconception.

**Minimum interaction count**: 10 distinct interactions before the "Continue to Guided Discovery" button activates. An "interaction" is defined as: tapping a cell to shade/unshade, tapping a column header to shade a full column, using the percent slider, or switching between models.

**Interaction counter**: Displayed as a subtle progress ring around the Continue button. The ring fills as the student interacts. At 10 interactions the ring completes and the button glows softly.

### 4.2 Layout

```
Desktop (>=768px):                          Mobile (<768px):
+-------------------------------------+    +-------------------+
|  [Triple Readout Bar]                |    | [Triple Readout]  |
|  45% = 45/100 = 0.45                |    | 45% = 45/100      |
+-------------------------------------+    |      = 0.45       |
|                                      |    +-------------------+
|  [10x10 Grid]         [Side Panel]  |    | [10x10 Grid]      |
|  +----------------+   +---------+   |    | +---------------+  |
|  | ****.......... |   | Bar     |   |    | | ****......... |  |
|  | ****.......... |   | Model   |   |    | | ****......... |  |
|  | ****.......... |   |         |   |    | | ****......... |  |
|  | ****.......... |   | Circle  |   |    | | *****........ |  |
|  | *****......... |   | Chart   |   |    | | ............. |  |
|  | .............. |   |         |   |    | +---------------+  |
|  | .............. |   +---------+   |    |                    |
|  | .............. |                 |    | [Model Toggle]     |
|  | .............. |                 |    | [Slider: 0--100%]  |
|  | .............. |                 |    | [Clear]            |
|  +----------------+                 |    | [Continue]         |
|                                      |    +-------------------+
|  [Model Toggle]  [Slider: 0--100%]  |
|  [Clear]                [Continue]  |
+-------------------------------------+
```

### 4.3 Component: Triple Readout Bar

A live-updating display at the top of the scene showing all three representations simultaneously.

| Property | Value |
|----------|-------|
| Font | System mono, `tabular-nums` |
| Layout | Horizontal: `{percent}% = {fraction} = {decimal}` |
| Percent font size | `clamp(36px, 8vw, 56px)`, font-weight 700 |
| Fraction | KaTeX `\frac{N}{100}`, same visual scale |
| Decimal | `clamp(36px, 8vw, 56px)`, font-weight 700 |
| Colors | Percent in emerald (`#34d399`), fraction in indigo (`#818cf8`), decimal in amber (`#f59e0b`) |
| Background | `#1e293b` (slate-800), `border-radius: 16px`, `padding: 16px 24px` |
| Update animation | When value changes, each readout does `scale: 1.0 -> 1.05 -> 1.0` spring (0.3s) |
| Equals signs | White (`#f8fafc`), 24px, between each readout |
| Mobile adaptation | Stacks to two lines: `45% = 45/100` on first line, `= 0.45` on second line |

### 4.4 Component: 10x10 Percent Grid (Primary Model)

A 10x10 grid where each cell represents 1% and the whole grid represents 100%.

#### 4.4.1 Grid Specifications

| Property | Value |
|----------|-------|
| Total cells | 100 (10 rows x 10 columns) |
| Grid container size | `min(80vw, 400px)` square |
| Cell size | Container size / 10 (e.g., 40px x 40px at 400px container) |
| Cell gap | 1px (CSS grid `gap: 1px`) |
| Grid background (gap color) | `#334155` (slate-700) -- creates visible grid lines |
| Unshaded cell | `#1e293b` (slate-800) |
| Shaded cell (active) | `#818cf8` (indigo-400) at 80% opacity |
| Cell hover (desktop) | `background: #818cf840` (indigo at 25%), 0.1s transition |
| Cell border-radius | 2px |
| Column labels | Along the top: `10%`, `20%`, ..., `100%` in emerald (`#34d399`), font-size 10px. Display every other column on mobile to avoid crowding. |
| Row labels | Along the left: `1`, `2`, ..., `10` in `#94a3b8` (slate-400), font-size 10px. Every other row on mobile. |

#### 4.4.2 Grid Interaction

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Shade a single cell | Tap cell | Cell fills indigo with pop: `scale: 0 -> 1`, 0.15s, `spring({ damping: 15, stiffness: 400 })` | `shadedCells` set adds cell ID |
| Unshade a single cell | Tap shaded cell | Reverse pop: `scale: 1 -> 0.8 -> 0`, 0.15s, then returns to unshaded | `shadedCells` set removes cell ID |
| Shade entire column | Tap column header label | All 10 cells in column fill with downward stagger (0.03s between cells) | All 10 cells in column toggled |
| Paint-drag across cells | Touch-drag across cells | Cells shade as finger moves, sequential pop animation | Each traversed cell added to `shadedCells` |
| Clear all | "Clear" button | All cells shrink out simultaneously (`scale: 1 -> 0`, 0.3s), then grid resets | `shadedCells` cleared |

#### 4.4.3 Column Highlight Effect

When a full column (10 cells) is shaded:
1. Column cells briefly flash brighter (`opacity: 0.8 -> 1.0 -> 0.8`, 0.3s)
2. Label appears above column: "+10%" in emerald (`#34d399`), 14px, fading out after 1s
3. Column header gets a subtle glow ring

When all 100 cells are shaded:
1. Grid pulses with bright glow (`box-shadow: 0 0 20px rgba(255,255,255,0.2)`, 0.4s)
2. Triple readout shows `100% = 100/100 = 1.00` and text callout: "That's 100% -- the whole thing!" in white, 18px, font-weight 600
3. Callout fades out after 2s

### 4.5 Component: Percent Slider

A horizontal slider ranging from 0 to 100, controlling how many cells are shaded. Shading applies column-by-column from left to right.

#### 4.5.1 Visual Design

- **Track**: Full container width minus 32px padding. Height 6px. Background: `#1e293b` (slate-800). Border-radius: 3px.
- **Filled track** (left of thumb): gradient from `#818cf8` to `#34d399` (indigo to emerald). Animates width on change.
- **Thumb**: 28px diameter circle. Fill: `#818cf8`. Stroke: `#e2e8f0` 2px. Drop shadow: `0 2px 4px rgba(0,0,0,0.3)`. Hover/press: scale `1.15` (100ms spring).
- **Tick marks**: Tick marks at 0, 10, 20, ..., 100 below the track. Each 2px wide x 8px tall, `#475569`.
- **Tick labels**: `0%`, `10%`, `20%`, ..., `100%`. Font: 10px system mono. Color: `#94a3b8`. Current value highlighted in `#34d399`, font-weight 600.
- **Snap behavior**: Snaps to integer values (0-100). Between integers, thumb follows pointer but value commits only at threshold crossing.
- **Touch target**: Thumb effective touch area is 44x44px (visual 28px + 8px padding in all directions).

#### 4.5.2 Slider-Grid Synchronization

When the slider is dragged:
- Cells shade/unshade to match the slider value, filling column by column (left to right, top to bottom within a column).
- For slider value `v`: shade cells 1 through `v` in reading order (left-to-right, top-to-bottom by column).
- Cells shade/unshade with rapid stagger animation (0.01s between cells for smooth flow).
- The triple readout updates in real time.

When cells are tapped individually:
- The slider position updates to match the new shaded count.
- Slider thumb animates to new position with `spring({ damping: 20, stiffness: 300 })`.

#### 4.5.3 Slider Interaction

- **Drag**: Horizontal drag via `@use-gesture/react`. Constrained to x-axis.
- **Tap on track**: Thumb animates to tapped position (200ms spring).
- **Keyboard**: Left/Right decrements/increments by 1. Shift+Left/Right by 10. Home = 0, End = 100.
- **Accessibility**: `role="slider"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow`, `aria-label="Percentage value"`.

### 4.6 Component: Model Toggle

A segmented control for switching between three representations:

- Three segments: "Grid" (left), "Bar" (center), "Circle" (right)
- Segment container: `background: #0f172a`, `border-radius: 12px`, `padding: 4px`, `border: 1px solid #334155`
- Active segment: `background: #334155`, `border-radius: 8px`, white text, font-weight 600
- Inactive segment: transparent background, `#94a3b8` text
- Size: each segment `72px x 40px` (meets 44px minimum via container height)
- Transition: active background slides (0.2s, `ease: "easeInOut"`)
- Default: Grid (primary model)

### 4.7 Component: Percent Bar (Secondary Model)

A horizontal bar divided into 100 segments, with the shaded portion filling from left to right.

| Property | Value |
|----------|-------|
| Width | `min(85vw, 400px)` |
| Height | 48px |
| Background | `#1e293b` (slate-800) |
| Shaded fill | `#818cf8` at 80% opacity, width = `(shadedCount / 100) * barWidth` |
| Border | 1.5px `#64748b`, border-radius 8px |
| Labels | Left end: "0%". Right end: "100%". Above fill edge: current percent in emerald. Font: 12px, `tabular-nums`. |
| Fill animation | Width change: `spring({ damping: 20, stiffness: 300 })` |
| Interaction | Tap on bar to set percent (tap position maps to 0-100). Same paint-drag as grid. |

### 4.8 Component: Circle Chart (Secondary Model)

A pie/donut chart showing the shaded percentage as a filled arc.

| Property | Value |
|----------|-------|
| Diameter | `min(50vw, 240px)` |
| Donut thickness | 30px (outer radius - inner radius) |
| Background ring | `#334155` |
| Filled arc | `#818cf8` at 80% opacity. Arc starts at 12 o'clock (270 degrees in standard math), sweeps clockwise. |
| Center label | Current percent in white, 36px, bold, `tabular-nums` |
| Arc animation | Sweep angle: `spring({ damping: 20, stiffness: 300 })` |
| Interaction | Tap/drag along the circumference to set percent. Touch point maps to angle, angle maps to percent. |
| SVG path | `M cx cy-r A r r 0 largeArcFlag 1 endX endY` for the filled arc, using standard arc calculations. |

### 4.9 State Management

```typescript
interface PercentSpatialState {
  // Grid state
  shadedCells: Set<string>; // cell IDs like "r3-c7"
  shadedCount: number;      // derived: shadedCells.size

  // Shared state
  activeModel: "grid" | "bar" | "circle";
  interactionCount: number;
  hasUsedGrid: boolean;
  hasUsedBar: boolean;
  hasUsedCircle: boolean;

  // Derived (all three update together)
  percentValue: number;     // 0-100
  fractionNumerator: number; // 0-100 (denominator is always 100)
  decimalValue: number;     // 0.00-1.00
}
```

All three models are synchronized: changing the percent in one model updates the other two instantly.

### 4.10 Interaction Requirements

| Requirement | Details |
|-------------|---------|
| MIN_INTERACTIONS | 10 tap, drag, or slider actions before Continue button appears |
| Interaction tracking | Cell tap, column tap, slider drag, bar tap, circle drag all count. Model toggle does NOT count. |
| Continue button | Fades in after MIN_INTERACTIONS reached. No requirement to use all three models (but tracked for XP bonus). |
| Continue button style | Same as Hook stage continue button |
| Inactivity hint | After 30s without interaction, AI tutor peeks in: "Try tapping cells on the grid! Each cell is 1 percent." (i18n key: `lesson.percents.stage2Hint`) |
| Initial state | Grid: all cells unshaded (0%). Slider at 0. Triple readout: 0% = 0/100 = 0.00 |

### 4.11 Mobile Adaptations

- **< 768px width**: Single column. Triple readout on top (sticky, 80px). Grid below. Model toggle + slider + controls at bottom (fixed, 100px).
- **< 400px width**: Grid container shrinks to `min(85vw, 300px)`. Column labels show at 20%, 40%, 60%, 80%, 100% only. Slider labels show at 0%, 50%, 100% only.
- **Touch behavior**: All tap targets >= 44x44px. Grid cells have minimum size of 28px via padding when container is small. Paint-drag compensates for small cells.

### 4.12 Accessibility (Stage 2)

- Grid: Each cell has `role="checkbox"`, `aria-label="Cell row {r}, column {c}, {shaded/unshaded}. 1 percent."`, `aria-checked="true/false"`
- Grid total announced via `aria-live="polite"`: "45 cells shaded. 45 percent. 45 out of 100. 0.45."
- Slider: `role="slider"`, `aria-label="Percentage value"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow="{value}"`
- Model toggle: `role="tablist"` with `role="tab"` for each option
- Keyboard: Arrow keys navigate grid cells, Enter/Space to toggle. Tab to controls. On slider: Left/Right by 1, Shift+arrow by 10.
- High contrast mode: cell borders increase to 2px, shaded cell opacity increases to 100%

---

## 5. Stage 3 -- Guided Discovery (3-5 min)

### 5.1 Purpose

Guide the student through a sequence of observations that build the core insight: percent is a fraction with denominator 100, and "X% of Y" is a multiplicative operation (not additive). Directly confront the key misconceptions through visual proof.

### 5.2 Layout

Full viewport. Dark background (`#0f172a`). Content centered, max-width 640px. The 10x10 grid from Stage 2 remains visible (read-only, non-interactive) as a reference throughout discovery prompts.

### 5.3 Prompt Sequence

The stage consists of 5 sequential prompts. Each must be acknowledged before the next appears.

#### Prompt 1: The Triple Identity (display + acknowledgment)

**Visual**: A 10x10 grid (180px square) auto-shades 45 cells (4 full columns + 5 cells in column 5), animating column-by-column over 1.5s.

Three labels appear simultaneously below the grid, stacked vertically, each sliding in from the right (0.3s stagger):
- Line 1: `45%` in emerald (`#34d399`), 32px, bold
- Line 2: `= 45/100` in indigo (`#818cf8`), 28px. KaTeX: `= \frac{45}{100}`
- Line 3: `= 0.45` in amber (`#f59e0b`), 28px, `tabular-nums`

Between lines 1 and 2, an animated arrow morphs the `%` sign into `/100` -- the `%` glyph stretches, the two dots become 0s, the slash becomes a fraction bar. Duration: 1.0s, spring easing.

**Text** (card container, background `#1e293b`, border-radius 12px, padding 20px):
- "45 cells out of 100 = 45 per hundred = 45%. The percent sign (%) is just shorthand for 'out of 100.' Every percent IS a fraction with 100 on the bottom."
- The phrase "out of 100" is bold and highlighted in amber (background `#fbbf2420`, padding 2px 6px, border-radius 4px).
- The phrase "every percent IS a fraction" is bold and indigo.
- i18n key: `lesson.percents.stage3.prompt1`

**Acknowledgment**: "I see it!" button (emerald background `#34d399`, white text). On tap, Prompt 2 slides in from the right (0.4s, `ease: "easeInOut"`), Prompt 1 slides out left.

#### Prompt 2: The Conversion Machine (interactive, requires completion)

**Text**: "Now let's build conversions. Set the grid to 75%. What fraction and decimal is that?"

**Interactive element**: The 10x10 grid becomes interactive again. Student can tap cells or use the slider to set the grid to 75%.

**Auto-trigger**: When the student shades exactly 75 cells (accepted range: 73-77 for tolerance, snaps to 75 on confirmation):
1. The triple readout animates: `75% = 75/100 = 0.75`
2. An additional simplification arrow appears below the fraction: `75/100` morphs into `3/4` with an animated arrow labeled `÷25`:
   - KaTeX: `\frac{75}{100} \xrightarrow{\div 25} \frac{3}{4}`
   - Arrow draws left-to-right over 0.5s, amber color
   - The `3/4` appears with pop animation: `scale: 0 -> 1`, `spring({ damping: 15, stiffness: 400 })`
3. Text: "75% = 75/100 = 3/4 = 0.75. Every percent can simplify to a simpler fraction too!"
- i18n key: `lesson.percents.stage3.prompt2`

**Acknowledgment**: "Got it!" button after simplification animation completes.

#### Prompt 3: Breaking 100% (animated + interactive, requires acknowledgment)

**Text**: "Can percent go above 100? Watch this."

**Animation**:
1. **0.0s**: The 10x10 grid is fully shaded (100 cells, all indigo). Triple readout: `100% = 100/100 = 1.00`. Text above: "100% = the whole thing" in white.
2. **1.0s**: A second partial row of 10 cells appears BELOW the grid, separated by a subtle gap (4px). These cells are styled differently: `border: 1px dashed #818cf8`, background `#0f172a`.
   - Entry animation: row slides down from the grid bottom edge, 0.4s, `spring({ damping: 20, stiffness: 300 })`
3. **1.5s**: 2 of the 10 overflow cells shade in amber (`#f59e0b`) with pop animation.
4. **2.0s**: Triple readout updates: `120% = 120/100 = 1.20`. The "120%" has a subtle glow in amber.
5. **2.5s**: Text appears: "120% means 120 out of 100 -- MORE than the whole!" The word "MORE" is bold, amber, pulsing once.

**Interactive follow-up**: Student can tap the overflow cells to add/remove them. Readout updates live. Range: 100-110 (10 overflow cells available).

**Text** (card):
- "Percent CAN go above 100. 120% = 1.20 = more than 1 whole. 200% would mean 2 wholes. There's no ceiling!"
- i18n key: `lesson.percents.stage3.prompt3`

**Acknowledgment**: "Mind blown!" button (amber background `#fbbf24`, dark text `#0f172a`).

#### Prompt 4: The Percent-Of Trap (confronts key misconception)

**Text**: "Here's where it gets tricky. What is 50% of 80?"

**Visual**: Two elements appear:
1. A number display: `50% of 80 = ?` in white, 36px, bold. The `?` pulses in amber.
2. Below: Two answer buttons side-by-side:
   - Left: `130` (red herring -- the additive misconception: 50 + 80)
   - Right: `40` (correct)
   - Each button: 120px wide, 56px tall, `border-radius: 12px`, `background: #334155`, font-size 28px, white text

**If student taps `40` (correct)**:
1. Button turns green (border `#34d399`, background `#34d39920`)
2. An 8x10 grid appears (representing 80 items -- 8 columns of 10):
   - All 80 cells shade in light blue (`#60a5fa40`)
   - Then 40 cells (the left half, 4 columns) shade over with indigo (`#818cf8`)
   - A bracket appears: left half labeled "50% of 80" = "40", right half labeled "the other 50%"
3. Text: "50% of 80 means HALF of 80. Half of 80 is 40. Percent-of is multiplication: 50/100 x 80 = 40."
4. The phrase "Percent-of is multiplication" is bold and amber-highlighted.
5. i18n key: `lesson.percents.stage3.prompt4.correct`

**If student taps `130` (incorrect)**:
1. Button briefly flashes red (0.3s)
2. Text: "Careful! 50% of 80 doesn't mean 50 + 80. The word 'of' in math means multiply. 50% means 50 out of 100 = 1/2. Half of 80 = 40."
3. The same 8x10 grid animation plays (showing that half of 80 is 40, not 130).
4. Buttons remain active for retry.
5. i18n key: `lesson.percents.stage3.prompt4.incorrect`

**Acknowledgment**: "I get it!" button after correct answer.

#### Prompt 5: Building the Mental Model (synthesis)

**Visual**: Three mini scenarios displayed as cards in a vertical stack:

**Card A** (auto-animating):
- `10% of 200 = ?`
- A 10x10 grid with 10 cells shaded (one column). Arrow points to a group of 200 dots arranged 10x20. 20 dots highlight: "10% of 200 = 20"
- Entry: slide-in from left, 0.3s

**Card B** (auto-animating, 1.5s delay):
- `25% of 60 = ?`
- A 10x10 grid with 25 cells shaded (2.5 columns). Arrow points to a group of 60 dots arranged 6x10. 15 dots highlight: "25% of 60 = 15"
- Entry: slide-in from left, 0.3s

**Card C** (auto-animating, 3.0s delay):
- `100% of 50 = ?`
- A fully shaded 10x10 grid. Arrow points to 50 dots all highlighted: "100% of 50 = 50 (the whole thing!)"
- Entry: slide-in from left, 0.3s

**Insight card** (appears after all three cards, background `#7c3aed20`, border-left 4px solid `#a78bfa`, padding 16px):
- "Key Insight: To find X% of a number, convert the percent to a decimal (divide by 100) and multiply. 25% of 60 = 0.25 x 60 = 15."
- The formula `0.25 \times 60 = 15` is KaTeX-rendered in amber.
- i18n key: `lesson.percents.stage3.keyInsight`

**Acknowledgment**: Continue button appears after insight card.

### 5.4 Accessibility (Stage 3)

- Grid visualizations have `aria-label`: "Grid showing 45 percent: 45 out of 100 cells shaded"
- Answer buttons have `role="radio"` within `role="radiogroup"` labeled "What is 50 percent of 80?"
- Overflow cells (Prompt 3) each have `role="checkbox"`, `aria-label="Overflow cell {i}, shaded/unshaded"`
- All prompts are in screen-reader-accessible text containers
- Validation results announced via `aria-live="assertive"`: "Correct! 50 percent of 80 is 40."
- Auto-animated cards (Prompt 5) have `aria-label` describing the complete scenario

---

## 6. Stage 4 -- Symbol Bridge (2-3 min)

### 6.1 Purpose

Overlay formal mathematical notation onto the spatial model. The student sees the percent-fraction-decimal conversion formulas emerge from the grid they already understand. Each notation piece appears on top of the grid with explicit visual connections.

### 6.2 Layout

Full viewport. A static 10x10 grid is displayed on the left (or top on mobile) with 45 cells shaded. Notation appears alongside to the right (or below on mobile). Max-width 720px, centered.

### 6.3 Notation Sequence

Each notation step appears with a 2.0s delay between steps. The grid highlights change to match each step.

| Step | Visual Action | Notation (KaTeX) | Color | Connection |
|------|---------------|-------------------|-------|------------|
| 1 | Grid shows 45 cells shaded. An animated bracket appears on the right side labeled "45 cells" and on the bottom labeled "100 cells total" | `45\% = \frac{45}{100}` | Emerald (%) / Indigo (fraction) | Arrow from bracket to fraction numerator and denominator |
| 2 | The fraction `45/100` morphs: numerator and denominator both shrink by dividing by 5, animated step-by-step: `45/100 -> 9/20` | `\frac{45}{100} = \frac{9}{20}` | Indigo | GCD annotation: `\div 5` on arrow between fractions |
| 3 | A decimal number line segment (0 to 1.0) appears below the grid. A point slides to 0.45. A vertical dashed line connects the grid's 45th cell boundary to the point on the number line. | `\frac{45}{100} = 0.45` | Amber (decimal) | Dashed line from grid to number line |
| 4 | The grid dims. Three large equations appear stacked: `45\% = \frac{45}{100} = 0.45`. Below, a general formula fades in. | General formula: `x\% = \frac{x}{100} = x \div 100` | White | The `x` pulses in amber |
| 5 | The "percent of" formula appears with the grid re-lighting. Half the grid re-shades (50 cells). An arrow points from the grid to a separate display: `50\% \text{ of } 80 = \frac{50}{100} \times 80 = 0.50 \times 80 = 40` | `x\% \text{ of } n = \frac{x}{100} \times n` | Amber formula on dark card | Each step of the calculation highlights in sequence |

### 6.4 "Percent-of" Calculation Walkthrough

After step 5, an interactive element allows the student to see the calculation broken down:

**Display** (background `#1e293b`, border-radius 12px, padding 24px):

```
50% of 80
= 50/100 x 80     (convert percent to fraction)
= 0.50 x 80       (or convert to decimal)
= 40               (multiply)
```

Each line fades in with 1.5s delay:
- Line 1: white, 24px, bold
- Line 2: indigo (`#818cf8`), 20px. The annotation "(convert percent to fraction)" is in `#94a3b8`, 14px, italic
- Line 3: amber (`#f59e0b`), 20px. Annotation in muted text.
- Line 4: emerald (`#34d399`), 28px, bold. A green checkmark pops in alongside.

### 6.5 Final Summary

After all notation is revealed, a summary card appears:

**Card** (background `#7c3aed20`, border-left 4px solid `#a78bfa`, padding 20px):
- "The Percent Triple: `x% = x/100 = x ÷ 100`"
- "Percent OF: `x% of n = (x/100) × n`"
- Both formulas in KaTeX, amber on dark.
- i18n key: `lesson.percents.stage4.summary`

**Continue Trigger**: All notation revealed + 2s delay.

### 6.6 Accessibility (Stage 4)

- Each notation step announced via `aria-live="polite"`: "45 percent equals 45 over 100."
- KaTeX renders with appropriate `aria-label` on each `<span>`.
- General formula announced: "x percent equals x divided by 100."
- Number line point has `role="img"`, `aria-label="Point at 0.45 on the number line from 0 to 1."

---

## 7. Stage 5 -- Real-World Anchor (1-2 min)

### 7.1 Purpose

Connect percent to the student's daily experience. 11-14 year olds encounter percents in shopping, gaming, sports, and social media. Each scenario shows how percent simplifies real comparisons.

### 7.2 Layout

Centered card stack, max-width 640px. Cards are vertically stacked with 12px spacing. Each card slides in from the right with 0.3s stagger.

### 7.3 Scenarios (4 cards)

| # | Scenario | Icon | Example | Highlighted Math | i18n Key |
|---|----------|------|---------|-----------------|----------|
| 1 | Shopping | Cart icon (SVG, `#34d399`) | "Sneakers: $120, on sale for 25% off. You save $30, pay $90." | `25\% \text{ of } \$120 = 0.25 \times 120 = \$30` in amber | `lesson.percents.stage5.card1` |
| 2 | Gaming | Controller icon (SVG, `#818cf8`) | "Game download: 73% complete. 73 out of every 100 chunks received." | Progress bar showing 73% filled, with `73/100` label | `lesson.percents.stage5.card2` |
| 3 | Sports | Basketball icon (SVG, `#f59e0b`) | "Free-throw shooting: 80%. Made 80 out of every 100 attempts." | `80\% = \frac{80}{100} = \frac{4}{5}` | `lesson.percents.stage5.card3` |
| 4 | Grades | Star icon (SVG, `#a78bfa`) | "Test score: 18 out of 20 = 90%. Converting to 'out of 100' lets you compare across different tests." | `\frac{18}{20} = \frac{90}{100} = 90\%` with `\times 5` annotation on arrow | `lesson.percents.stage5.card4` |

### 7.4 Card Design

Each card:
- Background: `#1e293b`, border-radius 12px, padding 20px
- Left: icon (40px, colored per table)
- Right: text block
  - Title: scenario name, 14px, uppercase, letter-spacing 1px, icon color
  - Example: 16px, `#e2e8f0`, line-height 1.6
  - Math: KaTeX rendered, amber (`#f59e0b`), 18px
- Entry animation: `opacity: 0 -> 1`, `translateX: 24px -> 0`, 0.4s, `ease: "easeOut"`

### 7.5 Continue Trigger

Immediate. Continue button always visible at the bottom of the card stack. No minimum interaction required.

### 7.6 Accessibility (Stage 5)

- Each card is a `<section>` with `aria-label="Real-world example: {scenario name}"`
- KaTeX formulas have `aria-label` with spoken-math equivalents
- Icons are decorative: `aria-hidden="true"`

---

## 8. Stage 6 -- Practice (5-10 min)

### 8.1 Purpose

Retrieval practice across three cognitive layers: recall, procedure, and understanding. 9 problems total. NO free-text input for graded answers. Each answer receives immediate visual feedback with brief explanation.

### 8.2 General Practice UI

Each problem is presented in a `ProblemCard` component:
- Background: `#1e293b`, border-radius 16px, padding 24px
- Max-width: 640px, centered
- Top: Problem number and layer badge (e.g., "Problem 1 of 9" / "Recall" in a small pill: background `#34d39920` for recall, `#818cf820` for procedure, `#fbbf2420` for understanding)
- Center: Problem content (varies by problem type)
- Bottom: Answer input area (varies by problem type)

Progress bar at the top of the viewport:
- 9 dots, each 12px circle
- Unfilled: `#334155`
- Current: pulsing border in primary color (`#8b5cf6`)
- Correct: `#34d399` (green)
- Incorrect: `#f87171` (red)

### 8.3 Layer 0: Recall (Problems 1-3)

#### Problem 1: Percent Meaning Identification

**Prompt**: "What does 60% mean?"
- i18n key: `lesson.percents.practice.p1.prompt`

**Visual**: The number `60%` displayed large (56px) in emerald (`#34d399`), bold, centered. Below it, a 10x10 grid (160px square) with 60 cells shaded in indigo -- 6 full columns filled left-to-right. The grid animates in over 0.5s (column stagger 0.08s each).

**Input**: Four multiple-choice buttons, vertically stacked:
- A: "60 more than 100" (wrong -- additive misconception)
- B: "60 out of 100" (correct)
- C: "60 times 100" (wrong -- multiplication confusion)
- D: "100 out of 60" (wrong -- inverted ratio)
- Each button: full-width (max 480px), `min-height: 52px`, `border-radius: 12px`, `background: #334155`, `color: #f8fafc`, font-size 16px, padding 16px

**Correct answer**: B

**Feedback on correct**:
1. Button B turns green (background `#34d39920`, border `#34d399`)
2. Green checkmark pops in (0.3s)
3. On the grid, a bracket annotation appears: left side "60 cells" (indigo), right side "out of 100 total" (muted)
4. Text: "Correct! 60% means 60 out of 100. The word 'percent' comes from Latin 'per centum' -- per hundred." (green, 16px)
5. Feedback stays visible until "Next" tapped
- i18n key: `lesson.percents.practice.p1.correct`

**Feedback on incorrect** (e.g., student taps A):
1. Button A flashes red (0.2s)
2. Text: "Not quite. Percent doesn't mean 'more than 100.' It means 'out of 100.' Look at the grid: 60 out of 100 cells are shaded -- that's 60%."
3. Buttons remain active for retry
4. After 2s, correct answer gets subtle pulsing border hint
- i18n key: `lesson.percents.practice.p1.incorrect`

#### Problem 2: Percent-to-Fraction Conversion

**Prompt**: "Write 35% as a fraction."
- i18n key: `lesson.percents.practice.p2.prompt`

**Visual**: `35%` displayed large (48px) in emerald. Below, a mini 10x10 grid (140px) with 35 cells shaded (3 full columns + 5 cells in column 4), indigo fill. The grid auto-animates in over 0.8s.

**Input**: Four multiple-choice buttons:
- A: `35/10` (wrong denominator)
- B: `35/1000` (wrong denominator)
- C: `35/100` (correct)
- D: `7/10` (wrong simplification -- should be 7/20)
- KaTeX-rendered fractions on buttons. Each button: full-width, `min-height: 52px`, `border-radius: 12px`.

**Correct answer**: C (`35/100`)

**Feedback on correct**:
1. Button C turns green
2. Green checkmark
3. On the grid, a label appears: "35 cells out of 100 = 35/100" in indigo
4. A follow-up simplification animates: `35/100 -> 7/20` with `÷5` arrow in amber (0.5s)
5. Text: "35% = 35/100. You can simplify: 35/100 = 7/20 (divide both by 5). But 35/100 is always correct -- percent IS 'out of 100.'"
- i18n key: `lesson.percents.practice.p2.correct`

**Feedback on incorrect** (e.g., student taps D):
1. Flash red
2. Text: "7/10 = 70%, not 35%. Remember: percent means 'per hundred,' so the denominator is always 100. 35% = 35/100. You could simplify to 7/20, but that wasn't an option here."
- i18n key: `lesson.percents.practice.p2.incorrectD`

#### Problem 3: Percent-to-Decimal Conversion

**Prompt**: "Convert 8% to a decimal."
- i18n key: `lesson.percents.practice.p3.prompt`

**Visual**: `8%` displayed large (48px) in emerald. Below, a mini 10x10 grid (140px) with only 8 cells shaded (less than 1 full column) in indigo. The small number of shaded cells makes the visual point: 8% is a small portion.

**Input**: Four multiple-choice buttons:
- A: `0.8` (common error -- forgot to divide by 100, divided by 10 instead)
- B: `8.0` (forgot to divide at all)
- C: `0.08` (correct)
- D: `0.008` (divided by 1000)
- Each: full-width, 52px, `tabular-nums` font.

**Correct answer**: C (`0.08`)

**Feedback on correct**:
1. Button C turns green
2. On the grid, a label: "Only 8 cells out of 100 = 0.08" in amber
3. Animated walkthrough: `8% -> 8/100 -> 0.08`. Each step fades in (0.5s delay between). Arrow between each step.
4. Text: "8% = 8/100 = 0.08. To convert percent to decimal, divide by 100 (move the decimal point 2 places left). Be careful: 0.8 would be 80%, not 8%!"
5. The last sentence about 0.8 vs 0.08 is bold and rose-colored (addresses common error).
- i18n key: `lesson.percents.practice.p3.correct`

**Feedback on incorrect** (e.g., student taps A):
1. Flash red
2. Text: "0.8 = 80%, not 8%. To go from percent to decimal, divide by 100 (move the decimal 2 places left): 8% = 8 ÷ 100 = 0.08. Think: 8 cells out of 100."
- i18n key: `lesson.percents.practice.p3.incorrectA`

### 8.4 Layer 1: Procedure (Problems 4-6)

#### Problem 4: Finding Percent of a Number

**Prompt**: "What is 25% of 200?"
- i18n key: `lesson.percents.practice.p4.prompt`

**Visual**: The expression `25% of 200 = ?` displayed in white, 32px, bold. Below, a mini 10x10 grid (120px) with 25 cells shaded (2.5 columns) in indigo. Next to it, a representation of 200 as a `10 x 20` dot array (each dot 4px, in rows of 20), all dots in `#475569`. No dots highlighted yet.

**Input**: Numeric input field:
- A single number input field, centered
- Field: 120px wide, 56px tall, `border: 2px solid #475569`, `border-radius: 12px`, `background: #0f172a`, `color: #f8fafc`, font-size 28px, `tabular-nums`, `text-align: center`
- Placeholder: `?`
- Input type: `number`, `inputmode="numeric"` for mobile numeric keyboard
- "Check" button below: 120px wide, 48px tall, primary purple `#8b5cf6`
- "Check" disabled until a number is entered

**Correct answer**: `50` (exact match)

**Feedback on correct**:
1. Input field border turns green (`#34d399`)
2. Green checkmark pops in
3. In the dot array, 50 dots (the first 2.5 rows of 20, mapped as the top-left quarter) highlight in indigo with stagger animation (0.02s per dot)
4. Calculation walkthrough animates below:
   ```
   25% of 200
   = 25/100 × 200
   = 0.25 × 200
   = 50
   ```
   Each line: 0.5s delay, slide from right
5. Text: "25% = 1/4. One quarter of 200 = 50. You can also think: 25/100 × 200 = 50."
- i18n key: `lesson.percents.practice.p4.correct`

**Feedback on incorrect** (e.g., student types `225` -- additive error):
1. Input border turns red
2. Text: "Not 225. '25% of 200' means multiply, not add. 25% = 25/100 = 0.25. So 0.25 × 200 = 50. Think of it as one quarter of 200."
3. Input clears for retry
- i18n key: `lesson.percents.practice.p4.incorrect`

#### Problem 5: Grid Shading (Interactive)

**Prompt**: "Shade the grid to show 70%."
- i18n key: `lesson.percents.practice.p5.prompt`

**Visual**: An interactive 10x10 grid (200px square), all cells unshaded initially:
- Cells are tappable (same interaction as Stage 2 grid)
- Above the grid: target value "70%" in emerald, 32px, bold, with a pulsing glow
- Below the grid: live counter "X% shaded" in `#94a3b8`, 14px, `tabular-nums`
- Column headers clickable to shade full columns

**Input**: Tap cells to shade them. A "Check" button (primary purple, 120px x 48px) appears below the counter.

**Correct answer**: Exactly 70 cells shaded (placement doesn't matter -- any 70 cells accepted)

**Validation**: On "Check" tap:
- If correct (70 cells):
  1. All 70 shaded cells flash green briefly (0.3s)
  2. Green checkmark
  3. The cells rearrange smoothly into 7 full columns (column-by-column layout), demonstrating the clean column structure of 70%
  4. Triple readout appears: `70% = 70/100 = 7/10 = 0.70`
  5. Text: "70% = 70 out of 100. That's 7 full columns = 7/10 = 0.70. Notice how percent, fraction, and decimal are just three ways to say the same thing."
  - i18n key: `lesson.percents.practice.p5.correct`
- If incorrect:
  1. Counter flashes red
  2. Text: "You shaded {X}% but we need 70%. Each cell is 1%, so shade exactly 70 cells. Try using column headers -- each column is 10%!"
  3. Grid remains interactive for retry
  - i18n key: `lesson.percents.practice.p5.incorrect`

#### Problem 6: Ordering Percents, Fractions, and Decimals (Drag-to-Arrange)

**Prompt**: "Order from least to greatest: 0.3, 1/2, 45%, 0.09"
- i18n key: `lesson.percents.practice.p6.prompt`

**Visual**: Four number cards in the given order:
- Card designs:
  - `0.3`: amber text (`#f59e0b`), 20px, `tabular-nums`
  - `1/2`: KaTeX-rendered in indigo (`#818cf8`)
  - `45%`: emerald text (`#34d399`), 20px
  - `0.09`: amber text, 20px, `tabular-nums`
- Each card: `min-width: 80px`, height 52px, `border-radius: 12px`, `background: #334155`, centered content
- Horizontally arranged with 8px gaps (2x2 grid on mobile < 400px)

Below the cards: four numbered slots (1, 2, 3, 4) labeled "Least" at slot 1, "Greatest" at slot 4
- Slots: `min-width: 80px`, height 52px, `border: 2px dashed #475569`, `border-radius: 12px`
- On drag-over: border solid `#818cf8`

**Input**: Drag to reorder. During drag: lifted card has `scale: 1.05`, `shadow: 0 8px 24px rgba(0,0,0,0.4)`. Drop: spring snap.
- Tap-to-place alternative: tap card to select (highlight border), tap slot to place.

**Correct order**: `0.09`, `0.3`, `45%`, `1/2`
(Because: 0.09 = 9%, 0.3 = 30%, 45% = 45%, 1/2 = 50%)

**Feedback on correct**:
1. All slots turn green (border solid `#34d399`)
2. Below each card, the percent equivalent fades in (12px, `#94a3b8`):
   - `0.09 = 9%`
   - `0.3 = 30%`
   - `45% = 45%`
   - `1/2 = 50%`
3. Text: "Converting everything to percent makes ordering easy! 9% < 30% < 45% < 50%. This is WHY percent exists -- it gives a common language for comparison."
4. The phrase "common language for comparison" is bold and amber.
5. Confetti burst: 15 particles in emerald and indigo.
- i18n key: `lesson.percents.practice.p6.correct`

**Feedback on incorrect**:
1. Misplaced slots flash red
2. Hint: "Try converting each value to a percent first. What's 0.3 as a percent? What's 1/2 as a percent?"
- i18n key: `lesson.percents.practice.p6.hint`

### 8.5 Layer 2: Understanding (Problems 7-9)

#### Problem 7: Misconception Buster

**Prompt**: "Marcus says 50% of 80 = 130. He added 50 + 80. Why is Marcus wrong?"
- i18n key: `lesson.percents.practice.p7.prompt`

**Visual**: A thought bubble showing Marcus's work: `50% of 80 = 50 + 80 = 130` with a red X through it. Below, an 8x10 grid (80 cells) with no shading yet.

**Input**: Four multiple-choice options, vertically stacked:
- A: "Because 50 + 80 = 120, not 130" (wrong -- corrects arithmetic but not the conceptual error)
- B: "Because 'of' means multiply, not add. 50% of 80 = 50/100 x 80 = 40" (correct -- identifies the conceptual error)
- C: "Because percent can never be used with other numbers" (nonsense distractor)
- D: "Because you need to subtract instead: 80 - 50 = 30" (wrong operation)
- Each button: full-width (max 480px), `min-height: 60px`, padding 16px, text wraps within

**Correct answer**: B

**Feedback on correct**:
1. Button B turns green
2. The 8x10 grid animates: all 80 cells shade light blue, then the left half (40 cells) shades indigo (50% of 80 = half = 40)
3. The red X on Marcus's work stays. Below it, the correct work appears in green:
   ```
   50% of 80
   = 50/100 × 80
   = 0.5 × 80
   = 40
   ```
4. Text: "The word 'of' in math means multiply. 50% is 0.5, and 0.5 × 80 = 40. Marcus treated percent as a number to add, but percent is a RATIO -- it tells you what FRACTION of the amount to take."
5. "RATIO" and "FRACTION" are bold and amber.
- i18n key: `lesson.percents.practice.p7.correct`

**Feedback on incorrect** (e.g., student picks A):
1. Flash red
2. Text for A: "Actually, 50 + 80 does equal 130, but that's not the issue. The problem is that Marcus ADDED instead of MULTIPLYING. 'Of' means multiply. 50% of 80 = 0.5 × 80 = 40."
- i18n key: `lesson.percents.practice.p7.incorrectA`

#### Problem 8: Greater Than 100% (Conceptual)

**Prompt**: "A store had 200 customers last month and 300 this month. This month's customers as a percent of last month's is..."
- i18n key: `lesson.percents.practice.p8.prompt`

**Visual**: Two bar charts side by side:
- Left bar: height representing 200, labeled "Last month: 200", fill `#475569`
- Right bar: height representing 300 (1.5x the left bar height), labeled "This month: 300", fill `#818cf8`
- A dashed horizontal line at the 200 mark extends across both bars, labeled "100%"
- The portion of the right bar above the dashed line is highlighted in amber (`#f59e0b`)

**Input**: Four multiple-choice buttons:
- A: `50%` (wrong -- this is the increase, not the total ratio)
- B: `100%` (wrong -- this would mean they're equal)
- C: `150%` (correct -- 300 is 150% of 200)
- D: `300%` (wrong -- confusing the count with the percent)
- Each button: 100px wide, 52px tall, `border-radius: 12px`

**Correct answer**: C (`150%`)

**Feedback on correct**:
1. Button C turns green
2. On the right bar, labels appear:
   - Lower section (up to dashed line): "100% = 200" in white
   - Upper section (above dashed line): "+50% = +100" in amber
   - Full bar: "Total = 150%" in emerald, with bracket
3. Calculation walkthrough:
   ```
   300/200 = 1.5 = 150%
   ```
4. Text: "300 is 150% of 200. That's 100% (the original 200) plus 50% more (another 100). Percent CAN exceed 100% -- it just means more than the whole original amount."
- i18n key: `lesson.percents.practice.p8.correct`

**Feedback on incorrect** (e.g., student picks A):
1. Flash red
2. Text for A: "50% would mean 100 customers (half of 200). But we have 300 customers. Think of it as: 300/200 = 1.5, and 1.5 as a percent = 150%. The increase is 50%, but the total is 150%."
- i18n key: `lesson.percents.practice.p8.incorrectA`

#### Problem 9: Triple-Matching (Drag-and-Connect)

**Prompt**: "Match each percent to its fraction AND decimal equivalent."
- i18n key: `lesson.percents.practice.p9.prompt`

**Visual**: Three columns:
- Left column: Percents (emerald): `20%`, `75%`, `5%`
- Middle column: Fractions (indigo, KaTeX): `3/4`, `1/5`, `1/20`
- Right column: Decimals (amber): `0.05`, `0.75`, `0.2`
- Each item is a chip: 80px x 44px, `border-radius: 8px`, `background: #334155`
- Items in middle and right columns are in SCRAMBLED order (as shown above -- not matching the left column order)

**Input**: Tap a percent chip, then tap the matching fraction, then tap the matching decimal. A connecting line draws between matched items. Alternatively: drag from one chip to another.

**Correct matches**:
- `20%` <-> `1/5` <-> `0.2`
- `75%` <-> `3/4` <-> `0.75`
- `5%` <-> `1/20` <-> `0.05`

**Validation**: After all 3 sets are matched, a "Check" button appears.

On "Check":
- For each set:
  - If correct: connecting lines turn green, chips get green borders
  - If incorrect: connecting lines turn red, chips flash red. Lines reset for retry.

**Feedback (all correct)**:
1. All lines green, all chips green borders
2. Below the matching area, each set gets a mini explanation:
   - `20% = 20/100 = 1/5 = 0.20`
   - `75% = 75/100 = 3/4 = 0.75`
   - `5% = 5/100 = 1/20 = 0.05`
3. Text: "Every percent has a fraction and decimal twin. Converting between them is the key skill -- you divide by 100 to go from percent to decimal, and simplify the fraction by finding the GCF."
4. Celebration: confetti burst, 15 particles.
- i18n key: `lesson.percents.practice.p9.correct`

**Feedback (some incorrect)**:
1. Incorrect connections flash red, then reset
2. Hint: "Convert each percent to hundredths first: 20% = 20/100, 75% = 75/100, 5% = 5/100. Then simplify the fractions and convert to decimals."
- i18n key: `lesson.percents.practice.p9.hint`

### 8.6 Practice XP Calculation

| Factor | XP |
|--------|----|
| Correct on first try | 15 XP |
| Correct on second try | 8 XP |
| Correct on third+ try | 4 XP |
| All 9 correct on first try | +20 XP bonus (Perfect Practice) |
| Completing practice stage | +10 XP (participation) |
| Total possible range | 135 + 20 + 10 = **165 XP max** |

### 8.7 Accessibility (Stage 6)

- Multiple-choice buttons have `role="radio"` within `role="radiogroup"`
- Drag-to-arrange (P6) has keyboard alternative: Tab + Enter to pick up, arrow keys to reorder, Enter to place
- Grid interaction (P5) supports keyboard: arrow keys to navigate cells, Space/Enter to toggle, count announced via `aria-live`
- Numeric input (P4) has `aria-label="Enter the value of 25 percent of 200"`
- Drag-and-connect (P9) has keyboard alternative: Tab between chips, Enter to select/connect, announced via `aria-live`
- Feedback announced via `aria-live="assertive"` for correctness, `aria-live="polite"` for explanations
- No timer -- students have unlimited time on each problem

---

## 9. Stage 7 -- Reflection (~1 min)

### 9.1 Purpose

Metacognitive self-explanation. The student consolidates understanding by explaining the concept in their own words. Per the self-explanation effect (Chi et al., 1989), this produces 2-3x better retention than passive review.

### 9.2 Layout

Centered card, max-width 640px. Dark background.

### 9.3 Prompt

**Card** (background `#1e293b`, border-radius 16px, padding 24px):
- **Header**: "Reflection" in a small pill badge (background `#7c3aed20`, text `#a78bfa`, 12px, uppercase, letter-spacing 1px)
- **Prompt text**: "Your friend thinks '50% of 80' means you add 50 + 80 to get 130. How would you explain why the answer is actually 40?"
  - i18n key: `lesson.percents.stage7.prompt`
  - Font: 18px, `#f8fafc`, line-height 1.6, font-weight 500
- **Visual hint**: Below the prompt, a mini 8x10 grid (100px x 80px, representing 80 cells):
  - Left half (40 cells) shaded in indigo, right half unshaded
  - Below grid: "50% of 80 = 40" in emerald, 14px
  - This primes the student's spatial reasoning before they write

### 9.4 Input

**Text area**:
- Min height: 120px, auto-grow to max 240px
- Placeholder: "I would explain that..." (i18n key: `lesson.percents.stage7.placeholder`)
- Character counter: `{current} / 20 minimum`
  - Color: `#64748b` when below minimum, `#34d399` when reached
  - Position: bottom-right
- Border: 1px solid `#475569`, `border-radius: 12px`, padding 16px
- Background: `#0f172a`
- Font: 16px, `#e2e8f0`, line-height 1.6

**Submit button**:
- Disabled until 20+ characters entered (opacity 0.4, no pointer-events)
- Enabled: primary purple `#8b5cf6`, "Submit Reflection" text
- Size: full width, 52px tall, `border-radius: 12px`
- Loading state: spinner replaces text during AI evaluation

**Skip button**:
- Below submit, smaller and de-emphasized
- Text: "Skip" in `#64748b`, 14px, no background, underline on hover
- Size: auto-width, 36px tall
- On tap: skips to lesson completion (0 XP for reflection)

### 9.5 After Submission

1. **AI Evaluation** (via `lesson.submitReflection` tRPC endpoint):
   - Response sent to Claude API for quality scoring
   - Typical response time: 1-2 seconds
   - During evaluation: spinner, text area read-only

2. **Feedback Display** (0.5s fade-in):

   **Quality indicator**: 0-5 filled stars (24px icons)
   - 0-1 stars: "Keep practicing your explanations!"
   - 2-3 stars: "Good start! You're on the right track."
   - 4-5 stars: "Excellent explanation! You really understand this."

   **AI feedback text**: 1-3 sentence personalized response:
   - Background: `#0f172a`, border-left 4px solid `#8b5cf6`, padding 16px
   - Font: 14px, `#cbd5e1`, italic

   **XP earned**: Floating "+{amount} XP" badge, animates upward (0.8s):
   - Range: 0-80 XP based on quality
   - Color: `#fbbf24` (amber)

3. **Confirmation Visual** (appears with feedback):
   - An animation replaying the core insight:
     - `50% of 80` displayed
     - An 8x10 grid appears. All 80 cells shade light blue.
     - Then the left half (40 cells) shades indigo. Label: "50% = half"
     - Arrow points from the half grid to the number `40`
     - Below: "50% of 80 = 0.5 × 80 = 40. Percent means per hundred. 'Of' means multiply."
   - Animation: 2.0s total
   - Final reinforcement of core concept

4. **Lesson Complete**:
   - After feedback, "Complete Lesson" button fades in (1s delay)
   - Primary button style
   - On tap: lesson completion flow:
     - XP summary (total across all stages, counting-up number)
     - Achievement check (lesson completion streaks)
     - SRS state update: marks NO-1.6 as "learning" at recall layer (layer 0)
     - Unlocks successor topics: NO-1.7 (Percent Applications), NO-1.7a (Percent Change) become "available" in the Knowledge Nebula
     - Redirects to lesson summary or learn page

### 9.6 Accessibility (Stage 7)

- Prompt is in a `<label>` linked to the text area via `for`/`id`
- Star rating announced via `aria-live`: "Your reflection scored 4 out of 5 stars"
- AI feedback in `aria-live="polite"` region
- Confirmation visual has `aria-label`: "50 percent of 80 equals 40. Percent means per hundred. Of means multiply."
- Skip button has `aria-label="Skip reflection (0 XP earned)"`

---

## 10. Technical Specifications

### 10.1 Color Palette (Percents)

| Element | Primary | Fill (20%) | CSS Variable |
|---------|---------|------------|-------------|
| Percent value | `#34d399` (emerald) | `#34d39933` | `--pct-percent` |
| Fraction value | `#818cf8` (indigo) | `#818cf833` | `--pct-fraction` |
| Decimal value | `#f59e0b` (amber) | `#f59e0b33` | `--pct-decimal` |
| Grid cell shaded | `#818cf8` (indigo) | `#818cf880` | `--pct-cell-active` |
| Overflow cell | `#f59e0b` (amber) | `#f59e0b80` | `--pct-overflow` |
| Background (dark) | `#0f172a` | -- | `--bg-primary` |
| Surface | `#1e293b` | -- | `--bg-surface` |
| Text primary | `#f8fafc` | -- | `--text-primary` |
| Text secondary | `#e2e8f0` | -- | `--text-secondary` |
| Text muted | `#94a3b8` | -- | `--text-muted` |
| Success | `#34d399` | -- | `--color-success` |
| Error | `#f87171` | -- | `--color-error` |
| Warning/XP | `#fbbf24` | -- | `--color-warning` |
| Primary action | `#8b5cf6` | -- | `--color-primary` |

### 10.2 Accessibility: Color-Blind Safety

| Color | Protanopia | Deuteranopia | Tritanopia |
|-------|-----------|-------------|-----------|
| Emerald `#34d399` (percent) | Yellow-green | Yellow-green | Blue-pink |
| Indigo `#818cf8` (fraction) | Blue | Blue | Blue-pink |
| Amber `#f59e0b` (decimal) | Yellow-brown | Yellow-brown | Pink-red |

All three remain distinguishable under each deficiency. Per Constitution Principle IV, color is never the sole channel for meaning. Every color-coded element also has a text label (%, fraction bar, decimal point) and positional context.

### 10.3 Typography

| Element | Font | Size | Weight | Features |
|---------|------|------|--------|----------|
| Large percent values | System mono / JetBrains Mono | `clamp(36px, 8vw, 56px)` | 700 | `tabular-nums` |
| Inline percents | System mono | `clamp(16px, 3.5vw, 22px)` | 600 | `tabular-nums` |
| Body text | System sans (Inter preferred) | 16px | 400 | `line-height: 1.6` |
| Labels | System sans | `clamp(10px, 2.5vw, 14px)` | 600 | `text-transform: uppercase`, `letter-spacing: 0.5px` |
| KaTeX math | KaTeX default | `clamp(16px, 3.5vw, 22px)` | -- | KaTeX rendering |
| Button text | System sans | 16px | 600 | -- |
| Grid cell labels | System mono | 10px | 400 | `tabular-nums` |

### 10.4 Animation Specifications

#### Global Animation Config

```typescript
const ANIMATION_CONFIG = {
  spring: {
    default: { damping: 20, stiffness: 300 },
    gentle: { damping: 25, stiffness: 200 },
    bouncy: { damping: 12, stiffness: 400 },
    stiff: { damping: 30, stiffness: 500 },
    pop: { damping: 15, stiffness: 400 },
  },
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    dramatic: 0.8,
  },
  ease: {
    default: "easeInOut",
    enter: "easeOut",
    exit: "easeIn",
    bounce: "easeOutBack",
  },
} as const;
```

#### Framer Motion Variants

```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const popIn = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring", damping: 15, stiffness: 400 },
};

const slideFromRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const cellPop = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring", damping: 15, stiffness: 400, duration: 0.15 },
};

const percentMorph = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  transition: { type: "spring", damping: 20, stiffness: 300, duration: 1.0 },
};
```

#### Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- All spring animations become simple `opacity` transitions (0.3s)
- No `scale`, `translate`, or `rotate` animations
- Hook phone fill: instant fill, no gradual rise
- Grid cell shading: instant fill, no pop
- Percent morph (% -> /100): instant swap, no animation
- Particle effects (confetti, glow) disabled entirely
- All stagger delays set to 0

```typescript
const useReducedMotion = (): boolean => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
};
```

### 10.5 Touch & Interaction Targets

| Element | Min Size | Notes |
|---------|----------|-------|
| Grid cells | Variable (40px at 400px grid) | Min grid size ensures cells >= 28px; paint-drag compensates |
| Model toggle segments | 72px x 40px | Within 44px container height |
| Percent slider thumb | 28px visible, 44px hit area | Invisible touch area extends 8px all directions |
| Multiple-choice buttons | full-width x 52px+ | Comfortable mobile tapping |
| Drag chips (ordering) | 80px x 52px | Large enough for drag initiation |
| Numeric input field | 120px x 56px | Meets 44px requirement |
| Continue button | 160px x 48px | Prominent, centered |
| Text area | full-width x 120px+ | Auto-growing |
| Matching chips (P9) | 80px x 44px | Meets minimum |

### 10.6 Gesture Handling

All drag interactions use `@use-gesture/react`:

```typescript
// Percent slider drag
const bindSliderDrag = useDrag(({ movement: [mx], active, cancel }) => {
  if (Math.abs(mx) < 5 && !active) return;
  // Convert pixel movement to percent value (0-100)
  // Snap to integer values
}, {
  filterTaps: true,
  axis: "x",
  threshold: 5,
  rubberband: true,
});

// Grid paint-drag
const bindGridDrag = useDrag(({ xy: [x, y], active }) => {
  // Convert screen coordinates to grid cell
  // Shade cell under finger
  // Track touched cells to avoid toggle-flicker
}, {
  filterTaps: true,
  threshold: 3,
});

// Drag-to-arrange (P6)
const bindCardDrag = useDrag(({ movement: [mx, my], active, args: [cardId] }) => {
  // Move card with finger
  // Detect nearest slot via proximity
  // Snap into slot on release
}, {
  filterTaps: true,
  threshold: 5,
});

// Circle chart arc drag
const bindCircleDrag = useDrag(({ xy: [x, y], active }) => {
  // Convert (x, y) to angle relative to circle center
  // Map angle to percent value
  // Update shaded arc
}, {
  filterTaps: true,
});
```

### 10.7 Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile S | < 375px | Single column, grid shrinks to `min(85vw, 300px)`, triple readout stacks to 3 lines, practice cards compact, matching chips (P9) stack in 2 columns |
| Mobile M | 375-639px | Single column, grid at `min(80vw, 360px)`, triple readout stacks to 2 lines, comfortable spacing |
| Tablet | 640-1023px | Stage 2: grid + side panel side-by-side. Practice: wider cards. Discovery grids side-by-side. Matching (P9): 3 columns side-by-side. |
| Desktop | >= 1024px | Max-width container (800px), centered. Stage 2: side-by-side with generous spacing. All layouts horizontal. |

### 10.8 Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Animation frame rate | 60fps (P95 >= 55fps) | Framer Motion `onFrame` + `PerformanceObserver` |
| SVG element count (grid, max cells) | <= 200 elements | 100 cells + labels + controls + overlays |
| Time to interactive (Stage 2) | < 1.5s | Stage transition to first cell tappable |
| Memory (Stage 2, full grid + bar + circle) | < 15MB | Heap snapshot |
| Cell shade/unshade latency | < 16ms (1 frame) | State update + render |
| Slider update latency | < 16ms | Thumb position + grid update |
| Hook animation | Consistent 60fps | Phone fill + grid morph |

### 10.9 State Persistence

Lesson progress persisted to local storage (Dexie.js) and server (via `lesson.completeStage` tRPC):

```typescript
interface LessonProgressState {
  lessonId: "NO-1.6";
  currentStage: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  stageCompletions: Record<number, boolean>;
  practiceResults: Array<{
    problemIndex: number;
    attempts: number;
    correct: boolean;
    responseTimeMs: number;
    hintsUsed: number;
  }>;
  reflectionText: string | null;
  reflectionScore: number | null;
  totalXpEarned: number;
  startedAt: string; // ISO timestamp
  lastInteractionAt: string; // ISO timestamp
}
```

On each stage completion:
1. Update local state (Zustand store)
2. Persist to IndexedDB (Dexie.js) for offline resilience
3. Send `lesson.completeStage` to server (background, non-blocking)
4. If offline: queue for background sync

### 10.10 File Structure

```
src/content/domains/numbers-operations/NO-1.6/
+-- lesson.mdx              # Stage text content (i18n-ready)
+-- animations.json          # MathScene DSL configs for all stages
+-- problems.json            # Practice problem bank (9 problems)
+-- meta.json                # Metadata: prerequisites, successors, hooks

src/components/lesson/custom/
+-- PercentsLesson/
    +-- PercentsLesson.tsx    # Custom lesson component (orchestrates all stages)
    +-- HookBatteryAnimation.tsx  # Stage 1: phone battery cinematic
    +-- PercentGrid.tsx       # 10x10 grid component (interactive, reusable)
    +-- PercentBar.tsx        # Horizontal bar model
    +-- PercentCircle.tsx     # Circle/donut chart model
    +-- TripleReadout.tsx     # Percent/fraction/decimal live display
    +-- PercentSlider.tsx     # 0-100% slider
    +-- PercentMorph.tsx      # % -> /100 morphing animation
    +-- ModelToggle.tsx       # Grid/Bar/Circle toggle
    +-- GridComparison.tsx    # Side-by-side grid comparison
    +-- TripleMatching.tsx    # Stage 6 P9: drag-and-connect matching
    +-- SymbolOverlay.tsx     # Stage 4: notation appearance
    +-- index.ts              # Barrel export
```

---

## 11. Accessibility

### 11.1 Global Requirements

- All interactive elements have `aria-label` attributes describing their function
- Stage transitions announced via `aria-live="polite"`: "Stage 2 of 7: Spatial Experience"
- Progress bar dots have `aria-label`: "Stage {n}: {completed/current/upcoming}"
- `prefers-reduced-motion` fully respected (see 10.4)
- Keyboard navigation for all interactions (Tab, Enter/Space, Arrow keys)
- High-contrast mode support: borders increase to 2px, opacity increases to 100%
- Screen reader testing with VoiceOver (macOS/iOS) and NVDA (Windows)

### 11.2 WCAG 2.1 AA Compliance

| Criterion | Implementation |
|-----------|---------------|
| 1.1.1 Non-text Content | All SVG elements have `aria-label` or `role="img"` with description |
| 1.3.1 Info and Relationships | Semantic HTML: headings, lists, labels. Grid uses `role="grid"` with `role="gridcell"` |
| 1.4.3 Contrast | All text meets 4.5:1 ratio on `#0f172a` background. Checked: `#f8fafc` (18.3:1), `#e2e8f0` (12.5:1), `#94a3b8` (5.2:1), `#34d399` (7.1:1) |
| 2.1.1 Keyboard | All interactions keyboard-accessible (detailed per stage) |
| 2.4.7 Focus Visible | Focus ring: 2px solid `#818cf8`, 2px offset. Visible on all interactive elements. |
| 4.1.2 Name, Role, Value | All custom controls have appropriate ARIA roles and states |

---

## 12. Performance Budget

| Stage | Max SVG Elements | Max DOM Nodes | Target TTI |
|-------|-----------------|---------------|------------|
| Hook | 60 | 150 | < 1.0s |
| Spatial | 200 | 350 | < 1.5s |
| Discovery | 250 | 400 | < 1.0s |
| Symbol Bridge | 80 | 200 | < 0.5s |
| Real World | 40 | 120 | < 0.5s |
| Practice | 200 (P9 matching) | 300 | < 1.0s |
| Reflection | 20 | 100 | < 0.5s |

**Total memory ceiling**: 20MB peak (Stage 2 with all three models loaded).

**Animation budget**: All animations must maintain 60fps on a mid-range mobile device (e.g., Samsung Galaxy A53, iPhone SE 3). If `PerformanceObserver` detects < 30fps for > 2s, disable pop animations and use instant transitions.

---

## 13. Content Files

### 13.1 meta.json

```json
{
  "id": "NO-1.6",
  "name": "Percents",
  "domain": "numbers-operations",
  "gradeLevel": 7,
  "prerequisites": ["NO-1.5", "NO-1.3"],
  "successors": ["NO-1.7", "NO-1.7a"],
  "estimatedMinutes": 25,
  "stages": 7,
  "hook": "Which phone has more charge: 45% or 45/100? They're the same! Percent = per hundred.",
  "tags": ["percent", "percentage", "per-hundred", "fraction-decimal-percent", "percent-of", "grid-model", "conversion"],
  "contentLicense": "CC BY-SA 4.0",
  "version": "1.0.0"
}
```

### 13.2 problems.json

```json
{
  "problems": [
    {
      "id": "NO-1.6-P1",
      "layer": 0,
      "type": "meaning-identification",
      "difficulty": 0.2,
      "prompt": "lesson.percents.practice.p1.prompt",
      "visual": {
        "number": "60%",
        "gridShadedCells": 60,
        "gridPattern": "columns-first"
      },
      "answer": {
        "correct": "60 out of 100",
        "options": [
          "60 more than 100",
          "60 out of 100",
          "60 times 100",
          "100 out of 60"
        ],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p1.correct",
        "incorrect": "lesson.percents.practice.p1.incorrect"
      }
    },
    {
      "id": "NO-1.6-P2",
      "layer": 0,
      "type": "percent-to-fraction",
      "difficulty": 0.25,
      "prompt": "lesson.percents.practice.p2.prompt",
      "visual": {
        "percent": "35%",
        "gridShadedCells": 35,
        "gridPattern": "columns-first"
      },
      "answer": {
        "correct": "35/100",
        "options": ["35/10", "35/1000", "35/100", "7/10"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p2.correct",
        "incorrectD": "lesson.percents.practice.p2.incorrectD"
      }
    },
    {
      "id": "NO-1.6-P3",
      "layer": 0,
      "type": "percent-to-decimal",
      "difficulty": 0.3,
      "prompt": "lesson.percents.practice.p3.prompt",
      "visual": {
        "percent": "8%",
        "gridShadedCells": 8,
        "gridPattern": "partial-column"
      },
      "answer": {
        "correct": "0.08",
        "options": ["0.8", "8.0", "0.08", "0.008"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p3.correct",
        "incorrectA": "lesson.percents.practice.p3.incorrectA"
      }
    },
    {
      "id": "NO-1.6-P4",
      "layer": 1,
      "type": "percent-of-number",
      "difficulty": 0.5,
      "prompt": "lesson.percents.practice.p4.prompt",
      "visual": {
        "expression": "25% of 200",
        "gridShadedCells": 25,
        "dotArray": { "rows": 10, "cols": 20 }
      },
      "answer": {
        "correct": 50,
        "type": "numeric-input"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p4.correct",
        "incorrect": "lesson.percents.practice.p4.incorrect"
      }
    },
    {
      "id": "NO-1.6-P5",
      "layer": 1,
      "type": "grid-shading",
      "difficulty": 0.5,
      "prompt": "lesson.percents.practice.p5.prompt",
      "visual": {
        "gridSize": 10,
        "targetPercent": 70,
        "targetCells": 70,
        "interactive": true
      },
      "answer": {
        "correct": 70,
        "type": "count-validation"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p5.correct",
        "incorrect": "lesson.percents.practice.p5.incorrect"
      }
    },
    {
      "id": "NO-1.6-P6",
      "layer": 1,
      "type": "mixed-ordering",
      "difficulty": 0.7,
      "prompt": "lesson.percents.practice.p6.prompt",
      "visual": {
        "items": ["0.3", "1/2", "45%", "0.09"]
      },
      "answer": {
        "correct": ["0.09", "0.3", "45%", "1/2"],
        "type": "drag-arrange"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p6.correct",
        "incorrect": "lesson.percents.practice.p6.hint"
      }
    },
    {
      "id": "NO-1.6-P7",
      "layer": 2,
      "type": "misconception-analysis",
      "difficulty": 0.8,
      "prompt": "lesson.percents.practice.p7.prompt",
      "visual": {
        "showThoughtBubble": true,
        "incorrectWork": "50% of 80 = 50 + 80 = 130",
        "gridSize": [8, 10]
      },
      "answer": {
        "correct": "B",
        "options": [
          "Because 50 + 80 = 120, not 130",
          "Because 'of' means multiply, not add. 50% of 80 = 50/100 x 80 = 40",
          "Because percent can never be used with other numbers",
          "Because you need to subtract instead: 80 - 50 = 30"
        ],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p7.correct",
        "incorrectA": "lesson.percents.practice.p7.incorrectA"
      }
    },
    {
      "id": "NO-1.6-P8",
      "layer": 2,
      "type": "greater-than-100",
      "difficulty": 0.75,
      "prompt": "lesson.percents.practice.p8.prompt",
      "visual": {
        "barChart": {
          "lastMonth": 200,
          "thisMonth": 300
        }
      },
      "answer": {
        "correct": "150%",
        "options": ["50%", "100%", "150%", "300%"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p8.correct",
        "incorrectA": "lesson.percents.practice.p8.incorrectA"
      }
    },
    {
      "id": "NO-1.6-P9",
      "layer": 2,
      "type": "triple-matching",
      "difficulty": 0.8,
      "prompt": "lesson.percents.practice.p9.prompt",
      "visual": {
        "percents": ["20%", "75%", "5%"],
        "fractions": ["3/4", "1/5", "1/20"],
        "decimals": ["0.05", "0.75", "0.2"]
      },
      "answer": {
        "correct": [
          ["20%", "1/5", "0.2"],
          ["75%", "3/4", "0.75"],
          ["5%", "1/20", "0.05"]
        ],
        "type": "triple-match"
      },
      "feedback": {
        "correct": "lesson.percents.practice.p9.correct",
        "incorrect": "lesson.percents.practice.p9.hint"
      }
    }
  ]
}
```

---

## 14. Gamification Integration

### 14.1 XP Summary

| Source | Min XP | Max XP |
|--------|--------|--------|
| Hook (completion) | 5 | 5 |
| Spatial Experience (completion + interactions) | 10 | 15 |
| Guided Discovery (all prompts completed) | 10 | 15 |
| Symbol Bridge (completion) | 5 | 5 |
| Real-World Anchor (completion) | 5 | 5 |
| Practice (9 problems) | 36 | 165 |
| Reflection (AI-scored) | 0 | 80 |
| **Total** | **71** | **290** |

### 14.2 Exploration Bonus (Stage 2)

```typescript
interface ExplorationMetrics {
  modelsUsed: Set<"grid" | "bar" | "circle">;
  uniquePercentsCreated: Set<number>;
  sliderUsed: boolean;
  totalTimeSpentMs: number;
}
```

- If `modelsUsed.size >= 3` AND `uniquePercentsCreated.size >= 5`: exploration bonus = 40 XP.
- If `modelsUsed.size >= 2` AND `uniquePercentsCreated.size >= 3`: exploration bonus = 20 XP.
- Otherwise: 0 bonus.

### 14.3 Achievement Triggers

| Achievement | Condition |
|-------------|-----------|
| "Per Centum" | Complete NO-1.6 lesson |
| "Triple Threat" | Create 10+ unique percent values using all three models (grid, bar, circle) in Stage 2 |
| "Beyond the Whole" | Shade >100% in Stage 3 (interact with overflow cells) |
| "Perfect Practice" | All 9 practice problems correct on first try |

---

## 15. AI Tutor Guidance

### 15.1 Socratic Mode Prompts

The AI tutor (Anthropic Claude) activates in specific scenarios:

| Trigger | AI Behavior |
|---------|------------|
| Stage 2: 30s inactivity | Peek-in: "Try tapping cells! Each cell is 1%. What does 50% look like?" |
| Stage 3 Prompt 2: Student shades wrong count | "How many cells do you need for 75%? Each cell is 1%, so 75% = 75 cells." |
| Stage 3 Prompt 4: Student picks 130 | "I see you added 50 + 80. But 'of' doesn't mean add. What does 50% mean as a fraction? Now multiply that fraction by 80." |
| Stage 6 P4: Student types wrong number | "Let's break it down. First, what is 25% as a decimal? Now multiply that by 200." |
| Stage 7: Low-quality reflection | "Can you explain what the word 'of' means in '50% of 80'? Why is it multiplication, not addition?" |

### 15.2 Hint Escalation

For each problem, hints escalate in specificity:
1. **Level 1** (after 15s): Conceptual nudge ("Think about what percent means...")
2. **Level 2** (after 30s): Procedural guide ("Convert the percent to a fraction with 100 on the bottom...")
3. **Level 3** (after 45s): Near-answer ("25% = 25/100 = 1/4. Now what is 1/4 of 200?")

Hint button appears after Level 1 timing. Each hint click escalates one level. Hints used are tracked (affects XP: -2 XP per hint, minimum 4 XP per problem).

---

## 16. Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Student navigates away mid-lesson | State persisted to IndexedDB. On return, resume from last completed stage. Show "Welcome back! You left off at Stage {n}." |
| Network offline during Practice | Problems loaded at stage entry and cached. Submissions queue locally. Sync when online. |
| Network offline during Reflection | Reflection text saved locally. AI evaluation deferred. Show "We'll evaluate your reflection when you're back online." |
| Student submits empty/whitespace reflection | Client-side validation prevents submission. Min 20 chars of non-whitespace. |
| Student submits gibberish reflection | AI evaluator gives 0-1 star. Feedback: "Try to explain in your own words why '50% of 80' equals 40. Think about the grid!" No punitive action. |
| Grid: student taps cells during paint-drag | `filterTaps: true` separates taps from drags. Taps toggle individual cells. Drags paint without re-toggling same-stroke cells. |
| Grid: rapid tapping | Debounce at 100ms. React 18 automatic batching coalesces state updates. |
| Percent slider: drag beyond range | Slider constrained to 0-100. `rubberband: true` gives elastic feedback at boundaries. |
| Stage 3 overflow cells: student tries to shade >110% | Overflow row limited to 10 cells (max 110%). Tooltip: "We have 10 extra cells for now. In the next lesson, we'll explore even bigger percents!" |
| Practice P4: student enters non-numeric text | Input type `number` with `inputmode="numeric"` prevents most non-numeric entry. Client-side validation strips non-digit characters. |
| Practice P6: student places card in occupied slot | Existing card returns to source. New card takes the slot. Spring animations for both movements. |
| Practice P9: student tries to match same column items | Only cross-column connections allowed. Same-column tap deselects. Visual feedback: brief shake on invalid attempt. |
| Screen reader with grid | Each cell announces state on focus: "Row 3, Column 7: shaded. 1 percent." Total announced on change. |
| Very slow device (< 30fps detected) | Disable cell pop animations (instant fill). Disable morph animations (instant swap). Disable particles. Log performance warning. |
| RTL layout (future) | Grid, bar, and circle work LTR for mathematical content. Percent notation is language-independent. UI chrome follows RTL rules. |
| Circle chart: tap near center | Ignore taps within inner radius of donut. Only arc region is tappable. |
| Bar model: very small percents (<5%) | Fill region may be narrow (<20px). Add a pulsing dot at the fill edge so the student can see/tap the boundary. |

---

## 17. Testing Requirements

### 17.1 Acceptance Criteria

A developer has fully implemented this lesson when:

1. [ ] All 7 NLS stages render and transition correctly in sequence
2. [ ] Hook animation plays phone battery sequence with correct timing, fill animations, and morph
3. [ ] The `%` -> `/100` morphing animation plays correctly (Hook and Stage 4)
4. [ ] 10x10 grid cells can be tapped to shade/unshade with pop animation and correct visual feedback
5. [ ] Grid paint-drag works on touch devices (shades multiple cells in one stroke)
6. [ ] Column header tap shades/unshades all 10 cells in the column
7. [ ] Full grid (100 cells) triggers "100% -- the whole thing!" celebration
8. [ ] Triple readout always shows correct percent, fraction, and decimal values, updating in real time
9. [ ] Percent slider (0-100) updates grid and triple readout synchronously
10. [ ] Model toggle switches between Grid, Bar, and Circle views, preserving percent value
11. [ ] Bar model fills proportionally and responds to tap/drag
12. [ ] Circle chart (donut) renders correct arc and responds to drag
13. [ ] Stage 3 Prompt 3: overflow row appears and allows shading >100%
14. [ ] Stage 3 Prompt 4: "50% of 80" validates both correct (40) and incorrect (130) with appropriate feedback
15. [ ] Stage 3 Prompt 5: three scenario cards animate in sequence with correct math
16. [ ] Stage 4: notation appears with correct KaTeX rendering, color-coding, and timing
17. [ ] Stage 4: "percent-of" calculation walkthrough animates step-by-step
18. [ ] Stage 5: four real-world cards display correctly with icons and highlighted math
19. [ ] All 9 practice problems function with correct input types and validation
20. [ ] Practice P4: numeric input accepts exact answer (50) with appropriate keyboard
21. [ ] Practice P5: interactive grid validates exactly 70 cells shaded
22. [ ] Practice P6: drag-to-arrange validates correct ordering across mixed formats
23. [ ] Practice P8: >100% conceptual question validates correctly
24. [ ] Practice P9: triple-matching validates all 3 sets of connections
25. [ ] Reflection stage enforces 20-char minimum and submits for AI scoring
26. [ ] Confirmation visual plays the 50%-of-80 demonstration after reflection
27. [ ] All interactions meet 44px minimum touch target
28. [ ] `prefers-reduced-motion` disables all motion-intensive animations
29. [ ] Screen reader announces all state changes via `aria-live` regions
30. [ ] Keyboard navigation works for all interactive elements (grid, slider, drag, matching)
31. [ ] Mobile layout (< 640px) is single-column and usable
32. [ ] Tablet+ layout (>= 640px) uses side-by-side where specified
33. [ ] All strings use i18n keys (no hardcoded English in components)
34. [ ] Lesson progress persists to IndexedDB and syncs to server
35. [ ] XP is calculated correctly per the XP Summary table
36. [ ] Performance: 60fps on mid-range mobile during all animations
37. [ ] Storybook stories exist for each stage in isolation
38. [ ] Vitest tests cover: grid cell count math, percent-fraction-decimal conversion, percent-of calculation, >100% logic
39. [ ] Playwright E2E test covers full lesson completion flow (all 7 stages)

### 17.2 i18n Keys (Complete List)

All user-facing strings externalized under `lesson.percents` namespace in `src/lib/i18n/messages/en.json`:

```
lesson.continue
lesson.percents.stage2Hint
lesson.percents.stage3.prompt1
lesson.percents.stage3.prompt2
lesson.percents.stage3.prompt3
lesson.percents.stage3.prompt4.correct
lesson.percents.stage3.prompt4.incorrect
lesson.percents.stage3.keyInsight
lesson.percents.stage4.summary
lesson.percents.stage5.card1
lesson.percents.stage5.card2
lesson.percents.stage5.card3
lesson.percents.stage5.card4
lesson.percents.practice.p1.prompt
lesson.percents.practice.p1.correct
lesson.percents.practice.p1.incorrect
lesson.percents.practice.p2.prompt
lesson.percents.practice.p2.correct
lesson.percents.practice.p2.incorrectD
lesson.percents.practice.p3.prompt
lesson.percents.practice.p3.correct
lesson.percents.practice.p3.incorrectA
lesson.percents.practice.p4.prompt
lesson.percents.practice.p4.correct
lesson.percents.practice.p4.incorrect
lesson.percents.practice.p5.prompt
lesson.percents.practice.p5.correct
lesson.percents.practice.p5.incorrect
lesson.percents.practice.p6.prompt
lesson.percents.practice.p6.correct
lesson.percents.practice.p6.hint
lesson.percents.practice.p7.prompt
lesson.percents.practice.p7.correct
lesson.percents.practice.p7.incorrectA
lesson.percents.practice.p8.prompt
lesson.percents.practice.p8.correct
lesson.percents.practice.p8.incorrectA
lesson.percents.practice.p9.prompt
lesson.percents.practice.p9.correct
lesson.percents.practice.p9.hint
lesson.percents.stage7.prompt
lesson.percents.stage7.placeholder
```
