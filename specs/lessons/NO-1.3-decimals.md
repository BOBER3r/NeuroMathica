# Lesson Design: NO-1.3 Decimals

**Version**: 1.0.0 | **Date**: 2026-03-22 | **Author**: Lesson Design Team
**Concept ID**: NO-1.3 | **Domain**: Numbers & Operations | **Grade**: 6
**Prerequisites**: NO-1.1 (Place Value) | **Successors**: NO-1.3a, NO-1.4b, NO-1.8
**Content Path**: `src/content/domains/numbers-operations/NO-1.3/`
**Constitution Compliance**: All 7 Core Principles verified. Neural Learning Sequence followed without reordering or omission.

---

## 1. Lesson Overview

| Field | Value |
|-------|-------|
| Concept | Decimals — extending place value to the right of the ones place |
| Grade | 6 (ages 11-12) |
| Duration | ~25 minutes across 7 stages |
| Learning Objective | Students understand that decimals extend the place-value system to the right of the ones place: tenths, hundredths, thousandths — each position is 1/10 of the position to its left |
| Secondary Objectives | Students can read and write decimals to the thousandths place; students can compare and order decimals using place-value reasoning; students can convert between simple fractions (tenths, hundredths) and their decimal equivalents; students understand that trailing zeros do not change a decimal's value |
| Common Misconceptions | (1) "0.45 > 0.9 because 45 > 9" — treating digits after the decimal point as a whole number. (2) "Longer decimals are bigger" — confusing the number of decimal digits with magnitude. (3) "Decimals aren't real numbers" — seeing them as a separate, lesser category. (4) Confusing tenths and hundredths — not understanding which position is which. |
| NLS Stages | Hook, Spatial Experience, Guided Discovery, Symbol Bridge, Real-World Anchor, Practice (9 problems across 3 layers), Reflection |
| Emotional Arc | Curiosity (Hook) -> Engagement (Spatial) -> Productive Struggle (Discovery) -> Insight (Symbol Bridge) -> Confidence (Real-World) -> Mastery (Practice) -> Metacognition (Reflection) |

---

## 2. Neuroscience Framework

### Stage-by-Stage Cognitive Architecture

| Stage | Cognitive Process | Neuroscience Rationale | Target Emotional State |
|-------|------------------|----------------------|----------------------|
| 1. Hook | Attention capture, reward prediction | The dopaminergic system fires when the brain encounters unexpected magnification — zooming into "empty space" between 0 and 1 and discovering hidden numbers creates a powerful prediction error ("I thought there was nothing there!"). This primes the hippocampus for deep encoding of the revelation that numbers exist between whole numbers. | Curiosity, wonder, surprise |
| 2. Spatial Experience | Spatial reasoning, embodied cognition, visuospatial working memory | Two complementary spatial models activate the intraparietal sulcus (IPS). The 10x10 grid leverages the area model — tapping cells creates motor-cortex engagement and builds an embodied understanding that 0.01 is a physical unit. The zoomable number line leverages continuous magnitude representation — pinch-to-zoom physically simulates the "looking closer" metaphor. Dual spatial encoding produces richer, more flexible mental representations than either model alone. | Engagement, playful exploration, "I can see it" |
| 3. Guided Discovery | Pattern recognition, contrastive analysis, prediction error | Confronting "0.9 vs 0.45 — which is bigger?" triggers the anterior cingulate cortex (ACC), which monitors prediction errors. Students whose whole-number intuition says "45 > 9" experience a productive conflict when the grid shows 0.9 covering more area. This conflict is precisely what drives conceptual change — the brain must reconcile conflicting schemas, producing deeper and more durable learning. | Productive struggle, dawning insight, schema revision |
| 4. Symbol Bridge | Symbolic encoding, dual coding integration | Overlaying decimal notation onto the grid and number line models activates the angular gyrus for symbol-meaning mapping. Because the spatial model is already established, the notation (0.35 = 3 tenths + 5 hundredths) anchors to concrete visual experience rather than floating as abstract syntax. Color-coded connections between shaded columns/cells and written digits reinforce dual coding. | Insight, confidence, "aha" moment |
| 5. Real-World Anchor | Semantic memory integration, transfer preparation | Connecting decimals to money ($3.49), sports timing (9.58s), and body temperature (98.6 F) creates multiple retrieval paths in semantic memory. Students aged 11-12 have extensive experience with money and sports stats, so these anchors feel personally relevant, strengthening episodic binding. | Confidence, relevance, "I already use this!" |
| 6. Practice | Retrieval practice, error-driven learning, progressive challenge | The 3-layer structure (recall -> procedure -> understanding) systematically strengthens decimal concepts. Recall problems consolidate tenths/hundredths identification. Procedure problems build comparison and ordering fluency. Understanding problems force students to articulate WHY decimal comparison works the way it does, converting procedural success into conceptual depth. | Mastery, self-efficacy |
| 7. Reflection | Metacognition, self-explanation effect | Generating an explanation of why 0.9 > 0.45 forces the brain to organize the spatial, symbolic, and real-world representations into a coherent narrative. The self-explanation effect (Chi et al., 1989) shows 2-3x better retention when students explain concepts in their own words versus passive review. | Metacognition, pride, ownership |

### Why This Ordering Works

The spatial-before-symbolic sequence is critical for decimals because students' whole-number intuition creates systematic misconceptions. When students first SEE that 0.9 covers 90 cells on a 10x10 grid while 0.45 covers only 45 cells (Stage 2-3), their spatial reasoning overrides their faulty whole-number reasoning. Only THEN does the notation (Stage 4) make sense — students can "see" that 0.9 = 9/10 of the grid = 90/100 = 90%, which is larger than 0.45 = 45/100 = 45%. Without the spatial grounding, many students memorize comparison rules without understanding, leading to fragile knowledge that fails under novel conditions.

The emotional arc leverages the "zoom" metaphor as a through-line. The Hook creates wonder ("what lives between 0 and 1?"). The Spatial stage lets students physically explore that space. Discovery reveals that their whole-number intuitions are wrong (productive struggle -> insight). Symbol Bridge gives them a notation system for this new territory. Real World shows them they already encounter decimals daily. Practice consolidates, and Reflection seals the learning.

---

## 3. Stage 1: Hook (30-60 seconds)

### Purpose
Activate curiosity by showing the student that an apparently empty stretch of the number line — the gap between 0 and 1 — actually contains an infinite universe of numbers. No interaction required. Pure cinematic experience.

### Animation Design

**Canvas**: Full viewport width, centered vertically. Background: dark (`#0f172a`, Tailwind `slate-900`). No grid initially — clean stage.

**Sequence**:

#### Phase 1: Number Line Appearance (0s - 1.2s)
1. **0.0s**: A horizontal number line draws across the center of the viewport, from left to right.
   - Line: 2px solid `#475569` (slate-600), spanning 80% of viewport width
   - Drawing animation: line extends from center outward in both directions, 0.8s, `ease: "easeOut"`
   - Tick marks at each end, height 12px, same color

2. **0.8s**: Two labels fade in at the tick marks:
   - Left tick: `0` in white (`#f8fafc`), font-size `clamp(32px, 7vw, 56px)`, font-weight 700
   - Right tick: `1` in white, same size
   - Fade-in: `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s, `ease: "easeOut"`

#### Phase 2: The Question (1.2s - 2.5s)
3. **1.2s**: Text appears above the number line, centered:
   - "What lives between 0 and 1?"
   - Font: `clamp(20px, 5vw, 36px)`, white (`#f8fafc`), font-weight 600
   - Animation: `opacity: 0 -> 1`, `translateY: -12px -> 0`, 0.6s, `ease: "easeOut"`
   - A subtle text glow: `text-shadow: 0 0 20px rgba(129, 140, 248, 0.3)`

4. **2.0s**: An animated magnifying glass icon (`40px`, stroke `#818cf8`, 2px stroke) appears above the midpoint of the number line.
   - Entry: `scale: 0 -> 1`, `opacity: 0 -> 1`, 0.3s, `spring({ damping: 15, stiffness: 400 })`
   - Begins a gentle hover animation: `translateY: 0 -> -4px -> 0`, 2s loop, `ease: "easeInOut"`

#### Phase 3: Zoom Level 1 — Tenths (2.5s - 5.0s)
5. **2.5s**: The question text fades out (0.3s). The text "ZOOM IN..." appears in its place:
   - Font: `clamp(16px, 4vw, 28px)`, `#818cf8` (indigo), font-weight 700, letter-spacing 2px
   - Pulse animation: `scale: 1.0 -> 1.05 -> 1.0`, 0.6s, once

6. **3.0s**: The number line smoothly "zooms in" — the `0` and `1` labels move outward toward the edges of the viewport, and the space between them expands. The line stretches to fill the viewport width.
   - Duration: 1.2s
   - Ease: `spring({ damping: 22, stiffness: 250 })`
   - During the zoom, 9 new tick marks grow upward from the line at evenly spaced positions:
     - Each tick: 8px tall, 1.5px, color `#22d3ee` (cyan)
     - Stagger: 0.06s between ticks, left to right
   - Labels fade in below each tick simultaneously with the tick:
     - `0.1`, `0.2`, `0.3`, `0.4`, `0.5`, `0.6`, `0.7`, `0.8`, `0.9`
     - Font: `clamp(12px, 3vw, 18px)`, `#22d3ee` (cyan), font-weight 600, `tabular-nums`
     - Fade-in: `opacity: 0 -> 1`, 0.2s each

7. **4.2s**: The "ZOOM IN..." text changes to: "10 numbers hiding between 0 and 1!"
   - Color: `#22d3ee` (cyan), font-weight 600
   - Swap animation: old text fades out (0.2s), new text fades in (0.3s) with `translateY: 8px -> 0`

#### Phase 4: Zoom Level 2 — Hundredths (5.0s - 7.5s)
8. **5.0s**: A highlight rectangle (semi-transparent cyan, `#22d3ee20`, border `1px solid #22d3ee40`, border-radius 4px) appears around the segment from 0.1 to 0.2, pulsing once.
   - Duration: 0.4s

9. **5.4s**: The number line zooms again — this time into the segment between 0.1 and 0.2. The rest of the number line fades out. `0.1` moves to the left edge, `0.2` moves to the right edge.
   - Duration: 1.2s
   - Ease: `spring({ damping: 22, stiffness: 250 })`
   - 9 new tick marks appear between 0.1 and 0.2:
     - Each tick: 6px tall, 1px, color `#a78bfa` (purple)
     - Stagger: 0.04s between ticks
   - Labels: `0.11`, `0.12`, `0.13`, `0.14`, `0.15`, `0.16`, `0.17`, `0.18`, `0.19`
     - Font: `clamp(10px, 2.5vw, 14px)`, `#a78bfa` (purple), font-weight 600, `tabular-nums`

10. **6.6s**: Text updates: "10 more between 0.1 and 0.2! Every gap has 10 numbers..."
    - Color: `#a78bfa` (purple), font-weight 600

#### Phase 5: The Revelation (7.5s - 9.5s)
11. **7.5s**: A rapid sequence of 3 more zoom pulses (zoom-flash effect) — the line flashes as if zooming deeper and deeper. Each flash is 0.3s:
    - Flash 1: `scale: 1 -> 1.02 -> 1`, bright glow pulse on the line
    - Flash 2: same, slightly brighter
    - Flash 3: same, brightest
    - After the flashes, a subtle particle burst of tiny dots (mixed cyan and purple, 15 particles) emanates from the center of the line

12. **8.4s**: Final reveal text slides in from below:
    - "It never ends. Between any two numbers, there are infinitely more."
    - Font: `clamp(16px, 4vw, 24px)`, white (`#f8fafc`), font-weight 500, italic
    - Animation: `opacity: 0 -> 1`, `translateY: 16px -> 0`, 0.6s, `ease: "easeOut"`
    - Subtle ambient glow on the number line: `box-shadow: 0 0 30px rgba(129, 140, 248, 0.15)`

#### Phase 6: Continue Button (9.5s+)
13. **9.5s**: Continue button fades in below the reveal text:
    - Text: "Continue" (i18n key: `lesson.continue`)
    - Style: filled button, primary color (`#8b5cf6` purple-500), white text
    - Size: `min-width: 160px`, `height: 48px` (meets 44px touch target requirement)
    - Animation: `opacity: 0 -> 1`, 0.5s, `ease: "easeOut"`
    - Hover state: `background: #7c3aed` (purple-600)
    - Active state: `scale: 0.97`, 0.1s

### Accessibility
- `aria-live="polite"` region announces: "A number line from 0 to 1. Zooming in reveals 10 numbers between 0 and 1: 0.1, 0.2, 0.3 and so on. Zooming further reveals 10 more between 0.1 and 0.2: 0.11, 0.12, 0.13 and so on. Between any two numbers, there are infinitely more."
- All animated elements have `prefers-reduced-motion` fallback: show the final state (number line with tenths visible, reveal text) immediately with simple fade-in (0.5s total instead of 9.5s)
- Tick labels and text are actual DOM text elements (not canvas-rendered) for screen reader access

### MathScene DSL (Hook Animation)

```json
{
  "id": "NO-1.3-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 800, 400],
  "background": "#0f172a",
  "objects": [
    {
      "type": "numberLine", "id": "main-line",
      "start": [80, 200], "end": [720, 200],
      "range": [0, 1],
      "style": { "stroke": "#475569", "strokeWidth": 2 },
      "ticks": {
        "major": { "values": [0, 1], "height": 12, "labelStyle": { "fontSize": 48, "fill": "#f8fafc", "fontWeight": 700 } }
      }
    },
    {
      "type": "annotation", "id": "question-text",
      "position": [400, 100], "text": "What lives between 0 and 1?",
      "style": { "fontSize": 32, "fill": "#f8fafc", "fontWeight": 600, "textAnchor": "middle" as const },
      "visible": false
    },
    {
      "type": "annotation", "id": "zoom-text",
      "position": [400, 100], "text": "ZOOM IN...",
      "style": { "fontSize": 24, "fill": "#818cf8", "fontWeight": 700, "textAnchor": "middle" as const, "letterSpacing": 2 },
      "visible": false
    },
    {
      "type": "group", "id": "tenths-ticks",
      "children": [
        { "type": "tick", "id": "t-01", "position": [144, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.1", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-02", "position": [208, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.2", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-03", "position": [272, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.3", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-04", "position": [336, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.4", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-05", "position": [400, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.5", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-06", "position": [464, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.6", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-07", "position": [528, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.7", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-08", "position": [592, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.8", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false },
        { "type": "tick", "id": "t-09", "position": [656, 200], "height": 8, "style": { "stroke": "#22d3ee", "strokeWidth": 1.5 }, "label": "0.9", "labelStyle": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false }
      ]
    },
    {
      "type": "annotation", "id": "tenths-text",
      "position": [400, 100], "text": "10 numbers hiding between 0 and 1!",
      "style": { "fontSize": 22, "fill": "#22d3ee", "fontWeight": 600, "textAnchor": "middle" as const },
      "visible": false
    },
    {
      "type": "annotation", "id": "hundredths-text",
      "position": [400, 100], "text": "10 more between 0.1 and 0.2! Every gap has 10 numbers...",
      "style": { "fontSize": 20, "fill": "#a78bfa", "fontWeight": 600, "textAnchor": "middle" as const },
      "visible": false
    },
    {
      "type": "annotation", "id": "reveal-text",
      "position": [400, 340], "text": "It never ends. Between any two numbers, there are infinitely more.",
      "style": { "fontSize": 20, "fill": "#f8fafc", "fontWeight": 500, "fontStyle": "italic", "textAnchor": "middle" as const },
      "visible": false
    }
  ],
  "animations": [
    {
      "id": "hook-sequence",
      "trigger": "auto",
      "steps": [
        { "action": "draw", "target": "main-line", "duration": 0.8, "ease": "easeOut" },
        { "action": "fadeIn", "target": "question-text", "duration": 0.4, "from": "bottom", "delay": 0.4 },
        { "action": "wait", "duration": 1.3 },
        { "action": "fadeOut", "target": "question-text", "duration": 0.3 },
        { "action": "fadeIn", "target": "zoom-text", "duration": 0.3 },
        { "action": "zoom", "target": "main-line", "range": [0, 1], "duration": 1.2, "ease": "spring" },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "t-01", "duration": 0.2, "delay": 0 },
            { "action": "fadeIn", "target": "t-02", "duration": 0.2, "delay": 0.06 },
            { "action": "fadeIn", "target": "t-03", "duration": 0.2, "delay": 0.12 },
            { "action": "fadeIn", "target": "t-04", "duration": 0.2, "delay": 0.18 },
            { "action": "fadeIn", "target": "t-05", "duration": 0.2, "delay": 0.24 },
            { "action": "fadeIn", "target": "t-06", "duration": 0.2, "delay": 0.30 },
            { "action": "fadeIn", "target": "t-07", "duration": 0.2, "delay": 0.36 },
            { "action": "fadeIn", "target": "t-08", "duration": 0.2, "delay": 0.42 },
            { "action": "fadeIn", "target": "t-09", "duration": 0.2, "delay": 0.48 }
          ]
        },
        { "action": "fadeOut", "target": "zoom-text", "duration": 0.2 },
        { "action": "fadeIn", "target": "tenths-text", "duration": 0.3, "from": "bottom" },
        { "action": "wait", "duration": 0.8 },
        { "action": "fadeOut", "target": "tenths-text", "duration": 0.2 },
        { "action": "zoom", "target": "main-line", "range": [0.1, 0.2], "duration": 1.2, "ease": "spring" },
        { "action": "fadeIn", "target": "hundredths-text", "duration": 0.3, "from": "bottom" },
        { "action": "wait", "duration": 1.0 },
        { "action": "fadeOut", "target": "hundredths-text", "duration": 0.2 },
        { "action": "pulse", "target": "main-line", "count": 3, "duration": 0.3 },
        { "action": "particles", "origin": [400, 200], "count": 15, "colors": ["#22d3ee", "#a78bfa"], "duration": 1.0 },
        { "action": "fadeIn", "target": "reveal-text", "duration": 0.6, "from": "bottom" }
      ]
    }
  ],
  "interactions": []
}
```

---

## 4. Stage 2: Spatial Experience (2-4 minutes)

### Purpose
Provide hands-on manipulation of two spatial models — a 10x10 grid and a zoomable number line — so the student builds embodied, motor-cortex-enhanced understanding of decimal place value. No formulas, no notation. Pure spatial play with immediate visual feedback.

### Layout

**Mobile** (< 768px): Single column, stacked vertically.
- Top: Decimal display (sticky, 80px tall)
- Middle: Active model (grid or number line, scrollable, flex-grow)
- Bottom: Model toggle + controls (fixed, 80px tall)

**Tablet+** (>= 768px): Two-panel side-by-side.
- Left panel (55% width): Active model (grid or number line)
- Right panel (45% width): Decimal display + model toggle + controls

### Component: Decimal Display

A live-updating decimal value at the top of the scene, always showing the current state.

| Property | Value |
|----------|-------|
| Font | System mono, `tabular-nums` |
| Font size | `clamp(36px, 8vw, 56px)` |
| Color | White (`#f8fafc`) on dark background |
| Background | `#1e293b` (slate-800) with `border-radius: 16px` and `padding: 16px 24px` |
| Update animation | When value changes, the number does a brief `scale: 1.0 -> 1.05 -> 1.0` spring animation (0.3s) |
| Format | Always show 2 decimal places minimum: `0.35`, `0.90`, `1.00`. Use fixed-point formatting. |
| Breakdown | Below the main number, show a smaller breakdown: `3 tenths + 5 hundredths` in the respective colors (orange for tenths, rose for hundredths) |
| Fraction equivalent | Below the breakdown, show the fraction: `= 35/100` in muted text (`#94a3b8`, 14px) |

### Component: Model Toggle

A segmented control allowing the student to switch between the grid and the number line:

- Two segments: "Grid" (left) and "Number Line" (right)
- Segment container: `background: #0f172a`, `border-radius: 12px`, `padding: 4px`, `border: 1px solid #334155`
- Active segment: `background: #334155`, `border-radius: 8px`, white text, font-weight 600
- Inactive segment: transparent background, `#94a3b8` text
- Size: each segment `80px x 40px` (meets 44px minimum via container height)
- Transition: active background slides (0.2s, `ease: "easeInOut"`)
- Default: Grid (primary model)

### Component: 10x10 Grid (Primary Model)

A 10x10 grid where the entire grid represents 1.0, each column represents 0.1 (one tenth), and each cell represents 0.01 (one hundredth).

#### Grid Specifications

| Property | Value |
|----------|-------|
| Total cells | 100 (10 rows x 10 columns) |
| Grid container size | `min(80vw, 400px)` square |
| Cell size | Container size / 10 (e.g., 40px x 40px at 400px container) |
| Cell gap | 1px (using CSS grid `gap: 1px`) |
| Grid background (gap color) | `#334155` (slate-700) — creates visible grid lines |
| Unshaded cell | `#1e293b` (slate-800) |
| Shaded cell (active) | `#818cf8` (indigo) at 80% opacity |
| Cell hover (desktop) | `background: #818cf840` (indigo at 25%), 0.1s transition |
| Cell border-radius | 2px |
| Column labels | Along the top: `0.1`, `0.2`, ..., `1.0` in `#f59e0b` (amber), font-size 10px, displayed every other column to avoid crowding on mobile |
| Row labels | Along the left: `1`, `2`, ..., `10` in `#94a3b8` (slate-400), font-size 10px, displayed every other row on mobile |

#### Grid Interaction

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Shade a single cell | Tap cell | Cell fills with indigo (`#818cf8`) with pop animation (`scale: 0 -> 1`, 0.15s, `spring({ damping: 15, stiffness: 400 })`) | `shadedCells` set adds cell ID |
| Unshade a single cell | Tap shaded cell | Cell unfills with reverse animation (`scale: 1 -> 0.8 -> 0`, 0.15s, `ease: "easeIn"`, then returns to unshaded) | `shadedCells` set removes cell ID |
| Shade entire column | Tap column header label | All 10 cells in column fill simultaneously with a downward stagger (0.03s between cells) | All 10 cells in column toggled |
| Paint-drag across cells | Touch-drag across cells | Cells shade as finger moves over them, with ripple feedback (same pop animation, sequential) | Each traversed cell added to `shadedCells` |
| Clear all | "Clear" button (bottom) | All cells shrink out simultaneously (`scale: 1 -> 0`, 0.3s), then grid resets | `shadedCells` cleared |

#### Column Highlight Effect

When a full column (10 cells) is shaded:
1. The column's cells briefly flash brighter (`opacity: 0.8 -> 1.0 -> 0.8`, 0.3s)
2. A label appears above the column: "+0.1" in amber (`#f59e0b`), 14px, fading out after 1s
3. The column header label gets a subtle glow ring

When all 100 cells are shaded:
1. The entire grid pulses with a bright glow (white `box-shadow: 0 0 20px rgba(255,255,255,0.2)`, 0.4s)
2. The decimal display shows `1.00` and a text callout appears: "That's a whole 1!" in white, 18px, font-weight 600
3. The callout fades out after 2s

### Component: Zoomable Number Line (Secondary Model)

A horizontal number line from 0 to 1 that supports pinch-to-zoom to reveal decimal subdivisions.

#### Number Line Specifications

| Property | Value |
|----------|-------|
| Line | 2px solid `#475569`, spanning container width |
| Initial range | 0 to 1 |
| Initial ticks | Major ticks at 0 and 1 (12px, labels in white 20px), minor ticks at 0.1 intervals (8px, labels in cyan 14px) |
| Draggable point | Circular, 20px diameter, fill `#818cf8`, stroke `#c4b5fd` 2px, `drop-shadow(0 2px 4px rgba(0,0,0,0.3))` |
| Point label | Above the point, live-updating value, 16px, white, `tabular-nums` |

#### Number Line Interactions

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Place/move point | Drag point along line | Point follows finger/cursor, value updates in real-time. Nearest tick provides subtle magnetic snap (5px radius) | `pointPosition` updates |
| Zoom in | Pinch-to-zoom gesture or +/- zoom buttons | Line smoothly expands, new tick marks appear at the next decimal place (0.1 -> 0.01 -> 0.001). Spring animation (0.5s) | `zoomLevel` increments, `visibleRange` narrows |
| Zoom out | Reverse pinch or -/zoom button | Line contracts, finer ticks fade out. Spring animation (0.5s) | `zoomLevel` decrements, `visibleRange` widens |
| Pan | Horizontal drag on line (not on point) | Line scrolls horizontally within current zoom level | `visibleRange` shifts |

#### Zoom Levels

| Level | Range Visible | Tick Spacing | Tick Labels | Tick Color |
|-------|--------------|-------------|-------------|------------|
| 1 (default) | 0 — 1 | 0.1 | 0.1, 0.2, ..., 0.9 | `#22d3ee` (cyan) |
| 2 | 0.1-wide window (e.g., 0.1 — 0.2) | 0.01 | 0.11, 0.12, ..., 0.19 | `#a78bfa` (purple) |
| 3 | 0.01-wide window (e.g., 0.12 — 0.13) | 0.001 | 0.121, 0.122, ..., 0.129 | `#f59e0b` (amber) |

#### Zoom Buttons (for non-pinch devices)

Two circular buttons, positioned at the bottom-right of the number line area:
- `+` button: 48px diameter, `background: #334155`, `border: 1px solid #475569`, white `+` text 24px. On tap: zoom in centered on current point position
- `-` button: same style, `--` text. On tap: zoom out
- Disabled states: `+` disabled at max zoom level 3, `-` disabled at level 1 — both show `opacity: 0.3`
- Gap between buttons: 12px, vertical stack

### Controls Area (Grid Mode)

Below the grid (mobile) or below the decimal display (tablet+):
- A "Clear" button: 120px wide, 44px tall, `border-radius: 8px`, `background: #334155`, `color: #94a3b8`, text "Clear Grid"
  - Hover: `background: #475569`
  - Active: `scale: 0.97`
  - Disabled when no cells are shaded: `opacity: 0.3`

### Interaction Requirements

| Requirement | Details |
|-------------|---------|
| MIN_INTERACTIONS | 10 tap or drag actions before Continue button appears |
| Interaction tracking | Every cell tap, column tap, drag-shade action, and number-line drag counts. Model toggle does NOT count. |
| Continue button | Fades in only after MIN_INTERACTIONS reached AND the student has used BOTH models at least once (tapped a cell AND moved the point on the number line, or zoomed on the number line) |
| Continue button style | Same as Hook stage continue button |
| Max time without interaction | If 30 seconds pass without interaction, the AI tutor avatar peeks in with a hint: "Try tapping the cells on the grid! Each cell represents one hundredth (0.01)." (i18n key: `lesson.decimals.stage2Hint`) |
| Grid cell max | 100 cells (10x10). All 100 can be shaded. |
| Initial state | Grid: all cells unshaded (value = 0.00). Number line: point at 0. Zoom level 1. |

### State Management

```typescript
// Zustand slice for Stage 2
interface DecimalSpatialState {
  // Grid state
  shadedCells: Set<string>; // cell IDs like "r3-c7"
  shadedCount: number;      // derived: shadedCells.size

  // Number line state
  pointPosition: number;   // 0.000 to 1.000
  zoomLevel: 1 | 2 | 3;
  visibleRange: [number, number]; // e.g., [0.1, 0.2]

  // Shared state
  activeModel: "grid" | "numberLine";
  interactionCount: number;
  hasUsedGrid: boolean;
  hasUsedNumberLine: boolean;

  // Derived
  decimalValue: number;    // from active model: shadedCount/100 (grid) or pointPosition (line)
}
```

### Accessibility (Stage 2)
- Grid: Each cell has `role="checkbox"`, `aria-label="Row {r}, Column {c}, value 0.{rc}"`, `aria-checked="true/false"`
- Grid total is announced via `aria-live="polite"`: "35 cells shaded. Value: 0.35. 3 tenths and 5 hundredths."
- Number line point has `role="slider"`, `aria-label="Decimal value"`, `aria-valuemin="0"`, `aria-valuemax="1"`, `aria-valuenow="{value}"`
- Zoom level announced: "Zoom level 2. Showing 0.1 to 0.2."
- Model toggle has `role="tablist"` with `role="tab"` for each option
- Keyboard: Arrow keys to navigate grid cells, Enter/Space to toggle. Tab to controls. On number line: Left/Right arrow keys to move point by 0.01 (or 0.001 at zoom level 3).
- High contrast mode: cell borders increase to 2px, shaded cell opacity increases to 100%

---

## 5. Stage 3: Guided Discovery (3-5 minutes)

### Purpose
Through contrastive analysis and visual proof, guide the student to discover that decimal comparison cannot rely on whole-number intuition. Directly address the core misconception that "longer decimals are bigger" and "0.45 > 0.9 because 45 > 9."

### Layout

Full viewport. Dark background (`#0f172a`). Content centered, max-width 640px.

### Sequence

The stage consists of 5 sequential prompts. Each prompt must be acknowledged before the next appears. The prompts build on each other logically.

#### Prompt 1: The Trap (display-only, requires "Hmm..." acknowledgment)

**Visual**: Two decimals displayed large, side by side:

```
  0.9          0.45
```

- Each number displayed in white (`#f8fafc`), font size `clamp(36px, 8vw, 56px)`, font-weight 700, `tabular-nums`
- Between them: a `?` in a circle (40px, `#fbbf24` amber, pulsing border)
- Below each number, a subtle label in `#94a3b8` (slate-400), 14px:
  - Below `0.9`: "just one digit after the point"
  - Below `0.45`: "two digits after the point"

**Text**: Displayed below the visual in a card-style container (background `#1e293b`, border-radius 12px, padding 20px):
- "Which is bigger: 0.9 or 0.45? A lot of people get this wrong. What do YOU think?"
- Font: 16px, `#e2e8f0` (slate-200), line-height 1.6
- The words "get this wrong" are in bold, `#fbbf24` (amber)
- i18n key: `lesson.decimals.stage3.prompt1`

**Acknowledgment**: A "Hmm, let me think..." button (same style as Continue button, but amber background `#f59e0b`). On tap, Prompt 2 slides in from the right (0.4s, `ease: "easeInOut"`), and Prompt 1 slides out to the left.

#### Prompt 2: The Grid Proof (animated, requires "I see it!" acknowledgment)

**Animation**: Two 10x10 grids appear side by side (or stacked on mobile < 480px), each smaller than the Stage 2 grid (`min(40vw, 180px)` square).

1. **0.0s**: Left grid appears (fade-in, 0.3s). Above it: label "0.9" in white, 28px, bold.
2. **0.5s**: The left grid begins shading cells column by column, left to right:
   - 9 full columns shade in sequence (0.15s per column), using cyan fill (`#22d3ee80`)
   - Each column's 10 cells shade simultaneously with a top-to-bottom stagger (0.02s per cell)
   - After 9 columns: 90 cells shaded. Below the grid, a count fades in: "90 out of 100" in cyan
3. **2.0s**: Right grid appears (fade-in, 0.3s). Above it: label "0.45" in white, 28px, bold.
4. **2.5s**: The right grid shades 4 full columns (0.15s each) then 5 individual cells in the 5th column (top to bottom, 0.05s each), using purple fill (`#a78bfa80`):
   - After: 45 cells shaded. Below the grid: "45 out of 100" in purple
5. **4.0s**: A connecting visual appears between the two grids:
   - A `>` sign (48px, `#34d399` green, bold) fades in between them
   - The left grid gets a green border glow (`box-shadow: 0 0 12px #34d39940`)
   - Below both grids, comparison text fades in: "0.9 covers MORE of the grid. 90 hundredths vs 45 hundredths."

**Text**: Slides in below the grids:
- "0.9 = 90/100. 0.45 = 45/100. When you compare using the SAME denominator, it's obvious: 90 > 45, so 0.9 > 0.45. The number of decimal digits doesn't tell you the size!"
- The phrase "SAME denominator" is bold and highlighted in a pill badge (background `#34d39920`, padding 2px 8px, border-radius 4px)
- The phrase "doesn't tell you the size" is bold, `#fbbf24` (amber)
- i18n key: `lesson.decimals.stage3.prompt2`

**Acknowledgment**: "I see it!" button.

#### Prompt 3: Trailing Zeros Insight (animated, requires "Got it!" acknowledgment)

**Animation**: A single 10x10 grid, centered, at `min(50vw, 220px)`.

1. **0.0s**: Grid appears. Above it: the number `0.5` in white, 36px, bold.
2. **0.3s**: 5 full columns shade in cyan (`#22d3ee80`), left to right, 0.12s per column.
   - Below grid: "50 out of 100 = 0.50" in cyan, 16px
3. **1.5s**: The `0.5` above the grid morphs smoothly into `0.50`:
   - The `0` appears at the end, sliding in from the right (0.3s, `ease: "easeOutBack"`)
   - The grid stays EXACTLY the same — no cells change
   - A subtle highlight ring pulses around the trailing `0` in amber (`#fbbf24`)
4. **2.5s**: The `0.50` morphs into `0.500`:
   - Another `0` slides in from the right
   - Grid still unchanged — same 50 cells shaded
   - Highlight ring pulses on the second trailing `0`
5. **3.5s**: A text callout appears below: "Same amount shaded. Same value."
   - Font: 18px, `#34d399` (green), font-weight 600
   - Entry: `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s

**Text**: Below the callout:
- "0.5 = 0.50 = 0.500. Adding zeros AFTER the last decimal digit doesn't change the value. You can always add or remove trailing zeros."
- "Adding zeros AFTER the last decimal digit" is bold
- i18n key: `lesson.decimals.stage3.prompt3`

**Acknowledgment**: "Got it!" button.

#### Prompt 4: Interactive Challenge — Compare Decimals

**Text**: "Now you try: Which is bigger, 0.8 or 0.62?"
- i18n key: `lesson.decimals.stage3.prompt4`

**Interactive Element**: Two buttons with the decimals:
- Left button: `0.8` — 120px wide, 56px tall, `border-radius: 12px`, `background: #334155`, `color: #f8fafc`, font-size 28px
- Right button: `0.62` — same style
- On hover (desktop): `background: #475569`
- On tap: button border changes to the tapped option's color

**Validation**:
- If correct (`0.8`):
  1. The `0.8` button turns green (border `#34d399`, background `#34d39920`)
  2. A mini grid appears below each button, auto-shading:
     - Left: 80 cells shaded (8 columns), cyan
     - Right: 62 cells shaded (6 columns + 2 cells), purple
  3. Text: "Correct! 0.8 = 80/100 which is greater than 0.62 = 62/100. Think in hundredths to compare!" in green
  4. Green checkmark with bounce animation
  5. i18n key: `lesson.decimals.stage3.prompt4.correct`
- If incorrect (`0.62`):
  1. The `0.62` button briefly flashes red (border `#f87171`, 0.3s)
  2. Text: "Not quite! Try thinking of both numbers as hundredths: 0.8 = 0.80 = 80 hundredths, and 0.62 = 62 hundredths. Now which is bigger?"
  3. Buttons remain active for retry
  4. i18n key: `lesson.decimals.stage3.prompt4.hint`

**Acknowledgment**: After correct answer, "One more!" button appears.

#### Prompt 5: Interactive Challenge — Order Three Decimals

**Text**: "Order from smallest to largest: 0.7, 0.07, 0.71"
- i18n key: `lesson.decimals.stage3.prompt5`

**Interactive Element**: A drag-to-arrange interface.

**Source row**: Three decimal chips in the given order:
- Chips: `0.7`, `0.07`, `0.71`
- Each chip: `min-width: 72px`, height 56px, `border-radius: 12px`, `background: #334155`, `color: #f8fafc`, font-size 24px, font-weight 700
- Chips are draggable (`@use-gesture/react`)

**Target row**: Three slots labeled "Smallest", "", "Largest":
- Slot labels: font-size 12px, `#94a3b8`, above each slot
- Slots: `min-width: 72px`, height 56px, `border: 2px dashed #475569`, `border-radius: 12px`
- When a chip is dragged over a slot, border becomes solid `#818cf8`
- When dropped, chip snaps in with `spring({ damping: 20, stiffness: 300 })`

**Correct order**: `0.07`, `0.7`, `0.71`

**Validation**: When all three slots filled:
- If correct:
  1. All slots turn green (border solid `#34d399`)
  2. Below each chip, the hundredths equivalent fades in (14px, matching color):
     - `0.07 = 7/100`, `0.7 = 70/100`, `0.71 = 71/100`
  3. Text: "0.07 has only 7 hundredths. 0.7 has 70 hundredths. 0.71 has 71 hundredths. Converting to the same unit makes comparison easy!"
  4. Confetti burst: 15 particles in cyan and purple
  5. An insight card appears (background `#7c3aed20`, border-left 4px solid `#a78bfa`, padding 16px):
     - "Key Insight: To compare decimals, think in hundredths (or thousandths). The number of digits after the decimal point does NOT tell you which number is bigger."
     - i18n key: `lesson.decimals.stage3.keyInsight`
- If incorrect:
  1. Misplaced slots flash red briefly (0.3s)
  2. Hint: "Try converting each number to hundredths first. How many hundredths is 0.07? How many is 0.7?" (i18n key: `lesson.decimals.stage3.prompt5.hint`)
  3. Chips remain draggable for retry

**Acknowledgment**: Continue button appears after insight card.

### Accessibility (Stage 3)
- Grid visualizations have `aria-label`: "Grid showing 0.9: 90 out of 100 cells shaded" / "Grid showing 0.45: 45 out of 100 cells shaded"
- Comparison buttons have `role="radio"` within a `role="radiogroup"` labeled "Which is bigger?"
- Drag-and-drop has keyboard alternative: Tab to select a chip (highlighted), arrow keys to move between slots, Enter to place
- All prompts are in screen-reader-accessible text containers with `role="status"` for dynamic updates
- Validation results announced via `aria-live="assertive"`: "Correct! 0.8 is bigger than 0.62" / "Not quite. Try again."

---

## 6. Stage 4: Symbol Bridge (2-3 minutes)

### Purpose
Overlay formal decimal notation onto the already-established grid and number line models. The student now sees that each decimal place has a name (tenths, hundredths, thousandths), a fractional value (1/10, 1/100, 1/1000), and a spatial meaning (column on the grid, segment on the number line).

### Layout
Full viewport. Same dark background. A static 10x10 grid is displayed on the left (or top on mobile) with 35 cells shaded (representing 0.35). Notation appears alongside to the right (or below on mobile).

### Visual Baseline
Show a static 10x10 grid configured with 35 cells shaded (3 full columns + 5 cells in the 4th column):
- 3 full columns in orange-amber (`#f59e0b80`) — representing 3 tenths
- 5 cells in the 4th column in rose (`#fb718580`) — representing 5 hundredths
- Remaining cells unshaded (`#1e293b`)
- Grid rendered at 60% of Stage 2 size to make room for notation
- Above the grid: `0.35` displayed large (40px, white, bold)

### Animation Sequence

The notation fades in one step at a time, positioned to the right of the grid (or below on mobile). Each step uses KaTeX for clean math rendering.

#### Step 1 (0.0s - 1.5s): Ones place context
- A label appears next to the decimal point in the displayed `0.35`:
  - KaTeX: `0 \text{ ones}`
  - Color: `#f8fafc` (white) at 60% opacity
  - Font size: `clamp(14px, 3vw, 18px)`
- A small arrow points from the `0` before the decimal point to the label
- The `0` in `0.35` gets a subtle pulse
- Duration: 1.5s including settle

#### Step 2 (1.5s - 3.5s): Tenths notation
- A horizontal arrow draws from the 3 shaded columns on the grid to a notation block:
  - KaTeX: `3 \times \frac{1}{10} = \frac{3}{10} = 0.3`
  - Color: `#f59e0b` (amber)
  - Font size: `clamp(14px, 3vw, 18px)`
- Arrow: 2px, amber, 30px long, with arrowhead
- Fade-in: `opacity: 0 -> 1`, `translateX: -10px -> 0`, 0.4s, `ease: "easeOut"`
- The 3 shaded columns briefly pulse simultaneously (coordinated highlight — amber glow flash 0.3s)
- The `3` digit in `0.35` gets an amber underline that draws in (0.3s)
- Below the equation, a label appears: **"Tenths place: first digit right of the point"** in amber, 12px, italic

#### Step 3 (3.5s - 5.5s): Hundredths notation
- Same pattern, for the 5 individual cells:
  - KaTeX: `5 \times \frac{1}{100} = \frac{5}{100} = 0.05`
  - Color: `#fb7185` (rose)
- Arrow from the 5 cells to notation
- The 5 cells pulse with rose glow
- The `5` digit in `0.35` gets a rose underline
- Below: **"Hundredths place: second digit right of the point"** in rose, 12px, italic

#### Step 4 (5.5s - 7.5s): Combined expanded form
- Below the two notation lines, a horizontal rule draws across (same as in NO-1.1, slate-500, 2px, 0.3s)
- Below the rule, the complete expanded decimal form fades in:
  - KaTeX: `0.35 = 3 \times \frac{1}{10} + 5 \times \frac{1}{100} = \frac{35}{100}`
  - Each term colored to match:
    - `3 \times \frac{1}{10}` in amber
    - `5 \times \frac{1}{100}` in rose
    - `+` and `=` in white
  - Font size: `clamp(14px, 3vw, 18px)`
  - Animation: `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.6s, `ease: "easeOut"`

#### Step 5 (7.5s - 9.0s): The 1/10 pattern
- Below the expanded form, an insight line fades in:
  - Text: "Each place is 1/10 of the place to its left — the same ×10 pattern from place value, but going RIGHT!"
  - i18n key: `lesson.decimals.stage4.patternInsight`
  - Color: `#e2e8f0` (slate-200), font-size 14px, italic
  - Accompanied by a diagram showing the progression:
    ```
    Ones → Tenths → Hundredths → Thousandths
      1      0.1      0.01        0.001
         ÷10     ÷10       ÷10
    ```
  - Each place name is colored:
    - Ones: white
    - Tenths: `#f59e0b` (amber)
    - Hundredths: `#fb7185` (rose)
    - Thousandths: `#a78bfa` (purple)
  - The `÷10` labels: `#94a3b8` (slate-400), on curved arrows between each pair
  - Arrows fade in sequentially (0.3s each, 0.2s stagger)

#### Step 6 (9.0s - 10.5s): Connection to whole-number place value
- A final connection line fades in, linking this to the prior lesson:
  - Text: "Place value goes BOTH directions from the ones place. Left = bigger (×10). Right = smaller (÷10). The decimal point marks the center."
  - i18n key: `lesson.decimals.stage4.bothDirections`
  - Color: `#e2e8f0`, font-size 14px
  - A mini diagram:
    ```
    ... Thousands  Hundreds  Tens  Ones . Tenths  Hundredths  Thousandths ...
           ×10       ×10     ×10    1     ÷10       ÷10          ÷10
    ```
  - The `.` (decimal point) is rendered large (20px) in bright white with a pulsing glow
  - Left side labels in the NO-1.1 colors (purple, blue, cyan, green)
  - Right side labels in the new decimal colors (amber, rose, purple)

### Continue Button
- Appears 1s after the final animation step completes
- Same style as previous continue buttons

### Accessibility (Stage 4)
- All KaTeX expressions have `aria-label` attributes: "3 times one-tenth equals three-tenths equals 0.3"
- The pattern diagram is described: "Each place is one-tenth of the place to its left: ones, then tenths, then hundredths, then thousandths"
- `prefers-reduced-motion`: all notation appears simultaneously with a single 0.5s fade-in
- Color-coded digits in `0.35` also have positional labels visible to screen readers

---

## 7. Stage 5: Real-World Anchor (1-2 minutes)

### Purpose
Connect the abstract concept of decimals to concrete, memorable real-world scenarios that 11-12-year-old students encounter daily. Create multiple retrieval paths in semantic memory.

### Layout
Scrollable card list. Each scenario is a card. Dark background, max-width 640px, centered.

### Scenario Cards

Each card has:
- An icon (SVG, 40px, rendered inline)
- A title (18px, white, bold)
- A body (16px, slate-200, line-height 1.6)
- A highlighted decimal example within the body
- Background: `#1e293b`, border-radius 16px, padding 20px, margin-bottom 16px
- Entry animation: slide up from bottom (`translateY: 24px -> 0`, `opacity: 0 -> 1`, 0.4s, stagger 0.2s between cards)

#### Card 1: Sprint Timing

- **Icon**: Stopwatch (SVG: circle with two tick marks at top and a single hand, stroke `#22d3ee`)
- **Title**: "Every Hundredth Counts"
- **Body**: "Usain Bolt's world record 100m sprint: **9.58** seconds. The silver medalist ran **9.69** seconds. The difference? Just **0.11** seconds — eleven hundredths of a second! That tiny decimal was worth Olympic gold."
- **Highlight**: `9.58` and `9.69` displayed side by side with digit coloring:
  - `9` in white (ones), `.` in bright white, `5`/`6` in amber (tenths), `8`/`9` in rose (hundredths)
  - Below, the difference `0.11` is highlighted in green with an animated bracket connecting the two times
- i18n key: `lesson.decimals.stage5.card1`

#### Card 2: Money

- **Icon**: Dollar sign in circle (SVG: circle stroke `#34d399`, `$` text inside)
- **Title**: "Dollars and Cents ARE Decimals"
- **Body**: "When you see **$3.49**, you're reading a decimal! The 3 is 3 whole dollars. The 4 is 4 tenths of a dollar (40 cents). The 9 is 9 hundredths of a dollar (9 cents). Every price tag is a decimal lesson."
- **Highlight**: `$3.49` displayed with digit coloring:
  - `3` in white (ones/dollars), `4` in amber (tenths/dimes), `9` in rose (hundredths/pennies)
  - Below: `= 3 dollars + 4 dimes + 9 pennies` in matching colors, 14px
- i18n key: `lesson.decimals.stage5.card2`

#### Card 3: Body Temperature

- **Icon**: Thermometer (SVG: vertical bar with bulb at bottom, stroke `#f87171`, partial fill in red)
- **Title**: "Tenths That Matter"
- **Body**: "Normal body temperature is **98.6°F**. A fever starts at **100.4°F**. That's only a **1.8** degree difference — less than 2 degrees! Doctors use tenths because whole numbers aren't precise enough for health."
- **Highlight**: `98.6` and `100.4` with the tenths digits (`.6` and `.4`) highlighted in amber
- i18n key: `lesson.decimals.stage5.card3`

#### Card 4: Gaming & Ratings

- **Icon**: Star (SVG: 5-pointed star, stroke `#fbbf24`, half-fill)
- **Title**: "Ratings Get Real"
- **Body**: "Your favorite game has a **4.7** star rating while another has **4.65** stars. Which is better? 4.7 = 4.70, and 4.70 > 4.65. The trailing zero trick makes it clear!"
- **Highlight**: `4.7` morphs to `4.70` (subtle animated zero slide-in), then shows `4.70 > 4.65` with a green `>` sign
- i18n key: `lesson.decimals.stage5.card4`

### Continue Button
- Appears at the bottom of the card list after all cards have animated in (0.2s delay after last card)
- The student can scroll to read all cards, then tap Continue
- If the viewport is tall enough to show all cards without scrolling, Continue appears immediately after animations

### Accessibility (Stage 5)
- Cards are `<article>` elements with `role="article"`
- Icons have `aria-hidden="true"` (decorative, described by card title)
- Highlighted numbers are wrapped in `<mark>` with appropriate `aria-label`: "nine point five eight seconds"
- Temperature degree symbol has `aria-label="degrees Fahrenheit"`

---

## 8. Stage 6: Practice (5-10 minutes)

### Purpose
Retrieval practice across three cognitive layers: recall, procedure, and understanding. Each correct answer is followed by a brief explanation. 9 problems total, NO free-text input for graded answers.

### General Practice UI

Each problem is presented in a `ProblemCard` component:
- Background: `#1e293b`, border-radius 16px, padding 24px
- Max-width: 640px, centered
- Top: Problem number and layer badge (e.g., "Problem 1 of 9" / "Recall" in a small pill)
- Center: Problem content (varies by problem type)
- Bottom: Answer input area (varies by problem type)

Progress bar at the top of the viewport:
- 9 dots, each dot 12px circle
- Unfilled: `#334155`
- Current: pulsing border in primary color (`#8b5cf6`)
- Correct: `#34d399` (green)
- Incorrect: `#f87171` (red)

### Layer 0: Recall (Problems 1-3)

#### Problem 1: Digit Place Identification

**Prompt**: "What place is the 7 in: 0.47?"
- i18n key: `lesson.decimals.practice.p1.prompt`

**Visual**: The number `0.47` displayed large (48px) with each digit color-coded:
- `0` in white (ones)
- `.` in bright white (decimal point, with a subtle glow)
- `4` in amber (tenths)
- `7` in rose (hundredths)
- The `7` has a pulsing glow ring in rose (`box-shadow: 0 0 0 4px #fb718580`)
- Below each digit, a subtle label: "O", ".", "T", "H" in the matching color, font-size 10px, opacity 0.5

**Input**: Four multiple-choice buttons, horizontally arranged:
- `Ones` (button A)
- `Tenths` (button B)
- `Hundredths` (button C)
- `Thousandths` (button D)
- Each button: `min-width: 100px`, height 48px, `border-radius: 12px`, `background: #334155`, `color: #f8fafc`, font-size 16px
- Meets 44px touch target

**Correct answer**: `Hundredths` (C)

**Feedback on correct**:
1. Button C turns green (background `#34d39920`, border `#34d399`)
2. The `7` in the number above gets a bright rose glow
3. Green checkmark fades in (0.3s)
4. Text: "Correct! The 7 is in the hundredths place — the second digit after the decimal point. It's worth 7/100 = 0.07." (green, 16px)
5. Feedback stays visible until "Next" tapped
- i18n key: `lesson.decimals.practice.p1.correct`

**Feedback on incorrect** (e.g., student taps `Tenths`):
1. Tapped button briefly flashes red (0.2s)
2. Text: "Not quite. The tenths place is the FIRST digit after the decimal point (that's the 4). The 7 is one more spot to the right — the hundredths place." (rose-400, 14px)
3. Buttons remain active for retry
4. After 2 seconds, the correct answer gets a subtle pulsing border hint
- i18n key: `lesson.decimals.practice.p1.incorrect`

#### Problem 2: Decimal Value Reading

**Prompt**: "What decimal does this grid show?"
- i18n key: `lesson.decimals.practice.p2.prompt`

**Visual**: A 10x10 grid (180px square) with 63 cells shaded:
- 6 full columns shaded in cyan (`#22d3ee80`)
- 3 additional cells in the 7th column shaded in cyan
- Grid has 1px gap lines in `#334155`
- Below the grid: "63 cells shaded out of 100" in `#94a3b8`, 12px

**Input**: Four multiple-choice buttons, vertically stacked:
- `6.3` (button A)
- `0.63` (button B)
- `0.063` (button C)
- `63.0` (button D)
- Each button: full-width (max 400px), 48px height, `border-radius: 12px`, `background: #334155`, left-aligned text, 18px font

**Correct answer**: `0.63` (B)

**Feedback on correct**:
1. Button B turns green
2. On the grid, column labels appear above each shaded column: "0.1" six times, then the 3 extra cells are bracketed with "0.03"
3. Text: "Yes! 63 out of 100 cells = 63/100 = 0.63. Six tenths (6 columns) and three hundredths (3 cells)."
- i18n key: `lesson.decimals.practice.p2.correct`

**Feedback on incorrect** (e.g., student taps `6.3`):
1. Flash red
2. Text: "Careful! The whole grid equals 1.0, not 10. So 63 cells out of 100 = 63/100 = 0.63, not 6.3."
- i18n key: `lesson.decimals.practice.p2.incorrect`

#### Problem 3: Fraction-to-Decimal Conversion

**Prompt**: "What is 3/10 as a decimal?"
- i18n key: `lesson.decimals.practice.p3.prompt`

**Visual**: The fraction `3/10` displayed large using KaTeX:
- KaTeX: `\frac{3}{10}`
- Font size: 48px equivalent
- Color: amber (`#f59e0b`)
- Below it, a mini 10x10 grid with 3 full columns shaded (amber), showing the fraction visually
- The grid fades in 0.5s after the fraction appears

**Input**: Four multiple-choice buttons:
- `0.03` (button A)
- `0.3` (button B)
- `3.0` (button C)
- `0.310` (button D)
- Same button styling as above

**Correct answer**: `0.3` (B)

**Feedback on correct**:
1. Button B turns green
2. On the mini grid, a label appears: "3 columns = 3 tenths = 0.3" in amber
3. Arrow animation from the fraction `3/10` to the decimal `0.3` with a morphing effect (fraction dissolves, decimal forms)
4. Text: "3/10 = 0.3. The denominator 10 tells you it's tenths. Three tenths = 0.3."
- i18n key: `lesson.decimals.practice.p3.correct`

**Feedback on incorrect** (e.g., student taps `0.03`):
1. Flash red
2. Text: "Not quite. 0.03 would be 3 hundredths (3/100). But this is 3/10 — tenths, not hundredths. Tenths go in the first place after the decimal point."
- i18n key: `lesson.decimals.practice.p3.incorrect`

### Layer 1: Procedure (Problems 4-6)

#### Problem 4: Decimal Comparison

**Prompt**: "Which is greater: 0.6 or 0.52?"
- i18n key: `lesson.decimals.practice.p4.prompt`

**Visual**: Both numbers displayed side by side, large (40px), white:
```
  0.6          0.52
```
- Between them: a large `?` in a circle (36px, `#94a3b8`)
- Below each number, a mini 10x10 grid (120px square):
  - Left grid: 6 full columns shaded (cyan) = 60 cells
  - Right grid: 5 full columns + 2 cells shaded (purple) = 52 cells
  - Grids animate in (fade, 0.3s) after a 0.5s delay

**Input**: Two buttons side by side:
- Left: `0.6` (28px, bold)
- Right: `0.52` (28px, bold)
- Button style: 120px wide, 56px tall, `border-radius: 12px`, `background: #334155`

**Correct answer**: `0.6`

**Feedback on correct**:
1. The `?` between them morphs into `>` (0.3s morph animation, green)
2. Below both grids, comparison labels appear:
   - "60 hundredths" under the left grid (cyan)
   - "52 hundredths" under the right grid (purple)
3. Text: "0.6 = 0.60 = 60 hundredths. 0.52 = 52 hundredths. 60 > 52, so 0.6 > 0.52. The trailing zero trick makes it clear!"
4. The transformation `0.6 → 0.60` animates above the left grid (zero slides in from right)
- i18n key: `lesson.decimals.practice.p4.correct`

**Feedback on incorrect**:
1. Flash red
2. Text: "Think about it with the grid: 0.6 fills 6 whole columns (60 cells), but 0.52 fills only 5 columns plus 2 cells (52 cells). 0.6 covers MORE of the grid."
- i18n key: `lesson.decimals.practice.p4.incorrect`

#### Problem 5: Place on Number Line (Interactive)

**Prompt**: "Drag the point to 0.35 on the number line."
- i18n key: `lesson.decimals.practice.p5.prompt`

**Visual**: A number line from 0 to 1:
- Line: horizontal, centered, 85% of viewport width
- Major tick marks at 0, 0.5, and 1 (12px, white labels 18px)
- Minor tick marks at every 0.1 (8px, cyan labels 12px)
- A draggable point (circle, 20px, `#818cf8` fill, `#c4b5fd` stroke 2px)
- The point starts at position 0
- Above the point: live-updating value label (16px, white, `tabular-nums`)

**Input**: Drag the point along the number line.
- As student drags, the value updates in real-time (snapping to nearest 0.05 for usability)
- Snap points at every 0.05 with 8px magnetic radius
- A "Check" button appears below the number line after the student moves the point
- Button: 120px wide, 48px tall, primary purple style

**Correct answer**: Point placed at 0.35 (accepted range: 0.33 to 0.37 for tolerance)

**Feedback on correct**:
1. Point snaps to exact 0.35 position with `spring` animation
2. Green checkmark appears above the point
3. A bracket appears from 0.3 to 0.4, with 0.35 marked at the midpoint-minus-one-tick:
   - "0.35 is between 0.3 and 0.4 — exactly halfway is 0.35"
4. Text: "0.35 is 3 tenths and 5 hundredths past zero. On the number line, that's just past the 0.3 mark."
- i18n key: `lesson.decimals.practice.p5.correct`

**Feedback on incorrect** (point placed too far from 0.35):
1. The point gets a red ring pulse
2. A ghost marker appears at the correct position (0.35) with a dotted line from the student's position to it
3. Text: "Not quite! 0.35 should be between 0.3 and 0.4, closer to the 0.3 side. Look at the tenths marks to guide you."
4. Student can retry (drag the point again and re-check)
- i18n key: `lesson.decimals.practice.p5.incorrect`

#### Problem 6: Order Decimals (Drag-to-Arrange)

**Prompt**: "Order from least to greatest: 0.4, 0.09, 0.41, 0.399"
- i18n key: `lesson.decimals.practice.p6.prompt`

**Visual**: Four number cards, initially in the given order:
- Each card: `min-width: 80px`, height 52px, `border-radius: 12px`, `background: #334155`, font-size 20px, white text, centered, `tabular-nums`
- Cards are horizontally arranged with 12px gaps (2x2 grid on mobile < 400px)
- Below the cards: four numbered slots (1, 2, 3, 4) labeled "Least" at slot 1, "Greatest" at slot 4

**Input**: Drag-to-reorder. Student drags cards into the desired order.
- During drag: lifted card has `scale: 1.05`, `shadow: 0 8px 24px rgba(0,0,0,0.4)`, `z-index: 10`
- Drop: card slots into position with `spring({ damping: 20, stiffness: 300 })`
- Alternatively: tap a card to select it (highlighted border `#818cf8`), tap a slot to place it

**Correct order**: `0.09`, `0.399`, `0.4`, `0.41`

**Feedback on correct**:
1. All four cards turn green (border `#34d399`)
2. Below each card, the thousandths equivalent fades in (12px, `#94a3b8`):
   - `0.09 = 0.090 = 90/1000`
   - `0.399 = 399/1000`
   - `0.4 = 0.400 = 400/1000`
   - `0.41 = 0.410 = 410/1000`
3. Text: "Converting to thousandths makes it clear: 90 < 399 < 400 < 410. Notice that 0.4 > 0.399 even though 0.399 has more digits!"
4. The phrase "more digits" is bold and amber-colored (directly addresses the misconception)
- i18n key: `lesson.decimals.practice.p6.correct`

**Feedback on incorrect**:
1. Misplaced cards flash red briefly
2. Hint: "Try writing each number with 3 decimal places: 0.090, 0.399, 0.400, 0.410. Now compare the numbers!"
- i18n key: `lesson.decimals.practice.p6.hint`

### Layer 2: Understanding (Problems 7-9)

#### Problem 7: Misconception Buster

**Prompt**: "Sarah says 0.45 > 0.9 because 45 > 9. Why is Sarah wrong?"
- i18n key: `lesson.decimals.practice.p7.prompt`

**Input**: Four multiple-choice options, vertically stacked:
- A: "Because 0.45 has more digits so it must be smaller" (wrong reasoning — this reverses the misconception without understanding)
- B: "Because 0.9 = 0.90, and 90 hundredths > 45 hundredths" (correct reasoning)
- C: "Because 9 is an odd number and 45 is not" (nonsense distractor)
- D: "Because you can't compare decimals with different numbers of digits" (wrong — you can)
- Each button: full-width (max 480px), `min-height: 56px`, `border-radius: 12px`, `background: #334155`, left-aligned text, 16px, padding 16px
- Text wraps within the button

**Correct answer**: B

**Feedback on correct**:
1. Button B turns green
2. A side-by-side mini grid animation plays:
   - Left grid: 90 cells shade in (for 0.9)
   - Right grid: 45 cells shade in (for 0.45)
   - Clear visual that the left grid has more coverage
3. Text: "Exactly! Sarah treated the digits after the decimal point as a whole number. But 0.9 = 0.90 = 90/100, and 90 > 45. Adding a trailing zero reveals the truth."
- i18n key: `lesson.decimals.practice.p7.correct`

**Feedback on incorrect** (e.g., student picks A):
1. Flash red
2. Text for A: "Not quite. The number of digits doesn't automatically make a number bigger OR smaller. The key is to compare using the same unit. 0.9 = 0.90 = 90 hundredths, and 0.45 = 45 hundredths. 90 > 45."
- i18n key: `lesson.decimals.practice.p7.incorrectA`

#### Problem 8: Fraction-Decimal-Grid Connection

**Prompt**: "Shade the grid to show 0.08. How many columns is that?"
- i18n key: `lesson.decimals.practice.p8.prompt`

**Visual**: An interactive 10x10 grid (200px square), all cells unshaded initially:
- Cells are tappable (same interaction as Stage 2 grid)
- Above the grid: target value "0.08" in white, 32px, bold
- Below the grid: live counter "X cells shaded" in `#94a3b8`, 14px

**Input**: Tap cells to shade them. A "Check" button (primary purple, 120px x 48px) appears below the counter.

**Correct answer**: Exactly 8 cells shaded (placement doesn't matter, but the expected pattern is 8 cells in the first column from top to bottom, or any 8 cells)

**Validation**: On "Check" tap:
- If correct (8 cells shaded):
  1. All 8 shaded cells flash green briefly
  2. Green checkmark
  3. The cells rearrange smoothly into a single column minus 2 cells, demonstrating it's less than one full column (0.1)
  4. Text: "8 cells = 8/100 = 0.08. That's ZERO full columns (zero tenths) and 8 individual cells (8 hundredths). It's less than a single column!"
  5. Below: a follow-up note: "This is why 0.08 < 0.8. 0.8 = 80 cells (8 whole columns), but 0.08 is just 8 cells."
  - i18n key: `lesson.decimals.practice.p8.correct`
- If incorrect:
  1. Shaded count flashes red
  2. Text: "0.08 means 8 hundredths. Each cell is one hundredth. How many cells should you shade?" (Hint: the target is 8 cells)
  3. Grid remains interactive for retry
  - i18n key: `lesson.decimals.practice.p8.incorrect`

#### Problem 9: Conceptual True/False Sequence

**Prompt**: "Are these statements TRUE or FALSE? Tap each one."
- i18n key: `lesson.decimals.practice.p9.prompt`

**Input**: Three statements, each with a True/False toggle:
- Each statement is a card (background `#1e293b`, border-radius 12px, padding 16px, margin-bottom 12px)
- Statement text: 16px, `#e2e8f0`, left-aligned
- True/False: two toggle buttons at the right side of each card, 44px x 36px each, `border-radius: 8px`
  - Unselected: `background: #334155`, text `#94a3b8`
  - Selected True: `background: #34d39920`, text `#34d399`, border `1px solid #34d399`
  - Selected False: `background: #f8717120`, text `#f87171`, border `1px solid #f87171`

**Statements**:

| # | Statement | Correct Answer | i18n Key |
|---|-----------|---------------|----------|
| 1 | "0.5 = 0.50" | TRUE | `lesson.decimals.practice.p9.s1` |
| 2 | "0.30 > 0.3" | FALSE | `lesson.decimals.practice.p9.s2` |
| 3 | "0.19 > 0.2" | FALSE | `lesson.decimals.practice.p9.s3` |

**Validation**: A "Check All" button (primary purple) appears after all three toggles have been set.

On "Check All":
- Each statement individually shows correct/incorrect:
  - Correct: card border turns green, small checkmark icon
  - Incorrect: card border turns red, small X icon, the correct answer flashes
- Below all three statements, feedback appears:
  1. For S1: "0.5 and 0.50 are the same — trailing zeros don't change the value." (green if correct, informational if incorrect)
  2. For S2: "0.30 and 0.3 are equal, not greater. 0.30 = 0.3. Trailing zeros again!" (green/info)
  3. For S3: "0.19 = 19/100 = 0.190. 0.2 = 20/100 = 0.200. 19 < 20, so 0.19 < 0.2." (green/info)
- i18n keys: `lesson.decimals.practice.p9.fb1`, `.fb2`, `.fb3`

### Practice XP Calculation

| Factor | XP |
|--------|----|
| Correct on first try | 15 XP |
| Correct on second try | 8 XP |
| Correct on third+ try | 4 XP |
| All 9 correct on first try | +20 XP bonus (Perfect Practice) |
| Completing practice stage | +10 XP (participation) |
| Total possible range | 135 + 20 + 10 = **165 XP max** |

### Accessibility (Stage 6)
- Multiple-choice buttons have `role="radio"` within a `role="radiogroup"`
- Drag-to-arrange (P6) has keyboard alternative: Tab + Enter to pick up, arrow keys to reorder, Enter to place
- Number line drag (P5) has keyboard alternative: Left/Right arrow keys, value announced via `aria-live`
- Grid interaction (P8) supports keyboard: arrow keys to navigate cells, Space/Enter to toggle, count announced
- True/False toggles have `role="switch"` with `aria-checked`
- Feedback is announced via `aria-live="assertive"` for correctness, `aria-live="polite"` for explanations
- No timer — students have unlimited time on each problem

---

## 9. Stage 7: Reflection (~1 minute)

### Purpose
Metacognitive self-explanation. The student consolidates their understanding by generating an explanation in their own words. This is the highest-value learning activity per the self-explanation effect research (Chi et al., 1989).

### Layout
Centered card, max-width 640px. Dark background.

### Prompt

**Card** (background `#1e293b`, border-radius 16px, padding 24px):
- **Header**: "Reflection" in a small pill badge (background `#7c3aed20`, text `#a78bfa`, 12px, uppercase, letter-spacing 1px)
- **Prompt text**: "Your friend says 0.45 is bigger than 0.9 'because 45 is bigger than 9.' How would you explain why they're wrong?"
  - i18n key: `lesson.decimals.stage7.prompt`
  - Font: 18px, `#f8fafc`, line-height 1.6, font-weight 500
- **Visual hint**: Below the prompt, show two mini 10x10 grids side by side (100px each):
  - Left grid: 90 cells shaded (cyan), labeled "0.9" above
  - Right grid: 45 cells shaded (purple), labeled "0.45" above
  - Between them: a `>` sign in green
  - This is visible before the student starts typing, to prime their thinking

### Input

**Text area**:
- Min height: 120px, auto-grow to max 240px
- Placeholder: "I would tell my friend that..." (i18n key: `lesson.decimals.stage7.placeholder`)
- Character counter: `{current} / 20 minimum`
  - Color: `#64748b` (slate-500) when below minimum, `#34d399` (green) when minimum reached
  - Position: bottom-right of text area
- Border: 1px solid `#475569`, `border-radius: 12px`, padding 16px
- Background: `#0f172a`
- Font: 16px, `#e2e8f0`, line-height 1.6

**Submit button**:
- Disabled until 20+ characters entered (opacity 0.4, no pointer-events)
- Enabled: primary purple button (`#8b5cf6`), "Submit Reflection" text
- Size: full width, 52px tall, `border-radius: 12px`
- Loading state: spinner replaces text during AI evaluation

**Skip button**:
- Below the submit button, smaller and de-emphasized
- Text: "Skip" in `#64748b`, 14px, no background, underline on hover
- Size: auto-width, 36px tall
- On tap: skips to lesson completion (0 XP for reflection)

### After Submission

1. **AI Evaluation** (via `lesson.submitReflection` tRPC endpoint):
   - The response is sent to the Claude API for quality scoring
   - Typical response time: 1-2 seconds
   - During evaluation: submit button shows spinner, text area becomes read-only

2. **Feedback Display** (0.5s fade-in after evaluation returns):

   **Quality indicator**: 0-5 filled stars (star icons, 24px)
   - 0-1 stars: "Keep practicing your explanations!" (encouraging, not punitive)
   - 2-3 stars: "Good start! You're on the right track."
   - 4-5 stars: "Excellent explanation! You really understand this."

   **AI feedback text**: A 1-3 sentence personalized response, displayed in a card:
   - Background: `#0f172a`, border-left: 4px solid `#8b5cf6`, padding 16px
   - Font: 14px, `#cbd5e1` (slate-300), italic

   **XP earned**: Displayed as a floating "+{amount} XP" badge that animates upward and fades (0.8s):
   - Range: 0-80 XP based on quality (Constitution: XP weighted toward explanation quality)
   - Color: `#fbbf24` (amber)

3. **Confirmation Visual** (appears simultaneously with feedback):
   - An animation replaying the core insight:
     - `0.9` displayed, then a trailing zero slides in: `0.90`
     - `0.45` displayed alongside
     - Both morph into fraction form: `90/100` vs `45/100`
     - The `90/100` is clearly larger (green highlight), `45/100` smaller
     - Below: "90 hundredths > 45 hundredths. Position, not digit count, determines value."
   - Animation duration: 2.0s total
   - This reinforces the lesson's core concept one final time

4. **Lesson Complete**:
   - After feedback, a "Complete Lesson" button fades in (1s delay)
   - Same primary button style
   - On tap: triggers the lesson completion flow:
     - XP summary animation (total XP earned across all stages, shown as a counting-up number)
     - Achievement check (may trigger achievements for lesson completion streaks)
     - SRS state update: marks NO-1.3 as "learning" at recall layer (layer 0)
     - Unlocks successor topics: NO-1.3a (Decimal Operations), NO-1.4b (Fractions/Decimals/Percents), NO-1.8 (Scientific Notation) become "available" in the Knowledge Nebula
     - Redirects to the lesson summary screen or back to the learn page

### Accessibility (Stage 7)
- Prompt is in a `<label>` element linked to the text area via `for`/`id`
- Star rating is announced via `aria-live`: "Your reflection scored 4 out of 5 stars"
- AI feedback is in an `aria-live="polite"` region
- The confirmation visual has an `aria-label` describing the concept: "0.9 equals 90 hundredths. 0.45 equals 45 hundredths. 90 hundredths is greater than 45 hundredths."
- Skip button has `aria-label="Skip reflection (0 XP earned)"`

---

## 10. Technical Specifications

### Color Palette (Decimals)

| Element | Primary | Fill (20%) | CSS Variable |
|---------|---------|------------|-------------|
| Tenths | `#f59e0b` (amber) | `#f59e0b33` | `--dec-tenths` |
| Hundredths | `#fb7185` (rose) | `#fb718533` | `--dec-hundredths` |
| Thousandths | `#a78bfa` (purple) | `#a78bfa33` | `--dec-thousandths` |
| Grid cell shaded | `#818cf8` (indigo) | `#818cf880` | `--dec-cell-active` |
| Number line point | `#818cf8` (indigo) | -- | `--dec-point` |
| Zoom level 1 ticks | `#22d3ee` (cyan) | -- | `--dec-zoom1` |
| Zoom level 2 ticks | `#a78bfa` (purple) | -- | `--dec-zoom2` |
| Zoom level 3 ticks | `#f59e0b` (amber) | -- | `--dec-zoom3` |
| Background (dark) | `#0f172a` | -- | `--bg-primary` |
| Surface | `#1e293b` | -- | `--bg-surface` |
| Text primary | `#f8fafc` | -- | `--text-primary` |
| Text secondary | `#e2e8f0` | -- | `--text-secondary` |
| Text muted | `#94a3b8` | -- | `--text-muted` |
| Success | `#34d399` | -- | `--color-success` |
| Error | `#f87171` | -- | `--color-error` |
| Warning | `#fbbf24` | -- | `--color-warning` |
| XP | `#fbbf24` | -- | `--color-xp` |
| Primary action | `#8b5cf6` | -- | `--color-primary` |

### Accessibility: Color-Blind Safety

The decimal place-value colors were chosen to be distinguishable under the three most common forms of color vision deficiency:

| Color | Protanopia | Deuteranopia | Tritanopia |
|-------|-----------|-------------|-----------|
| Amber `#f59e0b` (tenths) | Yellow-brown | Yellow-brown | Pink-red |
| Rose `#fb7185` (hundredths) | Gray-brown | Gray-yellow | Pink-red |
| Purple `#a78bfa` (thousandths) | Blue-gray | Blue-gray | Blue-gray |
| Indigo `#818cf8` (grid cells) | Blue | Blue | Blue-pink |

All four remain distinguishable under each deficiency. Per Constitution Principle IV, color is never the SOLE channel for meaning. Every color-coded element also has:
- A text label (e.g., "Tenths", "Hundredths", "Thousandths")
- A position (left-to-right after the decimal point)
- For grids: cell count as a numeric display

### Typography

| Element | Font | Size | Weight | Features |
|---------|------|------|--------|----------|
| Large decimals | System mono / JetBrains Mono | `clamp(36px, 8vw, 56px)` | 700 | `tabular-nums`, `font-variant-numeric: tabular-nums` |
| Inline decimals | System mono | `clamp(16px, 3.5vw, 22px)` | 600 | `tabular-nums` |
| Body text | System sans (Inter preferred) | 16px | 400 | `line-height: 1.6` |
| Labels | System sans | `clamp(10px, 2.5vw, 14px)` | 600 | `text-transform: uppercase`, `letter-spacing: 0.5px` |
| KaTeX math | KaTeX default | `clamp(16px, 3.5vw, 22px)` | -- | Uses KaTeX's own rendering |
| Button text | System sans | 16px | 600 | -- |
| Grid cell labels | System mono | 10px | 400 | `tabular-nums` |

### Animation Specifications

#### Global Animation Config

```typescript
const ANIMATION_CONFIG = {
  // Spring presets
  spring: {
    default: { damping: 20, stiffness: 300 },
    gentle: { damping: 25, stiffness: 200 },
    bouncy: { damping: 12, stiffness: 400 },
    stiff: { damping: 30, stiffness: 500 },
    pop: { damping: 15, stiffness: 400 },
  },
  // Duration presets (seconds)
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    dramatic: 0.8,
  },
  // Ease presets
  ease: {
    default: "easeInOut",
    enter: "easeOut",
    exit: "easeIn",
    bounce: "easeOutBack",
  },
} as const;
```

#### Framer Motion Variants (commonly used)

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

const zoomTransition = {
  initial: { scale: 1 },
  animate: { scale: 1 },
  transition: { type: "spring", damping: 22, stiffness: 250, duration: 0.5 },
};
```

#### Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- All spring animations become simple `opacity` transitions (0.3s)
- No `scale`, `translate`, or `rotate` animations
- Hook zoom: show tenths labels immediately with fade-in, no zoom animation
- Grid cell shading: instant fill, no pop animation
- Number line zoom: instant range change, no smooth transition
- Particle effects (confetti, ripples, glow) are disabled entirely
- All stagger delays set to 0

```typescript
const useReducedMotion = (): boolean => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
};
```

### Touch & Interaction Targets

| Element | Min Size | Notes |
|---------|----------|-------|
| Grid cells | Variable (40px at 400px grid) | Minimum grid size ensures cells >= 32px; paint-drag compensates for small cells |
| Model toggle segments | 80px x 40px | Within 44px container height |
| Zoom buttons (+/-) | 48px x 48px | Exceeds 44px requirement |
| Decimal comparison buttons | 120px x 56px | Easy to tap on mobile |
| Multiple-choice buttons | full-width x 48px+ | Easy to tap |
| Drag chips (ordering) | 72px x 56px | Large enough for drag initiation |
| True/False toggles | 44px x 36px | Meets 44px width minimum |
| Continue button | 160px x 48px | Prominent, centered |
| Text area | full-width x 120px+ | Auto-growing, comfortable input |
| Number line draggable point | 20px visible, 44px hit area | Invisible touch area expanded beyond visual |

### Gesture Handling

All drag interactions use `@use-gesture/react`:

```typescript
// Number line point drag
const bindPointDrag = useDrag(({ movement: [mx], active, cancel }) => {
  if (Math.abs(mx) < 5 && !active) return; // Small deadzone
  // Convert pixel movement to value change based on current zoom
  // Snap to nearest tick when within magnetic radius
}, {
  filterTaps: true,
  axis: "x",         // Constrain to horizontal
  threshold: 5,
  rubberband: true,
});

// Grid paint-drag
const bindGridDrag = useDrag(({ xy: [x, y], active }) => {
  // Convert screen coordinates to grid cell
  // Shade/unshade cell under finger
  // Track which cells have been touched this drag to avoid toggle-flicker
}, {
  filterTaps: true,
  threshold: 3,
});

// Pinch-to-zoom (number line)
// Uses @use-gesture/react usePinch
const bindPinch = usePinch(({ offset: [scale], active }) => {
  // Map scale to zoom level
  // scale > 1.5: zoom in
  // scale < 0.67: zoom out
}, {
  scaleBounds: { min: 0.5, max: 3 },
});
```

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile S | < 375px | Single column, grid shrinks to `min(85vw, 300px)`, side-by-side grids in Discovery stack vertically, font sizes at `clamp` minimums |
| Mobile M | 375-639px | Single column, grid at `min(80vw, 360px)`, comfortable spacing |
| Tablet | 640-1023px | Stage 2: side-by-side panels (55/45). Practice problems: wider cards. Discovery grids side-by-side. |
| Desktop | >= 1024px | Max-width container (800px), centered. Stage 2: side-by-side with generous spacing. Discovery grids side-by-side with room for labels. |

### Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Animation frame rate | 60fps (P95 >= 55fps) | Framer Motion `onFrame` callback + `PerformanceObserver` |
| SVG element count (grid, max cells) | <= 200 elements | 100 cells + labels + controls + overlays |
| Time to interactive (Stage 2) | < 1.5s | From stage transition to first cell tappable |
| Memory (Stage 2, full grid + number line) | < 15MB | Heap snapshot |
| Cell shade/unshade latency | < 16ms (1 frame) | State update + render |
| Number line zoom animation | Consistent 60fps | No layout thrashing during zoom |
| Hook zoom animation | Consistent 60fps | Smooth tick appearance |

### State Persistence

Lesson progress is persisted to both local storage (Dexie.js) and server (via `lesson.completeStage` tRPC call):

```typescript
interface LessonProgressState {
  lessonId: "NO-1.3";
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
4. If offline: queue the server call for background sync when online

### File Structure

```
src/content/domains/numbers-operations/NO-1.3/
├── lesson.mdx              # Stage text content (i18n-ready)
├── animations.json          # MathScene DSL configs for all stages
├── problems.json            # Practice problem bank (9 problems)
└── meta.json                # Metadata: prerequisites, successors, hooks

src/components/lesson/custom/
└── DecimalsLesson/
    ├── DecimalsLesson.tsx    # Custom lesson component (orchestrates all stages)
    ├── HookZoomAnimation.tsx # Stage 1: cinematic number line zoom
    ├── DecimalGrid.tsx       # 10x10 grid component (interactive, reusable)
    ├── ZoomableNumberLine.tsx# Zoomable number line with pinch/buttons
    ├── DecimalDisplay.tsx    # Live-updating decimal with breakdown
    ├── ModelToggle.tsx       # Grid/NumberLine toggle segmented control
    ├── GridComparison.tsx    # Side-by-side grid comparison (Discovery, Practice)
    ├── DecimalArranger.tsx   # Drag-to-arrange for decimal ordering
    ├── SymbolOverlay.tsx     # Stage 4: notation appearance
    └── index.ts              # Barrel export
```

### i18n Keys (Complete List)

All user-facing strings are externalized. The following keys are added to `src/lib/i18n/messages/en.json` under the `lesson.decimals` namespace:

```
lesson.continue
lesson.decimals.stage2Hint
lesson.decimals.stage3.prompt1
lesson.decimals.stage3.prompt2
lesson.decimals.stage3.prompt3
lesson.decimals.stage3.prompt4
lesson.decimals.stage3.prompt4.correct
lesson.decimals.stage3.prompt4.hint
lesson.decimals.stage3.prompt5
lesson.decimals.stage3.prompt5.correct
lesson.decimals.stage3.prompt5.hint
lesson.decimals.stage3.keyInsight
lesson.decimals.stage4.patternInsight
lesson.decimals.stage4.bothDirections
lesson.decimals.stage5.card1
lesson.decimals.stage5.card2
lesson.decimals.stage5.card3
lesson.decimals.stage5.card4
lesson.decimals.practice.p1.prompt
lesson.decimals.practice.p1.correct
lesson.decimals.practice.p1.incorrect
lesson.decimals.practice.p2.prompt
lesson.decimals.practice.p2.correct
lesson.decimals.practice.p2.incorrect
lesson.decimals.practice.p3.prompt
lesson.decimals.practice.p3.correct
lesson.decimals.practice.p3.incorrect
lesson.decimals.practice.p4.prompt
lesson.decimals.practice.p4.correct
lesson.decimals.practice.p4.incorrect
lesson.decimals.practice.p5.prompt
lesson.decimals.practice.p5.correct
lesson.decimals.practice.p5.incorrect
lesson.decimals.practice.p6.prompt
lesson.decimals.practice.p6.correct
lesson.decimals.practice.p6.hint
lesson.decimals.practice.p7.prompt
lesson.decimals.practice.p7.correct
lesson.decimals.practice.p7.incorrectA
lesson.decimals.practice.p7.incorrectC
lesson.decimals.practice.p7.incorrectD
lesson.decimals.practice.p8.prompt
lesson.decimals.practice.p8.correct
lesson.decimals.practice.p8.incorrect
lesson.decimals.practice.p9.prompt
lesson.decimals.practice.p9.s1
lesson.decimals.practice.p9.s2
lesson.decimals.practice.p9.s3
lesson.decimals.practice.p9.fb1
lesson.decimals.practice.p9.fb2
lesson.decimals.practice.p9.fb3
lesson.decimals.stage7.prompt
lesson.decimals.stage7.placeholder
```

### Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Student navigates away mid-lesson | State persisted to IndexedDB. On return, resume from last completed stage. Show "Welcome back! You left off at Stage {n}." |
| Network offline during Practice | Problems are loaded at stage entry and cached. Submissions queue locally. Sync when online. |
| Network offline during Reflection | Reflection text saved locally. AI evaluation deferred. Show "We'll evaluate your reflection when you're back online." |
| Student submits empty/whitespace reflection | Client-side validation prevents submission. Min 20 chars of non-whitespace. |
| Student submits gibberish reflection | AI evaluator gives 0-1 star score. Feedback: "Try to explain in your own words why 0.9 is bigger than 0.45. Think about the grid!" No punitive action. |
| Grid: student taps cells during paint-drag | `filterTaps: true` in gesture config separates taps from drags. Taps toggle individual cells. Drags paint across cells without toggling previously painted cells in the same stroke. |
| Grid: rapid tapping | Debounce at 100ms. React 18 automatic batching ensures state updates are coalesced. |
| Number line: pinch-to-zoom at max level | Zoom buttons and pinch both cap at level 3 (thousandths). A subtle tooltip appears: "Maximum zoom reached! You're seeing thousandths." |
| Number line: drag point off-screen | Point is constrained to the visible range. `rubberband: true` gives elastic feedback at boundaries. |
| Practice P5: student doesn't move point before checking | "Check" button is disabled until the point has been moved at least 0.05 from its initial position. |
| Practice P8: student shades wrong number of cells | Immediate feedback on "Check" tap. Grid remains interactive for retry. Previous shading is NOT cleared — student can add or remove cells. |
| Practice P9: student changes mind on a toggle | Toggles are freely switchable until "Check All" is tapped. After checking, toggles become disabled. |
| Screen reader with grid | Each cell announces its state on focus: "Row 3, Column 7: unshaded. Tap to shade." Total announced on change. |
| Very slow device (< 30fps detected) | Disable grid cell pop animations (instant fill instead). Disable number line zoom animation (instant range change). Disable particle effects. Log performance warning. |
| RTL layout (future) | Number line and grids work in LTR for mathematical content (numbers are always LTR). Decimal point position is language-independent. UI chrome follows RTL rules. |

---

## Appendix A: Content Files

### meta.json

```json
{
  "id": "NO-1.3",
  "name": "Decimals",
  "domain": "numbers-operations",
  "gradeLevel": 6,
  "prerequisites": ["NO-1.1"],
  "successors": ["NO-1.3a", "NO-1.4b", "NO-1.8"],
  "estimatedMinutes": 25,
  "stages": 7,
  "hook": "What lives between 0 and 1? ZOOM IN to discover infinite decimal precision",
  "tags": ["decimals", "tenths", "hundredths", "thousandths", "place-value", "number-line", "grid-model"],
  "contentLicense": "CC BY-SA 4.0",
  "version": "1.0.0"
}
```

### problems.json (Structure)

```json
{
  "problems": [
    {
      "id": "NO-1.3-P1",
      "layer": 0,
      "type": "place-identification",
      "difficulty": 0.2,
      "prompt": "lesson.decimals.practice.p1.prompt",
      "visual": {
        "number": "0.47",
        "highlight": "hundredths",
        "highlightDigit": "7"
      },
      "answer": {
        "correct": "Hundredths",
        "options": ["Ones", "Tenths", "Hundredths", "Thousandths"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p1.correct",
        "incorrect": "lesson.decimals.practice.p1.incorrect"
      }
    },
    {
      "id": "NO-1.3-P2",
      "layer": 0,
      "type": "grid-reading",
      "difficulty": 0.3,
      "prompt": "lesson.decimals.practice.p2.prompt",
      "visual": {
        "gridSize": 10,
        "shadedCells": 63,
        "shadedPattern": "columns-first"
      },
      "answer": {
        "correct": "0.63",
        "options": ["6.3", "0.63", "0.063", "63.0"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p2.correct",
        "incorrect": "lesson.decimals.practice.p2.incorrect"
      }
    },
    {
      "id": "NO-1.3-P3",
      "layer": 0,
      "type": "fraction-to-decimal",
      "difficulty": 0.25,
      "prompt": "lesson.decimals.practice.p3.prompt",
      "visual": {
        "fraction": { "numerator": 3, "denominator": 10 },
        "showGrid": true,
        "gridShadedColumns": 3
      },
      "answer": {
        "correct": "0.3",
        "options": ["0.03", "0.3", "3.0", "0.310"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p3.correct",
        "incorrect": "lesson.decimals.practice.p3.incorrect"
      }
    },
    {
      "id": "NO-1.3-P4",
      "layer": 1,
      "type": "comparison",
      "difficulty": 0.5,
      "prompt": "lesson.decimals.practice.p4.prompt",
      "visual": {
        "numbers": ["0.6", "0.52"],
        "showGrids": true
      },
      "answer": {
        "correct": "0.6",
        "options": ["0.6", "0.52"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p4.correct",
        "incorrect": "lesson.decimals.practice.p4.incorrect"
      }
    },
    {
      "id": "NO-1.3-P5",
      "layer": 1,
      "type": "number-line-placement",
      "difficulty": 0.6,
      "prompt": "lesson.decimals.practice.p5.prompt",
      "visual": {
        "lineRange": [0, 1],
        "majorTicks": [0, 0.5, 1],
        "minorTicks": "every-0.1",
        "targetValue": 0.35,
        "tolerance": 0.02
      },
      "answer": {
        "correct": 0.35,
        "type": "drag-to-position",
        "tolerance": 0.02
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p5.correct",
        "incorrect": "lesson.decimals.practice.p5.incorrect"
      }
    },
    {
      "id": "NO-1.3-P6",
      "layer": 1,
      "type": "ordering",
      "difficulty": 0.7,
      "prompt": "lesson.decimals.practice.p6.prompt",
      "visual": {
        "numbers": ["0.4", "0.09", "0.41", "0.399"]
      },
      "answer": {
        "correct": ["0.09", "0.399", "0.4", "0.41"],
        "type": "drag-arrange"
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p6.correct",
        "incorrect": "lesson.decimals.practice.p6.hint"
      }
    },
    {
      "id": "NO-1.3-P7",
      "layer": 2,
      "type": "misconception-analysis",
      "difficulty": 0.8,
      "prompt": "lesson.decimals.practice.p7.prompt",
      "visual": {
        "showGridComparison": true,
        "gridValues": [0.9, 0.45]
      },
      "answer": {
        "correct": "B",
        "options": [
          "Because 0.45 has more digits so it must be smaller",
          "Because 0.9 = 0.90, and 90 hundredths > 45 hundredths",
          "Because 9 is an odd number and 45 is not",
          "Because you can't compare decimals with different numbers of digits"
        ],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p7.correct",
        "incorrectA": "lesson.decimals.practice.p7.incorrectA",
        "incorrectC": "lesson.decimals.practice.p7.incorrectC",
        "incorrectD": "lesson.decimals.practice.p7.incorrectD"
      }
    },
    {
      "id": "NO-1.3-P8",
      "layer": 2,
      "type": "grid-shading",
      "difficulty": 0.7,
      "prompt": "lesson.decimals.practice.p8.prompt",
      "visual": {
        "gridSize": 10,
        "targetValue": 0.08,
        "targetCells": 8,
        "interactive": true
      },
      "answer": {
        "correct": 8,
        "type": "count-validation"
      },
      "feedback": {
        "correct": "lesson.decimals.practice.p8.correct",
        "incorrect": "lesson.decimals.practice.p8.incorrect"
      }
    },
    {
      "id": "NO-1.3-P9",
      "layer": 2,
      "type": "true-false-set",
      "difficulty": 0.75,
      "prompt": "lesson.decimals.practice.p9.prompt",
      "visual": {},
      "answer": {
        "correct": [true, false, false],
        "statements": [
          "lesson.decimals.practice.p9.s1",
          "lesson.decimals.practice.p9.s2",
          "lesson.decimals.practice.p9.s3"
        ],
        "type": "multi-toggle"
      },
      "feedback": {
        "s1": "lesson.decimals.practice.p9.fb1",
        "s2": "lesson.decimals.practice.p9.fb2",
        "s3": "lesson.decimals.practice.p9.fb3"
      }
    }
  ]
}
```

(Full problems.json contains all 9 problems in this structure.)

---

## Appendix B: XP Summary

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

---

## Appendix C: Acceptance Criteria

A developer has fully implemented this lesson when:

1. [ ] All 7 NLS stages render and transition correctly in sequence
2. [ ] Hook animation plays the zoom sequence automatically with correct timing, colors, and number line behavior
3. [ ] 10x10 grid cells can be tapped to shade/unshade with correct visual feedback and pop animation
4. [ ] Grid paint-drag works on touch devices (shades multiple cells in one stroke)
5. [ ] Column tap shades/unshades all 10 cells in a column
6. [ ] Full grid (100 cells) triggers "That's a whole 1!" celebration
7. [ ] Decimal display always shows correct value, breakdown (tenths + hundredths), and fraction equivalent
8. [ ] Zoomable number line supports 3 zoom levels with correct tick marks and labels at each level
9. [ ] Pinch-to-zoom works on touch devices; +/- buttons work on desktop
10. [ ] Number line draggable point shows live value and snaps to ticks
11. [ ] Model toggle switches between grid and number line, preserving interaction count
12. [ ] Guided Discovery side-by-side grid comparison animates correctly (0.9 vs 0.45)
13. [ ] Trailing zeros animation (0.5 -> 0.50 -> 0.500) plays with grid unchanged
14. [ ] Discovery interactive challenges validate correctly with appropriate feedback
15. [ ] Symbol Bridge notation appears with correct KaTeX rendering, color-coding, and timing
16. [ ] The tenths/hundredths/thousandths progression diagram renders with arrows
17. [ ] Real-World Anchor cards display and animate correctly with highlighted decimals
18. [ ] All 9 practice problems function with correct input types and validation
19. [ ] Practice P5 number line drag accepts correct answer within tolerance
20. [ ] Practice P8 interactive grid validates correct cell count
21. [ ] Practice P9 True/False set validates all three statements together
22. [ ] Reflection stage enforces 20-char minimum and submits for AI scoring
23. [ ] Confirmation visual plays the 0.9 vs 0.45 fraction comparison after reflection
24. [ ] All interactions meet 44px minimum touch target
25. [ ] `prefers-reduced-motion` disables all motion-intensive animations
26. [ ] Screen reader announces all state changes via `aria-live` regions
27. [ ] Keyboard navigation works for all interactive elements (grid, number line, drag-arrange, toggles)
28. [ ] Mobile layout (< 640px) is single-column and usable
29. [ ] Tablet+ layout (>= 640px) uses side-by-side where specified
30. [ ] All strings use i18n keys (no hardcoded English in components)
31. [ ] Lesson progress persists to IndexedDB and syncs to server
32. [ ] XP is calculated correctly per the XP Summary table
33. [ ] Performance: 60fps on mid-range mobile during all animations (grid shading, zoom, hook)
34. [ ] Storybook stories exist for each stage in isolation
35. [ ] Vitest tests cover: grid cell count math, decimal comparison logic, fraction-to-decimal conversion, zoom level transitions
36. [ ] Playwright E2E test covers full lesson completion flow (all 7 stages)
