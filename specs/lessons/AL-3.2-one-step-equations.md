# Lesson Design: AL-3.2 One-Step Equations

**Version**: 1.0.0 | **Date**: 2026-03-23 | **Author**: Lesson Design Team
**Concept ID**: AL-3.2 | **Domain**: Algebra | **Grade**: 6
**Prerequisites**: AL-3.1 (Variables & Expressions), NO-1.2a (Integer Add/Sub), NO-1.2b (Integer Mul/Div) | **Successors**: AL-3.4 (Multi-Step Equations), AL-3.5 (Inequalities)
**Content Path**: `src/content/domains/algebra/AL-3.2/`
**Constitution Compliance**: All 7 Core Principles verified. Neural Learning Sequence followed without reordering or omission.

---

## 1. Lesson Overview

| Field | Value |
|-------|-------|
| Concept | One-step equations: solving for an unknown by applying a single inverse operation to both sides |
| Grade | 6 (ages 11-12) |
| Duration | ~25 minutes across 7 stages |
| Learning Objective | Students understand that solving an equation means isolating the variable by applying the inverse operation to BOTH sides, maintaining equality throughout |
| Secondary Objectives | Students can solve addition/subtraction equations (e.g., `x + 5 = 12`); students can solve multiplication/division equations (e.g., `3x = 18`); students can verify solutions by substituting back into the original equation; students understand that the equals sign means "the same as," not "here comes the answer" |
| Common Misconceptions | See Section 1.1 |
| NLS Stages | Hook, Spatial Experience, Guided Discovery, Symbol Bridge, Real-World Anchor, Practice (9 problems across 3 layers), Reflection |
| Emotional Arc | Curiosity (Hook) -> Engagement (Spatial) -> Productive Struggle (Discovery) -> Insight (Symbol Bridge) -> Confidence (Real-World) -> Mastery (Practice) -> Metacognition (Reflection) |

### 1.1 Common Misconceptions

| # | Misconception | Why Students Have It | How We Address It |
|---|---------------|---------------------|-------------------|
| 1 | Operating on only one side of the equation | Students view the equals sign as "gives the answer" (operational view) rather than "both sides are the same" (relational view). They subtract 5 from the left side of `x + 5 = 12` and write `x = 12` without subtracting from the right. | The balance scale makes this physically impossible -- removing blocks from one side only causes the scale to tilt. The student SEES that equality breaks. |
| 2 | Guessing instead of systematic inverse operations | Students who are comfortable with mental arithmetic skip the algebraic process and just "figure out" the answer. This works for simple equations but fails completely at multi-step or complex equations. | The guided discovery (Stage 3) explicitly contrasts guessing vs. systematic undoing. Practice problems escalate to values where guessing is impractical (e.g., `x + 47 = 83`), making the systematic approach essential. |
| 3 | Confusing the operation with its inverse | Students see `x + 5 = 12` and ADD 5 to both sides instead of subtracting, or see `3x = 18` and MULTIPLY by 3 instead of dividing. They know they need to "do something to both sides" but pick the wrong operation. | The function machine in reverse (Stage 2b) makes the inverse explicit: if the machine ADDED 5, you UNDO by subtracting 5. The "unwrapping" metaphor reinforces: the last thing that was done is the first thing you undo. |
| 4 | Treating the equals sign as "calculate" rather than "balance" | Students read `=` as "the answer is" (from years of arithmetic: `3 + 5 = __`). This makes equations like `12 = x + 5` confusing because "the answer" appears on the left. | The balance scale model grounds `=` as a physical relationship (both pans at the same level), not a command to calculate. Stage 3 explicitly shows equations in both orientations (`x + 5 = 12` and `12 = x + 5`) on the same balance. |

---

## 2. Neuroscience Framework

### 2.1 Cognitive Architecture Per Stage

| Stage | Primary Cognitive Process | Brain Regions Engaged | Why This Order Matters |
|-------|--------------------------|----------------------|----------------------|
| 1. Hook | Curiosity activation, reward prediction error | Ventral tegmental area (VTA), nucleus accumbens | A disguised number being "revealed" by undoing its disguise creates a dopamine-driven prediction error. The brain WANTS to know the hidden value. This primes attention for the concept of "isolating the unknown." |
| 2. Spatial Experience | Embodied cognition, causal reasoning, conservation | Intraparietal sulcus (IPS), premotor cortex, inferior parietal lobule | The balance scale exploits the IPS's spatial magnitude processing. Motor cortex engagement through dragging blocks on/off both sides creates a procedural memory trace for "do the same to both sides." Conservation of equality is experienced kinesthetically, not told. |
| 3. Guided Discovery | Pattern recognition, inverse reasoning, abstraction | Prefrontal cortex (PFC), anterior cingulate cortex (ACC) | The ACC detects the prediction error between "what was done to x" and "what I need to undo." Self-discovery of the inverse operation pattern triggers stronger dopamine response than direct instruction. The student discovers the rule themselves. |
| 4. Symbol Bridge | Dual coding, symbol grounding, procedural formalization | Angular gyrus (symbol-to-meaning mapping), IPS (magnitude processing) | Notation appears ON TOP of the balance scale. Each algebraic step (`x + 5 - 5 = 12 - 5`) is visually synchronized with blocks being removed from both pans. Without this grounding, the algebraic manipulation is meaningless symbol shuffling. |
| 5. Real-World Anchor | Contextual binding, episodic memory, transfer | Hippocampus, medial temporal lobe | Concrete scenarios (money, game scores, recipes) create multiple retrieval cues. When a student later sees `x + 5 = 12` in a textbook, they can retrieve the balance scale, the shopping scenario, or the game score context -- whichever pathway is strongest. |
| 6. Practice | Retrieval practice, error-driven learning, procedural fluency | Basal ganglia (procedural), PFC (monitoring) | Spaced retrieval across three layers (recall, procedure, understanding) forces the student to reconstruct the inverse-operation procedure from memory. Interleaving addition and multiplication equations prevents the brain from settling into a single strategy. |
| 7. Reflection | Metacognition, consolidation, self-explanation | PFC (self-monitoring), default mode network | Explaining WHY the inverse operation works -- not just HOW to do it -- forces the brain to organize fragmented procedural knowledge into a coherent conceptual narrative. 2-3x retention boost. |

### 2.2 Embodied Cognition: Why the Balance Scale Works

The balance scale metaphor leverages embodied cognition through three mechanisms:

1. **Conservation intuition**: Humans have an innate sense of balance from early childhood. The vestibular system (inner ear) gives us a deep, pre-verbal understanding that equal weight on both sides = equilibrium. Mapping this onto equations exploits circuitry the student has used since they first stood up.

2. **Action-consequence pairing**: When the student removes a block from one side and the scale tilts, premotor cortex activation creates a strong "don't do that" memory trace. When they remove equal amounts from both sides and the scale stays level, the reward signal reinforces the correct procedure. This motor-cortex learning is faster and more durable than verbal instruction.

3. **Visible conservation**: In symbolic algebra, the fact that `x + 5 - 5 = 12 - 5` preserves equality is abstract. On a balance scale, it is VISIBLE -- the scale stays level. This transforms an abstract axiom (the subtraction property of equality) into a perceptual experience.

### 2.3 Dual Spatial Model: Balance Scale + Function Machine in Reverse

This lesson uses TWO complementary spatial models:

| Model | What It Teaches | Neural Basis |
|-------|----------------|-------------|
| **Balance scale** (primary) | Equation = balance. Operating on both sides preserves equality. | IPS spatial magnitude, conservation circuits |
| **Function machine in reverse** (secondary) | Solving = undoing. The inverse operation "unwraps" the variable. | PFC sequential reasoning, motor cortex reverse planning |

Both models converge on the same procedure (apply the inverse operation) but from different angles:
- The balance scale answers: "What must I do to BOTH sides to keep them equal?"
- The function machine answers: "What was done to x, and how do I UNDO it?"

Dual coding through two complementary models creates stronger and more flexible understanding (Paivio, 1986).

### 2.4 Emotional Arc

```
Stage 1:    CURIOSITY       "Someone hid a number... can I find it?"
            |                (dopamine spike from mystery)
Stage 2a:   ENGAGEMENT      "This balance scale is cool -- I can add/remove blocks"
            |                (sustained dopamine from interactive play)
Stage 2b:   MILD SURPRISE   "The function machine runs BACKWARDS?"
            |                (novelty detection -- reverse is unexpected)
Stage 3a:   OBSERVATION     "When I take the same from both sides, it stays balanced"
            |
Stage 3b:   PRODUCTIVE      "But which operation do I use? Add? Subtract?"
            STRUGGLE         (ACC activation -- the learning moment)
            |
Stage 3c:   BREAKTHROUGH    "The INVERSE! Undo the + with -, undo the x with /!"
            |                (aha moment -- dopamine burst)
Stage 4:    CONFIDENCE      "The symbols match what I already understand"
Stage 5:    RELEVANCE       "Oh, I solve equations when shopping / gaming / cooking"
Stage 6:    MASTERY FLOW    "I can solve these consistently"
Stage 7:    OWNERSHIP       "I can explain WHY we use inverse operations"
```

### 2.5 Prerequisite Neural Foundations

From AL-3.1 (Variables & Expressions), the student arrives with:
- Understanding that a variable represents an unknown or changeable number
- Mental model of the function machine (input -> operations -> output)
- Familiarity with evaluating expressions by substitution
- Understanding of the difference between an expression and an equation

From NO-1.2a/NO-1.2b (Integer Operations), the student arrives with:
- Fluency with addition, subtraction, multiplication, and division of integers
- Number line mental model for integer operations
- Understanding of inverse relationships (addition undoes subtraction, multiplication undoes division)

This lesson connects AL-3.1's function machine (forward direction) with the new concept of running it BACKWARDS to solve equations.

---

## 3. Stage 1: Hook (30-60 seconds)

### Purpose
Activate curiosity by presenting a "disguised number" mystery. A number is hidden inside a box, wrapped with an operation. The student watches the wrapping happen, then sees it UNWRAPPED -- revealing the hidden number. This creates the information gap the brain craves: "How did they find it?"

### Animation Design

**Canvas**: Full viewport width, centered vertically. Background: dark (`#0f172a`, Tailwind `slate-900`). No grid, no axes -- clean stage.

**Sequence**:

#### Phase 1: The Disguise (0s - 3.5s)

1. **0.0s**: Text appears at the top of the viewport, typewriter-style (one character per 40ms):
   - "Someone hid a number..."
   - Font: System sans (Inter preferred), `clamp(20px, 5vw, 32px)`, white (`#f8fafc`), italic
   - Fade-in per character: `opacity: 0 -> 1`, stagger 40ms
   - Position: centered horizontally, top 20% of viewport

2. **1.2s**: A glowing number `7` appears at center of viewport:
   - Font: `clamp(48px, 10vw, 72px)`, `#a78bfa` (purple), font-weight 700
   - Entry: `scale: 0 -> 1.2 -> 1`, `opacity: 0 -> 1`, 0.5s, `spring({ damping: 15, stiffness: 400 })`
   - Subtle glow: `text-shadow: 0 0 20px #8b5cf640`

3. **2.0s**: A translucent box slides over the number `7`, hiding it:
   - Shape: rounded rectangle, 80px x 80px, `border-radius: 16px`
   - Fill: `#8b5cf620` (purple, 12% opacity)
   - Border: 2px solid `#8b5cf6`
   - Slides in from the right: `translateX: 120px -> 0`, 0.5s, `ease: "easeInOut"`
   - The `7` fades to invisible behind the box: `opacity: 1 -> 0`, 0.3s (starts at t=2.2s)
   - A `?` appears inside the box: purple, 48px, font-weight 700, `opacity: 0 -> 1`, 0.2s
   - Pulsing glow on box: `box-shadow: 0 0 20px #8b5cf640`, pulsing between 20px and 30px, 1.5s loop

4. **2.8s**: A `+ 5` badge slides in and attaches to the right side of the box:
   - Badge: rounded rectangle, 56px x 40px, `border-radius: 10px`
   - Fill: `#f59e0b20` (amber 12%), border: 2px solid `#f59e0b`
   - Text: `+ 5` in amber, font-size 24px, font-weight 700
   - Entry: `translateX: 60px -> 0`, `opacity: 0 -> 1`, 0.4s, `spring({ damping: 20, stiffness: 300 })`
   - A small chain/link icon connects the badge to the box (SVG, 12px, `#94a3b8`)

5. **3.2s**: An `= 12` appears to the right of the badge:
   - Text: `= 12`, font-size `clamp(32px, 7vw, 48px)`, `#34d399` (emerald), font-weight 700
   - Entry: `opacity: 0 -> 1`, `translateX: 20px -> 0`, 0.3s, `ease: "easeOut"`
   - The complete equation reads: `[?] + 5 = 12`

#### Phase 2: The Undoing (3.5s - 6.5s)

6. **3.8s**: Text appears below the equation:
   - "The +5 is a disguise. Let's remove it."
   - Font: 16px, `#e2e8f0`, italic
   - `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s

7. **4.5s**: Two identical `- 5` badges materialize -- one below the left side, one below the right side:
   - Each badge: rounded rectangle, 56px x 40px, `border-radius: 10px`
   - Fill: `#22d3ee20` (cyan 12%), border: 2px solid `#22d3ee`
   - Text: `- 5` in cyan, font-size 24px, font-weight 700
   - Entry: `scale: 0 -> 1.1 -> 1`, 0.4s, `spring({ damping: 15, stiffness: 400 })`
   - The two badges appear simultaneously with a brief line connecting them (dashed, `#22d3ee40`, indicating "same operation, both sides")
   - A small label between them: "both sides!" in cyan, 12px, italic

8. **5.2s**: The `+ 5` and left `- 5` cancel each other:
   - Both badges slide toward each other and overlap
   - On contact: a small burst of particles (6 circles, amber and cyan, spreading radially, fading over 0.5s)
   - Both badges `scale: 1 -> 0`, `opacity: 1 -> 0`, 0.3s
   - The chain link connecting `+ 5` to the mystery box also disappears

9. **5.5s**: The right `- 5` modifies the `12`:
   - The `- 5` badge slides up toward the `12`
   - A brief calculation label appears: `12 - 5 = 7` in `#e2e8f0`, 14px, 0.5s visible
   - The `12` morphs into `7`: the `12` fades out (0.2s), `7` fades in (0.2s) at the same position
   - The `7` is now emerald (`#34d399`), font-weight 700

10. **6.0s**: The mystery box opens to reveal the answer:
    - The box border brightens: `#8b5cf6` -> `#a78bfa`, 0.3s
    - The `?` shakes (horizontal wiggle: `translateX: -3px -> 3px`, 3 oscillations, 0.3s)
    - The `?` morphs into `7`: `?` fades out (0.2s), `7` fades in (0.2s) in purple
    - A burst of particles: 12 small circles in purple/emerald, spreading radially, fading over 0.8s
    - The equation now reads: `7 + 5 = 12` with the `7` glowing

#### Phase 3: The Tagline (6.5s - 8.0s)

11. **6.8s**: Summary text fades in below:
    - "To find the hidden number, UNDO the operation."
    - Font: 18px, `#f8fafc`, font-weight 600
    - "UNDO" is in cyan (`#22d3ee`), uppercase, with `text-shadow: 0 0 8px #22d3ee40`
    - `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s

12. **7.5s**: Continue button fades in below:
    - Text: "Continue" (i18n key: `lesson.continue`)
    - Style: filled button, primary color (`#8b5cf6`), white text
    - Size: `min-width: 160px`, `height: 48px`
    - Animation: `opacity: 0 -> 1`, 0.5s, `ease: "easeOut"`
    - Hover: `background: #7c3aed`
    - Active: `scale: 0.97`, 0.1s

### Accessibility (Stage 1)
- `aria-live="polite"` region announces: "Someone hid a number. The hidden number plus 5 equals 12. To find it, subtract 5 from both sides. The hidden number is 7."
- All animated elements have `prefers-reduced-motion` fallback: show final state immediately with simple fade-in (0.5s total instead of 8s)
- Mystery box, badges, and result are SVG elements with text labels for screen reader access
- Badges have `aria-label`: "Operation: plus 5", "Inverse operation: minus 5"

### MathScene DSL (Hook Animation)

```json
{
  "id": "AL-3.2-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 800, 500],
  "background": "#0f172a",
  "objects": [
    {
      "type": "annotation", "id": "hook-title",
      "position": [400, 60], "text": "Someone hid a number...",
      "style": { "fontSize": 28, "fill": "#f8fafc", "fontStyle": "italic", "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "annotation", "id": "hidden-number",
      "position": [280, 250], "text": "7",
      "style": { "fontSize": 64, "fill": "#a78bfa", "fontWeight": 700, "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "group", "id": "mystery-box",
      "children": [
        {
          "type": "geometricShape", "id": "box-rect",
          "shape": "rectangle", "center": [280, 250], "width": 80, "height": 80,
          "style": { "fill": "#8b5cf620", "stroke": "#8b5cf6", "strokeWidth": 2, "rx": 16 }
        },
        {
          "type": "annotation", "id": "box-question",
          "position": [280, 250], "text": "?",
          "style": { "fontSize": 48, "fill": "#8b5cf6", "fontWeight": 700, "textAnchor": "middle" }
        },
        {
          "type": "annotation", "id": "box-reveal",
          "position": [280, 250], "text": "7",
          "style": { "fontSize": 48, "fill": "#a78bfa", "fontWeight": 700, "textAnchor": "middle" },
          "visible": false
        }
      ],
      "visible": false
    },
    {
      "type": "group", "id": "plus-5-badge",
      "children": [
        {
          "type": "geometricShape", "id": "plus5-rect",
          "shape": "rectangle", "center": [380, 250], "width": 56, "height": 40,
          "style": { "fill": "#f59e0b20", "stroke": "#f59e0b", "strokeWidth": 2, "rx": 10 }
        },
        {
          "type": "annotation", "id": "plus5-text",
          "position": [380, 250], "text": "+ 5",
          "style": { "fontSize": 24, "fill": "#f59e0b", "fontWeight": 700, "textAnchor": "middle" }
        }
      ],
      "visible": false
    },
    {
      "type": "annotation", "id": "equals-12",
      "position": [490, 250], "text": "= 12",
      "style": { "fontSize": 40, "fill": "#34d399", "fontWeight": 700, "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "annotation", "id": "undo-text",
      "position": [400, 380], "text": "The +5 is a disguise. Let's remove it.",
      "style": { "fontSize": 16, "fill": "#e2e8f0", "fontStyle": "italic", "textAnchor": "middle" },
      "visible": false
    },
    {
      "type": "annotation", "id": "tagline",
      "position": [400, 440], "text": "To find the hidden number, UNDO the operation.",
      "style": { "fontSize": 18, "fill": "#f8fafc", "fontWeight": 600, "textAnchor": "middle" },
      "visible": false
    }
  ],
  "animations": [
    {
      "id": "hook-sequence",
      "trigger": "auto",
      "steps": [
        { "action": "fadeIn", "target": "hook-title", "duration": 0.8, "ease": "easeOut" },
        { "action": "wait", "duration": 0.4 },
        { "action": "fadeIn", "target": "hidden-number", "duration": 0.5, "from": "scale" },
        { "action": "wait", "duration": 0.8 },
        { "action": "fadeIn", "target": "mystery-box", "duration": 0.5, "from": "right" },
        { "action": "fadeOut", "target": "hidden-number", "duration": 0.3 },
        { "action": "wait", "duration": 0.3 },
        { "action": "fadeIn", "target": "plus-5-badge", "duration": 0.4, "from": "right" },
        { "action": "wait", "duration": 0.2 },
        { "action": "fadeIn", "target": "equals-12", "duration": 0.3, "from": "right" },
        { "action": "wait", "duration": 0.4 },
        { "action": "fadeIn", "target": "undo-text", "duration": 0.4, "from": "bottom" },
        { "action": "wait", "duration": 0.7 },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeOut", "target": "plus-5-badge", "duration": 0.3 },
            { "action": "morph", "target": "equals-12", "to": "= 7", "duration": 0.3 }
          ]
        },
        { "action": "wait", "duration": 0.3 },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeOut", "target": "box-question", "duration": 0.2 },
            { "action": "fadeIn", "target": "box-reveal", "duration": 0.2 }
          ]
        },
        { "action": "wait", "duration": 0.5 },
        { "action": "fadeIn", "target": "tagline", "duration": 0.4, "from": "bottom" }
      ]
    }
  ],
  "interactions": []
}
```

---

## 4. Stage 2: Spatial Experience (2-4 minutes)

**Minimum interactions to continue**: 10 distinct balance operations or function-machine reversals.

This stage provides TWO interactive models accessible via tabs (mobile) or side-by-side panels (desktop). The student must engage with BOTH models before proceeding. Minimum: 6 interactions on the balance scale + 4 on the reverse function machine (or any split totaling 10 with at least 3 on each model).

### 4.1 Model A: Balance Scale Simulator (Primary)

#### Layout

**Mobile** (< 768px): Single column, stacked vertically.
- Top: Equation display (sticky, 56px tall)
- Middle: Balance scale viewport (flex-grow, min-height 300px)
- Bottom: Control panel (fixed, 140px tall)

**Tablet+** (>= 768px): Two-panel.
- Left panel (60% width): Balance scale viewport
- Right panel (40% width): Equation log + controls

#### Balance Scale Visual

```
                  ┌────┐
                  │ == │  <- fulcrum indicator (level = balanced)
              ════╪════╪════
             /    │    │    \
        ┌────┐    │    │    ┌────┐
        │LEFT│    │    │    │RGHT│
        │PAN │    │    │    │PAN │
        └────┘    │    │    └────┘
                  │    │
              ════╧════╧════
```

**Scale structure** (SVG):
- Fulcrum: isosceles triangle at center-bottom, 40px base x 60px tall, fill `#475569`, stroke `#64748b`, 2px
- Beam: horizontal bar, 320px wide, 8px tall, `border-radius: 4px`, fill `#64748b`, centered on fulcrum tip
- Left pan: rounded rectangle, 120px x 24px, `border-radius: 6px`, fill `#334155`, stroke `#475569`, hanging from left end of beam by two 2px lines (30px long)
- Right pan: identical to left pan, hanging from right end of beam
- Balance indicator: small level icon at the fulcrum tip. When balanced: `#34d399` (green). When tilted: `#f87171` (red)

**Tilt behavior**:
- When left side has more weight (value): beam rotates clockwise by `min(angle, 15deg)`, where `angle = (leftValue - rightValue) * 2deg`
- When right side has more weight: beam rotates counterclockwise
- When balanced: beam is perfectly horizontal (0deg rotation)
- Tilt animation: `spring({ damping: 12, stiffness: 200 })` for satisfying wobble
- Pans swing slightly in the opposite direction of beam rotation (pendulum effect), `spring({ damping: 18, stiffness: 250 })`

**Block types**:
- **Unit blocks** (value = 1): squares, 28px x 28px, `border-radius: 4px`, fill `#60a5fa` (blue), stroke `#3b82f6`, labeled "1" in white 14px
- **Mystery box** (represents x): rounded rectangle, 36px x 36px, `border-radius: 8px`, fill `#8b5cf620`, stroke `#8b5cf6`, 2px, labeled `?` in purple 20px. Pulsing glow: `box-shadow: 0 0 12px #8b5cf640`, 1.5s loop
- Blocks stack vertically on their pan, with 2px gaps between them
- Maximum 10 blocks per pan (sufficient for all scenarios in this lesson)

#### Initial Scenarios

The balance scale loads with a pre-set equation. Three scenarios are available, cycled via a "New Equation" button:

| Scenario | Equation | Left Pan | Right Pan | Solution |
|----------|----------|----------|-----------|----------|
| 1 (default) | `x + 3 = 7` | 1 mystery box + 3 unit blocks | 7 unit blocks | x = 4 |
| 2 | `x + 5 = 9` | 1 mystery box + 5 unit blocks | 9 unit blocks | x = 4 |
| 3 | `x + 2 = 8` | 1 mystery box + 2 unit blocks | 8 unit blocks | x = 6 |

#### Interactions

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap a unit block on the left pan | Tap/click | Block highlights with amber border (selected state, `border: 2px solid #fbbf24`) | `selectedBlock = { side: "left", index }` |
| Tap a unit block on the right pan | Tap/click | Same highlight | `selectedBlock = { side: "right", index }` |
| Tap "Remove from Both" button (visible when a block is selected) | Tap/click | One block is removed from each pan simultaneously. Both blocks `scale: 1 -> 0`, `opacity: 1 -> 0`, 0.3s. The scale rebalances with spring animation. | `leftValue -= 1`, `rightValue -= 1` |
| Tap "Add to Both" button | Tap/click | One block materializes on each pan simultaneously. Blocks `scale: 0 -> 1.1 -> 1`, 0.3s. Scale rebalances. | `leftValue += 1`, `rightValue += 1` |
| Attempt to remove from only one side | Tap block, then tap "Remove" (single side) | The scale TILTS dramatically. A red flash on the beam. A speech bubble appears from the fulcrum: "Not fair! Remove from BOTH sides!" (i18n key: `lesson.oneStepEquations.stage2.unfairWarning`). The removed block snaps back after 1s. | State reverts, `unfairAttempts += 1` |
| Solve the equation (only mystery box remains on left) | Automatic detection | The mystery box's `?` morphs into the solution number. Celebration particles burst from the box. A green checkmark appears. The equation display updates to show the solved form. | `solved = true`, equation log entry added |
| Tap "New Equation" button | Tap/click | Scale fades out (0.3s), new configuration fades in (0.3s) | Loads next scenario |

#### Control Panel

```
┌─────────────────────────────────────┐
│  [- Remove from Both]  [+ Add to Both]  │
│                                     │
│  [Remove Left Only]  [Remove Right Only] │  <- these cause the "unfair" warning
│                                     │
│  [New Equation]                     │
└─────────────────────────────────────┘
```

- "Remove from Both" and "Add to Both" buttons: 48px height, full width (split 50/50), `border-radius: 12px`, primary style (`#8b5cf6` fill, white text)
- "Remove Left Only" and "Remove Right Only" buttons: 44px height, `border-radius: 10px`, outline style (`border: 1px solid #475569`, `color: #94a3b8`). These exist deliberately to let students TRY the wrong approach and learn from the tilt feedback.
- "New Equation" button: 44px height, ghost style (`color: #94a3b8`, underline on hover)
- All buttons: `min-width: 44px`, `min-height: 44px`

#### Equation Display

Positioned above the scale (sticky on mobile):
- Background: `#1e293b`, `border-radius: 12px`, padding `12px 20px`
- Shows the current equation state in real time, e.g., `x + 3 = 7`
- As blocks are removed: equation updates, e.g., `x + 2 = 6` -> `x + 1 = 5` -> `x = 4`
- Font: mono, `clamp(20px, 5vw, 32px)`, `tabular-nums`
- Colors: `x` in purple (`#a78bfa`), numbers in white, `+` and `=` in `#94a3b8`
- Transitions: old values fade out (150ms), new values fade in (200ms) with slight upward slide (4px)

### 4.2 Model B: Function Machine in Reverse (Secondary)

#### Concept

This model reuses the function machine from AL-3.1 but shows it running BACKWARDS. Instead of "input -> operation -> output," the student sees "output -> INVERSE operation -> input." This teaches the "unwrapping" metaphor for solving equations.

#### Layout

**Mobile**: Same stacked layout as Model A, accessible via tab switch at the top ("Balance Scale" | "Reverse Machine").
**Tablet+**: Appears as a second panel that can be expanded from a collapsed sidebar.

#### Machine Visual

The machine from AL-3.1 is reused but INVERTED (rendered upside-down or with reversed arrow direction):

```
┌──────────────────────────────┐
│  ┌──── KNOWN OUTPUT ────┐    │  <- the equation's right side value
│  │       [12]            │    │
│  └───────────────────────┘   │
│         ▼                    │
│  ┌─────────────────────┐     │
│  │  INVERSE OPERATION   │     │  <- e.g., "- 5" (the undo of "+ 5")
│  │    (subtract 5)      │     │
│  └─────────────────────┘     │
│         ▼                    │
│  ┌──── UNKNOWN INPUT ───┐    │  <- the solution
│  │       [?]             │    │
│  └───────────────────────┘   │
└──────────────────────────────┘
```

- Machine frame: same as AL-3.1 machine (`#1e293b`, rounded rectangle, `border-radius: 20px`)
- Output slot (top): rounded rectangle, fill `#34d39920`, stroke `#34d399`, 2px. The known value is displayed in emerald, 32px
- Inverse operation box: rounded rectangle (200px x 80px), fill `#22d3ee15`, stroke `#22d3ee`. A gear icon that rotates COUNTERCLOCKWISE (opposite to the forward machine). Label: the inverse operation in cyan, 24px
- Input slot (bottom): rounded rectangle, fill `#8b5cf620`, stroke `#8b5cf6`. Shows `?` initially, then the solution

#### Interaction

The student selects an equation from a dropdown or cycles through preset equations:

| Preset | Equation | Forward Operation | Inverse Operation | Solution |
|--------|----------|-------------------|-------------------|----------|
| 1 | `x + 5 = 12` | `+ 5` | `- 5` | 7 |
| 2 | `x - 3 = 4` | `- 3` | `+ 3` | 7 |
| 3 | `2x = 10` | `x 2` | `/ 2` | 5 |
| 4 | `x + 8 = 15` | `+ 8` | `- 8` | 7 |

When the student taps "Run Machine":

1. **0.0s**: The known output value (e.g., `12`) appears at the top slot
2. **0.5s**: A label appears next to the machine: "The equation says `? + 5 = 12`. The machine ADDED 5. So we SUBTRACT 5." (i18n key: `lesson.oneStepEquations.stage2.reverseExplain`)
   - "ADDED" in amber, "SUBTRACT" in cyan
3. **1.0s**: The number slides down through the inverse gear. The gear spins counterclockwise.
4. **1.5s**: At the gear: a calculation label appears: `12 - 5 = 7` in cyan, 14px, 0.5s visible
5. **2.0s**: The result `7` drops into the input slot. The `?` morphs into `7` (purple, with particle burst)
6. **2.5s**: A verification bar appears below the machine:
   - "Check: `7 + 5 = 12`" with a green checkmark
   - The forward machine briefly animates in miniature (40% scale, to the right): `7` goes through `+ 5` -> `12`

#### Interaction Requirements

| Requirement | Details |
|-------------|---------|
| MIN_INTERACTIONS | 10 total: at least 6 balance scale operations + at least 3 reverse machine runs + at least 1 successful "unfair" attempt (trying to remove from one side) |
| Interaction tracking | Every block addition/removal counts. Every machine run counts. Every "unfair" attempt counts. |
| Continue button | Fades in only after MIN_INTERACTIONS reached AND at least one equation has been fully solved on the balance scale AND at least one reverse machine equation has been run |
| Continue button style | Same as Hook stage continue button |
| Max time without interaction | If 30 seconds pass without interaction, AI tutor avatar peeks in: "Try removing blocks from BOTH sides of the scale at the same time! What happens?" (i18n key: `lesson.oneStepEquations.stage2.hint`) |

### State Management

```typescript
interface BalanceScaleState {
  currentScenario: number; // 0, 1, or 2
  leftBlocks: Array<{ type: "unit" | "mystery"; value: number }>;
  rightBlocks: Array<{ type: "unit"; value: number }>;
  selectedBlock: { side: "left" | "right"; index: number } | null;
  isTilted: boolean;
  tiltAngle: number; // degrees
  solved: boolean;
  unfairAttempts: number;
  operationLog: Array<{ action: string; leftDelta: number; rightDelta: number }>;
}

interface ReverseMachineState {
  currentPreset: number; // 0-3
  isProcessing: boolean;
  revealed: boolean;
  machineRuns: number;
}

interface Stage2State {
  balanceScale: BalanceScaleState;
  reverseMachine: ReverseMachineState;
  totalInteractions: number;
  balanceInteractions: number;
  machineInteractions: number;
  hasTriedUnfair: boolean;
  hasSolvedBalance: boolean;
  hasSolvedMachine: boolean;
  activeTab: "balance" | "machine"; // mobile only
}
```

### Constraints & Edge Cases

| Scenario | Behavior |
|----------|----------|
| Attempt to remove the mystery box from the left pan | Shake animation on the mystery box, brief tooltip: "The mystery box stays! We remove the number blocks to isolate it." (i18n key: `lesson.oneStepEquations.stage2.cantRemoveMystery`) |
| Remove all unit blocks from left, mystery box remains alone | Automatic solve trigger: the mystery box reveals its value, matching the remaining right-side value |
| Right side reaches 0 or negative | The scale allows this -- it teaches that x can be 0 or negative. Right pan shows "0" label or negative number. The mystery box reveals accordingly. |
| Rapid clicking on "Remove from Both" | Debounce at 300ms between removals. Each removal animation completes before the next begins. Queue max: 1 pending removal. |
| Desktop vs mobile | Desktop: both models visible side-by-side. Mobile: tab switcher at top ("Balance Scale" | "Reverse Machine") with swipe gesture between tabs. |
| Student only interacts with one model | Continue button requires at least 3 interactions on EACH model. A subtle prompt appears after 8+ interactions on a single model: "Try the other model too!" with a pulsing tab indicator. |

### Accessibility (Stage 2)

- Balance scale tilt is announced via `aria-live="polite"`: "Scale tilted left -- left side is heavier" or "Scale balanced -- both sides are equal"
- Block operations announced: "Removed one block from both sides. Left side now has mystery box plus 2 blocks. Right side now has 5 blocks."
- Mystery box has `aria-label`: "Unknown value x"
- "Remove from Both" button has `aria-label`: "Remove one block from each side of the scale"
- All buttons have `role="button"` and respond to Enter/Space
- Tab switching via keyboard: Tab to tab bar, arrow keys to switch, Enter to select
- Reverse machine operations announced: "Running machine: 12 minus 5 equals 7. The unknown value is 7."
- The "unfair" warning is announced via `aria-live="assertive"`: "Cannot remove from only one side. Both sides must stay equal."

---

## 5. Stage 3: Guided Discovery (3-5 minutes)

### Purpose
Through guided observation, lead the student to the core insights: (1) solving means isolating x, (2) you "undo" the operation by applying its inverse, (3) you MUST do the same thing to BOTH sides, and (4) the systematic inverse-operation approach works for ANY equation, unlike guessing.

### Layout
Full viewport. Dark background (`#0f172a`). Content centered, max-width 640px.

### Sequence

The stage consists of 5 sequential prompts. Each prompt must be acknowledged before the next appears.

#### Prompt 1: The Balance Principle (display + animation, requires acknowledgment)

**Visual**: A miniature balance scale (60% size) with the equation `x + 4 = 9` is displayed. The scale is balanced.

**Animation**:
1. **0.0s**: Scale shows balanced state: left pan has mystery box + 4 unit blocks, right pan has 9 unit blocks. Equation `x + 4 = 9` displayed above in color-coded text.
2. **1.0s**: 2 blocks are removed from ONLY the left side. The scale tilts dramatically to the right. The equation above shows `x + 2 ≠ 9` with the `=` crossed out and replaced by `≠` in red.
3. **2.5s**: The blocks snap back (revert). Scale re-balances. Equation returns to `x + 4 = 9`.
4. **3.5s**: 2 blocks are removed from BOTH sides simultaneously. Both blocks fade out with matching cyan glow. The scale stays balanced. Equation updates to `x + 2 = 7`.
5. **4.5s**: Remaining 2 blocks removed from both sides. Scale stays balanced. Equation: `x = 5`.
6. **5.0s**: Mystery box opens: `x = 5`. Green checkmark. Subtle particle burst.

**Text card** below the animation:
- "Watch carefully: when we remove the SAME amount from BOTH sides, the scale stays balanced. That's the secret -- whatever you do to one side, do the SAME to the other."
- "SAME amount" in cyan (`#22d3ee`), bold
- "BOTH sides" in amber (`#f59e0b`), bold
- Font: 16px, `#e2e8f0`, line-height 1.6
- i18n key: `lesson.oneStepEquations.stage3.prompt1`

**Acknowledgment**: "I see it!" button (primary style).

#### Prompt 2: The Inverse Operation (animated, requires acknowledgment)

**Visual**: Two side-by-side panels showing "Forward" and "Backward":

**Panel A** (left, "Forward"):
- Header: "Building the equation" in a pill badge (amber background)
- Animation: Start with `x = 7` (mystery box alone). Then `+ 5` slides in and attaches. Value updates: left becomes `x + 5`, right becomes `12`. The equation `x + 5 = 12` is formed.
- Arrow direction: left to right
- Background: `#1e293b`, border-top: 3px solid `#f59e0b`

**Panel B** (right, "Backward"):
- Header: "Solving the equation" in a pill badge (cyan background)
- Animation: Start with `x + 5 = 12`. Then `- 5` is applied to both sides. The `+ 5` cancels out on the left. The right becomes `7`. The equation `x = 7` is revealed.
- Arrow direction: right to left
- Background: `#1e293b`, border-top: 3px solid `#22d3ee`

Both panels enter with `translateY: 24px -> 0`, `opacity: 0 -> 1`, 0.4s, stagger 0.2s. Animations in both panels play simultaneously after a 1s delay.

**Text card** below:
- "Building an equation means DOING operations to x. Solving means UNDOING them. Addition and subtraction are opposites. Multiplication and division are opposites. The opposite is called the **inverse operation**."
- "DOING" in amber, "UNDOING" in cyan, "inverse operation" has a background highlight: `#22d3ee20`, `border-radius: 4px`, `padding: 2px 8px`
- i18n key: `lesson.oneStepEquations.stage3.prompt2`

**Acknowledgment**: "Got it!" button.

#### Prompt 3: The Four Cases (interactive, requires acknowledgment)

**Visual**: A 2x2 grid of equation cards. Each card shows an equation, its inverse operation, and the solution. Cards are initially face-down (showing the equation only) and flip on tap.

| Card | Equation | Operation Done to x | Inverse to Apply | Solution |
|------|----------|---------------------|-----------------|----------|
| A | `x + 6 = 10` | Added 6 | Subtract 6 from both sides | x = 4 |
| B | `x - 3 = 5` | Subtracted 3 | Add 3 to both sides | x = 8 |
| C | `4x = 20` | Multiplied by 4 | Divide both sides by 4 | x = 5 |
| D | `x / 2 = 6` | Divided by 2 | Multiply both sides by 2 | x = 12 |

**Card styling**:
- Each card: `width: 48%`, `aspect-ratio: 4/3`, `border-radius: 12px`
- Front (face-down): `background: #334155`, equation displayed in white 20px font, border `1px solid #475569`
- Back (flipped): `background: #1e293b`, border-left 4px solid color (A: emerald, B: amber, C: cyan, D: purple)
- Flip animation: 3D `rotateY: 0 -> 180deg`, 0.5s, `ease: "easeInOut"`, with perspective 800px
- Back content:
  - Equation at top (16px, white)
  - "Operation: [+6]" in amber (14px)
  - Arrow labeled "Inverse"
  - "Undo: [-6] both sides" in cyan (14px)
  - Solution at bottom: `x = 4` in emerald, 20px, bold

**Text card** below (appears after all 4 cards are flipped):
- "See the pattern? Whatever was DONE to x, do the OPPOSITE to both sides. That's how you isolate x and solve the equation."
- "DONE" in amber, "OPPOSITE" in cyan
- i18n key: `lesson.oneStepEquations.stage3.prompt3`

**Acknowledgment**: Continue button appears only after all 4 cards have been flipped.

#### Prompt 4: Why Not Just Guess? (requires acknowledgment)

**Visual**: Two side-by-side approaches to solving `x + 47 = 83`:

**Approach A** (left, "Guessing"):
- Header: "Guess and Check" in a pill badge (rose/red background)
- Content: A sequence of guesses:
  - "Try x = 20? ... 20 + 47 = 67. Too low."
  - "Try x = 40? ... 40 + 47 = 87. Too high."
  - "Try x = 35? ... 35 + 47 = 82. Close..."
  - "Try x = 36? ... 36 + 47 = 83. Got it!"
  - Each guess fades in with 0.3s stagger. Wrong guesses have red `X` marks. The correct guess has a green checkmark.
- Below: "4 tries. Works... but slow."
- Background: `#1e293b`, border-top: 3px solid `#f87171`

**Approach B** (right, "Inverse Operation"):
- Header: "Inverse Operation" in a pill badge (emerald background)
- Content: A single clean step:
  - `x + 47 = 83`
  - `x + 47 - 47 = 83 - 47` (the `- 47` appears on both sides in cyan)
  - `x = 36` (emerald, bold, checkmark)
- Below: "1 step. Works EVERY time."
- Background: `#1e293b`, border-top: 3px solid `#34d399`

**Text card** below:
- "Guessing might work for easy numbers, but what about `x + 2.7 = 9.13` or `47x = 1,551`? The inverse operation method works for ANY equation, no matter how big or messy the numbers are."
- This directly addresses Misconception #2 (guessing vs systematic)
- i18n key: `lesson.oneStepEquations.stage3.prompt4`

**Acknowledgment**: "Got it!" button.

#### Prompt 5: The Key Insight (requires acknowledgment)

**Visual**: An insight card with special styling:
- Background: `#7c3aed20` (purple tint)
- Border-left: 4px solid `#a78bfa`
- Padding: 20px
- `border-radius: 0 12px 12px 0`

**Content**:
- Header icon: lightbulb SVG (amber, 24px) with glow animation
- Text: "Solving an equation means **isolating x** -- getting x alone on one side. You do this by applying the **inverse operation** to **both sides**. If x was added to, subtract. If x was multiplied by, divide. Always do the same thing to both sides to keep the equation balanced."
- "isolating x" has purple highlight (`#8b5cf620`)
- "inverse operation" has cyan highlight (`#22d3ee20`)
- "both sides" has amber highlight (`#f59e0b20`)
- Font: 18px, `#f8fafc`, line-height 1.7, font-weight 500
- i18n key: `lesson.oneStepEquations.stage3.keyInsight`

**Below the insight card**: A mini interactive demo:
- A small equation builder with a dropdown to select the operation type:
  - Options: `x + __ = __`, `x - __ = __`, `__ * x = __`, `x / __ = __`
- Two number inputs (the blank values), range 1-20
- A "Solve" button that animates the inverse operation step-by-step
- The student can try different equations and watch the systematic solution each time
- This reinforces that the method is universal

**Acknowledgment**: Continue button appears after the student has solved at least 1 equation in the mini demo (or after 15 seconds if they haven't interacted).

### Accessibility (Stage 3)
- All prompt text is in screen-reader-accessible containers
- The flip cards have `role="button"` and `aria-label`: "Equation card: x plus 6 equals 10. Tap to reveal the solution method."
- After flip: `aria-live="polite"` announces: "Operation: added 6. Inverse: subtract 6 from both sides. Solution: x equals 4."
- Side-by-side panels are in an `aria-labelledby` group
- Keyboard: all cards respond to Enter/Space for flip; all buttons Tab-accessible
- The mini interactive demo has `aria-label` descriptions for dropdowns and inputs

---

## 6. Stage 4: Symbol Bridge (2-3 minutes)

### Purpose
Overlay formal algebraic notation for solving one-step equations onto the balance scale model. The student sees each algebraic step synchronized with a physical manipulation on the scale. Key terminology introduced: inverse operation, isolate, solution, verify/check.

### Layout
Full viewport. Dark background (`#0f172a`). A miniature balance scale (50% scale) at the top. Algebraic notation builds step-by-step below the scale.

### Visual Baseline

Show the balance scale with the equation `x + 5 = 12`:
- Left pan: mystery box + 5 unit blocks
- Right pan: 12 unit blocks (displayed as a stack with "12" label for space efficiency)
- Scale is balanced
- Below the scale: the equation `x + 5 = 12` in large font: `clamp(28px, 6vw, 44px)`, centered

### Animation Sequence

Each step appears with a 2s delay between steps, allowing absorption.

#### Step 1 (0.0s - 2.5s): Identify the Operation

- A bracket appears under the `+ 5` in `x + 5 = 12`:
  - Bracket color: amber (`#f59e0b`)
  - Width: matches the `+ 5` characters
  - Draw animation: center-out, 0.3s
- Below the bracket, the label fades in:
  - Text: "**The operation**: something was ADDED to x"
  - Amber, 16px
  - `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s
- On the scale: the 5 unit blocks on the left pan pulse with amber glow (0.5s), indicating "these are what was added"
- A dotted amber line connects the `+ 5` in the notation to the 5 blocks on the scale

#### Step 2 (2.5s - 5.0s): Determine the Inverse

- Below Step 1's annotation, a new line appears:
  - Text: "**The inverse**: to undo +5, we **subtract 5**"
  - "subtract 5" in cyan (`#22d3ee`), bold
  - Cyan, 16px
  - Same fade animation
- An arrow appears from the amber annotation to the cyan annotation, labeled "opposite" in `#94a3b8`, 12px, italic
- On the scale: two cyan `- 5` labels materialize near both pans (one under each), pulsing gently

#### Step 3 (5.0s - 8.0s): Apply to Both Sides

- The algebraic step appears as a new line below the original equation:
  - KaTeX rendered: `x + 5 - 5 = 12 - 5`
  - The `- 5` on the left is cyan, the `- 5` on the right is cyan
  - Connecting bracket spans both `- 5` entries, labeled "same operation, both sides" in cyan, 12px
  - Entry: `opacity: 0 -> 1`, `translateY: 8px -> 0`, 0.4s
- **Simultaneously on the scale**: 5 blocks are removed from EACH pan with staggered animations (1 block per 0.3s, alternating sides: left, right, left, right...). Each block fades out with cyan glow.
- The scale stays balanced throughout. The balance indicator pulses green briefly after each pair is removed.
- The equation display live-updates alongside: `x + 4 = 11` ... `x + 3 = 10` ... `x + 2 = 9` ... `x + 1 = 8` ... `x = 7`

#### Step 4 (8.0s - 10.0s): Simplify

- A new line appears:
  - KaTeX rendered: `x = 7`
  - The `x` is purple, the `7` is emerald, the `=` is white
  - Font size: `clamp(32px, 7vw, 48px)`, font-weight 700
  - Entry: `scale: 0.8 -> 1`, `opacity: 0 -> 1`, 0.5s, `spring({ damping: 20, stiffness: 300 })`
  - Glow: `text-shadow: 0 0 16px #34d39940`
- On the scale: the mystery box opens (border brightens, `?` morphs to `7`, particle burst)
- A label appears: "**Solution**: x equals 7" in emerald, 16px

#### Step 5 (10.0s - 12.5s): Verify

- A verification section appears below, with special styling:
  - Background: `#1e293b`, border-left: 4px solid `#34d399`, `border-radius: 0 12px 12px 0`, padding 16px
  - Header: "Check your answer" in emerald, 14px, uppercase, letter-spacing 1px
  - Step-by-step substitution:
    1. `x + 5 = 12` (original, white)
    2. `7 + 5 = 12` (the `x` morphs into `7` with purple -> emerald color transition, 0.3s)
    3. `12 = 12` (both sides evaluate, green checkmark appears, `scale: 0 -> 1.2 -> 1`, 0.3s)
  - Each step fades in with 0.5s stagger
  - i18n key: `lesson.oneStepEquations.stage4.verify`

### Final Summary Card

Below all annotations, a summary card appears (0.5s after the verification):
- Background: `#1e293b`, `border-radius: 12px`, padding 16px
- Content:

```
Solving One-Step Equations:

1. Identify the operation done to x     (amber)
2. Apply the INVERSE to BOTH sides      (cyan)
3. Simplify to get x = [answer]         (emerald)
4. Check by substituting back           (green checkmark)
```

- Each line is color-coded as indicated
- Entry: each line fades in with 0.3s stagger
- i18n key: `lesson.oneStepEquations.stage4.summary`

### Continue Trigger
All notation revealed + summary card displayed. Continue button fades in 1s after summary.

### Accessibility (Stage 4)
- Each algebraic step is announced via `aria-live="polite"`: "Step 1: x plus 5 equals 12. The operation is: 5 was added to x."
- KaTeX expressions have `aria-label` text alternatives
- The verification section is announced: "Checking: substitute 7 for x. 7 plus 5 equals 12. 12 equals 12. Correct!"
- Summary card is a `<section>` with `aria-label`: "Summary of the four-step method for solving one-step equations"

---

## 7. Stage 5: Real-World Anchor (1-2 minutes)

### Purpose
Connect solving one-step equations to situations from the student's daily life. Each scenario translates a real situation into an equation, showing that "solving for x" is something people do naturally without knowing the formal math.

### Layout
Centered card stack, max-width 640px. Cards are presented in a horizontal carousel (swipeable on mobile) or a 2x2 grid (tablet+).

### Scenarios (4 cards)

#### Card 1: Shopping
- **Icon**: Shopping cart SVG (32px, `#60a5fa`)
- **Scenario**: "You buy a game and a $5 drink. Your total is $47. How much was the game?"
- **Equation**: `x + 5 = 47` (displayed in color-coded KaTeX: `x` purple, `+ 5` amber, `= 47` emerald)
- **Solution hint**: "Subtract 5 from both sides: `x = 42`. The game cost $42."
- **Visual**: Mini balance scale icon (24px) with a tiny animation of blocks being removed
- Background: `#1e293b`, border-top: 3px solid `#60a5fa`
- i18n key: `lesson.oneStepEquations.stage5.card1`

#### Card 2: Gaming
- **Icon**: Game controller SVG (32px, `#a78bfa`)
- **Scenario**: "You scored triple your friend's score: 186 points. What was your friend's score?"
- **Equation**: `3x = 186` (displayed in color-coded KaTeX)
- **Solution hint**: "Divide both sides by 3: `x = 62`. Friend scored 62 points."
- **Visual**: Mini scoreboard showing `186 / 3 = 62`
- Background: `#1e293b`, border-top: 3px solid `#a78bfa`
- i18n key: `lesson.oneStepEquations.stage5.card2`

#### Card 3: Cooking
- **Icon**: Measuring cup SVG (32px, `#f59e0b`)
- **Scenario**: "A recipe needs some flour plus 2 cups of sugar. You use 7 cups total. How much flour?"
- **Equation**: `x + 2 = 7` (displayed in color-coded KaTeX)
- **Solution hint**: "Subtract 2 from both sides: `x = 5`. You need 5 cups of flour."
- **Visual**: Measuring cups filling up animation
- Background: `#1e293b`, border-top: 3px solid `#f59e0b`
- i18n key: `lesson.oneStepEquations.stage5.card3`

#### Card 4: Sharing
- **Icon**: People/group SVG (32px, `#22d3ee`)
- **Scenario**: "You split a pizza bill equally among 4 friends. Each person pays $9. What was the total bill?"
- **Equation**: `x / 4 = 9` (displayed in color-coded KaTeX)
- **Solution hint**: "Multiply both sides by 4: `x = 36`. The total bill was $36."
- **Visual**: Four equal portions combining into one total
- Background: `#1e293b`, border-top: 3px solid `#22d3ee`
- i18n key: `lesson.oneStepEquations.stage5.card4`

### Card Styling
- Each card: max-width 300px (grid) or full-width (carousel), `border-radius: 12px`, padding 16px
- Icon and scenario text at top, equation in the middle (20px, bold), solution hint at bottom (14px, `#94a3b8`)
- Entry: `translateY: 16px -> 0`, `opacity: 0 -> 1`, 0.4s, stagger 0.15s between cards
- On hover/tap: subtle lift (`translateY: -2px`) and glow

### Continue Trigger
Immediate. Continue button is always visible at the bottom. The student can browse the cards and continue whenever ready.

### Accessibility (Stage 5)
- Each card is a `<article>` with `aria-label` describing the scenario and equation
- Carousel has `role="region"` with `aria-roledescription="carousel"` and prev/next buttons
- Grid layout: cards are naturally tab-accessible
- All icons have `aria-hidden="true"` (decorative)

---

## 8. Stage 6: Practice (5-10 minutes)

### Purpose
Retrieval practice across three cognitive layers: recall (state the inverse operation), procedure (solve one-step equations), and understanding (explain reasoning and evaluate claims). Every problem includes immediate feedback. NO free-text graded answers.

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

#### Problem 1: Identify the Inverse Operation

**Prompt**: "To solve `x + 9 = 14`, what should you do to both sides?"
- i18n key: `lesson.oneStepEquations.practice.p1.prompt`

**Visual**: The equation `x + 9 = 14` displayed large (40px) on a mini balance scale. The `+ 9` is highlighted with an amber glow to draw attention to the operation.

**Input**: Multiple choice (4 options, vertical stack):
- "Add 9 to both sides" (A)
- "Subtract 9 from both sides" (B)
- "Multiply both sides by 9" (C)
- "Divide both sides by 9" (D)
- Each button: full-width (max 400px), 52px height, `border-radius: 12px`, `background: #334155`, left-aligned text with a letter prefix (A, B, C, D in a circle), 18px font

**Correct answer**: "Subtract 9 from both sides" (B)

**Feedback on correct**:
1. Button B turns green (`background: #34d39920`, border `#34d399`, 0.3s transition)
2. Green checkmark appears (0.3s, `scale: 0 -> 1.2 -> 1`)
3. Text: "Correct! The equation has `+ 9`, so we UNDO it by subtracting 9 from both sides. Addition and subtraction are inverse operations." (green, 16px)
4. The mini scale briefly animates: 9 blocks removed from both sides, scale stays balanced
5. i18n key: `lesson.oneStepEquations.practice.p1.correct`

**Feedback on incorrect** (e.g., student picks A -- adding 9):
1. Button A flashes red briefly (0.2s)
2. Text: "Adding 9 would make x + 9 + 9 = 14 + 9, which makes x even MORE wrapped up! To UNDO adding 9, you need the OPPOSITE: subtract 9." (red-400, 14px)
3. This directly addresses Misconception #3 (confusing operation with inverse)
4. Student can retry immediately
5. i18n key: `lesson.oneStepEquations.practice.p1.incorrect.add`

**Feedback on incorrect** (C or D):
1. Brief red flash
2. Text: "Multiply and divide are for equations like `3x = 12` or `x / 4 = 5`. Here, x was ADDED to, so we need to SUBTRACT. Match the operation type!" (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p1.incorrect.other`

#### Problem 2: What Does the Equals Sign Mean?

**Prompt**: "In the equation `x + 3 = 10`, what does the `=` sign mean?"
- i18n key: `lesson.oneStepEquations.practice.p2.prompt`

**Visual**: The equation `x + 3 = 10` displayed large (40px) with the `=` sign pulsing with a subtle amber glow.

**Input**: Multiple choice (3 options):
- "The answer is 10" (A)
- "The left side and right side have the same value" (B)
- "Calculate x + 3" (C)
- Each button: full-width, 52px height, `border-radius: 12px`

**Correct answer**: "The left side and right side have the same value" (B)

**Feedback on correct**:
1. Button B turns green
2. A mini balance scale appears with "x + 3" on the left and "10" on the right, perfectly balanced, with a green `=` at the fulcrum
3. Text: "Exactly! The equals sign means 'these two sides are the SAME.' Like a balance scale -- both pans hold the same weight." (green, 16px)
4. i18n key: `lesson.oneStepEquations.practice.p2.correct`

**Feedback on incorrect** (A):
1. Brief red flash
2. Text: "Careful! If `=` meant 'the answer is,' then `10 = x + 3` wouldn't make sense -- but it's a perfectly valid equation! The `=` means both sides are the SAME value, like a balanced scale." (red-400, 14px)
3. This directly addresses Misconception #4
4. i18n key: `lesson.oneStepEquations.practice.p2.incorrect.answer`

**Feedback on incorrect** (C):
1. Brief red flash
2. Text: "The equals sign doesn't mean 'calculate.' It means the two sides are already equal -- they have the SAME value. Think of it as a balance scale: both sides weigh the same." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p2.incorrect.calc`

#### Problem 3: Match Operations to Inverses

**Prompt**: "Match each operation to its inverse (opposite) by dragging."
- i18n key: `lesson.oneStepEquations.practice.p3.prompt`

**Visual**: Two columns. Left column: 4 operation chips. Right column: 4 inverse chips (shuffled).

**Left column** (operations, fixed):
1. `+ 7` (amber chip)
2. `- 3` (amber chip)
3. `x 4` (amber chip)
4. `/ 5` (amber chip)

**Right column** (inverses, shuffled, draggable):
1. `- 7` (cyan chip)
2. `+ 3` (cyan chip)
3. `/ 4` (cyan chip)
4. `x 5` (cyan chip)

**Input**: Drag-to-match. Each cyan chip can be dragged to snap next to an amber chip. When placed correctly, both chips glow green. When placed incorrectly, the cyan chip shakes and returns to its original position.

**Chip styling**: Each chip is 64px x 44px, `border-radius: 10px`, font-size 20px, font-weight 600
- Amber chips: `background: #f59e0b20`, `border: 2px solid #f59e0b`, `color: #f59e0b`
- Cyan chips: `background: #22d3ee20`, `border: 2px solid #22d3ee`, `color: #22d3ee`
- Correct match: both chips `background: #34d39920`, `border: 2px solid #34d399`, green checkmark between them
- Incorrect: cyan chip shakes (`translateX: -4px -> 4px`, 3 oscillations, 0.3s) then `spring` returns to origin

**Correct matching**:
- `+ 7` <-> `- 7`
- `- 3` <-> `+ 3`
- `x 4` <-> `/ 4`
- `/ 5` <-> `x 5`

**Feedback on all matched**:
1. All four pairs glow green simultaneously
2. Text: "Perfect! Every operation has an inverse. Addition undoes subtraction. Multiplication undoes division. These pairs are the key to solving equations." (green, 16px)
3. i18n key: `lesson.oneStepEquations.practice.p3.correct`

**Feedback on individual incorrect match**:
1. Shake animation on the incorrectly placed chip
2. Brief text: "Not quite -- think about what UNDOES [operation]. What's the opposite?" (red-400, 14px)
3. The chip returns to the pool for another try
4. i18n key: `lesson.oneStepEquations.practice.p3.incorrect`

### Layer 1: Procedure (Problems 4-6)

#### Problem 4: Solve an Addition Equation

**Prompt**: "Solve for x: `x + 8 = 15`"
- i18n key: `lesson.oneStepEquations.practice.p4.prompt`

**Visual**: The equation `x + 8 = 15` displayed large (36px). A mini balance scale shows the equation state. Below, a step-by-step solution area.

**Input**: Numeric input field:
- Single number entry, centered
- Field: `width: 120px`, `height: 52px`, `border-radius: 12px`, `border: 2px solid #475569`, `background: #0f172a`
- Font: mono, 28px, white, centered, `tabular-nums`
- Virtual number pad below (0-9 digits + backspace + negative sign), each key 48px x 48px, `border-radius: 8px`, `background: #334155`
- "Check" button below the number pad (primary style, full width, `#8b5cf6`)
- Label above input: "x = " in purple, 24px

**Correct answer**: `7`

**Feedback on correct**:
1. Green border on the input field (`border: 2px solid #34d399`)
2. Step-by-step solution animation appears below:
   - `x + 8 = 15` (original, white)
   - `x + 8 - 8 = 15 - 8` (the `- 8` highlighted in cyan on both sides, 0.3s fade-in)
   - `x = 7` (emerald, bold, `scale: 0.9 -> 1`, 0.3s)
3. Verification: `7 + 8 = 15` with green checkmark
4. On the mini scale: blocks animate away from both sides
5. Text: "Correct! Subtract 8 from both sides: `15 - 8 = 7`. Check: `7 + 8 = 15`. It works!" (green, 16px)
6. i18n key: `lesson.oneStepEquations.practice.p4.correct`

**Feedback on incorrect** (e.g., student enters `23` -- added instead of subtracted):
1. Red border on input
2. Text: "Hmm, 23 doesn't work: `23 + 8 = 31`, not 15. You may have ADDED 8 instead of SUBTRACTING it. Remember: the equation has `+ 8`, so we undo it by subtracting 8. Try `15 - 8`." (red-400, 14px)
3. This addresses Misconception #3
4. Student can retry immediately (input clears)
5. i18n key: `lesson.oneStepEquations.practice.p4.incorrect.added`

**Feedback on incorrect** (other wrong answer):
1. Red border
2. Text: "Not quite. Let's work through it: `x + 8 = 15`. To isolate x, subtract 8 from both sides: `x = 15 - 8`. What is `15 - 8`?" (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p4.incorrect.other`

#### Problem 5: Solve a Multiplication Equation

**Prompt**: "Solve for x: `5x = 35`"
- i18n key: `lesson.oneStepEquations.practice.p5.prompt`

**Visual**: The equation `5x = 35` displayed large. A visual showing 5 equal groups that together make 35 (five boxes, each containing `?`, laid side by side, with a brace below labeled "35").

**Input**: Numeric input field (same styling as Problem 4):
- Label above: "x = " in purple, 24px
- Virtual number pad below

**Correct answer**: `7`

**Feedback on correct**:
1. Green border on input
2. Step-by-step animation:
   - `5x = 35` (original)
   - `5x / 5 = 35 / 5` (the `/ 5` in cyan on both sides)
   - `x = 7` (emerald, bold)
3. Verification: `5 x 7 = 35` with green checkmark
4. The five-group visual updates: each box fills with `7`, then `7 + 7 + 7 + 7 + 7 = 35` flashes briefly
5. Text: "Correct! Divide both sides by 5: `35 / 5 = 7`. Check: `5 x 7 = 35`. Perfect!" (green, 16px)
6. i18n key: `lesson.oneStepEquations.practice.p5.correct`

**Feedback on incorrect** (e.g., student enters `175` -- multiplied instead of divided):
1. Red border
2. Text: "175 is too big! You may have MULTIPLIED by 5 instead of DIVIDING. The equation has `5 times x`, so we undo it by DIVIDING by 5. Try `35 / 5`." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p5.incorrect.multiplied`

**Feedback on incorrect** (other):
1. Red border
2. Text: "Not quite. In `5x = 35`, x is being MULTIPLIED by 5. The inverse of multiplication is division. Divide both sides by 5: `x = 35 / 5`." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p5.incorrect.other`

#### Problem 6: Solve a Subtraction Equation (with visual)

**Prompt**: "Solve for x: `x - 4 = 9`"
- i18n key: `lesson.oneStepEquations.practice.p6.prompt`

**Visual**: The equation `x - 4 = 9` displayed large. A mini balance scale with a mystery box on the left (with 4 blocks "removed" shown as ghost outlines below the pan) and 9 blocks on the right.

**Input**: Multiple choice (4 options):
- `5` (A)
- `13` (B)
- `-13` (C)
- `36` (D)
- Each button: full-width, 52px, `border-radius: 12px`

**Correct answer**: `13` (B)

**Feedback on correct**:
1. Button B turns green
2. Step-by-step animation:
   - `x - 4 = 9`
   - `x - 4 + 4 = 9 + 4` (the `+ 4` in cyan on both sides)
   - `x = 13` (emerald, bold)
3. Verification: `13 - 4 = 9` with green checkmark
4. On the mini scale: 4 blocks are ADDED to both sides (the ghost outlines fill in on the left), and the mystery box reveals 13
5. Text: "Yes! The equation has `- 4`, so we ADD 4 to both sides: `9 + 4 = 13`. Check: `13 - 4 = 9`." (green, 16px)
6. i18n key: `lesson.oneStepEquations.practice.p6.correct`

**Feedback on incorrect** (A -- subtracted instead of added):
1. Brief red flash
2. Text: "If x = 5, then `5 - 4 = 1`, not 9. You might have subtracted 4 from 9, but the equation already has `- 4`. To undo subtraction, we ADD. Try `9 + 4`." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p6.incorrect.subtracted`

**Feedback on incorrect** (C or D):
1. Brief red flash
2. Text: "Let's think about it: `x - 4 = 9`. To undo the `- 4`, add 4 to both sides: `x = 9 + 4`. What is `9 + 4`?" (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p6.incorrect.other`

### Layer 2: Understanding (Problems 7-9)

#### Problem 7: Spot the Error

**Prompt**: "Sam solved `x + 6 = 15` like this. What did Sam do wrong?"
- i18n key: `lesson.oneStepEquations.practice.p7.prompt`

**Visual**: Sam's "work" displayed in a card:
```
x + 6 = 15
x + 6 - 6 = 15         <- error: only subtracted from LEFT side
x = 15
```
- The work is rendered with color-coding: `- 6` in cyan (left side only), no `- 6` on the right
- A red warning icon pulses next to the second line

**Input**: Multiple choice (3 options):
- "Sam subtracted 6 from only the LEFT side, not both sides" (A)
- "Sam should have added 6, not subtracted 6" (B)
- "Sam's answer is correct, there's no error" (C)
- Each button: full-width, 56px, `border-radius: 12px`

**Correct answer**: "Sam subtracted 6 from only the LEFT side, not both sides" (A)

**Feedback on correct**:
1. Button A turns green
2. The visual corrects itself with animation:
   - The erroneous second line fades out
   - Correct version fades in: `x + 6 - 6 = 15 - 6` with `- 6` in cyan on BOTH sides
   - Then: `x = 9` in emerald
3. A mini balance scale shows: subtracting from one side tilts the scale (red), subtracting from both keeps it balanced (green)
4. Text: "Exactly! Sam forgot the golden rule: whatever you do to one side, do the SAME to the other. `15 - 6 = 9`, so x = 9, not 15." (green, 16px)
5. This directly addresses Misconception #1
6. i18n key: `lesson.oneStepEquations.practice.p7.correct`

**Feedback on incorrect** (B):
1. Brief red flash
2. Text: "Sam was right to subtract (since the equation has `+ 6`, subtracting is the correct inverse). The problem is that Sam only subtracted from ONE side. Check: does `15 - 6` appear on the right side of Sam's work?" (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p7.incorrect.operation`

**Feedback on incorrect** (C):
1. Brief red flash
2. Text: "Let's check Sam's answer: if x = 15, then `15 + 6 = 21`, not 15. So x = 15 is wrong! Look at Sam's second line -- the `- 6` only appears on the left side." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p7.incorrect.noerror`

#### Problem 8: Solve and Verify (Drag Interaction)

**Prompt**: "Solve `x + 12 = 20` by dragging the correct operations to both sides."
- i18n key: `lesson.oneStepEquations.practice.p8.prompt`

**Visual**: The equation `x + 12 = 20` displayed large in the center. Below it, a solution template with two drop zones:

```
x + 12  [____]  =  20  [____]
```

The drop zones are to the RIGHT of each side, indicating "what operation to apply."

Below the drop zones, source chips (draggable):
- `+ 12` (amber chip)
- `- 12` (cyan chip)
- `x 12` (purple chip)
- `/ 12` (rose chip)

**Chip styling**: Each chip 72px x 44px, `border-radius: 10px`, font-size 18px, font-weight 600
- Draggable with `@use-gesture/react`
- On drag: `scale: 1.1`, shadow increase, follows finger/cursor
- On valid drop: snaps into drop zone with `spring({ damping: 20, stiffness: 300 })`
- On invalid drop: returns to source with `ease: "easeOutBack"`

**Validation**: The student must place the SAME chip type in BOTH drop zones. If they place `- 12` in both zones:
- The equation animates: `x + 12 - 12 = 20 - 12` -> `x = 8`
- Green checkmark, particle burst

**Correct answer**: `- 12` in both drop zones

**Feedback on correct**:
1. Both drop zones glow green
2. Step-by-step animation:
   - `x + 12 - 12 = 20 - 12`
   - `x = 8`
3. Verification: `8 + 12 = 20` with checkmark
4. Text: "Perfect! You applied `- 12` to BOTH sides, keeping the equation balanced. `x = 8`. Check: `8 + 12 = 20`." (green, 16px)
5. i18n key: `lesson.oneStepEquations.practice.p8.correct`

**Feedback on placing different chips in the two zones**:
1. The balance scale tilts (red indicator)
2. Text: "Both sides must get the SAME operation! If you subtract 12 from the left, you must subtract 12 from the right too." (red-400, 14px)
3. The incorrectly placed chip returns to the pool
4. This directly addresses Misconception #1
5. i18n key: `lesson.oneStepEquations.practice.p8.incorrect.different`

**Feedback on placing wrong operation** (e.g., `+ 12` in both):
1. The equation evaluates: `x + 12 + 12 = 20 + 12` -> `x + 24 = 32`
2. Text: "That made x MORE wrapped up, not less! You added 12, but the equation already has `+ 12`. To UNDO it, use the inverse: `- 12`." (red-400, 14px)
3. Both chips return to the pool
4. i18n key: `lesson.oneStepEquations.practice.p8.incorrect.wrong`

#### Problem 9: Which Equation Matches the Situation?

**Prompt**: "Maya has some stickers. She gives away 8 and has 15 left. Which equation represents this situation?"
- i18n key: `lesson.oneStepEquations.practice.p9.prompt`

**Visual**: A brief illustration: a girl with a collection of stickers, an arrow showing 8 stickers leaving, and 15 remaining. The visual is simple (SVG, flat design).

**Input**: Multiple choice (4 options, each displayed in KaTeX):
- `x + 8 = 15` (A)
- `x - 8 = 15` (B)
- `8x = 15` (C)
- `x + 15 = 8` (D)
- Each button: full-width, 52px, `border-radius: 12px`

**Correct answer**: `x - 8 = 15` (B)

**Feedback on correct**:
1. Button B turns green
2. Text: "That's right! Maya STARTED with x stickers, then GAVE AWAY 8 (subtracted 8), and had 15 left. So `x - 8 = 15`. Solving: `x = 15 + 8 = 23`. Maya had 23 stickers!" (green, 16px)
3. The illustration updates: the initial collection shows "23" stickers, 8 float away, 15 remain
4. i18n key: `lesson.oneStepEquations.practice.p9.correct`

**Feedback on incorrect** (A):
1. Brief red flash
2. Text: "If Maya ADDED 8 stickers and ended with 15, that would be `x + 8 = 15`. But she GAVE AWAY 8, which means she LOST them. Giving away is subtraction: `x - 8 = 15`." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p9.incorrect.added`

**Feedback on incorrect** (C):
1. Brief red flash
2. Text: "`8x = 15` means 8 TIMES x equals 15 -- that would mean she multiplied her stickers by 8. But she gave away 8, which is subtraction, not multiplication." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p9.incorrect.multiplied`

**Feedback on incorrect** (D):
1. Brief red flash
2. Text: "`x + 15 = 8` would mean she added 15 and got 8 -- that's fewer after adding, which doesn't make sense. She started with x, subtracted 8, and got 15: `x - 8 = 15`." (red-400, 14px)
3. i18n key: `lesson.oneStepEquations.practice.p9.incorrect.reversed`

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
- Drag-to-match (Problem 3) has keyboard alternative: Tab to select a chip, Enter to pick up, Tab to a target slot, Enter to place
- Drag-to-arrange (Problem 8) has keyboard alternative: Tab to select a chip, Enter to pick up, Tab to a drop zone, Enter to place
- Numeric input has `aria-label`: "Enter the value of x"
- Feedback is announced via `aria-live="assertive"` for correctness, `aria-live="polite"` for explanations
- Timer is not used -- unlimited time per problem (reduces math anxiety, per Constitution)
- KaTeX expressions have screen-reader-friendly `aria-label` text
- Error work in Problem 7 has `aria-describedby` pointing to a description: "Sam's work shows x plus 6 minus 6 equals 15 on the left side only, resulting in x equals 15"

---

## 9. Stage 7: Reflection (~1 minute)

### Purpose
Metacognitive self-explanation. The student consolidates their understanding by explaining WHY we apply the inverse operation to BOTH sides, not just the procedural HOW. This is the highest-value learning activity per the self-explanation effect research (Chi et al., 1989).

### Layout
Centered card, max-width 640px. Dark background.

### Prompt

**Card** (background `#1e293b`, `border-radius: 16px`, `padding: 24px`):
- **Header**: "Reflection" in a small pill badge (background `#7c3aed20`, text `#a78bfa`, 12px, uppercase, letter-spacing 1px)
- **Prompt text**: "Imagine your friend tries to solve `x + 5 = 12` by subtracting 5 from ONLY the left side. Explain why that doesn't work, and what they should do instead."
  - i18n key: `lesson.oneStepEquations.stage7.prompt`
  - Font: 18px, `#f8fafc`, line-height 1.6, font-weight 500
- **Visual hint**: Below the prompt, show a mini balance scale with two states side-by-side:
  - Left: "One side only" -- scale tilted, red X, equation `x ≠ 12`
  - Right: "Both sides" -- scale balanced, green checkmark, equation `x = 7`
  - This visual primes the student to think about WHY both sides matter

### Input

**Text area**:
- Min height: 120px, auto-grow to max 240px
- Placeholder: "If you only subtract from one side..." (i18n key: `lesson.oneStepEquations.stage7.placeholder`)
- Character counter: `{current} / 20 minimum`
  - Color: `#64748b` when below minimum, `#34d399` when minimum reached
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
   - Response sent to the Claude API for quality scoring
   - Typical response time: 1-2 seconds
   - During evaluation: submit button shows spinner, text area becomes read-only

2. **Feedback Display** (0.5s fade-in after evaluation returns):

   **Quality indicator**: 0-5 filled stars (star icons, 24px)
   - 0-1 stars: "Keep practicing your explanations!" (encouraging, not punitive)
   - 2-3 stars: "Good thinking! You're on the right track."
   - 4-5 stars: "Excellent explanation! You really understand the balance principle."

   **AI feedback text**: A 1-3 sentence personalized response, displayed in a card:
   - Background: `#0f172a`, border-left: 4px solid `#8b5cf6`, padding 16px
   - Font: 14px, `#cbd5e1`, italic

   **XP earned**: Floating "+{amount} XP" badge, animates upward and fades (0.8s):
   - Range: 0-80 XP based on quality
   - Color: `#fbbf24` (amber)

3. **Confirmation Visual** (appears simultaneously with feedback):
   - A final animation showing the power of the inverse operation method:
     - An equation appears: `x + ? = ?`
     - The `?` values rapidly cycle through different numbers (3, 7, 15, 42, 100...)
     - For each pair, the solution appears instantly via inverse operation
     - Speed increases, demonstrating the method works for any equation
     - Freezes on: "One method. Any equation."
   - Animation duration: 3s
   - i18n key: `lesson.oneStepEquations.stage7.confirmation`

4. **Lesson Complete**:
   - After feedback, a "Complete Lesson" button fades in (1s delay)
   - Same primary button style
   - On tap: triggers the lesson completion flow:
     - XP summary animation (total XP earned across all stages)
     - Achievement check
     - SRS state update: marks AL-3.2 as "learning" at recall layer
     - Unlocks successor topics: AL-3.4 (Multi-Step Equations), AL-3.5 (Inequalities) become "available" in the Knowledge Nebula
     - Redirects to lesson summary screen or learn page

### Accessibility (Stage 7)
- Prompt is in a `<label>` element linked to the text area via `for`/`id`
- Star rating announced via `aria-live`: "Your reflection scored 4 out of 5 stars"
- AI feedback is in an `aria-live="polite"` region
- Confirmation visual has `aria-label`: "The inverse operation method works for any equation. One method, any equation."
- Skip button has `aria-label`: "Skip reflection"

---

## 10. Technical Specifications

### Color Palette (One-Step Equations)

| Element | Primary | Fill (20%) | CSS Variable |
|---------|---------|------------|-------------|
| Variable / Mystery box (x) | `#a78bfa` | `#a78bfa33` | `--ose-variable` |
| Operation (what was done) | `#f59e0b` | `#f59e0b33` | `--ose-operation` |
| Inverse operation (undo) | `#22d3ee` | `#22d3ee33` | `--ose-inverse` |
| Solution / Result | `#34d399` | `#34d39933` | `--ose-solution` |
| Unit blocks | `#60a5fa` | `#60a5fa33` | `--ose-block` |
| Scale frame | `#64748b` | `#64748b33` | `--ose-scale` |
| Background (dark) | `#0f172a` | -- | `--bg-primary` |
| Surface | `#1e293b` | -- | `--bg-surface` |
| Text primary | `#f8fafc` | -- | `--text-primary` |
| Text secondary | `#e2e8f0` | -- | `--text-secondary` |
| Text muted | `#94a3b8` | -- | `--text-muted` |
| Success | `#34d399` | -- | `--color-success` |
| Error | `#f87171` | -- | `--color-error` |
| Warning / XP | `#fbbf24` | -- | `--color-xp` |
| Primary action | `#8b5cf6` | -- | `--color-primary` |

### Accessibility: Color-Blind Safety

| Color | Protanopia | Deuteranopia | Tritanopia |
|-------|-----------|-------------|-----------|
| Purple `#a78bfa` (variable) | Blue-gray | Blue-gray | Pink-gray |
| Amber `#f59e0b` (operation) | Olive-brown | Olive-brown | Pink-orange |
| Cyan `#22d3ee` (inverse) | Light blue | Light blue | Green |
| Blue `#60a5fa` (blocks) | Dark blue | Dark blue | Purple-blue |
| Green `#34d399` (solution) | Yellow-brown | Yellow-brown | Blue-gray |

All five remain distinguishable under each deficiency. Per Constitution Principle IV, color is never the sole channel for meaning. Every color-coded element also has:
- A text label (e.g., "operation," "inverse," "solution")
- A shape difference (mystery box vs unit blocks vs operation badges)
- Positional context

### Typography

| Element | Font | Size | Weight | Features |
|---------|------|------|--------|----------|
| Large equations | System mono / JetBrains Mono | `clamp(28px, 6vw, 44px)` | 700 | `tabular-nums` |
| Inline equations | System mono | `clamp(16px, 3.5vw, 22px)` | 600 | `tabular-nums` |
| Body text | System sans (Inter preferred) | 16px | 400 | `line-height: 1.6` |
| Labels | System sans | `clamp(10px, 2.5vw, 14px)` | 600 | `text-transform: uppercase`, `letter-spacing: 0.5px` |
| KaTeX math | KaTeX default | `clamp(16px, 3.5vw, 22px)` | -- | KaTeX rendering |
| Button text | System sans | 16px | 600 | -- |
| Block labels | System sans | 14px | 700 | Centered in block |

### Animation Specifications

#### Global Animation Config

```typescript
const ANIMATION_CONFIG = {
  spring: {
    default: { damping: 20, stiffness: 300 },
    gentle: { damping: 25, stiffness: 200 },
    bouncy: { damping: 12, stiffness: 400 },
    stiff: { damping: 30, stiffness: 500 },
    pop: { damping: 15, stiffness: 400 },
    scaleTilt: { damping: 12, stiffness: 200 }, // balance scale tilt
  },
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    dramatic: 0.8,
    blockRemoval: 0.4, // per-block removal timing
    tilt: 0.6, // scale tilt duration
  },
  ease: {
    default: "easeInOut",
    enter: "easeOut",
    exit: "easeIn",
    bounce: "easeOutBack",
  },
} as const;
```

#### Framer Motion Variants (commonly used in this lesson)

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

const blockRemove = {
  exit: { opacity: 0, scale: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeIn" },
};

const scaleTilt = {
  animate: (angle: number) => ({ rotate: angle }),
  transition: { type: "spring", damping: 12, stiffness: 200 },
};

const cardFlip = {
  initial: { rotateY: 0 },
  animate: { rotateY: 180 },
  transition: { duration: 0.5, ease: "easeInOut" },
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
- Balance scale tilt: instant state change (no wobble animation)
- Block removal: instant disappearance (no fade/shrink)
- Hook: show final composed state with a single fade-in
- Particle effects (bursts, ripples) disabled entirely
- Card flip: instant content swap (no 3D rotation)

```typescript
const useReducedMotion = (): boolean => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
};
```

### Touch & Interaction Targets

| Element | Min Size | Notes |
|---------|----------|-------|
| Unit blocks (tappable) | 28px x 28px (block) + 44px tap zone | Tap zone extends beyond visual block |
| Control buttons (Remove/Add) | full-width x 48px | Easy to tap on mobile |
| Multiple-choice buttons | full-width x 52px | Easy to tap on mobile |
| Drag chips (Problem 3, 8) | 64px x 44px (min) | Exceeds 44px requirement |
| Drop zones (Problem 8) | 72px x 52px (min) | Clear visual target |
| Continue button | 160px x 48px | Prominent, centered |
| Number pad keys | 48px x 48px | Exceeds 44px requirement |
| Numeric input field | 120px x 52px | Comfortable input |
| Text area (reflection) | full-width x 120px+ | Auto-growing |
| Tab switcher (mobile) | each tab 50% width x 44px | Comfortable tab targets |
| Skip button | 80px x 44px | Meets minimum |

### Gesture Handling

Balance scale block interactions use `@use-gesture/react` for enhanced block selection on touch:

```typescript
const bindBlockTap = useDrag(({ tap, args: [side, index] }) => {
  if (tap) {
    selectBlock(side, index);
  }
}, {
  filterTaps: true,
  threshold: 5,
});
```

Drag interactions for Practice problems (Problems 3, 8):

```typescript
const bindDrag = useDrag(({ movement: [mx, my], active, cancel }) => {
  if (Math.abs(mx) < 10 && Math.abs(my) < 10 && !active) return;
  // During drag: update position with velocity tracking
  // On release: snap to nearest valid slot or return to origin
}, {
  filterTaps: true,
  threshold: 10,
  rubberband: true,
});
```

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile S | < 375px | Single column, balance scale fills width, control buttons stack, tab switcher for models, font sizes at `clamp` minimums |
| Mobile M | 375-639px | Single column, comfortable spacing, tab switcher for models, balance scale 100% width |
| Tablet | 640-1023px | Balance scale + reverse machine side-by-side (60/40). Practice cards wider. Discovery panels side-by-side. |
| Desktop | >= 1024px | Max-width container (800px), centered. Both models visible simultaneously. Generous spacing. |

### Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Animation frame rate | 60fps (P95 >= 55fps) | Framer Motion `onFrame` callback + `PerformanceObserver` |
| SVG element count (Stage 2, max state) | <= 60 elements | Scale + blocks + controls + equation display |
| Time to interactive (Stage 2) | < 1.5s | From stage transition to first interaction available |
| Memory (Stage 2, all scenarios tested) | < 12MB | Heap snapshot |
| Scale tilt animation | Consistent 60fps | No layout thrashing during tilt |
| Block removal latency | < 16ms (1 frame) | State update + render start |
| Practice problem transition | < 200ms | Between problem cards |

### State Persistence

Lesson progress is persisted to both local storage (Dexie.js) and server (via `lesson.completeStage` tRPC call):

```typescript
interface LessonProgressState {
  lessonId: "AL-3.2";
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
src/content/domains/algebra/AL-3.2/
├── lesson.mdx              # Stage text content (i18n-ready)
├── animations.json          # MathScene DSL configs for all stages
├── problems.json            # Practice problem bank (9 problems)
└── meta.json                # Metadata: prerequisites, successors, hooks

src/components/lesson/custom/
└── OneStepEquationsLesson/
    ├── OneStepEquationsLesson.tsx  # Custom lesson component (orchestrates all stages)
    ├── HookAnimation.tsx           # Stage 1: disguised number reveal
    ├── BalanceScale.tsx             # Stage 2a: interactive balance scale
    ├── BalanceScaleBlock.tsx        # Individual block component (unit or mystery)
    ├── BalanceScaleControls.tsx     # Add/Remove controls panel
    ├── ReverseMachine.tsx           # Stage 2b: function machine in reverse
    ├── DiscoveryPrompts.tsx         # Stage 3: guided prompt sequence
    ├── FlipCard.tsx                 # Stage 3 Prompt 3: flippable equation cards
    ├── SymbolBridgeAnimation.tsx    # Stage 4: notation overlay with scale sync
    ├── EquationDisplay.tsx          # Reusable color-coded equation renderer
    └── index.ts                     # Barrel export
```

### i18n Keys (Complete List)

All user-facing strings are externalized. The following keys are added to `src/lib/i18n/messages/en.json` under the `lesson.oneStepEquations` namespace:

```
lesson.continue
lesson.oneStepEquations.stage2.unfairWarning
lesson.oneStepEquations.stage2.cantRemoveMystery
lesson.oneStepEquations.stage2.reverseExplain
lesson.oneStepEquations.stage2.hint
lesson.oneStepEquations.stage3.prompt1
lesson.oneStepEquations.stage3.prompt2
lesson.oneStepEquations.stage3.prompt3
lesson.oneStepEquations.stage3.prompt4
lesson.oneStepEquations.stage3.keyInsight
lesson.oneStepEquations.stage4.verify
lesson.oneStepEquations.stage4.summary
lesson.oneStepEquations.stage5.card1
lesson.oneStepEquations.stage5.card2
lesson.oneStepEquations.stage5.card3
lesson.oneStepEquations.stage5.card4
lesson.oneStepEquations.practice.p1.prompt
lesson.oneStepEquations.practice.p1.correct
lesson.oneStepEquations.practice.p1.incorrect.add
lesson.oneStepEquations.practice.p1.incorrect.other
lesson.oneStepEquations.practice.p2.prompt
lesson.oneStepEquations.practice.p2.correct
lesson.oneStepEquations.practice.p2.incorrect.answer
lesson.oneStepEquations.practice.p2.incorrect.calc
lesson.oneStepEquations.practice.p3.prompt
lesson.oneStepEquations.practice.p3.correct
lesson.oneStepEquations.practice.p3.incorrect
lesson.oneStepEquations.practice.p4.prompt
lesson.oneStepEquations.practice.p4.correct
lesson.oneStepEquations.practice.p4.incorrect.added
lesson.oneStepEquations.practice.p4.incorrect.other
lesson.oneStepEquations.practice.p5.prompt
lesson.oneStepEquations.practice.p5.correct
lesson.oneStepEquations.practice.p5.incorrect.multiplied
lesson.oneStepEquations.practice.p5.incorrect.other
lesson.oneStepEquations.practice.p6.prompt
lesson.oneStepEquations.practice.p6.correct
lesson.oneStepEquations.practice.p6.incorrect.subtracted
lesson.oneStepEquations.practice.p6.incorrect.other
lesson.oneStepEquations.practice.p7.prompt
lesson.oneStepEquations.practice.p7.correct
lesson.oneStepEquations.practice.p7.incorrect.operation
lesson.oneStepEquations.practice.p7.incorrect.noerror
lesson.oneStepEquations.practice.p8.prompt
lesson.oneStepEquations.practice.p8.correct
lesson.oneStepEquations.practice.p8.incorrect.different
lesson.oneStepEquations.practice.p8.incorrect.wrong
lesson.oneStepEquations.practice.p9.prompt
lesson.oneStepEquations.practice.p9.correct
lesson.oneStepEquations.practice.p9.incorrect.added
lesson.oneStepEquations.practice.p9.incorrect.multiplied
lesson.oneStepEquations.practice.p9.incorrect.reversed
lesson.oneStepEquations.stage7.prompt
lesson.oneStepEquations.stage7.placeholder
lesson.oneStepEquations.stage7.confirmation
```

### Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Student navigates away mid-lesson | State persisted to IndexedDB. On return, resume from last completed stage. Show "Welcome back! You left off at Stage {n}." |
| Network offline during Practice | Problems are loaded at stage entry and cached. Submissions queue locally. Sync when online. |
| Network offline during Reflection | Reflection text saved locally. AI evaluation deferred. Show "We'll evaluate your reflection when you're back online." |
| Student submits empty/whitespace reflection | Client-side validation prevents submission. Min 20 chars of non-whitespace. |
| Student submits gibberish reflection | AI evaluator gives 0-1 star score. Feedback: "Try to explain why we need to subtract from BOTH sides. Think about what happens to the balance scale." No punitive action. |
| Balance scale: removing blocks when none left on one side | The "Remove from Both" button becomes disabled (opacity 0.4) when either pan has 0 unit blocks. The mystery box cannot be removed. |
| Balance scale: adding blocks indefinitely | Maximum 10 unit blocks per pan. After 10, the "Add to Both" button disables. A brief tooltip: "Maximum reached." |
| Practice Problem 4/5: student enters very large number | Numeric input max length: 5 digits. Numbers > 99999 are silently truncated. Validation occurs on submit only. |
| Practice Problem 3: drag on non-pointer device | Fall back to tap-to-select: tap a cyan chip to pick it up (highlighted), tap an amber chip's slot to place it. |
| Practice Problem 8: drag on non-pointer device | Same tap-to-select fallback: tap a chip to pick it up, tap a drop zone to place it. |
| Screen reader with balance scale | Announce scale state on each change: "Scale balanced. Left side: mystery box plus 3 blocks. Right side: 7 blocks. Equation: x plus 3 equals 7." |
| Very slow device (< 30fps detected) | Disable particle effects, simplify tilt animation (instant rotation, no spring wobble), reduce block removal to instant fade. Log performance warning to analytics. |
| RTL layout (future) | Balance scale layout is symmetric (no LTR/RTL dependency). Equation display and mathematical notation remain LTR. UI chrome follows RTL rules. |

---

## Appendix A: Content Files

### meta.json

```json
{
  "id": "AL-3.2",
  "name": "One-Step Equations",
  "domain": "algebra",
  "grade": 6,
  "prerequisites": ["AL-3.1", "NO-1.2a", "NO-1.2b"],
  "successors": ["AL-3.4", "AL-3.5"],
  "estimatedDuration": 25,
  "difficulty": "foundational",
  "hook": "Someone HID a number in an equation. +5 is the disguise — remove it from both sides",
  "spatialModel": "balance-scale",
  "secondarySpatialModel": "function-machine-reverse",
  "constitutionCompliance": {
    "principleI": "XP weighted toward explanation quality in reflection (80 XP max)",
    "principleII": "Balance scale spatial experience precedes all symbolic notation",
    "principleIII": "Connects backward to AL-3.1 (function machine), forward to AL-3.4 (multi-step equations)",
    "principleIV": "SVG balance scale elements are DOM-accessible, all color-coded elements have text labels",
    "principleV": "60fps target for tilt animations, <=60 SVG elements",
    "principleVI": "No personal data collected beyond lesson progress and reflection text",
    "principleVII": "All content in MDX/JSON, all strings externalized with i18n keys"
  }
}
```

### problems.json

```json
{
  "lessonId": "AL-3.2",
  "problems": [
    {
      "id": "AL-3.2-P1",
      "layer": 0,
      "type": "multiple-choice",
      "prompt": "To solve x + 9 = 14, what should you do to both sides?",
      "equation": "x + 9 = 14",
      "options": [
        "Add 9 to both sides",
        "Subtract 9 from both sides",
        "Multiply both sides by 9",
        "Divide both sides by 9"
      ],
      "correctIndex": 1,
      "irt": { "difficulty": -1.2, "discrimination": 1.1 }
    },
    {
      "id": "AL-3.2-P2",
      "layer": 0,
      "type": "multiple-choice",
      "prompt": "In the equation x + 3 = 10, what does the = sign mean?",
      "equation": "x + 3 = 10",
      "options": [
        "The answer is 10",
        "The left side and right side have the same value",
        "Calculate x + 3"
      ],
      "correctIndex": 1,
      "irt": { "difficulty": -1.0, "discrimination": 0.9 }
    },
    {
      "id": "AL-3.2-P3",
      "layer": 0,
      "type": "drag-match",
      "prompt": "Match each operation to its inverse (opposite) by dragging.",
      "pairs": [
        { "operation": "+ 7", "inverse": "- 7" },
        { "operation": "- 3", "inverse": "+ 3" },
        { "operation": "x 4", "inverse": "/ 4" },
        { "operation": "/ 5", "inverse": "x 5" }
      ],
      "irt": { "difficulty": -0.5, "discrimination": 1.2 }
    },
    {
      "id": "AL-3.2-P4",
      "layer": 1,
      "type": "numeric-input",
      "prompt": "Solve for x: x + 8 = 15",
      "equation": "x + 8 = 15",
      "correctAnswer": 7,
      "irt": { "difficulty": 0.0, "discrimination": 1.3 }
    },
    {
      "id": "AL-3.2-P5",
      "layer": 1,
      "type": "numeric-input",
      "prompt": "Solve for x: 5x = 35",
      "equation": "5x = 35",
      "correctAnswer": 7,
      "irt": { "difficulty": 0.5, "discrimination": 1.2 }
    },
    {
      "id": "AL-3.2-P6",
      "layer": 1,
      "type": "multiple-choice",
      "prompt": "Solve for x: x - 4 = 9",
      "equation": "x - 4 = 9",
      "options": ["5", "13", "-13", "36"],
      "correctIndex": 1,
      "irt": { "difficulty": 0.3, "discrimination": 1.1 }
    },
    {
      "id": "AL-3.2-P7",
      "layer": 2,
      "type": "multiple-choice",
      "prompt": "Sam solved x + 6 = 15 like this. What did Sam do wrong?",
      "options": [
        "Sam subtracted 6 from only the LEFT side, not both sides",
        "Sam should have added 6, not subtracted 6",
        "Sam's answer is correct, there's no error"
      ],
      "correctIndex": 0,
      "irt": { "difficulty": 1.0, "discrimination": 1.4 }
    },
    {
      "id": "AL-3.2-P8",
      "layer": 2,
      "type": "drag-arrange",
      "prompt": "Solve x + 12 = 20 by dragging the correct operations to both sides.",
      "equation": "x + 12 = 20",
      "sourceChips": ["+ 12", "- 12", "x 12", "/ 12"],
      "correctChip": "- 12",
      "correctAnswer": 8,
      "irt": { "difficulty": 1.2, "discrimination": 1.3 }
    },
    {
      "id": "AL-3.2-P9",
      "layer": 2,
      "type": "multiple-choice",
      "prompt": "Maya has some stickers. She gives away 8 and has 15 left. Which equation represents this situation?",
      "options": [
        "x + 8 = 15",
        "x - 8 = 15",
        "8x = 15",
        "x + 15 = 8"
      ],
      "correctIndex": 1,
      "irt": { "difficulty": 1.5, "discrimination": 1.2 }
    }
  ]
}
```

---

## Appendix B: AI Tutor Integration

### Tutor Awareness

The AI tutor (Claude) has access to the following context during this lesson:

```typescript
interface TutorContext {
  lessonId: "AL-3.2";
  currentStage: number;
  misconceptions: [
    "operating-on-one-side",
    "guessing-not-systematic",
    "confusing-operation-with-inverse",
    "equals-means-calculate"
  ];
  spatialModel: "balance-scale";
  coreInsight: "Solving means undoing the operation by applying its inverse to BOTH sides";
  studentProgress: {
    stagesCompleted: number[];
    practiceAccuracy: number;
    commonErrors: string[];
    timeOnTask: number;
  };
}
```

### Tutor Intervention Points

| Trigger | Intervention |
|---------|-------------|
| Student stuck on Stage 2 for >45s without interaction | "Try tapping a block on the left side of the scale, then press 'Remove from Both.' Watch what happens!" |
| Student tries "Remove Left Only" 3+ times | "I see you keep trying to remove from just one side. Watch the scale -- it tilts! The equation breaks. Try removing from BOTH sides instead." |
| Student fails Practice Problem 1 twice | "Remember: the equation has + 9. To UNDO adding, you SUBTRACT. Think of the balance scale -- to take blocks off one side, you have to take the same from the other." |
| Student fails 3 consecutive Practice problems | "Let's slow down. Go back to the balance scale in your mind: whatever you do to one side, do the same to the other. The inverse of + is -, and the inverse of x is /." |
| Student skips reflection | No intervention (skip is a valid choice per Constitution) |

---

## Appendix C: Gamification Hooks

### XP Breakdown

| Source | Amount | Condition |
|--------|--------|-----------|
| Hook completion | 5 XP | Stage 1 passed |
| Spatial interactions (Stage 2) | 10 XP | Min interactions met |
| First "unfair" attempt | 5 XP | Tried removing from one side (exploratory XP) |
| Discovery completion | 10 XP | All 5 prompts acknowledged |
| Symbol Bridge completion | 5 XP | All notation revealed |
| Real-World anchor viewed | 5 XP | At least 2 cards viewed |
| Practice problems | Up to 165 XP | See Practice XP Calculation |
| Reflection | Up to 80 XP | Quality-based AI scoring |
| **Total possible** | **285 XP** | |

### Achievement Triggers

| Achievement | Condition | Badge |
|-------------|-----------|-------|
| "Balance Master" | Solve all 3 balance scale scenarios without triggering "unfair" warning | Bronze balance scale |
| "Inverse Expert" | Match all 4 inverse pairs on first attempt (Problem 3) | Silver arrows (opposing) |
| "Perfect Solver" | All 9 practice problems correct on first try | Gold checkmark |
| "Deep Thinker" | Reflection scores 4+ stars | Purple brain |

### SRS Integration

After lesson completion, the following cards are added to the student's SRS queue:

| Card | Front | Back | Initial Interval |
|------|-------|------|-----------------|
| 1 | "What is the inverse of addition?" | "Subtraction" | 1 day |
| 2 | "What is the inverse of multiplication?" | "Division" | 1 day |
| 3 | "Solve: x + 7 = 19" | "x = 12 (subtract 7 from both sides)" | 1 day |
| 4 | "Solve: 4x = 28" | "x = 7 (divide both sides by 4)" | 1 day |
| 5 | "Why must you apply the operation to BOTH sides?" | "To keep the equation balanced / equal" | 3 days |

---

## Quality Checklist

### Functionality
- [ ] All 7 stages render without errors
- [ ] Stage progression works (each stage leads to next)
- [ ] Continue buttons appear at correct triggers
- [ ] Balance scale tilts correctly when sides are unequal
- [ ] Balance scale stays level when sides are equal
- [ ] "Unfair" warning triggers when removing from one side only
- [ ] Mystery box reveals correct value when isolated
- [ ] Reverse function machine processes equations correctly
- [ ] All 9 practice problems have correct answers validated
- [ ] Drag-to-match (Problem 3) validates all 4 pairs
- [ ] Drag-to-arrange (Problem 8) validates same operation on both sides
- [ ] Feedback stays visible until "Next" is tapped
- [ ] Reflection accepts text and shows AI response
- [ ] `onComplete` fires after Stage 7

### Visual Quality
- [ ] Balance scale tilt animation is smooth (60fps)
- [ ] Block removal animation is synchronized (left and right remove simultaneously)
- [ ] Colors are consistent with lesson's palette
- [ ] Text is readable on dark background
- [ ] No layout overflow on mobile (375px width)
- [ ] Numbers use `tabular-nums` for alignment
- [ ] Progress bar at top shows current stage
- [ ] Card flip animation (Stage 3) is smooth

### Interactions
- [ ] All touch targets >= 44px
- [ ] Drag interactions work on touch devices
- [ ] Visual feedback on every tap/click (scale, color, or highlight)
- [ ] No dead states (always a way to progress)
- [ ] Tab switching (mobile, Stage 2) works with swipe and tap
- [ ] Keyboard alternative for all drag interactions

### Accessibility
- [ ] Balance scale state changes announced via aria-live
- [ ] Interactive elements have aria-labels
- [ ] Keyboard navigation possible for all key interactions
- [ ] Reduced motion fallbacks implemented
- [ ] Color is never the sole channel for meaning
- [ ] KaTeX expressions have aria-label text alternatives

### Build
- [ ] `pnpm build` passes with no type errors
- [ ] No console errors in browser DevTools
- [ ] TypeScript strict mode, no `any` (DR-1)
- [ ] All math computations testable (DR-2)
