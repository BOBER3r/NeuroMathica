# Lesson Design: NT-2.2 Prime Numbers

**Topic ID**: NT-2.2
**Domain**: Number Theory (Domain 2)
**Grade**: 6
**Prerequisite**: NT-2.1 (Factors & Multiples)
**Successors**: NT-2.2a (Prime Factorization), NT-2.3 (GCF & LCM)
**Estimated Duration**: 18-25 minutes (adaptive)
**Constitution Compliance**: All 7 Core Principles verified; full NLS pipeline

---

## Core Insight

Prime numbers are the "atoms" of mathematics -- every whole number greater than 1 can be broken down into primes, and primes themselves cannot be broken down further. They are the fundamental building blocks from which all other numbers are constructed. Just as every molecule is made of atoms, every composite number is made of primes -- and just like atoms, this decomposition is unique (the Fundamental Theorem of Arithmetic, presented spatially, not formally).

The factor tree model makes decomposition tangible: a number splits into branches, each branch splits again, and the process continues until every leaf is prime. The Sieve of Eratosthenes makes prime identification tangible: by crossing out multiples on a number grid, primes emerge as the "survivors" -- the numbers that no smaller number divides evenly.

---

## Neuroscience Framework

### Neural Pathway Activation

| Pathway | How This Lesson Engages It | Constitution Reference |
|---------|---------------------------|----------------------|
| Intraparietal sulcus (IPS) | The 1-100 grid is a spatial number map; crossing out multiples activates the number-magnitude overlap region as students physically engage with numerical position | PF-1 (Spatial-Mathematical Neural Overlap) |
| Motor cortex | Tapping cells to mark multiples and dragging branches on factor trees encodes prime decomposition through embodied action | PF-3 (Embodied Cognition) |
| Pattern recognition (prefrontal) | Watching multiples fall away in waves on the sieve reveals that primes have no visible pattern -- a profound meta-pattern insight | PF-1 |
| Reward prediction (dopamine) | Hook animation surprises by showing that 60 always decomposes to the same primes regardless of splitting order; the sieve's wave-like elimination creates rhythmic anticipation and satisfaction | NLS Stage 1 |
| Visuospatial sketchpad (working memory) | Holding the tree structure in mind while deciding which branch to split next exercises hierarchical spatial working memory | PF-2 (Dual Coding) |
| Hippocampus (episodic) | The "atoms" metaphor and real-world connections (cryptography, cicadas) create rich episodic tags for retrieval | PF-4 (Episodic Anchoring) |

### Emotional Arc

| Phase | Emotion | Trigger | Duration |
|-------|---------|---------|----------|
| Hook | Surprise, wonder | 60 splitting different ways but always yielding 2, 2, 3, 5; then 7 refusing to split at all | 0:00-0:50 |
| Early spatial (Sieve) | Playful exploration | Tapping to cross out multiples of 2 -- satisfying wave of eliminations | 0:50-2:30 |
| Mid spatial (Sieve) | Growing curiosity | As fewer numbers remain, the survivors become visually prominent -- "which ones will survive?" | 2:30-4:00 |
| Late spatial (Factor Tree) | Engagement, agency | Building their own factor tree by choosing how to split -- multiple valid paths | 4:00-6:00 |
| Discovery | Delight, insight | Realizing that different splitting paths produce the same prime leaves; understanding why 1 is not prime | 6:00-8:00 |
| Symbol bridge | Confidence | Formal notation maps onto the tree structure they already built | 8:00-10:00 |
| Practice | Flow | Problems feel achievable because the sieve and tree models are internalized | 10:00-18:00 |
| Reflection | Satisfaction, ownership | Articulating the "atoms of math" metaphor in their own words | 18:00-20:00 |

### Anxiety Mitigation (PF-6)

- NO timer anywhere in this lesson. Not displayed, not tracked visually.
- Wrong taps on the sieve (tapping a prime by mistake) show gentle visual feedback -- the cell bounces back with a soft "hmm, this one doesn't have any smaller factors" message, never "WRONG" or red X.
- The factor tree building phase has no single "correct" path -- all valid decompositions are celebrated equally.
- Practice problems use neutral-positive feedback language per gamification design.
- The sieve uses progressive disclosure: students only handle one prime's multiples at a time, preventing working memory overload.

---

## Stage 1: Hook (30-50 seconds)

### Scene Definition

```json
{
  "id": "nt-2.2-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 400],
  "background": "transparent",
  "objects": [],
  "animations": [],
  "interactions": []
}
```

### Detailed Animation Sequence

**T=0.0s -- Initial State: The Number 60**

A large "60" appears at the top-center of the viewport, rendered in KaTeX.

- Position: centered horizontally at (200, 50)
- `fontSize`: 40px, `fontWeight`: 700
- `fill`: `#f1f5f9` (slate-100)
- Entry: `spring(damping: 20, stiffness: 300)`, `scale: 0 -> 1`, `opacity: 0 -> 1`
- Below the number, a small text fades in after 300ms: "Every number has a secret code..."
  - `fontSize`: 16px, `fill`: `#94a3b8` (slate-400), italic
  - `opacity: 0 -> 1` over 400ms, `ease: "easeOut"`
- Sound: soft mysterious chime, single sustained note, 300ms, 25% volume

**T=1.0s -- First Split: 60 -> 6 x 10**

The "60" splits downward into a factor tree. Two lines extend from the "60" downward-left and downward-right, forming an inverted V.

- Branch lines: SVG `<line>` elements
  - `stroke`: `#475569` (slate-600), `strokeWidth`: 2px
  - Animation: drawn from top to bottom using `pathLength` / dash-offset technique, 300ms, `ease: "easeOut"`
  - Left branch ends at approximately (120, 130), right branch at (280, 130)
- At the end of each branch, a number appears in a rounded rectangle node:
  - Left node: "6"
    - `fill`: `#818cf8` (indigo-400), `fontSize`: 28px, `fontWeight`: 700
    - Background rect: `fill: #1e293b`, `stroke: #818cf8`, `strokeWidth: 1.5`, `rx: 10`
    - Entry: `spring(damping: 20, stiffness: 300)`, `scale: 0.5 -> 1`, `opacity: 0 -> 1`
  - Right node: "10"
    - Same styling as "6"
  - A small "x" symbol between the branches at (200, 130): `fill: #64748b`, `fontSize: 14px`
- Sound: gentle "branch" sound -- a soft wooden click, 150ms, 30% volume

**T=1.8s -- Second Split: 6 -> 2 x 3, and 10 -> 2 x 5**

Both child nodes split simultaneously.

- "6" splits into "2" (left-left) and "3" (left-right):
  - New branches drawn from "6" node downward, same line styling, 300ms
  - "2" node at approximately (80, 210)
  - "3" node at approximately (160, 210)
- "10" splits into "2" (right-left) and "5" (right-right):
  - New branches drawn from "10" node downward, 300ms
  - "2" node at approximately (240, 210)
  - "5" node at approximately (320, 210)
- The four leaf nodes have special styling -- they are PRIME:
  - Background rect: `fill: #fbbf2420` (amber, 12% opacity), `stroke: #fbbf24` (amber-400), `strokeWidth: 2`
  - Text `fill: #fbbf24`, `fontWeight: 700
  - A subtle glow: `filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))`
  - Entry: `spring(damping: 15, stiffness: 350)`, `scale: 0.3 -> 1`, slight overshoot
- The parent nodes ("6" and "10") dim slightly: `opacity: 1 -> 0.5` over 300ms
- Sound: two-note ascending chime (major third), 250ms, 40% volume

**T=2.8s -- Pause and Highlight Primes**

Hold the completed tree for 0.8s. Then the prime leaves pulse sequentially:
- "2" (left) pulses: `scale: 1 -> 1.15 -> 1`, 200ms
- "3" pulses: same, 200ms (100ms after first)
- "2" (right) pulses: same, 200ms (100ms after second)
- "5" pulses: same, 200ms (100ms after third)
- A text annotation appears below the tree: "60 = 2 x 2 x 3 x 5"
  - Position: centered at (200, 270)
  - KaTeX: `"60 = 2 \\times 2 \\times 3 \\times 5"`
  - `fontSize`: 20px, `fill`: `#e2e8f0` (slate-200)
  - `opacity: 0 -> 1` over 400ms
- Below that: "The same primes, every time."
  - `fontSize`: 15px, `fill`: `#94a3b8`, italic
  - `opacity: 0 -> 1` over 400ms, 200ms delay after the equation

**T=4.5s -- Alternative Split: Tree Fades, Rebuilds Differently**

The entire first tree fades out over 400ms. Then a new tree builds with a DIFFERENT first split.

- "60" reappears at top (same position, quick fade-in 200ms)
- Text above changes to: "What if we split differently?"
  - `fill`: `#94a3b8`, `fontSize`: 15px, italic
- First split: 60 -> 4 x 15
  - "4" node at left, "15" node at right, same branch animation timing
- Second split: 4 -> 2 x 2, and 15 -> 3 x 5
  - "2", "2", "3", "5" appear as amber-glowing prime leaves
- After tree completes (T=6.0s), the same equation appears below: "60 = 2 x 2 x 3 x 5"
  - This time, each matching prime from the first tree briefly "echoes" in a ghost outline at the corresponding position from the first tree (10% opacity amber outlines) then snaps to the new tree's position
  - `fill`: `#fbbf24`, `fontSize`: 20px
- Annotation below: "Same primes! No matter how you split it."
  - `fontSize`: 16px, `fill`: `#fbbf24` (amber-400), `fontWeight`: 600
  - Entry: `scale: 0.9 -> 1`, `opacity: 0 -> 1`, `ease: "easeOutBack"`, 400ms
- Sound: satisfying "aha" chord -- bright major triad, 400ms, 45% volume

**T=7.5s -- The Unsplittable Number: 7**

Everything fades out over 400ms. A single "7" appears at top-center.

- Same styling as initial "60" but `fontSize`: 48px for emphasis
- Two branch lines begin to draw downward from the "7"... but they stutter, flicker, and retract:
  - Branch animation: dash-offset draws 60% then reverses, with slight wobble
  - Duration: 600ms
  - The branches fade to `opacity: 0` and disappear
- The "7" pulses once with the amber glow treatment (prime styling)
- Annotation appears below "7":
  - Line 1: "7 can't be split."
    - `fontSize`: 20px, `fill`: `#f1f5f9`, `fontWeight`: 600
  - Line 2: "It IS the building block."
    - `fontSize`: 20px, `fill`: `#fbbf24` (amber-400), `fontWeight`: 700
    - Entry: 300ms delay after Line 1, `scale: 0.9 -> 1`, `ease: "easeOutBack"`
- Sound: mysterious wonder chord (suspended 4th resolving to major), 500ms, 40% volume

**T=9.5s -- Continue Button**

Everything holds. A "Continue" button fades in at the bottom of the scene:
- Style: rounded rectangle, `fill: #818cf8`, `rx: 12`, padding 16px 32px
- Text: "Discover the atoms of math" in `#ffffff`, `fontSize: 16px`, `fontWeight: 600`
- Entry: slide up from 20px below + fade in, 400ms, `ease: "easeOut"`
- Hover state: `fill: #6366f1`, scale 1.02
- Active state: scale 0.98
- Touch target: minimum 48x48px (exceeds DR-5 requirement of 44px)

### Hook -- Accessibility

- `aria-live="polite"` region narrates: "60 splits into a factor tree: 60 equals 6 times 10. 6 splits into 2 times 3. 10 splits into 2 times 5. The prime factors are 2, 2, 3, and 5."
- Each tree build is announced with a 500ms delay after visual animation completes.
- Second tree: "60 splits differently: 60 equals 4 times 15. 4 splits into 2 times 2. 15 splits into 3 times 5. Same prime factors: 2, 2, 3, 5."
- 7 sequence: "7 cannot be split into factors. 7 is itself a building block -- a prime number."
- Tree has `role="img"` with `aria-label` describing the current decomposition
- Continue button has `role="button"`, `aria-label="Continue to interactive exploration of prime numbers"`
- Keyboard: Enter or Space activates Continue. Tab focuses Continue button. Escape replays hook from beginning.
- Reduced motion: if `prefers-reduced-motion: reduce`, all spring animations become instant repositions (0ms duration). Branch-drawing animations become instant lines. Fade-ins remain but at 150ms with `ease: "linear"`. Pulse and glow effects disabled.

### Hook -- Performance Budget

- Total SVG elements: ~20 nodes + ~16 branches + ~10 annotations + 1 button = ~47 elements (well under 200-element SVG budget)
- No WebGL required
- Spring animations via Framer Motion -- GPU-composited transforms only (`transform`, `opacity`)
- Filter effects (drop-shadow on prime nodes): defined once in `<defs>`, applied only to 4-5 nodes
- Target: 60fps on iPhone SE 2nd gen (A13 Bionic)
- Memory: <2MB total scene

---

## Stage 2: Spatial Experience -- Sieve of Eratosthenes + Factor Tree Builder (3-5 minutes)

### Overview

The spatial experience has two phases:

**Phase A: Sieve of Eratosthenes (2-3 min)** -- An interactive 1-100 number grid where the student systematically eliminates multiples of each prime to reveal which numbers are prime. This is the "prime identification" spatial model.

**Phase B: Factor Tree Builder (1-2 min)** -- An interactive workspace where the student builds a factor tree by choosing how to split composite numbers, watching the tree grow until every leaf is prime. This is the "prime decomposition" spatial model.

Both phases are essential: the sieve teaches "what primes ARE" (identification), and the factor tree teaches "what primes DO" (decomposition as building blocks).

### Phase A: Sieve of Eratosthenes

#### Scene Layout (Mobile-First)

```
+------------------------------------------+
|  "Cross out the multiples!"              |  <- Instruction bar, 48px height
|  Current prime: [2]                      |
+------------------------------------------+
|                                          |
|   1   2   3   4   5   6   7   8   9  10 |
|  11  12  13  14  15  16  17  18  19  20 |
|  21  22  23  24  25  26  27  28  29  30 |
|  31  32  33  34  35  36  37  38  39  40 |  <- 10x10 Number Grid
|  41  42  43  44  45  46  47  48  49  50 |     (fills available space,
|  51  52  53  54  55  56  57  58  59  60 |      square aspect ratio)
|  61  62  63  64  65  66  67  68  69  70 |
|  71  72  73  74  75  76  77  78  79  80 |
|  81  82  83  84  85  86  87  88  89  90 |
|  91  92  93  94  95  96  97  98  99 100 |
|                                          |
+------------------------------------------+
|  Primes found: 0    Composites: 0       |  <- Stats bar
+------------------------------------------+
```

**Desktop layout**: Grid centered with stats panel on the right sidebar. Instruction bar above grid.

#### Number Grid Rendering

- Component: 10x10 SVG grid of `<rect>` + `<text>` pairs, rendered via Framer Motion `motion.rect` and `motion.text`
- Each cell:
  - Dimensions: calculated to fill available width; on mobile (360px viewport), each cell is approximately 32x32px with 2px gap
  - Default state: `fill: #1e293b` (slate-800), `stroke: #334155` (slate-700), `strokeWidth: 1`, `rx: 4`
  - Number text: `fill: #e2e8f0` (slate-200), `fontSize: clamp(11px, 2.8vw, 15px)`, `fontWeight: 500`, `textAnchor: "middle" as const`, `dominantBaseline: "central"`
  - Touch target: each cell is at minimum 32x32px visible area but the tap/click hit area extends to include the 2px gap, giving an effective target of 34x34px. On devices where this is below 44px, the grid scales up or a tap tolerance of 6px is added around each cell.

#### Cell States

| State | Background Fill | Stroke | Text Fill | Annotation |
|-------|----------------|--------|-----------|------------|
| Default (unmarked) | `#1e293b` | `#334155` | `#e2e8f0` | None |
| 1 (special -- neither prime nor composite) | `#0f172a` (slate-950) | `#1e293b` | `#475569` (dim) | Faintly marked with a small dash |
| Current prime (highlighted) | `#fbbf2430` (amber 20%) | `#fbbf24` (amber-400) | `#fbbf24` | Subtle glow pulse |
| Crossed out (composite) | `#0f172a` (slate-950) | `#1e293b` | `#475569` (dim) | Diagonal cross lines in `#fb718560` (rose, 40% opacity) |
| Revealed prime (sieve complete) | `#818cf830` (indigo 20%) | `#818cf8` (indigo-400) | `#818cf8` | Subtle glow |

#### Sieve Interaction Sequence

The lesson guides the student through the sieve one prime at a time.

**Step 0: Mark 1 as Special**

- Before the student interacts, the number 1 is pre-dimmed with a brief animation.
- Annotation tooltip: "1 is special -- it's neither prime nor composite."
  - `fill: #94a3b8`, `fontSize: 13px`, appears near cell 1 for 2s then fades
- The "1" cell transitions to the "special" state: `fill: #0f172a`, text `fill: #475569`

**Step 1: Cross Out Multiples of 2**

- Instruction text updates: "2 is prime! Tap all the multiples of 2 to cross them out."
- The cell for "2" transitions to "current prime" state with amber glow
- The student taps cells to cross them out. Valid targets: 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100 (49 cells)

**Tap behavior**:
- Tapping a valid multiple (even number > 2):
  - Cell animates to "crossed out" state: background dims, cross lines draw in diagonally (two `<line>` elements, `stroke: #fb718560`, drawn via dash-offset, 150ms)
  - Text dims to `#475569`
  - Brief scale pulse: `scale: 0.9 -> 1.0`, 100ms, `spring(damping: 30, stiffness: 500)`
  - Sound: soft tap/click, 80ms, 25% volume
  - Haptic: 8ms vibration pulse
  - Composites counter increments (+1 animation)
- Tapping a prime (odd number that is prime):
  - Cell briefly flashes with amber border: `stroke: #fbbf24` for 300ms then returns to default
  - Tooltip appears near the cell: "This one has no smaller factors -- it might be prime!" in `#fbbf24`, `fontSize: 12px`
  - Tooltip fades after 1.5s
  - Sound: gentle "hmm" tone, 150ms, 20% volume
  - The tap does NOT cross out the cell
- Tapping 1 or an already-crossed cell:
  - No effect. Brief visual acknowledgment (0.95 scale pulse, 80ms)
- Tapping the current prime itself (e.g., tapping "2" during step 1):
  - Tooltip: "That's the prime itself -- we keep it!" in `#fbbf24`, `fontSize: 12px`, 1.5s

**Auto-complete shortcut**: After the student has manually crossed out at least 8 multiples of the current prime, a "Cross out the rest" button appears at the bottom.
- Button: `fill: #1e293b`, `stroke: #818cf8`, `borderRadius: 10px`, padding 10px 20px
- Text: "Cross out remaining multiples of 2" in `#818cf8`, `fontSize: 14px`
- On tap: all remaining uncrossed multiples of the current prime animate to "crossed out" in a rapid cascade (30ms stagger between each, sweeping left-to-right, top-to-bottom)
- This prevents tedium while ensuring the student understands the pattern through initial manual effort

**Step completion**: When all multiples of 2 are crossed out:
- Brief celebration: the "2" cell pulses with a stronger amber glow for 400ms
- "Primes found" counter shows: 1
- Instruction updates: "Now 3! Tap the multiples of 3 that aren't already crossed out."
- The "2" cell transitions from "current prime" amber glow to "revealed prime" indigo glow
- The "3" cell transitions to "current prime" amber glow

**Step 2: Cross Out Multiples of 3**

- Valid targets: 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99 (the multiples of 3 that weren't already multiples of 2)
- Note: 6, 12, 18, 24, 30... are already crossed out from Step 1. If the student taps one of these, tooltip: "Already crossed out! It was a multiple of 2 too." in `#94a3b8`, 1.5s
- Auto-complete button appears after 5 manual crossings
- Step completion: "3" moves to revealed-prime indigo; "5" becomes current-prime amber

**Step 3: Cross Out Multiples of 5**

- Valid targets: 25, 35, 55, 65, 77, 85, 95 (multiples of 5 not already crossed out)
- Note: many multiples of 5 are already gone (10, 15, 20, 30, etc.)
- Auto-complete button appears after 3 manual crossings (fewer targets)
- Step completion: "5" moves to revealed prime; "7" becomes current prime

**Step 4: Cross Out Multiples of 7**

- Valid targets: 49, 77, 91 (very few remain!)
- After the student crosses out these, instruction text changes to something special:
  - "After 7, do we need to keep going? The next prime is 11, but 11 x 11 = 121 > 100. So we've already found ALL primes up to 100!"
  - `fontSize: 15px`, `fill: #f1f5f9`
  - Key phrase "ALL primes up to 100" in `#fbbf24`, `fontWeight: 600`
- This is the first hint at the "only need to check up to sqrt(n)" concept

**Step 5: Reveal All Primes**

- After the sqrt explanation holds for 2s, all remaining unmarked cells (the primes) simultaneously transition to "revealed prime" state with indigo glow
- The transition cascades across the grid: 40ms stagger, left-to-right, top-to-bottom
- Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 (25 primes total)
- "Primes found" counter rapidly counts up to 25 (spring animation on each increment)
- A celebration annotation appears above the grid: "25 primes between 1 and 100!"
  - `fontSize: 20px`, `fill: #818cf8`, `fontWeight: 700`
  - Entry: `scale: 0.8 -> 1`, `ease: "easeOutBack"`, 400ms
- Sound: celebration chord (same as NT-2.1 all-factors-found), 600ms, 50% volume
- Haptic: 30ms vibration
- Confetti: 15 small geometric shapes in `#818cf8`, `#fbbf24`, `#34d399` burst from center, physics fall, 1.2s, fade at bottom

#### Sieve Interaction Count

Each tap (crossing out a multiple or incorrectly tapping a prime) counts as an interaction. The minimum threshold for the sieve phase is 15 interactions. Given that crossing out multiples of 2 alone requires 8+ manual taps before the shortcut appears, this is naturally reached.

### Phase B: Factor Tree Builder

After the sieve celebration, a brief transition card appears:
- "Now let's see how primes BUILD every number..."
- `fontSize: 17px`, `fill: #f1f5f9`
- "Continue" button: same styling as previous

#### Scene Layout (Mobile-First)

```
+------------------------------------------+
|  Build a factor tree for: [60]           |  <- Number display, 56px height
+------------------------------------------+
|                                          |
|              ( 60 )                      |
|             /      \                     |
|          (  )      (  )                  |  <- Interactive tree area
|         /    \                           |     (grows downward as
|       (  )  (  )                         |      student splits nodes)
|                                          |
+------------------------------------------+
|  Split options: [2x30] [3x20] [4x15]    |  <- Split picker
|                 [5x12] [6x10]            |     (shown when node tapped)
+------------------------------------------+
```

#### Factor Tree Interaction

**Initial state**: A single root node with "60" is displayed at the top-center of the tree area.

- Root node styling: rounded rectangle, `fill: #1e293b`, `stroke: #818cf8`, `strokeWidth: 2`, `rx: 12`
- Text: `fill: #f1f5f9`, `fontSize: 24px`, `fontWeight: 700`
- The node gently pulses (border opacity oscillates 0.6-1.0, 1.5s period) to indicate interactivity
- Instruction: "Tap a number to split it into factors!"

**Tapping a composite node**:

When the student taps a composite (non-prime) node, a split picker appears below/beside the node:

- Split picker: a horizontal row of pill-shaped buttons, each showing one valid factorization
- For 60: `[2 x 30]`, `[3 x 20]`, `[4 x 15]`, `[5 x 12]`, `[6 x 10]`
- For each option:
  - Pill button: `fill: #0f172a`, `stroke: #334155`, `borderRadius: 16px`, padding 8px 14px
  - Text: `fill: #e2e8f0`, `fontSize: 14px`
  - Touch target: minimum 44px height
  - Hover/focus: `stroke: #818cf8`, `fill: #1e293b`
- The picker fades in with `spring(damping: 20, stiffness: 300)`, `opacity: 0 -> 1`, `scale: 0.95 -> 1`
- Tapping outside the picker dismisses it (200ms fade-out)

**Choosing a split**:

When the student taps a split option (e.g., `[6 x 10]`):
1. The picker fades out (150ms)
2. Two branch lines draw downward from the parent node (same branch animation as hook, 250ms)
3. Two child nodes appear at the branch endpoints:
   - Each child: same rounded-rect node styling as parent but smaller (`fontSize: 20px`)
   - If the child is prime: immediately gets amber prime styling (`stroke: #fbbf24`, `fill: #fbbf2420`, text `fill: #fbbf24`, glow filter)
   - If the child is composite: gets default styling with pulse to indicate it can be tapped
4. Sound: branch snap sound (soft wooden click), 150ms, 30% volume
5. Haptic: 10ms vibration

**Tapping a prime node**:
- The node briefly pulses amber and a tooltip appears: "This is prime -- it can't be split further!" in `#fbbf24`, `fontSize: 13px`, 1.5s
- Sound: gentle chime, 100ms, 20% volume

**Tree completion**:

When all leaf nodes are prime:
1. All prime leaves simultaneously pulse with enhanced amber glow (400ms)
2. A line of text appears below the tree showing the prime factorization:
   - KaTeX: `"60 = 2 \\times 2 \\times 3 \\times 5"` (primes sorted ascending)
   - `fontSize: 20px`, `fill: #fbbf24`
   - Each prime number in the equation briefly connects via a faint dashed line to its corresponding leaf node in the tree (400ms draw, then 600ms hold, then 300ms fade)
3. Annotation: "The building blocks of 60!" in `#f1f5f9`, `fontSize: 16px`, `fontWeight: 600`
4. Sound: satisfying "aha" chord, 400ms, 45% volume
5. "+15 XP" float-up from the tree center

**Second tree challenge**: After the first tree (60) is completed, the tree resets with a new number:

- "Now try 36!" -- instruction updates
- Root node shows "36"
- Valid splits for 36: `[2 x 18]`, `[3 x 12]`, `[4 x 9]`, `[6 x 6]`
- On completion: `"36 = 2 \\times 2 \\times 3 \\times 3"`
- Special annotation if student chose 6 x 6: "6 x 6 -- a perfect square! And both 6s break down the same way." in `#34d399`, `fontSize: 14px`

**Continue trigger**: After completing both trees (60 and 36), and accumulating a total of at least 20 interactions across Phase A and Phase B, a "Continue" button appears: "Ready to discover the patterns?"

#### Factor Tree -- Layout Algorithm

The tree auto-layouts to prevent overlap:
- Horizontal spacing between sibling nodes: `max(nodeWidth + 20, parentWidth / 2)`
- Vertical spacing between levels: 60px
- If the tree exceeds viewport width, it scales down proportionally (minimum node font size: 14px)
- On mobile, if the tree grows beyond 4 levels deep, the viewport scrolls vertically to follow the most recently added node
- Branch lines adjust angles dynamically based on child positions

### Spatial Experience -- Accessibility

**Sieve**:
- Grid has `role="grid"` with each row as `role="row"` and each cell as `role="gridcell"`
- Each cell has `aria-label="[number], [state]"` where state is "unmarked", "crossed out, multiple of [prime]", "prime", or "neither prime nor composite"
- Keyboard navigation: Arrow keys move focus between cells. Enter/Space toggles cross-out on the focused cell.
- Screen reader announces: "Crossed out [number]. [count] multiples of [prime] found." on each valid crossing.
- Step transitions announced: "Now crossing out multiples of [next prime]. [previous prime] is confirmed as prime."

**Factor Tree**:
- Tree has `role="tree"` with each node as `role="treeitem"`
- Split picker: `role="menu"` with each option as `role="menuitem"`
- Keyboard: Tab moves between splittable nodes. Enter opens split picker. Arrow keys navigate picker options. Enter selects.
- Screen reader announces: "[number] splits into [a] times [b]" on each split. "Factor tree complete. [number] equals [prime factors]." on completion.

- Reduced motion: all spring animations become 150ms linear transitions. Cross-out lines appear instantly. Cascade reveals become simultaneous. Confetti disabled.

### Spatial Experience -- Performance

**Sieve**:
- SVG element count: 100 cells x (1 rect + 1 text + 0-2 cross lines) = ~300 elements at maximum. This approaches the 200-element "comfortable" budget but SVG handles 300 static elements well. Cross lines are added dynamically, not all at once.
- Optimization: cells that are crossed out have their cross lines rendered as a single `<path>` per cell rather than two `<line>` elements, reducing element count
- Spring animations on cells: only the cell being interacted with animates; no bulk re-renders
- Target: 60fps on iPhone SE 2nd gen during tap interactions

**Factor Tree**:
- Maximum nodes: a 60-tree at most depth produces ~11 nodes; 36-tree produces ~9 nodes. Well under limits.
- SVG element count: ~25 nodes + ~20 branches + ~10 annotations = ~55 elements
- Layout computation: precomputed valid splits for all numbers 2-100 at mount (<1ms)

---

## Stage 3: Guided Discovery (3-5 minutes)

### Prompt Sequence

The guided discovery stage presents narrated prompts with synchronized visual highlights. The sieve grid and factor tree from Stage 2 remain available for reference but interaction is paused. The prompts guide the student through key observations.

**Prompt delivery**: Each prompt appears as a text card at the bottom of the screen (mobile) or in a side panel (desktop). Text is revealed character by character at 30 characters/second for a "typing" effect. The corresponding visual highlight plays simultaneously.

**Card styling**:
- Background: `#1e293b` (slate-800), `borderRadius: 16px`, `padding: 20px`
- Border: `1px solid #334155` (slate-700)
- Text: `fill: #e2e8f0` (slate-200), `fontSize: 16px`, `lineHeight: 1.6`
- Key terms highlighted inline: `color: #818cf8` (indigo-400), `fontWeight: 600`
- "Next" button at bottom-right: same styling as hook Continue but smaller (padding 12px 24px), text "Next"

---

**Prompt 1: What Makes a Number Prime?**

Card text:
> "Look at the sieve. The numbers that survived -- **2, 3, 5, 7, 11, 13...** -- are called **prime numbers**. They have exactly **two factors**: 1 and themselves. No other number divides them evenly."

Visual:
- The sieve grid from Phase A reappears (already completed, primes glowing indigo)
- The prime cells pulse sequentially in groups: first 2, 3, 5, 7 (single-digit primes), then 11, 13, 17, 19 (teens), with a 200ms pulse each, 100ms gap
- Below the grid, the list of primes appears: "2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97"
  - Each number in `#818cf8`, `fontSize: 13px`, horizontal scroll on mobile
  - Count badge: "25 primes" in `#818cf8`, pill badge, `fontSize: 14px`

Student action: Read, observe, tap "Next."

---

**Prompt 2: Why Isn't 1 Prime?**

Card text:
> "You might wonder: why not 1? Here's the key: primes must have **exactly two different factors**. 1 only has **one factor** -- itself. It's like asking 'what are the atoms of an atom?' -- the question doesn't apply."

Visual:
- The sieve grid dims except for cell 1, which zooms to 2x size at the center of the scene
- Below the enlarged "1", a factor list appears: "Factors of 1: {1}" -- just one lonely number in a circle badge (`stroke: #94a3b8`)
- An animation shows the "PRIME?" label appearing above the 1, then dissolving into particles that drift away (400ms)
  - Particles: 8-10 small dots in `#94a3b8`, scatter with physics (random velocities, slight gravity), fade over 600ms
- Replacement text: "Neither prime nor composite" in `#94a3b8`, `fontSize: 14px`, italic
- Comparison appears alongside:
  - "Factors of 7: {1, 7}" -- two circle badges in `#fbbf24`
  - Arrow pointing from the 7 example to "Exactly 2 factors = PRIME" in `#fbbf24`
  - Arrow pointing from the 1 example to "Only 1 factor = NOT prime" in `#94a3b8`

Student action: Read, observe, tap "Next."

---

**Prompt 3: Are All Odd Numbers Prime?**

Card text:
> "A common mistake: 'all odd numbers are prime.' But look: **9 = 3 x 3**, **15 = 3 x 5**, **21 = 3 x 7**, **25 = 5 x 5**. These are odd AND composite! Meanwhile, **2 is even AND prime** -- the only even prime."

Visual:
- The sieve grid reappears. Four cells highlight in sequence with mini factor trees:
  - Cell 9: zooms slightly, a small "3 x 3" annotation appears beside it, cell border flashes `#fb7185` briefly then settles to crossed-out state
  - Cell 15: same treatment, "3 x 5" annotation
  - Cell 21: same, "3 x 7"
  - Cell 25: same, "5 x 5"
  - Each annotation: `fill: #fb7185`, `fontSize: 12px`, 400ms hold per number
- Then cell 2 highlights with an amber glow and annotation: "Even AND prime!" in `#fbbf24`, `fontSize: 13px`, `fontWeight: 600`
- The cell 2 is the only even cell with prime (indigo) styling -- this visual contrast is striking against the sea of crossed-out even numbers

**Interactive micro-check**: Before revealing the full explanation, the card initially shows only: "Is every odd number prime?"
- Two buttons: "Yes" (`fill: #34d39920`, text "Yes" in `#34d399`) and "No" (`fill: #fb718520`, text "No" in `#fb7185`)
- Both: `borderRadius: 12px`, `padding: 12px 24px`, `fontSize: 16px`, touch target 48px height
- If student taps "Yes": feedback "Let's check! Look at 9..." then the visual sequence plays showing odd composites
- If student taps "No": positive feedback "Correct! Let's see some examples..." then the visual plays
- This micro-interaction does NOT affect XP or scoring

Student action: Tap answer, observe visual confirmation, tap "Next."

---

**Prompt 4: Do Primes Follow a Pattern?**

Card text:
> "Look at the gaps between primes: 2→3 (gap 1), 3→5 (gap 2), 5→7 (gap 2), 7→11 (gap 4), 11→13 (gap 2), 13→17 (gap 4)... The gaps **jump around unpredictably**. Mathematicians have been trying to find a pattern in primes for thousands of years -- and they're still looking!"

Visual:
- The sieve grid shows only the prime cells (all composites hidden/transparent)
- Arched connecting lines draw between consecutive primes (SVG `<path>` arcs, drawn via dash-offset, 150ms each, staggered)
- Each arc is labeled with the gap size in `#94a3b8`, `fontSize: 11px`
- The gap labels briefly flash in different colors to emphasize their irregularity: `#34d399`, `#818cf8`, `#fbbf24`, `#fb7185` cycling
- After all arcs drawn, a "?" appears at the end of the chain (after 97), growing from small to large with `ease: "easeOutBack"`, in `#fbbf24`, `fontSize: 28px`
- Below the grid: "No formula predicts the next prime." in `#94a3b8`, `fontSize: 14px`, italic

Student action: Read, observe, tap "Next."

---

**Prompt 5: How Many Primes Are There?**

Card text:
> "Will primes ever run out? **No!** There are **infinitely many primes**. Even past 1,000,000,000... there's always another prime waiting. An ancient Greek named **Euclid** proved this over 2,300 years ago."

Visual:
- The sieve grid zooms out, shrinking to the upper-left corner of the scene
- A number line extends from the right edge of the grid toward infinity (rightward arrow)
- On the number line, prime positions are marked with amber dots, getting sparser but never stopping:
  - Visible primes: 2, 3, 5, 7, 11, 13... up to 97 (from the sieve), then the line extends with dots at approximately 101, 103, 107, 109, 113... getting sparser
  - The dots animate appearing one by one (50ms stagger), left to right
  - An ellipsis "..." and then the infinity symbol "..." appear at the far right
  - `fill: #fbbf24` for prime dots, `r: 4px`
- Below the line: "Primes go on forever!" in `#fbbf24`, `fontSize: 18px`, `fontWeight: 600`
  - Entry: `scale: 0.9 -> 1`, `ease: "easeOutBack"`, 400ms

Student action: Read, observe, tap "Next."

---

**Prompt 6: The Square Root Shortcut**

Card text:
> "Here's a secret shortcut: to check if a number is prime, you only need to test divisors up to its **square root**. For example, to check if 37 is prime, you only need to test 2, 3, 4, 5, and 6 (since 6 x 6 = 36 < 37 but 7 x 7 = 49 > 37). If none of those divide 37, it's prime!"

Visual:
- A focused view shows the number 37 in a large node at center
- Below it, test divisors appear one by one as small circle badges:
  - "37 / 2 = 18.5" in `#fb7185` (not whole -- cross out 2)
  - "37 / 3 = 12.3..." in `#fb7185` (cross out 3)
  - "37 / 4 = 9.25" in `#fb7185` (cross out 4)
  - "37 / 5 = 7.4" in `#fb7185` (cross out 5)
  - "37 / 6 = 6.16..." in `#fb7185` (cross out 6)
- Each test appears with 600ms delay, the failing division flashes then dims
- After 6: "STOP! 7 x 7 = 49 > 37" in `#34d399`, `fontSize: 14px`, `fontWeight: 600`
- The 37 node transitions to full prime amber glow
- "37 is PRIME!" in `#fbbf24`, `fontSize: 20px`, `fontWeight: 700`
- A visual bracket shows: "Only checked up to sqrt(37) ~ 6.08" in `#94a3b8`, `fontSize: 13px`
  - A small `sqrt` symbol rendered in KaTeX: `"\\sqrt{37} \\approx 6.08"`

Student action: Read, observe, tap "Next."

---

### Guided Discovery -- Transition

After Prompt 6, a brief summary card appears:

> "Now let's connect what you discovered to proper math notation."

The card has a forward-pointing arrow icon and the "Continue" button. This transitions to Stage 4: Symbol Bridge.

### Guided Discovery -- Accessibility

- All prompt text is in `aria-live="polite"` regions
- Visual animations have corresponding screen reader descriptions announced after each animation completes
- Micro-check buttons have `role="button"` with descriptive `aria-label`s: "I think all odd numbers are prime" / "I think not all odd numbers are prime"
- Keyboard: Tab navigates between "Next" and micro-check buttons. Enter/Space activates.
- Reduced motion: sequential highlighting becomes simultaneous appearance. Arc-drawing animations are replaced with instant lines. Particle dissolve for "1" becomes simple fade-out.

---

## Stage 4: Symbol Bridge (2-3 minutes)

### Overview

Formal mathematical notation is overlaid onto the spatial representations the student already understands. Each symbol is explicitly linked to its spatial meaning from the sieve and factor tree.

### Scene Layout

The screen splits into two synchronized panels:

**Left panel (60%)**: The sieve grid or factor tree from Stage 2, cycling between them as relevant to each notation being introduced.

**Right panel (40%)**: Mathematical notation, building up incrementally.

On mobile: vertical stack -- visualization on top (40% height), notation below (60% height), scrollable.

---

**Symbol 1: Prime Number Definition**

- Notation (right panel): `"p \\text{ is prime if its only factors are } 1 \\text{ and } p"`
- KaTeX rendering, `fontSize: 18px`
- Entry: text fades in word by word (150ms per word group)
- Left panel: the sieve grid, with three example primes highlighted (7, 13, 29), each showing their factor list: "{1, 7}", "{1, 13}", "{1, 29}" in small badges
- Connecting line: a subtle dashed line (`stroke: #818cf8`, `opacity: 0.3`, `dasharray: "4 4"`) briefly draws from each highlighted prime to the notation, then fades (800ms)

**Symbol 2: Composite Number Definition**

- After 1.5s pause
- New line below: `"n \\text{ is composite if it has factors other than } 1 \\text{ and } n"`
- `fontSize: 18px`, "composite" in `#34d399`, bold
- Left panel: sieve highlights three composites (12, 15, 24), each showing full factor lists: "{1, 2, 3, 4, 6, 12}", "{1, 3, 5, 15}", "{1, 2, 3, 4, 6, 8, 12, 24}"
  - Factor lists stagger in (100ms per number)
  - Factors beyond 1 and n are highlighted in `#34d399` to emphasize "other factors"

**Symbol 3: Prime Factorization Notation**

- After 1.5s pause
- Notation: `"60 = 2^2 \\times 3 \\times 5"`
- `fontSize: 22px`, each prime base in `#fbbf24`
- Left panel: the completed factor tree for 60 from Stage 2 reappears
- The two "2" leaves in the tree merge visually: they slide toward each other, overlap, and a small superscript "2" appears above (creating `2^2`). This happens in 400ms with `spring(damping: 20, stiffness: 300)`
- Connecting lines draw from each prime leaf to its position in the notation equation:
  - Tree leaves "2, 2" connect to `"2^2"` in the notation
  - Tree leaf "3" connects to `"3"` in the notation
  - Tree leaf "5" connects to `"5"` in the notation
  - Lines: `stroke: #fbbf24`, `opacity: 0.4`, dash-offset draw, 500ms each with 200ms stagger

**Symbol 4: The Fundamental Theorem of Arithmetic (Simplified)**

- After 2s pause
- Notation, presented as a highlighted "theorem box":
  - Border: `stroke: #fbbf24`, `strokeWidth: 2`, `rx: 12`, `fill: #fbbf2410`
  - Text: `"\\text{Every whole number > 1 is either prime or can be written as a unique product of primes.}"`
  - `fontSize: 16px`, `fill: #f1f5f9`
  - "unique" in `#fbbf24`, `fontWeight: 700`
- Below the box: "This is one of the most important facts in all of mathematics!" in `#94a3b8`, `fontSize: 14px`, italic
- Left panel: two factor trees for 60 appear side by side (the two different decompositions from the hook), both with the same prime leaves highlighted and the same equation below each
- The equations pulse simultaneously: "Same primes, same exponents. Always." in `#fbbf24`, `fontSize: 14px`

### Symbol Bridge -- Accessibility

- Each notation block has `role="math"` with `aria-label` containing the spoken equivalent
- Prime definition: "A number p is prime if its only factors are 1 and p"
- Composite definition: "A number n is composite if it has factors other than 1 and n"
- Prime factorization: "60 equals 2 squared times 3 times 5"
- Fundamental theorem: "Every whole number greater than 1 is either prime or can be written as a unique product of primes"
- Connecting lines: `aria-hidden="true"` (decorative)
- Factor tree: same `role="tree"` structure as Stage 2
- Reduced motion: merge animation becomes instant swap. Connecting lines appear instantly. Word-by-word reveal becomes full-text fade-in.

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

**Example 1: Secret Codes & Online Safety**

- Accent color: `#818cf8` (indigo-400)
- Icon: lock/shield icon
- Title: "Your Passwords Are Protected by Primes"
- Body: "When you log into a website, your password is protected using two giant prime numbers multiplied together. It's easy to multiply two primes -- but incredibly hard to figure out which two primes were used! This is called RSA encryption, and it keeps your data safe."
- Key phrases highlighted: "easy to multiply" in `#34d399`, "incredibly hard to figure out" in `#fb7185`
- Mini-visualization: Two prime nodes ("p" and "q" in amber glow) with a multiply sign between them, an arrow pointing to a large composite "p x q" node (indigo glow). A reverse arrow from "p x q" back to "p" and "q" is shown as a dashed, broken line with a red X, labeled "Hard!" in `#fb7185`

**Example 2: Cicadas & Nature**

- Accent color: `#34d399` (emerald-400)
- Icon: bug/insect icon
- Title: "Why Cicadas Love Primes"
- Body: "Some cicadas emerge every 13 or 17 years -- both prime numbers! Scientists think this helps them avoid predators that appear on regular cycles (every 2, 3, or 4 years). Since 13 and 17 don't share factors with these cycles, the cicadas rarely meet their predators."
- Key phrases highlighted: "13 or 17 years" in `#fbbf24`, "don't share factors" in `#34d399`
- Mini-visualization: A circular timeline (like a clock face) with tick marks at years 1-17. Two overlapping cycles shown: a predator cycle (every 4 years, marked with `#fb7185` dots at 4, 8, 12, 16) and a cicada cycle (every 13 years, marked with `#34d399` dot at 13 only). The key insight: the dots never overlap within the range.

**Example 3: Music & Harmony**

- Accent color: `#a78bfa` (violet-400)
- Icon: music note icon
- Title: "Primes in Music"
- Body: "Musical rhythms that feel 'interesting' often use prime numbers. A pattern that repeats every 7 or 5 beats feels fresh because it doesn't line up neatly with the standard 4-beat measure. Jazz musicians love prime time signatures for exactly this reason!"
- Mini-visualization: Two beat bars stacked:
  - Top bar: 4-beat measure divided into 4 equal segments, labeled "Standard (4)" in `#94a3b8`. Beats shown as `#60a5fa` dots.
  - Bottom bar: 7-beat pattern divided into 7 equal segments, labeled "Prime (7)" in `#a78bfa`. Beats shown as `#a78bfa` dots.
  - A vertical dashed line at beat positions shows how the patterns rarely align -- the downbeats only sync every 28 beats (LCM of 4 and 7).

### Real-World Anchor -- Accessibility

- Each card: `role="article"` with heading and description
- Mini-visualizations: `role="img"` with detailed `aria-label` descriptions
  - Encryption: "Two prime numbers p and q multiply easily into p times q, but reversing the process is extremely difficult"
  - Cicadas: "Timeline showing predator cycle every 4 years and cicada cycle every 13 years, demonstrating they rarely overlap"
  - Music: "Two beat patterns showing standard 4-beat measure and prime 7-beat pattern that rarely align"
- Reduced motion: slide-in becomes fade-in (200ms). Timeline and beat animations become instant.

---

## Stage 6: Practice (9 problems)

### Problem Set Design

Problems are organized into three layers per the data model (layer 0 = recall, layer 1 = procedure, layer 2 = understanding). The IRT-based problem selector chooses from this bank, but the lesson guarantees exposure to all three layers.

**Problem selection logic**: Start with 2 recall, then 2 procedure, then 1 understanding. Remaining 4 are adaptive (IRT selects based on estimated ability). If the student struggles (2+ incorrect in a row), insert an easier problem. If they excel (3+ correct in a row with high confidence), skip to understanding layer.

---

### Recall Layer (Layer 0)

**Problem R1: Identify the Primes**

- Type: `multi-select`
- Prompt: "Which of these numbers are prime? Select ALL the primes."
- Input: grid of 8 number buttons arranged in 2 rows of 4:
  - Numbers displayed: 2, 9, 11, 15, 17, 21, 23, 27
  - Each button: 64x56px, `borderRadius: 10px`, `fill: #1e293b`, `stroke: #334155`, number text centered, `fontSize: 20px`, `fill: #e2e8f0`
  - Selected state: `fill: #818cf820`, `stroke: #818cf8`, text `fill: #818cf8`
  - Wrong-but-selected (on submit): `fill: #fb718520`, `stroke: #fb7185`
  - Missed-prime (on submit): `stroke: #34d399`, pulse animation
- Correct answer: {2, 11, 17, 23}
- Visualization after submission: a mini sieve row highlighting 2, 11, 17, 23 in amber glow; the composites (9, 15, 21, 27) show brief factor annotations: "9 = 3x3", "15 = 3x5", "21 = 3x7", "27 = 3x9"
- Common errors:
  - Including 9: feedback "9 seems prime, but 3 x 3 = 9 -- it has factors other than 1 and itself!"
  - Including 15: feedback "15 = 3 x 5, so 15 is composite."
  - Missing 2: feedback "2 is prime! It's the only even prime -- its only factors are 1 and 2."
  - Including 27: feedback "27 = 3 x 9 = 3 x 3 x 3. It has several factors beyond 1 and 27."

**Problem R2: Is This Number Prime?**

- Type: `true-false`
- Prompt: "Is 51 prime?"
- Input: two large buttons, "Prime" and "Not Prime", each 120x56px
  - "Prime": `fill: #fbbf2420`, `stroke: #fbbf24`, text "Prime" in `#fbbf24`
  - "Not Prime": `fill: #818cf820`, `stroke: #818cf8`, text "Not Prime" in `#818cf8`
- Correct answer: Not Prime (51 = 3 x 17)
- Visualization on answer: mini factor tree: 51 -> 3 x 17, both leaves amber
- Feedback (correct): "Right! 51 = 3 x 17. The digit sum 5 + 1 = 6 is divisible by 3, so 51 is divisible by 3."
- Feedback (incorrect): "Tricky one! 51 looks prime, but 5 + 1 = 6, which is divisible by 3. So 51 / 3 = 17. 51 = 3 x 17."
- Common trap: students assume 51 is prime because it "looks" odd and non-obvious

**Problem R3: What Is the Definition of a Prime Number?**

- Type: `multiple-choice`
- Prompt: "Which statement BEST describes a prime number?"
- Options (tap to select, only one):
  - A: "A number that is odd" -- `incorrect`
  - B: "A number with exactly two factors: 1 and itself" -- `correct`
  - C: "A number that can't be divided by anything" -- `incorrect`
  - D: "A number less than 100" -- `incorrect`
- Each option: full-width card, `fill: #1e293b`, `borderRadius: 10px`, `padding: 14px 18px`, text `fill: #e2e8f0`, `fontSize: 15px`
- Selected state: `stroke: #818cf8`, `fill: #1e293b`
- Correct (B): `stroke: #34d399`, `fill: #34d39910`, checkmark icon
- Incorrect: `stroke: #94a3b8`, selected option shakes gently (translateX oscillation, 3 cycles, 300ms)
- Feedback for wrong answers:
  - A: "2 is even and prime! And 9 is odd but not prime (9 = 3 x 3). Being odd doesn't make a number prime."
  - C: "Every number can be divided by 1 and itself. Primes are special because ONLY 1 and themselves divide them."
  - D: "Primes go on forever! 101, 103, 107... are all prime and bigger than 100."

---

### Procedure Layer (Layer 1)

**Problem P1: Build a Factor Tree**

- Type: `interactive-factor-tree`
- Prompt: "Build the prime factorization of 48 using the factor tree."
- Input: interactive factor tree (same UI as Phase B of Stage 2)
  - Root node: 48
  - Valid splits for 48: `[2 x 24]`, `[3 x 16]`, `[4 x 12]`, `[6 x 8]`
  - The student must keep splitting until all leaves are prime
  - ANY valid decomposition path is accepted
- Correct answer: `48 = 2^4 x 3` (i.e., prime leaves are 2, 2, 2, 2, 3 in any arrangement)
- Validation: on tree completion, collect all leaf values, sort, and compare to [2, 2, 2, 2, 3]
- Visualization: completed tree with all prime leaves glowing amber, equation `"48 = 2^4 \\times 3"` appears below
- Feedback: "Great job! No matter which splits you chose, the prime factors are always 2, 2, 2, 2, and 3."

**Problem P2: Find the Prime Factorization**

- Type: `drag-arrange`
- Prompt: "Arrange the prime factors to show the prime factorization of 90."
- Input: a set of draggable prime-factor tiles and a drop zone
  - Available tiles (jumbled): 2, 3, 3, 5, 7, 2 (includes 2 distractors: an extra "2" and "7")
  - Drop zone: a horizontal row of slots separated by "x" symbols
  - Student drags tiles into the slots to build: `2 x 3 x 3 x 5`
  - Tile styling: rounded rect, `fill: #fbbf2420`, `stroke: #fbbf24`, `fontSize: 18px`, `fontWeight: 600`, 48x48px
  - Drop zone slots: dashed border `#334155`, 52x52px
  - Invalid placement (too many or wrong product): slot briefly flashes `#fb7185`, tile bounces back
  - @use-gesture/react `useDrag` for tile dragging
- Correct answer: tiles 2, 3, 3, 5 in the slots (order doesn't matter -- validation checks sorted arrays)
- Visualization: mini factor tree for 90 appears: 90 -> 9 x 10 -> 3 x 3 x 2 x 5
- Feedback: "90 = 2 x 3 x 3 x 5 = 2 x 3^2 x 5. The extra 2 and 7 were distractors -- 7 is not a factor of 90!"

**Problem P3: Sieve Step**

- Type: `tap-to-select`
- Prompt: "On this mini number grid (1-30), cross out all multiples of 3 (except 3 itself). Then identify which remaining numbers are prime."
- Input: a 5x6 mini grid (numbers 1-30)
  - Phase 1: student taps multiples of 3 to cross them out (6, 9, 12, 15, 18, 21, 24, 27, 30)
  - Phase 2: after crossing out, student taps numbers they think are prime among the survivors
  - Grid cell styling: same as sieve in Stage 2 but smaller (28x28px cells)
- Correct primes from survivors: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
- Validation: phase 1 checks if correct multiples of 3 are crossed; phase 2 checks prime identification
- Feedback: "Note that some numbers like 4 and 8 survived crossing out 3's multiples but still aren't prime -- they're multiples of 2! A full sieve would cross those out too."

---

### Understanding Layer (Layer 2)

**Problem U1: Why Is 1 Not Prime?**

- Type: `multiple-choice`
- Prompt: "If we DID count 1 as prime, the Fundamental Theorem of Arithmetic would break. Why?"
- Options:
  - A: "Because 1 x 1 x 1 = 1 means infinite factorizations" -- close but not complete
  - B: "Because you could write 12 = 1 x 2 x 2 x 3, or 12 = 1 x 1 x 2 x 2 x 3, making factorization NOT unique" -- `correct`
  - C: "Because 1 is too small to be useful" -- `incorrect`
  - D: "Because 1 is even" -- `incorrect` (also factually wrong)
- Feedback (B correct): "Exactly! If 1 were prime, you could stick any number of 1s into a factorization, and the 'unique decomposition' property would vanish. Mathematicians chose to exclude 1 to preserve this beautiful theorem."
- Feedback (A): "You're on the right track with the infinite 1s, but the key issue is about uniqueness -- option B states it more precisely."
- Feedback (C): "Size doesn't determine primality -- 2 is small and it's prime! The real reason is about keeping factorization unique."
- Feedback (D): "1 is actually odd! But more importantly, the reason 1 isn't prime is about uniqueness of factorization."
- Visualization: show `12 = 2^2 x 3` (unique), then show crossed-out `12 = 1 x 2^2 x 3 = 1 x 1 x 2^2 x 3 = ...` with a red "NOT UNIQUE!" label

**Problem U2: Comparing Factorizations**

- Type: `multiple-choice`
- Prompt: "The prime factorization of 72 is 2^3 x 3^2. The prime factorization of 75 is 3 x 5^2. What do these numbers have in common?"
- Options:
  - A: "They share the prime factor 3" -- `correct`
  - B: "They are both prime" -- `incorrect`
  - C: "They have the same number of prime factors" -- `incorrect`
  - D: "Nothing -- they share no factors" -- `incorrect`
- Feedback (A correct): "Yes! Both 72 and 75 have 3 as a prime factor. This means 3 divides both numbers (72 / 3 = 24, 75 / 3 = 25). In fact, the GCF of 72 and 75 is 3!"
- Feedback (B): "72 and 75 are both much larger than their prime factors, and they're divisible by smaller numbers, so they're composite."
- Feedback (C): "Count them: 72 = 2 x 2 x 2 x 3 x 3 has 5 prime factors (with repeats), while 75 = 3 x 5 x 5 has 3."
- Feedback (D): "Look at the factorizations carefully -- do you see any prime that appears in BOTH?"
- Visualization: two factor trees side by side (72 and 75) with the shared "3" leaf highlighted in both trees with a connecting line between them

**Problem U3: Largest Prime Factor**

- Type: `numeric-input`
- Prompt: "What is the LARGEST prime factor of 84?"
- Input: single number input field, `width: 80px`, centered, `fontSize: 24px`, `borderRadius: 8px`, `border: 2px solid #334155`
  - On focus: `border-color: #818cf8`
  - Numeric keyboard on mobile (inputMode="numeric")
- Correct answer: 7 (84 = 2^2 x 3 x 7)
- Feedback (correct): "84 = 2 x 2 x 3 x 7. The prime factors are 2, 3, and 7. The largest is 7!"
- Feedback (incorrect, common errors):
  - 84: "84 itself isn't prime -- it can be broken down further. Try building a factor tree!"
  - 42: "42 is a factor of 84 (84 = 2 x 42), but 42 isn't prime either (42 = 2 x 3 x 7). Keep splitting!"
  - 12: "12 is not a factor of 84. The factors of 84 are 1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84. Wait -- 12 IS a factor! But it's not prime. The question asks for the largest PRIME factor."
  - 3: "3 is a prime factor of 84, but it's not the largest one. 84 = 2 x 2 x 3 x 7. What's bigger than 3 in that list?"
- Visualization: factor tree for 84: 84 -> 4 x 21 -> 2 x 2 x 3 x 7, with "7" leaf pulsing with amber glow and a "Largest!" label

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
- Multi-select grids: `role="group"` with `role="checkbox"` per option
- Multiple-choice: `role="radiogroup"` with `role="radio"` per option
- TRUE/FALSE buttons: `role="radiogroup"` with two `role="radio"` items
- Numeric input: `<input type="text" inputMode="numeric">` with `aria-label`
- Drag tiles: `role="listbox"` source, `role="listbox"` destination, with `aria-grabbed` and `aria-dropeffect`
- Factor tree: same `role="tree"` structure as Stage 2
- Feedback announcements: `aria-live="assertive"` for correct/incorrect
- Submit button: `aria-disabled` when no answer selected
- Layer indicator dot: `aria-hidden="true"` (decorative)

### Practice -- Interleaving (PF-5)

Problems are NOT presented in a blocked sequence. The IRT selector interleaves NT-2.2 problems with review problems from the prerequisite (NT-2.1 Factors & Multiples) if the student has prior review items due. In a first-time lesson context (no prior reviews), all 9 problems are from NT-2.2 but are interleaved across the three layers rather than grouped by layer.

---

## Stage 7: Reflection (approximately 1 minute)

### Reflection Prompt

**Card styling**: same as Guided Discovery cards, but with a golden left accent bar (`#fbbf24`) to signal this is a reflection moment.

**Prompt text**:
> "Imagine explaining to a friend why prime numbers are called the 'building blocks' or 'atoms' of math. What would you say?"

**Input**: text area
- `minHeight: 120px`, `maxHeight: 300px` (auto-expands)
- Placeholder: "I'd tell my friend that..."
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
| 1 | Vaguely on topic but no real insight ("primes are important") | 16 |
| 2 | Shows basic understanding (mentions primes can't be broken down) | 32 |
| 3 | Good explanation with spatial/structural reasoning (factor trees, building blocks metaphor) | 48 |
| 4 | Strong explanation connecting multiple concepts (uniqueness, every number decomposes, atoms analogy) | 64 |
| 5 | Exceptional: original insight, analogy, or extension beyond the lesson (e.g., connects to encryption, infinite primes) | 80 |

**Feedback display**:
1. Brief "thinking" animation: three dots pulsing (`opacity: 0.3 <-> 1.0`, 400ms cycle), 1-2 seconds while AI processes
2. AI feedback appears below the text area:
   - Container: `fill: #1e293b`, `borderRadius: 12px`, `padding: 16px`, `border: 1px solid #334155`
   - Left icon: small brain/lightbulb icon in `#fbbf24`
   - Text: AI's response in `#cbd5e1`, `fontSize: 15px`
   - Example feedback (score 3): "Great thinking! You explained that primes can't be split into smaller factors, just like atoms can't be split into simpler substances. You might also think about WHY this matters -- every number's prime factorization is unique, like a mathematical fingerprint!"
3. XP award: "+48 XP: Reflection" floats up, same styling as other XP awards
4. If `ahaDetected` is true: trigger the "Aha Moment" celebration (see gamification design -- Neuron Flash, brief neural network animation)
5. If `referencesPriorConcept` is true (e.g., mentions factors, rectangles from NT-2.1): "+1.3x Connection Maker" multiplier text appears briefly

### Reflection -- Accessibility

- Text area: standard accessible `<textarea>` with `aria-label="Write your reflection explaining why prime numbers are the building blocks of math"`
- Submit button: `aria-disabled` when under minimum character count, with `aria-describedby` explaining the requirement
- Skip button: `aria-label="Skip reflection"`, no `aria-hidden`
- AI feedback: `aria-live="polite"` region
- XP notification: `aria-live="polite"`

---

## Content Files Structure

This lesson produces the following content files per the project structure:

```
src/content/domains/number-theory/NT-2.2/
  lesson.mdx          # 7-stage content with prose, prompts, stage markers
  animations.json      # MathScene configs for hook, sieve, factor tree, symbol bridge
  problems.json        # Practice problem bank (9+ problems with metadata)
  meta.json            # Prerequisites, successors, hooks, metadata
```

### meta.json

```json
{
  "id": "NT-2.2",
  "name": "Prime Numbers",
  "domain": "number-theory",
  "gradeLevel": 6,
  "contentPath": "number-theory/NT-2.2",
  "prerequisites": ["NT-2.1"],
  "successors": ["NT-2.2a", "NT-2.3"],
  "hook": "Every number has a secret code -- 60 splits into 2x2x3x5 no matter how you break it down. But 7? It can't be split at all.",
  "estimatedDurationMinutes": 20,
  "tags": ["prime", "composite", "sieve", "eratosthenes", "factor-tree", "prime-factorization", "fundamental-theorem", "building-blocks"],
  "interactionMinimum": 20,
  "spatialModel": "sieve-grid",
  "secondarySpatialModel": "factor-tree",
  "coreVisualization": "sieve-of-eratosthenes"
}
```

---

## Technical Specifications

### SVG Rendering Pipeline

All visuals in this lesson use the SVG renderer (`renderer: "svg"`). No WebGL/R3F required -- all content is 2D.

**Sieve grid rendering**:
- Element: 100 `<rect>` + 100 `<text>` pairs wrapped in `motion.rect` and `motion.text`
- Cross-out lines: 2 `<line>` elements per crossed cell (diagonal), or a single `<path>` for optimization
- Props animated via Framer Motion `animate` prop: `fill`, `stroke`, `opacity`, `scale`
- GPU compositing: Framer Motion uses `transform` and `opacity` for cell interactions. Fill/stroke color transitions use CSS transition fallback.
- Filter effects (glow on prime cells): applied via SVG `<filter>` elements defined once in `<defs>`, referenced by ID. Only active on ~25 prime cells.

**Factor tree rendering**:
- Nodes: `<rect>` + `<text>` pairs with `motion.rect` and `motion.text`
- Branches: `<line>` elements with `motion.line`, animated via dash-offset for draw effect
- Layout computed dynamically per tree depth and breadth (see layout algorithm in Stage 2)

**Responsive viewBox**:
- Mobile (width < 640px): `viewBox="0 0 360 520"` (portrait, taller for sieve grid)
- Tablet (640-1024px): `viewBox="0 0 600 500"` (landscape-ish)
- Desktop (>1024px): `viewBox="0 0 800 600"` (wide)
- `preserveAspectRatio="xMidYMid meet"` ensures content scales without distortion
- Sieve cell size scales with viewBox: `cellSize = (viewBoxWidth - 40) / 10` (10 columns with 20px total margin)

### Animation System

**Spring configurations used in this lesson**:

| Name | Usage | Damping | Stiffness | Mass |
|------|-------|---------|-----------|------|
| `snapSpring` | Cell cross-out, node snapping | 25 | 400 | 1 |
| `gentleSpring` | UI element entry, card animations, cascade reveals | 20 | 300 | 1 |
| `bouncySpring` | Prime reveal celebration, factor discovery, Aha moments | 15 | 350 | 1 |
| `quickSpring` | Cell tap feedback, hover effects, small UI | 30 | 500 | 0.8 |
| `treeSpring` | Branch drawing, node splitting | 22 | 350 | 1 |

**Easing curves** (for non-spring animations):

| Name | CSS Equivalent | Usage |
|------|---------------|-------|
| `easeOut` | `cubic-bezier(0, 0, 0.2, 1)` | Fade-ins, labels appearing |
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` | Sequential cell highlighting |
| `easeOutBack` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Surprise/wonder annotations, theorem reveal |

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `prime-glow` | `#fbbf24` (amber-400) | Prime numbers, key revelations, theorem box, wonder moments |
| `prime-bg` | `#fbbf2420` (amber 12%) | Prime cell background, prime node fill |
| `composite` | `#818cf8` (indigo-400) | Revealed primes in sieve (after completion), general accents |
| `composite-bg` | `#818cf830` (indigo 20%) | Revealed prime cell background |
| `crossed-out` | `#fb718560` (rose 40%) | Cross-out lines on composite cells |
| `valid` | `#34d399` (emerald-400) | Correct answers, composite label, nature example |
| `invalid` | `#fb7185` (rose-400) | Incorrect taps, wrong answers, "hard to reverse" |
| `text-primary` | `#f1f5f9` (slate-100) | Headings, primary text |
| `text-secondary` | `#e2e8f0` (slate-200) | Body text, KaTeX, number text in grid |
| `text-muted` | `#94a3b8` (slate-400) | Annotations, hints, secondary labels |
| `text-dim` | `#64748b` (slate-500) | Character counts, metadata, problem indicators |
| `text-dimmer` | `#475569` (slate-600) | Crossed-out cell numbers, cell 1 |
| `surface` | `#1e293b` (slate-800) | Card backgrounds, cell backgrounds, node fills |
| `surface-deep` | `#0f172a` (slate-950) | Problem card background, crossed-out cell background |
| `border` | `#334155` (slate-700) | Card borders, cell borders, dividers |
| `branch` | `#475569` (slate-600) | Tree branch lines |
| `violet-accent` | `#a78bfa` (violet-400) | Procedure layer indicator, music example |
| `blue-info` | `#60a5fa` (blue-400) | Recall layer indicator, standard beat dots |

All color combinations meet WCAG 2.1 AA contrast ratios against their respective backgrounds:
- `text-primary` on `surface`: 11.7:1 (AAA)
- `text-secondary` on `surface`: 9.5:1 (AAA)
- `prime-glow` on `surface`: 8.1:1 (AAA)
- `prime-glow` on `surface-deep`: 9.4:1 (AAA)
- `composite` on `surface-deep`: 6.2:1 (AA)
- `valid` on `surface`: 7.4:1 (AAA)
- `invalid` on `surface`: 5.8:1 (AA)

### Gesture Configuration (@use-gesture/react)

```typescript
// Factor tree split picker -- no drag needed, tap only
// Factor tree tile drag (Practice P2) configuration
const dragConfig: UserDragConfig = {
  filterTaps: true,           // Distinguish taps from drags
  threshold: 5,               // 5px movement before drag starts
  rubberband: 0.15,           // Slight rubber-band at boundaries
  pointer: {
    touch: true,              // Enable touch support
    mouse: true,              // Enable mouse support
  },
  eventOptions: { passive: false },
};

const SNAP_THRESHOLD_PX = 12; // Snap tiles into drop zones within 12px
```

**Touch handling**:
- Sieve: single tap to cross out cells. No drag needed.
- Factor tree (Stage 2): single tap on composite node to open split picker, tap to select split
- Factor tree practice (P1): same tap mechanic
- Drag practice (P2): single-finger drag for tiles. `@use-gesture/react` `useDrag`.
- Long press (500ms) on sieve cell: show tooltip with factor information
- No pinch/zoom needed for this lesson

### Sound Design

| Event | Sound | File | Duration | Volume |
|-------|-------|------|----------|--------|
| Hook tree branch | Soft wooden click | `sfx/branch-click.mp3` | 150ms | 30% |
| Hook prime reveal | Two-note ascending chime (major 3rd) | `sfx/discover-chime.mp3` | 250ms | 40% |
| Hook "aha" chord | Bright major triad | `sfx/aha-chord.mp3` | 400ms | 45% |
| Hook wonder chord (7) | Suspended 4th -> major | `sfx/wonder-chord.mp3` | 500ms | 40% |
| Hook mysterious chime | Sustained single note | `sfx/mystery-chime.mp3` | 300ms | 25% |
| Sieve cell cross-out | Soft tap/click | `sfx/cell-tap.mp3` | 80ms | 25% |
| Sieve "not prime" warning | Gentle "hmm" tone | `sfx/hmm-question.mp3` | 150ms | 20% |
| Sieve step complete | Bright chime | `sfx/step-chime.mp3` | 200ms | 35% |
| Sieve all primes revealed | Celebration chord | `sfx/celebrate-chord.mp3` | 600ms | 50% |
| Tree node split | Branch snap | `sfx/branch-click.mp3` | 150ms | 30% |
| Tree completion | Aha chord | `sfx/aha-chord.mp3` | 400ms | 45% |
| Correct answer | Sine wave + click | `sfx/correct-click.mp3` | 200ms | 40% |
| Incorrect answer | Soft low tone | `sfx/soft-low.mp3` | 300ms | 30% |

All sounds are:
- Optional (sound toggle in profile settings, `soundEnabled` in Student model)
- Short (<1s) to avoid overlap
- Non-startling (no sudden loud sounds -- PF-6)
- Loaded lazily (not part of initial bundle)
- Compressed: MP3 at 64kbps mono (each file <10KB)

### Mobile-Specific Adaptations

| Feature | Mobile (<640px) | Desktop (>1024px) |
|---------|----------------|-------------------|
| Layout | Vertical stack: instruction -> grid/tree -> stats | Grid/tree on left, stats/picks on right sidebar |
| Sieve cell size | ~32x32px (fills 360px width) | ~44x44px (comfortable spacing) |
| Tree node size | `fontSize: 18px` in nodes | `fontSize: 22px` in nodes |
| Touch targets | 48px minimum (all buttons) | 44px minimum |
| Split picker | Horizontal scrollable row below tree | Dropdown beside the tapped node |
| Problem cards | Full-width, stacked vertically | 640px max-width, centered |
| Factor tree practice | Vertical scrolling if tree exceeds viewport | Full tree visible without scroll |
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
- Sieve computation: pure client-side (no server calls for crossing out multiples)
- Factor tree splits: precomputed client-side (no server calls)
- AI tutor (Stage 3 micro-checks): falls back to scripted responses if offline
- AI evaluation (Stage 7 reflection): queued for sync when online; immediate local feedback shows "Your reflection has been saved. We'll give you detailed feedback when you're back online."
- XP events: queued in Dexie.js IndexedDB, synced on reconnection

### i18n (DR-7)

All user-facing strings in this lesson are externalized. Key entries in `src/lib/i18n/messages/en.json`:

```json
{
  "lesson.nt22.hook.secretCode": "Every number has a secret code...",
  "lesson.nt22.hook.whatIfDifferent": "What if we split differently?",
  "lesson.nt22.hook.samePrimes": "Same primes! No matter how you split it.",
  "lesson.nt22.hook.cantSplit": "7 can't be split.",
  "lesson.nt22.hook.isBuildingBlock": "It IS the building block.",
  "lesson.nt22.hook.continue": "Discover the atoms of math",
  "lesson.nt22.sieve.instruction2": "2 is prime! Tap all the multiples of 2 to cross them out.",
  "lesson.nt22.sieve.instruction3": "Now 3! Tap the multiples of 3 that aren't already crossed out.",
  "lesson.nt22.sieve.instruction5": "Now 5! Cross out the remaining multiples of 5.",
  "lesson.nt22.sieve.instruction7": "Almost done! Cross out the multiples of 7.",
  "lesson.nt22.sieve.oneSpecial": "1 is special -- it's neither prime nor composite.",
  "lesson.nt22.sieve.notPrime": "This one has no smaller factors -- it might be prime!",
  "lesson.nt22.sieve.keepPrime": "That's the prime itself -- we keep it!",
  "lesson.nt22.sieve.alreadyCrossed": "Already crossed out! It was a multiple of {prime} too.",
  "lesson.nt22.sieve.crossOutRest": "Cross out remaining multiples of {prime}",
  "lesson.nt22.sieve.sqrtExplanation": "After 7, do we need to keep going? The next prime is 11, but 11 x 11 = 121 > 100. So we've already found ALL primes up to 100!",
  "lesson.nt22.sieve.primesFound": "25 primes between 1 and 100!",
  "lesson.nt22.tree.instruction": "Tap a number to split it into factors!",
  "lesson.nt22.tree.isPrime": "This is prime -- it can't be split further!",
  "lesson.nt22.tree.buildingBlocks": "The building blocks of {number}!",
  "lesson.nt22.tree.nowTry": "Now try {number}!",
  "lesson.nt22.tree.perfectSquare": "A perfect square! And both {factor}s break down the same way.",
  "lesson.nt22.tree.continue": "Ready to discover the patterns?",
  "lesson.nt22.guided.prompt1": "Look at the sieve. The numbers that survived -- {primeList} -- are called {primeHighlight}. They have exactly {twoFactors}: 1 and themselves.",
  "lesson.nt22.guided.prompt2": "You might wonder: why not 1? Here's the key: primes must have {exactlyTwo}. 1 only has {oneFactor} -- itself.",
  "lesson.nt22.guided.prompt3.question": "Is every odd number prime?",
  "lesson.nt22.guided.prompt3.yes": "Yes",
  "lesson.nt22.guided.prompt3.no": "No",
  "lesson.nt22.guided.prompt4": "Look at the gaps between primes... The gaps {jumpAround}. Mathematicians have been trying to find a pattern for thousands of years!",
  "lesson.nt22.guided.prompt5": "Will primes ever run out? {no}! There are {infinitelyMany}. Even past 1,000,000,000... there's always another prime.",
  "lesson.nt22.guided.prompt6": "To check if a number is prime, you only need to test divisors up to its {squareRoot}.",
  "lesson.nt22.guided.transition": "Now let's connect what you discovered to proper math notation.",
  "lesson.nt22.symbol.primeDef": "p is prime if its only factors are 1 and p",
  "lesson.nt22.symbol.compositeDef": "n is composite if it has factors other than 1 and n",
  "lesson.nt22.symbol.fundamentalTheorem": "Every whole number > 1 is either prime or can be written as a unique product of primes.",
  "lesson.nt22.symbol.mostImportant": "This is one of the most important facts in all of mathematics!",
  "lesson.nt22.realworld.encryption.title": "Your Passwords Are Protected by Primes",
  "lesson.nt22.realworld.cicadas.title": "Why Cicadas Love Primes",
  "lesson.nt22.realworld.music.title": "Primes in Music",
  "lesson.nt22.practice.checkAnswer": "Check Answer",
  "lesson.nt22.practice.notQuite": "Not quite -- let's think about this...",
  "lesson.nt22.reflection.prompt": "Imagine explaining to a friend why prime numbers are called the 'building blocks' or 'atoms' of math. What would you say?",
  "lesson.nt22.reflection.placeholder": "I'd tell my friend that...",
  "lesson.nt22.reflection.submit": "Share My Thinking",
  "lesson.nt22.reflection.skip": "Skip"
}
```

Mathematical notation strings (KaTeX) are NOT externalized -- mathematical notation is universal across locales (CP-VII, DR-7 rationale).

---

## XP & Gamification Integration

### XP Breakdown for Full Lesson Completion

| Source | Amount | Condition |
|--------|--------|-----------|
| Lesson completion (base) | 100 | Complete all 7 NLS stages |
| Sieve exploration bonus | 20-40 | Based on manual crossing thoroughness. 20 for using auto-complete early, 40 for manually crossing majority of cells. |
| Factor tree bonus | 15-30 | 15 per tree completed. 30 for completing both (60 and 36). |
| Guided discovery insight | 20 | Correctly answered "Is every odd number prime?" micro-check on first attempt |
| Practice completion | 50 | Completed all 9 practice problems |
| Reflection quality | 0-80 | AI-evaluated score x 16 (0-5 scale -> 0-80 XP) |
| **Total range** | **205-320** | **Typical: ~260 XP** |

### Multipliers (applied to total)

| Multiplier | Value | Trigger |
|------------|-------|---------|
| Deep Dive | 1.5x | >1 min additional exploration in sieve beyond required crossings (trying to understand patterns) |
| Connection Maker | 1.3x | Reflection references Factors & Multiples (NT-2.1), rectangles, or connects to real-world applications |
| Struggle Bonus | 1.4x | Got 2+ wrong in practice -> retried -> explained correctly |
| First Try Clarity | 1.2x | First reflection attempt rated >= 4/5 |
| Sieve Master | 1.2x | Completed all sieve steps without incorrectly tapping any prime number |

### Achievement Triggers

| Achievement | Category | Trigger in This Lesson |
|-------------|----------|----------------------|
| First Light | Exploration (Common) | Complete this lesson (if it's the student's first) |
| Atom Splitter | Exploration (Uncommon) | Complete both factor trees without using hints |
| Solid Ground | Mastery (Common) | Score 90%+ on practice with high explanation quality |
| Second Wind | Persistence (Common) | Get wrong -> review -> solve harder version |
| Sieve Savant | Creativity (Uncommon) | Complete the sieve with zero incorrect taps on prime cells |
| Prime Detective | Mastery (Uncommon) | Correctly identify 51 as composite in Problem R2 on first try |

---

## AI Tutor Integration

### Tutor Availability

The AI tutor (TutorPanel, bottom sheet) is available throughout all stages except the Hook. The tutor's behavior adapts per stage:

| Stage | Tutor Mode | Behavior |
|-------|-----------|----------|
| Hook | Unavailable | Tutor panel hidden during hook animation |
| Spatial (Sieve) | Socratic hints | If student is stuck (no crossing for 30s), tutor offers: "Which numbers can be divided by [current prime]? Try counting by [current prime]s!" Never gives specific cells. |
| Spatial (Tree) | Socratic hints | If student hasn't tapped a composite node for 20s: "Tap one of the numbers that isn't glowing amber -- can it be split further?" |
| Guided Discovery | Socratic dialogue | Responds to student questions about prompts. Can elaborate on "Why isn't 1 prime?" or "What is the square root?" |
| Symbol Bridge | Socratic + direct | Answers notation questions directly ("What does the ^ symbol mean?" or "What are the curly braces for?") |
| Real-World Anchor | Conversational | Can discuss RSA encryption in more detail, other prime applications |
| Practice | Scaffolded hints | On incorrect answer, offers graduated hints (3 levels: gentle nudge, stronger hint, worked example). Each hint level adds 1 to `hintsUsed` counter. |
| Reflection | Encouraging | "What did the factor tree show you about how numbers are built?" prompts to deepen reflection. Never writes the reflection for the student. |

### Misconception Detection

Common misconceptions the AI tutor watches for in this lesson:

| Misconception | Detection Signal | Tutor Response |
|---------------|-----------------|----------------|
| "1 is prime" | Student marks 1 as prime in sieve or practice | "Great question! 1 only has one factor (itself), but primes need exactly two different factors: 1 AND the number. Since 1 only has one, it's in its own special category." |
| "All odd numbers are prime" | Marks odd composites (9, 15, 21, 25) as prime | "It's true that most primes are odd, but not all odd numbers are prime! Try 9 -- can you find two numbers that multiply to give 9? Hint: 3 x 3 = 9." |
| "There's a pattern to primes" | Student asks about predicting the next prime | "Mathematicians have been looking for a prime pattern for over 2,000 years! The gaps between primes seem random -- that's actually what makes them so useful in encryption." |
| "Prime means small" | Student claims large numbers can't be prime | "Primes get rarer as numbers get bigger, but they never stop! 97 is prime, 101 is prime, and even 7,919 is prime. There's always another one." |
| "Even numbers can't be prime" | Skips or excludes 2 | "2 is actually the FIRST prime! It has exactly two factors: 1 and 2. It's the only even prime -- every other even number is divisible by 2." |
| "Composite means the number is large" | Confuses composite with the number's size | "Composite just means a number has more than two factors. 4 is composite (1, 2, 4) even though it's small. And 97 is prime even though it's large!" |

### Scene Commands

The tutor can modify the MathScene to illustrate points:

```typescript
// Example: tutor shows why 9 is NOT prime via mini factor tree
const sceneCommands: SceneCommand[] = [
  {
    action: "create",
    object: {
      type: "group",
      id: "tutor-demo-9-tree",
      children: [
        // Root node: 9
        { type: "rect", id: "td-root", position: [100, 20], width: 40, height: 30, rx: 8,
          style: { fill: "#1e293b", stroke: "#818cf8", strokeWidth: 2 } },
        { type: "text", id: "td-root-text", position: [120, 35], text: "9",
          style: { fill: "#e2e8f0", fontSize: 20, fontWeight: 700, textAnchor: "middle" } },
        // Branch lines
        { type: "line", id: "td-branch-l", from: [100, 50], to: [60, 90],
          style: { stroke: "#475569", strokeWidth: 2 } },
        { type: "line", id: "td-branch-r", from: [140, 50], to: [180, 90],
          style: { stroke: "#475569", strokeWidth: 2 } },
        // Prime leaves: 3 and 3
        { type: "rect", id: "td-leaf-l", position: [40, 90], width: 40, height: 30, rx: 8,
          style: { fill: "#fbbf2420", stroke: "#fbbf24", strokeWidth: 2 } },
        { type: "text", id: "td-leaf-l-text", position: [60, 105], text: "3",
          style: { fill: "#fbbf24", fontSize: 20, fontWeight: 700, textAnchor: "middle" } },
        { type: "rect", id: "td-leaf-r", position: [160, 90], width: 40, height: 30, rx: 8,
          style: { fill: "#fbbf2420", stroke: "#fbbf24", strokeWidth: 2 } },
        { type: "text", id: "td-leaf-r-text", position: [180, 105], text: "3",
          style: { fill: "#fbbf24", fontSize: 20, fontWeight: 700, textAnchor: "middle" } }
      ]
    }
  },
  {
    action: "animate",
    sequence: {
      trigger: "auto",
      steps: [
        { action: "fadeIn", target: "tutor-demo-9-tree", duration: 0.5 }
      ]
    }
  }
];
```

---

## Testing Requirements

### Math Correctness Tests (DR-2)

```
tests/unit/math/prime-numbers.test.ts
```

| Test | Input | Expected Output | Type |
|------|-------|-----------------|------|
| `isPrime(2)` | 2 | true | Exact |
| `isPrime(1)` | 1 | false | Exact |
| `isPrime(0)` | 0 | false | Exact |
| `isPrime(7)` | 7 | true | Exact |
| `isPrime(9)` | 9 | false | Exact |
| `isPrime(51)` | 51 | false | Exact |
| `isPrime(97)` | 97 | true | Exact |
| `isPrime(100)` | 100 | false | Exact |
| `getPrimesUpTo(100)` | 100 | [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97] | Exact (25 primes) |
| `getPrimesUpTo(10)` | 10 | [2,3,5,7] | Exact |
| `getPrimesUpTo(1)` | 1 | [] | Exact |
| `primeFactorization(60)` | 60 | [2,2,3,5] | Exact (sorted) |
| `primeFactorization(48)` | 48 | [2,2,2,2,3] | Exact |
| `primeFactorization(36)` | 36 | [2,2,3,3] | Exact |
| `primeFactorization(7)` | 7 | [7] | Exact |
| `primeFactorization(1)` | 1 | [] | Exact |
| `primeFactorization(90)` | 90 | [2,3,3,5] | Exact |
| `primeFactorization(84)` | 84 | [2,2,3,7] | Exact |
| `getValidSplits(60)` | 60 | [[2,30],[3,20],[4,15],[5,12],[6,10]] | Exact (sorted, excludes 1xN, smaller first) |
| `getValidSplits(7)` | 7 | [] | Exact (no non-trivial splits for primes) |
| `getValidSplits(36)` | 36 | [[2,18],[3,12],[4,9],[6,6]] | Exact |
| `getMultiplesOf(2, 100)` | 2, 100 | [4,6,8,...,100] | Exact (excludes the prime itself) |
| `getMultiplesOf(3, 100)` | 3, 100 | [6,9,12,...,99] | Exact (excludes 3 itself) |
| `largestPrimeFactor(84)` | 84 | 7 | Exact |
| `largestPrimeFactor(100)` | 100 | 5 | Exact |

### Integration Tests

```
tests/integration/lesson-flow/nt-2.2.test.ts
```

- Stage progression: verify student cannot skip from Stage 1 to Stage 6
- Interaction minimum: verify Stage 2 requires 20 interactions (sieve + tree) before Continue appears
- Sieve correctness: verify crossing out all multiples of 2 correctly updates composites counter
- Sieve prime protection: verify tapping a prime cell does NOT cross it out
- Factor tree validation: verify completing a tree for 60 with any valid split path produces [2,2,3,5]
- Factor tree uniqueness: verify two different split paths for 60 yield identical sorted prime lists
- XP calculation: verify base + bonuses + multipliers match expected totals
- Offline queue: verify reflection submission queues correctly when offline

### E2E Tests (Playwright)

```
tests/e2e/lesson-nt-2.2.spec.ts
```

- Full lesson flow: hook -> sieve (cross multiples of 2,3,5,7) -> factor tree (build 60 and 36) -> guided -> symbol -> real-world -> practice (answer all 9) -> reflection -> lesson complete
- Sieve interaction: tap cells to cross out multiples, verify crossed state
- Sieve invalid tap: tap a prime cell, verify it bounces back without crossing out
- Factor tree: tap composite node, verify split picker appears, select a split, verify children appear
- Factor tree prime tap: tap a prime leaf, verify "can't split" tooltip
- Auto-complete: cross out 8+ multiples of 2, verify "Cross out the rest" button appears
- Practice P1 (interactive tree): build factor tree for 48, verify correct completion
- Accessibility: run axe-core on each stage, verify zero violations
- Performance: measure frame rate during sieve cascade reveal on simulated mid-range device

### Visual Regression (Storybook)

Each stage has a Storybook story for visual regression testing (DR-3):

```
src/components/lesson/stages/__stories__/
  NT-2.2-Hook.stories.tsx
  NT-2.2-SpatialExperience-Sieve.stories.tsx
  NT-2.2-SpatialExperience-FactorTree.stories.tsx
  NT-2.2-GuidedDiscovery.stories.tsx
  NT-2.2-SymbolBridge.stories.tsx
  NT-2.2-RealWorldAnchor.stories.tsx
  NT-2.2-Practice.stories.tsx
  NT-2.2-Reflection.stories.tsx
```

---

## Edge Cases & Error Handling

| Scenario | Handling |
|----------|---------|
| Student refreshes mid-lesson | `lesson.getLessonProgress` restores to the last completed stage. Within a stage, sieve progress (which cells crossed) is stored in sessionStorage. Factor tree progress is lost (acceptable -- trees are quick). |
| Student's device loses focus during hook animation | Animation pauses via `document.visibilitychange` listener. Resumes on focus. |
| Very slow device (<30fps during sieve cascade) | Detected via `useAdaptivePixelRatio` hook. Disable glow filters on prime cells, reduce cascade stagger to 0ms (instant reveal), disable confetti. |
| Student submits empty reflection | Submit button disabled below 20 characters. If somehow submitted empty (client validation bypassed), server returns score 0 with feedback "Try writing a sentence about what you learned!" |
| Student enters only "idk" or similar | AI evaluator scores 0, feedback is encouraging: "That's okay! Try thinking about what would happen if you tried to split 7 into smaller factors. Why can't you?" |
| Student taps wrong cell in sieve (prime cell) | Cell bounces back, gentle tooltip, no crossing. NOT counted as an error. |
| Student taps "1" on the sieve | Tooltip reminds: "1 is neither prime nor composite." No state change. |
| Auto-complete pressed very early (before 8 crossings) | Auto-complete only appears after 8 manual crossings for the current prime step. Cannot be pressed early. |
| Factor tree for a prime number attempted | This shouldn't happen in the guided flow (60 and 36 are composite). If somehow triggered, the root node is immediately styled as prime with tooltip: "This number is already prime -- no splitting needed!" |
| Large factor tree overflows mobile viewport | Tree scales down (smaller nodes). If still too large, vertical scroll enabled with the most recent split scrolled into view. Minimum node font: 14px. |
| Network error during reflection submit | Queued in Dexie.js. UI shows "Saved locally -- we'll sync when you're back online." Full local XP calculation applied immediately (optimistic). |
| AI tutor rate-limited | Fallback to scripted hints (pre-authored in `problems.json`). Scripted hints cover the 6 most common misconceptions. |
| Student attempts to cross out a number higher than current prime squared | This is valid and works normally. The sqrt optimization is explained in Discovery but not enforced in the sieve interaction. |

---

## Lesson Review Checklist (DR-3)

### Technical Review

- [ ] All animations render at 60fps on iPhone SE 2nd gen (A13 Bionic)
- [ ] SVG element count never exceeds 350 in any stage (sieve is the highest at ~300)
- [ ] All touch targets >= 44px (measured, not estimated). Sieve cells on smallest mobile are >= 32px visible but with extended tap tolerance to 44px.
- [ ] Color contrast ratios verified (WCAG 2.1 AA minimum)
- [ ] Keyboard navigation works through all 7 stages
- [ ] Screen reader announces all state changes (sieve crossings, tree splits, prime reveals)
- [ ] `prefers-reduced-motion` respected in all animations
- [ ] Offline mode: all stages except AI features work without network
- [ ] All strings externalized to en.json
- [ ] No `any` types in lesson components (DR-1)
- [ ] Math correctness tests pass (DR-2)
- [ ] `textAnchor` attributes use `"middle" as const` pattern

### Pedagogical Review

- [ ] NLS stages follow correct order (1-7, no skipping)
- [ ] No formulas/notation before Stage 4 (CP-II)
- [ ] Spatial experience has >= 2 interactive manipulation steps (sieve + tree) (PF-3)
- [ ] Practice problems interleaved, not blocked (PF-5)
- [ ] No timer pressure anywhere (PF-6)
- [ ] Wrong answers use neutral-positive language (PF-6)
- [ ] "1 is not prime" explanation is correct and age-appropriate (exactly two factors required)
- [ ] "All odd numbers are prime" misconception is addressed (9, 15, 21, 25 counterexamples)
- [ ] "There's a pattern to primes" misconception is addressed (irregular gaps)
- [ ] "Prime means small" misconception is addressed (primes are infinite, large primes exist)
- [ ] Sieve of Eratosthenes is mathematically accurate (all 25 primes under 100 are correctly identified)
- [ ] Factor tree produces correct prime factorizations for all test numbers
- [ ] Fundamental Theorem of Arithmetic is stated accurately at an age-appropriate level
- [ ] Square root optimization explanation is conceptually correct
- [ ] Real-world examples are relatable to 11-year-olds
- [ ] Reflection prompt targets deep understanding, not recall (CP-I)
- [ ] Forward links to NT-2.2a and NT-2.3 are surfaced (CP-III)

---

## Cross-Topic Connections (CP-III)

| Connection | Direction | How Surfaced |
|------------|-----------|-------------|
| NT-2.1 Factors & Multiples | Backward (prerequisite) | The sieve explicitly builds on factor knowledge: "crossing out multiples" requires understanding what multiples are. The factor tree requires understanding that factors come in pairs. The rectangle model from NT-2.1 is referenced in Discovery prompts. |
| NT-2.2a Prime Factorization | Forward (successor) | This lesson introduces factor trees and the concept of unique prime decomposition. NT-2.2a formalizes prime factorization with exponent notation, LEGO-style building, and algorithmic methods. The trees built here are directly extended. |
| NT-2.3 GCF & LCM | Forward (successor) | Prime factorization is the key to computing GCF (shared prime factors) and LCM (combined prime factors). The Venn diagram of prime factors is the core model for NT-2.3. The comparison in Practice U2 (72 and 75 sharing factor 3) plants this seed. |
| NT-2.4 Divisibility Rules | Lateral (related) | Divisibility rules provide quick tests that can help determine if a number is prime. The "digit sum divisible by 3" trick is briefly used in Problem R2 (51). |
| NT-2.5 Exponents & Powers | Indirect forward | Prime factorization uses exponents (e.g., `2^4 x 3` for 48). This lesson introduces exponent notation in the Symbol Bridge, preparing students for the formal exponents lesson. |

These connections are stored in the curriculum graph and surfaced in the Knowledge Nebula visualization. After completing NT-2.2, the constellation lines to NT-2.2a and NT-2.3 become visible in the student's progress map. The connection back to NT-2.1 strengthens (thicker line, brighter glow).

---

## SRS Integration

After lesson completion, three `StudentConceptState` records are created for NT-2.2:

| Layer | Initial Stability | Initial Difficulty | First Review Scheduled |
|-------|------------------|--------------------|----------------------|
| 0 (Recall: prime identification) | Based on R1-R3 performance | Calibrated from problem responses | 1 day after lesson |
| 1 (Procedure: factor trees, factorization) | Based on P1-P3 performance | Calibrated from problem responses | 2 days after lesson |
| 2 (Understanding: why 1 isn't prime, uniqueness) | Based on U1-U3 performance + reflection quality | Higher initial difficulty | 3 days after lesson |

The three-layer model enables the rote detection algorithm: if a student can identify primes quickly (high layer-0 stability) but cannot explain why 1 isn't prime or what the Fundamental Theorem means (low layer-2 stability), the system triggers a conceptual re-teaching intervention rather than more drill.

Review problems for NT-2.2 are drawn from the `problems.json` bank and interleaved with problems from other topics in future practice sessions (PF-5).
