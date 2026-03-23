# Lesson Design: NO-1.4 Understanding Fractions

**Version**: 1.0.0 | **Date**: 2026-03-22 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NO-1.4 | **Domain**: Numbers & Operations | **Grade**: 6
**Prerequisite**: NO-1.1 (Place Value) | **Successors**: NO-1.4a (Fraction Operations), NO-1.5 (Ratios & Proportions), NO-1.4b (Fractions/Decimals/Percents)
**Content Path**: `src/content/domains/numbers-operations/NO-1.4/`
**Constitution Compliance**: All 7 Core Principles verified. Full NLS 7-stage sequence implemented.

---

## Table of Contents

1. [Core Insight](#1-core-insight)
2. [Neuroscience Framework](#2-neuroscience-framework)
3. [Stage 1 — Hook (30-60s)](#3-stage-1--hook-30-60s)
4. [Stage 2 — Spatial Experience (2-4 min)](#4-stage-2--spatial-experience-2-4-min)
5. [Stage 3 — Guided Discovery (3-5 min)](#5-stage-3--guided-discovery-3-5-min)
6. [Stage 4 — Symbol Bridge (2-3 min)](#6-stage-4--symbol-bridge-2-3-min)
7. [Stage 5 — Real-World Anchor (1-2 min)](#7-stage-5--real-world-anchor-1-2-min)
8. [Stage 6 — Practice (Adaptive)](#8-stage-6--practice-adaptive)
9. [Stage 7 — Reflection (~1 min)](#9-stage-7--reflection-1-min)
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

A fraction is a number that represents parts of a whole. The denominator tells you how many equal parts the whole is divided into, and the numerator tells you how many of those parts you have.

**Secondary insights** (built progressively through stages):
- More pieces means each piece is smaller. The bigger the denominator, the smaller each part.
- Fractions that look different can represent the same quantity (equivalent fractions: 1/2 = 2/4 = 3/6 = 4/8).
- Equivalent fractions are produced by multiplying (or dividing) both numerator and denominator by the same nonzero number.
- Comparing fractions with the same denominator is trivial; comparing fractions with different denominators requires reasoning about piece size.

**Key misconception to defeat**: "1/3 is bigger than 1/2 because 3 > 2." This is the single most common Grade 6 fraction error. The spatial experience in Stage 2 directly confronts this by letting students see and manipulate the pieces. The student must viscerally observe that cutting into MORE pieces makes each piece SMALLER before any symbolic work begins.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | The fraction bar and circle are spatial objects. Students build fraction intuition by splitting and shading regions, engaging the intraparietal sulcus and visuospatial sketchpad before any symbolic representation. |
| PF-2: Dual Coding Theory | Labels (KaTeX) are embedded directly in the SVG scene next to shaded regions. Narration text appears inline with the visual — never in a separate panel that forces split attention. |
| PF-3: Embodied Cognition | Tap-to-shade and slider-to-split are motor actions. Physically splitting a bar and tapping pieces recruits motor cortex pathways, creating richer memory traces than passively watching. |
| PF-4: Spacing Effect | After this lesson, fraction items enter the FSRS queue at all three layers (recall, procedure, understanding). Initial stability is low (~1 day), forcing early review. |
| PF-5: Interleaving | Practice problems (Stage 6) interleave fraction identification, equivalent fractions, and comparison — never blocked by sub-type. |
| PF-6: Math Anxiety Reduction | The hook is playful (pizza), the spatial experience is exploratory (no right/wrong during manipulation), and the practice has no timer. Wrong answers get neutral, encouraging feedback. |

### 2.2 Cognitive Load Management

- **Intrinsic load**: Fractions are inherently moderate-complexity for Grade 6. The lesson decomposes the concept into three sub-ideas (part-of-whole, equivalent fractions, comparison) and introduces them sequentially.
- **Extraneous load**: Minimized by integrated labels (Dual Coding), single-focus screens, and progressive disclosure. The denominator slider and tap-to-shade interaction are the ONLY controls in Stage 2 — no menus, no settings, no distractions.
- **Germane load**: Maximized by the comparison overlay interaction (seeing 1/2 and 2/4 are identical forces schema restructuring) and the guided discovery prompts (elaborative interrogation).

### 2.3 Prior Knowledge Activation

The "pizza metaphor" activates episodic memory. Nearly every Grade 6 student has shared a pizza. This existing schema (splitting food among people) is leveraged as the bridge to formal fraction concepts. The hook deliberately uses a pizza circle to connect to this prior experience before transitioning to the more analytical fraction bar model.

### 2.4 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "1/3 > 1/2 because 3 > 2" | Very high (~60% of entering Grade 6) | Side-by-side bars: 1/2 bar is visibly longer than 1/3 bar. Overlay animation makes it undeniable. | 2, 3 |
| "2/4 is not the same as 1/2" | High (~40%) | Overlay animation: 1/2 bar placed over 2/4 bar — exact same length. Student explores 3/6, 4/8 etc. | 2, 3 |
| "The fraction bar means division, not parts" | Moderate (~25%) | Deferred — division interpretation comes in NO-1.4a. This lesson builds only the part-of-whole model. | N/A |
| "You can't have a fraction bigger than 1" | Low at Grade 6, grows | Briefly touched: denominator slider goes to 12, and student can shade all parts (12/12 = 1 whole). Improper fractions are a successor topic. | 2 |

---

## 3. Stage 1 — Hook (30-60s)

### 3.1 Narrative Arc

The hook tells a visual micro-story: a whole pizza gets progressively sliced into smaller pieces. Each cut doubles the number of slices while halving their size. The visual punchline is overlaying the tiny 1/8 slice on the large 1/2 slice — making the inverse relationship between denominator size and piece size viscerally obvious.

### 3.2 Scene Definition

```json
{
  "id": "NO-1.4-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 360],
  "background": "transparent",
  "objects": [
    {
      "type": "group",
      "id": "pizza-whole",
      "children": [
        {
          "type": "geometricShape",
          "id": "pizza-circle",
          "shape": "circle",
          "center": [200, 160],
          "radius": 120,
          "style": {
            "fill": "#f59e0b",
            "stroke": "#d97706",
            "strokeWidth": 2.5
          }
        },
        {
          "type": "geometricShape",
          "id": "pizza-crust-ring",
          "shape": "circle",
          "center": [200, 160],
          "radius": 120,
          "style": {
            "fill": "transparent",
            "stroke": "#b45309",
            "strokeWidth": 6
          }
        }
      ]
    },
    {
      "type": "group",
      "id": "slice-lines",
      "visible": false,
      "children": [
        {
          "type": "line",
          "id": "cut-h",
          "from": [80, 160],
          "to": [320, 160],
          "style": { "stroke": "#fefce8", "strokeWidth": 2 }
        },
        {
          "type": "line",
          "id": "cut-v",
          "from": [200, 40],
          "to": [200, 280],
          "style": { "stroke": "#fefce8", "strokeWidth": 2 }
        },
        {
          "type": "line",
          "id": "cut-d1",
          "from": [115, 75],
          "to": [285, 245],
          "style": { "stroke": "#fefce8", "strokeWidth": 2 }
        },
        {
          "type": "line",
          "id": "cut-d2",
          "from": [285, 75],
          "to": [115, 245],
          "style": { "stroke": "#fefce8", "strokeWidth": 2 }
        }
      ]
    },
    {
      "type": "annotation",
      "id": "label-whole",
      "position": [200, 310],
      "latex": "1 \\text{ whole pizza}",
      "anchor": "center",
      "style": { "fontSize": 18 }
    },
    {
      "type": "annotation",
      "id": "label-fraction",
      "position": [200, 310],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 22 }
    },
    {
      "type": "annotation",
      "id": "label-insight",
      "position": [200, 340],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 14 }
    },
    {
      "type": "annotation",
      "id": "narration-top",
      "position": [200, 20],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 16 }
    }
  ]
}
```

### 3.3 Animation Sequence

The hook runs as a single auto-triggered animation sequence. The student does not need to interact — they watch.

**Timeline (total: ~38 seconds):**

| Time (s) | Action | Duration | Details |
|---|---|---|---|
| 0.0-0.5 | Fade in pizza circle | 0.5s | `ease: "easeInOut"`. Pizza appears centered. |
| 0.5-1.5 | Hold: whole pizza | 1.0s | Label reads "1 whole pizza". |
| 1.5-2.0 | Knife slash SFX + cut-h line draw | 0.5s | Horizontal line draws left-to-right across the circle diameter. A subtle white flash along the cut path. `ease: "easeInOut"`. |
| 2.0-2.3 | Split animation | 0.3s | Top half shifts up 4px, bottom half shifts down 4px (spring: damping 20, stiffness 300), then snaps back. This "breathing" effect makes the cut feel physical. |
| 2.3-3.5 | Label morph | 0.3s | "1 whole pizza" cross-fades to `\\frac{1}{2}`. Narration top fades in: "Cut in half — two equal pieces." |
| 3.5-5.0 | One half shades | 0.5s | Top semicircle fills with `#818cf8` (indigo) at 60% opacity. 300ms ease-in transition. Remaining half stays `#f59e0b`. |
| 5.0-5.5 | Hold | 0.5s | Student sees 1/2 labeled and shaded. |
| 5.5-6.0 | Knife slash + cut-v line draw | 0.5s | Vertical line draws top-to-bottom. |
| 6.0-6.3 | Split animation | 0.3s | Four quadrants briefly shift outward 3px radially, then snap back. |
| 6.3-7.5 | Label morph | 0.3s | Label changes to `\\frac{1}{4}`. Narration: "Quarters — four equal pieces." |
| 7.5-8.5 | One quarter shades | 0.5s | Top-right quarter fills indigo. Other three remain amber. |
| 8.5-9.5 | Hold | 1.0s | |
| 9.5-10.0 | Knife slash + cut-d1 draw | 0.5s | Diagonal line draws. |
| 10.0-10.3 | Knife slash + cut-d2 draw | 0.3s | Second diagonal draws immediately after. |
| 10.3-10.6 | Split animation | 0.3s | Eight slices shift outward 2px, snap back. |
| 10.6-11.5 | Label morph | 0.3s | Label changes to `\\frac{1}{8}`. Narration: "Eighths — eight tiny pieces." |
| 11.5-12.5 | One eighth shades | 0.5s | One thin wedge fills indigo. |
| 12.5-15.0 | Camera zoom into 1/8 slice | 2.5s | `viewBox` smoothly animates to zoom into the indigo 1/8 slice, filling ~60% of the viewport. `ease: "easeInOut"`. |
| 15.0-16.0 | Narration | — | Text appears: "This is getting smaller as we cut MORE pieces." |
| 16.0-17.5 | Camera zoom back out | 1.5s | Return to full pizza view. |
| 17.5-20.0 | Key visual: overlay comparison | 2.5s | The 1/2 slice (semicircle) slides out of the pizza to the left (200ms, spring). The 1/8 slice slides out to the right (200ms, spring). Both are placed side by side at the same vertical baseline. The 1/2 slice is 4x taller/wider than the 1/8 slice. Both are filled indigo. A dashed bracket annotation appears between them: `\\frac{1}{2}` on the left, `\\frac{1}{8}` on the right. |
| 20.0-22.0 | Size comparison annotation | 1.0s | An arrow from 1/8 to 1/2 appears with label: "4x bigger!" |
| 22.0-26.0 | Hold + narration | 4.0s | Bottom narration fades in: "More cuts = smaller pieces." After 1.5s, second line: "The BIGGER the bottom number, the SMALLER the piece." Text uses bold (rendered via KaTeX `\\textbf{}`). |
| 26.0-28.0 | Slices slide back | 2.0s | Both slices return to their positions in the pizza. Camera holds full view. |
| 28.0-30.0 | Final hold | 2.0s | Full pizza with all 8 slices visible. Label shows `\\frac{1}{8}`. |

**Continue button**: Appears at `t = 10.0s` (after the eighths cut), positioned bottom-right, 48x48px touch target, subtle fade-in (`opacity: 0 -> 1` over 500ms). The button does NOT interrupt the animation — the hook continues playing while the button is available. If the student taps Continue before the hook finishes, the animation stops gracefully (all objects snap to their final states over 200ms).

### 3.4 Visual Design Details

- **Pizza color**: `#f59e0b` (amber-500) with `#d97706` (amber-600) stroke and `#b45309` (amber-700) crust ring.
- **Slice shading**: `#818cf8` (indigo-400) at 60% opacity over the amber base, producing a distinct purple-amber blend.
- **Cut lines**: `#fefce8` (yellow-50) at 2px stroke width — represents the knife cut. Visible through the pizza body.
- **Narration text**: `#e2e8f0` (slate-200) on dark backgrounds, `#334155` (slate-700) on light. Font: system sans-serif, 16px body, 22px for fraction labels.
- **Background**: Inherits from app theme (dark: `#0f172a` slate-900, light: `#f8fafc` slate-50). Pizza stands alone with no distracting background elements.

### 3.5 Sound Design

| Moment | Sound | Duration | Notes |
|---|---|---|---|
| Each knife cut | Short metallic "shink" | 200ms | Subtle, not aggressive. Pitched slightly higher with each successive cut (half: C5, quarter: D5, eighth: E5). |
| Split breathing animation | Soft "thud" | 100ms | Low frequency, felt more than heard. |
| Overlay comparison appears | Discovery chime (rising two-note) | 400ms | Same as platform-wide "notice something" cue. |
| "Bigger/Smaller" text appears | None | — | Text is impactful enough on its own. |

All sounds respect the `soundEnabled` user preference. Sounds are loaded as 22kHz mono WAV files, <10KB each, cached by service worker.

### 3.6 Gamification: Hook XP

No XP is awarded for watching the hook. The hook's purpose is activation of curiosity and the reward-prediction system, not assessment. Watching the full hook (>25s without skipping) is tracked in analytics for pedagogical review but has no gamification consequence.

---

## 4. Stage 2 — Spatial Experience (2-4 min)

### 4.1 Overview

Two parallel interactive models are presented side by side (desktop) or stacked vertically (mobile <768px). The student manipulates a fraction bar and a fraction circle to build fractions, then uses a comparison overlay to discover equivalent fractions.

**Minimum interaction count**: 10 distinct interactions before the "Continue to Guided Discovery" button activates. An "interaction" is defined as: changing the denominator slider, tapping a part to shade/unshade, or activating the comparison overlay. This ensures genuine manipulation (PF-3: Embodied Cognition) rather than click-through behavior.

**Interaction counter**: Displayed as a subtle progress ring around the Continue button (not as a number — numbers feel like targets to game). The ring fills as the student interacts. At 10 interactions the ring completes and the button glows softly.

### 4.2 Layout

```
Desktop (>=768px):                          Mobile (<768px):
┌─────────────────────────────────────┐     ┌───────────────────┐
│  [Fraction Bar]     [Fraction Circle]│     │   [Fraction Bar]  │
│  ┌─────────────┐   ┌────────────┐   │     │  ┌─────────────┐  │
│  │             │   │     ○      │   │     │  │             │  │
│  │  ████░░░░   │   │   /|\      │   │     │  │  ████░░░░   │  │
│  │             │   │  / | \     │   │     │  │             │  │
│  └─────────────┘   └────────────┘   │     │  └─────────────┘  │
│                                      │     │  ┌────────────┐   │
│  [Denominator Slider: 2 ─── 12]     │     │  │     ○       │  │
│                                      │     │  │   / | \     │  │
│  Label: 3/4                          │     │  │  /  |  \    │  │
│                                      │     │  └────────────┘   │
│  [Compare Fractions]                 │     │                    │
└─────────────────────────────────────┘     │ [Slider: 2──12]   │
                                            │ Label: 3/4         │
                                            │ [Compare]          │
                                            └───────────────────┘
```

### 4.3 Model A: Fraction Bar

#### 4.3.1 Scene Definition

```json
{
  "id": "NO-1.4-spatial-bar",
  "renderer": "svg",
  "viewBox": [0, 0, 360, 120],
  "objects": [
    {
      "type": "fractionBar",
      "id": "main-bar",
      "numerator": 0,
      "denominator": 2,
      "width": 320,
      "height": 60,
      "shadedColor": "#818cf8",
      "unshadedColor": "#334155",
      "showLabel": true,
      "style": {
        "stroke": "#64748b",
        "strokeWidth": 1.5
      }
    }
  ]
}
```

#### 4.3.2 Bar Rendering Details

The fraction bar is an SVG `<rect>` of dimensions `width` x `height`, positioned centered in its viewBox.

**Division lines**: When the denominator changes, vertical division lines are drawn inside the bar. Each line is a `<line>` element:
- Stroke: `#64748b` (slate-500), 1.5px width.
- Positions: At `x = barX + (i * partWidth)` for `i = 1` to `denominator - 1`.
- Part width: `barWidth / denominator`.

**Division animation**: When the denominator slider changes from value `a` to value `b`:
1. Existing division lines fade out (150ms, `ease: "easeInOut"`).
2. New division lines draw from top to bottom (300ms per line, staggered 50ms apart, `ease: "easeInOut"`).
3. During the transition, a brief "split" effect: each new part slides horizontally outward by 3px from its center, then springs back (spring: `damping: 20, stiffness: 300`, duration: ~400ms). This makes the splitting feel physical — like actually cutting the bar.
4. Total transition time: ~600ms for a single step (e.g., 2 -> 3). For large jumps (e.g., 2 -> 12), lines animate in rapid sequence over ~800ms.

**Shading**: Each part is an independent SVG `<rect>` that responds to tap/click:
- **Unshaded state**: Fill `#334155` (slate-700 dark theme) / `#e2e8f0` (slate-200 light theme).
- **Shaded state**: Fill `#818cf8` (indigo-400).
- **Transition**: 300ms fill color transition using Framer Motion's `animate` prop with `transition: { duration: 0.3, ease: "easeInOut" }`.
- **Tap feedback**: On pointer down, the part scales to `0.95` over 100ms (spring: `damping: 15, stiffness: 400`), then back to `1.0` on release. This provides haptic-like feedback on mobile.
- **Toggle behavior**: Tap shaded part -> unshade. Tap unshaded part -> shade. This is a simple toggle.
- **Accessibility**: Each part is a `<rect>` with `role="checkbox"`, `aria-checked="true|false"`, `aria-label="Part {i} of {denominator}"`, and keyboard focus support (Tab + Enter/Space to toggle).

**Label**: Below the bar, centered, a KaTeX-rendered fraction `\frac{numerator}{denominator}` updates in real time. When numerator is 0, the label shows `\frac{0}{denominator}`. The label uses Framer Motion `AnimatePresence` with a crossfade (150ms) when the numerator or denominator changes.

**Bar border**: 1.5px `#64748b` stroke around the entire bar. Corner radius: 4px.

#### 4.3.3 Edge Cases

- **Denominator = 1**: The bar is a single undivided rectangle. No division lines. Tap shades the entire bar. Label shows `\frac{1}{1}` or `\frac{0}{1}`.
- **All parts shaded**: Label shows `\frac{n}{n}` (e.g., `\frac{4}{4}`). A subtle annotation fades in below: "That's 1 whole!" (300ms fade, 2s visible, 300ms fade-out). This plants the seed for `n/n = 1` without formal teaching.
- **Denominator change while parts are shaded**: Shading resets to 0. The bar briefly flashes all parts as unshaded during the split animation. This prevents confusing states like "I had 3/4 shaded, now it's split into 6 parts, which 3 are still shaded?" The reset is deliberate — the student rebuilds.
- **Rapid slider changes**: Denominator slider has a 150ms debounce. If the student drags the slider rapidly, only the final resting position triggers the split animation. Intermediate positions are ignored.

### 4.4 Model B: Fraction Circle (Pizza)

#### 4.4.1 Scene Definition

```json
{
  "id": "NO-1.4-spatial-circle",
  "renderer": "svg",
  "viewBox": [0, 0, 240, 240],
  "objects": [
    {
      "type": "geometricShape",
      "id": "fraction-circle",
      "shape": "circle",
      "center": [120, 120],
      "radius": 100,
      "style": {
        "fill": "#334155",
        "stroke": "#64748b",
        "strokeWidth": 1.5
      }
    }
  ]
}
```

#### 4.4.2 Circle Rendering Details

The fraction circle is composed of SVG `<path>` elements — one arc-wedge per sector.

**Sector geometry**: For a circle with `center = (cx, cy)` and `radius = r`, divided into `d` equal sectors:
- Each sector spans an angle of `360 / d` degrees.
- Sector `i` starts at angle `startAngle = -90 + (i * 360/d)` degrees (starting from 12 o'clock position, clockwise).
- Sector `i` ends at angle `endAngle = startAngle + 360/d` degrees.
- SVG path for sector `i`:
  ```
  M cx cy
  L cx+r*cos(startAngle) cy+r*sin(startAngle)
  A r r 0 largeArcFlag 1 cx+r*cos(endAngle) cy+r*sin(endAngle)
  Z
  ```
  Where `largeArcFlag = 1` if the sector spans > 180 degrees, else `0`.

**Division lines**: Radial lines from center to circumference at each sector boundary:
- Stroke: `#64748b` (slate-500), 1.5px width.
- Each line: `M cx cy L cx+r*cos(angle) cy+r*sin(angle)`.

**Division animation**: When the denominator changes:
1. Current sectors fade out (150ms).
2. New radial lines draw from center outward (300ms, staggered 40ms apart, `ease: "easeInOut"`).
3. Each new sector briefly "opens" — the two bounding radii spread 3 degrees apart then spring back (spring: `damping: 20, stiffness: 300`). This creates a pizza-slice-separating effect.

**Shading**: Identical toggle behavior to the bar. Tap a sector to shade/unshade.
- **Unshaded**: `#334155` fill.
- **Shaded**: `#818cf8` fill.
- **Transition**: 300ms fill transition.
- **Tap feedback**: Sector scales `0.97` from its centroid over 100ms, then back.

**Accessibility**: Each sector is a `<path>` with `role="checkbox"`, `aria-checked`, `aria-label="Sector {i} of {denominator}"`, keyboard focusable.

#### 4.4.3 Synchronized Controls

**Critical design decision**: The bar and circle share a SINGLE denominator slider and are always in sync. When the student shades part 3 on the bar, sector 3 on the circle also shades (and vice versa). This dual representation is the core spatial insight — the same fraction looks different in two models but represents the same quantity.

**Synchronization mechanics**:
- Shared Zustand store `fractionSpatialStore`:
  ```typescript
  interface FractionSpatialState {
    denominator: number;           // 2-12
    shadedParts: Set<number>;      // indices of shaded parts (0-indexed)
    interactionCount: number;      // counts toward 10 minimum
    comparisonMode: boolean;       // overlay comparison active
    comparisonFraction: {          // second fraction for comparison
      numerator: number;
      denominator: number;
    } | null;
  }
  ```
- When `shadedParts` changes (in either model), both the bar and circle re-render.
- Cross-highlight animation: When a part is shaded in the bar, the corresponding circle sector briefly pulses (`scale: 1.05` over 200ms, then back) to draw the student's attention to the parallel change. And vice versa.

### 4.5 Denominator Slider

#### 4.5.1 Visual Design

A custom range input styled to match the platform's dark theme.

- **Track**: 280px wide (desktop) / full container width minus 32px padding (mobile). Height 6px. Background: `#1e293b` (slate-800). Border-radius: 3px.
- **Filled track** (left of thumb): `#818cf8` (indigo-400). Animates width on change.
- **Thumb**: 28px diameter circle. Fill: `#818cf8`. Stroke: `#e2e8f0` 2px. Drop shadow: `0 2px 4px rgba(0,0,0,0.3)`. On hover/press: scale `1.15` (100ms spring).
- **Tick marks**: 11 tick marks at integer positions 2-12. Each tick is a 2px wide x 8px tall `#475569` line below the track.
- **Tick labels**: Numbers 2-12 below the ticks. Font: 12px system mono. Color: `#94a3b8` (slate-400). The currently-selected value is highlighted: color `#818cf8`, font-weight 600.
- **Snap behavior**: The slider snaps to integer values only. Between integers, the thumb follows the pointer but the value does not change until the nearest integer threshold is crossed. This prevents fractional denominators.
- **Touch target**: The thumb's effective touch area is 44x44px (minimum per DR-5), even though it renders at 28px. The invisible hit area extends 8px in all directions.

#### 4.5.2 Slider Interaction

- **Drag**: Standard horizontal drag via `@use-gesture/react`. Constrained to x-axis.
- **Tap on track**: Thumb animates to the tapped position's nearest integer (200ms spring).
- **Keyboard**: Arrow left/right decrements/increments by 1. Home = 2, End = 12.
- **Accessibility**: `role="slider"`, `aria-valuemin="2"`, `aria-valuemax="12"`, `aria-valuenow`, `aria-label="Number of equal parts"`.

### 4.6 Comparison Overlay

#### 4.6.1 Activation

A button labeled "Compare Fractions" sits below the models. The button is styled as a secondary action: border `#818cf8`, text `#818cf8`, background transparent. On hover: background `#818cf810`. Touch target: 48px height, full width on mobile.

When pressed:
1. The current fraction (numerator/denominator from the shaded bar) is captured as "Fraction A".
2. A second set of controls appears below — a smaller bar with its own denominator slider (range 2-12) and tap-to-shade interaction. This is "Fraction B".
3. A "Show Overlay" button appears between the two bars.

#### 4.6.2 Overlay Animation

When "Show Overlay" is pressed:

1. Fraction B's bar animates upward (300ms, spring: `damping: 20, stiffness: 300`) to align directly on top of Fraction A's bar.
2. Fraction B's bar becomes semi-transparent: `#22d3ee` (cyan-400) at 40% opacity. Fraction A remains `#818cf8` at full opacity.
3. The student can now visually compare the two shaded regions.
4. If the shaded regions are exactly the same width (equivalent fractions), a celebration annotation fades in: "They're the same size!" with a subtle particle burst (8 small circles expanding outward from the center of the overlay, fading over 600ms). An "Aha Moment" chime plays.
5. If the shaded regions differ, an annotation shows: "[larger fraction] is bigger by this much →" with an arrow pointing to the difference region, which is highlighted in `#f87171` (red-400) at 30% opacity.

**Physics**: The overlay bar uses Framer Motion `layout` animation with spring physics:
- `spring({ damping: 20, stiffness: 300 })` for the upward slide.
- Overlay removal (pressing "Hide Overlay"): bar slides back down to its original position over 250ms.

#### 4.6.3 Guided Comparison Suggestions

After the student's first comparison, a subtle tooltip appears: "Try comparing 1/2 and 2/4!" This nudges toward the equivalent fractions discovery without forcing it. The suggestion appears only once and fades after 5 seconds if not acted upon.

Subsequent suggestions appear after every 3rd comparison (if the student hasn't yet discovered equivalent fractions):
- "What about 1/2 and 3/6?"
- "Can you find another fraction equal to 1/2?"
- "Try 2/3 and 4/6."

These suggestions disappear permanently once the student has created at least one successful equivalent-fraction overlay.

### 4.7 Interaction Tracking

Each of these actions increments the interaction counter:
1. Moving the denominator slider to a new value (+1).
2. Tapping any part to shade or unshade (+1).
3. Pressing "Compare Fractions" (+1).
4. Pressing "Show Overlay" (+1).

The counter does NOT increment for:
- Tapping the same part twice rapidly (debounced at 300ms).
- Moving the slider without changing the integer value.
- Pressing "Hide Overlay" (cleanup action, not exploration).

**Exploration diversity tracking** (for XP bonus, not shown to student):
```typescript
interface ExplorationMetrics {
  uniqueDenominatorsUsed: Set<number>;   // how many different denominators
  uniqueFractionsCreated: Set<string>;    // "3/4", "2/5", etc.
  comparisonsPerformed: number;
  equivalentFractionsFound: number;
  totalTimeSpentMs: number;
  extremesExplored: boolean;             // used 2 AND 12
}
```

If `uniqueDenominatorsUsed.size >= 5` AND `comparisonsPerformed >= 2`: "exploration bonus" = 40 XP.
If `uniqueDenominatorsUsed.size >= 3` AND `comparisonsPerformed >= 1`: "exploration bonus" = 20 XP.
Otherwise: 0 bonus.

### 4.8 Mobile Adaptations

- **< 768px width**: Bar and circle stack vertically. Bar on top, circle below. Denominator slider spans full width below the circle.
- **< 400px width**: Circle radius reduces from 100 to 80. Bar height reduces from 60 to 48. Slider thumb enlarges to 32px for fat-finger accommodation.
- **Landscape mobile**: Side-by-side layout is restored if viewport height > 320px. Otherwise, stacked with scroll.
- **Touch behavior**: All tap targets are >= 44x44px. Parts in the bar have minimum width 28px at denominator = 12 (320px bar / 12 parts = 26.7px — pad to 28px by reducing bar padding). For very small parts (denominator 11-12), the tap target extends beyond the visible part boundary. A tooltip on long-press (300ms) shows "Part {i} of {denominator}" for accessibility.

---

## 5. Stage 3 — Guided Discovery (3-5 min)

### 5.1 Prompt Sequence

The guided discovery stage presents a sequence of 5 prompts. Each prompt asks the student to perform a specific manipulation in the spatial models from Stage 2 (which remain visible and interactive) and then answer a question. The AI tutor (Socratic mode) provides feedback.

#### Prompt 1: Discover Equivalence (1/2 = 2/4)

**Setup**: The spatial models reset to denominator = 2. Bar shows two equal parts, neither shaded.

**Prompt text**: "Make 1/2 on the fraction bar. Now change the denominator to 4 and make 2/4. Notice anything?"

**Expected interaction**:
1. Student taps one of two parts on the bar -> 1/2 is shown.
2. Student moves slider from 2 to 4.
3. Bar splits into 4 parts (shading resets).
4. Student taps 2 of 4 parts -> 2/4 is shown.

**Auto-response trigger**: When the student has created both 1/2 (at some point) and then 2/4, the system displays:
- The comparison overlay auto-activates: the 1/2 bar (stored from earlier) slides up alongside the current 2/4 bar.
- Annotation: "They're the same length!"
- AI tutor message: "Interesting! 1/2 and 2/4 take up exactly the same amount of space. What do you think happened?"

**Acceptance criteria for student response**: The student types a free-text response. AI evaluates for the idea "both halves are the same" or "dividing into more parts but taking more of them." If the response shows understanding: proceed. If not: AI follows up with "Look at the top and bottom numbers. 1 became 2, and 2 became 4. What did we do to both?"

**Fallback (if student is stuck for >45s)**: A hint button appears. Hint: "Compare the shaded area. Are they covering the same amount of the bar?"

#### Prompt 2: Extend Equivalence (3/6 and 4/8)

**Prompt text**: "Try making 3/6 and 4/8. Are they the same as 1/2?"

**Expected interaction**: Student creates 3/6, then creates 4/8. Uses comparison overlay for each.

**Auto-response trigger**: When at least one overlay shows equivalence with 1/2:
- AI tutor: "Another match! So 1/2 = 2/4 = 3/6 = 4/8. These are called equivalent fractions."
- A row of fraction bars appears stacked vertically:
  ```
  |████████████████░░░░░░░░░░░░░░░░|  1/2
  |████████░░░░░░░░░░░░░░░░░░░░░░░░|  2/4
  |██████░░░░░░░░░░░░░░░░░░░░░░░░░░|  3/6 (narrower parts, same total shade)
  |█████░░░░░░░░░░░░░░░░░░░░░░░░░░░|  4/8
  ```
  All shaded regions are the same width. Vertical dashed alignment lines connect the right edge of each shaded region, forming a straight vertical line. Animation: bars appear one at a time (300ms each, top-to-bottom), then the vertical alignment line draws downward (400ms).

#### Prompt 3: Identify the Pattern

**Prompt text**: "The key pattern: 1/2 = 2/4 = 3/6 = 4/8. What's happening to the top and bottom numbers each time?"

**Expected insight**: Both the numerator and denominator are being multiplied by the same number (2, 3, 4...).

**AI tutor Socratic sequence** (if student doesn't identify it):
1. "Look at the numerators: 1, 2, 3, 4. What's the pattern?"
2. "Now the denominators: 2, 4, 6, 8. What's the pattern?"
3. "1 times what equals 2? 2 times what equals 4?"
4. "So we multiplied both the top and bottom by the same number. Why does that keep the fraction the same size?"

**Visual support**: As the student (or AI) identifies the multiplication pattern, animated arrows appear next to each fraction pair:
```
1/2  --×2-->  2/4  --×3-->  3/6  --×4-->  4/8
```
The arrows use `#22d3ee` (cyan-400) color, draw left-to-right over 400ms each, with the multiplication factor appearing as a label on the arrow.

#### Prompt 4: Confront the Misconception (1/2 vs 1/3)

**Prompt text**: "Now compare 1/2 and 1/3. Which is BIGGER?"

**Expected interaction**: Student creates 1/2 and 1/3 in the comparison tool.

**Auto-response trigger**: When overlay is shown:
- 1/2 bar is visibly longer than 1/3 bar.
- Annotation: "1/2 is bigger!"
- AI tutor: "Even though 3 is bigger than 2, the piece is SMALLER. Why? Because when you cut something into more pieces, each piece gets smaller. More pieces = smaller pieces."
- The comparison highlights the size difference: the extra region that 1/2 covers beyond 1/3 is shaded in `#f87171` (red-400) at 30% opacity with label: "This much more."

**Misconception detection**: If the student answers "1/3 is bigger" in free text, the AI responds:
- "That's a really common first thought! Let's check with the bars."
- Forces the overlay comparison if not already shown.
- "See? The 1/2 section actually covers more of the bar. When the bottom number is bigger, each piece is smaller. So 1/3 is actually less than 1/2."
- The struggle bonus XP multiplier (1.4x) is flagged for this student if they eventually demonstrate understanding.

#### Prompt 5: Harder Comparison (2/3 vs 3/4)

**Prompt text**: "Which is bigger: 2/3 or 3/4? Make both bars and overlay them to find out."

**Expected interaction**: Student creates both fractions and uses comparison.

**Auto-response trigger**: When overlay shows:
- 3/4 is slightly bigger than 2/3 (3/4 = 0.75, 2/3 = 0.667).
- The difference is small — only ~8.3% of the bar width. This is deliberately chosen to show that comparison isn't always obvious from the numbers alone, reinforcing the value of visual models.
- Annotation: "3/4 is a tiny bit bigger!"
- AI tutor: "Close one! 3/4 is just slightly more than 2/3. When fractions have different denominators, it's not always obvious which is bigger. That's why visual models are so powerful."

### 5.2 Discovery Scoring

Guided discovery insights contribute to XP:
- Identifying the multiplication pattern (Prompt 3) without AI hints: 30 XP bonus (guided_discovery_insight).
- Successfully confronting the 1/3 > 1/2 misconception: no extra XP, but flags the struggle bonus multiplier if the student initially got it wrong.

### 5.3 State Persistence

If the student leaves and returns mid-discovery, the state is persisted in the lesson store (Zustand + IndexedDB via Dexie.js):
```typescript
interface DiscoveryState {
  currentPromptIndex: number;     // 0-4
  promptResponses: Array<{
    promptId: string;
    studentResponse: string;
    aiEvaluation: 'correct' | 'partial' | 'incorrect' | null;
    hintsUsed: number;
    timeSpentMs: number;
  }>;
  equivalentFractionsDiscovered: boolean;
  misconceptionConfronted: boolean;
}
```

---

## 6. Stage 4 — Symbol Bridge (2-3 min)

### 6.1 Overview

The symbol bridge formally introduces fraction notation by overlaying symbolic labels onto the spatial models the student has already been manipulating. Every symbol is anchored to a visual element — no symbol is introduced in isolation.

### 6.2 Scene Design

The fraction bar from Stage 2 remains visible, locked at denominator = 4 with 3 parts shaded (showing 3/4). It is now non-interactive — the student watches as annotations are layered on.

#### 6.2.1 Step 1: Numerator and Denominator Labels (0:00-0:45)

**Animation sequence**:

1. (0:00-0:20) The fraction label `\frac{3}{4}` appears large (36px) to the right of the bar.
2. (0:20-0:30) The numerator "3" highlights: color changes from white to `#818cf8` (indigo-400). Simultaneously, an arrow draws from the "3" to the shaded portion of the bar (curved bezier arrow, `#818cf8`, 300ms draw animation). An annotation appears next to the shaded region: "3 parts shaded" in indigo.
3. (0:30-0:40) The denominator "4" highlights: color changes to `#f59e0b` (amber-500). An arrow draws from the "4" to the division lines of the bar (curved bezier, `#f59e0b`, 300ms). An annotation appears: "4 equal parts total" in amber.
4. (0:40-0:45) Both arrows and annotations hold.

**KaTeX rendering**: The fraction uses `\frac{\textcolor{#818cf8}{3}}{\textcolor{#f59e0b}{4}}` to maintain the color coding.

#### 6.2.2 Step 2: General Notation (0:45-1:15)

1. (0:45-0:55) The specific `\frac{3}{4}` morphs (crossfade, 300ms) to the general form: `\frac{a}{b}`.
2. (0:55-1:05) Below the general form, text fades in: "`a/b` means: split into `b` parts, take `a` of them."
3. (1:05-1:15) The bar cycles through three examples automatically:
   - 3/4: 3 parts shade, label shows `\frac{3}{4}`.
   - 2/5: bar splits to 5, 2 parts shade, label shows `\frac{2}{5}`.
   - 5/8: bar splits to 8, 5 parts shade, label shows `\frac{5}{8}`.
   - Each transition takes 800ms (300ms unshade + 200ms split + 300ms shade).

#### 6.2.3 Step 3: Equivalent Fractions Formula (1:15-2:15)

1. (1:15-1:30) Bar returns to 1/2. Label shows `\frac{1}{2}`.
2. (1:30-1:50) An animated multiplication appears:
   ```
   1/2 = (1 × 2)/(2 × 2) = 2/4
   ```
   - The "× 2" terms appear simultaneously above the numerator and below the denominator, connected by curved arrows. Color: `#22d3ee` (cyan).
   - The `= 2/4` result fades in to the right.
   - Below, the bar splits from 2 to 4, and 2 parts shade — synchronized with the symbolic animation.
3. (1:50-2:05) Second multiplication:
   ```
   1/2 = (1 × 3)/(2 × 3) = 3/6
   ```
   - Same arrow + multiplication animation, now with "× 3".
   - Bar splits to 6, 3 parts shade.
4. (2:05-2:15) General rule fades in below:
   ```
   \frac{a}{b} = \frac{a \times n}{b \times n} \text{ (for any } n \neq 0\text{)}
   ```

#### 6.2.4 Step 4: Interactive Practice (2:15-3:00)

A mini-interactive within the Symbol Bridge:
- The system shows a fraction bar with 2/6 shaded.
- Below: `\frac{2}{6} = \frac{?}{3}`.
- The student taps/types the missing numerator (answer: 1).
- On correct answer: the bar splits from 6 to 3, and 1 part shades — confirming visually.
- A second mini-problem: `\frac{3}{4} = \frac{?}{8}` (answer: 6).
- These are NOT formal practice (Stage 6) — they are bridging exercises that connect the spatial model to the symbolic representation.

### 6.3 Animation Specifications

All animations in this stage use Framer Motion:
- Arrow draw: `pathLength` animation from 0 to 1, duration 300ms, `ease: "easeInOut"`.
- Crossfade: `AnimatePresence` with `mode="wait"`, exit opacity 0 (150ms), enter opacity 1 (150ms).
- Color transitions: `animate={{ color: newColor }}`, duration 300ms.
- Bar transitions: Reuse the same split animation from Stage 2 (spring: `damping: 20, stiffness: 300`).

---

## 7. Stage 5 — Real-World Anchor (1-2 min)

### 7.1 Four Real-World Contexts

Each example is presented as a card with an illustration and a fraction connection. The student swipes through them (mobile) or clicks arrows (desktop).

#### 7.1.1 Pizza Sharing

**Illustration**: A circular pizza (reusing the hook's pizza SVG) divided into 8 slices. 3 people icons sit around it.

**Text**: "If 8 people share a pizza equally, each person gets 1/8 of the pizza."

**Interactive element**: The student can tap each person icon to shade their assigned slice. As they tap person 1, slice 1 shades indigo. Person 2, slice 2 shades a different hue (`#34d399`, emerald-400). Etc. This shows the fair-sharing model of fractions.

**Fraction connection**: Label updates: "Person 1 gets `\frac{1}{8}`, Person 2 gets `\frac{1}{8}`, ..."

#### 7.1.2 Cooking Recipes

**Illustration**: A stylized measuring cup SVG. The cup shows graduation marks at 1/4, 1/2, 3/4, and 1 cup.

**Text**: "A recipe calls for 3/4 cup of flour."

**Interactive element**: The student drags a "pour" slider from 0 to 1. As they drag past each graduation mark, the cup fills with an animated liquid (SVG `<rect>` with wave-top `<path>` animation). At 3/4, the graduation mark highlights and the label `\frac{3}{4}` pulses.

**Fraction connection**: "3/4 means we fill 3 of the 4 equal sections."

#### 7.1.3 Time

**Illustration**: An analog clock face (SVG circle with tick marks and two hands).

**Text**: "A quarter hour = 1/4 of 60 minutes = 15 minutes."

**Interactive element**: The minute hand sweeps from 12 to 3 (90 degrees, 1s animation). The swept region fills indigo. Below: `\frac{1}{4} \times 60 = 15 \text{ minutes}`.

**Extension**: "Half hour?" Student taps -> hand sweeps to 6 (180 degrees). `\frac{1}{2} \times 60 = 30 \text{ minutes}`.

#### 7.1.4 Sales & Discounts

**Illustration**: A price tag showing "$30" with a "1/3 OFF" badge.

**Text**: "1/3 off means you save 1/3 of the price and pay 2/3."

**Interactive element**: A bar representing $30 is divided into 3 parts of $10 each. The "1/3 off" part ($10) is striped with a discount pattern. The remaining 2 parts ($20) are solid. Below: "You save `\frac{1}{3}` = $10. You pay `\frac{2}{3}` = $20."

**Fraction connection**: This bridges to NO-1.4b (Fractions/Decimals/Percents) and NO-1.7 (Percent Applications). A subtle "coming soon" link says: "1/3 off is the same as about 33% off. We'll explore that connection in a future lesson."

### 7.2 Presentation

- Cards are 320px wide (desktop), full width minus 16px padding (mobile).
- Swipe gesture: horizontal swipe via `@use-gesture/react`, with spring physics for overscroll. Snap to nearest card.
- Pagination dots below the cards: 4 dots, active dot is indigo, inactive dots are slate-500. 8px diameter, 12px spacing.
- Auto-advance: Does NOT auto-advance. Student controls pacing (PF-6: no time pressure).

---

## 8. Stage 6 — Practice (Adaptive)

### 8.1 Problem Bank

9 problems total, organized across three layers. Problems are served in interleaved order (PF-5) — NOT blocked by sub-type. The IRT engine selects the next problem based on the student's current ability estimate and the problem's difficulty parameter.

### 8.2 Layer 0 — Recall (3 problems)

#### Problem R1: Identify Fraction from Shaded Bar

**Type**: `fraction-identify-bar`
**Difficulty B**: 0.3 (easy)
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "What fraction of the bar is shaded?",
  "visualization": {
    "type": "fractionBar",
    "denominator": 5,
    "shadedParts": [0, 1, 2],
    "width": 280,
    "height": 48,
    "shadedColor": "#818cf8",
    "unshadedColor": "#334155"
  },
  "inputType": "fraction-input",
  "correctAnswer": { "numerator": 3, "denominator": 5 },
  "acceptedEquivalents": [
    { "numerator": 6, "denominator": 10 },
    { "numerator": 9, "denominator": 15 },
    { "numerator": 12, "denominator": 20 }
  ],
  "feedback": {
    "correct": "That's right! 3 out of 5 parts are shaded, so it's 3/5.",
    "incorrect": "Count the total parts (that's the denominator) and the shaded parts (that's the numerator). There are 5 parts total and 3 are shaded."
  },
  "explanationPrompt": "How did you figure out which number goes on top and which goes on the bottom?"
}
```

**Fraction input widget**: Two vertically stacked number inputs (numerator on top, denominator on bottom) with a horizontal line between them. Each input accepts positive integers via number keyboard on mobile. The horizontal line is drawn as an SVG `<line>`. Tab order: numerator first, then denominator. The input validates that the denominator is not zero. If the student enters an equivalent fraction (e.g., 6/10), it is accepted as correct, and a note appears: "6/10 is correct! That's equivalent to 3/5."

#### Problem R2: Write Fraction from Words

**Type**: `fraction-from-words`
**Difficulty B**: 0.4
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "Write the fraction: '3 out of 5 equal parts'",
  "inputType": "fraction-input",
  "correctAnswer": { "numerator": 3, "denominator": 5 },
  "acceptedEquivalents": [],
  "feedback": {
    "correct": "Exactly! '3 out of 5' means 3 on top (numerator) and 5 on the bottom (denominator).",
    "incorrect": "The number of parts you HAVE goes on top (numerator). The TOTAL number of equal parts goes on the bottom (denominator). '3 out of 5' = 3/5."
  },
  "explanationPrompt": "In your own words, what does the top number of a fraction tell you? What about the bottom number?"
}
```

#### Problem R3: Identify Fraction from Shaded Circle

**Type**: `fraction-identify-circle`
**Difficulty B**: 0.35
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "What fraction of the circle is shaded?",
  "visualization": {
    "type": "fractionCircle",
    "denominator": 8,
    "shadedSectors": [0, 1, 2, 3, 4],
    "radius": 80,
    "shadedColor": "#818cf8",
    "unshadedColor": "#334155"
  },
  "inputType": "fraction-input",
  "correctAnswer": { "numerator": 5, "denominator": 8 },
  "acceptedEquivalents": [],
  "feedback": {
    "correct": "That's 5/8! Five out of eight sectors are shaded.",
    "incorrect": "This circle is divided into 8 equal sectors (that's the denominator). Count how many are shaded (that's the numerator)."
  },
  "explanationPrompt": "Does it matter which 5 sectors are shaded, or just that there are 5 of them?"
}
```

### 8.3 Layer 1 — Procedure (3 problems)

#### Problem P1: Find Equivalent Fraction

**Type**: `equivalent-fraction-find`
**Difficulty B**: 0.6
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Find a fraction equivalent to 2/3 with a denominator of 9.",
  "visualization": {
    "type": "fractionBar",
    "denominator": 3,
    "shadedParts": [0, 1],
    "width": 280,
    "height": 48,
    "shadedColor": "#818cf8",
    "unshadedColor": "#334155"
  },
  "inputType": "fraction-input",
  "correctAnswer": { "numerator": 6, "denominator": 9 },
  "hints": [
    "What do you multiply 3 by to get 9?",
    "3 × 3 = 9. Whatever you do to the bottom, do to the top.",
    "2 × 3 = 6. So the equivalent fraction is 6/9."
  ],
  "feedback": {
    "correct": "6/9 is correct! You multiplied both the numerator and denominator by 3.",
    "incorrect": "To go from denominator 3 to denominator 9, we multiply by 3. We must do the same to the numerator: 2 × 3 = 6. So 2/3 = 6/9."
  },
  "explanationPrompt": "Why do we have to multiply BOTH the top and bottom by the same number? What would happen if we only multiplied the bottom?",
  "visualConfirmation": {
    "type": "fractionBar",
    "denominator": 9,
    "shadedParts": [0, 1, 2, 3, 4, 5],
    "width": 280,
    "height": 48,
    "shadedColor": "#22d3ee",
    "unshadedColor": "#334155"
  }
}
```

**Visual confirmation**: After the student answers correctly (or sees the correct answer), the 2/3 bar and the 6/9 bar are shown overlaid — proving they are the same length. This reinforces the spatial learning from Stage 2.

#### Problem P2: Simplify a Fraction

**Type**: `fraction-simplify`
**Difficulty B**: 0.65
**Discrimination A**: 1.1

**Content**:
```json
{
  "stem": "Simplify 6/8 to its simplest form.",
  "visualization": {
    "type": "fractionBar",
    "denominator": 8,
    "shadedParts": [0, 1, 2, 3, 4, 5],
    "width": 280,
    "height": 48,
    "shadedColor": "#818cf8",
    "unshadedColor": "#334155"
  },
  "inputType": "fraction-input",
  "correctAnswer": { "numerator": 3, "denominator": 4 },
  "hints": [
    "What number divides evenly into BOTH 6 and 8?",
    "2 divides into both! 6 ÷ 2 = 3, 8 ÷ 2 = 4.",
    "The simplest form is 3/4."
  ],
  "feedback": {
    "correct": "3/4 is correct! Dividing both 6 and 8 by 2 gives the simplest form.",
    "incorrect": "Find a number that divides evenly into both 6 and 8. The GCF of 6 and 8 is 2. So 6 ÷ 2 = 3 and 8 ÷ 2 = 4. The simplest form is 3/4."
  },
  "explanationPrompt": "How do you know when a fraction is in its 'simplest form'? What makes it impossible to simplify further?"
}
```

**Note**: This problem connects to NT-2.3 (GCF & LCM) as a successor concept. The hint says "GCF" but the lesson does not formally teach GCF — the student should intuit "a number that divides both" from the visual.

#### Problem P3: Compare Fractions Using Bars

**Type**: `fraction-compare-visual`
**Difficulty B**: 0.7
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Which is bigger: 2/5 or 3/7? Use the fraction bars to help you decide.",
  "visualization": {
    "type": "comparisonBars",
    "fractionA": { "numerator": 2, "denominator": 5 },
    "fractionB": { "numerator": 3, "denominator": 7 },
    "barWidth": 280,
    "barHeight": 36,
    "shadedColorA": "#818cf8",
    "shadedColorB": "#22d3ee",
    "unshadedColor": "#334155"
  },
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "2/5 is bigger", "correct": false },
    { "id": "b", "text": "3/7 is bigger", "correct": true },
    { "id": "c", "text": "They are equal", "correct": false }
  ],
  "feedback": {
    "correct": "Right! 3/7 ≈ 0.429 while 2/5 = 0.4. The bars show 3/7 is slightly bigger.",
    "incorrect": "Look at the bars carefully. The shaded region of 3/7 extends a tiny bit further than 2/5. 3/7 ≈ 0.429 > 2/5 = 0.4."
  },
  "explanationPrompt": "This was a close one! When fractions have different denominators, what strategies can you use to compare them?"
}
```

**Bar rendering**: Two bars are displayed vertically stacked, same total width, with their left edges aligned. The student visually compares the shaded regions. An overlay button is available to confirm the comparison.

### 8.4 Layer 2 — Understanding (3 problems)

#### Problem U1: Explain the Misconception

**Type**: `explain-why`
**Difficulty B**: 0.8
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "Your friend says: '1/3 is bigger than 1/2 because 3 is bigger than 2.' Explain why your friend is wrong.",
  "inputType": "free-text",
  "minimumLength": 40,
  "aiEvaluationCriteria": [
    "Mentions that larger denominator means smaller pieces",
    "References the visual model (bars, pizza, etc.)",
    "Correctly states that 1/2 > 1/3",
    "Explains the inverse relationship between denominator and piece size"
  ],
  "scoringRubric": {
    "5": "Complete: states 1/2 > 1/3, explains inverse relationship, references visual model, addresses why 3 > 2 is misleading",
    "4": "Strong: states 1/2 > 1/3, explains inverse relationship, may lack visual reference",
    "3": "Adequate: states 1/2 > 1/3 with basic reasoning",
    "2": "Partial: states correct answer but explanation is vague or circular",
    "1": "Minimal: correct answer with no meaningful explanation",
    "0": "Incorrect or no answer"
  },
  "feedback": {
    "high": "Excellent explanation! You've got a strong understanding of why the denominator's size matters.",
    "medium": "Good start! You're right that 1/2 is bigger. Can you also explain WHY more pieces means smaller pieces?",
    "low": "Think about it this way: if you cut a pizza into 2 pieces vs 3 pieces, which gives you bigger slices? The 2-piece pizza has bigger slices, so 1/2 > 1/3."
  },
  "visualSupport": {
    "type": "comparisonBars",
    "fractionA": { "numerator": 1, "denominator": 2 },
    "fractionB": { "numerator": 1, "denominator": 3 },
    "showOverlay": true
  }
}
```

**AI evaluation**: The student's free-text response is sent to the `lesson.submitReflection` tRPC endpoint, which uses the Claude API with the scoring rubric. The AI returns a quality score (0-5) and personalized feedback. This response contributes to the `reflection_quality` XP bonus (0-80 XP, linearly scaled from score).

#### Problem U2: Create All Equivalent Fractions

**Type**: `equivalent-fraction-generate`
**Difficulty B**: 0.75
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "List as many fractions as you can that are equivalent to 2/3. Use the fraction bars to check your answers.",
  "inputType": "fraction-list",
  "correctAnswers": [
    { "numerator": 4, "denominator": 6 },
    { "numerator": 6, "denominator": 9 },
    { "numerator": 8, "denominator": 12 },
    { "numerator": 10, "denominator": 15 },
    { "numerator": 12, "denominator": 18 }
  ],
  "minimumCorrect": 3,
  "scoring": {
    "3_correct": "Good work! You found the pattern.",
    "4_correct": "Great! You can keep going — there are infinite equivalent fractions!",
    "5_plus": "Impressive! You clearly understand that multiplying top and bottom by any number works."
  },
  "visualization": {
    "type": "fractionBar",
    "denominator": 3,
    "shadedParts": [0, 1],
    "interactive": true
  },
  "explanationPrompt": "Could you keep going forever? Why or why not?"
}
```

**Fraction list input**: The student types fractions one at a time into the fraction input widget. Each entry is validated in real-time:
- Correct equivalent: Green checkmark + fraction bar visualization appears below showing the equivalent fraction overlaid with 2/3.
- Incorrect: Red X with explanation "4/7 is not equivalent to 2/3 — the bars don't match."
- Duplicate: "You already found that one!" in amber.

The problem is marked complete when `minimumCorrect` (3) equivalents are found. But the student CAN keep adding more.

#### Problem U3: Compare with Reasoning

**Type**: `fraction-compare-explain`
**Difficulty B**: 0.85
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "Without using fraction bars, explain which is bigger: 5/8 or 7/12. Then check your answer with the bars.",
  "inputType": "compound",
  "parts": [
    {
      "id": "choice",
      "type": "multiple-choice",
      "options": [
        { "id": "a", "text": "5/8 is bigger", "correct": true },
        { "id": "b", "text": "7/12 is bigger", "correct": false },
        { "id": "c", "text": "They are equal", "correct": false }
      ]
    },
    {
      "id": "reasoning",
      "type": "free-text",
      "prompt": "Explain your reasoning:",
      "minimumLength": 30
    }
  ],
  "feedback": {
    "correct": "Yes! 5/8 = 0.625 and 7/12 ≈ 0.583. Check the bars to confirm!",
    "incorrect": "Let's see... 5/8 = 15/24 and 7/12 = 14/24. Since 15/24 > 14/24, 5/8 is bigger. The bars confirm this."
  },
  "explanationPrompt": "What strategy did you use to compare these fractions? Is there a way to compare fractions with different denominators without drawing bars?",
  "aiEvaluationCriteria": [
    "Uses common denominator or cross-multiplication or decimal conversion",
    "Arrives at correct comparison",
    "Reasoning is logically sound"
  ]
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
- Submit button: full-width on mobile, 200px on desktop. Background `#818cf8`. Text white. Border-radius 8px. Height 48px. Disabled (opacity 0.5) until input is non-empty.
- Feedback area: appears below submit button after submission. 12px top margin. Background `#0f172a20` with left border 3px solid (green for correct, amber for incorrect). Padding 12px.

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
- Problems from different sub-types are interleaved: never two fraction-identification problems in a row.
- The 9 problems are drawn from a larger pool; the exact 9 shown depend on the student's performance.

---

## 9. Stage 7 — Reflection (~1 min)

### 9.1 Reflection Prompt

**Prompt text**: "Explain what a fraction really means and why the denominator matters."

**Input**: Free-text, minimum 50 characters. The text area is:
- Full width, 120px height (expandable).
- Placeholder text: "Write your explanation here... What does the top number mean? The bottom number? Why does a bigger bottom number mean smaller pieces?"
- Character counter in bottom-right: `{count}/50 minimum`.
- Background: `#0f172a`. Border: 1px `#475569`. Focus border: `#818cf8`.

### 9.2 AI Evaluation

The response is submitted to `lesson.submitReflection`:

**Evaluation criteria**:
1. Defines fraction as parts of a whole (or equivalent understanding).
2. Correctly identifies numerator as "parts you have" and denominator as "total equal parts."
3. Explains the inverse relationship: bigger denominator = smaller pieces.
4. (Bonus) References visual models (bars, circles, pizza).
5. (Bonus) Mentions equivalent fractions.

**Scoring rubric**:
| Score | Description | XP Bonus |
|---|---|---|
| 5 | Complete explanation covering all criteria + bonus items. Could teach someone. | 80 |
| 4 | Strong explanation covering all 3 core criteria. | 64 |
| 3 | Adequate: covers 2 of 3 core criteria clearly. | 48 |
| 2 | Partial: covers 1 criterion or is vague on all. | 32 |
| 1 | Minimal: restates the question or is mostly off-topic. | 16 |
| 0 | No meaningful content. | 0 |

### 9.3 Feedback & XP Award

After AI evaluation:

1. **Quality score visual**: A 5-star display where stars fill based on the score. Stars are amber (`#f59e0b`), empty stars are slate-700.
2. **Personalized feedback**: AI-generated text based on the specific response. Example for score 4: "Great explanation! You clearly understand that the denominator determines the size of each piece. To make it even stronger, you could mention how the fraction bar or circle helps visualize this."
3. **XP award animation**: The XP amount flies upward from the reflection area to the XP counter in the lesson nav. Number color: `#f59e0b`. Duration: 800ms, ease: spring.
4. **Multiplier check**: If `referencesPriorConcept` is true (student mentions Place Value, division, or NO-1.1 concepts), the Connection Maker multiplier (1.3x) applies. The multiplier is shown as a badge next to the XP: "1.3x Connection Maker!"
5. **Struggle bonus**: If the student got the misconception wrong in Prompt 4 (Guided Discovery) but now correctly explains why 1/3 < 1/2 in the reflection, the Struggle Bonus (1.4x) triggers.

### 9.4 Aha Moment Detection

If the student's explanation quality score jumps significantly compared to their historical average (delta >= 2 points), OR if the student spent >3 minutes in spatial exploration AND now writes a strong reflection (score >= 4), the Aha Moment celebration fires:

1. Neural network flash animation: brief particle burst from the text area (8 indigo particles, expand outward 60px, fade over 600ms).
2. Discovery chime sound (major chord resolve, 500ms).
3. Toast notification: "That's the connection!" — 3s display, bottom-center.
4. Reflection prompt: "What clicked?" — optional one-line input below the main reflection. If filled, stored in analytics.
5. Struggle Badge (if applicable): "This took effort. Understanding is STRONGER because it was hard."

---

## 10. Technical Specifications

### 10.1 SVG Component Architecture

#### Fraction Bar Component

```
FractionBar.tsx
├── Props: { denominator, shadedParts, width, height, shadedColor, unshadedColor, interactive, onPartToggle }
├── Internal state: none (fully controlled)
├── SVG structure:
│   ├── <rect> — outer border (rx=4)
│   ├── <g> — parts group
│   │   ├── <rect> × denominator — individual parts (animated fill)
│   │   └── <line> × (denominator - 1) — division lines
│   └── <text> — KaTeX label (via foreignObject)
├── Animations: Framer Motion `motion.rect` for fill transitions
└── Accessibility: role="group", each part role="checkbox"
```

#### Fraction Circle Component

```
FractionCircle.tsx
├── Props: { denominator, shadedSectors, radius, shadedColor, unshadedColor, interactive, onSectorToggle }
├── Internal state: none (fully controlled)
├── SVG structure:
│   ├── <circle> — background (fill unshadedColor)
│   ├── <g> — sectors group
│   │   ├── <path> × denominator — arc wedge sectors (animated fill)
│   │   └── <line> × denominator — radial division lines
│   └── <text> — KaTeX label (via foreignObject)
├── Animations: Framer Motion `motion.path` for fill transitions
└── Accessibility: role="group", each sector role="checkbox"
```

#### Comparison Overlay Component

```
ComparisonOverlay.tsx
├── Props: { fractionA, fractionB, barWidth, barHeight, onEquivalenceDetected }
├── Internal state: overlayVisible (boolean)
├── SVG structure:
│   ├── FractionBar × 2 (A at position Y=0, B at position Y=barHeight+gap)
│   ├── When overlay active: B animates to Y=0 with opacity 0.4
│   ├── Equivalence annotation (if shaded widths match within epsilon 0.5px)
│   └── Difference highlight (if widths differ)
├── Animations:
│   ├── Overlay slide: spring(damping: 20, stiffness: 300)
│   ├── Equivalence particles: 8 circles, staggered 50ms, expand 60px, fade 600ms
│   └── Annotation fade: 300ms easeInOut
└── Epsilon comparison: |widthA - widthB| < 0.5px → equivalent
```

### 10.2 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `shaded-primary` | `#818cf8` | Indigo-400. Shaded fraction parts, primary accent. |
| `shaded-secondary` | `#22d3ee` | Cyan-400. Comparison overlay, equivalent fraction highlight. |
| `unshaded-dark` | `#334155` | Slate-700. Unshaded parts on dark theme. |
| `unshaded-light` | `#e2e8f0` | Slate-200. Unshaded parts on light theme. |
| `surface-dark` | `#0f172a` | Slate-900. Background on dark theme. |
| `surface-card` | `#1e293b` | Slate-800. Card backgrounds. |
| `border` | `#64748b` | Slate-500. Division lines, bar borders. |
| `text-primary` | `#e2e8f0` | Slate-200. Body text on dark. |
| `text-secondary` | `#94a3b8` | Slate-400. Labels, hints. |
| `numerator-highlight` | `#818cf8` | Indigo-400. Numerator in Symbol Bridge. |
| `denominator-highlight` | `#f59e0b` | Amber-500. Denominator in Symbol Bridge. |
| `correct` | `#34d399` | Emerald-400. Correct answer feedback. |
| `incorrect` | `#f87171` | Red-400. Incorrect answer feedback. |
| `difference-highlight` | `#f87171` at 30% opacity | Red-400 semi-transparent. Size difference in comparison. |
| `comparison-overlay` | `#22d3ee` at 40% opacity | Cyan-400 semi-transparent. Overlay bar. |

### 10.3 Animation Configuration

All animations in this lesson use Framer Motion with these shared configurations:

```typescript
// Shared spring config for physical interactions (split, tap feedback)
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
```

### 10.4 Gesture Configuration

All gestures use `@use-gesture/react`:

```typescript
// Denominator slider drag
const sliderBind = useDrag(({ movement: [mx], memo = sliderStartX }) => {
  const newX = clamp(memo + mx, trackLeft, trackRight);
  const snappedValue = Math.round(
    ((newX - trackLeft) / trackWidth) * (MAX_DENOM - MIN_DENOM) + MIN_DENOM
  );
  setDenominator(snappedValue);
  return memo;
}, {
  axis: "x",
  filterTaps: true,
});

// Real-world cards swipe
const cardBind = useDrag(({ movement: [mx], direction: [dx], velocity: [vx], cancel }) => {
  if (Math.abs(vx) > 0.5) {
    // Flick gesture: advance to next/prev card
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
```

### 10.5 Responsive Breakpoints

| Breakpoint | Layout | Bar Width | Circle Radius | Slider Width | Stack |
|---|---|---|---|---|---|
| >= 1024px | Side by side, generous spacing | 320px | 100px | 280px | No |
| 768-1023px | Side by side, compact | 260px | 85px | 240px | No |
| 480-767px | Stacked vertically | Full - 32px | 90px | Full - 32px | Yes |
| < 480px | Stacked vertically, compact | Full - 24px | 75px | Full - 24px | Yes |

### 10.6 Math Correctness Requirements (DR-2)

The following computations MUST have corresponding Vitest tests:

| Computation | Test |
|---|---|
| Sector angle calculation: `360 / denominator` | Exact for all denominators 2-12 |
| Sector arc path generation | Verified against known SVG paths for d=2,3,4,6,8,12 |
| Equivalent fraction detection: `a/b == c/d` iff `a*d == b*c` | Integer arithmetic, no floating point |
| Fraction simplification: GCF-based | Tested for all problem bank fractions |
| Bar part width: `barWidth / denominator` | Floating point; sum of parts must equal barWidth within epsilon 0.01px |
| Comparison overlay alignment: `(shadedParts / denominator) * barWidth` | Floating point; equivalence check uses epsilon 0.5px |
| Fraction ordering: `a/b < c/d` iff `a*d < b*c` | Integer arithmetic for all practice comparisons |

---

## 11. Accessibility

### 11.1 ARIA Structure

```html
<!-- Fraction Bar -->
<svg role="group" aria-label="Fraction bar showing 3 out of 4 parts shaded">
  <rect role="checkbox" aria-checked="true" aria-label="Part 1 of 4, shaded"
        tabindex="0" />
  <rect role="checkbox" aria-checked="true" aria-label="Part 2 of 4, shaded"
        tabindex="0" />
  <rect role="checkbox" aria-checked="true" aria-label="Part 3 of 4, shaded"
        tabindex="0" />
  <rect role="checkbox" aria-checked="false" aria-label="Part 4 of 4, not shaded"
        tabindex="0" />
</svg>

<!-- Denominator Slider -->
<input type="range" role="slider"
       aria-label="Number of equal parts"
       aria-valuemin="2" aria-valuemax="12" aria-valuenow="4"
       aria-valuetext="4 equal parts" />

<!-- Fraction Label -->
<div role="status" aria-live="polite" aria-label="Current fraction: 3 fourths">
  <!-- KaTeX renders here -->
</div>
```

### 11.2 Keyboard Navigation

| Key | Action |
|---|---|
| Tab | Move focus between: bar parts (left-to-right), circle sectors (clockwise from 12 o'clock), denominator slider, compare button, continue button |
| Enter / Space | Toggle shade on focused part/sector. Activate buttons. |
| Arrow Left/Right | Adjust denominator slider by 1 |
| Home / End | Jump slider to 2 / 12 |
| Escape | Close comparison overlay |

### 11.3 Screen Reader Announcements

| Event | Announcement (aria-live="polite") |
|---|---|
| Part shaded | "Part 3 of 4 shaded. Fraction is now 3 fourths." |
| Part unshaded | "Part 3 of 4 unshaded. Fraction is now 2 fourths." |
| Denominator change | "Bar divided into 6 equal parts. Shading reset." |
| Comparison overlay | "Comparing 1 half and 2 fourths. Fractions are equivalent — same size." |
| Comparison overlay (different) | "Comparing 2 thirds and 3 fourths. 3 fourths is larger." |

### 11.4 Color Blind Safety

- Shaded vs unshaded distinction: Not relying on color alone. Shaded parts also have a subtle diagonal hatch pattern (SVG `<pattern>`) as an additional visual cue for deuteranopia/protanopia.
- Correct vs incorrect feedback: Green checkmark has distinct shape (checkmark) vs red X (cross). Shape is the primary differentiator, not color.
- Comparison overlay: Cyan overlay on indigo base provides sufficient luminance contrast for all common color vision deficiencies.

### 11.5 Reduced Motion

If `prefers-reduced-motion: reduce` is active:
- All spring/transition animations resolve immediately (duration: 0).
- The hook plays as a slideshow (each frame appears instantly, held for the specified duration).
- Bar split animations show the final state without the "breathing" effect.
- Comparison overlay snaps into position without sliding.
- Particle effects are replaced with a simple border glow.

---

## 12. Performance Budget

| Metric | Target | Measurement |
|---|---|---|
| Total SVG elements (max, at d=12 with comparison) | < 80 | All bars + circle sectors + division lines + labels |
| Frame rate during split animation | >= 55fps P95 | Framer Motion spring on mid-range mobile (Samsung Galaxy A54) |
| Frame rate during comparison overlay | >= 55fps P95 | Overlay slide + transparency compositing |
| Time to interactive (Stage 2 load) | < 500ms | From stage transition to first interaction possible |
| KaTeX render time per label update | < 16ms | Must not drop a frame. Pre-render common fractions. |
| Memory footprint (Stage 2) | < 8MB | SVG DOM + Zustand store + gesture handlers |
| JS bundle for this lesson's unique code | < 15KB gzipped | Excluding shared MathScene components |

### 12.1 Optimization Strategies

1. **Pre-rendered KaTeX**: Common fractions (1/2 through 12/12) are pre-rendered to SVG at build time and cached. Only unusual fractions trigger runtime KaTeX rendering.
2. **SVG element pooling**: When the denominator changes from 4 to 8, the 4 existing `<rect>` elements are reused and 4 new ones are added — not 8 created from scratch.
3. **GPU-accelerated animations**: Framer Motion's `transform` and `opacity` are GPU-composited. Fill color transitions use CSS transitions on the `fill` property (also composited).
4. **Lazy comparison overlay**: The comparison bar's SVG is not rendered until "Compare Fractions" is pressed. Unmounted when hidden.
5. **Debounced slider**: 150ms debounce prevents triggering 10 split animations during a rapid drag.

---

## 13. Content Files

### 13.1 File Structure

```
src/content/domains/numbers-operations/NO-1.4/
├── lesson.mdx             # NLS stage content (prose, prompts, hints)
├── animations.json         # MathScene scene definitions for all 7 stages
├── problems.json           # Practice problem bank (9 core + extras for adaptivity)
└── meta.json               # Topic metadata
```

### 13.2 meta.json

```json
{
  "id": "NO-1.4",
  "name": "Fractions",
  "domain": "numbers-operations",
  "gradeLevel": 6,
  "prerequisites": ["NO-1.1"],
  "successors": ["NO-1.4a", "NO-1.5", "NO-1.4b"],
  "estimatedDuration": {
    "hook": 38,
    "spatialExperience": 180,
    "guidedDiscovery": 240,
    "symbolBridge": 150,
    "realWorldAnchor": 90,
    "practice": 420,
    "reflection": 60,
    "total": 1178
  },
  "hook": {
    "title": "The Pizza Problem",
    "description": "Watch a pizza get sliced smaller and smaller — the bigger the bottom number, the smaller the piece."
  },
  "tags": ["fractions", "equivalent-fractions", "fraction-comparison", "part-of-whole"],
  "misconceptions": [
    {
      "id": "larger-denominator-larger-fraction",
      "description": "1/3 > 1/2 because 3 > 2",
      "prevalence": "high",
      "confrontedInStage": "spatial-experience"
    },
    {
      "id": "different-looking-not-equivalent",
      "description": "2/4 is not the same as 1/2",
      "prevalence": "high",
      "confrontedInStage": "guided-discovery"
    }
  ],
  "crossDomainConnections": [
    {
      "targetId": "SP-5.4",
      "relationship": "Probability values are fractions",
      "directionality": "forward"
    },
    {
      "targetId": "GE-4.6a",
      "relationship": "Arc/sector calculations use fractions of circles",
      "directionality": "forward"
    }
  ]
}
```

### 13.3 animations.json Structure

The `animations.json` file contains one `SceneDefinition` per NLS stage (keyed by stage name). Each definition follows the MathScene DSL schema defined in `specs/001-middle-school-math-mvp/contracts/animation-dsl.md`. The full scene definitions for each stage are specified in Sections 3-7 of this document. The JSON file compiles all of them into:

```json
{
  "hook": { /* SceneDefinition from Section 3.2 */ },
  "spatialExperience": {
    "bar": { /* SceneDefinition from Section 4.3.1 */ },
    "circle": { /* SceneDefinition from Section 4.4.1 */ }
  },
  "guidedDiscovery": {
    "equivalenceStack": { /* Stacked equivalent fraction bars visualization */ },
    "multiplicationArrows": { /* Arrow annotations for ×2, ×3, ×4 pattern */ }
  },
  "symbolBridge": {
    "notation": { /* Fraction bar with annotation arrows */ },
    "equivalenceFormula": { /* Animated multiplication rule */ }
  },
  "realWorldAnchor": {
    "pizza": { /* Pizza sharing scene */ },
    "measuringCup": { /* Recipe scene */ },
    "clock": { /* Time scene */ },
    "priceTag": { /* Discount scene */ }
  }
}
```

### 13.4 problems.json Structure

```json
{
  "topicId": "NO-1.4",
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
        "type": "fraction-identify-bar",
        "difficulty": 0.25,
        "config": { "denominator": 4, "shadedParts": [0, 1, 2] }
      },
      {
        "type": "fraction-identify-circle",
        "difficulty": 0.3,
        "config": { "denominator": 6, "shadedSectors": [0, 1] }
      }
    ],
    "layer1_extras": [
      {
        "type": "equivalent-fraction-find",
        "difficulty": 0.55,
        "config": { "fraction": "1/4", "targetDenominator": 12 }
      },
      {
        "type": "fraction-simplify",
        "difficulty": 0.6,
        "config": { "fraction": "4/12" }
      }
    ],
    "layer2_extras": [
      {
        "type": "explain-why",
        "difficulty": 0.9,
        "config": {
          "stem": "A student says 2/5 = 2/3 because you just have to change the bottom number. What would you tell them?"
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
| Lesson completion (all 7 stages) | 100 | — | — | 100 |
| Reflection quality (0-5 score) | — | 0-80 | — | 80 |
| Interactive exploration (Stage 2) | — | 20-40 | — | 40 |
| Guided discovery insight (Stage 3) | — | 0-30 | — | 30 |
| Practice set completion (Stage 6) | 50 | — | — | 50 |
| **Subtotal before multipliers** | | | | **300** |
| Deep Dive multiplier (>2 min in spatial beyond minimum) | — | — | 1.5x | — |
| Connection Maker (references prior concept in reflection) | — | — | 1.3x | — |
| Struggle Bonus (wrong -> retried -> explained correctly) | — | — | 1.4x | — |
| First Try Clarity (first explanation rated high-quality) | — | — | 1.2x | — |

**Theoretical maximum XP**: 300 base × 1.5 × 1.3 × 1.4 × 1.2 = 300 × 3.276 = 982 XP (extremely unlikely; requires all multipliers simultaneously).

**Typical XP range**: 200-350 XP for a solid completion.

### 14.2 Achievement Triggers

| Achievement | Trigger in This Lesson |
|---|---|
| Fraction Whisperer (Mastery, Uncommon) | If the student explains fractions using all 3 visual models (bar, circle, and real-world) in their reflection. AI evaluates. |
| Edge Walker (Exploration, Uncommon) | If the student tests denominator = 2 AND denominator = 12 during spatial exploration (extremes). |
| The Teacher (Mastery, Uncommon) | If reflection quality score = 5/5. |
| Second Wind (Persistence, Common) | If the student gets a practice problem wrong, reviews the concept, then solves a harder version correctly. |
| Pattern Hunter (Creativity, Uncommon) | If the student identifies the multiplication pattern in Prompt 3 before the AI reveals it (first response is correct without hints). |

### 14.3 SRS Entry

After lesson completion, three `StudentConceptState` records are created (or updated):

| Layer | Initial Stability | Initial Difficulty | First Review |
|---|---|---|---|
| 0 (recall) | 1.0 day | Derived from practice accuracy | Tomorrow |
| 1 (procedure) | 1.5 days | Derived from Layer 1 problem accuracy | ~1.5 days |
| 2 (understanding) | 2.0 days | Derived from reflection quality | ~2 days |

---

## 15. AI Tutor Guidance

### 15.1 System Prompt Context

When the AI tutor is active during this lesson, the system prompt includes:

```
You are helping a Grade 6 student understand fractions (topic NO-1.4).

Current stage: {stage_name}
Student has completed: {completed_stages}
Known misconceptions detected: {detected_misconceptions}

Key pedagogical rules for this topic:
1. NEVER say "a fraction is a/b". Always reference the visual model first.
2. Use the pizza/bar language: "pieces", "parts", "slices" — not "numerator/denominator" until Stage 4.
3. If the student says "1/3 > 1/2", do NOT correct directly. Ask "Let's check with the bars — which shaded area is bigger?"
4. For equivalent fractions, guide the student to discover the multiplication pattern — do not state it.
5. Validate emotional state: if student seems frustrated (3+ wrong in a row), switch to confidence-building mode.

Available scene commands: create/modify fraction bars and circles in the canvas.
```

### 15.2 Misconception Response Patterns

| Student Says | AI Response Strategy |
|---|---|
| "1/3 is bigger than 1/2" | "Interesting thought! Let's test it. Can you make 1/3 and 1/2 on the fraction bars and overlay them? What do you see?" |
| "I don't get fractions" | "That's okay — fractions are weird at first! Let's start with something you know. If you have a pizza and cut it in half, you get two pieces. Each piece is 1/2. Try making that on the bar." |
| "Why do we need fractions?" | "Great question! Imagine sharing 3 pizzas with 4 friends. You can't give each person a whole pizza, and you can't just ignore the leftover. Fractions let us describe exactly how much each person gets: 3/4 of a pizza." |
| "2/4 is not the same as 1/2, they're different numbers" | "I get why you'd think that — the numbers look different! Let's try something: make 1/2 on the bar, then make 2/4. Now use the comparison overlay. What do you notice about the shaded areas?" |

### 15.3 Scene Commands for Tutoring

The AI tutor can generate MathScene commands to illustrate points:

```json
[
  {
    "action": "create",
    "object": {
      "type": "fractionBar",
      "id": "tutor-bar-1",
      "numerator": 1,
      "denominator": 3,
      "width": 200,
      "height": 40,
      "shadedColor": "#818cf8",
      "unshadedColor": "#334155",
      "showLabel": true
    }
  },
  {
    "action": "animate",
    "sequence": {
      "trigger": "auto",
      "steps": [
        { "action": "fadeIn", "target": "tutor-bar-1", "duration": 0.5, "from": "scale" }
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
| Student shades all parts (n/n) | Show "That's 1 whole!" annotation. Do NOT prevent this — it is valid exploration. |
| Student shades zero parts (0/n) | Label shows `\frac{0}{denominator}`. Valid state. No special annotation. |
| Student rapidly toggles the same part | 300ms debounce on toggle. Only the final state counts. |
| Student changes denominator to current value | No-op. No animation plays. Interaction counter does NOT increment. |
| Student tries to compare identical fractions | Overlay shows them as equivalent. Message: "They're exactly the same fraction!" Not an error. |
| Student enters fraction with denominator 0 in practice | Input validation prevents submitting denominator = 0. Error message: "The denominator can't be 0 — you can't divide something into 0 pieces!" |
| Student enters improper fraction (e.g., 5/3 when answer is 5/3) | Accepted if correct. No special handling — improper fractions are valid even though this lesson focuses on proper fractions. |
| Student enters negative fraction | Input only accepts positive integers (number input with min=1). |
| Student leaves mid-lesson | All state persisted to IndexedDB via Dexie.js. On return, lesson resumes at the exact stage and prompt. Spatial exploration state (denominator, shaded parts, interaction count) is all restored. |
| Network loss during AI evaluation | Queued in IndexedDB. Retry on reconnect. Reflection shows "Saving your response..." with a spinner. After 10s offline: "We'll evaluate your response when you're back online." Practice problems that don't need AI (Layer 0, Layer 1) continue working fully offline. |
| Student submits empty reflection | Submit button is disabled until minimum character count (50) is reached. The button shows the remaining character count. |

### 16.2 Device-Specific Edge Cases

| Device Scenario | Handling |
|---|---|
| iOS Safari: SVG tap not registering | Use `pointer-events: visible` on all interactive SVG elements. Add `cursor: pointer` for hover detection. Use `touch-action: manipulation` to prevent 300ms tap delay. |
| Android: Keyboard covering fraction input | Scroll the input into view using `scrollIntoView({ behavior: 'smooth', block: 'center' })` on focus. |
| Low-end device: Split animation drops frames | `useGpuTier()` hook detects GPU tier. If tier <= 1: disable the "breathing" split effect, use instant division line appearance instead. Shading transitions reduce from 300ms to 100ms. |
| Screen rotation during spatial experience | Responsive layout recalculates. Bar/circle dimensions recompute. Shading state is preserved. |
| iPad split-screen mode | Layout detects available width and switches to stacked layout if < 768px effective width, regardless of device type. |

---

## 17. Testing Requirements

### 17.1 Unit Tests (Vitest)

| Test | File | What It Verifies |
|---|---|---|
| Sector angle calculation | `tests/unit/math/fractions.test.ts` | `360 / d` is exact for all d in 2-12 |
| Arc path generation | `tests/unit/math/fractions.test.ts` | SVG path for sectors matches expected arcs for d=2,3,4,6,8,12 |
| Equivalent fraction detection | `tests/unit/math/fractions.test.ts` | `isEquivalent(1,2,2,4)` = true, `isEquivalent(1,2,1,3)` = false. Cross-multiplication: a*d === b*c |
| Fraction simplification | `tests/unit/math/fractions.test.ts` | `simplify(6,8)` = `{3,4}`, `simplify(4,12)` = `{1,3}` |
| Bar part width sum | `tests/unit/math/fractions.test.ts` | For all d in 2-12: sum of `floor(barWidth/d)` parts + remainder < 0.01px |
| Fraction comparison | `tests/unit/math/fractions.test.ts` | `compare(2,5,3,7)` = -1 (3/7 bigger). Uses cross-multiplication. |
| Practice problem validation | `tests/unit/content/NO-1.4.test.ts` | All problems in problems.json parse correctly, have valid answers, and all equivalents are actually equivalent |
| XP calculation | `tests/unit/gamification/xp-NO-1.4.test.ts` | Given exploration metrics, verify XP bonus is 0, 20, or 40 |

### 17.2 Integration Tests

| Test | File | What It Verifies |
|---|---|---|
| Stage progression | `tests/integration/lesson-flow/NO-1.4.test.ts` | Completing all 7 stages in order creates correct `StudentConceptState` records |
| Reflection submission | `tests/integration/trpc/reflection.test.ts` | Submitting reflection via `lesson.submitReflection` returns quality score and XP |
| SRS entry creation | `tests/integration/srs/NO-1.4.test.ts` | After lesson completion, 3 SRS records exist (layers 0, 1, 2) with correct initial stability |
| Practice adaptivity | `tests/integration/lesson-flow/NO-1.4.test.ts` | Getting R1 correct immediately leads to a Layer 1 problem, not another Layer 0 |

### 17.3 Visual Tests (Storybook)

| Story | What It Shows |
|---|---|
| `FractionBar/Default` | Bar with d=4, 3 shaded. Static. |
| `FractionBar/SplitAnimation` | Bar splits from d=4 to d=8. Animated. |
| `FractionBar/AllDenominators` | Grid of bars showing d=2 through d=12. |
| `FractionBar/DarkAndLight` | Both theme variants side by side. |
| `FractionCircle/Default` | Circle with d=6, 4 shaded. Static. |
| `FractionCircle/SplitAnimation` | Circle splits from d=3 to d=6. Animated. |
| `ComparisonOverlay/Equivalent` | 1/2 and 2/4 overlay showing equivalence. |
| `ComparisonOverlay/Different` | 1/2 and 1/3 overlay showing difference. |
| `DenominatorSlider/Interactive` | Slider with live bar/circle preview. |
| `Hook/FullSequence` | Complete hook animation playing through. |
| `SymbolBridge/NotationOverlay` | Numerator/denominator arrows on bar. |

### 17.4 E2E Tests (Playwright)

| Test | File | What It Verifies |
|---|---|---|
| Full lesson completion | `tests/e2e/lessons/NO-1.4.spec.ts` | A student can complete all 7 stages, answer all practice problems, submit reflection, and see XP awarded. |
| Spatial exploration minimum | `tests/e2e/lessons/NO-1.4.spec.ts` | Continue button does not activate until 10 interactions are performed. |
| Comparison overlay | `tests/e2e/lessons/NO-1.4.spec.ts` | Creating 1/2 and 2/4, then overlaying, shows "equivalent" annotation. |
| Offline resume | `tests/e2e/lessons/NO-1.4.spec.ts` | Go offline mid-Stage 3, reload, state is preserved. |
| Mobile layout | `tests/e2e/lessons/NO-1.4.spec.ts` | At viewport 375x667 (iPhone SE), all elements are visible and interactive. Touch targets >= 44px. |
| Keyboard navigation | `tests/e2e/lessons/NO-1.4.spec.ts` | Entire spatial experience can be completed using only keyboard (Tab, Enter, Arrow keys). |
| Screen reader | `tests/e2e/lessons/NO-1.4.spec.ts` | Verify aria-labels update correctly when parts are shaded/unshaded and denominator changes. |

### 17.5 Performance Tests

| Test | Target | How Measured |
|---|---|---|
| Split animation frame rate | >= 55fps P95 | Playwright `page.evaluate(() => performance.now())` frame timing during d=4->d=12 transition on emulated mid-range device |
| Comparison overlay frame rate | >= 55fps P95 | Same technique during overlay slide |
| KaTeX render latency | < 16ms per update | `performance.measure()` around KaTeX render calls |
| Stage 2 TTI | < 500ms | Lighthouse audit on Stage 2 entry |

---

## Appendix A: i18n String Keys

All user-facing strings are externalized to `src/lib/i18n/messages/en.json`:

```json
{
  "lesson.NO-1.4.hook.narration.cutInHalf": "Cut in half — two equal pieces.",
  "lesson.NO-1.4.hook.narration.quarters": "Quarters — four equal pieces.",
  "lesson.NO-1.4.hook.narration.eighths": "Eighths — eight tiny pieces.",
  "lesson.NO-1.4.hook.narration.gettingSmaller": "This is getting smaller as we cut MORE pieces.",
  "lesson.NO-1.4.hook.narration.moreCuts": "More cuts = smaller pieces.",
  "lesson.NO-1.4.hook.narration.biggerSmaller": "The BIGGER the bottom number, the SMALLER the piece.",
  "lesson.NO-1.4.spatial.slider.label": "Number of equal parts",
  "lesson.NO-1.4.spatial.compare.button": "Compare Fractions",
  "lesson.NO-1.4.spatial.compare.showOverlay": "Show Overlay",
  "lesson.NO-1.4.spatial.compare.hideOverlay": "Hide Overlay",
  "lesson.NO-1.4.spatial.compare.equivalent": "They're the same size!",
  "lesson.NO-1.4.spatial.compare.bigger": "{fraction} is bigger!",
  "lesson.NO-1.4.spatial.allShaded": "That's 1 whole!",
  "lesson.NO-1.4.spatial.suggestion.first": "Try comparing 1/2 and 2/4!",
  "lesson.NO-1.4.spatial.suggestion.second": "What about 1/2 and 3/6?",
  "lesson.NO-1.4.spatial.suggestion.third": "Can you find another fraction equal to 1/2?",
  "lesson.NO-1.4.spatial.suggestion.fourth": "Try 2/3 and 4/6.",
  "lesson.NO-1.4.discovery.prompt1": "Make 1/2 on the fraction bar. Now change the denominator to 4 and make 2/4. Notice anything?",
  "lesson.NO-1.4.discovery.prompt2": "Try making 3/6 and 4/8. Are they the same as 1/2?",
  "lesson.NO-1.4.discovery.prompt3": "The key pattern: 1/2 = 2/4 = 3/6 = 4/8. What's happening to the top and bottom numbers each time?",
  "lesson.NO-1.4.discovery.prompt4": "Now compare 1/2 and 1/3. Which is BIGGER?",
  "lesson.NO-1.4.discovery.prompt5": "Which is bigger: 2/3 or 3/4? Make both bars and overlay them to find out.",
  "lesson.NO-1.4.discovery.sameLength": "They're the same length!",
  "lesson.NO-1.4.discovery.equivalentFractions": "Another match! So 1/2 = 2/4 = 3/6 = 4/8. These are called equivalent fractions.",
  "lesson.NO-1.4.discovery.halfBigger": "1/2 is bigger!",
  "lesson.NO-1.4.discovery.morePiecesSmallerPieces": "Even though 3 is bigger than 2, the piece is SMALLER. Why? Because when you cut something into more pieces, each piece gets smaller. More pieces = smaller pieces.",
  "lesson.NO-1.4.discovery.threeQuartersBigger": "3/4 is a tiny bit bigger!",
  "lesson.NO-1.4.symbolBridge.generalForm": "a/b means: split into b parts, take a of them.",
  "lesson.NO-1.4.symbolBridge.equivalenceRule": "For any number n that isn't zero",
  "lesson.NO-1.4.realWorld.pizza.text": "If 8 people share a pizza equally, each person gets 1/8 of the pizza.",
  "lesson.NO-1.4.realWorld.recipe.text": "A recipe calls for 3/4 cup of flour.",
  "lesson.NO-1.4.realWorld.time.text": "A quarter hour = 1/4 of 60 minutes = 15 minutes.",
  "lesson.NO-1.4.realWorld.sales.text": "1/3 off means you save 1/3 of the price and pay 2/3.",
  "lesson.NO-1.4.reflection.prompt": "Explain what a fraction really means and why the denominator matters.",
  "lesson.NO-1.4.reflection.placeholder": "Write your explanation here... What does the top number mean? The bottom number? Why does a bigger bottom number mean smaller pieces?",
  "lesson.NO-1.4.practice.denominatorZero": "The denominator can't be 0 — you can't divide something into 0 pieces!"
}
```

---

## Appendix B: Dependency Graph Context

```
NO-1.1 (Place Value)
  └──→ NO-1.4 (Fractions) ← THIS LESSON
         ├──→ NO-1.4a (Fraction Operations)
         ├──→ NO-1.5 (Ratios & Proportions)
         └──→ NO-1.4b (Fractions/Decimals/Percents)
```

**Backward link (NO-1.1 Place Value)**: Students must understand that numbers represent quantities and that the position/structure of a number conveys meaning. Place value establishes the "parts of a whole" mental model that fractions extend.

**Forward links**:
- **NO-1.4a (Fraction Operations)**: Adding, subtracting, multiplying, and dividing fractions. Requires the part-of-whole model and equivalent fractions from this lesson.
- **NO-1.5 (Ratios & Proportions)**: Ratios are fundamentally fraction comparisons. The equivalent fractions concept from this lesson directly enables proportional reasoning.
- **NO-1.4b (Fractions/Decimals/Percents)**: The triple-representation lesson. Requires deep fraction understanding from this lesson to connect fractions to decimals and percents.

**Cross-domain connections** (surfaced in Knowledge Nebula):
- **SP-5.4 (Simple Probability)**: Probability values are fractions (3/6 chance of rolling even).
- **GE-4.6a (Arc Length & Sector Area)**: Sector of a circle is literally a fraction of the full circle.

---

## Appendix C: Review Checklist

### Pedagogical Review (DR-3)

- [ ] Hook activates curiosity without requiring prior knowledge beyond NO-1.1
- [ ] Spatial Experience precedes ALL symbolic notation (CP-II verified)
- [ ] The 1/3 > 1/2 misconception is confronted spatially before being discussed symbolically
- [ ] No stage is skippable; NLS order is enforced
- [ ] Practice problems include "why does this work?" components (CP-I)
- [ ] No timer pressure anywhere in the lesson (PF-6)
- [ ] AI tutor defaults to Socratic questioning, not direct answers
- [ ] Reflection prompt requires genuine self-explanation, not multiple choice

### Technical Review (DR-3)

- [ ] All animations run at >= 55fps P95 on Samsung Galaxy A54 (or equivalent mid-range)
- [ ] All math computations have corresponding Vitest tests (DR-2)
- [ ] No `any` types in any TypeScript files (DR-1)
- [ ] All user-facing strings are in en.json (DR-7)
- [ ] Lesson works offline after initial load (DR-6, excluding AI tutor)
- [ ] All touch targets >= 44x44px (DR-5)
- [ ] WCAG 2.1 AA compliance: contrast ratios, ARIA labels, keyboard navigation (CP-IV)
- [ ] Content is in MDX/JSON, not hardcoded in components (DR-4)
- [ ] `prefers-reduced-motion` is respected for all animations
