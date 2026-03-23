# Lesson Design: Integer Multiplication & Division

**ID**: NO-1.2b | **Domain**: Numbers & Operations | **Grade**: 6
**Version**: 1.0.0 | **Date**: 2026-03-22
**Prerequisite**: NO-1.2a (Integer Addition & Subtraction) | **Successors**: NO-1.6 (Order of Operations), AL-3.2 (Evaluating Expressions), NT-2.5 (Exponents & Powers)
**Content Path**: `src/content/domains/numbers-operations/NO-1.2b/`
**Estimated Duration**: 16-22 minutes (all 7 NLS stages)

---

## Table of Contents

1. [Core Insight](#1-core-insight)
2. [Neuroscience Framework](#2-neuroscience-framework)
3. [Stage 1: Hook (30-60s)](#3-stage-1-hook-30-60s)
4. [Stage 2: Spatial Experience (2-4 min)](#4-stage-2-spatial-experience-2-4-min)
5. [Stage 3: Guided Discovery (3-5 min)](#5-stage-3-guided-discovery-3-5-min)
6. [Stage 4: Symbol Bridge (2-3 min)](#6-stage-4-symbol-bridge-2-3-min)
7. [Stage 5: Real-World Anchor (1-2 min)](#7-stage-5-real-world-anchor-1-2-min)
8. [Stage 6: Practice (Adaptive, ~9 problems)](#8-stage-6-practice-adaptive-9-problems)
9. [Stage 7: Reflection (~1 min)](#9-stage-7-reflection-1-min)
10. [Technical Specifications](#10-technical-specifications)
11. [Accessibility](#11-accessibility)
12. [Content Files](#12-content-files)
13. [AI Tutor Integration](#13-ai-tutor-integration)
14. [Edge Cases & Error Handling](#14-edge-cases--error-handling)
15. [Gamification Hooks](#15-gamification-hooks)
16. [Constitution Compliance](#16-constitution-compliance)

---

## 1. Core Insight

**The Direction Reversal Metaphor**: Multiplication by a positive number means repeated jumps in the SAME direction. Multiplication by a negative number REVERSES the direction of those jumps. Two reversals (negative times negative) bring you back to the original direction -- positive.

| Operation | Physical Meaning | Result Sign |
|-----------|-----------------|-------------|
| `(+a) x (+b)` | `a` jumps of size `b` to the RIGHT | Positive (same direction, same direction) |
| `(+a) x (-b)` | `a` jumps of size `b` to the LEFT | Negative (same direction, reversed) |
| `(-a) x (+b)` | `a` jumps of size `b` to the RIGHT, then REVERSE all | Negative (reversed) |
| `(-a) x (-b)` | `a` jumps of size `b` to the LEFT, then REVERSE all | Positive (reversed + reversed = original) |

**The Key Revelation**: The sign rules are not arbitrary -- they are DEMANDED by the pattern. Extending `3 x 2 = 6, 3 x 1 = 3, 3 x 0 = 0, 3 x (-1) = ?, 3 x (-2) = ?` reveals that the only consistent continuation is `-3, -6`. The pattern forces the rules into existence.

**Division as Inverse**: Division follows the same sign rules as multiplication because division is "undoing" multiplication. If `(-3) x (-2) = 6`, then `6 / (-2) = -3` and `6 / (-3) = -2`. Same sign = positive quotient, different signs = negative quotient.

**Dual Representation**: The lesson uses TWO spatial models:
1. **Repeated jumps on number line** -- for multiplicative scaling intuition (primary)
2. **Descending pattern table** -- for algebraic inevitability of the sign rules (secondary, used in discovery)

Both models converge: the jump model shows WHY, the pattern table proves it MUST be so.

---

## 2. Neuroscience Framework

### 2.1 Cognitive Architecture Per Stage

| Stage | Primary Cognitive Process | Brain Regions Engaged | Why This Order Matters |
|-------|--------------------------|----------------------|----------------------|
| 1. Hook | Curiosity activation, reward prediction error | Ventral tegmental area (VTA), nucleus accumbens | The descending pattern creates a "what comes next?" tension that the dopaminergic system craves to resolve |
| 2. Spatial Experience | Embodied cognition, visuospatial encoding | Intraparietal sulcus (IPS), premotor cortex, visuospatial sketchpad | Physically controlling jump direction and watching arrows reverse on the number line creates motor-spatial encoding of "negative multiplier = flip" |
| 3. Guided Discovery | Pattern recognition, elaborative interrogation | Prefrontal cortex (PFC), hippocampus | Student extends the multiplication table past zero and discovers the sign rules as the ONLY mathematically consistent possibility -- self-generated insights bind more strongly |
| 4. Symbol Bridge | Dual coding, symbol grounding | Angular gyrus (symbol-to-meaning mapping), IPS (magnitude processing) | Sign rules formalized ONTO the jump model the student already built. Symbols map to spatial experience, not the reverse |
| 5. Real-World Anchor | Contextual binding, episodic memory | Hippocampus, medial temporal lobe | Concrete contexts (video rewind, debt cancellation, temperature rate) create multiple retrieval cues for the same sign rules |
| 6. Practice | Retrieval practice, error-driven learning | Basal ganglia (procedural), PFC (monitoring) | Spaced retrieval across recall/procedure/understanding layers strengthens sign-rule pathways; interleaving multiplication and division forces discrimination |
| 7. Reflection | Metacognition, consolidation | PFC (self-monitoring), default mode network | Self-explanation of WHY negative times negative equals positive forces construction of a coherent causal narrative, exposing gaps |

### 2.2 Embodied Cognition: Why "Repeated Jumps + Direction Reversal" Works

The repeated-jump model leverages embodied cognition (PF-3) through three mechanisms:

1. **Motor repetition**: Watching 3 jumps of size 2 play out on the number line activates the same premotor circuits involved in rhythmic physical actions (walking, tapping). The student internalizes multiplication as repeated motion -- a fundamentally different representation than "times tables."

2. **Direction reversal as physical flip**: When the multiplier is negative, the arrow literally REVERSES direction before jumping. This exploits the same left/right spatial reasoning from NO-1.2a (the walking metaphor) but adds a new operation: flipping the arrow 180 degrees. The flip is kinesthetically vivid -- it feels "wrong" to walk backwards, which makes the negative sign memorable.

3. **The double-flip aha moment**: When BOTH numbers are negative, the student sees two flips: the multiplicand's sign flips the jump direction, and the multiplier's sign flips it AGAIN. Two flips = back to the original direction. This is the same "double turn-around" principle from NO-1.2a (subtracting a negative), creating a powerful cross-lesson connection that strengthens the neural network for integer operations.

### 2.3 Connection to Prior Knowledge (NO-1.2a)

This lesson deliberately echoes the walking metaphor from NO-1.2a:

| NO-1.2a Concept | NO-1.2b Parallel |
|-----------------|------------------|
| Walking LEFT = subtracting | Jumping LEFT = multiplying by negative |
| Walking RIGHT = adding | Jumping RIGHT = multiplying by positive |
| Double reversal (subtracting a negative = adding) | Double reversal (negative x negative = positive) |
| Zero-pair chip cancellation | Not used (multiplication has no direct chip analog at this level) |

The student should feel the structural similarity: "The same reversal logic that makes `a - (-b) = a + b` also makes `(-a) x (-b) = positive`." This inter-lesson connection strengthens the neural representation of integer operations as a coherent system, not isolated rules.

### 2.4 Emotional Arc

The lesson is structured to create a specific emotional trajectory:

```
Stage 1-2:  CONFIDENCE      "I know 3 x 2. I can see the jumps."
            |                (positive x positive, familiar territory)
Stage 2b:   CURIOSITY       "What happens when I jump by a NEGATIVE?"
            |                (arrow reversal is new and visually surprising)
Stage 3a:   PATTERN LOCK    "3x2=6, 3x1=3, 3x0=0, 3x(-1)=...the pattern says -3!"
            |                (descending pattern creates inevitability)
Stage 3b:   PRODUCTIVE      "OK, but (-3) x (-2)... TWO negatives. What now?"
            STRUGGLE         (cognitive conflict -- the critical learning moment)
            |
Stage 3c:   BREAKTHROUGH    "Two flips bring you back! It HAS to be positive!"
            |                (aha moment -- celebration trigger)
Stage 4-5:  CONSOLIDATION   "Same sign = positive, different sign = negative. I see why."
Stage 6:    MASTERY FLOW    "I can multiply and divide signed numbers reliably"
Stage 7:    OWNERSHIP       "I can explain WHY negative times negative is positive"
```

**Critical design constraint**: The productive struggle in Stage 3b must NOT tip into frustration. The descending pattern table provides a strong scaffold -- the student can literally SEE the answer emerging. If they still struggle for >60 seconds, the AI tutor offers the "double flip" animation on the number line. The goal is effortful success, not helpless confusion (PF-6).

### 2.5 Prerequisite Neural Foundations

From NO-1.2a (Integer Addition & Subtraction), the student arrives with:
- Comfort with the number line extending in both directions from zero
- Understanding of directional movement (right = positive, left = negative)
- The "double reversal" principle (two negatives cancel)
- Experience with the walking metaphor and the zero-crossing effect
- Sign intuition: positive numbers live right of zero, negative numbers live left

This lesson builds on these spatial representations by introducing REPEATED movement (multiplication) and directional REVERSAL as a new operation layer.

---

## 3. Stage 1: Hook (30-60s)

### 3.1 Narrative Script

The hook uses the descending pattern to create irresistible curiosity. The student watches a multiplication table extend past zero and feels the pattern pulling them toward the answer.

**Scene**: A centered display area with a dark background. A vertical column of equations appears, building from top to bottom. The number line is NOT shown yet (that comes in Stage 2) -- the hook is purely about the PATTERN.

**Sequence** (auto-playing, no interaction required):

| Time | Animation | Text Overlay | Audio Cue |
|------|-----------|-------------|-----------|
| 0.0s | Dark background with subtle gradient (slate-900 to slate-950). Title fades in at center: "A Pattern..." in `font-size: clamp(24px, 6vw, 40px)`, `color: #e2e8f0`, `font-weight: 300`. | `"A Pattern..."` | Subtle ambient hum (low sine wave, 2s fade-in) |
| 1.5s | Title slides up and fades to 50% opacity. First equation fades in from below: `3 x 3 = 9`. KaTeX rendered, `font-size: 1.6rem`. The `9` is emerald-colored. | -- | Soft chime (major third, 100ms) |
| 2.5s | Second equation fades in below the first: `3 x 2 = 6`. The `6` is emerald. A faint connecting line appears between `9` and `6` on the right side, with a small `-3` label in slate-400. | -- | Soft chime (slightly lower pitch) |
| 3.5s | Third equation: `3 x 1 = 3`. The `3` is emerald. Connecting line from `6` to `3` with `-3` label. | -- | Soft chime (lower still) |
| 4.5s | Fourth equation: `3 x 0 = 0`. The `0` is amber-colored (zero emphasis). Connecting line with `-3`. The pattern is now visible: each result decreases by 3. | `"Each answer drops by 3..."` (fades in below equations, `color: #94a3b8`, italic) | Soft chime (lowest pitch yet) |
| 6.0s | Fifth equation appears, but only the LEFT side: `3 x (-1) = ?`. The `?` pulses amber, breathing animation (scale 1.0 -> 1.08 -> 1.0, 1.5s loop). The connecting line from `0` extends downward with its `-3` label, pointing at the `?`. | `"If the pattern continues..."` | Tension tone (sustained minor second, very quiet) |
| 8.0s | The `?` holds for 2 full seconds. The `-3` labels on the right side pulse simultaneously, three times (300ms each). The pattern is screaming the answer. | `"...what HAS to come next?"` | Tension builds slightly |
| 10.0s | The `?` dissolves and is replaced by `-3`. The `-3` appears with a rose color and a brief flash effect (scale 1.0 -> 1.15 -> 1.0 over 300ms). The connecting line completes. | -- | Resolution chime (descending note landing on a lower octave) |
| 11.0s | Sixth equation animates in: `3 x (-2) = ?`. Same pulsing `?`. The connecting `-3` line extends again. | -- | Tension tone again |
| 12.5s | The `?` becomes `-6`, rose-colored, with flash. | -- | Resolution chime |
| 13.5s | All six equations are visible. Brief pause. Then a new line appears at the bottom, larger, bolder, amber-colored: `"The pattern DEMANDS it."` Scale entrance 0.9 -> 1.0 over 400ms with opacity 0 -> 1. | `"The pattern DEMANDS it."` | Decisive chord (C major, 400ms, moderate volume) |
| 15.5s | Brief pause (1s). Then text below: `"But WHY? And what about (-3) x (-2)?"` -- this text appears in `color: #818cf8` (indigo), with a subtle question-mark animation (the `?` at the end wobbles: rotation -3deg, +3deg, 0, 200ms). | `"But WHY? And what about (-3) x (-2)?"` | Curiosity tone (ascending minor third, soft) |
| 17.5s | "Continue" button fades in at bottom. | -- | -- |

### 3.2 Pattern Display Design

The equations are arranged in a centered vertical column with consistent spacing:

```
         3  x  3  =  9       ─┐
                               │ -3
         3  x  2  =  6       ─┤
                               │ -3
         3  x  1  =  3       ─┤
                               │ -3
         3  x  0  =  0       ─┤
                               │ -3
         3  x (-1) = -3      ─┤
                               │ -3
         3  x (-2) = -6      ─┘
```

**Rendering details**:
- Each equation is a single `<motion.div>` row, centered horizontally
- Left-hand side (e.g., `3 x (-1)`) rendered with KaTeX, `color: #e2e8f0` (slate-200)
- Multiplication sign: `\times` in KaTeX, `color: #94a3b8` (slate-400)
- Positive results: `color: #10b981` (emerald-500)
- Zero result: `color: #fbbf24` (amber-400)
- Negative results: `color: #f43f5e` (rose-500)
- Row height: 44px, gap between rows: 8px
- Connecting lines: vertical segments on the right side, `stroke: #475569` (slate-600), `stroke-width: 1px`
- `-3` labels on connecting lines: `font-size: 0.7rem`, `color: #94a3b8`, positioned at the midpoint of each connecting segment

**Question mark animation**:
- The `?` character uses KaTeX rendering with custom amber color
- Breathing animation: `animate={{ scale: [1, 1.08, 1] }}`, `transition={{ repeat: Infinity, duration: 1.5 }}`
- On resolution: `?` cross-fades with the answer (opacity of `?` goes 1 -> 0 over 200ms while answer goes 0 -> 1 over 200ms, with the flash scale on the answer)

### 3.3 Hook Exploration Data

This stage collects no interaction data (purely observational). The "Continue" button press timestamps hook completion for analytics.

---

## 4. Stage 2: Spatial Experience (2-4 min)

**Minimum interactions to continue**: 10 distinct multiplication operations on the number line.

This stage provides ONE primary interactive model: the **Repeated Jumps Number Line**. Unlike NO-1.2a, there is no secondary chip model (chip cancellation does not have a direct multiplication analog at this level). Instead, the single model is enriched with direction-arrow controls and a multiplicand/multiplier configurator.

### 4.1 Repeated Jumps Number Line

#### 4.1.1 Layout

**Desktop** (viewport >= 768px):
```
+-----------------------------------------------------+
|  +---------------------------------------------+    |
|  |         NUMBER LINE VISUALIZATION             |    |
|  |  <--|--|--|--|--|--|--0--|--|--|--|--|--|--|-->  |    |
|  |                       ^                        |    |
|  |              Direction Arrow (flippable)       |    |
|  +---------------------------------------------+    |
|                                                      |
|  +------------------+  +---------------------------+ |
|  |  EQUATION DISPLAY |  |  CONTROLS                 | |
|  |                   |  |                           | |
|  |  3 x (-2) = -6   |  |  Multiplier:  [-] 3 [+]  | |
|  |                   |  |  Multiplicand:[-] 2 [+]  | |
|  |   (3 jumps of -2) |  |  Sign toggle: [+/-] [+/-]| |
|  |                   |  |                           | |
|  +------------------+  |  [ JUMP ]                  | |
|                         |  [ RESET ]                | |
|                         +---------------------------+ |
+-----------------------------------------------------+
```

**Mobile** (viewport < 768px):
```
+----------------------------+
|  NUMBER LINE (full width)   |
|  <--|--|--0--|--|--|--|-->   |
|            ^                |
|                             |
|  +------------------------+ |
|  | 3 x (-2) = -6          | |
|  | (3 jumps of -2)        | |
|  +------------------------+ |
|                             |
|  Multiplier:  [-] 3 [+]   |
|  Sign: [POSITIVE]          |
|                             |
|  Multiplicand: [-] 2 [+]  |
|  Sign: [NEGATIVE]          |
|                             |
|  [ JUMP ]  [ RESET ]      |
+----------------------------+
```

#### 4.1.2 Number Line (Interactive Version)

- **Range**: -20 to +20 (expandable)
- **SVG viewBox**: dynamic, initially `[-21, -5, 43, 11]`
- **Rendering**: Same base style as NO-1.2a number line (ticks, labels, zero emphasis, positive/negative region tints)
- **Pinch-to-zoom**: Enabled via `@use-gesture/react`. Min zoom: full range visible. Max zoom: 5 integers visible. Smooth momentum scrolling.
- **Pan**: Horizontal pan gesture. Inertia deceleration. Snaps to integer boundaries on release.
- **Direction arrow**: A large arrow (48px long) sitting ABOVE the number line at position 0 (or at the current starting position). This arrow indicates the direction of jumps BEFORE they occur:
  - Points RIGHT for positive multiplicand: `fill: #10b981` (emerald), arrowhead facing right
  - Points LEFT for negative multiplicand: `fill: #f43f5e` (rose), arrowhead facing left
  - When the multiplier is negative, the arrow FLIPS 180 degrees with a spring animation (300ms, `spring({ damping: 15, stiffness: 300 })`) -- this is the "reversal" moment
  - The flip happens when the student toggles the multiplier sign, providing immediate spatial feedback
- **Jump visualization**: Each jump of the walk produces:
  - An arc above the number line (for rightward jumps) or below (for leftward jumps)
  - Arc path: quadratic bezier from start position to end position of that jump, with control point 2.0 units above/below the line (larger arcs than NO-1.2a because each jump covers multiple integers)
  - Arc stroke: emerald (`#10b981`) for rightward jumps, rose (`#f43f5e`) for leftward jumps
  - Arc stroke-width: 2px, with animated `stroke-dasharray` drawing effect (400ms per arc)
  - Jump number label at the apex of each arc: "1", "2", "3", etc., `font-size: 0.5rem`, same color as arc
  - Jump size label inside each arc: the multiplicand value (e.g., "+2" or "-2"), `font-size: 0.4rem`, `color: #cbd5e1`
- **Landing markers**: At each landing position (after each jump), a small dot appears on the number line:
  - Radius: 3px, `fill` matching arc color, brief pop animation (scale 0 -> 1.2 -> 1.0, 200ms)
  - Label below the dot showing the running product value, `font-size: 0.45rem`
- **Zero-crossing effect**: Same as NO-1.2a -- when a jump crosses zero, the zero tick pulses (scale 1.0 -> 1.5 -> 1.0, 400ms), amber radial flash, and region tints briefly intensify
- **Trail**: After all jumps complete, the total path from start (0) to final position is highlighted with a thicker line segment on the number line itself (`stroke-width: 3px`, color matching final direction, `opacity: 0.6`)

#### 4.1.3 Controls

**Multiplier Input** (how many jumps):
- Stepper component: `[-] [value] [+]`
- Value range: 1-9 (always positive in magnitude; sign is separate)
- `-` and `+` buttons: 44px x 44px, circular, `background: #334155`, `border: 1.5px solid #475569`
- Value display: centered number, `font-size: 1.5rem`, `font-weight: 700`, `color: #f8fafc`, `font-variant-numeric: tabular-nums`
- Width: 140px total (44 + 52 + 44)
- ARIA: `role="spinbutton"`, `aria-valuemin="1"`, `aria-valuemax="9"`, `aria-valuenow`, `aria-label="Number of jumps (multiplier magnitude)"`
- Keyboard: Up/Down arrows to adjust, or direct number keys 1-9

**Multiplier Sign Toggle**:
- Toggle button, 110px wide x 44px tall
- Two states: "POSITIVE" (emerald background `#10b981`, text "+") and "NEGATIVE" (rose background `#f43f5e`, text "-")
- Transition: background cross-fade (200ms)
- When toggled to NEGATIVE: the direction arrow on the number line FLIPS (the key visual moment -- the student sees that negative multiplier reverses direction)
- Label text: "Multiplier sign" above, `font-size: 0.75rem`, `color: #94a3b8`
- ARIA: `role="switch"`, `aria-checked`, `aria-label="Multiplier sign. Currently positive/negative"`

**Multiplicand Input** (jump size):
- Same stepper design as multiplier: `[-] [value] [+]`
- Value range: 1-9
- ARIA: `aria-label="Jump size (multiplicand magnitude)"`

**Multiplicand Sign Toggle**:
- Same toggle design as multiplier sign
- When toggled: each jump's base direction changes (positive = rightward base, negative = leftward base)
- If BOTH signs are negative: the arrow does a DOUBLE flip (left, then right again) -- arriving back at its original direction. The student sees this visually.

**Jump Button**:
- Primary action button, full-width on mobile, 200px on desktop
- Height: 48px
- Background: `linear-gradient(135deg, #7c3aed, #6d28d9)` (violet gradient)
- Text: "JUMP" with a small `>>` icon, `font-size: 1rem`, `font-weight: 600`, `color: white`
- Hover: brightness 1.1, subtle scale 1.02
- Active/pressed: scale 0.98, brightness 0.95
- Disabled state (during animation): `opacity: 0.5`, `cursor: not-allowed`, small spinner
- ARIA: `aria-label="Perform [N] jumps of [M] starting from zero. [N] times [M] equals [result]"`

**Reset Button**:
- Secondary action, next to Jump button (desktop) or stacked below (mobile)
- Height: 48px
- Background: `transparent`, `border: 1.5px solid #475569`
- Text: "RESET" with `<<` icon, `color: #94a3b8`
- Hover: `border-color: #64748b`, `color: #cbd5e1`
- Resets all arcs, trails, landing dots, and equation display. Resets direction arrow to default (right-facing).
- ARIA: `aria-label="Reset number line and clear all jumps"`

#### 4.1.4 Equation Display (Live)

The equation display updates in real-time as the student configures their multiplication, BEFORE they press Jump.

**Format**: `[multiplier] x [multiplicand] = [result]`

Example states:
- Before jump: `3 x (-2) = ?` (result is `?` until jump completes)
- During jump: `3 x (-2) = ...` (ellipsis animates at 400ms intervals)
- After jump: `3 x (-2) = -6` (result appears with brief flash based on sign)

Below the main equation, a subtitle explains the physical meaning:
- `"3 jumps of -2"` or `"3 jumps of 2 to the LEFT"` depending on the configuration
- When multiplier is negative: `"3 jumps of 2, then REVERSE"` -- the word "REVERSE" pulses once in rose

**Rendering**:
- Container: `background: rgba(15, 23, 42, 0.7)`, `backdrop-filter: blur(12px)`, `border-radius: 8px`, `padding: 12px 16px`
- Main equation: KaTeX, `font-size: 1.3rem`
- Subtitle: `font-size: 0.85rem`, `color: #94a3b8`, italic
- Positive values colored emerald (`#10b981`), negative values colored rose (`#f43f5e`), zero in amber (`#fbbf24`)
- Operators in default text color (`#e2e8f0`)
- Result number counter-animates from 0 to final value at ~80ms per integer

#### 4.1.5 Direction Arrow Behavior (Critical Visual Element)

The direction arrow is the central pedagogical tool of this stage. Its behavior must precisely communicate the sign rules:

**Configuration: positive x positive** (e.g., `3 x 2`):
1. Arrow starts at 0, pointing RIGHT (emerald)
2. No flip occurs
3. Three arcs draw rightward: 0->2, 2->4, 4->6
4. Result: 6 (positive, rightward)

**Configuration: positive x negative** (e.g., `3 x (-2)`):
1. Arrow starts at 0, pointing LEFT (rose) -- the multiplicand's sign sets the base direction
2. No flip from multiplier (positive multiplier = no reversal)
3. Three arcs draw leftward: 0->(-2), (-2)->(-4), (-4)->(-6)
4. Result: -6 (negative, leftward)

**Configuration: negative x positive** (e.g., `(-3) x 2`):
1. Arrow starts at 0, pointing RIGHT (emerald) -- the multiplicand is positive
2. FLIP! The multiplier is negative, so the arrow reverses: spring animation, arrow now points LEFT (rose)
3. A brief "REVERSED!" text badge appears near the arrow for 1s, `color: #fbbf24`, `font-size: 0.65rem`
4. Three arcs draw leftward: 0->(-2), (-2)->(-4), (-4)->(-6)
5. Result: -6 (negative, leftward after reversal)

**Configuration: negative x negative** (e.g., `(-3) x (-2)`):
1. Arrow starts at 0, pointing LEFT (rose) -- the multiplicand is negative
2. FLIP! The multiplier is negative, so the arrow reverses: spring animation, arrow now points RIGHT (emerald)
3. "DOUBLE REVERSAL!" text badge appears for 1.5s, `color: #fbbf24`, slightly larger `font-size: 0.7rem`
4. Three arcs draw rightward: 0->2, 2->4, 4->6
5. Result: 6 (positive! Two negatives = positive)

The arrow flip is the CENTRAL visual metaphor. It must be prominent, smooth, and satisfying. The student should viscerally feel the reversal.

#### 4.1.6 Interaction Tracking

Each jump operation records:
```typescript
interface JumpInteraction {
  multiplier: number;          // Signed (e.g., -3)
  multiplicand: number;        // Signed (e.g., -2)
  result: number;              // Computed result
  multiplierSign: 'positive' | 'negative';
  multiplicandSign: 'positive' | 'negative';
  resultSign: 'positive' | 'negative' | 'zero';
  arrowFlipped: boolean;       // Did the direction arrow reverse?
  crossedZero: boolean;        // Did any jump cross zero?
  timestamp: number;           // ms since stage start
  timeSinceLastInteraction: number; // ms
}
```

The system tracks interaction diversity for exploration XP:
- Did the student try positive x positive? (+5 XP bonus)
- Did the student try positive x negative? (+5 XP bonus)
- Did the student try negative x positive? (+10 XP bonus)
- Did the student try negative x negative? (+10 XP bonus -- this is the key insight)
- Did the student try 3+ different multiplicand sizes? (+5 XP bonus)
- Did the student observe the direction arrow flip at least twice? (+5 XP bonus)
- Total exploration bonus: 0-40 XP

### 4.2 Guided Exploration Prompts

After 3-4 free interactions, small prompt cards appear to nudge the student toward key configurations if they haven't tried them yet:

1. **"Try a negative multiplicand"** (if student has only used positive multiplicands): "What happens to the jumps when the jump size is negative? Try `3 x (-2)` and watch the arrow."
   - Appears after 4 interactions if no negative multiplicand used

2. **"Now flip the multiplier"** (if student hasn't used negative multiplier): "What if the NUMBER of jumps is negative? Try `(-3) x 2` and watch the arrow REVERSE."
   - Appears after 6 interactions if no negative multiplier used

3. **"The big one"** (if student hasn't done negative x negative): "Ready for the mind-bender? Set BOTH to negative: `(-3) x (-2)`. Watch what happens to the arrow..."
   - Appears after 7 interactions if negative x negative not attempted

These prompts appear as dismissible cards above the controls, with a gentle slide-in from right (300ms). Each has a "Try it!" button (violet) and a small "x" dismiss button. Completing the suggested operation counts toward the interaction minimum.

### 4.3 Interaction Counter & Progress

Same design as NO-1.2a:
- Format: `Interactions: 6 / 10` with a segmented progress bar
- Each interaction fills one segment
- Segments pulse briefly when filled (emerald, 200ms)
- At 10/10: "Continue" button appears with bounce animation
- After 10 interactions, student CAN continue but CAN also keep exploring
- Extended exploration beyond 10 earns "Deep Dive" multiplier (1.5x XP) if total time >4 minutes with continued distinct interactions

---

## 5. Stage 3: Guided Discovery (3-5 min)

### 5.1 Structure

The guided discovery stage uses a sequence of 6 prompts. The core pedagogical device is the **descending pattern table** -- extending a multiplication table past zero to reveal that sign rules are not arbitrary choices but mathematical necessities.

Each prompt has:
1. A pattern or challenge question
2. An interactive element (pattern table or number line)
3. A reveal/insight moment

The student MUST complete each prompt before advancing. The AI tutor observes and provides Socratic nudges if stuck.

### 5.2 Prompt Sequence

#### Prompt 1: Foundation -- Positive x Positive

**Challenge text**: "Let's start with what you know. What is `4 x 3`? Use the number line: 4 jumps of 3."

**Setup**: Number line (-15 to 20), direction arrow at 0 pointing right (emerald). Controls pre-set: multiplier = 4 (positive), multiplicand = 3 (positive). Student presses JUMP.

**Expected answer**: 12

**On completion**: Four arcs draw rightward (0->3, 3->6, 6->9, 9->12). Equation appears: `4 x 3 = 12`. Checkmark. Text: "Four jumps of 3, all to the right. Multiplication IS repeated jumping."

**Insight level**: None (calibration/confidence-building)

#### Prompt 2: The Descending Pattern (Core Device)

**Challenge text**: "Now watch this pattern. I'll show you what happens when we keep the 3 and count DOWN the multiplier."

**Setup**: The number line minimizes to the top third of the screen. Below, a pattern table builds vertically, one row at a time:

| Display | Animation | Timing |
|---------|-----------|--------|
| `3 x 3 = 9` | Row fades in; on the number line above, three arcs flash briefly rightward landing at 9 | t=0s |
| `3 x 2 = 6` | Row fades in; two arcs on number line landing at 6 | t=1.5s |
| `3 x 1 = 3` | Row fades in; one arc landing at 3 | t=3.0s |
| `3 x 0 = 0` | Row fades in; no arcs, dot stays at 0. Zero highlighted amber. | t=4.5s |

After the fourth row, the pattern annotations appear on the right:
- Between rows 1-2: `-3` label (connecting line)
- Between rows 2-3: `-3` label
- Between rows 3-4: `-3` label

These `-3` labels fade in sequentially (200ms each, 100ms stagger).

Then text appears: "See the pattern? Each time the multiplier goes down by 1, the result goes down by 3."

**Button text**: "I see the pattern!" (violet, 48px height)

**Insight level**: Moderate -- establishing the pattern before the extrapolation

#### Prompt 3: Extending Past Zero (Key Insight #1)

**Challenge text**: "The multiplier just went 3, 2, 1, 0... What comes next? If the pattern continues, what is `3 x (-1)`?"

**Setup**: The pattern table from Prompt 2 is still visible. A new row appears below `3 x 0 = 0`:

`3 x (-1) = ?`

The `?` pulses amber (same animation as hook). The connecting line from `0` extends downward with its `-3` label, pointing at the `?`.

**Answer format**: Multiple choice (4 options, horizontal row):
- `[ -3 ]` (correct)
- `[ -1 ]`
- `[ 3 ]`
- `[ -6 ]`

Buttons: 64px x 48px, `background: #1e293b`, `border: 1.5px solid #475569`, `border-radius: 8px`, `color: #e2e8f0`, `font-size: 1.1rem`. Hover: `border-color: #818cf8`. Selected: `background: #312e81`, `border-color: #818cf8`.

**Expected answer**: -3

**On correct**: The `-3` answer fills into the pattern table with a brief flash (rose, since negative). On the number line, one arc draws LEFTWARD from 0 to -3 (the arrow flips!). Text: "The pattern continues! One jump of 3 in the REVERSED direction lands at -3."

A connecting `-3` line appears between `0` and `-3` in the pattern column.

**On incorrect**: "Look at the pattern on the right. Each result decreases by 3. After 0, what's 3 less?" The `-3` labels pulse simultaneously. After 3 seconds, the correct answer highlights.

**Insight level**: HIGH -- the student sees that negative results are DEMANDED by the pattern

#### Prompt 4: Confirm the Pattern

**Challenge text**: "And `3 x (-2)`? The pattern should tell you."

**Setup**: Same pattern table, now extending:

```
3 x  3 =  9   ─┐
                 │ -3
3 x  2 =  6   ─┤
                 │ -3
3 x  1 =  3   ─┤
                 │ -3
3 x  0 =  0   ─┤
                 │ -3
3 x (-1) = -3  ─┤
                 │ -3
3 x (-2) =  ?  ─┘
```

**Answer format**: Multiple choice:
- `[ -6 ]` (correct)
- `[ -9 ]`
- `[ -3 ]`
- `[ 6 ]`

**Expected answer**: -6

**On correct**: On the number line, the full sequence of jumps animates: starting at 0, two arcs draw leftward (0 -> -3, -3 -> -6). The arrow is pointing LEFT. Equation: `3 x (-2) = -6`.

Text appears: "Multiplying a positive by a negative gives a NEGATIVE result. The jumps go LEFT."

A brief rule card flashes (300ms glow): **"Positive x Negative = Negative"**

**Insight level**: HIGH -- first sign rule confirmed

#### Prompt 5: The Big Question -- Negative x Negative (Key Insight #2)

**Challenge text**: "Now the question that BREAKS people's brains. What is `(-3) x (-2)`?"

**Setup**: The pattern table clears and rebuilds, this time with multiplicand = -2:

```
3 x (-2) = -6   ─┐
                   │ +2
2 x (-2) = -4   ─┤
                   │ +2
1 x (-2) = -2   ─┤
                   │ +2
0 x (-2) =  0   ─┤
                   │ +2
(-1) x (-2) = ?  ─┤
                   │ +2
(-2) x (-2) = ?  ─┤
                   │ +2
(-3) x (-2) = ?  ─┘
```

The first four rows (3 through 0) auto-populate with their results. Each result increases by 2 (labeled `+2` on the connecting lines, colored emerald since the trend is upward/positive).

Then the pattern annotations (+2) all pulse simultaneously (three pulses, 300ms each).

Text: "The multiplier goes 3, 2, 1, 0... and the results go -6, -4, -2, 0... Each time, the result goes UP by 2."

Then the three `?` entries are revealed one at a time:

**Sub-question A**: `(-1) x (-2) = ?`
- Multiple choice: `[ 2 ]` (correct), `[ -2 ]`, `[ 0 ]`, `[ -4 ]`
- On correct: `2` fills in (emerald! It's positive!). A brief surprise animation: the `2` scales up to 1.3x for 200ms then settles. Text: "POSITIVE! The pattern forced it."

**Sub-question B**: `(-2) x (-2) = ?`
- Multiple choice: `[ 4 ]` (correct), `[ -4 ]`, `[ 2 ]`, `[ -2 ]`
- On correct: `4` fills in (emerald).

**Sub-question C**: `(-3) x (-2) = ?`
- Multiple choice: `[ 6 ]` (correct), `[ -6 ]`, `[ -3 ]`, `[ 3 ]`
- On correct: `6` fills in (emerald).

**After all three are correct**:

**Revelation animation** (auto-plays after 0.5s pause):
1. On the number line, the direction arrow appears at 0, initially pointing LEFT (rose -- because multiplicand is -2)
2. Text: "Multiplicand is negative... jumps go LEFT" (arrow points left)
3. Brief pause (0.5s)
4. Text: "But multiplier is ALSO negative... REVERSE!"
5. Arrow FLIPS to point RIGHT (spring animation, 300ms). The word "REVERSE!" appears in amber near the arrow, pulses once, and fades.
6. Three arcs draw RIGHTWARD: 0->2, 2->4, 4->6
7. Result: `(-3) x (-2) = 6`. The `6` is emerald.
8. Below: "Two negatives: one sets the direction LEFT, the other REVERSES it to RIGHT. Two reversals = POSITIVE!"
9. The rule card flashes with glow: **"Negative x Negative = Positive"**

**Sound**: Full revelation chord (ascending major progression, 600ms, with shimmering overtone)

**Aha moment detection**: If the student:
- Answered all three sub-questions correctly on first try: strong aha signal
- Got 2/3 on first try: moderate aha signal
- Needed 2+ attempts: learning signal, not aha

If strong aha detected, trigger the Aha Moment celebration (see Section 15).

**Insight level**: CRITICAL -- this is the breakthrough moment of the entire lesson.

#### Prompt 6: Division Connection

**Challenge text**: "One more thing. If `(-3) x (-2) = 6`, what is `6 / (-2)`?"

**Setup**: The completed equation `(-3) x (-2) = 6` is shown at the top. Below it, the question: `6 / (-2) = ?`

A visual "unwinding" animation plays: the three rightward arcs from the number line play IN REVERSE (6->4, 4->2, 2->0), unwinding the multiplication. The arrow, which was pointing right, flips back to left.

**Answer format**: Multiple choice:
- `[ -3 ]` (correct)
- `[ 3 ]`
- `[ -2 ]`
- `[ 2 ]`

**Expected answer**: -3

**On correct**: Text: "Division undoes multiplication. If `(-3) x (-2) = 6`, then `6 / (-2) = -3`. The sign rules are THE SAME: different signs = negative result."

Then a brief extension:
- `6 / (-3) = ?` -- answer: `-2` (auto-shown, not interactive)
- `(-6) / (-2) = ?` -- answer: `3` (auto-shown) -- "Same signs = positive!"
- `(-6) / 2 = ?` -- answer: `-3` (auto-shown) -- "Different signs = negative!"

These four division examples appear as a compact 2x2 grid:

```
+-----------------------+-----------------------+
|  6 / (-2) = -3       | (-6) / (-2) = 3       |
|  different = negative | same = positive       |
+-----------------------+-----------------------+
|  6 / (-3) = -2       | (-6) / 2 = -3         |
|  different = negative | different = negative  |
+-----------------------+-----------------------+
```

Each cell fades in sequentially (400ms stagger). "Same" labels are emerald, "different" labels are rose.

**Success text**: "Division follows the exact same sign rules as multiplication. Same signs = positive. Different signs = negative."

### 5.3 Progress Tracking

Each prompt completion is recorded:

```typescript
interface DiscoveryPromptResult {
  promptIndex: number;        // 0-5
  correct: boolean;
  attemptsNeeded: number;     // 1 = first try
  hintsUsed: number;          // 0-3
  timeToAnswerMs: number;
  selfDiscovered: boolean;    // true if answered before any hints
}
```

The AI tutor receives the full prompt result array to calibrate difficulty for Stage 6 practice.

---

## 6. Stage 4: Symbol Bridge (2-3 min)

### 6.1 Purpose

Formalize the spatial intuition into symbolic sign rules. Each rule is presented alongside its jump animation, making the symbol-to-spatial mapping explicit (CP-II). This stage does NOT introduce new concepts -- it provides formal notation for what the student already discovered.

### 6.2 Rule Presentation Sequence

The four rules appear one at a time, each with a synchronized animation. The stage is a vertical scroll (mobile) or paginated carousel (desktop) with left/right navigation.

#### Rule 1: Positive x Positive = Positive

**Left panel (40% width)**: KaTeX-rendered rule

```
(+) \times (+) = (+)
```

**Subtitle**: "Same direction. Jumps go RIGHT."

**Right panel (60% width)**: Mini number line animation
- Number line from -8 to 12
- Direction arrow at 0, pointing RIGHT (emerald)
- 3 arcs draw rightward: 0->2, 2->4, 4->6
- Result: `3 x 2 = 6` appears

**Visual emphasis**: Both `(+)` signs pulse emerald briefly. A connecting bracket labeled "same sign" appears above them in emerald. An emerald arrow labeled "POSITIVE" fades in above the number line.

**Example**: `3 \times 2 = 6`

**Duration**: 3s animation, then holds. Auto-advances after 4s or on tap.

#### Rule 2: Positive x Negative = Negative

**Left panel**: KaTeX-rendered rule

```
(+) \times (-) = (-)
```

**Subtitle**: "Jump direction is LEFT (negative multiplicand)."

**Right panel**: Mini number line animation
- Arrow at 0, pointing LEFT (rose)
- 3 arcs draw leftward: 0->(-2), (-2)->(-4), (-4)->(-6)
- Result: `3 x (-2) = -6`

**Visual emphasis**: The `(+)` pulses emerald, the `(-)` pulses rose. A bracket labeled "different signs" appears in rose. A rose arrow labeled "NEGATIVE" appears above the line.

**Example**: `3 \times (-2) = -6`

#### Rule 3: Negative x Positive = Negative

**Left panel**: KaTeX-rendered rule

```
(-) \times (+) = (-)
```

**Subtitle**: "Jumps go RIGHT, then REVERSE to LEFT."

**Right panel**: Mini number line animation
- Arrow at 0, initially pointing RIGHT (emerald)
- Text: "Positive multiplicand..." then "Negative multiplier = REVERSE!"
- Arrow flips LEFT (spring, 300ms). "REVERSED!" badge in amber.
- 3 arcs draw leftward: 0->(-2), (-2)->(-4), (-4)->(-6)
- Result: `(-3) x 2 = -6`

**Visual emphasis**: Same "different signs" bracket in rose.

**Example**: `(-3) \times 2 = -6`

**Morph animation**: After the result appears, the equation `(-3) \times 2 = -6` briefly morphs to show equivalence with Rule 2: the `-6` from both Rule 2 and Rule 3 pulse simultaneously. A bracket connects them: "Same result! Order doesn't matter for the sign."

#### Rule 4: Negative x Negative = Positive

**Left panel**: KaTeX-rendered rule

```
(-) \times (-) = (+)
```

**Subtitle**: "Jumps go LEFT, then REVERSE to RIGHT. Two reversals = original direction!"

**Right panel**: Mini number line animation
- Arrow at 0, pointing LEFT (rose) -- negative multiplicand
- Text: "Negative multiplicand = LEFT"
- Arrow flips RIGHT (spring, 300ms) -- negative multiplier reverses!
- "DOUBLE REVERSAL!" badge in amber, larger than single reversal, with a brief particle burst (4 particles, amber, expanding 10px and fading, 200ms)
- 3 arcs draw rightward: 0->2, 2->4, 4->6
- Result: `(-3) x (-2) = 6`

**Visual emphasis**: Both `(-)` signs pulse rose, then the `(+)` result pulses emerald. A bracket labeled "same sign (both negative)" appears in emerald. An emerald arrow labeled "POSITIVE!" appears above the line with a glow effect (0 -> 0.6 opacity amber glow behind the text, 400ms).

**Morph animation**: The equation `(-3) \times (-2)` briefly highlights both minus signs. They glow rose, slide toward each other, collide with a brief amber flash, and morph into a `+` sign (same visual pattern as the double-negative morph from NO-1.2a Symbol Bridge Rule 4). The equation transforms: `(-3) \times (-2)` -> visually suggests `3 \times 2 = 6`. This reinforces the cross-lesson connection.

**Example**: `(-3) \times (-2) = 6`

### 6.3 Summary Rule Card

After all 4 rules are presented, a compact "rule card" appears:

```
+--------------------------------------+
|  INTEGER MULTIPLICATION & DIVISION   |
|                                      |
|  SAME SIGNS     ->  POSITIVE (+)     |
|    (+) x (+)  or  (-) x (-)         |
|                                      |
|  DIFFERENT SIGNS -> NEGATIVE (-)     |
|    (+) x (-)  or  (-) x (+)         |
|                                      |
|  Same rules for division:            |
|    (+) / (+) = (+)  (-) / (-) = (+) |
|    (+) / (-) = (-)  (-) / (+) = (-) |
|                                      |
|  WHY: Negative = REVERSE direction.  |
|  Two reverses = original direction.  |
+--------------------------------------+
```

- Background: `rgba(15, 23, 42, 0.85)`, `backdrop-filter: blur(12px)`, `border: 1px solid #334155`, rounded 12px
- "SAME SIGNS" row has emerald left-border accent (3px)
- "DIFFERENT SIGNS" row has rose left-border accent (3px)
- The card is dismissible but recallable via a `?` floating button during Practice (Stage 6)

### 6.4 KaTeX Rendering Details

All mathematical expressions use KaTeX:
- `displayMode: true` for main rule expressions
- `displayMode: false` for inline references
- Custom color macros for sign coloring
- Font size: 1.4rem for rules, 1.0rem for subtitles
- Wrapped in Framer Motion `<motion.div>` for entrance animations (fade + slide from bottom, 300ms, stagger 100ms)

---

## 7. Stage 5: Real-World Anchor (1-2 min)

### 7.1 Purpose

Ground the sign rules in concrete, relatable scenarios. Each scenario maps to a different sign combination. The student sees three mini-scenarios in sequence.

### 7.2 Scenario 1: Video Rewind

**Context card**:
```
+--------------------------------------+
|  Rewind  VIDEO PLAYBACK              |
|                                      |
|  You're watching a video of someone  |
|  WALKING BACKWARD at 2 m/s.         |
|                                      |
|  You hit REWIND (play at -3x speed). |
|                                      |
|  In the rewind, which direction does |
|  the person appear to walk?          |
+--------------------------------------+
```

**Visualization**: A mini scene with a stick figure on a horizontal line. Initially, the figure walks LEFT (backward = negative direction, -2 m/s). Then "REWIND" text flashes, and the playback reverses: the figure now appears to walk RIGHT (because reversing backward motion = forward). Speed: `(-3) x (-2) = 6 m/s` in the forward direction.

**Connection text**: "Rewinding a backward walk looks like walking FORWARD. Negative times negative = positive. The reversal of a reversal goes back to the original direction."

**Equation shown**: `(-3) \times (-2) = 6` -- emerald result

### 7.3 Scenario 2: Debt Removal

**Context card**:
```
+--------------------------------------+
|  $  MONEY & DEBT                     |
|                                      |
|  You have 4 debts of $50 each.      |
|  Each debt is -$50.                  |
|                                      |
|  A generous aunt REMOVES all 4 debts.|
|  Removing = negative (taking away).  |
|                                      |
|  How does your balance change?       |
+--------------------------------------+
```

**Visualization**: A balance meter (vertical bar graph). Starting at -$200 (4 debts of -$50). Four red debt blocks are stacked below zero. One by one, each block dissolves with a satisfying pop (200ms each, 300ms between). The balance rises: -200 -> -150 -> -100 -> -50 -> 0. At zero, the amber zero-celebration plays (concentric rings).

**Equation shown**: `(-4) \times (-50) = +200` change in balance.

**Connection text**: "Removing debts (negative times negative) INCREASES your balance. Taking away something bad is something GOOD!"

### 7.4 Scenario 3: Temperature Rate

**Context card**:
```
+--------------------------------------+
|  Thermometer  TEMPERATURE CHANGE     |
|                                      |
|  The temperature drops 3 degrees     |
|  every hour (-3 deg/hr).            |
|                                      |
|  What was the temperature 5 hours    |
|  AGO (that's -5 hours)?             |
+--------------------------------------+
```

**Visualization**: A thermometer-style vertical number line (-20 to 20). Current temperature marked at 0 degrees. The question asks about 5 hours AGO (negative time). Rate is -3 deg/hr. Calculation: `(-5) \times (-3) = +15`. The thermometer mercury rises from 0 to 15 with a smooth animation (1.5s). The mercury changes from rose (at 0) to emerald (positive territory) as it crosses zero.

**Equation shown**: `(-5 \text{ hr}) \times (-3 \text{ deg/hr}) = +15 \text{ deg}`

**Connection text**: "Going BACK in time (negative) on a DROPPING temperature (negative) means it was WARMER (positive). Negative times negative = positive."

### 7.5 Scenario Presentation

All three scenarios presented as swipeable cards (mobile) or horizontal carousel (desktop). Each card auto-plays its animation when active. Navigation dots below: `o o o`.

After viewing all three, "Continue" button appears. The student does NOT need to answer questions -- this is observational/reinforcement.

---

## 8. Stage 6: Practice (Adaptive, ~9 problems)

### 8.1 Problem Selection

The practice engine selects problems across three layers. The IRT system targets 85% success rate.

**Composition**: 9 problems total:
- 3 Recall (layer 0): sign rules, basic facts
- 4 Procedure (layer 1): computation, multi-step, division
- 2 Understanding (layer 2): explanation, misconception correction

Problems are interleaved (not blocked by layer). First problem is always Recall (confidence builder).

### 8.2 Recall Problems (Layer 0)

#### Problem R1: Sign Rule Quick-Fire

**Type**: `integer-mul-sign-rule`

**Prompt**: "What is the SIGN of each result? (Don't calculate the number -- just the sign!)"

```
a) 5 x (-3)     [Positive / Negative]
b) (-4) x (-7)  [Positive / Negative]
c) (-6) x 2     [Positive / Negative]
d) 8 x 3        [Positive / Negative]
```

**Interface**: Four sub-questions. Each has a two-way toggle: `[+]` or `[-]`. Toggle buttons are 56px wide x 44px tall. Active positive button: emerald fill. Active negative button: rose fill. Inactive: `background: #1e293b`, `border: 1.5px solid #475569`.

**Answers**: a) Negative, b) Positive, c) Negative, d) Positive

**Scoring**: Each correct sub-answer = +2 XP. All four correct = bonus +3 XP (total: 11).

**Feedback (all correct)**: "Perfect! Same signs = positive, different signs = negative. You've got the rule."

**Feedback (partial)**: The incorrect sub-question highlights. For each missed one: "Look at the signs: [same/different] signs = [positive/negative]."

**Difficulty parameter** (IRT `b`): -1.5 (very easy)

#### Problem R2: Basic Multiplication

**Type**: `integer-mul-basic`

**Prompt**: "Solve: `(-4) x 3`"

**Interface**: Mini number line (-15 to 15) with direction arrow and jump visualization. Student can optionally use the jump tool, then selects the answer.

**Answer format**: Multiple choice:
- `[ -12 ]` (correct)
- `[ 12 ]`
- `[ -7 ]`
- `[ -1 ]`

**Answer**: -12

**On correct**: Checkmark, +5 XP. "Different signs (negative times positive) = negative result. 4 x 3 = 12, so the answer is -12."

**On incorrect**: "The signs are different (negative and positive), so the result must be negative. Now just find 4 x 3 = 12 and make it negative." Number line replays: 3 arcs leftward from 0, each of size 3, landing at -3, -6, -9, -12. Wait -- that shows `(-4) x 3` as 4 jumps of 3 going LEFT (due to negative multiplier reversal). Actually: arrow starts RIGHT (positive multiplicand = 3), then REVERSES (negative multiplier = -4), so 4 arcs draw leftward: 0 -> -3, -3 -> -6, -6 -> -9, -9 -> -12.

**Difficulty parameter**: -1.0

#### Problem R3: Basic Division

**Type**: `integer-div-basic`

**Prompt**: "Solve: `(-18) / 3`"

**Answer format**: Multiple choice:
- `[ -6 ]` (correct)
- `[ 6 ]`
- `[ -15 ]`
- `[ -3 ]`

**Answer**: -6

**On correct**: +5 XP. "Different signs: negative divided by positive = negative. 18 / 3 = 6, so the answer is -6."

**On incorrect**: "Same sign rules as multiplication! Different signs = negative result."

**Difficulty parameter**: -0.5

### 8.3 Procedure Problems (Layer 1)

#### Problem P1: Negative x Negative Computation

**Type**: `integer-mul-neg-neg`

**Prompt**: "Solve: `(-7) x (-4)`"

**Interface**: Numeric input with +/- sign toggle button. Input field: 80px wide, 44px tall, centered. The +/- toggle: 44px x 44px button to the left of the input, toggles the sign prefix shown in the input.

**Answer**: 28

**Validation**: Exact match. Must be positive (if student enters -28, feedback addresses the sign error specifically).

**On correct**: +8 XP. "Same signs (both negative) = positive result. 7 x 4 = 28, and it stays positive."

**On incorrect (-28)**: "You got the magnitude right (28) but the sign wrong. Both numbers are negative -- same signs = positive result!"

**On incorrect (other)**: "Let's break it down. First: what's 7 x 4? Then: both numbers are negative (same sign), so the result is positive."

**Difficulty parameter**: 0.0

#### Problem P2: Division with Negative Dividend and Divisor

**Type**: `integer-div-neg-neg`

**Prompt**: "Solve: `(-24) / (-6)`"

**Answer format**: Numeric input with +/- toggle.

**Answer**: 4

**On correct**: +8 XP. "Same signs = positive. 24 / 6 = 4, and it stays positive."

**On incorrect**: "Both numbers are negative. Same signs = positive result. Now just divide: 24 / 6 = ?"

**Difficulty parameter**: 0.3

#### Problem P3: Mixed Operations Chain

**Type**: `integer-mul-div-chain`

**Prompt**: "Evaluate step by step: `(-2) x 5 x (-3)`"

**Interface**: Multi-step display. Student computes each step:

```
Step 1:  (-2) x 5 = [____]     [Check]
Step 2:  [result] x (-3) = [____]  [Check]
Final answer: [____]            [Submit]
```

**Step breakdown**:
1. `(-2) x 5 = -10` (different signs = negative)
2. `(-10) x (-3) = 30` (same signs = positive)

**Answer**: 30

**On correct (all steps)**: +10 XP. "Great chain! Notice: the first step gave negative, but then multiplying by another negative FLIPPED it back to positive."

**On incorrect (any step)**: That step's animation replays on the number line. Student re-enters.

**Difficulty parameter**: 0.7

#### Problem P4: Word Problem

**Type**: `integer-mul-word-problem`

**Prompt**: "A scuba diver descends 8 meters per minute. She dives for 6 minutes. How far below the surface is she? Express as an integer."

**Interface**: Multiple choice:
- `[ -48 ]` (correct)
- `[ 48 ]`
- `[ -14 ]`
- `[ -2 ]`

**Answer**: -48

**Setup**: The word "descends" is highlighted in rose to hint at the negative direction. "8 meters per minute" and "6 minutes" are highlighted in `#818cf8` (indigo) to identify the operands.

**On correct**: +10 XP. "Descending is negative direction: (-8) x 6 = -48. She's 48 meters below the surface."

A mini visualization: a vertical number line (0 at surface, negative below). A small diver icon descends 6 jumps of 8, each arc drawn downward. Landing at -48.

**On incorrect (48)**: "You got the distance right, but think about the direction. Descending means going BELOW the surface -- that's negative!"

**Difficulty parameter**: 0.5

### 8.4 Understanding Problems (Layer 2)

#### Problem U1: Explain the Sign Rule

**Type**: `integer-mul-explain-sign`

**Prompt**: "A classmate says: 'Negative times negative should be negative, because you're multiplying bad things and that should give something bad.' Use the pattern method OR the direction reversal method to explain why this is wrong."

**Interface**: Free-text input area, minimum 25 characters, maximum 500 characters. Character counter at bottom right.

**Evaluation**: AI-evaluated via `lesson.submitReflection` endpoint. Scoring criteria:
- Score 1 (weak): Restates the rule without explanation ("because two negatives make a positive")
- Score 2 (partial): References one model vaguely ("the pattern shows it")
- Score 3 (good): Explains using one model clearly ("If you extend 3x2=6, 3x1=3, 3x0=0 past zero, the pattern forces 3x(-1)=-3, and continuing that logic with negative multipliers forces negative x negative to be positive")
- Score 4 (strong): Explains using one model AND provides the "why" intuition ("Negative means REVERSE direction. First negative reverses to left. Second negative reverses AGAIN back to right. Two reversals = original = positive")
- Score 5 (exceptional): Connects both models (pattern inevitability AND directional reversal) or provides novel insight

**XP**: `score * 16` (max 80 XP at score 5)

**On submission**: AI provides brief, encouraging feedback:
- Score 1-2: "You're on the right track. Try showing the pattern: 3x2=6, 3x1=3, 3x0=0, 3x(-1)=?... what does the pattern demand?"
- Score 3: "Good explanation! The pattern argument is compelling."
- Score 4-5: "Excellent reasoning! You didn't just state the rule -- you showed WHY it must be true."

**Difficulty parameter**: 1.5

#### Problem U2: True/False Reasoning

**Type**: `integer-mul-div-true-false`

**Prompt**: "For each statement, decide TRUE or FALSE:"

```
a) The product of two negative numbers is always positive.
   [ TRUE ]  [ FALSE ]

b) If a x b is negative, then BOTH a and b must be negative.
   [ TRUE ]  [ FALSE ]

c) (-1) x any number = the opposite of that number.
   [ TRUE ]  [ FALSE ]

d) If a / b is positive, then a and b have the same sign.
   [ TRUE ]  [ FALSE ]
```

**Interface**: Four sub-questions. Each has a TRUE/FALSE toggle: two buttons, 72px x 44px each, side by side. Active TRUE: emerald fill. Active FALSE: rose fill.

**Answers**: a) TRUE, b) FALSE, c) TRUE, d) TRUE

**Feedback per sub-question**:

a) TRUE: "Correct. Same signs = positive. Always."

b) FALSE: "Tricky! If a x b is negative, one must be positive and one negative -- but not BOTH negative. Example: `3 x (-2) = -6`. The 3 is positive!"

c) TRUE: "Yes! Multiplying by -1 flips the sign: `(-1) x 5 = -5`, `(-1) x (-3) = 3`. It gives the opposite."

d) TRUE: "Correct. Positive quotient means same signs: both positive or both negative."

**Scoring**: Each correct = +3 XP. All four = bonus +4 XP (total: 16 XP).

**Difficulty parameter**: 1.2

### 8.5 Practice Session Flow

```
+--------------------------------------+
|  Practice: Integer Mul/Div           |
|  Problem 3 of 9                      |
|  ###_______ 33%                      |
+--------------------------------------+
|                                      |
|  [Problem content area]              |
|                                      |
+--------------------------------------+
|  [?] Rule Card    [Chat] Ask Tutor   |
+--------------------------------------+
```

**Progress bar**: Top of the practice area. 9 segments. Completed segments: emerald (correct) or amber (correct with hints). Current segment: pulsing violet. Future segments: slate-700.

**Rule card button** `[?]`: Toggles the rule card from Stage 4 as a floating overlay. Semi-transparent background. Dismissible by tapping outside.

**Ask Tutor button**: Opens the AI tutor bottom sheet. Tutor has context about the current problem and provides Socratic hints. Each hint used is tracked and reduces auto-derived grade (GOOD -> HARD). The tutor NEVER gives the answer directly (CP-I).

**Between problems**: 200ms fade transition. Correct: small "+8 XP" floats up in emerald. Incorrect: no XP display (no punishment).

### 8.6 Problem Ordering Algorithm

1. Start with R1 (sign rule quick-fire -- confidence builder)
2. Alternate Recall and Procedure: R2, P1, R3, P2
3. Insert Understanding at positions 6 and 8: P3, U1, P4, U2
4. End with the True/False understanding problem (U2 -- sense of completion on an engaging problem type)

Actual order: R1, R2, P1, R3, P2, U1, P3, P4, U2

If the student gets 3+ problems wrong consecutively, the IRT system lowers difficulty and inserts an additional Recall problem.

---

## 9. Stage 7: Reflection (~1 min)

### 9.1 Prompt

**Primary reflection prompt**: "Explain to a friend who believes 'negative times negative is negative' why they're wrong. Use either the pattern method (3x2, 3x1, 3x0, 3x(-1)...) or the direction reversal method to convince them."

### 9.2 Interface

```
+--------------------------------------+
|  REFLECTION                          |
|                                      |
|  Explain to a friend who believes    |
|  "negative x negative = negative"    |
|  why they're wrong.                  |
|                                      |
|  Use either the pattern method or    |
|  the direction reversal method to    |
|  convince them.                      |
|                                      |
|  +----------------------------------+|
|  |                                  ||
|  |  [Student types here...]         ||
|  |                                  ||
|  |                                  ||
|  |                                  ||
|  +----------------------------------+|
|                                      |
|  Characters: 0 / 30 minimum          |
|                                      |
|  [Submit Reflection]                 |
|                                      |
|  [Skip (smaller, muted)]            |
+--------------------------------------+
```

**Text area**:
- Minimum 30 characters required to submit (enforced; button disabled until met)
- Maximum 1000 characters
- Placeholder text: "Think about what happens when you extend the multiplication pattern past zero..."
- Auto-growing height (starts at 100px, grows to max 250px)
- Character counter updates live. Below 30: `"0 / 30 minimum"` in amber. At 30+: `"45 characters"` in slate-400. Near max: `"980 / 1000"` in amber.

**Submit button**: Disabled until 30 chars. Enabled state: violet gradient, same as Jump button.

**Skip button**: Below submit, smaller (`font-size: 0.8rem`), muted (`color: #64748b`), no background. Tapping skip still completes the stage but awards 0 reflection XP.

### 9.3 AI Evaluation

The reflection is sent to `lesson.submitReflection` endpoint. The AI evaluates on a 0-5 scale:

**Scoring criteria**:
- Score 1: Restates rule without reasoning ("because two negatives make a positive, everyone knows that")
- Score 2: References pattern or reversal vaguely ("the pattern forces it" without showing the pattern)
- Score 3: Explains one model clearly (either the descending pattern with specific numbers, or the direction reversal with "flip" language)
- Score 4: Explains one model clearly AND addresses WHY the friend's intuition is wrong ("your friend thinks of 'negative' as 'bad,' but in math negative means DIRECTION, and reversing a reversal goes forward")
- Score 5: Connects both models or provides a genuinely novel framing

**Additional scoring signals**:
- References the descending pattern with specific numbers (e.g., "3x2=6, 3x1=3..."): +1 quality signal
- References direction reversal / flipping: +1 quality signal
- Provides a concrete example with actual numbers: +1 quality signal
- Uses the word "reverse," "flip," "pattern," or "direction": +0.5 quality signal
- References the real-world analogy (rewind, debt): +0.5 quality signal
- References prior concept (NO-1.2a double-negative rule): triggers `referencesPriorConcept: true` -> Connection Maker multiplier (1.3x)

### 9.4 Post-Reflection Feedback

After submission, the AI provides personalized feedback (3-5 sentences):

**Example (score 4)**:
> "Strong argument! You showed the descending pattern clearly and pointed out that the friend's mistake is treating 'negative' as 'bad' rather than as 'reversed direction.' To make it even stronger, you could add the number line visual: negative multiplicand means jump LEFT, negative multiplier means REVERSE -- two reversals = original direction = positive."

**Example (score 2)**:
> "You've got the right idea that the pattern forces the result. To make your argument more convincing, try writing out the specific pattern: 3x2=6, 3x1=3, 3x0=0. Each answer drops by 3. So 3x(-1) has to be -3, and continuing downward, (-1)x(-3) has to be positive. Showing those actual numbers makes your case much stronger."

The feedback appears in a card below the text area with a soft entrance animation (fade + slide from bottom, 300ms).

### 9.5 XP Summary

After feedback, the lesson completion XP summary appears:

```
+--------------------------------------+
|  LESSON COMPLETE!                     |
|                                      |
|  Integer Multiplication & Division   |
|                                      |
|  Lesson completion:        100 XP    |
|  Exploration bonus:         30 XP    |
|  Discovery insight:         25 XP    |
|  Reflection quality (4/5):  64 XP    |
|  Connection Maker (1.3x):  applied   |
|  ------------------------------------+
|  Total:                    285 XP    |
|  Neurons earned:            29       |
|                                      |
|  [View in Knowledge Nebula]          |
|  [Continue to Next Lesson ->]        |
+--------------------------------------+
```

XP values animate in as a counter (0 -> final value, 50ms per digit place). Total has a slight delay (200ms) and pulses once with a glow.

---

## 10. Technical Specifications

### 10.1 Component Architecture

```
src/content/domains/numbers-operations/NO-1.2b/
+-- lesson.mdx              # Stage content & narrative text
+-- animations.json          # MathScene configs per stage
+-- problems.json            # Practice problem bank (all layers)
+-- meta.json                # Prerequisites, successors, hooks

src/components/lesson/stages/
+-- Hook.tsx                 # Renders hook animation (reads animations.json)
+-- SpatialExperience.tsx    # Interactive canvas (repeated jumps number line)
+-- GuidedDiscovery.tsx      # Prompt sequence with validation
+-- SymbolBridge.tsx         # Rule presentation carousel
+-- RealWorldAnchor.tsx      # Scenario cards with mini-animations
+-- Practice.tsx             # Problem card sequencer
+-- Reflection.tsx           # Text input + AI evaluation
```

**Lesson-specific components** (new or reused for this lesson):

```
src/components/math-scene/svg/
+-- NumberLineJumps.tsx      # Repeated jump animation on number line
+-- DirectionArrow.tsx       # The flippable direction arrow (key pedagogical element)
+-- JumpArc.tsx              # Single arc path renderer for jump visualization
+-- PatternTable.tsx         # Descending pattern table for guided discovery

# Reused from NO-1.2a:
+-- NumberLineWalker.tsx     # Base number line rendering (ticks, labels, zero emphasis)
+-- ZeroCrossingEffect.tsx   # Pulse + flash animation at zero
```

### 10.2 Jump Animation Implementation

```typescript
// NumberLineJumps.tsx - Core animation logic

interface JumpProps {
  multiplier: number;       // Signed
  multiplicand: number;     // Signed
  onJumpComplete?: (result: number) => void;
}

interface JumpCommand {
  from: number;             // Always starts at 0
  jumpSize: number;         // Absolute value of multiplicand
  jumpCount: number;        // Absolute value of multiplier
  direction: 'right' | 'left'; // Determined by sign rules
}

// Determine direction based on sign rules
const computeDirection = (multiplier: number, multiplicand: number): 'right' | 'left' => {
  const resultSign = Math.sign(multiplier * multiplicand);
  return resultSign >= 0 ? 'right' : 'left';
};

// Jump animation uses Framer Motion's useAnimate hook
// Each jump is a discrete animation in a sequence:

const jumpSequence = async (command: JumpCommand) => {
  const jumpDuration = 0.4; // 400ms per jump
  const pauseBetweenJumps = 0.15; // 150ms pause

  for (let i = 0; i < command.jumpCount; i++) {
    const startX = command.direction === 'right'
      ? command.jumpSize * i
      : -(command.jumpSize * i);
    const endX = command.direction === 'right'
      ? command.jumpSize * (i + 1)
      : -(command.jumpSize * (i + 1));

    // 1. Draw arc for this jump
    await drawJumpArc(startX, endX, command.direction, i + 1, command.jumpSize);

    // 2. Place landing dot
    addLandingDot(endX, command.direction === 'right' ? '#10b981' : '#f43f5e');

    // 3. Update running product label
    updateRunningLabel(endX);

    // 4. Check for zero crossing
    if ((startX < 0 && endX >= 0) || (startX > 0 && endX <= 0) ||
        (startX >= 0 && endX < 0) || (startX <= 0 && endX > 0)) {
      triggerZeroCrossingEffect();
    }

    // 5. Pause between jumps
    if (i < command.jumpCount - 1) {
      await delay(pauseBetweenJumps * 1000);
    }
  }
};
```

### 10.3 Direction Arrow Flip Animation

```typescript
// DirectionArrow.tsx - Arrow flip animation

interface DirectionArrowProps {
  direction: 'right' | 'left';
  reversed: boolean; // Was direction reversed by negative multiplier?
  position: number;  // x-position on number line (usually 0)
}

// The flip is the central pedagogical moment:
// When the multiplier sign toggles to negative, the arrow flips.

const flipAnimation = {
  scaleX: -1,
  transition: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 300,
    duration: 0.3,
  },
};

// Arrow SVG: large triangle pointing in direction
// 48px long, 20px tall, positioned 30px above the number line
// Fill: emerald for RIGHT, rose for LEFT
// Stroke: 2px, slightly darker shade

// "REVERSED!" badge:
// Appears when arrow flips due to negative multiplier
// Position: 15px above the arrow
// Font: 0.65rem, color: #fbbf24 (amber)
// Animation: fade in (200ms), hold (800ms), fade out (300ms)
// "DOUBLE REVERSAL!" for negative x negative:
// Font: 0.7rem, same color, with 4-particle amber burst
```

### 10.4 Animation Timing Reference

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Pattern row entrance (hook) | 300ms | ease-out (fade + slide up 8px) | Auto-sequence |
| Question mark pulse | 1500ms loop | ease-in-out (scale) | Waiting for answer |
| Answer reveal (flash) | 300ms | ease-out (scale 1.15 -> 1.0) | Answer displayed |
| Direction arrow flip | 300ms | spring(300, 15) | Sign toggle |
| Jump arc draw | 400ms | linear (dasharray) | Per jump |
| Landing dot pop | 200ms | spring(400, 20) (scale 0 -> 1.2 -> 1.0) | Jump lands |
| Zero crossing flash | 300ms | ease-out | Cross zero |
| Zero crossing pulse | 400ms | ease-in-out | Cross zero |
| Pattern table `-3` label | 200ms each, 100ms stagger | ease-out (fade) | Pattern shown |
| Revelation chord | 600ms | n/a (audio) | Key insight moments |
| Sign morph (double negative) | 800ms | custom sequence | Symbol Bridge Rule 4 |
| Rule card entrance | 300ms | ease-out (slide up) | After rules shown |
| Debt block dissolve | 200ms per block, 300ms between | ease-out (scale + fade) | Real-World scenario 2 |
| XP counter | 50ms/digit | linear | Lesson complete |
| Equation transition | 350ms | ease-in-out | Result update |
| "REVERSED!" badge | 200ms in, 800ms hold, 300ms out | ease-out / ease-in | Arrow flip |
| Multiple choice select | 150ms | ease-out (border-color, background) | Tap option |
| Progress segment fill | 200ms | ease-out | Interaction counted |

### 10.5 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--positive` | `#10b981` (emerald-500) | Positive results, rightward jumps, correct answers, positive sign toggle |
| `--positive-subtle` | `rgba(16, 185, 129, 0.04)` | Positive region background on number line |
| `--positive-arc` | `rgba(16, 185, 129, 0.8)` | Rightward jump arcs |
| `--negative` | `#f43f5e` (rose-500) | Negative results, leftward jumps, negative sign toggle |
| `--negative-subtle` | `rgba(244, 63, 94, 0.04)` | Negative region background on number line |
| `--negative-arc` | `rgba(244, 63, 94, 0.8)` | Leftward jump arcs |
| `--zero` | `#fbbf24` (amber-400) | Zero emphasis, pattern question marks, reversal badges |
| `--arrow-right` | `#10b981` (emerald-500) | Direction arrow when pointing right |
| `--arrow-left` | `#f43f5e` (rose-500) | Direction arrow when pointing left |
| `--primary-action` | `linear-gradient(135deg, #7c3aed, #6d28d9)` | Jump button, Submit button |
| `--surface` | `rgba(15, 23, 42, 0.85)` | Panel backgrounds |
| `--surface-blur` | `blur(12px)` | Panel backdrop filter |
| `--text-primary` | `#f8fafc` (slate-50) | Headings, primary content |
| `--text-secondary` | `#e2e8f0` (slate-200) | Body text, operators |
| `--text-muted` | `#94a3b8` (slate-400) | Labels, captions, subtitles |
| `--line` | `#94a3b8` (slate-400) | Number line stroke |
| `--tick` | `#64748b` (slate-500) | Tick marks |
| `--label` | `#cbd5e1` (slate-300) | Number labels |
| `--pattern-connector` | `#475569` (slate-600) | Connecting lines in pattern table |

**Color-blind safety** (CP-IV): Positive and negative are distinguished not only by color (emerald vs rose) but also by:
- Direction: arcs drawn ABOVE the line (rightward/positive) vs BELOW (leftward/negative)
- Arrow shape: arrowhead pointing right vs left (spatial cue independent of color)
- Labels: "RIGHT"/"LEFT", "POSITIVE"/"NEGATIVE", "REVERSED!" text cues
- Symbols: `+` and `-` sign labels on toggles

### 10.6 Sound Design

| Event | Sound | Duration | Volume | File |
|-------|-------|----------|--------|------|
| Pattern row appear | Soft descending chime (pitch drops per row) | 100ms | 0.25 | `pattern-step.mp3` |
| Question mark hold | Subtle tension hum (very quiet) | looping | 0.1 | `tension-hum.mp3` |
| Answer reveal | Resolution note (single tone) | 150ms | 0.3 | `answer-reveal.mp3` |
| Jump landing | Soft thump (lower pitch than step sounds) | 100ms | 0.3 | `jump-land.mp3` |
| Arrow flip | Quick swoosh (high to low frequency sweep) | 200ms | 0.3 | `arrow-flip.mp3` |
| Double reversal | Double swoosh (two quick sweeps) | 350ms | 0.35 | `double-flip.mp3` |
| Zero crossing | Subtle bell-like chime (reused from NO-1.2a) | 200ms | 0.4 | `zero-cross.mp3` |
| Correct answer | Sine wave + click (reused) | 150ms | 0.3 | `correct.mp3` |
| Wrong answer | Low soft tone, NOT buzzer (reused) | 200ms | 0.2 | `incorrect.mp3` |
| Pattern insight | Ascending major triad | 400ms | 0.35 | `insight.mp3` |
| Breakthrough (neg x neg = pos) | Resonant chord progression (reused `aha.mp3`) | 600ms | 0.4 | `aha.mp3` |
| Lesson complete | Crescendo, electronic (reused) | 1200ms | 0.4 | `lesson-complete.mp3` |
| Debt block pop | Soft pop (reused from chip-pop) | 50ms | 0.3 | `chip-pop.mp3` |

All sounds are opt-out (on by default, mutable via `soundEnabled` preference). Sound toggle accessible via settings icon in lesson header.

### 10.7 Responsive Breakpoints

| Breakpoint | Layout Behavior |
|------------|----------------|
| < 375px (small phone) | Full-width number line, controls stacked vertically, reduced font sizes (0.85x), direction arrow 36px |
| 375-767px (phone) | Full-width number line, controls stacked, sign toggles on same row as stepper |
| 768-1023px (tablet portrait) | Number line 60% width, controls 40% right panel |
| 1024-1439px (tablet landscape / small desktop) | Number line 65% width, controls + equation display 35% right panel |
| >= 1440px (desktop) | Centered max-width 1200px, number line with generous padding, controls inline below |

**Touch targets**: All interactive elements (buttons, toggles, stepper +/- buttons) have minimum 44x44px touch areas (DR-5).

### 10.8 Performance Budget

| Metric | Target | How Measured |
|--------|--------|-------------|
| SVG element count (number line + arcs) | < 120 | Dev tools element count |
| SVG element count (pattern table) | < 80 | Dev tools element count |
| Animation FPS (jump sequence) | >= 55fps P95 | Framer Motion performance monitor |
| Animation FPS (arrow flip) | >= 55fps P95 | Framer Motion performance monitor |
| JS bundle (lesson-specific) | < 22KB gzipped | Webpack analyzer |
| Time to interactive (Stage 2) | < 500ms | Lighthouse |
| Memory (9 arcs + landing dots + labels) | < 4MB | Chrome DevTools heap |

**Degradation strategy**: On devices detected as low-GPU tier (via `detect-gpu`):
- Reduce landing dot animation (instant appear, no pop)
- Disable backdrop-filter blur (replace with solid semi-transparent background)
- Arc draw animation simplified (instant full arc, no dasharray animation)
- Disable "REVERSED!" badge particle burst
- Cap DPR at 1x

---

## 11. Accessibility

### 11.1 Screen Reader Support

**Number line**:
- `role="figure"`, `aria-label="Interactive number line from negative 20 to positive 20 for multiplication"`
- Direction arrow: `aria-label="Direction arrow pointing [right/left]. [Reversed by negative multiplier / Not reversed]"`
- After jump: `aria-live="polite"` region announces: "Performed [N] jumps of [M]. [Multiplier] times [multiplicand] equals [result]. Result is [positive/negative]."
- Zero crossing: announced: "Crossed zero during jump."
- Arrow flip: announced: "Direction reversed by negative multiplier." or "Double reversal: direction returned to original."

**Pattern table**:
- `role="table"`, `aria-label="Multiplication pattern table"`
- Each row: `role="row"`, with cells for multiplier, multiplicand, and result
- Pattern annotation: `aria-label="Each result decreases by 3"`
- Question mark: `aria-label="Unknown result. What should come next in the pattern?"`

**Controls**:
- All buttons, toggles, and steppers have explicit `aria-label` attributes (specified in Section 4.1.3)
- Keyboard navigation: Tab order follows visual flow
- Focus indicators: 2px violet outline, 2px offset

### 11.2 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between controls (multiplier stepper, multiplier sign, multiplicand stepper, multiplicand sign, jump button, reset) |
| Space/Enter | Activate focused button/toggle |
| Up/Down Arrow | Adjust stepper value |
| Left/Right Arrow | Toggle sign (+/-) when sign toggle is focused |
| Escape | Dismiss rule card overlay; close tutor panel |
| `1`-`9` | Quick-set stepper value (when stepper focused) |

**Number line keyboard interaction** (when SVG is focused):
- Not directly manipulable via keyboard (interactions go through controls)
- Arrow keys scroll/pan the number line view

### 11.3 Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- Jump animation: arcs appear fully drawn instantly (no dasharray animation), landing dots appear without pop
- Arrow flip: instant direction change (no spring animation), "REVERSED!" text appears without animation
- Pattern table: rows appear instantly (no fade/slide entrance)
- Answer reveal: no flash/scale effect, answer simply appears
- Zero crossing: no flash/pulse, just a brief amber background highlight (200ms)
- Rule morph (double negative sign collision): instant transformation
- Debt blocks: instant removal (no dissolve cascade)

### 11.4 Dyslexia Support

When dyslexia-friendly mode is enabled (user preference):
- Body text font switches to OpenDyslexic
- KaTeX rendering remains in its default math font
- Line spacing increases to 1.8x
- Letter spacing increases by 0.05em
- Maximum line width constrained to 65 characters

---

## 12. Content Files

### 12.1 meta.json

```json
{
  "id": "NO-1.2b",
  "name": "Integer Multiplication & Division",
  "domain": "numbers-operations",
  "gradeLevel": 6,
  "sortOrder": 4,
  "contentPath": "numbers-operations/NO-1.2b",
  "prerequisites": ["NO-1.2a"],
  "successors": ["NO-1.6", "AL-3.2", "NT-2.5"],
  "estimatedDurationMinutes": 19,
  "hook": {
    "text": "3x2=6, 3x1=3, 3x0=0, 3x(-1)=?... the pattern DEMANDS it. But why does (-) x (-) = (+)?",
    "fallbackHook": "Multiplying by a negative reverses direction. Two reversals = original direction = positive."
  },
  "visualRepresentations": [
    "number-line-repeated-jumps",
    "direction-arrow-reversal",
    "descending-pattern-table"
  ],
  "coreInsight": "Multiplying by a negative REVERSES direction. Negative x negative = positive because two reversals cancel out. The descending pattern table proves these rules are not arbitrary -- they are mathematically inevitable.",
  "commonMisconceptions": [
    {
      "id": "neg-times-neg-is-neg",
      "description": "Students believe negative x negative should be negative because 'two bad things make a bad thing'",
      "detection": "Student answers (-3) x (-2) as -6",
      "remediation": "Use the descending pattern table: show that the pattern 3x(-2)=-6, 2x(-2)=-4, 1x(-2)=-2, 0x(-2)=0 FORCES (-1)x(-2)=2. Also show the double direction reversal on the number line."
    },
    {
      "id": "mul-sign-vs-add-sign",
      "description": "Students confuse multiplication sign rules with addition sign rules (e.g., think (-3) x (-2) = -5 because they add instead of multiply)",
      "detection": "Student gives -5 for (-3) x (-2) or -1 for (-3) x (-2), or adds magnitudes instead of multiplying",
      "remediation": "Explicitly distinguish: addition = walking/combining; multiplication = REPEATED jumping. Show the number line with jumps (not steps) to reinforce the different operation."
    },
    {
      "id": "why-sign-rules-work",
      "description": "Students memorize 'same sign positive, different sign negative' without understanding WHY",
      "detection": "Student applies rules correctly but cannot explain when prompted, or fails on novel applications like multi-step problems",
      "remediation": "Return to the pattern table. The descending pattern is the simplest proof: mathematical consistency DEMANDS these rules. Also revisit the direction reversal model."
    }
  ],
  "crossDomainConnections": [
    {
      "targetId": "NO-1.6",
      "connection": "Order of operations requires correct evaluation of signed multiplication and division within expressions"
    },
    {
      "targetId": "AL-3.2",
      "connection": "Evaluating algebraic expressions often requires multiplying and dividing negative values when substituting"
    },
    {
      "targetId": "NT-2.5",
      "connection": "Exponents with negative bases (e.g., (-2)^3) depend on understanding repeated multiplication of negative integers"
    },
    {
      "targetId": "NO-1.2a",
      "connection": "The double-reversal principle (neg x neg = pos) mirrors the double-negative principle (subtracting a negative = adding) from addition/subtraction"
    }
  ]
}
```

### 12.2 animations.json (Partial -- Hook Scene)

```json
{
  "scenes": {
    "hook": {
      "id": "NO-1.2b-hook",
      "renderer": "svg",
      "viewBox": [-4, -2, 8, 16],
      "background": "transparent",
      "objects": [
        {
          "type": "annotation",
          "id": "hook-title",
          "position": [0, 0],
          "latex": "\\text{A Pattern...}",
          "visible": false,
          "anchor": "center",
          "style": {
            "fontSize": "1.6rem",
            "fill": "#e2e8f0",
            "fontWeight": 300
          }
        },
        {
          "type": "group",
          "id": "pattern-rows",
          "children": [
            {
              "type": "annotation",
              "id": "row-3x3",
              "position": [0, 2],
              "latex": "3 \\times 3 = \\textcolor{#10b981}{9}",
              "visible": false,
              "anchor": "center"
            },
            {
              "type": "annotation",
              "id": "row-3x2",
              "position": [0, 3.2],
              "latex": "3 \\times 2 = \\textcolor{#10b981}{6}",
              "visible": false,
              "anchor": "center"
            },
            {
              "type": "annotation",
              "id": "row-3x1",
              "position": [0, 4.4],
              "latex": "3 \\times 1 = \\textcolor{#10b981}{3}",
              "visible": false,
              "anchor": "center"
            },
            {
              "type": "annotation",
              "id": "row-3x0",
              "position": [0, 5.6],
              "latex": "3 \\times 0 = \\textcolor{#fbbf24}{0}",
              "visible": false,
              "anchor": "center"
            },
            {
              "type": "annotation",
              "id": "row-3xn1",
              "position": [0, 6.8],
              "latex": "3 \\times (-1) = \\textcolor{#fbbf24}{?}",
              "visible": false,
              "anchor": "center"
            },
            {
              "type": "annotation",
              "id": "row-3xn2",
              "position": [0, 8.0],
              "latex": "3 \\times (-2) = \\textcolor{#fbbf24}{?}",
              "visible": false,
              "anchor": "center"
            }
          ]
        },
        {
          "type": "group",
          "id": "pattern-connectors",
          "children": [
            {
              "type": "line",
              "id": "conn-1",
              "from": [2.5, 2.3],
              "to": [2.5, 3.0],
              "visible": false,
              "style": { "stroke": "#475569", "strokeWidth": 0.5 }
            },
            {
              "type": "annotation",
              "id": "conn-1-label",
              "position": [3.2, 2.6],
              "latex": "-3",
              "visible": false,
              "anchor": "left",
              "style": { "fontSize": "0.7rem", "fill": "#94a3b8" }
            }
          ]
        },
        {
          "type": "annotation",
          "id": "pattern-demand-text",
          "position": [0, 10],
          "latex": "\\text{The pattern DEMANDS it.}",
          "visible": false,
          "anchor": "center",
          "style": {
            "fontSize": "1.2rem",
            "fill": "#fbbf24",
            "fontWeight": 600
          }
        },
        {
          "type": "annotation",
          "id": "hook-question",
          "position": [0, 11.5],
          "latex": "\\text{But WHY? And what about } (-3) \\times (-2)\\text{?}",
          "visible": false,
          "anchor": "center",
          "style": {
            "fontSize": "1rem",
            "fill": "#818cf8"
          }
        }
      ],
      "animations": [
        {
          "id": "hook-sequence",
          "trigger": "auto",
          "steps": [
            {
              "action": "fadeIn",
              "target": "hook-title",
              "duration": 0.4,
              "from": "slide-up"
            },
            { "action": "wait", "duration": 1.0 },
            {
              "action": "parallel",
              "steps": [
                { "action": "fadeOut", "target": "hook-title", "duration": 0.3 },
                { "action": "transform", "target": "hook-title", "properties": { "translate": [0, -1] }, "duration": 0.3 }
              ]
            },
            { "action": "fadeIn", "target": "row-3x3", "duration": 0.3, "from": "slide-up" },
            { "action": "wait", "duration": 0.8 },
            { "action": "fadeIn", "target": "row-3x2", "duration": 0.3, "from": "slide-up" },
            { "action": "wait", "duration": 0.8 },
            { "action": "fadeIn", "target": "row-3x1", "duration": 0.3, "from": "slide-up" },
            { "action": "wait", "duration": 0.8 },
            { "action": "fadeIn", "target": "row-3x0", "duration": 0.3, "from": "slide-up" },
            { "action": "wait", "duration": 1.0 },
            {
              "action": "stagger",
              "targets": ["conn-1", "conn-1-label"],
              "stagger": 0.1,
              "steps": [{ "action": "fadeIn", "duration": 0.2 }]
            },
            { "action": "wait", "duration": 1.5 },
            { "action": "fadeIn", "target": "row-3xn1", "duration": 0.3 },
            { "action": "wait", "duration": 2.0 },
            {
              "action": "transform",
              "target": "row-3xn1",
              "properties": { "latex": "3 \\times (-1) = \\textcolor{#f43f5e}{-3}" },
              "duration": 0.3
            },
            { "action": "wait", "duration": 1.0 },
            { "action": "fadeIn", "target": "row-3xn2", "duration": 0.3 },
            { "action": "wait", "duration": 1.5 },
            {
              "action": "transform",
              "target": "row-3xn2",
              "properties": { "latex": "3 \\times (-2) = \\textcolor{#f43f5e}{-6}" },
              "duration": 0.3
            },
            { "action": "wait", "duration": 1.0 },
            { "action": "fadeIn", "target": "pattern-demand-text", "duration": 0.4, "from": "scale" },
            { "action": "wait", "duration": 2.0 },
            { "action": "fadeIn", "target": "hook-question", "duration": 0.4, "from": "slide-up" },
            { "action": "wait", "duration": 2.0 }
          ]
        }
      ],
      "interactions": []
    },

    "spatial-number-line": {
      "id": "NO-1.2b-spatial-numberline",
      "renderer": "svg",
      "viewBox": [-21, -5, 43, 11],
      "objects": [
        {
          "type": "numberLine",
          "id": "main-number-line",
          "range": [-20, 20],
          "step": 1,
          "markers": [
            { "value": 0, "label": "0", "color": "#fbbf24", "style": "dot" }
          ]
        },
        {
          "type": "group",
          "id": "direction-arrow",
          "children": [
            {
              "type": "geometricShape",
              "id": "arrow-shape",
              "shape": "custom",
              "path": "M-1.5,0 L1.5,0 L1.5,-0.3 L2.5,0.15 L1.5,0.6 L1.5,0.3 L-1.5,0.3 Z",
              "style": {
                "fill": "#10b981",
                "stroke": "#059669",
                "strokeWidth": 0.06
              }
            }
          ],
          "transform": { "translate": [0, -1.8] }
        }
      ],
      "animations": [],
      "interactions": [
        {
          "id": "configure-jump",
          "type": "control-panel",
          "controls": [
            {
              "id": "multiplier-magnitude",
              "type": "stepper",
              "min": 1,
              "max": 9,
              "step": 1,
              "default": 3
            },
            {
              "id": "multiplier-sign",
              "type": "toggle",
              "options": ["positive", "negative"],
              "default": "positive"
            },
            {
              "id": "multiplicand-magnitude",
              "type": "stepper",
              "min": 1,
              "max": 9,
              "step": 1,
              "default": 2
            },
            {
              "id": "multiplicand-sign",
              "type": "toggle",
              "options": ["positive", "negative"],
              "default": "positive"
            }
          ]
        }
      ]
    }
  }
}
```

### 12.3 problems.json (Full Problem Bank)

```json
{
  "conceptId": "NO-1.2b",
  "problems": [
    {
      "id": "NO-1.2b-R1",
      "layer": 0,
      "difficultyB": -1.5,
      "discriminationA": 1.0,
      "templateType": "integer-mul-sign-rule",
      "content": {
        "prompt": "What is the SIGN of each result?",
        "type": "multi-toggle",
        "subQuestions": [
          { "expression": "5 x (-3)", "options": ["Positive", "Negative"], "correct": "Negative" },
          { "expression": "(-4) x (-7)", "options": ["Positive", "Negative"], "correct": "Positive" },
          { "expression": "(-6) x 2", "options": ["Positive", "Negative"], "correct": "Negative" },
          { "expression": "8 x 3", "options": ["Positive", "Negative"], "correct": "Positive" }
        ],
        "feedbackCorrect": "Perfect! Same signs = positive, different signs = negative.",
        "feedbackPartial": "Almost! Remember: same signs (both + or both -) = positive. Different signs = negative.",
        "feedbackIncorrect": "Let's review: same signs = positive result. Different signs = negative result."
      },
      "explanationPrompt": "How do you determine the sign of a product?"
    },
    {
      "id": "NO-1.2b-R2",
      "layer": 0,
      "difficultyB": -1.0,
      "discriminationA": 1.0,
      "templateType": "integer-mul-basic",
      "content": {
        "prompt": "Solve: (-4) x 3",
        "type": "multiple-choice",
        "options": ["-12", "12", "-7", "-1"],
        "correctAnswer": "-12",
        "numberLineConfig": {
          "range": [-15, 15],
          "jumpStart": 0,
          "multiplier": -4,
          "multiplicand": 3
        },
        "feedbackCorrect": "Different signs (negative times positive) = negative. 4 x 3 = 12, so the answer is -12.",
        "feedbackIncorrect": "The signs are different, so the result is negative. Compute 4 x 3 = 12, then apply the negative sign."
      },
      "explanationPrompt": "Why is the result negative?"
    },
    {
      "id": "NO-1.2b-R3",
      "layer": 0,
      "difficultyB": -0.5,
      "discriminationA": 1.0,
      "templateType": "integer-div-basic",
      "content": {
        "prompt": "Solve: (-18) / 3",
        "type": "multiple-choice",
        "options": ["-6", "6", "-15", "-3"],
        "correctAnswer": "-6",
        "feedbackCorrect": "Different signs: negative / positive = negative. 18 / 3 = 6, so the answer is -6.",
        "feedbackIncorrect": "Same sign rules as multiplication! Different signs = negative. 18 / 3 = 6, so..."
      },
      "explanationPrompt": "Why do multiplication and division share the same sign rules?"
    },
    {
      "id": "NO-1.2b-P1",
      "layer": 1,
      "difficultyB": 0.0,
      "discriminationA": 1.2,
      "templateType": "integer-mul-neg-neg",
      "content": {
        "prompt": "Solve: (-7) x (-4)",
        "type": "numeric-input",
        "correctAnswer": 28,
        "signToggle": true,
        "feedbackCorrect": "Same signs (both negative) = positive. 7 x 4 = 28.",
        "feedbackIncorrect-sign": "You got the magnitude right but the sign wrong. Both negative = same signs = positive!",
        "feedbackIncorrect-other": "Break it down: 7 x 4 = 28. Both numbers are negative (same sign), so the result is positive: 28."
      },
      "explanationPrompt": "Why is (-7) x (-4) positive?"
    },
    {
      "id": "NO-1.2b-P2",
      "layer": 1,
      "difficultyB": 0.3,
      "discriminationA": 1.2,
      "templateType": "integer-div-neg-neg",
      "content": {
        "prompt": "Solve: (-24) / (-6)",
        "type": "numeric-input",
        "correctAnswer": 4,
        "signToggle": true,
        "feedbackCorrect": "Same signs = positive. 24 / 6 = 4.",
        "feedbackIncorrect": "Both numbers are negative. Same signs = positive result. Now: 24 / 6 = ?"
      },
      "explanationPrompt": "How do you know the quotient is positive?"
    },
    {
      "id": "NO-1.2b-P3",
      "layer": 1,
      "difficultyB": 0.7,
      "discriminationA": 1.3,
      "templateType": "integer-mul-div-chain",
      "content": {
        "prompt": "Evaluate step by step: (-2) x 5 x (-3)",
        "type": "multi-step",
        "steps": [
          { "expression": "(-2) x 5", "answer": -10 },
          { "expression": "(-10) x (-3)", "answer": 30 }
        ],
        "finalAnswer": 30,
        "feedbackCorrect": "Great chain! First step: different signs = negative (-10). Second step: same signs = positive (30).",
        "feedbackIncorrect": "Let's break it down. Step 1: (-2) x 5 = ? Different signs = negative, so -10. Step 2: (-10) x (-3) = ? Same signs = positive, so 30."
      },
      "explanationPrompt": "How did the sign change between step 1 and step 2?"
    },
    {
      "id": "NO-1.2b-P4",
      "layer": 1,
      "difficultyB": 0.5,
      "discriminationA": 1.1,
      "templateType": "integer-mul-word-problem",
      "content": {
        "prompt": "A scuba diver descends 8 meters per minute. She dives for 6 minutes. How far below the surface is she? Express as an integer.",
        "type": "multiple-choice",
        "options": ["-48", "48", "-14", "-2"],
        "correctAnswer": "-48",
        "highlightWords": {
          "descends": "rose",
          "8 meters per minute": "indigo",
          "6 minutes": "indigo"
        },
        "feedbackCorrect": "Descending is negative: (-8) x 6 = -48. She's 48 meters below the surface.",
        "feedbackIncorrect-48": "You got the distance right, but descending means going BELOW the surface -- that's negative!",
        "feedbackIncorrect-other": "Descending = negative direction (-8 m/min). Multiply: (-8) x 6 = ?"
      },
      "explanationPrompt": "Why is the answer negative?"
    },
    {
      "id": "NO-1.2b-U1",
      "layer": 2,
      "difficultyB": 1.5,
      "discriminationA": 1.5,
      "templateType": "integer-mul-explain-sign",
      "content": {
        "prompt": "A classmate says: 'Negative times negative should be negative, because you're multiplying bad things and that should give something bad.' Use the pattern method OR the direction reversal method to explain why this is wrong.",
        "type": "free-text",
        "minCharacters": 25,
        "maxCharacters": 500,
        "evaluationRubric": {
          "1": "Restates rule without explanation",
          "2": "References one model vaguely",
          "3": "Explains using one model clearly (pattern with numbers or direction reversal)",
          "4": "Explains using one model AND addresses the friend's flawed analogy",
          "5": "Connects both models or provides genuinely novel framing"
        }
      },
      "explanationPrompt": null,
      "isTransfer": false
    },
    {
      "id": "NO-1.2b-U2",
      "layer": 2,
      "difficultyB": 1.2,
      "discriminationA": 1.3,
      "templateType": "integer-mul-div-true-false",
      "content": {
        "prompt": "For each statement, decide TRUE or FALSE:",
        "type": "multi-toggle",
        "subQuestions": [
          {
            "statement": "The product of two negative numbers is always positive.",
            "options": ["TRUE", "FALSE"],
            "correct": "TRUE",
            "feedback": "Correct. Same signs = positive. Always."
          },
          {
            "statement": "If a x b is negative, then BOTH a and b must be negative.",
            "options": ["TRUE", "FALSE"],
            "correct": "FALSE",
            "feedback": "Tricky! If a x b is negative, one must be positive and one negative -- DIFFERENT signs. Example: 3 x (-2) = -6."
          },
          {
            "statement": "(-1) x any number = the opposite of that number.",
            "options": ["TRUE", "FALSE"],
            "correct": "TRUE",
            "feedback": "Yes! Multiplying by -1 flips the sign: (-1) x 5 = -5, (-1) x (-3) = 3."
          },
          {
            "statement": "If a / b is positive, then a and b have the same sign.",
            "options": ["TRUE", "FALSE"],
            "correct": "TRUE",
            "feedback": "Correct. Positive quotient = same signs, whether both positive or both negative."
          }
        ],
        "feedbackAllCorrect": "Perfect logical reasoning! You understand the sign rules deeply.",
        "feedbackPartial": "Close! Let's review the one you missed."
      },
      "explanationPrompt": null,
      "isTransfer": true
    }
  ]
}
```

---

## 13. AI Tutor Integration

### 13.1 System Prompt Context

When the AI tutor is invoked during this lesson, it receives:

```typescript
const tutorContext = {
  conceptId: 'NO-1.2b',
  conceptName: 'Integer Multiplication & Division',
  currentStage: 'spatial-experience' | 'guided-discovery' | 'practice',
  studentHistory: {
    jumpInteractions: JumpInteraction[],
    discoveryPromptResults: DiscoveryPromptResult[],
    practiceResults: ProblemResult[],
    previousLessonPerformance: {
      conceptId: 'NO-1.2a',
      doubleNegativeUnderstanding: 'strong' | 'moderate' | 'weak',
    },
  },
  commonMisconceptions: [
    'neg-times-neg-is-neg',
    'mul-sign-vs-add-sign',
    'why-sign-rules-work',
  ],
  availableModels: ['number-line-jumps', 'pattern-table', 'direction-arrow'],
  currentSceneState: SceneDefinition,
};
```

### 13.2 Tutor Behavioral Guidelines

1. **Default to Socratic** (CP-I): Never say "the answer is X." Instead: "What does the pattern show you?" or "What happens to the arrow when the multiplier is negative?"

2. **Reference the student's own exploration**: "I noticed you tried (-3) x 2 and got -6. Now try (-3) x (-2). What do you expect? What happened to the arrow?"

3. **Use the correct model**: If the student is in spatial experience, use jump/arrow language. If in discovery, reference the pattern table. Always ground in the concrete model the student is currently seeing.

4. **Bridge to NO-1.2a**: "Remember in the last lesson, subtracting a negative was like a double turn-around? Multiplication works the same way -- a negative multiplier REVERSES the direction."

5. **Detect and address misconceptions**: If the student answers `(-3) x (-2) = -6`, the tutor identifies the `neg-times-neg-is-neg` misconception and guides with: "Let's look at the pattern table. What do you get for 2x(-2), 1x(-2), 0x(-2)? Now what does the pattern say (-1)x(-2) must be?"

6. **Generate scene commands**: The tutor can trigger jump demonstrations:

```typescript
const commands: SceneCommand[] = [
  {
    action: 'configure',
    target: 'jump-controls',
    properties: {
      multiplier: 3,
      multiplierSign: 'negative',
      multiplicand: 2,
      multiplicandSign: 'negative',
    }
  },
  {
    action: 'triggerJump',
    target: 'number-line-jumps',
  }
];
```

### 13.3 Frustration Detection

The tutor monitors for frustration signals:

| Signal | Threshold | Response |
|--------|-----------|----------|
| Rapid incorrect answers (< 3s response time) | 3 consecutive | "Let's slow down. Try thinking about the signs first, THEN the number. Step 1: same or different signs? Step 2: multiply the magnitudes." |
| Long idle time | > 90s on one prompt | Offer a hint proactively. "Need a hand? Let me show you the pattern table -- it makes the answer really clear." |
| Repeated same wrong answer | Same answer 2+ times | "I see you keep getting [X]. Let's try a different approach..." |
| Confusing multiplication with addition | Student answers (-3)x(-2) as -5 | "It looks like you might be adding instead of multiplying. Remember: multiplication means REPEATED jumps, not walking steps. (-3) x (-2) means 3 jumps of size 2..." |

---

## 14. Edge Cases & Error Handling

### 14.1 Number Line Edge Cases

| Scenario | Handling |
|----------|---------|
| Jump result beyond visible range (-20 or +20) | ViewBox smoothly expands by 5 units in the exceeded direction (300ms). New ticks and labels render. Maximum range: -40 to +40 (9 jumps of 9 = 81, but starting from 0 the max reachable is 81 which exceeds +40 -- in this case, scale ticks to every 5 instead of every 1). |
| Large jump arcs (e.g., 9 jumps of 9) | Arc height caps at 3 units above/below line to prevent visual overflow. Arc labels scale down. Consider zoom-out to fit all arcs. |
| Multiplier = 1 (single jump) | Valid. Single arc draws. Equation shows multiplication by 1. |
| Result is zero (e.g., 0 x (-5) -- but multiplier min is 1) | Cannot happen with controls (multiplier min = 1, multiplicand min = 1). If encountered via discovery prompt, zero result highlighted in amber. |
| Rapid repeated Jump button presses | Jump button disabled during animation. Re-enables after sequence completes (with 100ms debounce). |
| Sign toggle during jump animation | Toggles are disabled during animation. Re-enable after completion. |
| Pinch-zoom to extreme levels | Min zoom: all range visible. Max zoom: 5 integer ticks visible. Spring-back if exceeded. |

### 14.2 Pattern Table Edge Cases

| Scenario | Handling |
|----------|---------|
| Student selects wrong answer in discovery | Incorrect option shakes briefly (translateX oscillation, 300ms). Rose border flash. After 1s, options re-enable for retry. Max 3 attempts before correct answer is highlighted with explanation. |
| Student taps "Continue" before answering | Continue not shown until answer is submitted. |
| Student answers sub-questions out of order (Prompt 5) | Sub-questions are locked sequentially. B unlocks after A, C after B. |

### 14.3 Input Validation

| Field | Validation | Error Display |
|-------|-----------|---------------|
| Numeric answer inputs | Integer only, range -999 to 999. No decimals. | Inline: "Enter a whole number" (below input, rose text, 0.75rem) |
| Sign toggle + numeric | Student must both set the sign AND enter the magnitude. If they enter "28" but toggle is set to negative, submission is `-28`. | Clear visual: the input displays the full signed value (e.g., "-28" or "+28") based on toggle state |
| Free-text reflections | Min 25-30 chars. Max 500-1000 chars. | Character counter turns rose below minimum. Submit button disabled. |
| Stepper inputs | Clamped to 1-9. Buttons disable at min/max. | Button opacity 0.3 at limit. Tooltip: "Maximum 9" or "Minimum 1" |

### 14.4 Network & Offline

| Scenario | Handling |
|----------|---------|
| Network loss during Stages 1-5 | All content is pre-cached. Interactions work offline. State queued in IndexedDB for sync. |
| Network loss during Stage 6 (Practice) | Problem bank pre-fetched at lesson start. Answers queued for submission. XP calculated locally, reconciled on reconnect. |
| Network loss during Stage 7 (Reflection) | Reflection text saved to IndexedDB. AI evaluation deferred until connectivity restored. Student sees: "Your reflection is saved! We'll evaluate it when you're back online." |
| Network loss during AI Tutor conversation | Message queued. Student sees: "I'll respond when we're back online." Tutor panel shows offline indicator. |

---

## 15. Gamification Hooks

### 15.1 XP Breakdown

| Source | Amount | Condition |
|--------|--------|-----------|
| Lesson completion (all 7 stages) | 100 | Complete all stages |
| Exploration bonus (Stage 2) | 0-40 | Diversity of interactions: all four sign combinations, 3+ multiplicand sizes, observed arrow flip 2+ times |
| Guided discovery insight (Stage 3) | 0-30 | Solved neg x neg prompt (Prompt 5) without hints: 30. With 1-2 hints: 15. With 3+ hints or forced reveal: 0. |
| Reflection quality (Stage 7) | 0-80 | AI score x 16 |
| Practice problems (Stage 6) | ~50 total | 5 XP per recall correct, 8-12 per procedure correct, score x 16 per understanding |

**Multipliers** (applied to total):
- Deep Dive (1.5x): >4 min in Stage 2 with continued distinct interactions beyond 10 minimum
- Connection Maker (1.3x): Reflection references a prior concept (NO-1.2a double-negative, or a real-world context from Stage 5)
- Struggle Bonus (1.4x): Got neg x neg wrong initially in discovery, retried, then explained correctly in reflection

### 15.2 Achievement Triggers

| Achievement | Trigger in This Lesson | Category |
|-------------|----------------------|----------|
| Pattern Master | Correctly answered all 3 sub-questions in Prompt 5 (neg x neg) on first try | Mastery |
| Double Flip | Performed negative x negative on the number line AND watched the double arrow reversal | Exploration |
| The Teacher | Reflection rated 5/5 by AI | Mastery |
| Rule Keeper | Got all 9 practice problems correct with no hints | Persistence |
| Bridge Builder | In reflection or practice explanation, explicitly connected neg x neg to the double-negative rule from NO-1.2a | Creativity |
| Debugging Mind | In Practice U2, correctly identified statement (b) as FALSE with clear reasoning | Persistence |

### 15.3 Aha Moment Detection

Aha moment celebration triggers when:
- Student correctly answers ALL three sub-questions in Prompt 5 (neg x neg pattern) on first attempt AND
- Combined time for all three is > 8s (genuine thought) AND < 45s (not stuck)

OR:
- Student gets a Practice problem wrong, asks tutor, then gets NEXT similar problem correct AND writes a quality explanation (score >= 3)

**Aha celebration sequence**:
1. Neuron Flash: brief neural network animation from the answer area (300ms)
2. Text: "That's the connection!" -- emerald text, slight glow, centered (1s hold)
3. Optional reflection prompt: "What clicked?" (small text input, 50 char max, optional)
4. +30 discovery XP

### 15.4 Knowledge Nebula Update

On lesson completion, the NO-1.2b node in the Knowledge Nebula transitions:
- Previous state: `AVAILABLE` (pulsing softly, unlocked by NO-1.2a completion)
- New state: `IN_PROGRESS` or `MASTERED`
  - Mastered: all 9 practice problems correct OR 8/9 correct with understanding score >= 3
  - In Progress: otherwise

The constellation line connecting NO-1.2a -> NO-1.2b illuminates. If NO-1.2b is mastered, the following lines begin pulsing:
- NO-1.2b -> NO-1.6 (Order of Operations)
- NO-1.2b -> AL-3.2 (Evaluating Expressions) -- if AL-3.1 is also complete
- NO-1.2b -> NT-2.5 (Exponents & Powers) -- if NT-2.1 is also complete

---

## 16. Constitution Compliance

| Principle | How This Lesson Complies |
|-----------|-------------------------|
| **CP-I: Understanding Over Memorization** | The descending pattern table proves sign rules are mathematically inevitable, not arbitrary. Practice includes free-text explanation problems. Reflection requires students to ARGUE why neg x neg = positive. XP weighted toward explanation quality (0-80) over computation (50 base). AI tutor is Socratic. |
| **CP-II: Visual First, Symbolic Second** | Stages 1-3 are entirely spatial: pattern table, number line jumps, direction arrow reversals. Formal sign rules appear only in Stage 4, after the student has discovered them through pattern and spatial reasoning. |
| **CP-III: No Dead-End Content** | Backward link: NO-1.2a (double-negative principle echoes). Forward links: NO-1.6, AL-3.2, NT-2.5. Cross-domain connections documented in meta.json. The double-reversal concept generalizes across integer operations. |
| **CP-IV: Accessibility** | Full ARIA labels, keyboard navigation, screen reader announcements for jumps/arrow flips, reduced-motion support, dyslexia font option, color-blind safe (direction + position + labels, not just color for sign distinction), 44px+ touch targets. |
| **CP-V: Performance** | <120 SVG elements per scene, 400ms jump animation, performance budgets defined, low-GPU degradation path. |
| **CP-VI: Privacy** | No PII in lesson content. Interaction data (jump configs, discovery answers) stored with student ID only. Offline-first with encrypted IndexedDB. |
| **CP-VII: Open Curriculum** | All content in MDX + JSON files under CC BY-SA. Animation configs are declarative JSON, not embedded in engine code. |

| Dev Rule | Compliance |
|----------|-----------|
| **DR-1: TypeScript Strict** | All component interfaces typed (JumpProps, JumpCommand, DirectionArrowProps, PatternTableRow, etc.). No `any` types. |
| **DR-2: Test Math** | Sign rule computation: `Math.sign(a * b)` verified for all sign combinations. Jump result: `multiplier * multiplicand`. Unit test: verify for all integer combinations with magnitudes 1-9. Pattern table values verified against manual computation. |
| **DR-3: Animation Review** | Jump arcs reviewed for mathematical accuracy (each arc covers exactly `multiplicand` units). Arrow flip reviewed for correct trigger conditions. Direction reversal reviewed for pedagogical clarity. |
| **DR-4: Content-Code Separation** | All lesson text, problem content, and animation configs in `src/content/domains/numbers-operations/NO-1.2b/`. Engine components are generic (`NumberLineJumps`, `DirectionArrow`, `PatternTable`). |
| **DR-5: Mobile-First** | Controls stacked vertically on mobile. Sign toggles inline with steppers. 44px+ touch targets. Bottom sheet for tutor. |
| **DR-6: Offline-First** | Problem bank pre-fetched. Interactions queued in IndexedDB. Reflection deferred evaluation on connectivity loss. |
| **DR-7: i18n** | All text strings externalized. KaTeX expressions use locale-independent notation. Direction labels ("RIGHT"/"LEFT"), sign labels ("POSITIVE"/"NEGATIVE"), and reversal labels ("REVERSED!") are in locale files. |

---

## Appendix A: Test Plan

### Unit Tests (`tests/unit/math/NO-1.2b.test.ts`)

```typescript
describe('Integer Multiplication - Sign Rules', () => {
  test.each([
    [3, 2, 6],           // positive x positive = positive
    [3, -2, -6],         // positive x negative = negative
    [-3, 2, -6],         // negative x positive = negative
    [-3, -2, 6],         // negative x negative = positive
    [1, 1, 1],           // edge: minimum magnitudes
    [9, 9, 81],          // edge: maximum magnitudes
    [-1, 5, -5],         // multiplying by -1 = negation
    [-1, -1, 1],         // -1 x -1 = 1
    [7, -1, -7],         // x (-1) = negation
    [-9, -9, 81],        // large negative x large negative
  ])('multiply(%i, %i) = %i', (a, b, expected) => {
    expect(computeMultiplication(a, b)).toBe(expected);
  });

  test.each([
    [6, 2, 3],           // positive / positive = positive
    [-6, 2, -3],         // negative / positive = negative
    [6, -2, -3],         // positive / negative = negative
    [-6, -2, 3],         // negative / negative = positive
    [-18, 3, -6],        // larger values
    [-24, -6, 4],        // larger values, same sign
  ])('divide(%i, %i) = %i', (a, b, expected) => {
    expect(computeDivision(a, b)).toBe(expected);
  });
});

describe('Direction Arrow Logic', () => {
  test.each([
    ['positive', 'positive', 'right', false],
    ['positive', 'negative', 'left', false],
    ['negative', 'positive', 'left', true],     // arrow reverses
    ['negative', 'negative', 'right', true],     // arrow double-reverses
  ])(
    'multiplier=%s, multiplicand=%s -> direction=%s, reversed=%s',
    (multiplierSign, multiplicandSign, expectedDirection, expectedReversed) => {
      const result = computeArrowDirection(multiplierSign, multiplicandSign);
      expect(result.direction).toBe(expectedDirection);
      expect(result.reversed).toBe(expectedReversed);
    }
  );
});

describe('Jump Sequence', () => {
  test('3 jumps of 2 rightward lands at 0, 2, 4, 6', () => {
    const positions = computeJumpPositions(3, 2, 'right');
    expect(positions).toEqual([0, 2, 4, 6]);
  });

  test('4 jumps of 3 leftward lands at 0, -3, -6, -9, -12', () => {
    const positions = computeJumpPositions(4, 3, 'left');
    expect(positions).toEqual([0, -3, -6, -9, -12]);
  });

  test('zero crossing detection during jumps', () => {
    // 2 jumps of 5 leftward from 0: 0, -5, -10 -- starts at 0, no crossing
    expect(detectsZeroCrossingInJumps([0, -5, -10])).toBe(false);
    // If starting from 3 with leftward jumps of 5: 3, -2 -- crosses zero
    expect(detectsZeroCrossingInJumps([3, -2])).toBe(true);
  });
});

describe('Pattern Table', () => {
  test('descending pattern with multiplier 3, multiplicand going 3,2,1,0,-1,-2', () => {
    const results = generatePatternTable(3, [3, 2, 1, 0, -1, -2]);
    expect(results).toEqual([9, 6, 3, 0, -3, -6]);
  });

  test('descending pattern with multiplicand -2, multiplier going 3,2,1,0,-1,-2,-3', () => {
    const results = generatePatternTable(-2, [3, 2, 1, 0, -1, -2, -3]);
    expect(results).toEqual([-6, -4, -2, 0, 2, 4, 6]);
  });

  test('pattern difference is constant', () => {
    const results = generatePatternTable(3, [3, 2, 1, 0, -1, -2]);
    for (let i = 1; i < results.length; i++) {
      expect(results[i]! - results[i - 1]!).toBe(-3);
    }
  });
});
```

### Integration Tests (`tests/integration/lesson-flow/NO-1.2b.test.ts`)

- Verify all 7 stages render and progress correctly
- Verify jump animation produces correct final position for all 4 sign combinations with 5 random magnitude pairs each
- Verify direction arrow flip triggers correctly for negative multiplier
- Verify pattern table generates correct values for descending sequences
- Verify equation display matches jump result
- Verify zero-crossing effect triggers only when a jump crosses zero
- Verify practice problem submission and XP calculation
- Verify reflection submission and AI evaluation integration
- Verify sign toggle + numeric input produces correctly signed answer

### E2E Tests (`tests/e2e/NO-1.2b.spec.ts`)

- Full lesson playthrough: Hook -> Spatial -> Discovery -> Symbol -> RealWorld -> Practice (all correct) -> Reflection
- Verify XP totals at end
- Verify Knowledge Nebula node state update (NO-1.2b illuminates, successor links begin pulsing)
- Verify offline mode: complete lesson without network, reconnect, verify sync
- Verify cross-lesson connection: student who mastered NO-1.2a can access NO-1.2b

---

## Appendix B: Localization Keys

All user-facing strings for this lesson are externalized under the namespace `lesson.NO-1.2b` in the locale file:

```json
{
  "lesson.NO-1.2b.hook.title": "A Pattern...",
  "lesson.NO-1.2b.hook.eachDrops": "Each answer drops by {step}...",
  "lesson.NO-1.2b.hook.ifContinues": "If the pattern continues...",
  "lesson.NO-1.2b.hook.whatNext": "...what HAS to come next?",
  "lesson.NO-1.2b.hook.demands": "The pattern DEMANDS it.",
  "lesson.NO-1.2b.hook.question": "But WHY? And what about (-3) x (-2)?",
  "lesson.NO-1.2b.spatial.controls.multiplierLabel": "Multiplier (how many jumps)",
  "lesson.NO-1.2b.spatial.controls.multiplicandLabel": "Multiplicand (jump size)",
  "lesson.NO-1.2b.spatial.controls.signPositive": "POSITIVE",
  "lesson.NO-1.2b.spatial.controls.signNegative": "NEGATIVE",
  "lesson.NO-1.2b.spatial.controls.jump": "JUMP",
  "lesson.NO-1.2b.spatial.controls.reset": "RESET",
  "lesson.NO-1.2b.spatial.equation.jumpsOf": "{count} jumps of {size}",
  "lesson.NO-1.2b.spatial.equation.reversed": "{count} jumps of {size}, then REVERSE",
  "lesson.NO-1.2b.spatial.arrow.reversed": "REVERSED!",
  "lesson.NO-1.2b.spatial.arrow.doubleReversed": "DOUBLE REVERSAL!",
  "lesson.NO-1.2b.spatial.progress": "Interactions: {current} / {required}",
  "lesson.NO-1.2b.spatial.nudge.tryNegMultiplicand": "What happens when the jump size is negative? Try 3 x (-2) and watch the arrow.",
  "lesson.NO-1.2b.spatial.nudge.tryNegMultiplier": "What if the NUMBER of jumps is negative? Try (-3) x 2 and watch the arrow REVERSE.",
  "lesson.NO-1.2b.spatial.nudge.tryBothNeg": "Ready for the mind-bender? Set BOTH to negative: (-3) x (-2). Watch what happens...",
  "lesson.NO-1.2b.discovery.prompt1": "Let's start with what you know. What is 4 x 3? Use the number line: 4 jumps of 3.",
  "lesson.NO-1.2b.discovery.prompt1.success": "Four jumps of 3, all to the right. Multiplication IS repeated jumping.",
  "lesson.NO-1.2b.discovery.prompt2.intro": "Now watch this pattern. I'll show you what happens when we keep the 3 and count DOWN the multiplier.",
  "lesson.NO-1.2b.discovery.prompt2.pattern": "See the pattern? Each time the multiplier goes down by 1, the result goes down by 3.",
  "lesson.NO-1.2b.discovery.prompt2.button": "I see the pattern!",
  "lesson.NO-1.2b.discovery.prompt3": "The multiplier just went 3, 2, 1, 0... What comes next? If the pattern continues, what is 3 x (-1)?",
  "lesson.NO-1.2b.discovery.prompt3.success": "The pattern continues! One jump of 3 in the REVERSED direction lands at -3.",
  "lesson.NO-1.2b.discovery.prompt4": "And 3 x (-2)? The pattern should tell you.",
  "lesson.NO-1.2b.discovery.prompt4.success": "Multiplying a positive by a negative gives a NEGATIVE result. The jumps go LEFT.",
  "lesson.NO-1.2b.discovery.prompt4.rule": "Positive x Negative = Negative",
  "lesson.NO-1.2b.discovery.prompt5": "Now the question that BREAKS people's brains. What is (-3) x (-2)?",
  "lesson.NO-1.2b.discovery.prompt5.patternIntro": "The multiplier goes 3, 2, 1, 0... and the results go -6, -4, -2, 0... Each time, the result goes UP by 2.",
  "lesson.NO-1.2b.discovery.prompt5.positiveResult": "POSITIVE! The pattern forced it.",
  "lesson.NO-1.2b.discovery.prompt5.revelation": "Two negatives: one sets the direction LEFT, the other REVERSES it to RIGHT. Two reversals = POSITIVE!",
  "lesson.NO-1.2b.discovery.prompt5.rule": "Negative x Negative = Positive",
  "lesson.NO-1.2b.discovery.prompt6": "One more thing. If (-3) x (-2) = 6, what is 6 / (-2)?",
  "lesson.NO-1.2b.discovery.prompt6.success": "Division undoes multiplication. The sign rules are THE SAME: different signs = negative result.",
  "lesson.NO-1.2b.discovery.prompt6.divRules": "Division follows the exact same sign rules as multiplication. Same signs = positive. Different signs = negative.",
  "lesson.NO-1.2b.symbolBridge.rule.posPos": "Same direction. Jumps go RIGHT.",
  "lesson.NO-1.2b.symbolBridge.rule.posNeg": "Jump direction is LEFT (negative multiplicand).",
  "lesson.NO-1.2b.symbolBridge.rule.negPos": "Jumps go RIGHT, then REVERSE to LEFT.",
  "lesson.NO-1.2b.symbolBridge.rule.negNeg": "Jumps go LEFT, then REVERSE to RIGHT. Two reversals = original direction!",
  "lesson.NO-1.2b.symbolBridge.summary.same": "SAME SIGNS -> POSITIVE (+)",
  "lesson.NO-1.2b.symbolBridge.summary.different": "DIFFERENT SIGNS -> NEGATIVE (-)",
  "lesson.NO-1.2b.symbolBridge.summary.why": "WHY: Negative = REVERSE direction. Two reverses = original direction.",
  "lesson.NO-1.2b.realworld.video.title": "VIDEO PLAYBACK",
  "lesson.NO-1.2b.realworld.video.scenario": "You're watching a video of someone WALKING BACKWARD at 2 m/s. You hit REWIND (play at -3x speed).",
  "lesson.NO-1.2b.realworld.video.question": "In the rewind, which direction does the person appear to walk?",
  "lesson.NO-1.2b.realworld.video.connection": "Rewinding a backward walk looks like walking FORWARD. Negative times negative = positive.",
  "lesson.NO-1.2b.realworld.debt.title": "MONEY & DEBT",
  "lesson.NO-1.2b.realworld.debt.scenario": "You have 4 debts of $50 each (-$50 each). A generous aunt REMOVES all 4 debts.",
  "lesson.NO-1.2b.realworld.debt.question": "How does your balance change?",
  "lesson.NO-1.2b.realworld.debt.connection": "Removing debts (negative times negative) INCREASES your balance. Taking away something bad is something GOOD!",
  "lesson.NO-1.2b.realworld.temp.title": "TEMPERATURE CHANGE",
  "lesson.NO-1.2b.realworld.temp.scenario": "Temperature drops 3 degrees every hour (-3 deg/hr). What was the temperature 5 hours AGO (-5 hours)?",
  "lesson.NO-1.2b.realworld.temp.question": "What was the temperature then?",
  "lesson.NO-1.2b.realworld.temp.connection": "Going BACK in time (negative) on a DROPPING temperature (negative) = it was WARMER (positive).",
  "lesson.NO-1.2b.practice.ruleCardTitle": "INTEGER MULTIPLICATION & DIVISION",
  "lesson.NO-1.2b.reflection.prompt": "Explain to a friend who believes 'negative x negative = negative' why they're wrong. Use either the pattern method or the direction reversal method to convince them.",
  "lesson.NO-1.2b.reflection.placeholder": "Think about what happens when you extend the multiplication pattern past zero...",
  "lesson.NO-1.2b.reflection.minChars": "{current} / {min} minimum",
  "lesson.NO-1.2b.complete.title": "LESSON COMPLETE!",
  "lesson.NO-1.2b.complete.lessonName": "Integer Multiplication & Division",
  "lesson.NO-1.2b.complete.lessonCompletion": "Lesson completion",
  "lesson.NO-1.2b.complete.explorationBonus": "Exploration bonus",
  "lesson.NO-1.2b.complete.discoveryInsight": "Discovery insight",
  "lesson.NO-1.2b.complete.reflectionQuality": "Reflection quality ({score}/5)",
  "lesson.NO-1.2b.complete.total": "Total",
  "lesson.NO-1.2b.complete.neuronsEarned": "Neurons earned"
}
```
