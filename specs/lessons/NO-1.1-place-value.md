# Lesson Design: NO-1.1 Place Value

**Version**: 1.0.0 | **Date**: 2026-03-22 | **Author**: Lesson Design Team
**Concept ID**: NO-1.1 | **Domain**: Numbers & Operations | **Grade**: 6
**Prerequisites**: None (entry point) | **Successors**: NO-1.2, NO-1.3, NT-2.1, NO-1.6
**Content Path**: `src/content/domains/numbers-operations/NO-1.1/`
**Constitution Compliance**: All 7 Core Principles verified. Neural Learning Sequence followed without reordering or omission.

---

## 1. Lesson Overview

| Field | Value |
|-------|-------|
| Concept | Place Value in the base-10 (decimal) number system |
| Grade | 6 (ages 11-12) |
| Duration | ~25 minutes across 7 stages |
| Learning Objective | Students understand that a digit's position within a number determines its value: ones, tens, hundreds, thousands |
| Secondary Objectives | Students can decompose numbers into expanded form; students can compare numbers by examining place values left-to-right; students understand the role of zero as a placeholder |
| Common Misconceptions | (1) Confusing the digit itself with its positional value (e.g., thinking the "4" in 3,456 is worth 4, not 400). (2) Believing 0 has no purpose or can be removed without consequence (e.g., 5,027 vs 527). (3) Not understanding why moving one position left multiplies value by 10. (4) Treating all digits as equivalent regardless of position when comparing numbers. |
| NLS Stages | Hook, Spatial Experience, Guided Discovery, Symbol Bridge, Real-World Anchor, Practice (9 problems across 3 layers), Reflection |
| Emotional Arc | Curiosity (Hook) -> Engagement (Spatial) -> Productive Struggle (Discovery) -> Insight (Symbol Bridge) -> Confidence (Real-World) -> Mastery (Practice) -> Metacognition (Reflection) |

---

## 2. Neuroscience Framework

### Stage-by-Stage Cognitive Architecture

| Stage | Cognitive Process | Neuroscience Rationale | Target Emotional State |
|-------|------------------|----------------------|----------------------|
| 1. Hook | Attention capture, reward prediction | The dopaminergic system activates when the brain detects a novel, visually rich pattern. Watching a number decompose into its positional values creates a prediction error ("I didn't expect that") that primes the hippocampus for encoding. | Curiosity, surprise |
| 2. Spatial Experience | Spatial reasoning, embodied cognition, visuospatial working memory | Manipulating base-10 blocks activates the intraparietal sulcus (IPS), the region shared by spatial and numerical processing. Motor cortex engagement through drag/tap creates richer memory traces than passive observation. The constraint of "max 9 per column" forces the brain to discover regrouping through embodied interaction rather than verbal instruction. | Engagement, playful exploration |
| 3. Guided Discovery | Pattern recognition, relational reasoning, elaborative interrogation | Comparing two numbers with identical digits forces the prefrontal cortex to engage in relational reasoning: "same parts, different arrangement, different result." This type of contrastive analysis strengthens the conceptual representation because the brain must extract the abstract rule (position determines value) rather than memorize a specific instance. | Productive struggle, dawning insight |
| 4. Symbol Bridge | Symbolic encoding, dual coding integration | Overlaying mathematical notation onto the already-established spatial representation leverages dual coding: the visual (blocks) and verbal (notation) channels reinforce each other without competing. Introducing symbols AFTER spatial experience means the notation anchors to an existing neural pattern rather than floating as abstract syntax. | Insight, "aha" moment |
| 5. Real-World Anchor | Semantic memory integration, transfer preparation | Connecting the abstract concept to familiar contexts (prices, scores, distances) activates the brain's semantic network, creating multiple retrieval paths. Transfer is more likely when the concept is encoded with diverse contextual associations. | Confidence, relevance |
| 6. Practice | Retrieval practice, error-driven learning, progressive challenge | The 3-layer structure (recall -> procedure -> understanding) follows Bloom's taxonomy and maps to the SRS layers. Retrieval practice strengthens memory traces more than re-studying. The "why does this work?" prompts after correct answers force elaborative processing, which is the mechanism that converts procedural success into conceptual understanding. | Mastery, self-efficacy |
| 7. Reflection | Metacognition, self-explanation effect | Generating an explanation in one's own words activates the self-explanation effect: students who explain concepts to themselves learn more deeply than those who simply review. The act of writing forces the brain to organize fragmented understanding into a coherent narrative. | Metacognition, ownership |

### Why This Ordering Works

The sequence spatial-before-symbolic is not merely pedagogical preference; it reflects how the brain builds mathematical representations. The IPS processes numerical magnitude spatially. When students first manipulate blocks (Stage 2) and then see notation (Stage 4), the symbolic representation is grounded in a pre-existing spatial schema. Research (Dehaene, 2011) shows that students who receive spatial training before symbolic instruction form more robust and flexible number concepts than those who start with notation.

The emotional arc is equally deliberate. Curiosity (Hook) opens the dopaminergic learning gate. Engagement (Spatial) sustains attention long enough for encoding. Productive struggle (Discovery) signals to the brain that this information is worth remembering. Insight (Symbol Bridge) provides the emotional reward that consolidates the memory. Confidence (Real-World, Practice) transfers the concept from fragile to durable. Metacognition (Reflection) promotes long-term retention through self-monitoring.

---

## 3. Stage 1: Hook (30-60 seconds)

### Purpose
Activate curiosity and the brain's reward-prediction system by showing the student something visually stunning that they didn't expect. No interaction required — pure cinematic experience.

### Animation Design

**Canvas**: Full viewport width, centered vertically. Background: dark (`#0f172a`, Tailwind `slate-900`). No grid, no axes — clean stage.

**Sequence**:

#### Phase 1: Number Assembly (0s - 0.8s)
1. **0.0s**: The number `3,456` fades in at the center of the viewport.
   - Font: System mono or `JetBrains Mono`, `font-variant-numeric: tabular-nums`
   - Font size: `clamp(48px, 10vw, 96px)` — large and cinematic
   - Color: white (`#f8fafc`)
   - Fade-in: opacity 0 -> 1 over 0.8s, `ease: "easeOut"`
   - Simultaneously, a subtle scale animation: `scale: 0.9 -> 1.0` over 0.8s

#### Phase 2: Digit Separation (0.8s - 3.6s)
2. **0.8s**: The comma fades out (opacity 1 -> 0, 0.3s, `ease: "easeOut"`).
3. **1.1s**: Four translucent column backgrounds slide up from the bottom of the viewport, each 0.5s staggered:
   - Column positions: evenly spaced across the viewport width (responsive, see Layout section)
   - Column widths: `clamp(60px, 15vw, 120px)` each
   - Column heights: 60% of viewport height
   - Column colors (20% opacity, rounded top corners with `border-radius: 12px`):
     - Thousands: `#a78bfa33` (purple)
     - Hundreds: `#60a5fa33` (blue)
     - Tens: `#22d3ee33` (cyan)
     - Ones: `#34d39933` (green)
   - Animation: `translateY: 100% -> 0%`, `ease: "easeOutBack"`, 0.5s each
   - Stagger: 0.15s between columns (left to right)
   - Column labels appear at the top of each column simultaneously with the column:
     - "Thousands" / "Hundreds" / "Tens" / "Ones"
     - Font size: `clamp(10px, 2.5vw, 14px)`
     - Color: matches the column color at full opacity (`#a78bfa`, `#60a5fa`, `#22d3ee`, `#34d399`)
     - Font weight: 600

4. **1.8s**: Each digit of `3456` separates from the original position and flies to its column:
   - Digit `3` moves to the Thousands column (purple)
   - Digit `4` moves to the Hundreds column (blue)
   - Digit `5` moves to the Tens column (cyan)
   - Digit `6` moves to the Ones column (green)
   - Each digit's color transitions from white to its column color during the flight
   - Motion path: Bezier curve with slight upward arc (control point 30% above midpoint)
   - Duration per digit: 0.5s
   - Stagger: 0.2s between digits (left to right, so `3` moves first)
   - Ease: `spring({ damping: 20, stiffness: 300 })`
   - The original `3,456` text is replaced by individual digit elements — the transition should be seamless (digits leave from their exact character positions in the original number)

#### Phase 3: Value Reveal (3.6s - 5.4s)
5. **3.6s**: Below each digit in its column, the positional VALUE fades in:
   - Below `3`: `3,000` in purple (`#a78bfa`)
   - Below `4`: `400` in blue (`#60a5fa`)
   - Below `5`: `50` in cyan (`#22d3ee`)
   - Below `6`: `6` in green (`#34d399`)
   - Font size: `clamp(16px, 4vw, 28px)`
   - Font weight: 700
   - Animation: `opacity: 0 -> 1` + `translateY: 8px -> 0px` over 0.3s
   - Stagger: 0.4s between values (left to right)
   - Ease: `"easeOut"`
   - Each value has a subtle glow effect matching its color: `text-shadow: 0 0 12px {color}40`

#### Phase 4: Reassembly (5.4s - 7.2s)
6. **5.4s**: A horizontal line appears below all four values, spanning the full width of the columns:
   - Color: `#475569` (slate-500)
   - Height: 2px
   - Animation: draw from left to right, 0.3s

7. **5.7s**: Plus signs (`+`) fade in between the values:
   - `3,000 + 400 + 50 + 6`
   - The values animate from their column positions to a single horizontal row just above the line
   - Duration: 0.6s, `ease: "easeInOut"`
   - Plus signs: white (`#f8fafc`), font size matching the values

8. **6.3s**: An equals sign (`=`) and the reassembled `3,456` fade in to the right:
   - `3,000 + 400 + 50 + 6 = 3,456`
   - The `3,456` is white, bold
   - Animation: `opacity: 0 -> 1`, `scale: 0.95 -> 1.0`, 0.5s
   - The number `3,456` gets a brief pulse glow (white glow, 0.4s)

#### Phase 5: Continue Button (7.2s+)
9. **7.2s**: Continue button fades in below the equation:
   - Text: "Continue" (i18n key: `lesson.continue`)
   - Style: filled button, primary color (`#8b5cf6` purple-500), white text
   - Size: `min-width: 160px`, `height: 48px` (meets 44px touch target requirement)
   - Animation: `opacity: 0 -> 1`, 0.5s, `ease: "easeOut"`
   - Hover state: `background: #7c3aed` (purple-600)
   - Active state: `scale: 0.97`, 0.1s

### Accessibility
- `aria-live="polite"` region announces: "Three thousand four hundred fifty-six. Each digit has a different value based on its position. 3 is worth 3,000. 4 is worth 400. 5 is worth 50. 6 is worth 6."
- All animated elements have `prefers-reduced-motion` fallback: show the final state immediately with simple fade-in (0.5s total instead of 7.2s)
- Column labels and value labels are actual DOM text elements (not canvas-rendered) for screen reader access

### MathScene DSL (Hook Animation)

```json
{
  "id": "NO-1.1-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 800, 500],
  "background": "#0f172a",
  "objects": [
    {
      "type": "group", "id": "number-whole",
      "children": [
        {
          "type": "annotation", "id": "digit-3",
          "position": [320, 200], "latex": "3",
          "style": { "fontSize": 72, "fill": "#f8fafc" }
        },
        {
          "type": "annotation", "id": "comma",
          "position": [348, 200], "latex": ",",
          "style": { "fontSize": 72, "fill": "#f8fafc" }
        },
        {
          "type": "annotation", "id": "digit-4",
          "position": [380, 200], "latex": "4",
          "style": { "fontSize": 72, "fill": "#f8fafc" }
        },
        {
          "type": "annotation", "id": "digit-5",
          "position": [420, 200], "latex": "5",
          "style": { "fontSize": 72, "fill": "#f8fafc" }
        },
        {
          "type": "annotation", "id": "digit-6",
          "position": [460, 200], "latex": "6",
          "style": { "fontSize": 72, "fill": "#f8fafc" }
        }
      ]
    },
    {
      "type": "group", "id": "columns",
      "children": [
        { "type": "geometricShape", "id": "col-thousands", "shape": "rectangle", "center": [200, 280], "width": 120, "height": 300, "style": { "fill": "#a78bfa33", "stroke": "none" }, "visible": false },
        { "type": "geometricShape", "id": "col-hundreds", "shape": "rectangle", "center": [340, 280], "width": 120, "height": 300, "style": { "fill": "#60a5fa33", "stroke": "none" }, "visible": false },
        { "type": "geometricShape", "id": "col-tens", "shape": "rectangle", "center": [480, 280], "width": 120, "height": 300, "style": { "fill": "#22d3ee33", "stroke": "none" }, "visible": false },
        { "type": "geometricShape", "id": "col-ones", "shape": "rectangle", "center": [620, 280], "width": 120, "height": 300, "style": { "fill": "#34d39933", "stroke": "none" }, "visible": false }
      ]
    },
    {
      "type": "annotation", "id": "label-thousands", "position": [200, 110], "latex": "\\text{Thousands}", "style": { "fontSize": 14, "fill": "#a78bfa" }, "visible": false
    },
    {
      "type": "annotation", "id": "label-hundreds", "position": [340, 110], "latex": "\\text{Hundreds}", "style": { "fontSize": 14, "fill": "#60a5fa" }, "visible": false
    },
    {
      "type": "annotation", "id": "label-tens", "position": [480, 110], "latex": "\\text{Tens}", "style": { "fontSize": 14, "fill": "#22d3ee" }, "visible": false
    },
    {
      "type": "annotation", "id": "label-ones", "position": [620, 110], "latex": "\\text{Ones}", "style": { "fontSize": 14, "fill": "#34d399" }, "visible": false
    },
    {
      "type": "annotation", "id": "value-3000", "position": [200, 300], "latex": "3{,}000", "style": { "fontSize": 28, "fill": "#a78bfa" }, "visible": false
    },
    {
      "type": "annotation", "id": "value-400", "position": [340, 300], "latex": "400", "style": { "fontSize": 28, "fill": "#60a5fa" }, "visible": false
    },
    {
      "type": "annotation", "id": "value-50", "position": [480, 300], "latex": "50", "style": { "fontSize": 28, "fill": "#22d3ee" }, "visible": false
    },
    {
      "type": "annotation", "id": "value-6", "position": [620, 300], "latex": "6", "style": { "fontSize": 28, "fill": "#34d399" }, "visible": false
    },
    {
      "type": "annotation", "id": "reassembly", "position": [400, 430], "latex": "3{,}000 + 400 + 50 + 6 = 3{,}456", "style": { "fontSize": 24, "fill": "#f8fafc" }, "visible": false
    }
  ],
  "animations": [
    {
      "id": "hook-sequence",
      "trigger": "auto",
      "steps": [
        { "action": "fadeIn", "target": "number-whole", "duration": 0.8, "ease": "easeOut" },
        { "action": "fadeOut", "target": "comma", "duration": 0.3 },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "col-thousands", "duration": 0.5, "from": "bottom", "delay": 0 },
            { "action": "fadeIn", "target": "label-thousands", "duration": 0.3, "delay": 0.2 },
            { "action": "fadeIn", "target": "col-hundreds", "duration": 0.5, "from": "bottom", "delay": 0.15 },
            { "action": "fadeIn", "target": "label-hundreds", "duration": 0.3, "delay": 0.35 },
            { "action": "fadeIn", "target": "col-tens", "duration": 0.5, "from": "bottom", "delay": 0.3 },
            { "action": "fadeIn", "target": "label-tens", "duration": 0.3, "delay": 0.5 },
            { "action": "fadeIn", "target": "col-ones", "duration": 0.5, "from": "bottom", "delay": 0.45 },
            { "action": "fadeIn", "target": "label-ones", "duration": 0.3, "delay": 0.65 }
          ]
        },
        { "action": "wait", "duration": 0.3 },
        {
          "action": "parallel",
          "steps": [
            { "action": "moveTo", "target": "digit-3", "position": [200, 220], "duration": 0.5, "ease": "spring" },
            { "action": "transform", "target": "digit-3", "properties": { "fill": "#a78bfa" }, "duration": 0.5 }
          ]
        },
        {
          "action": "parallel",
          "steps": [
            { "action": "moveTo", "target": "digit-4", "position": [340, 220], "duration": 0.5, "ease": "spring", "delay": 0.2 },
            { "action": "transform", "target": "digit-4", "properties": { "fill": "#60a5fa" }, "duration": 0.5, "delay": 0.2 }
          ]
        },
        {
          "action": "parallel",
          "steps": [
            { "action": "moveTo", "target": "digit-5", "position": [480, 220], "duration": 0.5, "ease": "spring", "delay": 0.4 },
            { "action": "transform", "target": "digit-5", "properties": { "fill": "#22d3ee" }, "duration": 0.5, "delay": 0.4 }
          ]
        },
        {
          "action": "parallel",
          "steps": [
            { "action": "moveTo", "target": "digit-6", "position": [620, 220], "duration": 0.5, "ease": "spring", "delay": 0.6 },
            { "action": "transform", "target": "digit-6", "properties": { "fill": "#34d399" }, "duration": 0.5, "delay": 0.6 }
          ]
        },
        { "action": "wait", "duration": 0.3 },
        { "action": "fadeIn", "target": "value-3000", "duration": 0.3, "from": "bottom" },
        { "action": "fadeIn", "target": "value-400", "duration": 0.3, "from": "bottom", "delay": 0.4 },
        { "action": "fadeIn", "target": "value-50", "duration": 0.3, "from": "bottom", "delay": 0.8 },
        { "action": "fadeIn", "target": "value-6", "duration": 0.3, "from": "bottom", "delay": 1.2 },
        { "action": "wait", "duration": 0.5 },
        { "action": "fadeIn", "target": "reassembly", "duration": 0.5, "from": "scale" }
      ]
    }
  ],
  "interactions": []
}
```

---

## 4. Stage 2: Spatial Experience (2-4 minutes)

### Purpose
Provide hands-on manipulation of base-10 blocks so the student builds a spatial/motor representation of place value. No formulas, no notation. Pure spatial play.

### Layout

**Mobile** (< 768px): Single column, stacked vertically.
- Top: Number display (sticky, 64px tall)
- Middle: Block workspace (scrollable, flex-grow)
- Bottom: Block controls (fixed, 120px tall)

**Tablet+** (>= 768px): Two-panel side-by-side.
- Left panel (60% width): Block workspace
- Right panel (40% width): Number display + controls

### Component: Number Display

A live-updating number at the top of the scene that always shows the current total.

| Property | Value |
|----------|-------|
| Font | System mono, `tabular-nums` |
| Font size | `clamp(36px, 8vw, 56px)` |
| Color | White (`#f8fafc`) on dark background |
| Background | `#1e293b` (slate-800) with `border-radius: 16px` and `padding: 16px 24px` |
| Update animation | When value changes, the number does a brief `scale: 1.0 -> 1.05 -> 1.0` spring animation (0.3s) |
| Format | Comma-separated (e.g., `3,456`). Use `Intl.NumberFormat('en-US')` |
| Breakdown | Below the main number, show a smaller breakdown: `3 thousands + 4 hundreds + 5 tens + 6 ones` in the respective colors |

### Component: Base-10 Blocks

Four types of blocks, each rendered as CSS-only shapes (no images, per DR-4/performance). All blocks are SVG `<rect>` or `<g>` elements within the MathScene SVG viewport.

#### Block Type Definitions

| Block | Represents | Color (fill) | Color (stroke) | Dimensions | Visual |
|-------|-----------|-------------|----------------|------------|--------|
| Large Cube | 1,000 | `#a78bfa20` | `#a78bfa` | 64px x 64px | 3D-looking cube: front face + top parallelogram + right parallelogram. Top face is 10% lighter than fill. Right face is 10% darker. Front face has a faint 10x10 grid overlay (1px lines at 10% opacity) to suggest 1000 units. Shadow: `drop-shadow(4px 4px 8px rgba(0,0,0,0.3))` |
| Flat Square | 100 | `#60a5fa20` | `#60a5fa` | 48px x 48px | Flat square with a 10x10 grid overlay (1px lines at 20% opacity). Subtle shadow: `drop-shadow(2px 2px 4px rgba(0,0,0,0.2))`. Border-radius: 2px. |
| Rod | 10 | `#22d3ee20` | `#22d3ee` | 48px x 8px (horizontal) | Horizontal bar with 10 segment marks (vertical lines at 10% opacity). Border-radius: 2px. Shadow: `drop-shadow(1px 1px 2px rgba(0,0,0,0.15))` |
| Unit Cube | 1 | `#34d39920` | `#34d399` | 8px x 8px | Small square. Border-radius: 1px. Shadow: `drop-shadow(1px 1px 1px rgba(0,0,0,0.1))` |

#### Block Placement

Blocks appear in the workspace organized by type. Each type has its own row or zone:
- Thousands row: top
- Hundreds row: second
- Tens row: third
- Ones row: bottom

Each row has a subtle label on the left side (e.g., "Thousands" in the matching color, font-size 12px, opacity 0.6).

When a block is added, it appears at the next available position in its row, flowing left-to-right. If the row runs out of horizontal space, blocks wrap to a second line within the row.

#### Block Appearance Animation

When a block is added (via the +1 button):
1. The block appears at its target position with `scale: 0 -> 1` and `opacity: 0 -> 1`
2. Duration: 0.25s
3. Ease: `spring({ damping: 15, stiffness: 400 })` — gives a satisfying "pop"
4. A subtle circular ripple emanates from the block's center (same color as block, 30% opacity, radius 0 -> 40px, opacity 1 -> 0, 0.4s)
5. Optional: if `soundEnabled` in user preferences, play a soft "pop" sound (different pitch per block type — lower for larger blocks)

When a block is removed (via the -1 button):
1. The block shrinks: `scale: 1 -> 0`, `opacity: 1 -> 0`
2. Duration: 0.2s
3. Ease: `"easeIn"`
4. Remaining blocks in the row slide left to fill the gap: 0.2s, `ease: "easeInOut"`

### Component: Block Controls

A control bar at the bottom (mobile) or beside each row (tablet+):

For each block type, show:
- A miniature visual of the block (24px, matching style)
- A label: "1,000" / "100" / "10" / "1" in the matching color
- A `-` button (left)
- A count display showing current count (e.g., "3")
- A `+` button (right)

Button specifications:
- Size: 48px x 48px (exceeds 44px minimum touch target)
- Border-radius: 12px
- Background: `#1e293b` (slate-800)
- Border: 1px solid `#334155` (slate-700)
- Text: 24px, white, font-weight 700
- Active state: `background: #334155`, `scale: 0.95`, 0.1s
- Disabled state (at 0 for minus, at 9 for plus): `opacity: 0.3`, `pointer-events: none`

Count display:
- Width: 32px, text-align center
- Font: mono, 20px, white
- When count changes, animate with `scale: 1 -> 1.15 -> 1`, 0.2s

### Regrouping Animation (Critical Feature)

**When the student adds a 10th unit of any block type, a regrouping animation plays.**

This is the most important pedagogical moment in Stage 2. It teaches that 10 of one type equals 1 of the next type — the fundamental principle of base-10.

#### Trigger Conditions
- 10 ones reached -> regroup into 1 ten
- 10 tens reached -> regroup into 1 hundred
- 10 hundreds reached -> regroup into 1 thousand

#### Animation Sequence (example: 10 ones -> 1 ten)

1. **0.0s**: The 10th unit cube appears with the normal pop animation.
2. **0.3s**: All 10 unit cubes in the ones row get a pulsing highlight:
   - Stroke color transitions to bright white (`#f8fafc`)
   - A gentle `scale: 1.0 -> 1.08 -> 1.0` pulse, 0.4s, repeated twice
   - A text callout fades in above the ones row: "10 ones!" in green (`#34d399`), font-size 16px, font-weight 600
3. **1.1s**: The 10 unit cubes begin sliding toward each other, converging at the center of the ones row:
   - Duration: 0.5s
   - Ease: `"easeInOut"`
   - As they converge, they gradually overlap and shrink
4. **1.6s**: At the convergence point, the 10 cubes simultaneously fade out (`opacity: 1 -> 0`, 0.2s) and a single rod (10-block) fades in at the same position (`opacity: 0 -> 1`, `scale: 0.5 -> 1`, 0.3s, `ease: "easeOutBack"`)
5. **1.9s**: The new rod slides from the ones area to the tens row:
   - Motion path: gentle upward arc
   - Duration: 0.5s
   - Ease: `spring({ damping: 18, stiffness: 280 })`
   - A particle trail follows the rod (5-6 small dots in cyan, fading out)
6. **2.4s**: The rod lands in its position in the tens row. The text callout changes to "= 1 ten!" in cyan (`#22d3ee`), then fades out after 1s.
7. **2.4s**: The number display updates simultaneously. The ones digit drops to 0, the tens digit increments by 1. The digit that changes gets a brief flash animation (background-color pulse with the appropriate column color, 0.3s).

#### Regrouping: Controls State During Animation
- All +/- buttons are disabled during the regrouping animation (2.5s)
- The +1 button for the regrouped type shows a brief "locked" icon
- After animation completes, controls re-enable

#### Reverse Regrouping (Breaking Down)

When the student tries to subtract below 0 for a type that has a higher-type block available, the system does NOT auto-regroup downward. Instead:
- The `-` button for the empty type is disabled
- A subtle tooltip appears: "No ones to remove! Try removing a ten instead." (i18n key: `lesson.placeValue.noBlocksToRemove`)
- This is a deliberate pedagogical choice: forward regrouping (10 ones -> 1 ten) is taught here; reverse regrouping is a future lesson (subtraction with borrowing)

### Interaction Requirements

| Requirement | Details |
|-------------|---------|
| MIN_INTERACTIONS | 8 tap or drag actions before Continue button appears |
| Interaction tracking | Every +1, -1 tap counts. Every drag-and-drop counts. |
| Continue button | Fades in only after MIN_INTERACTIONS reached AND the student has at least one block of each type (to ensure they've explored all four place values) |
| Continue button style | Same as Hook stage continue button |
| Max time without interaction | If 30 seconds pass without interaction, the AI tutor avatar peeks in with a hint: "Try adding some blocks! Tap the + buttons to see what happens." (i18n key: `lesson.placeValue.stage2Hint`) |
| Max per column | 9 blocks. When count = 9, the + button is disabled. Attempting a 10th triggers regrouping (see above). |
| Initial state | All columns start at 0 blocks. The workspace is empty. |

### Drag-and-Drop (Optional Enhancement)

Students can also drag blocks from a "block palette" (a drawer at the bottom or side) into the workspace:
- Drag source: miniature block icons in the palette
- Drop target: the workspace area
- On valid drop: block appears at drop position with pop animation, then slides to the next available position in its row
- On invalid drop (outside workspace): block snaps back to palette with `ease: "easeOutBack"`, 0.3s
- Gesture: `@use-gesture/react` `useDrag` hook
- Visual during drag: block follows finger/cursor at 110% scale, with a 4px shadow increase

### State Management

```typescript
// Zustand slice for Stage 2
interface PlaceValueBlockState {
  thousands: number; // 0-9
  hundreds: number;  // 0-9
  tens: number;      // 0-9
  ones: number;      // 0-9
  interactionCount: number;
  hasUsedAllTypes: boolean; // true when each type has been >= 1 at some point
  isRegrouping: boolean;    // true during regrouping animation
  totalValue: number;       // computed: thousands*1000 + hundreds*100 + tens*10 + ones
}
```

### Accessibility (Stage 2)
- All block counts are announced via `aria-live="polite"`: "3 thousands, 4 hundreds, 5 tens, 6 ones. Total: 3,456."
- Buttons have `aria-label`: "Add one thousand", "Remove one thousand", etc.
- Regrouping is announced: "10 ones regrouped into 1 ten."
- Keyboard navigation: Tab between button groups, Enter/Space to activate
- High contrast mode: block borders increase to 3px, fill opacity increases to 40%

---

## 5. Stage 3: Guided Discovery (3-5 minutes)

### Purpose
Through contrastive analysis, guide the student to discover that position determines value. The student must actively reason, not passively read.

### Layout

Full viewport. Dark background (`#0f172a`). Content centered, max-width 640px.

### Sequence

The stage consists of 4 sequential prompts. Each prompt must be acknowledged before the next appears. The prompts build on each other logically.

#### Prompt 1: The Puzzle (display-only, requires "Got it" acknowledgment)

**Visual**: Two large numbers side-by-side:

```
  3,456          6,453
```

- Each number is displayed with digits colored by their position:
  - Thousands digit: purple (`#a78bfa`)
  - Hundreds digit: blue (`#60a5fa`)
  - Tens digit: cyan (`#22d3ee`)
  - Ones digit: green (`#34d399`)
- So `3,456` displays as: purple-3, blue-4, cyan-5, green-6
- And `6,453` displays as: purple-6, blue-4, cyan-5, green-3
- Font size: `clamp(32px, 7vw, 56px)`, font-weight 700, `tabular-nums`
- Between them, a "vs" or vertical divider line (slate-500, 2px)
- Below the numbers: the unique digits used, shown in a neutral row: `3  4  5  6` in white, each inside a rounded-rectangle chip (background `#334155`, border-radius 8px, padding 4px 12px)

**Text**: Displayed below the visual in a card-style container (background `#1e293b`, border-radius 12px, padding 20px):
- "These two numbers use the exact same digits: 3, 4, 5, and 6. But 3,456 and 6,453 are very different numbers. Why?"
- Font: 16px, `#e2e8f0` (slate-200), line-height 1.6
- i18n key: `lesson.placeValue.stage3.prompt1`

**Acknowledgment**: A "Got it, show me!" button (same style as Continue button). On tap, Prompt 2 slides in from the right (0.4s, `ease: "easeInOut"`), and Prompt 1 slides out to the left.

#### Prompt 2: The Explanation (animated, requires "I see!" acknowledgment)

**Animation**: The two numbers remain visible at the top. The focus shifts to the digit `3` in each number.

1. **0.0s**: In `3,456`, the digit `3` gets a highlight ring (purple glow, pulsing `box-shadow: 0 0 0 4px #a78bfa80`). An arrow points down from it to a label: "Worth 3,000" (purple, 20px, bold).
2. **0.8s**: In `6,453`, the digit `3` gets a highlight ring (green glow, pulsing). An arrow points down to: "Worth just 3" (green, 20px, bold).
3. **1.6s**: A connecting dotted line appears between the two `3` digits, with a label in the middle: "Same digit, different value!" (white, 14px, italic).

**Text**: Slides in below the animation:
- "Look at the 3 in each number. In 3,456, the 3 is in the thousands place -- it's worth 3,000. In 6,453, the 3 is in the ones place -- it's worth just 3. The POSITION changes the VALUE!"
- The word "POSITION" is rendered in bold, white background highlight (pill shape).
- The word "VALUE" is rendered in bold, white background highlight (pill shape).
- i18n key: `lesson.placeValue.stage3.prompt2`

**Acknowledgment**: "I see!" button.

#### Prompt 3: Interactive Challenge -- Largest Number

**Text**: "Try it yourself: What's the BIGGEST number you can make with the digits 3, 4, 5, and 6? Each digit can only be used once."
- i18n key: `lesson.placeValue.stage3.prompt3`

**Interactive Element**: A digit arrangement interface.

**Top row** (source): Four digit chips in a horizontal row:
- Chips: `3`, `4`, `5`, `6`
- Each chip: 56px x 56px, `border-radius: 12px`, `background: #334155`, `color: #f8fafc`, font-size 28px, font-weight 700
- Chips are draggable (`@use-gesture/react`)

**Bottom row** (target): Four empty slots in a horizontal row, labeled left-to-right:
- Slot labels (above each slot): "Thousands" (purple), "Hundreds" (blue), "Tens" (cyan), "Ones" (green)
- Slots: 56px x 56px, `border: 2px dashed #475569`, `border-radius: 12px`
- When a chip is dragged over a slot, the slot border becomes solid and changes to the slot's color
- When a chip is dropped into a slot, it snaps into place with `spring({ damping: 20, stiffness: 300 })` and adopts the slot's color

**Live preview**: Below the slots, a live-updating number display shows the current value:
- If not all slots are filled: show `_ , _ _ _` with filled digits in place
- If all slots filled: show the complete number with comma formatting
- Font: mono, 32px, white

**Validation**: When all four slots are filled:
- If correct (6,543):
  - Green checkmark appears with a `scale: 0 -> 1.2 -> 1` bounce (0.4s)
  - Confetti particle burst: 20 particles in the four place-value colors, spreading radially, fading out over 1.5s
  - Text: "That's it! 6,543 is the biggest because you put the largest digit (6) in the most powerful position (thousands)!" in green, with the words "largest digit" and "most powerful position" in bold
  - i18n key: `lesson.placeValue.stage3.prompt3.correct`
- If incorrect:
  - Gentle red pulse on the arrangement (border briefly flashes `#f87171`, 0.3s)
  - Hint text: "Not quite! Think about it: which digit should go in the thousands place to make the number as BIG as possible?" (i18n key: `lesson.placeValue.stage3.prompt3.hint`)
  - The chips remain draggable so the student can rearrange

**Edge case**: If the student fills slots out of order, the system accepts any valid arrangement of all 4 digits. Only the final state is validated.

**Acknowledgment**: After correct answer, "Next challenge!" button appears.

#### Prompt 4: Interactive Challenge -- Smallest Number

**Text**: "Now make the SMALLEST number with the same digits: 3, 4, 5, 6."
- i18n key: `lesson.placeValue.stage3.prompt4`

**Interface**: Same as Prompt 3. Slots are cleared. Chips reset to the source row.

**Validation**: When all four slots filled:
- If correct (3,456):
  - Green checkmark animation (same as Prompt 3)
  - Text: "3,456! The smallest digit (3) goes in the most powerful position. You've discovered the rule: position determines value!"
  - i18n key: `lesson.placeValue.stage3.prompt4.correct`
  - Below the text, a highlighted insight card appears (background `#7c3aed20`, border-left 4px solid `#a78bfa`, padding 16px):
    - "Key Insight: Same digits, different positions = different numbers. The further LEFT a digit is, the more it's worth."
    - i18n key: `lesson.placeValue.stage3.keyInsight`
- If incorrect:
  - Same gentle hint pattern as Prompt 3: "Which digit should go in the thousands place to make the number as SMALL as possible?"
  - i18n key: `lesson.placeValue.stage3.prompt4.hint`

**Acknowledgment**: Continue button appears after insight card.

### Accessibility (Stage 3)
- Drag-and-drop has keyboard alternative: Tab to select a chip (highlighted), then use arrow keys to move it to slots, Enter to place
- All prompts are in screen-reader-accessible text containers
- Live preview number is announced via `aria-live="polite"` when it changes
- Validation results announced: "Correct! Six thousand five hundred forty-three is the largest number." / "Not quite. Try again."

---

## 6. Stage 4: Symbol Bridge (2-3 minutes)

### Purpose
Overlay formal mathematical notation onto the already-established spatial representation. The student now sees the abstract symbols grounded in the visual blocks they already understand.

### Layout
Full viewport. Same dark background. The visual from Stage 2 is recreated (but not interactive — display only) on the left or top, with notation appearing alongside.

### Visual Baseline
Show a static representation of the blocks from Stage 2, configured as 3 thousands, 4 hundreds, 5 tens, 6 ones:
- 3 large cubes in the thousands row (purple)
- 4 flat squares in the hundreds row (blue)
- 5 rods in the tens row (cyan)
- 6 unit cubes in the ones row (green)
- The number `3,456` displayed at the top

The blocks are rendered at 60% of the Stage 2 size to make room for notation.

### Animation Sequence

The notation fades in one line at a time, positioned next to the corresponding block row. Each line uses KaTeX for clean math rendering.

#### Step 1 (0.0s - 1.5s): Thousands notation
- A horizontal arrow draws from the thousands blocks to the right (or below on mobile)
- At the arrow's end, the text fades in:
  - KaTeX: `3 \times 1{,}000 = 3{,}000`
  - Color: purple (`#a78bfa`)
  - Font size: `clamp(16px, 3.5vw, 22px)`
- Arrow: 2px, same purple, 40px long, with arrowhead
- Fade-in: `opacity: 0 -> 1`, `translateX: -10px -> 0`, 0.4s, `ease: "easeOut"`
- The `3` in the equation and the `3` thousand blocks briefly pulse simultaneously (coordinated highlight)
- Duration of step including settle: 1.5s

#### Step 2 (1.5s - 3.0s): Hundreds notation
- Same pattern, for the hundreds row:
  - KaTeX: `4 \times 100 = 400`
  - Color: blue (`#60a5fa`)
- Same arrow + fade pattern
- Stagger ensures the student has time to read each line

#### Step 3 (3.0s - 4.5s): Tens notation
- Same pattern:
  - KaTeX: `5 \times 10 = 50`
  - Color: cyan (`#22d3ee`)

#### Step 4 (4.5s - 6.0s): Ones notation
- Same pattern:
  - KaTeX: `6 \times 1 = 6`
  - Color: green (`#34d399`)

#### Step 5 (6.0s - 7.5s): Expanded form
- Below all four notations, a horizontal rule draws across (same as Hook phase 4)
- Below the rule, the complete expanded form fades in:
  - KaTeX: `3{,}456 = 3 \times 1{,}000 + 4 \times 100 + 5 \times 10 + 6 \times 1`
  - Each term is colored to match its place value:
    - `3 \times 1{,}000` in purple
    - `4 \times 100` in blue
    - `5 \times 10` in cyan
    - `6 \times 1` in green
    - `+` and `=` in white
  - Font size: `clamp(14px, 3vw, 20px)`
  - Animation: `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.6s, `ease: "easeOut"`

#### Step 6 (7.5s - 8.5s): Power-of-10 insight
- Below the expanded form, an additional insight line fades in:
  - Text (not KaTeX): "Notice: each place is 10 times more than the place to its right!"
  - i18n key: `lesson.placeValue.stage4.powerOf10Insight`
  - Color: `#e2e8f0` (slate-200), font-size 14px, italic
  - Accompanied by small arrows between the multipliers: `1 -> 10 -> 100 -> 1,000` with `x10` labels on each arrow
  - Arrow color: `#94a3b8` (slate-400)

### Continue Button
- Appears 1s after the final animation step completes
- Same style as previous continue buttons

### Accessibility (Stage 4)
- All KaTeX expressions have `aria-label` attributes with plain-text equivalents: "3 times 1,000 equals 3,000"
- The power-of-10 insight is in a screen-readable `<p>` element
- `prefers-reduced-motion`: all notation appears simultaneously with a single 0.5s fade-in

---

## 7. Stage 5: Real-World Anchor (1-2 minutes)

### Purpose
Connect the abstract concept to concrete, memorable real-world scenarios that students encounter in their daily lives. This creates multiple retrieval paths in semantic memory.

### Layout
Scrollable card list. Each scenario is a card. Dark background, max-width 640px, centered.

### Scenario Cards

Each card has:
- An icon (SVG, 40px, rendered inline)
- A title (18px, white, bold)
- A body (16px, slate-200, line-height 1.6)
- A highlighted place-value example within the body
- Background: `#1e293b`, border-radius 16px, padding 20px, margin-bottom 16px
- Entry animation: slide up from bottom (`translateY: 24px -> 0`, `opacity: 0 -> 1`, 0.4s, stagger 0.2s between cards)

#### Card 1: Money

- **Icon**: Dollar sign in circle (SVG: circle stroke `#34d399`, `$` text inside)
- **Title**: "Price Tags"
- **Body**: "Every time you see a price like **$34.56**, you're reading place value. The 3 is worth thirty dollars, the 4 is worth four dollars, the 5 is worth fifty cents, and the 6 is worth six cents. Position tells you the value!"
- **Highlight**: `$34.56` is displayed with digit coloring:
  - `3` in blue (tens), `4` in green (ones), `5` in cyan (tenths), `6` in a lighter green (hundredths)
- i18n key: `lesson.placeValue.stage5.card1`

#### Card 2: Sports

- **Icon**: Scoreboard/trophy (SVG: rectangle with lines suggesting a scoreboard)
- **Title**: "Sports Scores & Stats"
- **Body**: "A basketball player who scored **1,203** career points is in a completely different league than one with **1,023**. Same digits, different positions -- that's a **180-point** gap thanks to place value!"
- **Highlight**: `1,203` and `1,023` are displayed side by side with the differing digit (hundreds place) highlighted in blue
- i18n key: `lesson.placeValue.stage5.card2`

#### Card 3: The Costly Mistake

- **Icon**: Warning triangle (SVG: triangle with `!`, stroke `#fbbf24`)
- **Title**: "The $27,000 Mistake"
- **Body**: "Imagine a bank puts **$300** in your account instead of **$3,000**. That's a place value error -- the 3 was put in the hundreds place instead of the thousands place. One position = one zero = a very big difference!"
- **Highlight**: Show `$300` with the 3 in blue (hundreds) and `$3,000` with the 3 in purple (thousands), with a dramatic red arrow between them labeled "10x difference!"
- i18n key: `lesson.placeValue.stage5.card3`

### Continue Button
- Appears at the bottom of the card list after all cards have animated in (0.2s delay after last card)
- The student can scroll to read all cards, then tap Continue
- If the viewport is tall enough to show all cards without scrolling, Continue appears immediately after animations

### Accessibility (Stage 5)
- Cards are `<article>` elements with `role="article"`
- Icons have `aria-hidden="true"` (decorative, described by card title)
- Highlighted numbers are wrapped in `<mark>` with appropriate `aria-label`

---

## 8. Stage 6: Practice (5-10 minutes)

### Purpose
Retrieval practice across three cognitive layers: recall, procedure, and understanding. Every correct answer is followed by a "why does this work?" reflection prompt (Constitution Principle I).

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

#### Problem 1: Digit Identification

**Prompt**: "What digit is in the hundreds place of 4,729?"
- i18n key: `lesson.placeValue.practice.p1.prompt`

**Visual**: The number `4,729` displayed large (48px) with each digit in its positional color:
- `4` in purple (thousands)
- `7` in blue (hundreds)
- `2` in cyan (tens)
- `9` in green (ones)
- Below each digit, a subtle label: "Th", "H", "T", "O" in the matching color, font-size 10px, opacity 0.5

**Input**: Four digit buttons, one for each digit in the number: `4`, `7`, `2`, `9`
- Each button: 56px x 56px, `border-radius: 12px`, `background: #334155`, `color: #f8fafc`, font-size 24px
- Arranged horizontally, centered
- Tap selects the answer

**Correct answer**: `7`

**Feedback on correct**:
1. The `7` button turns green (background `#34d399`, 0.3s transition)
2. The `7` in the number above gets a pulsing glow ring (blue, since it's the hundreds place)
3. A green checkmark fades in next to the number (0.3s)
4. Text: "Correct! The 7 is in the hundreds place." (green, 16px)
5. After 0.5s delay, the "Why does this work?" prompt appears:
   - Text: "Why is it the hundreds place and not another place?" (slate-200, italic, 14px)
   - i18n key: `lesson.placeValue.practice.p1.why`
   - Below: "Tap to reveal" button (outline style, small)
   - On reveal: "Count from the right: first position is ones, second is tens, third is hundreds. The 7 is in the third position from the right, so it's the hundreds place." (slate-300, 14px)
   - i18n key: `lesson.placeValue.practice.p1.whyAnswer`

**Feedback on incorrect** (e.g., student taps `4`):
1. The tapped button briefly flashes red (background `#f87171`, 0.2s, then back to default)
2. Text: "Not quite. The 4 is in the thousands place, not hundreds. Try counting positions from the right: ones, tens, hundreds..." (red-400, 14px)
3. The correct digit (`7`) gets a subtle pulsing border hint after 2 seconds if the student hasn't retried
4. Student can retry immediately (buttons remain active)
5. XP is reduced for second attempt (first try: full XP; second try: 50%; third+: 25%)

#### Problem 2: Value Identification

**Prompt**: "What is the VALUE of the 7 in 7,845?"
- i18n key: `lesson.placeValue.practice.p2.prompt`

**Visual**: `7,845` displayed with the `7` highlighted (pulsing purple glow, since it's in the thousands place). The other digits are displayed at 60% opacity.

**Input**: Four multiple-choice buttons, vertically stacked:
- `7` (button A)
- `70` (button B)
- `700` (button C)
- `7,000` (button D)
- Each button: full-width (max 400px), 52px height, `border-radius: 12px`, `background: #334155`, left-aligned text with a letter prefix (A, B, C, D in a circle), 18px font

**Correct answer**: `7,000` (D)

**Feedback on correct**:
1. Button D turns green
2. The `7` in the number zooms from its position to the thousands column label, growing slightly (scale 1 -> 1.3 -> 1), with a trail in purple
3. Text: "Yes! The 7 is in the thousands place, so its value is 7,000."
4. "Why?" prompt: "What's the difference between a digit and its value?"
5. Reveal: "The digit is just the symbol (7). The value depends on where the digit sits. In the thousands place, the value = digit x 1,000 = 7 x 1,000 = 7,000."
- i18n keys: `lesson.placeValue.practice.p2.*`

**Feedback on incorrect**: Similar pattern. If student picks `700`, explain: "Close! 700 would be the value if the 7 were in the hundreds place. But it's one more position to the left -- the thousands place."

#### Problem 3: Expanded Form (Drag-to-Arrange)

**Prompt**: "Write 5,302 in expanded form. Drag the terms into the correct order."
- i18n key: `lesson.placeValue.practice.p3.prompt`

**Visual**: `5,302` displayed at the top with positional coloring.

**Input**: A set of draggable term chips and a drop zone:

Source chips (shuffled randomly):
- `5 x 1,000` (purple chip)
- `3 x 100` (blue chip)
- `0 x 10` (cyan chip)
- `2 x 1` (green chip)

Each chip: `min-width: 100px`, `height: 44px`, `border-radius: 8px`, matching place-value color as background (20% opacity) with matching border. Text: 16px, white.

Drop zone: A horizontal row of 4 slots with `+` signs between them:
- `[____] + [____] + [____] + [____]`
- Each slot: 110px x 48px, `border: 2px dashed #475569`, `border-radius: 8px`
- When a chip is dragged over a slot: border becomes solid, color matches the chip

**Correct arrangement**: `5 x 1,000 + 3 x 100 + 0 x 10 + 2 x 1`

**Validation**: The system accepts the terms in descending order (thousands, hundreds, tens, ones). If placed in wrong order, the border of the misplaced slot briefly flashes red.

**Feedback on correct**:
1. All slots turn green (border solid green)
2. The expanded form glows briefly
3. A connecting animation shows: `5,302 = 5 x 1,000 + 3 x 100 + 0 x 10 + 2 x 1`
4. "Why?" prompt: "Why do we include '0 x 10' even though it equals zero?"
5. Reveal: "The zero is a placeholder! Without it, we'd have 5,32 -- which isn't a real number. The zero in the tens place tells us 'there are no tens,' and that keeps the 5 in the thousands place and the 3 in the hundreds place where they belong."
- i18n keys: `lesson.placeValue.practice.p3.*`

**This problem specifically targets Misconception #2** (thinking 0 has no purpose).

### Layer 1: Procedure (Problems 4-6)

#### Problem 4: Comparison

**Prompt**: "Which is greater: 3,456 or 3,465?"
- i18n key: `lesson.placeValue.practice.p4.prompt`

**Visual**: Both numbers displayed side by side, each with positional coloring:
```
  3,456          3,465
```
- Same color scheme as Stage 3
- Between them: a large `?` in a circle (40px, `#94a3b8`)

**Input**: Two buttons side by side:
- Left: `3,456` (full number, 24px)
- Right: `3,465` (full number, 24px)
- Button style: 140px wide, 56px tall, `border-radius: 12px`, `background: #334155`

**Correct answer**: `3,465`

**Feedback on correct**:
1. The `?` between them morphs into `<` (0.3s morph animation)
2. The digits that are identical (`3`, `4`) dim to 30% opacity in both numbers
3. The differing digits are highlighted:
   - In `3,456`: the `5` in the tens place gets a cyan ring and arrow pointing to "50"
   - In `3,465`: the `6` in the tens place gets a cyan ring and arrow pointing to "60"
4. Text: "3,465 is greater! Both numbers have the same thousands (3) and hundreds (4), so we compare the tens place: 6 tens (60) beats 5 tens (50)."
5. "Why?" prompt: "Why do we compare from left to right?"
6. Reveal: "We start from the left because left positions have the most value. If the thousands digits were different, we wouldn't even need to look at hundreds, tens, or ones -- the thousands alone would decide."
- i18n keys: `lesson.placeValue.practice.p4.*`

#### Problem 5: Rounding

**Prompt**: "Round 4,678 to the nearest hundred."
- i18n key: `lesson.placeValue.practice.p5.prompt`

**Visual**: A number line segment from 4,600 to 4,700:
- Number line: horizontal, centered, 80% of viewport width
- Tick marks at every 10 (4,600; 4,610; 4,620; ... 4,700)
- Labels at 4,600 and 4,700 (18px, white, bold)
- Labels at 4,650 (14px, slate-400, dashed tick — the midpoint)
- A red marker (filled circle, 12px, `#f87171`) positioned at 4,678 on the line
- A label above the marker: "4,678" (14px, white)

**Input**: A draggable answer marker (blue circle, 16px, `#60a5fa`) that the student can drag along the number line. It snaps to hundred values (4,600 or 4,700).
- As the student drags, the value updates in real-time above the blue marker
- Snap points: 4,600 and 4,700 (with a 20px magnetic radius)
- Visual: when near a snap point, a subtle magnetic pull animation (the marker accelerates toward the snap)

**Correct answer**: 4,700

**Feedback on correct**:
1. The blue marker snaps to 4,700 with a satisfying `spring` animation
2. A green arc draws from 4,678 to 4,700 along the number line (0.4s)
3. Distance labels appear:
   - "78 away from 4,600" (left-pointing bracket, red)
   - "22 away from 4,700" (right-pointing bracket, green)
4. Text: "4,678 rounds to 4,700 because it's closer to 4,700 (only 22 away) than to 4,600 (78 away)."
5. "Why?" prompt: "How does place value help with rounding?"
6. Reveal: "To round to the nearest hundred, look at the tens digit. If it's 5 or more, round up. The tens digit in 4,678 is 7 (which is >= 5), so we round up from 4,600 to 4,700."
- i18n keys: `lesson.placeValue.practice.p5.*`

#### Problem 6: Ordering

**Prompt**: "Order from least to greatest: 5,432; 5,423; 5,234"
- i18n key: `lesson.placeValue.practice.p6.prompt`

**Visual**: Three number cards, initially in the given order:
- Each card: `min-width: 100px`, `height: 56px`, `border-radius: 12px`, `background: #334155`, font-size 22px, white text, centered
- Cards are horizontally arranged with 16px gaps
- Below the cards: three numbered slots (1, 2, 3) labeled "Least", "", "Greatest"

**Input**: Drag-to-reorder. Student drags cards into the desired order.
- During drag: lifted card has `scale: 1.05`, `shadow: 0 8px 24px rgba(0,0,0,0.4)`, `z-index: 10`
- Drop: card slots into position with `spring({ damping: 20, stiffness: 300 })`
- Alternatively: tap a card to select it (highlighted border), tap a slot to place it

**Correct order**: 5,234; 5,423; 5,432

**Feedback on correct**:
1. All three cards turn green (border `#34d399`)
2. A smooth slide animation reflows them into final positions (0.4s)
3. Below each card, the expanded form fades in (small text, 12px):
   - `5,234 = 5000+200+30+4`
   - `5,423 = 5000+400+20+3`
   - `5,432 = 5000+400+30+2`
4. The differing digits are highlighted: all three share `5` in thousands. The hundreds differ: `2` < `4` = `4`. For the two with `4` in hundreds, the tens differ: `2` < `3`.
5. Text: "All start with 5,000. Then compare hundreds: 200 < 400. For the two with 400, compare tens: 20 < 30."
6. "Why?" prompt omitted for ordering (the comparison strategy was already explained in P4). Instead, show: "You compared place by place, from left to right. That's the standard algorithm for ordering numbers!"
- i18n keys: `lesson.placeValue.practice.p6.*`

### Layer 2: Understanding (Problems 7-9)

#### Problem 7: Conceptual Explanation (Free Text)

**Prompt**: "Why does moving a digit one place to the left make it worth 10 times more?"
- i18n key: `lesson.placeValue.practice.p7.prompt`

**Input**: Text area
- Min height: 100px, max height: 200px, auto-grow
- Placeholder: "Type your explanation here..." (i18n key: `lesson.placeValue.practice.p7.placeholder`)
- Character counter in bottom-right: shows current / minimum (40 characters minimum)
- Submit button: disabled until minimum character count reached
- Background: `#0f172a`, border: 1px solid `#475569`, `border-radius: 12px`, padding 16px
- Font: 16px, `#e2e8f0`, line-height 1.6

**After submission**: The student's answer is sent to the AI evaluation endpoint (`lesson.submitReflection`). While waiting for evaluation (typically < 2s):
- Show a pulsing "Evaluating..." indicator

**Then show a teaching animation**:
1. Start with 1 unit cube (green, labeled "1")
2. Animate 10 unit cubes appearing, then merging into 1 rod (cyan, labeled "10") -- same regrouping animation from Stage 2 but faster (1.5s total)
3. Animate 10 rods appearing, then merging into 1 flat square (blue, labeled "100")
4. Animate 10 flat squares appearing, then merging into 1 large cube (purple, labeled "1,000")
5. Below the animation, show the pattern:
   - `1 -> 10 -> 100 -> 1,000`
   - `x10   x10    x10`
6. Text: "Each position is 10 times the one before it because our number system is base 10. Ten of any unit always makes one of the next unit up."

**AI feedback**: Display below the animation in a card:
- Quality score: 0-5 stars (rendered as filled/unfilled star icons, 20px, `#fbbf24` filled, `#475569` unfilled)
- Feedback text from the AI evaluator
- XP earned: displayed as "+{amount} XP" in a pill badge

#### Problem 8: Creative Challenge

**Prompt**: "Create the largest 4-digit number using the digits 3, 7, 1, 9. Each digit can only be used once."
- i18n key: `lesson.placeValue.practice.p8.prompt`

**Input**: Same drag-to-arrange interface as Stage 3 Prompt 3:
- Source chips: `1`, `3`, `7`, `9` (shuffled)
- Drop slots: Thousands, Hundreds, Tens, Ones

**Live value preview**: As the student places digits, the running total updates in real-time:
- Show the total as a number AND in expanded form:
  - Number: e.g., `9,731`
  - Expanded: `9 x 1,000 + 7 x 100 + 3 x 10 + 1 x 1 = 9,731`

**Correct answer**: 9,731

**Feedback on correct**:
1. Green checkmark, confetti burst
2. Text: "9,731! You put the largest digit (9) in the most powerful position and worked down. The strategy is: sort digits from largest to smallest, then place left to right."
3. "Why?" prompt: "Would this strategy work for making the largest number with ANY set of digits?"
4. Reveal: "Yes! The leftmost position always has the most value, so you always want the largest available digit there. This works no matter how many digits you have."
- i18n keys: `lesson.placeValue.practice.p8.*`

#### Problem 9: Zero's Purpose (Free Text)

**Prompt**: "Explain why the 0 is important in 5,027. What would the number be without it?"
- i18n key: `lesson.placeValue.practice.p9.prompt`

**Input**: Same text area as Problem 7 (40-character minimum).

**After submission**, show a visual comparison:
1. Left side: `5,027` shown with blocks:
   - 5 large cubes (purple)
   - 0 flat squares (blue) -- empty row with a dashed outline and label "0 hundreds"
   - 2 rods (cyan)
   - 7 unit cubes (green)
2. Right side: `527` shown with blocks:
   - 5 flat squares (blue)
   - 2 rods (cyan)
   - 7 unit cubes (green)
3. A red "not equal" sign (`≠`) between them, pulsing
4. Below: a number line segment showing the distance between 527 and 5,027:
   - The gap is labeled "4,500 apart!" in bold red
5. Text: "Without the 0, the 5 drops from the thousands place to the hundreds place. The number goes from 5,027 to 527 -- that's 4,500 less! Zero is a placeholder that keeps every other digit in its correct position."

**AI feedback**: Same pattern as Problem 7.

### Practice XP Calculation

| Factor | XP |
|--------|----|
| Correct on first try | 15 XP |
| Correct on second try | 8 XP |
| Correct on third+ try | 4 XP |
| "Why?" reflection quality (AI-scored 0-5) | 0-10 XP bonus |
| All 9 correct on first try | +20 XP bonus (Perfect Practice) |
| Completing practice stage | +10 XP (participation) |
| Total possible range | 90 + 90 + 20 + 10 = **210 XP max** |

### Accessibility (Stage 6)
- Free-text areas have `aria-label` describing the expected response
- Multiple-choice buttons have `role="radio"` within a `role="radiogroup"`
- Drag-to-arrange has keyboard alternative (Tab + Enter to pick up/place)
- Feedback is announced via `aria-live="assertive"` for correctness, `aria-live="polite"` for explanations
- Timer is not used -- students have unlimited time on each problem (reduces math anxiety, per Constitution)

---

## 9. Stage 7: Reflection (~1 minute)

### Purpose
Metacognitive self-explanation. The student consolidates their understanding by generating an explanation in their own words. This is the highest-value learning activity per the self-explanation effect research (Chi et al., 1989).

### Layout
Centered card, max-width 640px. Dark background.

### Prompt

**Card** (background `#1e293b`, border-radius 16px, padding 24px):
- **Header**: "Reflection" in a small pill badge (background `#7c3aed20`, text `#a78bfa`, 12px, uppercase, letter-spacing 1px)
- **Prompt text**: "Explain in your own words why the digit 5 means different things in 500, 50, and 5."
  - i18n key: `lesson.placeValue.stage7.prompt`
  - Font: 18px, `#f8fafc`, line-height 1.6, font-weight 500
- **Visual hint**: Below the prompt, show the three numbers with the `5` highlighted:
  - `500` with `5` in blue (hundreds position), other digits dimmed
  - `50` with `5` in cyan (tens position), other digit dimmed
  - `5` with `5` in green (ones position)
  - Arranged horizontally, each number 32px, separated by vertical dots (`...`)
  - This is visible before the student starts typing, to prime their thinking

### Input

**Text area**:
- Min height: 120px, auto-grow to max 240px
- Placeholder: "The digit 5 means different things because..." (i18n key: `lesson.placeValue.stage7.placeholder`)
- Character counter: `{current} / 30 minimum`
  - Color: `#64748b` (slate-500) when below minimum, `#34d399` (green) when minimum reached
  - Position: bottom-right of text area
- Border: 1px solid `#475569`, `border-radius: 12px`, padding 16px
- Background: `#0f172a`
- Font: 16px, `#e2e8f0`, line-height 1.6

**Submit button**:
- Disabled until 30+ characters entered (opacity 0.4, no pointer-events)
- Enabled: primary purple button (`#8b5cf6`), "Submit Reflection" text
- Size: full width, 52px tall, `border-radius: 12px`
- Loading state: spinner replaces text during AI evaluation

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
   - The three numbers (500, 50, 5) from the prompt animate:
     - Each `5` floats to its respective column position (matching the Hook animation style)
     - Columns labeled "Hundreds", "Tens", "Ones" in matching colors
     - Below each positioned `5`, the value appears: "500", "50", "5"
   - Animation duration: 1.5s total
   - This reinforces the lesson's core concept one final time

4. **Lesson Complete**:
   - After feedback, a "Complete Lesson" button fades in (1s delay)
   - Same primary button style
   - On tap: triggers the lesson completion flow:
     - XP summary animation (total XP earned across all stages, shown as a counting-up number)
     - Achievement check (may trigger "First Steps" achievement for completing first lesson)
     - SRS state update: marks NO-1.1 as "learning" at recall layer (layer 0)
     - Unlocks successor topics: NO-1.2 (Integers), NO-1.3 (Decimals), NT-2.1 (Factors & Multiples), NO-1.6 (Order of Operations) become "available" in the Knowledge Nebula
     - Redirects to the lesson summary screen or back to the learn page

### Accessibility (Stage 7)
- Prompt is in a `<label>` element linked to the text area via `for`/`id`
- Star rating is announced via `aria-live`: "Your reflection scored 4 out of 5 stars"
- AI feedback is in an `aria-live="polite"` region
- The confirmation visual has an `aria-label` describing the concept: "The digit 5 is worth 500 in the hundreds place, 50 in the tens place, and 5 in the ones place"

---

## 10. Technical Specifications

### Color Palette (Place Value)

| Place | Primary | Fill (20%) | CSS Variable |
|-------|---------|------------|-------------|
| Thousands | `#a78bfa` | `#a78bfa33` | `--pv-thousands` |
| Hundreds | `#60a5fa` | `#60a5fa33` | `--pv-hundreds` |
| Tens | `#22d3ee` | `#22d3ee33` | `--pv-tens` |
| Ones | `#34d399` | `#34d39933` | `--pv-ones` |
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

The four place-value colors were chosen to be distinguishable under the three most common forms of color vision deficiency:

| Color | Protanopia | Deuteranopia | Tritanopia |
|-------|-----------|-------------|-----------|
| Purple `#a78bfa` | Blue-gray | Blue-gray | Pink-gray |
| Blue `#60a5fa` | Blue | Blue | Blue-green |
| Cyan `#22d3ee` | Light blue | Light blue | Green |
| Green `#34d399` | Yellow-brown | Yellow-brown | Blue-gray |

All four remain distinguishable under each deficiency. However, per Constitution Principle IV, color is never the SOLE channel for meaning. Every color-coded element also has:
- A text label (e.g., "Thousands", "Hundreds")
- A position (left-to-right ordering)
- A size difference (blocks are different sizes)

### Typography

| Element | Font | Size | Weight | Features |
|---------|------|------|--------|----------|
| Large numbers | System mono / JetBrains Mono | `clamp(36px, 8vw, 56px)` | 700 | `tabular-nums`, `font-variant-numeric: tabular-nums` |
| Inline numbers | System mono | `clamp(16px, 3.5vw, 22px)` | 600 | `tabular-nums` |
| Body text | System sans (Inter preferred) | 16px | 400 | `line-height: 1.6` |
| Labels | System sans | `clamp(10px, 2.5vw, 14px)` | 600 | `text-transform: uppercase`, `letter-spacing: 0.5px` |
| KaTeX math | KaTeX default | `clamp(16px, 3.5vw, 22px)` | -- | Uses KaTeX's own rendering |
| Button text | System sans | 16px | 600 | -- |

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
```

#### Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- All spring animations become simple `opacity` transitions (0.3s)
- No `scale`, `translate`, or `rotate` animations
- Regrouping: show final state directly (old blocks disappear, new block appears)
- Hook: show final composed state with a single fade-in
- Particle effects (confetti, ripples, trails) are disabled entirely

```typescript
const useReducedMotion = (): boolean => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
};
```

### Touch & Interaction Targets

| Element | Min Size | Notes |
|---------|----------|-------|
| +/- buttons | 48px x 48px | Exceeds 44px requirement |
| Digit chips (draggable) | 56px x 56px | Large enough for drag initiation |
| Multiple-choice buttons | full-width x 52px | Easy to tap on mobile |
| Drop slots | 56px x 56px (min) | Clear visual target |
| Continue button | 160px x 48px | Prominent, centered |
| Text area | full-width x 100px+ | Auto-growing, comfortable input |

### Gesture Handling

All drag interactions use `@use-gesture/react`:

```typescript
const bindDrag = useDrag(({ movement: [mx, my], active, cancel }) => {
  // Touch: 10px deadzone before drag initiates
  // Prevents accidental drags when tapping
  if (Math.abs(mx) < 10 && Math.abs(my) < 10 && !active) return;

  // During drag: update position with velocity tracking
  // On release: snap to nearest valid slot or return to origin
}, {
  filterTaps: true,    // Separate tap from drag
  threshold: 10,       // 10px deadzone
  rubberband: true,    // Elastic feel when dragging past bounds
});
```

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile S | < 375px | Single column, controls stacked vertically, font sizes at `clamp` minimums |
| Mobile M | 375-639px | Single column, controls in a 2x2 grid, comfortable spacing |
| Tablet | 640-1023px | Stage 2: side-by-side panels (60/40). Practice problems: wider cards. |
| Desktop | >= 1024px | Max-width container (800px), centered. Stage 2: side-by-side with generous spacing. |

### Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Animation frame rate | 60fps (P95 >= 55fps) | Framer Motion `onFrame` callback + `PerformanceObserver` |
| SVG element count (Stage 2, max blocks) | <= 150 elements | 9*4 blocks + labels + controls + grid |
| Time to interactive (Stage 2) | < 1.5s | From stage transition to first interaction available |
| Memory (Stage 2, all blocks) | < 20MB | Heap snapshot |
| Block addition latency | < 16ms (1 frame) | State update + render |
| Regrouping animation | Consistent 60fps | No layout thrashing during merge |

### State Persistence

Lesson progress is persisted to both local storage (Dexie.js) and server (via `lesson.completeStage` tRPC call):

```typescript
interface LessonProgressState {
  lessonId: "NO-1.1";
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
src/content/domains/numbers-operations/NO-1.1/
├── lesson.mdx              # Stage text content (i18n-ready)
├── animations.json          # MathScene DSL configs for all stages
├── problems.json            # Practice problem bank (9 problems)
└── meta.json                # Metadata: prerequisites, successors, hooks

src/components/lesson/custom/
└── PlaceValueLesson/
    ├── PlaceValueLesson.tsx  # Custom lesson component (orchestrates all stages)
    ├── HookAnimation.tsx     # Stage 1: cinematic number decomposition
    ├── BlockWorkspace.tsx    # Stage 2: base-10 block manipulation
    ├── Base10Block.tsx       # Individual block component (CSS-only, parameterized)
    ├── BlockControls.tsx     # +/- buttons for each block type
    ├── RegroupAnimation.tsx  # Regrouping merge animation
    ├── DigitArranger.tsx     # Shared drag-to-arrange component (Stage 3, Practice)
    ├── SymbolOverlay.tsx     # Stage 4: notation appearance
    ├── NumberDisplay.tsx     # Live-updating number with breakdown
    └── index.ts              # Barrel export
```

### i18n Keys (Complete List)

All user-facing strings are externalized. The following keys are added to `src/lib/i18n/messages/en.json` under the `lesson.placeValue` namespace:

```
lesson.continue
lesson.placeValue.stage2Hint
lesson.placeValue.noBlocksToRemove
lesson.placeValue.stage3.prompt1
lesson.placeValue.stage3.prompt2
lesson.placeValue.stage3.prompt3
lesson.placeValue.stage3.prompt3.correct
lesson.placeValue.stage3.prompt3.hint
lesson.placeValue.stage3.prompt4
lesson.placeValue.stage3.prompt4.correct
lesson.placeValue.stage3.prompt4.hint
lesson.placeValue.stage3.keyInsight
lesson.placeValue.stage4.powerOf10Insight
lesson.placeValue.stage5.card1
lesson.placeValue.stage5.card2
lesson.placeValue.stage5.card3
lesson.placeValue.practice.p1.prompt
lesson.placeValue.practice.p1.why
lesson.placeValue.practice.p1.whyAnswer
lesson.placeValue.practice.p2.prompt
lesson.placeValue.practice.p2.why
lesson.placeValue.practice.p2.whyAnswer
lesson.placeValue.practice.p3.prompt
lesson.placeValue.practice.p3.why
lesson.placeValue.practice.p3.whyAnswer
lesson.placeValue.practice.p4.prompt
lesson.placeValue.practice.p4.why
lesson.placeValue.practice.p4.whyAnswer
lesson.placeValue.practice.p5.prompt
lesson.placeValue.practice.p5.why
lesson.placeValue.practice.p5.whyAnswer
lesson.placeValue.practice.p6.prompt
lesson.placeValue.practice.p6.why
lesson.placeValue.practice.p6.whyAnswer
lesson.placeValue.practice.p7.prompt
lesson.placeValue.practice.p7.placeholder
lesson.placeValue.practice.p8.prompt
lesson.placeValue.practice.p8.why
lesson.placeValue.practice.p8.whyAnswer
lesson.placeValue.practice.p9.prompt
lesson.placeValue.stage7.prompt
lesson.placeValue.stage7.placeholder
```

### Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Student navigates away mid-lesson | State persisted to IndexedDB. On return, resume from last completed stage. Show "Welcome back! You left off at Stage {n}." |
| Network offline during Practice | Problems are loaded at stage entry and cached. Submissions queue locally. Sync when online. |
| Network offline during Reflection | Reflection text saved locally. AI evaluation deferred. Show "We'll evaluate your reflection when you're back online." |
| Student submits empty/whitespace reflection | Client-side validation prevents submission. Min 30 chars of non-whitespace. |
| Student submits gibberish reflection | AI evaluator gives 0-1 star score. Feedback: "Try to explain the concept in your own words. What does position mean for a digit's value?" No punitive action. |
| Regrouping at max (9 thousands + 9 hundreds + 9 tens + 10 ones) | 10 ones regroup to 1 ten, making 10 tens, which regroup to 1 hundred, making 10 hundreds, which regroup to 1 thousand. Chain regrouping is supported. Each regrouping plays sequentially (2.5s each). The number display updates after each step. Final state: 10 thousands = the system caps at 9,999 and shows a message: "You've reached the maximum! Our place value system can go even further with ten-thousands, hundred-thousands, and beyond." |
| Student rage-taps +1 button rapidly | Debounce at 200ms. Each tap within debounce window is ignored. The button shows a brief disabled state between taps. |
| Screen reader with regrouping | Announce each phase: "10 ones detected. Regrouping into 1 ten. Ones count is now 0. Tens count is now {n+1}." |
| Very slow device (< 30fps detected) | Disable particle effects (ripples, confetti, trails). Reduce regrouping animation to simplified version (blocks disappear, new block appears, no merge path). Log performance warning to analytics. |
| RTL layout (future) | Number display, block workspace, and drag slots all work in LTR for mathematical content (numbers are always LTR). UI chrome (labels, buttons, navigation) follows RTL rules. |

---

## Appendix A: Content Files

### meta.json

```json
{
  "id": "NO-1.1",
  "name": "Place Value",
  "domain": "numbers-operations",
  "gradeLevel": 6,
  "prerequisites": [],
  "successors": ["NO-1.2", "NO-1.3", "NT-2.1", "NO-1.6"],
  "estimatedMinutes": 25,
  "stages": 7,
  "hook": "The number 3,456 splits apart to reveal each digit's true value — position is power",
  "tags": ["base-10", "place-value", "number-system", "expanded-form"],
  "contentLicense": "CC BY-SA 4.0",
  "version": "1.0.0"
}
```

### problems.json (Structure)

```json
{
  "problems": [
    {
      "id": "NO-1.1-P1",
      "layer": 0,
      "type": "digit-identification",
      "difficulty": 0.2,
      "prompt": "lesson.placeValue.practice.p1.prompt",
      "visual": {
        "number": 4729,
        "highlight": "hundreds"
      },
      "answer": {
        "correct": "7",
        "options": ["4", "7", "2", "9"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.placeValue.practice.p1.correct",
        "incorrect": "lesson.placeValue.practice.p1.incorrect",
        "why": "lesson.placeValue.practice.p1.why",
        "whyAnswer": "lesson.placeValue.practice.p1.whyAnswer"
      }
    }
  ]
}
```

(Full problems.json contains all 9 problems in this structure. Omitted for brevity but each follows the same schema with problem-specific `type`, `visual`, `answer`, and `feedback` fields.)

---

## Appendix B: XP Summary

| Source | Min XP | Max XP |
|--------|--------|--------|
| Hook (completion) | 5 | 5 |
| Spatial Experience (completion + interactions) | 10 | 15 |
| Guided Discovery (all prompts completed) | 10 | 15 |
| Symbol Bridge (completion) | 5 | 5 |
| Real-World Anchor (completion) | 5 | 5 |
| Practice (9 problems) | 36 | 210 |
| Reflection (AI-scored) | 0 | 80 |
| **Total** | **71** | **335** |

---

## Appendix C: Acceptance Criteria

A developer has fully implemented this lesson when:

1. [ ] All 7 NLS stages render and transition correctly in sequence
2. [ ] Hook animation plays automatically with correct timing, colors, and layout
3. [ ] Base-10 blocks can be added/removed with correct visual feedback
4. [ ] Regrouping animation plays when 10 of any type is reached
5. [ ] Number display always shows correct total with color-coded breakdown
6. [ ] Guided Discovery drag-to-arrange validates correctly for both challenges
7. [ ] Symbol Bridge notation appears with correct KaTeX rendering and timing
8. [ ] Real-World Anchor cards display and animate correctly
9. [ ] All 9 practice problems function with correct input types and validation
10. [ ] "Why does this work?" prompts appear after each correct practice answer
11. [ ] Free-text problems (P7, P9) submit to AI evaluation and display feedback
12. [ ] Reflection stage enforces 30-char minimum and submits for AI scoring
13. [ ] Confirmation visual plays after reflection submission
14. [ ] All interactions meet 44px minimum touch target
15. [ ] `prefers-reduced-motion` disables all motion-intensive animations
16. [ ] Screen reader announces all state changes via `aria-live` regions
17. [ ] Keyboard navigation works for all interactive elements
18. [ ] Mobile layout (< 640px) is single-column and usable
19. [ ] Tablet+ layout (>= 640px) uses side-by-side where specified
20. [ ] All strings use i18n keys (no hardcoded English in components)
21. [ ] Lesson progress persists to IndexedDB and syncs to server
22. [ ] XP is calculated correctly per the XP Summary table
23. [ ] Performance: 60fps on mid-range mobile during all animations
24. [ ] Storybook stories exist for each stage in isolation
25. [ ] Vitest tests cover: block math correctness, regrouping logic, expanded form validation, comparison logic
26. [ ] Playwright E2E test covers full lesson completion flow (all 7 stages)
