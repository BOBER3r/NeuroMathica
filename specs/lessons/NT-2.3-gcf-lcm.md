# Lesson Design: NT-2.3 GCF & LCM

**Topic ID**: NT-2.3
**Domain**: Number Theory (Domain 2)
**Grade**: 6
**Prerequisites**: NT-2.1 (Factors & Multiples), NT-2.2 (Prime & Composite)
**Successors**: NO-1.4a (Fraction Operations), AL-3.3 (One-Step Equations)
**Estimated Duration**: 20-28 minutes (adaptive)
**Constitution Compliance**: All 7 Core Principles verified; full NLS pipeline
**Component File**: `src/components/lessons/GcfLcmLesson.tsx`

---

## Core Insight

The Greatest Common Factor (GCF) is the biggest number that divides evenly into two (or more) numbers -- it lives in the **overlap** of their factor sets. The Least Common Multiple (LCM) is the smallest number that both numbers divide into evenly -- it lives in the **union** of their prime factor sets. GCF and LCM are not just abstract ideas: GCF simplifies fractions (dividing top and bottom by the GCF), and LCM finds common denominators (the LCM of denominators gives the LCD). The Venn diagram of prime factors makes both operations visible and spatial: overlap = GCF, entire union = LCM.

**Secondary insights** (built progressively through stages):
- GCF and LCM are complementary views of the same prime factor relationship. For any two numbers a and b: GCF(a,b) x LCM(a,b) = a x b.
- The LCM is NOT always the product of the two numbers -- it equals the product only when GCF = 1 (the numbers share no prime factors).
- Prime factorization (from NT-2.2) is the most powerful tool for finding GCF and LCM: compare factor lists, take minimums for GCF, maximums for LCM.
- Two metronomes ticking at different rates synchronize at their LCM -- this makes the abstract concept audible and rhythmic.

**Key misconceptions to defeat**:
1. Confusing GCF with LCM (mixing up "biggest factor" with "smallest multiple").
2. Thinking the LCM of two numbers is always their product (true only when GCF = 1).
3. Not connecting GCF/LCM to fraction operations (simplifying and finding common denominators).

---

## Neuroscience Framework

### Neural Pathway Activation

| Pathway | How This Lesson Engages It | Constitution Reference |
|---------|---------------------------|----------------------|
| Intraparietal sulcus (IPS) | Venn diagram of prime factors is a spatial map where overlap = GCF and union = LCM; number line multiples are positioned spatially, and synchronization points (common multiples) are visually prominent | PF-1 (Spatial-Mathematical Neural Overlap) |
| Motor cortex | Dragging prime factor tiles into Venn diagram circles and dragging markers along dual number lines encodes GCF/LCM through embodied action | PF-3 (Embodied Cognition) |
| Pattern recognition (prefrontal) | Observing that the Venn overlap always gives GCF and the union always gives LCM across multiple number pairs triggers generalization; recognizing the GCF x LCM = a x b relationship is a meta-pattern | PF-1 |
| Reward prediction (dopamine) | Hook animation surprises with two metronomes synchronizing at beat 12 -- the "sync" moment is an audiovisual reward; discovering the Venn diagram pattern triggers insight reward | NLS Stage 1 |
| Visuospatial sketchpad (working memory) | Holding two prime factorizations simultaneously and comparing them in the Venn diagram exercises visual working memory; the spatial layout reduces cognitive load by externalizing the comparison | PF-2 (Dual Coding) |
| Hippocampus (episodic) | Real-world connections (scheduling, gear ratios, fraction simplification) create rich episodic tags for retrieval | PF-4 (Episodic Anchoring) |

### Emotional Arc

| Phase | Emotion | Trigger | Duration |
|-------|---------|---------|----------|
| Hook | Curiosity, anticipation | Two metronomes ticking at different rates -- when will they sync? | 0:00-0:50 |
| Early spatial (Venn) | Playful exploration | Dragging prime factor tiles into overlapping circles -- satisfying snap-to-place | 0:50-3:00 |
| Mid spatial (Number lines) | Engagement, growing insight | Watching hop markers land on common multiples; physically dragging to find the first sync point | 3:00-5:00 |
| Discovery | Delight, "aha!" | Realizing GCF = overlap, LCM = union; seeing that GCF x LCM = product | 5:00-7:00 |
| Symbol bridge | Confidence | Formal notation maps cleanly onto the Venn diagram and number lines they already explored | 7:00-9:00 |
| Real world | Relevance, connection | Fractions simplified by GCF; class schedules syncing by LCM | 9:00-11:00 |
| Practice | Flow, mastery | Problems feel achievable because the Venn model is internalized | 11:00-22:00 |
| Reflection | Satisfaction, ownership | Articulating the GCF/LCM relationship in their own words | 22:00-24:00 |

### Anxiety Mitigation (PF-6)

- NO timer anywhere in this lesson. Not displayed, not tracked visually.
- Invalid Venn placements show gentle visual feedback -- tiles float back to the source tray with a soft "try another circle" tooltip, never "WRONG" or red X.
- The spatial exploration phase has no correct/incorrect framing -- all exploration is valid.
- Practice problems use neutral-positive feedback language per gamification design.
- The number line exploration is open-ended: students can hop as far as they want before the pattern becomes clear.

---

## Stage 1: Hook (30-50 seconds)

### Scene Definition

```json
{
  "id": "nt-2.3-hook",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 360],
  "background": "transparent",
  "objects": [],
  "animations": [],
  "interactions": []
}
```

### Detailed Animation Sequence

**T=0.0s -- Initial State: Two Metronomes**

Two metronome pendulums appear side by side in the upper half of the viewport. Each is a vertical arm with a weighted bob at the bottom, rendered as a rounded rectangle arm with a circle at the tip.

- Left metronome:
  - Position: centered at x=130
  - Arm: SVG `<rect>`, `width: 4px`, `height: 80px`, `fill: #818cf8` (indigo-400), `rx: 2`
  - Bob: SVG `<circle>`, `r: 10px`, `fill: #818cf8`, `stroke: #6366f1`, `strokeWidth: 1.5`
  - Pivot point: top-center at (130, 80)
  - Label below the base: "Every 3 beats" in `#818cf8`, `fontSize: 14px`, `fontWeight: 600`
  - Entry: `spring(damping: 20, stiffness: 300)`, `scale: 0 -> 1`, `opacity: 0 -> 1`

- Right metronome:
  - Position: centered at x=270
  - Arm: same specs, `fill: #34d399` (emerald-400)
  - Bob: `fill: #34d399`, `stroke: #059669`, `strokeWidth: 1.5`
  - Pivot point: top-center at (270, 80)
  - Label below base: "Every 4 beats" in `#34d399`, `fontSize: 14px`, `fontWeight: 600`
  - Entry: same spring, staggered 150ms after left

- A beat counter track runs horizontally below both metronomes at y=220:
  - 13 tick marks at positions for beats 0 through 12
  - Spacing: `(360 - 40) / 12 = 26.67px` per beat, starting at x=20
  - Tick marks: `<line>` elements, `stroke: #334155`, `strokeWidth: 1`, `y1: 215`, `y2: 225`
  - Beat numbers below each tick: `fontSize: 11px`, `fill: #475569`
  - Horizontal baseline: `stroke: #1e293b`, `strokeWidth: 1`

- Teaser text fades in above the metronomes:
  - "When do they sync up?"
  - `fontSize: 18px`, `fill: #94a3b8` (slate-400), italic
  - `opacity: 0 -> 1` over 400ms, `ease: "easeOut"`

- Sound: faint ambient tone, low hum establishing rhythm, 300ms, 15% volume

**T=0.8s -- Beat 1: Left metronome ticks**

The left metronome swings right then returns to center (rotation: 0 -> 12deg -> 0 around pivot, 200ms, `spring(damping: 22, stiffness: 400)`).

- A small indigo dot appears on the beat track at beat position 0 (the starting position):
  - Actually, the metronomes count from beat 0, but the first "tick" is at beat 3 for left and beat 4 for right. We show the counter starting to advance.
- Correction: show beats as they happen. Start with both metronomes at rest.

**T=1.0s -- Beat Sequence Begins**

The beat counter animates a glowing cursor that moves along the track, pausing at each beat (250ms per beat). At each beat position:

- Beat 0: Both at rest. Cursor starts.
- Beat 3 (T=1.75s): Left metronome ticks (arm swings, bob bounces). An indigo circle marker (`r: 5px`, `fill: #818cf8`) appears on the beat track at position 3. Sound: wooden "tick", high pitch, 30% volume. The "3" label below briefly glows indigo.
- Beat 4 (T=2.0s): Right metronome ticks. An emerald circle marker (`r: 5px`, `fill: #34d399`) appears at position 4. Sound: wooden "tock", lower pitch, 30% volume. The "4" label glows emerald.
- Beat 6 (T=2.5s): Left ticks again. Indigo marker at 6.
- Beat 8 (T=3.0s): Right ticks again. Emerald marker at 8.
- Beat 9 (T=3.25s): Left ticks. Indigo marker at 9.
- Beat 12 (T=4.0s): BOTH tick simultaneously!

**T=4.0s -- The Sync Moment (Beat 12)**

Both metronomes swing at the same time. A combined marker appears at beat 12:
- The marker is a larger circle (`r: 8px`) with a radial gradient blending `#818cf8` and `#34d399`, outlined with `#fbbf24` (amber-400), `strokeWidth: 2`
- A bright pulse radiates outward from the marker: a ring that expands from `r: 8px` to `r: 30px` while fading from `opacity: 0.6` to `0`, duration 600ms
- Both metronome bobs briefly glow amber (`filter: brightness(1.4)`) for 300ms
- Sound: satisfying harmonic chord (both tick sounds layered + a warm major third), 400ms, 50% volume
- The "12" label below the marker scales to 1.4x and gains amber color, then settles to 1.2x with amber retained

**T=4.8s -- Annotation**

A text annotation fades in below the beat track:
- Line 1: "Beat 12: they sync!"
  - `fontSize: 20px`, `fill: #fbbf24` (amber-400), `fontWeight: 700`
  - Entry: `scale: 0.9 -> 1`, `ease: "easeOutBack"`, 400ms
- Line 2 (200ms delay): "12 is the smallest number in BOTH lists."
  - `fontSize: 16px`, `fill: #e2e8f0` (slate-200)
  - Below Line 2, the two lists fade in with staggered highlight:
    - "Multiples of 3: 3, 6, 9, **12**, 15, 18..." in `#818cf8`, with **12** in `#fbbf24`, `fontWeight: 700`
    - "Multiples of 4: 4, 8, **12**, 16, 20, 24..." in `#34d399`, with **12** in `#fbbf24`, `fontWeight: 700`
  - `fontSize: 14px` for both lists

**T=6.5s -- Transition Question**

Previous annotations hold. A new text fades in below:
- "This is called the **Least Common Multiple**."
- `fontSize: 18px`, `fill: #f1f5f9`, "Least Common Multiple" in `#fbbf24`, `fontWeight: 700`
- Entry: `opacity: 0 -> 1` over 500ms

Hold for 1.5s.

- Then a second line: "But what about the BIGGEST factor they SHARE?"
- `fontSize: 18px`, `fill: #f1f5f9`, "BIGGEST factor" in `#818cf8`, `fontWeight: 700`
- Entry: `opacity: 0 -> 1` over 500ms

**T=8.5s -- Continue Button**

Everything holds. A "Continue" button fades in at the bottom of the scene:
- Style: rounded rectangle, `fill: #818cf8`, `rx: 12`, padding 16px 32px
- Text: "Explore GCF & LCM" in `#ffffff`, `fontSize: 16px`, `fontWeight: 600`
- Entry: slide up from 20px below + fade in, 400ms, `ease: "easeOut"`
- Hover state: `fill: #6366f1`, scale 1.02
- Active state: scale 0.98
- Touch target: minimum 48x48px (exceeds DR-5 requirement of 44px)

### Hook -- Accessibility

- `aria-live="polite"` region narrates: "Two metronomes tick at different rates: one every 3 beats, one every 4 beats. At beat 12, they tick together for the first time. 12 is the Least Common Multiple of 3 and 4."
- Each tick is announced with a 200ms delay after visual animation: "Left metronome ticks at beat 3," "Right metronome ticks at beat 4," etc.
- Sync moment: "Both metronomes tick together at beat 12!"
- Continue button has `role="button"`, `aria-label="Continue to interactive exploration of GCF and LCM"`
- Keyboard: Enter or Space activates Continue. Tab focuses Continue button. Escape replays hook from beginning.
- Reduced motion: if `prefers-reduced-motion: reduce`, metronome swings become instant color pulses (arm briefly brightens). Cursor movement along beat track becomes instant repositioning. Pulse/glow effects disabled. Fade-ins remain but at 150ms with `ease: "linear"`.

### Hook -- Performance Budget

- Total SVG elements: 2 metronome arms + 2 bobs + 13 tick marks + ~12 beat markers + ~10 annotations + 1 button = ~40 elements (well under 200-element SVG budget)
- No WebGL required
- Spring animations via Framer Motion -- GPU-composited transforms only (`transform`, `opacity`)
- Filter effects (glow on sync marker): defined once in `<defs>`, applied to 1 element
- Target: 60fps on iPhone SE 2nd gen (A13 Bionic)
- Memory: <2MB total scene

---

## Stage 2: Spatial Experience -- Venn Diagram Factor Sorter + Dual Number Line (3-5 minutes)

### Overview

The spatial experience has two phases:

**Phase A: Prime Factor Venn Diagram (2-3 min)** -- An interactive workspace where the student sorts the prime factors of two numbers into a Venn diagram. Shared factors go in the overlap, unique factors in the crescents. The GCF and LCM are computed live from the diagram contents: GCF = product of overlap, LCM = product of entire union.

**Phase B: Dual Number Line Hopping (1-2 min)** -- Two parallel number lines where multiples of each number are shown as hop arcs. Points where both lines land on the same value are highlighted as common multiples, reinforcing LCM visually as "the first place they both land."

Both phases are essential: the Venn diagram teaches the PRIME FACTOR method for GCF/LCM (structural), and the number line teaches the LISTING method (sequential). Together they provide complementary spatial models.

### Phase A: Prime Factor Venn Diagram

#### Scene Layout (Mobile-First)

```
+------------------------------------------+
|  "Sort the prime factors!"               |  <- Instruction bar, 48px height
|  Numbers: 12 and 18                      |
+------------------------------------------+
|                                          |
|   ┌──────────────────────────────────┐   |
|   │     ┌───────┐  ┌───────┐        │   |
|   │     │  12   │  │  18   │        │   |
|   │     │ only  │  │ only  │        │   |
|   │     │       ╰──╯       │        │   |
|   │     │      SHARED      │        │   |
|   │     └──────────────────┘        │   |
|   └──────────────────────────────────┘   |
|                                          |
+------------------------------------------+
|  Available tiles: [2] [2] [3] [3]        |  <- Source tray
|  GCF = ?   LCM = ?                      |  <- Live readout
+------------------------------------------+
```

**Desktop layout**: Venn diagram centered at 60% width, source tray and readout in a right sidebar (40% width).

#### Venn Diagram Rendering

- Two overlapping SVG circles:
  - Left circle: `stroke: #818cf8` (indigo-400), `fill: #818cf810` (6% opacity), `r: 100px`, center at `(150, 180)`
  - Right circle: `stroke: #34d399` (emerald-400), `fill: #34d39910` (6% opacity), `r: 100px`, center at `(250, 180)`
  - Overlap region: visually distinct via SVG clip-path creating `fill: #fbbf2415` (amber, 8% opacity) in the intersection
  - Circle labels:
    - Above left circle: "12" in `#818cf8`, `fontSize: 20px`, `fontWeight: 700`
    - Above right circle: "18" in `#34d399`, `fontSize: 20px`, `fontWeight: 700`
  - Drop zone indicators: faint dashed outlines within each region showing where tiles can land
    - Left crescent: "Only in 12" in `#818cf860`, `fontSize: 12px`
    - Overlap: "Shared" in `#fbbf2460`, `fontSize: 12px`
    - Right crescent: "Only in 18" in `#34d39960`, `fontSize: 12px`

#### Prime Factor Tiles (Source Tray)

For Challenge 1 (12 and 18):

- 12 = 2 x 2 x 3, so prime factors are: 2, 2, 3
- 18 = 2 x 3 x 3, so prime factors are: 2, 3, 3

The source tray displays a combined set of UNIQUE prime factor tiles needed. The student must figure out how to allocate them. The tiles are:

**Tile generation logic**: For two numbers a and b, take the prime factorization of each. For each prime p, create max(count_in_a, count_in_b) tiles. Display them shuffled.

For 12 (2^2 x 3) and 18 (2 x 3^2):
- Prime 2: max(2, 1) = 2 tiles labeled "2"
- Prime 3: max(1, 2) = 2 tiles labeled "3"
- Total: 4 tiles: [2] [2] [3] [3]

Each tile:
- Dimensions: 48x48px rounded rect
- `fill: #1e293b` (slate-800), `stroke: #64748b` (slate-500), `strokeWidth: 1.5`, `rx: 10`
- Number text: `fontSize: 20px`, `fontWeight: 700`, `fill: #f1f5f9`, centered
- Touch target: 48x48px (meets DR-5)
- Draggable via `@use-gesture/react` `useDrag`
- Hover/press state: `stroke: #818cf8`, `scale: 1.05`
- While dragging: `opacity: 0.85`, slight rotation (`rotate: -3deg`), drop shadow `filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3))`

#### Drag-and-Drop Interaction

**Valid drop zones**:
1. Left crescent (factors only in 12, not in 18)
2. Overlap / intersection (factors shared by both)
3. Right crescent (factors only in 18, not in 12)

**Drop behavior**:
- When a tile enters a valid drop zone, the zone background brightens by 10% opacity and the zone border becomes solid (replacing dashed)
- On drop: tile snaps to the next available position within the zone using `spring(damping: 25, stiffness: 400)`
  - Positions within each zone are predefined slots arranged in a compact cluster
  - Sound: soft snap click, 100ms, 25% volume
  - Haptic: 8ms vibration pulse
- The tile can be picked up again and moved to a different zone at any time
- There is NO "submit" button for tile placement -- the lesson checks completion automatically when all tiles are placed

**Live GCF/LCM readout**:
- Below the Venn diagram, two readouts update in real time as tiles are placed:
  - "GCF = [product of overlap tiles]" -- `fontSize: 18px`, "GCF" in `#fbbf24`, value in `#f1f5f9`
  - "LCM = [product of all placed tiles]" -- `fontSize: 18px`, "LCM" in `#818cf8`, value in `#f1f5f9`
- When no tiles are in overlap: "GCF = 1" (since the empty product is 1)
- When not all tiles placed yet: values update dynamically but show a "..." suffix to indicate incomplete
- On each tile placement/removal: the changed readout value animates with a spring pulse (`scale: 1 -> 1.15 -> 1`, 200ms)

**Correct placement for Challenge 1 (12 and 18)**:
- Left crescent (only in 12): one `[2]` tile (since 12 has 2^2 but 18 only has 2^1, the extra 2 belongs to 12 only)
- Overlap (shared): one `[2]` and one `[3]` (both have at least one 2 and one 3)
- Right crescent (only in 18): one `[3]` tile (since 18 has 3^2 but 12 only has 3^1, the extra 3 belongs to 18 only)
- Result: GCF = 2 x 3 = **6**, LCM = 2 x 2 x 3 x 3 = **36**

**Completion detection**: When all tiles are placed AND the placement is correct:
- All three zones pulse with a brief glow (300ms)
- GCF readout: value turns `#34d399` (emerald) with checkmark icon
- LCM readout: value turns `#34d399` with checkmark icon
- A celebration micro-animation: small sparkles radiate from the overlap zone (6 particles, `fill: #fbbf24`, scatter with physics, fade over 500ms)
- Sound: satisfying "ding" chord, bright major triad, 300ms, 40% volume
- Annotation appears: "GCF(12, 18) = 6 -- the product of the SHARED factors!" in `#fbbf24`, `fontSize: 14px`
- Below: "LCM(12, 18) = 36 -- the product of ALL unique factors!" in `#818cf8`, `fontSize: 14px`

**Incorrect placement handling**:
- There is no hard "wrong" state. Instead, when all tiles are placed but incorrectly:
  - The GCF and/or LCM readout values are simply whatever the current placement yields
  - A gentle hint appears after 5 seconds of an incorrect completed state: "Hmm, check which factors BOTH numbers share. Try swapping some tiles."
  - `fill: #94a3b8`, `fontSize: 14px`, italic
  - After 15 seconds: a more specific hint: "12 = 2 x 2 x 3 and 18 = 2 x 3 x 3. Which factors appear in BOTH lists?"

#### Challenge Sequence

**Challenge 1: 12 and 18 (GCF=6, LCM=36)**
- Pre-selected. Tiles: [2] [2] [3] [3]
- Guided by instruction text: "12 = 2 x 2 x 3 and 18 = 2 x 3 x 3. Sort the prime factors!"
- The factorizations are shown as reference text above the source tray:
  - "12 = 2 x 2 x 3" in `#818cf8`, `fontSize: 15px`
  - "18 = 2 x 3 x 3" in `#34d399`, `fontSize: 15px`

**Challenge 2: 8 and 20 (GCF=4, LCM=40)**
- After completing Challenge 1, auto-advances
- 8 = 2^3, 20 = 2^2 x 5
- Tiles: [2] [2] [2] [5] (max(3,2)=3 twos, max(0,1)=1 five)
- Correct placement: Left crescent: one [2]. Overlap: [2] [2]. Right crescent: [5].
- GCF = 2 x 2 = 4, LCM = 2 x 2 x 2 x 5 = 40
- Reference: "8 = 2 x 2 x 2" and "20 = 2 x 2 x 5"

**Challenge 3: 9 and 14 (GCF=1, LCM=126) -- The Coprime Surprise**
- 9 = 3^2, 14 = 2 x 7
- Tiles: [2] [3] [3] [7]
- Correct placement: Left crescent: [3] [3]. Overlap: (empty). Right crescent: [2] [7].
- GCF = 1 (empty overlap = product of nothing = 1), LCM = 2 x 3 x 3 x 7 = 126
- Special annotation when overlap is empty: "No shared factors! GCF = 1. These numbers are called **coprime**."
  - "coprime" in `#fbbf24`, `fontWeight: 700`
- Additional annotation: "When GCF = 1, the LCM = 9 x 14 = 126. The LCM equals the product!"
  - This directly addresses the misconception "LCM is always the product" by showing it's only true for coprimes
- Reference: "9 = 3 x 3" and "14 = 2 x 7"

### Phase B: Dual Number Line Hopping

#### Scene Layout

```
+------------------------------------------+
|  "Find where they land together!"        |  <- Instruction, 48px
+------------------------------------------+
|                                          |
|  ----3----6----9---12---15---18--->       |  <- Number line for N₁
|       ⌒   ⌒   ⌒   ⌒    ⌒    ⌒          |     (hop arcs)
|                                          |
|  ------4------8-----12-----16---->       |  <- Number line for N₂
|         ⌒      ⌒     ⌒      ⌒           |
|                                          |
|  Common multiples: [12] [24] ...         |
+------------------------------------------+
|  [Continue]                              |
+------------------------------------------+
```

#### Number Line Rendering

Two parallel horizontal number lines, vertically stacked with 80px gap:

- Top line (for number A):
  - y-position: y=120
  - Range: 0 to 40 (adjustable per challenge)
  - Tick marks at every integer: `stroke: #1e293b`, `strokeWidth: 0.5`
  - Major ticks every 5: `stroke: #334155`, `strokeWidth: 1`, with labels below in `#475569`, `fontSize: 10px`
  - Line color: `stroke: #818cf8`, `strokeWidth: 2`
  - Arrow tip at right end
  - Hop arcs: parabolic SVG `<path>` arcs connecting consecutive multiples of the number
    - `stroke: #818cf8`, `strokeWidth: 2`, `fill: none`
    - Arc peak: 25px above the line
    - Animation: drawn via dash-offset, 250ms per arc, staggered left to right
    - Landing dots at each multiple: `<circle>`, `r: 5px`, `fill: #818cf8`
    - Multiple labels above landing dots: `fontSize: 12px`, `fill: #818cf8`

- Bottom line (for number B):
  - y-position: y=220
  - Same specs but `#34d399` (emerald-400) instead of indigo
  - Hops and landing dots in emerald

- Common multiple markers: when both lines have a landing at the same x-position:
  - A vertical dashed line connects the two landing dots: `stroke: #fbbf24`, `strokeWidth: 1.5`, `dasharray: "4 4"`
  - Both landing dots upgrade to `r: 7px` with `stroke: #fbbf24`, `strokeWidth: 2`
  - A label appears between the two lines at that x: the number in `#fbbf24`, `fontSize: 16px`, `fontWeight: 700`
  - The first common multiple has an extra annotation: "LCM!" in `#fbbf24`, `fontSize: 12px`, appearing with `spring(damping: 15, stiffness: 350)`, slight bounce

#### Interaction

- The number lines auto-animate: arcs draw sequentially from left to right, with 300ms per arc
- As each arc draws, the student can see the pattern building
- When the first common multiple appears, the animation pauses for 1.5s to let the insight land
- Then remaining arcs continue to show additional common multiples (reinforcing that LCM is the SMALLEST, not the only)

**Interactive element**: After the auto-animation, the student can tap any landing dot to see a tooltip:
- "{number} is a multiple of {base}" for regular multiples
- "{number} is a COMMON multiple of {A} and {B}!" for common multiples, in amber

#### Number Line Challenges

The number line auto-cycles through two examples:

**Example 1: 3 and 4 (LCM = 12)**
- Connects back to the hook metronomes
- Top line: multiples of 3 (3, 6, 9, 12, 15, 18, 21, 24, ...)
- Bottom line: multiples of 4 (4, 8, 12, 16, 20, 24, ...)
- Common multiples highlighted: 12, 24 (within visible range)
- Annotation: "The metronomes sync at every common multiple: 12, 24, 36... The FIRST sync is the LCM!"

**Example 2: 6 and 8 (LCM = 24)**
- Top: 6, 12, 18, 24, 30, 36
- Bottom: 8, 16, 24, 32, 40
- Common: 24
- Annotation: "6 x 8 = 48, but LCM = 24, not 48! Because 6 and 8 share the factor 2."
- This addresses the "LCM is always the product" misconception again

### Interaction Count Tracking

The lesson must record at least 10 meaningful interactions in Stage 2 before allowing progression (Constitution PF-3: Embodied Cognition). An "interaction" counts as:
- Successfully placing a tile in a Venn diagram zone
- Moving a tile from one zone to another
- Tapping a number line landing dot to see its tooltip

The interaction counter is NOT displayed to the student (no pressure). It is tracked internally. The Continue button appears organically after 10 interactions and all three Venn challenges are completed.

### Spatial Experience -- Accessibility

- Venn diagram has `role="application"` with `aria-label="Prime Factor Venn Diagram: sort prime factors of [A] and [B] into shared and unique groups"`
- Keyboard alternative to dragging:
  - Tab cycles through tiles in the source tray
  - Arrow keys (Left/Right) cycle the target zone: "Only in [A]" -> "Shared" -> "Only in [B]"
  - Enter/Space places the focused tile in the currently selected zone
  - Backspace removes a tile from its zone back to the tray
  - Screen reader announces: "Tile [value] placed in [zone name]. GCF is now [value]. LCM is now [value]."
- Number lines: `role="img"` with `aria-label="Number line showing multiples of [N]. Common multiples with [other N] are highlighted at positions [list]."`
- Reduced motion: hop arc animations become instant lines. Tile snap becomes instant placement. Sparkle effects disabled.

### Spatial Experience -- Performance

- Maximum SVG elements: ~40 (Venn circles, tiles, labels) + ~80 (two number lines with ticks, arcs, dots) = ~120 elements
- Spring animations via Framer Motion `layout` animation on tile positions. GPU-composited.
- Drag gesture: throttled to 16ms (60fps) via `@use-gesture/react` configuration
- Prime factorization computation: precomputed at scene mount for all challenge numbers (trivial: <1ms)
- Target: 60fps during drag on iPhone SE 2nd gen

---

## Stage 3: Guided Discovery (3-5 minutes)

### Prompt Sequence

The guided discovery stage presents a series of narrated prompts with synchronized visual highlights on the spatial scene. The Venn diagram from Phase A and the number lines from Phase B remain visible but interaction is paused (drag disabled). Each prompt appears as a text card at the bottom of the screen (mobile) or in a side panel (desktop).

**Prompt delivery**: Each prompt appears as a text card. The text is revealed character by character at 30 characters/second for a "typing" effect. The corresponding visual highlight plays simultaneously.

**Card styling**:
- Background: `#1e293b` (slate-800), `borderRadius: 16px`, `padding: 20px`
- Border: `1px solid #334155` (slate-700)
- Text: `fill: #e2e8f0` (slate-200), `fontSize: 16px`, `lineHeight: 1.6`
- Key terms highlighted inline: `color: #818cf8` (indigo-400), `fontWeight: 600`
- "Next" button at bottom-right: same styling as hook's Continue button but smaller (padding 12px 24px), text "Next"

---

**Prompt 1: Naming GCF**

Card text:
> "Look at the overlap of the Venn diagram for 12 and 18. The shared prime factors are **2** and **3**. Multiply them: 2 x 3 = **6**. This is the **Greatest Common Factor** -- the BIGGEST number that divides both 12 and 18 evenly."

Visual:
- Scene shows the completed Venn diagram for 12 and 18 from Challenge 1
- The overlap region pulses with amber glow (300ms on, 300ms off, 2 cycles)
- The tiles in the overlap ([2] and [3]) briefly scale to 1.2x with amber border
- Below the Venn, the GCF readout animates: "GCF(12, 18) = 2 x 3 = **6**"
  - The multiplication is shown step by step with 400ms delay between "2 x 3" appearing and "= 6" resolving
  - `fontSize: 22px`, `fill: #fbbf24`, `fontWeight: 700`
- Quick verification: "12 / 6 = 2 ✓" and "18 / 6 = 3 ✓" appear in `#34d399`, `fontSize: 14px`, staggered 300ms

Student action: Read the prompt, observe the visual, tap "Next."

---

**Prompt 2: Naming LCM**

Card text:
> "Now look at ALL the tiles in the diagram -- the whole union. Multiply them: 2 x 2 x 3 x 3 = **36**. This is the **Least Common Multiple** -- the SMALLEST number that both 12 and 18 divide into."

Visual:
- All tiles in the Venn diagram (left crescent [2], overlap [2][3], right crescent [3]) pulse sequentially left to right, each with a brief scale-up and color flash matching their zone
- Below: "LCM(12, 18) = 2 x 2 x 3 x 3 = **36**"
  - Step-by-step multiplication reveal with 300ms between each factor appearing
  - `fontSize: 22px`, `fill: #818cf8`, `fontWeight: 700`
- Verification: "36 / 12 = 3 ✓" and "36 / 18 = 2 ✓" in `#34d399`, `fontSize: 14px`

Student action: Read, observe, tap "Next."

---

**Prompt 3: GCF vs LCM -- The Key Difference**

Card text:
> "GCF asks: 'What's the **biggest** number that **fits into both**?' LCM asks: 'What's the **smallest** number **both fit into**?' They're opposite questions!"

Visual:
- Split-screen animation:
  - Left side: the number 6 (GCF) shown as a block that fits neatly inside both 12 and 18 (represented as bars). An arrow points DOWN into the bars. Label: "GCF divides IN" in `#fbbf24`
  - Right side: the number 36 (LCM) shown as a large bar, with both 12 and 18 fitting neatly inside it as smaller segments. An arrow points UP from the numbers into 36. Label: "LCM contains BOTH" in `#818cf8`
- Animation: the "fitting in" and "containing" animations play with spring physics, blocks sliding into position with satisfying snaps (200ms, `spring(damping: 25, stiffness: 400)`)

**Interactive micro-check**: Before revealing the prompt, the card initially shows: "Which is BIGGER: GCF or LCM?"
- Two buttons: "GCF" (`fill: #fbbf2420`, text "GCF" in `#fbbf24`) and "LCM" (`fill: #818cf820`, text "LCM" in `#818cf8`)
- Both: `borderRadius: 12px`, `padding: 12px 24px`, `fontSize: 16px`, touch target 48px height
- If student taps "GCF": gentle feedback "Not quite -- the GCF divides into both numbers, so it must be SMALLER than either of them. Let's see why..."
- If student taps "LCM": positive feedback "Right! The LCM is always at least as big as the larger number. Let's see why..."
- This micro-interaction does NOT affect XP or scoring

Student action: Tap answer, observe visual, tap "Next."

---

**Prompt 4: The Coprime Case**

Card text:
> "Remember 9 and 14? They shared NO prime factors -- the overlap was **empty**. When GCF = 1, the LCM equals the **product**: 9 x 14 = 126. But when numbers DO share factors, the LCM is **less** than the product!"

Visual:
- The Venn diagram transitions to show 9 and 14 (from Challenge 3):
  - Left crescent: [3] [3]
  - Overlap: empty (dimmed background with dashed outline)
  - Right crescent: [2] [7]
- GCF = 1, LCM = 126 displayed
- Below, a comparison table animates in:

```
| Numbers | GCF | Product | LCM | LCM = Product? |
|---------|-----|---------|-----|----------------|
| 12, 18  |  6  |   216   |  36 | No! (36 < 216) |
| 9, 14   |  1  |   126   | 126 | Yes! (coprime) |
```

- The "No!" cell has `fill: #fb718520`, the "Yes!" cell has `fill: #34d39920`
- A formula fades in below: "GCF x LCM = Product" → "6 x 36 = 216 = 12 x 18 ✓" in `#fbbf24`
- Then: "1 x 126 = 126 = 9 x 14 ✓" in `#fbbf24`

Student action: Read, observe, tap "Next."

---

**Prompt 5: Why This Matters for Fractions**

Card text:
> "GCF simplifies fractions: **12/18 ÷ 6/6 = 2/3**. LCM finds common denominators: to add **1/4 + 1/6**, use LCM(4,6) = 12 as the denominator. GCF and LCM are your fraction superpowers!"

Visual:
- Top half: a fraction bar for 12/18, with GCF=6 shown as a divisor. The bar visually simplifies: 12 shaded parts out of 18 merge into 2 shaded parts out of 3. The KaTeX equation `\frac{12}{18} = \frac{12 \div 6}{18 \div 6} = \frac{2}{3}` appears alongside, each step revealed with 500ms delay.
  - The "÷ 6" is highlighted in `#fbbf24` with a small arrow from the GCF readout
- Bottom half: two fraction bars for 1/4 and 1/6. Each splits to show twelfths (1/4 = 3/12, 1/6 = 2/12). The bars align side by side, visually showing how they can now be added.
  - KaTeX: `\frac{1}{4} + \frac{1}{6} = \frac{3}{12} + \frac{2}{12} = \frac{5}{12}`
  - The "12" denominators are highlighted in `#818cf8` with a small arrow from "LCM(4,6) = 12"

Student action: Read, observe, tap "Next."

---

### Guided Discovery -- Transition

After Prompt 5, a brief summary card appears:

> "Let's write this down with proper math notation."

The card has a forward-pointing arrow icon and the "Continue" button. This transitions to Stage 4: Symbol Bridge.

### Guided Discovery -- Accessibility

- All prompt text is in `aria-live="polite"` regions
- Visual animations have corresponding screen reader descriptions announced after each animation completes
- Micro-check buttons have `role="button"` with descriptive `aria-label`s: "I think GCF is bigger" / "I think LCM is bigger"
- Keyboard: Tab navigates between "Next" and micro-check buttons. Enter/Space activates.
- Reduced motion: Venn diagram glows become simple border color changes. Block-fitting animations become instant placements. Table rows appear simultaneously.

---

## Stage 4: Symbol Bridge (2-3 minutes)

### Overview

Formal mathematical notation is overlaid onto the spatial representations the student already understands. Each symbol is explicitly linked to its spatial meaning from the Venn diagram and number lines.

### Scene Layout

The screen splits into two synchronized panels:

**Left panel (60%)**: The Venn diagram or number line from Stage 2, cycling between them as relevant to each notation being introduced.

**Right panel (40%)**: Mathematical notation, building up incrementally.

On mobile: vertical stack -- visualization on top (40% height), notation below (60% height), scrollable.

---

**Symbol 1: GCF Definition**

- Notation (right panel): `"\text{GCF}(a, b) = \text{product of shared prime factors}"`
- KaTeX rendering, `fontSize: 18px`
- Entry: text fades in word by word (150ms per word group)
- Below, worked example: `"\text{GCF}(12, 18) = 2 \times 3 = 6"`
  - `fontSize: 22px`, each prime in `#fbbf24`
- Left panel: the Venn diagram for 12 and 18 with overlap tiles highlighted
- Connecting line: subtle dashed line (`stroke: #fbbf24`, `opacity: 0.3`, `dasharray: "4 4"`) draws from overlap tiles to the "2 x 3" in the equation, then fades (800ms)

**Symbol 2: LCM Definition**

- After 1.5s pause
- New line: `"\text{LCM}(a, b) = \text{product of ALL prime factors (taking max count of each)}"`
- `fontSize: 18px`, "ALL" in `#818cf8`, bold
- Below: `"\text{LCM}(12, 18) = 2^2 \times 3^2 = 36"`
  - `fontSize: 22px`, each prime base in `#818cf8`
- Left panel: all tiles in the Venn diagram pulse sequentially
- Connecting lines from each zone's tiles to corresponding parts of the equation

**Symbol 3: The GCF x LCM Identity**

- After 1.5s pause
- Notation, presented in a highlighted box:
  - Border: `stroke: #fbbf24`, `strokeWidth: 2`, `rx: 12`, `fill: #fbbf2410`
  - Text: `"\text{GCF}(a, b) \times \text{LCM}(a, b) = a \times b"`
  - `fontSize: 20px`, `fill: #f1f5f9`
- Below the box, verification:
  - `"6 \times 36 = 216 = 12 \times 18 \checkmark"`
  - `fontSize: 18px`, checkmark in `#34d399`
- Left panel: two factor trees for 12 and 18 appear side by side, with the shared prime factors connected by amber lines and unique factors connected by indigo/emerald lines
- Below the box: "This always works! It's because GCF captures the overlap and LCM captures the union." in `#94a3b8`, `fontSize: 14px`, italic

**Symbol 4: Finding GCF and LCM via Prime Factorization (Method Summary)**

- After 2s pause
- A step-by-step method card:
  1. "Write prime factorizations" → `12 = 2^2 \times 3` and `18 = 2 \times 3^2`
  2. "GCF: take the MINIMUM exponent of each prime" → `2^{\min(2,1)} \times 3^{\min(1,2)} = 2^1 \times 3^1 = 6`
  3. "LCM: take the MAXIMUM exponent of each prime" → `2^{\max(2,1)} \times 3^{\max(1,2)} = 2^2 \times 3^2 = 36`
- Each step fades in with 1.5s delay
- "MINIMUM" highlighted in `#fbbf24`, "MAXIMUM" highlighted in `#818cf8`
- Left panel: the Venn diagram, with annotations showing how min = overlap and max = union

### Symbol Bridge -- Accessibility

- Each notation block has `role="math"` with `aria-label` containing the spoken equivalent
- GCF definition: "The GCF of a and b equals the product of their shared prime factors. GCF of 12 and 18 equals 2 times 3 equals 6."
- LCM definition: "The LCM of a and b equals the product of all prime factors, taking the maximum count of each. LCM of 12 and 18 equals 2 squared times 3 squared equals 36."
- Identity: "GCF of a and b times LCM of a and b equals a times b."
- Connecting lines: `aria-hidden="true"` (decorative)
- Reduced motion: word-by-word reveal becomes full-text fade-in. Connecting lines appear instantly.

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

**Example 1: Simplifying Fractions (GCF)**

- Accent color: `#fbbf24` (amber-400)
- Icon: fraction bar icon
- Title: "Simplifying Fractions with GCF"
- Body: "You baked 24 cookies and ate 16. What fraction did you eat? 16/24 seems messy -- but GCF(16, 24) = 8. Divide both by 8: 16/24 = 2/3. You ate two-thirds of the cookies!"
- Key phrases highlighted: "GCF(16, 24) = 8" in `#fbbf24`, "2/3" in `#34d399`
- Mini-visualization: a fraction bar showing 16 out of 24 segments shaded, then the segments merge (groups of 8 combine) into 2 out of 3 larger segments. The transformation animates over 600ms with spring physics.

**Example 2: Scheduling (LCM)**

- Accent color: `#818cf8` (indigo-400)
- Icon: calendar/clock icon
- Title: "When Do Schedules Sync?"
- Body: "Your favorite streamer goes live every 3 days. Your friend's favorite goes live every 5 days. Both went live today. When will they BOTH be live on the same day again? LCM(3, 5) = 15. In 15 days!"
- Key phrases highlighted: "every 3 days" in `#818cf8`, "every 5 days" in `#34d399`, "LCM(3, 5) = 15" in `#fbbf24`
- Mini-visualization: a horizontal timeline (0 to 16 days). Blue dots at days 3, 6, 9, 12, 15 (streamer A). Green dots at days 5, 10, 15 (streamer B). Day 15 has the amber combined marker with a small "Both live!" label.

**Example 3: Equal Groups (GCF)**

- Accent color: `#34d399` (emerald-400)
- Icon: gift box / party hat icon
- Title: "Party Favor Bags"
- Body: "You have 18 candies and 12 stickers to put into identical party bags with no leftovers. What's the MOST bags you can make? GCF(18, 12) = 6 bags! Each gets 3 candies and 2 stickers."
- Key phrases highlighted: "GCF(18, 12) = 6" in `#fbbf24`, "3 candies and 2 stickers" in `#34d399`
- Mini-visualization: 18 small candy icons and 12 sticker icons arranged in a cluster. They animate into 6 equal groups (3 candies + 2 stickers each), sliding into 6 bag-shaped containers with spring snaps. Each group highlighted briefly as it forms.

### Real-World Anchor -- Accessibility

- Each card: `role="article"` with heading and description
- Mini-visualizations: `role="img"` with detailed `aria-label` descriptions
  - Fractions: "Fraction bar showing 16 out of 24 simplifying to 2 out of 3 by dividing by GCF 8"
  - Scheduling: "Timeline showing two streaming schedules syncing on day 15, the LCM of 3 and 5"
  - Party bags: "18 candies and 12 stickers divided equally into 6 bags, the GCF of 18 and 12"
- Reduced motion: slide-in becomes fade-in (200ms). Fraction merge and bag-filling animations become instant.

---

## Stage 6: Practice (9 problems)

### Problem Set Design

Problems are organized into three layers per the data model (layer 0 = recall, layer 1 = procedure, layer 2 = understanding). The IRT-based problem selector chooses from this bank, but the lesson guarantees exposure to all three layers.

**Problem selection logic**: Start with 2 recall, then 2 procedure, then 1 understanding. Remaining 4 are adaptive (IRT selects based on estimated ability). If the student struggles (2+ incorrect in a row), insert an easier problem. If they excel (3+ correct in a row with high confidence), skip to understanding layer.

---

### Recall Layer (Layer 0)

**Problem R1: GCF or LCM Identification**

- Type: `multiple-choice`
- Prompt: "The GCF of two numbers is the..."
- Options (tap to select, only one):
  - A: "Smallest number they both divide into" -- `incorrect`
  - B: "Biggest number that divides both of them" -- `correct`
  - C: "Product of the two numbers" -- `incorrect`
  - D: "Biggest multiple they share" -- `incorrect`
- Each option: full-width card, `fill: #1e293b`, `borderRadius: 10px`, `padding: 14px 18px`, text `fill: #e2e8f0`, `fontSize: 15px`
- Selected state: `stroke: #818cf8`, `fill: #1e293b`
- Correct (B): `stroke: #34d399`, `fill: #34d39910`, checkmark icon
- Incorrect: `stroke: #94a3b8`, selected option shakes gently (translateX oscillation, 3 cycles, 300ms)
- Feedback for wrong answers:
  - A: "That describes the LCM, not the GCF! GCF = biggest factor that goes into both. LCM = smallest multiple both go into."
  - C: "The product of two numbers is usually much larger than their GCF. GCF(12, 18) = 6, not 12 x 18 = 216!"
  - D: "Multiples are bigger than (or equal to) the numbers themselves, so the 'biggest multiple' doesn't make sense -- multiples go on forever! You're thinking of the LCM, which is the SMALLEST common multiple."
- Visualization after answer: the Venn diagram for 12 and 18 with overlap highlighted and "GCF = 6" annotation

**Problem R2: Quick GCF Recall**

- Type: `numeric-input`
- Prompt: "What is the GCF of 8 and 12?"
- Input: single number input field, `width: 80px`, centered, `fontSize: 24px`, `borderRadius: 8px`, `border: 2px solid #334155`
  - On focus: `border-color: #818cf8`
  - Numeric keyboard on mobile (`inputMode="numeric"`)
- Correct answer: 4
- Feedback (correct): "Yes! The factors of 8 are {1, 2, 4, 8} and the factors of 12 are {1, 2, 3, 4, 6, 12}. The biggest number in BOTH lists is 4."
- Feedback (incorrect, common errors):
  - 2: "2 IS a common factor of 8 and 12, but it's not the GREATEST. Is there a bigger number that divides both?"
  - 8: "8 divides into 8 (8/8 = 1), but does 8 divide into 12? 12/8 = 1.5 -- not evenly! Try a smaller number."
  - 24: "24 is the LCM of 8 and 12, not the GCF! The GCF is always less than or equal to the smaller number."
  - 12: "12 doesn't divide into 8 evenly (8/12 is less than 1). The GCF can't be bigger than the smaller number."
  - 96: "96 = 8 x 12. That's the product, not the GCF! (In fact, the LCM is 24, not 96 either.)"
- Visualization: mini Venn with factors of 8 and 12, overlap = {1, 2, 4}, biggest highlighted

**Problem R3: Quick LCM Recall**

- Type: `numeric-input`
- Prompt: "What is the LCM of 4 and 6?"
- Input: same numeric input styling as R2
- Correct answer: 12
- Feedback (correct): "Right! Multiples of 4: 4, 8, **12**, 16... Multiples of 6: 6, **12**, 18... The first number in BOTH lists is 12."
- Feedback (incorrect, common errors):
  - 24: "24 IS a common multiple of 4 and 6, but it's not the LEAST. There's a smaller common multiple. List out multiples of each!"
  - 2: "2 is the GCF of 4 and 6, not the LCM! The LCM is a multiple (bigger), the GCF is a factor (smaller)."
  - 4: "4 is a multiple of 4 (trivially), but is 4 a multiple of 6? 4/6 is not a whole number. Keep listing multiples of both!"
  - 6: "6 is a multiple of 6 (trivially), but is 6 a multiple of 4? 6/4 = 1.5 -- nope. Keep going!"
  - 10: "10 is not a multiple of 4 (10/4 = 2.5) or 6 (10/6 = 1.67). List multiples of 4: 4, 8, 12... and multiples of 6: 6, 12..."
- Visualization: dual number line showing multiples of 4 and 6 meeting at 12

---

### Procedure Layer (Layer 1)

**Problem P1: Find GCF Using Prime Factorization**

- Type: `drag-arrange`
- Prompt: "Find the GCF of 24 and 36 by sorting their prime factors into a Venn diagram. Drag the shared factors into the overlap."
- Input: interactive mini Venn diagram (same UI as Phase A of Stage 2, but smaller)
  - 24 = 2^3 x 3, 36 = 2^2 x 3^2
  - Tiles: [2] [2] [2] [3] [3] (max(3,2)=3 twos, max(1,2)=2 threes)
  - Reference shown: "24 = 2 x 2 x 2 x 3" and "36 = 2 x 2 x 3 x 3"
  - @use-gesture/react `useDrag` for tile dragging
- Correct placement:
  - Left (only 24): [2] (the extra 2 in 24's factorization)
  - Overlap: [2] [2] [3] (both have at least 2^2 and 3^1)
  - Right (only 36): [3] (the extra 3 in 36's factorization)
- Correct GCF: 2 x 2 x 3 = 12
- Validation: checks that overlap tiles multiply to the correct GCF
- Feedback (correct): "GCF(24, 36) = 2 x 2 x 3 = 12. Both 24 and 36 divide evenly by 12: 24/12 = 2, 36/12 = 3."
- Feedback (incorrect): "Check which prime factors appear in BOTH factorizations. 24 has three 2s but 36 has only two 2s, so only two 2s are shared."
- Visualization: completed Venn diagram with GCF and LCM readouts

**Problem P2: Find LCM Using Listing Method**

- Type: `tap-to-select`
- Prompt: "Find the LCM of 6 and 9. Tap all the COMMON multiples you can see, then identify the SMALLEST one."
- Input: a 2-row display:
  - Row 1 "Multiples of 6": buttons for 6, 12, 18, 24, 30, 36, 42, 48, 54 (first 9 multiples)
  - Row 2 "Multiples of 9": buttons for 9, 18, 27, 36, 45, 54, 63, 72, 81
  - Each button: 52x44px, `borderRadius: 8px`, `fill: #1e293b`, `stroke: #334155`, number text centered, `fontSize: 16px`
  - Row 1 text: `fill: #818cf8`, Row 2 text: `fill: #34d399`
  - Selectable state: student taps to mark common multiples. Selected: `stroke: #fbbf24`, `fill: #fbbf2410`
- Phase 1: Tap common multiples (18, 36, 54 are common to both rows)
- Phase 2: After at least 2 common multiples are selected, a prompt appears: "Which is the SMALLEST?" with a single-select among the selected numbers
- Correct answer: LCM = 18
- Feedback (correct): "LCM(6, 9) = 18. It's the first number that appears in both lists! Note: 6 x 9 = 54, but LCM = 18 because 6 and 9 share the factor 3."
- Feedback (incorrect):
  - Selected 36 as smallest: "36 IS a common multiple, but 18 comes first! Look at both lists more carefully."
  - Missed 18: "Check the multiples of 6 again: 6, 12, 18... and multiples of 9: 9, 18... Do you see it?"
- Visualization: dual number lines with hop arcs, landing together at 18

**Problem P3: GCF to Simplify a Fraction**

- Type: `multiple-choice`
- Prompt: "Simplify the fraction 15/25 using the GCF."
- Options:
  - A: "3/5" -- `correct`
  - B: "1/5" -- `incorrect`
  - C: "5/10" -- `incorrect`
  - D: "15/25 is already simplified" -- `incorrect`
- Feedback (A correct): "GCF(15, 25) = 5. Divide both: 15 ÷ 5 = 3, 25 ÷ 5 = 5. So 15/25 = 3/5!"
- Feedback (B): "You divided the numerator by 15 and the denominator by 25 -- but you need to divide BOTH by the SAME number (the GCF). GCF(15, 25) = 5."
- Feedback (C): "You divided both by 3, but 5/10 can be simplified further (GCF(5,10) = 5). To fully simplify in one step, use the GCF of the ORIGINAL numbers: GCF(15, 25) = 5."
- Feedback (D): "15 and 25 are both divisible by 5 (they share the factor 5). GCF(15, 25) = 5, so we can simplify by dividing both by 5."
- Visualization: fraction bar 15/25, the GCF(15,25)=5 highlighted, bar merging to 3/5

---

### Understanding Layer (Layer 2)

**Problem U1: LCM Is Not Always the Product**

- Type: `multiple-choice`
- Prompt: "The LCM of 6 and 10 is NOT 60 (which is 6 x 10). Why?"
- Options:
  - A: "Because 6 and 10 share a common factor (2), so the LCM is smaller" -- `correct`
  - B: "Because the LCM is always half the product" -- `incorrect`
  - C: "Because 60 is not a multiple of 6 or 10" -- `incorrect`
  - D: "Because you need to add them, not multiply" -- `incorrect`
- Feedback (A correct): "Exactly! 6 = 2 x 3 and 10 = 2 x 5. They share the factor 2, so it only needs to appear once in the LCM: LCM = 2 x 3 x 5 = 30. When two numbers share factors, the LCM is LESS than their product."
- Feedback (B): "The LCM is not always half the product -- it depends on how many factors the numbers share. For 6 and 10, LCM = 30 (which happens to be half of 60), but for 4 and 6, LCM = 12, and 4 x 6 = 24, so 12 is half of 24 too. That works here because GCF = 2 in both cases! But for 12 and 18, LCM = 36 and product = 216, so 36 is NOT half of 216."
- Feedback (C): "Actually, 60 IS a multiple of both 6 (6 x 10 = 60) and 10 (10 x 6 = 60). But the LCM is the SMALLEST common multiple, and 30 works too: 30/6 = 5 and 30/10 = 3."
- Feedback (D): "Adding 6 + 10 = 16, which is not a multiple of either 6 or 10. The LCM involves factoring, not adding."
- Visualization: Venn diagram for 6 (2 x 3) and 10 (2 x 5) showing the shared 2 in the overlap. LCM = 2 x 3 x 5 = 30. Arrow annotation: "The shared 2 is counted ONCE, not twice -- that's why LCM < product."

**Problem U2: GCF and LCM Relationship**

- Type: `numeric-input`
- Prompt: "GCF(15, 20) = 5. What is LCM(15, 20)? Hint: GCF x LCM = 15 x 20."
- Input: single number input, `width: 80px`, centered, `fontSize: 24px`
  - Numeric keyboard on mobile (`inputMode="numeric"`)
- Correct answer: 60 (because 5 x LCM = 300, so LCM = 60)
- Feedback (correct): "Using the identity: GCF x LCM = a x b → 5 x LCM = 15 x 20 = 300 → LCM = 300 / 5 = 60. You can verify: 60/15 = 4 ✓ and 60/20 = 3 ✓."
- Feedback (incorrect, common errors):
  - 300: "300 = 15 x 20 is the product, not the LCM. Since GCF = 5 (not 1), the LCM is smaller than the product. Use: LCM = 15 x 20 / GCF = 300 / 5."
  - 15: "15 is a multiple of 15, but is 15 a multiple of 20? 15/20 = 0.75 -- no! The LCM must be at least as big as the larger number (20)."
  - 20: "20 is a multiple of 20, but is 20 a multiple of 15? 20/15 = 1.33... -- no! Try using the formula: GCF x LCM = 15 x 20."
  - 100: "Let's check: is 100 divisible by 15? 100/15 = 6.67 -- no. Use the formula: 5 x LCM = 300, so LCM = 60."
- Visualization: the identity equation animated: "5 x ? = 15 x 20 = 300" → "? = 300 ÷ 5 = 60" with the 60 scaling up and glowing amber

**Problem U3: Applying LCM to Common Denominators**

- Type: `multiple-choice`
- Prompt: "To add 1/8 + 1/6, you need a common denominator. What is the LCD (Least Common Denominator)?"
- Options:
  - A: "48" -- `incorrect`
  - B: "24" -- `correct`
  - C: "14" -- `incorrect`
  - D: "2" -- `incorrect`
- Feedback (B correct): "LCD = LCM(8, 6) = 24. Now: 1/8 = 3/24 and 1/6 = 4/24. So 1/8 + 1/6 = 3/24 + 4/24 = 7/24!"
- Feedback (A): "48 IS a common multiple (6 x 8 = 48), but it's not the LEAST. GCF(8, 6) = 2, so LCM = 48/2 = 24. Using a smaller denominator makes the math easier!"
- Feedback (C): "14 = 8 + 6. Adding denominators is a common mistake! To find the LCD, you need the LCM, not the sum. Multiples of 8: 8, 16, 24... Multiples of 6: 6, 12, 18, 24... LCD = 24."
- Feedback (D): "2 is the GCF of 8 and 6, not the LCM! The GCF is a factor (smaller), the LCD/LCM is a multiple (bigger). You need a number that BOTH 8 and 6 divide into."
- Visualization: two fraction bars (1/8 and 1/6) side by side. Both bars split into 24ths (8 groups of 3 and 6 groups of 4). The bars now have same-sized pieces and can be combined: 3/24 + 4/24 = 7/24. KaTeX equation alongside.

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
- "Next" button appears after feedback is shown: same indigo styling, text "Next →"

### Practice -- Accessibility

- Problem cards: `role="form"` with `aria-labelledby` pointing to prompt text
- Multiple-choice: `role="radiogroup"` with `role="radio"` per option
- Numeric input: `<input type="text" inputMode="numeric">` with `aria-label`
- Drag tiles (Problem P1): `role="listbox"` source, `role="listbox"` destination, with `aria-grabbed` and `aria-dropeffect`
- Tap-to-select (Problem P2): `role="group"` with `role="checkbox"` per option
- Feedback announcements: `aria-live="assertive"` for correct/incorrect
- Submit button: `aria-disabled` when no answer selected
- Layer indicator dot: `aria-hidden="true"` (decorative)

### Practice -- Interleaving (PF-5)

Problems are NOT presented in a blocked sequence. The IRT selector interleaves NT-2.3 problems with review problems from prerequisites (NT-2.1 Factors & Multiples, NT-2.2 Prime Numbers) if the student has prior review items due. In a first-time lesson context (no prior reviews), all 9 problems are from NT-2.3 but are interleaved across the three layers rather than grouped by layer.

---

## Stage 7: Reflection (approximately 1 minute)

### Reflection Prompt

**Card styling**: same as Guided Discovery cards, but with a golden left accent bar (`#fbbf24`) to signal this is a reflection moment.

**Prompt text**:
> "Explain in your own words: how does the Venn diagram of prime factors help you find BOTH the GCF and the LCM? Why are GCF and LCM useful for fractions?"

**Input**: text area
- `minHeight: 120px`, `maxHeight: 300px` (auto-expands)
- Placeholder: "The Venn diagram helps because..."
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
| 1 | Vaguely on topic but no real insight ("GCF and LCM are useful") | 16 |
| 2 | Shows basic understanding (mentions overlap = GCF or union = LCM) | 32 |
| 3 | Good explanation connecting Venn diagram to both GCF and LCM with correct direction (overlap vs union) | 48 |
| 4 | Strong explanation connecting to fractions (GCF simplifies, LCM finds common denominators) | 64 |
| 5 | Exceptional: original insight, analogy, or extension (e.g., GCF x LCM = product identity, coprime case, or creative real-world application) | 80 |

**Feedback display**:
1. Brief "thinking" animation: three dots pulsing (`opacity: 0.3 <-> 1.0`, 400ms cycle), 1-2 seconds while AI processes
2. AI feedback appears below the text area:
   - Container: `fill: #1e293b`, `borderRadius: 12px`, `padding: 16px`, `border: 1px solid #334155`
   - Left icon: small brain/lightbulb icon in `#fbbf24`
   - Text: AI's response in `#cbd5e1`, `fontSize: 15px`
   - Example feedback (score 3): "Great thinking! You explained how the Venn overlap gives the GCF (shared factors) and the full diagram gives the LCM (all unique factors). You might also think about the connection to fractions: when you simplify 12/18, you're dividing by the GCF (6), and when you add 1/4 + 1/6, you use the LCM (12) as your common denominator!"
3. XP award: "+48 XP: Reflection" floats up, same styling as other XP awards
4. If `ahaDetected` is true: trigger the "Aha Moment" celebration (see gamification design -- Neuron Flash, brief neural network animation)
5. If `referencesPriorConcept` is true (e.g., mentions prime factorization, factor rectangles from NT-2.1/NT-2.2): "+1.3x Connection Maker" multiplier text appears briefly

### Reflection -- Accessibility

- Text area: standard accessible `<textarea>` with `aria-label="Write your reflection about how the Venn diagram helps find GCF and LCM"`
- Submit button: `aria-disabled` when under minimum character count, with `aria-describedby` explaining the requirement
- Skip button: `aria-label="Skip reflection"`, no `aria-hidden`
- AI feedback: `aria-live="polite"` region
- XP notification: `aria-live="polite"`

---

## Content Files Structure

This lesson produces the following content files per the project structure:

```
src/content/domains/number-theory/NT-2.3/
  lesson.mdx          # 7-stage content with prose, prompts, stage markers
  animations.json      # MathScene configs for hook, Venn diagram, number lines, symbol bridge
  problems.json        # Practice problem bank (9+ problems with metadata)
  meta.json            # Prerequisites, successors, hooks, metadata
```

### meta.json

```json
{
  "id": "NT-2.3",
  "name": "GCF & LCM",
  "domain": "number-theory",
  "gradeLevel": 6,
  "contentPath": "number-theory/NT-2.3",
  "prerequisites": ["NT-2.1", "NT-2.2"],
  "successors": ["NO-1.4a", "AL-3.3"],
  "hook": "Two metronomes tick every 3 and 4 beats. At beat 12 they sync. You just HEARD the LCM!",
  "estimatedDurationMinutes": 24,
  "tags": ["GCF", "LCM", "greatest-common-factor", "least-common-multiple", "prime-factorization", "venn-diagram", "common-denominator", "simplify-fractions", "coprime"],
  "interactionMinimum": 10,
  "spatialModel": "venn-diagram",
  "secondarySpatialModel": "dual-number-line",
  "coreVisualization": "prime-factor-venn"
}
```

---

## Technical Specifications

### SVG Rendering Pipeline

All visuals in this lesson use the SVG renderer (`renderer: "svg"`). No WebGL/R3F required -- all content is 2D.

**Venn diagram rendering**:
- Two `<circle>` elements with Framer Motion `motion.circle`
- Overlap region: computed via SVG `<clipPath>` intersection of the two circles, filled with a separate `<rect>` clipped to the intersection
- Prime factor tiles: `<rect>` + `<text>` pairs with `motion.rect` and `motion.text`
- Drop zones: detected via hit testing against circle boundaries (point-in-circle math for crescents, point-in-both-circles for overlap)

**Number line rendering**:
- Horizontal `<line>` element with tick marks as short `<line>` segments
- Hop arcs: `<path>` elements using quadratic Bezier curves (`M x1,y Q midx,peaky x2,y`)
- Landing dots: `<circle>` elements at multiples
- Common multiple markers: `<line>` vertical connectors + enhanced dots

**Responsive viewBox**:
- Mobile (width < 640px): `viewBox="0 0 360 480"` (portrait)
- Tablet (640-1024px): `viewBox="0 0 600 400"` (landscape-ish)
- Desktop (>1024px): `viewBox="0 0 800 500"` (wide)
- `preserveAspectRatio="xMidYMid meet"` ensures content scales without distortion
- Venn circle radius scales: `r = viewBoxWidth / 4` for each circle, with centers offset by `r * 0.8` for appropriate overlap

### Animation System

**Spring configurations used in this lesson**:

| Name | Usage | Damping | Stiffness | Mass |
|------|-------|---------|-----------|------|
| `snapSpring` | Tile placement in Venn zones, number snap | 25 | 400 | 1 |
| `gentleSpring` | UI element entry, card animations, readout updates | 20 | 300 | 1 |
| `bouncySpring` | Sync moment celebration, GCF/LCM reveal, Aha moments | 15 | 350 | 1 |
| `quickSpring` | Tile hover effects, small UI feedback | 30 | 500 | 0.8 |
| `hopSpring` | Number line hop arcs, metronome swings | 22 | 350 | 1 |

**Easing curves** (for non-spring animations):

| Name | CSS Equivalent | Usage |
|------|---------------|-------|
| `easeOut` | `cubic-bezier(0, 0, 0.2, 1)` | Fade-ins, labels appearing |
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` | Beat cursor movement, sequential highlighting |
| `easeOutBack` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Surprise annotations, sync moment, LCM reveal |

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `gcf-accent` | `#fbbf24` (amber-400) | GCF values, overlap zone, shared factors, key revelations |
| `gcf-bg` | `#fbbf2415` (amber 8%) | Venn overlap background |
| `lcm-accent` | `#818cf8` (indigo-400) | LCM values, union/full diagram, general accents |
| `number-a` | `#818cf8` (indigo-400) | First number, left Venn circle, top number line |
| `number-a-bg` | `#818cf810` (indigo 6%) | Left Venn circle fill |
| `number-b` | `#34d399` (emerald-400) | Second number, right Venn circle, bottom number line |
| `number-b-bg` | `#34d39910` (emerald 6%) | Right Venn circle fill |
| `sync-marker` | `#fbbf24` (amber-400) | Common multiple markers, sync moment |
| `valid` | `#34d399` (emerald-400) | Correct answers, verification checks |
| `invalid` | `#fb7185` (rose-400) | Incorrect answers (used sparingly, no alarm styling) |
| `text-primary` | `#f1f5f9` (slate-100) | Headings, primary text |
| `text-secondary` | `#e2e8f0` (slate-200) | Body text, KaTeX |
| `text-muted` | `#94a3b8` (slate-400) | Annotations, hints, secondary labels |
| `surface` | `#1e293b` (slate-800) | Card backgrounds, tile fills |
| `surface-dark` | `#0f172a` (slate-950) | Problem card backgrounds |
| `border` | `#334155` (slate-700) | Card borders, default tile strokes |

### Performance Budget

- **Hook**: ~40 SVG elements. 60fps target.
- **Venn diagram**: ~20 elements (2 circles + up to 6 tiles + labels + readouts). 60fps during drag.
- **Number lines**: ~80 elements per pair (ticks + arcs + dots + labels). Static after initial animation.
- **Symbol bridge**: ~30 elements (equations + connecting lines). Mostly static.
- **Practice**: ~20 elements per problem (options/inputs + visualization). Lightweight.
- **Total peak**: ~120 elements simultaneously (Venn + number lines during Stage 2). Well under 200-element SVG budget.
- No WebGL required anywhere in this lesson.
- Target: 60fps on iPhone SE 2nd gen (A13 Bionic) during drag interactions.
- Memory: <3MB total scene at peak.

---

## Quality Checklist

### Functionality
- [ ] All 7 stages render without errors
- [ ] Stage progression works (each stage leads to next)
- [ ] Continue buttons appear at correct triggers (10 interactions for Stage 2)
- [ ] Venn diagram drag-and-drop works with correct hit testing for overlap vs crescents
- [ ] GCF/LCM readouts update live during tile placement
- [ ] All 3 Venn challenges complete with correct validation
- [ ] Number line hop arcs draw correctly for all challenge numbers
- [ ] All 9 practice problems have correct answers validated
- [ ] Feedback stays visible until "Next" is tapped
- [ ] Reflection accepts text and shows AI response
- [ ] `onComplete` fires after Stage 7

### Visual Quality
- [ ] Metronome animations are smooth in hook
- [ ] Venn diagram overlap region renders correctly via clip-path
- [ ] Colors are consistent: amber for GCF/shared, indigo for number-a/LCM, emerald for number-b
- [ ] Text is readable on dark background
- [ ] No layout overflow on mobile (375px width)
- [ ] Numbers use `tabular-nums` for alignment
- [ ] Progress bar at top shows current stage (7 dots)

### Interactions
- [ ] All touch targets >= 44px (tiles are 48px)
- [ ] Drag interactions work on touch devices
- [ ] Tiles can be moved between zones after placement
- [ ] Visual feedback on every tap/click (scale, color, or highlight)
- [ ] No dead states (always a way to progress)

### Accessibility
- [ ] Venn diagram has keyboard alternative (Tab + Arrow keys + Enter)
- [ ] Interactive elements have aria-labels
- [ ] Live regions announce GCF/LCM changes during tile placement
- [ ] Keyboard navigation possible for all practice problems
- [ ] Reduced motion preferences respected throughout

### Build
- [ ] `pnpm build` passes with no type errors
- [ ] No console errors in browser DevTools
- [ ] TypeScript strict mode -- no `any` types
- [ ] `useRef(null)` used (not bare `useRef()`)
- [ ] `"middle" as const` for SVG textAnchor attributes
