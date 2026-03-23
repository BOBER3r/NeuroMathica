# Lesson Design: GE-4.1 Angles

**Topic ID**: GE-4.1 | **Domain**: Geometry | **Grade**: 6
**Version**: 1.0.0 | **Date**: 2026-03-22
**Status**: Design Complete | **Author**: Curriculum Team
**Content License**: CC BY-SA 4.0 (Principle VII)

---

## Metadata

| Field | Value |
|-------|-------|
| Topic ID | GE-4.1 |
| Name | Angles |
| Domain | Geometry (Domain 4) |
| Grade Level | 6 |
| Prerequisites | None (root concept -- entry point to Geometry domain) |
| Successors | GE-4.1a (Angle Pairs & Parallel Lines), GE-4.2 (Triangles), GE-4.3 (Quadrilaterals) |
| Estimated Duration | 12-18 minutes (all 7 NLS stages) |
| Content Path | `geometry/GE-4.1/` |
| Files | `lesson.mdx`, `animations.json`, `problems.json`, `meta.json` |
| Knowledge Nebula Color | Teal/Green (Geometry constellation) |
| SRS Layers | Layer 0 (Recall): classify angle types; Layer 1 (Procedure): compute complementary/supplementary; Layer 2 (Understanding): explain triangle angle sum, explain why classifications exist |

### Cross-Topic Connections (Principle III)

| Direction | Topic | Connection |
|-----------|-------|------------|
| Forward | GE-4.1a | Angle pairs at parallel lines build directly on angle classification |
| Forward | GE-4.2 | Triangle angle sum (180) uses angle measurement and straight angle concept |
| Forward | GE-4.3 | Quadrilateral angle sum (360) extends the triangle result |
| Lateral | NO-1.4 | Complementary/supplementary involve fraction-of-circle reasoning |
| Lateral | NO-1.2a | Subtraction for finding missing angles (90 - x, 180 - x) |
| Preview | GE-4.11 | Rotation transformations are measured in angles |

### Constitution Compliance

| Principle | How This Lesson Complies |
|-----------|-------------------------|
| CP-I: Understanding Over Memorization | Classification emerges from exploration, not from a table to memorize. Practice includes "explain why" questions. Reflection asks for reasoning about the 180 triangle sum. |
| CP-II: Visual First, Symbolic Second | Stage 2 is pure spatial manipulation -- no notation. Notation (angle ABC, theta, degree symbol) arrives only in Stage 4 after 4+ minutes of visual interaction. |
| CP-III: No Dead-End Content | Feeds into GE-4.1a, GE-4.2, GE-4.3. Previews triangle angle sum. Connected to fractions (complementary = fraction of 90). |
| CP-IV: Accessibility Is Architecture | SVG renderer with full ARIA labels. Keyboard-operable ray dragging (arrow keys). Color + label for angle types (never color alone). Screen reader announces angle type changes. |
| CP-V: Performance Is UX | Pure SVG + Framer Motion. No R3F needed. Max ~30 SVG elements in the most complex scene. Target: 60fps on mid-range mobile. |
| CP-VI: Privacy by Design | No external data collection in this lesson. Interaction counts stored locally until session sync. |
| CP-VII: Open Curriculum | Full lesson content in MDX + JSON. Animation configs declarative. Community can author alternative hooks or problems. |

---

## Core Insight

An angle measures the **amount of turn/rotation** between two rays sharing a common endpoint (the vertex). Angles are everywhere -- from clock hands to door openings to skateboard ramps. The concept of angle unifies rotation, measurement, and classification into a single spatial idea that underpins all of geometry.

Key conceptual milestones in this lesson:
1. An angle is a **rotation**, not a shape.
2. A full rotation is 360 degrees; this is a convention, not a law of nature.
3. Angles fall into named categories based on their size relative to 90 and 180.
4. Complementary angles add to 90; supplementary angles add to 180.
5. The angles in any triangle always sum to exactly 180 (previewed, proven in GE-4.2).

---

## Neuroscience Framework

### Cognitive Architecture

| Neural System | Role in This Lesson | Design Implication |
|---------------|--------------------|--------------------|
| Intraparietal sulcus (IPS) | Primary spatial magnitude processing -- angle size is a magnitude | Dragging the ray activates the IPS directly; the continuous change in arc size creates a spatial magnitude representation |
| Visuospatial sketchpad (working memory) | Holds the mental image of the angle during manipulation | Keep the canvas clean -- vertex + two rays + arc + label. No more than 5 visual elements simultaneously. |
| Motor cortex (embodied cognition) | Finger/mouse rotation creates motor-spatial coupling | The drag gesture must feel like physically rotating a ray. Spring physics, not teleportation. |
| Prefrontal cortex (categorization) | Classification of angle types activates categorical reasoning circuits | Color change + label change at type boundaries creates salient category boundaries |
| Hippocampus (episodic memory) | Clock metaphor activates prior real-world knowledge | Starting with 3:00 clock leverages thousands of prior exposures to clock faces |
| Ventral tegmental area (reward) | Novelty and discovery moments trigger dopamine | The reflex angle reveal ("secret level") is deliberately framed as a hidden discovery |

### Emotional Arc

```
Familiarity     Playfulness     Systematization     Application     Reflection
(clock)    -->  (make angles) --> (classification) --> (triangle sum) --> (why 180?)
   |                |                   |                   |               |
 Comfort         Curiosity          Competence          Wonder         Ownership
 "I know this"   "Cool!"           "I can name these"  "Always 180?!" "I get it"
```

### Memory Encoding Strategy

1. **Episodic anchor**: Clock at 3:00 -- universally recognized, emotionally neutral, visually clear.
2. **Motor trace**: Physical rotation of the ray encodes angle-as-rotation in motor cortex.
3. **Categorical encoding**: Color + label changes at boundaries (90, 180, 360) create distinct categorical memories.
4. **Surprise encoding**: The reflex angle ("past 180") violates the expectation that angles are "small" -- surprise enhances retention.
5. **Semantic linking**: Complementary/supplementary pairs create relational memory structures.
6. **Retrieval practice**: The reflection question ("Why do triangle angles always sum to 180?") requires active reconstruction.

---

## Stage 1: Hook (30-60 seconds)

### Scene: `hook-clock-rotation`

**Renderer**: SVG | **viewBox**: `[-6, -6, 12, 12]` | **Background**: `transparent`

#### Visual Design

A clean analog clock face centered at the origin. The clock uses a minimalist design -- no numbers around the face, just 12 tick marks at the hour positions and 60 smaller tick marks at the minute positions. The clock face has a thin border circle (stroke: `#334155`, strokeWidth: 1.5). The center point (vertex) is marked with a small filled circle (radius: 0.15, fill: `#fbbf24` -- amber, matching the "right angle" color).

**Hour hand**: Short (length: 2.5 units), thick (strokeWidth: 3), color `#1e293b` (slate-900). Remains fixed at the 12-o'clock position throughout.

**Minute hand**: Long (length: 4.0 units), medium thickness (strokeWidth: 2.5), color `#3b82f6` (blue-500). This is the ray that rotates.

**Angle arc**: An SVG arc path drawn from the hour hand to the minute hand, measuring the swept angle. Starts invisible, fades in as the animation begins.

**Degree counter**: A KaTeX annotation positioned at `[0, -7.5]` (below the clock), displaying the current angle value in large text (fontSize: 28, fontFamily: `"Space Grotesk", monospace`, fontVariantNumeric: `tabular-nums`). Format: `{value}deg` rendered as KaTeX.

**Swept area fill**: A pie-slice SVG path from the center through both rays, filled with a translucent color that changes based on the current angle type. Initially invisible.

#### Animation Sequence

**Phase 1: Clock appears (0.0s - 0.8s)**
1. `[0.0s]` Clock face border circle draws in (SVG path draw animation, `draw`, duration: 0.5s, ease: `easeInOut`).
2. `[0.3s]` Tick marks fade in as a group (opacity 0 to 1, duration: 0.4s, ease: `easeInOut`).
3. `[0.5s]` Hour hand fades in from center outward (scale from 0 at center to full length, duration: 0.3s, ease: `easeOutBack`).
4. `[0.6s]` Minute hand fades in from center outward (same animation, duration: 0.3s, ease: `easeOutBack`).
5. `[0.7s]` Both hands now at 12:00 position. Degree counter fades in showing `0deg`.

**Phase 2: Minute hand moves to 3:00 (0.8s - 2.0s)**
1. `[0.8s]` Minute hand begins rotating clockwise from 12:00 to 3:00 (0 to 90 degrees).
   - Animation: `transform: rotate(0deg) -> rotate(90deg)` on the minute hand group, pivoting around the center point.
   - Duration: 1.2s. Ease: `easeInOut`.
   - The angle arc draws in real-time as the hand sweeps (SVG arc path updates every frame).
   - The swept area fills with `#34d39940` (emerald-400 at 25% opacity) during 0-89 degrees.
   - The degree counter increments smoothly from 0 to 90 (use `useMotionValue` + `useTransform` to derive integer display from rotation progress).
2. `[1.9s]` At exactly 90 degrees:
   - Swept area color transitions to `#fbbf2440` (amber-400 at 25% opacity) over 0.15s.
   - A small square symbol (8x8 px, stroke: `#fbbf24`, strokeWidth: 1.5, fill: none) appears at the vertex where the arc meets the rays.
   - Degree counter shows `90deg` with a brief scale pulse (scale 1.0 -> 1.15 -> 1.0, duration: 0.3s, ease: spring(damping: 10, stiffness: 400)).
   - Text annotation fades in below the degree counter: "Quarter turn" (fontSize: 16, color: `#94a3b8`).

**Phase 3: Minute hand continues to 6:00 (2.0s - 3.2s)**
1. `[2.0s]` Small square fades out (duration: 0.15s). "Quarter turn" label fades out (duration: 0.15s).
2. `[2.1s]` Minute hand resumes rotating from 90 to 180 degrees.
   - Duration: 1.1s. Ease: `easeInOut`.
   - Swept area color transitions to `#60a5fa40` (blue-400 at 25% opacity) at 91 degrees.
   - At 180 degrees, transitions to `#818cf840` (indigo-400 at 25% opacity).
   - Degree counter increments 90 -> 180.
3. `[3.1s]` At 180 degrees:
   - The two rays now form a straight line. Brief pulse on the degree counter showing `180deg`.
   - Text annotation: "Half turn" (same styling as "Quarter turn").

**Phase 4: Minute hand continues to 9:00 (3.2s - 4.2s)**
1. `[3.2s]` "Half turn" fades out.
2. `[3.3s]` Minute hand rotates from 180 to 270 degrees.
   - Duration: 1.0s. Ease: `easeInOut`.
   - Swept area color: `#fb718540` (rose-400 at 25% opacity) from 181 degrees onward.
   - Degree counter: 180 -> 270.
3. `[4.2s]` At 270 degrees:
   - Text annotation: "Three-quarter turn".

**Phase 5: Full rotation to 12:00 (4.2s - 5.5s)**
1. `[4.3s]` "Three-quarter turn" fades out.
2. `[4.4s]` Minute hand rotates from 270 to 360 degrees.
   - Duration: 1.0s. Ease: `easeInOut`.
   - Degree counter: 270 -> 360.
3. `[5.4s]` At 360 degrees:
   - The swept area is now a complete circle. Brief glow effect on the entire circle (opacity pulse 0.25 -> 0.5 -> 0.25, duration: 0.4s).
   - Degree counter shows `360deg` then quickly morphs to `0deg` (crossfade, duration: 0.3s).
   - Text annotation: "Full turn = back to start".

**Phase 6: Core message (5.5s - 7.5s)**
1. `[5.6s]` Clock shrinks and moves to the left side of the canvas (scale 0.5, translate to `[-4, 0]`, duration: 0.6s, ease: spring(damping: 20, stiffness: 300)).
2. `[6.2s]` Text appears on the right side, line by line:
   - Line 1 (fontSize: 20, fontWeight: 700, color: `#f8fafc`): "Angles measure ROTATION." Fade in from right, duration: 0.4s.
   - `[6.6s]` Line 2 (fontSize: 16, color: `#cbd5e1`): "A full turn = 360deg." Fade in from right, duration: 0.4s.
   - `[7.0s]` Line 3 (fontSize: 16, color: `#cbd5e1`): "A quarter turn = 90deg." Fade in from right, duration: 0.4s.

**Phase 7: Real-life flash montage (7.5s - 9.5s)**
1. `[7.5s]` Clock and text fade out together (duration: 0.3s).
2. `[7.8s]` A rapid sequence of 4 simple SVG illustrations, each appearing for 0.4s with a 0.1s crossfade:
   - **Door opening**: Two lines from a hinge point, one vertical (door frame), one at 45 degrees (open door). Arc showing ~45 degrees. Label: "Door: ~45deg" (positioned below).
   - **Pizza slice**: Two lines from a center point with ~30-degree angle, filled triangular slice shape. Label: "Pizza slice: ~30deg".
   - **Skateboard ramp**: A horizontal line and an angled line forming ~20 degrees. Label: "Ramp: ~20deg".
   - **Scissors**: Two lines crossing at a center point, forming ~25-degree V shape. Label: "Scissors: ~25deg".
3. Each illustration uses a consistent style: stroke `#e2e8f0`, strokeWidth: 2, arc stroke matches the angle type color (all are acute, so `#34d399`).

**Phase 8: Continue prompt (9.5s - 10.0s)**
1. `[9.5s]` All illustrations fade out (duration: 0.3s).
2. `[9.8s]` Continue button fades in at the bottom of the canvas.
   - The continue button is NOT visible before 10 seconds from the start of the hook.
   - Button style: `height: 48px`, `borderRadius: 12px`, `background: #3b82f6`, `color: white`, `fontSize: 16`, `fontWeight: 600`. Text: "Let's explore angles".
   - Fade in with slight upward motion (translateY: 8 -> 0, opacity: 0 -> 1, duration: 0.4s).

#### Accessibility (Stage 1)

- `aria-live="polite"` region announces: "A clock shows the minute hand sweeping from 12 to 3, forming a 90 degree angle. The hand continues to 6 forming 180 degrees, to 9 forming 270 degrees, and back to 12 for a full 360 degree rotation."
- Degree counter has `role="status"` and updates are throttled to every 15 degrees for screen reader announcements.
- All SVG elements have `<title>` and `<desc>` elements.
- Continue button is focusable and activatable with Enter/Space.

#### MathScene JSON (abbreviated)

```json
{
  "id": "ge-4.1-hook-clock",
  "renderer": "svg",
  "viewBox": [-6, -6, 12, 12],
  "objects": [
    {
      "type": "group", "id": "clock-face",
      "children": [
        {
          "type": "geometricShape", "id": "clock-border",
          "shape": "circle", "center": [0, 0], "radius": 5,
          "style": { "stroke": "#334155", "strokeWidth": 1.5, "fill": "transparent" }
        },
        {
          "type": "group", "id": "tick-marks",
          "children": "/* 12 major ticks + 60 minor ticks generated programmatically */"
        }
      ]
    },
    {
      "type": "line", "id": "hour-hand",
      "from": [0, 0], "to": [0, 2.5],
      "style": { "stroke": "#1e293b", "strokeWidth": 3 }
    },
    {
      "type": "line", "id": "minute-hand",
      "from": [0, 0], "to": [0, 4.0],
      "style": { "stroke": "#3b82f6", "strokeWidth": 2.5 }
    },
    {
      "type": "angle", "id": "sweep-arc",
      "vertex": [0, 0],
      "ray1End": [0, 4.0],
      "ray2End": [0, 4.0],
      "showArc": true, "showMeasurement": false, "arcRadius": 2.0,
      "style": { "fill": "#34d39940", "stroke": "#34d399", "strokeWidth": 1.5 }
    },
    {
      "type": "annotation", "id": "degree-counter",
      "position": [0, -7.5],
      "latex": "0°",
      "style": { "fontSize": 28, "fontFamily": "Space Grotesk" }
    }
  ],
  "animations": [
    {
      "id": "hook-sequence",
      "trigger": "auto",
      "steps": "/* Full sequence as described above */"
    }
  ]
}
```

---

## Stage 2: Spatial Experience (2-4 minutes)

### Interaction Counter

A minimum of **10 meaningful interactions** is required before the "Continue" button appears. Interactions are counted as:
- Dragging the ray to a new angle (must move more than 5 degrees from the previous position to count).
- Tapping a preset button.
- Activating complementary or supplementary mode.
- Changing one angle in a pair mode.

The interaction counter is displayed as a subtle progress indicator (10 small dots at the top of the canvas, filling in from left to right as interactions occur). Style: unfilled dot = `#334155` (slate-700), filled dot = `#3b82f6` (blue-500), diameter: 6px, gap: 4px between dots. The dots do NOT have numerical labels -- they are purely visual progress.

### Scene: `spatial-angle-maker`

**Renderer**: SVG | **viewBox**: `[-8, -8, 16, 16]` | **Background**: `transparent`

#### Layout

The canvas is divided into two conceptual zones:

**Primary zone** (center, 70% of canvas area): The angle maker -- a vertex point with two rays.

**Control zone** (bottom, 30% of canvas area): Mode buttons and preset buttons. On mobile, this area stacks below the angle maker in a scrollable container.

#### Visual Elements

**Vertex point**: Positioned at the origin `[0, 0]`. Rendered as a filled circle with radius 0.2, fill `#f8fafc` (slate-50), stroke `#94a3b8` (slate-400), strokeWidth: 1. A subtle pulsing glow animation (box-shadow equivalent via SVG filter: `feGaussianBlur` + `feColorMatrix`) indicates it is a fixed point. The vertex has a small label "V" positioned at `[-0.5, 0.3]` (fontSize: 11, color: `#64748b`).

**Fixed ray (Ray 1)**: Extends from the vertex horizontally to the right, ending at `[6, 0]`. Stroke: `#94a3b8` (slate-400), strokeWidth: 2. Has a small arrowhead at the end (SVG marker, size: 8px). This ray does NOT move -- it serves as the reference direction (the "initial side" of the angle).

**Draggable ray (Ray 2)**: Extends from the vertex at an initial angle of 45 degrees, ending at distance 6 units from the vertex. Stroke: `#f8fafc` (slate-50), strokeWidth: 2.5. Has a small arrowhead at the end. The endpoint of this ray is the **drag handle**.

**Drag handle**: A circle at the endpoint of Ray 2 with radius 0.4 (visual), but a hit area of 44x44px minimum (invisible expanded touch target via a transparent circle with radius scaled to meet the 44px requirement at the current viewport size). The visible handle has:
- Default state: fill `#3b82f6`, stroke `#60a5fa`, strokeWidth: 1.5.
- Hover state: fill `#60a5fa`, scale 1.15, cursor: `grab`.
- Active/dragging state: fill `#93c5fd`, scale 1.25, cursor: `grabbing`. A subtle radial gradient glow effect emanates from the handle during drag.

**Angle arc**: An SVG arc path from Ray 1 to Ray 2, drawn at a radius of 1.8 units from the vertex. The arc uses the shorter angular path for angles 0-180 degrees and the longer path for reflex angles (180-360 degrees). Properties:
- strokeWidth: 2.5.
- Stroke color: changes dynamically based on the current angle type (see Color System below).
- Fill: same color as stroke but at 15% opacity, filling the pie-slice area between the two rays and the arc.
- The arc animates smoothly with the ray during dragging (updated every animation frame via `requestAnimationFrame`).

**Degree display**: A KaTeX annotation positioned dynamically inside the angle arc (for angles > 30 degrees) or outside the arc (for angles < 30 degrees, to avoid cramping). The annotation shows the current angle as an integer (rounded to the nearest degree) with the degree symbol. Properties:
- fontFamily: `"Space Grotesk", monospace`.
- fontVariantNumeric: `tabular-nums` (prevents layout shift as digits change).
- fontSize: 18 (scaled appropriately for the arc size).
- color: matches the current angle type color (full opacity).
- Position: calculated as the midpoint of the arc at 60% of the arc radius. For very small angles (<15 degrees), positioned outside the arc at 130% of arc radius.

**Angle type label**: Text appearing above the angle arc (or to the side for straight/reflex angles). Shows the classification name:
- "Acute!" for 0 < theta < 90.
- "Right Angle!" for theta = 90 (with a tolerance of +/- 1 degree for display purposes, but snapping behavior ensures exact 90 is achievable).
- "Obtuse!" for 90 < theta < 180.
- "Straight!" for theta = 180 (tolerance +/- 1 degree).
- "Reflex!" for 180 < theta < 360.
- Properties: fontSize: 16, fontWeight: 700, color: matches angle type color (full opacity).
- Animation: When the type changes, the old label fades out (duration: 0.15s) and the new label fades in with a slight scale-up (scale 0.8 -> 1.0, duration: 0.2s, ease: spring(damping: 15, stiffness: 300)).

**Right angle indicator**: When the angle is within 1 degree of exactly 90 degrees, a small square (side length: 0.5 units) is drawn at the vertex in the corner between the two rays. Stroke: `#fbbf24`, strokeWidth: 1.5, fill: `none`. This square replaces the arc for exactly 90 degrees. It fades in (duration: 0.15s) when entering the 89-91 degree range and fades out when leaving.

#### Color System

| Angle Type | Range | Arc/Fill Stroke | Arc Fill (15% opacity) | Hex (stroke) | Hex (fill) |
|------------|-------|-----------------|----------------------|--------------|------------|
| Acute | 0 < theta < 90 | Emerald 400 | Emerald 400 @ 15% | `#34d399` | `#34d39926` |
| Right | theta = 90 | Amber 400 | Amber 400 @ 15% | `#fbbf24` | `#fbbf2426` |
| Obtuse | 90 < theta < 180 | Blue 400 | Blue 400 @ 15% | `#60a5fa` | `#60a5fa26` |
| Straight | theta = 180 | Indigo 400 | Indigo 400 @ 15% | `#818cf8` | `#818cf826` |
| Reflex | 180 < theta < 360 | Rose 400 | Rose 400 @ 15% | `#fb7185` | `#fb718526` |

Color transitions at boundaries are instantaneous (no gradient/interpolation between type colors). The sudden color change creates a salient perceptual boundary that reinforces the categorical structure.

#### Interaction 1: Free Ray Dragging

**Gesture system**: `@use-gesture/react` `useDrag` hook on the drag handle.

**Rotation calculation**:
```typescript
// On each drag frame:
const dx = pointerX - vertexX; // in SVG coordinate space
const dy = pointerY - vertexY;
let angleDeg = Math.atan2(-dy, dx) * (180 / Math.PI); // Negative dy because SVG y-axis is inverted
if (angleDeg < 0) angleDeg += 360;
// angleDeg is now 0-360, measured counterclockwise from the positive x-axis (the fixed ray)
```

**Snap behavior**:
- By default, the angle moves continuously (no snapping).
- When within 2 degrees of a "notable" angle (0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360), a gentle magnetic snap pulls the ray to the exact value. The snap uses a spring animation (damping: 25, stiffness: 400) so it feels like a gentle click, not a hard stop.
- When snapping to 90 or 180, the snap is slightly stronger (stiffness: 500) because these are the most important angles.
- The student can drag past the snap point -- it does NOT lock the ray.

**Haptic feedback** (mobile, if available via `navigator.vibrate`):
- At each snap point: a single short vibration (10ms).
- At 90 and 180 degree snap points: a double vibration (10ms, 30ms pause, 10ms).

**Visual feedback during drag**:
- The ray endpoint follows the pointer position projected to the circle of radius 6 centered at the vertex. The ray length is always exactly 6 units regardless of pointer distance.
- The arc, fill, degree display, and type label all update in real-time (every frame).
- When the angle crosses a type boundary (e.g., from acute to right to obtuse), in addition to the color change and label change, a subtle particle burst effect (5-8 small circles, radius 0.08, matching the new type color, fading out over 0.4s, moving outward 0.5 units in random directions) emanates from the vertex. This is deliberately subtle -- no fireworks, just a visual "click" that something changed.

**Edge cases**:
- **0 degrees / 360 degrees**: When the ray overlaps with the fixed ray, the display shows "0deg" and the arc disappears (zero-length arc). The type label does not display any classification for 0 degrees.
- **Very small angles (< 5 degrees)**: The degree display moves outside the arc to remain legible. The arc is still drawn but may appear very thin.
- **Very large reflex angles (> 350 degrees)**: The degree display is positioned outside the narrow gap between the rays.
- **Pointer leaving the canvas**: On pointer-up outside the canvas, the ray remains at its last valid position. On pointer moving outside the canvas while still held, the angle continues to track (extend the gesture calculation beyond the viewBox bounds).

**Keyboard alternative**:
- When the drag handle is focused (Tab to reach it), arrow keys rotate the ray:
  - Left/Right arrow: +/- 1 degree per keypress.
  - Shift + Left/Right arrow: +/- 15 degrees per keypress.
  - Home key: reset to 0 degrees.
  - End key: move to 360 degrees.
- Focus indicator: a 3px outline ring in `#3b82f6` with 2px offset around the drag handle.

#### Interaction 2: Preset Angle Buttons

A row of buttons below the angle maker (in the control zone). Each button, when tapped, animates the draggable ray to the target angle.

**Button layout** (horizontal scroll on mobile if needed):

| Button Label | Target Angle | Button Color (border) |
|--------------|-------------|----------------------|
| "45deg" | 45 | `#34d399` (acute) |
| "90deg" | 90 | `#fbbf24` (right) |
| "120deg" | 120 | `#60a5fa` (obtuse) |
| "180deg" | 180 | `#818cf8` (straight) |
| "270deg" | 270 | `#fb7185` (reflex) |

**Button style**: Height: 40px, borderRadius: 8px, border: 1.5px solid (color from table above), background: transparent, color: `#e2e8f0`, fontSize: 14, fontWeight: 600, paddingHorizontal: 12px. On hover/focus: background fills with the border color at 15% opacity.

**Animation on button press**:
1. The draggable ray rotates from its current position to the target angle.
2. Animation: spring(damping: 20, stiffness: 300). Duration depends on the angular distance -- approximately 0.6s for a 90-degree change, 1.2s for a 180-degree change.
3. During the animation, the arc, fill, degree display, and type label all update smoothly.
4. After the ray arrives at the target, a protractor overlay fades in.

**Protractor overlay** (appears after preset animation completes):
- A semi-transparent protractor SVG centered at the vertex.
- Semi-circle (for angles 0-180) or full circle (for reflex angles) with degree markings.
- Major ticks at every 10 degrees (strokeWidth: 1, height: 0.4 units, color: `#94a3b8` at 60% opacity).
- Minor ticks at every 5 degrees (strokeWidth: 0.5, height: 0.2 units, color: `#94a3b8` at 30% opacity).
- Number labels at every 30 degrees (fontSize: 10, color: `#94a3b8` at 80% opacity): 0, 30, 60, 90, 120, 150, 180 (and continuing for full circle: 210, 240, 270, 300, 330, 360).
- The protractor has a background fill of `#1e293b` at 40% opacity (frosted glass effect).
- The current angle's tick mark is highlighted in the angle type color.
- The protractor fades in over 0.3s and auto-fades out after 3 seconds of no interaction (or immediately if the student starts dragging the ray again).

#### Interaction 3: Complementary Pair Mode

**Activation**: A toggle button in the control zone labeled "Complementary" with an icon showing two angles that share a ray, annotated with "= 90deg". Style: same as preset buttons but wider, with a toggle indicator (pill shape, `#3b82f6` when active, `#475569` when inactive).

**Visual changes when activated**:
1. The fixed ray and vertex remain.
2. A second angle arc appears adjacent to the first angle. The two arcs together span exactly 90 degrees.
3. The second angle has its own arc, degree display, and fill color.
4. The angles are separated by a shared ray (a third ray that divides the 90-degree space).
   - First angle (alpha): from the fixed ray to the dividing ray.
   - Second angle (beta): from the dividing ray to the 90-degree position.
5. The dividing ray is draggable (same drag behavior as Interaction 1 but constrained to 0-90 degree range).
6. A KaTeX equation appears above the angle maker: `\alpha + \beta = 90°` with live values substituted. For example, if alpha = 35, it shows `35° + 55° = 90°`. The equation updates in real-time as the dividing ray is dragged.
7. Both angle arcs use the acute color (`#34d399`) since both angles in a complementary pair are always acute (or one is right at the boundary, which is degenerate).

**Constraint enforcement**: The dividing ray cannot leave the 0-90 degree range. At the boundaries (0 and 90 degrees), it snaps to the boundary with a spring animation and does not pass through.

**Edge cases**:
- Alpha = 0, Beta = 90: One angle disappears (zero arc), the other is a right angle.
- Alpha = 45, Beta = 45: Both arcs are equal. A brief highlight pulse on both arcs to call attention to the symmetry.

**Exit**: Tapping the "Complementary" toggle again deactivates the mode and returns to the single-angle maker. The transition animates smoothly: the second arc and dividing ray fade out (duration: 0.3s), and the draggable ray returns to its last position from the single-angle mode.

#### Interaction 4: Supplementary Pair Mode

**Activation**: A toggle button labeled "Supplementary" with an icon showing two angles that form a straight line, annotated with "= 180deg". Style: same as Complementary button.

**Visual changes when activated**:
1. Same layout as Complementary mode, but the two angles span 180 degrees instead of 90.
2. The dividing ray is constrained to the 0-180 degree range.
3. Equation display: `\alpha + \beta = 180°` with live values.
4. Both arcs use their respective type colors:
   - If alpha < 90: alpha arc is acute color (`#34d399`), beta arc is obtuse color (`#60a5fa`).
   - If alpha = 90: both arcs use the right angle color (`#fbbf24`).
   - If alpha > 90: alpha arc is obtuse color, beta arc is acute color.
   - If alpha = 0 or 180: degenerate case, one arc disappears.

**Constraint enforcement**: Dividing ray cannot leave 0-180 degree range.

**Exit**: Same as Complementary mode.

**Mode exclusivity**: Only one mode (Complementary, Supplementary, or free) can be active at a time. Activating one deactivates the other.

#### Animation Specifications (All Interactions)

| Property | Value | Notes |
|----------|-------|-------|
| Ray rotation | spring(damping: 20, stiffness: 300) | For preset buttons and snap animations |
| Arc update | per-frame (60fps) | No spring on arc -- it follows the ray exactly |
| Color transition | instant (0ms) | Category boundaries are sharp, not gradual |
| Label fade in/out | 0.15s / 0.15s | For type label changes |
| Particle burst at type boundary | 0.4s, ease: linear | 5-8 particles, outward 0.5 units |
| Protractor fade in/out | 0.3s / 0.3s | ease: easeInOut |
| Mode transition | 0.3s | For entering/exiting complementary/supplementary |
| Snap magnetic pull | spring(damping: 25, stiffness: 400) | For notable angle snap; 500 stiffness for 90/180 |
| Drag handle scale on hover | 0.15s | ease: easeOut |
| Drag handle scale on active | 0.1s | ease: easeOut |

#### Performance Budget (Stage 2)

- Maximum SVG elements rendered simultaneously: 35 (including all rays, arcs, labels, buttons, protractor).
- Target: 60fps during continuous ray dragging on mid-range mobile (e.g., Pixel 6a, iPhone SE 3rd gen).
- P95 frame rate: >= 55fps.
- The protractor overlay (with 72 tick marks and 12 labels) is the most expensive element. It is rendered as a single SVG `<g>` group and cached. It is hidden (display: none) when not needed, not merely opacity: 0.
- The angle arc path is recomputed on every frame during drag. The computation (atan2, SVG arc parameter calculation) is kept in a pure function and must execute in < 0.5ms.
- The degree counter uses CSS `font-variant-numeric: tabular-nums` to prevent layout thrashing as digits change.

#### Accessibility (Stage 2)

- Drag handle: `role="slider"`, `aria-label="Angle ray"`, `aria-valuemin="0"`, `aria-valuemax="360"`, `aria-valuenow="{current angle}"`, `aria-valuetext="{current angle} degrees, {type name}"`.
- On value change (throttled to every 5 degrees for screen readers): `aria-live="polite"` region announces the new value and type.
- On type boundary crossing: `aria-live="assertive"` announces "Now {type name}".
- Preset buttons: `aria-label="Set angle to {value} degrees"`.
- Mode toggles: `role="switch"`, `aria-checked="{active state}"`, `aria-label="Complementary pair mode"` / `aria-label="Supplementary pair mode"`.
- All interactive elements have visible focus indicators (3px `#3b82f6` outline with 2px offset).
- Color is NEVER the sole indicator of angle type. The text label always accompanies the color change.

---

## Stage 3: Guided Discovery (3-5 minutes)

### Prompt Sequence

The guided discovery stage uses a narration system: text prompts appear one at a time at the top of the canvas, with the angle maker from Stage 2 still visible and interactive below. Each prompt has an associated goal. The student must achieve the goal to advance to the next prompt.

The prompts are delivered by the AI tutor (or pre-authored narration in offline mode). The tutor avatar (Rive character) is visible in the bottom-left corner, sized at 48x48px, with a subtle idle animation (gentle bobbing, 2s cycle). When delivering a prompt, the avatar's mouth moves and eyes look toward the canvas.

#### Prompt 1: Discover Acute Angles

**Text** (appears at top of canvas, background: `#1e293b` at 80% opacity, padding: 12px, borderRadius: 8px, maxWidth: 90%):
> "Drag the ray to make different angles. Notice how the color changes? Angles less than 90 degrees are called **ACUTE** (sharp!). Try to make one."

**Bold formatting**: The word "ACUTE" is rendered in the acute color (`#34d399`) with fontWeight: 700.

**Goal**: Student drags the ray to any angle between 1 and 89 degrees (inclusive). The angle must remain in this range for at least 0.5 seconds (to prevent accidental pass-through).

**Detection**: `currentAngle > 0 && currentAngle < 90 && timeInRange >= 500ms`.

**On completion**:
- A small checkmark icon (color: `#34d399`, size: 16px) appears next to the prompt text.
- The prompt text fades to 60% opacity.
- After a 0.8s pause, Prompt 2 appears below (the previous prompt stays visible but dimmed).

**If student is stuck (no valid angle after 15 seconds)**: A subtle arrow animation appears near the drag handle, suggesting clockwise rotation toward the 45-degree area. The arrow is a small curved SVG path with an arrowhead, animated with a breathing opacity (0.3 -> 0.7 -> 0.3, 1.5s cycle). It disappears once the student starts dragging.

#### Prompt 2: Discover Right Angles

**Text**:
> "Now make exactly 90 degrees. See the little square? That's a **RIGHT ANGLE** -- the most important angle in math. Walls meet floors at right angles!"

**Bold formatting**: "RIGHT ANGLE" in `#fbbf24` (amber), fontWeight: 700.

**Goal**: Student drags the ray to within 2 degrees of 90 (i.e., angle >= 88 and <= 92). The snap behavior from Stage 2 helps them hit exactly 90.

**Detection**: `Math.abs(currentAngle - 90) <= 2 && timeInRange >= 500ms`.

**On completion**: Same checkmark pattern. Additionally, the right angle square symbol pulses once (scale 1.0 -> 1.3 -> 1.0, duration: 0.4s) to reinforce the visual cue.

#### Prompt 3: Discover Obtuse Angles

**Text**:
> "Keep going past 90 degrees. Now it's **OBTUSE** (wide/blunt). These are between 90 and 180 degrees."

**Bold formatting**: "OBTUSE" in `#60a5fa` (blue), fontWeight: 700.

**Goal**: Angle between 91 and 179 degrees, held for 0.5s.

**On completion**: Checkmark.

#### Prompt 4: Discover Straight Angles

**Text**:
> "Go to 180 degrees -- a perfectly flat line. This is a **STRAIGHT ANGLE**."

**Bold formatting**: "STRAIGHT ANGLE" in `#818cf8` (indigo), fontWeight: 700.

**Goal**: Angle within 2 degrees of 180.

**On completion**: Checkmark. When the ray hits 180 degrees, both rays form a straight line. A brief visual cue: a dashed line extends through both rays to the edges of the canvas (fadeIn 0.3s, hold 1s, fadeOut 0.3s) to emphasize the "straight line" nature.

#### Prompt 5: Discover Reflex Angles

**Text**:
> "Now for the secret level: keep going past 180 degrees! This is a **REFLEX ANGLE** -- more than 180 degrees but less than 360 degrees."

**Bold formatting**: "REFLEX ANGLE" in `#fb7185` (rose), fontWeight: 700. "secret level" in italic.

**Goal**: Angle between 181 and 359 degrees, held for 0.5s.

**On completion**: Checkmark. A special visual: when the student first enters reflex angle territory, a brief "discovery" animation plays -- a starburst of 12 small particles radiating from the vertex in the reflex color, fading out over 0.6s. This is the "surprise encoding" moment described in the neuroscience framework.

**Possible misconception**: Students may try to drag counterclockwise past 0 to get past 180. The system should handle this: if the student drags counterclockwise from a small angle, the angle should increase toward 360 (measuring the reflex angle), not decrease into negative territory. The `atan2` calculation naturally handles this, but a visual cue (the arc always goes clockwise from Ray 1 to Ray 2) must be consistent.

#### Prompt 6: Discover Complementary and Supplementary Pairs

**Text**:
> "Final discovery: make two angles that add to exactly 90 degrees. These are **COMPLEMENTARY**. Now make two that add to 180 degrees -- **SUPPLEMENTARY**!"

**Bold formatting**: "COMPLEMENTARY" in `#34d399`, "SUPPLEMENTARY" in `#60a5fa`.

**Goal**: Two-part goal.
1. Activate complementary mode (the student must tap the Complementary button). Then drag the dividing ray to create any pair. Goal completes when the mode has been active for at least 3 seconds and the dividing ray has been moved at least once (angle changed by >= 5 degrees from initial position).
2. Then activate supplementary mode. Same criteria.

**Detection**: Both sub-goals must be met.

**On completion**: All prompts show checkmarks. A completion message appears:

> "You've discovered all the angle types! Let's put names to what you've learned."

This message has a green left border (borderLeft: 3px solid `#34d399`), background `#1e293b`, and the Continue button appears below it.

### Discovery Prompt Styling

All prompts share these visual properties:
- Container: background `#0f172a` at 90% opacity, borderRadius: 10px, padding: 14px 16px, marginBottom: 8px.
- Text: fontSize: 15, lineHeight: 1.5, color: `#e2e8f0`.
- Bold terms: fontWeight: 700, color: per-type color (as noted above).
- Checkmark: a small animated SVG checkmark (draw animation, 0.3s) in `#34d399`, positioned at the right edge of the prompt container.
- Prompt entrance: fade in from top (translateY: -8 -> 0, opacity 0 -> 1, duration: 0.3s, ease: easeOut).

### AI Tutor Integration (Online Mode)

When online, the AI tutor can provide additional contextual hints if the student is stuck:
- After 20 seconds without progress on a prompt: the tutor generates a Socratic hint. Example for Prompt 2: "You're at {current angle} degrees. Which direction do you need to go to reach 90?"
- The tutor NEVER gives the answer directly (Principle I).
- Hints appear in a speech bubble from the tutor avatar (background: `#1e40af` at 80%, borderRadius: 12px, tail pointing to avatar).

### Offline Mode

In offline mode, the prompts are pre-authored (as above) and the hint system uses a simple timer-based fallback with generic hints:
- 15s stuck: "Try dragging the ray further in the same direction."
- 30s stuck: "Move the blue endpoint with your finger or mouse."
- 45s stuck: A ghost animation shows the ray moving toward the target area (very subtle, opacity: 0.3).

---

## Stage 4: Symbol Bridge (2-3 minutes)

### Scene: `symbol-bridge-notation`

This stage overlays formal mathematical notation onto the spatial experience. The angle maker from Stage 2 is still visible but non-interactive (the ray is fixed at 45 degrees for the first part, then changes as notation is introduced).

#### Part 1: Angle Notation (0.0s - 40s)

**Step 1: Vertex labeling (0.0s - 5s)**

The angle maker displays an angle of approximately 45 degrees. Three labels appear sequentially:
1. `[0.0s]` A label "A" (fontSize: 14, fontWeight: 700, color: `#94a3b8`) appears at the endpoint of Ray 1 with a fade-in (duration: 0.3s). Position: slightly beyond the arrowhead of Ray 1.
2. `[0.8s]` A label "B" appears at the vertex. This label is highlighted with a subtle background circle (radius: 0.6, fill: `#fbbf2440`) because the vertex is the most important point.
3. `[1.6s]` A label "C" appears at the endpoint of Ray 2.

**Step 2: Angle symbol introduction (5s - 12s)**

4. `[5.0s]` A KaTeX annotation appears centered above the angle maker:
   - First, the angle symbol appears alone: `\angle` (fontSize: 24, color: `#f8fafc`). Fade in, duration: 0.3s.
5. `[6.5s]` The letters join: `\angle ABC` (the B is highlighted in amber `#fbbf24` to indicate the vertex).
   - As each letter appears, a brief line (stroke: `#fbbf24`, opacity: 0.6, duration: 0.5s) flashes from the letter on the notation to the corresponding point on the diagram. This creates a direct visual link between notation and spatial element.
6. `[8.5s]` Below the main notation, a smaller annotation appears: "The vertex letter always goes in the MIDDLE" (fontSize: 13, color: `#94a3b8`). The word "MIDDLE" is fontWeight: 700.
7. `[10.0s]` A second example: the angle rotates to ~120 degrees via spring animation (duration: 0.8s). New labels appear: D, E (vertex), F. The notation updates: `\angle DEF = 120°`. The degree symbol and value appear alongside the notation.

**Step 3: Degree symbol (12s - 18s)**

8. `[12.0s]` The angle rotates to several key positions in sequence:
   - 45 degrees (0.5s hold). Annotation: `45°`.
   - 90 degrees (0.5s hold). Annotation: `90°` with right angle square appearing.
   - 180 degrees (0.5s hold). Annotation: `180°`.
   - 360 degrees (0.5s hold). Annotation: `360°`.
   - Each transition uses spring(damping: 20, stiffness: 300).
9. `[18.0s]` Text appears: "The small circle is the degree symbol: 360 degrees in a full turn." (fontSize: 14, color: `#94a3b8`).

#### Part 2: Classification Table (18s - 50s)

The angle maker shrinks and moves to the left side of the canvas (scale: 0.6, translateX: -5, duration: 0.5s, ease: spring). On the right side, a classification table builds row by row.

**Table style**: Background `#0f172a`, borderRadius: 10px, border: 1px solid `#1e293b`. Header row background: `#1e293b`. Cell padding: 8px 12px. Font: fontSize 14 for content, 12 for header. All text: `#e2e8f0` unless otherwise noted.

**Row appearance animation**: Each row fades in from the right (translateX: 20 -> 0, opacity 0 -> 1, duration: 0.3s, ease: easeOut) with a 0.8s delay between rows. As each row appears, the angle maker on the left animates to show the corresponding angle type.

| Row | Type | Symbol (KaTeX) | Range (KaTeX) | Angle Maker Position | Timing |
|-----|------|---------------|---------------|---------------------|--------|
| 1 | Acute | `\theta` | `0° < \theta < 90°` | 45deg | `[20.0s]` |
| 2 | Right | `\theta` | `\theta = 90°` | 90deg (with square) | `[22.5s]` |
| 3 | Obtuse | `\theta` | `90° < \theta < 180°` | 135deg | `[25.0s]` |
| 4 | Straight | `\theta` | `\theta = 180°` | 180deg | `[27.5s]` |
| 5 | Reflex | `\theta` | `180° < \theta < 360°` | 270deg | `[30.0s]` |

**Color coding**: The type name in each row uses the corresponding type color. The theta symbol uses the same color in the range column.

**After all rows visible (32s)**: The table remains. The angle maker returns to interactive mode for a brief period -- the student can drag the ray and watch the table highlight the corresponding row with a subtle left-border indicator (3px solid in the type color).

#### Part 3: Complementary and Supplementary Notation (35s - 50s)

Below the table, two additional notation blocks appear:

**Block 1** (appears at 35s):
```
Complementary:  alpha + beta = 90deg
```
Rendered in KaTeX: `\alpha + \beta = 90°`. The alpha and beta are in distinct colors (`#34d399` and `#a78bfa` respectively). An inline diagram shows two adjacent angles adding to 90 degrees (a small version of the complementary mode from Stage 2).

**Block 2** (appears at 38s):
```
Supplementary:  alpha + beta = 180deg
```
Rendered in KaTeX: `\alpha + \beta = 180°`. Inline diagram shows two adjacent angles forming a straight line.

**Block 3: Preview** (appears at 42s):
```
Triangle angle sum:  alpha + beta + gamma = 180deg   (next lesson!)
```
Rendered with a small triangle diagram. The text "(next lesson!)" is in a muted color (`#64748b`) and links to GE-4.2 in the Knowledge Nebula. This block has a dashed left border (borderLeft: 2px dashed `#475569`) to distinguish it as a preview rather than current content.

#### Continue Button

Appears at 50s (or when the student has scrolled through all content, whichever is later). Same style as Stage 1 continue button. Text: "See it in the real world".

#### Accessibility (Stage 4)

- All KaTeX expressions have `aria-label` attributes with plain-text equivalents (e.g., `aria-label="angle ABC equals 45 degrees"`).
- The classification table is a proper `<table>` element with `<thead>`, `<th scope="col">`, and `<td>` elements.
- Row highlight on the angle maker interaction is also communicated via `aria-live="polite"`: "Current angle type: Obtuse".
- Navigation: student can Tab through the table rows. Pressing Enter on a row animates the angle maker to that type.

---

## Stage 5: Real-World Anchor (1-2 minutes)

### Scene: `real-world-angles`

A carousel of 4 real-world applications, each presented as a card. The student swipes horizontally (touch) or clicks arrow buttons (desktop) to navigate between cards. On mobile, the carousel uses `@use-gesture/react` `useDrag` with horizontal constraint and snap-to-card behavior.

**Carousel container**: Full canvas width, height: 80% of canvas. Cards are horizontally laid out with 16px gap. Overflow: hidden. Scroll-snap: mandatory.

**Card style**: Background `#0f172a`, borderRadius: 12px, border: 1px solid `#1e293b`, padding: 20px. Each card contains:
1. A simple SVG illustration (top half of card, height: ~50%).
2. A title (fontSize: 18, fontWeight: 700, color: `#f8fafc`).
3. A description (fontSize: 14, lineHeight: 1.5, color: `#cbd5e1`).
4. An angle measurement callout (the relevant angle highlighted with an arc and degree label using the appropriate type color).

**Pagination dots**: Below the carousel, 4 dots (diameter: 6px) indicate the current card. Active dot: `#3b82f6`, inactive: `#475569`.

#### Card 1: Architecture

**Title**: "Right angles make buildings stand up straight"

**Illustration**: A simple building cross-section in SVG. Two vertical walls meeting a horizontal floor. Right angle symbols (small squares) at each wall-floor junction. Color: walls in `#94a3b8`, floor in `#94a3b8`, right angle squares in `#fbbf24`.

**Description**: "Look around any room -- walls meet floors and ceilings at 90-degree angles. This makes structures stable. If the angles were off by even a few degrees, the building would lean and eventually collapse. The Leaning Tower of Pisa is famous precisely because its angle is NOT 90 degrees."

**Angle callout**: `90°` with amber arc at the wall-floor junction.

**Animation**: The building illustration enters with a slight upward slide (translateY: 10 -> 0, duration: 0.5s). The right angle squares appear sequentially with brief draw animations (0.2s each, 0.1s delay between).

#### Card 2: Sports

**Title**: "A basketball shot at 45 degrees goes the farthest"

**Illustration**: A simplified basketball trajectory. A figure (stick figure, 5 lines) at left with arm extended. A dashed parabolic arc (SVG quadratic bezier) from the hand to a basketball hoop on the right. The launch angle (from horizontal to the initial trajectory line) is marked with an arc and "45deg". Ground line at the bottom.

**Description**: "In physics, a projectile launched at 45 degrees covers the maximum horizontal distance. Basketball players instinctively adjust their shot angle -- closer to the hoop means a steeper angle (higher than 45 degrees), farther away means closer to 45 degrees."

**Angle callout**: `45°` with emerald arc at the launch point.

**Animation**: The trajectory arc draws itself from hand to hoop (draw animation, 1s). A small circle (the ball, fill: `#f97316`) follows the trajectory path (motion path animation, 1.2s, ease: easeInOut).

#### Card 3: Navigation

**Title**: "Compass bearings use angles to navigate"

**Illustration**: A compass rose SVG. Circle with N/E/S/W labels at cardinal points. Degree markings: N=0/360, E=90, S=180, W=270. A directional arrow from center pointing to ~45 degrees (northeast). The angle arc from North (0) to the arrow direction is drawn.

**Description**: "Sailors, pilots, and hikers use compass bearings measured in degrees from North. North is 0 degrees, East is 90 degrees, South is 180 degrees, West is 270 degrees. 'Head northeast' means about 45 degrees. GPS systems still use these same angle measurements."

**Angle callout**: `45°` with emerald arc from North to the NE direction.

**Animation**: The compass needle rotates from 0 to 45 degrees (spring animation, 0.8s). Degree labels at N, E, S, W fade in sequentially (0.2s each).

#### Card 4: Design

**Title**: "Scissors open at different angles for different cuts"

**Illustration**: Two lines (the scissor blades) meeting at a center pivot point. The blades form approximately 25 degrees. Below, a second pair at approximately 60 degrees. Labels: "Precise cut: ~25deg" and "Heavy cut: ~60deg".

**Description**: "Tool design is all about angles. Scissors open wider for cutting thick material and narrower for precision cuts. Knife blades are ground at specific angles -- a 15-degree edge for sharp kitchen knives, 25 degrees for durable outdoor knives."

**Angle callout**: `25°` and `60°`, both with emerald arcs.

**Animation**: The first scissors pair opens from closed (0 degrees) to 25 degrees (spring, 0.6s). Then the second pair opens to 60 degrees (spring, 0.6s, 0.3s delay).

#### Continue Button

Visible after the student has viewed at least 2 of the 4 cards (tracked by which cards have entered the viewport). Text: "Practice time".

---

## Stage 6: Practice (Adaptive, 9 problems)

### Problem Bank Structure

The problem set is organized into three layers per the SRS model. Each layer targets a different cognitive demand:

| Layer | Count | Type | Cognitive Demand |
|-------|-------|------|-----------------|
| 0: Recall | 3 | Classification, naming | "What type is this?" |
| 1: Procedure | 3 | Computation | "Find the missing angle" |
| 2: Understanding | 3 | Explanation, reasoning | "Why does this work?" |

Problems are interleaved across layers (never 3 recall problems in a row). The order adapts based on performance: if the student gets a recall problem wrong, the system may insert an additional recall problem before proceeding to harder ones.

### Problem Format

Each problem uses the `ProblemCard` component with the following structure:
- **Problem statement** (top): text with optional KaTeX inline math.
- **Visualization** (middle): MathScene SVG showing the relevant angle(s).
- **Input area** (bottom): varies by problem type (multiple choice, numeric input, or free text).

**Card style**: background `#0f172a`, borderRadius: 12px, border: 1px solid `#1e293b`, padding: 20px. Problem text: fontSize: 16, lineHeight: 1.6, color: `#e2e8f0`.

**Feedback style**:
- Correct: A brief green checkmark animation (draw, 0.3s) appears. The card border briefly flashes green (`#34d399` at 50%, 0.4s). Sound: short sine wave + click (if sounds enabled). XP notification slides in from the right (+15 XP for recall, +20 for procedure, +30 for understanding).
- Incorrect: The card border briefly flashes a muted amber (`#fbbf24` at 30%, 0.4s). NO red. NO buzzer. Sound: soft lower-pitch tone (if enabled). A gentle explanation appears below the answer area. The student can retry (up to 2 retries per problem; on 3rd attempt, the correct answer is revealed with an explanation).
- Partial (for explanation problems): AI evaluates and provides specific feedback. No binary right/wrong.

### Problem Definitions

#### Problem 1 (Recall): "Classify the Angle" -- Multiple Choice with Visual

**Statement**: "What type of angle is 135 degrees?"

**Visualization**: The angle maker (from Stage 2, but non-interactive) shows a 135-degree angle with the arc drawn in the obtuse color (`#60a5fa`). The degree label "135deg" is displayed inside the arc.

**Options** (presented as 4 buttons, vertically stacked, 48px height each, borderRadius: 10px):
- A) "Acute" (border color: `#34d399`)
- B) "Right" (border color: `#fbbf24`)
- C) "Obtuse" (border color: `#60a5fa`) -- **CORRECT**
- D) "Reflex" (border color: `#fb7185`)

**Selection behavior**: Tapping an option highlights it (background fills with the border color at 15% opacity, border becomes 2px). Tapping again deselects. A "Check" button at the bottom submits the answer.

**Correct answer**: C) Obtuse.

**Feedback on correct**: "That's right! 135 degrees is between 90 and 180, making it obtuse."

**Feedback on incorrect** (e.g., selecting Acute): "Not quite. Acute angles are less than 90 degrees. 135 is bigger than 90 -- try thinking about where 135 falls relative to 90 and 180."

**"Why does this work?" prompt** (appears after correct answer, per CP-I): "Quick check: how do you know it's not reflex?" (Expected: because it's less than 180 degrees.)

#### Problem 2 (Recall): "Name the Angle Type" -- Visual Identification

**Statement**: "What type of angle is shown below?"

**Visualization**: An angle of approximately 72 degrees is displayed. The arc and color indicate it is acute, but the degree label is NOT shown (the student must classify from the visual alone).

**Options**: Same 5-option set (Acute, Right, Obtuse, Straight, Reflex).

**Correct answer**: Acute.

**Feedback on correct**: "Yes! This angle is clearly less than 90 degrees -- you can see it's smaller than a right angle."

**Feedback on incorrect**: "Look at the angle compared to a right angle (90 degrees). Is it smaller or larger?" (A faint 90-degree reference line briefly appears as a visual aid.)

#### Problem 3 (Recall): "Clock Angle"

**Statement**: "What type of angle do the clock hands make at 10:00?"

**Visualization**: A clock showing 10:00. The angle between the hour hand (at 10) and the minute hand (at 12) is 60 degrees. The arc is drawn between the hands.

**Options**: Acute, Right, Obtuse, Straight, Reflex.

**Correct answer**: Acute (60 degrees).

**Feedback on correct**: "Right! The hands are 2 hours apart. Each hour is 30 degrees (360 / 12 = 30), so 2 hours = 60 degrees. That's acute."

**Bonus insight** (displayed below feedback): "Each hour on a clock = 30 degrees. This lets you calculate ANY clock angle!"

#### Problem 4 (Procedure): "Find the Complementary Angle"

**Statement**: "Two angles are complementary. One is 35 degrees. What is the other?"

**Visualization**: The complementary pair mode from Stage 2, showing one angle of 35 degrees and a question mark for the other. The equation `35° + ? = 90°` is displayed above.

**Input**: Numeric input field (width: 80px, height: 48px, borderRadius: 8px, fontSize: 20, textAlign: center). The degree symbol is displayed to the right of the input field (the student does not need to type it). A "Check" button below.

**Correct answer**: 55.

**Accepted answers**: "55", "55.0", "55.00" (integer or up to 2 decimal places, must equal 55).

**Feedback on correct**: "Perfect! 35 + 55 = 90. Complementary angles always sum to 90 degrees." The visualization animates: the question mark morphs into "55deg" (crossfade, 0.3s) and the second arc fills in.

**Feedback on incorrect**: "Remember, complementary angles add to 90 degrees. If one angle is 35 degrees, what do you need to add to 35 to get 90?" (No direct answer given on first retry.)

**Common error handling**:
- If student answers 145 (confusing complementary with supplementary): "That would be the supplementary complement (adding to 180). Complementary means adding to 90. What's 90 - 35?"
- If student answers 35 (thinking both angles are equal): "Complementary angles don't have to be equal -- they just need to add up to 90. 35 + 35 = 70, which isn't quite 90."

#### Problem 5 (Procedure): "Find the Supplementary Angle"

**Statement**: "Find the supplementary angle to 110 degrees."

**Visualization**: Supplementary pair mode showing 110 degrees (obtuse) and a question mark. Equation: `110° + ? = 180°`.

**Input**: Same numeric input style as Problem 4.

**Correct answer**: 70.

**Feedback on correct**: "Yes! 110 + 70 = 180. Notice how one angle is obtuse and the other is acute -- supplementary pairs always work that way (unless both are 90)."

**Feedback on incorrect**: "Supplementary angles add to 180. So the missing angle = 180 - 110 = ?"

#### Problem 6 (Procedure): "Clock Angle Calculation"

**Statement**: "What is the angle between the clock hands at 4:00?"

**Visualization**: A clock showing 4:00. The angle between the hands is not labeled.

**Input**: Numeric input field.

**Correct answer**: 120 (degrees).

**Hint** (available after first wrong attempt): "Each hour on a clock represents 30 degrees (because 360 / 12 = 30). How many hours apart are the hands at 4:00?"

**Feedback on correct**: "Exactly! 4 hours apart x 30 degrees per hour = 120 degrees. That's an obtuse angle." The visualization draws the arc and labels it "120deg".

**Common error handling**:
- If student answers 60 (thinking 4 x 15): "Almost! But the full clock (360 degrees) has 12 hours, so each hour = 360/12 = 30 degrees, not 15."
- If student answers 240 (measuring the reflex angle): "You measured the larger angle going the long way around. By convention, when we say 'the angle between clock hands,' we mean the smaller angle. 360 - 240 = 120 degrees."

#### Problem 7 (Understanding): "Triangle Angle Sum -- Interactive Proof"

**Statement**: "Drag the corners of this triangle and watch the angles. What do they always add up to?"

**Visualization**: An interactive triangle with three draggable vertices. Each angle is labeled with its degree value (rounded to nearest integer). An equation at the top shows `\alpha + \beta + \gamma = ?` where alpha, beta, gamma are the live values. The sum is calculated and displayed in real-time.

**Interaction**: The student drags any vertex. As the triangle reshapes:
- All three angle arcs update in real-time.
- All three degree labels update.
- The sum display updates. It will always read 180 (with possible floating-point display as 179 or 181 for extreme triangles -- these are rounded to exactly 180 in the display to avoid confusion, but the individual angles show their true computed values).

**Input**: After exploring for at least 10 seconds (and moving at least 2 vertices), a text input appears: "What do the angles always add up to?" Input field expects a number.

**Correct answer**: 180.

**Follow-up** (after correct answer): An animated "proof by tearing":
1. The triangle freezes.
2. The three angles visually detach from the triangle (small triangular regions around each vertex animate outward -- translate and rotate).
3. The three angle pieces arrange themselves along a straight line (each piece rotates so its arc aligns with the others).
4. The three arcs together form a straight angle (180 degrees).
5. Annotation: "Three angles -> one straight angle = 180 degrees. Always."
6. Duration of this animation: 3 seconds total.

**This is the highest-XP problem in the set** (30 base XP + possible reflection bonus).

#### Problem 8 (Understanding): "Why Can't a Triangle Have Two Obtuse Angles?"

**Statement**: "Explain why a triangle CANNOT have two obtuse angles."

**Visualization**: An attempt to construct a triangle with two obtuse angles. Two rays from a vertex, each at >90 degrees. The third side cannot close the triangle -- the rays diverge. An animated attempt: two angles of 100 degrees are drawn, and the "closing" side extends to infinity, never meeting.

**Input**: Free text input (minHeight: 80px, maxLength: 500 characters). Placeholder text: "Type your explanation here..."

**Evaluation**: AI-evaluated (or pattern-matched in offline mode against key phrases: "more than 180", "only 180 total", "no room for third angle").

**Quality criteria** (for XP calculation):
- Level 1 (basic, 10 XP): States that it "doesn't work" or "is impossible" without reasoning.
- Level 2 (partial, 20 XP): Mentions 180-degree sum but doesn't fully explain.
- Level 3 (good, 25 XP): Clearly states that two obtuse angles would already exceed 180 degrees (100 + 100 = 200 > 180), leaving no room for a third positive angle.
- Level 4 (excellent, 30 XP): Adds that even two angles of 91 degrees sum to 182, which exceeds 180, making ANY third angle impossible.

**Feedback examples**:
- Level 1 response: "Good start! Can you explain WHY it doesn't work? Think about what we just discovered about the sum of angles in a triangle."
- Level 3 response: "Excellent reasoning! Two obtuse angles would already sum to more than 180 degrees, leaving nothing for the third angle. You've got a strong grasp of this."

#### Problem 9 (Understanding): "The 180-Degree Question"

**Statement**: "In your own words, explain why the angles in any triangle ALWAYS add to 180 degrees."

**Visualization**: The tear-off-corners animation from Problem 7 is available as a replay button (the student can watch it again).

**Input**: Free text input (same style as Problem 8). Minimum 30 characters to submit.

**Evaluation**: AI-evaluated. Key concepts looked for:
- Reference to the tearing/rearranging demonstration.
- The idea that the three angles form a straight angle (half rotation).
- Correct use of "straight angle" or "half turn" or "180 degrees".
- Bonus: any reference to parallel lines or the formal proof concept (advanced for Grade 6, earns extra XP).

**This is the reflection-quality problem** -- it bridges into Stage 7 and its XP bonus is 0-80 based on explanation quality.

### Practice Session Gamification

- Each problem awards XP based on layer and correctness (see gamification-design.md).
- NO speed bonus. NO timer visible. NO time pressure.
- After all 9 problems, a session summary card appears:
  - Problems correct: X/9 (with fraction bar visualization).
  - XP earned: breakdown by source.
  - Angle types mastered: checkmarks next to each type.
  - "Struggle Bonus" if applicable: highlighted in amber.
  - The summary card has a subtle neural network animation in the background (2-3 nodes connecting with dim lines, purely decorative).

---

## Stage 7: Reflection (approximately 1 minute)

### Scene: `reflection-prompt`

A clean, focused screen with minimal visual distraction. The background is slightly darker than usual (`#020617` -- slate-950). The angle maker is NOT visible -- this stage is about internal retrieval, not visual reference.

#### Prompt

**Text** (centered, fontSize: 20, fontWeight: 600, color: `#f8fafc`, maxWidth: 500px, textAlign: center):

> "Why do you think the angles in any triangle always add up to exactly 180 degrees?"

Below the prompt, a smaller text (fontSize: 14, color: `#64748b`):

> "There's no single 'right answer' here. Explain in your own words."

#### Input

**Text area**: Full width (minus 32px padding), minHeight: 120px, maxHeight: 300px (expands with content). Background: `#0f172a`, border: 1.5px solid `#334155`, borderRadius: 10px, padding: 14px. Font: fontSize: 15, lineHeight: 1.6, color: `#e2e8f0`. Placeholder: "Type your thoughts..." (color: `#475569`).

**Character counter**: Bottom-right corner of the text area, fontSize: 12, color: `#475569`. Shows "X/500" characters. Minimum 30 characters to submit (the submit button is disabled until this threshold). The counter turns amber when within 50 characters of the limit.

**Submit button**: Below the text area, right-aligned. Style: same as Continue button but text "Share my thinking". Disabled state: opacity 0.5, cursor: not-allowed.

#### Evaluation Flow

1. Student types their reflection and taps "Share my thinking".
2. A brief loading indicator (3 bouncing dots, color: `#3b82f6`, 0.4s cycle each, 0.15s stagger) appears while the AI evaluates.
3. The AI evaluation returns:
   - **Quality score**: 0-5 (not shown to student directly).
   - **XP earned**: 0-80, shown as a celebratory XP notification.
   - **Feedback**: 2-3 sentences of constructive feedback.
   - **References prior concept**: boolean (triggers Connection Maker multiplier 1.3x if true).
   - **Aha detected**: boolean (triggers Aha Moment celebration if true).

4. The feedback appears below the student's text in a bordered container (borderLeft: 3px solid `#3b82f6`, background: `#0f172a`, padding: 12px, borderRadius: 0 8px 8px 0). The feedback text uses fontSize: 14, color: `#cbd5e1`.

5. If quality score >= 4: the feedback includes "Your explanation captures the key idea well!" with a subtle gold accent on the border (borderLeft color changes to `#fbbf24`).

6. If quality score <= 2: the feedback includes a Socratic follow-up question. Example: "Good start! What happens when you tear off the three corners of a triangle and line them up? What shape do they form?"

#### Aha Moment Trigger

If the AI detects an aha moment (student struggled in Practice but writes a clear reflection):
1. Brief neural flash animation: from the text area, 8-12 small glowing dots (color: `#fbbf24`, radius: 3px) radiate outward in a starburst pattern, fading out over 0.8s.
2. A toast notification appears (top of screen, sliding down): "That's the connection!" (color: `#fbbf24`, background: `#1e293b`, borderRadius: 8px, duration: 3s auto-dismiss).
3. The XP display shows the bonus with a "Struggle Bonus 1.4x" label.

#### Lesson Completion

After the reflection is submitted and feedback is received, the lesson completion screen appears:

**Completion card** (centered, background: `#0f172a`, borderRadius: 16px, border: 1px solid `#1e293b`, padding: 24px, maxWidth: 400px):

1. **Header**: "Lesson Complete!" (fontSize: 22, fontWeight: 700, color: `#f8fafc`). A small animated checkmark (emerald, draw animation 0.5s) appears to the left.

2. **XP breakdown** (list, fontSize: 14, color: `#cbd5e1`):
   - Lesson completion: +100 XP
   - Exploration bonus: +{20-40} XP (based on interaction diversity in Stage 2)
   - Reflection quality: +{0-80} XP
   - Applied multipliers: {listed if any}
   - **Total**: +{sum} XP (fontSize: 18, fontWeight: 700, color: `#fbbf24`)

3. **Neurons earned**: "+{total/10} Neurons" with a small neuron icon.

4. **Topic status update**: "GE-4.1 Angles: In Progress -> Mastered" (with a star animation on "Mastered").

5. **Next steps** (two buttons, vertically stacked):
   - "Continue to GE-4.1a: Angle Pairs" (primary button, `#3b82f6` background).
   - "Back to Knowledge Nebula" (secondary button, border only).

6. **Knowledge Nebula mini-update**: A small (200x200px) view of the Geometry constellation, with the GE-4.1 star transitioning from "in progress" (glowing ring) to "mastered" (full brightness + constellation lines connecting to GE-4.1a, GE-4.2, GE-4.3 which are now pulsing as "available").

---

## Technical Specifications

### Component Architecture

```
LessonPlayer (orchestrates 7 NLS stages)
  |
  +-- Hook
  |     +-- MathScene (svg renderer)
  |           +-- ClockFace (custom component)
  |           +-- AngleSweep (animated arc)
  |           +-- DegreeCounter (KaTeX annotation with motion value)
  |           +-- RealLifeFlash (SVG illustration sequence)
  |
  +-- SpatialExperience
  |     +-- MathScene (svg renderer)
  |     |     +-- Vertex (point)
  |     |     +-- FixedRay (line)
  |     |     +-- DraggableRay (line + DraggablePoint at endpoint)
  |     |     +-- AngleArc (animated SVG arc path)
  |     |     +-- DegreeDisplay (KaTeX annotation, dynamically positioned)
  |     |     +-- AngleTypeLabel (text with color transitions)
  |     |     +-- RightAngleSquare (conditional SVG rect)
  |     |     +-- ProtractorOverlay (semi-transparent SVG group)
  |     |     +-- ComplementaryPairOverlay (conditional)
  |     |     +-- SupplementaryPairOverlay (conditional)
  |     |
  |     +-- InteractionCounter (10 dots)
  |     +-- ModeButtons (Complementary, Supplementary)
  |     +-- PresetButtons (45, 90, 120, 180, 270)
  |
  +-- GuidedDiscovery
  |     +-- PromptSequence (6 prompts with goal detection)
  |     +-- MathScene (same angle maker, reused)
  |     +-- TutorAvatar (Rive character, 48x48)
  |     +-- HintBubble (speech bubble from avatar)
  |
  +-- SymbolBridge
  |     +-- MathScene (angle maker + notation overlay)
  |     +-- ClassificationTable (HTML table with row animations)
  |     +-- NotationBlocks (complementary, supplementary, triangle preview)
  |
  +-- RealWorldAnchor
  |     +-- Carousel (4 cards, swipeable)
  |           +-- ArchitectureCard
  |           +-- SportsCard
  |           +-- NavigationCard
  |           +-- DesignCard
  |
  +-- Practice
  |     +-- ProblemCard (x9, interleaved)
  |     |     +-- ProblemStatement (text + optional KaTeX)
  |     |     +-- MathScene (problem-specific visualization)
  |     |     +-- AnswerInput (MultipleChoice | NumericInput | FreeText)
  |     |     +-- FeedbackPanel
  |     |     +-- WhyPrompt (CP-I: "why does this work?")
  |     |
  |     +-- SessionSummary
  |
  +-- Reflection
        +-- ReflectionPrompt
        +-- TextInput (free text, min 30 chars)
        +-- AIFeedbackPanel
        +-- LessonCompletionCard
        +-- KnowledgeNebulaPreview
```

### State Management

**Zustand store** (`lesson-store.ts`):

```typescript
interface AngleLessonState {
  // Stage progression
  currentStage: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  stagesCompleted: Set<number>;

  // Stage 2 state
  currentAngle: number;          // 0-360, current ray angle
  interactionCount: number;      // 0-10, counts toward minimum
  activeMode: 'free' | 'complementary' | 'supplementary';
  hasUsedComplementary: boolean;
  hasUsedSupplementary: boolean;

  // Stage 3 state
  discoveryPromptsCompleted: number; // 0-6
  timeSpentOnCurrentPrompt: number;  // ms, for hint triggering

  // Stage 6 state
  currentProblemIndex: number;   // 0-8
  problemResults: Array<{
    problemId: string;
    layer: 0 | 1 | 2;
    attempts: number;
    correct: boolean;
    hintsUsed: number;
    responseTimeMs: number;
    studentAnswer: string;
  }>;

  // Stage 7 state
  reflectionText: string;
  reflectionSubmitted: boolean;
  reflectionScore: number | null;

  // Gamification
  xpEarnedThisLesson: number;
  multipliers: string[];

  // Actions
  setAngle: (angle: number) => void;
  incrementInteraction: () => void;
  setMode: (mode: 'free' | 'complementary' | 'supplementary') => void;
  advanceStage: () => void;
  completeDiscoveryPrompt: (index: number) => void;
  submitProblemAnswer: (problemId: string, answer: string) => void;
  submitReflection: (text: string) => void;
}
```

**React Context** (per-canvas):

```typescript
interface AngleCanvasContext {
  svgRef: React.RefObject<SVGSVGElement>;
  viewBox: [number, number, number, number];
  pointerToSvgCoords: (clientX: number, clientY: number) => [number, number];
  angleFromPointer: (pointerX: number, pointerY: number) => number;
}
```

### SVG Arc Path Calculation

The angle arc is the most mathematically sensitive rendering element. The SVG arc command (`A`) requires careful handling:

```typescript
/**
 * Generate an SVG arc path for an angle at the origin.
 *
 * @param startAngleDeg - Start angle in degrees (0 = positive x-axis, counterclockwise)
 * @param endAngleDeg - End angle in degrees
 * @param radius - Arc radius from origin
 * @returns SVG path `d` attribute string
 */
function angleArcPath(
  startAngleDeg: number,
  endAngleDeg: number,
  radius: number
): string {
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;

  const x1 = radius * Math.cos(startRad);
  const y1 = -radius * Math.sin(startRad); // SVG y-axis is inverted

  const x2 = radius * Math.cos(endRad);
  const y2 = -radius * Math.sin(endRad);

  let angleDiff = endAngleDeg - startAngleDeg;
  if (angleDiff < 0) angleDiff += 360;

  const largeArcFlag = angleDiff > 180 ? 1 : 0;
  const sweepFlag = 0; // Counterclockwise in SVG space (which appears clockwise visually)

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
}

/**
 * Generate a filled pie-slice path (for the translucent angle fill).
 */
function anglePiePath(
  startAngleDeg: number,
  endAngleDeg: number,
  radius: number
): string {
  const arcPath = angleArcPath(startAngleDeg, endAngleDeg, radius);
  return `M 0 0 L ${arcPath.substring(2)} Z`; // Start at origin, draw arc, close back to origin
}
```

**Math correctness test** (DR-2):

```typescript
// tests/unit/math/angle-arc.test.ts
describe('angleArcPath', () => {
  it('handles 0 to 90 degrees (quarter turn)', () => {
    const path = angleArcPath(0, 90, 2);
    // Should start at (2, 0) and end at (0, -2) in SVG coords
    expect(path).toContain('M 2 0'); // epsilon: within 0.001
    expect(path).toContain('0 -2');
    expect(path).toContain('0 0'); // largeArc=0, sweep=0
  });

  it('handles reflex angle (0 to 270)', () => {
    const path = angleArcPath(0, 270, 2);
    expect(path).toContain('1 0'); // largeArc=1 for angles > 180
  });

  it('handles near-zero angle', () => {
    const path = angleArcPath(0, 0.1, 2);
    // Should produce a very short arc, not degenerate
    expect(path).toBeDefined();
  });

  it('handles near-360 angle', () => {
    const path = angleArcPath(0, 359.9, 2);
    expect(path).toContain('1 0'); // largeArc=1
  });

  it('handles exactly 180 degrees', () => {
    const path = angleArcPath(0, 180, 2);
    // At exactly 180, largeArc should be 0 (not > 180)
    expect(path).toContain('0 0');
  });
});
```

### Gesture Configuration

```typescript
// @use-gesture/react configuration for ray dragging
const bind = useDrag(
  ({ xy: [px, py], active, first, last, memo }) => {
    const [svgX, svgY] = pointerToSvgCoords(px, py);
    const angleDeg = angleFromPointer(svgX, svgY);

    // Snap logic
    const snappedAngle = applySnapBehavior(angleDeg, NOTABLE_ANGLES, {
      snapThreshold: 2, // degrees
      snapStiffness: {
        default: 400,
        important: 500, // for 90 and 180
      },
    });

    setAngle(snappedAngle);

    // Haptic feedback at snap points
    if (first || last) return;
    const prevSnap = memo?.lastSnap ?? null;
    const currentSnap = findNearestNotableAngle(snappedAngle, 0.5);
    if (currentSnap !== null && currentSnap !== prevSnap) {
      if (currentSnap === 90 || currentSnap === 180) {
        navigator.vibrate?.([10, 30, 10]);
      } else {
        navigator.vibrate?.(10);
      }
    }

    return { lastSnap: currentSnap };
  },
  {
    pointer: { touch: true },
    preventDefault: true,
    filterTaps: true,
  }
);
```

### Framer Motion Configuration

All animations in this lesson use consistent spring parameters:

```typescript
// Standard springs used throughout GE-4.1
export const ANGLE_SPRINGS = {
  // Default spring for ray rotation (preset buttons, snap)
  ray: { damping: 20, stiffness: 300 },

  // Softer spring for UI elements (labels, panels)
  ui: { damping: 25, stiffness: 200 },

  // Snappy spring for small UI feedback (checkmarks, pulses)
  feedback: { damping: 10, stiffness: 400 },

  // Strong spring for snap behavior at notable angles
  snap: { damping: 25, stiffness: 400 },

  // Extra-strong for 90/180 snap
  importantSnap: { damping: 25, stiffness: 500 },
} as const;

// Standard durations for non-spring animations
export const ANGLE_DURATIONS = {
  fadeIn: 0.3,     // seconds
  fadeOut: 0.15,   // seconds -- faster than fadeIn for responsiveness
  draw: 0.5,      // SVG path draw animation
  colorSwitch: 0,  // instant -- category boundaries are sharp
  labelSwitch: 0.15, // type label fade transition
  particle: 0.4,  // particle burst at type boundaries
  protractor: 0.3, // protractor overlay appear/disappear
  modeTransition: 0.3, // complementary/supplementary enter/exit
} as const;
```

### Responsive Layout

**Breakpoints**:

| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Mobile S | < 360px | Angle maker viewBox: `[-6, -6, 12, 12]`. Controls stack vertically below. Preset buttons wrap to 2 rows. Font sizes reduced by 2px. |
| Mobile M | 360-480px | Default mobile layout. Angle maker viewBox: `[-8, -8, 16, 16]`. Controls below. |
| Mobile L / Tablet P | 480-768px | Angle maker gets more vertical space. Controls in a single row. |
| Tablet L / Desktop | 768-1024px | Angle maker on the left (60%), controls/text on the right (40%). Side-by-side layout. |
| Desktop L | > 1024px | Same as Tablet L but with more whitespace. Max canvas width: 800px, centered. |

**Mobile-specific considerations (DR-5)**:
- Drag handle touch target: minimum 44x44px regardless of viewport size. The invisible hit area scales inversely with viewport -- smaller screens get proportionally larger touch targets.
- Preset buttons: min-height 44px, min-width 44px.
- Mode toggle buttons: min-height 44px, full width on mobile.
- The protractor overlay is displayed below the angle maker on mobile (not overlaid) to avoid obscuring the interactive area.
- Bottom navigation (tabs) is hidden during lesson playback to maximize vertical space. A small back arrow in the top-left corner allows exit.

### Offline Support (DR-6)

**Cacheable assets** (via Serwist service worker):
- All SVG illustrations (hook real-life images are inline SVG, not external files).
- The lesson MDX content and animation JSON.
- The problem bank JSON (all 9 problems).
- KaTeX CSS and fonts.

**Offline-capable stages**: Stages 1-5 are fully offline-capable. Stage 6 is partially offline-capable (all problems work, but AI evaluation for understanding problems falls back to pattern matching). Stage 7 reflection can be saved locally and synced when online.

**Offline AI fallback**: For Problem 8 (explain why no two obtuse angles) and Problem 9 (explain 180 sum), the offline evaluator uses keyword matching:
- Keywords for Problem 8: ["180", "more than", "exceed", "greater", "sum", "too big", "no room"]
- Keywords for Problem 9: ["straight", "half", "180", "line", "tear", "rip", "corner", "rearrange"]
- Score: 0-2 keywords = low quality, 3-4 = medium, 5+ = high. Map to 0-5 quality scale.

### i18n (DR-7)

All user-facing strings are externalized. Key namespace: `lessons.ge41`.

```json
{
  "lessons": {
    "ge41": {
      "hook": {
        "quarterTurn": "Quarter turn",
        "halfTurn": "Half turn",
        "threeQuarterTurn": "Three-quarter turn",
        "fullTurn": "Full turn = back to start",
        "anglesMessage": "Angles measure ROTATION.",
        "fullTurnMessage": "A full turn = 360\u00b0.",
        "quarterTurnMessage": "A quarter turn = 90\u00b0.",
        "continue": "Let's explore angles"
      },
      "spatial": {
        "acuteLabel": "Acute!",
        "rightLabel": "Right Angle!",
        "obtuseLabel": "Obtuse!",
        "straightLabel": "Straight!",
        "reflexLabel": "Reflex!",
        "complementaryButton": "Complementary",
        "supplementaryButton": "Supplementary",
        "interactionProgress": "{{count}} of 10 interactions"
      },
      "discovery": {
        "prompt1": "Drag the ray to make different angles. Notice how the color changes? Angles less than 90\u00b0 are called <bold color='acute'>ACUTE</bold> (sharp!). Try to make one.",
        "prompt2": "Now make exactly 90\u00b0. See the little square? That's a <bold color='right'>RIGHT ANGLE</bold> \u2014 the most important angle in math. Walls meet floors at right angles!",
        "prompt3": "Keep going past 90\u00b0. Now it's <bold color='obtuse'>OBTUSE</bold> (wide/blunt). These are between 90\u00b0 and 180\u00b0.",
        "prompt4": "Go to 180\u00b0 \u2014 a perfectly flat line. This is a <bold color='straight'>STRAIGHT ANGLE</bold>.",
        "prompt5": "Now for the secret level: keep going past 180\u00b0! This is a <bold color='reflex'>REFLEX ANGLE</bold> \u2014 more than 180\u00b0 but less than 360\u00b0.",
        "prompt6": "Final discovery: make two angles that add to exactly 90\u00b0. These are <bold color='acute'>COMPLEMENTARY</bold>. Now make two that add to 180\u00b0 \u2014 <bold color='obtuse'>SUPPLEMENTARY</bold>!",
        "completionMessage": "You've discovered all the angle types! Let's put names to what you've learned."
      },
      "symbolBridge": {
        "vertexMiddle": "The vertex letter always goes in the MIDDLE",
        "degreeExplanation": "The small circle is the degree symbol: 360\u00b0 in a full turn.",
        "continue": "See it in the real world"
      },
      "realWorld": {
        "architectureTitle": "Right angles make buildings stand up straight",
        "architectureDesc": "Look around any room \u2014 walls meet floors and ceilings at 90\u00b0 angles. This makes structures stable. If the angles were off by even a few degrees, the building would lean and eventually collapse. The Leaning Tower of Pisa is famous precisely because its angle is NOT 90\u00b0.",
        "sportsTitle": "A basketball shot at 45\u00b0 goes the farthest",
        "sportsDesc": "In physics, a projectile launched at 45\u00b0 covers the maximum horizontal distance. Basketball players instinctively adjust their shot angle \u2014 closer to the hoop means a steeper angle, farther away means closer to 45\u00b0.",
        "navigationTitle": "Compass bearings use angles to navigate",
        "navigationDesc": "Sailors, pilots, and hikers use compass bearings measured in degrees from North. North is 0\u00b0, East is 90\u00b0, South is 180\u00b0, West is 270\u00b0. GPS systems still use these same angle measurements.",
        "designTitle": "Scissors open at different angles for different cuts",
        "designDesc": "Tool design is all about angles. Scissors open wider for cutting thick material and narrower for precision cuts. Knife blades are ground at specific angles \u2014 a 15\u00b0 edge for sharp kitchen knives, 25\u00b0 for durable outdoor knives.",
        "continue": "Practice time"
      },
      "practice": {
        "p1Statement": "What type of angle is 135\u00b0?",
        "p1CorrectFeedback": "That's right! 135\u00b0 is between 90\u00b0 and 180\u00b0, making it obtuse.",
        "checkButton": "Check",
        "retryButton": "Try again"
      },
      "reflection": {
        "prompt": "Why do you think the angles in any triangle always add up to exactly 180 degrees?",
        "subtext": "There's no single 'right answer' here. Explain in your own words.",
        "placeholder": "Type your thoughts...",
        "submitButton": "Share my thinking"
      },
      "completion": {
        "title": "Lesson Complete!",
        "lessonCompletion": "Lesson completion",
        "explorationBonus": "Exploration bonus",
        "reflectionQuality": "Reflection quality",
        "total": "Total",
        "neuronsEarned": "+{{count}} Neurons",
        "nextLesson": "Continue to GE-4.1a: Angle Pairs",
        "backToNebula": "Back to Knowledge Nebula"
      }
    }
  }
}
```

### Content Files

#### `meta.json`

```json
{
  "id": "GE-4.1",
  "name": "Angles",
  "domain": "geometry",
  "gradeLevel": 6,
  "prerequisites": [],
  "successors": ["GE-4.1a", "GE-4.2", "GE-4.3"],
  "estimatedMinutes": { "min": 12, "max": 18 },
  "hook": "Billiards: angle in = angle out. Geometry is the cheat code for pool.",
  "alternateHook": "Clock hands sweeping: a full rotation = 360 degrees.",
  "keyVocabulary": [
    "angle", "vertex", "ray", "degree",
    "acute", "right", "obtuse", "straight", "reflex",
    "complementary", "supplementary", "protractor"
  ],
  "commonMisconceptions": [
    "Angles depend on ray length (they don't -- only the rotation matters)",
    "Reflex angles don't exist or aren't 'real' angles",
    "Complementary means 'compliment' (praise) rather than 'complement' (complete to 90)",
    "The angle between clock hands at 6:00 is 360 degrees (it's 180)"
  ],
  "crossConnections": [
    { "topicId": "NO-1.4", "description": "Complementary/supplementary as fraction-of-circle" },
    { "topicId": "NO-1.2a", "description": "Subtraction for finding missing angles" },
    { "topicId": "GE-4.11", "description": "Rotation transformations measured in angles" }
  ],
  "srsLayers": {
    "recall": "Classify angle types by name and visual appearance",
    "procedure": "Compute complementary, supplementary, and simple clock angles",
    "understanding": "Explain triangle angle sum and impossibility of two obtuse angles in a triangle"
  }
}
```

#### `problems.json` (abbreviated -- full bank would contain 30+ problems for SRS variety)

```json
{
  "problems": [
    {
      "id": "ge41-r1",
      "layer": 0,
      "type": "multiple-choice",
      "difficulty": 1.5,
      "discrimination": 1.0,
      "statement": "What type of angle is 135\u00b0?",
      "visualization": {
        "type": "angle",
        "angleDeg": 135,
        "showMeasurement": true
      },
      "options": [
        { "id": "a", "text": "Acute", "correct": false },
        { "id": "b", "text": "Right", "correct": false },
        { "id": "c", "text": "Obtuse", "correct": true },
        { "id": "d", "text": "Reflex", "correct": false }
      ],
      "feedback": {
        "correct": "That's right! 135\u00b0 is between 90\u00b0 and 180\u00b0, making it obtuse.",
        "a": "Not quite. Acute angles are less than 90\u00b0. 135\u00b0 is bigger than 90\u00b0.",
        "b": "A right angle is exactly 90\u00b0. 135\u00b0 is larger than 90\u00b0.",
        "d": "Reflex angles are greater than 180\u00b0. 135\u00b0 is less than 180\u00b0."
      },
      "whyPrompt": "Quick check: how do you know it's not reflex?",
      "tags": ["classification", "obtuse"]
    },
    {
      "id": "ge41-p1",
      "layer": 1,
      "type": "numeric",
      "difficulty": 2.0,
      "discrimination": 1.2,
      "statement": "Two angles are complementary. One is 35\u00b0. What is the other?",
      "visualization": {
        "type": "complementary-pair",
        "angleA": 35,
        "angleB": null
      },
      "correctAnswer": 55,
      "tolerance": 0.5,
      "feedback": {
        "correct": "Perfect! 35\u00b0 + 55\u00b0 = 90\u00b0. Complementary angles always sum to 90\u00b0.",
        "default": "Remember, complementary angles add to 90\u00b0. What is 90 - 35?"
      },
      "commonErrors": {
        "145": "That would be the supplementary complement (adding to 180\u00b0). Complementary means adding to 90\u00b0.",
        "35": "Complementary angles don't have to be equal \u2014 they just need to add to 90\u00b0."
      },
      "whyPrompt": "If two complementary angles were equal, what would each be?",
      "tags": ["complementary", "computation"]
    },
    {
      "id": "ge41-u1",
      "layer": 2,
      "type": "free-text",
      "difficulty": 3.5,
      "discrimination": 1.5,
      "statement": "Explain why a triangle CANNOT have two obtuse angles.",
      "visualization": {
        "type": "failed-triangle",
        "angles": [100, 100],
        "animated": true
      },
      "evaluationKeywords": ["180", "more than", "exceed", "sum", "too big", "no room", "greater"],
      "qualityRubric": {
        "1": "States impossibility without reasoning",
        "2": "Mentions 180\u00b0 sum but doesn't complete the argument",
        "3": "Explains that two obtuse angles already exceed 180\u00b0",
        "4": "Adds that even 91\u00b0 + 91\u00b0 = 182\u00b0 > 180\u00b0, making any third angle impossible"
      },
      "tags": ["triangle-sum", "explanation", "impossibility"]
    }
  ]
}
```

### Performance Monitoring

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (lesson page load) | < 2.5s on 4G | Next.js built-in + Web Vitals |
| FPS during ray drag | P95 >= 55fps | `PerformanceObserver` frame timing |
| FPS during hook animation | P95 >= 55fps | Same |
| SVG render time per frame | < 2ms | Custom performance marks around arc path calculation |
| Time to interactive (Stage 2) | < 1s after Stage 1 complete | Time from continue button press to first drag response |
| JS bundle size (lesson chunk) | < 50KB gzipped | Build-time budget check |
| Total SVG elements (peak) | <= 40 | Runtime assertion in dev mode |

### Testing Requirements

#### Unit Tests (Vitest)

```
tests/unit/math/
  angle-arc.test.ts           # Arc path calculation (DR-2)
  angle-classification.test.ts # Type classification logic
  complementary.test.ts       # Complementary pair computation
  supplementary.test.ts       # Supplementary pair computation
  snap-behavior.test.ts       # Notable angle snapping logic
```

#### Integration Tests (Vitest + Testing Library)

```
tests/integration/lesson-flow/
  ge41-stage-progression.test.ts  # Stages 1-7 flow correctly
  ge41-interaction-counter.test.ts # 10 interactions unlock continue
  ge41-discovery-goals.test.ts    # Each guided discovery goal detection
  ge41-practice-scoring.test.ts   # XP calculation for each problem type
```

#### E2E Tests (Playwright)

```
tests/e2e/
  ge41-full-lesson.spec.ts    # Complete lesson flow, happy path
  ge41-mobile-gestures.spec.ts # Touch drag on mobile viewport
  ge41-offline.spec.ts        # Lesson works offline after caching
  ge41-accessibility.spec.ts  # Screen reader navigation, keyboard control
```

#### Visual Regression Tests (Storybook + Chromatic)

```
components/math-scene/svg/Angle.stories.ts
  - Acute angle at 45 degrees
  - Right angle at 90 degrees (with square indicator)
  - Obtuse angle at 135 degrees
  - Straight angle at 180 degrees
  - Reflex angle at 270 degrees
  - Complementary pair at 30/60
  - Supplementary pair at 110/70
  - Protractor overlay visible
  - All angle type colors
  - Mobile viewport (360px wide)
  - Desktop viewport (1024px wide)
```

---

## Appendix A: Full Color Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `--angle-acute` | `#34d399` | Emerald 400. Acute angle arcs, fills, labels. |
| `--angle-right` | `#fbbf24` | Amber 400. Right angle arcs, fills, labels, square indicator. |
| `--angle-obtuse` | `#60a5fa` | Blue 400. Obtuse angle arcs, fills, labels. |
| `--angle-straight` | `#818cf8` | Indigo 400. Straight angle arcs, fills, labels. |
| `--angle-reflex` | `#fb7185` | Rose 400. Reflex angle arcs, fills, labels. |
| `--arc-fill-opacity` | `15%` | Applied to all angle type colors for the pie-slice fill. |
| `--ray-fixed` | `#94a3b8` | Slate 400. The non-draggable reference ray. |
| `--ray-draggable` | `#f8fafc` | Slate 50. The draggable ray (high contrast). |
| `--vertex` | `#f8fafc` | Slate 50. Vertex point fill. |
| `--handle-default` | `#3b82f6` | Blue 500. Drag handle default state. |
| `--handle-hover` | `#60a5fa` | Blue 400. Drag handle hover state. |
| `--handle-active` | `#93c5fd` | Blue 300. Drag handle during drag. |
| `--protractor-tick` | `#94a3b8` | Slate 400 at 60% opacity. Protractor tick marks. |
| `--protractor-bg` | `#1e293b` | Slate 800 at 40% opacity. Protractor background. |
| `--text-primary` | `#f8fafc` | Slate 50. Primary text. |
| `--text-secondary` | `#cbd5e1` | Slate 300. Description text. |
| `--text-muted` | `#94a3b8` | Slate 400. Hints, labels. |
| `--text-dim` | `#64748b` | Slate 500. Placeholder text, minor annotations. |
| `--surface` | `#0f172a` | Slate 900. Card backgrounds, prompt containers. |
| `--surface-elevated` | `#1e293b` | Slate 800. Table headers, elevated surfaces. |
| `--border` | `#1e293b` | Slate 800. Card borders. |
| `--focus-ring` | `#3b82f6` | Blue 500. Focus indicators (3px outline, 2px offset). |

## Appendix B: Timing Summary

| Stage | Min Duration | Max Duration | Required Actions |
|-------|-------------|-------------|-----------------|
| 1. Hook | 10s (auto-play, continue appears at 10s) | 30s (if student watches full animation + montage) | Wait for continue button |
| 2. Spatial Experience | 60s (speed-run 10 interactions) | 240s (deep exploration) | 10 interactions minimum |
| 3. Guided Discovery | 90s (complete all 6 prompts quickly) | 300s (with hints and exploration) | Complete all 6 prompts |
| 4. Symbol Bridge | 50s (auto-play timing) | 180s (exploring table interactively) | View all content |
| 5. Real-World Anchor | 30s (swipe through 2 cards quickly) | 120s (read all 4 cards thoroughly) | View 2+ cards |
| 6. Practice | 180s (9 problems, ~20s each) | 600s (with retries, hints, explanations) | Complete 9 problems |
| 7. Reflection | 30s (write minimum 30 chars) | 120s (thoughtful reflection) | Submit reflection |
| **Total** | **~7.3 min** | **~26.5 min** | **All stages** |
| **Typical** | **12 min** | **18 min** | -- |

## Appendix C: Edge Cases & Error Handling

| Scenario | Handling |
|----------|---------|
| Student rapidly drags ray in circles | Debounce interaction counter (must pause > 200ms in new position to count). Prevent counting the same type transition twice without visiting a different type in between. |
| Student closes app mid-lesson | Save current stage and all state to IndexedDB via Dexie.js. On return, offer "Resume from Stage {X}" or "Start over". |
| Student's device loses WebGL context (iOS background) | Not applicable -- this lesson uses SVG only, no WebGL. |
| Student achieves 0/9 on practice | No failure state. Gentle message: "These concepts take time. Let's review the lesson and try again." Offer to revisit Stage 2 (Spatial Experience). |
| Student writes nonsensical text in reflection | AI flags as low quality (score 0). Feedback: "It looks like this might not be complete. Can you try explaining why the three angles in a triangle add to 180 degrees?" Allow resubmission. |
| Touch gesture conflicts with page scroll | `@use-gesture/react` `preventDefault: true` on the drag handle. The drag area captures touch events. Scrolling is handled by the outer container only in areas outside the SVG canvas. |
| Very slow device (< 30fps during drag) | Detect via `PerformanceObserver`. If P95 < 30fps for 2 seconds, reduce visual effects: disable particle bursts, reduce arc fill opacity to 0 (stroke only), disable protractor overlay auto-show. |
| Student with color vision deficiency | All angle types are identified by text label AND color. The classification table uses text, not color-coded cells. The arc always has a text label nearby. Optional: high-contrast mode in settings that uses patterns (dashed for acute, solid for right, dotted for obtuse, etc.) in addition to color. |
| Screen reader user | Full ARIA labels on all interactive elements (see Accessibility sections per stage). The lesson is completable entirely via keyboard. The spatial experience uses arrow keys for rotation. Practice problems use standard form inputs. |
| Student drags ray to exactly 0 degrees | Display shows "0deg", no arc drawn, no type label. This is valid -- the student is exploring the zero-angle boundary. It counts as an interaction if they came from > 5 degrees away. |
| Student drags ray to exactly 360 degrees | Equivalent to 0 degrees. Display shows "360deg" momentarily, then wraps to "0deg" if the student continues past. |
| Pointer moves very fast (skipping frames) | The angle calculation uses the latest pointer position, not interpolation. At 60fps, even fast swipes produce smooth arcs because `atan2` is continuous. No special handling needed. |
| Numeric input: student enters decimal for complementary/supplementary | Accept integers only for this lesson (all answers are whole numbers). Display validation message: "Enter a whole number of degrees." |
| Numeric input: student enters negative number | Display validation message: "Angle measurements are always positive. Enter a number between 0 and 360." |
