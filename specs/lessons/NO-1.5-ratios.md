# Lesson Design: NO-1.5 Ratios

**Version**: 1.0.0 | **Date**: 2026-03-23 | **Branch**: `001-middle-school-math-mvp`
**Topic ID**: NO-1.5 | **Domain**: Numbers & Operations | **Grade**: 6
**Prerequisites**: NO-1.4a (Fraction Operations) | **Successors**: NO-1.5a (Unit Rates), NO-1.7 (Percent Applications), AL-3.7 (Linear Equations), GE-4.10 (Similar Figures & Scale), GE-4.12 (Dilation)
**Content Path**: `src/content/domains/numbers-operations/NO-1.5/`
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

Ratios compare two quantities -- "3:5" means for every 3 of A, there are 5 of B. Ratios can be written as fractions but represent a comparison between two groups, not a part of a whole.

**Secondary insights** (built progressively through stages):
- Order matters in a ratio: 3:5 is fundamentally different from 5:3. The first number always refers to the first quantity named.
- Equivalent ratios are produced by multiplying (or dividing) both terms by the same nonzero number, just like equivalent fractions -- but the meaning is different (scaling a relationship rather than renaming a single quantity).
- A double number line is a spatial tool that shows how two quantities scale together: when one quantity increases, the other increases proportionally.
- A ratio table organizes the same relationship vertically and reveals the multiplicative pattern.

**Key misconception to defeat**: "A ratio is just a fraction." This is the most damaging conflation because it leads students to interpret 3:5 as "3 out of 5" (a part-of-whole fraction = 3/5) rather than "3 of one thing compared to 5 of another." The spatial experience in Stage 2 directly confronts this by showing two separate groups of objects on a double number line, making it physically clear that ratio compares TWO groups while a fraction represents ONE quantity as part of a whole.

---

## 2. Neuroscience Framework

### 2.1 Pedagogical Principle Mapping

| PF Principle | How This Lesson Applies It |
|---|---|
| PF-1: Spatial-Mathematical Neural Overlap | The double number line is a spatial object: two parallel horizontal lines with tick marks. Students drag markers along both lines simultaneously, engaging the intraparietal sulcus to build an embodied sense of "these two quantities move together." The ratio table is introduced as a vertical compression of the same spatial model. |
| PF-2: Dual Coding Theory | KaTeX notation (3:5, 3/5, "3 to 5") is placed directly ON the double number line, with arrows connecting each notation form to its corresponding position. Narration text appears inline with the visual -- never in a separate panel. |
| PF-3: Embodied Cognition | Students physically drag colored tokens into two groups, then drag a ratio marker along a double number line. The motor cortex activation from dragging creates stronger memory traces than passively watching. The "for every" relationship is felt through repeated grouping actions. |
| PF-4: Spacing Effect | After this lesson, ratio items enter the FSRS queue at all three layers (recall, procedure, understanding). Initial stability is low (~1 day), forcing early review. Cross-references to NO-1.4a (fractions) and NO-1.5a (unit rates) create interleaving opportunities. |
| PF-5: Interleaving | Practice problems interleave ratio identification, equivalent ratios, and ratio-vs-fraction discrimination. Students must determine what the problem is asking, not just execute a procedure. |
| PF-6: Math Anxiety Reduction | The hook uses a relatable social media scenario (TikTok virality). The spatial experience is exploratory -- no right/wrong during manipulation. Practice has no timer. Wrong answers receive neutral, instructive feedback. |

### 2.2 Cognitive Load Management

- **Intrinsic load**: Ratios are moderate-complexity for Grade 6. The concept of "comparison" is familiar; the new idea is formalizing it with notation and understanding equivalence. The lesson decomposes into three sub-ideas: (1) ratio as comparison, (2) order matters, (3) equivalent ratios -- introduced sequentially.
- **Extraneous load**: Minimized by reusing visual language from NO-1.4 (fraction bars) as a contrast tool, and by using a single double number line as the core spatial model. No menus, no settings, no distractions during any stage.
- **Germane load**: Maximized by the ratio-vs-fraction confrontation (prediction error drives learning) and by the double number line making the multiplicative scaling pattern visible through physical interaction.

### 2.3 Prior Knowledge Activation

This lesson builds directly on NO-1.4a (Fraction Operations). The student already understands:
- Fractions as parts of a whole (fraction bar model)
- Equivalent fractions (multiplying top and bottom by the same number)
- Fraction notation (a/b)

The hook deliberately contrasts ratio with fraction to activate and challenge the student's existing schema. The double number line is a new spatial model, but it extends the single number line they have seen since NO-1.1 (Place Value) and NO-1.2 (Integers). The concept of equivalent ratios mirrors equivalent fractions -- a deliberate "transfer" opportunity.

### 2.4 Misconception Architecture

| Misconception | Prevalence | How Defeated | Stage |
|---|---|---|---|
| "A ratio is just a fraction" (3:5 = 3/5 = "3 out of 5") | Very high (~60% of entering Grade 6) | Spatial: Two separate groups of objects (blue circles vs orange circles) are placed on a double number line. The student can see 3 blue and 5 orange = 3:5, but the total is 8, and the fraction of blue is 3/8, not 3/5. Direct visual confrontation in Discovery Prompt 3. | 2, 3 |
| "Order doesn't matter" (3:5 = 5:3) | High (~45%) | Spatial: Swapping the groups on the double number line produces a visually different configuration. Discovery Prompt 2 asks "what changes when we flip the ratio?" and the double number line shows the lines swap positions. The student sees that "3 dogs for every 5 cats" is not the same as "5 dogs for every 3 cats." | 2, 3 |
| "Equivalent ratios mean adding the same number to both" (3:5 -> 4:6 by adding 1) | Moderate (~35%) | Discovery Prompt 4: The double number line shows that 3:5 and 4:6 do NOT land on the same proportional positions. Adding 1 to each breaks the pattern. Only multiplying both by the same number preserves it. Visual confirmation: 4:6 marker is off-line while 6:10 is on-line. | 3 |
| "A ratio always has to be simplified" | Low (~15%) | Symbol Bridge: notation shows 3:5, 6:10, 9:15 as all valid representations. A ratio can be in any equivalent form -- there is no single "correct" simplification. Contrast with fraction simplification from NO-1.4. | 4 |

---

## 3. Stage 1 -- Hook (30-60s)

### 3.1 Narrative Arc

The hook presents a viral social media comparison: two TikTok creators with different like-to-share ratios. Creator A has 2.4 million likes and 800K shares. Creator B has 500K likes and 200K shares. The raw numbers suggest A is "more viral," but the ratio reveals they are equally viral per-share. Then a third creator appears with "better" numbers (1M likes, 250K shares = 4:1 ratio), showing that ratio is the fair way to compare. The visual punchline: bar charts of raw numbers are misleading, but the ratio (likes per share) reveals the truth.

### 3.2 Scene Definition

```json
{
  "id": "NO-1.5-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 400],
  "background": "transparent",
  "objects": [
    {
      "type": "annotation",
      "id": "title-text",
      "position": [200, 30],
      "latex": "\\text{Who's MORE viral?}",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 24 }
    },
    {
      "type": "group",
      "id": "creator-a",
      "visible": false,
      "children": [
        {
          "type": "geometricShape",
          "id": "avatar-a",
          "shape": "circle",
          "center": [100, 90],
          "radius": 24,
          "style": { "fill": "#818cf8", "stroke": "#6366f1", "strokeWidth": 2 }
        },
        {
          "type": "annotation",
          "id": "name-a",
          "position": [100, 125],
          "latex": "\\text{Creator A}",
          "anchor": "center",
          "style": { "fontSize": 14 }
        },
        {
          "type": "geometricShape",
          "id": "bar-likes-a",
          "shape": "rect",
          "position": [60, 145],
          "width": 80,
          "height": 0,
          "style": { "fill": "#f472b6", "rx": 4 }
        },
        {
          "type": "annotation",
          "id": "likes-a-label",
          "position": [100, 150],
          "latex": "\\text{2.4M likes}",
          "anchor": "center",
          "visible": false,
          "style": { "fontSize": 11 }
        },
        {
          "type": "geometricShape",
          "id": "bar-shares-a",
          "shape": "rect",
          "position": [60, 260],
          "width": 80,
          "height": 0,
          "style": { "fill": "#60a5fa", "rx": 4 }
        },
        {
          "type": "annotation",
          "id": "shares-a-label",
          "position": [100, 265],
          "latex": "\\text{800K shares}",
          "anchor": "center",
          "visible": false,
          "style": { "fontSize": 11 }
        }
      ]
    },
    {
      "type": "group",
      "id": "creator-b",
      "visible": false,
      "children": [
        {
          "type": "geometricShape",
          "id": "avatar-b",
          "shape": "circle",
          "center": [300, 90],
          "radius": 24,
          "style": { "fill": "#a78bfa", "stroke": "#8b5cf6", "strokeWidth": 2 }
        },
        {
          "type": "annotation",
          "id": "name-b",
          "position": [300, 125],
          "latex": "\\text{Creator B}",
          "anchor": "center",
          "style": { "fontSize": 14 }
        },
        {
          "type": "geometricShape",
          "id": "bar-likes-b",
          "shape": "rect",
          "position": [260, 145],
          "width": 80,
          "height": 0,
          "style": { "fill": "#f472b6", "rx": 4 }
        },
        {
          "type": "annotation",
          "id": "likes-b-label",
          "position": [300, 150],
          "latex": "\\text{500K likes}",
          "anchor": "center",
          "visible": false,
          "style": { "fontSize": 11 }
        },
        {
          "type": "geometricShape",
          "id": "bar-shares-b",
          "shape": "rect",
          "position": [260, 260],
          "width": 80,
          "height": 0,
          "style": { "fill": "#60a5fa", "rx": 4 }
        },
        {
          "type": "annotation",
          "id": "shares-b-label",
          "position": [300, 265],
          "latex": "\\text{200K shares}",
          "anchor": "center",
          "visible": false,
          "style": { "fontSize": 11 }
        }
      ]
    },
    {
      "type": "annotation",
      "id": "ratio-reveal",
      "position": [200, 350],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 20 }
    },
    {
      "type": "annotation",
      "id": "narration",
      "position": [200, 385],
      "latex": "",
      "anchor": "center",
      "visible": false,
      "style": { "fontSize": 14 }
    }
  ]
}
```

### 3.3 Animation Sequence

The hook runs as a single auto-triggered animation sequence. The student does not need to interact -- they watch.

**Timeline (total: ~40 seconds):**

| Time (s) | Action | Duration | Details |
|---|---|---|---|
| 0.0-0.5 | Title fades in | 0.5s | "Who's MORE viral?" in large text, centered at top. `ease: "easeInOut"`. |
| 0.5-1.5 | Hold | 1.0s | Student reads the question. Curiosity primes. |
| 1.5-2.5 | Creator A avatar + name slide in | 1.0s | Avatar circle and "Creator A" slide in from the left (spring: `damping: 20, stiffness: 300`). |
| 2.5-3.5 | Creator A likes bar grows | 1.0s | Pink bar grows downward from y=145 to height 100px (representing 2.4M). Smooth ease. Label "2.4M likes" fades in above the bar. |
| 3.5-4.3 | Creator A shares bar grows | 0.8s | Blue bar grows downward from y=260 to height 35px (representing 800K). Label "800K shares" fades in. |
| 4.3-5.3 | Hold Creator A | 1.0s | Student absorbs the numbers. |
| 5.3-6.3 | Creator B avatar + name slide in | 1.0s | Avatar circle and "Creator B" slide in from the right (spring: `damping: 20, stiffness: 300`). |
| 6.3-7.3 | Creator B likes bar grows | 1.0s | Pink bar grows to height 22px (representing 500K -- much shorter than A's bar). Label "500K likes" fades in. |
| 7.3-8.1 | Creator B shares bar grows | 0.8s | Blue bar grows to height 9px (representing 200K). Label "200K shares" fades in. |
| 8.1-10.0 | Hold both | 1.9s | Both creators are visible side by side. A's bars are dramatically taller. Initial impression: A is clearly "more viral." |
| 10.0-11.5 | Narration appears | 0.5s | Bottom text fades in: "Creator A has way more likes. So A is more viral... right?" |
| 11.5-13.5 | Hold | 2.0s | Student considers the question. |
| 13.5-15.0 | Bar chart fades, ratio calculation begins | 1.5s | Both bar chart groups fade to 30% opacity (`ease: "easeInOut", duration: 0.5s`). Two ratio calculations slide in from center: "A: 2,400,000 / 800,000" and "B: 500,000 / 200,000". Each uses a horizontal fraction-bar layout with pink numerator and blue denominator. |
| 15.0-17.0 | Ratio simplification animation | 2.0s | Both fractions simplify step by step. A: trailing zeros peel off (the six zeros in both numerator and denominator shrink and vanish pairwise, 200ms each pair), revealing "24/8", then "3/1". B: zeros peel off to reveal "5/2", then shows "2.5/1". These simplify further. A final common comparison: "A: 3 likes per share" and "B: 2.5 likes per share". Numbers lock in with a subtle spring (`damping: 20, stiffness: 300`). |
| 17.0-19.0 | Hold simplified ratios | 2.0s | Student sees: A gets 3 likes per share, B gets 2.5 likes per share. |
| 19.0-21.0 | Narration update | 0.5s | Narration changes to: "Per share, A gets only slightly more. The raw numbers were misleading!" Bold on "misleading" in `#f87171` (red). |
| 21.0-23.0 | Hold | 2.0s | |
| 23.0-25.0 | Creator C appears | 2.0s | A new avatar (emerald `#34d399` circle) slides in from the bottom center. "Creator C" label. Below: "1M likes, 250K shares." Numbers fade in over 500ms. |
| 25.0-27.0 | Creator C ratio calculation | 2.0s | "1,000,000 / 250,000" simplifies (zeros peel) to "4/1" = "4 likes per share." Number locks in with spring pop. |
| 27.0-29.0 | Comparison bars | 2.0s | Three horizontal bars appear, representing likes-per-share: A = 3 units long (indigo), B = 2.5 units long (violet), C = 4 units long (emerald). Left-aligned. C is clearly longest. |
| 29.0-31.0 | Narration update | 0.5s | "Creator C is the MOST viral per share. RATIO reveals what raw numbers hide." Bold on "RATIO" in `#fbbf24` (amber). |
| 31.0-34.0 | Hold + final question | 3.0s | Below the comparison bars, text fades in: "But what IS a ratio, exactly? And how does it compare to a fraction?" This question creates the curiosity gap for the lesson. |
| 34.0-40.0 | Hold on final state | 6.0s | Everything holds. The student absorbs. |

**Continue button**: Appears at `t = 15.0s` (after the ratio simplification begins), positioned bottom-right, 48x48px touch target, subtle fade-in (`opacity: 0 -> 1` over 500ms). The button does NOT interrupt the animation -- the hook continues playing while the button is available. If the student taps Continue before the hook finishes, the animation stops gracefully (all objects snap to their final states over 200ms).

### 3.4 Visual Design Details

- **Title text**: `#e2e8f0` (slate-200) on dark backgrounds. Font: system sans-serif. 24px.
- **Creator A accent**: `#818cf8` (indigo-400) for avatar.
- **Creator B accent**: `#a78bfa` (violet-400) for avatar.
- **Creator C accent**: `#34d399` (emerald-400) for avatar.
- **Likes bars**: `#f472b6` (pink-400) -- consistent "likes" color.
- **Shares bars**: `#60a5fa` (blue-400) -- consistent "shares" color.
- **Ratio reveal text**: `#fbbf24` (amber-400) for emphasis.
- **Narration text**: `#e2e8f0` (slate-200), 14px body, `#94a3b8` (slate-400) for secondary.
- **Background**: Inherits from app theme (dark: `#0f172a` slate-900, light: `#f8fafc` slate-50).

### 3.5 Sound Design

| Moment | Sound | Duration | Notes |
|---|---|---|---|
| Creator avatars slide in | Soft "whoosh" | 200ms | Light, not attention-stealing. |
| Bar growth | Subtle rising tone | Matches bar animation duration | Pitched proportionally to bar height (taller = higher pitch). |
| Zeros peel off during simplification | Light "tick" per zero pair | 100ms each | Rapid but distinct. Creates a satisfying cascade. |
| Ratio number locks in | Confident "snap" | 150ms | Same as platform-wide "value confirmed" cue. |
| "RATIO reveals" narration | Discovery chime (rising two-note) | 400ms | Same as platform-wide "insight" cue. |

All sounds respect the `soundEnabled` user preference. Sounds are loaded as 22kHz mono WAV files, <10KB each, cached by service worker.

### 3.6 Gamification: Hook XP

No XP is awarded for watching the hook. The hook's purpose is activation of curiosity and the reward-prediction system, not assessment. Watching the full hook (>25s without skipping) is tracked in analytics for pedagogical review but has no gamification consequence.

---

## 4. Stage 2 -- Spatial Experience (3-4 min)

### 4.1 Overview

The spatial experience presents a **double number line** as the primary model and a **grouping workspace** above it. The student creates groups of two types of objects (blue circles and orange circles), then sees the corresponding relationship mapped onto two parallel number lines. The student can drag a ratio marker along the double number line to discover equivalent ratios.

**Minimum interaction count**: 10 distinct interactions before the "Continue to Guided Discovery" button activates. An "interaction" is defined as: adding/removing tokens to groups, dragging the ratio marker, tapping to change the scenario, or toggling the ratio table view. This ensures genuine manipulation (PF-3: Embodied Cognition) rather than click-through behavior.

**Interaction counter**: Displayed as a subtle progress ring around the Continue button (not as a number -- numbers feel like targets to game). The ring fills as the student interacts. At 10 interactions the ring completes and the button glows softly.

### 4.2 Layout

```
Desktop (>=768px):
┌────────────────────────────────────────────────────────┐
│  Prompt: "Make a group of blue circles and orange      │
│  circles. Watch how the double number line tracks      │
│  their relationship."                                   │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌── Grouping Workspace ─────────────────────────────┐ │
│  │                                                     │ │
│  │  Blue:   ● ● ●        [+ ] [- ]                   │ │
│  │  Orange: ● ● ● ● ●    [+ ] [- ]                   │ │
│  │                                                     │ │
│  │  Ratio display: 3 : 5                              │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌── Double Number Line ─────────────────────────────┐ │
│  │  Blue:  0──3──6──9──12──15──18──21──24            │ │
│  │  Orange:0──5──10─15──20──25──30──35──40            │ │
│  │              ▲                                      │ │
│  │         [draggable ratio marker]                    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  [Show Ratio Table]  [Swap Order]                       │
│                                                         │
│  [Continue button with progress ring]                   │
└────────────────────────────────────────────────────────┘

Mobile (<768px):
Same layout but single column, compact spacing.
Grouping workspace at top, double number line below.
Ratio table slides up from bottom as a sheet.
```

### 4.3 Grouping Workspace

#### 4.3.1 Scene Definition

```json
{
  "id": "NO-1.5-spatial-groups",
  "renderer": "svg",
  "viewBox": [0, 0, 380, 120],
  "objects": [
    {
      "type": "group",
      "id": "blue-row",
      "children": [
        {
          "type": "annotation",
          "id": "blue-label",
          "position": [30, 35],
          "latex": "\\text{Blue:}",
          "anchor": "end",
          "style": { "fontSize": 14 }
        }
      ]
    },
    {
      "type": "group",
      "id": "orange-row",
      "children": [
        {
          "type": "annotation",
          "id": "orange-label",
          "position": [30, 85],
          "latex": "\\text{Orange:}",
          "anchor": "end",
          "style": { "fontSize": 14 }
        }
      ]
    },
    {
      "type": "annotation",
      "id": "ratio-display",
      "position": [190, 110],
      "latex": "3 : 5",
      "anchor": "center",
      "style": { "fontSize": 22 }
    }
  ]
}
```

#### 4.3.2 Token Rendering Details

Each "token" is an SVG `<circle>` with radius 14px, arranged horizontally in its row.

**Blue tokens**:
- Fill: `#60a5fa` (blue-400). Stroke: `#3b82f6` (blue-500), 1.5px.
- Positioned starting at x=50, spaced 36px apart (center-to-center).
- Maximum: 12 tokens per row (to prevent overflow on mobile).

**Orange tokens**:
- Fill: `#fb923c` (orange-400). Stroke: `#f97316` (orange-500), 1.5px.
- Same positioning rules as blue, in the second row.

**Add/Remove buttons**: Two buttons per row, positioned to the right of the last token.
- "+" button: 44x44px touch target. SVG circle with `+` symbol. Fill: `#1e293b` (slate-800). Stroke: `#64748b`. On tap: `scale: 0.9` for 100ms (spring: `damping: 15, stiffness: 400`).
- "-" button: Same dimensions. SVG circle with `-` symbol. Disabled (opacity 0.3) when count = 0.

**Token add animation**: When "+" is tapped, a new circle pops in at the end of the row from `scale: 0` to `scale: 1` using spring (`damping: 15, stiffness: 400`). Duration: ~300ms.

**Token remove animation**: When "-" is tapped, the last circle shrinks from `scale: 1` to `scale: 0` over 200ms (`ease: "easeInOut"`), then is removed from the DOM.

**Ratio display**: Below the two rows, centered, a large KaTeX-rendered ratio `{blue} : {orange}` updates in real time. The blue count is colored `#60a5fa` and the orange count is colored `#fb923c`. When either count changes, the ratio text does a brief crossfade (150ms, `AnimatePresence`).

**Default values**: Blue starts at 3, Orange starts at 5. The prompt text reads: "Make a group of blue circles and orange circles. Watch how the double number line tracks their relationship."

#### 4.3.3 Edge Cases

- **Either count = 0**: The ratio display changes to "0 : {n}" or "{n} : 0". The double number line still renders but the zero-quantity line shows only the "0" mark. A subtle annotation appears: "With zero of one type, there's nothing to compare!" (300ms fade, 3s visible, 300ms fade-out).
- **Both counts = 0**: Ratio display shows "0 : 0". Annotation: "Add some circles to start comparing!" Double number line is blank.
- **Counts equal**: Ratio display shows "n : n". Annotation: "Equal amounts! The ratio simplifies to 1 : 1." The double number line tick marks overlap perfectly.
- **Rapid tapping**: Add/remove buttons have a 150ms debounce. Multiple rapid taps queue but each animates sequentially (no overlapping animations).
- **Count reaches 12**: The "+" button disables (opacity 0.3). Tooltip on tap: "Maximum reached."

### 4.4 Double Number Line

#### 4.4.1 Scene Definition

```json
{
  "id": "NO-1.5-spatial-double-line",
  "renderer": "svg",
  "viewBox": [0, 0, 380, 140],
  "objects": [
    {
      "type": "line",
      "id": "line-blue",
      "from": [40, 40],
      "to": [360, 40],
      "style": { "stroke": "#60a5fa", "strokeWidth": 2.5 }
    },
    {
      "type": "line",
      "id": "line-orange",
      "from": [40, 100],
      "to": [360, 100],
      "style": { "stroke": "#fb923c", "strokeWidth": 2.5 }
    },
    {
      "type": "annotation",
      "id": "label-line-blue",
      "position": [20, 40],
      "latex": "\\textcolor{#60a5fa}{\\text{Blue}}",
      "anchor": "end",
      "style": { "fontSize": 11 }
    },
    {
      "type": "annotation",
      "id": "label-line-orange",
      "position": [20, 100],
      "latex": "\\textcolor{#fb923c}{\\text{Org}}",
      "anchor": "end",
      "style": { "fontSize": 11 }
    },
    {
      "type": "geometricShape",
      "id": "ratio-marker",
      "shape": "rect",
      "position": [0, 25],
      "width": 3,
      "height": 90,
      "style": { "fill": "#fbbf24", "rx": 1.5, "opacity": 0.8 }
    }
  ]
}
```

#### 4.4.2 Double Number Line Rendering Details

The double number line consists of two parallel horizontal lines. Each line has tick marks and labels corresponding to multiples of the respective group count.

**Blue line (top)**:
- Horizontal line from x=40 to x=360 (usable width: 320px).
- Tick marks at positions representing multiples of the blue count. For blue=3: ticks at 0, 3, 6, 9, 12, 15, 18, 21, 24.
- Tick spacing: `320px / numTicks` where `numTicks = floor(maxValue / blueCount)`.
- The maximum value displayed is the LCM of blue and orange counts, multiplied by 3 (to show at least 3 equivalent ratio pairs). Capped at 48 to prevent overcrowding.
- Tick marks: vertical `<line>` elements, 8px tall, stroke `#60a5fa`, 1.5px width.
- Labels: number below each tick, `#60a5fa`, 11px font. Uses `tabular-nums` for alignment. Only every Nth label shown if ticks are too dense (spacing < 30px).

**Orange line (bottom)**:
- Same structure as blue line, but with orange multiples. For orange=5: ticks at 0, 5, 10, 15, 20, 25, 30, 35, 40.
- Tick marks: vertical `<line>` elements, 8px tall, stroke `#fb923c`, 1.5px width.
- Labels: number below each tick, `#fb923c`, 11px font.

**Critical alignment**: The tick for `blue × k` on the blue line is at the SAME x-position as the tick for `orange × k` on the orange line. This is the core visual insight: equivalent ratios share the same vertical position on the double number line. For ratio 3:5, the tick at blue=3 aligns with orange=5, blue=6 aligns with orange=10, blue=9 aligns with orange=15, etc.

**Alignment computation**:
- Let `scaleFactor = 320 / (max(blueCount, orangeCount) * numGroups)` where `numGroups` is the number of ratio groups to display (default: 8, capped so no label < 20px apart).
- Blue tick position for value `v`: `x = 40 + v * scaleFactor`.
- Orange tick position for value `v`: `x = 40 + v * scaleFactor`.
- Because equivalent ratios satisfy `blue × k` and `orange × k` for the same `k`, both ticks land at `x = 40 + k * blueCount * scaleFactor = 40 + k * orangeCount * scaleFactor`... WAIT: this only works if `blueCount * scaleFactor = orangeCount * scaleFactor`, which is not generally true.
- **Correct alignment logic**: The two lines share the SAME x-axis scale based on the RATIO, not absolute values. Each "group" occupies the same width on both lines. For k groups displayed, group `k` is at `x = 40 + k * (320 / maxGroups)`. The blue label at group `k` shows `blueCount * k`. The orange label at group `k` shows `orangeCount * k`. This ensures alignment.

**Tick animation**: When the blue or orange count changes in the grouping workspace:
1. Existing ticks fade out (150ms).
2. New ticks draw from top to bottom (200ms, staggered 30ms apart from left to right, `ease: "easeInOut"`).
3. Labels fade in below ticks (150ms delay after tick appears).
4. Connecting dashed lines between aligned ticks on both lines pulse briefly (`#fbbf24` amber, 1px dashed, opacity 0.3, visible for 800ms then fade to 0).

#### 4.4.3 Ratio Marker (Draggable)

A vertical amber bar (`#fbbf24`, 3px wide, 90px tall) that spans from the blue line to the orange line. The marker snaps to group positions (aligned tick marks).

**Drag interaction**: Uses `@use-gesture/react` `useDrag`:
- Constrained to x-axis.
- Snaps to the nearest group position. Between groups, the marker follows the pointer but the value labels do not change until the nearest group threshold is crossed.
- Touch target: 44px wide invisible hit area centered on the 3px bar.
- On drag start: marker opacity increases to 1.0, width increases to 5px (spring: `damping: 15, stiffness: 400`).
- On drag end: marker snaps to nearest group, width returns to 3px.

**Marker labels**: When the marker is at group position `k`:
- A blue label appears above the blue line at the marker position: `{blueCount * k}` in `#60a5fa`.
- An orange label appears below the orange line: `{orangeCount * k}` in `#fb923c`.
- Between the two lines, a ratio annotation: `{blueCount * k} : {orangeCount * k}` in `#fbbf24` (amber).
- All labels animate with crossfade (150ms) when k changes.

**Default marker position**: Group 1 (showing the base ratio 3:5).

#### 4.4.4 Swap Order Button

A secondary action button below the double number line. Label: "Swap Order". Border `#818cf8`, text `#818cf8`, background transparent. Touch target: 48px height.

**Behavior when pressed**:
1. The blue line (with all its ticks and labels) and the orange line swap vertical positions with a spring animation (spring: `damping: 20, stiffness: 300`). Blue slides down, orange slides up. Duration: ~400ms.
2. The ratio display updates: "3 : 5" becomes "5 : 3".
3. A brief annotation fades in: "The ratio flipped! 3:5 is NOT the same as 5:3." (300ms fade, held 2.5s, then fades out).
4. Interaction counter increments by 1.
5. Pressing again swaps back to the original order.

### 4.5 Ratio Table (Toggle View)

#### 4.5.1 Activation

A secondary button labeled "Show Ratio Table" sits to the left of the "Swap Order" button. Same styling.

**Behavior when pressed**:
1. A table slides up from below the double number line (spring: `damping: 20, stiffness: 300`).
2. The table shows the same data as the double number line, but in tabular form.
3. Button text changes to "Hide Ratio Table".

#### 4.5.2 Table Layout

```
┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ Blue │  0   │  3   │  6   │  9   │  12  │  15  │  18  │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│Orange│  0   │  5   │  10  │  15  │  20  │  25  │  30  │
└──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘
```

- Header cells (Blue/Orange) use the respective accent colors.
- Data cells use `#e2e8f0` text on `#1e293b` background.
- The column corresponding to the current ratio marker position is highlighted with a `#fbbf24` (amber) left and right border, 2px.
- Each column animates in from the left with 50ms stagger (spring: `damping: 25, stiffness: 200`).
- Font: 14px `tabular-nums`. Cell height: 44px (touch-accessible).
- On mobile (<480px), the table scrolls horizontally. The first column (labels) is sticky.

#### 4.5.3 Table Interaction

- **Tap a column**: The ratio marker on the double number line jumps to the corresponding group position (spring animation). The column highlights. Interaction counter increments by 1.
- **Scroll on mobile**: Standard horizontal scroll. The highlighted column remains visible when scrolling.

### 4.6 Interaction Tracking

Each of these actions increments the interaction counter:
1. Tapping "+" to add a token to either row (+1).
2. Tapping "-" to remove a token (+1).
3. Dragging the ratio marker to a new group position (+1).
4. Pressing "Swap Order" (+1).
5. Pressing "Show Ratio Table" (+1).
6. Tapping a column in the ratio table (+1).

The counter does NOT increment for:
- Tapping the same button twice rapidly (debounced at 150ms).
- Dragging the marker without changing the group position.
- Pressing "Hide Ratio Table" (cleanup action).

**Exploration diversity tracking** (for XP bonus, not shown to student):
```typescript
interface ExplorationMetrics {
  uniqueRatiosCreated: Set<string>;      // "3:5", "2:7", etc.
  maxBlueUsed: number;
  maxOrangeUsed: number;
  swapUsed: boolean;                     // tried order swap
  ratioTableViewed: boolean;             // opened ratio table
  markerPositionsExplored: number;       // unique group positions
  totalTimeSpentMs: number;
}
```

If `uniqueRatiosCreated.size >= 4` AND `swapUsed` AND `ratioTableViewed`: "exploration bonus" = 40 XP.
If `uniqueRatiosCreated.size >= 2` AND (`swapUsed` OR `ratioTableViewed`): "exploration bonus" = 20 XP.
Otherwise: 0 bonus.

### 4.7 Mobile Adaptations

- **< 768px width**: All elements stack vertically. Grouping workspace on top, double number line below, buttons below that.
- **< 480px width**: Token radius reduces from 14px to 11px. Token spacing reduces from 36px to 28px. Maximum tokens per row reduces from 12 to 9. Double number line shows 6 groups instead of 8. Ratio table uses horizontal scroll.
- **Landscape mobile**: Side-by-side layout restored only if viewport height > 340px. Otherwise stacked with scroll.
- **Touch behavior**: All tap targets >= 44x44px. The ratio marker's invisible hit area is 48px wide on mobile for fat-finger accommodation. Token add/remove buttons have 48x48px hit areas.

---

## 5. Stage 3 -- Guided Discovery (4-5 min)

### 5.1 Prompt Sequence

The guided discovery stage presents a sequence of 5 prompts. Each prompt asks the student to observe or interact with the spatial models from Stage 2 (which remain visible and interactive) and then answer a question. The models reset to specific states for each prompt.

#### Prompt 1: Discover "For Every" Language

**Setup**: Grouping workspace resets to blue=2, orange=3. Double number line updates accordingly. Ratio marker at group 1.

**Prompt text**: "Look at your groups: 2 blue circles and 3 orange circles. Now drag the ratio marker to the right. What happens to both numbers?"

**Expected interaction**:
1. Student drags the ratio marker to group 2: labels show 4 and 6.
2. Student drags to group 3: labels show 6 and 9.
3. Student notices that both numbers grow together.

**Insight target**: The ratio relationship is preserved as you scale up -- "for every 2 blue, there are 3 orange" stays true at any marker position.

**Visual feedback when marker reaches group 2**: A brief highlight animation -- both the "4" label and "6" label pulse with a glow (box-shadow: `0 0 8px #fbbf24`, 400ms). Dashed lines between the aligned ticks on both number lines draw in amber (`#fbbf24`, 1px, dash array `4 4`), connecting the 4 and 6 to the same vertical position.

**Acknowledgment button**: "I see it!" -- appears after the student has moved the marker at least twice. On tap: Prompt 2 slides in from the right (300ms, `ease: "easeInOut"`).

#### Prompt 2: Discover That Order Matters

**Setup**: Models stay at blue=2, orange=3. Marker returns to group 1.

**Prompt text**: "The ratio of blue to orange is 2:3. Now tap 'Swap Order.' What do you notice about the ratio?"

**Expected interaction**:
1. Student taps "Swap Order."
2. The lines swap positions. Ratio display changes to "3:2."
3. The double number line now shows orange multiples on top and blue on bottom.

**Insight target**: 2:3 and 3:2 are different ratios. The first number always refers to the first quantity named.

**Visual feedback when swapped**: The ratio display animates with emphasis: old ratio "2:3" slides left and fades out while new ratio "3:2" slides in from the right (300ms, spring). A large annotation appears centered between the lines: "2 blue for every 3 orange is NOT the same as 3 blue for every 2 orange!" Text uses bold on "NOT" colored `#f87171` (red). Annotation holds for 3s.

**Acknowledgment button**: "I see it!" -- appears after the student has performed the swap. On tap: Prompt 3 slides in.

#### Prompt 3: Ratio vs Fraction Confrontation

**Setup**: Models reset to blue=3, orange=5. Marker at group 1. The swap is restored to original order (blue:orange).

**Prompt text**: "You have 3 blue and 5 orange. Someone says 'the ratio 3:5 means 3/5 of the circles are blue.' Count the total circles. Is that right?"

**Expected interaction**:
1. Student counts: 3 + 5 = 8 total circles.
2. Student realizes that 3 out of 8 total circles are blue = 3/8, not 3/5.

**Visual feedback**: After 10 seconds (or when the student taps "Show me"), two annotations appear:
1. Below the grouping workspace, a fraction bar appears showing 3/8 shaded in blue and 5/8 shaded in orange (total bar = 8 parts). Label: `\frac{3}{8}` of all circles are blue.
2. Next to the ratio display "3:5", a callout: "The ratio compares BLUE to ORANGE (two groups). The fraction compares BLUE to ALL (one group to the whole)."
3. A red X appears over a ghosted "3/5 of circles are blue" text. A green check appears over "3 blue compared to 5 orange."

**This is the core misconception confrontation.** The visual makes it physically clear: the ratio 3:5 compares part-to-part, while the fraction 3/8 compares part-to-whole. They are different ideas.

**Acknowledgment button**: "Got it!" -- appears after the visual feedback is shown. On tap: Prompt 4 slides in.

#### Prompt 4: Discover Equivalent Ratios (Multiplicative, Not Additive)

**Setup**: Models reset to blue=2, orange=5. Marker at group 1. Ratio table is auto-opened.

**Prompt text**: "A friend says: 'To get an equivalent ratio to 2:5, add 1 to each number: 3:6.' Look at the double number line. Is 3:6 at one of the tick marks? What about 4:10?"

**Expected interaction**:
1. Student looks at the double number line. The ticks show: (2,5), (4,10), (6,15), (8,20)...
2. Student notices that (3,6) does NOT align with any tick position. 3 is between the 2 and 4 ticks on the blue line, but 6 is between 5 and 10 on the orange line -- they are NOT at the same vertical position.
3. Student notices that (4,10) IS at the group-2 position -- both ticks align.

**Visual feedback**: After 15 seconds (or when student taps "Show me"):
1. A ghost marker appears at x-position corresponding to blue=3. On the blue line, it falls on tick 3. On the orange line, the corresponding position would be 7.5, NOT 6. A red X appears at the ghost marker. Annotation: "3:6 is NOT equivalent to 2:5. Adding 1 to each breaks the pattern!"
2. The real marker at group 2 highlights with amber glow. Annotation: "4:10 IS equivalent to 2:5. We MULTIPLIED both by 2." An animated "x2" label appears next to both the 2->4 and 5->10 jumps, colored `#34d399` (emerald).

**Acknowledgment button**: "Got it!" -- appears after visual feedback. On tap: Prompt 5 slides in.

#### Prompt 5: Discover the Pattern in the Ratio Table

**Setup**: Models stay at blue=2, orange=5. Ratio table is open and highlighted.

**Prompt text**: "Look at the ratio table. What do you multiply each number by to get from one column to the next?"

**Expected interaction**:
1. Student examines the ratio table: (2,5), (4,10), (6,15), (8,20), (10,25)...
2. Student notices: each column is the previous column multiplied by 1 more of the original ratio. Or: column k = (2k, 5k).
3. Student taps columns in the ratio table, seeing the ratio marker jump on the double number line.

**Visual feedback**: After 15 seconds (or when student taps "Show me"):
1. Animated arrows draw between adjacent columns in the ratio table:
   - From column 1 to column 2: an amber arrow with label "x2" between the rows.
   - From column 0 to column 1: an amber arrow with label "x1".
   - From column 1 to column 3: an amber arrow bypassing column 2, label "x3".
2. Annotation: "To get equivalent ratios, multiply BOTH numbers by the SAME amount. Just like equivalent fractions!" The words "both" and "same" are bold and colored `#34d399`.
3. A brief connection flash: the fraction bar overlay from NO-1.4 appears ghosted, showing equivalent fractions use the same principle. Then fades after 2 seconds.

**Acknowledgment button**: "Got it!" -- final prompt. On tap: transitions to Symbol Bridge.

---

## 6. Stage 4 -- Symbol Bridge (2-3 min)

### 6.1 Overview

The Symbol Bridge maps three equivalent notations for ratios onto the spatial model, then explicitly distinguishes ratio notation from fraction notation.

### 6.2 Notation Sequence

The double number line from Stage 2 is displayed at the top, frozen at blue=3, orange=5, marker at group 1. Below it, notation appears one piece at a time.

| Step | Delay | Notation | Visual Connection | Color |
|---|---|---|---|---|
| 1 | 0.0s | `3 : 5` | Arrow from blue token group "3" and orange token group "5" down to the colon notation. The colon pulses amber. | Blue count in `#60a5fa`, colon in `#fbbf24`, orange count in `#fb923c`. |
| 2 | 2.0s | `3 \text{ to } 5` | Same arrows. The word "to" replaces the colon with a crossfade (200ms). | Same colors, "to" in `#e2e8f0`. |
| 3 | 2.0s | `\frac{3}{5}` | Arrow from blue count to numerator position, arrow from orange count to denominator position. A subtle highlight box draws around the fraction. | `#60a5fa` numerator, `#fb923c` denominator. |
| 4 | 2.0s | Distinction callout | A split-screen annotation appears below the three notations. Left side: "Ratio 3:5" with icon of two separate groups (blue circles | orange circles, separated by a vertical bar). Right side: "Fraction 3/8" with icon of a single bar, 3/8 shaded blue, 5/8 shaded orange. Between them: a "does not equal" sign (`\neq`). | Left side blue/orange accents. Right side has the 3/8 fraction bar from Prompt 3. |
| 5 | 3.0s | Equivalent ratio row | Below the distinction, three equivalent ratios appear in a row: `3:5 = 6:10 = 9:15`. Each ratio has a subtle "x2" and "x3" annotation arrow above it, showing the multiplication. The double number line above highlights the corresponding group positions (1, 2, 3) with amber markers. | Ratios in `#e2e8f0`, multiplier labels in `#34d399`. |

**Animation details for each step**:
- Each notation element fades in from `opacity: 0, y: +10px` to `opacity: 1, y: 0` (spring: `damping: 25, stiffness: 200`).
- Connecting arrows draw from start to end over 400ms (`ease: "easeInOut"`), styled as thin lines with arrowheads. Arrow color: `#94a3b8` (slate-400), 1px stroke.
- The colon pulse (step 1): the `:` character scales from 1.0 to 1.3 and back over 400ms (spring: `damping: 15, stiffness: 400`), with amber glow (`box-shadow: 0 0 8px #fbbf24`).

### 6.3 Final Summary

After all 5 steps are revealed, a summary card fades in at the bottom:

```
┌─────────────────────────────────────────────────────┐
│  Three ways to write the same ratio:                │
│                                                      │
│     3 : 5       "3 to 5"       3/5                  │
│                                                      │
│  Equivalent ratios:                                  │
│     3:5 = 6:10 = 9:15 = 12:20 = ...                │
│     (multiply BOTH parts by the same number)        │
│                                                      │
│  ⚠ Ratio ≠ Fraction of the whole                   │
│     3:5 means "3 compared to 5"                     │
│     NOT "3 out of 5 total"                          │
└─────────────────────────────────────────────────────┘
```

Card background: `#1e293b` (slate-800), border: 1px `#334155`, border-radius: 12px, padding: 20px. The warning line uses `#fbbf24` (amber) for the caution icon and bold text.

**Continue trigger**: All notation revealed (after step 5, ~11 seconds total). Continue button fades in.

---

## 7. Stage 5 -- Real-World Anchor (1-2 min)

### 7.1 Overview

Four scenario cards show ratios in contexts relevant to 11-14 year olds. Each card has an icon, scenario description, and highlighted ratio. Cards are navigated by swiping (mobile) or arrow buttons (desktop).

### 7.2 Scenarios

| # | Scenario | Icon (SVG) | Example | Highlighted Ratio | Connection |
|---|---|---|---|---|---|
| 1 | Recipes | Mixing bowl | "A smoothie recipe uses 2 cups of fruit for every 1 cup of yogurt. Want to make it for 4 friends? Use 8 cups of fruit and 4 cups of yogurt." | `2 : 1 = 8 : 4` | Equivalent ratios = scaling recipes up/down |
| 2 | Gaming | Game controller | "In Minecraft, you need 3 iron and 2 sticks to make a pickaxe. For 5 pickaxes, you need 15 iron and 10 sticks." | `3 : 2 = 15 : 10` | Ratios in crafting recipes (always the same proportion) |
| 3 | Sports | Basketball | "A basketball player makes 7 shots for every 10 attempts. In 50 attempts, they'd make about 35 shots." | `7 : 10 = 35 : 50` | Ratios to predict and compare performance |
| 4 | Social Media | Phone screen | "Your video gets 4 comments for every 100 views. That's a 4:100 ratio (or simplified, 1:25). A friend's video gets 3:50. Who has more engagement per view?" | `4 : 100 = 1 : 25` vs `3 : 50` | Ratios for fair comparison (connects back to hook) |

### 7.3 Card Layout

```
┌──────────────────────────────────────┐
│  ┌──────┐                            │
│  │ Icon │  Scenario Title            │
│  └──────┘                            │
│                                       │
│  "A smoothie recipe uses 2 cups of   │
│   fruit for every 1 cup of yogurt.   │
│   Want to make it for 4 friends?     │
│   Use 8 cups of fruit and 4 cups     │
│   of yogurt."                        │
│                                       │
│  ┌────────────────────────────────┐  │
│  │  2 : 1  =  8 : 4              │  │
│  └────────────────────────────────┘  │
│                                       │
│  [← Prev]    1 / 4    [Next →]       │
└──────────────────────────────────────┘
```

- Card background: `#1e293b` (slate-800), border-radius: 12px, border: 1px `#334155`.
- Icon: 40x40px SVG, colored with the primary accent `#818cf8`.
- Title: 16px bold, `#e2e8f0`.
- Body text: 14px, `#94a3b8` (slate-400), line-height 1.6.
- Ratio highlight box: `#0f172a` background, 1px `#fbbf24` border. Ratio text: 18px, colored with `#60a5fa` for first term, `#fb923c` for second term, `#fbbf24` for colon and equals sign.
- Navigation: prev/next buttons, 44x44px touch targets. Dot indicators below (4 dots, filled = current).

### 7.4 Card Transition Animation

- Swipe or button press: current card slides out (left/right), new card slides in from the opposite side. Duration: 300ms, `ease: "easeInOut"`.
- Cards use `@use-gesture/react` `useDrag` for swipe detection:
  - Velocity threshold: `vx > 0.5` triggers advance.
  - Rubber-band effect at first/last card: `rubberband: 0.2`.

### 7.5 Continue Trigger

Immediate -- Continue button is always visible during this stage. No minimum viewing time.

---

## 8. Stage 6 -- Practice (Adaptive)

### 8.1 Problem Bank

9 problems total, organized across three layers. Problems are served in interleaved order (PF-5) -- NOT blocked by sub-type. The IRT engine selects the next problem based on the student's current ability estimate and the problem's difficulty parameter.

### 8.2 Layer 0 -- Recall (3 problems)

#### Problem R1: Identify Ratio from Groups

**Type**: `ratio-identify-groups`
**Difficulty B**: 0.3 (easy)
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "A bag has 4 red marbles and 7 blue marbles. What is the ratio of red to blue marbles?",
  "visualization": {
    "type": "tokenGroups",
    "groupA": { "count": 4, "color": "#f87171", "label": "Red" },
    "groupB": { "count": 7, "color": "#60a5fa", "label": "Blue" }
  },
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "4 : 7", "correct": true },
    { "id": "b", "text": "7 : 4", "correct": false },
    { "id": "c", "text": "4 : 11", "correct": false },
    { "id": "d", "text": "7 : 11", "correct": false }
  ],
  "feedback": {
    "correct": "That's right! The ratio of red to blue is 4:7. The first number matches the first thing named (red), and the second matches the second (blue).",
    "incorrect_b": "Close, but order matters! The question asked for red TO blue, so red comes first. The answer is 4:7, not 7:4.",
    "incorrect_c": "4:11 would be the ratio of red to TOTAL marbles (4+7=11). The question asked for red to BLUE, which is 4:7.",
    "incorrect_d": "7:11 would be the ratio of blue to TOTAL. The question asked for red to blue, which is 4:7."
  }
}
```

**Visual rendering**: Two groups of colored circles are displayed above the stem. 4 red circles on the left, 7 blue circles on the right, separated by a vertical divider line. Each group is labeled.

**Option layout**: 4 option buttons arranged in a 2x2 grid. Each button: `#1e293b` background, 1px `#334155` border, border-radius 8px, height 48px, min-width 140px. On tap: brief scale (0.95, 100ms spring). Selected: border changes to `#818cf8`, background `#818cf810`.

#### Problem R2: Write Ratio from Words

**Type**: `ratio-from-description`
**Difficulty B**: 0.35
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "In a class, there are 5 students who walk to school for every 3 students who take the bus. What is the ratio of walkers to bus riders?",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "5 : 3", "correct": true },
    { "id": "b", "text": "3 : 5", "correct": false },
    { "id": "c", "text": "5 : 8", "correct": false },
    { "id": "d", "text": "3 : 8", "correct": false }
  ],
  "feedback": {
    "correct": "Exactly! 5 walkers for every 3 bus riders = 5:3. The first thing named (walkers) goes first.",
    "incorrect_b": "Careful with order! The question says 'walkers to bus riders,' so walkers come first: 5:3.",
    "incorrect_c": "5:8 would be the ratio of walkers to ALL students (5+3=8). The question asks for walkers to bus riders: 5:3.",
    "incorrect_d": "3:8 would be bus riders to ALL students. The question asks for walkers to bus riders: 5:3."
  }
}
```

#### Problem R3: Read a Ratio from a Double Number Line

**Type**: `ratio-read-double-line`
**Difficulty B**: 0.4
**Discrimination A**: 1.0

**Content**:
```json
{
  "stem": "This double number line shows cups of flour and cups of sugar in a recipe. What is the ratio of flour to sugar?",
  "visualization": {
    "type": "doubleNumberLine",
    "lineA": { "label": "Flour", "color": "#a78bfa", "values": [0, 2, 4, 6, 8] },
    "lineB": { "label": "Sugar", "color": "#f472b6", "values": [0, 3, 6, 9, 12] },
    "markerPosition": 1,
    "width": 300
  },
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "2 : 3", "correct": true },
    { "id": "b", "text": "3 : 2", "correct": false },
    { "id": "c", "text": "4 : 6", "correct": false },
    { "id": "d", "text": "2 : 5", "correct": false }
  ],
  "feedback": {
    "correct": "Right! The first pair on the double number line is (2, 3), so the ratio of flour to sugar is 2:3.",
    "incorrect_b": "Watch the order! Flour is on top, sugar is on the bottom. The ratio of flour to sugar is 2:3, not 3:2.",
    "incorrect_c": "4:6 is an equivalent ratio (that's the second mark), but 2:3 is the simplest form. Both are correct, but 2:3 best matches the question.",
    "incorrect_d": "Check the number lines again. The first mark shows flour=2 and sugar=3, so the ratio is 2:3."
  }
}
```

**Visual rendering**: A double number line is rendered with the purple (flour) line on top and pink (sugar) line on bottom. Tick marks and labels are displayed. An amber marker highlights the first group position.

### 8.3 Layer 1 -- Procedure (3 problems)

#### Problem P1: Find Equivalent Ratio by Multiplying

**Type**: `equivalent-ratio-multiply`
**Difficulty B**: 0.6
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "The ratio of cats to dogs at a shelter is 3:7. If there are 12 cats, how many dogs are there?",
  "visualization": {
    "type": "doubleNumberLine",
    "lineA": { "label": "Cats", "color": "#818cf8", "values": [0, 3, 6, 9, 12, "?"] },
    "lineB": { "label": "Dogs", "color": "#fb923c", "values": [0, 7, 14, 21, "?", "?"] },
    "markerPosition": null,
    "highlightValue": { "line": "A", "value": 12 },
    "width": 300
  },
  "inputType": "numeric-input",
  "correctAnswer": 28,
  "hints": [
    "What do you multiply 3 by to get 12?",
    "3 x 4 = 12. So there are 4 groups.",
    "Multiply the dogs by the same number: 7 x 4 = 28."
  ],
  "feedback": {
    "correct": "28 dogs! You found that 12 is 3 x 4, so you need 7 x 4 = 28 dogs to keep the same ratio.",
    "incorrect": "To go from 3 cats to 12 cats, we multiply by 4 (since 3 x 4 = 12). To keep the ratio 3:7, we must also multiply the dogs by 4: 7 x 4 = 28."
  }
}
```

**Numeric input widget**: A single number input field, 80px wide, centered below the visualization. Accepts positive integers only. Mobile: opens numeric keyboard. Height: 48px. Border: 1px `#475569`. Focus border: `#818cf8`. Submit button to the right: "Check", 48px height, background `#818cf8`.

**Visual confirmation on correct answer**: The double number line animates to show the group-4 marker at position (12, 28). Both values highlight with amber glow. An animated "x4" label appears connecting the base ratio (3,7) to (12,28).

#### Problem P2: Complete a Ratio Table

**Type**: `ratio-table-complete`
**Difficulty B**: 0.65
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Complete the ratio table for the ratio 5 : 2.",
  "visualization": {
    "type": "ratioTable",
    "headerA": "Apples",
    "headerB": "Oranges",
    "rows": [
      { "a": 5, "b": 2 },
      { "a": 10, "b": "?" },
      { "a": "?", "b": 6 },
      { "a": 25, "b": "?" }
    ]
  },
  "inputType": "multi-numeric-input",
  "correctAnswers": [
    { "row": 1, "column": "b", "value": 4 },
    { "row": 2, "column": "a", "value": 15 },
    { "row": 3, "column": "b", "value": 10 }
  ],
  "hints": [
    "Look at the first row: 5 apples for 2 oranges. What multiplier takes you from row 1 to row 2?",
    "Row 2: 10 = 5 x 2, so oranges = 2 x 2 = 4. Row 3: 6 = 2 x 3, so apples = 5 x 3 = 15.",
    "Row 4: 25 = 5 x 5, so oranges = 2 x 5 = 10."
  ],
  "feedback": {
    "correct": "Perfect! You found all the missing values by multiplying both parts of the ratio by the same number.",
    "incorrect": "For each row, find the multiplier. Row 2: 10/5 = x2, so 2 x 2 = 4. Row 3: 6/2 = x3, so 5 x 3 = 15. Row 4: 25/5 = x5, so 2 x 5 = 10."
  }
}
```

**Ratio table widget**: A styled HTML table with the first row filled in and subsequent rows containing input fields for missing values. Each input field is 60px wide, 44px tall, numeric keyboard on mobile. Correct cells show a green checkmark animation on submit. Incorrect cells show a brief red shake (3 oscillations, 200ms total, amplitude 4px).

**Validation**: All three fields must be filled before the "Check" button enables. Validation is all-or-nothing -- if any value is wrong, all values are shown with their correct/incorrect status.

#### Problem P3: Determine if Two Ratios Are Equivalent

**Type**: `ratio-equivalence-check`
**Difficulty B**: 0.7
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "Are these two ratios equivalent? 6 : 9 and 10 : 15",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "Yes, they are equivalent", "correct": true },
    { "id": "b", "text": "No, they are NOT equivalent", "correct": false }
  ],
  "feedback": {
    "correct": "Yes! Both simplify to 2:3. You can check: 6/3=2 and 9/3=3, so 6:9 = 2:3. And 10/5=2 and 15/5=3, so 10:15 = 2:3. Same ratio!",
    "incorrect": "Actually, they ARE equivalent! Both simplify to 2:3. Divide both parts of 6:9 by 3 to get 2:3. Divide both parts of 10:15 by 5 to get 2:3. Same ratio!"
  },
  "visualConfirmation": {
    "type": "doubleNumberLine",
    "lineA": { "label": "First", "values": [0, 2, 4, 6, 8, 10, 12] },
    "lineB": { "label": "Second", "values": [0, 3, 6, 9, 12, 15, 18] },
    "markers": [
      { "position": 3, "label": "6:9" },
      { "position": 5, "label": "10:15" }
    ]
  }
}
```

**Visual confirmation**: After answering (correct or incorrect), the double number line renders and shows both ratios as markers on the same line. Since they simplify to the same base ratio (2:3), both markers fall on tick positions, confirming equivalence. Both markers connected by a dashed amber line with annotation: "Same ratio! Both = 2:3."

### 8.4 Layer 2 -- Understanding (3 problems)

#### Problem U1: Ratio vs Fraction Discrimination

**Type**: `ratio-vs-fraction`
**Difficulty B**: 0.8
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "A bag has 3 green marbles and 7 yellow marbles. Select ALL statements that are TRUE.",
  "visualization": {
    "type": "tokenGroups",
    "groupA": { "count": 3, "color": "#34d399", "label": "Green" },
    "groupB": { "count": 7, "color": "#fbbf24", "label": "Yellow" }
  },
  "inputType": "multi-select",
  "options": [
    { "id": "a", "text": "The ratio of green to yellow is 3:7", "correct": true },
    { "id": "b", "text": "The ratio of yellow to green is 3:7", "correct": false },
    { "id": "c", "text": "3/10 of the marbles are green", "correct": true },
    { "id": "d", "text": "3/7 of the marbles are green", "correct": false }
  ],
  "feedback": {
    "all_correct": "Excellent! You correctly identified that the ratio of green to yellow is 3:7 (comparing two groups) AND that 3/10 of ALL marbles are green (fraction of the whole: 3 out of 3+7=10). You also avoided the traps: 7:3 would be yellow-to-green (wrong order), and 3/7 is the ratio, not the fraction of the whole.",
    "missed_a": "The ratio of green to yellow is 3:7 -- green is named first, so 3 comes first.",
    "selected_b": "Careful with order! 3:7 is green to yellow. The ratio of yellow to green would be 7:3.",
    "missed_c": "3/10 IS correct. There are 10 marbles total (3+7), and 3 are green, so the FRACTION of green marbles is 3/10.",
    "selected_d": "3/7 is the RATIO of green to yellow, not the fraction of green out of all marbles. The fraction would be 3/10 (since there are 10 total)."
  }
}
```

**Multi-select widget**: Each option is a button with a checkbox indicator on the left. Unselected: empty square outline `#475569`. Selected: filled square `#818cf8` with white checkmark. Each option: full-width, 52px height, `#1e293b` background, 1px `#334155` border. Selected border: `#818cf8`. The student can select multiple options. "Check Answers" button appears below options.

**Feedback**: Each option shows correct/incorrect individually. Correct selected: green left border, green checkmark. Correct not selected: amber left border, "You missed this one." Incorrect selected: red left border, red X. Incorrect not selected: no indicator.

#### Problem U2: Create an Equivalent Ratio Pair

**Type**: `equivalent-ratio-drag`
**Difficulty B**: 0.85
**Discrimination A**: 1.3

**Content**:
```json
{
  "stem": "Drag numbers into the boxes to create a ratio equivalent to 4:6.",
  "visualization": {
    "type": "ratioEquation",
    "givenRatio": { "a": 4, "b": 6 },
    "targetRatio": { "a": "?", "b": "?" },
    "equalsSign": true
  },
  "inputType": "drag-to-fill",
  "availableNumbers": [2, 3, 6, 8, 9, 10, 12, 14],
  "correctPairs": [
    { "a": 2, "b": 3 },
    { "a": 8, "b": 12 },
    { "a": 12, "b": 18 }
  ],
  "feedback": {
    "correct": "That's equivalent to 4:6! Both ratios simplify to 2:3. Great work!",
    "incorrect": "Not quite. For a ratio to be equivalent to 4:6, both numbers must be multiplied or divided by the same amount. 4:6 simplifies to 2:3. Try finding numbers that simplify to 2:3."
  }
}
```

**Note**: Only 2:3 and 8:12 are constructible from the available numbers. 12:18 requires 18 which is not in the available pool -- this is intentional to narrow the correct answers. If the student places 12 in position A, they would need 18 in position B which is unavailable, guiding them toward 2:3 or 8:12.

**Corrected available numbers and valid pairs**:
```json
{
  "availableNumbers": [2, 3, 6, 8, 9, 10, 12, 18],
  "correctPairs": [
    { "a": 2, "b": 3 },
    { "a": 8, "b": 12 },
    { "a": 12, "b": 18 }
  ]
}
```

**Drag-to-fill widget**: Two empty boxes arranged as `? : ?` with an `=` sign connecting to the given `4 : 6`. Below them, a row of draggable number tiles. Each tile: 48x48px, `#1e293b` background, 1px `#818cf8` border, border-radius 8px, centered number text 20px. On drag start: tile lifts (scale 1.05, shadow increases). On hover over target box: box border changes to `#fbbf24` (amber) with dashed pattern. On drop: tile snaps into box with spring (`damping: 20, stiffness: 300`). On invalid drop (not over a box): tile springs back to its original position.

**Validation**: Both boxes must be filled. Then "Check" button enables. If the pair is in `correctPairs`, correct feedback. Otherwise, incorrect feedback. After incorrect, the student can drag tiles out of boxes and try again.

#### Problem U3: Explain Why Order Matters

**Type**: `order-matters-select`
**Difficulty B**: 0.75
**Discrimination A**: 1.2

**Content**:
```json
{
  "stem": "A recipe calls for a 2:5 ratio of sugar to flour. Your friend accidentally uses a 5:2 ratio of sugar to flour. What happens?",
  "inputType": "multiple-choice",
  "options": [
    { "id": "a", "text": "The recipe turns out the same", "correct": false },
    { "id": "b", "text": "The recipe is way too sweet", "correct": true },
    { "id": "c", "text": "The recipe is way too floury", "correct": false },
    { "id": "d", "text": "You can't tell without knowing the amounts", "correct": false }
  ],
  "feedback": {
    "correct": "Exactly! 5:2 sugar-to-flour means there's MORE sugar than flour -- the opposite of the original recipe. That would make it extremely sweet! Order matters in ratios.",
    "incorrect_a": "Actually, 2:5 and 5:2 are very different! With 2:5, flour is the bigger amount. With 5:2, sugar becomes the bigger amount. The result would be completely different.",
    "incorrect_c": "Think again: 5:2 sugar-to-flour means 5 parts SUGAR for every 2 parts flour. That's a LOT of sugar relative to flour -- it would be too sweet, not too floury.",
    "incorrect_d": "Even without knowing exact amounts, we can tell the difference. 2:5 means less sugar than flour. 5:2 means more sugar than flour. The proportions flip!"
  },
  "visualConfirmation": {
    "type": "comparisonBars",
    "ratio1": { "label": "Original 2:5", "values": [2, 5], "colors": ["#f472b6", "#a78bfa"] },
    "ratio2": { "label": "Friend's 5:2", "values": [5, 2], "colors": ["#f472b6", "#a78bfa"] }
  }
}
```

**Visual confirmation**: After answering, two horizontal stacked bars appear. Top bar: "Original 2:5" with pink section (sugar, 2 units) and purple section (flour, 5 units). Bottom bar: "Friend's 5:2" with pink section (5 units) and purple section (2 units). The visual makes it obvious that the proportions are reversed.

### 8.5 Problem Presentation

#### ProblemCard Layout

Each problem is displayed in a `ProblemCard` component:
- Background: `#1e293b` (slate-800) with 1px `#334155` border. Border-radius: 12px.
- Padding: 20px (desktop), 16px (mobile).
- Stem text: 16px, `#e2e8f0`, line-height 1.6.
- Visualization: centered below stem, 16px top margin.
- Input area: below visualization, 16px top margin.
- Submit button: full-width on mobile, 200px on desktop. Background `#818cf8`. Text white. Border-radius 8px. Height 48px. Disabled (opacity 0.5) until input is non-empty.
- Feedback area: appears below submit button after submission. 12px top margin. Background `#0f172a20` with left border 3px solid (green `#34d399` for correct, red `#f87171` for incorrect). Padding 12px.

#### Transition Between Problems

- Current problem card slides left + fades out (300ms, `ease: "easeInOut"`).
- Next problem card slides in from right + fades in (300ms, `ease: "easeInOut"`).
- Progress dots above the problem area: 9 dots, filled = completed, outlined = current, dimmed = upcoming. Colors: correct = `#34d399` (emerald-400), incorrect = `#f87171` (red-400), current = `#818cf8`, upcoming = `#475569`.
- "Next" button appears after feedback is shown. Student must tap "Next" to proceed (no auto-advance). Button: text "Next ->", right-aligned, 48px height, background `#818cf8`, border-radius 8px.

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
- Problems from different sub-types are interleaved: never two ratio-identification problems in a row.
- The 9 problems are drawn from a larger pool; the exact 9 shown depend on the student's performance.

---

## 9. Stage 7 -- Reflection (~1 min)

### 9.1 Reflection Prompt

**Prompt text**: "Explain in your own words: what is the difference between a ratio and a fraction? Why does order matter in a ratio?"

**Input**: Free-text, minimum 30 characters. The text area is:
- Full width, 120px height (expandable).
- Placeholder text: "Think about the blue and orange circles... a ratio compares ___ while a fraction tells you ___. Order matters because..."
- Character counter in bottom-right: `{count}/30 minimum`.
- Background: `#0f172a`. Border: 1px `#475569`. Focus border: `#818cf8`.

**Skip button**: Available but de-emphasized. Positioned below the text area, right-aligned. Text: "Skip", 14px, `#64748b` color. Touch target: 44x44px. On skip: no XP bonus for reflection, lesson still completes.

### 9.2 AI Evaluation

The response is submitted to `lesson.submitReflection`:

**Evaluation criteria**:
1. Distinguishes ratio (comparison of two groups) from fraction (part of a whole).
2. Explains that order matters (3:5 is different from 5:3) with a reason or example.
3. (Bonus) References the spatial model (double number line, groups of objects).
4. (Bonus) Mentions equivalent ratios and how they are created.
5. (Bonus) Connects to a real-world example.

**Scoring rubric**:
| Score | Description | XP Bonus |
|---|---|---|
| 5 | Complete explanation covering both core criteria + bonus items. Could teach someone. | 80 |
| 4 | Strong explanation covering both core criteria with reasoning. | 64 |
| 3 | Adequate: covers 1 of 2 core criteria clearly, or both vaguely. | 48 |
| 2 | Partial: mentions ratio vs fraction but without clear distinction. | 32 |
| 1 | Minimal: restates the question or is mostly off-topic. | 16 |
| 0 | No meaningful content. | 0 |

### 9.3 Feedback & XP Award

After AI evaluation:

1. **Quality score visual**: A 5-star display where stars fill based on the score. Stars are amber (`#f59e0b`), empty stars are `#475569`.
2. **Personalized feedback**: AI-generated text based on the specific response. Example for score 4: "Great explanation! You clearly understand that a ratio compares two separate groups while a fraction is part of a whole. To make it even stronger, you could give an example showing how 3:5 and 5:3 lead to different outcomes."
3. **XP award animation**: The XP amount flies upward from the reflection area to the XP counter in the lesson nav. Number color: `#f59e0b`. Duration: 800ms, ease: spring.
4. **Multiplier check**: If `referencesPriorConcept` is true (student mentions fractions, NO-1.4, or equivalent fractions), the Connection Maker multiplier (1.3x) applies. The multiplier is shown as a badge next to the XP: "1.3x Connection Maker!"
5. **Struggle bonus**: If the student selected incorrect answers on the ratio-vs-fraction problem (U1) but now correctly explains the difference in the reflection, the Struggle Bonus (1.4x) triggers.

### 9.4 Aha Moment Detection

If the student's explanation quality score jumps significantly compared to their historical average (delta >= 2 points), OR if the student spent >3 minutes in spatial exploration AND now writes a strong reflection (score >= 4), the Aha Moment celebration fires:

1. Neural network flash animation: brief particle burst from the text area (8 indigo particles, expand outward 60px, fade over 600ms).
2. Discovery chime sound (major chord resolve, 500ms).
3. Toast notification: "That's the connection!" -- 3s display, bottom-center.
4. Reflection prompt: "What clicked?" -- optional one-line input below the main reflection. If filled, stored in analytics.
5. Struggle Badge (if applicable): "This took effort. Understanding is STRONGER because it was hard."

---

## 10. Technical Specifications

### 10.1 SVG Component Architecture

#### Token Group Component

```
TokenGroup.tsx
├── Props: { count, maxCount, color, strokeColor, label, onAdd, onRemove }
├── Internal state: none (fully controlled)
├── SVG structure:
│   ├── <text> — row label
│   ├── <g> — tokens group
│   │   └── <circle> x count — individual tokens (animated entry/exit)
│   ├── <g> — controls
│   │   ├── <circle> — "+" button (with <text> "+")
│   │   └── <circle> — "-" button (with <text> "-")
│   └── aria-live region for count changes
├── Animations:
│   ├── Token add: Framer Motion `motion.circle`, initial scale 0 → animate scale 1 (SPRING_POP)
│   ├── Token remove: exit scale 1 → 0 (200ms ease)
│   └── Button tap: whileTap scale 0.9 (SPRING_POP)
└── Accessibility: role="group", each token aria-hidden, count announced via aria-live
```

#### Double Number Line Component

```
DoubleNumberLine.tsx
├── Props: { valueA, valueB, maxGroups, markerPosition, onMarkerChange, lineColorA, lineColorB, labelA, labelB }
├── Internal state: none (fully controlled)
├── SVG structure:
│   ├── <line> x 2 — horizontal number lines
│   ├── <g> — tick marks + labels for line A
│   │   ├── <line> x (maxGroups + 1) — vertical ticks
│   │   └── <text> x (maxGroups + 1) — value labels
│   ├── <g> — tick marks + labels for line B (same structure)
│   ├── <g> — connecting dashed lines between aligned ticks
│   │   └── <line> x (maxGroups + 1) — vertical dashes between the two lines
│   ├── <rect> — draggable ratio marker (amber vertical bar)
│   └── <g> — marker labels (current values at marker position)
├── Animations:
│   ├── Tick redraw: fade-out 150ms → draw-in 200ms staggered 30ms (EASE_SMOOTH)
│   ├── Marker snap: spring to nearest group position (SPRING_PHYSICAL)
│   └── Label crossfade: AnimatePresence 150ms (CROSSFADE)
├── Gesture: useDrag (axis "x", filterTaps, snap to group positions)
└── Accessibility:
    ├── role="application" on container
    ├── aria-label="Double number line showing {labelA} and {labelB}"
    ├── Marker: role="slider", aria-valuemin=0, aria-valuemax=maxGroups, aria-valuenow
    └── Arrow keys adjust marker position
```

#### Ratio Table Component

```
RatioTable.tsx
├── Props: { valueA, valueB, maxGroups, highlightedColumn, onColumnTap }
├── Internal state: none (fully controlled)
├── HTML structure (not SVG — better for table semantics):
│   ├── <table> with role="grid"
│   │   ├── <thead> — header row with group labels
│   │   └── <tbody>
│   │       ├── <tr> — Row A (valueA multiples)
│   │       └── <tr> — Row B (valueB multiples)
│   ├── Each cell: <td> with role="gridcell", tabindex="0"
│   └── Highlighted column: border `#fbbf24` 2px
├── Animations:
│   ├── Column entry: stagger 50ms per column, slide from left (SPRING_GENTLE)
│   └── Highlight change: border color transition 200ms
└── Accessibility: aria-label per cell, "Row A value: 6, Row B value: 10"
```

### 10.2 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `blue-token` | `#60a5fa` | Blue-400. Blue group tokens, blue number line. |
| `orange-token` | `#fb923c` | Orange-400. Orange group tokens, orange number line. |
| `ratio-colon` | `#fbbf24` | Amber-400. Ratio colon, marker, highlights. |
| `primary-accent` | `#818cf8` | Indigo-400. Buttons, focus states, selected options. |
| `secondary-accent` | `#a78bfa` | Violet-400. Flour line in practice, secondary visual. |
| `pink-accent` | `#f472b6` | Pink-400. Likes bars in hook, sugar line, secondary. |
| `surface-dark` | `#0f172a` | Slate-900. Background on dark theme. |
| `surface-card` | `#1e293b` | Slate-800. Card backgrounds. |
| `border` | `#64748b` | Slate-500. Division lines, borders. |
| `border-subtle` | `#334155` | Slate-700. Card borders, subtle dividers. |
| `text-primary` | `#e2e8f0` | Slate-200. Body text on dark. |
| `text-secondary` | `#94a3b8` | Slate-400. Labels, hints, secondary text. |
| `correct` | `#34d399` | Emerald-400. Correct answer feedback. |
| `incorrect` | `#f87171` | Red-400. Incorrect answer feedback. |
| `insight-glow` | `#fbbf24` | Amber-400. Insight moments, discoveries. |

### 10.3 Animation Configuration

All animations in this lesson use Framer Motion with these shared configurations:

```typescript
// Shared spring config for physical interactions (token pop, marker snap)
const SPRING_PHYSICAL = {
  type: "spring" as const,
  damping: 20,
  stiffness: 300,
};

// Shared spring config for pop effects (button taps, token add)
const SPRING_POP = {
  type: "spring" as const,
  damping: 15,
  stiffness: 400,
};

// Shared spring config for gentle transitions (labels, table columns)
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
// Ratio marker drag on double number line
const markerBind = useDrag(
  ({ movement: [mx], memo = markerStartX }) => {
    const newX = clamp(memo + mx, lineLeft, lineRight);
    const groupWidth = lineWidth / maxGroups;
    const snappedGroup = Math.round((newX - lineLeft) / groupWidth);
    const clampedGroup = clamp(snappedGroup, 0, maxGroups);
    setMarkerPosition(clampedGroup);
    return memo;
  },
  {
    axis: "x",
    filterTaps: true,
  }
);

// Real-world cards swipe
const cardBind = useDrag(
  ({
    movement: [mx],
    direction: [dx],
    velocity: [vx],
    cancel,
  }) => {
    if (Math.abs(vx) > 0.5) {
      const newIndex = clamp(
        currentCard + (dx > 0 ? -1 : 1),
        0,
        CARD_COUNT - 1
      );
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
```

### 10.5 Responsive Breakpoints

| Breakpoint | Layout | Line Width | Token Radius | Max Tokens/Row | Max Groups | Table Scroll |
|---|---|---|---|---|---|---|
| >= 1024px | Spacious, generous spacing | 320px | 14px | 12 | 8 | No |
| 768-1023px | Compact spacing | 280px | 13px | 10 | 8 | No |
| 480-767px | Stacked vertically | Full - 40px | 12px | 9 | 7 | Yes |
| < 480px | Stacked, compact | Full - 32px | 11px | 9 | 6 | Yes |

### 10.6 Math Correctness Requirements (DR-2)

The following computations MUST have corresponding Vitest tests:

| Computation | Test |
|---|---|
| Group position alignment: both lines share `x = lineLeft + group * groupWidth` | Exact for all group indices 0-maxGroups |
| Tick value calculation: `baseValue * groupIndex` | Integer arithmetic, exact for all combinations of baseValue 1-12 and groupIndex 0-8 |
| Equivalent ratio detection: `a/b == c/d` iff `a*d == b*c` | Integer arithmetic, no floating point |
| Ratio simplification: GCF-based division of both terms | Tested for all practice problem ratios |
| Marker snap position: `Math.round((x - lineLeft) / groupWidth)` | Floating point; verified snap correctness for all group boundaries |
| Scale factor discovery: `targetA / baseA` must equal `targetB / baseB` | Integer division with remainder check; if remainder != 0, not a valid equivalent ratio |
| Ratio table generation: `[baseA * k, baseB * k]` for `k = 0..maxGroups` | Integer multiplication, exact |

---

## 11. Accessibility

### 11.1 ARIA Structure

```html
<!-- Token Group -->
<svg role="group" aria-label="Blue group: 3 circles">
  <circle aria-hidden="true" /> <!-- individual tokens are decorative -->
  <circle aria-hidden="true" />
  <circle aria-hidden="true" />
  <circle role="button" aria-label="Add one blue circle" tabindex="0" />
  <circle role="button" aria-label="Remove one blue circle" tabindex="0" />
</svg>
<div role="status" aria-live="polite">3 blue circles</div>

<!-- Double Number Line -->
<svg role="application" aria-label="Double number line comparing blue and orange quantities">
  <rect role="slider"
        aria-label="Ratio marker"
        aria-valuemin="0" aria-valuemax="8"
        aria-valuenow="1"
        aria-valuetext="Blue: 3, Orange: 5, Ratio: 3 to 5"
        tabindex="0" />
</svg>

<!-- Ratio Display -->
<div role="status" aria-live="polite" aria-label="Current ratio: 3 to 5">
  <!-- KaTeX renders here -->
</div>

<!-- Ratio Table -->
<table role="grid" aria-label="Ratio table for 3 to 5">
  <thead>
    <tr><th>Group</th><th>1</th><th>2</th><th>3</th></tr>
  </thead>
  <tbody>
    <tr aria-label="Blue values">
      <th>Blue</th><td>3</td><td>6</td><td>9</td>
    </tr>
    <tr aria-label="Orange values">
      <th>Orange</th><td>5</td><td>10</td><td>15</td>
    </tr>
  </tbody>
</table>
```

### 11.2 Keyboard Navigation

| Key | Action |
|---|---|
| Tab | Move focus between: add/remove buttons (blue row), add/remove buttons (orange row), ratio marker, swap order button, show ratio table button, ratio table cells, continue button |
| Enter / Space | Activate focused button. Toggle ratio table visibility. |
| Arrow Left/Right | Move ratio marker to previous/next group position. |
| Arrow Up/Down | In ratio table, move focus between rows. |
| Home / End | Jump marker to first / last group position. |
| Escape | Close ratio table overlay (mobile). |

### 11.3 Screen Reader Announcements

| Event | Announcement (aria-live="polite") |
|---|---|
| Token added | "4 blue circles. Ratio is now 4 to 5." |
| Token removed | "2 blue circles. Ratio is now 2 to 5." |
| Marker moved | "Ratio marker at group 3. Blue: 9, Orange: 15. Ratio: 9 to 15." |
| Order swapped | "Ratio order swapped. Now showing orange to blue: 5 to 3." |
| Ratio table opened | "Ratio table visible. 8 columns showing equivalent ratios." |
| Table column tapped | "Selected group 4. Blue: 12, Orange: 20." |

### 11.4 Color Blind Safety

- Blue vs orange token distinction: Not relying on color alone. Blue tokens have a solid fill. Orange tokens have a subtle diagonal hatch pattern (SVG `<pattern>`) as an additional visual cue for deuteranopia/protanopia.
- Correct vs incorrect feedback: Green checkmark has distinct shape (checkmark) vs red X (cross). Shape is the primary differentiator, not color.
- Double number line: Blue line uses solid stroke. Orange line uses dashed stroke (dash array `8 4`). Line type is the primary differentiator.

### 11.5 Reduced Motion

If `prefers-reduced-motion: reduce` is active:
- All spring/transition animations resolve immediately (duration: 0).
- The hook plays as a slideshow (each frame appears instantly, held for the specified duration).
- Token add/remove shows final state without pop animation.
- Ratio marker snaps without spring physics.
- Connecting dashed lines appear instantly without drawing animation.
- Card transitions are instant crossfades (no slide).

---

## 12. Performance Budget

| Metric | Target | Measurement |
|---|---|---|
| Total SVG elements (max, at 12 tokens per row + double number line with 8 groups) | < 100 | All tokens + lines + ticks + labels + marker |
| Frame rate during token add/remove animation | >= 55fps P95 | Framer Motion spring on mid-range mobile (Samsung Galaxy A54) |
| Frame rate during marker drag | >= 55fps P95 | Continuous transform update during drag |
| Time to interactive (Stage 2 load) | < 500ms | From stage transition to first interaction possible |
| KaTeX render time per ratio label update | < 16ms | Must not drop a frame. Pre-render common ratios. |
| Memory footprint (Stage 2) | < 8MB | SVG DOM + state + gesture handlers |
| JS bundle for this lesson's unique code | < 15KB gzipped | Excluding shared MathScene components |

### 12.1 Optimization Strategies

1. **Pre-rendered KaTeX**: Common ratio strings ("3 : 5", "1 : 2" through "12 : 12") are pre-rendered to SVG at build time and cached. Only unusual ratios trigger runtime KaTeX rendering.
2. **SVG element pooling**: When token count changes from 3 to 5, the 3 existing `<circle>` elements are reused and 2 new ones are added -- not 5 created from scratch.
3. **GPU-accelerated animations**: Framer Motion's `transform` and `opacity` are GPU-composited. Token scale transitions use `transform: scale()` (composited).
4. **Lazy ratio table**: The ratio table HTML is not rendered until "Show Ratio Table" is pressed. Unmounted when hidden.
5. **Debounced token changes**: 150ms debounce prevents triggering multiple double-number-line redraws during rapid tapping.
6. **Marker drag throttle**: Marker position updates are throttled to `requestAnimationFrame` cadence. The snap computation runs on every frame, but the state update only fires when the snapped group changes.

---

## 13. Content Files

### 13.1 File Structure

```
src/content/domains/numbers-operations/NO-1.5/
├── lesson.mdx             # NLS stage content (prose, prompts, hints)
├── animations.json         # MathScene scene definitions for all 7 stages
├── problems.json           # Practice problem bank (9 core + extras for adaptivity)
└── meta.json               # Topic metadata
```

### 13.2 meta.json

```json
{
  "id": "NO-1.5",
  "name": "Ratios",
  "domain": "numbers-operations",
  "gradeLevel": 6,
  "prerequisites": ["NO-1.4a"],
  "successors": ["NO-1.5a", "NO-1.7", "AL-3.7", "GE-4.10", "GE-4.12"],
  "estimatedDuration": {
    "hook": 40,
    "spatialExperience": 210,
    "guidedDiscovery": 270,
    "symbolBridge": 150,
    "realWorldAnchor": 90,
    "practice": 420,
    "reflection": 60,
    "total": 1240
  },
  "hook": {
    "title": "Who's More Viral?",
    "description": "Compare TikTok creators by raw numbers vs ratio -- ratio reveals what raw numbers hide."
  },
  "tags": ["ratios", "equivalent-ratios", "double-number-line", "ratio-table", "ratio-vs-fraction", "proportional-reasoning"],
  "misconceptions": [
    {
      "id": "ratio-is-fraction",
      "description": "A ratio 3:5 means 3/5 of the total, not a comparison of two groups",
      "prevalence": "high",
      "confrontedInStage": "guided-discovery"
    },
    {
      "id": "order-doesnt-matter",
      "description": "3:5 and 5:3 are the same ratio",
      "prevalence": "high",
      "confrontedInStage": "spatial-experience"
    },
    {
      "id": "additive-equivalence",
      "description": "Equivalent ratios are created by adding the same number to both terms",
      "prevalence": "moderate",
      "confrontedInStage": "guided-discovery"
    }
  ],
  "crossDomainConnections": [
    {
      "targetId": "AL-3.7",
      "relationship": "Slope is a ratio (rise/run); proportional relationships are ratios plotted on a coordinate plane",
      "directionality": "forward"
    },
    {
      "targetId": "GE-4.10",
      "relationship": "Scale factors in similar figures are ratios",
      "directionality": "forward"
    },
    {
      "targetId": "GE-4.12",
      "relationship": "Dilation scale factor is a ratio comparing image to pre-image",
      "directionality": "forward"
    },
    {
      "targetId": "NO-1.4a",
      "relationship": "Equivalent ratios use the same multiplicative principle as equivalent fractions",
      "directionality": "backward"
    },
    {
      "targetId": "SP-5.4",
      "relationship": "Probability can be expressed as a ratio of favorable to total outcomes",
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
    "groups": { /* SceneDefinition from Section 4.3.1 */ },
    "doubleNumberLine": { /* SceneDefinition from Section 4.4.1 */ }
  },
  "guidedDiscovery": {
    "forEveryDemo": { /* Double number line with marker animation for Prompt 1 */ },
    "orderSwapDemo": { /* Line swap animation for Prompt 2 */ },
    "ratioVsFractionDemo": { /* Split-screen fraction bar comparison for Prompt 3 */ },
    "additiveVsMultiplicativeDemo": { /* Ghost marker vs real marker for Prompt 4 */ },
    "ratioTablePatternDemo": { /* Table with animated multiplier arrows for Prompt 5 */ }
  },
  "symbolBridge": {
    "notationSequence": { /* Three notation forms with connecting arrows */ },
    "distinctionCallout": { /* Ratio vs fraction side-by-side */ },
    "equivalentRatioRow": { /* Animated equivalent ratio chain */ }
  },
  "realWorldAnchor": {
    "recipe": { /* Mixing bowl scene */ },
    "gaming": { /* Minecraft crafting scene */ },
    "sports": { /* Basketball court scene */ },
    "socialMedia": { /* Phone screen scene */ }
  }
}
```

### 13.4 problems.json Structure

```json
{
  "topicId": "NO-1.5",
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
        "type": "ratio-identify-groups",
        "difficulty": 0.25,
        "config": {
          "groupA": { "count": 2, "label": "Cats" },
          "groupB": { "count": 5, "label": "Dogs" },
          "question": "What is the ratio of cats to dogs?"
        }
      },
      {
        "type": "ratio-from-description",
        "difficulty": 0.3,
        "config": {
          "description": "For every 3 apples, there are 4 oranges.",
          "correctRatio": "3:4"
        }
      }
    ],
    "layer1_extras": [
      {
        "type": "equivalent-ratio-multiply",
        "difficulty": 0.55,
        "config": {
          "baseRatio": "2:3",
          "givenValue": { "position": "A", "value": 10 },
          "targetValue": 15
        }
      },
      {
        "type": "ratio-table-complete",
        "difficulty": 0.6,
        "config": {
          "baseRatio": "3:4",
          "missingCells": [
            { "row": 2, "column": "b" },
            { "row": 3, "column": "a" }
          ]
        }
      }
    ],
    "layer2_extras": [
      {
        "type": "ratio-vs-fraction",
        "difficulty": 0.85,
        "config": {
          "stem": "A basket has 5 apples and 3 oranges. Is the statement '5/3 of the fruit is apples' correct? Explain why or why not.",
          "correctAnswer": "No -- 5/3 is greater than 1, so it can't be a fraction of the fruit. 5:3 is the ratio of apples to oranges, but the fraction of apples is 5/8."
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
| Guided discovery insight (Stage 3) | -- | 0-30 | -- | 30 |
| Practice set completion (Stage 6) | 50 | -- | -- | 50 |
| **Subtotal before multipliers** | | | | **300** |
| Deep Dive multiplier (>2 min in spatial beyond minimum) | -- | -- | 1.5x | -- |
| Connection Maker (references prior concept in reflection) | -- | -- | 1.3x | -- |
| Struggle Bonus (wrong -> retried -> explained correctly) | -- | -- | 1.4x | -- |
| First Try Clarity (first explanation rated high-quality) | -- | -- | 1.2x | -- |

**Theoretical maximum XP**: 300 base x 1.5 x 1.3 x 1.4 x 1.2 = 300 x 3.276 = 982 XP (extremely unlikely; requires all multipliers simultaneously).

**Typical XP range**: 200-350 XP for a solid completion.

### 14.2 Achievement Triggers

| Achievement | Trigger in This Lesson |
|---|---|
| Ratio Revealer (Mastery, Uncommon) | If the student correctly distinguishes ratio from fraction in BOTH the practice problem U1 AND the reflection (AI score >= 4). |
| Order Detective (Exploration, Common) | If the student uses the "Swap Order" button AND later gets problem U3 (order matters) correct on first try. |
| Table Master (Exploration, Uncommon) | If the student opens the ratio table, taps at least 5 different columns, AND completes the ratio table practice problem (P2) without hints. |
| The Teacher (Mastery, Uncommon) | If reflection quality score = 5/5. |
| Second Wind (Persistence, Common) | If the student gets a practice problem wrong, reviews the concept, then solves a harder version correctly. |
| Scale Explorer (Exploration, Uncommon) | If the student creates 6+ unique ratios during spatial exploration (uniqueRatiosCreated.size >= 6). |

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
You are helping a Grade 6 student understand ratios (topic NO-1.5).

Current stage: {stage_name}
Student has completed: {completed_stages}
Known misconceptions detected: {detected_misconceptions}

Key pedagogical rules for this topic:
1. NEVER define ratio abstractly. Always reference the visual model first: "look at the blue and orange groups."
2. Use "for every" language: "for every 3 blue, there are 5 orange" -- not "the ratio is 3 to 5" until Stage 4.
3. If the student conflates ratio with fraction, do NOT correct directly. Ask: "If there are 3 blue and 5 orange, how many circles are there total? What fraction of ALL circles are blue?" Let them discover the difference.
4. If the student thinks order doesn't matter, ask: "If we swap the groups, does 3 dogs for every 5 cats mean the same as 5 dogs for every 3 cats?"
5. For equivalent ratios, guide the student to discover the multiplicative pattern on the double number line -- do not state the rule.
6. Validate emotional state: if student seems frustrated (3+ wrong in a row), switch to confidence-building mode with simpler examples.

Available scene commands: create/modify token groups and double number lines in the canvas.
```

### 15.2 Misconception Response Patterns

| Student Says | AI Response Strategy |
|---|---|
| "3:5 is the same as 3/5" | "That's a really common thought! Let's test it. If you have 3 blue and 5 orange circles, how many circles are there total? So what fraction of ALL circles are blue? Is it 3/5 or something else?" |
| "3:5 and 5:3 are the same thing" | "Interesting idea! Let's try it. Make 3 blue and 5 orange on the workspace. Now tap 'Swap Order.' Look at the double number line -- do the lines look the same or different? Think about this: is '3 dogs for every 5 cats' the same as '5 dogs for every 3 cats'?" |
| "To get an equivalent ratio, I add the same number to both" | "Let's check that with the double number line! Start with 2:5. If you add 1 to each, you get 3:6. Is 3:6 on the double number line at one of the tick marks? Now try multiplying: 2x2=4 and 5x2=10. Is 4:10 on a tick mark?" |
| "I don't get why ratios are different from fractions" | "Great question -- they look really similar! Here's the key: a ratio compares TWO separate groups. A fraction is ONE number that tells you part of a whole. Let's use the workspace: make 3 blue and 5 orange. The ratio 3:5 says 'I have 3 blue compared to 5 orange.' But the fraction of blue circles is 3/8 -- because there are 8 circles total. See the difference?" |

### 15.3 Scene Commands for Tutoring

The AI tutor can generate MathScene commands to illustrate points:

```json
[
  {
    "action": "create",
    "object": {
      "type": "tokenGroups",
      "id": "tutor-groups",
      "groupA": { "count": 3, "color": "#60a5fa", "label": "Blue" },
      "groupB": { "count": 5, "color": "#fb923c", "label": "Orange" }
    }
  },
  {
    "action": "create",
    "object": {
      "type": "doubleNumberLine",
      "id": "tutor-dnl",
      "valueA": 3,
      "valueB": 5,
      "maxGroups": 6,
      "markerPosition": 1,
      "width": 280
    }
  },
  {
    "action": "animate",
    "sequence": {
      "trigger": "auto",
      "steps": [
        { "action": "fadeIn", "target": "tutor-groups", "duration": 0.5, "from": "scale" },
        { "action": "wait", "duration": 1.0 },
        { "action": "fadeIn", "target": "tutor-dnl", "duration": 0.5, "from": "bottom" }
      ]
    }
  }
]
```

---

## 16. Edge Cases & Error Handling

### 16.1 Spatial Experience Edge Cases

| Edge Case | Handling |
|---|---|
| Both token counts are 0 | Double number line is blank. Annotation: "Add some circles to start comparing!" All buttons except "+" are disabled. |
| One token count is 0 | Ratio display shows "N : 0" or "0 : N". Double number line renders one active line and one blank line at 0. Annotation: "With zero of one type, there's nothing to compare!" |
| Both counts equal | Annotation: "Equal amounts! The ratio simplifies to 1:1." Double number line tick marks overlap. |
| Token count reaches max (12) | "+" button disables. Tooltip: "Maximum reached." |
| Marker dragged beyond line bounds | Clamped to [0, maxGroups]. Rubber-band effect at edges (spring: `damping: 30, stiffness: 400`). |
| Rapid token additions (>5 per second) | 150ms debounce. Animations queue but don't overlap. Double number line redraw batched. |
| Large LCM ratio (e.g., 7:11) | maxGroups limited to 6. Tick labels use smaller font (10px). Warning not shown -- handled gracefully. |

### 16.2 Practice Stage Edge Cases

| Edge Case | Handling |
|---|---|
| Student enters 0 in numeric input | Validation: "The answer must be a positive number." Input border turns amber. |
| Student enters a negative number | Validation: "Ratios use positive numbers." Input rejected (numeric keyboard prevents this on mobile). |
| Student enters a decimal | Validation: "Enter a whole number." Input rejected for ratio problems. |
| Drag-to-fill: student drops tile outside any box | Tile springs back to original position (300ms spring). No state change. |
| Drag-to-fill: student places same number in both boxes | Allowed -- may or may not be a valid equivalent ratio. Validated on "Check." |
| Multi-select: student selects all options | Allowed. Validated on "Check." Feedback shows which are correct/incorrect. |

### 16.3 Network & Offline Handling

| Scenario | Handling |
|---|---|
| Reflection submission fails (network error) | Response is saved to IndexedDB via Dexie.js. Retried when connectivity returns. Student sees: "Your response is saved! It will be evaluated when you're back online." Lesson still completes. |
| AI tutor unavailable | Fallback to pre-written static hints from the hints array. Toast: "AI tutor is offline. Using built-in hints." |
| Stage assets fail to load | SVG scenes are bundled inline (no network fetch for core visuals). Only sound files require network. Missing sounds are silently skipped. |

---

## 17. Testing Requirements

### 17.1 Unit Tests (Vitest)

| Test Suite | What It Tests | Key Assertions |
|---|---|---|
| `ratioAlignment.test.ts` | Group position alignment on double number line | For all base values 1-12 and groups 0-8: blueTickX === orangeTickX for same group index |
| `equivalentRatio.test.ts` | Equivalent ratio detection via cross-multiplication | `isEquivalent(3, 5, 6, 10) === true`, `isEquivalent(3, 5, 4, 6) === false`, edge cases with 0 |
| `ratioSimplification.test.ts` | GCF-based simplification of ratios | `simplify(6, 10) === [3, 5]`, `simplify(7, 11) === [7, 11]` (coprime), `simplify(0, 5) === [0, 5]` |
| `tickValueGeneration.test.ts` | Tick labels for both number lines | For ratio 3:5 with 8 groups: blue values = [0,3,6,9,12,15,18,21,24], orange = [0,5,10,15,20,25,30,35,40] |
| `markerSnap.test.ts` | Marker snaps to nearest group position | For 8 groups on 320px line: x=0 -> group 0, x=20 -> group 0, x=21 -> group 1, x=319 -> group 8 |
| `practiceAnswerValidation.test.ts` | All practice problem correct answers validate | R1: "a" is correct, R2: "a" is correct, P1: 28 is correct, P2: [4, 15, 10], P3: "a", U1: ["a","c"], U2: (2,3) or (8,12) or (12,18), U3: "b" |
| `ratioTableGeneration.test.ts` | Ratio table values for given base ratio | For ratio 5:2 with 6 groups: rows = [[0,0],[5,2],[10,4],[15,6],[20,8],[25,10]] |

### 17.2 Integration Tests (Vitest + React Testing Library)

| Test | What It Verifies |
|---|---|
| Stage progression | All 7 stages render without errors, each transitions to the next |
| Token interaction | Adding/removing tokens updates ratio display and double number line |
| Marker drag | Dragging marker updates labels and highlights correct group |
| Swap order | Tapping "Swap Order" swaps the two lines and updates ratio display |
| Practice correct answer | Submitting correct answer shows green feedback that persists until "Next" is tapped |
| Practice incorrect answer | Submitting incorrect answer shows red feedback with explanation |
| Continue button gating | Continue button does not appear until 10 interactions are reached |

### 17.3 E2E Tests (Playwright)

| Test | What It Verifies |
|---|---|
| Full lesson flow | Complete the lesson from Hook through Reflection with no errors |
| Mobile viewport | All stages render correctly at 375px width |
| Reduced motion | With `prefers-reduced-motion: reduce`, animations are instant and no janky transitions |
| Keyboard navigation | Complete all stages using only keyboard (Tab, Enter, Arrow keys) |

### 17.4 Visual Tests (Storybook)

| Story | What It Shows |
|---|---|
| `TokenGroup` | Blue and orange groups at various counts (0, 1, 5, 12) |
| `DoubleNumberLine` | Various ratios: 1:1, 2:3, 3:5, 7:11, with marker at different positions |
| `RatioTable` | Tables for ratios 2:3, 5:7, 1:4 with highlighted columns |
| `ProblemCard` | Each of the 9 practice problems in default, correct, and incorrect states |
| `HookAnimation` | Full hook animation at key frames (t=0, t=15, t=27, t=40) |
