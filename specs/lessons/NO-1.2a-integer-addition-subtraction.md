# Lesson Design: Integer Addition & Subtraction

**ID**: NO-1.2a | **Domain**: Numbers & Operations | **Grade**: 6
**Version**: 1.0.0 | **Date**: 2026-03-22
**Prerequisite**: NO-1.2 (Integers) | **Successors**: NO-1.2b (Integer Mul/Div), AL-3.2 (Evaluating Expressions), NO-1.6 (Order of Operations)
**Content Path**: `src/content/domains/numbers-operations/NO-1.2a/`
**Estimated Duration**: 14-18 minutes (all 7 NLS stages)

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

**The Walking Metaphor**: Integer addition and subtraction are physical movement on a number line. The student IS the arrow walking along the line.

| Operation | Physical Meaning | Direction |
|-----------|-----------------|-----------|
| `a + b` (b positive) | Start at `a`, walk RIGHT `b` steps | RIGHT (positive direction) |
| `a - b` (b positive) | Start at `a`, walk LEFT `b` steps | LEFT (negative direction) |
| `a + (-b)` | Start at `a`, adding a negative = turn around, walk LEFT `b` steps | LEFT (same as subtracting) |
| `a - (-b)` | Start at `a`, subtracting a negative = double reversal, walk RIGHT `b` steps | RIGHT (same as adding) |

**The Key Revelation**: `a + (-b) = a - b` and `a - (-b) = a + b`. Adding a negative is subtracting. Subtracting a negative is adding. The double-negative is a double turn-around -- you end up facing the same direction you started.

**Dual Representation**: The lesson uses TWO spatial models:
1. **Number line walking** -- for directional/movement intuition (primary)
2. **Zero-pair chip model** -- for cancellation/annihilation intuition (secondary)

Both models converge on the same results, reinforcing through dual coding (PF-2).

---

## 2. Neuroscience Framework

### 2.1 Cognitive Architecture Per Stage

| Stage | Primary Cognitive Process | Brain Regions Engaged | Why This Order Matters |
|-------|--------------------------|----------------------|----------------------|
| 1. Hook | Curiosity activation, reward prediction error | Ventral tegmental area (VTA), nucleus accumbens | Dopaminergic prediction error ("wait, you can walk BACKWARDS?") primes attention for new information |
| 2. Spatial Experience | Embodied cognition, visuospatial encoding | Intraparietal sulcus (IPS), premotor cortex, visuospatial sketchpad | Motor simulation of "walking" creates grounded mental model before any symbols appear |
| 3. Guided Discovery | Pattern recognition, elaborative interrogation | Prefrontal cortex (PFC), hippocampus | Student discovers `a + (-b) = a - b` relationship themselves -- self-generated insights form stronger memory traces than told information |
| 4. Symbol Bridge | Dual coding, symbol grounding | Angular gyrus (symbol-to-meaning mapping), IPS (magnitude processing) | Symbols map ONTO existing spatial representation, not the reverse -- prevents the common failure mode of symbol manipulation without meaning |
| 5. Real-World Anchor | Contextual binding, episodic memory | Hippocampus, medial temporal lobe | Concrete contexts (temperature, elevation, money) create multiple retrieval cues for the same underlying concept |
| 6. Practice | Retrieval practice, error-driven learning | Basal ganglia (procedural), PFC (monitoring) | Spaced retrieval strengthens the spatial-to-symbolic pathways; interleaving forces discrimination between operations |
| 7. Reflection | Metacognition, consolidation | PFC (self-monitoring), default mode network | Self-explanation forces the student to construct a coherent narrative, exposing gaps in understanding |

### 2.2 Embodied Cognition: Why "Walking" Works

The walking metaphor leverages embodied cognition (PF-3) through three mechanisms:

1. **Motor simulation**: When students imagine or watch a character "walking right" or "walking left," premotor cortex activation mirrors what would happen if THEY were walking. This is not metaphorical -- mirror neuron systems literally simulate the movement, creating a richer memory trace than abstract instruction.

2. **Directional grounding**: Human spatial cognition natively encodes direction (left/right, forward/backward). Mapping addition to rightward movement and subtraction to leftward movement exploits existing neural circuitry rather than building new abstractions from scratch.

3. **The turn-around moment**: Subtracting a negative requires a "double turn-around." This is kinesthetically intuitive -- anyone who has tried to walk backwards while facing backwards knows they end up going forward. The physical absurdity of the double reversal makes the mathematical rule memorable.

### 2.3 Emotional Arc

The lesson is deliberately structured to create a specific emotional trajectory:

```
Stage 1-2:  CONFIDENCE      "I already know how to walk on a number line"
            ↓                (positive numbers, simple operations)
Stage 2b:   CURIOSITY       "What happens if I cross zero?"
            ↓                (negative territory is new but manageable)
Stage 3a:   MILD SURPRISE   "Wait, 3 + (-5) gave the same answer as 3 - 5!"
            ↓                (pattern recognition -- dopamine spike)
Stage 3b:   PRODUCTIVE      "3 - (-5)... what? How do I subtract a negative?"
            STRUGGLE         (cognitive conflict -- this is the learning moment)
            ↓
Stage 3c:   BREAKTHROUGH    "The two negatives cancel! Subtracting negative = adding!"
            ↓                (aha moment -- celebration trigger)
Stage 4-5:  CONSOLIDATION   "I can use this rule and I understand WHY it works"
Stage 6:    MASTERY FLOW    "I can do these reliably"
Stage 7:    OWNERSHIP       "I can explain this in my own words"
```

**Critical design constraint**: The productive struggle in Stage 3b must NOT tip into frustration. The AI tutor monitors response time and hint requests. If the student spends >90 seconds without progress on the double-negative prompt, the tutor offers the "turn-around twice" animation unprompted. The goal is effortful success, not helpless confusion (PF-6).

### 2.4 Prerequisite Neural Foundations

From NO-1.2 (Integers), the student arrives with:
- Mental model of a number line extending in both directions from zero
- Understanding that negative numbers represent positions left of zero
- Familiarity with the concept of "opposite" (5 and -5 are equidistant from zero)
- Comfort with the chip model (blue = positive, red = negative) from the Integers lesson

This lesson builds directly on these spatial representations, adding the dynamic element of MOVEMENT along the number line.

---

## 3. Stage 1: Hook (30-60s)

### 3.1 Narrative Script

The hook uses the walking metaphor immediately to ground the lesson in physical movement.

**Scene**: A horizontal number line spanning -5 to +10, drawn in the center of the viewport. An arrow character (the "Walker") stands at position 0, facing right. The number line is drawn with tick marks at every integer. Zero is marked with a slightly larger tick and a bold "0" label.

**Sequence** (auto-playing, no interaction required):

| Time | Animation | Text Overlay | Audio Cue |
|------|-----------|-------------|-----------|
| 0.0s | Number line draws from center outward (left half, then right half simultaneously). Walker fades in at 0. | -- | Subtle whoosh as line draws |
| 1.0s | Walker slides right 3 steps. Each step produces a small "footprint" mark. Position counter ticks: 0... 1... 2... 3. | `"Walk 3 steps right..."` | Soft tap sound per step (3 taps) |
| 3.5s | Equation appears above: `0 + 3 = 3`. The `+3` is colored emerald. | `"...you're at 3."` | -- |
| 5.0s | Walker turns to face left (0.2s flip animation), then walks left 2 steps. Footprints appear. Position counter: 3... 2... 1. | `"Now walk 2 steps left..."` | Soft tap sound per step (2 taps) |
| 7.5s | Equation updates: `3 - 2 = 1`. The `-2` is colored rose. | `"...you're at 1. Easy."` | -- |
| 9.0s | Walker slides back to 0. Pause 0.5s. | `"Back to zero."` | -- |
| 10.5s | Text: `"But what if I told you to walk BACKWARDS?"` -- text pulses once with slight scale (1.0 -> 1.05 -> 1.0 over 0.4s). Walker wobbles slightly (rotation -5deg, +5deg, 0deg over 0.3s) as if confused. | `"But what if I told you to walk BACKWARDS?"` | Low "hmm" tone |
| 12.5s | Walker turns to face LEFT (0.2s flip), then walks left 3 steps FROM zero, crossing nothing special since starting at 0. Footprints appear. Position counter: 0... -1... -2... -3. The number line extends smoothly leftward if needed (it already shows to -5). | `"Walk 3 steps backward from zero..."` | Three deeper-pitched taps |
| 15.5s | Equation: `0 + (-3) = -3`. The `-3` is colored rose. Camera holds on -3 for 1s. | `"...you're at negative 3."` | Subtle revelation chord |
| 17.5s | Text: `"Adding and subtracting aren't just math. They're directions."` appears centered below the number line, fades to 80% opacity. | -- | -- |
| 19.0s | "Continue" button fades in at bottom. | -- | -- |

### 3.2 Walker Character Design

The Walker is deliberately minimal -- a CSS-rendered directional arrow, not a cartoon character. This prevents the visual from competing with the mathematical content (CP-II).

```
Facing RIGHT:     Facing LEFT:
    ▶                ◀
    |                |
   / \              / \
```

Detailed specification:
- **Body**: Isosceles triangle (CSS `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`) pointing in the direction of facing, 28px wide x 36px tall
- **Legs**: Two short lines (8px) extending down from the base, with a 2px gap between them
- **Color**: `--walker-body: #a78bfa` (violet-400), `--walker-outline: #7c3aed` (violet-600), 2px stroke
- **Turning animation**: `scaleX(-1)` transition over 200ms with `ease-in-out`
- **Walking animation**: Translate along x-axis with per-step easing. Each step: translate to next integer position over 300ms using `cubic-bezier(0.25, 0.1, 0.25, 1.0)` (ease-out). Between steps: 100ms pause.
- **Footprint**: Small circle (4px radius), `fill: rgba(167, 139, 250, 0.3)`, fades to `opacity: 0.15` over 2s after placement
- **Position indicator**: Vertical dashed line from Walker to number line, `stroke: rgba(167, 139, 250, 0.5)`, `stroke-dasharray: 3 3`

### 3.3 Number Line Rendering (Hook Version)

- **Range**: -5 to +10 (enough to show the hook's scenarios)
- **SVG viewBox**: `[-6, -3, 17, 7]` (extra padding for labels and Walker above the line)
- **Line**: Horizontal line at `y = 0`, `stroke: #94a3b8` (slate-400), `stroke-width: 1.5px`
- **Arrowheads**: Both ends of the number line have small triangular arrowheads indicating infinite extension
- **Tick marks**: At every integer, vertical lines from `y = -0.3` to `y = 0.3`, `stroke: #64748b` (slate-500), `stroke-width: 1px`
- **Labels**: Integer values below ticks at `y = 0.7`, `font-size: 0.6rem` relative to viewBox, `fill: #cbd5e1` (slate-300), `font-family: 'Space Grotesk'`
- **Zero emphasis**: Zero tick is 50% taller (`y = -0.45` to `y = 0.45`), label is bold, slightly larger (`font-size: 0.7rem`), `fill: #fbbf24` (amber-400)
- **Positive region**: Subtle background gradient from 0 to right edge, `fill: rgba(16, 185, 129, 0.04)` (emerald at 4% opacity)
- **Negative region**: Subtle background gradient from 0 to left edge, `fill: rgba(244, 63, 94, 0.04)` (rose at 4% opacity)
- **Dynamic extension**: If the Walker would walk beyond the current visible range, the viewBox animates to expand (300ms, ease-out). New ticks and labels render during expansion.

### 3.4 Equation Display

- Positioned above the Walker, centered horizontally relative to the current position
- Rendered with KaTeX for consistent math formatting
- Font size: `1.2rem` in the context of the scene
- Background: semi-transparent dark panel (`rgba(15, 23, 42, 0.85)` with `backdrop-filter: blur(8px)`), rounded corners (6px), padding 8px 12px
- Positive values colored emerald (`#10b981`), negative values colored rose (`#f43f5e`), operators and equals sign in default text color (`#e2e8f0`)
- Transitions: old equation fades out (150ms), new equation fades in (200ms) with slight upward slide (4px)

### 3.5 Hook Exploration Data

This stage collects no interaction data (it is purely observational). The "Continue" button press timestamps the hook completion for analytics.

---

## 4. Stage 2: Spatial Experience (2-4 min)

**Minimum interactions to continue**: 10 distinct operations on the number line OR chip model.

This stage provides TWO interactive models side-by-side (on desktop) or tab-switchable (on mobile). The student must engage with BOTH models before proceeding. Minimum: 7 interactions on the number line model + 3 on the chip model (or any split totaling 10 with at least 2 on each model).

### 4.1 Model A: Number Line Walking Simulator

#### 4.1.1 Layout

**Desktop** (viewport >= 768px):
```
┌─────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────┐    │
│  │         NUMBER LINE VISUALIZATION            │    │
│  │  ◄──|──|──|──|──|──|──▶──|──|──|──|──|──|──►│    │
│  │        -5        0    ▲Walker   5       10   │    │
│  │                       └─ facing right        │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │  EQUATION BUILDER │  │  CONTROLS                │ │
│  │                   │  │                          │ │
│  │  Start: 3         │  │  Direction: [→ RIGHT] ◄►│ │
│  │  Operation: + 5   │  │  Steps: ●────○ 5        │ │
│  │  Result: = 8      │  │                          │ │
│  │                   │  │  [ ▶ WALK ]              │ │
│  └──────────────────┘  │                          │ │
│                         │  [ ↺ RESET ]            │ │
│                         └──────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Mobile** (viewport < 768px):
```
┌──────────────────────────┐
│  NUMBER LINE (full width) │
│  ◄──|──|──▶──|──|──|──►  │
│       -5   0▲  5     10   │
│                           │
│  ┌──────────────────────┐ │
│  │ Start: 3  → + 5 = 8  │ │
│  └──────────────────────┘ │
│                           │
│  Direction: [→ RIGHT] ◄► │
│  Steps: ●────────○ 5     │
│                           │
│  [ ▶ WALK ]  [ ↺ RESET ] │
└──────────────────────────┘
```

#### 4.1.2 Number Line (Interactive Version)

- **Range**: -15 to +15 (expandable)
- **SVG viewBox**: dynamic, initially `[-16, -4, 33, 9]`
- **Rendering**: Same style as Hook number line but with enhanced interactivity
- **Pinch-to-zoom**: Enabled via `@use-gesture/react`. Min zoom: full range visible. Max zoom: 5 integers visible. Smooth momentum scrolling.
- **Pan**: Horizontal pan gesture. Inertia deceleration. Snaps to integer boundaries on release.
- **Walker start position**: Tappable/draggable. Student can drag the Walker to any integer position on the line to set a starting point. Drag constrained to the number line (y-axis locked). Snaps to integers. Visual: Walker lifts slightly (translateY -4px, 100ms) when grabbed, settles back on release.
- **Step visualization**: Each step of the walk produces:
  - An arc above (for rightward steps) or below (for leftward steps) the number line
  - Arc path: quadratic bezier from current position to next position, with control point 1.5 units above/below the line
  - Arc stroke: emerald (`#10b981`) for rightward, rose (`#f43f5e`) for leftward
  - Arc stroke-width: 1.5px, with animated `stroke-dasharray` drawing effect (300ms per arc)
  - Small step number label at the apex of each arc: "1", "2", "3", etc., `font-size: 0.45rem`, same color as arc
- **Zero-crossing effect**: When the Walker crosses zero during a walk:
  - The zero tick pulses: scale 1.0 -> 1.5 -> 1.0 over 400ms
  - A brief radial flash at zero: amber circle (`#fbbf24`, opacity 0.4) expands from 0 to 1.5 unit radius over 300ms, then fades
  - The background color regions (emerald tint / rose tint) become briefly more saturated (4% -> 12% opacity) for 500ms, then ease back
  - The equation builder momentarily highlights the sign change in the result
- **Trail**: After the walk completes, the path from start to end is highlighted with a thicker line segment on the number line itself (`stroke-width: 3px`, color matching direction, `opacity: 0.6`), persisting until the next walk or reset

#### 4.1.3 Controls

**Direction Toggle**:
- Toggle switch component, 120px wide x 44px tall (minimum touch target per DR-5)
- Two states: "RIGHT →" (emerald background, `#10b981`) and "← LEFT" (rose background, `#f43f5e`)
- Transition: slide animation (200ms ease-in-out), the inner circle slides left/right
- The Walker visually turns to face the selected direction immediately on toggle (200ms flip)
- Label text: "Direction" above the toggle, `font-size: 0.75rem`, `color: #94a3b8`
- ARIA: `role="switch"`, `aria-checked`, `aria-label="Walking direction. Currently facing right/left"`
- Keyboard: Space/Enter to toggle, also responds to Left/Right arrow keys

**Steps Slider**:
- Range input styled as a custom slider, range 1-9 (integers only)
- Track: 200px wide (desktop) / full-width minus padding (mobile), 6px tall, `background: #334155` (slate-700), rounded
- Filled portion: emerald or rose depending on direction selection
- Thumb: 24px circle, `background: #f8fafc` (slate-50), `border: 2px solid` (emerald/rose), `box-shadow: 0 2px 4px rgba(0,0,0,0.3)`
- Thumb touch area: 44px x 44px invisible hit area (DR-5)
- Step count label to the right of slider: large bold number, `font-size: 1.5rem`, `color: #f8fafc`
- Tick marks below slider at each integer position, 3px tall, `background: #475569`
- ARIA: `role="slider"`, `aria-valuemin="1"`, `aria-valuemax="9"`, `aria-valuenow`, `aria-label="Number of steps"`
- Keyboard: Left/Right arrows to adjust by 1

**Walk Button**:
- Primary action button, full-width on mobile, 200px on desktop
- Height: 48px (exceeds 44px minimum per DR-5)
- Background: `linear-gradient(135deg, #7c3aed, #6d28d9)` (violet gradient)
- Text: "WALK" with a small `▶` icon, `font-size: 1rem`, `font-weight: 600`, `color: white`
- Hover: brightness 1.1, subtle scale 1.02
- Active/pressed: scale 0.98, brightness 0.95
- Disabled state (during walk animation): `opacity: 0.5`, `cursor: not-allowed`, shows small spinner
- ARIA: `role="button"`, `aria-label="Walk [N] steps [direction] from [current position]"`
- Keyboard: Enter or Space to activate

**Reset Button**:
- Secondary action, same width as Walk button but to its right (desktop) or stacked below (mobile)
- Height: 48px
- Background: `transparent`, `border: 1.5px solid #475569`
- Text: "RESET" with `↺` icon, `color: #94a3b8`
- Hover: `border-color: #64748b`, `color: #cbd5e1`
- Resets Walker to position 0, clears all arcs and trails, resets equation builder
- ARIA: `aria-label="Reset walker to zero and clear all paths"`

#### 4.1.4 Equation Builder (Live)

The equation builder updates in real-time as the student configures their walk, BEFORE they press Walk.

**Format**: `Start: [N] [op] [M] = [result]`

Example states:
- Before walk: `Start: 3,  + 5 = ?` (result is `?` until walk completes)
- During walk: `Start: 3,  + 5 = ...` (ellipsis animates: `.` -> `..` -> `...` at 400ms intervals)
- After walk: `Start: 3,  + 5 = 8` (result appears with brief emerald/rose flash based on sign)

**Rendering**:
- Container: `background: rgba(15, 23, 42, 0.7)`, `backdrop-filter: blur(12px)`, `border-radius: 8px`, `padding: 12px 16px`
- Start value: `font-size: 1.1rem`, `color: #e2e8f0`
- Operation: `font-size: 1.1rem`, emerald if positive, rose if negative
- Result: `font-size: 1.3rem`, `font-weight: 700`, emerald if positive, rose if negative, amber if zero
- KaTeX rendering for the complete equation
- Transition: result number counter-animates from 0 to final value (or from start to final) at a rate of ~100ms per integer, creating a rapid counting effect

#### 4.1.5 Interaction Tracking

Each walk operation records:
```typescript
interface WalkInteraction {
  start: number;          // Starting position
  direction: 'right' | 'left';
  steps: number;          // 1-9
  result: number;         // Computed result
  crossedZero: boolean;   // Did the path cross zero?
  timestamp: number;      // ms since stage start
  timeSinceLastInteraction: number; // ms
}
```

The system tracks interaction diversity for exploration XP:
- Did the student try both directions? (+10 XP bonus)
- Did the student cross zero at least once? (+10 XP bonus)
- Did the student try starting from a negative number? (+10 XP bonus)
- Did the student try 3+ different starting positions? (+10 XP bonus)
- Total exploration bonus: 0-40 XP

### 4.2 Model B: Zero-Pair Chip Model

#### 4.2.1 Concept

Positive values are represented by red/emerald chips. Negative values are represented by blue/rose chips. When one positive chip and one negative chip touch, they form a "zero pair" and annihilate each other with a satisfying animation. What remains after all possible cancellations is the answer.

This model is particularly powerful for making `a + (-b)` tangible: you literally ADD negative chips and watch them cancel positive chips.

#### 4.2.2 Layout

**Desktop**: Positioned to the right of the number line model (50/50 split), or accessible via a tab if the viewport is 768-1024px.

**Mobile**: Tab-switched with the number line model. Tabs at top: `[ Number Line | Chips ]`, 44px tall tab buttons. Active tab has underline indicator (2px, violet). Swipe gesture between tabs enabled.

**Chip workspace**:
```
┌──────────────────────────────────────┐
│  EXPRESSION:  3 + (-2) = ?           │
│                                      │
│  ┌──────────────────────────────────┐│
│  │          WORKSPACE               ││
│  │                                  ││
│  │   🟢  🟢  🟢                    ││
│  │                                  ││
│  │           (drop zone)            ││
│  │                                  ││
│  │                                  ││
│  └──────────────────────────────────┘│
│                                      │
│  CHIP TRAY:                          │
│  ┌──────────┐  ┌──────────┐         │
│  │ + Add    │  │ - Add     │         │
│  │ Positive │  │ Negative  │         │
│  │   🟢     │  │   🔴      │         │
│  └──────────┘  └──────────┘         │
│                                      │
│  Count: +3, -0  Total: 3            │
│                                      │
│  [ CANCEL PAIRS ]  [ CLEAR ]        │
└──────────────────────────────────────┘
```

#### 4.2.3 Chip Design

**Positive Chip**:
- Circle, 32px diameter (mobile: 36px for touch targets)
- Fill: `#10b981` (emerald-500)
- Border: `2px solid #059669` (emerald-600)
- Inner symbol: `+` in white, `font-size: 14px`, `font-weight: 700`
- Drop shadow: `0 2px 4px rgba(16, 185, 129, 0.3)`
- Touch/hover: scale 1.1, shadow intensifies

**Negative Chip**:
- Circle, 32px diameter (mobile: 36px)
- Fill: `#f43f5e` (rose-500)
- Border: `2px solid #e11d48` (rose-600)
- Inner symbol: `-` in white, `font-size: 14px`, `font-weight: 700`
- Drop shadow: `0 2px 4px rgba(244, 63, 94, 0.3)`

**Zero chip (when cancelling)**:
- Both chips involved in cancellation briefly flash amber (`#fbbf24`)
- Then they "attract" toward each other (translate toward midpoint over 200ms, spring easing)
- At the midpoint: burst animation -- 6 small particles (3 emerald, 3 rose) fly outward 20px in random directions over 300ms, fade to 0
- Both chips fade out simultaneously over 200ms
- A small `0` label floats up from the annihilation point and fades over 500ms: `color: #fbbf24`, `font-size: 0.8rem`
- Sound: soft "pop" (high-frequency transient, 50ms)

#### 4.2.4 Interactions

**Adding chips**: Tap the "+ Add Positive" or "- Add Negative" button. Each tap adds one chip to the workspace using Framer Motion spring animation (`spring: { stiffness: 300, damping: 20 }`). Chips arrange in a loose grid, positive chips on the left half, negative chips on the right half. Maximum 15 chips of each type (to prevent visual overload).

**Dragging chips**: All chips are draggable within the workspace via `@use-gesture/react`. When a positive chip is dragged near a negative chip (centers within 40px), both chips begin to glow and vibrate subtly (translateX oscillation +/- 2px at 30Hz). If released within the 40px proximity, the zero-pair annihilation triggers. If dragged away, the glow/vibrate stops.

**Auto-cancel button**: "CANCEL PAIRS" button triggers automatic sequential cancellation of all possible pairs. Each pair cancels with a 200ms delay between pairs, creating a satisfying cascade. The button is disabled when no pairs can be formed.

**Clear button**: Removes all chips with a collective "scatter" animation (chips fly to edges and fade, 300ms).

**Expression display**: Above the workspace, shows the expression being modeled. Updates live as chips are added/removed. Format: `[positive count] + [negative count] = [net]`, e.g., `3 + (-2) = 1`. Rendered with KaTeX.

**Chip count display**: Below the workspace, shows: `Positive: N | Negative: M | Total: N - M = [result]`

#### 4.2.5 Guided Chip Challenges

After free exploration (first 2-3 chip interactions), the system presents small challenges:

1. **"Show 3 + (-2)"**: "Add 3 positive chips and 2 negative chips, then cancel the pairs. What's left?"
   - Success check: 1 positive chip remaining
   - If student cancels correctly, brief emerald checkmark

2. **"Show 5 + (-5)"**: "What happens when you add equal amounts of positive and negative?"
   - Success check: 0 chips remaining after cancellation
   - Special animation: all chips annihilate, a large amber "0" pulses in the empty workspace

3. **"Show -3 + (-2)"**: "Add 3 negative chips and 2 more negative chips. No cancellation possible!"
   - Success check: 5 negative chips, student recognizes total is -5

These challenges appear as small prompt cards below the expression display, with a "Skip" option (no penalty). Completing challenges counts toward the interaction minimum.

### 4.3 Interaction Counter & Progress

A small progress indicator appears at the bottom of the stage:

- Format: `Interactions: 6 / 10` with a segmented progress bar
- Each interaction fills one segment
- Segments pulse briefly when filled (emerald, 200ms)
- At 10/10: bar fills completely, "Continue" button appears below with a gentle bounce animation (translateY 0 -> -4px -> 0, 300ms, 2 repetitions)
- The counter tracks unique interactions across BOTH models (number line + chips)
- Requirement: at least 2 interactions on each model (prevents skipping one entirely)
- After 10 interactions, the student CAN continue but CAN also keep exploring. No upper limit. Extended exploration beyond 10 earns the "Deep Dive" multiplier (1.5x XP) if total time in Stage 2 exceeds 4 minutes with continued distinct interactions.

---

## 5. Stage 3: Guided Discovery (3-5 min)

### 5.1 Structure

The guided discovery stage uses a sequence of 6 prompts, each building on the previous one. Each prompt has three components:
1. A challenge question
2. An interactive number line where the student performs the operation
3. A reveal/insight moment after the student submits their answer

The student MUST complete each prompt before advancing to the next. The AI tutor observes responses and provides Socratic nudges if the student is stuck.

### 5.2 Prompt Sequence

#### Prompt 1: Foundation -- Positive + Positive

**Challenge text**: "Start at 3. Walk RIGHT 5 steps. Where do you end up?"

**Setup**: Number line (-5 to 15), Walker at position 3, facing right. Controls pre-set: Direction = RIGHT, Steps = 5. Student presses WALK.

**Expected answer**: 8

**On completion**: Equation appears: `3 + 5 = 8`. Brief emerald checkmark (200ms fade in, 1s hold, 300ms fade out). Text: "Walking right = adding. Simple enough."

**If wrong**: (The walking simulator makes it nearly impossible to get this wrong, since the answer is visually shown. If the student somehow enters 8 incorrectly in a confirmation prompt, the system replays the walking animation at 0.5x speed with an overlay counting each step.)

**Insight level**: None (this is calibration/confidence-building)

#### Prompt 2: Adding a Negative

**Challenge text**: "Start at 3. Now add NEGATIVE 5. Adding a negative means you walk LEFT. Where do you land?"

**Setup**: Walker at 3, facing right. When the student sees "add negative 5," the direction auto-toggles to LEFT and steps auto-set to 5, but the student must press WALK.

**Pre-walk hint**: A thought bubble near the Walker says: "Adding (-5) means I turn LEFT and walk 5 steps."

**Expected answer**: -2

**On completion**: Equation: `3 + (-5) = -2`. Zero-crossing animation triggers (the Walker crossed zero). Text: "You crossed zero! Negative territory."

**Insight level**: Moderate -- student sees that adding a negative moves you left. Not explicitly called out yet.

#### Prompt 3: Subtraction

**Challenge text**: "Start at 3. Subtract 5. Walk LEFT 5 steps. Where do you land?"

**Setup**: Walker at 3. Direction = LEFT, Steps = 5. Student presses WALK.

**Expected answer**: -2

**On completion**: Equation: `3 - 5 = -2`. Then THE KEY MOMENT:

**Revelation animation** (auto-plays after 0.5s pause):
1. The equation from Prompt 2 appears above: `3 + (-5) = -2` (rose-tinted, semi-transparent)
2. The equation from Prompt 3 appears below: `3 - 5 = -2` (rose-tinted, semi-transparent)
3. Both equations slide toward center over 600ms
4. `= -2` on both equations pulses amber simultaneously (400ms pulse)
5. A connecting bracket appears between them with text: **"Same answer!"**
6. Text appears below: "Adding a negative IS the same as subtracting! `a + (-b) = a - b`"
7. The connection line and text glow briefly (300ms)

**Sound**: Revelation chord (ascending major triad, 400ms, soft piano timbre)

**Insight level**: HIGH -- this is the first key insight. The system checks: did the student's eyes (engagement proxy via interaction delay) linger on the revelation? If they tap "Continue" within <1s, the AI tutor may prompt: "Wait -- did you notice something interesting about these two answers?"

#### Prompt 4: Setup for Double Negative

**Challenge text**: "Now the mind-bender. Start at 3. SUBTRACT negative 5: `3 - (-5)`. Think about what that means... subtracting a negative."

**Setup**: Walker at 3. This time, NO pre-configured controls. The student must figure out the direction themselves. A hint button is available.

**Scaffolding sequence** (progressive hints if student is stuck):
- **After 15s without action**: Small thought bubble: "Subtracting means LEFT... but it's a negative number..."
- **After 30s**: "When we subtracted a positive, we walked LEFT. What's the OPPOSITE of LEFT?"
- **After 45s**: "Sub means reverse direction. Negative means reverse again. Two reverses = ..."
- **After 60s**: Auto-play the "double turn-around" animation:
  1. Walker at 3, facing RIGHT (default)
  2. Text: "Subtract = turn LEFT" -- Walker turns left (200ms)
  3. Text: "But it's NEGATIVE = turn around AGAIN" -- Walker turns right (200ms)
  4. Text: "You're facing RIGHT again! Walk 5 steps." -- Walker walks right 5 steps
  5. Arrives at 8

**Expected answer**: 8

**On completion**: Equation: `3 - (-5) = 8`. Then:

1. Brief pause (0.5s)
2. Equation from Prompt 1 appears above: `3 + 5 = 8`
3. Current equation below: `3 - (-5) = 8`
4. Both `= 8` values pulse amber
5. Bracket with text: **"Same answer AGAIN!"**
6. Text: "Subtracting a negative IS the same as adding! The two negatives cancel out!"
7. `- (-5)` in the equation animates: the two minus signs glow, slide together, and morph into a single `+` sign. The equation transforms: `3 - (-5) = 8` -> `3 + 5 = 8` with a smooth 800ms morph animation.

**Sound**: Full revelation chord (richer, longer, 600ms, with a subtle shimmering overtone)

**Aha moment detection**: If the student:
- Solved it WITHOUT using hints: strong aha signal
- Solved it with 1-2 hints: moderate aha signal
- Needed the full auto-play: learning signal, not aha

If aha detected, trigger the Aha Moment celebration (see Section 15).

**Insight level**: CRITICAL -- this is the breakthrough moment of the entire lesson.

#### Prompt 5: Consolidation -- Rule Summary

**Not a question** -- this is a visual summary that auto-plays:

A 2x2 grid appears, each cell showing a walking animation:

```
┌─────────────────────┬─────────────────────┐
│   a + b             │   a + (-b)          │
│   Walk RIGHT →      │   Walk LEFT ←       │
│   (adding positive  │   (adding negative  │
│    = rightward)     │    = leftward)      │
│                     │                     │
│   [mini animation]  │   [mini animation]  │
├─────────────────────┼─────────────────────┤
│   a - b             │   a - (-b)          │
│   Walk LEFT ←       │   Walk RIGHT →      │
│   (subtracting      │   (subtracting      │
│    positive =       │    negative =       │
│    leftward)        │    rightward)       │
│                     │                     │
│   [mini animation]  │   [mini animation]  │
└─────────────────────┴─────────────────────┘
```

Each cell has a mini number line with a mini Walker performing the operation. The animations play sequentially: top-left (1s) -> top-right (1s) -> bottom-left (1s) -> bottom-right (1s). Then all four loop simultaneously.

**Color coding**:
- Top-left: emerald border (positive result direction)
- Top-right: rose border
- Bottom-left: rose border
- Bottom-right: emerald border

**Key visual**: The diagonal pair (top-left and bottom-right) both glow emerald -- they give the same direction (RIGHT). The other diagonal (top-right and bottom-left) both glow rose -- same direction (LEFT). A connecting line appears between each diagonal pair with label: "These are the same operation!"

**Duration**: ~8s auto-play, then holds with all four looping. "Continue" button appears after 5s.

#### Prompt 6: Verification Challenge

**Challenge text**: "Quick check! What is `-4 - (-7)`?"

**Setup**: Number line with Walker at -4. Student must configure direction (RIGHT, since double negative = add) and steps (7). This tests whether they can apply the double-negative rule independently.

**Expected answer**: 3

**Scaffolding**: If stuck after 20s: "Remember: subtracting a negative is the same as ___." (Fill in the blank -- "adding")

**On completion**: `(-4) - (-7) = -4 + 7 = 3`. The transformation from `-(-7)` to `+7` is animated (the two negatives slide together and become a plus, 400ms).

**Success text**: "You've got it. Two negatives make a positive -- always."

### 5.3 Progress Tracking

Each prompt completion is recorded. The `lesson.completeStage` tRPC call fires after all 6 prompts are completed.

```typescript
interface DiscoveryPromptResult {
  promptIndex: number;        // 0-5
  correct: boolean;
  hintsUsed: number;          // 0-4 (hint levels)
  timeToAnswerMs: number;
  selfDiscovered: boolean;    // true if answered before auto-play
}
```

The AI tutor receives the full prompt result array to calibrate difficulty for Stage 6 practice.

---

## 6. Stage 4: Symbol Bridge (2-3 min)

### 6.1 Purpose

Formalize the spatial intuition into symbolic rules. Each rule is presented alongside its walking animation, making the symbol-to-spatial mapping explicit (CP-II). This stage does NOT introduce any new concepts -- it simply provides the formal notation for what the student already discovered in Stage 3.

### 6.2 Rule Presentation Sequence

The four rules appear one at a time, each with a synchronized animation. The stage is a vertical scroll (mobile) or paginated carousel (desktop) with left/right navigation.

#### Rule 1: Addition of Positive

**Left panel (40% width)**: KaTeX-rendered rule

```
a + b
```

**Subtitle**: "Start at `a`, walk RIGHT `b` steps"

**Right panel (60% width)**: Mini number line animation
- Number line from -5 to 10
- Walker at position `a = 2` (labeled), facing right
- Walks right `b = 4` steps to reach 6
- Arcs above the line in emerald, labeled "1", "2", "3", "4"
- Result: `2 + 4 = 6` appears

**Visual emphasis**: The `+` sign in the equation pulses emerald briefly. An emerald arrow labeled "RIGHT" fades in above the number line, pointing right.

**Duration**: 3s animation, then holds. Auto-advances after 4s or on tap/scroll.

#### Rule 2: Subtraction of Positive

**Left panel**: KaTeX-rendered rule

```
a - b
```

**Subtitle**: "Start at `a`, walk LEFT `b` steps"

**Right panel**: Mini number line animation
- Walker at `a = 5`, facing left
- Walks left `b = 3` steps to reach 2
- Arcs below the line in rose, labeled "1", "2", "3"
- Result: `5 - 3 = 2`

**Visual emphasis**: The `-` sign pulses rose. A rose arrow labeled "LEFT" appears above the line, pointing left.

#### Rule 3: Addition of Negative (= Subtraction)

**Left panel**: KaTeX-rendered rule

```
a + (-b) = a - b
```

**Subtitle**: "Adding a negative = walking LEFT = subtracting"

**Right panel**: Mini number line animation
- Walker at `a = 3`, initially facing right
- Text: "Add negative..." Walker turns left (200ms)
- Walks left `b = 5` steps to reach -2
- Arcs below line in rose
- Result: `3 + (-5) = -2`
- Below the result, faded: `= 3 - 5 = -2` (showing equivalence)

**Visual emphasis**: The `+ (-)` combination in the equation has a bracket animation: the `+` and `-` in `(-b)` highlight, then a bracket slides over both and morphs them into a single `-`. The equation smoothly transforms: `a + (-b)` -> `a - b`.

**Morph animation details**:
1. 0ms: `a + (-b)` displayed normally
2. 200ms: `+` sign begins fading to 50% opacity, `(` and `)` begin fading
3. 400ms: `-` from inside `(-b)` slides left to replace the `+` sign
4. 600ms: Parentheses fully faded, result is `a - b`
5. 800ms: New form `a - b` pulses once (scale 1.0 -> 1.05 -> 1.0)

#### Rule 4: Subtraction of Negative (= Addition)

**Left panel**: KaTeX-rendered rule

```
a - (-b) = a + b
```

**Subtitle**: "Subtracting a negative = two turns = walking RIGHT = adding"

**Right panel**: Mini number line animation
- Walker at `a = -1`, facing right
- Text: "Subtract..." Walker turns left (200ms)
- Text: "...negative..." Walker turns right again (200ms)
- Text: "Two turns = same direction!"
- Walks right `b = 6` steps to reach 5
- Arcs above line in emerald
- Result: `-1 - (-6) = 5`
- Below: `= -1 + 6 = 5`

**Visual emphasis**: The `- (-)` combination morphs: both minus signs glow, slide toward each other, collide, and transform into a `+` with a small particle burst (6 particles, mixed rose and emerald, expanding 15px and fading over 300ms).

**Morph animation details**:
1. 0ms: `a - (-b)` displayed
2. 200ms: Both `-` signs begin glowing (rose, pulsing)
3. 400ms: `(` and `)` begin fading; inner `-` slides left toward outer `-`
4. 500ms: Two `-` signs overlap at the position of the original `-`
5. 600ms: Collision flash (amber, 100ms). Two `-` signs morph into `+`
6. 700ms: `+` sign settles, colored emerald
7. 800ms: Full equation `a + b` pulses

### 6.3 Interactive Rule Card

After all 4 rules are presented, a compact "rule card" appears that the student can reference during practice:

```
┌──────────────────────────────────────┐
│  INTEGER ADDITION & SUBTRACTION      │
│                                      │
│  + positive  →  walk RIGHT           │
│  - positive  →  walk LEFT            │
│  + negative  →  walk LEFT  (= sub)   │
│  - negative  →  walk RIGHT (= add)   │
│                                      │
│  Remember: two negatives → positive  │
│            - (-b) = + b              │
└──────────────────────────────────────┘
```

- Background: `rgba(15, 23, 42, 0.85)`, `backdrop-filter: blur(12px)`, `border: 1px solid #334155`, rounded 12px
- The card is dismissible (swipe down on mobile, click X on desktop) but can be recalled via a `?` floating button during Practice (Stage 6)
- The card is stored in session state and persists across stages within this lesson

### 6.4 KaTeX Rendering Details

All mathematical expressions in this stage use KaTeX with the following configuration:
- `displayMode: true` for main rule expressions
- `displayMode: false` for inline references
- Custom color macros: `\clr{emerald}{text}` and `\clr{rose}{text}` for sign coloring
- Font size: 1.4rem for rules, 1.0rem for subtitles
- Wrap in Framer Motion `<motion.div>` for entrance animations (fade + slide from bottom, 300ms, stagger 100ms between elements)

---

## 7. Stage 5: Real-World Anchor (1-2 min)

### 7.1 Purpose

Ground the abstract rules in concrete, relatable scenarios. Each scenario maps to a different aspect of integer addition/subtraction. The student sees three mini-scenarios in sequence.

### 7.2 Scenario 1: Temperature

**Context card**:
```
┌──────────────────────────────────────┐
│  🌡️  TEMPERATURE                     │
│                                      │
│  It's 5°C at noon in Moscow.         │
│  By midnight, the temperature        │
│  DROPS 12 degrees.                   │
│                                      │
│  What's the midnight temperature?    │
└──────────────────────────────────────┘
```

**Visualization**: A vertical number line styled as a thermometer (-15 to +20). Mercury level starts at 5. Student taps "Drop 12°" and the mercury animates downward from 5 to -7 over 1.2s with slight mercury-wobble effect at the endpoint. The equation builds alongside: `5 - 12 = -7`.

**Connection text**: "Temperature dropping = subtracting = walking LEFT on the number line."

**Duration**: ~15s including animation.

### 7.3 Scenario 2: Debt and Money

**Context card**:
```
┌──────────────────────────────────────┐
│  💰  MONEY                           │
│                                      │
│  You owe your friend $8 (that's -8). │
│  Your friend CANCELS your debt       │
│  (subtracts the negative).           │
│                                      │
│  What's your balance now?            │
└──────────────────────────────────────┘
```

**Visualization**: A horizontal number line with a money metaphor. The Walker starts at -8. The operation `-(-8)` is shown. The double-negative morph animation plays: `- (-8)` becomes `+ 8`. The Walker walks right 8 steps from -8 to 0. Equation: `-8 - (-8) = -8 + 8 = 0`.

**Connection text**: "Cancelling a debt (removing a negative) = adding money. Subtracting a negative IS adding!"

**Zero-crossing celebration**: Since the Walker arrives exactly at zero, a special "clean zero" animation plays: the zero tick emits concentric amber rings (3 rings, expanding and fading over 800ms).

### 7.4 Scenario 3: Elevation

**Context card**:
```
┌──────────────────────────────────────┐
│  🏔️  ELEVATION                       │
│                                      │
│  A submarine is at -200 meters       │
│  (200m below sea level).             │
│  It rises 350 meters.               │
│                                      │
│  Where is it now?                    │
└──────────────────────────────────────┘
```

**Visualization**: A vertical number line styled as an elevation cross-section, with a blue water region below 0 and sky above. A small submarine icon at -200. Rising animation: submarine moves from -200 to +150 over 2s. The zero (sea level) crossing has a dramatic splash animation: small wave particles at y=0, the submarine emerges into the sky region.

**Equation**: `-200 + 350 = 150`. "150 meters above sea level."

**Connection text**: "Rising = adding positive = walking UP (or RIGHT on a horizontal number line)."

### 7.5 Scenario Presentation

All three scenarios are presented as swipeable cards (mobile) or a horizontal carousel (desktop). Each card auto-plays its animation when it becomes the active card. Navigation dots below: `● ○ ○`, `○ ● ○`, `○ ○ ●`.

After viewing all three, "Continue" button appears. The student does NOT need to answer questions here -- this is purely observational/reinforcement (the anchor stage is for connection, not assessment).

---

## 8. Stage 6: Practice (Adaptive, ~9 problems)

### 8.1 Problem Selection

The practice engine selects problems across three layers (per data model: layer 0 = recall, layer 1 = procedure, layer 2 = understanding). The IRT system targets 85% success rate, adjusting difficulty based on performance.

**Composition**: 9 problems total:
- 3 Recall (layer 0): basic facts, pattern recognition
- 4 Procedure (layer 1): multi-step operations, zero-crossing, mixing models
- 2 Understanding (layer 2): explanation-based, visual proof

Problems are interleaved with each other (not blocked by layer). The order is shuffled but ensures the first problem is always a recall problem (confidence builder per PF-6).

### 8.2 Recall Problems (Layer 0)

#### Problem R1: Basic Positive Operations

**Type**: `integer-add-sub-basic`

**Prompt**: "Use the number line to solve: `7 + 4`"

**Interface**: Mini number line (-5 to 15) with Walker at 7. Direction and steps controls. Student configures and walks. Then submits the answer in a numeric input field.

**Answer**: 11

**Validation**: Exact integer match. The number line animation serves as self-check -- if the Walker ends at 11 but the student typed something else, a gentle prompt: "Hmm, the Walker ended at 11... check your answer?"

**On correct**: Checkmark, +5 XP (recall base).

**On incorrect**: "Let's look at where the Walker landed." Replays walking animation with step-by-step counting overlay.

**Difficulty parameter** (IRT `b`): -1.5 (very easy)

#### Problem R2: Subtraction Crossing Zero

**Type**: `integer-sub-cross-zero`

**Prompt**: "Solve: `3 - 8`"

**Interface**: Number line (-10 to 10), Walker at 3. Student walks left 8 steps.

**Answer**: -5

**Zero-crossing highlight**: When the Walker crosses zero, the crossing animation plays. The equation builder shows the sign change.

**On correct**: Checkmark, +5 XP.

**Difficulty parameter**: -0.8

#### Problem R3: Pattern Recognition

**Type**: `integer-sign-pattern`

**Prompt**: "Without calculating, determine the SIGN of each result (positive, negative, or zero):"
```
a) 12 + (-5) = ?    [Positive / Negative / Zero]
b) -3 + (-9) = ?    [Positive / Negative / Zero]
c) -7 + 7 = ?       [Positive / Negative / Zero]
d) 4 - (-4) = ?     [Positive / Negative / Zero]
```

**Interface**: Four sub-questions, each with a three-way toggle: `[+] [0] [-]`. Toggle buttons are 52px wide x 44px tall. Active button has filled background (emerald for +, amber for 0, rose for -).

**Answers**: a) Positive, b) Negative, c) Zero, d) Positive

**Scoring**: Each correct sub-answer = +2 XP. All four correct = bonus +3 XP (total: 11).

**Partial credit**: 3/4 correct = "Almost! Let's look at the one you missed." The missed sub-question replays its walking animation.

**Difficulty parameter**: -0.3

### 8.3 Procedure Problems (Layer 1)

#### Problem P1: Multi-Step Chain

**Type**: `integer-chain-operations`

**Prompt**: "Evaluate step by step: `(-3) + 7 + (-4) - (-2)`"

**Interface**: Multi-step equation display. The student can tap each operation in sequence. After each tap, the number line animates the step and the running total updates.

**Step breakdown**:
1. Start: -3
2. -3 + 7 = 4 (walk right 7 from -3)
3. 4 + (-4) = 0 (walk left 4 from 4)
4. 0 - (-2) = 0 + 2 = 2 (double negative -> walk right 2 from 0)

**Answer**: 2

**Interface detail**: Each step is a collapsible row:
```
Step 1:  (-3) + 7 = [____]    [Check]
Step 2:  [4] + (-4) = [____]  [Check]
Step 3:  [0] - (-2) = [____]  [Check]
Final answer: [____]          [Submit]
```

The student fills in each intermediate result. Each "Check" validates and animates the step on the number line before unlocking the next step.

**On correct (all steps)**: +10 XP. "Perfect chain! Each step is just one walk."

**On incorrect (any step)**: The incorrect step's animation replays. The student re-enters that step before continuing.

**Difficulty parameter**: 0.5

#### Problem P2: Chip Model Problem

**Type**: `integer-chip-model`

**Prompt**: "A student has 4 positive chips and 6 negative chips on their workspace. After cancelling all zero pairs, what chips remain and what integer do they represent?"

**Interface**: The chip workspace pre-loaded with 4 emerald chips and 6 rose chips. Student taps "Cancel Pairs" -- 4 pairs annihilate, leaving 2 rose chips. Student enters: `-2`.

**Answer**: 2 negative chips remaining, value = -2

**On correct**: +8 XP. "The chips don't lie -- 4 positives cancel 4 negatives, leaving 2 negatives."

**Difficulty parameter**: 0.0

#### Problem P3: Number Line Interpretation

**Type**: `integer-number-line-read`

**Prompt**: A static number line image is shown with:
- Walker starting at position 2 (marked with a flag)
- Arcs drawn: 3 arcs going LEFT (below the line), colored rose
- Walker ending at position -1

"Write the equation this number line represents."

**Interface**: Three input fields: `[start] [operation] [steps] = [result]`
With operation being a dropdown: `+` or `-`.

**Answer**: `2 - 3 = -1` OR `2 + (-3) = -1` (both accepted)

**Validation**: The system accepts both equivalent forms. If the student writes `2 + (-3) = -1`, a note appears: "Great! That's equivalent to `2 - 3 = -1`. Both are correct."

**On correct**: +8 XP.

**Difficulty parameter**: 0.3

#### Problem P4: Fill-in-the-Blank Operations

**Type**: `integer-missing-value`

**Prompt**: "Find the missing number:"
```
a) ___ + 9 = 2
b) 5 - ___ = 12
c) -6 + ___ = 0
```

**Interface**: Three input fields, one per sub-question. Each field accepts integers (including negatives via a +/- toggle button next to the input).

**Answers**: a) -7, b) -7, c) 6

**Scaffolding**: For each sub-question, a "Show on number line" button is available. Pressing it displays the number line with the known values marked and the unknown represented as a `?` label.

For (a): Walker at `?`, walks right 9, arrives at 2. "If I walk right 9 and reach 2, I must have started at 2 - 9 = -7."

For (b): Walker at 5, walks left `?` steps, arrives at 12. "Wait -- subtracting something from 5 gave 12? That means we subtracted a negative! 5 - (-7) = 5 + 7 = 12."

For (c): Walker at -6, walks right `?` steps, arrives at 0. "From -6 to 0 is 6 steps right. So -6 + 6 = 0."

**On correct (all)**: +12 XP. "Finding missing values is like detective work on the number line."

**Difficulty parameter**: 0.8

### 8.4 Understanding Problems (Layer 2)

#### Problem U1: Explain the Equivalence

**Type**: `integer-explain-equivalence`

**Prompt**: "Explain in your own words: Why does `3 + (-5)` give the same result as `3 - 5`? Use the walking metaphor or the chip model to support your explanation."

**Interface**: Free-text input area, minimum 20 characters, maximum 500 characters. Character counter at bottom right. No time limit (PF-6).

**Evaluation**: AI-evaluated via `lesson.submitReflection` endpoint. Scoring criteria:
- Score 1 (weak): Restates the rule without explanation ("because adding a negative is subtracting")
- Score 2 (partial): References one model vaguely ("because you walk in the same direction")
- Score 3 (good): Explains using one model clearly ("Adding -5 means adding something that moves you 5 steps to the LEFT, which is the same as subtracting 5")
- Score 4 (strong): Explains using one model AND connects to the other ("On the number line, both operations move you 5 steps left from 3. With chips, adding 5 negatives to 3 positives cancels 3 pairs, leaving 2 negatives -- same result as removing 5 positives")
- Score 5 (exceptional): Shows deep structural understanding AND provides insight beyond the models

**XP**: `score * 16` (max 80 XP at score 5)

**On submission**: AI provides brief, encouraging feedback:
- Score 1-2: "You're on the right track. Try explaining what 'adding a negative' looks like on the number line -- what direction does the Walker go?"
- Score 3: "Good explanation! The directional insight is key."
- Score 4-5: "Excellent! You connected both models -- that's real mathematical thinking."

**Difficulty parameter**: 1.5

#### Problem U2: Visual Proof

**Type**: `integer-visual-proof`

**Prompt**: "A student claims: 'Subtracting a negative should give a MORE negative result, because you have more negatives.' Explain why this is wrong using the number line."

**Interface**: Free-text input area, same specs as U1. Additionally, a small interactive number line is available for the student to demonstrate an example if they wish.

**Evaluation criteria**:
- Must address the misconception directly (the student conflates "more negatives" with "more negative result")
- Must explain the double-negative as a double reversal or cancellation
- Strong answers provide a concrete example (e.g., "5 - (-3) = 8, which is MORE positive, not more negative")

**XP**: `score * 16` (max 80 XP)

**Scaffolding** (if student writes <20 chars after 60s): "Try this: What is `5 - (-3)`? Work it out on the number line. Is the result more negative or more positive than 5?"

**Difficulty parameter**: 2.0

### 8.5 Practice Session Flow

```
┌──────────────────────────────────────┐
│  Practice: Integer Add/Sub           │
│  Problem 3 of 9                      │
│  ▓▓▓░░░░░░ 33%                       │
├──────────────────────────────────────┤
│                                      │
│  [Problem content area]              │
│                                      │
├──────────────────────────────────────┤
│  [?] Rule Card    [💬] Ask Tutor     │
└──────────────────────────────────────┘
```

**Progress bar**: Top of the practice area. 9 segments. Completed segments: emerald (correct) or amber (correct with hints). Current segment: pulsing violet. Future segments: slate-700.

**Rule card button** `[?]`: Toggles the rule card from Stage 4 as a floating overlay. Semi-transparent background. Dismissible by tapping outside.

**Ask Tutor button** `[💬]`: Opens the AI tutor bottom sheet. The tutor has context about the current problem and can provide Socratic hints. Each hint used is tracked and reduces the auto-derived grade (GOOD -> HARD). The tutor NEVER gives the answer directly (CP-I).

**Between problems**: Brief transition (200ms fade). If the previous problem was correct, a small XP counter floats up: "+8 XP" in emerald, fading over 1s. If incorrect, no XP display (no punishment per gamification anti-patterns).

### 8.6 Problem Ordering Algorithm

1. Start with one Recall problem (confidence builder)
2. Alternate between Procedure and Recall for problems 2-5
3. Insert Understanding problems at positions 6 and 8 (not back-to-back to avoid fatigue)
4. End with a Procedure problem (sense of completion on a "doable" problem)

Actual order example: R1, P1, R2, P2, R3, U1, P3, U2, P4

If the student gets 3+ Procedure problems wrong consecutively, the IRT system lowers difficulty and inserts an additional Recall problem before continuing.

---

## 9. Stage 7: Reflection (~1 min)

### 9.1 Prompt

**Primary reflection prompt**: "Why does subtracting a negative number give the same result as adding a positive? Explain it as if you're teaching a friend who has never seen this before."

### 9.2 Interface

```
┌──────────────────────────────────────┐
│  REFLECTION                          │
│                                      │
│  Why does subtracting a negative     │
│  number give the same result as      │
│  adding a positive?                  │
│                                      │
│  Explain it as if teaching a friend  │
│  who has never seen this before.     │
│                                      │
│  ┌──────────────────────────────────┐│
│  │                                  ││
│  │  [Student types here...]         ││
│  │                                  ││
│  │                                  ││
│  │                                  ││
│  └──────────────────────────────────┘│
│                                      │
│  Characters: 0 / 30 minimum          │
│                                      │
│  [Submit Reflection]                 │
└──────────────────────────────────────┘
```

**Text area**:
- Minimum 30 characters required to submit (enforced; button disabled until met)
- Maximum 1000 characters
- Placeholder text: "Think about what happens on the number line when you subtract a negative..."
- Auto-growing height (starts at 100px, grows to max 250px)
- Character counter updates live. Below 30: `"0 / 30 minimum"` in amber. At 30+: `"45 characters"` in slate-400. Near max: `"980 / 1000"` in amber.

**Submit button**: Disabled until 30 chars. Enabled state: violet gradient, same as Walk button.

### 9.3 AI Evaluation

The reflection is sent to `lesson.submitReflection` endpoint. The AI evaluates on a 0-5 scale using the same criteria as Practice U1 but with an emphasis on "teaching voice" -- is the student explaining clearly enough for someone else to understand?

**Additional scoring signals**:
- References the walking metaphor: +1 quality signal
- References the chip model: +1 quality signal
- Provides a concrete example: +1 quality signal
- Uses the word "cancel" or "opposite" or "reverse": +0.5 quality signal
- References prior concept (NO-1.2 Integers, or a real-world context from Stage 5): triggers `referencesPriorConcept: true` -> Connection Maker multiplier (1.3x)

### 9.4 Post-Reflection Feedback

After submission, the AI provides personalized feedback (3-5 sentences):

**Example (score 4)**:
> "Nice explanation! You captured the key idea: subtracting a negative involves two reversals that cancel out. Your number line example made it concrete. To push even further, you could connect this to the chip model -- when you remove negative chips, the total increases, just like when you add positive chips."

**Example (score 2)**:
> "You've got the basic idea that the two negatives cancel. To strengthen your explanation, try this: imagine you're standing at 5 on the number line. 'Subtract' means turn LEFT. 'Negative' means turn around AGAIN. Two turns put you facing RIGHT -- so you walk right, which is the same as adding. Adding that walking picture would make your explanation really clear."

The feedback appears in a card below the text area with a soft entrance animation (fade + slide from bottom, 300ms).

### 9.5 XP Summary

After feedback, the lesson completion XP summary appears:

```
┌──────────────────────────────────────┐
│  LESSON COMPLETE!                     │
│                                      │
│  Integer Addition & Subtraction       │
│                                      │
│  Lesson completion:        100 XP    │
│  Exploration bonus:         30 XP    │
│  Reflection quality (4/5):  64 XP    │
│  Struggle bonus (1.4x):    applied   │
│  ─────────────────────────────────── │
│  Total:                    272 XP    │
│  Neurons earned:            27       │
│                                      │
│  [View in Knowledge Nebula]          │
│  [Continue to Next Lesson →]         │
└──────────────────────────────────────┘
```

XP values animate in as a counter (0 -> final value, 50ms per digit place). Total has a slight delay (200ms) and pulses once with a glow.

---

## 10. Technical Specifications

### 10.1 Component Architecture

```
src/content/domains/numbers-operations/NO-1.2a/
├── lesson.mdx              # Stage content & narrative text
├── animations.json          # MathScene configs per stage
├── problems.json            # Practice problem bank (all layers)
└── meta.json                # Prerequisites, successors, hooks

src/components/lesson/stages/
├── Hook.tsx                 # Renders hook animation (reads animations.json)
├── SpatialExperience.tsx    # Interactive canvas (number line + chips)
├── GuidedDiscovery.tsx      # Prompt sequence with validation
├── SymbolBridge.tsx         # Rule presentation carousel
├── RealWorldAnchor.tsx      # Scenario cards with mini-animations
├── Practice.tsx             # Problem card sequencer
└── Reflection.tsx           # Text input + AI evaluation
```

**Lesson-specific components** (new for this lesson, reusable for other integer lessons):

```
src/components/math-scene/svg/
├── NumberLineWalker.tsx     # The Walker character + walking animation
├── WalkingArcs.tsx          # Arc path renderer for step visualization
├── ZeroCrossingEffect.tsx   # Pulse + flash animation at zero
└── ChipWorkspace.tsx        # Zero-pair chip model

src/components/math-scene/svg/chips/
├── Chip.tsx                 # Single chip (positive or negative)
├── ChipPair.tsx             # Zero-pair annihilation animation
└── ChipTray.tsx             # Controls for adding/removing chips
```

### 10.2 Walker Animation Implementation

```typescript
// NumberLineWalker.tsx - Core animation logic

interface WalkerProps {
  position: number;
  facing: 'right' | 'left';
  onWalkComplete?: (result: number) => void;
}

interface WalkCommand {
  from: number;
  to: number;
  steps: number;
  direction: 'right' | 'left';
}

// Walking animation uses Framer Motion's useAnimate hook
// Each step is a discrete animation in a sequence:

const walkSequence = async (command: WalkCommand) => {
  const stepDuration = 0.3; // 300ms per step
  const pauseBetweenSteps = 0.1; // 100ms pause
  const stepSize = (command.to - command.from) / command.steps;

  for (let i = 0; i < command.steps; i++) {
    const targetX = command.from + stepSize * (i + 1);

    // 1. Animate walker to next position
    await animate(walkerRef, {
      x: numberLineScale(targetX),
    }, {
      duration: stepDuration,
      ease: [0.25, 0.1, 0.25, 1.0], // ease-out
    });

    // 2. Place footprint at current position
    addFootprint(targetX);

    // 3. Play step sound
    playStepSound(command.direction);

    // 4. Draw arc for this step
    drawStepArc(
      command.from + stepSize * i,
      targetX,
      command.direction,
      i + 1
    );

    // 5. Check for zero crossing
    const prevPos = command.from + stepSize * i;
    if ((prevPos < 0 && targetX >= 0) || (prevPos > 0 && targetX <= 0) || (prevPos >= 0 && targetX < 0) || (prevPos <= 0 && targetX > 0)) {
      triggerZeroCrossingEffect();
    }

    // 6. Pause between steps
    if (i < command.steps - 1) {
      await delay(pauseBetweenSteps * 1000);
    }
  }
};
```

### 10.3 Zero-Pair Chip Animation

```typescript
// ChipPair.tsx - Annihilation animation

const annihilateChips = async (
  positiveChipId: string,
  negativeChipId: string,
  midpoint: { x: number; y: number }
) => {
  // Phase 1: Glow (200ms)
  await parallel([
    animate(positiveChipRef, { boxShadow: '0 0 12px #fbbf24' }, { duration: 0.2 }),
    animate(negativeChipRef, { boxShadow: '0 0 12px #fbbf24' }, { duration: 0.2 }),
  ]);

  // Phase 2: Attract toward midpoint (200ms, spring)
  await parallel([
    animate(positiveChipRef, {
      x: midpoint.x,
      y: midpoint.y,
      scale: 0.8,
    }, { type: 'spring', stiffness: 400, damping: 15 }),
    animate(negativeChipRef, {
      x: midpoint.x,
      y: midpoint.y,
      scale: 0.8,
    }, { type: 'spring', stiffness: 400, damping: 15 }),
  ]);

  // Phase 3: Burst particles (300ms)
  spawnParticles(midpoint, {
    count: 6,
    colors: ['#10b981', '#10b981', '#10b981', '#f43f5e', '#f43f5e', '#f43f5e'],
    radius: 20,
    duration: 0.3,
    fadeOut: true,
  });

  // Phase 4: Fade both chips (200ms)
  await parallel([
    animate(positiveChipRef, { opacity: 0, scale: 0 }, { duration: 0.2 }),
    animate(negativeChipRef, { opacity: 0, scale: 0 }, { duration: 0.2 }),
  ]);

  // Phase 5: Float "0" label (500ms)
  spawnFloatingLabel(midpoint, {
    text: '0',
    color: '#fbbf24',
    floatDistance: 20,
    duration: 0.5,
  });

  // Phase 6: Play pop sound
  playSound('chip-annihilate');
};
```

### 10.4 Animation Timing Reference

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Walker step (each) | 300ms | cubic-bezier(0.25, 0.1, 0.25, 1.0) | Walk command |
| Walker turn | 200ms | ease-in-out | Direction change |
| Walker lift (drag start) | 100ms | ease-out | Grab gesture |
| Arc path draw | 300ms | linear (dasharray) | Per step |
| Zero crossing flash | 300ms | ease-out | Cross zero |
| Zero crossing pulse | 400ms | ease-in-out | Cross zero |
| Chip appear (spring) | ~350ms | spring(300, 20) | Add chip |
| Chip glow (proximity) | 200ms | ease-in | Drag near opposite |
| Chip attract (annihilate) | ~200ms | spring(400, 15) | Release near opposite |
| Chip particles | 300ms | ease-out | Annihilation |
| Chip fade (annihilate) | 200ms | ease-out | Annihilation |
| Equation transition | 350ms | ease-in-out | Result update |
| Rule morph (sign cancel) | 800ms | custom sequence | Symbol Bridge |
| Revelation chord | 400-600ms | n/a (audio) | Key insight moments |
| XP counter | 50ms/digit | linear | Lesson complete |
| Footprint fade | 2000ms | linear | After placement |
| Number line extension | 300ms | ease-out | Range exceeded |
| Context card entrance | 300ms | ease-out (slide up) | Real-World stage |
| Progress segment fill | 200ms | ease-out | Interaction counted |

### 10.5 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--positive` | `#10b981` (emerald-500) | Positive numbers, rightward movement, correct answers |
| `--positive-subtle` | `rgba(16, 185, 129, 0.04)` | Positive region background |
| `--positive-arc` | `rgba(16, 185, 129, 0.8)` | Rightward step arcs |
| `--negative` | `#f43f5e` (rose-500) | Negative numbers, leftward movement |
| `--negative-subtle` | `rgba(244, 63, 94, 0.04)` | Negative region background |
| `--negative-arc` | `rgba(244, 63, 94, 0.8)` | Leftward step arcs |
| `--zero` | `#fbbf24` (amber-400) | Zero emphasis, zero-pair effects |
| `--walker` | `#a78bfa` (violet-400) | Walker body fill |
| `--walker-outline` | `#7c3aed` (violet-600) | Walker border |
| `--primary-action` | `linear-gradient(135deg, #7c3aed, #6d28d9)` | Walk button, Submit button |
| `--surface` | `rgba(15, 23, 42, 0.85)` | Panel backgrounds |
| `--surface-blur` | `blur(12px)` | Panel backdrop filter |
| `--text-primary` | `#f8fafc` (slate-50) | Headings, primary content |
| `--text-secondary` | `#e2e8f0` (slate-200) | Body text |
| `--text-muted` | `#94a3b8` (slate-400) | Labels, captions |
| `--line` | `#94a3b8` (slate-400) | Number line stroke |
| `--tick` | `#64748b` (slate-500) | Tick marks |
| `--label` | `#cbd5e1` (slate-300) | Number labels |

**Color-blind safety** (CP-IV): Positive and negative are distinguished not only by color (emerald vs rose) but also by:
- Direction: arcs drawn ABOVE the line (positive/right) vs BELOW (positive/left)
- Symbols: `+` on positive chips, `-` on negative chips
- Labels: "RIGHT" / "LEFT" text labels
- Pattern: positive arcs are solid, negative arcs can optionally use a dashed pattern (user preference)

### 10.6 Sound Design

| Event | Sound | Duration | Volume | File |
|-------|-------|----------|--------|------|
| Step (rightward) | Soft tap, higher pitch | 80ms | 0.3 | `step-right.mp3` |
| Step (leftward) | Soft tap, lower pitch | 80ms | 0.3 | `step-left.mp3` |
| Zero crossing | Subtle bell-like chime | 200ms | 0.4 | `zero-cross.mp3` |
| Chip annihilation | Pop/click | 50ms | 0.35 | `chip-pop.mp3` |
| Correct answer | Sine wave + click | 150ms | 0.3 | `correct.mp3` |
| Wrong answer | Low soft tone (NOT buzzer) | 200ms | 0.2 | `incorrect.mp3` |
| Revelation (insight) | Ascending major triad | 400ms | 0.35 | `insight.mp3` |
| Breakthrough (aha) | Resonant chord progression | 600ms | 0.4 | `aha.mp3` |
| Lesson complete | Crescendo, electronic | 1200ms | 0.4 | `lesson-complete.mp3` |

All sounds are opt-out (on by default, mutable via `soundEnabled` preference). Sound toggle accessible via settings icon in lesson header.

### 10.7 Responsive Breakpoints

| Breakpoint | Layout Behavior |
|------------|----------------|
| < 375px (small phone) | Full-width number line, controls stacked vertically, reduced font sizes (0.85x), Walker 24px |
| 375-767px (phone) | Full-width number line, controls stacked, tab switch between number line and chips |
| 768-1023px (tablet portrait) | Number line 60% width, controls 40% right panel, chips in tab |
| 1024-1439px (tablet landscape / small desktop) | Number line and chips side by side (50/50), controls below number line |
| >= 1440px (desktop) | Centered max-width 1200px, number line and chips side by side, controls inline |

**Touch targets**: All interactive elements (buttons, toggles, slider thumb, chips) have minimum 44x44px touch areas (DR-5). On viewports < 375px, chips increase to 36px diameter (from 32px) with 44px touch areas.

### 10.8 Performance Budget

| Metric | Target | How Measured |
|--------|--------|-------------|
| SVG element count (number line scene) | < 150 | Dev tools element count |
| SVG element count (chip workspace) | < 100 | Dev tools element count |
| Animation FPS (walking) | >= 55fps P95 | Framer Motion performance monitor |
| Animation FPS (chip annihilation) | >= 55fps P95 | Framer Motion performance monitor |
| JS bundle (lesson-specific) | < 25KB gzipped | Webpack analyzer |
| Time to interactive (Stage 2) | < 500ms | Lighthouse |
| Memory (chip workspace, 15+15 chips) | < 5MB | Chrome DevTools heap |

**Degradation strategy**: On devices detected as low-GPU tier (via `detect-gpu`):
- Reduce particle count in chip annihilation (6 -> 3)
- Disable backdrop-filter blur (replace with solid semi-transparent background)
- Reduce footprint persistence (2s -> 1s)
- Disable arc draw animation (arcs appear instantly)
- Cap DPR at 1x (instead of 2x)

---

## 11. Accessibility

### 11.1 Screen Reader Support

**Number line**:
- `role="figure"`, `aria-label="Interactive number line from negative 15 to positive 15"`
- Walker: `aria-label="Walker character at position [N], facing [direction]"`
- After walk: `aria-live="polite"` region announces: "Walked [N] steps [direction] from [start]. Now at [end]. [Start] [operation] [steps] equals [end]."
- Zero crossing: announced: "Crossed zero."

**Chips**:
- Workspace: `role="region"`, `aria-label="Chip workspace. [N] positive chips, [M] negative chips. Total: [result]"`
- Each chip: `role="button"`, `aria-label="Positive/Negative chip"`, `aria-grabbed` when dragging
- After annihilation: `aria-live="polite"` announces: "One positive and one negative chip cancelled. Zero pair removed."

**Controls**:
- All buttons, sliders, and toggles have explicit `aria-label` attributes (specified in Section 4.1.3)
- Keyboard navigation: Tab order follows visual flow. Focus indicators: 2px violet outline, 2px offset

### 11.2 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move between controls (direction toggle, steps slider, walk button, reset) |
| Space/Enter | Activate focused button/toggle |
| Left/Right Arrow | Adjust slider value; toggle direction |
| Escape | Dismiss rule card overlay; close tutor panel |
| `1`-`9` | Quick-set steps (when slider focused) |

**Number line keyboard interaction**: When the number line SVG is focused:
- Left/Right arrows: move Walker 1 step in the respective direction
- Hold Shift + arrow: move Walker 5 steps
- Home: move Walker to 0
- End: announce current position

### 11.3 Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- Walking animation: instant teleport (no step-by-step sliding), arcs appear fully drawn
- Chip annihilation: instant removal (no attract + burst), "0" label appears without float
- Zero crossing: no flash/pulse, just a brief amber background highlight (200ms)
- Rule morph: instant transformation (no sliding signs)
- Footprints: appear instantly, no fade

### 11.4 Dyslexia Support

When dyslexia-friendly mode is enabled (user preference):
- Body text font switches to OpenDyslexic
- KaTeX rendering remains in its default math font (mathematical symbols should not change)
- Line spacing increases to 1.8x
- Letter spacing increases by 0.05em
- Maximum line width constrained to 65 characters

---

## 12. Content Files

### 12.1 meta.json

```json
{
  "id": "NO-1.2a",
  "name": "Integer Addition & Subtraction",
  "domain": "numbers-operations",
  "gradeLevel": 6,
  "sortOrder": 3,
  "contentPath": "numbers-operations/NO-1.2a",
  "prerequisites": ["NO-1.2"],
  "successors": ["NO-1.2b", "AL-3.2", "NO-1.6"],
  "estimatedDurationMinutes": 16,
  "hook": {
    "text": "City temp at noon 5°C drops 12° by midnight — 'where does mercury land?'",
    "fallbackHook": "Walk 3 steps right from zero... now walk backwards. Welcome to negative numbers."
  },
  "visualRepresentations": [
    "number-line-arrows",
    "chip-zero-pairs",
    "walking-metaphor"
  ],
  "coreInsight": "Adding = walking RIGHT. Subtracting = walking LEFT. Adding negative = walking LEFT. Subtracting negative = double reversal = walking RIGHT.",
  "commonMisconceptions": [
    {
      "id": "double-neg-more-negative",
      "description": "Students think subtracting a negative should give a more negative result because there are 'more negatives'",
      "detection": "Student answers 3 - (-5) as -8 or -2",
      "remediation": "Use the walking metaphor: demonstrate double turn-around. Use chips: show that removing negatives increases the total."
    },
    {
      "id": "add-neg-confusion",
      "description": "Students don't see that a + (-b) and a - b are the same operation",
      "detection": "Student gives different answers for 7 + (-3) and 7 - 3",
      "remediation": "Side-by-side number line animation showing both operations produce identical walks."
    },
    {
      "id": "sign-of-result",
      "description": "Students assume the result's sign always matches the operation's sign (subtracting always gives negative)",
      "detection": "Student marks '5 - 3' as negative",
      "remediation": "Show multiple examples: 5 - 3 = 2 (positive), 3 - 5 = -2 (negative), 5 - 5 = 0. The result's sign depends on magnitudes, not the operation."
    }
  ],
  "crossDomainConnections": [
    {
      "targetId": "AL-3.1",
      "connection": "Integer operations are needed when evaluating expressions with negative variable values"
    },
    {
      "targetId": "NO-1.9",
      "connection": "Absolute value gives the 'distance walked' regardless of direction"
    }
  ]
}
```

### 12.2 animations.json (Partial -- Hook Scene)

```json
{
  "scenes": {
    "hook": {
      "id": "NO-1.2a-hook",
      "renderer": "svg",
      "viewBox": [-6, -3, 17, 7],
      "background": "transparent",
      "objects": [
        {
          "type": "numberLine",
          "id": "hook-number-line",
          "range": [-5, 10],
          "step": 1,
          "markers": [
            {
              "value": 0,
              "label": "0",
              "color": "#fbbf24",
              "style": "dot"
            }
          ],
          "style": {
            "stroke": "#94a3b8",
            "strokeWidth": 1.5
          }
        },
        {
          "type": "group",
          "id": "walker",
          "visible": false,
          "children": [
            {
              "type": "geometricShape",
              "id": "walker-body",
              "shape": "triangle",
              "vertices": [[-0.2, -0.6], [0.2, -0.6], [0, -1.2]],
              "style": {
                "fill": "#a78bfa",
                "stroke": "#7c3aed",
                "strokeWidth": 0.08
              }
            }
          ],
          "transform": {
            "translate": [0, 0]
          }
        },
        {
          "type": "annotation",
          "id": "equation-display",
          "position": [0, -2],
          "latex": "",
          "visible": false,
          "anchor": "center",
          "background": true
        },
        {
          "type": "annotation",
          "id": "narration-text",
          "position": [2.5, 2.5],
          "latex": "",
          "visible": false,
          "anchor": "center"
        }
      ],
      "animations": [
        {
          "id": "hook-sequence",
          "trigger": "auto",
          "steps": [
            {
              "action": "draw",
              "target": "hook-number-line",
              "duration": 0.8,
              "ease": "easeInOut"
            },
            {
              "action": "fadeIn",
              "target": "walker",
              "duration": 0.3,
              "from": "scale"
            },
            {
              "action": "wait",
              "duration": 0.5
            },
            {
              "action": "moveTo",
              "target": "walker",
              "position": [3, 0],
              "duration": 1.5,
              "ease": "easeInOut"
            },
            {
              "action": "parallel",
              "steps": [
                {
                  "action": "fadeIn",
                  "target": "equation-display",
                  "duration": 0.3
                },
                {
                  "action": "transform",
                  "target": "equation-display",
                  "properties": { "latex": "0 + 3 = 3" },
                  "duration": 0.1
                }
              ]
            },
            {
              "action": "wait",
              "duration": 1.5
            },
            {
              "action": "transform",
              "target": "walker-body",
              "properties": { "scaleX": -1 },
              "duration": 0.2,
              "ease": "easeInOut"
            },
            {
              "action": "moveTo",
              "target": "walker",
              "position": [1, 0],
              "duration": 1.0,
              "ease": "easeInOut"
            },
            {
              "action": "transform",
              "target": "equation-display",
              "properties": { "latex": "3 - 2 = 1" },
              "duration": 0.3
            },
            {
              "action": "wait",
              "duration": 1.5
            },
            {
              "action": "moveTo",
              "target": "walker",
              "position": [0, 0],
              "duration": 0.5,
              "ease": "easeInOut"
            },
            {
              "action": "transform",
              "target": "narration-text",
              "properties": { "latex": "\\text{But what if I told you to walk BACKWARDS?}" },
              "duration": 0.1
            },
            {
              "action": "fadeIn",
              "target": "narration-text",
              "duration": 0.4
            },
            {
              "action": "wait",
              "duration": 2.0
            },
            {
              "action": "transform",
              "target": "walker-body",
              "properties": { "scaleX": -1 },
              "duration": 0.2
            },
            {
              "action": "moveTo",
              "target": "walker",
              "position": [-3, 0],
              "duration": 1.5,
              "ease": "easeInOut"
            },
            {
              "action": "transform",
              "target": "equation-display",
              "properties": { "latex": "0 + (-3) = -3" },
              "duration": 0.3
            },
            {
              "action": "transform",
              "target": "narration-text",
              "properties": { "latex": "\\text{Adding and subtracting aren't just math. They're directions.}" },
              "duration": 0.3
            },
            {
              "action": "wait",
              "duration": 2.0
            }
          ]
        }
      ],
      "interactions": []
    },

    "spatial-number-line": {
      "id": "NO-1.2a-spatial-numberline",
      "renderer": "svg",
      "viewBox": [-16, -4, 33, 9],
      "objects": [
        {
          "type": "numberLine",
          "id": "main-number-line",
          "range": [-15, 15],
          "step": 1,
          "markers": [
            { "value": 0, "label": "0", "color": "#fbbf24", "style": "dot" }
          ]
        },
        {
          "type": "group",
          "id": "interactive-walker",
          "children": [
            {
              "type": "geometricShape",
              "id": "interactive-walker-body",
              "shape": "triangle",
              "vertices": [[-0.3, -0.7], [0.3, -0.7], [0, -1.5]],
              "style": { "fill": "#a78bfa", "stroke": "#7c3aed", "strokeWidth": 0.08 },
              "draggableVertices": false
            }
          ],
          "transform": { "translate": [0, 0] }
        }
      ],
      "animations": [],
      "interactions": [
        {
          "id": "drag-walker",
          "type": "drag",
          "target": "interactive-walker",
          "onUpdate": [
            {
              "source": "x",
              "target": "interactive-walker",
              "property": "transform.translate[0]",
              "transform": "Math.round(value)"
            }
          ]
        }
      ]
    }
  }
}
```

### 12.3 problems.json (Representative Subset)

```json
{
  "conceptId": "NO-1.2a",
  "problems": [
    {
      "id": "NO-1.2a-R1",
      "layer": 0,
      "difficultyB": -1.5,
      "discriminationA": 1.0,
      "templateType": "integer-add-sub-basic",
      "content": {
        "prompt": "Use the number line to solve: 7 + 4",
        "type": "numeric-input",
        "correctAnswer": 11,
        "numberLineConfig": {
          "range": [-5, 15],
          "walkerStart": 7,
          "operation": "+",
          "operand": 4
        },
        "feedbackCorrect": "Walking right 4 steps from 7 lands you at 11.",
        "feedbackIncorrect": "Let's replay: start at 7, walk RIGHT 4 steps. Count each step: 8, 9, 10, 11."
      },
      "explanationPrompt": "Why does walking right represent addition?"
    },
    {
      "id": "NO-1.2a-R2",
      "layer": 0,
      "difficultyB": -0.8,
      "templateType": "integer-sub-cross-zero",
      "content": {
        "prompt": "Solve: 3 - 8",
        "type": "numeric-input",
        "correctAnswer": -5,
        "numberLineConfig": {
          "range": [-10, 10],
          "walkerStart": 3,
          "operation": "-",
          "operand": 8
        },
        "feedbackCorrect": "You crossed zero! 3 steps left to 0, then 5 more steps into negative territory.",
        "feedbackIncorrect": "Start at 3 and walk LEFT 8 steps. You'll pass through zero and keep going."
      },
      "explanationPrompt": "What does it mean when you cross zero while subtracting?"
    },
    {
      "id": "NO-1.2a-P1",
      "layer": 1,
      "difficultyB": 0.5,
      "templateType": "integer-chain-operations",
      "content": {
        "prompt": "Evaluate step by step: (-3) + 7 + (-4) - (-2)",
        "type": "multi-step",
        "steps": [
          { "expression": "(-3) + 7", "answer": 4 },
          { "expression": "4 + (-4)", "answer": 0 },
          { "expression": "0 - (-2)", "answer": 2 }
        ],
        "finalAnswer": 2,
        "feedbackCorrect": "Perfect chain! Each step is just one walk on the number line.",
        "feedbackIncorrect": "Let's break it down one step at a time. Start at -3..."
      },
      "explanationPrompt": "How did you handle the - (-2) at the end?"
    },
    {
      "id": "NO-1.2a-U1",
      "layer": 2,
      "difficultyB": 1.5,
      "templateType": "integer-explain-equivalence",
      "content": {
        "prompt": "Explain in your own words: Why does 3 + (-5) give the same result as 3 - 5? Use the walking metaphor or the chip model to support your explanation.",
        "type": "free-text",
        "minCharacters": 20,
        "maxCharacters": 500,
        "evaluationRubric": {
          "1": "Restates rule without explanation",
          "2": "References one model vaguely",
          "3": "Explains using one model clearly",
          "4": "Explains using one model AND connects to the other",
          "5": "Shows deep structural understanding with novel insight"
        }
      },
      "explanationPrompt": null,
      "isTransfer": false
    },
    {
      "id": "NO-1.2a-U2",
      "layer": 2,
      "difficultyB": 2.0,
      "templateType": "integer-visual-proof",
      "content": {
        "prompt": "A student claims: 'Subtracting a negative should give a MORE negative result, because you have more negatives.' Explain why this is wrong using the number line.",
        "type": "free-text",
        "minCharacters": 20,
        "maxCharacters": 500,
        "misconceptionTargeted": "double-neg-more-negative",
        "evaluationRubric": {
          "1": "Says 'it just doesn't work that way'",
          "2": "Provides correct example without clear explanation",
          "3": "Addresses the misconception using one model",
          "4": "Explains double reversal clearly with example",
          "5": "Identifies the root confusion (confusing quantity of negatives with negativity of result)"
        }
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
  conceptId: 'NO-1.2a',
  conceptName: 'Integer Addition & Subtraction',
  currentStage: 'spatial-experience' | 'guided-discovery' | 'practice',
  studentHistory: {
    walkerInteractions: WalkInteraction[],
    chipInteractions: ChipInteraction[],
    discoveryPromptResults: DiscoveryPromptResult[],
    practiceResults: ProblemResult[],
  },
  commonMisconceptions: [
    'double-neg-more-negative',
    'add-neg-confusion',
    'sign-of-result',
  ],
  availableModels: ['number-line', 'chip-model'],
  currentSceneState: SceneDefinition, // What the canvas currently shows
};
```

### 13.2 Tutor Behavioral Guidelines

1. **Default to Socratic** (CP-I): Never say "the answer is X." Instead: "What happens when you walk left from 3?" or "How many chips are left after cancellation?"

2. **Reference the student's own exploration**: "I noticed you tried starting at -5 and walking right 3. What did you notice about the result?"

3. **Use the correct model**: If the student is on the number line tab, respond with walking metaphors. If on the chip tab, use chip/cancellation language.

4. **Detect and address misconceptions**: If the student's answer pattern matches a known misconception (from `meta.json`), guide toward the correct understanding using the prescribed remediation strategy.

5. **Generate scene commands**: The tutor can create number line demonstrations or chip arrangements to illustrate points:

```typescript
// Example: Tutor demonstrates 3 - (-5) on the number line
const commands: SceneCommand[] = [
  {
    action: 'modify',
    targetId: 'interactive-walker',
    properties: { transform: { translate: [3, 0] } }
  },
  {
    action: 'animate',
    sequence: {
      trigger: 'auto',
      steps: [
        { action: 'transform', target: 'interactive-walker-body', properties: { scaleX: -1 }, duration: 0.2 },
        { action: 'wait', duration: 0.3 },
        { action: 'transform', target: 'interactive-walker-body', properties: { scaleX: 1 }, duration: 0.2 },
        { action: 'moveTo', target: 'interactive-walker', position: [8, 0], duration: 1.5 },
      ]
    }
  }
];
```

### 13.3 Frustration Detection

The tutor monitors for frustration signals (per the SRS system's `emotionalState` tracking):

| Signal | Threshold | Response |
|--------|-----------|----------|
| Rapid incorrect answers (< 3s response time) | 3 consecutive | "Let's slow down. No rush. Try walking it out on the number line step by step." |
| Long idle time | > 90s on one prompt | Offer a hint proactively. "Need a hand? I can show you what 'subtracting a negative' looks like on the number line." |
| Repeated same wrong answer | Same answer 2+ times | "I see you keep getting [X]. Let's think about why that doesn't work..." |
| Erasing/restarting frequently | 3+ resets in 60s | "It's totally normal to need a few tries. Let me walk through a similar one first." |

---

## 14. Edge Cases & Error Handling

### 14.1 Number Line Edge Cases

| Scenario | Handling |
|----------|---------|
| Walker walks beyond visible range (-15 or +15) | ViewBox smoothly expands by 5 units in the exceeded direction (300ms animation). New ticks and labels render during expansion. Maximum range: -30 to +30 (slider max 9 from -15 can reach -24, or from +15 can reach +24). |
| Walker at exactly 0 during a walk | Normal behavior. Zero crossing effect does NOT trigger (no crossing occurred). |
| Walker starts and ends at the same position | Valid (e.g., start at 5, walk 0 steps -- but slider minimum is 1, so this cannot actually happen with the slider. If via chip model: adding 3 positive and 3 negative = 0 net change). |
| Rapid repeated Walk button presses | Walk button disabled during animation. Re-enables after walk completes (with 100ms debounce). |
| Pinch-zoom to extreme zoom levels | Min zoom: all range visible. Max zoom: 5 integer tick marks visible. Clamp with spring-back if exceeded. |

### 14.2 Chip Model Edge Cases

| Scenario | Handling |
|----------|---------|
| More than 15 chips of one type | Buttons disable at 15 with tooltip: "Maximum 15 chips of each type." |
| Drag chip outside workspace bounds | Chip snaps back to its original position (spring animation, 200ms). |
| Two positive chips dragged together | No interaction (only positive + negative pairs annihilate). Chips pass through each other. |
| All chips cleared during a guided challenge | The challenge prompt remains. The student can re-add chips. |
| Rapid chip additions (spam clicking) | Debounce at 100ms per chip addition. Queue additions and process with 50ms spacing for visual clarity. |

### 14.3 Input Validation

| Field | Validation | Error Display |
|-------|-----------|---------------|
| Numeric answer inputs | Integer only, range -999 to 999. No decimals. | Inline: "Enter a whole number" (below input, rose text, 0.75rem) |
| Free-text reflections | Min 20-30 chars (depending on problem). Max 500-1000 chars. | Character counter turns rose below minimum. Submit button disabled. |
| Missing value fill-in-blank | Integer only, including negatives. The `-` sign is toggled via a +/- button, not typed. | "+/- toggle" button next to input field |

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
| Exploration bonus (Stage 2) | 0-40 | Diversity of interactions (both models, both directions, zero crossing, negative starts, 3+ start positions) |
| Guided discovery insight (Stage 3) | 0-30 | Solved double-negative prompt without hints (30), with 1-2 hints (15), with auto-play (0) |
| Reflection quality (Stage 7) | 0-80 | AI score * 16 |
| Practice problems (Stage 6) | ~50 total | 5 XP per recall correct, 8-12 per procedure correct, score*16 per understanding |

**Multipliers** (applied to total):
- Deep Dive (1.5x): >4 min in Stage 2 with continued distinct interactions beyond the 10 minimum
- Connection Maker (1.3x): Reflection references a prior concept (NO-1.2 Integers, absolute value, etc.)
- Struggle Bonus (1.4x): Got double-negative wrong initially, retried, then explained correctly in reflection

### 15.2 Achievement Triggers

| Achievement | Trigger in This Lesson | Category |
|-------------|----------------------|----------|
| Edge Walker | Tried starting positions at -15 and +15 in spatial exploration | Exploration |
| Second Wind | Got double-negative wrong -> review -> solved harder version correctly | Persistence |
| The Teacher | Reflection rated 5/5 by AI | Mastery |
| Another Way | Used chip model to solve a problem that was presented as a number line problem | Creativity |
| Debugging Mind | In Practice U2, correctly identified AND explained the specific misconception | Persistence |

### 15.3 Aha Moment Detection

Aha moment celebration triggers when:
- Student solves Prompt 4 (double negative) WITHOUT using any hints AND
- Time to answer is > 10s (indicating genuine thought, not random guessing) AND
- Time to answer is < 60s (did not need auto-play)

OR:
- Student gets a Practice problem wrong, asks tutor for help, then gets the NEXT similar problem correct AND writes a quality explanation (score >= 3)

**Aha celebration sequence** (per gamification-design.md):
1. Neuron Flash: brief neural network animation from the answer area (300ms)
2. Text: "That's the connection!" -- emerald text, slight glow, centered (1s hold)
3. Optional reflection prompt: "What clicked?" (small text input, 50 char max, optional)
4. +30 discovery XP

### 15.4 Knowledge Nebula Update

On lesson completion, the NO-1.2a node in the Knowledge Nebula transitions:
- Previous state: `AVAILABLE` (pulsing softly)
- New state: `IN_PROGRESS` or `MASTERED` depending on practice performance
  - Mastered: all 9 practice problems correct OR 8/9 correct with understanding score >= 3
  - In Progress: otherwise

The constellation line connecting NO-1.2 -> NO-1.2a illuminates. If NO-1.2a is mastered, the line to NO-1.2b begins pulsing (indicating it is now available).

---

## 16. Constitution Compliance

| Principle | How This Lesson Complies |
|-----------|-------------------------|
| **CP-I: Understanding Over Memorization** | Two free-text explanation problems in practice. Reflection stage requires explanation. XP weighted toward explanation (0-80) over procedure (50 base). AI tutor is Socratic, never gives answers. |
| **CP-II: Visual First, Symbolic Second** | Stages 1-3 are entirely spatial (walking + chips). Symbols (formal rules) appear only in Stage 4, after the student has already discovered the relationships visually. |
| **CP-III: No Dead-End Content** | Backward link: NO-1.2 (Integers). Forward links: NO-1.2b, AL-3.2, NO-1.6. Cross-domain connections documented in meta.json. Knowledge Nebula reflects connections. |
| **CP-IV: Accessibility** | Full ARIA labels, keyboard navigation, screen reader announcements, reduced-motion support, dyslexia font option, color-blind safe (direction + symbol + color for sign distinction), 44px+ touch targets. |
| **CP-V: Performance** | <150 SVG elements per scene, 300ms step animation easing, performance budgets defined, low-GPU degradation path. |
| **CP-VI: Privacy** | No PII in lesson content. Interaction data (walk commands, chip interactions) stored with student ID only. Offline-first with encrypted IndexedDB. |
| **CP-VII: Open Curriculum** | All content in MDX + JSON files under CC BY-SA. Animation configs are declarative JSON, not embedded in engine code. |

| Dev Rule | Compliance |
|----------|-----------|
| **DR-1: TypeScript Strict** | All component interfaces typed (WalkerProps, WalkCommand, ChipPairProps, etc.). No `any` types. |
| **DR-2: Test Math** | Walking animation end-position computed as `start + (direction === 'right' ? steps : -steps)`. Unit test: verify for all integer combinations in [-15, 15]. Chip cancellation: `result = positiveCount - negativeCount`. Test zero-pair counting. |
| **DR-3: Animation Review** | Walking animation reviewed for mathematical accuracy (each step = exactly 1 unit). Chip annihilation reviewed for correct pairing logic. |
| **DR-4: Content-Code Separation** | All lesson text, problem content, and animation configs in `src/content/domains/numbers-operations/NO-1.2a/`. Engine components are generic (`NumberLineWalker`, `ChipWorkspace`). |
| **DR-5: Mobile-First** | Controls stacked vertically on mobile. Tab switching for models. 44px+ touch targets. Bottom sheet for tutor. |
| **DR-6: Offline-First** | Problem bank pre-fetched. Interactions queued in IndexedDB. Reflection deferred evaluation on connectivity loss. |
| **DR-7: i18n** | All text strings externalized. KaTeX expressions use locale-independent notation. Direction labels ("RIGHT"/"LEFT") are in locale files. |

---

## Appendix A: Test Plan

### Unit Tests (`tests/unit/math/NO-1.2a.test.ts`)

```typescript
describe('Integer Addition/Subtraction - Walking Model', () => {
  test.each([
    [3, 'right', 5, 8],      // 3 + 5 = 8
    [3, 'left', 5, -2],      // 3 - 5 = -2
    [-3, 'right', 7, 4],     // -3 + 7 = 4
    [-3, 'left', 2, -5],     // -3 - 2 = -5
    [0, 'right', 0, 0],      // edge: no movement (if allowed)
    [-15, 'left', 9, -24],   // edge: far negative
    [15, 'right', 9, 24],    // edge: far positive
    [0, 'left', 1, -1],      // crossing zero from right
    [0, 'right', 1, 1],      // edge: at zero
    [-1, 'right', 1, 0],     // crossing zero from left
  ])('walk(%i, %s, %i) = %i', (start, dir, steps, expected) => {
    expect(computeWalkResult(start, dir, steps)).toBe(expected);
  });

  test('zero crossing detection', () => {
    expect(detectsZeroCrossing(3, -2)).toBe(true);   // 3 to -2 crosses zero
    expect(detectsZeroCrossing(3, 5)).toBe(false);    // 3 to 5 does not
    expect(detectsZeroCrossing(-1, 1)).toBe(true);    // -1 to 1 crosses zero
    expect(detectsZeroCrossing(-3, -5)).toBe(false);  // both negative
    expect(detectsZeroCrossing(0, 3)).toBe(false);    // starts at zero, does not cross
    expect(detectsZeroCrossing(0, -3)).toBe(false);   // starts at zero, does not cross
  });
});

describe('Chip Model', () => {
  test.each([
    [3, 0, 3],       // 3 positive, 0 negative = 3
    [0, 3, -3],      // 0 positive, 3 negative = -3
    [3, 2, 1],       // 3 positive, 2 negative = 1 after cancellation
    [5, 5, 0],       // equal = 0
    [2, 7, -5],      // more negative = negative result
    [0, 0, 0],       // edge: no chips
    [15, 15, 0],     // edge: max chips
  ])('chipResult(%i positive, %i negative) = %i', (pos, neg, expected) => {
    expect(computeChipResult(pos, neg)).toBe(expected);
  });

  test('zero pair count', () => {
    expect(countZeroPairs(3, 2)).toBe(2);
    expect(countZeroPairs(5, 5)).toBe(5);
    expect(countZeroPairs(0, 3)).toBe(0);
    expect(countZeroPairs(7, 0)).toBe(0);
  });
});
```

### Integration Tests (`tests/integration/lesson-flow/NO-1.2a.test.ts`)

- Verify all 7 stages render and progress correctly
- Verify walk animation produces correct final position for 20 random inputs
- Verify chip annihilation removes correct number of pairs
- Verify equation builder matches walking result
- Verify zero-crossing effect triggers only when crossing zero
- Verify practice problem submission and XP calculation
- Verify reflection submission and AI evaluation integration

### E2E Tests (`tests/e2e/NO-1.2a.spec.ts`)

- Full lesson playthrough: Hook -> Spatial -> Discovery -> Symbol -> RealWorld -> Practice (all correct) -> Reflection
- Verify XP totals at end
- Verify Knowledge Nebula node state update
- Verify offline mode: complete lesson without network, reconnect, verify sync

---

## Appendix B: Localization Keys

All user-facing strings for this lesson are externalized under the namespace `lesson.NO-1.2a` in the locale file:

```json
{
  "lesson.NO-1.2a.hook.narration.walkRight": "Walk {steps} steps right...",
  "lesson.NO-1.2a.hook.narration.youreAt": "...you're at {position}.",
  "lesson.NO-1.2a.hook.narration.nowWalkLeft": "Now walk {steps} steps left...",
  "lesson.NO-1.2a.hook.narration.easy": "Easy.",
  "lesson.NO-1.2a.hook.narration.backToZero": "Back to zero.",
  "lesson.NO-1.2a.hook.narration.whatIfBackwards": "But what if I told you to walk BACKWARDS?",
  "lesson.NO-1.2a.hook.narration.walkBackward": "Walk {steps} steps backward from zero...",
  "lesson.NO-1.2a.hook.narration.youreAtNeg": "...you're at negative {position}.",
  "lesson.NO-1.2a.hook.narration.directions": "Adding and subtracting aren't just math. They're directions.",
  "lesson.NO-1.2a.spatial.direction.right": "RIGHT",
  "lesson.NO-1.2a.spatial.direction.left": "LEFT",
  "lesson.NO-1.2a.spatial.controls.direction": "Direction",
  "lesson.NO-1.2a.spatial.controls.steps": "Steps",
  "lesson.NO-1.2a.spatial.controls.walk": "WALK",
  "lesson.NO-1.2a.spatial.controls.reset": "RESET",
  "lesson.NO-1.2a.spatial.equation.start": "Start: {value}",
  "lesson.NO-1.2a.spatial.chips.addPositive": "Add Positive",
  "lesson.NO-1.2a.spatial.chips.addNegative": "Add Negative",
  "lesson.NO-1.2a.spatial.chips.cancelPairs": "CANCEL PAIRS",
  "lesson.NO-1.2a.spatial.chips.clear": "CLEAR",
  "lesson.NO-1.2a.spatial.chips.count": "Positive: {pos} | Negative: {neg} | Total: {total}",
  "lesson.NO-1.2a.spatial.progress": "Interactions: {current} / {required}",
  "lesson.NO-1.2a.discovery.prompt1": "Start at 3. Walk RIGHT 5 steps. Where do you end up?",
  "lesson.NO-1.2a.discovery.prompt2": "Start at 3. Now add NEGATIVE 5. Adding a negative means you walk LEFT. Where do you land?",
  "lesson.NO-1.2a.discovery.prompt3": "Start at 3. Subtract 5. Walk LEFT 5 steps. Where do you land?",
  "lesson.NO-1.2a.discovery.prompt4": "Now the mind-bender. Start at 3. SUBTRACT negative 5: 3 - (-5). Think about what that means... subtracting a negative.",
  "lesson.NO-1.2a.discovery.prompt5.rule1": "a + b: start at a, walk RIGHT b steps",
  "lesson.NO-1.2a.discovery.prompt5.rule2": "a - b: start at a, walk LEFT b steps",
  "lesson.NO-1.2a.discovery.prompt5.rule3": "a + (-b) = a - b: adding negative = walking left",
  "lesson.NO-1.2a.discovery.prompt5.rule4": "a - (-b) = a + b: subtracting negative = walking right",
  "lesson.NO-1.2a.discovery.prompt6": "Quick check! What is -4 - (-7)?",
  "lesson.NO-1.2a.discovery.sameAnswer": "Same answer!",
  "lesson.NO-1.2a.discovery.addNegIsSubtract": "Adding a negative IS the same as subtracting!",
  "lesson.NO-1.2a.discovery.subNegIsAdd": "Subtracting a negative IS the same as adding! The two negatives cancel out!",
  "lesson.NO-1.2a.discovery.twoNegCancel": "You've got it. Two negatives make a positive — always.",
  "lesson.NO-1.2a.symbolBridge.rule.addPos": "Start at a, walk RIGHT b steps",
  "lesson.NO-1.2a.symbolBridge.rule.subPos": "Start at a, walk LEFT b steps",
  "lesson.NO-1.2a.symbolBridge.rule.addNeg": "Adding a negative = walking LEFT = subtracting",
  "lesson.NO-1.2a.symbolBridge.rule.subNeg": "Subtracting a negative = two turns = walking RIGHT = adding",
  "lesson.NO-1.2a.symbolBridge.remember": "Remember: two negatives make a positive. -(-b) = +b",
  "lesson.NO-1.2a.realworld.temperature.title": "TEMPERATURE",
  "lesson.NO-1.2a.realworld.temperature.scenario": "It's 5°C at noon in Moscow. By midnight, the temperature DROPS 12 degrees.",
  "lesson.NO-1.2a.realworld.temperature.question": "What's the midnight temperature?",
  "lesson.NO-1.2a.realworld.temperature.connection": "Temperature dropping = subtracting = walking LEFT on the number line.",
  "lesson.NO-1.2a.realworld.money.title": "MONEY",
  "lesson.NO-1.2a.realworld.money.scenario": "You owe your friend $8 (that's -8). Your friend CANCELS your debt (subtracts the negative).",
  "lesson.NO-1.2a.realworld.money.question": "What's your balance now?",
  "lesson.NO-1.2a.realworld.money.connection": "Cancelling a debt (removing a negative) = adding money. Subtracting a negative IS adding!",
  "lesson.NO-1.2a.realworld.elevation.title": "ELEVATION",
  "lesson.NO-1.2a.realworld.elevation.scenario": "A submarine is at -200 meters (200m below sea level). It rises 350 meters.",
  "lesson.NO-1.2a.realworld.elevation.question": "Where is it now?",
  "lesson.NO-1.2a.realworld.elevation.connection": "Rising = adding positive = walking UP (or RIGHT on a horizontal number line).",
  "lesson.NO-1.2a.reflection.prompt": "Why does subtracting a negative number give the same result as adding a positive? Explain it as if teaching a friend who has never seen this before.",
  "lesson.NO-1.2a.reflection.placeholder": "Think about what happens on the number line when you subtract a negative...",
  "lesson.NO-1.2a.reflection.minChars": "{current} / {min} minimum",
  "lesson.NO-1.2a.complete.title": "LESSON COMPLETE!",
  "lesson.NO-1.2a.complete.lessonCompletion": "Lesson completion",
  "lesson.NO-1.2a.complete.explorationBonus": "Exploration bonus",
  "lesson.NO-1.2a.complete.reflectionQuality": "Reflection quality ({score}/5)",
  "lesson.NO-1.2a.complete.total": "Total",
  "lesson.NO-1.2a.complete.neuronsEarned": "Neurons earned"
}
```
