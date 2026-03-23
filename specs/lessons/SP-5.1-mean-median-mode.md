# Lesson Design: SP-5.1 Mean, Median, Mode

**Version**: 1.0.0 | **Date**: 2026-03-22 | **Author**: Lesson Design Team
**Concept ID**: SP-5.1 | **Domain**: Statistics & Probability | **Grade**: 6
**Prerequisites**: NO-1.3 (Decimals) | **Successors**: SP-5.2, SP-5.1a, SP-5.3
**Content Path**: `src/content/domains/statistics-probability/SP-5.1/`
**Constitution Compliance**: All 7 Core Principles verified. Neural Learning Sequence followed without reordering or omission.

---

## 1. Lesson Overview

| Field | Value |
|-------|-------|
| Concept | Mean, Median, and Mode — three measures of central tendency |
| Grade | 6 (ages 11-12) |
| Duration | ~28 minutes across 7 stages |
| Learning Objective | Students understand that mean, median, and mode are three distinct ways to describe the "center" of a dataset, each telling a different story, and that choosing the right one depends on the data's shape and context |
| Secondary Objectives | Students can calculate mean by summing and dividing; students can find median by sorting and identifying the middle value; students can identify mode as the most frequent value; students can explain when mean is misleading due to outliers; students can choose the most appropriate measure for a given real-world situation |
| Common Misconceptions | (1) "Average always means the mean" — conflating the colloquial word "average" with a single specific measure. (2) "Median is just the middle number" — forgetting to sort the data first, or not knowing how to handle an even number of values. (3) "Mode is useless" — not recognizing that mode is the only measure that works for categorical (non-numeric) data. (4) Not understanding when mean is misleading — failing to notice how outliers pull the mean away from where most data lives. |
| NLS Stages | Hook, Spatial Experience, Guided Discovery, Symbol Bridge, Real-World Anchor, Practice (9 problems across 3 layers), Reflection |
| Emotional Arc | Curiosity (Hook) -> Engagement (Spatial) -> Productive Struggle (Discovery) -> Insight (Symbol Bridge) -> Confidence (Real-World) -> Mastery (Practice) -> Metacognition (Reflection) |

---

## 2. Neuroscience Framework

### Stage-by-Stage Cognitive Architecture

| Stage | Cognitive Process | Neuroscience Rationale | Target Emotional State |
|-------|------------------|----------------------|----------------------|
| 1. Hook | Attention capture, prediction error | The dopaminergic system fires on a "wait, that can't be right" moment. Showing a basketball team where the "average" height is a height nobody has creates a prediction error that primes the hippocampus for encoding. The student expects "average" to represent the group, but it doesn't — this tension drives curiosity. | Curiosity, surprise, slight discomfort |
| 2. Spatial Experience | Spatial reasoning, embodied cognition, visuospatial working memory | Manipulating dots on a number line activates the intraparietal sulcus (IPS). Seeing the mean as a physical balance point (fulcrum) grounds the abstract concept of "sum divided by count" in a bodily experience of equilibrium. Dragging dots and watching the fulcrum shift creates motor cortex traces that reinforce the concept. Median as "the middle dot when sorted" and mode as "the tallest stack" are inherently spatial representations. | Engagement, playful exploration, discovery |
| 3. Guided Discovery | Pattern recognition, relational reasoning, elaborative interrogation | Introducing an outlier and asking "what changed?" forces the prefrontal cortex to compare two states. The anterior cingulate cortex (ACC) detects the prediction error — the mean moved dramatically but the median barely budged. This contrastive analysis strengthens the conceptual distinction between the three measures because the brain must extract the abstract rule (different measures respond differently to data shape). | Productive struggle, dawning insight |
| 4. Symbol Bridge | Symbolic encoding, dual coding integration | Overlaying the formulas onto the already-established dot plot leverages dual coding: the visual (fulcrum, sorted dots, stacks) and symbolic (formulas) channels reinforce each other. Introducing notation AFTER spatial experience means the symbols anchor to existing neural patterns rather than floating as abstract syntax. The mean formula connects to the physical balance point; the median algorithm connects to the sorted dots. | Insight, "aha" moment |
| 5. Real-World Anchor | Semantic memory integration, transfer preparation | Connecting mean/median/mode to salary negotiations, shoe shopping, and game scores activates the brain's semantic network, creating multiple retrieval paths. These scenarios are personally relevant to 11-14 year olds, which enhances hippocampal binding. | Confidence, relevance |
| 6. Practice | Retrieval practice, error-driven learning, progressive challenge | The 3-layer structure (recall -> procedure -> understanding) maps to Bloom's taxonomy and the SRS layers. The "choose the best measure" problems force the deepest processing because they require integrating calculation skill with contextual reasoning. | Mastery, self-efficacy |
| 7. Reflection | Metacognition, self-explanation effect | Generating an explanation of WHY the mean can be misleading forces the brain to organize fragmented understanding into a coherent narrative. This self-explanation effect (Chi et al., 1989) produces 2-3x better retention than passive review. | Metacognition, ownership |

### Why This Ordering Works

The sequence spatial-before-symbolic is critical for statistics concepts. Students who first experience mean as a balance point (Stage 2) and then see the formula (Stage 4) understand that dividing by N is about finding the equilibrium — not just a procedure to execute. Research (Bakker & Gravemeijer, 2004) shows that students who explore data distributions spatially before learning formal measures develop more robust statistical reasoning and are better at choosing appropriate measures for context.

The emotional arc is equally deliberate. The Hook creates cognitive dissonance ("average doesn't describe anyone!") that opens the dopaminergic learning gate. The Spatial Experience sustains engagement through tangible manipulation. The Discovery stage produces the critical insight that different measures have different strengths. The Symbol Bridge provides the satisfaction of connecting intuition to formalism. The Real-World stage transfers the concept from abstract to applied. Practice consolidates through retrieval. Reflection deepens through self-explanation.

---

## 3. Stage 1: Hook (30-60 seconds)

### Purpose
Activate curiosity by showing that "average" can be deeply misleading. The student sees a basketball team where the mean height describes nobody — creating a prediction error that primes the brain for learning about different measures of center.

### Animation Design

**Canvas**: Full viewport width, centered vertically. Background: dark (`#0f172a`, Tailwind `slate-900`). No grid, no axes — clean stage.

**Sequence**:

#### Phase 1: Team Assembly (0s - 2.5s)

1. **0.0s**: Five silhouette figures (simple SVG stick-figure outlines, stroke `#94a3b8`, no fill) appear one at a time in a horizontal row across the center of the viewport, each with a height label above their head.
   - Figure spacing: evenly distributed, `clamp(50px, 12vw, 90px)` gap between figures
   - Figure 1: Height 6'0" — silhouette height: 120px
   - Figure 2: Height 6'1" — silhouette height: 123px
   - Figure 3: Height 6'2" — silhouette height: 126px
   - Figure 4: Height 6'3" — silhouette height: 129px
   - Each figure fades in with `opacity: 0 -> 1`, `translateY: 12px -> 0`, 0.4s, `ease: "easeOut"`, staggered 0.3s apart
   - Height labels: `clamp(12px, 3vw, 16px)`, white (`#f8fafc`), font-weight 600, mono font, `tabular-nums`
   - All four figures stand on a subtle baseline (1px, `#334155`)

2. **1.6s**: A title label fades in above the row:
   - "A basketball team's heights:" in `#e2e8f0` (slate-200), `clamp(14px, 3.5vw, 18px)`, font-weight 500
   - `opacity: 0 -> 1`, 0.3s, `ease: "easeOut"`

#### Phase 2: The Outlier (2.5s - 4.0s)

3. **2.5s**: A dramatic pause (0.3s), then Figure 5 rises from below the viewport:
   - Height 7'6" — silhouette height: 190px (towers over the others)
   - Color: stroke transitions to amber (`#fbbf24`) during entry to draw attention
   - Animation: `translateY: 100px -> 0`, `opacity: 0 -> 1`, 0.6s, `ease: "easeOutBack"` (slight overshoot for dramatic effect)
   - Height label "7'6\"" in amber (`#fbbf24`), pulsing glow: `text-shadow: 0 0 12px #fbbf2480`
   - A small label below Figure 5: "Yao Ming!" in amber, `clamp(10px, 2.5vw, 13px)`, italic

4. **3.3s**: The other four figures visually "react" — their silhouettes tilt slightly backward (rotate -3deg, 0.3s, spring) as if looking up. This is a small humanizing touch for engagement.

#### Phase 3: The Misleading Average (4.0s - 6.5s)

5. **4.0s**: A horizontal bracket appears below all five figures, spanning the full row:
   - Bracket: 2px, `#818cf8` (indigo), with small upward ticks at each end
   - Animation: draw from center outward, 0.3s

6. **4.3s**: Below the bracket, the text "Average height:" fades in:
   - Color: `#818cf8` (indigo), `clamp(14px, 3vw, 18px)`, font-weight 500
   - `opacity: 0 -> 1`, 0.3s

7. **4.8s**: The calculated average "6'5\"" appears in a dramatic reveal:
   - Font size: `clamp(32px, 7vw, 56px)`, font-weight 800, color `#818cf8` (indigo)
   - Animation: `scale: 0.5 -> 1.1 -> 1.0`, `opacity: 0 -> 1`, 0.5s, `spring({ damping: 15, stiffness: 400 })`
   - A subtle glow: `text-shadow: 0 0 20px #818cf860`

8. **5.5s**: A dashed horizontal line appears at the 6'5" height across all five figures:
   - Style: 2px dashed, `#818cf880`
   - The line clearly shows that NONE of the five figures reach exactly 6'5" — the four short ones are below it, Yao Ming is far above it
   - Animation: draw from left to right, 0.4s

9. **5.9s**: Below the average, the punchline text slides in:
   - "But NOBODY on the team is actually 6'5\"!"
   - Color: `#fb7185` (rose-400), `clamp(14px, 3.5vw, 18px)`, font-weight 600, italic
   - Animation: `opacity: 0 -> 1`, `translateY: 6px -> 0`, 0.4s, `ease: "easeOut"`

#### Phase 4: The Question (6.5s - 8.0s)

10. **6.5s**: A text card slides up from the bottom:
    - Background: `#1e293b` (slate-800), `border-radius: 12px`, `padding: 16px 20px`
    - Text: "Maybe 'average' isn't always the best way to describe a group..."
    - Color: `#e2e8f0` (slate-200), `clamp(14px, 3.5vw, 16px)`, line-height 1.5
    - The word "average" is in quotes and styled with `color: #818cf8`, font-weight 600
    - Animation: `translateY: 24px -> 0`, `opacity: 0 -> 1`, 0.4s, `ease: "easeOut"`
    - i18n key: `lesson.meanMedianMode.hook.question`

#### Phase 5: Continue Button (8.0s+)

11. **8.0s**: Continue button fades in below the text card:
    - Text: "Continue" (i18n key: `lesson.continue`)
    - Style: filled button, primary color (`#8b5cf6` purple-500), white text
    - Size: `min-width: 160px`, `height: 48px` (meets 44px touch target requirement)
    - Animation: `opacity: 0 -> 1`, 0.5s, `ease: "easeOut"`
    - Hover state: `background: #7c3aed` (purple-600)
    - Active state: `scale: 0.97`, 0.1s

### Accessibility
- `aria-live="polite"` region announces: "A basketball team's heights: six foot zero, six foot one, six foot two, six foot three, and seven foot six (Yao Ming). The average height is six foot five, but nobody on the team is actually six foot five."
- All animated elements have `prefers-reduced-motion` fallback: show the final state immediately with simple fade-in (0.5s total instead of 8s)
- Silhouette figures and text labels are actual SVG/DOM elements for screen reader access

### MathScene DSL (Hook Animation)

```json
{
  "id": "SP-5.1-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 800, 500],
  "background": "#0f172a",
  "objects": [
    {
      "type": "annotation", "id": "title",
      "position": [400, 40], "text": "A basketball team's heights:",
      "style": { "fontSize": 18, "fill": "#e2e8f0", "fontWeight": 500, "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "group", "id": "team",
      "children": [
        {
          "type": "group", "id": "player-1",
          "children": [
            { "type": "geometricShape", "id": "silhouette-1", "shape": "custom-player", "center": [160, 320], "height": 120, "style": { "stroke": "#94a3b8", "fill": "none", "strokeWidth": 2 } },
            { "type": "annotation", "id": "label-1", "position": [160, 245], "text": "6'0\"", "style": { "fontSize": 14, "fill": "#f8fafc", "fontWeight": 600, "fontFamily": "monospace" } }
          ]
        },
        {
          "type": "group", "id": "player-2",
          "children": [
            { "type": "geometricShape", "id": "silhouette-2", "shape": "custom-player", "center": [280, 318], "height": 123, "style": { "stroke": "#94a3b8", "fill": "none", "strokeWidth": 2 } },
            { "type": "annotation", "id": "label-2", "position": [280, 242], "text": "6'1\"", "style": { "fontSize": 14, "fill": "#f8fafc", "fontWeight": 600, "fontFamily": "monospace" } }
          ]
        },
        {
          "type": "group", "id": "player-3",
          "children": [
            { "type": "geometricShape", "id": "silhouette-3", "shape": "custom-player", "center": [400, 316], "height": 126, "style": { "stroke": "#94a3b8", "fill": "none", "strokeWidth": 2 } },
            { "type": "annotation", "id": "label-3", "position": [400, 239], "text": "6'2\"", "style": { "fontSize": 14, "fill": "#f8fafc", "fontWeight": 600, "fontFamily": "monospace" } }
          ]
        },
        {
          "type": "group", "id": "player-4",
          "children": [
            { "type": "geometricShape", "id": "silhouette-4", "shape": "custom-player", "center": [520, 314], "height": 129, "style": { "stroke": "#94a3b8", "fill": "none", "strokeWidth": 2 } },
            { "type": "annotation", "id": "label-4", "position": [520, 237], "text": "6'3\"", "style": { "fontSize": 14, "fill": "#f8fafc", "fontWeight": 600, "fontFamily": "monospace" } }
          ]
        },
        {
          "type": "group", "id": "player-5",
          "children": [
            { "type": "geometricShape", "id": "silhouette-5", "shape": "custom-player", "center": [640, 284], "height": 190, "style": { "stroke": "#fbbf24", "fill": "none", "strokeWidth": 2.5 } },
            { "type": "annotation", "id": "label-5", "position": [640, 175], "text": "7'6\"", "style": { "fontSize": 16, "fill": "#fbbf24", "fontWeight": 700, "fontFamily": "monospace" } },
            { "type": "annotation", "id": "label-yao", "position": [640, 195], "text": "Yao Ming!", "style": { "fontSize": 13, "fill": "#fbbf24", "fontStyle": "italic" } }
          ],
          "visible": false
        }
      ]
    },
    { "type": "geometricShape", "id": "baseline", "shape": "line", "from": [120, 380], "to": [680, 380], "style": { "stroke": "#334155", "strokeWidth": 1 } },
    {
      "type": "group", "id": "average-display",
      "children": [
        { "type": "geometricShape", "id": "bracket", "shape": "bracket", "from": [140, 395], "to": [660, 395], "style": { "stroke": "#818cf8", "strokeWidth": 2 }, "visible": false },
        { "type": "annotation", "id": "avg-label", "position": [400, 415], "text": "Average height:", "style": { "fontSize": 18, "fill": "#818cf8", "fontWeight": 500, "textAnchor": "middle" }, "visible": false },
        { "type": "annotation", "id": "avg-value", "position": [400, 448], "text": "6'5\"", "style": { "fontSize": 48, "fill": "#818cf8", "fontWeight": 800, "textAnchor": "middle" }, "visible": false },
        { "type": "geometricShape", "id": "avg-line", "shape": "line", "from": [120, 268], "to": [680, 268], "style": { "stroke": "#818cf880", "strokeWidth": 2, "strokeDasharray": "6 4" }, "visible": false },
        { "type": "annotation", "id": "punchline", "position": [400, 478], "text": "But NOBODY on the team is actually 6'5\"!", "style": { "fontSize": 16, "fill": "#fb7185", "fontWeight": 600, "fontStyle": "italic", "textAnchor": "middle" }, "visible": false }
      ]
    }
  ],
  "animations": [
    {
      "id": "hook-sequence",
      "trigger": "auto",
      "steps": [
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "player-1", "duration": 0.4, "from": "bottom", "delay": 0 },
            { "action": "fadeIn", "target": "player-2", "duration": 0.4, "from": "bottom", "delay": 0.3 },
            { "action": "fadeIn", "target": "player-3", "duration": 0.4, "from": "bottom", "delay": 0.6 },
            { "action": "fadeIn", "target": "player-4", "duration": 0.4, "from": "bottom", "delay": 0.9 }
          ]
        },
        { "action": "fadeIn", "target": "title", "duration": 0.3, "ease": "easeOut" },
        { "action": "wait", "duration": 0.6 },
        { "action": "fadeIn", "target": "player-5", "duration": 0.6, "from": "bottom", "ease": "easeOutBack" },
        { "action": "wait", "duration": 0.5 },
        { "action": "fadeIn", "target": "bracket", "duration": 0.3 },
        { "action": "fadeIn", "target": "avg-label", "duration": 0.3 },
        { "action": "fadeIn", "target": "avg-value", "duration": 0.5, "from": "scale", "ease": "spring" },
        { "action": "wait", "duration": 0.2 },
        { "action": "fadeIn", "target": "avg-line", "duration": 0.4, "from": "left" },
        { "action": "fadeIn", "target": "punchline", "duration": 0.4, "from": "bottom" }
      ]
    }
  ],
  "interactions": []
}
```

---

## 4. Stage 2: Spatial Experience (3-4 minutes)

### Purpose
Provide hands-on manipulation of a dot plot on a number line where students can drag, add, and remove data points, and see mean, median, and mode update in real time. The mean is visualized as a physical balance point (fulcrum/seesaw), the median as the highlighted middle dot when sorted, and the mode as the tallest stack. No formulas, no notation. Pure spatial play.

### Layout

**Mobile** (< 768px): Single column, stacked vertically.
- Top: Measure readout panel (sticky, 80px tall) — shows mean, median, mode values with colored labels
- Middle: Dot plot with number line (scrollable if needed, flex-grow)
- Bottom: Control bar (fixed, 80px tall) — add/remove dots, reset

**Tablet+** (>= 768px): Two-panel layout.
- Left panel (65% width): Dot plot with number line
- Right panel (35% width): Measure readout panel + controls

### Component: Number Line Base

The foundation of the spatial experience — a horizontal number line.

| Property | Value |
|----------|-------|
| Range | 0 to 20 (adjustable if student drags beyond) |
| Tick marks | Major ticks at every integer (1px, `#475569`, 8px tall). Minor ticks at 0.5 intervals (1px, `#33415580`, 4px tall) |
| Labels | Integer labels below major ticks: 0, 1, 2, ... 20. Font: mono, `clamp(10px, 2vw, 13px)`, `#94a3b8`, `tabular-nums` |
| Width | 90% of container width. Horizontally scrollable if zoomed in. |
| Height | Number line itself is 2px, `#64748b`. Total component height with labels and dot area: `clamp(200px, 40vw, 320px)` |
| Padding | 24px left and right for dot overflow |

### Component: Dot Plot Dots

Data points are rendered as colored circles ("dots") that stack vertically above their position on the number line.

| Property | Value |
|----------|-------|
| Dot size | `clamp(20px, 4vw, 32px)` diameter |
| Dot color | `#818cf8` (indigo) — default for all dots |
| Dot stroke | 2px, `#6366f1` (indigo-500, slightly darker for definition) |
| Dot fill | `#818cf880` (50% opacity fill) |
| Stacking | Dots at the same integer value stack vertically, 2px gap between dots |
| Stack direction | Bottom-to-top (first dot sits on the number line, subsequent dots stack above) |
| Maximum per position | 8 dots (at 8, the `+` button for that position is disabled) |
| Snap behavior | Dots snap to the nearest integer when dragged and released. During drag, the dot visually hovers at the exact cursor position; on release, it animates to the nearest integer with `spring({ damping: 20, stiffness: 300 })` |

### Component: Dot Dragging

Students can drag existing dots to new positions on the number line.

| Property | Value |
|----------|-------|
| Gesture library | `@use-gesture/react` `useDrag` hook |
| Drag initiation | 8px deadzone to prevent accidental drags when tapping |
| During drag | Dot scales to 1.15x, shadow increases (`drop-shadow(0 4px 12px rgba(0,0,0,0.4))`), color brightens to full opacity `#818cf8`, z-index raised above all other dots |
| Drag constraints | Horizontal only (constrained to number line range 0-20). Vertical position follows cursor slightly (10px max) for visual feedback, but snaps back on release. |
| On release | Dot animates to nearest integer position with `spring({ damping: 18, stiffness: 280 })`. If the target position already has dots, the new dot stacks on top. All three measures (mean, median, mode) update instantly. |
| Visual during drag | A thin vertical guide line (1px, `#818cf840`) extends from the cursor down to the number line, with the current snap-to value shown in a small tooltip below: e.g., "7" in white, 12px, `background: #334155`, `border-radius: 4px`, `padding: 2px 6px` |

### Component: Dot Controls

A control bar for adding and removing dots.

**Add Dot Button**:
- Label: "+ Add Dot" with a small dot icon (8px circle, indigo)
- Size: `min-width: 120px`, `height: 48px`
- Background: `#334155`, border: 1px solid `#475569`, `border-radius: 12px`
- Text: 14px, `#f8fafc`, font-weight 600
- Tap behavior: Adds a new dot at a random integer between 1 and 15 (avoiding already-crowded positions). The dot appears with a `popIn` animation at its position.
- Active state: `background: #475569`, `scale: 0.97`, 0.1s

**Remove Last Dot Button**:
- Label: "- Remove" with a small `x` icon
- Same styling as Add Dot button
- Tap behavior: Removes the most recently added dot with `scale: 1 -> 0`, `opacity: 1 -> 0`, 0.2s. Remaining dots in that stack slide down to fill the gap.
- Disabled state: `opacity: 0.3`, `pointer-events: none` when dot count is 0

**Reset Button**:
- Label: "Reset" with a circular arrow icon
- Smaller: `min-width: 80px`, `height: 40px`, outline style (transparent background, 1px border `#475569`)
- Tap behavior: All dots shrink and fade out simultaneously (`scale: 1 -> 0`, `opacity: 1 -> 0`, 0.3s). Then the preset dataset loads (see Initial State below).

### Component: Measure Readout Panel

A panel showing the three measures of center, updating in real time as dots are manipulated.

**Layout**: Three rows, each showing one measure:

| Measure | Color | Icon | Display Format |
|---------|-------|------|---------------|
| Mean | `#f59e0b` (amber-500) | Small triangle/fulcrum icon (SVG, 16px) | Number with 1 decimal place, e.g., "6.2" |
| Median | `#8b5cf6` (purple-500) | Small diamond icon (SVG, 16px, rotated square) | Integer or ".5" value, e.g., "6" or "5.5" |
| Mode | `#06b6d4` (cyan-500) | Small stacked-dots icon (SVG, 16px) | Integer, e.g., "5" — or "None" if all values unique — or "3, 7" if bimodal |

Each row:
- Height: 36px
- Background: measure color at 10% opacity, `border-radius: 8px`, `padding: 8px 12px`, `margin-bottom: 4px`
- Label: measure name in its color, 12px, font-weight 700, uppercase, letter-spacing 0.5px
- Value: measure value in white, mono font, `tabular-nums`, 20px, font-weight 600
- Update animation: When the value changes, the number does a brief `scale: 1.0 -> 1.1 -> 1.0` pulse (0.2s) and a color flash (background brightens to 30% opacity for 0.3s, then back to 10%)

### Component: Mean Balance Point (Fulcrum)

The most important spatial metaphor — the mean is shown as a fulcrum (triangle) below the number line, positioned at the mean value.

| Property | Value |
|----------|-------|
| Shape | Equilateral triangle (SVG), pointing upward, 24px wide, 16px tall |
| Color | Fill: `#f59e0b` (amber-500), stroke: `#d97706` (amber-600), 1.5px |
| Position | Centered horizontally at the mean value on the number line, directly below the line |
| Label | "Mean" in amber, 10px, font-weight 600, positioned 4px below the triangle tip |
| Movement animation | When the mean changes (due to dot add/remove/drag), the fulcrum slides to the new position with `spring({ damping: 22, stiffness: 250 })`. This sliding motion is critical — it physically shows the mean being "pulled" by data. |
| Visual effect | A faint amber vertical line (`#f59e0b30`, 1px) extends from the fulcrum up through the dot area to the top of the chart, showing the mean's position relative to the data |
| Balance metaphor | Optional: a thin line (2px, `#94a3b8`) sits on the fulcrum tip, extending left and right to the edges of the data range, tilting slightly based on data distribution. When balanced (symmetric data), the line is level. When unbalanced (outlier on one side), the line tilts toward the outlier. This tilting line is a pure visual cue — it does not affect interaction. |

### Component: Median Highlight

The median is shown by highlighting the middle dot(s) in the sorted arrangement.

| Property | Value |
|----------|-------|
| Sorted order | All dots are visually arranged left-to-right by value (they already are, since they sit on a number line). When there are multiple dots at the same value, they stack. |
| Odd count | The single middle dot gets a pulsing ring: `box-shadow: 0 0 0 3px #8b5cf680`, pulsing at 1.5s interval (opacity 0.4 -> 0.8 -> 0.4) |
| Even count | The two middle dots both get the pulsing ring. A dashed line connects them with the median value labeled at the midpoint: e.g., "5.5" in purple, 12px |
| Color | Purple ring (`#8b5cf6`), matching the Median readout color |
| Position indicator | A small diamond (rotated square, 8px, `#8b5cf6`) sits below the number line at the median position, with label "Median" in 10px, purple |

### Component: Mode Highlight

The mode is shown by highlighting the tallest stack of dots.

| Property | Value |
|----------|-------|
| Detection | The integer position(s) with the most dots |
| Visual | A translucent rectangle behind the tallest stack: `background: #06b6d420`, `border: 1px solid #06b6d440`, `border-radius: 6px`. The rectangle extends from just below the number line to just above the top dot in the stack, with 4px padding. |
| Label | "Mode" in cyan (`#06b6d4`), 10px, font-weight 600, positioned above the highlighted stack |
| Multi-modal | If two or more positions share the highest count, all get the highlight |
| No mode | If all values are unique (all stacks have 1 dot), no highlight. The Mode readout shows "None" in muted text. |
| Transition | When the mode changes (e.g., student adds a dot making a new tallest stack), the old highlight fades out (0.2s) and the new one fades in (0.3s) |

### Initial State

The scene loads with a preset dataset to give students something to immediately explore:

**Initial data**: `[2, 3, 3, 5, 5, 5, 7, 8]` (8 dots)
- Mean: 4.75 (fulcrum positioned at 4.75)
- Median: 5 (the two middle values are 5 and 5, so median = 5)
- Mode: 5 (three dots at 5, the tallest stack)

This dataset is chosen because:
1. Mean and median are close but different (showing they measure different things)
2. Mode is clear and obvious (tallest stack)
3. The data is not perfectly symmetric (slight left skew)
4. There's room to add an outlier and see dramatic effects

The dots appear with a staggered `popIn` animation (0.15s stagger, left to right) when Stage 2 loads.

### Interaction Requirements

| Requirement | Details |
|-------------|---------|
| MIN_INTERACTIONS | 10 interactions (drag, add, or remove) before Continue button appears |
| Must-do exploration | Continue also requires: student has dragged at least 1 dot AND added at least 1 dot (ensures they've experienced both interaction types) |
| Interaction tracking | Every drag release, add tap, and remove tap counts as one interaction. |
| Continue button | Fades in only after MIN_INTERACTIONS reached AND must-do exploration satisfied |
| Continue button style | Same as Hook stage continue button |
| Hint on inactivity | If 20 seconds pass without interaction: "Try dragging a dot to a new position! Watch how the mean (the triangle) moves." (i18n key: `lesson.meanMedianMode.stage2Hint`) |
| Second hint | If another 15 seconds of inactivity after first hint: "Try adding a dot way out at 18 or 19. What happens to the mean?" (i18n key: `lesson.meanMedianMode.stage2Hint2`) |

### Accessibility (Stage 2)

- Dot counts are announced via `aria-live="polite"`: "8 data points. Mean is 4.8. Median is 5. Mode is 5."
- When a dot is dragged and released: "Moved data point from 5 to 8. Mean is now 5.1. Median is now 5.5. Mode is now 5."
- Add/Remove buttons have `aria-label`: "Add a data point", "Remove most recent data point"
- Keyboard alternative for dragging: Tab to select a dot, then use left/right arrow keys to move it. Each arrow press shifts one integer. Enter to confirm, Escape to cancel.
- Fulcrum position announced on change: "Mean balance point moved to 5.1"
- High contrast mode: dot borders increase to 3px, fulcrum triangle fill opacity increases

---

## 5. Stage 3: Guided Discovery (3-5 minutes)

### Purpose
Through directed observation and an interactive outlier experiment, guide the student to discover that (a) mean is sensitive to outliers while median is resistant, (b) mode captures the most common value, and (c) different measures are best for different situations.

### Layout

Full viewport. Dark background (`#0f172a`). Content centered, max-width 720px. The dot plot from Stage 2 is displayed at the top in a compact form (60% scale), with the measure readout panel visible but non-interactive initially.

### Sequence

The stage consists of 5 sequential prompts. Each prompt must be acknowledged before the next appears. The prompts build on each other logically.

#### Prompt 1: Observation — What Each Measure Shows (display + acknowledgment)

**Visual**: The dot plot from Stage 2's initial state is shown: `[2, 3, 3, 5, 5, 5, 7, 8]`

- The fulcrum (mean at 4.75) is highlighted with a gentle amber glow
- The median dot (5) has its purple ring pulsing
- The mode stack (5, tallest) has its cyan background highlight

Three annotation callouts appear sequentially (0.5s stagger):
1. Arrow from fulcrum to a label: "Mean = 4.75 — the balance point" (amber)
2. Arrow from middle dot to label: "Median = 5 — the middle value" (purple)
3. Arrow from tallest stack to label: "Mode = 5 — the most common value" (cyan)

**Text**: Displayed below the visual in a card container:
- "This dataset has three ways to describe its 'center.' Right now, all three are telling a similar story — the center is around 5. But watch what happens when one data point goes wild..."
- Font: 16px, `#e2e8f0`, line-height 1.6
- The word "center" is in quotes, bold
- i18n key: `lesson.meanMedianMode.stage3.prompt1`

**Acknowledgment**: "Show me!" button (same style as Continue button).

#### Prompt 2: The Outlier Experiment (interactive)

**Visual**: The same dot plot, but now the student is prompted to drag the rightmost dot (value 8) to a much higher value.

A pulsing arrow (amber, bouncing left-right) points to the dot at position 8, with a label: "Drag this dot to 20 →"

**Interactive Element**: The dot at position 8 becomes draggable (same drag behavior as Stage 2). All other dots are locked (grayed-out drag handle, no response to drag gestures).

As the student drags the dot rightward:
- The fulcrum (mean) slides dramatically to the right, tracking the change in real time
- The median highlight barely moves (if at all — with data `[2, 3, 3, 5, 5, 5, 7, X]`, the median stays at 5 for any X >= 5)
- The mode highlight stays exactly on 5 (unchanged)
- The measure readout values update in real time with pulse animations

**Auto-detection**: Once the student has dragged the dot to any value >= 16, the system recognizes the outlier experiment is complete.

**Text** (appears once dot is at 16+):
- "Look at that! You moved just ONE data point, and..."
- Then, three observations animate in (0.3s stagger):
  1. "The mean jumped from 4.75 to [new value]!" (amber, bold) — with the old value crossed out in strikethrough
  2. "The median stayed right at 5." (purple, bold)
  3. "The mode didn't budge — still 5." (cyan, bold)
- i18n key: `lesson.meanMedianMode.stage3.prompt2`

**Acknowledgment**: "Interesting..." button.

#### Prompt 3: Why Does This Happen? (guided reasoning)

**Visual**: The dot plot stays as the student left it (with the outlier). The fulcrum is now far to the right of where most dots cluster.

A new visual element appears: the seesaw analogy. Below the number line, a thin beam (160px long, 3px, `#94a3b8`) balances on the fulcrum. The beam tilts toward the outlier side, with small weight indicators showing that one faraway dot has as much "pull" as several close dots.

**Text**:
- "The mean is like a seesaw's balance point. One very heavy kid sitting far from the center can tip the whole seesaw — even if there are lots of lighter kids on the other side."
- "The median doesn't care about extreme values. It only cares about position: 'Am I the middle one when everyone lines up?' Moving one person from the end of the line doesn't change who's in the middle."
- The word "balance point" is in amber, bold
- The word "position" is in purple, bold
- i18n key: `lesson.meanMedianMode.stage3.prompt3`

**Acknowledgment**: "I see it!" button.

#### Prompt 4: When Is Each Measure Best? (interactive matching)

**Text**:
- "So different measures work best in different situations. Match each scenario with the best measure!"
- i18n key: `lesson.meanMedianMode.stage3.prompt4`

**Interactive Element**: A matching exercise with 3 scenario cards and 3 measure targets.

**Left column — Scenario cards** (draggable):

| Card | Text | Background |
|------|------|-----------|
| A | "What shoe size should a store stock the most of?" | `#1e293b`, border-left 3px solid `#06b6d4` |
| B | "What's a 'typical' home price in a neighborhood with one mansion?" | `#1e293b`, border-left 3px solid `#8b5cf6` |
| C | "A student's test scores: 88, 92, 85, 90, 91. What's their overall performance?" | `#1e293b`, border-left 3px solid `#f59e0b` |

Card dimensions: `min-width: 200px`, `min-height: 56px`, `border-radius: 10px`, `padding: 12px 16px`, font-size 14px

**Right column — Measure targets** (drop zones):

| Target | Label | Color | Border |
|--------|-------|-------|--------|
| 1 | "Mean" | `#f59e0b` | 2px dashed `#f59e0b40` |
| 2 | "Median" | `#8b5cf6` | 2px dashed `#8b5cf640` |
| 3 | "Mode" | `#06b6d4` | 2px dashed `#06b6d440` |

Target dimensions: `min-width: 140px`, `min-height: 56px`, `border-radius: 10px`

**Correct matching**:
- A ("shoe sizes") -> Mode (you want the most common size)
- B ("home prices with mansion") -> Median (the outlier mansion pulls the mean)
- C ("test scores, no outliers") -> Mean (evenly spread, mean works well)

**Validation**: Each card dropped on a target:
- If correct: the card snaps into the target with `spring({ damping: 20, stiffness: 300 })`, border becomes solid in the target's color, a small green checkmark appears
- If incorrect: the card bounces back to its origin with `ease: "easeOutBack"`, 0.3s. A gentle red flash on the card border (0.3s). A hint tooltip: "Think about it — does this scenario have outliers?" (i18n key: `lesson.meanMedianMode.stage3.prompt4.hint`)

**When all 3 correctly matched**: A celebration flash (all cards briefly glow their match color, 0.4s), then an insight card appears:

- Background: `#7c3aed20`, border-left 4px solid `#8b5cf6`, padding 16px
- "Key Insight: Mean, median, and mode each tell a different story about your data. The right measure depends on the shape of the data and the question you're asking."
- i18n key: `lesson.meanMedianMode.stage3.keyInsight`

**Acknowledgment**: Continue button appears after insight card.

#### Prompt 5: Confirming Understanding (quick check)

**Text**:
- "One more question: A class of 25 students takes a test. 24 students score between 70-90, but one student scores 5 (they were sick). Which measure best represents the class's performance?"
- i18n key: `lesson.meanMedianMode.stage3.prompt5`

**Input**: Three buttons, vertically stacked:
- "Mean" (amber border) — 48px tall, full width, `border-radius: 12px`
- "Median" (purple border) — 48px tall, full width, `border-radius: 12px`
- "Mode" (cyan border) — 48px tall, full width, `border-radius: 12px`

**Correct answer**: Median

**Feedback on correct**:
1. Median button turns green (border solid `#34d399`)
2. Text: "The median! The one low score (5) is an outlier that would drag the mean down, but the median ignores it and stays right in the 70-90 range where most students actually scored."
3. i18n key: `lesson.meanMedianMode.stage3.prompt5.correct`

**Feedback on incorrect (Mean)**:
- Red flash on button
- "The mean would be pulled down by that 5. If 24 students scored 80 and one scored 5, the mean drops to about 77. But 24 out of 25 students did better than 77! The mean is misleading here."
- i18n key: `lesson.meanMedianMode.stage3.prompt5.incorrectMean`

**Feedback on incorrect (Mode)**:
- Red flash on button
- "Mode would only help if many students scored the exact same number. With scores spread across 70-90, mode might not even exist. Median is more reliable here!"
- i18n key: `lesson.meanMedianMode.stage3.prompt5.incorrectMode`

**Continue trigger**: After correct answer acknowledged.

### Accessibility (Stage 3)

- Drag-and-drop (Prompt 2, 4) has keyboard alternative: Tab to select element, arrow keys to move, Enter to place
- All prompt texts are in screen-reader-accessible containers
- Interactive state changes announced via `aria-live="polite"`: "Mean changed from 4.75 to 6.3"
- Matching validation announced: "Correct! Shoe sizes matched with Mode." / "Incorrect. Try again."
- Insight card is an `<aside>` with `role="note"`

---

## 6. Stage 4: Symbol Bridge (2-3 minutes)

### Purpose
Overlay formal mathematical notation onto the already-established spatial representation. The student now sees the abstract formulas grounded in the dot plot and fulcrum they already understand.

### Layout
Full viewport. Same dark background. The dot plot from Stage 2 is recreated (display only, not interactive) at the top at 50% height, with notation appearing below and alongside.

### Visual Baseline
Show the dot plot with the original dataset `[2, 3, 3, 5, 5, 5, 7, 8]`:
- 8 dots at their positions
- Fulcrum (mean) at 4.75
- Median highlight on the middle value (5)
- Mode highlight on the tallest stack (5)
- All three at compact size

### Animation Sequence

The notation fades in one block at a time. Each block uses KaTeX for clean math rendering and includes a visual connection (arrow or highlight) to the relevant spatial element.

#### Step 1 (0.0s - 3.0s): Mean Formula

- The fulcrum below the number line pulses with an amber glow (0.4s pulse, twice)
- A curved arrow draws from the fulcrum downward to the notation area below the dot plot
- Notation fades in as a card (background `#f59e0b10`, border-left 3px solid `#f59e0b`, `border-radius: 8px`, `padding: 12px 16px`):
  - Label: "Mean" in amber, 12px, uppercase, font-weight 700, letter-spacing 0.5px
  - KaTeX line 1: `\text{Mean} = \frac{\text{Sum of all values}}{\text{Number of values}}`
  - Color: amber (`#f59e0b`)
  - Font size: `clamp(14px, 3vw, 18px)`
  - Pause 0.8s, then the second line fades in:
  - KaTeX line 2: `= \frac{2 + 3 + 3 + 5 + 5 + 5 + 7 + 8}{8} = \frac{38}{8} = 4.75`
  - Each number in the numerator is colored indigo (`#818cf8`, matching the dots)
  - The denominator `8` is colored white
  - The result `4.75` is colored amber
- Fade-in: `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.5s, `ease: "easeOut"`
- The fulcrum and the `4.75` result briefly pulse simultaneously (coordinated highlight, 0.3s)
- Duration of step including settle: 3.0s

#### Step 2 (3.0s - 5.5s): Median Formula

- The median dot(s) pulse with a purple glow (0.4s, twice)
- An arrow draws from the highlighted middle dot(s) down to the notation area
- Notation fades in as a card (background `#8b5cf610`, border-left 3px solid `#8b5cf6`, `border-radius: 8px`, `padding: 12px 16px`):
  - Label: "Median" in purple, 12px, uppercase, font-weight 700
  - Text (not KaTeX): "Step 1: Sort the values from least to greatest"
  - KaTeX: `2, 3, 3, 5, \underset{\uparrow}{5}, 5, 7, 8`
  - The arrow under the middle value(s) is in purple
  - Pause 0.6s, then:
  - Text: "Step 2: Find the middle value"
  - KaTeX: `\text{8 values} \Rightarrow \text{middle is between positions 4 and 5}`
  - KaTeX: `\text{Median} = \frac{5 + 5}{2} = 5`
  - The result `5` is colored purple
  - Annotation text: "(With an even count, average the two middle values)" in `#94a3b8` (slate-400), italic, 12px
- Duration of step: 2.5s

#### Step 3 (5.5s - 7.5s): Mode Formula

- The mode stack's cyan highlight background pulses (0.4s, twice)
- An arrow draws from the highlighted stack down to the notation area
- Notation fades in as a card (background `#06b6d410`, border-left 3px solid `#06b6d4`, `border-radius: 8px`, `padding: 12px 16px`):
  - Label: "Mode" in cyan, 12px, uppercase, font-weight 700
  - Text: "The value that appears most often"
  - Visual: A mini frequency table fades in:
    ```
    Value:     2  3  5  7  8
    Count:     1  2  3  1  1
                    ↑
                 Most!
    ```
  - Each count is in white; the count of `3` (for value 5) is in cyan, bold, with a small star icon
  - KaTeX: `\text{Mode} = 5 \quad \text{(appears 3 times)}`
  - The result `5` is colored cyan
- Duration of step: 2.0s

#### Step 4 (7.5s - 9.0s): Summary Comparison

- Below all three formula cards, a summary row fades in:
  - Background: `#1e293b`, `border-radius: 12px`, `padding: 16px`
  - Three columns side by side:
    - "Mean = 4.75" in amber, with fulcrum icon
    - "Median = 5" in purple, with diamond icon
    - "Mode = 5" in cyan, with stacked dots icon
  - Below: "All three are close here — but add an outlier and watch the mean fly away!"
  - The word "outlier" has a small amber warning triangle icon next to it
  - Color: `#e2e8f0`, 14px, italic
  - i18n key: `lesson.meanMedianMode.stage4.summary`
- Animation: `opacity: 0 -> 1`, `translateY: 12px -> 0`, 0.5s, `ease: "easeOut"`
- Duration of step: 1.5s

### Continue Button
- Appears 1s after the final animation step completes
- Same style as previous continue buttons

### Accessibility (Stage 4)
- All KaTeX expressions have `aria-label` attributes with plain-text equivalents: "Mean equals the sum of all values divided by the number of values. Equals 2 plus 3 plus 3 plus 5 plus 5 plus 5 plus 7 plus 8, divided by 8, equals 38 over 8, equals 4.75."
- "Median: Sort values from least to greatest. 8 values, so the middle is between positions 4 and 5. Both are 5, so the median is 5."
- "Mode equals 5, appearing 3 times, the most of any value."
- `prefers-reduced-motion`: all notation appears simultaneously with a single 0.5s fade-in
- Formula cards are `<section>` elements with `aria-labelledby` pointing to their label headers

---

## 7. Stage 5: Real-World Anchor (1-2 minutes)

### Purpose
Connect the abstract concepts of mean, median, and mode to concrete, memorable real-world scenarios that 11-14 year olds encounter. This creates multiple retrieval paths in semantic memory.

### Layout
Scrollable card list. Each scenario is a card. Dark background, max-width 640px, centered.

### Scenario Cards

Each card has:
- An icon (SVG, 40px, rendered inline)
- A title (18px, white, bold)
- A body (16px, slate-200, line-height 1.6)
- A highlighted connection to mean, median, or mode within the body
- Background: `#1e293b`, `border-radius: 16px`, `padding: 20px`, `margin-bottom: 16px`
- Entry animation: slide up from bottom (`translateY: 24px -> 0`, `opacity: 0 -> 1`, 0.4s, stagger 0.2s between cards)

#### Card 1: Salaries (Median Wins)

- **Icon**: Dollar bills fanning out (SVG: three overlapping rectangles, stroke `#8b5cf6`)
- **Title**: "Why Job Sites Show Median Salary"
- **Body**: "A company has 9 employees earning **$50K** each and a CEO earning **$5 million**. The **mean** salary is **$545K** — making the company sound way richer than it is. The **median** is **$50K** — much more honest. That's why salary websites report **median** income!"
- **Highlight**: `$545K` is in amber with strikethrough, `$50K` is in purple with a check icon
- **Badge**: Small pill "Median" in purple, bottom-right of card
- i18n key: `lesson.meanMedianMode.stage5.card1`

#### Card 2: Shoe Shopping (Mode Wins)

- **Icon**: Sneaker outline (SVG: simple shoe silhouette, stroke `#06b6d4`)
- **Title**: "The Most Popular Shoe Size"
- **Body**: "A shoe store needs to decide which sizes to stock the most. Mean shoe size is 8.3 — but **nobody wears size 8.3**! And median just tells you the middle person's size. What the store really wants is the **mode** — size **9**, the one bought most often. Mode is the best measure for 'what's most popular.'"
- **Highlight**: `8.3` is in amber with a small `?` icon, `9` is in cyan and bold
- **Badge**: Small pill "Mode" in cyan, bottom-right of card
- i18n key: `lesson.meanMedianMode.stage5.card2`

#### Card 3: Video Game Scores (Mean Wins)

- **Icon**: Game controller (SVG: simple controller outline, stroke `#f59e0b`)
- **Title**: "Your Gaming Average"
- **Body**: "You play 5 rounds of a game and score: **120, 135, 128, 140, 132**. No outliers, no repeats. Mean gives you the best summary: **131 points per round**. When data is spread evenly without extreme values, mean is the most useful measure!"
- **Highlight**: `131` is in amber and bold
- **Badge**: Small pill "Mean" in amber, bottom-right of card
- i18n key: `lesson.meanMedianMode.stage5.card3`

#### Card 4: Favorite Colors (Mode Only)

- **Icon**: Paint palette (SVG: oval with color dots, stroke `#06b6d4`)
- **Title**: "What's the Class Favorite?"
- **Body**: "You survey your class for their favorite color. Results: Blue (12), Red (7), Green (5), Purple (4). You can't calculate the mean or median of colors — they're not numbers! The **mode** (Blue) is the **only** measure that works for categories."
- **Highlight**: "Blue" is in cyan, bold, with a crown icon. "can't calculate the mean or median" is in `#94a3b8`, italic
- **Badge**: Small pill "Mode" in cyan, bottom-right of card
- i18n key: `lesson.meanMedianMode.stage5.card4`

### Continue Button
- Appears at the bottom of the card list after all cards have animated in (0.2s delay after last card)
- The student can scroll to read all cards, then tap Continue
- If the viewport is tall enough to show all cards without scrolling, Continue appears immediately after animations

### Accessibility (Stage 5)
- Cards are `<article>` elements with `role="article"`
- Icons have `aria-hidden="true"` (decorative, described by card title)
- Highlighted numbers and terms are wrapped in `<mark>` with appropriate `aria-label`
- Badge pills have `aria-label` describing their role: "Best measure for this scenario: Median"

---

## 8. Stage 6: Practice (5-10 minutes)

### Purpose
Retrieval practice across three cognitive layers: recall, procedure, and understanding. Problems cover calculating each measure, choosing the best measure for context, and understanding outlier effects.

### General Practice UI

Each problem is presented in a `ProblemCard` component:
- Background: `#1e293b`, `border-radius: 16px`, `padding: 24px`
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

#### Problem 1: Identify the Measure

**Prompt**: "Which measure of center is found by adding all the values and dividing by how many there are?"
- i18n key: `lesson.meanMedianMode.practice.p1.prompt`

**Visual**: A small animated icon of a fulcrum/balance point appears beside the question, subtly hinting without giving away the answer. The fulcrum is in neutral gray (`#94a3b8`) so it doesn't color-code the answer.

**Input**: Three multiple-choice buttons, vertically stacked:
- "Mean" (button A)
- "Median" (button B)
- "Mode" (button C)
- Each button: full-width (max 400px), 52px height, `border-radius: 12px`, `background: #334155`, left-aligned text with a letter prefix (A, B, C in a circle), 18px font

**Correct answer**: Mean (A)

**Feedback on correct**:
1. Button A turns green (background `#34d399`, 0.3s transition)
2. The fulcrum icon transitions to amber (its Mean color)
3. A green checkmark fades in
4. Text: "Correct! The mean is calculated by adding all values and dividing by the count. It's like finding the balance point of your data."
5. i18n key: `lesson.meanMedianMode.practice.p1.correct`

**Feedback on incorrect (Median)**:
1. Button B briefly flashes red (0.2s, then back to default)
2. Text: "Not quite. The median is the middle value when data is sorted — no adding or dividing needed! The measure that involves adding and dividing is the mean."
3. i18n key: `lesson.meanMedianMode.practice.p1.incorrectMedian`

**Feedback on incorrect (Mode)**:
1. Button C briefly flashes red
2. Text: "Not quite. The mode is the most frequent value — just count which number appears most! The measure that involves adding and dividing is the mean."
3. i18n key: `lesson.meanMedianMode.practice.p1.incorrectMode`

#### Problem 2: Find the Mode (Tap-to-Select)

**Prompt**: "Tap the MODE of this dataset:"
- i18n key: `lesson.meanMedianMode.practice.p2.prompt`

**Visual**: A mini dot plot showing the dataset `[1, 3, 3, 5, 7, 7, 7, 9]`:
- 8 dots on a mini number line (0-10)
- Dot at 1: 1 dot
- Dot at 3: 2 dots stacked
- Dot at 5: 1 dot
- Dot at 7: 3 dots stacked (tallest)
- Dot at 9: 1 dot
- The number line is rendered at 40% of Stage 2 scale
- No fulcrum, no median highlight, no mode highlight shown (student must identify)

**Input**: Tap any of the dot stacks on the number line. Each stack is a tappable region (min touch target 44px via padding):
- On hover/focus: the stack gets a subtle border highlight (`#475569`)
- On tap: the stack's dots flash with the selection color

**Correct answer**: The stack at value 7 (3 dots — the tallest stack)

**Feedback on correct**:
1. The stack at 7 gets the cyan mode highlight (same style as Stage 2)
2. Green checkmark
3. Text: "That's right! 7 appears 3 times — more than any other value. That makes it the mode."
4. i18n key: `lesson.meanMedianMode.practice.p2.correct`

**Feedback on incorrect (e.g., tapping 3)**:
1. Brief red flash on the tapped stack
2. Text: "3 appears twice, but look for the value that appears the MOST. Which stack has the most dots?"
3. i18n key: `lesson.meanMedianMode.practice.p2.incorrect`
4. After 2 seconds, the tallest stack (7) gets a subtle pulsing border hint

#### Problem 3: Median Requires Sorting (True/False)

**Prompt**: "True or False: To find the median, you must sort the data from least to greatest first."
- i18n key: `lesson.meanMedianMode.practice.p3.prompt`

**Visual**: Two mini datasets shown side by side:
- Left (unsorted): `8, 2, 5, 1, 9` — numbers in a row, each in a rounded chip (`background: #334155`)
- Right (sorted): `1, 2, 5, 8, 9` — same numbers sorted, the middle value `5` highlighted with purple ring
- A `?` between them, with an arrow suggesting the transformation

**Input**: Two large toggle buttons side by side:
- "TRUE" (left) — 48px tall, `min-width: 140px`, `border-radius: 12px`, `background: #334155`
- "FALSE" (right) — same style
- Each has a large letter (T / F) in a circle to the left of the text

**Correct answer**: TRUE

**Feedback on correct**:
1. TRUE button turns green
2. The sorted side of the visual gets a green border glow
3. The middle value `5` in the sorted list gets the purple median ring
4. Text: "True! You MUST sort first. Without sorting, the 'middle number' could be any value depending on the order you wrote them down. For example, the middle of [8, 2, 5, 1, 9] appears to be 5 by luck, but for [8, 2, 1, 5, 9] the middle position has 1 — which is wrong!"
5. i18n key: `lesson.meanMedianMode.practice.p3.correct`

**Feedback on incorrect (FALSE)**:
1. FALSE button flashes red
2. Text: "Actually, sorting IS required! Look at the unsorted list: 8, 2, 5, 1, 9. The middle number appears to be 5, but that's just luck. Try 8, 2, 1, 5, 9 — now the middle position has 1, which isn't the true center at all. You must sort first!"
3. i18n key: `lesson.meanMedianMode.practice.p3.incorrect`

### Layer 1: Procedure (Problems 4-6)

#### Problem 4: Calculate the Mean

**Prompt**: "Calculate the mean of this dataset: 4, 7, 10, 3, 6"
- i18n key: `lesson.meanMedianMode.practice.p4.prompt`

**Visual**: The five values displayed in rounded chips in a horizontal row, each in its positional color (indigo variants with slight shade differences). Below, a workspace showing the scaffolded calculation:
- "Sum: 4 + 7 + 10 + 3 + 6 = ___"
- "Count: 5 values"
- "Mean: ___ ÷ 5 = ___"
- The blanks are styled as empty slots (dashed border)

**Input**: Numeric input — a single number field:
- Size: `width: 120px`, `height: 52px`, centered, `border-radius: 12px`
- Border: 2px solid `#475569`
- Font: mono, 24px, `#f8fafc`, `text-align: center`, `tabular-nums`
- Input type: `number` with `step="0.1"` (allows decimals)
- Placeholder: "?"
- Submit button beside it: "Check" in primary purple, 48px tall

**Correct answer**: 6 (sum = 30, count = 5, mean = 30/5 = 6)

**Feedback on correct**:
1. Input field border turns green
2. The scaffold fills in:
   - "Sum: 4 + 7 + 10 + 3 + 6 = **30**" (each number adds up with a running total animation)
   - "Count: **5** values"
   - "Mean: **30** ÷ **5** = **6**"
3. A mini fulcrum appears on a tiny number line showing the dot at 6 as the balance point
4. Green checkmark
5. Text: "The mean is 6. You added all 5 values to get 30, then divided by 5."
6. i18n key: `lesson.meanMedianMode.practice.p4.correct`

**Feedback on incorrect**:
1. Input border flashes red
2. If answer is 30: "That's the sum, not the mean! Now divide 30 by the number of values (5)."
3. If answer is 5: "That's the count, not the mean! Add all the values first, then divide by 5."
4. Otherwise: "Not quite. Add up all the values: 4 + 7 + 10 + 3 + 6 = 30. Then divide by how many values there are: 30 ÷ 5 = ?"
5. Student can retry immediately
6. i18n keys: `lesson.meanMedianMode.practice.p4.incorrect*`

#### Problem 5: Find the Median (Drag-to-Sort)

**Prompt**: "Find the median. First, sort these values from least to greatest, then identify the middle value."
- i18n key: `lesson.meanMedianMode.practice.p5.prompt`

**Visual**: Seven number chips in random order: `12, 5, 8, 15, 3, 8, 20`
- Each chip: `56px x 48px`, `border-radius: 10px`, `background: #334155`, `color: #f8fafc`, font-size 20px, font-weight 600
- Chips are in a horizontal row (or 2 rows on narrow mobile)

**Input**: Two-step interaction:

**Step 1 — Sort**: Drag chips to reorder them from least to greatest. Seven slots labeled 1st through 7th below the chips.
- Each slot: `56px x 48px`, `border: 2px dashed #475569`, `border-radius: 10px`
- When a chip is dragged over a slot: border becomes solid `#8b5cf6`
- When placed: chip snaps in with `spring({ damping: 20, stiffness: 300 })`

**Validation of sorting**: Once all 7 slots filled:
- If correctly sorted (`3, 5, 8, 8, 12, 15, 20`):
  - All slots turn green borders
  - The 4th slot (position 4 of 7 = middle) gets a pulsing purple highlight ring
  - "Now tap the middle value!" text appears
- If incorrectly sorted:
  - Misplaced chips' slots flash red border (0.3s)
  - Text: "Not quite sorted! Remember: least to greatest. Try swapping the misplaced values."
  - Chips remain draggable for rearrangement

**Step 2 — Identify**: After correct sorting, tap the middle chip.

**Correct answer**: 8 (position 4 of 7, the chip showing "8" in the 4th slot)

**Feedback on correct**:
1. The tapped chip gets a purple glow ring, scales 1.1x briefly
2. Green checkmark
3. Text: "The median is 8! With 7 values sorted, the middle is the 4th value. Notice there are exactly 3 values less than 8 and 3 values greater than 8."
4. A visual arrow shows "3 below | 8 | 3 above"
5. i18n key: `lesson.meanMedianMode.practice.p5.correct`

**Feedback on incorrect** (tapping wrong chip):
1. Red flash
2. Text: "That's not the middle position. Count: with 7 values, the middle is at position (7+1)÷2 = 4th. Which value is in the 4th slot?"
3. i18n key: `lesson.meanMedianMode.practice.p5.incorrect`

#### Problem 6: Choose the Best Measure

**Prompt**: "A restaurant owner wants to know the most commonly ordered dish so she can prepare more of it. Which measure should she use?"
- i18n key: `lesson.meanMedianMode.practice.p6.prompt`

**Visual**: A simple bar chart showing dish orders:
- Pasta: 45 orders (bar height proportional)
- Salad: 32 orders
- Burger: 58 orders (tallest bar, highlighted with subtle cyan glow)
- Soup: 28 orders
- Bars: `background: #818cf880`, `border-radius: 4px 4px 0 0`
- Bar labels: dish name below, count inside or above
- Chart background: `#0f172a`, axis lines `#334155`

**Input**: Three multiple-choice buttons:
- "Mean" (A)
- "Median" (B)
- "Mode" (C)
- Same button style as Problem 1

**Correct answer**: Mode (C)

**Feedback on correct**:
1. Button C turns green
2. The Burger bar in the chart gets a cyan mode highlight
3. Text: "Mode! The restaurant wants the most common order — that's exactly what mode measures. Mean would give her a meaningless number like '40.75 orders,' and median would give the middle dish when sorted by popularity. Neither helps her stock the kitchen."
4. i18n key: `lesson.meanMedianMode.practice.p6.correct`

**Feedback on incorrect (Mean)**:
1. Red flash
2. Text: "The mean would tell her the average number of orders across all dishes (40.75), but that doesn't tell her WHICH dish to prepare more of! She needs the most popular dish — that's the mode."
3. i18n key: `lesson.meanMedianMode.practice.p6.incorrectMean`

**Feedback on incorrect (Median)**:
1. Red flash
2. Text: "The median would give her the middle dish by popularity. But she doesn't need the 'middle' — she needs the 'most.' The mode tells her which dish is ordered most often."
3. i18n key: `lesson.meanMedianMode.practice.p6.incorrectMedian`

### Layer 2: Understanding (Problems 7-9)

#### Problem 7: Outlier Detection

**Prompt**: "The dataset is: 10, 12, 11, 13, 12, 50. Which value is the outlier, and which measure of center does it affect the MOST?"
- i18n key: `lesson.meanMedianMode.practice.p7.prompt`

**Visual**: A mini dot plot showing the data: dots at 10, 11, 12, 12, 13, and one dot waaay out at 50.
- The dot at 50 is separated by a visible gap on the number line
- No measure indicators shown (student must reason)

**Input**: Two-part selection:

**Part A** — Tap the outlier on the dot plot:
- Each dot is tappable (44px touch target via padding)
- On tap: dot gets a highlight ring

**Part B** — After selecting outlier, choose which measure it affects most:
- Three buttons: "Mean", "Median", "Mode"

**Correct answers**: Part A: 50 (the outlier). Part B: Mean.

**Feedback on correct (both parts)**:
1. The dot at 50 gets an amber warning ring
2. "Mean" button turns green
3. The mini dot plot animates:
   - Show mean WITH 50: fulcrum at 18.0 (way to the right of the cluster)
   - Show mean WITHOUT 50: fulcrum at 11.6 (right in the cluster)
   - Animate the fulcrum sliding from 18.0 to 11.6 as the 50-dot fades out
4. Text: "50 is the outlier — it's far from the other values (10-13). It pulls the mean from 11.6 all the way to 18.0! The median barely changes (from 12 to 11.5), and the mode stays at 12 no matter what."
5. i18n key: `lesson.meanMedianMode.practice.p7.correct`

**Feedback on incorrect (Part A, wrong dot)**: "That value is close to the others. An outlier is a value that's far away from the rest. Look for the one that doesn't fit!"

**Feedback on incorrect (Part B, Median or Mode)**: "The outlier affects the mean the most because mean uses every value in its calculation. Median only cares about position (middle), and mode only cares about frequency. The mean 'feels' every value — especially extreme ones."

#### Problem 8: Even-Count Median

**Prompt**: "Find the median of: 3, 7, 9, 15"
- i18n key: `lesson.meanMedianMode.practice.p8.prompt`

**Visual**: Four chips in a sorted row: `3, 7, 9, 15`. Below them, position markers: "1st, 2nd, 3rd, 4th". A bracket highlights the two middle values (7 and 9) with a `?` between them.

**Input**: Numeric input:
- Size: `width: 120px`, `height: 52px`, centered
- Input type: `number` with `step="0.5"` (must allow 0.5 values)
- Placeholder: "?"
- Submit button: "Check"

**Correct answer**: 8 (the average of 7 and 9: (7+9)/2 = 8)

**Feedback on correct**:
1. Green border on input
2. The bracket between 7 and 9 turns green
3. An annotation appears: "7 + 9 = 16, then 16 ÷ 2 = 8"
4. Text: "With an even number of values, the median is the average of the two middle values. Here, (7 + 9) ÷ 2 = 8. Notice 8 isn't even in the dataset — the median doesn't have to be a data point!"
5. The last sentence ("Notice 8 isn't even in the dataset") is in bold — this directly addresses the misconception that median must be a number in the data
6. i18n key: `lesson.meanMedianMode.practice.p8.correct`

**Feedback on incorrect**:
1. Red flash on input
2. If answer is 7 or 9: "Close! With an even count, you can't pick just one middle number. You need to average the two middle values: (7 + 9) ÷ 2 = ?"
3. If answer is 8.5 or other: "Not quite. The two middle values are 7 and 9. Average them: (7 + 9) ÷ 2 = ?"
4. Student can retry immediately
5. i18n keys: `lesson.meanMedianMode.practice.p8.incorrect*`

#### Problem 9: Best Measure for Context

**Prompt**: "A town reports its 'average' household income. Five homes earn $40K-$60K, and one tech billionaire earns $2 billion. The town advertises: 'Average household income: $333 million!' Is this fair? What measure should they use instead, and why?"
- i18n key: `lesson.meanMedianMode.practice.p9.prompt`

**Visual**: A mini bar chart showing the 6 household incomes:
- 5 very short bars ($40K-$60K range) clustered on the left
- 1 massively tall bar ($2B) on the right — the bar is so tall it extends past the chart area with a break indicator (`//`)
- Below the chart: "Reported 'average': $333,000,000" in amber with a large `!` warning icon
- The visual makes the absurdity immediately obvious

**Input**: Two-part answer:

**Part A** — "Is this a fair representation?"
- Two buttons: "Yes, it's fair" / "No, it's misleading"
- 48px tall, full width

**Part B** — (appears after Part A) "Which measure should they use?"
- Three buttons: "Mean" / "Median" / "Mode"

**Correct answers**: Part A: "No, it's misleading". Part B: "Median"

**Feedback on correct (both parts)**:
1. Both selections turn green
2. Animation: The chart zooms in to the 5 regular homes. A bracket shows their range ($40K-$60K). A median marker appears at $50K.
3. Text: "The mean ($333 million) is completely distorted by one billionaire. The median ($50K) accurately represents the typical household. This is exactly why government agencies report median household income — it resists outlier distortion."
4. The word "median household income" is bold, purple
5. Insight callout: "Real-world tip: When you see the word 'average' in news or advertising, always ask: Is this the mean or the median? It makes a huge difference!"
6. i18n key: `lesson.meanMedianMode.practice.p9.correct`

**Feedback on incorrect (Part A: "Yes")**:
1. Red flash
2. Text: "$333 million per household? But 5 out of 6 households earn less than $60K! The billionaire's income inflated the mean so much that it describes literally nobody's actual experience."

**Feedback on incorrect (Part B: Mean)**:
1. Red flash
2. Text: "The mean IS the problem here! It's being pulled up to $333 million by one outlier. The town needs a measure that resists outliers."

**Feedback on incorrect (Part B: Mode)**:
1. Red flash
2. Text: "Mode would tell you the most common income value, which could work if many households earn the same amount. But with only 6 households, the median is more reliable — it gives you the 'middle' household's income."

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
- Drag-to-sort (Problem 5) has keyboard alternative (Tab + Enter to pick up, arrow keys to move, Enter to place)
- Numeric inputs have `aria-label` describing expected input: "Enter the mean value"
- Dot plot tapping has keyboard alternative: Tab through dots, Enter to select
- Feedback is announced via `aria-live="assertive"` for correctness, `aria-live="polite"` for explanations
- Timer is not used — students have unlimited time on each problem (reduces math anxiety, per Constitution)

---

## 9. Stage 7: Reflection (~1 minute)

### Purpose
Metacognitive self-explanation. The student consolidates their understanding by generating an explanation in their own words about when and why different measures of center should be used.

### Layout
Centered card, max-width 640px. Dark background.

### Prompt

**Card** (background `#1e293b`, `border-radius: 16px`, `padding: 24px`):
- **Header**: "Reflection" in a small pill badge (background `#7c3aed20`, text `#a78bfa`, 12px, uppercase, letter-spacing 1px)
- **Prompt text**: "A friend says 'average just means the mean.' Explain why this isn't true and give an example of when the mean is NOT the best measure to use."
  - i18n key: `lesson.meanMedianMode.stage7.prompt`
  - Font: 18px, `#f8fafc`, line-height 1.6, font-weight 500
- **Visual hint**: Below the prompt, show a mini comparison:
  - Three icons in a row with labels below:
    - Fulcrum icon (amber) + "Mean"
    - Diamond icon (purple) + "Median"
    - Stacked dots icon (cyan) + "Mode"
  - Each icon: 24px, with a subtle 8px bottom margin
  - Below: a small text in `#64748b` (slate-500): "Three different measures, three different stories"
  - This is visible before the student starts typing, to prime their thinking

### Input

**Text area**:
- Min height: 120px, auto-grow to max 240px
- Placeholder: "There are actually three types of 'average'..." (i18n key: `lesson.meanMedianMode.stage7.placeholder`)
- Character counter: `{current} / 20 minimum`
  - Color: `#64748b` (slate-500) when below minimum, `#34d399` (green) when minimum reached
  - Position: bottom-right of text area
- Border: 1px solid `#475569`, `border-radius: 12px`, `padding: 16px`
- Background: `#0f172a`
- Font: 16px, `#e2e8f0`, line-height 1.6

**Submit button**:
- Disabled until 20+ characters entered (opacity 0.4, no pointer-events)
- Enabled: primary purple button (`#8b5cf6`), "Submit Reflection" text
- Size: full width, 52px tall, `border-radius: 12px`
- Loading state: spinner replaces text during AI evaluation

**Skip button**:
- Below submit: "Skip" text link, `#64748b`, 13px, no background
- Deliberately de-emphasized (small, muted color) to discourage skipping
- On tap: skips to lesson complete with 0 reflection XP

### After Submission

1. **AI Evaluation** (via `lesson.submitReflection` tRPC endpoint):
   - The response is sent to the Claude API for quality scoring
   - Typical response time: 1-2 seconds
   - During evaluation: submit button shows spinner, text area becomes read-only

2. **Feedback Display** (0.5s fade-in after evaluation returns):

   **Quality indicator**: 0-5 filled stars (star icons, 24px)
   - 0-1 stars: "Keep practicing your explanations!" (encouraging, not punitive)
   - 2-3 stars: "Good start! You're on the right track."
   - 4-5 stars: "Excellent explanation! You really understand the difference."

   **AI feedback text**: A 1-3 sentence personalized response, displayed in a card:
   - Background: `#0f172a`, border-left: 4px solid `#8b5cf6`, `padding: 16px`
   - Font: 14px, `#cbd5e1` (slate-300), italic

   **XP earned**: Displayed as a floating "+{amount} XP" badge that animates upward and fades (0.8s):
   - Range: 0-80 XP based on quality (Constitution: XP weighted toward explanation quality)
   - Color: `#fbbf24` (amber)

3. **Confirmation Visual** (appears simultaneously with feedback):
   - A mini dot plot appears with dataset `[5, 5, 6, 7, 7, 7, 8, 40]`
   - The three measures animate in one by one:
     1. Mean fulcrum slides to ~10.6 (way right of the cluster) — amber, with label "Mean: 10.6"
     2. Median diamond settles at 7 (right in the middle) — purple, with label "Median: 7"
     3. Mode highlight appears on the stack of 7s — cyan, with label "Mode: 7"
   - The contrast between mean (pulled by outlier 40) and median/mode (in the cluster) visually reinforces the lesson's core insight
   - Below: "Same data, three stories. Choosing the right measure matters!"
   - Animation duration: 2.0s total
   - i18n key: `lesson.meanMedianMode.stage7.confirmation`

4. **Lesson Complete**:
   - After feedback, a "Complete Lesson" button fades in (1s delay)
   - Same primary button style
   - On tap: triggers the lesson completion flow:
     - XP summary animation (total XP earned across all stages, shown as a counting-up number)
     - Achievement check (may trigger achievements for completing first statistics lesson)
     - SRS state update: marks SP-5.1 as "learning" at recall layer (layer 0)
     - Unlocks successor topics: SP-5.2 (Data Displays), SP-5.1a (MAD & Outliers), SP-5.3 (Box Plots) become "available" in the Knowledge Nebula
     - Redirects to the lesson summary screen or back to the learn page

### Accessibility (Stage 7)
- Prompt is in a `<label>` element linked to the text area via `for`/`id`
- Star rating is announced via `aria-live`: "Your reflection scored 4 out of 5 stars"
- AI feedback is in an `aria-live="polite"` region
- The confirmation visual has an `aria-label` describing the concept: "Dataset 5, 5, 6, 7, 7, 7, 8, 40. Mean is 10.6, pulled by the outlier 40. Median is 7. Mode is 7. The mean is misleading when outliers are present."

---

## 10. Technical Specifications

### Color Palette (Mean, Median, Mode)

| Element | Primary | Fill (20%) | CSS Variable |
|---------|---------|------------|-------------|
| Mean | `#f59e0b` (amber-500) | `#f59e0b33` | `--mmm-mean` |
| Median | `#8b5cf6` (purple-500) | `#8b5cf633` | `--mmm-median` |
| Mode | `#06b6d4` (cyan-500) | `#06b6d433` | `--mmm-mode` |
| Data dots | `#818cf8` (indigo-400) | `#818cf880` | `--mmm-dots` |
| Outlier warning | `#fbbf24` (amber-300) | `#fbbf2433` | `--mmm-outlier` |
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

The three measure colors were chosen to be distinguishable under the three most common forms of color vision deficiency:

| Color | Protanopia | Deuteranopia | Tritanopia |
|-------|-----------|-------------|-----------|
| Amber `#f59e0b` (Mean) | Yellow-green | Yellow-green | Pink-red |
| Purple `#8b5cf6` (Median) | Blue | Blue | Pink-gray |
| Cyan `#06b6d4` (Mode) | Blue-gray | Blue-gray | Green |

All three remain distinguishable under each deficiency. Per Constitution Principle IV, color is never the SOLE channel for meaning. Every color-coded element also has:
- A text label (e.g., "Mean", "Median", "Mode")
- A distinct icon (fulcrum triangle, diamond, stacked dots)
- A position (Mean always listed first, Median second, Mode third)

### Typography

| Element | Font | Size | Weight | Features |
|---------|------|------|--------|----------|
| Large numbers | System mono / JetBrains Mono | `clamp(36px, 8vw, 56px)` | 700 | `tabular-nums`, `font-variant-numeric: tabular-nums` |
| Inline numbers/data | System mono | `clamp(16px, 3.5vw, 22px)` | 600 | `tabular-nums` |
| Body text | System sans (Inter preferred) | 16px | 400 | `line-height: 1.6` |
| Labels | System sans | `clamp(10px, 2.5vw, 14px)` | 600 | `text-transform: uppercase`, `letter-spacing: 0.5px` |
| KaTeX math | KaTeX default | `clamp(14px, 3vw, 18px)` | -- | Uses KaTeX's own rendering |
| Button text | System sans | 16px | 600 | -- |
| Measure readout values | System mono | 20px | 600 | `tabular-nums` |

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
    fulcrumSlide: { damping: 22, stiffness: 250 },
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

const measurePulse = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.1, 1] },
  transition: { duration: 0.2, ease: "easeInOut" },
};
```

#### Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- All spring animations become simple `opacity` transitions (0.3s)
- No `scale`, `translate`, or `rotate` animations
- Fulcrum slides become instant position changes with 0.3s opacity fade
- Hook: show final composed state with a single fade-in
- Particle effects (confetti, ripples, glow pulses) are disabled entirely
- Dot drag snapping is instant (no spring bounce)

```typescript
const useReducedMotion = (): boolean => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
};
```

### Touch & Interaction Targets

| Element | Min Size | Notes |
|---------|----------|-------|
| Dot plot dots (tappable) | 44px via padding | Dot visual may be smaller, touch target padded |
| Draggable dots | 48px touch zone | Large enough for drag initiation |
| Add/Remove dot buttons | 48px x 48px | Exceeds 44px requirement |
| Multiple-choice buttons | full-width x 52px | Easy to tap on mobile |
| Scenario cards (matching) | full-width x 56px min | Clear drag source |
| Drop targets | 140px x 56px min | Clear visual target |
| Numeric input | 120px x 52px | Centered, comfortable input |
| Continue button | 160px x 48px | Prominent, centered |
| Text area | full-width x 120px+ | Auto-growing |
| True/False buttons | 140px x 48px | Large toggle buttons |

### Gesture Handling

All drag interactions use `@use-gesture/react`:

```typescript
// Dot dragging on number line
const bindDotDrag = useDrag(({ movement: [mx], active, cancel }) => {
  // 8px deadzone before drag initiates
  if (Math.abs(mx) < 8 && !active) return;

  // During drag: update horizontal position with real-time value calculation
  // Constrain to number line range (0-20)
  // On release: snap to nearest integer with spring animation
  // Recalculate mean, median, mode on snap
}, {
  filterTaps: true,
  threshold: 8,
  axis: "x", // horizontal-only drag
  rubberband: true,
});

// Card matching drag
const bindCardDrag = useDrag(({ movement: [mx, my], active, cancel }) => {
  if (Math.abs(mx) < 10 && Math.abs(my) < 10 && !active) return;

  // During drag: card follows finger with slight scale increase
  // On release: check overlap with target zones
  // If overlapping valid target: snap into target
  // If no overlap: return to origin
}, {
  filterTaps: true,
  threshold: 10,
  rubberband: true,
});
```

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile S | < 375px | Single column, measure readout panel above dot plot (compact, horizontal layout for three measures), font sizes at `clamp` minimums, number line may require horizontal scroll |
| Mobile M | 375-639px | Single column, measure readout stacked vertically above dot plot, comfortable spacing, matching cards stack vertically |
| Tablet | 640-1023px | Stage 2: side-by-side panels (65/35). Practice problems: wider cards. Matching exercise: side-by-side columns. |
| Desktop | >= 1024px | Max-width container (800px), centered. Stage 2: side-by-side with generous spacing. Dot plot has more horizontal room. |

### Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Animation frame rate | 60fps (P95 >= 55fps) | Framer Motion `onFrame` callback + `PerformanceObserver` |
| SVG element count (Stage 2, max dots) | <= 200 elements | 20 positions x up to 8 dots + number line + fulcrum + labels + controls |
| Time to interactive (Stage 2) | < 1.5s | From stage transition to first interaction available |
| Memory (Stage 2, all dots) | < 15MB | Heap snapshot |
| Mean/Median/Mode recalculation | < 8ms (< 0.5 frames) | On each dot change — must not cause frame drop |
| Dot drag latency | < 16ms (1 frame) | State update + fulcrum position + render |
| Fulcrum slide animation | Consistent 60fps | No layout thrashing during slide |

### State Persistence

Lesson progress is persisted to both local storage (Dexie.js) and server (via `lesson.completeStage` tRPC call):

```typescript
interface LessonProgressState {
  lessonId: "SP-5.1";
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

### State Management (Stage 2 — Dot Plot)

```typescript
interface DotPlotState {
  dots: Array<{ id: string; value: number }>; // each dot has unique id and integer value
  interactionCount: number;
  hasDragged: boolean; // true once student has dragged at least one dot
  hasAdded: boolean;   // true once student has added at least one dot
  isDragging: boolean; // true during active drag
  dragDotId: string | null; // id of the dot currently being dragged

  // Computed (derived from dots array — recalculated on every change)
  mean: number;          // sum / count, to 1 decimal
  median: number;        // middle value when sorted, or avg of two middle values
  mode: number | null;   // most frequent value, null if all unique
  modeCount: number;     // count of the mode value
  sortedValues: number[]; // dots sorted by value for median calculation
  valueCounts: Map<number, number>; // frequency map for mode calculation
  dotCount: number;      // total number of dots
}
```

### File Structure

```
src/content/domains/statistics-probability/SP-5.1/
├── lesson.mdx              # Stage text content (i18n-ready)
├── animations.json          # MathScene DSL configs for all stages
├── problems.json            # Practice problem bank (9 problems)
└── meta.json                # Metadata: prerequisites, successors, hooks

src/components/lesson/custom/
└── MeanMedianModeLesson/
    ├── MeanMedianModeLesson.tsx  # Custom lesson component (orchestrates all stages)
    ├── HookAnimation.tsx         # Stage 1: basketball team height reveal
    ├── DotPlot.tsx               # Stage 2: interactive dot plot on number line
    ├── DotPlotDot.tsx            # Individual draggable dot component
    ├── NumberLine.tsx            # Reusable number line SVG component
    ├── MeanFulcrum.tsx           # Balance point triangle indicator
    ├── MedianHighlight.tsx       # Middle dot(s) highlight ring
    ├── ModeHighlight.tsx         # Tallest stack background highlight
    ├── MeasureReadout.tsx        # Panel showing mean/median/mode values
    ├── DiscoveryPrompts.tsx      # Stage 3: guided discovery sequence
    ├── MatchingExercise.tsx      # Stage 3 Prompt 4: drag-to-match
    ├── SymbolOverlay.tsx         # Stage 4: formula notation overlay
    └── index.ts                  # Barrel export
```

### i18n Keys (Complete List)

All user-facing strings are externalized. The following keys are added to `src/lib/i18n/messages/en.json` under the `lesson.meanMedianMode` namespace:

```
lesson.continue
lesson.meanMedianMode.hook.question
lesson.meanMedianMode.stage2Hint
lesson.meanMedianMode.stage2Hint2
lesson.meanMedianMode.stage3.prompt1
lesson.meanMedianMode.stage3.prompt2
lesson.meanMedianMode.stage3.prompt3
lesson.meanMedianMode.stage3.prompt4
lesson.meanMedianMode.stage3.prompt4.hint
lesson.meanMedianMode.stage3.keyInsight
lesson.meanMedianMode.stage3.prompt5
lesson.meanMedianMode.stage3.prompt5.correct
lesson.meanMedianMode.stage3.prompt5.incorrectMean
lesson.meanMedianMode.stage3.prompt5.incorrectMode
lesson.meanMedianMode.stage4.summary
lesson.meanMedianMode.stage5.card1
lesson.meanMedianMode.stage5.card2
lesson.meanMedianMode.stage5.card3
lesson.meanMedianMode.stage5.card4
lesson.meanMedianMode.practice.p1.prompt
lesson.meanMedianMode.practice.p1.correct
lesson.meanMedianMode.practice.p1.incorrectMedian
lesson.meanMedianMode.practice.p1.incorrectMode
lesson.meanMedianMode.practice.p2.prompt
lesson.meanMedianMode.practice.p2.correct
lesson.meanMedianMode.practice.p2.incorrect
lesson.meanMedianMode.practice.p3.prompt
lesson.meanMedianMode.practice.p3.correct
lesson.meanMedianMode.practice.p3.incorrect
lesson.meanMedianMode.practice.p4.prompt
lesson.meanMedianMode.practice.p4.correct
lesson.meanMedianMode.practice.p4.incorrect
lesson.meanMedianMode.practice.p5.prompt
lesson.meanMedianMode.practice.p5.correct
lesson.meanMedianMode.practice.p5.incorrect
lesson.meanMedianMode.practice.p6.prompt
lesson.meanMedianMode.practice.p6.correct
lesson.meanMedianMode.practice.p6.incorrectMean
lesson.meanMedianMode.practice.p6.incorrectMedian
lesson.meanMedianMode.practice.p7.prompt
lesson.meanMedianMode.practice.p7.correct
lesson.meanMedianMode.practice.p7.incorrectOutlier
lesson.meanMedianMode.practice.p7.incorrectMeasure
lesson.meanMedianMode.practice.p8.prompt
lesson.meanMedianMode.practice.p8.correct
lesson.meanMedianMode.practice.p8.incorrect
lesson.meanMedianMode.practice.p9.prompt
lesson.meanMedianMode.practice.p9.correct
lesson.meanMedianMode.practice.p9.incorrectFair
lesson.meanMedianMode.practice.p9.incorrectMean
lesson.meanMedianMode.practice.p9.incorrectMode
lesson.meanMedianMode.stage7.prompt
lesson.meanMedianMode.stage7.placeholder
lesson.meanMedianMode.stage7.confirmation
```

### Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Student navigates away mid-lesson | State persisted to IndexedDB. On return, resume from last completed stage. Show "Welcome back! You left off at Stage {n}." |
| Network offline during Practice | Problems are loaded at stage entry and cached. Submissions queue locally. Sync when online. |
| Network offline during Reflection | Reflection text saved locally. AI evaluation deferred. Show "We'll evaluate your reflection when you're back online." |
| Student submits empty/whitespace reflection | Client-side validation prevents submission. Min 20 chars of non-whitespace. |
| Student submits gibberish reflection | AI evaluator gives 0-1 star score. Feedback: "Try explaining when you would use mean vs. median vs. mode." No punitive action. |
| All dots at same value | Mean = Median = Mode = that value. Fulcrum sits directly under the single stack. Displayed correctly. |
| Single dot in dot plot | Mean = Median = Mode = that dot's value. "Mode: 1 (appears 1 time)" — technically every value is a mode with count 1, so display as "No mode (all values appear once)" would be shown if there were multiple unique values. With 1 dot, show the value. |
| No dots in dot plot (all removed) | Mean, Median, Mode all show "—" (em dash) in muted text. Fulcrum is hidden. Message: "Add some data points to see the measures!" |
| Even number of data points (median) | Median is calculated as the average of the two middle values. If this produces a decimal, display with 1 decimal place. |
| Bimodal or multimodal data | Mode readout shows all mode values: "3, 7" or "2, 5, 8". Mode highlight appears on all tallest stacks. |
| Student drags dot past number line range | Dot is constrained to 0-20. At boundaries, rubberband effect provides visual feedback that the boundary has been hit, then the dot snaps back to 0 or 20. |
| Student rapidly taps Add Dot | Debounce at 150ms. Each tap within debounce window is ignored. Button shows brief disabled state between taps. Maximum 40 dots total (at that point, Add button is disabled with message "Maximum data points reached!") |
| Very slow device (< 30fps detected) | Disable fulcrum slide spring animation (use instant position). Disable measure readout scale pulse. Disable glow effects on median/mode highlights. Log performance warning to analytics. |
| Screen reader with dot manipulation | Announce: "Data point moved from 5 to 8. Dataset now has 8 values. Mean is 5.1. Median is 5.5. Mode is 5." |
| RTL layout (future) | Number line and dot plot always render LTR (numbers are inherently LTR). UI chrome (labels, buttons, navigation) follows RTL rules. |
| Matching exercise on narrow mobile | Cards and targets stack vertically instead of side-by-side. Drag is replaced by tap-to-select: tap a card (highlights it), then tap a target to place it. |

---

## Appendix A: Content Files

### meta.json

```json
{
  "id": "SP-5.1",
  "name": "Mean, Median, Mode",
  "domain": "statistics-probability",
  "gradeLevel": 6,
  "prerequisites": ["NO-1.3"],
  "successors": ["SP-5.2", "SP-5.1a", "SP-5.3"],
  "estimatedMinutes": 28,
  "stages": 7,
  "hook": "A basketball team's heights: 6'0, 6'1, 6'2, 6'3, and 7'6 (Yao Ming!). Average height 6'5 — but NOBODY is actually 6'5!",
  "tags": ["mean", "median", "mode", "central-tendency", "outliers", "statistics", "dot-plot"],
  "contentLicense": "CC BY-SA 4.0",
  "version": "1.0.0"
}
```

### problems.json (Structure)

```json
{
  "problems": [
    {
      "id": "SP-5.1-P1",
      "layer": 0,
      "type": "multiple-choice",
      "difficulty": 0.2,
      "prompt": "lesson.meanMedianMode.practice.p1.prompt",
      "visual": {
        "type": "icon",
        "icon": "fulcrum-neutral"
      },
      "answer": {
        "correct": "Mean",
        "options": ["Mean", "Median", "Mode"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p1.correct",
        "incorrect": {
          "Median": "lesson.meanMedianMode.practice.p1.incorrectMedian",
          "Mode": "lesson.meanMedianMode.practice.p1.incorrectMode"
        }
      }
    },
    {
      "id": "SP-5.1-P2",
      "layer": 0,
      "type": "tap-to-select",
      "difficulty": 0.3,
      "prompt": "lesson.meanMedianMode.practice.p2.prompt",
      "visual": {
        "type": "dot-plot",
        "data": [1, 3, 3, 5, 7, 7, 7, 9],
        "range": [0, 10]
      },
      "answer": {
        "correct": 7,
        "type": "tap-dot-stack"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p2.correct",
        "incorrect": "lesson.meanMedianMode.practice.p2.incorrect"
      }
    },
    {
      "id": "SP-5.1-P3",
      "layer": 0,
      "type": "true-false",
      "difficulty": 0.25,
      "prompt": "lesson.meanMedianMode.practice.p3.prompt",
      "visual": {
        "type": "sort-comparison",
        "unsorted": [8, 2, 5, 1, 9],
        "sorted": [1, 2, 5, 8, 9]
      },
      "answer": {
        "correct": true,
        "type": "boolean"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p3.correct",
        "incorrect": "lesson.meanMedianMode.practice.p3.incorrect"
      }
    },
    {
      "id": "SP-5.1-P4",
      "layer": 1,
      "type": "numeric-input",
      "difficulty": 0.5,
      "prompt": "lesson.meanMedianMode.practice.p4.prompt",
      "visual": {
        "type": "data-chips",
        "data": [4, 7, 10, 3, 6],
        "scaffold": true
      },
      "answer": {
        "correct": 6,
        "tolerance": 0,
        "type": "number"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p4.correct",
        "incorrect": "lesson.meanMedianMode.practice.p4.incorrect"
      }
    },
    {
      "id": "SP-5.1-P5",
      "layer": 1,
      "type": "drag-sort-then-select",
      "difficulty": 0.6,
      "prompt": "lesson.meanMedianMode.practice.p5.prompt",
      "visual": {
        "type": "sortable-chips",
        "data": [12, 5, 8, 15, 3, 8, 20],
        "shuffled": true
      },
      "answer": {
        "sortedOrder": [3, 5, 8, 8, 12, 15, 20],
        "median": 8,
        "medianPosition": 4,
        "type": "sort-and-select"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p5.correct",
        "incorrect": "lesson.meanMedianMode.practice.p5.incorrect"
      }
    },
    {
      "id": "SP-5.1-P6",
      "layer": 1,
      "type": "multiple-choice",
      "difficulty": 0.55,
      "prompt": "lesson.meanMedianMode.practice.p6.prompt",
      "visual": {
        "type": "bar-chart",
        "categories": ["Pasta", "Salad", "Burger", "Soup"],
        "values": [45, 32, 58, 28]
      },
      "answer": {
        "correct": "Mode",
        "options": ["Mean", "Median", "Mode"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p6.correct",
        "incorrect": {
          "Mean": "lesson.meanMedianMode.practice.p6.incorrectMean",
          "Median": "lesson.meanMedianMode.practice.p6.incorrectMedian"
        }
      }
    },
    {
      "id": "SP-5.1-P7",
      "layer": 2,
      "type": "two-part-select",
      "difficulty": 0.75,
      "prompt": "lesson.meanMedianMode.practice.p7.prompt",
      "visual": {
        "type": "dot-plot",
        "data": [10, 12, 11, 13, 12, 50],
        "range": [0, 55]
      },
      "answer": {
        "partA": 50,
        "partB": "Mean",
        "type": "multi-part"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p7.correct",
        "incorrect": {
          "partA": "lesson.meanMedianMode.practice.p7.incorrectOutlier",
          "partB": "lesson.meanMedianMode.practice.p7.incorrectMeasure"
        }
      }
    },
    {
      "id": "SP-5.1-P8",
      "layer": 2,
      "type": "numeric-input",
      "difficulty": 0.7,
      "prompt": "lesson.meanMedianMode.practice.p8.prompt",
      "visual": {
        "type": "sorted-chips-with-bracket",
        "data": [3, 7, 9, 15],
        "middlePair": [7, 9]
      },
      "answer": {
        "correct": 8,
        "tolerance": 0,
        "type": "number"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p8.correct",
        "incorrect": "lesson.meanMedianMode.practice.p8.incorrect"
      }
    },
    {
      "id": "SP-5.1-P9",
      "layer": 2,
      "type": "two-part-select",
      "difficulty": 0.85,
      "prompt": "lesson.meanMedianMode.practice.p9.prompt",
      "visual": {
        "type": "bar-chart-extreme",
        "data": [40000, 45000, 50000, 55000, 60000, 2000000000],
        "labels": ["Home 1", "Home 2", "Home 3", "Home 4", "Home 5", "Billionaire"]
      },
      "answer": {
        "partA": "misleading",
        "partB": "Median",
        "type": "multi-part"
      },
      "feedback": {
        "correct": "lesson.meanMedianMode.practice.p9.correct",
        "incorrect": {
          "partA": "lesson.meanMedianMode.practice.p9.incorrectFair",
          "partB_Mean": "lesson.meanMedianMode.practice.p9.incorrectMean",
          "partB_Mode": "lesson.meanMedianMode.practice.p9.incorrectMode"
        }
      }
    }
  ]
}
```

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
2. [ ] Hook animation plays automatically with correct timing, colors, silhouette sizing, and layout
3. [ ] Dot plot renders with initial dataset and all dots are draggable
4. [ ] Dragging a dot updates mean (fulcrum position), median (highlight), and mode (stack highlight) in real time at 60fps
5. [ ] Mean fulcrum animates smoothly along the number line as data changes
6. [ ] Median highlight correctly handles both odd and even data counts
7. [ ] Mode highlight correctly handles no-mode, single-mode, and multi-modal cases
8. [ ] Add/Remove dot buttons work with correct pop/shrink animations
9. [ ] Continue button in Stage 2 requires 10+ interactions AND at least one drag AND at least one add
10. [ ] Guided Discovery outlier experiment (Prompt 2) allows dragging one dot and shows live measure updates
11. [ ] Matching exercise (Prompt 3/4) validates correct matches and provides specific incorrect feedback
12. [ ] Symbol Bridge notation appears with correct KaTeX rendering and timing
13. [ ] Mean formula shows sum/count calculation with color-coded terms
14. [ ] Median formula shows sort-then-find-middle algorithm
15. [ ] Mode section shows frequency table with highlighted max
16. [ ] Real-World Anchor cards display with correct icons, badges, and measure associations
17. [ ] All 9 practice problems function with correct input types and validation
18. [ ] Problem 5 (drag-to-sort) validates sorting AND median identification as two steps
19. [ ] Problem 8 (even-count median) accepts decimal answer (8) for averaging two middle values
20. [ ] Problem 9 (billionaire) correctly validates both the fairness judgment AND measure selection
21. [ ] Reflection stage enforces 20-char minimum and submits for AI scoring
22. [ ] Confirmation visual plays after reflection showing outlier-distorted dataset
23. [ ] All interactions meet 44px minimum touch target
24. [ ] `prefers-reduced-motion` disables all motion-intensive animations
25. [ ] Screen reader announces all state changes via `aria-live` regions
26. [ ] Keyboard navigation works for all interactive elements (including dot drag via arrow keys)
27. [ ] Mobile layout (< 640px) is single-column and usable
28. [ ] Tablet+ layout (>= 640px) uses side-by-side where specified
29. [ ] All strings use i18n keys (no hardcoded English in components)
30. [ ] Lesson progress persists to IndexedDB and syncs to server
31. [ ] XP is calculated correctly per the XP Summary table
32. [ ] Performance: 60fps on mid-range mobile during all animations, including fulcrum sliding
33. [ ] Mean/Median/Mode recalculation completes in < 8ms
34. [ ] Storybook stories exist for each stage in isolation
35. [ ] Vitest tests cover: mean calculation, median calculation (odd + even count), mode calculation (single + multi + none), outlier detection, sorting validation
36. [ ] Playwright E2E test covers full lesson completion flow (all 7 stages)
