# Lesson Design: AL-3.1 Variables & Expressions

**Version**: 1.0.0 | **Date**: 2026-03-22 | **Author**: Lesson Design Team
**Concept ID**: AL-3.1 | **Domain**: Algebra | **Grade**: 6
**Prerequisites**: NO-1.1 (Place Value), NO-1.2 (Integers), NO-1.6 (Order of Operations) | **Successors**: AL-3.2, AL-3.1a, AL-3.3
**Content Path**: `src/content/domains/algebra/AL-3.1/`
**Constitution Compliance**: All 7 Core Principles verified. Neural Learning Sequence followed without reordering or omission.

---

## 1. Lesson Overview

| Field | Value |
|-------|-------|
| Concept | Variables and algebraic expressions in the context of unknowns and generalized arithmetic |
| Grade | 6 (ages 11-12) |
| Duration | ~25 minutes across 7 stages |
| Learning Objective | Students understand that a variable is a symbol representing an unknown or changeable number, and that an expression is a combination of variables, numbers, and operations that describes a calculation without stating a result |
| Secondary Objectives | Students can evaluate expressions by substituting values for variables; students can translate word phrases into algebraic expressions; students can identify the parts of an expression (terms, coefficients, constants); students understand that `2x` means `2 times x`, not the digits `2` and `x` placed side by side |
| Common Misconceptions | (1) "x always equals the same thing" -- believing a variable is a fixed, specific number rather than a placeholder for any number. (2) "Variables are letters, not numbers" -- treating variables as fundamentally different from numbers rather than as stand-ins for numbers. (3) "2x means 2 and x next to each other (concatenation)" -- interpreting juxtaposition as digit concatenation (like "twenty-something") rather than multiplication. (4) Confusing expression and equation -- thinking every algebraic statement has an equals sign or "answer." |
| NLS Stages | Hook, Spatial Experience, Guided Discovery, Symbol Bridge, Real-World Anchor, Practice (9 problems across 3 layers), Reflection |
| Emotional Arc | Curiosity (Hook) -> Engagement (Spatial) -> Productive Struggle (Discovery) -> Insight (Symbol Bridge) -> Confidence (Real-World) -> Mastery (Practice) -> Metacognition (Reflection) |

---

## 2. Neuroscience Framework

### Stage-by-Stage Cognitive Architecture

| Stage | Cognitive Process | Neuroscience Rationale | Target Emotional State |
|-------|------------------|----------------------|----------------------|
| 1. Hook | Attention capture, reward prediction | The dopaminergic system activates when the brain encounters a puzzle or mystery. "I'm thinking of a number..." is a classic attention hook because it creates a prediction error -- the brain desperately wants to close the gap between known (the result) and unknown (the starting number). The VTA fires in anticipation of solving the mystery, priming the hippocampus for the concept of "unknown." | Curiosity, intrigue |
| 2. Spatial Experience | Spatial reasoning, embodied cognition, causal reasoning | The function machine model activates the intraparietal sulcus (IPS) by mapping the abstract concept of "operation on an unknown" to a physical, spatial process: something goes IN, a transformation occurs, something comes OUT. Motor cortex engagement through dragging numbers into the input slot creates stronger memory traces than passive observation. The cause-and-effect loop (input -> operation -> output) leverages the brain's causal reasoning circuits in the prefrontal cortex, building intuition for "what the expression does" before any notation appears. | Engagement, playful exploration |
| 3. Guided Discovery | Pattern recognition, relational reasoning, abstraction | By observing multiple input-output pairs from the function machine, the prefrontal cortex engages in pattern recognition: "the machine always doubles and adds 3." The anterior cingulate cortex (ACC) monitors the prediction error between expected and actual outputs, strengthening the conceptual link between the machine's behavior and the expression `2x + 3`. The student discovers the notation rather than being told -- this self-generated insight triggers a stronger dopamine response than instruction. | Productive struggle, dawning insight |
| 4. Symbol Bridge | Symbolic encoding, dual coding integration | Overlaying `2x + 3` onto the already-understood function machine leverages dual coding: the visual (machine with gears) and verbal (notation) channels reinforce each other. The angular gyrus maps each symbol to its spatial counterpart: `x` = the input slot, `2x` = the doubling gear, `+ 3` = the adding gear, and the output = the expression's value. Without this grounding, `2x + 3` is just marks on paper. | Insight, confidence |
| 5. Real-World Anchor | Semantic memory integration, transfer preparation | Connecting variables and expressions to everyday scenarios (pricing formulas, game scores, recipes) activates the brain's semantic network, creating multiple retrieval paths. When a student later encounters `3n + 5` in a textbook, they can retrieve the function machine, the pricing rule, or the game score formula -- whichever pathway is strongest. | Confidence, relevance |
| 6. Practice | Retrieval practice, error-driven learning, progressive challenge | The 3-layer structure (recall -> procedure -> understanding) maps to increasingly deep processing. Retrieval practice strengthens memory traces more than re-studying. Each problem forces the student to reconstruct the concept from memory, not merely recognize it. The interleaving of problem types prevents the brain from settling into a single strategy, promoting flexible understanding. | Mastery, self-efficacy |
| 7. Reflection | Metacognition, self-explanation effect | Generating an explanation of WHY a variable is useful (not just WHAT it is) forces the brain to organize fragmented understanding into a coherent narrative. The self-explanation effect (Chi et al., 1989) shows 2-3x better retention when students explain concepts in their own words versus passive review. | Metacognition, ownership |

### Why This Ordering Works

The sequence spatial-before-symbolic is critical for variables and expressions because the concept of "unknown" is inherently abstract. Students who first experience the function machine (Stage 2) -- physically dragging inputs and watching outputs -- build a concrete, embodied mental model. When notation appears (Stage 4), it maps directly onto this model: `x` IS the input slot, `2x` IS the doubling gear. Research (Dehaene, 2011; Lakoff & Nunez, 2000) demonstrates that mathematical understanding is grounded in spatial/bodily metaphors. Students who receive the function machine experience before symbolic instruction show significantly better transfer to novel expressions than those who start with notation.

The emotional arc is equally deliberate. The mystery number hook (Stage 1) activates curiosity -- the brain's "I need to know" signal. The function machine (Stage 2) sustains engagement through interactive cause-and-effect loops. The discovery phase (Stage 3) creates the productive struggle that signals to the brain "this is worth remembering." The symbol bridge (Stage 4) provides the satisfying "aha" that consolidates the spatial model into notation. Real-world anchoring (Stage 5) prevents the concept from feeling "school-only." Practice (Stage 6) converts fragile understanding into durable skill. Reflection (Stage 7) cements long-term retention.

---

## 3. Stage 1: Hook (30-60 seconds)

### Purpose
Activate curiosity by presenting a mystery: "I'm thinking of a number..." This classic puzzle creates an information gap the brain desperately wants to close. The mystery box (variable) going through operations IS the concept of variables and expressions, experienced as narrative before formalization.

### Animation Design

**Canvas**: Full viewport width, centered vertically. Background: dark (`#0f172a`, Tailwind `slate-900`). No grid, no axes -- clean stage.

**Sequence**:

#### Phase 1: The Challenge (0s - 2.0s)
1. **0.0s**: Text appears at the top of the viewport, typewriter-style (one character per 40ms):
   - "I'm thinking of a number..."
   - Font: System sans (Inter preferred), `clamp(20px, 5vw, 32px)`, white (`#f8fafc`), italic
   - Fade-in per character: `opacity: 0 -> 1`, stagger 40ms
   - Position: centered horizontally, top 20% of viewport

2. **1.2s**: A glowing mystery box appears at center-left of the viewport:
   - Shape: rounded rectangle, 80px x 80px, `border-radius: 16px`
   - Fill: `#8b5cf620` (purple, 12% opacity)
   - Border: 2px solid `#8b5cf6` (purple)
   - A large `?` character centered inside: font-size 48px, `#8b5cf6`, font-weight 700
   - Entry animation: `scale: 0 -> 1.1 -> 1`, `opacity: 0 -> 1`, 0.5s, `spring({ damping: 15, stiffness: 400 })`
   - A subtle pulsing glow: `box-shadow: 0 0 20px #8b5cf640`, pulsing between 20px and 30px radius, 1.5s loop

#### Phase 2: The Operations (2.0s - 5.0s)
3. **2.0s**: A horizontal arrow (40px long, 2px, `#94a3b8`) draws from the mystery box to a "times 2" gear:
   - Arrow draw: left-to-right, 0.3s, `ease: "easeOut"`
   - Gear icon: a stylized cog (SVG), 56px, stroke `#f59e0b` (amber), fill `#f59e0b20`
   - Inside the gear: `x2` in amber, font-size 20px, font-weight 700
   - Gear entry: `scale: 0 -> 1`, `rotate: -90deg -> 0deg`, 0.4s, `spring({ damping: 18, stiffness: 300 })`
   - After entry, gear slowly rotates: `rotate: 0deg -> 360deg`, 8s loop, `ease: "linear"`

4. **2.8s**: Another arrow draws from the "times 2" gear to a "plus 3" gear:
   - Same arrow style
   - Gear icon: same cog style, 56px, stroke `#22d3ee` (cyan), fill `#22d3ee20`
   - Inside the gear: `+3` in cyan, font-size 20px, font-weight 700
   - Same entry animation, 0.2s delay after arrow
   - Same slow rotation, opposite direction

5. **3.6s**: A final arrow draws from the "plus 3" gear to a result display:
   - Result box: rounded rectangle, 80px x 60px, `border-radius: 12px`
   - Fill: `#34d39920` (emerald, 10% opacity)
   - Border: 2px solid `#34d399` (emerald)
   - The number `11` fades in inside: font-size 40px, `#34d399`, font-weight 700, `tabular-nums`
   - Entry: `opacity: 0 -> 1`, `scale: 0.8 -> 1`, 0.4s, `ease: "easeOutBack"`

6. **4.2s**: Text appears below the machine:
   - "I double it and add 3, and I get 11."
   - Font: 18px, `#e2e8f0`, line-height 1.6
   - Fade-in: `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s

7. **4.8s**: A second line of text appears:
   - "What's my number?"
   - Font: 20px, `#f8fafc`, font-weight 600
   - Fade-in: same as above, 0.3s delay

#### Phase 3: The Reveal (5.0s - 7.5s)
8. **5.5s**: The mystery box's `?` begins shaking (horizontal wiggle: `translateX: -3px -> 3px`, 3 oscillations, 0.4s)

9. **6.0s**: The `?` morphs into `4`:
   - The `?` fades out (`opacity: 1 -> 0`, 0.2s) while simultaneously the `4` fades in (`opacity: 0 -> 1`, 0.2s)
   - The `4` is purple (`#a78bfa`), font-size 48px, font-weight 700
   - A burst of particles emanates from the box: 12 small circles in purple/amber/cyan, spreading radially, fading out over 0.8s
   - The box border brightens: `#8b5cf6` -> `#a78bfa`, 0.3s

10. **6.3s**: The operation chain animates with the revealed value:
    - The `4` "travels" from the mystery box through the gears (a small purple circle follows the arrow path)
    - At the "times 2" gear: a label `4 x 2 = 8` appears briefly above the gear (amber, 14px, 0.5s visible)
    - At the "plus 3" gear: a label `8 + 3 = 11` appears briefly above the gear (cyan, 14px, 0.5s visible)
    - The `11` in the result box pulses: `scale: 1 -> 1.15 -> 1`, 0.3s
    - A green checkmark appears next to the result box, `scale: 0 -> 1.2 -> 1`, 0.3s

11. **7.0s**: A summary text fades in below:
    - "The mystery number was 4!"
    - Font: 18px, `#34d399`, font-weight 600
    - `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s

#### Phase 4: Continue Button (7.5s+)
12. **7.5s**: Continue button fades in below the summary:
    - Text: "Continue" (i18n key: `lesson.continue`)
    - Style: filled button, primary color (`#8b5cf6` purple-500), white text
    - Size: `min-width: 160px`, `height: 48px` (meets 44px touch target requirement)
    - Animation: `opacity: 0 -> 1`, 0.5s, `ease: "easeOut"`
    - Hover state: `background: #7c3aed` (purple-600)
    - Active state: `scale: 0.97`, 0.1s

### Accessibility
- `aria-live="polite"` region announces: "I'm thinking of a number. I double it and add 3, and I get 11. What's my number? The mystery number was 4."
- All animated elements have `prefers-reduced-motion` fallback: show the final state immediately with simple fade-in (0.5s total instead of 7.5s)
- The mystery box, gears, and result display are actual SVG elements with text labels (not canvas-rendered) for screen reader access
- Gears have `aria-label`: "Operation: multiply by 2", "Operation: add 3"

### MathScene DSL (Hook Animation)

```json
{
  "id": "AL-3.1-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 800, 500],
  "background": "#0f172a",
  "objects": [
    {
      "type": "annotation", "id": "challenge-text",
      "position": [400, 60], "text": "I'm thinking of a number...",
      "style": { "fontSize": 28, "fill": "#f8fafc", "fontStyle": "italic", "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "group", "id": "mystery-box",
      "children": [
        {
          "type": "geometricShape", "id": "box-rect",
          "shape": "rectangle", "center": [160, 250], "width": 80, "height": 80,
          "style": { "fill": "#8b5cf620", "stroke": "#8b5cf6", "strokeWidth": 2, "rx": 16 }
        },
        {
          "type": "annotation", "id": "box-question",
          "position": [160, 250], "text": "?",
          "style": { "fontSize": 48, "fill": "#8b5cf6", "fontWeight": 700, "textAnchor": "middle" }
        },
        {
          "type": "annotation", "id": "box-answer",
          "position": [160, 250], "text": "4",
          "style": { "fontSize": 48, "fill": "#a78bfa", "fontWeight": 700, "textAnchor": "middle" },
          "visible": false
        }
      ],
      "visible": false
    },
    {
      "type": "geometricShape", "id": "arrow-1",
      "shape": "line", "from": [200, 250], "to": [260, 250],
      "style": { "stroke": "#94a3b8", "strokeWidth": 2 },
      "visible": false
    },
    {
      "type": "group", "id": "gear-multiply",
      "children": [
        {
          "type": "geometricShape", "id": "gear-multiply-shape",
          "shape": "circle", "center": [310, 250], "radius": 28,
          "style": { "fill": "#f59e0b20", "stroke": "#f59e0b", "strokeWidth": 2 }
        },
        {
          "type": "annotation", "id": "gear-multiply-label",
          "position": [310, 250], "latex": "\\times 2",
          "style": { "fontSize": 20, "fill": "#f59e0b", "fontWeight": 700, "textAnchor": "middle" }
        }
      ],
      "visible": false
    },
    {
      "type": "geometricShape", "id": "arrow-2",
      "shape": "line", "from": [338, 250], "to": [398, 250],
      "style": { "stroke": "#94a3b8", "strokeWidth": 2 },
      "visible": false
    },
    {
      "type": "group", "id": "gear-add",
      "children": [
        {
          "type": "geometricShape", "id": "gear-add-shape",
          "shape": "circle", "center": [448, 250], "radius": 28,
          "style": { "fill": "#22d3ee20", "stroke": "#22d3ee", "strokeWidth": 2 }
        },
        {
          "type": "annotation", "id": "gear-add-label",
          "position": [448, 250], "latex": "+3",
          "style": { "fontSize": 20, "fill": "#22d3ee", "fontWeight": 700, "textAnchor": "middle" }
        }
      ],
      "visible": false
    },
    {
      "type": "geometricShape", "id": "arrow-3",
      "shape": "line", "from": [476, 250], "to": [536, 250],
      "style": { "stroke": "#94a3b8", "strokeWidth": 2 },
      "visible": false
    },
    {
      "type": "group", "id": "result-box",
      "children": [
        {
          "type": "geometricShape", "id": "result-rect",
          "shape": "rectangle", "center": [600, 250], "width": 80, "height": 60,
          "style": { "fill": "#34d39920", "stroke": "#34d399", "strokeWidth": 2, "rx": 12 }
        },
        {
          "type": "annotation", "id": "result-value",
          "position": [600, 250], "text": "11",
          "style": { "fontSize": 40, "fill": "#34d399", "fontWeight": 700, "textAnchor": "middle" }
        }
      ],
      "visible": false
    },
    {
      "type": "annotation", "id": "description-text",
      "position": [400, 370], "text": "I double it and add 3, and I get 11.",
      "style": { "fontSize": 18, "fill": "#e2e8f0", "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "annotation", "id": "question-text",
      "position": [400, 400], "text": "What's my number?",
      "style": { "fontSize": 20, "fill": "#f8fafc", "fontWeight": 600, "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "annotation", "id": "reveal-text",
      "position": [400, 440], "text": "The mystery number was 4!",
      "style": { "fontSize": 18, "fill": "#34d399", "fontWeight": 600, "textAnchor": "middle" },
      "visible": false
    }
  ],
  "animations": [
    {
      "id": "hook-sequence",
      "trigger": "auto",
      "steps": [
        { "action": "fadeIn", "target": "challenge-text", "duration": 0.8, "ease": "easeOut" },
        { "action": "wait", "duration": 0.4 },
        { "action": "fadeIn", "target": "mystery-box", "duration": 0.5, "from": "scale" },
        { "action": "wait", "duration": 0.3 },
        { "action": "fadeIn", "target": "arrow-1", "duration": 0.3, "from": "left" },
        { "action": "fadeIn", "target": "gear-multiply", "duration": 0.4, "from": "scale" },
        { "action": "wait", "duration": 0.3 },
        { "action": "fadeIn", "target": "arrow-2", "duration": 0.3, "from": "left" },
        { "action": "fadeIn", "target": "gear-add", "duration": 0.4, "from": "scale" },
        { "action": "wait", "duration": 0.3 },
        { "action": "fadeIn", "target": "arrow-3", "duration": 0.3, "from": "left" },
        { "action": "fadeIn", "target": "result-box", "duration": 0.4, "from": "scale" },
        { "action": "wait", "duration": 0.3 },
        { "action": "fadeIn", "target": "description-text", "duration": 0.4, "from": "bottom" },
        { "action": "fadeIn", "target": "question-text", "duration": 0.3, "from": "bottom", "delay": 0.3 },
        { "action": "wait", "duration": 0.7 },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeOut", "target": "box-question", "duration": 0.2 },
            { "action": "fadeIn", "target": "box-answer", "duration": 0.2 }
          ]
        },
        { "action": "wait", "duration": 0.5 },
        { "action": "fadeIn", "target": "reveal-text", "duration": 0.4, "from": "bottom" }
      ]
    }
  ],
  "interactions": []
}
```

---

## 4. Stage 2: Spatial Experience (2-4 minutes)

### Purpose
Provide hands-on manipulation of a function machine so the student builds a spatial/motor representation of "input -> operations -> output." The student drags numbers into the machine, watches operations happen step by step, and sees the result. No formulas, no notation. The machine IS the expression.

### Layout

**Mobile** (< 768px): Single column, stacked vertically.
- Top: Output display (sticky, 64px tall)
- Middle: Function machine viewport (scrollable, flex-grow)
- Bottom: Input number selector (fixed, 120px tall)

**Tablet+** (>= 768px): Two-panel side-by-side.
- Left panel (55% width): Function machine viewport
- Right panel (45% width): Input/Output history table

### Component: Function Machine

The central interactive element is a vertical function machine rendered as an SVG scene.

**Machine Structure** (top to bottom):
```
┌──────────────────────────────┐
│      INPUT FUNNEL            │  <- drag numbers here
│         ▼                    │
│  ┌─────────────────────┐     │
│  │    OPERATION 1       │     │  <- e.g., "x 2" with spinning gear
│  │    (multiply by 2)   │     │
│  └─────────────────────┘     │
│         ▼                    │
│  ┌─────────────────────┐     │
│  │    OPERATION 2       │     │
│  │    (add 3)           │     │
│  └─────────────────────┘     │
│         ▼                    │
│  ┌──── OUTPUT TRAY ─────┐    │  <- result appears here
│  │       [result]        │    │
│  └───────────────────────┘   │
└──────────────────────────────┘
```

**Machine Visual**:
- Outer frame: rounded rectangle, `border-radius: 20px`, fill `#1e293b`, stroke `#334155`, 2px
- Inner sections connected by vertical "pipes" (rounded rectangles, 8px wide, `#475569`)
- Input funnel: trapezoid shape at top, wider at top (120px) than bottom (60px), fill `#8b5cf620`, stroke `#8b5cf6`
- Operation boxes: rounded rectangles (200px x 80px), with gear icons
  - Operation 1: fill `#f59e0b15`, stroke `#f59e0b`, label "x 2" in amber
  - Operation 2: fill `#22d3ee15`, stroke `#22d3ee`, label "+ 3" in cyan
- Output tray: rounded rectangle (120px x 60px), fill `#34d39920`, stroke `#34d399`
- Each gear icon slowly rotates when idle (2s per revolution), speeds up during processing (0.5s per revolution)

### Component: Input Number Selector

A horizontal row of draggable number chips at the bottom of the screen.

**Number chips**: Values from 0 through 9, plus -2, -1 (for exploring negative inputs later in the session)
- Each chip: 52px x 52px, `border-radius: 12px`, `background: #334155`, `color: #f8fafc`, font-size 24px, font-weight 700
- Arranged in a scrollable horizontal row with 8px gaps
- Chips are draggable (`@use-gesture/react`)
- On tap (alternative to drag): the number is sent to the machine input automatically with a "whoosh" animation

**Chip states**:
- Default: `background: #334155`, `border: 1px solid #475569`
- Hover/touch: `background: #475569`, `border: 1px solid #8b5cf6`
- Dragging: `scale: 1.1`, `shadow: 0 8px 24px rgba(0,0,0,0.4)`, follows finger/cursor
- Used (already sent to machine): subtle checkmark overlay (green, 12px, top-right corner), still tappable

### Function Machine Processing Animation

When a number is dropped into the input funnel (or tapped):

1. **0.0s**: The number chip shrinks from the source and a copy appears at the top of the funnel:
   - Copy color: purple (`#a78bfa`), font-size 32px, font-weight 700
   - Entry: `scale: 0.5 -> 1`, `opacity: 0 -> 1`, 0.3s, `spring({ damping: 20, stiffness: 300 })`
   - The funnel border brightens: `#8b5cf6` -> `#a78bfa`, 0.2s

2. **0.3s**: The number slides down the pipe from the funnel toward Operation 1:
   - Motion: `translateY` smooth downward over 0.5s, `ease: "easeIn"`
   - A small trail of purple dots follows (3 dots, fading out)
   - The pipe section between funnel and Operation 1 briefly lights up: `#8b5cf6` glow, 0.3s

3. **0.8s**: The number enters Operation 1 ("x 2"):
   - The gear icon spins faster (0.5s per revolution)
   - The operation box border pulses: `#f59e0b` -> `#fbbf24` -> `#f59e0b`, 0.3s
   - The number morphs into the intermediate result:
     - e.g., input `4` -> the `4` shrinks and `8` grows in its place
     - Color transitions from purple to amber during this morph
     - A brief calculation label appears to the right of the box: `4 x 2 = 8` in amber, 14px, fades after 1s
   - Duration: 0.5s for the morph

4. **1.3s**: The intermediate result slides down the pipe toward Operation 2:
   - Same sliding animation as step 2, but the number is now amber
   - Pipe lights up in amber

5. **1.8s**: The number enters Operation 2 ("+ 3"):
   - Same gear spin-up
   - The number morphs into the final result:
     - e.g., `8` -> `11`
     - Color transitions from amber to cyan
     - Calculation label: `8 + 3 = 11` in cyan, 14px, fades after 1s
   - Duration: 0.5s

6. **2.3s**: The final result slides down into the Output Tray:
   - The number lands with a satisfying `spring({ damping: 12, stiffness: 400 })` bounce
   - Color transitions from cyan to emerald (`#34d399`)
   - The output tray border brightens: `#34d399` -> `#4ade80`, 0.3s
   - A subtle circular ripple emanates from the output (emerald, 30% opacity, 0.4s)

7. **2.5s**: The input-output pair is recorded in the history table (right panel on tablet+, or a mini-display above the funnel on mobile):
   - New row slides in from the right: `translateX: 24px -> 0`, `opacity: 0 -> 1`, 0.3s
   - Format: `[input] -> [output]`, e.g., `4 -> 11`
   - Input in purple, arrow in slate, output in emerald
   - Maximum 6 rows visible; older rows scroll up

### Component: Input-Output History Table

| Property | Value |
|----------|-------|
| Position | Right panel (tablet+) or collapsible strip above the funnel (mobile) |
| Row height | 40px |
| Font | Mono, `tabular-nums`, 18px |
| Colors | Input: `#a78bfa` (purple), Arrow: `#94a3b8` (slate), Output: `#34d399` (emerald) |
| Max visible rows | 6 (scrolls on overflow) |
| Header row | "In -> Out" in `#64748b`, 12px, uppercase |
| Background | `#0f172a` with subtle row striping (alternating `#0f172a` and `#1e293b`) |

### Phase 2: Expression Builder (unlocked after 5 machine inputs)

After the student has sent at least 5 different numbers through the machine, an "Expression Builder" panel slides up from the bottom:

**Prompt text**: "Can you build the machine's rule?" (i18n key: `lesson.variablesExpressions.stage2.builderPrompt`)
- Font: 16px, `#e2e8f0`, italic

**Expression Builder Interface**:
```
┌─────────────────────────────────┐
│  Drag to build:                  │
│                                  │
│  Source tiles:                   │
│  [x] [2] [3] [5] [+] [-] [x]   │
│       (numbers)    (operators)   │
│                                  │
│  Build zone:                     │
│  [____] [____] [____] [____]    │
│                                  │
│  Preview: ___                    │
│  [Check]                         │
└─────────────────────────────────┘
```

**Source tiles**: Draggable chips containing:
- Variable: `x` (purple chip, `background: #8b5cf620`, `border: 2px solid #8b5cf6`)
- Numbers: `2`, `3`, `5`, `7` (green chips, `background: #34d39920`, `border: 2px solid #34d399`)
- Operators: `+`, `-`, `*` (amber chips, `background: #f59e0b20`, `border: 2px solid #f59e0b`)
- Each tile: 48px x 48px, `border-radius: 10px`, font-size 22px, font-weight 700

**Build zone**: 4 horizontal drop slots with implied structure:
- Each slot: 56px x 56px, `border: 2px dashed #475569`, `border-radius: 8px`
- When a tile is dragged over a slot, the border becomes solid and takes the tile's color
- When a tile is dropped, it snaps in with `spring({ damping: 20, stiffness: 300 })`
- Slots can be cleared by tapping the placed tile (it returns to source with `ease: "easeOutBack"`)

**Live preview**: Below the build zone, a live expression renders as the student builds:
- Uses the same font styling as the history table
- e.g., after placing `2`, `*`, `x`, `+`, `3`, shows: `2 * x + 3`
- Invalid combinations show in red: `#f87171`

**Validation**: A "Check" button (outline style, amber border) becomes active when at least 3 tiles are placed:
- Correct answer: `2 * x + 3` (accepts `2x + 3` ordering: number-operator-variable-operator-number)
- Also accepts: `x * 2 + 3` (commutative multiplication)
- On correct:
  - Green checkmark, all tiles glow green for 0.5s
  - Text: "That's the machine's rule! 2 times x, plus 3." (i18n key: `lesson.variablesExpressions.stage2.builderCorrect`)
  - The expression animates upward and "overlays" onto the function machine, with `2` landing on the multiply gear and `+ 3` landing on the add gear
- On incorrect:
  - Gentle red border flash on the build zone (0.3s)
  - Hint: "Try the machine with x = 1: you get 5. What times 1 gives... hmm. Try different arrangements!" (i18n key: `lesson.variablesExpressions.stage2.builderHint`)

### Interaction Requirements

| Requirement | Details |
|-------------|---------|
| MIN_INTERACTIONS | 8 total: at least 5 machine inputs + 3 expression builder interactions before Continue button appears |
| Interaction tracking | Every number drop/tap into machine counts. Every tile drag in builder counts. |
| Continue button | Fades in only after MIN_INTERACTIONS reached AND the expression builder has been attempted at least once (correct or not) |
| Continue button style | Same as Hook stage continue button |
| Max time without interaction | If 30 seconds pass without interaction, the AI tutor avatar peeks in with a hint: "Try dragging a number into the funnel at the top! See what comes out." (i18n key: `lesson.variablesExpressions.stage2.hint`) |
| Machine rule | Fixed for this stage: `2x + 3`. The rule does NOT change. |
| Edge case: input 0 | Machine processes normally: `0 * 2 + 3 = 3`. This is a valid and instructive input. |
| Edge case: negative input | Machine processes normally: `-2 * 2 + 3 = -1`. Negative results display in red (`#f87171`) to draw attention. |
| Edge case: rapid input | Debounce at 300ms between inputs. If a second number is dropped while the machine is processing, it queues and plays after the current animation completes. Maximum queue: 2 items. |
| Initial state | Machine is empty. History table is empty. Expression builder is hidden. |

### Drag-and-Drop Specifications

Students drag number chips from the selector into the input funnel:
- Drag source: number chips in the bottom selector row
- Drop target: the input funnel area (generous hit area: 160px x 120px)
- On valid drop: chip "falls" into the funnel with a brief scale-down and processing begins
- On invalid drop (outside funnel): chip snaps back to its position with `ease: "easeOutBack"`, 0.3s
- Gesture: `@use-gesture/react` `useDrag` hook
- Visual during drag: chip follows finger/cursor at 110% scale, with a 4px shadow increase, purple tint border

### State Management

```typescript
// State for Stage 2
interface FunctionMachineState {
  inputHistory: Array<{ input: number; output: number }>;
  interactionCount: number;
  isProcessing: boolean;
  inputQueue: number[];
  expressionBuilderVisible: boolean;
  expressionBuilderSlots: Array<string | null>; // 4 slots
  expressionBuilderCorrect: boolean;
  hasAttemptedBuilder: boolean;
}
```

### Accessibility (Stage 2)
- Input-output pairs are announced via `aria-live="polite"`: "Input 4 produces output 11."
- Number chips have `aria-label`: "Input number 4", "Input number 5", etc.
- Machine processing is announced: "Processing: 4 times 2 equals 8. 8 plus 3 equals 11. Output: 11."
- Expression builder tiles have `aria-label`: "Variable x", "Number 2", "Operator plus", etc.
- Drag-and-drop has keyboard alternative: Tab to select a chip, Enter to send it to the machine
- Expression builder: Tab between slots, Enter on a tile to pick it up, Tab to a slot, Enter to place

---

## 5. Stage 3: Guided Discovery (3-5 minutes)

### Purpose
Through guided observation, lead the student to the key insights: (1) the machine's rule can be written as `2x + 3`, (2) `x` represents whatever number goes in, (3) the notation `2x` means `2 times x`, and (4) an expression is a "recipe" not an "answer."

### Layout

Full viewport. Dark background (`#0f172a`). Content centered, max-width 640px.

### Sequence

The stage consists of 5 sequential prompts. Each prompt must be acknowledged before the next appears. The prompts build on each other logically.

#### Prompt 1: Pattern Recognition (display-only, requires acknowledgment)

**Visual**: The input-output history from Stage 2 is displayed in a clean table, with a new column added:

```
 Input (x)  |  x 2  |  + 3  |  Output
 ─────────────────────────────────────
     1       |   2   |   5   |    5
     2       |   4   |   7   |    7
     3       |   6   |   9   |    9
     4       |   8   |  11   |   11
     5       |  10   |  13   |   13
```

- Table background: `#1e293b`, `border-radius: 12px`, `padding: 20px`
- Header row: font-weight 600, `#94a3b8` (slate-400)
- Input column: purple (`#a78bfa`)
- "x 2" column: amber (`#f59e0b`)
- "+ 3" column: cyan (`#22d3ee`)
- Output column: emerald (`#34d399`)
- Each row fades in with 0.2s stagger (from top to bottom)
- The intermediate columns ("x 2" and "+ 3") are initially hidden and slide in from the left after all rows appear (0.5s delay, 0.4s animation)

**Text**: Displayed below the table in a card-style container (background `#1e293b`, `border-radius: 12px`, `padding: 20px`):
- "Look at the pattern! Every input goes through the same two steps: first multiply by 2, then add 3."
- The words "multiply by 2" are in amber, "add 3" are in cyan, both bold
- Font: 16px, `#e2e8f0`, line-height 1.6
- i18n key: `lesson.variablesExpressions.stage3.prompt1`

**Acknowledgment**: "I see the pattern!" button (primary style).

#### Prompt 2: Naming the Unknown (animated, requires acknowledgment)

**Animation**: The function machine from Stage 2 reappears at smaller scale (60%), centered.

1. **0.0s**: The input funnel's content changes from the last number to a pulsing `?`:
   - `?` in purple, font-size 32px, pulsing `scale: 1.0 -> 1.1 -> 1.0`, 1.2s loop
   - Label above funnel: "Any number can go in!" in `#e2e8f0`, 14px, italic

2. **0.8s**: The `?` morphs into `x`:
   - Smooth morph: `?` fades out (0.2s), `x` fades in (0.2s) at the same position
   - `x` is styled: purple (`#a78bfa`), italic, font-size 36px, font-weight 700
   - A glow ring appears around the `x`: `box-shadow: 0 0 16px #8b5cf640`

3. **1.2s**: Text appears to the right of the machine:
   - "We call it **x**" (purple, bold)
   - "It's a **variable** -- a letter that stands for any number we choose."
   - Font: 16px, `#e2e8f0`, line-height 1.6
   - The word "variable" has a background highlight: `#8b5cf620`, `border-radius: 4px`, `padding: 2px 8px`
   - Animation: slide in from right, 0.4s, `ease: "easeOut"`

**Text card** below:
- "In math, we use letters like x, y, or n to represent numbers we don't know yet -- or numbers that can change. These are called **variables**."
- The word "variables" is bold, purple
- i18n key: `lesson.variablesExpressions.stage3.prompt2`

**Acknowledgment**: "Got it!" button.

#### Prompt 3: Building the Expression (animated, requires acknowledgment)

**Visual**: The function machine remains visible. Below it, a notation line builds piece by piece.

1. **0.0s**: The `x` in the input funnel pulses once, then an arrow draws from the funnel down to a blank space below the machine where the expression will be built.

2. **0.3s**: The first piece of notation appears:
   - `x` in purple, positioned at the left of the expression line
   - A dotted connecting line draws from the input funnel to this `x`: same purple, 1px dashed
   - Label above: "whatever goes in" in purple, 12px, italic

3. **1.0s**: The multiply gear pulses, then the next piece appears:
   - `2x` -- the `2` appears in amber to the LEFT of the `x`
   - A dotted line from the multiply gear to the `2`
   - Label above: "multiply by 2" in amber, 12px, italic
   - The `x` slides right slightly to make room for the `2`

4. **1.8s**: A callout box appears:
   - "Wait -- when we write `2x`, we mean `2 times x`. In algebra, we skip the multiplication sign!"
   - Background: `#f59e0b15`, border-left: 4px solid `#f59e0b`, `padding: 12px 16px`, `border-radius: 0 8px 8px 0`
   - Font: 14px, `#fbbf24`, line-height 1.5
   - This directly addresses Misconception #3 (2x = concatenation)
   - i18n key: `lesson.variablesExpressions.stage3.prompt3.callout`

5. **2.8s**: The add gear pulses, then the final piece appears:
   - `+ 3` appears in cyan after the `2x`
   - A dotted line from the add gear to the `+ 3`
   - Label above: "add 3" in cyan, 12px, italic

6. **3.5s**: The complete expression highlights:
   - `2x + 3` -- displayed large: `clamp(28px, 6vw, 44px)`, font-weight 700
   - Each part retains its color: `2` amber, `x` purple, `+` white, `3` cyan
   - A glow effect: `text-shadow: 0 0 20px rgba(139, 92, 246, 0.3)`
   - Below: the output tray from the machine connects to the expression with an `=` sign and a result placeholder `?`
   - i18n key: `lesson.variablesExpressions.stage3.prompt3`

**Text card**: "The machine's rule is `2x + 3`. This is called an **expression**. It's a recipe that tells you what to do with any number you put in."
- The word "expression" has a background highlight: `#22d3ee20`, `border-radius: 4px`, `padding: 2px 8px`
- i18n key: `lesson.variablesExpressions.stage3.prompt3.text`

**Acknowledgment**: "I see it!" button.

#### Prompt 4: Expression vs Equation (requires acknowledgment)

**Visual**: Two side-by-side cards:

**Card A** (left):
- Header: "Expression" in a pill badge (cyan background)
- Content: `2x + 3`
- Below: "A recipe. No equals sign. No final answer."
- Visual: the function machine icon (miniature, 40px) with an arrow pointing forward
- Background: `#1e293b`, border-top: 3px solid `#22d3ee`
- i18n key: `lesson.variablesExpressions.stage3.prompt4.expression`

**Card B** (right):
- Header: "Equation" in a pill badge (emerald background)
- Content: `2x + 3 = 11`
- Below: "A statement. Has equals sign. Says two things are the same."
- Visual: a mini balance scale icon (40px)
- Background: `#1e293b`, border-top: 3px solid `#34d399`
- i18n key: `lesson.variablesExpressions.stage3.prompt4.equation`

Both cards enter with `translateY: 24px -> 0`, `opacity: 0 -> 1`, 0.4s, stagger 0.2s.

Between them: a "vs" divider (vertical line, `#475569`, 2px) with a small "vs" label.

**Text card** below:
- "An expression is like a recipe -- it describes what to do, but doesn't tell you the answer. An equation says 'these two things are equal.' Today we're learning about **expressions**."
- This directly addresses Misconception #4 (confusing expression and equation)
- i18n key: `lesson.variablesExpressions.stage3.prompt4.text`

**Acknowledgment**: "Got it!" button.

#### Prompt 5: The Key Insight (requires acknowledgment)

**Visual**: An insight card with special styling:
- Background: `#7c3aed20` (purple tint)
- Border-left: 4px solid `#a78bfa`
- Padding: 20px
- `border-radius: 0 12px 12px 0`

**Content**:
- Header icon: lightbulb SVG (amber, 24px) with glow animation
- Text: "A **variable** is a box that holds a number -- we don't know which number yet, but we can still write rules about it. An **expression** is a recipe that uses variables and operations to describe a calculation."
- The words "variable" (purple highlight) and "expression" (cyan highlight) are styled
- Font: 18px, `#f8fafc`, line-height 1.7, font-weight 500
- i18n key: `lesson.variablesExpressions.stage3.keyInsight`

**Below the insight card**: A mini interactive demo:
- A small inline expression `2x + 3` with a slider below the `x` (range: 0-10, step: 1)
- As the student drags the slider, the `x` updates in real time, and the expression evaluates:
  - e.g., slider at 4: `2(4) + 3 = 11`
  - slider at 7: `2(7) + 3 = 17`
- The current value of `x` shows in purple, the result in emerald
- This interactive element reinforces that `x` can be anything

**Acknowledgment**: Continue button appears after the student has moved the slider at least once (or after 10 seconds if they haven't interacted).

### Accessibility (Stage 3)
- All prompt text is in screen-reader-accessible containers
- The inline slider has `aria-label`: "Change the value of x" and `aria-valuetext`: "x equals 4, expression equals 11"
- Card comparisons (expression vs equation) are in an `aria-labelledby` group
- Expression building animation has `aria-live="polite"` updates: "Two x plus three. This is called an expression."
- Keyboard: slider responds to arrow keys; all acknowledgment buttons are Tab-accessible

---

## 6. Stage 4: Symbol Bridge (2-3 minutes)

### Purpose
Overlay formal mathematical notation and terminology onto the already-established function machine model. The student now sees the abstract symbols grounded in the machine they already understand. Key terms introduced: variable, coefficient, constant, term, expression.

### Layout
Full viewport. Same dark background. The function machine from Stage 2 is recreated in miniature (50% scale) at the top, with notation appearing below it.

### Visual Baseline

Show the function machine with the rule `2x + 3` already labeled:
- Input funnel with `x` (purple)
- Multiply gear with `x 2` (amber)
- Add gear with `+ 3` (cyan)
- Output tray with `2x + 3` (emerald)
- Machine rendered at 50% of Stage 2 size

Below the machine, the expression `2x + 3` is displayed large: `clamp(32px, 7vw, 56px)`, centered.

### Animation Sequence

The notation labels and vocabulary appear one at a time, each pointing to the corresponding part of the expression.

#### Step 1 (0.0s - 2.0s): The Variable

- A bracket appears under the `x` in `2x + 3`:
  - Bracket color: purple (`#a78bfa`)
  - Width: matches the `x` character
  - Draw animation: center-out, 0.3s
- Below the bracket, the label fades in:
  - KaTeX: `x` with annotation "variable"
  - Text: "**Variable** -- the unknown number"
  - Purple, 16px
  - `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s
- A dotted line connects the `x` in the expression to the input funnel above
- The funnel briefly glows purple (0.3s)

#### Step 2 (2.0s - 4.0s): The Coefficient

- A bracket appears under the `2` in `2x + 3`:
  - Bracket color: amber (`#f59e0b`)
- Below the bracket:
  - KaTeX: `2` with annotation "coefficient"
  - Text: "**Coefficient** -- the number multiplied by the variable"
  - Amber, 16px
  - Same fade animation
- A dotted line connects the `2` to the multiply gear
- The gear briefly glows amber
- A clarifying note slides in: "2x means 2 times x, written as `2 * x` or `2(x)`" (14px, `#94a3b8`, italic)

#### Step 3 (4.0s - 6.0s): The Constant

- A bracket appears under the `3` in `2x + 3`:
  - Bracket color: cyan (`#22d3ee`)
- Below the bracket:
  - KaTeX: `3` with annotation "constant"
  - Text: "**Constant** -- a fixed number that doesn't change"
  - Cyan, 16px
  - Same fade animation
- A dotted line connects the `3` to the add gear
- The gear briefly glows cyan

#### Step 4 (6.0s - 8.0s): The Terms

- Two larger brackets appear, grouping the expression into terms:
  - Bracket 1 under `2x`: amber-purple gradient
  - Bracket 2 under `3`: cyan
  - A `+` sign between them glows white
- Below:
  - Text: "An expression has **terms** separated by `+` or `-` signs."
  - `2x` is labeled "Term 1 (variable term)" in amber-purple
  - `3` is labeled "Term 2 (constant term)" in cyan
  - White, 16px
  - Same fade animation

#### Step 5 (8.0s - 10.0s): The Complete Picture

- All individual annotations fade to 40% opacity
- A single large bracket appears under the entire expression `2x + 3`
- Below the bracket:
  - KaTeX: `2x + 3`
  - Text: "**Algebraic Expression** -- a combination of variables, numbers, and operations"
  - White, 18px, font-weight 600
  - The word "expression" gets a glow: `text-shadow: 0 0 12px #22d3ee40`
- Below: a summary card (background `#1e293b`, `border-radius: 12px`, padding 16px):
  ```
  2x + 3
  │└ variable (x)
  │└ coefficient (2)
  │       └ constant (3)
  └── Term 1 ──┘  └ Term 2 ┘
  └──── Expression ─────────┘
  ```
  - Each label colored to match its annotation
  - Card entry: `opacity: 0 -> 1`, `translateY: 12px -> 0`, 0.5s

### Continue Button
- Appears 1s after the summary card animation completes
- Same style as previous continue buttons

### Accessibility (Stage 4)
- All KaTeX expressions have `aria-label` attributes: "2 x plus 3"
- Vocabulary terms announced via `aria-live="polite"`: "Variable: the unknown number. Coefficient: the number multiplied by the variable. Constant: a fixed number."
- All annotations are DOM text elements (not canvas-rendered)
- `prefers-reduced-motion`: all notation appears simultaneously with a single 0.5s fade-in

---

## 7. Stage 5: Real-World Anchor (1-2 minutes)

### Purpose
Connect the abstract concept of variables and expressions to concrete, memorable real-world scenarios that 11-12 year olds encounter. This creates multiple retrieval paths in semantic memory.

### Layout
Scrollable card list. Each scenario is a card. Dark background, max-width 640px, centered.

### Scenario Cards

Each card has:
- An icon (SVG, 40px, rendered inline)
- A title (18px, white, bold)
- A body (16px, slate-200, line-height 1.6)
- A highlighted expression within the body
- Background: `#1e293b`, `border-radius: 16px`, `padding: 20px`, `margin-bottom: 16px`
- Entry animation: slide up from bottom (`translateY: 24px -> 0`, `opacity: 0 -> 1`, 0.4s, stagger 0.2s between cards)

#### Card 1: Gaming

- **Icon**: Game controller (SVG: rounded rectangle with d-pad and buttons, stroke `#a78bfa`)
- **Title**: "Score Multipliers"
- **Body**: "In a game, you earn **double points** during a power-up, plus a **5-point bonus** each round. If you collect `x` points in a round, your total is:"
- **Expression**: `2x + 5` displayed in a highlighted code block (background `#0f172a`, `border-radius: 8px`, `padding: 8px 16px`)
  - `2` in amber, `x` in purple, `+` in white, `5` in cyan
  - Font: mono, 24px, font-weight 700
- **Example**: "Get 10 points? That's `2(10) + 5 = 25`! Get 50? That's `2(50) + 5 = 105`!"
- i18n key: `lesson.variablesExpressions.stage5.card1`

#### Card 2: Money / Shopping

- **Icon**: Shopping bag (SVG: bag outline with a tag, stroke `#34d399`)
- **Title**: "Buying T-Shirts Online"
- **Body**: "T-shirts cost **$12 each** and shipping is always **$4**, no matter how many you buy. If you buy `n` shirts, the total cost is:"
- **Expression**: `12n + 4` in the same highlighted style
  - `12` in amber, `n` in purple, `+` in white, `4` in cyan
- **Example**: "Buy 3 shirts? `12(3) + 4 = $40`. Buy 1? `12(1) + 4 = $16`. The variable `n` changes, but the expression stays the same!"
- i18n key: `lesson.variablesExpressions.stage5.card2`

#### Card 3: Cooking / Recipes

- **Icon**: Measuring cup (SVG: cup with measurement lines, stroke `#f59e0b`)
- **Title**: "Scaling a Recipe"
- **Body**: "A smoothie recipe uses **2 cups of fruit** per person plus **1 extra cup of ice** for the blender. For `p` people, you need:"
- **Expression**: `2p + 1` in the same highlighted style
  - `2` in amber, `p` in purple, `+` in white, `1` in cyan
- **Example**: "Party of 6? `2(6) + 1 = 13 cups`. Just yourself? `2(1) + 1 = 3 cups`."
- i18n key: `lesson.variablesExpressions.stage5.card3`

#### Card 4: Sports

- **Icon**: Basketball (SVG: circle with curved lines, stroke `#22d3ee`)
- **Title**: "Scoring in Basketball"
- **Body**: "In basketball, a regular basket is **2 points** and a three-pointer is **3 points**. If a player makes `b` regular baskets and `t` three-pointers, their score is:"
- **Expression**: `2b + 3t` in the same highlighted style
  - `2` in amber, `b` in purple, `+` in white, `3` in amber, `t` in purple
- **Example**: "This one has TWO variables! 5 regular baskets and 4 three-pointers: `2(5) + 3(4) = 10 + 12 = 22 points`."
- i18n key: `lesson.variablesExpressions.stage5.card4`

### Continue Button
- Appears at the bottom of the card list after all cards have animated in (0.2s delay after last card)
- The student can scroll to read all cards, then tap Continue
- If the viewport is tall enough to show all cards without scrolling, Continue appears immediately after animations

### Accessibility (Stage 5)
- Cards are `<article>` elements with `role="article"`
- Icons have `aria-hidden="true"` (decorative, described by card title)
- Highlighted expressions are wrapped in `<code>` elements with appropriate `aria-label`: "Expression: 2 x plus 5"
- Examples have `aria-label` describing the calculation in plain English

---

## 8. Stage 6: Practice (5-10 minutes)

### Purpose
Retrieval practice across three cognitive layers: recall (identify parts of expressions), procedure (evaluate and build expressions), and understanding (explain reasoning and transfer). Every problem includes immediate feedback.

### General Practice UI

Each problem is presented in a `ProblemCard` component:
- Background: `#1e293b`, `border-radius: 16px`, `padding: 24px`
- Max-width: 640px, centered
- Top: Problem number and layer badge (e.g., "Problem 1 of 9" / "Recall" in a small pill)
  - Recall pill: `background: #8b5cf620`, `color: #a78bfa`
  - Procedure pill: `background: #f59e0b20`, `color: #fbbf24`
  - Understanding pill: `background: #22d3ee20`, `color: #22d3ee`
- Center: Problem content (varies by problem type)
- Bottom: Answer input area (varies by problem type)

Progress bar at the top of the viewport:
- 9 dots, each dot 12px circle
- Unfilled: `#334155`
- Current: pulsing border in primary color (`#8b5cf6`)
- Correct: `#34d399` (green)
- Incorrect: `#f87171` (red)

### Layer 0: Recall (Problems 1-3)

#### Problem 1: Identify the Variable

**Prompt**: "In the expression `3x + 7`, which is the variable?"
- i18n key: `lesson.variablesExpressions.practice.p1.prompt`

**Visual**: The expression `3x + 7` displayed large (40px) with each part tappable:
- `3` in amber (coefficient)
- `x` in purple (variable)
- `+` in white (operator)
- `7` in cyan (constant)
- Each part is inside a tappable chip (56px x 44px, `border-radius: 8px`, `background: #334155`)
- Tap feedback: selected chip gets a 2px solid border in `#8b5cf6`

**Input**: Tap-to-select. Student taps one of the four parts.

**Correct answer**: `x`

**Feedback on correct**:
1. The `x` chip turns green (background `#34d39920`, border `#34d399`, 0.3s transition)
2. Green checkmark appears (0.3s, `scale: 0 -> 1.2 -> 1`)
3. Text: "Correct! The variable `x` represents an unknown number. It can be any value!" (green, 16px)
4. i18n key: `lesson.variablesExpressions.practice.p1.correct`

**Feedback on incorrect** (e.g., student taps `3`):
1. The tapped chip briefly flashes red (0.2s)
2. Text: "Not quite. The `3` is the coefficient -- the number multiplied by the variable. The variable is the letter that represents an unknown number." (red-400, 14px)
3. Student can retry immediately
4. i18n key: `lesson.variablesExpressions.practice.p1.incorrect`

#### Problem 2: Identify the Coefficient

**Prompt**: "What is the coefficient of `x` in the expression `5x - 2`?"
- i18n key: `lesson.variablesExpressions.practice.p2.prompt`

**Visual**: The expression `5x - 2` displayed large (40px) with color-coding:
- `5` in amber, `x` in purple, `-` in white, `2` in cyan

**Input**: Four multiple-choice buttons, vertically stacked:
- `x` (button A)
- `5` (button B)
- `2` (button C)
- `-2` (button D)
- Each button: full-width (max 400px), 52px height, `border-radius: 12px`, `background: #334155`, left-aligned text with a letter prefix (A, B, C, D in a circle), 18px font

**Correct answer**: `5` (B)

**Feedback on correct**:
1. Button B turns green
2. The `5` in the expression gets a pulsing glow ring (amber)
3. Text: "Yes! The coefficient is the number in front of the variable. In `5x`, the coefficient is 5, meaning 'x is multiplied by 5.'"
4. i18n key: `lesson.variablesExpressions.practice.p2.correct`

**Feedback on incorrect** (e.g., student picks `-2`):
1. Brief red flash on the tapped button
2. Text: "The `-2` is the constant term, not the coefficient. The coefficient is the number directly attached to the variable by multiplication. Look at what's touching the `x`!"
3. i18n key: `lesson.variablesExpressions.practice.p2.incorrect`

#### Problem 3: Expression vs Equation

**Prompt**: "Which of these is an EXPRESSION (not an equation)?"
- i18n key: `lesson.variablesExpressions.practice.p3.prompt`

**Input**: Four multiple-choice buttons:
- `x + 5 = 12` (button A)
- `3x - 1` (button B)
- `7 = 2y + 3` (button C)
- `4n + 6 = 22` (button D)
- Each button displays the math in KaTeX rendering, full-width, 52px height

**Correct answer**: `3x - 1` (B)

**Feedback on correct**:
1. Button B turns green
2. The other three buttons briefly highlight their `=` signs in red
3. Text: "That's right! `3x - 1` is an expression -- it has no equals sign. The others are equations because they use `=` to say two things are equal."
4. i18n key: `lesson.variablesExpressions.practice.p3.correct`

**Feedback on incorrect** (e.g., student picks A):
1. Brief red flash
2. Text: "Look carefully: `x + 5 = 12` has an equals sign (`=`), which makes it an equation. An expression has NO equals sign -- it's just a recipe for a calculation."
3. The `=` in the selected option gets highlighted in red briefly
4. i18n key: `lesson.variablesExpressions.practice.p3.incorrect`

### Layer 1: Procedure (Problems 4-6)

#### Problem 4: Evaluate an Expression

**Prompt**: "What is the value of `2x + 5` when `x = 3`?"
- i18n key: `lesson.variablesExpressions.practice.p4.prompt`

**Visual**: A mini function machine showing:
- Input: `3` (purple, entering the funnel)
- Expression: `2x + 5` below the machine
- A substitution animation that plays on load:
  - The `x` in `2x + 5` blinks, then the `3` slides from the input to replace it: `2(3) + 5`
  - The parentheses appear around the substituted value

**Input**: Numeric input field:
- Single number entry, centered
- Field: `width: 120px`, `height: 52px`, `border-radius: 12px`, `border: 2px solid #475569`, `background: #0f172a`
- Font: mono, 28px, white, centered
- Virtual number pad below (0-9 digits + backspace), each key 48px x 48px
- "Submit" button below the number pad (primary style, full width)

**Correct answer**: `11`

**Feedback on correct**:
1. Green border on the input field
2. The substitution animation plays step-by-step:
   - `2(3) + 5` -> `6 + 5` (the `2(3)` highlighted in amber, result `6` appears)
   - `6 + 5` -> `11` (the `6 + 5` highlighted in cyan, result `11` appears in emerald)
3. Text: "Correct! Replace x with 3: `2(3) + 5 = 6 + 5 = 11`"
4. i18n key: `lesson.variablesExpressions.practice.p4.correct`

**Feedback on incorrect** (e.g., student enters `23` -- common concatenation error):
1. Red border on input
2. Text: "Remember, `2x` means `2 TIMES x`, not `2 next to x`. So `2(3)` is `2 x 3 = 6`, not `23`. Try again!"
3. This specifically addresses Misconception #3
4. i18n key: `lesson.variablesExpressions.practice.p4.incorrect.concat`

**Feedback on incorrect** (other wrong answer, e.g., `8`):
1. Red border
2. Text: "Not quite. Let's work through it: `2x + 5`. Replace x with 3: `2(3) + 5`. First multiply: `6 + 5`. Then add: `11`."
3. i18n key: `lesson.variablesExpressions.practice.p4.incorrect.other`

#### Problem 5: Write an Expression from Words

**Prompt**: "A pizza costs $8 plus $2 per topping. Write an expression for the total cost if you choose `t` toppings."
- i18n key: `lesson.variablesExpressions.practice.p5.prompt`

**Visual**: A pizza icon (SVG, 80px) with topping icons scattered around it. Below, a partially built expression with drop zones.

**Input**: Drag-to-arrange. Source chips (shuffled):
- `t` (purple chip)
- `2` (amber chip)
- `8` (cyan chip)
- `+` (white chip)

Drop zone: `[____] [____] [____] [____]` -- 4 horizontal slots

**Correct answer**: `2t + 8` (also accepts `8 + 2t`)

**Validation**: When all chips are placed:
- System checks if the arrangement evaluates equivalently to `2t + 8`
- Accepted: `2t + 8`, `8 + 2t`, `2 * t + 8` (if `*` is a provided chip -- it is not in this case)

**Feedback on correct**:
1. Green border on all slots
2. Text: "Perfect! The cost per topping ($2) multiplied by the number of toppings (t), plus the base price ($8). Try it: 3 toppings = `2(3) + 8 = $14`!"
3. A brief animation shows: pizza with 3 toppings -> "$14" label
4. i18n key: `lesson.variablesExpressions.practice.p5.correct`

**Feedback on incorrect** (e.g., `t + 2 + 8`):
1. Red border flash
2. Text: "Close! But `t + 2 + 8` adds $2 once, not $2 PER topping. We need `2t` (2 times t) to show $2 for EACH topping. Then add the $8 base cost: `2t + 8`."
3. i18n key: `lesson.variablesExpressions.practice.p5.incorrect`

#### Problem 6: Evaluate with a Negative

**Prompt**: "Find the value of `3x - 4` when `x = -2`."
- i18n key: `lesson.variablesExpressions.practice.p6.prompt`

**Visual**: Expression `3x - 4` displayed large. The substitution placeholder `x = -2` shown in a purple badge.

**Input**: Multiple choice:
- `-10` (A)
- `-2` (B)
- `2` (C)
- `10` (D)
- Each button: full-width, 52px, `border-radius: 12px`

**Correct answer**: `-10` (A)

**Feedback on correct**:
1. Button A turns green
2. Step-by-step animation:
   - `3(-2) - 4`
   - `= -6 - 4` (amber highlight: `3 x (-2) = -6`)
   - `= -10` (cyan highlight: `-6 - 4 = -10`)
3. Text: "Right! `3(-2) = -6`, then `-6 - 4 = -10`. Negative inputs can give negative outputs!"
4. i18n key: `lesson.variablesExpressions.practice.p6.correct`

**Feedback on incorrect** (e.g., student picks `2`):
1. Brief red flash
2. Text: "Be careful with the signs! `3 times (-2) = -6` (positive times negative = negative). Then `-6 - 4 = -10`, not `+2`."
3. i18n key: `lesson.variablesExpressions.practice.p6.incorrect`

### Layer 2: Understanding (Problems 7-9)

#### Problem 7: Same Variable, Different Value

**Prompt**: "Ava says 'x always equals 4 because last time we found that x = 4.' Is Ava right or wrong?"
- i18n key: `lesson.variablesExpressions.practice.p7.prompt`

**Input**: True/False toggle:
- Two large buttons side by side:
  - "Ava is RIGHT" (left button, green-tinted)
  - "Ava is WRONG" (right button, red-tinted)
- Each: 48% width, 56px height, `border-radius: 12px`

**Correct answer**: "Ava is WRONG"

**Feedback on correct**:
1. "WRONG" button turns green (the correct choice)
2. Text: "Correct! A variable can represent ANY number, not just one specific value. In `2x + 3 = 11`, x happens to be 4. But in `2x + 3 = 9`, x would be 3. The whole point of a variable is that it can VARY!"
3. This directly addresses Misconception #1
4. A visual: show three equations with `x` as different values:
   - `2x + 3 = 5` -> `x = 1` (purple)
   - `2x + 3 = 11` -> `x = 4` (amber)
   - `2x + 3 = 23` -> `x = 10` (cyan)
5. i18n key: `lesson.variablesExpressions.practice.p7.correct`

**Feedback on incorrect**:
1. Brief red flash
2. Text: "Think again: if x ALWAYS equaled 4, we wouldn't need a letter -- we'd just write 4! A variable changes depending on the situation."
3. i18n key: `lesson.variablesExpressions.practice.p7.incorrect`

#### Problem 8: Translate Words to Expression

**Prompt**: "Write the expression: 'five more than triple a number `n`'"
- i18n key: `lesson.variablesExpressions.practice.p8.prompt`

**Visual**: The phrase is displayed with key words highlighted:
- "five more than" in cyan (indicates `+ 5`)
- "triple" in amber (indicates `3 x`)
- "a number `n`" in purple (indicates the variable)

**Input**: Multiple choice:
- `5n + 3` (A)
- `3n + 5` (B)
- `3 + 5n` (C)
- `5(n + 3)` (D)
- Each rendered in KaTeX, full-width buttons

**Correct answer**: `3n + 5` (B)

**Feedback on correct**:
1. Button B turns green
2. Text: "Excellent! 'Triple a number n' means `3n`. 'Five more than' means `+ 5`. Put them together: `3n + 5`. Reading math like a sentence is a powerful skill!"
3. An animation connects the words to the expression parts:
   - "triple" -> arrow to `3` (amber)
   - "a number n" -> arrow to `n` (purple)
   - "five more" -> arrow to `+ 5` (cyan)
4. i18n key: `lesson.variablesExpressions.practice.p8.correct`

**Feedback on incorrect** (e.g., student picks `5n + 3`):
1. Red flash
2. Text: "'Triple' means multiply by 3, not 5. And 'five MORE' means ADD 5, not multiply by 5. Let's break it down: 'triple n' = `3n`, then 'five more' = `+ 5`. Answer: `3n + 5`."
3. i18n key: `lesson.variablesExpressions.practice.p8.incorrect`

#### Problem 9: Building an Expression from a Scenario

**Prompt**: "You have `$20` and earn `$7` for each hour you babysit. Write an expression for your total money after `h` hours."
- i18n key: `lesson.variablesExpressions.practice.p9.prompt`

**Visual**: A timeline graphic showing:
- Start: wallet icon with "$20" label
- Arrow labeled "+$7" for each hour
- Hours marked: 0, 1, 2, 3...
- A placeholder `h` at the end

**Input**: Drag-to-arrange. Source chips (shuffled):
- `h` (purple)
- `7` (amber)
- `20` (cyan)
- `+` (white)

Drop zone: 4 horizontal slots

**Correct answer**: `7h + 20` (also accepts `20 + 7h`)

**Feedback on correct**:
1. Green border on all slots
2. Text: "That's it! `$7 per hour x h hours` gives `7h`, plus the `$20` you started with: `7h + 20`. After 3 hours: `7(3) + 20 = 21 + 20 = $41`!"
3. The timeline animates: filling in h=3, showing the accumulation $20 -> $27 -> $34 -> $41
4. i18n key: `lesson.variablesExpressions.practice.p9.correct`

**Feedback on incorrect** (e.g., `h + 7 + 20`):
1. Red flash
2. Text: "Almost! But `h + 7` only adds $7 once. You earn $7 for EACH hour, so you need `7h` (7 times h) to represent $7 per hour. Then add the starting $20: `7h + 20`."
3. i18n key: `lesson.variablesExpressions.practice.p9.incorrect`

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
- Drag-to-arrange has keyboard alternative (Tab + Enter to pick up/place)
- Numeric input has `aria-label`: "Enter the value of the expression"
- True/False toggle buttons have `aria-label`: "Select: Ava is right" / "Select: Ava is wrong"
- Feedback is announced via `aria-live="assertive"` for correctness, `aria-live="polite"` for explanations
- Timer is not used -- students have unlimited time on each problem (reduces math anxiety, per Constitution)
- KaTeX expressions have screen-reader-friendly `aria-label` text

---

## 9. Stage 7: Reflection (~1 minute)

### Purpose
Metacognitive self-explanation. The student consolidates their understanding by explaining WHY variables are useful, not just WHAT they are. This is the highest-value learning activity per the self-explanation effect research (Chi et al., 1989).

### Layout
Centered card, max-width 640px. Dark background.

### Prompt

**Card** (background `#1e293b`, `border-radius: 16px`, `padding: 24px`):
- **Header**: "Reflection" in a small pill badge (background `#7c3aed20`, text `#a78bfa`, 12px, uppercase, letter-spacing 1px)
- **Prompt text**: "Why do you think mathematicians use letters like x instead of just using numbers? When is a variable more useful than a specific number?"
  - i18n key: `lesson.variablesExpressions.stage7.prompt`
  - Font: 18px, `#f8fafc`, line-height 1.6, font-weight 500
- **Visual hint**: Below the prompt, show two side-by-side mini examples:
  - Left: "Specific: `2(4) + 3 = 11`" -- shows one calculation, static
  - Right: "General: `2x + 3 = ?`" -- shows the function machine in miniature (40px) with `x` flowing through
  - The right side subtly pulses, suggesting it's more powerful/general
  - Arranged horizontally, separated by a vertical "vs" divider
  - This visual primes the student to think about generalization

### Input

**Text area**:
- Min height: 120px, auto-grow to max 240px
- Placeholder: "Variables are useful because..." (i18n key: `lesson.variablesExpressions.stage7.placeholder`)
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
- Below the submit button, smaller and less prominent
- Text: "Skip" in `#64748b`, 14px, no background, underline on hover
- `min-height: 44px` (meets touch target despite small text)
- On skip: proceeds to completion with 0 reflection XP

### After Submission

1. **AI Evaluation** (via `lesson.submitReflection` tRPC endpoint):
   - The response is sent to the Claude API for quality scoring
   - Typical response time: 1-2 seconds
   - During evaluation: submit button shows spinner, text area becomes read-only

2. **Feedback Display** (0.5s fade-in after evaluation returns):

   **Quality indicator**: 0-5 filled stars (star icons, 24px)
   - 0-1 stars: "Keep practicing your explanations!" (encouraging, not punitive)
   - 2-3 stars: "Good start! You're thinking about it the right way."
   - 4-5 stars: "Excellent explanation! You really understand why variables matter."

   **AI feedback text**: A 1-3 sentence personalized response, displayed in a card:
   - Background: `#0f172a`, border-left: 4px solid `#8b5cf6`, padding 16px
   - Font: 14px, `#cbd5e1` (slate-300), italic

   **XP earned**: Displayed as a floating "+{amount} XP" badge that animates upward and fades (0.8s):
   - Range: 0-80 XP based on quality (Constitution: XP weighted toward explanation quality)
   - Color: `#fbbf24` (amber)

3. **Confirmation Visual** (appears simultaneously with feedback):
   - A final animation showing the power of variables:
     - The expression `2x + 3` appears centered
     - The `x` rapidly cycles through values: 1, 2, 3, 5, 10, 100 (each visible for 0.4s)
     - For each value, the result updates: 5, 7, 9, 13, 23, 203
     - Speed increases, then freezes back on `x`: "One expression, infinite possibilities."
   - Text below: "You've learned the language of algebra. Variables let us write rules that work for ANY number."
   - Animation duration: 3s total
   - i18n key: `lesson.variablesExpressions.stage7.confirmation`

4. **Lesson Complete**:
   - After feedback, a "Complete Lesson" button fades in (1s delay)
   - Same primary button style
   - On tap: triggers the lesson completion flow:
     - XP summary animation (total XP earned across all stages, shown as a counting-up number)
     - Achievement check (may trigger relevant achievements)
     - SRS state update: marks AL-3.1 as "learning" at recall layer (layer 0)
     - Unlocks successor topics: AL-3.2 (Evaluating Expressions), AL-3.1a (Like Terms & Distributive), AL-3.3 (One-Step Equations) become "available" in the Knowledge Nebula
     - Redirects to the lesson summary screen or back to the learn page

### Accessibility (Stage 7)
- Prompt is in a `<label>` element linked to the text area via `for`/`id`
- Star rating is announced via `aria-live`: "Your reflection scored 4 out of 5 stars"
- AI feedback is in an `aria-live="polite"` region
- The confirmation visual has an `aria-label` describing the concept: "The expression 2x + 3 can equal 5, 7, 9, 13, 23, or 203, depending on the value of x. One expression, infinite possibilities."
- Skip button has `aria-label`: "Skip reflection"

---

## 10. Technical Specifications

### Color Palette (Variables & Expressions)

| Element | Primary | Fill (20%) | CSS Variable |
|---------|---------|------------|-------------|
| Variable (x) | `#a78bfa` | `#a78bfa33` | `--ve-variable` |
| Coefficient | `#f59e0b` | `#f59e0b33` | `--ve-coefficient` |
| Constant | `#22d3ee` | `#22d3ee33` | `--ve-constant` |
| Output/Result | `#34d399` | `#34d39933` | `--ve-output` |
| Machine frame | `#334155` | `#33415533` | `--ve-machine` |
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

The four semantic colors for expression parts were chosen to be distinguishable under the three most common forms of color vision deficiency:

| Color | Protanopia | Deuteranopia | Tritanopia |
|-------|-----------|-------------|-----------|
| Purple `#a78bfa` (variable) | Blue-gray | Blue-gray | Pink-gray |
| Amber `#f59e0b` (coefficient) | Olive-brown | Olive-brown | Pink-orange |
| Cyan `#22d3ee` (constant) | Light blue | Light blue | Green |
| Green `#34d399` (output) | Yellow-brown | Yellow-brown | Blue-gray |

All four remain distinguishable under each deficiency. Per Constitution Principle IV, color is never the SOLE channel for meaning. Every color-coded element also has:
- A text label (e.g., "variable", "coefficient", "constant")
- A shape difference (chips have different border styles)
- Positional context (within the expression structure)

### Typography

| Element | Font | Size | Weight | Features |
|---------|------|------|--------|----------|
| Large expressions | System mono / JetBrains Mono | `clamp(28px, 6vw, 44px)` | 700 | `tabular-nums`, `font-variant-numeric: tabular-nums` |
| Inline expressions | System mono | `clamp(16px, 3.5vw, 22px)` | 600 | `tabular-nums` |
| Body text | System sans (Inter preferred) | 16px | 400 | `line-height: 1.6` |
| Labels | System sans | `clamp(10px, 2.5vw, 14px)` | 600 | `text-transform: uppercase`, `letter-spacing: 0.5px` |
| KaTeX math | KaTeX default | `clamp(16px, 3.5vw, 22px)` | -- | Uses KaTeX's own rendering |
| Button text | System sans | 16px | 600 | -- |
| Code blocks | System mono | 14px | 400 | `background: #0f172a`, `border-radius: 8px` |

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
    processing: 2.5,
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

const machineProcess = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5, ease: "easeIn" },
};
```

#### Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- All spring animations become simple `opacity` transitions (0.3s)
- No `scale`, `translate`, or `rotate` animations
- Function machine processing: show final state directly (input disappears, output appears in tray)
- Hook: show final composed state with a single fade-in
- Particle effects (bursts, ripples, trails) are disabled entirely
- Gear rotation is disabled (static gear icons)

```typescript
const useReducedMotion = (): boolean => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
};
```

### Touch & Interaction Targets

| Element | Min Size | Notes |
|---------|----------|-------|
| Number chips (draggable) | 52px x 52px | Large enough for drag initiation |
| Expression builder tiles | 48px x 48px | Exceeds 44px requirement |
| Multiple-choice buttons | full-width x 52px | Easy to tap on mobile |
| Drop slots | 56px x 56px (min) | Clear visual target |
| Continue button | 160px x 48px | Prominent, centered |
| Text area | full-width x 120px+ | Auto-growing, comfortable input |
| True/False buttons | 48% width x 56px | Large, clear choice |
| Numeric keypad keys | 48px x 48px | Exceeds 44px requirement |
| Skip button | 80px x 44px | Meets minimum despite small text |

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
| Mobile S | < 375px | Single column, number chips scroll horizontally, expression builder stacks vertically, font sizes at `clamp` minimums |
| Mobile M | 375-639px | Single column, function machine fills width, history table collapsed into top strip, comfortable spacing |
| Tablet | 640-1023px | Stage 2: side-by-side (55/45 -- machine/history). Practice: wider cards. Discovery prompts: wider text blocks. |
| Desktop | >= 1024px | Max-width container (800px), centered. Stage 2: generous side-by-side. Expression builder inline below machine. |

### Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Animation frame rate | 60fps (P95 >= 55fps) | Framer Motion `onFrame` callback + `PerformanceObserver` |
| SVG element count (Stage 2, max state) | <= 80 elements | Machine + chips + history rows |
| Time to interactive (Stage 2) | < 1.5s | From stage transition to first interaction available |
| Memory (Stage 2, all inputs tested) | < 15MB | Heap snapshot |
| Machine processing animation | Consistent 60fps | No layout thrashing during number flow |
| Input-to-output latency | < 16ms (1 frame) | State update + render start |
| Expression builder validation | < 5ms | Pattern matching on drop |

### State Persistence

Lesson progress is persisted to both local storage (Dexie.js) and server (via `lesson.completeStage` tRPC call):

```typescript
interface LessonProgressState {
  lessonId: "AL-3.1";
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
src/content/domains/algebra/AL-3.1/
├── lesson.mdx              # Stage text content (i18n-ready)
├── animations.json          # MathScene DSL configs for all stages
├── problems.json            # Practice problem bank (9 problems)
└── meta.json                # Metadata: prerequisites, successors, hooks

src/components/lesson/custom/
└── VariablesExpressionsLesson/
    ├── VariablesExpressionsLesson.tsx  # Custom lesson component (orchestrates all stages)
    ├── HookAnimation.tsx              # Stage 1: mystery number + function machine reveal
    ├── FunctionMachine.tsx            # Stage 2: interactive function machine
    ├── FunctionMachineGear.tsx        # Individual gear component (SVG, parameterized)
    ├── NumberChipSelector.tsx         # Draggable number chip row
    ├── InputOutputHistory.tsx         # History table component
    ├── ExpressionBuilder.tsx          # Drag-to-build expression component
    ├── DiscoveryPrompts.tsx           # Stage 3: guided prompts sequence
    ├── SymbolAnnotation.tsx           # Stage 4: notation overlay
    ├── ExpressionDisplay.tsx          # Reusable color-coded expression renderer
    └── index.ts                       # Barrel export
```

### i18n Keys (Complete List)

All user-facing strings are externalized. The following keys are added to `src/lib/i18n/messages/en.json` under the `lesson.variablesExpressions` namespace:

```
lesson.continue
lesson.variablesExpressions.stage2.hint
lesson.variablesExpressions.stage2.builderPrompt
lesson.variablesExpressions.stage2.builderCorrect
lesson.variablesExpressions.stage2.builderHint
lesson.variablesExpressions.stage3.prompt1
lesson.variablesExpressions.stage3.prompt2
lesson.variablesExpressions.stage3.prompt3
lesson.variablesExpressions.stage3.prompt3.callout
lesson.variablesExpressions.stage3.prompt3.text
lesson.variablesExpressions.stage3.prompt4.expression
lesson.variablesExpressions.stage3.prompt4.equation
lesson.variablesExpressions.stage3.prompt4.text
lesson.variablesExpressions.stage3.keyInsight
lesson.variablesExpressions.stage5.card1
lesson.variablesExpressions.stage5.card2
lesson.variablesExpressions.stage5.card3
lesson.variablesExpressions.stage5.card4
lesson.variablesExpressions.practice.p1.prompt
lesson.variablesExpressions.practice.p1.correct
lesson.variablesExpressions.practice.p1.incorrect
lesson.variablesExpressions.practice.p2.prompt
lesson.variablesExpressions.practice.p2.correct
lesson.variablesExpressions.practice.p2.incorrect
lesson.variablesExpressions.practice.p3.prompt
lesson.variablesExpressions.practice.p3.correct
lesson.variablesExpressions.practice.p3.incorrect
lesson.variablesExpressions.practice.p4.prompt
lesson.variablesExpressions.practice.p4.correct
lesson.variablesExpressions.practice.p4.incorrect.concat
lesson.variablesExpressions.practice.p4.incorrect.other
lesson.variablesExpressions.practice.p5.prompt
lesson.variablesExpressions.practice.p5.correct
lesson.variablesExpressions.practice.p5.incorrect
lesson.variablesExpressions.practice.p6.prompt
lesson.variablesExpressions.practice.p6.correct
lesson.variablesExpressions.practice.p6.incorrect
lesson.variablesExpressions.practice.p7.prompt
lesson.variablesExpressions.practice.p7.correct
lesson.variablesExpressions.practice.p7.incorrect
lesson.variablesExpressions.practice.p8.prompt
lesson.variablesExpressions.practice.p8.correct
lesson.variablesExpressions.practice.p8.incorrect
lesson.variablesExpressions.practice.p9.prompt
lesson.variablesExpressions.practice.p9.correct
lesson.variablesExpressions.practice.p9.incorrect
lesson.variablesExpressions.stage7.prompt
lesson.variablesExpressions.stage7.placeholder
lesson.variablesExpressions.stage7.confirmation
```

### Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Student navigates away mid-lesson | State persisted to IndexedDB. On return, resume from last completed stage. Show "Welcome back! You left off at Stage {n}." |
| Network offline during Practice | Problems are loaded at stage entry and cached. Submissions queue locally. Sync when online. |
| Network offline during Reflection | Reflection text saved locally. AI evaluation deferred. Show "We'll evaluate your reflection when you're back online." |
| Student submits empty/whitespace reflection | Client-side validation prevents submission. Min 20 chars of non-whitespace. |
| Student submits gibberish reflection | AI evaluator gives 0-1 star score. Feedback: "Try to explain why variables are useful. Think about the function machine -- what makes x special?" No punitive action. |
| Machine input while processing | Inputs are queued (max 2). Each queued input plays after the current animation completes. Queue overflow: additional inputs are silently dropped with a brief "busy" indicator on the funnel. |
| Student enters concatenation answer (e.g., 23 for 2x when x=3) | Specific feedback addresses Misconception #3: "Remember, 2x means 2 TIMES x, not the digits 2 and x side by side." |
| Expression builder: placing same tile twice | Each tile can only be used once. Attempting to place a second copy shows a brief shake animation on the tile in the source area. |
| Expression builder: removing a tile | Tap a placed tile to return it to the source. The tile animates back with `ease: "easeOutBack"`, 0.3s. |
| Drag-and-drop on devices without pointer events | Fall back to tap-to-select interface: tap a chip to pick it up (highlighted), tap a slot to place it. |
| Screen reader with function machine | Announce each phase: "Input: 4. Processing: 4 times 2 equals 8. Processing: 8 plus 3 equals 11. Output: 11." |
| Very slow device (< 30fps detected) | Disable particle effects (bursts, trails, gear rotation). Reduce machine processing animation to simplified version (input disappears, output appears). Log performance warning to analytics. |
| RTL layout (future) | Expression display and mathematical notation remain LTR. UI chrome (labels, buttons, navigation) follows RTL rules. Function machine layout adapts to vertical orientation only (no LTR/RTL dependency). |

---

## Appendix A: Content Files

### meta.json

```json
{
  "id": "AL-3.1",
  "name": "Variables & Expressions",
  "domain": "algebra",
  "gradeLevel": 6,
  "prerequisites": ["NO-1.1", "NO-1.2", "NO-1.6"],
  "successors": ["AL-3.2", "AL-3.1a", "AL-3.3"],
  "estimatedMinutes": 25,
  "stages": 7,
  "hook": "I'm thinking of a number... I double it and add 3, and I get 11. Mystery box reveals 4 through a function machine.",
  "tags": ["variables", "expressions", "function-machine", "algebra-introduction", "coefficients", "constants"],
  "contentLicense": "CC BY-SA 4.0",
  "version": "1.0.0"
}
```

### problems.json (Structure)

```json
{
  "problems": [
    {
      "id": "AL-3.1-P1",
      "layer": 0,
      "type": "tap-to-select",
      "difficulty": 0.2,
      "prompt": "lesson.variablesExpressions.practice.p1.prompt",
      "visual": {
        "expression": "3x + 7",
        "parts": [
          { "text": "3", "role": "coefficient", "color": "#f59e0b" },
          { "text": "x", "role": "variable", "color": "#a78bfa" },
          { "text": "+", "role": "operator", "color": "#f8fafc" },
          { "text": "7", "role": "constant", "color": "#22d3ee" }
        ]
      },
      "answer": {
        "correct": "x",
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p1.correct",
        "incorrect": "lesson.variablesExpressions.practice.p1.incorrect"
      }
    },
    {
      "id": "AL-3.1-P2",
      "layer": 0,
      "type": "multiple-choice",
      "difficulty": 0.3,
      "prompt": "lesson.variablesExpressions.practice.p2.prompt",
      "visual": {
        "expression": "5x - 2",
        "highlight": "coefficient"
      },
      "answer": {
        "correct": "5",
        "options": ["x", "5", "2", "-2"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p2.correct",
        "incorrect": "lesson.variablesExpressions.practice.p2.incorrect"
      }
    },
    {
      "id": "AL-3.1-P3",
      "layer": 0,
      "type": "multiple-choice",
      "difficulty": 0.3,
      "prompt": "lesson.variablesExpressions.practice.p3.prompt",
      "visual": {
        "options_katex": true
      },
      "answer": {
        "correct": "3x - 1",
        "options": ["x + 5 = 12", "3x - 1", "7 = 2y + 3", "4n + 6 = 22"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p3.correct",
        "incorrect": "lesson.variablesExpressions.practice.p3.incorrect"
      }
    },
    {
      "id": "AL-3.1-P4",
      "layer": 1,
      "type": "numeric-input",
      "difficulty": 0.5,
      "prompt": "lesson.variablesExpressions.practice.p4.prompt",
      "visual": {
        "expression": "2x + 5",
        "substitution": { "x": 3 },
        "showMachine": true
      },
      "answer": {
        "correct": 11,
        "type": "exact-number"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p4.correct",
        "incorrect_concat": "lesson.variablesExpressions.practice.p4.incorrect.concat",
        "incorrect_other": "lesson.variablesExpressions.practice.p4.incorrect.other"
      }
    },
    {
      "id": "AL-3.1-P5",
      "layer": 1,
      "type": "drag-arrange",
      "difficulty": 0.6,
      "prompt": "lesson.variablesExpressions.practice.p5.prompt",
      "visual": {
        "context": "pizza",
        "icon": "pizza"
      },
      "answer": {
        "correct": ["2t + 8", "8 + 2t"],
        "tiles": ["t", "2", "8", "+"],
        "type": "expression-build"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p5.correct",
        "incorrect": "lesson.variablesExpressions.practice.p5.incorrect"
      }
    },
    {
      "id": "AL-3.1-P6",
      "layer": 1,
      "type": "multiple-choice",
      "difficulty": 0.7,
      "prompt": "lesson.variablesExpressions.practice.p6.prompt",
      "visual": {
        "expression": "3x - 4",
        "substitution": { "x": -2 }
      },
      "answer": {
        "correct": "-10",
        "options": ["-10", "-2", "2", "10"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p6.correct",
        "incorrect": "lesson.variablesExpressions.practice.p6.incorrect"
      }
    },
    {
      "id": "AL-3.1-P7",
      "layer": 2,
      "type": "true-false",
      "difficulty": 0.8,
      "prompt": "lesson.variablesExpressions.practice.p7.prompt",
      "visual": {
        "character": "Ava",
        "claim": "x always equals 4"
      },
      "answer": {
        "correct": false,
        "type": "boolean"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p7.correct",
        "incorrect": "lesson.variablesExpressions.practice.p7.incorrect"
      }
    },
    {
      "id": "AL-3.1-P8",
      "layer": 2,
      "type": "multiple-choice",
      "difficulty": 0.9,
      "prompt": "lesson.variablesExpressions.practice.p8.prompt",
      "visual": {
        "phrase": "five more than triple a number n",
        "highlights": [
          { "text": "five more than", "color": "#22d3ee", "meaning": "+ 5" },
          { "text": "triple", "color": "#f59e0b", "meaning": "3x" },
          { "text": "a number n", "color": "#a78bfa", "meaning": "variable" }
        ]
      },
      "answer": {
        "correct": "3n + 5",
        "options": ["5n + 3", "3n + 5", "3 + 5n", "5(n + 3)"],
        "type": "single-select"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p8.correct",
        "incorrect": "lesson.variablesExpressions.practice.p8.incorrect"
      }
    },
    {
      "id": "AL-3.1-P9",
      "layer": 2,
      "type": "drag-arrange",
      "difficulty": 1.0,
      "prompt": "lesson.variablesExpressions.practice.p9.prompt",
      "visual": {
        "context": "babysitting",
        "timeline": true
      },
      "answer": {
        "correct": ["7h + 20", "20 + 7h"],
        "tiles": ["h", "7", "20", "+"],
        "type": "expression-build"
      },
      "feedback": {
        "correct": "lesson.variablesExpressions.practice.p9.correct",
        "incorrect": "lesson.variablesExpressions.practice.p9.incorrect"
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
2. [ ] Hook animation plays automatically with correct timing: mystery box, gears, reveal of `4`, and the operation chain walkthrough
3. [ ] Function machine processes all inputs correctly: `2x + 3` for any integer input in range [-2, 9]
4. [ ] Number chips can be dragged into the funnel OR tapped to send, with proper queuing for rapid inputs
5. [ ] Machine processing animation plays smoothly: input flows through gears with intermediate results visible
6. [ ] Input-output history table updates after each processing, showing all previous inputs and outputs
7. [ ] Expression builder appears after 5+ machine inputs and validates correctly (`2x + 3` or `x * 2 + 3`)
8. [ ] Guided Discovery prompts appear in sequence, with each requiring acknowledgment
9. [ ] Prompt 3 (pattern table) shows intermediate calculation columns with staggered reveal
10. [ ] Prompt 4 (expression vs equation) displays correctly as side-by-side comparison cards
11. [ ] Prompt 5 (key insight) includes working slider that evaluates `2x + 3` in real-time
12. [ ] Symbol Bridge notation labels (variable, coefficient, constant, term, expression) appear with correct timing and connections to the function machine
13. [ ] Real-World Anchor cards display and animate correctly with four scenarios
14. [ ] All 9 practice problems function with correct input types and validation
15. [ ] Problem 4 detects concatenation error (e.g., entering 23 when x=3) and provides specific misconception feedback
16. [ ] Problem 7 (True/False about "x always equals 4") provides targeted misconception feedback
17. [ ] Drag-to-arrange problems (P5, P9) accept equivalent orderings (e.g., `2t + 8` and `8 + 2t`)
18. [ ] Reflection stage enforces 20-char minimum and submits for AI scoring
19. [ ] Confirmation visual (cycling x values) plays after reflection submission
20. [ ] All interactions meet 44px minimum touch target
21. [ ] `prefers-reduced-motion` disables all motion-intensive animations (gear rotation, particle effects, machine processing flow)
22. [ ] Screen reader announces all state changes via `aria-live` regions, including machine processing steps
23. [ ] Keyboard navigation works for all interactive elements, including drag-to-arrange alternatives
24. [ ] Mobile layout (< 640px) is single-column and usable, with horizontally scrolling number chips
25. [ ] Tablet+ layout (>= 640px) uses side-by-side for function machine and history table
26. [ ] All strings use i18n keys (no hardcoded English in components)
27. [ ] Lesson progress persists to IndexedDB and syncs to server
28. [ ] XP is calculated correctly per the XP Summary table
29. [ ] Performance: 60fps on mid-range mobile during all animations, including machine processing
30. [ ] Storybook stories exist for each stage in isolation
31. [ ] Vitest tests cover: expression evaluation correctness, expression builder validation, practice answer validation, XP calculation
32. [ ] Playwright E2E test covers full lesson completion flow (all 7 stages)
