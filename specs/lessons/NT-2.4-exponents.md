# Lesson Design: NT-2.4 Exponents

**Topic ID**: NT-2.4
**Domain**: Number Theory (Domain 2)
**Grade**: 6
**Prerequisite**: NT-2.1 (Factors & Multiples)
**Successors**: NT-2.5a (Exponent Rules), NO-1.8 (Scientific Notation), NO-1.10 (Square & Cube Roots), AL-3.6 (Polynomials)
**Estimated Duration**: 20-28 minutes (adaptive)
**Constitution Compliance**: All 7 Core Principles verified; full NLS pipeline

---

## Core Insight

Exponents are a shorthand for repeated multiplication -- 2^3 means 2 x 2 x 2 = 8, NOT 2 x 3 = 6. The exponent (superscript number) tells HOW MANY TIMES the base (big number) is multiplied by itself. This is fundamentally different from multiplication, which is repeated addition: just as 3 x 4 means 4 + 4 + 4 (add three times), 3^4 means 3 x 3 x 3 x 3 (multiply four times). The key perceptual anchor is a branching tree: each level multiplies the count by the base, so the total grows explosively -- not linearly.

The branching tree model makes this tangible: a tree with base 2 and exponent 3 has 3 levels of branching, where each node splits into 2 branches. The number of leaves (endpoints) is 2^3 = 8. Changing the exponent adds or removes levels; changing the base changes how many branches each node has. This transforms an abstract notation question into a spatial growth problem.

---

## Neuroscience Framework

### Neural Pathway Activation

| Pathway | How This Lesson Engages It | Constitution Reference |
|---------|---------------------------|----------------------|
| Intraparietal sulcus (IPS) | The branching tree is a spatial structure where each level's width maps to the growing magnitude of the power; the student spatially perceives exponential growth by watching the tree explode outward level by level | PF-1 (Spatial-Mathematical Neural Overlap) |
| Motor cortex | Physically tapping to add tree levels and dragging a base slider to change branching factor encodes the base/exponent distinction through embodied action | PF-3 (Embodied Cognition) |
| Pattern recognition (prefrontal) | Observing that adding one level MULTIPLIES the leaf count (rather than adding to it) triggers recognition of the multiplicative-vs-additive distinction -- the core misconception breaker | PF-1 |
| Reward prediction (dopamine) | Hook animation surprises by showing how a tiny change in exponent causes an enormous change in result; the "penny doubling" reveal triggers prediction error and wonder | NLS Stage 1 |
| Visuospatial sketchpad (working memory) | Holding the tree structure in mind while counting leaves at each level exercises hierarchical spatial working memory; the tower-of-blocks secondary model provides a complementary encoding | PF-2 (Dual Coding) |
| Hippocampus (episodic) | Real-world connections (folding paper, viral sharing, Minecraft worlds) create rich episodic tags for retrieval | PF-4 (Episodic Anchoring) |

### Emotional Arc

| Phase | Emotion | Trigger | Duration |
|-------|---------|---------|----------|
| Hook | Surprise, wonder | A single penny doubling for 30 days reaches $5,368,709.12 -- the counter accelerates past a million dollars; student's jaw drops | 0:00-0:45 |
| Early spatial (Branching Tree) | Playful exploration | Tapping to grow the tree -- each tap doubles/triples the leaves. "How big can I make it?" | 0:45-2:30 |
| Mid spatial (Tower Blocks) | Engagement, curiosity | Switching to the tower model -- stacking squares and cubes to see area/volume grow. Connecting two representations of the same idea. | 2:30-4:30 |
| Late spatial (Base/Exponent Control) | Agency, flow | Adjusting base and exponent independently with sliders, watching the tree and numeric readout respond in real time | 4:30-6:00 |
| Discovery | Delight, insight | Realizing 2^3 != 2x3; seeing that adding one more level MULTIPLIES the total; discovering why anything^0 = 1 via the "remove a level" pattern | 6:00-8:30 |
| Symbol bridge | Confidence | The notation b^n maps directly onto the tree (base = branches per node, exponent = levels) -- no mystery | 8:30-10:30 |
| Practice | Flow | Problems feel achievable because the tree and tower models are internalized | 10:30-20:00 |
| Reflection | Satisfaction, ownership | Articulating in their own words why 2^3 != 6 | 20:00-22:00 |

### Anxiety Mitigation (PF-6)

- NO timer anywhere in this lesson. Not displayed, not tracked visually.
- Wrong interactions in the spatial phase (e.g., overcounting leaves) show gentle visual feedback -- the leaf count re-highlights with a soft pulse and the correct count animates in, never "WRONG" or red X.
- The tree builder phase has no single "correct" tree -- exploration of any base/exponent combination is valid and celebrated.
- Practice problems use neutral-positive feedback language per gamification design.
- The spatial exploration uses progressive disclosure: students start with base 2 only, then unlock base 3, then arbitrary bases, preventing working memory overload.

---

## Stage 1: Hook (30-45 seconds)

### Scene Definition

```json
{
  "id": "nt-2.4-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 400],
  "background": "transparent",
  "objects": [],
  "animations": [],
  "interactions": []
}
```

### Detailed Animation Sequence

**T=0.0s -- Initial State: The Penny**

A single copper-colored circle appears at the top-center of the viewport, representing a penny.

- Position: centered horizontally at (200, 60)
- Circle: `r: 18px`, `fill: #d97706` (amber-600), `stroke: #b45309` (amber-700), `strokeWidth: 2`
- Inner text: "1c" in `fill: #451a03`, `fontSize: 12px`, `fontWeight: 700`, `textAnchor: "middle" as const`
- Entry: `spring(damping: 20, stiffness: 300)`, `scale: 0 -> 1`, `opacity: 0 -> 1`
- Below the penny, text fades in after 300ms: "What if you doubled a penny every day?"
  - `fontSize: 16px`, `fill: #94a3b8` (slate-400), italic
  - `opacity: 0 -> 1` over 400ms, `ease: "easeOut"`
- Sound: coin clink, a single metallic tap, 200ms, 25% volume

**T=1.0s -- Day Counter and Value Display**

A day counter and running total appear below the penny.

- Day counter: "Day 1" in `fill: #f1f5f9`, `fontSize: 14px`, positioned at (200, 110)
- Value display: "$0.01" in `fill: #fbbf24` (amber-400), `fontSize: 24px`, `fontWeight: 700`, positioned at (200, 140)
- Both: `opacity: 0 -> 1` over 300ms

**T=1.5s -- Doubling Begins (Days 1-10, fast)**

The penny splits into two, then four, then eight... shown as a cascade of coins sliding out from the center. Each "day" takes 300ms.

- Days 1-10 animate in rapid succession:
  - The single penny splits: two coins slide apart horizontally (spring, 200ms), then each of those splits, etc.
  - After 3-4 visible splits, the individual coins become too small to show; instead, a growing pile of small dots represents the pennies
  - The pile grows at the bottom of the scene, filling from left to right like a bar chart
  - Pile fill color: gradient from `#d97706` (amber) to `#f59e0b` (amber-500)
  - Day counter updates: "Day 2", "Day 3", ... "Day 10"
  - Value display updates with each day, using a spring counter animation:
    - Day 2: "$0.02", Day 3: "$0.04", Day 4: "$0.08", Day 5: "$0.16"
    - Day 6: "$0.32", Day 7: "$0.64", Day 8: "$1.28", Day 9: "$2.56", Day 10: "$5.12"
  - Sound: rapid soft coin clinks, decreasing interval (300ms -> 200ms -> 150ms)

**T=4.5s -- Acceleration (Days 10-20)**

The doubling accelerates visually. The pile grows faster. Each day now takes 200ms.

- The pile bar extends further right, height also growing
- Value display accelerates:
  - Day 15: "$163.84" -- annotation appears: "A nice dinner?" in `#94a3b8`, `fontSize: 13px`, italic, 400ms hold
  - Day 20: "$5,242.88" -- annotation: "A used car!" in `#94a3b8`, `fontSize: 13px`, italic
- The annotations fade out 300ms after appearing
- The font size of the value display grows slightly: from 24px to 28px via `spring`

**T=6.5s -- The Explosion (Days 20-30)**

The pile visualization can no longer fit. It bursts out of bounds.

- Day 25: "$167,772.16" -- annotation: "A house!" in `#fbbf24`, `fontSize: 14px`, `fontWeight: 600`
- The pile bar fills the entire width and overflows with small particles spilling off-screen
- Day 28: "$1,342,177.28" -- the value text changes color to `#34d399` (emerald), `fontSize: 32px`
- The million-dollar mark triggers a brief screen flash (`opacity: 0 -> 0.1 -> 0`, white, 200ms)
- Day 30: "$5,368,709.12"
  - Value display: `fontSize: 36px`, `fontWeight: 800`, `fill: #fbbf24`
  - Entry: `spring(damping: 12, stiffness: 200)`, `scale: 0.7 -> 1.05 -> 1`
- Sound: ascending chord progression, bright and triumphant, 500ms, 45% volume

**T=8.5s -- The Reveal**

The pile and day counter fade. The penny reappears at center, small.

- Below the penny, two lines appear:
  - Line 1: "1 penny x 2^30 = $5,368,709.12"
    - KaTeX: `"1\\text{c} \\times 2^{30} = \\$5{,}368{,}709.12"`
    - `fontSize: 18px`, `fill: #f1f5f9`
    - The "2^30" is highlighted in `#fbbf24`, `fontWeight: 700`
    - `opacity: 0 -> 1` over 400ms
  - Line 2: "That tiny superscript 30 does ALL the work."
    - `fontSize: 16px`, `fill: #fbbf24` (amber-400), `fontWeight: 600`
    - `opacity: 0 -> 1` over 400ms, 300ms delay after Line 1
    - Entry: `scale: 0.9 -> 1`, `ease: "easeOutBack"`
- Sound: mysterious wonder chord (suspended 4th resolving to major), 400ms, 35% volume

**T=10.5s -- Continue Button**

Everything holds. A "Continue" button fades in at the bottom of the scene.

- Style: rounded rectangle, `fill: #818cf8`, `rx: 12`, padding 16px 32px
- Text: "Learn the power of powers" in `#ffffff`, `fontSize: 16px`, `fontWeight: 600`
- Entry: slide up from 20px below + fade in, 400ms, `ease: "easeOut"`
- Hover state: `fill: #6366f1`, scale 1.02
- Active state: scale 0.98
- Touch target: minimum 48x48px (exceeds DR-5 requirement of 44px)

### Hook -- Accessibility

- `aria-live="polite"` region narrates: "A single penny doubles every day. Day 1: 1 cent. Day 10: 5 dollars and 12 cents. Day 20: over 5 thousand dollars. Day 30: over 5 million dollars. The equation 2 to the power of 30 creates this explosive growth."
- Each major milestone is announced with a 500ms delay after visual animation completes.
- Penny has `role="img"` with `aria-label="A penny worth 1 cent"`
- Value display has `aria-live="polite"` and updates are debounced to one announcement per 5 days during the fast animation
- Continue button has `role="button"`, `aria-label="Continue to interactive exploration of exponents"`
- Keyboard: Enter or Space activates Continue. Tab focuses Continue button. Escape replays hook from beginning.
- Reduced motion: if `prefers-reduced-motion: reduce`, all spring animations become instant repositions (0ms duration). Coin-splitting animation becomes a simple counter (value updates without spatial animation). Pile growth becomes a static bar resizing. Fade-ins remain but at 150ms with `ease: "linear"`. Screen flash disabled.

### Hook -- Performance Budget

- Total SVG elements: ~30 coin circles (most fade out as pile forms) + ~8 text annotations + 1 pile rect + 1 button = ~40 elements (well under 200-element SVG budget)
- No WebGL required
- Spring animations via Framer Motion -- GPU-composited transforms only (`transform`, `opacity`)
- Particle overflow: maximum 20 small circles for spill effect, physics-simulated with requestAnimationFrame, removed after off-screen
- Target: 60fps on iPhone SE 2nd gen (A13 Bionic)
- Memory: <2MB total scene

---

## Stage 2: Spatial Experience -- Branching Tree + Tower of Powers (3-5 minutes)

### Overview

The spatial experience has two phases:

**Phase A: Branching Tree Builder (2-3 min)** -- An interactive tree where the student taps to add branching levels and observes how the leaf count grows multiplicatively. Each level represents one more multiplication by the base. This is the primary spatial model for exponents.

**Phase B: Tower of Powers (1-2 min)** -- An interactive workspace where the student stacks geometric squares (for base^2) and cubes (for base^3), physically seeing how area and volume relate to exponents. This is the secondary spatial model reinforcing the concept through a complementary representation.

Both phases are essential: the branching tree teaches "what exponents DO" (repeated multiplication as spatial branching), and the tower teaches "what exponents LOOK LIKE" (geometric growth in 2D and 3D).

### Phase A: Branching Tree Builder

#### Scene Layout (Mobile-First)

```
+------------------------------------------+
|  "Tap to grow the tree!"                 |  <- Instruction bar, 48px height
|  Base: [2]  Levels: [0]  Leaves: [1]    |
+------------------------------------------+
|                                          |
|                 (o)                       |  <- Root node (always visible)
|                / | \                     |
|              (o)(o)(o)                   |  <- Level 1 (appears on tap)
|             /|\ /|\ /|\                 |
|            ... ... ...                   |  <- Level 2 (appears on 2nd tap)
|                                          |
+------------------------------------------+
|  Expanded form: 2 x 2 x 2 = 8          |  <- Live equation bar
+------------------------------------------+
|  [Add Level +]    [Remove Level -]       |  <- Control buttons
+------------------------------------------+
```

**Desktop layout**: Tree centered (60% width), stats panel and controls on the right sidebar (40% width). Instruction bar above tree.

#### Tree Rendering

- Component: SVG tree built with `motion.circle` (nodes) and `motion.line` (branches), rendered within a responsive SVG viewBox
- Root node:
  - Circle: `r: 14px`, `fill: #818cf8` (indigo-400), `stroke: #6366f1` (indigo-500), `strokeWidth: 2`
  - Always visible at top-center: positioned at (viewBoxWidth/2, 40)
  - Label inside: "1" in `fill: #ffffff`, `fontSize: 12px`, `fontWeight: 700`
- Branch lines: `stroke: #475569` (slate-600), `strokeWidth: 1.5px`, drawn via dash-offset technique
- Child nodes at each level:
  - Same circle styling as root but `r: 10px` (shrink slightly per level)
  - Level 1 nodes: `r: 12px`; Level 2: `r: 10px`; Level 3: `r: 8px`; Level 4+: `r: 6px`
  - Each node has a subtle `filter: drop-shadow(0 1px 2px rgba(129, 140, 248, 0.2))`
- Leaf nodes (bottommost level) get special styling:
  - `fill: #fbbf24` (amber-400), `stroke: #d97706` (amber-600)
  - Subtle glow: `filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))`

#### Tree Layout Algorithm

- Horizontal spacing between siblings: `treeWidth / (base^level)` -- auto-adjusts so the tree fills available width
- Vertical spacing between levels: `(viewBoxHeight - 100) / maxLevels` where maxLevels = 5
- If the tree exceeds viewport width at high base x exponent combinations, nodes scale down proportionally (minimum node `r: 4px`)
- When leaf count exceeds 64, individual leaf nodes are replaced with a "cluster" representation: a colored bar whose width represents the count, with a numeric label
- Branch lines adjust angles dynamically based on child positions

#### Stats Bar

- Three values displayed in a horizontal row at the top:
  - "Base: [N]" -- the branching factor, displayed in a pill badge, `fill: #818cf8`, `fontSize: 14px`
  - "Levels: [N]" -- the exponent, displayed in a pill badge, `fill: #fbbf24`, `fontSize: 14px`
  - "Leaves: [N]" -- the result (base^exponent), displayed prominently, `fill: #34d399`, `fontSize: 18px`, `fontWeight: 700`
- On change: the leaves count animates with a spring counter (`spring(damping: 20, stiffness: 200)`)

#### Live Equation Bar

- Positioned below the tree, shows the expanded multiplication form:
  - Level 0: "1" (just the root)
  - Level 1: "2 = 2" (two leaves)
  - Level 2: "2 x 2 = 4"
  - Level 3: "2 x 2 x 2 = 8"
- KaTeX rendering: e.g., `"2 \\times 2 \\times 2 = 8"`
- `fontSize: 16px`, `fill: #e2e8f0`
- Each "2" in the expanded form is colored `#818cf8` (matching base color)
- The result is colored `#34d399` (matching leaves count)
- On level change: the new factor slides in from the right with `spring(damping: 20, stiffness: 300)`, `opacity: 0 -> 1`

#### Interaction Sequence

**Step 1: Base 2, Start with Root Only**

- Initial state: a single root node at the center, labeled "1"
- Instruction text: "This tree has 1 leaf. Tap [Add Level +] to grow it!"
- The "Add Level +" button pulses gently to indicate interactivity (border opacity oscillation, 1.5s period)

**Tapping "Add Level +"**:

1. Level 0 -> Level 1:
   - Two branch lines draw downward from the root node (dash-offset draw, 250ms, `ease: "easeOut"`)
   - Two child nodes appear at the branch endpoints
   - Root node dims slightly: `opacity: 1 -> 0.7`
   - Child nodes are amber (leaf styling)
   - Equation bar updates: "2 = 2"
   - Stats bar: Levels 0 -> 1, Leaves 1 -> 2
   - Sound: soft branch snap (wooden click), 150ms, 30% volume
   - Haptic: 10ms vibration pulse

2. Level 1 -> Level 2:
   - Each of the 2 leaf nodes sprouts 2 new branches (4 new child nodes total)
   - Previous leaf nodes transition from amber to indigo (they are no longer leaves)
   - New leaf nodes: amber with glow
   - Equation bar: "2 x 2 = 4"
   - Stats: Levels 2, Leaves 4
   - Sound: branch snap, slightly higher pitch

3. Level 2 -> Level 3:
   - Each of the 4 leaf nodes sprouts 2 new branches (8 new child nodes)
   - Equation bar: "2 x 2 x 2 = 8"
   - Stats: Levels 3, Leaves 8
   - Instruction text updates: "Each new level DOUBLES the leaves!"
     - "DOUBLES" in `#fbbf24`, `fontWeight: 700`

4. Level 3 -> Level 4:
   - 16 new leaf nodes appear (tree getting wide)
   - Equation bar: "2 x 2 x 2 x 2 = 16"
   - Stats: Levels 4, Leaves 16
   - If tree exceeds viewport width, auto-scale applies (nodes shrink, tree compresses horizontally)

5. Level 4 -> Level 5 (maximum):
   - 32 leaf nodes -- represented as a cluster bar at the bottom
   - Equation bar: "2 x 2 x 2 x 2 x 2 = 32"
   - Stats: Levels 5, Leaves 32
   - The "Add Level +" button dims to disabled state: `opacity: 0.3`
   - Instruction text: "Max depth reached! Try changing the base."

**Tapping "Remove Level -"**:

- Reverses the last level addition: leaf nodes fade out (200ms), their parent nodes transition back to amber leaf styling
- Equation bar removes the rightmost factor
- When removing from Level 1 -> Level 0: branches retract, children fade, root becomes the sole amber leaf again ("1")
- At Level 0, the "Remove Level -" button dims to disabled state
- Sound: soft reverse-snap sound, 100ms, 25% volume

**Step 2: Unlock Base 3**

After the student has added at least 3 levels with base 2 (reaching 8 leaves), a new control unlocks:

- A "Base" selector appears (or activates from disabled state):
  - Horizontal stepper: `< [2] >`
  - Range: 2 to 5
  - `fontSize: 20px`, `fontWeight: 700`, `fill: #818cf8`
  - Chevron buttons: 44x44px touch targets
- When base changes from 2 to 3:
  - The entire tree rebuilds with a cascade animation: all nodes fade out (200ms), then regrow from root with base-3 branching (each node has 3 children)
  - At the current level count (e.g., 3 levels): 3^3 = 27 leaves
  - Equation bar: "3 x 3 x 3 = 27"
  - The dramatic increase from 8 to 27 is visually striking -- the tree is much wider
  - Instruction text: "3 branches per node -- 27 leaves! Compare that to 8 with base 2."
    - "27" in `#34d399`, "8" in `#94a3b8`
- Sound: deeper branch snap for base 3, 150ms

**Step 3: Free Exploration**

After trying both base 2 and base 3 with at least 2 levels each, all controls unlock for free exploration:

- Base selector range: 2-5
- Level buttons: 0-5 (capped to prevent performance issues)
- For base 4 at level 3: 64 leaves (cluster representation)
- For base 5 at level 3: 125 leaves (cluster representation with large numeric label)
- Instruction text: "Explore! What happens with different bases and levels?"
- The equation bar continues to show the expanded form (up to 5 factors); beyond 5, it shows: "5 x 5 x 5 x 5 x 5 = 3125"

**Edge cases and constraints**:
- Maximum base x exponent product that shows individual nodes: base^exponent <= 64
- Beyond 64 leaves: cluster bar representation with count label
- Maximum base: 5 (base 6+ would make trees too wide even with clustering)
- Maximum levels: 5
- Minimum base: 2, minimum levels: 0
- Rapid button tapping: debounced to 300ms between level additions to allow animation to complete
- Mobile: base selector and level buttons are bottom-anchored, tree area fills the remaining space
- Desktop: controls in right sidebar

#### Phase A Interaction Count

Each tap (add level, remove level, change base) counts as an interaction. The minimum threshold for Phase A is 10 interactions. Given the guided sequence (3+ level additions with base 2, base change to 3, 2+ level additions with base 3, plus free exploration), this is naturally reached.

### Phase B: Tower of Powers

After the branching tree, a brief transition card appears:

- "Now let's see exponents as shapes..."
- `fontSize: 17px`, `fill: #f1f5f9`
- "Continue" button: same styling as previous

#### Scene Layout (Mobile-First)

```
+------------------------------------------+
|  "Build the tower!"                      |  <- Instruction bar
+------------------------------------------+
|                                          |
|     [  ]           [     ]               |
|     [  ]           [     ]               |
|     [  ]        <- Tower grows upward    |
|     [  ]                                 |
|  ___[__]___                              |
|                                          |
|  2^1 = 2   2^2 = 4   2^3 = 8            |  <- Power labels below
|  (line)    (square)   (cube)             |
+------------------------------------------+
|  [Tap a power to build it]               |
+------------------------------------------+
```

#### Tower Visualization

The tower model shows three geometric representations side by side:

**2^1 = A Line Segment**:
- A single horizontal line of 2 unit squares, side by side
- Each unit square: 24x24px, `fill: #818cf820`, `stroke: #818cf8`, `strokeWidth: 1`
- Label below: "2^1 = 2" in KaTeX, `fontSize: 14px`, `fill: #818cf8`
- Caption: "a line" in `#94a3b8`, `fontSize: 12px`, italic

**2^2 = A Square**:
- A 2x2 grid of unit squares forming a larger square
- Unit squares: same styling, arranged in a 2x2 grid
- Total area highlighted: `fill: #fbbf2420`, `stroke: #fbbf24`, outer border `strokeWidth: 2`
- Label below: "2^2 = 4" in KaTeX, `fontSize: 14px`, `fill: #fbbf24`
- Caption: "a square" in `#94a3b8`, `fontSize: 12px`, italic
- The "2" in superscript glows briefly to connect: "squared means a SQUARE"

**2^3 = A Cube**:
- A 2x2x2 cube rendered in isometric projection (SVG parallelogram trick or simple 3D-like drawing)
- Three visible faces: top, front, right -- each a 2x2 grid of unit squares
- Faces: top `fill: #34d39930`, front `fill: #34d39920`, right `fill: #34d39910` -- gradient gives depth
- `stroke: #34d399`, `strokeWidth: 1`
- Label below: "2^3 = 8" in KaTeX, `fontSize: 14px`, `fill: #34d399`
- Caption: "a cube" in `#94a3b8`, `fontSize: 12px`, italic
- The "3" in superscript glows briefly: "cubed means a CUBE"

#### Tower Interaction

**Step 1: Build 3^2**

- Instruction: "Tap to build 3 squared"
- The student taps a "Build" button, and a 3x3 grid of unit squares assembles one row at a time (spring animation, 200ms stagger per row)
- Row 1: 3 squares appear left-to-right
- Row 2: 3 more squares stack on top
- Row 3: 3 more squares stack on top
- Total: 9 squares forming a 3x3 grid
- Label: "3^2 = 9" appears below, `fill: #fbbf24`
- The student visually sees: 3 rows of 3 = 3 x 3 = 9

**Step 2: Build 3^3**

- Instruction: "Now tap to build 3 cubed"
- The 3x3 square "extrudes" into depth (isometric animation): the flat square duplicates backward 3 times
- Each layer slides into depth with a 200ms stagger
- The final cube shows 27 visible unit cubes (3x3x3)
- Label: "3^3 = 27" appears below, `fill: #34d399`
- Annotation: "3 layers of 9 = 3 x 3 x 3 = 27" in `#f1f5f9`, `fontSize: 14px`

**Step 3: Compare**

- All three representations (line, square, cube) are shown side by side with base 3:
  - 3^1 = 3 (line of 3 squares)
  - 3^2 = 9 (3x3 grid)
  - 3^3 = 27 (3x3x3 cube)
- Annotation: "Each exponent adds a DIMENSION" in `#fbbf24`, `fontWeight: 600`, `fontSize: 16px`
- This connects the naming convention: squared = 2D, cubed = 3D

**Continue trigger**: After completing Phase A (at least 10 interactions) and Phase B (building at least 2 towers), totaling at least 15 interactions across both phases, a "Continue" button appears: "Ready to discover the patterns?"

### Spatial Experience -- Accessibility

**Branching Tree**:
- Tree has `role="img"` with dynamic `aria-label`: "Branching tree with base [N] and [M] levels, producing [result] leaves"
- Add/Remove Level buttons: `role="button"` with `aria-label="Add one branching level"` / `aria-label="Remove one branching level"`
- Base selector: `role="spinbutton"` with `aria-valuemin="2"`, `aria-valuemax="5"`, `aria-valuenow="[current]"`, `aria-label="Base value"`
- Stats changes announced via `aria-live="polite"`: "Base [N], Level [M], [result] leaves"
- Keyboard: Tab navigates between controls. Enter/Space activates buttons. Arrow keys adjust base selector.

**Tower**:
- Each geometric shape has `role="img"` with `aria-label` describing it: "3 squared shown as a 3 by 3 grid of 9 squares"
- Build buttons: `role="button"` with descriptive `aria-label`
- Layer-by-layer construction announced: "Row [N] of [total] added. [count] squares so far."

- Reduced motion: all spring animations become 150ms linear transitions. Tree branch drawing becomes instant lines. Tower construction rows appear simultaneously. Cascade rebuilds become instant redraws.

### Spatial Experience -- Performance

**Branching Tree**:
- Maximum SVG elements: base 5, level 3 = 125 leaf nodes + ~155 branch nodes + ~155 lines = ~435 elements. This exceeds the comfortable budget, hence the cluster representation kicks in at 64+ leaves, reducing to: ~40 nodes (visible) + ~40 lines + cluster bar = ~81 elements.
- For base 2 at level 5: 32 leaves shown as cluster bar + 31 internal nodes + 30 lines = ~93 elements
- Spring animations on nodes: only newly added/removed nodes animate; existing nodes reposition via layout
- Target: 60fps on iPhone SE 2nd gen during interactions

**Tower**:
- Maximum SVG elements: 3^3 = 27 unit squares x 3 visible faces = ~81 parallelograms + labels = ~90 elements
- Isometric cube rendering: pre-computed parallelogram paths in `<defs>`, applied via `<use>`
- Target: 60fps

---

## Stage 3: Guided Discovery (3-5 minutes)

### Prompt Sequence

The guided discovery stage presents narrated prompts with synchronized visual highlights. The branching tree and equation bar from Stage 2 remain available for reference but interaction is paused. The prompts guide the student through key observations.

**Prompt delivery**: Each prompt appears as a text card at the bottom of the screen (mobile) or in a side panel (desktop). Text is revealed character by character at 30 characters/second for a "typing" effect. The corresponding visual highlight plays simultaneously.

**Card styling**:
- Background: `#1e293b` (slate-800), `borderRadius: 16px`, `padding: 20px`
- Border: `1px solid #334155` (slate-700)
- Text: `fill: #e2e8f0` (slate-200), `fontSize: 16px`, `lineHeight: 1.6`
- Key terms highlighted inline: `color: #818cf8` (indigo-400), `fontWeight: 600`
- "Next" button at bottom-right: same styling as hook Continue but smaller (padding 12px 24px), text "Next"

---

**Prompt 1: Exponents Are NOT Multiplication**

Card text:
> "A lot of students think 2^3 means 2 x 3 = 6. But look at your tree: base 2, 3 levels = **8 leaves**, not 6! The exponent tells you **how many times** to multiply the base by itself: 2 x 2 x 2 = **8**."

Visual:
- The branching tree from Stage 2 reappears with base 2, level 3 (8 leaves)
- A crossed-out "wrong equation" appears at the top: "2^3 ≠ 2 x 3 = 6"
  - KaTeX: `"2^3 \\neq 2 \\times 3 = 6"`
  - `fontSize: 20px`, `fill: #fb7185` (rose-400)
  - A diagonal strikethrough line draws across the equation: `stroke: #fb7185`, `strokeWidth: 2`, dash-offset draw 300ms
- Below it, the correct equation pulses:
  - "2^3 = 2 x 2 x 2 = 8"
  - KaTeX: `"2^3 = 2 \\times 2 \\times 2 = 8"`
  - `fontSize: 22px`, `fill: #34d399` (emerald-400)
  - Each "2" in the expanded form briefly connects via a dashed line to a level in the tree (Level 1 -> first "2", Level 2 -> second "2", Level 3 -> third "2")
  - Lines: `stroke: #818cf8`, `opacity: 0.4`, dash-offset draw, 300ms each with 200ms stagger
- The tree's 8 leaf nodes pulse amber simultaneously (400ms)

**Interactive micro-check**: Before revealing the full explanation, the card initially shows only: "Quick check: What is 2^3?"
- Three buttons: "6" (`fill: #1e293b`, `stroke: #334155`), "8" (`fill: #1e293b`, `stroke: #334155`), "9" (`fill: #1e293b`, `stroke: #334155`)
- Each: `borderRadius: 12px`, `padding: 12px 24px`, `fontSize: 18px`, touch target 48px height
- If student taps "6": feedback "That's 2 x 3 -- a common mistake! But exponents mean REPEATED multiplication: 2 x 2 x 2 = 8. Let's look at the tree..." then the visual plays
- If student taps "8": positive feedback "Exactly right! Let's see why..." then the visual plays
- If student taps "9": feedback "Close, but that would be 3^2 (3 x 3). We need 2^3 = 2 x 2 x 2 = 8." then the visual plays
- This micro-interaction does NOT affect XP or scoring

Student action: Tap answer, observe visual confirmation, tap "Next."

---

**Prompt 2: The Base vs. The Exponent**

Card text:
> "In 2^3, the big number (2) is called the **base** -- it's WHAT you multiply. The small raised number (3) is called the **exponent** or **power** -- it's HOW MANY TIMES you multiply. Think of it like the tree: the base is how many **branches** each node has, and the exponent is how many **levels** deep you go."

Visual:
- A large annotated exponent expression appears center-screen:
  - KaTeX: `"\\underbrace{2}_{\\text{base}} {}^{\\overbrace{3}^{\\text{exponent}}}"`
  - Alternative rendering (if KaTeX is limited): the "2" is large (`fontSize: 48px`, `fill: #818cf8`) with a label "base" below it in `#818cf8`, `fontSize: 14px`; the "3" is superscript (`fontSize: 28px`, `fill: #fbbf24`) with a label "exponent" above it in `#fbbf24`, `fontSize: 14px`
- The branching tree (base 2, level 3) is shown to the left with annotations:
  - An arrow from "base" label to a single node with 2 branches: "2 branches" in `#818cf8`, `fontSize: 12px`
  - An arrow from "exponent" label to the tree's depth: "3 levels" in `#fbbf24`, `fontSize: 12px`, with a vertical bracket spanning all 3 levels
- The tree shifts between base 2 and base 3 briefly to show the base changing:
  - Base 2 tree (8 leaves) fades to base 3 tree (27 leaves) and back, 800ms per transition
  - Annotation: "Change the base, change the branches" in `#94a3b8`, `fontSize: 13px`

Student action: Read, observe, tap "Next."

---

**Prompt 3: Adding a Level MULTIPLIES**

Card text:
> "Watch what happens when you add one more level to the tree. With base 2: 1 level = 2 leaves, 2 levels = 4 leaves, 3 levels = 8 leaves. Each time, the count **doubles** -- it MULTIPLIES by 2, not adds 2. That's why exponents grow so fast!"

Visual:
- Three trees are shown side by side (or animate sequentially on mobile):
  - Tree 1: base 2, level 1 -> 2 leaves. Label: "2^1 = 2"
  - Tree 2: base 2, level 2 -> 4 leaves. Label: "2^2 = 4"
  - Tree 3: base 2, level 3 -> 8 leaves. Label: "2^3 = 8"
- Between each pair of trees, a large "x2" arrow: `fill: #fbbf24`, `fontSize: 20px`
  - Arrow from Tree 1 -> Tree 2: "x2"
  - Arrow from Tree 2 -> Tree 3: "x2"
- Below: a comparison row:
  - "Addition: 2, 4, 6, 8, 10 (add 2)" in `#94a3b8`, `fontSize: 14px`
  - "Exponents: 2, 4, 8, 16, 32 (x2)" in `#fbbf24`, `fontSize: 14px`, `fontWeight: 600`
- The exponent sequence's numbers grow faster and faster -- the last few entries are visually larger (`fontSize` scales from 14px to 18px to 24px for 16 and 32)

Student action: Read, observe, tap "Next."

---

**Prompt 4: What About Exponent 0?**

Card text:
> "Here's a puzzle: what is 2^0? Look at the pattern going backward: 2^3 = 8, 2^2 = 4, 2^1 = 2. Each step we **divide by 2**. So 2^0 = 2 / 2 = **1**. Any number (except 0) raised to the power 0 equals 1!"

Visual:
- A descending staircase of values is animated, stepping down:
  - Step 1: "2^3 = 8" in `fill: #e2e8f0`, `fontSize: 18px`
  - Arrow down: "/ 2" in `#fbbf24`
  - Step 2: "2^2 = 4" in `fill: #e2e8f0`
  - Arrow down: "/ 2" in `#fbbf24`
  - Step 3: "2^1 = 2" in `fill: #e2e8f0`
  - Arrow down: "/ 2" in `#fbbf24`
  - Step 4: "2^0 = ?" -- the question mark pulses in `#fbbf24`, `fontSize: 24px`
  - After 1.5s hold, the "?" morphs into "1" with a satisfying spring: `scale: 1.2 -> 1`, `fill: #34d399`
  - "2^0 = 1" in `fill: #34d399`, `fontSize: 22px`, `fontWeight: 700`
- Below the staircase, a second example confirms:
  - "5^3 = 125, 5^2 = 25, 5^1 = 5, 5^0 = 1" in `#94a3b8`, `fontSize: 14px`
  - The "1" at the end is in `#34d399`, confirming the pattern holds for any base
- Branching tree connection: the tree at level 0 is shown as just the root node (1 leaf), reinforcing visually that "zero levels = just the starting point = 1"

Student action: Read, observe, tap "Next."

---

**Prompt 5: Bigger Exponent Doesn't Always Mean Bigger Result**

Card text:
> "Does a bigger exponent always give a bigger result? Not always! Compare: **10^2 = 100** vs **2^10 = 1024**. The base matters too! And what about **1^100**? No matter how many times you multiply 1 by itself, you still get **1**. The base and exponent work TOGETHER."

Visual:
- Three comparison cards appear in a vertical stack:
  - Card 1: "10^2 = 100" on the left, "2^10 = 1024" on the right, with a ">" between them pointing RIGHT
    - The "2^10" side glows brighter: `fill: #34d399`
    - Annotation: "Smaller base, bigger exponent WINS here" in `#94a3b8`, `fontSize: 13px`
  - Card 2: "100^1 = 100" on the left, "2^7 = 128" on the right
    - The "2^7" side glows: result is bigger despite base being much smaller
    - Annotation: "Even base 2 can beat 100 with enough levels!" in `#94a3b8`, `fontSize: 13px`
  - Card 3: "1^100 = 1" centered, with the "100" exponent in a very large font but the result is tiny
    - The "1" result pulses with a gentle amusement animation (slight wobble)
    - Annotation: "1 times 1 times 1... always 1" in `#fbbf24`, `fontSize: 14px`
- Each card slides in from the right with 600ms stagger, `spring(damping: 20, stiffness: 300)`

Student action: Read, observe, tap "Next."

---

### Guided Discovery -- Transition

After Prompt 5, a brief summary card appears:

> "Now let's connect what you discovered to the proper math notation."

The card has a forward-pointing arrow icon and the "Continue" button. This transitions to Stage 4: Symbol Bridge.

### Guided Discovery -- Accessibility

- All prompt text is in `aria-live="polite"` regions
- Visual animations have corresponding screen reader descriptions announced after each animation completes
- Micro-check buttons have `role="button"` with descriptive `aria-label`s: "I think 2 to the power of 3 equals 6" / "equals 8" / "equals 9"
- Keyboard: Tab navigates between "Next" and micro-check buttons. Enter/Space activates.
- Reduced motion: sequential highlighting becomes simultaneous appearance. Staircase animation becomes instant display. Tree transitions become instant swaps.

---

## Stage 4: Symbol Bridge (2-3 minutes)

### Overview

Formal mathematical notation is overlaid onto the spatial representations the student already understands. Each symbol is explicitly linked to its spatial meaning from the branching tree and tower.

### Scene Layout

The screen splits into two synchronized panels:

**Left panel (60%)**: The branching tree or tower from Stage 2, cycling between them as relevant to each notation being introduced.

**Right panel (40%)**: Mathematical notation, building up incrementally.

On mobile: vertical stack -- visualization on top (40% height), notation below (60% height), scrollable.

---

**Symbol 1: Exponent Notation**

- Notation (right panel):
  - KaTeX: `"b^n = \\underbrace{b \\times b \\times b \\times \\cdots \\times b}_{n \\text{ times}}"`
  - `fontSize: 20px`
  - "b" in `#818cf8` (base color), "n" in `#fbbf24` (exponent color)
- Entry: text fades in component by component (200ms per part): first "b^n = ", then the underbrace with repeated b's, then the "n times" label
- Left panel: the branching tree (base 2, level 3), with:
  - The base branches labeled "b" in `#818cf8` at one node
  - The levels labeled "n" in `#fbbf24` with a vertical bracket
  - Connecting dashed lines from "b" in the tree to "b" in the notation, and from "n" bracket to "n" in the notation
  - Lines: `stroke: #818cf8` / `#fbbf24`, `opacity: 0.4`, dash-offset draw, 400ms

**Symbol 2: Reading Exponents Aloud**

- After 1.5s pause
- Notation block showing three rows with pronunciation:
  - `"2^2"` -> "two squared" -- `fill: #fbbf24`, connects to the square shape from tower
  - `"2^3"` -> "two cubed" -- `fill: #34d399`, connects to the cube shape from tower
  - `"2^4"` -> "two to the fourth power" -- `fill: #818cf8`, generic notation
  - `"b^n"` -> "b to the n-th power" -- `fill: #e2e8f0`, general form
- Each row: `fontSize: 16px`, the number/expression on the left, the pronunciation on the right in italic `#94a3b8`
- Entry: each row fades in with 500ms stagger
- Left panel: cycles through square (2D grid) and cube (3D grid) from the tower phase to reinforce why "squared" and "cubed" have geometric names

**Symbol 3: Concrete Examples**

- After 1.5s pause
- A table of examples builds up row by row:

| Expression | Expanded Form | Value |
|-----------|---------------|-------|
| 3^2 | 3 x 3 | 9 |
| 5^3 | 5 x 5 x 5 | 125 |
| 10^4 | 10 x 10 x 10 x 10 | 10,000 |
| 2^0 | (empty -- just the starting point) | 1 |

- Each row appears with 600ms delay
- Expression column: `fill: #818cf8`, `fontSize: 18px`
- Expanded form: `fill: #e2e8f0`, `fontSize: 16px`
- Value: `fill: #34d399`, `fontSize: 18px`, `fontWeight: 700`
- The 2^0 row has the value "1" highlighted with a special amber glow to remind students of the zero-power rule
- Left panel: for each row, a mini branching tree briefly appears showing the structure (3 nodes splitting 2 levels for 3^2, etc.), then fades as the next row appears

**Symbol 4: The Key Rule -- Exponent Means Repeated Multiplication**

- After 2s pause
- A highlighted "rule box":
  - Border: `stroke: #fbbf24`, `strokeWidth: 2`, `rx: 12`, `fill: #fbbf2410`
  - Text: `"b^n = b \\times b \\times \\cdots \\times b \\quad (n \\text{ factors of } b)"`
  - `fontSize: 18px`, `fill: #f1f5f9`
  - "n factors of b" in `#fbbf24`, `fontWeight: 700`
- Below the box: "The exponent counts the multiplications. That's it!" in `#94a3b8`, `fontSize: 14px`, italic
- Left panel: the branching tree at base 2, level 3 with all 3 levels labeled: "factor 1", "factor 2", "factor 3" along the depth axis

### Symbol Bridge -- Accessibility

- Each notation block has `role="math"` with `aria-label` containing the spoken equivalent
- Exponent notation: "b to the n equals b times b times b, n times"
- Reading aloud section: "2 squared, 2 cubed, 2 to the fourth power, b to the n-th power"
- Examples table: `role="table"` with `role="row"` and `role="cell"` per entry
- Rule box: "b to the n equals b multiplied by itself n times"
- Connecting lines: `aria-hidden="true"` (decorative)
- Reduced motion: component-by-component reveal becomes full-block fade-in. Connecting lines appear instantly. Tree cycling becomes static display of final state.

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

**Example 1: Paper Folding**

- Accent color: `#818cf8` (indigo-400)
- Icon: folded paper icon (two overlapping rectangles)
- Title: "The Paper Folding Puzzle"
- Body: "If you fold a piece of paper in half, you get 2 layers. Fold again: 4 layers. Again: 8. Each fold DOUBLES the layers -- that's 2 raised to the number of folds. After just 7 folds, you have 2^7 = 128 layers! After 42 folds (if you could), the paper would reach the Moon."
- Key phrases highlighted: "2^7 = 128 layers" in `#fbbf24`, "reach the Moon" in `#34d399`
- Mini-visualization: A horizontal bar representing paper gets visually thicker with each "fold":
  - Fold 0: thin bar (2px)
  - Fold 1: 4px (with a fold line)
  - Fold 2: 8px
  - Fold 3: 16px
  - ...Fold 7: 128px equivalent (scaled to fit 120px height)
  - Each fold animates: the bar halves in width and doubles in height, 200ms each, 5 visible folds
  - Layer count label updates with each fold: "2^1 = 2", "2^2 = 4", ..., "2^5 = 32"

**Example 2: Viral Sharing**

- Accent color: `#34d399` (emerald-400)
- Icon: share/network icon (nodes connected by lines)
- Title: "How Things Go Viral"
- Body: "You share a video with 3 friends. Each of them shares it with 3 more. That's 3^1 = 3 people, then 3^2 = 9, then 3^3 = 27. After 10 rounds of sharing (3^10), over 59,000 people have seen it! That's the power of exponential growth."
- Key phrases highlighted: "3^10" in `#fbbf24`, "59,000 people" in `#34d399`
- Mini-visualization: A branching network diagram showing 3 levels of sharing:
  - Center node (you): `fill: #818cf8`, `r: 8px`
  - 3 first-level connections: `fill: #34d399`, `r: 6px`, lines drawn from center
  - 9 second-level connections: `fill: #34d399`, `r: 4px`
  - 27 third-level connections: `fill: #34d399`, `r: 3px` (shown as a dense ring)
  - Labels at each level: "3^1 = 3", "3^2 = 9", "3^3 = 27"
  - The network expands outward in a radial animation, 200ms per level

**Example 3: Minecraft Worlds**

- Accent color: `#a78bfa` (violet-400)
- Icon: cube/block icon
- Title: "How Big Is a Minecraft World?"
- Body: "A chunk in Minecraft is 16 x 16 x 384 blocks. That's 16^2 = 256 blocks per layer times 384 layers. A full world has 14.4 TRILLION blocks -- powers of 2 are everywhere in games because computers think in powers of 2!"
- Key phrases highlighted: "16^2 = 256" in `#fbbf24`, "powers of 2" in `#a78bfa`
- Mini-visualization: A stack of flat squares representing chunk layers:
  - A single 16x16 grid (simplified as a small checkered square, 40x40px) labeled "16^2 = 256 blocks"
  - The grid extrudes upward slightly (isometric, 30px depth) with layer lines
  - A "x 384 layers" annotation with a vertical bracket
  - Below: "That's a LOT of blocks!" in `#a78bfa`, `fontSize: 12px`

### Real-World Anchor -- Accessibility

- Each card: `role="article"` with heading and description
- Mini-visualizations: `role="img"` with detailed `aria-label` descriptions
  - Paper folding: "A piece of paper folded 7 times produces 128 layers, shown as a bar doubling in thickness with each fold"
  - Viral sharing: "A network diagram showing 3 levels of sharing: 3 people, then 9, then 27, expanding outward"
  - Minecraft: "A 16 by 16 grid of blocks stacked 384 layers high representing a Minecraft chunk"
- Reduced motion: slide-in becomes fade-in (200ms). Fold animation becomes instant thickness change. Network expansion becomes instant display.

---

## Stage 6: Practice (9 problems)

### Problem Set Design

Problems are organized into three layers per the data model (layer 0 = recall, layer 1 = procedure, layer 2 = understanding). The IRT-based problem selector chooses from this bank, but the lesson guarantees exposure to all three layers.

**Problem selection logic**: Start with 2 recall, then 2 procedure, then 1 understanding. Remaining 4 are adaptive (IRT selects based on estimated ability). If the student struggles (2+ incorrect in a row), insert an easier problem. If they excel (3+ correct in a row with high confidence), skip to understanding layer.

---

### Recall Layer (Layer 0)

**Problem R1: Evaluate a Basic Exponent**

- Type: `multiple-choice`
- Prompt: "What is 3^4?"
- Options (tap to select, only one):
  - A: "12" -- `incorrect` (this is 3 x 4, the base-times-exponent misconception)
  - B: "64" -- `incorrect` (this is 4^3, base and exponent swapped)
  - C: "81" -- `correct` (3 x 3 x 3 x 3 = 81)
  - D: "7" -- `incorrect` (this is 3 + 4, addition misconception)
- Each option: full-width card, `fill: #1e293b`, `borderRadius: 10px`, `padding: 14px 18px`, text `fill: #e2e8f0`, `fontSize: 15px`
- Selected state: `stroke: #818cf8`, `fill: #1e293b`
- Correct (C): `stroke: #34d399`, `fill: #34d39910`, checkmark icon
- Incorrect: `stroke: #94a3b8`, selected option shakes gently (translateX oscillation, 3 cycles, 300ms)
- Feedback for wrong answers:
  - A: "12 would be 3 x 4 -- but that's multiplication, not exponents! 3^4 means 3 x 3 x 3 x 3. Multiply it out: 3 x 3 = 9, 9 x 3 = 27, 27 x 3 = 81."
  - B: "64 is actually 4^3 (4 x 4 x 4). Watch the order: in 3^4, the BASE is 3 and the EXPONENT is 4. So it's 3 multiplied 4 times."
  - D: "7 is 3 + 4 -- addition, not exponents! 3^4 means 3 x 3 x 3 x 3 = 81."
- Feedback (correct): "3^4 = 3 x 3 x 3 x 3 = 81. Four copies of 3 multiplied together!"
- Visualization after submission: a mini branching tree with base 3, level 4, showing 81 leaves. The expanded equation "3 x 3 x 3 x 3 = 81" appears below with each "3" connecting to a tree level.

**Problem R2: Identify the Base and Exponent**

- Type: `tap-to-select`
- Prompt: "In the expression 5^6, tap the EXPONENT."
- Input: a large rendered expression "5^6" at the center of the screen:
  - The "5" is rendered as a tappable element: `fontSize: 56px`, `fill: #e2e8f0`, inside a tappable rounded rect (`min-h: 64px`, `min-w: 56px`, `stroke: #334155`, `rx: 8`)
  - The "6" is rendered as a tappable element: `fontSize: 32px` (superscript position), `fill: #e2e8f0`, inside a tappable rounded rect (`min-h: 48px`, `min-w: 44px`, `stroke: #334155`, `rx: 8`)
  - Both elements have clear tappable borders and touch targets >= 44px
- Correct answer: tapping "6"
- Incorrect (tapping "5"): feedback "That's the base -- the number being multiplied. The exponent is the small raised number that tells you HOW MANY TIMES to multiply." The "5" label "BASE" appears below it in `#818cf8`, and the "6" pulses to draw attention.
- Feedback (correct): "The exponent is 6 -- it tells you to multiply 5 by itself 6 times. 5 x 5 x 5 x 5 x 5 x 5 = 15,625."
  - The "5" gets labeled "BASE" in `#818cf8`, the "6" gets labeled "EXPONENT" in `#fbbf24`

**Problem R3: What Does The Exponent Mean?**

- Type: `multiple-choice`
- Prompt: "Which shows the correct meaning of 4^3?"
- Options:
  - A: "4 + 4 + 4" -- `incorrect` (repeated addition, not multiplication)
  - B: "4 x 3" -- `incorrect` (base times exponent misconception)
  - C: "4 x 4 x 4" -- `correct`
  - D: "3 x 3 x 3 x 3" -- `incorrect` (base and exponent swapped)
- Feedback (C correct): "4^3 means 4 x 4 x 4 = 64. The base (4) is what you multiply, the exponent (3) is how many times."
- Feedback for wrong answers:
  - A: "4 + 4 + 4 = 12. That's 3 x 4 (repeated ADDITION). Exponents are repeated MULTIPLICATION: 4 x 4 x 4 = 64."
  - B: "4 x 3 = 12 -- that's just regular multiplication. 4^3 means 4 multiplied by ITSELF three times: 4 x 4 x 4 = 64."
  - D: "That would be 3^4 (base 3, exponent 4). In 4^3, the BIG number (4) is the base and the small raised number (3) is the exponent."
- Visualization: the expression "4^3" with color-coded labels (base=`#818cf8`, exponent=`#fbbf24`), with the expanded form "4 x 4 x 4 = 64" appearing below in `#34d399`

---

### Procedure Layer (Layer 1)

**Problem P1: Step-by-Step Evaluation**

- Type: `numeric-input`
- Prompt: "Evaluate: 2^5. Type the result."
- Input: single number input field, `width: 100px`, centered, `fontSize: 28px`, `borderRadius: 8px`, `border: 2px solid #334155`
  - On focus: `border-color: #818cf8`
  - Numeric keyboard on mobile (inputMode="numeric")
- Correct answer: 32
- Feedback (correct): "2^5 = 2 x 2 x 2 x 2 x 2 = 32. Five copies of 2 multiplied together!"
- Feedback (incorrect, common errors):
  - 10: "10 is 2 x 5 -- but remember, exponents mean REPEATED multiplication, not single multiplication. 2^5 = 2 x 2 x 2 x 2 x 2. Start with 2 x 2 = 4, then 4 x 2 = 8, then 8 x 2 = 16, then 16 x 2 = 32."
  - 16: "Almost! 16 is 2^4 (four 2s). You need one more: 16 x 2 = 32."
  - 64: "That's 2^6 -- one level too many! 2^5 = 32."
  - 25: "That's 5^2 (5 x 5). In 2^5, the base is 2 and the exponent is 5: 2 x 2 x 2 x 2 x 2 = 32."
  - Any other: "Let's work through it step by step: 2 x 2 = 4, 4 x 2 = 8, 8 x 2 = 16, 16 x 2 = 32."
- Visualization: a step-by-step multiplication ladder appears:
  - "2 x 2 = 4" (step 1)
  - "4 x 2 = 8" (step 2)
  - "8 x 2 = 16" (step 3)
  - "16 x 2 = 32" (step 4)
  - Each step fades in with 300ms stagger, current step highlighted in `#34d399`

**Problem P2: Compare Two Expressions**

- Type: `tap-to-select`
- Prompt: "Which is GREATER? Tap the larger value."
- Input: two large expression cards side by side:
  - Left card: "2^6" rendered in KaTeX, `fontSize: 28px`, inside a tappable card (`fill: #1e293b`, `stroke: #334155`, `borderRadius: 12px`, `min-h: 80px`, `min-w: 140px`)
  - Right card: "6^2" rendered in KaTeX, same styling
  - Below each card, initially hidden: the evaluated value
- Correct answer: tapping "2^6" (which is 64 > 36)
- Feedback (correct): "2^6 = 64, while 6^2 = 36. The bigger exponent won here, even with a smaller base! 2 multiplied by itself 6 times beats 6 multiplied by itself only twice."
  - Both values reveal: left card shows "= 64" in `#34d399`, right card shows "= 36" in `#94a3b8`
- Feedback (incorrect): "6^2 = 36, but 2^6 = 2 x 2 x 2 x 2 x 2 x 2 = 64. Even though 6 is bigger than 2, multiplying 2 by itself SIX times beats multiplying 6 by itself only twice!"
  - Both values reveal with the correct one highlighted
- Visualization: two mini branching trees side by side -- the 2^6 tree is deeper (6 levels) and wider (64 leaves as cluster), while the 6^2 tree is shallow (2 levels) but has wider branching (36 leaves as cluster). The visual contrast reinforces that depth (exponent) matters.

**Problem P3: Zero Exponent**

- Type: `multiple-choice`
- Prompt: "What is 7^0?"
- Options:
  - A: "0" -- `incorrect` (common misconception: anything "to the zero" is zero)
  - B: "1" -- `correct`
  - C: "7" -- `incorrect` (confused: thinking exponent 0 means "don't do anything, just keep the base")
  - D: "70" -- `incorrect` (concatenation: putting 7 and 0 together)
- Feedback (B correct): "Any non-zero number raised to the power 0 equals 1. Remember the descending pattern: 7^3 = 343, 7^2 = 49, 7^1 = 7 -- each time dividing by 7. So 7^0 = 7 / 7 = 1."
- Feedback for wrong answers:
  - A: "It's tempting to think 'zero power = zero,' but remember the pattern: 7^3 = 343, 7^2 = 49, 7^1 = 7, 7^0 = ? Each step divides by 7: 343/7 = 49, 49/7 = 7, 7/7 = 1. So 7^0 = 1!"
  - C: "7 would be 7^1 (seven to the first power). 7^0 is one step BELOW that: 7/7 = 1."
  - D: "In math, 7^0 doesn't mean 'put 7 and 0 next to each other.' The 0 is an exponent telling you to multiply 7 by itself zero times, which gives 1."
- Visualization: the descending staircase pattern from Discovery Prompt 4 reappears briefly:
  - 7^3 = 343 -> /7 -> 7^2 = 49 -> /7 -> 7^1 = 7 -> /7 -> 7^0 = 1
  - The pattern is animated step by step, 400ms per step

---

### Understanding Layer (Layer 2)

**Problem U1: Why Isn't 2^3 = 6?**

- Type: `multiple-choice`
- Prompt: "A classmate says '2^3 = 6 because you multiply 2 times 3.' What's wrong with their thinking?"
- Options:
  - A: "Nothing -- 2^3 does equal 6" -- `incorrect`
  - B: "The exponent means how many times to WRITE the base, then multiply: 2 x 2 x 2 = 8" -- `correct`
  - C: "They should ADD instead: 2 + 3 = 5" -- `incorrect`
  - D: "They mixed up the numbers: it should be 3 x 2 = 6" -- `incorrect`
- Feedback (B correct): "Exactly! The exponent 3 means 'write three copies of 2 and multiply them together': 2 x 2 x 2 = 8. The classmate confused exponents with regular multiplication."
- Feedback for wrong answers:
  - A: "2^3 actually equals 8, not 6. 2 x 3 = 6 is regular multiplication. 2^3 = 2 x 2 x 2 = 8 is an exponent -- repeated multiplication."
  - C: "Addition would give 2 + 3 = 5, but that's not what exponents do either! 2^3 = 2 x 2 x 2 = 8."
  - D: "2 x 3 and 3 x 2 both equal 6, but neither is what 2^3 means. 2^3 = 2 x 2 x 2 = 8."
- Visualization: a crossed-out "2 x 3 = 6" in `#fb7185` next to a checkmarked "2 x 2 x 2 = 8" in `#34d399`, with the branching tree (base 2, 3 levels) shown below the correct version

**Problem U2: Exponent vs. Multiplication Comparison**

- Type: `drag-arrange`
- Prompt: "Arrange these expressions from SMALLEST to LARGEST by dragging them into order."
- Input: four draggable expression tiles, jumbled:
  - "3 x 4" (= 12)
  - "3^3" (= 27)
  - "4^2" (= 16)
  - "2^4" (= 16)
- Drop zone: four horizontal slots labeled "Smallest" -> "Largest" with slot numbers 1-4
  - Slot styling: dashed border `#334155`, 80x56px
  - Tile styling: rounded rect, `fill: #1e293b`, `stroke: #818cf8`, `fontSize: 16px`, `fontWeight: 600`, `padding: 10px 16px`
  - @use-gesture/react `useDrag` for tile dragging
  - On hover over slot: `stroke: #818cf8`, `fill: #1e293b30`
  - Invalid placement: tile bounces back to original position with spring
- Correct order: "3 x 4" (12), "4^2" or "2^4" (both 16, either order accepted for positions 2-3), "3^3" (27)
  - Validation: check that 12 is first, 27 is last, and both 16s are in positions 2-3
- Feedback (correct): "3 x 4 = 12 < 4^2 = 2^4 = 16 < 3^3 = 27. Notice that 4^2 and 2^4 are BOTH 16 -- different base and exponent, same result!"
  - The equal values get a special highlight: `stroke: #fbbf24`, annotation "Both = 16!" in `#fbbf24`
- Feedback (incorrect): Shows the correct order with evaluated values, highlighting which tiles were misplaced. "Remember: compute each value first, then compare. 3x4=12, 4^2=16, 2^4=16, 3^3=27."
- Visualization: a number line from 0 to 30 appears below, with each expression's value plotted as a labeled dot

**Problem U3: Predicting Growth**

- Type: `multiple-choice`
- Prompt: "You start with 1 bacterium that triples every hour. After 5 hours, how many bacteria are there?"
- Options:
  - A: "15" -- `incorrect` (5 x 3, multiplication misconception)
  - B: "5" -- `incorrect` (added 1 per hour, addition misconception)
  - C: "243" -- `correct` (3^5 = 243)
  - D: "125" -- `incorrect` (5^3, base and exponent swapped)
- Feedback (C correct): "Each hour, the count TRIPLES: 1 -> 3 -> 9 -> 27 -> 81 -> 243. That's 3^5 = 243 bacteria after 5 hours. Exponential growth is powerful!"
- Feedback for wrong answers:
  - A: "15 = 5 x 3. That's just one multiplication. But tripling happens EVERY hour for 5 hours: 3 x 3 x 3 x 3 x 3 = 3^5 = 243."
  - B: "5 would mean only 1 new bacterium per hour (addition). But each hour, the TOTAL triples: 1, 3, 9, 27, 81, 243."
  - D: "125 = 5^3. The base should be 3 (tripling) and the exponent should be 5 (hours). 3^5 = 243, not 5^3 = 125."
- Visualization: a timeline with 6 markers (hour 0 through hour 5):
  - Hour 0: 1 dot
  - Hour 1: 3 dots (triple)
  - Hour 2: 9 dots (shown as a 3x3 grid)
  - Hour 3: 27 (shown as a cluster with count label)
  - Hour 4: 81 (cluster bar)
  - Hour 5: 243 (larger cluster bar)
  - Each step animated with 300ms stagger, the growth visually accelerating
  - Label at the end: "3^5 = 243" in `#34d399`, `fontSize: 18px`

---

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
- "Next" button appears after feedback is shown: same indigo styling, text "Next"

### Practice -- Accessibility

- Problem cards: `role="form"` with `aria-labelledby` pointing to prompt text
- Multiple-choice: `role="radiogroup"` with `role="radio"` per option
- Tap-to-select expressions: `role="radiogroup"` with `role="radio"` per tappable element
- Numeric input: `<input type="text" inputMode="numeric">` with `aria-label`
- Drag tiles: `role="listbox"` source, `role="listbox"` destination, with `aria-grabbed` and `aria-dropeffect`
- Feedback announcements: `aria-live="assertive"` for correct/incorrect
- Submit button: `aria-disabled` when no answer selected
- Layer indicator dot: `aria-hidden="true"` (decorative)

### Practice -- Interleaving (PF-5)

Problems are NOT presented in a blocked sequence. The IRT selector interleaves NT-2.4 problems with review problems from the prerequisite (NT-2.1 Factors & Multiples) if the student has prior review items due. In a first-time lesson context (no prior reviews), all 9 problems are from NT-2.4 but are interleaved across the three layers rather than grouped by layer.

---

## Stage 7: Reflection (approximately 1 minute)

### Reflection Prompt

**Card styling**: same as Guided Discovery cards, but with a golden left accent bar (`#fbbf24`) to signal this is a reflection moment.

**Prompt text**:
> "A friend says '2^3 = 6 because you multiply 2 times 3.' How would you explain why they're wrong and what 2^3 actually means? Use the tree or tower model if it helps!"

**Input**: text area
- `minHeight: 120px`, `maxHeight: 300px` (auto-expands)
- Placeholder: "I'd explain that..."
- `fontSize: 16px`, `fill: #f1f5f9`, `background: #0f172a`, `border: 1px solid #334155`, `borderRadius: 12px`, `padding: 16px`
- Character counter: shown at bottom-right, `fontSize: 12px`, `fill: #64748b`
- Minimum: 20 characters (the Submit button remains disabled below this)
- Maximum: 800 characters

**Submit button**: "Share My Thinking" in `#818cf8` styling. Appears below the text area.

**Skip button**: "Skip" in `#475569`, `fontSize: 13px`, no border, positioned below Submit. Smaller and de-emphasized but always visible.

### AI Evaluation

On submission, the `lesson.submitReflection` tRPC route is called. The AI evaluator scores the reflection on a 0-5 scale:

| Score | Criteria | XP Awarded |
|-------|----------|------------|
| 0 | Gibberish, off-topic, or fewer than meaningful words | 0 |
| 1 | Vaguely on topic but no real insight ("exponents are different from multiplication") | 16 |
| 2 | Shows basic understanding (mentions repeated multiplication) | 32 |
| 3 | Good explanation with spatial/structural reasoning (uses tree, tower, or step-by-step multiplication) | 48 |
| 4 | Strong explanation connecting multiple concepts (repeated multiplication, tree model, why the misconception happens) | 64 |
| 5 | Exceptional: original insight, analogy, or extension beyond the lesson (e.g., connects to exponential growth, zero power, or real-world applications) | 80 |

**Feedback display**:
1. Brief "thinking" animation: three dots pulsing (`opacity: 0.3 <-> 1.0`, 400ms cycle), 1-2 seconds while AI processes
2. AI feedback appears below the text area:
   - Container: `fill: #1e293b`, `borderRadius: 12px`, `padding: 16px`, `border: 1px solid #334155`
   - Left icon: small brain/lightbulb icon in `#fbbf24`
   - Text: AI's response in `#cbd5e1`, `fontSize: 15px`
   - Example feedback (score 3): "Great explanation! You showed that 2^3 means multiplying 2 by itself 3 times, not multiplying 2 by 3. Using the tree model where each level doubles is a powerful way to see it! You might also think about what happens when the exponent is 0 -- that's where the pattern really clicks."
3. XP award: "+48 XP: Reflection" floats up, same styling as other XP awards
4. If `ahaDetected` is true: trigger the "Aha Moment" celebration (see gamification design -- Neuron Flash, brief neural network animation)
5. If `referencesPriorConcept` is true (e.g., mentions factors, multiplication from NT-2.1): "+1.3x Connection Maker" multiplier text appears briefly

### Reflection -- Accessibility

- Text area: standard accessible `<textarea>` with `aria-label="Explain why 2 to the third power equals 8, not 6, and what exponents really mean"`
- Submit button: `aria-disabled` when under minimum character count, with `aria-describedby` explaining the requirement
- Skip button: `aria-label="Skip reflection"`, no `aria-hidden`
- AI feedback: `aria-live="polite"` region
- XP notification: `aria-live="polite"`

---

## Content Files Structure

This lesson produces the following content files per the project structure:

```
src/content/domains/number-theory/NT-2.4/
  lesson.mdx          # 7-stage content with prose, prompts, stage markers
  animations.json      # MathScene configs for hook, branching tree, tower, symbol bridge
  problems.json        # Practice problem bank (9 problems with metadata)
  meta.json            # Prerequisites, successors, hooks, metadata
```

### meta.json

```json
{
  "id": "NT-2.4",
  "name": "Exponents",
  "domain": "number-theory",
  "gradeLevel": 6,
  "contentPath": "number-theory/NT-2.4",
  "prerequisites": ["NT-2.1"],
  "successors": ["NT-2.5a", "NO-1.8", "NO-1.10", "AL-3.6"],
  "hook": "A single penny doubled every day for 30 days becomes over $5 million. That tiny superscript number does ALL the work.",
  "estimatedDurationMinutes": 24,
  "tags": ["exponents", "powers", "repeated-multiplication", "base", "exponent", "squared", "cubed", "zero-power", "exponential-growth", "branching-tree"],
  "interactionMinimum": 15,
  "spatialModel": "branching-tree",
  "secondarySpatialModel": "tower-of-powers",
  "coreVisualization": "branching-tree-builder"
}
```

---

## Technical Specifications

### SVG Rendering Pipeline

All visuals in this lesson use the SVG renderer (`renderer: "svg"`). No WebGL/R3F required -- all content is 2D (the isometric cube in the tower phase is a 2D SVG approximation using parallelograms).

**Branching tree rendering**:
- Nodes: `<circle>` elements wrapped in `motion.circle`
- Branches: `<line>` elements wrapped in `motion.line`, animated via dash-offset for draw effect
- Cluster bars (for high leaf counts): `<rect>` with `motion.rect`
- Props animated via Framer Motion `animate` prop: `cx`, `cy`, `r`, `fill`, `stroke`, `opacity`, `scale`
- GPU compositing: Framer Motion uses `transform` and `opacity` for node interactions. Fill/stroke color transitions use CSS transition fallback.
- Filter effects (glow on leaf nodes): applied via SVG `<filter>` elements defined once in `<defs>`, referenced by ID.

**Tower rendering**:
- Unit squares: `<rect>` elements with `motion.rect`
- Isometric cube faces: `<polygon>` elements with `motion.polygon`
- Props animated: `opacity`, `transform` for layer-by-layer construction

**Responsive viewBox**:
- Mobile (width < 640px): `viewBox="0 0 360 520"` (portrait)
- Tablet (640-1024px): `viewBox="0 0 600 480"` (landscape-ish)
- Desktop (>1024px): `viewBox="0 0 800 560"` (wide)
- `preserveAspectRatio="xMidYMid meet"` ensures content scales without distortion
- Tree auto-scales within viewBox bounds; nodes shrink proportionally when tree exceeds width

### Animation System

**Spring presets used in this lesson**:
```typescript
const SPRING = { type: "spring", damping: 20, stiffness: 300 };         // General purpose
const SPRING_POP = { type: "spring", damping: 15, stiffness: 400 };     // Pop-in effects (new nodes)
const SPRING_GENTLE = { type: "spring", damping: 25, stiffness: 200 };  // Slow reveals
const SPRING_COUNTER = { type: "spring", damping: 20, stiffness: 200 }; // Numeric counter animations
const FADE = { duration: 0.3, ease: "easeOut" };                         // Simple fades
```

**Animation priority**:
1. Transform + opacity (GPU-composited, highest priority)
2. SVG attributes (cx, cy, r) via Framer Motion
3. Fill/stroke (CSS transitions, lowest priority)

### Component Structure

```typescript
"use client";

// Single file: src/components/lessons/ExponentsLesson.tsx
// Named export: export function ExponentsLesson({ onComplete }: Props)

// Internal stage components (not exported):
// - HookStage         (penny doubling animation)
// - SpatialStage      (branching tree + tower builder)
// - DiscoveryStage    (5 guided prompts with micro-checks)
// - SymbolBridgeStage (notation overlay on tree/tower)
// - RealWorldStage    (3 example cards)
// - PracticeStage     (9 problems across 3 layers)
// - ReflectionStage   (open text + AI evaluation)

// Stage progression via internal useState
// AnimatePresence for transitions between stages
// Progress bar showing 7 dots at top
```

### Dependencies (only these)

- `react` (useState, useEffect, useCallback, useMemo, useRef)
- `framer-motion` (motion, AnimatePresence, useMotionValue)
- `@use-gesture/react` (useDrag -- for Problem U2 drag-arrange)
- `@/lib/utils/cn` (className merging)
- `@/components/ui/Button` (optional, for styled buttons)

### Rules

- TypeScript strict, no `any` (DR-1)
- `useRef()` must have an argument: `useRef(null)` or `useRef(undefined)`
- No external state stores -- self-contained
- No tRPC calls -- pure UI component (except reflection submission)
- All interactive elements: `min-h-[44px] min-w-[44px]`
- Array access with `noUncheckedIndexedAccess`: use `arr[i]!` or null checks
- `motion.text` textAnchor must be typed: `"middle" as const`

---

## Quality Checklist

Before marking this lesson as complete, verify:

### Functionality
- [ ] All 7 stages render without errors
- [ ] Stage progression works (each stage leads to next)
- [ ] Continue buttons appear at correct triggers (after 10.5s in hook, after 15 interactions in spatial, after all prompts in discovery, after all notation in symbol bridge, immediately in real world, after 9 problems in practice, after reflection submission)
- [ ] Branching tree correctly renders base^exponent leaves for all base/exponent combinations (base 2-5, exponent 0-5)
- [ ] Cluster representation activates when leaf count > 64
- [ ] Tower of powers correctly shows line (^1), square (^2), cube (^3) representations
- [ ] All 9 practice problems have correct answers validated
- [ ] Feedback stays visible until "Next" is tapped
- [ ] Reflection accepts text and shows AI response
- [ ] `onComplete` fires after Stage 7

### Visual Quality
- [ ] Animations are smooth (no janky transitions)
- [ ] Colors are consistent with lesson's palette (indigo for base, amber for exponent, emerald for results)
- [ ] Text is readable on dark background
- [ ] No layout overflow on mobile (375px width)
- [ ] Numbers use `tabular-nums` for alignment
- [ ] Progress bar at top shows current stage
- [ ] Branching tree auto-scales for large trees without overflow
- [ ] Isometric cube renders correctly with depth illusion

### Interactions
- [ ] All touch targets >= 44px
- [ ] Drag interactions work on touch devices (Problem U2)
- [ ] Visual feedback on every tap/click (scale, color, or highlight)
- [ ] No dead states (always a way to progress)
- [ ] Base selector and level buttons debounce correctly (300ms)
- [ ] Base selector disabled states apply at min (2) and max (5)
- [ ] Level buttons disabled states apply at min (0) and max (5)

### Accessibility
- [ ] Interactive elements have aria-labels
- [ ] Live regions announce state changes (tree stats, problem feedback)
- [ ] Keyboard navigation possible for key interactions
- [ ] Reduced motion variants work for all animations
- [ ] Screen reader correctly narrates branching tree structure
- [ ] Screen reader correctly narrates practice problem results

### Build
- [ ] `pnpm build` passes with no type errors
- [ ] No console errors in browser DevTools
