# Lesson Design: NT-2.1 Factors & Multiples

**Topic ID**: NT-2.1
**Domain**: Number Theory (Domain 2)
**Grade**: 6
**Prerequisite**: NO-1.1 (Place Value)
**Successors**: NT-2.2 (Prime & Composite), NT-2.3 (GCF & LCM), NO-1.4a (Fraction Operations)
**Estimated Duration**: 12-18 minutes (adaptive)
**Constitution Compliance**: All 7 Core Principles verified; full NLS pipeline

---

## Core Insight

A factor of N is a number that divides N evenly -- that is, with zero remainder. Factors come in pairs that multiply to give N. Every positive integer greater than 1 has at least two factors: 1 and itself. Numbers with exactly two factors are prime; numbers with more than two are composite. The number 1 has only one factor and is neither prime nor composite.

The rectangle array model makes this tangible: a factor pair (a, b) of N corresponds to an a-by-b rectangle built from exactly N dots. Finding all factor pairs of N is equivalent to finding all rectangles that can be built with exactly N dots. This transforms an abstract divisibility question into a spatial search problem.

---

## Neuroscience Framework

### Neural Pathway Activation

| Pathway | How This Lesson Engages It | Constitution Reference |
|---------|---------------------------|----------------------|
| Intraparietal sulcus (IPS) | Spatial arrangement of dots into rectangular grids activates the number-magnitude overlap region | PF-1 (Spatial-Mathematical Neural Overlap) |
| Motor cortex | Physically dragging dot grid edges to reshape rectangles encodes factor pairs through embodied action | PF-3 (Embodied Cognition) |
| Pattern recognition (prefrontal) | Observing that factors always come in pairs, and that pairs "meet in the middle," triggers mathematical pattern detection | PF-1 |
| Reward prediction (dopamine) | Hook animation surprises with multiple rearrangements; finding hidden factor pairs triggers discovery reward | NLS Stage 1 |
| Visuospatial sketchpad (working memory) | Holding the rectangle shape in mind while comparing it to the factor pair list exercises visual working memory | PF-2 (Dual Coding) |

### Emotional Arc

| Phase | Emotion | Trigger | Duration |
|-------|---------|---------|----------|
| Hook | Surprise, curiosity | 12 dots rearranging into multiple rectangles autonomously | 0:00-0:45 |
| Early spatial | Playful exploration | "How many rectangles can I make?" -- low stakes, no right/wrong yet | 0:45-2:00 |
| Mid spatial | Productive struggle | Trying to force invalid rectangles (e.g., 5x_ for 12) -- dots don't fit | 2:00-3:30 |
| Discovery | Delight | Realizing factors come in pairs; seeing the pattern | 3:30-5:00 |
| Prime encounter | Wonder | 7 (or 11, 13) has only ONE rectangle -- "this number is special" | 5:00-6:00 |
| Symbol bridge | Confidence | Formal notation maps cleanly onto what they already discovered spatially | 6:00-8:00 |
| Practice | Flow | Problems feel achievable because the spatial model is internalized | 8:00-14:00 |
| Reflection | Satisfaction | Articulating the pattern in their own words | 14:00-15:00 |

### Anxiety Mitigation (PF-6)

- NO timer anywhere in this lesson. Not displayed, not tracked visually.
- Invalid rectangle attempts show gentle visual feedback ("doesn't divide evenly!") -- never "WRONG" or red X.
- The spatial exploration phase has no correct/incorrect framing -- all exploration is valid.
- Factor pair list uses "? x ?" for undiscovered pairs, not empty slots that feel like failures.
- Practice problems use the gamification system's neutral-positive feedback language.

---

## Stage 1: Hook (30-60 seconds)

### Scene Definition

```json
{
  "id": "nt-2.1-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 320],
  "background": "transparent",
  "objects": [],
  "animations": [],
  "interactions": []
}
```

### Detailed Animation Sequence

**T=0.0s -- Initial State: Random Dot Cluster**

12 SVG circles appear in a seemingly random cluster near the center of the viewport. Each dot is positioned with slight random offsets from a loose cloud formation. Dots fade in with staggered timing (40ms between each dot).

- Dot properties:
  - `r`: 12px (mobile), 10px (desktop)
  - `fill`: `#818cf8` (indigo-400)
  - `stroke`: `#6366f1` (indigo-500)
  - `strokeWidth`: 1.5px
  - Initial `opacity`: 0, animated to 1
  - `filter`: `drop-shadow(0 1px 2px rgba(129, 140, 248, 0.3))`
- Random positions: distributed within a 120x100px region centered at (200, 160)
- Fade-in: each dot uses `spring(damping: 20, stiffness: 300)` with `opacity: 0 -> 1` and `scale: 0.3 -> 1`
- Stagger: 40ms per dot, total entry time ~480ms
- Sound: soft crystalline chime, one note per dot (ascending chromatic, very quiet -- 20% volume)

**T=0.8s -- Pause (dots settle)**

All 12 dots visible in random cluster. Hold for 0.6s to let the eye register the quantity.

**T=1.4s -- First Rearrangement: 3x4 Rectangle**

Dots animate from random positions to a 3-row by 4-column grid.

- Grid spacing: 36px horizontal, 36px vertical
- Grid origin: centered in viewBox (200, 160), so top-left dot at (200 - 1.5*36, 160 - 1*36) = (146, 124)
- Animation: `spring(damping: 25, stiffness: 400)` on each dot's `cx`/`cy`
- Stagger: 0ms (all dots move simultaneously -- satisfying "snap" feeling)
- Duration: ~400ms (spring settles)
- On settle: brief pulse effect -- all dots scale to 1.08 then back to 1.0 over 150ms
- Sound: satisfying mechanical "click" (like LEGO snapping), 200ms

**T=1.8s -- Label Appears: "12 = 3 x 4"**

- KaTeX annotation fades in below the rectangle
- Position: centered horizontally, 28px below bottom row of dots
- `latex`: `"12 = 3 \\times 4"`
- `fontSize`: 20px
- `fill`: `#e2e8f0` (slate-200)
- `opacity`: 0 -> 1 over 300ms, `ease: "easeOut"`
- Dimension indicators: faint dashed lines along left edge (showing 3 rows) and top edge (showing 4 columns) with small numeric labels "3" and "4" in `#94a3b8` (slate-400), `fontSize: 14px`

**T=2.8s -- Hold, then second rearrangement: 2x6 Rectangle**

Hold the 3x4 for 1.0s, then rearrange.

- Previous label fades out: 200ms
- Dimension indicators fade out: 200ms (parallel with label)
- Dots animate to 2-row by 6-column grid
- Grid spacing: 36px horizontal, 36px vertical
- New grid origin: centered
- Same spring animation as before
- On settle: pulse effect
- Sound: same "click"

**T=3.4s -- Label: "12 = 2 x 6"**

- Same styling and animation as previous label
- New dimension indicators: "2" on left, "6" on top

**T=4.4s -- Hold, then third rearrangement: 1x12 Row**

Hold 2x6 for 1.0s, then rearrange.

- Dots animate to 1-row by 12-column line
- Grid spacing: 28px horizontal (tighter to fit viewport)
- Centered vertically at y=160
- Horizontal centering: first dot at (200 - 5.5*28, 160) = (46, 160)
- Spring animation, pulse, click

**T=5.0s -- Label: "12 = 1 x 12"**

- Label appears, dimension indicators show "1" on left, "12" on top

**T=6.0s -- Fourth rearrangement: 4x3 Rectangle**

Hold 1x12 for 1.0s, then rearrange.

- Dots animate to 4-row by 3-column grid
- This is visually different from 3x4 -- taller, narrower

**T=6.6s -- Label with surprise: "12 = 4 x 3"**

- Label appears: `"12 = 4 \\times 3"`
- After 400ms, a thought-bubble annotation appears:
  - Position: upper-right of the rectangle, offset (60, -40) from top-right dot
  - Text: "Wait... that's just 3x4 flipped!"
  - Style: handwritten-feel (italic), `fill`: `#fbbf24` (amber-400), `fontSize`: 16px
  - Background: semi-transparent rounded rect `fill: #1e293b`, `rx: 8`, `opacity: 0.85`
  - Entry animation: `fadeIn` from `"scale"` over 400ms with `ease: "easeOutBack"`
- Sound: playful "hmm?" sound -- two ascending notes (questioning intonation)

**T=8.0s -- Transition Question**

Previous arrangement and all labels fade out over 400ms.

A large text annotation fades in, centered:
- Line 1: "How many rectangles can you make with 12 dots?"
- `fontSize`: 22px, `fill`: `#f1f5f9` (slate-100), `fontWeight`: 600
- `opacity: 0 -> 1` over 500ms

Hold for 1.2s.

Then below it:
- Line 2: "What about 7 dots?"
- `fontSize`: 22px, `fill`: `#fbbf24` (amber-400), `fontWeight`: 600
- `opacity: 0 -> 1` over 500ms

**T=9.7s -- The 7-Dot Attempt**

The 12-dot text and question fade out. 7 dots appear in a cluster (same staggered fade-in as the opening, but faster -- 30ms stagger).

- `fill`: `#818cf8`

**T=10.3s -- 7 dots try 2x3 + remainder**

Dots attempt to form a 2x3 rectangle. 6 dots snap into the grid. The 7th dot floats awkwardly to the right, slightly below the grid, bobbing gently up and down (sine wave, amplitude 3px, period 800ms).

- The 7th dot gets a different visual treatment:
  - `fill`: `#fb7185` (rose-400) -- temporarily changes color
  - `opacity`: pulses between 0.6 and 1.0
  - Gentle float animation
- A small annotation next to the lonely dot: "Doesn't fit..." in `#fb7185`, `fontSize: 13px`, italic

Hold for 1.0s.

**T=11.3s -- 7 dots try 3x2 + remainder (same result, rotated)**

Quick attempt. Same visual result -- 6 in grid, 1 floating. Rearrange quickly (300ms spring).

Hold for 0.5s.

**T=12.1s -- 7 dots form 1x7**

All 7 dots snap into a single row. The lonely dot rejoins -- its color returns to `#818cf8`, and it snaps into place with an extra-enthusiastic spring (overshoot: 15%).

- Label appears: `"7 = 1 \\times 7"`
- Below: "Only ONE rectangle..."
- `fontSize`: 18px, `fill`: `#94a3b8`

**T=13.1s -- Revelation**

After 1.0s hold, a new annotation fades in:
- "7 is special..."
- `fontSize`: 24px, `fill`: `#fbbf24` (amber-400), `fontWeight`: 700
- Entry: scale from 0.8 to 1.0, opacity 0 to 1, `ease: "easeOutBack"`, 500ms
- The 7 dots briefly glow brighter (filter: `brightness(1.4)`) for 300ms, then settle

**T=14.5s -- Continue Button**

Everything holds. A "Continue" button fades in at the bottom of the scene:
- Style: rounded rectangle, `fill: #818cf8`, `rx: 12`, padding 16px 32px
- Text: "Let's explore" in `#ffffff`, `fontSize: 16px`, `fontWeight: 600
- Entry: slide up from 20px below + fade in, 400ms, `ease: "easeOut"`
- Hover state: `fill: #6366f1`, scale 1.02
- Active state: scale 0.98
- Touch target: minimum 48x48px (exceeds DR-5 requirement of 44px)

### Hook -- Accessibility

- `aria-live="polite"` region narrates: "12 dots rearrange into a 3 by 4 rectangle. 12 equals 3 times 4."
- Each rearrangement is announced with a 500ms delay after visual animation completes.
- Dot cluster has `role="img"` with `aria-label="[N] dots arranged in a [rows] by [columns] rectangle"`
- Continue button has `role="button"`, `aria-label="Continue to interactive exploration"`
- Keyboard: Enter or Space activates Continue. Tab focuses Continue button. Escape replays hook from beginning.
- Reduced motion: if `prefers-reduced-motion: reduce`, all spring animations become instant repositions (0ms duration). Fade-ins remain but at 150ms with `ease: "linear"`. Pulse effects disabled.

### Hook -- Performance Budget

- Total SVG elements: 12 circles + ~8 annotations + 1 button = ~21 elements (well under 200-element SVG budget)
- No WebGL required
- Spring animations via Framer Motion -- GPU-composited transforms only (`cx`, `cy`, `opacity`, `scale`)
- Target: 60fps on iPhone SE 2nd gen (A13 Bionic)
- Memory: <2MB total scene

---

## Stage 2: Spatial Experience -- Rectangle Factory (2-4 minutes)

### Overview

The student is presented with the "Rectangle Factory" -- an interactive workspace where they select a number and discover all its factor pairs by physically reshaping a dot grid into every possible rectangle.

### Scene Layout (Mobile-First)

```
+------------------------------------------+
|  [Number Selector: < 12 >]               |  <- Top bar, 56px height
+------------------------------------------+
|                                          |
|     . . . .                              |
|     . . . .                              |  <- Dot Grid Area (fills
|     . . . .                              |     available width, square
|                                          |     aspect ratio, centered)
|                                          |
+------------------------------------------+
|  Factor Pairs Found:                     |
|  [1x12] [2x6] [3x4] [?x?] [?x?]       |  <- Factor Pair List
+------------------------------------------+
|  "Drag the edges to reshape!"            |  <- Instruction text
+------------------------------------------+
```

**Desktop layout**: Dot grid on left (60% width), factor pair list on right (40% width) in a sidebar. Number selector above the grid.

### Number Selector

- Component: horizontal stepper with left/right chevron buttons and a centered number display
- Range: 2 to 36
- Initial value: 12 (pre-selected for the first challenge)
- Display: large numeric text, `fontSize: 32px`, `fontWeight: 700`, `fill: #f1f5f9`
- Chevron buttons: 44x44px touch targets (DR-5), `fill: #64748b`, hover: `fill: #818cf8`
- Left chevron: `<` glyph or left-arrow icon
- Right chevron: `>` glyph or right-arrow icon
- Disabled states: left chevron disabled at 2, right chevron disabled at 36; disabled fill: `#334155`
- On number change:
  - Current dot grid fades out (200ms)
  - New dots fade in from center in the default arrangement (single row: 1xN)
  - Factor pair list resets (all "? x ?")
  - Brief haptic feedback (if available via Vibration API): 10ms pulse
- **Locked during challenges**: When the lesson is in "find all factors" challenge mode, the selector is locked with `opacity: 0.5` and a small lock icon. The student must complete the current number before moving on.

### Dot Grid

**Rendering**: N SVG circles arranged in a rectangular grid.

- Dot properties (same as hook):
  - `r`: 12px (mobile), 10px (desktop)
  - `fill`: `#818cf8` (indigo-400)
  - `stroke`: `#6366f1` (indigo-500)
  - `strokeWidth`: 1.5px
  - `filter`: `drop-shadow(0 1px 2px rgba(129, 140, 248, 0.3))`

**Grid sizing**: The grid auto-sizes to fill the available canvas area while maintaining dot spacing of at least 2.5x dot radius between centers. Maximum grid width: 90% of canvas width. Maximum grid height: 90% of canvas height.

**Initial arrangement**: When a number is selected, dots appear in a 1xN row (or the most recent valid rectangle if the student has already found some factors). If 1xN is too wide for the viewport, wrap to the nearest valid rectangle that fits (e.g., for N=36, start at 6x6 rather than 1x36).

### Drag Interaction (Core Mechanic)

The student reshapes the rectangle by dragging its edges or corners.

**Implementation**: `@use-gesture/react` with the `useDrag` hook.

**Drag handles**: Invisible hit areas along each edge and at each corner of the current rectangle:
- Edge handles: 20px-wide invisible rects along each edge, extending 10px outside the grid boundary
- Corner handles: 24x24px invisible squares at each corner
- Cursor: `grab` on hover, `grabbing` while dragging
- Visual feedback on hover: the edge/corner being hovered gets a faint glow line (`stroke: #818cf8`, `opacity: 0.3`, `strokeWidth: 2`)

**Drag behavior**:

1. Student grabs a right edge or bottom edge and drags inward or outward.
2. As they drag, the system computes the nearest valid rectangle dimensions:
   - Valid: (rows, cols) where rows * cols = N, both rows >= 1 and cols >= 1
   - The drag direction determines which dimension is being changed:
     - Horizontal drag (right edge): changes number of columns
     - Vertical drag (bottom edge): changes number of rows
     - Corner drag: changes whichever dimension the drag is closer to affecting
3. **Snapping**: When the drag position is within 15px of a valid dimension, the grid snaps to that arrangement.
   - Snap animation: `spring(damping: 25, stiffness: 400)`, duration ~250ms
   - Sound on snap: the "LEGO click" from the hook (same audio file, 200ms)
   - Haptic: 15ms vibration pulse
4. **Invalid arrangements**: When the drag is between valid snap points, dots attempt to form the nearest rectangle but show remainder dots:
   - Example: dragging to suggest 5 columns for N=12 -- 10 dots form a 2x5 grid, 2 dots float to the right with the "doesn't fit" treatment (color change to `#fb7185`, gentle bob animation)
   - A small tooltip appears near the remainder dots: "Doesn't divide evenly!" in `#fb7185`, `fontSize: 13px`
   - The tooltip has a semi-transparent dark background (`#1e293b`, `opacity: 0.85`, `rx: 6`)
   - This tooltip disappears after 1.5s or when the student continues dragging
5. **Release behavior**: On pointer up, if the current arrangement is valid, it stays. If invalid, it springs back to the last valid arrangement.

**Edge cases for drag**:
- N=1: only arrangement is 1x1. Dragging does nothing. A tooltip says "1 is a special case -- just one dot!"
- Large N with small viewport: if a valid rectangle (e.g., 1x36) overflows the canvas, the grid scales down (smaller dot radius, minimum 6px radius) to fit. If still too large, the canvas becomes horizontally scrollable with a visual indicator (fading gradient on the edge).
- Square numbers: when rows = cols (e.g., 4x4 for 16), a special annotation briefly appears: "A perfect square!" in `#34d399` (emerald-400), `fontSize: 14px`

### Factor Pair Discovery

When the student successfully snaps to a new valid rectangle, the following occurs:

**Already discovered pair**:
- The corresponding pair in the factor pair list pulses briefly (`scale: 1.05`, 200ms)
- No new entry added
- Tooltip: "You already found this one!" in `#94a3b8`, 1s duration

**New pair discovered**:
1. The factor pair list updates with a new entry
2. Entry animation: slide in from the left, `spring(damping: 20, stiffness: 300)`, 300ms
3. The entry shows: `"[rows] x [cols]"` in a pill-shaped badge
   - Badge: `fill: #1e293b`, `stroke: #34d399` (emerald-400), `strokeWidth: 1.5`, `rx: 16`
   - Text: `fill: #34d399`, `fontSize: 15px`, `fontWeight: 600`
4. +XP indicator: a small "+5 XP" text floats up from the badge and fades out over 600ms
   - `fill: #fbbf24` (amber-400), `fontSize: 12px`
   - Animation: translate y by -20px, opacity 1->0, 600ms, `ease: "easeOut"`
5. Sound: bright discovery chime (different from the snap click -- a short ascending two-note motif, major third interval)
6. Haptic: 25ms vibration

**Commutative pair handling**: 3x4 and 4x3 are the same factor pair. When the student finds 3x4, both 3x4 and 4x3 count as discovered. However, visually in the list, only one entry appears: "3 x 4" (smaller factor first). If the student finds 4x3 first, the list shows "3 x 4" (normalized). A brief annotation appears: "3x4 and 4x3 use the same factors -- just rotated!" in `#94a3b8`.

### Factor Pair List

Displayed below the dot grid (mobile) or in a right sidebar (desktop).

**Header**: "Factor Pairs Found: [discovered]/[total]"
- `fontSize: 16px`, `fill: #94a3b8`, `fontWeight: 500`
- The count animates when a new pair is found (spring scale on the numerator)

**Entries**:
- Discovered pairs: pill badges as described above, in order of smallest first factor
- Undiscovered pairs: `"? x ?"` in pill badges with `stroke: #334155`, `fill: transparent`, text `fill: #475569`
- Layout: horizontal wrap on mobile, vertical stack on desktop
- Spacing: 8px gap between badges

**Complete state**: When all pairs are found:
1. All badges simultaneously pulse with a golden glow: `boxShadow: 0 0 12px #fbbf24`, 400ms
2. A celebration text appears: "All factor pairs found!" in `#34d399`, `fontSize: 18px`, `fontWeight: 700`
3. Confetti animation: 20 small geometric shapes (circles, triangles, squares) in `#818cf8`, `#34d399`, `#fbbf24`, `#fb7185` burst from the center and fall with physics (gravity + slight wind). Duration: 1.5s. Shapes fade out at bottom.
4. Sound: celebration chord (major triad, arpeggiated, 800ms)
5. XP award: "+20 XP: All factors found!" floats up from center
6. The number selector unlocks (if in challenge mode)

### Challenge Sequence

The lesson guides the student through a specific sequence of numbers:

**Challenge 1: N=12 (3 factor pairs)**
- Number selector locked to 12
- Instruction text: "Find ALL the factor pairs for 12!"
- Hint system (appears after 30s of no new discovery): "Try dragging to make 2 rows..." then after another 30s: "What about 1 row?"
- Expected pairs: (1,12), (2,6), (3,4)

**Challenge 2: N=24 (4 factor pairs)**
- After completing 12, selector auto-advances to 24 with a brief transition
- Instruction: "24 has even MORE factor pairs. Find them all!"
- Expected pairs: (1,24), (2,12), (3,8), (4,6)
- Hint after 45s: "24 is a bigger number -- it can make wider rectangles"

**Challenge 3: N=7 (1 factor pair) -- The Prime Reveal**
- After completing 24, selector advances to 7
- Instruction: "Now try 7. How many rectangles can you make?"
- The student will try various arrangements -- all fail except 1x7
- After the student finds 1x7 and tries at least 2 invalid arrangements (tracked), or after 30s:
  - Special annotation: "7 has only ONE rectangle: 1x7. Numbers like this are called PRIME!"
  - `fontSize: 18px`, first sentence in `#f1f5f9`, "PRIME!" in `#fbbf24`, `fontWeight: 700`
  - A subtle star/sparkle effect around the 7 in the number selector
  - Sound: mysterious/wonder chord (suspended 4th resolving to major, softer than the celebration chord)

**Challenge 4: Free Exploration (after the three guided challenges)**
- Number selector fully unlocked (range 2-36)
- Instruction: "Explore any number! Which numbers have the MOST factor pairs?"
- The factor pair list and discovery mechanics continue to work
- This phase lasts until the student has completed at least 8 total interactions (drags that result in valid snaps across all numbers explored). The lesson tracks this count internally.
- When 8 interactions reached, a "Continue" button appears at the bottom: "Ready to learn more?"

### Interaction Count Tracking

The lesson must record at least 8 meaningful interactions in Stage 2 before allowing progression (Constitution PF-3: Embodied Cognition). An "interaction" counts as:
- Successfully snapping to a valid rectangle arrangement (whether new discovery or revisit)
- Attempting an invalid arrangement (demonstrating the "doesn't divide evenly" concept)

The interaction counter is NOT displayed to the student (no pressure). It is tracked internally. The Continue button appears organically after 8 interactions.

### Spatial Experience -- Accessibility

- Dot grid has `role="application"` with `aria-label="Rectangle Factory: [N] dots currently arranged as [rows] by [cols]"`
- Keyboard alternative to dragging:
  - Arrow keys: Left/Right changes columns, Up/Down changes rows
  - The grid snaps to the nearest valid arrangement in the direction pressed
  - If the arrangement is invalid, the screen reader announces "Cannot form a [rows] by [cols] rectangle with [N] dots. [remainder] dots left over."
  - Valid snap: screen reader announces "Formed a [rows] by [cols] rectangle. [N] equals [rows] times [cols]."
- Factor pair list: each badge is a `role="listitem"` within a `role="list"`
- Screen reader announces new discoveries: "[rows] times [cols] is a factor pair of [N]! [discovered] of [total] pairs found."
- Reduced motion: all spring animations become 150ms linear transitions. Confetti disabled. XP float-up replaced with inline text.

### Spatial Experience -- Performance

- Maximum dots on screen: 36 (for N=36)
- SVG element count: 36 dots + ~15 UI elements + ~10 annotations = ~61 elements
- Spring animations: Framer Motion `layout` animation on dot positions. GPU-composited.
- Drag gesture: throttled to 16ms (60fps) via `@use-gesture/react` configuration
- Factor pair computation: precomputed for all numbers 2-36 at scene mount (trivial: <1ms). Stored in a `Map<number, [number, number][]>`.
- No recomputation during drag -- only on snap
- Target: 60fps during drag on iPhone SE 2nd gen

---

## Stage 3: Guided Discovery (3-5 minutes)

### Prompt Sequence

The guided discovery stage presents a series of narrated prompts with synchronized visual highlights on the spatial scene. The scene from Stage 2 remains visible but interaction is paused (drag disabled). The AI tutor (or scripted narration) guides the student through key observations.

**Prompt delivery**: Each prompt appears as a text card at the bottom of the screen (mobile) or in a side panel (desktop). The text is revealed character by character at 30 characters/second for a "typing" effect. The corresponding visual highlight plays simultaneously.

**Card styling**:
- Background: `#1e293b` (slate-800), `borderRadius: 16px`, `padding: 20px`
- Border: `1px solid #334155` (slate-700)
- Text: `fill: #e2e8f0` (slate-200), `fontSize: 16px`, `lineHeight: 1.6`
- Key terms are highlighted inline: `color: #818cf8` (indigo-400), `fontWeight: 600`
- A "Next" button at the bottom-right of the card: same styling as the hook's Continue button, but smaller (padding 12px 24px), text "Next"

---

**Prompt 1: Naming Factors**

Card text:
> "You found all the rectangles for 12: 1x12, 2x6, 3x4. The numbers on the sides -- **1, 2, 3, 4, 6, 12** -- are called **factors** of 12."

Visual:
- Scene shows N=12, last arrangement the student had
- The dot grid cycles through all three factor pairs (1x12, 2x6, 3x4), spending 1.5s on each
- As each arrangement displays, the dimension labels (row count and column count) are highlighted with a glow effect: `filter: drop-shadow(0 0 6px #818cf8)`
- After cycling, all six factor numbers appear in a horizontal row below the grid, each in a circle badge:
  - Circle: `r: 18px`, `fill: #1e293b`, `stroke: #818cf8`, `strokeWidth: 2`
  - Number text: `fill: #818cf8`, `fontSize: 16px`, `fontWeight: 700`
  - Entry animation: staggered fade-in, 100ms between each, `spring(damping: 20, stiffness: 300)`

Student action: Read the prompt, observe the visual, tap "Next."

---

**Prompt 2: Factor Pairs**

Card text:
> "Notice they come in **pairs**: **1 & 12**, **2 & 6**, **3 & 4**. Each pair multiplies to give 12!"

Visual:
- The six factor circles from Prompt 1 rearrange into three pairs, with a multiplication sign between each pair:
  - Pair 1: `(1) x (12) = 12`
  - Pair 2: `(2) x (6) = 12`
  - Pair 3: `(3) x (4) = 12`
- Each pair is on its own row, vertically stacked
- Connecting lines draw between each pair using `draw` animation (SVG path dash-offset, 400ms)
- The `= 12` on each row uses `fill: #34d399` (emerald-400) to emphasize the constant product
- The pairs highlight one at a time with a brief pulse (300ms per pair, sequential)

Student action: Read, observe, tap "Next."

---

**Prompt 3: Prime Numbers Introduction**

Card text:
> "Now think about 7. How many rectangles did it have? Just **1x7**. Numbers with exactly **two factors** (1 and themselves) are called **prime numbers**."

Visual:
- Scene transitions to N=7, showing the 1x7 row
- The two factor circles appear: just `(1)` and `(7)`
- They are highlighted with `#fbbf24` (amber-400) stroke instead of indigo
- A label "PRIME" appears above them in `#fbbf24`, `fontSize: 20px`, `fontWeight: 700`, with a subtle glow
- Ghost outlines of failed rectangle attempts briefly flash and fade (2x3+1 arrangement, 3x2+1 arrangement) at 30% opacity for 500ms each, reinforcing that only 1x7 works

Student action: Read, observe, tap "Next."

---

**Prompt 4: Is 1 Prime?**

Card text:
> "Is 1 prime? It only has **one** factor: just 1 itself (1x1=1). Primes need **exactly two different factors**. So 1 is **not** prime -- it's special in its own way."

Visual:
- Scene shows N=1: a single dot, centered, slightly larger than normal (`r: 16px`)
- The factor circle shows just `(1)` -- a single circle, alone
- Text annotation appears: "Only 1 factor" with an arrow pointing to the single circle
- A gentle "not quite" animation: the PRIME label from Prompt 3 starts to appear above the dot, then fades away with a subtle "dissolve" effect (pixelation or particles), replaced by a "?" that also fades
- Color treatment: the single dot is `#94a3b8` (slate-400) -- neutral, not indigo or amber

Student action: Read, observe, tap "Next."

---

**Prompt 5: Quick Check -- Is 15 Prime?**

Card text:
> "Quick: is 15 prime? Try to think of rectangles... 1x15 works, but also **3x5**! Two rectangles means **more than two factors**, so 15 is **not prime** -- it's **composite**."

Visual:
- Scene shows N=15
- First, 1x15 arrangement forms (dots in a long row)
- Then, after 1s, rearranges to 3x5 (animated spring transition)
- The factor pair list shows: `(1,15)` and `(3,5)`
- All factor circles appear: `1, 3, 5, 15` -- four of them
- A label "COMPOSITE" appears in `#34d399`, contrasting with the "PRIME" label styling from Prompt 3
- Below the label: "More than 2 factors = composite" in `#94a3b8`, `fontSize: 14px`

**Interactive micro-check**: Before revealing the answer, the card initially shows only "Quick: is 15 prime?" with two tap-buttons:
- "Prime" button: `fill: #fbbf24`, text "Prime"
- "Not Prime" button: `fill: #34d399`, text "Not Prime"
- Both buttons: `borderRadius: 12px`, `padding: 12px 24px`, `fontSize: 16px`, touch target 48px height
- If student taps "Prime": gentle feedback -- "Let's check! Can you think of rectangles for 15 other than 1x15?" Then the 3x5 arrangement animates, and the answer is revealed.
- If student taps "Not Prime": positive feedback -- "Correct! Let's see why..." Then the arrangements animate.
- This micro-interaction does NOT affect XP or scoring. It is purely for engagement and retrieval practice.

Student action: Tap answer choice, observe visual confirmation, tap "Next."

---

### Guided Discovery -- Transition

After Prompt 5, a brief summary card appears:

> "Let's write this down properly."

The card has a forward-pointing arrow icon and the "Continue" button. This transitions to Stage 4: Symbol Bridge.

### Guided Discovery -- Accessibility

- All prompt text is in `aria-live="polite"` regions
- Visual animations have corresponding screen reader descriptions announced after each animation completes
- Micro-check buttons have `role="button"` with descriptive `aria-label`s: "I think 15 is prime" / "I think 15 is not prime"
- Keyboard: Tab navigates between "Next" and micro-check buttons. Enter/Space activates.
- Reduced motion: cycling arrangements use instant transitions (0ms). Draw animations for connecting lines are replaced with instant appearance.

---

## Stage 4: Symbol Bridge (2-3 minutes)

### Overview

Formal mathematical notation is overlaid onto the spatial representations the student already understands. Each symbol is explicitly linked to its spatial meaning.

### Scene Layout

The screen splits into two synchronized panels:

**Left panel (60%)**: The dot grid from Stage 2, still visible, cycling through arrangements on demand.

**Right panel (40%)**: Mathematical notation, building up incrementally.

On mobile: vertical stack -- dot grid on top (40% height), notation below (60% height), scrollable.

---

**Symbol 1: Factor Set Notation**

- Notation (right panel): `"\\text{Factors of } 12 = \\{1, 2, 3, 4, 6, 12\\}"`
- KaTeX rendering, `fontSize: 20px`
- Entry: each number in the set fades in one by one (200ms per number, left to right)
- As each number fades in on the right, the corresponding dimension label on the dot grid (left panel) highlights with a matching pulse
- Connecting line: a subtle dashed line (`stroke: #818cf8`, `opacity: 0.3`, `dasharray: "4 4"`) briefly draws from the highlighted dimension label to the corresponding number in the set notation, then fades (800ms total)

**Symbol 2: Multiple Definition**

- After a 1.5s pause on the factor set
- New line below: `"12 \\text{ is a } \\textbf{multiple} \\text{ of each of its factors}"`
- `fontSize: 18px`, "multiple" in `#34d399`, bold
- Below this, an animated number line appears:
  - Range: 0 to 24
  - Step: 1 (tick marks every integer)
  - Major ticks at multiples of 3: labeled with numbers
  - A hopping dot starts at 0 and jumps to 3, then 6, then 9, then 12, then 15, then 18
  - Each hop: `spring(damping: 18, stiffness: 350)`, with an arc trajectory (parabolic, peak 20px above the line)
  - Hop duration: 400ms per hop
  - At each landing, the tick mark flashes `#34d399` and gets a small filled circle marker
  - The dot `fill: #34d399`, `r: 8px`
  - Below the number line: `"\\text{Multiples of 3: } 3, 6, 9, 12, 15, 18, \\ldots"`
  - The 12 in this sequence is highlighted with a circle around it in `#818cf8` (connecting back to the factor relationship)
- After the animation: brief annotation "12 is the 4th multiple of 3" in `#94a3b8`, `fontSize: 13px`

**Symbol 3: GCF via Venn Diagram**

- After a 1.5s pause
- The number line fades out (300ms)
- A Venn diagram fades in:
  - Two overlapping SVG circles
  - Left circle: `stroke: #818cf8` (indigo-400), `fill: #818cf820` (10% opacity), `r: 80px`
  - Right circle: `stroke: #34d399` (emerald-400), `fill: #34d39920`, `r: 80px`
  - Overlap region: computed via SVG clip-path, `fill: #fbbf2430` (amber, 20% opacity)
  - Circle centers: 110px apart (ensuring clear overlap)

- Labels:
  - Above left circle: "Factors of 12" in `#818cf8`, `fontSize: 14px`
  - Above right circle: "Factors of 18" in `#34d399`, `fontSize: 14px`

- Content population (animated, staggered 200ms per number):
  - Left only (factors of 12 not shared with 18): `4, 12` -- positioned in left crescent
  - Right only (factors of 18 not shared with 12): `9, 18` -- positioned in right crescent
  - Overlap (common factors): `1, 2, 3, 6` -- positioned in intersection zone
  - Each number: `fontSize: 16px`, `fontWeight: 600`
  - Left-only numbers: `fill: #818cf8`
  - Right-only numbers: `fill: #34d399`
  - Overlap numbers: `fill: #fbbf24` (amber-400)

- After all numbers placed (1s pause):
  - The overlap region pulses with a brighter amber glow (300ms)
  - An annotation appears below: `"\\text{GCF}(12, 18) = 6"` (the greatest of the common factors)
  - "GCF" in `#fbbf24`, `fontWeight: 700`, `fontSize: 20px`
  - Below that: "Greatest Common Factor = the BIGGEST number in the overlap" in `#94a3b8`, `fontSize: 14px`
  - The `6` in the overlap briefly scales to 1.3x and back (300ms, spring)

### Symbol Bridge -- Accessibility

- Each notation block has `role="math"` with `aria-label` containing the spoken equivalent
- Factor set: "The factors of 12 are the set: 1, 2, 3, 4, 6, 12"
- Multiple definition: "12 is a multiple of each of its factors. Multiples of 3 are: 3, 6, 9, 12, 15, 18, and so on"
- Venn diagram: `role="img"`, `aria-label="Venn diagram showing factors of 12 and factors of 18. Common factors are 1, 2, 3, and 6. The greatest common factor is 6."`
- Number line hopping dot has `aria-label` announcements at each stop
- Reduced motion: hops become instant position changes. Staggered fade-ins become simultaneous appearance.

---

## Stage 5: Real-World Anchor (1-2 minutes)

### Three Real-World Examples

Each example is a card that slides in from the right, displayed one at a time with a "Next" button to advance.

**Card styling**:
- Background: `#1e293b` with `borderRadius: 16px`
- Left accent bar: 4px wide, color varies per example
- Icon: 32x32px, top-left of card
- Title: `fontSize: 18px`, `fontWeight: 700`, `fill: #f1f5f9`
- Body text: `fontSize: 15px`, `fill: #cbd5e1`, `lineHeight: 1.6`
- Mini-visualization: embedded in the card, 120px tall

---

**Example 1: Cookie Sharing**

- Accent color: `#fb923c` (orange-400)
- Icon: cookie emoji or simple circle icon
- Title: "Fair Sharing"
- Body: "Can 12 cookies be shared equally among 5 people? Only if 5 is a factor of 12. Let's check: 12 / 5 = 2.4 -- not a whole number! 5 is NOT a factor of 12. But 12 cookies among 4 people? 12 / 4 = 3 each. That works!"
- Key phrase highlighted: "5 is NOT a factor of 12" in `#fb7185`, "12 / 4 = 3 each" in `#34d399`
- Mini-visualization: 12 dots (cookies) attempting to split into 5 groups (2 dots, 2, 2, 2, 2 -- with 2 dots orphaned, marked in `#fb7185`). Then rearranging into 4 groups of 3 (all dots `#34d399`).

**Example 2: Music**

- Accent color: `#a78bfa` (violet-400)
- Icon: music note
- Title: "Music & Rhythm"
- Body: "Time signatures use factors! In 4/4 time, a measure has 4 beats. You can split those beats into groups: 1 group of 4, 2 groups of 2, or 4 groups of 1. These are the factors of 4!"
- Mini-visualization: a simple horizontal beat bar with 4 segments. Divider lines animate to show different groupings: |----| then |--|--| then |-|-|-|-|. Each grouping has a label "1x4", "2x2", "4x1".

**Example 3: Floor Tiling**

- Accent color: `#2dd4bf` (teal-400)
- Icon: grid/tile icon
- Title: "Architecture & Tiling"
- Body: "A 12-inch wide floor section can be perfectly tiled with 1-inch, 2-inch, 3-inch, 4-inch, 6-inch, or 12-inch square tiles -- the factors of 12! A 5-inch tile would leave gaps."
- Mini-visualization: a 12-unit wide bar at the top. Below it, rows showing different tile sizes:
  - Row 1: 12 tiles of size 1 (12 small squares, each `stroke: #34d399`)
  - Row 2: 6 tiles of size 2
  - Row 3: 4 tiles of size 3
  - Row 4: 3 tiles of size 4
  - Row 5: 2 tiles of size 6
  - Row 6: 1 tile of size 12
  - Animated: tiles "slide in" from left, row by row, 300ms per row
  - A row 7 shows a 5-inch tile attempt: 2 tiles fit, then a gap with a red-dashed outline, labeled "Gap! 5 is not a factor of 12" in `#fb7185`

### Real-World Anchor -- Accessibility

- Each card: `role="article"` with heading and description
- Mini-visualizations: `role="img"` with detailed `aria-label` descriptions
- Reduced motion: slide-in becomes fade-in (200ms). Tile animation becomes instant.

---

## Stage 6: Practice (9 problems, adaptive)

### Problem Set Design

Problems are organized into three layers per the data model (layer 0 = recall, layer 1 = procedure, layer 2 = understanding). The IRT-based problem selector chooses from this bank, but the lesson guarantees exposure to all three layers.

**Problem selection logic**: Start with 2 recall, then 2 procedure, then 1 understanding. Remaining 4 are adaptive (IRT selects based on estimated ability). If the student struggles (2+ incorrect in a row), insert an easier problem. If they excel (3+ correct in a row with high confidence), skip to understanding layer.

---

### Recall Layer (Layer 0)

**Problem R1: List All Factors**

- Type: `factor-listing`
- Prompt: "List ALL the factors of 18."
- Input: multi-select grid of numbers 1-18 (only show plausible candidates: 1-18)
  - Grid layout: 3 rows of 6 buttons, each button 48x48px
  - Each button: `borderRadius: 8px`, `fill: #1e293b`, `stroke: #334155`, text centered
  - Selected state: `fill: #818cf820`, `stroke: #818cf8`, text `fill: #818cf8`
  - Wrong-but-selected state (shown on submit): `fill: #fb718520`, `stroke: #fb7185`
  - Missed factor state (shown on submit): `stroke: #34d399`, pulse animation
- Correct answer: {1, 2, 3, 6, 9, 18}
- Visualization: after submission, the dot grid from Stage 2 appears showing N=18, cycling through all valid rectangles (1x18, 2x9, 3x6) to confirm
- Explanation prompt (CP-I): "How did you know 4 is NOT a factor of 18?"
- Common errors:
  - Missing 1 or 18: feedback "Remember, 1 and N are always factors!"
  - Including 4: feedback "18 / 4 = 4.5 -- not a whole number. Try the rectangle: 4 rows of dots with 18 total leaves 2 leftover."
  - Including 5: feedback "18 / 5 = 3.6 -- check if it divides evenly!"

**Problem R2: Factor Identification**

- Type: `factor-check`
- Prompt: "Is 4 a factor of 20? Tap YES or NO."
- Input: two large buttons, "YES" and "NO", each 120x56px
  - YES: `fill: #34d39920`, `stroke: #34d399`, text "YES" in `#34d399`
  - NO: `fill: #fb718520`, `stroke: #fb7185`, text "NO" in `#fb7185`
- Correct answer: YES (20 / 4 = 5, no remainder)
- Visualization on answer: dot grid shows 4x5 rectangle for 20
- Explanation prompt: "How can you quickly check if one number is a factor of another?"

**Problem R3: Listing Multiples**

- Type: `multiple-listing`
- Prompt: "List the first 5 multiples of 6."
- Input: 5 text input fields in a horizontal row, each 56px wide
  - Pre-filled: "6 x 1 = ___", "6 x 2 = ___", "6 x 3 = ___", "6 x 4 = ___", "6 x 5 = ___"
  - On mobile: vertical stack with labels
- Correct answer: 6, 12, 18, 24, 30
- Visualization: number line with hopping dot, same style as Symbol Bridge, landing on each correct multiple
- Explanation prompt: "What's the pattern? How do you get from one multiple to the next?"

---

### Procedure Layer (Layer 1)

**Problem P1: Find GCF Using Factor Lists**

- Type: `gcf-computation`
- Prompt: "Find the Greatest Common Factor (GCF) of 16 and 24."
- Input: structured multi-step:
  1. "Factors of 16:" -- multi-select grid (numbers 1-16)
  2. "Factors of 24:" -- multi-select grid (numbers 1-24)
  3. "Common factors:" -- auto-highlighted based on selections, student confirms
  4. "GCF:" -- single text input
- Correct factors of 16: {1, 2, 4, 8, 16}
- Correct factors of 24: {1, 2, 3, 4, 6, 8, 12, 24}
- Common factors: {1, 2, 4, 8}
- GCF: 8
- Visualization: Venn diagram (same style as Symbol Bridge) populates based on student's inputs
- Explanation prompt: "Why is the GCF always less than or equal to both numbers?"

**Problem P2: Find LCM**

- Type: `lcm-computation`
- Prompt: "Find the Least Common Multiple (LCM) of 4 and 6."
- Input: structured multi-step:
  1. "Multiples of 4:" -- student types first 6 multiples (4, 8, 12, 16, 20, 24)
  2. "Multiples of 6:" -- student types first 6 multiples (6, 12, 18, 24, 30, 36)
  3. "Common multiples (from your lists):" -- student identifies common ones
  4. "LCM (smallest common):" -- single text input
- Correct LCM: 12
- Visualization: two number lines stacked vertically:
  - Top: multiples of 4 marked with `#818cf8` dots
  - Bottom: multiples of 6 marked with `#34d399` dots
  - Vertical dashed lines connect common multiples (12, 24)
  - The 12 position has a bright `#fbbf24` highlight on both lines
- Explanation prompt: "If you keep listing multiples, will you always find a common one? Why?"

---

### Understanding Layer (Layer 2)

**Problem U1: Explain Why 1 and N Are Always Factors**

- Type: `free-response-explanation`
- Prompt: "Why are 1 and N always factors of any number N? Explain using the rectangle model."
- Input: text area, minimum 30 characters, maximum 500 characters
  - Placeholder text: "Think about what rectangles you can always make..."
  - Character count shown: "30/500" in `#64748b`, updates live
- AI evaluation criteria (for reflection quality scoring):
  - Mentions that 1xN rectangle always works (any number of dots can form a single row) -> +2 points
  - Mentions that Nx1 is the same pair -> +1 point
  - Uses the word "divides" or "divisible" correctly -> +1 point
  - References the rectangle/spatial model -> +1 point
  - Maximum: 5 points
- Feedback: AI-generated response acknowledging the student's explanation and gently correcting any gaps
- Visualization: 1xN rectangle for a generic N (shown with dots labeled "1" on the side and "N" on the top)

**Problem U2: Compare Factor Counts**

- Type: `comparative-analysis`
- Prompt: "12 has 6 factors. 13 has only 2 factors. Why do you think some numbers have many factors while others have very few?"
- Input: text area (same styling as U1)
- AI evaluation criteria:
  - Mentions that 13 is prime -> +1 point
  - Mentions that 12 is composite / has many factor pairs -> +1 point
  - Attempts to reason about what makes a number have more factors (divisible by many small numbers, even, etc.) -> +2 points
  - Makes connection to the rectangle model (12 can form many rectangles, 13 only one) -> +1 point
- Visualization: side-by-side dot grids. Left: 12 dots cycling through 3 rectangles. Right: 13 dots -- only 1x13. Factor pair lists below each.

---

### Additional Adaptive Problems (drawn from bank as needed)

**Problem A1: Factor Pair Completion**

- Type: `factor-pair-completion`
- Prompt: "24 = 3 x ___"
- Input: single number input
- Correct: 8
- Quick feedback visualization: 3x8 dot grid

**Problem A2: True/False Factor Check**

- Type: `true-false-batch`
- Prompt: "For each statement, tap TRUE or FALSE:"
  1. "7 is a factor of 21" -- TRUE
  2. "6 is a factor of 15" -- FALSE
  3. "Every number is a factor of itself" -- TRUE
  4. "0 is a factor of every number" -- FALSE
- Input: TRUE/FALSE toggle buttons per statement, vertically stacked

**Problem A3: Prime Identification**

- Type: `prime-check`
- Prompt: "Circle all the prime numbers: 2, 9, 11, 15, 17, 21, 23"
- Input: multi-select buttons for each number
- Correct: {2, 11, 17, 23}

**Problem A4: Real-World Factor Application**

- Type: `word-problem`
- Prompt: "A teacher has 28 students. She wants to arrange them into equal rows for a photo. What are all the possible arrangements?"
- Input: multi-select of options: "1x28", "2x14", "4x7", "3x9", "7x4"
- Correct: {1x28, 2x14, 4x7} (note: 7x4 is the same pair as 4x7 -- both should be accepted, but display warns about commutativity if both selected)

### Practice -- Problem Card Styling

Each problem is displayed in a `ProblemCard` component:

- Container: `fill: #0f172a` (slate-950), `borderRadius: 20px`, `border: 1px solid #1e293b`, full-width minus 16px padding
- Problem number indicator: "3 of 9" in `#64748b`, top-left, `fontSize: 13px`
- Layer indicator: colored dot next to problem number
  - Layer 0 (recall): `#60a5fa` (blue-400)
  - Layer 1 (procedure): `#a78bfa` (violet-400)
  - Layer 2 (understanding): `#f59e0b` (amber-500)
  - The student does NOT see the layer label -- only the colored dot as a subtle signal
- Prompt text: `fontSize: 18px`, `fill: #f1f5f9`, `fontWeight: 500`, `lineHeight: 1.6`
- Submit button: `fill: #818cf8`, `borderRadius: 12px`, `padding: 14px 32px`, text "Check Answer" in `#ffffff`, `fontSize: 16px`, `fontWeight: 600`
  - Disabled state (no answer selected): `opacity: 0.4`
  - Hover: `fill: #6366f1`
  - Active: `scale: 0.97`
- Correct answer feedback:
  - Green flash on the card border: `borderColor: #34d399`, 300ms
  - Checkmark icon appears: `fill: #34d399`, 24px, animated draw (200ms)
  - Sound: short sine wave + click (as per gamification design)
  - "+10 XP" float-up from checkmark
- Incorrect answer feedback:
  - Card border briefly changes to `#94a3b8` (neutral, NOT red) for 200ms
  - Soft lower-pitch tone (NOT a buzzer)
  - Text: "Not quite -- let's think about this..." in `#94a3b8`
  - The correct answer is highlighted, and the explanation visualization plays
  - No XP loss. No negative scoring. (Gamification: Punishment BANNED)
- Explanation prompt (appears after correct answer): a collapsible card below the problem, pre-expanded, with the "Why does this work?" question and a text input. Can be skipped but skipping forfeits reflection XP.

### Practice -- Accessibility

- Problem cards: `role="form"` with `aria-labelledby` pointing to prompt text
- Multi-select grids: `role="group"` with `role="checkbox"` per option
- TRUE/FALSE toggles: `role="switch"` with `aria-checked`
- Text inputs: standard `<textarea>` with `aria-label`
- Feedback announcements: `aria-live="assertive"` for correct/incorrect
- Submit button: `aria-disabled` when no answer selected
- Layer indicator dot: `aria-hidden="true"` (decorative)

### Practice -- Interleaving (PF-5)

Problems are NOT presented in a blocked sequence. The IRT selector interleaves NT-2.1 problems with review problems from the prerequisite (NO-1.1 Place Value) if the student has prior review items due. In a first-time lesson context (no prior reviews), all 9 problems are from NT-2.1 but are interleaved across the three layers rather than grouped by layer.

---

## Stage 7: Reflection (approximately 1 minute)

### Reflection Prompt

**Card styling**: same as Guided Discovery cards, but with a golden left accent bar (`#fbbf24`) to signal this is a reflection moment.

**Prompt text**:
> "Why do some numbers have many factors while others (primes) have very few? Explain in your own words."

**Input**: text area
- `minHeight: 120px`, `maxHeight: 300px` (auto-expands)
- Placeholder: "In my own words..."
- `fontSize: 16px`, `fill: #f1f5f9`, `background: #0f172a`, `border: 1px solid #334155`, `borderRadius: 12px`, `padding: 16px`
- Character counter: shown at bottom-right, `fontSize: 12px`, `fill: #64748b`
- Minimum: 20 characters (the Submit button remains disabled below this)
- Maximum: 800 characters

**Submit button**: "Share My Thinking" in `#818cf8` styling. Appears below the text area.

### AI Evaluation

On submission, the `lesson.submitReflection` tRPC route is called. The AI evaluator scores the reflection on a 0-5 scale:

| Score | Criteria | XP Awarded |
|-------|----------|------------|
| 0 | Gibberish, off-topic, or fewer than meaningful words | 0 |
| 1 | Vaguely on topic but no real insight ("some numbers have more factors") | 16 |
| 2 | Shows basic understanding (mentions primes have only 1 and themselves) | 32 |
| 3 | Good explanation with spatial reasoning (rectangles, factor pairs) | 48 |
| 4 | Strong explanation connecting multiple concepts (primes, composites, rectangle model) | 64 |
| 5 | Exceptional: original insight, analogy, or extension beyond the lesson | 80 |

**Feedback display**:
1. Brief "thinking" animation: three dots pulsing (`opacity: 0.3 <-> 1.0`, 400ms cycle), 1-2 seconds while AI processes
2. AI feedback appears below the text area:
   - Container: `fill: #1e293b`, `borderRadius: 12px`, `padding: 16px`, `border: 1px solid #334155`
   - Left icon: small brain/lightbulb icon in `#fbbf24`
   - Text: AI's response in `#cbd5e1`, `fontSize: 15px`
   - Example feedback (score 3): "Great thinking! You connected factors to the rectangle model -- that's exactly the spatial insight. You might also think about WHY 12 has so many factor pairs: it's divisible by 2 AND 3, which gives it many combinations."
3. XP award: "+48 XP: Reflection" floats up, same styling as other XP awards
4. If `ahaDetected` is true: trigger the "Aha Moment" celebration (see gamification design -- Neuron Flash, brief neural network animation)
5. If `referencesPriorConcept` is true: "+1.3x Connection Maker" multiplier text appears briefly

### Reflection -- Accessibility

- Text area: standard accessible `<textarea>` with `aria-label="Write your reflection about factors and primes"`
- Submit button: `aria-disabled` when under minimum character count, with `aria-describedby` explaining the requirement
- AI feedback: `aria-live="polite"` region
- XP notification: `aria-live="polite"`

---

## Content Files Structure

This lesson produces the following content files per the project structure:

```
src/content/domains/number-theory/NT-2.1/
  lesson.mdx          # 7-stage content with prose, prompts, stage markers
  animations.json      # MathScene configs for hook, spatial, symbol bridge
  problems.json        # Practice problem bank (9+ problems with metadata)
  meta.json            # Prerequisites, successors, hooks, metadata
```

### meta.json

```json
{
  "id": "NT-2.1",
  "name": "Factors & Multiples",
  "domain": "number-theory",
  "gradeLevel": 6,
  "contentPath": "number-theory/NT-2.1",
  "prerequisites": ["NO-1.1"],
  "successors": ["NT-2.2", "NT-2.3", "NO-1.4a"],
  "hook": "Why do eggs come in 6s and 12s but never 7s? 12 has six different rectangles, 7 has only one.",
  "estimatedDurationMinutes": 15,
  "tags": ["factors", "multiples", "divisibility", "prime", "composite", "GCF", "rectangles"],
  "interactionMinimum": 8,
  "spatialModel": "rectangle-array",
  "coreVisualization": "factor-rectangles"
}
```

---

## Technical Specifications

### SVG Rendering Pipeline

All visuals in this lesson use the SVG renderer (`renderer: "svg"`). No WebGL/R3F required -- all content is 2D.

**Dot rendering**:
- Element: `<circle>` with Framer Motion `motion.circle`
- Props animated via Framer Motion `animate` prop: `cx`, `cy`, `r`, `opacity`, `fill`, `scale`
- GPU compositing: Framer Motion uses `transform` and `opacity` (GPU-accelerated properties) for position changes. Fill color changes use a CSS transition fallback.
- Filter effects (`drop-shadow`, `brightness`): applied via SVG `<filter>` elements, defined once in `<defs>` and referenced by ID. Only active during highlight moments (not permanently applied to reduce GPU load).

**Responsive viewBox**:
- Mobile (width < 640px): `viewBox="0 0 360 480"` (portrait)
- Tablet (640-1024px): `viewBox="0 0 600 400"` (landscape-ish)
- Desktop (>1024px): `viewBox="0 0 800 500"` (wide)
- The `preserveAspectRatio="xMidYMid meet"` ensures content scales without distortion
- Dot radius scales with viewBox: `r = viewBoxWidth / 36` (ensures consistent visual density)

### Animation System

**Spring configurations used in this lesson**:

| Name | Usage | Damping | Stiffness | Mass |
|------|-------|---------|-----------|------|
| `snapSpring` | Dot rearrangement, rectangle snapping | 25 | 400 | 1 |
| `gentleSpring` | UI element entry, badge animations | 20 | 300 | 1 |
| `bouncySpring` | Discovery celebration, Aha moments | 15 | 350 | 1 |
| `quickSpring` | Hover effects, small UI feedback | 30 | 500 | 0.8 |

**Easing curves** (for non-spring animations):

| Name | CSS Equivalent | Usage |
|------|---------------|-------|
| `easeOut` | `cubic-bezier(0, 0, 0.2, 1)` | Fade-ins, labels appearing |
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` | Number line hops |
| `easeOutBack` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Surprise/wonder annotations |

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `dot-primary` | `#818cf8` (indigo-400) | Dots, primary accents, factor set |
| `dot-stroke` | `#6366f1` (indigo-500) | Dot borders |
| `valid` | `#34d399` (emerald-400) | Valid rectangles, correct answers, composites |
| `invalid` | `#fb7185` (rose-400) | Invalid arrangements, remainder dots, errors |
| `highlight` | `#fbbf24` (amber-400) | Primes, GCF, key revelations, wonder moments |
| `text-primary` | `#f1f5f9` (slate-100) | Headings, primary text |
| `text-secondary` | `#e2e8f0` (slate-200) | Body text, KaTeX |
| `text-muted` | `#94a3b8` (slate-400) | Annotations, hints, secondary labels |
| `text-dim` | `#64748b` (slate-500) | Character counts, metadata |
| `surface` | `#1e293b` (slate-800) | Card backgrounds, badges |
| `surface-deep` | `#0f172a` (slate-950) | Problem card background |
| `border` | `#334155` (slate-700) | Card borders, dividers |
| `violet-accent` | `#a78bfa` (violet-400) | Procedure layer indicator, music example |
| `teal-accent` | `#2dd4bf` (teal-400) | Tiling example |
| `orange-accent` | `#fb923c` (orange-400) | Cookie example |

All color combinations meet WCAG 2.1 AA contrast ratios against their respective backgrounds:
- `text-primary` on `surface`: 11.7:1 (AAA)
- `text-secondary` on `surface`: 9.5:1 (AAA)
- `dot-primary` on `surface-deep`: 6.2:1 (AA)
- `highlight` on `surface`: 8.1:1 (AAA)
- `valid` on `surface`: 7.4:1 (AAA)
- `invalid` on `surface`: 5.8:1 (AA)

### Gesture Configuration (@use-gesture/react)

```typescript
// Rectangle Factory drag configuration
const dragConfig: UserDragConfig = {
  filterTaps: true,           // Distinguish taps from drags
  threshold: 5,               // 5px movement before drag starts
  rubberband: 0.15,           // Slight rubber-band at boundaries
  axis: undefined,            // Allow both horizontal and vertical drag
  pointer: {
    touch: true,              // Enable touch support
    mouse: true,              // Enable mouse support
  },
  // Prevent browser scroll while dragging the grid
  eventOptions: { passive: false },
};

// Snap detection during drag
const SNAP_THRESHOLD_PX = 15; // Snap to valid dimensions within 15px
const DRAG_THROTTLE_MS = 16;  // 60fps throttle
```

**Touch handling**:
- Single-finger drag: reshape rectangle
- Two-finger pinch: zoom the dot grid (if grid is larger than viewport)
- Long press (500ms): show tooltip with current arrangement info
- Swipe (on factor pair list): scroll through discovered pairs on mobile

### Sound Design

| Event | Sound | File | Duration | Volume |
|-------|-------|------|----------|--------|
| Dot appear (hook) | Crystalline chime, ascending | `sfx/chime-ascending.mp3` | 150ms | 20% |
| Rectangle snap | Mechanical click (LEGO-like) | `sfx/snap-click.mp3` | 200ms | 40% |
| New factor discovered | Bright two-note motif (major 3rd) | `sfx/discover-chime.mp3` | 350ms | 50% |
| All factors found | Celebration chord (major triad) | `sfx/celebrate-chord.mp3` | 800ms | 50% |
| Prime reveal | Wonder chord (sus4 -> major) | `sfx/wonder-chord.mp3` | 600ms | 45% |
| Correct answer | Sine wave + click | `sfx/correct-click.mp3` | 200ms | 40% |
| Incorrect answer | Soft low tone | `sfx/soft-low.mp3` | 300ms | 30% |
| Questioning (hook) | Two ascending notes | `sfx/hmm-question.mp3` | 400ms | 35% |
| Number line hop | Short percussive tap | `sfx/hop-tap.mp3` | 100ms | 25% |

All sounds are:
- Optional (sound toggle in profile settings, `soundEnabled` in Student model)
- Short (<1s) to avoid overlap
- Non-startling (no sudden loud sounds -- PF-6)
- Loaded lazily (not part of initial bundle)
- Compressed: MP3 at 64kbps mono (each file <10KB)

### Mobile-Specific Adaptations

| Feature | Mobile (<640px) | Desktop (>1024px) |
|---------|----------------|-------------------|
| Layout | Vertical stack: selector -> grid -> pairs -> instruction | Grid on left, pairs sidebar on right |
| Dot radius | 12px | 10px |
| Grid spacing | 36px | 32px |
| Touch targets | 48px minimum (all buttons) | 44px minimum |
| Number selector | Full-width bar, large chevrons | Compact, top-left |
| Factor pair list | Horizontal scroll, pill badges | Vertical stack in sidebar |
| Problem cards | Full-width, stacked vertically | 640px max-width, centered |
| Venn diagram | Circles stacked diagonally (more vertical) | Standard horizontal overlap |
| Bottom navigation | Sticky bottom bar with progress dots | Inline progress bar |
| Keyboard | Virtual keyboard pushes content up; grid resizes | Physical keyboard, no layout shift |

### Offline Support (DR-6)

This lesson is fully cacheable for offline use:

- `lesson.mdx`: cached by Serwist service worker on first visit
- `animations.json`: cached alongside lesson
- `problems.json`: cached alongside lesson (all problem content is static)
- `meta.json`: cached alongside lesson
- SVG rendering: pure client-side, no server dependency
- Sound files: lazy-loaded and cached on first play
- AI tutor (Stage 3 micro-checks): falls back to scripted responses if offline
- AI evaluation (Stage 7 reflection): queued for sync when online; immediate local feedback shows "Your reflection has been saved. We'll give you detailed feedback when you're back online."
- XP events: queued in Dexie.js IndexedDB, synced on reconnection

### i18n (DR-7)

All user-facing strings in this lesson are externalized. Key entries in `src/lib/i18n/messages/en.json`:

```json
{
  "lesson.nt21.hook.question1": "How many rectangles can you make with 12 dots?",
  "lesson.nt21.hook.question2": "What about 7 dots?",
  "lesson.nt21.hook.flipped": "Wait... that's just 3x4 flipped!",
  "lesson.nt21.hook.special": "7 is special...",
  "lesson.nt21.hook.continue": "Let's explore",
  "lesson.nt21.spatial.instruction": "Drag the edges to reshape!",
  "lesson.nt21.spatial.doesntDivide": "Doesn't divide evenly!",
  "lesson.nt21.spatial.alreadyFound": "You already found this one!",
  "lesson.nt21.spatial.allFound": "All factor pairs found!",
  "lesson.nt21.spatial.findAll": "Find ALL the factor pairs for {number}!",
  "lesson.nt21.spatial.prime": "Numbers like this are called PRIME!",
  "lesson.nt21.spatial.perfectSquare": "A perfect square!",
  "lesson.nt21.spatial.explore": "Explore any number! Which numbers have the MOST factor pairs?",
  "lesson.nt21.spatial.ready": "Ready to learn more?",
  "lesson.nt21.guided.prompt1": "You found all the rectangles for 12: 1x12, 2x6, 3x4. The numbers on the sides -- {factors} -- are called {factorsHighlight} of 12.",
  "lesson.nt21.guided.prompt2": "Notice they come in {pairsHighlight}: 1 & 12, 2 & 6, 3 & 4. Each pair multiplies to give 12!",
  "lesson.nt21.guided.prompt3": "Now think about 7. How many rectangles did it have? Just 1x7. Numbers with exactly {twoFactorsHighlight} (1 and themselves) are called {primeHighlight}.",
  "lesson.nt21.guided.prompt4": "Is 1 prime? It only has {oneFactorHighlight}: just 1 itself (1x1=1). Primes need {exactlyTwoHighlight}. So 1 is {notPrimeHighlight} -- it's special in its own way.",
  "lesson.nt21.guided.prompt5.question": "Quick: is 15 prime?",
  "lesson.nt21.guided.prompt5.prime": "Prime",
  "lesson.nt21.guided.prompt5.notPrime": "Not Prime",
  "lesson.nt21.guided.transition": "Let's write this down properly.",
  "lesson.nt21.symbol.factorSet": "Factors of {n}",
  "lesson.nt21.symbol.multipleOf": "{n} is a multiple of each of its factors",
  "lesson.nt21.symbol.multiplesOf": "Multiples of {n}",
  "lesson.nt21.symbol.gcf": "Greatest Common Factor = the BIGGEST number in the overlap",
  "lesson.nt21.realworld.cookies.title": "Fair Sharing",
  "lesson.nt21.realworld.music.title": "Music & Rhythm",
  "lesson.nt21.realworld.tiling.title": "Architecture & Tiling",
  "lesson.nt21.practice.checkAnswer": "Check Answer",
  "lesson.nt21.practice.notQuite": "Not quite -- let's think about this...",
  "lesson.nt21.reflection.prompt": "Why do some numbers have many factors while others (primes) have very few? Explain in your own words.",
  "lesson.nt21.reflection.placeholder": "In my own words...",
  "lesson.nt21.reflection.submit": "Share My Thinking"
}
```

Mathematical notation strings (KaTeX) are NOT externalized -- mathematical notation is universal across locales (CP-VII, DR-7 rationale).

---

## XP & Gamification Integration

### XP Breakdown for Full Lesson Completion

| Source | Amount | Condition |
|--------|--------|-----------|
| Lesson completion (base) | 100 | Complete all 7 NLS stages |
| Interactive exploration bonus | 20-40 | Based on manipulation diversity (tried different numbers, found primes, explored edge cases). 20 for minimum interactions, 40 for exploring 5+ numbers in free exploration. |
| Guided discovery insight | 30 | Correctly answered the "Is 15 prime?" micro-check on first attempt |
| Practice completion | 50 | Completed all 9 practice problems |
| Reflection quality | 0-80 | AI-evaluated score x 16 (0-5 scale -> 0-80 XP) |
| **Total range** | **200-300** | **Typical: ~240 XP** |

### Multipliers (applied to total)

| Multiplier | Value | Trigger |
|------------|-------|---------|
| Deep Dive | 1.5x | >2 min in spatial exploration beyond the minimum 8 interactions |
| Connection Maker | 1.3x | Reflection references Place Value (NO-1.1) or connects to real-world |
| Struggle Bonus | 1.4x | Got 2+ wrong in practice -> retried -> explained correctly |
| First Try Clarity | 1.2x | First reflection attempt rated >= 4/5 |

### Achievement Triggers

| Achievement | Category | Trigger in This Lesson |
|-------------|----------|----------------------|
| First Light | Exploration (Common) | Complete this lesson (if it's the student's first) |
| Edge Walker | Exploration (Uncommon) | Try 10+ different rectangle arrangements in spatial exploration |
| Solid Ground | Mastery (Common) | Score 90%+ on practice with high explanation quality |
| Second Wind | Persistence (Common) | Get wrong -> review -> solve harder version |
| Pattern Hunter | Creativity (Uncommon) | Identify factor pair pattern before Prompt 2 reveals it (detected via early completion of all pairs + interaction timing) |

---

## AI Tutor Integration

### Tutor Availability

The AI tutor (TutorPanel, bottom sheet) is available throughout all stages except the Hook. The tutor's behavior adapts per stage:

| Stage | Tutor Mode | Behavior |
|-------|-----------|----------|
| Hook | Unavailable | Tutor panel hidden during hook animation |
| Spatial Experience | Socratic hints | If student is stuck (no new discovery for 45s), tutor offers a gentle hint: "Have you tried making 2 rows?" Never gives the answer directly. |
| Guided Discovery | Socratic dialogue | Responds to student questions about the prompts. Can elaborate on any concept. |
| Symbol Bridge | Socratic + direct | Answers notation questions directly ("What does the curly brace mean?") |
| Real-World Anchor | Conversational | Can discuss additional real-world examples, extends the examples given |
| Practice | Scaffolded hints | On incorrect answer, offers graduated hints (3 levels: gentle nudge, stronger hint, worked example). Each hint level adds 1 to `hintsUsed` counter. |
| Reflection | Encouraging | "Tell me more about..." prompts to deepen the reflection. Never writes the reflection for the student. |

### Scene Commands

The tutor can modify the MathScene to illustrate points:

```typescript
// Example: tutor creates a visual to explain why 5 is not a factor of 12
const sceneCommands: SceneCommand[] = [
  {
    action: "create",
    object: {
      type: "group",
      id: "tutor-demo-5x12",
      children: [
        // 10 dots in a 5x2 grid
        { type: "point", id: "td-1", position: [0, 0], radius: 8, style: { fill: "#818cf8" } },
        { type: "point", id: "td-2", position: [1, 0], radius: 8, style: { fill: "#818cf8" } },
        // ... (10 dots total)
        // 2 remainder dots, highlighted differently
        { type: "point", id: "td-11", position: [0, 2], radius: 8, style: { fill: "#fb7185" } },
        { type: "point", id: "td-12", position: [1, 2], radius: 8, style: { fill: "#fb7185" } },
      ]
    }
  },
  {
    action: "animate",
    sequence: {
      trigger: "auto",
      steps: [
        { action: "fadeIn", target: "tutor-demo-5x12", duration: 0.5 }
      ]
    }
  }
];
```

### Misconception Detection

Common misconceptions the AI tutor watches for in this lesson:

| Misconception | Detection Signal | Tutor Response |
|---------------|-----------------|----------------|
| "1 is prime" | Student claims 1 is prime in reflection or practice | "Great question! 1 only has one factor (itself), but primes need exactly two different factors. 1 is in its own special category." |
| "Factors and multiples are the same" | Swapped usage in reflection | "They're related but different! 3 is a FACTOR of 12, and 12 is a MULTIPLE of 3. Factor divides into, multiple is the result of multiplying." |
| "All odd numbers are prime" | Marks 9 or 15 as prime | "9 seems prime because it's odd, but can you make a 3x3 rectangle with 9 dots? That means 3 is a factor!" |
| "0 is a factor of everything" | Selects 0 as a factor | "If 0 were a factor of 12, that would mean 12 / 0 works. But we can't divide by 0! Try it on a calculator." |
| "Factor pairs are different if order changes" | Counts 3x4 and 4x3 as separate pairs | "3x4 and 4x3 give the same rectangle, just rotated! The factor PAIR is the same: {3, 4}." |

---

## Testing Requirements

### Math Correctness Tests (DR-2)

```
tests/unit/math/factors-multiples.test.ts
```

| Test | Input | Expected Output | Type |
|------|-------|-----------------|------|
| `getFactors(12)` | 12 | [1, 2, 3, 4, 6, 12] | Exact |
| `getFactors(1)` | 1 | [1] | Exact |
| `getFactors(7)` | 7 | [1, 7] | Exact |
| `getFactors(36)` | 36 | [1, 2, 3, 4, 6, 9, 12, 18, 36] | Exact |
| `getFactorPairs(12)` | 12 | [[1,12], [2,6], [3,4]] | Exact (sorted, smaller first) |
| `getFactorPairs(1)` | 1 | [[1,1]] | Exact |
| `getFactorPairs(7)` | 7 | [[1,7]] | Exact |
| `getFactorPairs(16)` | 16 | [[1,16], [2,8], [4,4]] | Exact (includes perfect square pair) |
| `isPrime(2)` | 2 | true | Exact |
| `isPrime(1)` | 1 | false | Exact |
| `isPrime(7)` | 7 | true | Exact |
| `isPrime(9)` | 9 | false | Exact |
| `gcf(12, 18)` | 12, 18 | 6 | Exact |
| `gcf(7, 13)` | 7, 13 | 1 | Exact (coprime) |
| `lcm(4, 6)` | 4, 6 | 12 | Exact |
| `lcm(3, 7)` | 3, 7 | 21 | Exact (coprime) |
| `isValidRectangle(12, 3, 4)` | 12, 3, 4 | true | Exact |
| `isValidRectangle(12, 5, 2)` | 12, 5, 2 | false | Exact |
| `getRemainderDots(12, 5)` | 12, 5 | 2 | Exact |

### Integration Tests

```
tests/integration/lesson-flow/nt-2.1.test.ts
```

- Stage progression: verify student cannot skip from Stage 1 to Stage 6
- Interaction minimum: verify Stage 2 requires 8 interactions before Continue appears
- Factor pair tracking: verify discovering 3x4 also marks 4x3 as found
- XP calculation: verify base + bonuses + multipliers match expected totals
- Offline queue: verify reflection submission queues correctly when offline

### E2E Tests (Playwright)

```
tests/e2e/lesson-nt-2.1.spec.ts
```

- Full lesson flow: hook -> spatial (find all pairs for 12) -> guided -> symbol -> real-world -> practice (answer all 9) -> reflection -> lesson complete
- Drag interaction: simulate drag on rectangle edge, verify snap to valid arrangement
- Invalid drag: simulate drag to invalid arrangement, verify remainder dots appear
- Prime discovery: select N=7, verify prime annotation appears after finding 1x7
- Accessibility: run axe-core on each stage, verify zero violations
- Performance: measure frame rate during dot rearrangement animation on simulated mid-range device

### Visual Regression (Storybook)

Each stage has a Storybook story for visual regression testing (DR-3):

```
src/components/lesson/stages/__stories__/
  NT-2.1-Hook.stories.tsx
  NT-2.1-SpatialExperience.stories.tsx
  NT-2.1-GuidedDiscovery.stories.tsx
  NT-2.1-SymbolBridge.stories.tsx
  NT-2.1-RealWorldAnchor.stories.tsx
  NT-2.1-Practice.stories.tsx
  NT-2.1-Reflection.stories.tsx
```

---

## Edge Cases & Error Handling

| Scenario | Handling |
|----------|---------|
| Student refreshes mid-lesson | `lesson.getLessonProgress` restores to the last completed stage. Within a stage, progress is lost (acceptable -- stages are short). |
| Student's device loses focus during hook animation | Animation pauses via `document.visibilitychange` listener. Resumes on focus. |
| Very slow device (<30fps during animation) | Detected via `useAdaptivePixelRatio` hook. Disable drop-shadow filters, reduce dot count for large N (show dots as a filled rectangle instead of individual circles), disable confetti. |
| Student submits empty reflection | Submit button disabled below 20 characters. If somehow submitted empty (client validation bypassed), server returns score 0 with feedback "Try writing a sentence about what you learned!" |
| Student enters only "idk" or similar | AI evaluator scores 0, feedback is encouraging: "That's okay! Try thinking about why 12 can make 3 different rectangles but 7 can only make 1." |
| N=2 in spatial exploration | Only factor pair is (1,2). The lesson detects this and shows: "2 is the smallest prime number! It only has one rectangle." |
| N=36 on small mobile screen | Dots scale down. If 1x36 row overflows, grid starts at 6x6 (fits easily). Viewport scrolls horizontally as a last resort. |
| Network error during reflection submit | Queued in Dexie.js. UI shows "Saved locally -- we'll sync when you're back online." Full local XP calculation applied immediately (optimistic). |
| AI tutor rate-limited | Fallback to scripted hints (pre-authored in `problems.json`). The student experience degrades gracefully -- scripted hints cover the 5 most common misconceptions. |

---

## Lesson Review Checklist (DR-3)

### Technical Review

- [ ] All animations render at 60fps on iPhone SE 2nd gen (A13 Bionic)
- [ ] SVG element count never exceeds 200 in any stage
- [ ] All touch targets >= 44px (measured, not estimated)
- [ ] Color contrast ratios verified (WCAG 2.1 AA minimum)
- [ ] Keyboard navigation works through all 7 stages
- [ ] Screen reader announces all state changes
- [ ] `prefers-reduced-motion` respected in all animations
- [ ] Offline mode: all stages except AI features work without network
- [ ] All strings externalized to en.json
- [ ] No `any` types in lesson components (DR-1)
- [ ] Math correctness tests pass (DR-2)

### Pedagogical Review

- [ ] NLS stages follow correct order (1-7, no skipping)
- [ ] No formulas/notation before Stage 4 (CP-II)
- [ ] Spatial experience has >= 1 interactive manipulation step (PF-3)
- [ ] Practice problems interleaved, not blocked (PF-5)
- [ ] No timer pressure anywhere (PF-6)
- [ ] Wrong answers use neutral-positive language (PF-6)
- [ ] Factor-pair explanation is mathematically accurate
- [ ] "1 is not prime" explanation is correct and age-appropriate
- [ ] GCF Venn diagram content is accurate
- [ ] LCM number line representation is accurate
- [ ] Real-world examples are relatable to 11-year-olds
- [ ] Reflection prompt targets deep understanding, not recall (CP-I)
- [ ] Forward links to NT-2.2, NT-2.3, NO-1.4a are surfaced (CP-III)

---

## Cross-Topic Connections (CP-III)

| Connection | Direction | How Surfaced |
|------------|-----------|-------------|
| NO-1.1 Place Value | Backward (prerequisite) | Place value understanding needed to comprehend that 12 = 1 ten + 2 ones is different from 12 = 3 x 4. The rectangle model builds on understanding numbers as quantities. |
| NT-2.2 Prime & Composite | Forward (successor) | The prime/composite distinction introduced here is formalized in NT-2.2. The "Sieve of Eratosthenes" lesson directly extends the "which numbers have only 1x_N rectangles?" exploration. |
| NT-2.3 GCF & LCM | Forward (successor) | The GCF Venn diagram and LCM number line introduced in the Symbol Bridge stage are the core spatial models for NT-2.3. That lesson extends them to algorithmic methods. |
| NO-1.4a Fraction Operations | Forward (successor) | Finding common denominators for fraction addition requires LCM. Simplifying fractions requires GCF. This lesson builds the factor-finding skill that makes fraction operations possible. |
| NT-2.5 Exponents & Powers | Indirect forward | Perfect square numbers (4, 9, 16, 25, 36) are encountered in the spatial exploration when both dimensions are equal (4x4 rectangle). This plants the seed for square numbers before the exponents lesson. |

These connections are stored in the curriculum graph and surfaced in the Knowledge Nebula visualization. After completing NT-2.1, the constellation lines to NT-2.2, NT-2.3, and NO-1.4a become visible in the student's progress map.

---

## SRS Integration

After lesson completion, three `StudentConceptState` records are created for NT-2.1:

| Layer | Initial Stability | Initial Difficulty | First Review Scheduled |
|-------|------------------|--------------------|----------------------|
| 0 (Recall) | Based on practice performance | Calibrated from problem responses | 1 day after lesson |
| 1 (Procedure) | Based on GCF/LCM problem performance | Calibrated from problem responses | 2 days after lesson |
| 2 (Understanding) | Based on reflection quality score | Higher initial difficulty | 3 days after lesson |

The three-layer model enables the rote detection algorithm: if a student can recall factors quickly (high layer-0 stability) but cannot explain why factors come in pairs (low layer-2 stability), the system triggers a conceptual re-teaching intervention rather than more drill.

Review problems for NT-2.1 are drawn from the `problems.json` bank and interleaved with problems from other topics in future practice sessions (PF-5).
