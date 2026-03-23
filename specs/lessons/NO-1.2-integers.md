# Lesson Design: NO-1.2 Integers -- The Number Line Below Zero

**Version**: 1.0.0 | **Date**: 2026-03-22 | **Author**: Lesson Design System
**Concept ID**: `NO-1.2` | **Domain**: Numbers & Operations | **Grade**: 6
**Content Path**: `numbers-operations/NO-1.2`
**Estimated Duration**: ~25 minutes
**Renderer**: `svg` (all scenes are 2D)

---

## Table of Contents

1. [Lesson Overview](#1-lesson-overview)
2. [Neuroscience Framework](#2-neuroscience-framework)
3. [Stage 1: Hook](#3-stage-1-hook-30-60s)
4. [Stage 2: Spatial Experience](#4-stage-2-spatial-experience-2-4-min)
5. [Stage 3: Guided Discovery](#5-stage-3-guided-discovery-3-5-min)
6. [Stage 4: Symbol Bridge](#6-stage-4-symbol-bridge-2-3-min)
7. [Stage 5: Real-World Anchor](#7-stage-5-real-world-anchor-1-2-min)
8. [Stage 6: Practice](#8-stage-6-practice-adaptive)
9. [Stage 7: Reflection](#9-stage-7-reflection-1-min)
10. [Technical Specifications](#10-technical-specifications)
11. [Accessibility](#11-accessibility)
12. [Offline & Performance](#12-offline--performance)
13. [i18n Keys](#13-i18n-keys)
14. [Content Files Manifest](#14-content-files-manifest)
15. [XP & Gamification Integration](#15-xp--gamification-integration)
16. [AI Tutor Integration](#16-ai-tutor-integration)
17. [Testing Requirements](#17-testing-requirements)

---

## 1. Lesson Overview

### Concept

Students discover that numbers extend below zero. The integer number line is a
continuous spatial object where negative numbers are mirror reflections of
positive numbers around zero. This is the foundational spatial metaphor for all
subsequent work with signed arithmetic.

### Curriculum Position

```
NO-1.1 (Place Value)  --->  [ NO-1.2 Integers ]  --->  NO-1.2a (Integer Add/Sub)
                                                   --->  AL-3.1 (Variables & Expressions)
```

| Field | Value |
|-------|-------|
| Prerequisites | `NO-1.1` (Place Value) -- must be status >= `reviewing` |
| Successors | `NO-1.2a` (Integer Add/Sub), `AL-3.1` (Variables & Expressions) |
| Cross-domain links | NO-1.2 -> AL-3.1 (negative values in expressions) |
| Prerequisite strength | 1.0 (hard gate -- NO-1.1 mastery required) |

### Key Learning Objectives

By the end of this lesson, students will be able to:

1. **Identify** integers as the set {..., -3, -2, -1, 0, 1, 2, 3, ...} and
   distinguish them from non-integers (e.g., 2.5)
2. **Locate** any integer from -10 to +10 on a number line
3. **Explain** that every positive integer has an opposite (negative) integer
   equidistant from zero on the other side
4. **Compare** two integers using the spatial rule "further right = greater"
5. **Define** absolute value as the distance from zero (visual/spatial
   understanding, formal notation deferred to NO-1.9)
6. **Connect** integers to real-world contexts (temperature, elevation,
   money, floors)

### Common Misconceptions (Targeted)

| Misconception | Why It Happens | How This Lesson Addresses It |
|---------------|---------------|------------------------------|
| "-5 > -2 because 5 > 2" | Students apply whole-number ordering to negatives | Stage 3 explicitly addresses this with number-line animation + building metaphor; Stage 6 Problem 5 and Problem 7 test this |
| "Negative numbers aren't real numbers" | Lack of real-world anchoring | Stage 1 Hook uses temperature; Stage 5 gives four real-world examples |
| "Zero is not a number" | Zero feels like "nothing" | Stage 3 Prompt 4 explicitly addresses zero as the boundary; Symbol Bridge includes zero in the integer set |
| "The minus sign means subtraction, not a type of number" | Prior experience with minus = operation only | Stage 4 Symbol Bridge distinguishes the negative sign from the subtraction operator visually |
| "Numbers go: 1, 2, 3, ... and that's it" | No prior exposure to extension below zero | Stage 1 Hook creates the dramatic "what happens next?" moment at zero |

### Emotional Arc

```
Curiosity     Wonder       Insight        Confidence     Mastery
  (Hook)    (Spatial)    (Discovery)     (Practice)    (Reflection)
   ___         ___
  /   \       /   \         ___
 /     \_____/     \       /   \         ___            ___
/                   \_____/     \       /   \          /   \
                                 \_____/     \________/     \___
```

- **Hook**: Surprise + curiosity ("what's below zero?")
- **Spatial**: Wonder + embodied exploration (dragging through zero)
- **Discovery**: Aha-moment (mirror symmetry) + productive struggle (ordering)
- **Practice**: Confidence-building (recall/procedure) + challenge (understanding)
- **Reflection**: Consolidation + pride

---

## 2. Neuroscience Framework

### Stage-by-Stage Cognitive Mapping

| Stage | Primary Brain Region | Cognitive Process | Emotional Target | Neuroscience Rationale |
|-------|---------------------|-------------------|------------------|----------------------|
| 1. Hook | Ventral tegmental area (VTA), anterior cingulate | Novelty detection, reward prediction error | Surprise, curiosity | The temperature dropping past zero violates the student's prediction that "numbers stop at zero." This prediction error triggers dopaminergic novelty response, priming the brain for encoding. |
| 2. Spatial | Intraparietal sulcus (IPS), posterior parietal cortex, motor cortex | Spatial-numerical mapping, visuospatial sketchpad, embodied simulation | Wonder, agency | Dragging a point along the number line recruits the IPS (spatial-numerical association) and motor cortex (embodied cognition). The physical left-right movement creates a spatial mental model that persists longer than verbal instruction. |
| 3. Discovery | Prefrontal cortex, hippocampus, striatum | Pattern recognition, elaborative encoding, schema construction | Aha-moment, productive struggle | Guided prompts trigger the student to notice the mirror symmetry pattern themselves. Self-discovered patterns produce stronger hippocampal encoding than told-patterns. The -5 < -2 counterintuitive result creates desirable difficulty. |
| 4. Symbol Bridge | Left angular gyrus, visual word form area | Symbol grounding, dual coding | Clarity, connection | Overlaying formal notation onto the spatial representation creates dual codes (visual + symbolic). The angular gyrus binds the spatial representation to the mathematical symbol. This is why spatial MUST come first. |
| 5. Real-World Anchor | Medial prefrontal cortex, temporal pole | Semantic integration, contextual binding | Relevance, meaning | Connecting abstract integers to concrete experiences (temperature, depth, money, elevators) creates multiple retrieval pathways. Each context provides a distinct encoding of the same concept. |
| 6. Practice | Basal ganglia, prefrontal cortex, hippocampus | Retrieval practice, procedural consolidation, error correction | Confidence, mastery | Interleaved practice across recall/procedure/understanding layers strengthens retrieval routes. Immediate feedback prevents error consolidation. |
| 7. Reflection | Prefrontal cortex, default mode network | Metacognition, self-explanation, consolidation | Pride, ownership | Self-explanation forces the student to reorganize their understanding into a communicable form, revealing and filling gaps. This is the highest-XP activity because it produces the strongest learning. |

### Design Constraints from Neuroscience

1. **No formulas before Stage 4.** The notation Z = {...} and |n| are introduced
   only AFTER the spatial experience and guided discovery. Violating this order
   would bypass the IPS spatial encoding and rely on rote symbol memorization.

2. **Dragging is mandatory, not optional.** The Stage 2 interaction counter
   (minimum 10 interactions) ensures motor cortex recruitment. Passive
   observation is insufficient for embodied encoding.

3. **The -5 < -2 misconception must be surfaced, not avoided.** Desirable
   difficulty: the student must confront and resolve the counterintuitive
   ordering. Stage 3 Prompt 2 deliberately triggers the conflict.

4. **Multiple real-world anchors, not just one.** Each anchor creates a distinct
   retrieval pathway. Four anchors (temperature, elevation, money, elevator)
   ensure robust context-dependent recall.

5. **Reflection is NOT optional.** Even a weak self-explanation produces
   measurably better retention than no self-explanation. The AI evaluator
   provides encouraging feedback regardless of quality, while scoring
   internally for the SRS model.

---

## 3. Stage 1: Hook (30-60s)

### Scene: "What's Below Zero?"

**Concept**: A thermometer animation shows temperature dropping past zero,
creating the dramatic question of what lies below.

**Duration**: ~8 seconds auto-animation + ~2 seconds for continue button = ~10s
active. Students may replay (up to 3 replays before the continue button
persists permanently).

### Scene Definition (MathScene JSON)

```json
{
  "id": "NO-1.2-hook-thermometer",
  "renderer": "svg",
  "viewBox": [0, 0, 400, 600],
  "background": "#1a1a2e",
  "objects": [
    {
      "id": "bg-gradient",
      "type": "group",
      "children": [
        {
          "id": "bg-warm",
          "type": "geometricShape",
          "shape": "rectangle",
          "width": 400,
          "height": 600,
          "style": { "fill": "url(#bg-gradient-warm)", "opacity": 1 }
        }
      ]
    },
    {
      "id": "thermometer-body",
      "type": "group",
      "children": [
        {
          "id": "therm-tube",
          "type": "geometricShape",
          "shape": "rectangle",
          "width": 40,
          "height": 360,
          "center": [200, 250],
          "style": {
            "fill": "#ffffff10",
            "stroke": "#ffffff40",
            "strokeWidth": 2
          }
        },
        {
          "id": "therm-bulb",
          "type": "geometricShape",
          "shape": "circle",
          "center": [200, 450],
          "radius": 30,
          "style": { "fill": "#ef4444", "stroke": "#ffffff40", "strokeWidth": 2 }
        },
        {
          "id": "therm-mercury",
          "type": "geometricShape",
          "shape": "rectangle",
          "width": 24,
          "height": 280,
          "center": [200, 310],
          "style": { "fill": "#ef4444" }
        }
      ]
    },
    {
      "id": "temp-label-5",
      "type": "annotation",
      "position": [280, 120],
      "latex": "5^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#fbbf24", "fontSize": 14 }
    },
    {
      "id": "temp-label-4",
      "type": "annotation",
      "position": [280, 168],
      "latex": "4^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#fbbf24", "fontSize": 14 }
    },
    {
      "id": "temp-label-3",
      "type": "annotation",
      "position": [280, 216],
      "latex": "3^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#fbbf24", "fontSize": 14 }
    },
    {
      "id": "temp-label-2",
      "type": "annotation",
      "position": [280, 264],
      "latex": "2^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#fbbf24", "fontSize": 14 }
    },
    {
      "id": "temp-label-1",
      "type": "annotation",
      "position": [280, 312],
      "latex": "1^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#fbbf24", "fontSize": 14 }
    },
    {
      "id": "temp-label-0",
      "type": "annotation",
      "position": [280, 360],
      "latex": "0^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#fbbf24", "fontSize": 18 }
    },
    {
      "id": "zero-line",
      "type": "line",
      "from": [170, 360],
      "to": [230, 360],
      "visible": false,
      "dashed": true,
      "style": { "stroke": "#fbbf24", "strokeWidth": 2 }
    },
    {
      "id": "question-text",
      "type": "annotation",
      "position": [200, 40],
      "latex": "\\text{What happens next?}",
      "visible": false,
      "style": { "fill": "#ffffff", "fontSize": 24 }
    },
    {
      "id": "temp-label-neg1",
      "type": "annotation",
      "position": [280, 408],
      "latex": "-1^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#60a5fa", "fontSize": 14 }
    },
    {
      "id": "temp-label-neg2",
      "type": "annotation",
      "position": [280, 446],
      "latex": "-2^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#60a5fa", "fontSize": 14 }
    },
    {
      "id": "temp-label-neg3",
      "type": "annotation",
      "position": [280, 475],
      "latex": "-3^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#60a5fa", "fontSize": 14 }
    },
    {
      "id": "temp-label-neg4",
      "type": "annotation",
      "position": [280, 504],
      "latex": "-4^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#60a5fa", "fontSize": 14 }
    },
    {
      "id": "temp-label-neg5",
      "type": "annotation",
      "position": [280, 533],
      "latex": "-5^\\circ\\text{C}",
      "visible": false,
      "style": { "fill": "#60a5fa", "fontSize": 14 }
    },
    {
      "id": "ice-crystal-1",
      "type": "annotation",
      "position": [100, 400],
      "latex": "\\text{*}",
      "visible": false,
      "style": { "fill": "#93c5fd", "fontSize": 18 }
    },
    {
      "id": "ice-crystal-2",
      "type": "annotation",
      "position": [320, 430],
      "latex": "\\text{*}",
      "visible": false,
      "style": { "fill": "#bfdbfe", "fontSize": 24 }
    },
    {
      "id": "ice-crystal-3",
      "type": "annotation",
      "position": [80, 470],
      "latex": "\\text{*}",
      "visible": false,
      "style": { "fill": "#dbeafe", "fontSize": 14 }
    },
    {
      "id": "ice-crystal-4",
      "type": "annotation",
      "position": [340, 500],
      "latex": "\\text{*}",
      "visible": false,
      "style": { "fill": "#93c5fd", "fontSize": 20 }
    },
    {
      "id": "ice-crystal-5",
      "type": "annotation",
      "position": [110, 520],
      "latex": "\\text{*}",
      "visible": false,
      "style": { "fill": "#bfdbfe", "fontSize": 16 }
    }
  ],
  "animations": [],
  "interactions": []
}
```

### Animation Sequence (Frame-by-Frame)

The following animation runs automatically on stage enter. All timings are in
seconds from stage entry.

#### Phase 1: Temperature Countdown 5 -> 0 (0.0s - 4.5s)

| Time (s) | Action | Target | Properties | Easing |
|-----------|--------|--------|------------|--------|
| 0.0 | fadeIn | `therm-tube` | duration: 0.5s, from: "scale" | easeOutBack |
| 0.0 | fadeIn | `therm-bulb` | duration: 0.5s, from: "scale" | easeOutBack |
| 0.5 | fadeIn | `therm-mercury` | duration: 0.3s | easeOut |
| 0.8 | fadeIn | `temp-label-5` | duration: 0.2s, from: "right" | easeOut |
| 0.8 | transform | `therm-mercury` | height: 280 -> 280 (stays full) | -- |
| 1.3 | fadeOut | `temp-label-5` | duration: 0.15s | linear |
| 1.3 | fadeIn | `temp-label-4` | duration: 0.2s, from: "right" | easeOut |
| 1.3 | transform | `therm-mercury` | height: 280 -> 232, y-center: 310 -> 334 | spring(damping:20, stiffness:300) |
| 1.8 | fadeOut | `temp-label-4` | duration: 0.15s | linear |
| 1.8 | fadeIn | `temp-label-3` | duration: 0.2s, from: "right" | easeOut |
| 1.8 | transform | `therm-mercury` | height: 232 -> 184, y-center: 334 -> 358 | spring(damping:20, stiffness:300) |
| 2.3 | fadeOut | `temp-label-3` | duration: 0.15s | linear |
| 2.3 | fadeIn | `temp-label-2` | duration: 0.2s, from: "right" | easeOut |
| 2.3 | transform | `therm-mercury` | height: 184 -> 136, y-center: 358 -> 382 | spring(damping:20, stiffness:300) |
| 2.8 | fadeOut | `temp-label-2` | duration: 0.15s | linear |
| 2.8 | fadeIn | `temp-label-1` | duration: 0.2s, from: "right" | easeOut |
| 2.8 | transform | `therm-mercury` | height: 136 -> 88, y-center: 382 -> 406 | spring(damping:20, stiffness:300) |
| 3.3 | fadeOut | `temp-label-1` | duration: 0.15s | linear |
| 3.3 | fadeIn | `temp-label-0` | duration: 0.3s, from: "scale" | easeOutBack |
| 3.3 | fadeIn | `zero-line` | duration: 0.3s | easeOut |
| 3.3 | transform | `therm-mercury` | height: 88 -> 40, y-center: 406 -> 430 | spring(damping:20, stiffness:300) |
| 3.3 | transform | `therm-bulb` | fill: #ef4444 -> #fbbf24 | easeInOut, duration: 0.4s |

#### Phase 2: Dramatic Pause + Question (4.5s - 5.5s)

| Time (s) | Action | Target | Properties | Easing |
|-----------|--------|--------|------------|--------|
| 4.5 | wait | -- | duration: 1.0s | -- |
| 4.5 | fadeIn | `question-text` | duration: 0.5s, from: "top" | easeOutBack |
| 4.5 | highlight | `temp-label-0` | pulse: true, color: "#fbbf24" | -- |

During this pause, the mercury sits at zero, the "0 C" label pulses gently
(scale oscillation between 1.0 and 1.1, period 0.8s), and the question text
hovers at the top.

#### Phase 3: Below Zero (5.5s - 8.0s)

| Time (s) | Action | Target | Properties | Easing |
|-----------|--------|--------|------------|--------|
| 5.5 | fadeOut | `question-text` | duration: 0.3s | easeIn |
| 5.5 | transform | `bg-warm` | fill gradient shift: warm -> cold (see CSS below) | easeInOut, duration: 2.5s |
| 5.5 | transform | `therm-bulb` | fill: #fbbf24 -> #3b82f6 | easeInOut, duration: 2.5s |
| 5.5 | transform | `therm-mercury` | fill: #ef4444 -> #3b82f6 | easeInOut, duration: 2.5s |
| 5.7 | fadeIn | `temp-label-neg1` | duration: 0.2s, from: "right" | easeOut |
| 5.7 | fadeIn | `ice-crystal-1` | duration: 0.5s, from: "scale" | easeOutBack |
| 5.7 | transform | `therm-mercury` | height: 40 -> 8 (minimal) | spring(damping:20, stiffness:300) |
| 6.1 | fadeIn | `temp-label-neg2` | duration: 0.2s, from: "right" | easeOut |
| 6.1 | fadeIn | `ice-crystal-2` | duration: 0.5s, from: "scale" | easeOutBack |
| 6.5 | fadeIn | `temp-label-neg3` | duration: 0.2s, from: "right" | easeOut |
| 6.5 | fadeIn | `ice-crystal-3` | duration: 0.5s, from: "scale" | easeOutBack |
| 6.9 | fadeIn | `temp-label-neg4` | duration: 0.2s, from: "right" | easeOut |
| 6.9 | fadeIn | `ice-crystal-4` | duration: 0.5s, from: "scale" | easeOutBack |
| 7.3 | fadeIn | `temp-label-neg5` | duration: 0.2s, from: "right" | easeOut |
| 7.3 | fadeIn | `ice-crystal-5` | duration: 0.5s, from: "scale" | easeOutBack |

#### Phase 4: Final State (8.0s+)

At 8.0s the animation completes. Final state:

- Background: deep blue-purple gradient (`#1a1a2e` -> `#0f172a`)
- Thermometer mercury: blue (#3b82f6), at minimal height (just above bulb)
- All negative temperature labels visible in blue (#60a5fa)
- All five ice crystals visible, gently rotating (continuous animation:
  rotate 0 -> 360deg, duration 8s, linear, infinite, each crystal has a
  different speed: 6s, 8s, 10s, 7s, 9s)
- Zero line still visible, pulsing gently
- Positive labels have faded out (only -1 through -5 and 0 remain)

#### Continue Button

- Appears at `t = 8.5s` (0.5s after animation completes)
- Position: bottom center, 48px from bottom edge
- Style: pill-shaped, semi-transparent white background (#ffffff20),
  white text, 16px font, padding 12px 32px
- Text: i18n key `lesson.integers.hook.continue` ("Continue" in en)
- Entrance animation: fadeIn from bottom, duration 0.4s, easeOutBack
- Tap target: 48px height minimum (exceeds 44px requirement)
- On tap: spring scale 0.95 -> 1.0 (duration 0.15s), then transition to Stage 2

#### Background Gradient CSS

```css
/* Phase 1-2: Warm state */
.hook-bg--warm {
  background: linear-gradient(
    180deg,
    #92400e 0%,    /* amber-800 */
    #dc2626 40%,   /* red-600 */
    #f97316 100%   /* orange-500 */
  );
}

/* Phase 3: Cold state (animated transition via Framer Motion) */
.hook-bg--cold {
  background: linear-gradient(
    180deg,
    #0f172a 0%,    /* slate-900 */
    #1e3a5f 40%,   /* blue-900 */
    #1e40af 100%   /* blue-800 */
  );
}
```

The gradient transition is handled by Framer Motion interpolating between the
warm and cold gradient color stops over 2.5s (easeInOut).

#### Sound Design Notes (for future audio implementation)

| Time | Sound | Description |
|------|-------|-------------|
| 0.8 - 3.3 | tick | Soft tick for each temperature step (pitched down slightly each step) |
| 3.3 - 4.5 | silence | Dramatic pause, maybe a faint low hum |
| 4.5 | whoosh | Gentle question appearance whoosh |
| 5.5 - 8.0 | cooling-whoosh | Sustained crystalline whoosh, increasing in intensity, with faint ice-cracking sounds for each crystal appearance |
| 8.0+ | ambient-cold | Soft ambient cold wind loop (very low volume) |

#### Replay Behavior

- A small replay button (circular, 36px, top-right corner, icon: curved arrow)
  appears after the continue button
- Tapping replay resets all objects to initial state and replays the animation
- Maximum 3 replays, after which the continue button persists and the replay
  button is hidden
- Replay count is NOT tracked for XP or SRS purposes

#### Edge Cases

| Scenario | Behavior |
|----------|----------|
| Student taps screen during animation | Animation continues uninterrupted; taps are ignored until continue button appears |
| Student navigates away mid-animation | Animation state is NOT saved; re-entering Stage 1 replays from the beginning |
| Reduced motion preference (`prefers-reduced-motion`) | Skip all animations; show final state immediately with all labels visible; continue button appears at t=0 |
| Very slow device (GPU tier: low) | Disable ice crystal rotation and gradient transition; use static blue background for cold state |
| Screen reader active | Announce: "A thermometer shows temperature dropping: 5 degrees, 4 degrees, 3 degrees, 2 degrees, 1 degree, zero degrees." Pause 1s. "The temperature keeps dropping below zero: negative 1, negative 2, negative 3, negative 4, negative 5 degrees." |

---

## 4. Stage 2: Spatial Experience (2-4 min)

### Scene: Interactive Number Line Explorer

**Concept**: Students explore a horizontal number line from -10 to +10 by
dragging a point, tapping integers to see opposites, and comparing numbers.
This is the core spatial encoding activity.

**Interaction Requirement**: Minimum 10 distinct interactions (tracked by
counter) before the continue button appears. This ensures adequate motor
cortex recruitment for embodied encoding.

### Scene Definition (MathScene JSON)

```json
{
  "id": "NO-1.2-spatial-numberline",
  "renderer": "svg",
  "viewBox": [-12, -6, 24, 12],
  "background": "transparent",
  "objects": [
    {
      "id": "bg-negative",
      "type": "geometricShape",
      "shape": "rectangle",
      "center": [-5.5, 0],
      "width": 11,
      "height": 12,
      "style": {
        "fill": "url(#cold-gradient)",
        "opacity": 0.08
      }
    },
    {
      "id": "bg-positive",
      "type": "geometricShape",
      "shape": "rectangle",
      "center": [5.5, 0],
      "width": 11,
      "height": 12,
      "style": {
        "fill": "url(#warm-gradient)",
        "opacity": 0.08
      }
    },
    {
      "id": "number-line",
      "type": "numberLine",
      "range": [-10, 10],
      "step": 1,
      "markers": [
        { "value": -10, "label": "-10", "color": "#60a5fa" },
        { "value": -9, "label": "-9", "color": "#60a5fa" },
        { "value": -8, "label": "-8", "color": "#60a5fa" },
        { "value": -7, "label": "-7", "color": "#60a5fa" },
        { "value": -6, "label": "-6", "color": "#60a5fa" },
        { "value": -5, "label": "-5", "color": "#60a5fa" },
        { "value": -4, "label": "-4", "color": "#60a5fa" },
        { "value": -3, "label": "-3", "color": "#60a5fa" },
        { "value": -2, "label": "-2", "color": "#60a5fa" },
        { "value": -1, "label": "-1", "color": "#60a5fa" },
        { "value": 0, "label": "0", "color": "#fbbf24", "style": "dot" },
        { "value": 1, "label": "1", "color": "#34d399" },
        { "value": 2, "label": "2", "color": "#34d399" },
        { "value": 3, "label": "3", "color": "#34d399" },
        { "value": 4, "label": "4", "color": "#34d399" },
        { "value": 5, "label": "5", "color": "#34d399" },
        { "value": 6, "label": "6", "color": "#34d399" },
        { "value": 7, "label": "7", "color": "#34d399" },
        { "value": 8, "label": "8", "color": "#34d399" },
        { "value": 9, "label": "9", "color": "#34d399" },
        { "value": 10, "label": "10", "color": "#34d399" }
      ]
    },
    {
      "id": "zero-divider",
      "type": "line",
      "from": [0, -2],
      "to": [0, 2],
      "style": { "stroke": "#fbbf24", "strokeWidth": 3 }
    },
    {
      "id": "zero-label",
      "type": "annotation",
      "position": [0, -2.5],
      "latex": "\\text{ZERO}",
      "style": { "fill": "#fbbf24", "fontSize": 12 }
    },
    {
      "id": "neg-region-label",
      "type": "annotation",
      "position": [-5, -4],
      "latex": "\\text{Negative}",
      "style": { "fill": "#60a5fa", "fontSize": 14 }
    },
    {
      "id": "pos-region-label",
      "type": "annotation",
      "position": [5, -4],
      "latex": "\\text{Positive}",
      "style": { "fill": "#34d399", "fontSize": 14 }
    },
    {
      "id": "draggable-point",
      "type": "point",
      "position": [0, 0],
      "radius": 0.4,
      "draggable": true,
      "dragConstraint": "x",
      "snapToGrid": 1,
      "style": { "fill": "#f472b6", "stroke": "#ffffff", "strokeWidth": 2 }
    },
    {
      "id": "value-display",
      "type": "annotation",
      "position": [0, 2.5],
      "latex": "0",
      "style": { "fill": "#ffffff", "fontSize": 28 }
    },
    {
      "id": "interaction-counter",
      "type": "annotation",
      "position": [9, 5],
      "latex": "\\text{0 / 10}",
      "style": { "fill": "#ffffff60", "fontSize": 12 }
    }
  ],
  "animations": [
    {
      "id": "stage-entrance",
      "trigger": "stage-enter",
      "steps": [
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "bg-negative", "duration": 0.5 },
            { "action": "fadeIn", "target": "bg-positive", "duration": 0.5 }
          ]
        },
        { "action": "draw", "target": "number-line", "duration": 1.2, "ease": "easeInOut" },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "zero-divider", "duration": 0.3 },
            { "action": "fadeIn", "target": "zero-label", "duration": 0.3 },
            { "action": "fadeIn", "target": "neg-region-label", "duration": 0.4, "delay": 0.1, "from": "left" },
            { "action": "fadeIn", "target": "pos-region-label", "duration": 0.4, "delay": 0.1, "from": "right" }
          ]
        },
        { "action": "fadeIn", "target": "draggable-point", "duration": 0.3, "from": "scale" },
        { "action": "fadeIn", "target": "value-display", "duration": 0.3 },
        { "action": "fadeIn", "target": "interaction-counter", "duration": 0.3 }
      ]
    }
  ],
  "interactions": [
    {
      "id": "drag-point",
      "type": "drag",
      "target": "draggable-point",
      "onUpdate": [
        {
          "source": "x",
          "target": "value-display",
          "property": "latex",
          "transform": "formatInteger(value)"
        },
        {
          "source": "x",
          "target": "value-display",
          "property": "style.fill",
          "transform": "value < 0 ? '#60a5fa' : value > 0 ? '#34d399' : '#fbbf24'"
        },
        {
          "source": "x",
          "target": "draggable-point",
          "property": "style.fill",
          "transform": "value < 0 ? '#60a5fa' : value > 0 ? '#34d399' : '#fbbf24'"
        }
      ]
    }
  ]
}
```

### Interaction 1: Draggable Point

**Mechanic**: Student drags a circular point (radius 0.4 units, equivalent to
~20px on mobile -- combined with touch area padding to achieve 44px) along the
number line. The point is constrained to the x-axis and snaps to integer
positions.

**Drag Implementation Details**:

| Property | Value |
|----------|-------|
| Gesture library | `@use-gesture/react` `useDrag` hook |
| Constraint | `dragConstraint: "x"`, clamped to `[-10, 10]` |
| Snap | `snapToGrid: 1` (snaps to nearest integer on release) |
| During drag | Point follows finger/cursor exactly (no snap until release) |
| Visual snap | Spring animation to nearest integer: `spring(damping: 25, stiffness: 400)`, duration ~0.15s |
| Touch area | SVG circle has `r=0.4` but the hit area is expanded to 44px via transparent stroke or larger invisible overlay circle |
| Cursor | `grab` on hover, `grabbing` during drag |

**Live Updates During Drag**:

1. **Value Display**: A large number (28px font) floats above the point,
   updating in real-time as the point moves. During drag (before snap), it
   shows the nearest integer to the current position. The display is
   positioned 2.5 units above the number line, horizontally centered on the
   point.

   - Color changes dynamically:
     - Negative values: `#60a5fa` (blue-400)
     - Zero: `#fbbf24` (amber-400)
     - Positive values: `#34d399` (emerald-400)

2. **Point Color**: The draggable point itself changes color to match:
   - Negative: `#60a5fa`
   - Zero: `#fbbf24`
   - Positive: `#34d399`
   - Transition: `duration: 0.15s, easeInOut`

3. **Trail/Glow Effect**: As the point moves, it leaves a fading trail:
   - Implementation: Previous 5 positions rendered as circles with decreasing
     opacity (0.5, 0.4, 0.3, 0.2, 0.1) and decreasing radius (0.35, 0.3,
     0.25, 0.2, 0.15)
   - Trail circles use the color of the region they are in
   - Trail fades over 0.6s after point stops moving
   - Performance: Use a single SVG `<g>` with `opacity` transitions; do not
     create/destroy DOM elements

4. **Zero Crossing Flash**: When the point crosses zero (sign change):
   - The zero divider line flashes: scale to 1.5x width, opacity pulse to 1.0,
     then spring back to normal. Duration: 0.3s.
   - A subtle radial gradient flash emanates from the zero point: white circle
     expanding from r=0 to r=2 at opacity 0.3, then fading to 0. Duration: 0.5s.
   - The "ZERO" label briefly scales to 1.2x and back. Duration: 0.3s,
     easeOutBack.
   - This flash triggers only on sign change, not on every pass through zero
     if the sign doesn't change (e.g., dragging from 0 to 0).
   - Debounce: 0.5s minimum between zero-crossing flashes to prevent rapid
     triggering during fast dragging.

5. **3D Perspective Hint**: The number line has a subtle vertical offset:
   - Positive numbers: tick marks extend 0.1 units higher than baseline
   - Negative numbers: tick marks extend 0.1 units lower than baseline
   - Zero tick mark is exactly at baseline
   - This creates a very subtle "hill at zero, valley at extremes" visual
   - Implementation: Each tick mark's y-offset = `0.1 * (value / 10)` above
     the baseline. This is cosmetic only, not interactive.

**Interaction Count**: Each snap-to-integer position that is different from the
previous position counts as 1 interaction. Dragging from 3 to 3 (same position)
does not count. The counter in the bottom-right updates: "3 / 10".

### Interaction 2: Tap-to-Show-Opposite

**Mechanic**: Student taps any integer label on the number line. The opposite
integer is highlighted, and a dashed line connects them through zero.

**Detailed Behavior**:

1. Student taps an integer label (e.g., taps "3"):
   - The tapped label scales up to 1.3x: `spring(damping: 15, stiffness: 300)`,
     duration 0.2s
   - A colored ring appears around the tapped position: circle, r=0.5,
     stroke=2px, no fill, color matches the number's region color

2. The opposite integer highlights (e.g., "-3"):
   - After a 0.2s delay (for dramatic effect), the opposite label scales up to
     1.3x with the same spring animation
   - A matching colored ring appears at the opposite position

3. Connection line animates:
   - A dashed line (`strokeDasharray: "4 4"`) draws from the tapped integer
     to the opposite integer, passing through zero
   - Draw animation: 0.6s, easeInOut
   - Line color: `#ffffff40` (semi-transparent white)
   - At the midpoint (zero), a small diamond shape (4px) appears in amber
     (#fbbf24)

4. Labels appear:
   - Above the connection line, centered, a KaTeX annotation fades in:
     `\text{opposites}` in `#ffffff80`, fontSize 10. Duration: 0.3s.
   - Below each highlighted number, the distance from zero appears:
     e.g., `|3| = 3` and `|-3| = 3` in small text (fontSize 9). Duration: 0.3s,
     delay 0.4s after connection line completes.

5. Auto-dismiss:
   - After 3.0s, all highlights, connection line, and labels fade out
     (duration 0.5s, easeIn)
   - OR: student taps another integer, which dismisses the current highlight
     immediately (0.15s fadeOut) and starts a new one

**Edge Cases**:
- Tapping zero: Display text "Zero is its own opposite!" (i18n key:
  `lesson.integers.spatial.zeroOpposite`) in amber, no connection line, auto-
  dismiss after 2.5s. This still counts as 1 interaction.
- Tapping while a highlight is active: Dismiss current, show new. No
  overlapping highlights.
- Tapping the same number twice in a row: Dismiss without showing again.

**Interaction Count**: Each unique tap (on a different integer than the previous
tap) counts as 1 interaction.

### Interaction 3: Compare Button

**Mechanic**: A "Compare" mode that lets the student tap two numbers to see
which is greater.

**UI Element**: A toggle button in the top-left corner of the scene:
- Off state: Ghost button, "Compare" text, icon: balance scale
- On state: Filled button with `#8b5cf6` (violet-500) background, "Comparing..."
  text, icon: balance scale highlighted
- Size: 44px height, auto width, 16px horizontal padding
- Position: top-left, 8px margin from scene edges

**Detailed Behavior When Compare Mode Is Active**:

1. The instructional text appears at the top center: "Tap two numbers to
   compare" (i18n key: `lesson.integers.spatial.compareTapTwo`), fontSize 12,
   `#ffffff80`, fadeIn 0.3s.

2. Student taps first number:
   - Number gets a ring highlight (stroke only, `#8b5cf6`, r=0.5)
   - Label "1st" appears below in small text
   - Instructional text changes to "Now tap the second number"

3. Student taps second number:
   - Number gets a ring highlight (stroke only, `#ec4899`, r=0.5)
   - Label "2nd" appears below in small text

4. Comparison animation (0.8s total):
   - An animated arrow draws from the lesser number to the greater number
   - Arrow direction: always pointing RIGHT (toward the greater number)
   - Arrow color: `#34d399` (emerald, the "greater" color)
   - Arrow style: thick (strokeWidth 3), with arrowhead at the end
   - Draw animation: 0.5s, easeOut
   - Above the arrow, text appears: e.g., "-3 < 5" in KaTeX, fadeIn 0.3s
   - Below the number line, the rule text fades in: "Further right = greater"
     (i18n key: `lesson.integers.spatial.furtherRightGreater`), fontSize 11,
     `#ffffff60`

5. Special case -- equal numbers:
   - If student taps the same number twice, display: "Same number! They're
     equal." (i18n key: `lesson.integers.spatial.sameNumberEqual`)
   - No arrow, just a "=" annotation at the position

6. Auto-dismiss after 3.5s, then ready for next comparison.

**Interaction Count**: Each completed comparison (both numbers tapped) counts
as 1 interaction. Tapping only the first number does not count.

### Interaction Counter UI

- Position: bottom-right corner of the scene, 8px margin
- Format: "X / 10" where X is current count
- Style: `#ffffff60`, fontSize 12, monospace font
- When X reaches 10:
  - Counter text changes to `#34d399` (emerald)
  - Brief celebration: counter scales to 1.2x and back (spring, 0.3s)
  - A checkmark icon appears next to it
  - Continue button fades in at bottom center (same style as Hook continue)
- Progress bar: thin (2px) horizontal line below the counter, filling from
  left to right, `#34d399` fill on `#ffffff20` background. Width = 60px.

### Instructional Prompts

Brief text prompts guide the student. These appear at the top of the scene
and cycle as the student interacts:

| After N interactions | Prompt (i18n key) | Text (en) |
|---------------------|-------------------|-----------|
| 0 (on enter) | `lesson.integers.spatial.prompt0` | "Drag the point along the number line. Watch what happens at zero!" |
| 3 | `lesson.integers.spatial.prompt3` | "Try tapping a number to find its opposite." |
| 6 | `lesson.integers.spatial.prompt6` | "Hit the Compare button to see which number is greater." |
| 10 | `lesson.integers.spatial.prompt10` | "Great exploring! Ready to discover something cool?" |

Prompts fade in from top (0.3s, easeOut), persist for 4s, then fade out (0.3s).
If the student performs the suggested action before the 4s timeout, the prompt
dismisses early (0.2s fadeOut).

### Mobile Adaptation

| Viewport Width | Layout Change |
|----------------|---------------|
| >= 768px (tablet/desktop) | Horizontal number line, full -10 to +10 visible |
| 480px - 767px | Horizontal number line, but only -7 to +7 visible initially; pinch-to-zoom enabled to see full range; labels abbreviated (e.g., remove "Negative"/"Positive" region labels) |
| < 480px (small phone) | Vertical number line option: number line rotates 90deg, -10 at bottom, +10 at top; drag becomes vertical; "further UP = greater"; value display moves to the right side |

**Vertical Number Line (small phone) Details**:
- The "right = greater" rule becomes "up = greater" -- both are spatially
  intuitive
- All interaction mechanics remain identical, just rotated
- The compare arrow points UP toward the greater number
- Background gradients rotate: cold at bottom, warm at top
- The zero divider becomes horizontal

---

## 5. Stage 3: Guided Discovery (3-5 min)

### Scene: Mirror Symmetry Revelation

**Concept**: Through four guided prompts, students discover: (1) opposites,
(2) the counterintuitive ordering of negatives, (3) the building metaphor,
(4) the nature of zero. Each prompt is accompanied by a targeted animation
on the number line.

**Structure**: Linear sequence of 4 prompt cards, each requiring acknowledgment.
The number line from Stage 2 persists (state carries over -- but the draggable
point is hidden and interactions are disabled). Animations play on this
number line to illustrate each prompt.

### Prompt 1: Opposites

**Prompt Card Content**:
```
i18n key: lesson.integers.discovery.prompt1
"Notice how every positive number has a twin on the other side of zero.
3 and -3. 7 and -7.
These are called OPPOSITES."
```

**Animation**:

1. All number labels dim to `opacity: 0.3` (duration 0.3s)
2. Pair highlighting sequence (each pair takes 1.2s):
   - Pair {1, -1}:
     - Both labels brighten to `opacity: 1.0` simultaneously (0.2s)
     - Both get colored rings (positive: `#34d399`, negative: `#60a5fa`)
     - Dashed connection line draws through zero (0.4s, easeInOut)
     - Hold for 0.4s
     - Fade connection line (0.2s), labels stay bright
   - Pair {3, -3}: same sequence, after 0.1s gap
   - Pair {7, -7}: same sequence, after 0.1s gap
   - Pair {5, -5}: same sequence, after 0.1s gap
3. After all four pairs: all eight highlighted labels pulse once together
   (scale 1.0 -> 1.15 -> 1.0, spring, 0.4s)
4. All connection lines redraw simultaneously (0.5s) and hold
5. The word "OPPOSITES" in the prompt card gets a highlight animation:
   underline draws left-to-right in `#fbbf24`, duration 0.4s

**Button**: "I see it!" (i18n key: `lesson.integers.discovery.ack`)
- Style: pill button, `#34d399` background, dark text, 44px height
- On tap: spring scale 0.95 -> 1.0 (0.15s), dismiss all highlights (0.3s
  fadeOut), slide prompt card up and out (0.3s), bring in Prompt 2

### Prompt 2: Counterintuitive Ordering

**Prompt Card Content**:
```
i18n key: lesson.integers.discovery.prompt2
"Here's something weird:
-5 is LESS than -2, even though 5 is greater than 2.
Why?"
```

**Animation**:

1. Dim all labels except -5 and -2 (0.3s)
2. Highlight -5 in `#60a5fa` and -2 in `#60a5fa` (brighter shade: `#93c5fd`)
3. Show the positive comparison first (0.8s):
   - "5" and "2" briefly highlight in `#34d399`
   - Arrow from 2 to 5 pointing right, label "5 > 2" in KaTeX above
   - This fades after 1.5s
4. Then show the negative comparison (1.0s):
   - Arrow from -5 to -2 pointing RIGHT
   - Arrow color: `#f472b6` (pink, signaling the surprise)
   - Arrow draws slowly (0.6s, easeInOut)
   - Label "-5 < -2" in KaTeX above the arrow, with the "<" sign
     highlighted in `#fbbf24`
   - Below the arrow: "Further right = greater" in small text, with a
     pointing-right hand emoji (or arrow icon)
5. Both -5 and -2 get distance-from-zero arcs:
   - From -5 to 0: arc labeled "5 units" in `#60a5fa`
   - From -2 to 0: arc labeled "2 units" in `#93c5fd`
   - These draw simultaneously (0.5s) BELOW the number line
   - Visual makes it clear that -5 is FURTHER from zero but LESS than -2

**Button**: "I see it!"

### Prompt 3: Building Metaphor

**Prompt Card Content**:
```
i18n key: lesson.integers.discovery.prompt3
"Think about it like floors in a building:
Floor -5 (5 floors underground) is DEEPER than Floor -2 (2 floors underground).
Going deeper means going further from zero -- but the number gets SMALLER."
```

**Animation**:

1. The number line smoothly morphs into a vertical building cross-section
   (1.0s, easeInOut):
   - The horizontal line rotates 90 degrees
   - OR (preferred): a building illustration fades in BESIDE the number line:
     - Simple building outline: tall rectangle with floor lines
     - Ground level = 0, labeled "Ground Floor" in amber
     - Floors 1-5 above ground in emerald tones, labeled F1-F5
     - Floors -1 to -5 below ground in blue tones, labeled B1-B5
     - The ground level has a grass/ground texture line
     - Underground section has a subtle earth-tone gradient background
   - Floor indicators are aligned horizontally with the corresponding number
     line integer positions
2. A small elevator icon (simple rectangle, 0.3 units) starts at Floor 3:
   - Descends to Floor 0 (1.0s, easeInOut)
   - Continues descending to Floor -2 (0.6s, easeInOut)
   - Continues descending to Floor -5 (0.8s, easeInOut)
   - At each floor, a brief flash on the floor number label (scale 1.1x, 0.15s)
3. Text annotation appears: "Deeper = smaller number" (i18n key:
   `lesson.integers.discovery.deeperSmaller`) in `#60a5fa`, position below
   the building, fadeIn 0.4s

**Button**: "I see it!"
- On tap: building illustration fades out (0.3s), number line returns to
  horizontal (if rotated) or building simply dismisses

### Prompt 4: The Nature of Zero

**Prompt Card Content**:
```
i18n key: lesson.integers.discovery.prompt4
"Where does zero fit?
It's not positive OR negative -- it's the boundary between two worlds."
```

**Animation**:

1. All positive labels shift slightly right and turn `#34d399` (0.4s)
2. All negative labels shift slightly left and turn `#60a5fa` (0.4s)
3. The gap between the two groups widens slightly around zero (the number line
   stretches by 0.5 units on each side of zero) (0.4s, spring)
4. Zero stays in the center, and gets a special treatment:
   - Its label scales to 1.5x (0.3s, easeOutBack)
   - A pulsing glow ring appears around it: `#fbbf24` at opacity 0.3, radius
     oscillates 0.5 -> 0.8, period 1.5s
   - A dividing line extends vertically through zero with subtle gradient:
     - Left side transitions from amber to blue
     - Right side transitions from amber to emerald
   - Small text labels appear on each side:
     - Left: "Negatives: -1, -2, -3, ..." (blue, fontSize 9)
     - Right: "Positives: 1, 2, 3, ..." (emerald, fontSize 9)
     - Center: "Zero: neither positive nor negative" (amber, fontSize 9)
5. Animation holds in this state until student taps "I see it!"

**Button**: "I see it!"
- On tap: all elements spring back to normal positions (0.4s, spring),
  glow ring fades (0.3s), transition to Stage 4

### Prompt Card Design

Each prompt card is a semi-transparent bottom sheet:

| Property | Value |
|----------|-------|
| Position | Bottom of screen, overlaying the scene |
| Height | Auto (content-dependent), max 40% of viewport |
| Background | `#1e293b` at `opacity: 0.95` (slate-800) |
| Border | Top border: 1px `#334155` (slate-700) |
| Border radius | 16px top-left, 16px top-right |
| Padding | 24px horizontal, 20px top, 16px bottom |
| Text color | `#f1f5f9` (slate-100) |
| Text size | 16px body, 20px for emphasized words |
| Emphasized words | "OPPOSITES", "LESS", "DEEPER", "SMALLER" -- rendered in bold, color `#fbbf24` |
| Entrance animation | Slide up from bottom, 0.35s, spring(damping: 22, stiffness: 280) |
| Exit animation | Slide down, 0.25s, easeIn |
| Button position | Bottom-right of card, 16px margin |

### Progress Indicator

A row of 4 small dots at the top of the prompt card area indicates progress
through the discovery prompts:

| Dot State | Style |
|-----------|-------|
| Completed | `#34d399`, filled, r=4px |
| Current | `#fbbf24`, filled, r=5px (slightly larger), pulsing opacity 0.8-1.0 |
| Upcoming | `#475569` (slate-600), filled, r=4px |

---

## 6. Stage 4: Symbol Bridge (2-3 min)

### Scene: Notation Overlay

**Concept**: Formal mathematical notation is overlaid onto the number line that
students already understand spatially. Each symbol is grounded in the visual
experience from Stages 2-3.

**Structure**: Three notation reveals, each building on the number line.
Notations fade in one at a time with clear visual connections.

### Notation 1: The Set of Integers (Z)

**Timing**: Auto-play on stage enter, 0.0s - 3.5s

1. The number line from previous stages is visible (state reset to default:
   all labels visible, no highlights, no draggable point)
2. Above the number line, a bracket notation fades in:

   ```
   Z = { ..., -3, -2, -1, 0, 1, 2, 3, ... }
   ```

   - KaTeX rendering: `\\mathbb{Z} = \\{\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\}`
   - Position: centered above the number line, y = 3.5
   - FadeIn from top, 0.6s, easeOutBack
   - fontSize: 18

3. As the notation appears, each number in the set notation gets connected to
   its corresponding position on the number line via a thin vertical dashed
   line (stroke: `#ffffff20`, strokeWidth: 1):
   - Lines draw simultaneously, 0.5s, easeInOut
   - Only for -3 through 3 (the ones visible in the notation)

4. The ellipsis on each side gets a subtle pulsing animation (opacity
   0.4 -> 0.8, period 1.5s) indicating "continues forever"

5. Explanatory text fades in below the notation (delay 0.5s after notation):
   ```
   i18n key: lesson.integers.symbols.integerSet
   "The integers include all whole numbers — positive, negative, and zero."
   ```
   - Position: y = 4.5, centered
   - Style: `#ffffff80`, fontSize 12
   - FadeIn: 0.4s

### Notation 2: Absolute Value (|n|)

**Timing**: 4.0s - 8.0s (or triggered by student tapping "Next" if they read
faster)

1. The set notation dims to `opacity: 0.4` (0.3s)
2. Two numbers highlight on the number line: 3 and -3
   - Both get colored rings: 3 in `#34d399`, -3 in `#60a5fa`
   - Highlight animation: 0.3s fadeIn

3. Distance arcs draw BELOW the number line:
   - Arc from 0 to 3: labeled "3 units" in `#34d399`, draw 0.5s
   - Arc from -3 to 0: labeled "3 units" in `#60a5fa`, draw 0.5s
   - Both arcs draw simultaneously

4. Notation fades in above the number line (after arcs complete):
   ```
   |3| = 3        |-3| = 3
   ```
   - KaTeX: `|3| = 3` and `|-3| = 3`
   - Position: above their respective numbers, y = 2.5
   - FadeIn: 0.4s each, with 0.3s stagger (|3| first, then |-3|)

5. Centered definition text:
   ```
   |n| = distance from zero
   ```
   - KaTeX: `|n| = \\text{distance from zero}`
   - Position: y = 4.0, centered
   - FadeIn: 0.5s, delay 0.3s after both notations visible
   - The word "distance" is colored `#fbbf24`

6. Brief follow-up animation (0.8s):
   - The numbers switch to 5 and -5
   - Arcs redraw: both labeled "5 units"
   - Notations update: `|5| = 5` and `|-5| = 5`
   - This reinforces the pattern

### Notation 3: Opposites (Opposite of n = -n)

**Timing**: 8.5s - 12.0s

1. Previous notation dims (0.3s)
2. A single number highlights: 4 in `#34d399`
3. An arrow animates from 4, arcing OVER the number line, landing on -4:
   - Curved arrow path (quadratic bezier, control point at (0, 3.5))
   - Draw: 0.8s, easeInOut
   - Arrow color: `#f472b6` (pink)
   - At the peak of the arc, a small "flip" icon (two curved arrows) appears
     briefly (0.3s fadeIn, 0.5s hold, 0.3s fadeOut)

4. Notation appears below the arc:
   ```
   Opposite of 4 = -4
   ```
   - KaTeX: `\\text{Opposite of } 4 = -4`
   - FadeIn: 0.4s

5. Then generalizes (0.5s delay):
   ```
   Opposite of n = -n
   ```
   - KaTeX: `\\text{Opposite of } n = -n`
   - The `n` and `-n` are colored `#f472b6`
   - FadeIn: 0.4s, from "scale"

6. Reverse arrow:
   - Second arrow from -4 back to 4 (same arc, reversed)
   - Draw: 0.6s
   - Additional notation: `\\text{Opposite of } -4 = 4`
   - This shows that the operation is reversible

### Symbol Bridge Navigation

Between each notation, a "Next" button appears:
- Position: bottom-right
- Style: same as discovery "I see it!" button but text says "Next" (i18n:
  `lesson.integers.symbols.next`)
- If the student does not interact for 6s, the next notation auto-plays
  (to prevent indefinite stalls)
- A "Replay" button (top-right, ghost style) lets the student replay the
  current notation's animation

### Final State

After all three notations, all three are visible simultaneously (at reduced
opacity 0.7) for 3 seconds, then the continue button appears.

Summary view:
```
Z = { ..., -3, -2, -1, 0, 1, 2, 3, ... }

|n| = distance from zero

Opposite of n = -n
```

All three in a vertical stack above the number line, fontSize 14, `#ffffff90`.

---

## 7. Stage 5: Real-World Anchor (1-2 min)

### Scene: Four Real-World Contexts

**Concept**: Connect integers to concrete real-world scenarios, creating
multiple retrieval pathways.

**Structure**: A card carousel (horizontal swipe or button navigation) with
4 context cards. Each card has a small visual icon/illustration and a brief
text explanation.

### Card Layout

```
+--------------------------------------------------+
|  [Icon: 64x64]                                    |
|                                                    |
|  Title (18px, bold)                                |
|  Description (14px)                                |
|                                                    |
|  Example with integer (16px, colored)              |
|                                                    |
|  [    Number Line Mini    ]                        |
|  (showing the specific value)                      |
+--------------------------------------------------+
```

| Property | Value |
|----------|-------|
| Card width | 280px (mobile), 320px (tablet) |
| Card height | Auto, ~200px |
| Background | `#1e293b` (slate-800) |
| Border radius | 12px |
| Padding | 16px |
| Gap between cards | 12px |
| Scroll behavior | Snap to card center, `scroll-snap-type: x mandatory` |
| Navigation dots | 4 dots below carousel, style matches discovery progress dots |

### Card 1: Temperature

| Field | Value |
|-------|-------|
| Icon | SVG thermometer (simplified, 64x64, blue/red gradient) |
| Title | i18n: `lesson.integers.realworld.temp.title` = "Temperature" |
| Description | i18n: `lesson.integers.realworld.temp.desc` = "Below zero in winter" |
| Example | i18n: `lesson.integers.realworld.temp.example` = "Moscow in January: -15 C" |
| Mini number line | Range [-20, 10], marker at -15 (blue dot), marker at 0 (amber, labeled "freezing") |
| Entrance animation | Icon: fadeIn from scale, 0.3s. Text: fadeIn from bottom, 0.3s stagger. Number line: draw, 0.5s. |

### Card 2: Sea Level / Elevation

| Field | Value |
|-------|-------|
| Icon | SVG mountain-to-ocean cross-section (64x64, green peak, blue water) |
| Title | i18n: `lesson.integers.realworld.elevation.title` = "Elevation" |
| Description | i18n: `lesson.integers.realworld.elevation.desc` = "Below sea level" |
| Example | i18n: `lesson.integers.realworld.elevation.example` = "Death Valley: -86m, Mariana Trench: -10,994m" |
| Mini number line | Vertical orientation, range [-100, 100], markers at -86 (blue, "Death Valley"), 0 (amber, "Sea Level"), labeled. Note: Mariana Trench is mentioned in text but not on this mini line (would compress the scale too much). |
| Entrance animation | Same pattern as Card 1 |

### Card 3: Money / Debt

| Field | Value |
|-------|-------|
| Icon | SVG wallet with coins (64x64, one coin has a minus sign) |
| Title | i18n: `lesson.integers.realworld.money.title` = "Money" |
| Description | i18n: `lesson.integers.realworld.money.desc` = "Owing money means a negative balance" |
| Example | i18n: `lesson.integers.realworld.money.example` = "If you owe $20, your balance is -$20" |
| Mini number line | Range [-30, 30], markers at -20 (blue, "$-20"), 0 (amber, "$0"), step 10, dollar sign prefix on labels |
| Entrance animation | Same pattern |

### Card 4: Elevator / Building Floors

| Field | Value |
|-------|-------|
| Icon | SVG elevator with up/down arrows (64x64, grid of floor indicators) |
| Title | i18n: `lesson.integers.realworld.elevator.title` = "Elevator" |
| Description | i18n: `lesson.integers.realworld.elevator.desc` = "Parking levels below ground" |
| Example | i18n: `lesson.integers.realworld.elevator.example` = "B1 = -1, B2 = -2, B3 = -3" |
| Mini number line | Vertical orientation, range [-3, 5], markers at -3 ("B3"), -2 ("B2"), -1 ("B1"), 0 ("G", amber), 1 ("1"), 2 ("2"), 3 ("3"), 4 ("4"), 5 ("5"). Style: looks like an elevator panel with floor buttons. |
| Entrance animation | Same pattern |

### Navigation

- Swipe left/right to navigate (gesture: `@use-gesture/react` horizontal swipe,
  threshold 50px)
- Or tap left/right arrow buttons at the card edges (44px tap targets)
- The continue button appears after the student has viewed all 4 cards
  (tracked by which cards have been scrolled into view for >= 1.5s)
- If a student only views 2 cards, a gentle prompt appears after 30s:
  "Swipe to see more examples" (i18n: `lesson.integers.realworld.swipeMore`)

---

## 8. Stage 6: Practice (Adaptive)

### Overview

9 problems across three knowledge layers:
- **Recall** (layer 0): Problems 1-3 -- can the student identify and locate integers?
- **Procedure** (layer 1): Problems 4-6 -- can the student order and compare integers?
- **Understanding** (layer 2): Problems 7-9 -- can the student explain and apply integer concepts?

Each problem has a custom interactive component. Problems are presented
sequentially (not randomized for the initial lesson; randomization applies in
SRS review sessions).

### Problem Card Layout

```
+--------------------------------------------------+
|  Problem 3 of 9                    [Hint] [Skip]  |
|                                                    |
|  +----------------------------------------------+ |
|  |                                                | |
|  |            Interactive Visualization           | |
|  |                                                | |
|  +----------------------------------------------+ |
|                                                    |
|  Problem text (16px)                               |
|                                                    |
|  [ Input / Interaction Area ]                      |
|                                                    |
|                              [Check Answer]        |
+--------------------------------------------------+
```

| Property | Value |
|----------|-------|
| Card background | `#0f172a` (slate-900) |
| Border | 1px `#334155` (slate-700) |
| Border radius | 16px |
| Padding | 20px |
| Progress bar | Top of card, thin (3px), `#34d399` fill, width = (problem / 9) * 100% |
| Hint button | Ghost button, top-right, "Hint" text + lightbulb icon, 44px tap target |
| Skip button | Ghost button, right of hint, "Skip" text, 44px tap target, appears after 30s |

### Problem 1: Plot -4 on the Number Line (Recall, Layer 0)

**Type**: `drag-to-position`

**Prompt**:
```
i18n key: lesson.integers.practice.p1.prompt
"Place the point at -4 on the number line."
```

**Visualization**: Number line from -10 to +10 (same as Stage 2, but without
the value display label -- student must figure out position independently).

**Interaction**:
- A detached point (pink, `#f472b6`) starts at position 0
- Student drags it to the correct position
- Snap to integers on release
- No value label displayed during drag (unlike Stage 2 -- this tests recall)
- The number line labels ARE visible (this is recognition, not pure recall)

**Correct Answer**: Point at x = -4 (tolerance: exactly -4 after snap)

**Feedback on Correct**:
- Point turns `#34d399` (emerald)
- Checkmark icon appears above
- Brief text: "Correct!" (0.3s fadeIn)
- The -4 label on the number line pulses (scale 1.2x, spring, 0.3s)
- XP: +6 (recall correct, base)
- Auto-advance to next problem after 1.5s

**Feedback on Incorrect**:
- Point turns `#ef4444` (red) briefly (0.5s), then resets to pink
- The correct position (-4) gets a ghost indicator: a translucent emerald
  circle at -4 that pulses twice
- Text: "Not quite. -4 is here." (i18n: `lesson.integers.practice.p1.incorrect`)
- Arrow from the student's placed position to -4
- The student can try again (max 3 attempts before auto-reveal)

**Hint** (if requested):
```
i18n key: lesson.integers.practice.p1.hint
"Negative numbers are to the LEFT of zero. Count 4 spaces to the left."
```
- Hint appears as a bottom sheet, 0.3s slide up
- If hint is used: XP reduced to +3 (hint penalty)
- Hint usage logged for SRS: `hintsUsed: 1`

### Problem 2: Opposite of 7 (Recall, Layer 0)

**Type**: `number-input-with-visual`

**Prompt**:
```
i18n key: lesson.integers.practice.p2.prompt
"What is the opposite of 7?"
```

**Visualization**: Number line from -10 to +10. The number 7 is highlighted
with an emerald ring and a pulsing dot.

**Interaction**:
- A numeric input field below the number line
- Field accepts: optional minus sign + digits
- Field placeholder: "Type your answer"
- Max length: 4 characters
- Virtual keyboard: numeric with minus sign button (on mobile)
- On submit (tap "Check" or press Enter): validate

**Correct Answer**: -7

**Feedback on Correct**:
- A curved arrow animates from 7, arcing over zero, landing on -7 (same as
  Symbol Bridge Notation 3 animation)
- -7 highlights on the number line in blue
- Text: "Correct! The opposite of 7 is -7." (i18n)
- XP: +6

**Feedback on Incorrect**:
- If student answers "7": Specific feedback: "The opposite is on the OTHER
  side of zero. 7 is positive, so its opposite is negative."
- If student answers any other wrong value: "Not quite. The opposite of 7 is
  the same distance from zero, but on the other side."
- Animate the mirror arrow to show the correct answer

**Hint**:
```
"The opposite of a number is the same distance from zero, on the other side.
7 is 7 units to the RIGHT of zero, so its opposite is 7 units to the LEFT."
```

### Problem 3: Is It an Integer? (Recall, Layer 0)

**Type**: `toggle-classification`

**Prompt**:
```
i18n key: lesson.integers.practice.p3.prompt
"Which of these are integers?"
```

**Visualization**: Four cards, each showing a number with a Yes/No toggle:

| Number | Is Integer? | Why |
|--------|------------|-----|
| -3 | Yes | Negative whole number |
| 2.5 | No | Has decimal part |
| 0 | Yes | Zero is an integer |
| 1/2 | No | Fraction, not a whole number |

**Interaction**:
- Each card has a toggle switch (Yes/No)
- Default state: all toggles in neutral (neither Yes nor No selected)
- Toggle size: 44px height, 80px width
- Yes side: `#34d399`, No side: `#ef4444`
- Student must set all 4 toggles before "Check" button enables
- Cards arranged in 2x2 grid (mobile) or 1x4 row (tablet+)

**Correct Answer**: -3=Yes, 2.5=No, 0=Yes, 1/2=No

**Feedback on Correct**:
- Each correct toggle gets a checkmark
- If all correct: "Perfect! Integers are whole numbers -- positive, negative,
  and zero. No fractions or decimals." (i18n)
- XP: +6

**Feedback on Partially Correct**:
- Correct toggles: checkmark in `#34d399`
- Incorrect toggles: X mark in `#ef4444`, correct answer shown
- Specific feedback for common errors:
  - If 0 marked as No: "Zero IS an integer! It's the boundary between positive
    and negative integers."
  - If 2.5 marked as Yes: "2.5 has a decimal part, so it's NOT an integer.
    Integers are whole numbers only."

### Problem 4: Order from Least to Greatest (Procedure, Layer 1)

**Type**: `drag-to-reorder`

**Prompt**:
```
i18n key: lesson.integers.practice.p4.prompt
"Order from least to greatest: 3, -5, 0, -1, 4"
```

**Visualization**: Number line from -6 to 5 visible in background. Five
number chips floating above, each in a rounded rectangle:

| Chip | Color | Initial Position |
|------|-------|-----------------|
| 3 | `#34d399` | Random shuffle |
| -5 | `#60a5fa` | Random shuffle |
| 0 | `#fbbf24` | Random shuffle |
| -1 | `#60a5fa` | Random shuffle |
| 4 | `#34d399` | Random shuffle |

**Interaction**:
- Drag-to-reorder: student drags chips into a horizontal sequence
- Drop zones: 5 horizontal slots, each 56px wide, 8px gap
- During drag: chip scales to 1.1x, shadow appears (subtle elevation)
- On drop: spring animation to slot center (0.2s)
- When a chip is placed in a slot, its corresponding position on the number
  line below gets a dotted vertical line connecting the chip to the number
  line position
- The number line serves as a visual aid (not required for solving, but
  available)

**Correct Answer**: -5, -1, 0, 3, 4

**Feedback on Correct**:
- All chips turn `#34d399` (if not already)
- Connecting lines from each chip to its number line position all draw
  simultaneously (0.5s)
- An arrow draws left-to-right beneath the chips: "Least -> Greatest"
- XP: +8 (procedure)

**Feedback on Incorrect**:
- Incorrectly placed chips highlight in `#ef4444`
- Correctly placed chips highlight in `#34d399`
- A hint appears: "Remember: further LEFT on the number line = LESS.
  Look at the number line below."
- Student can rearrange and resubmit (max 3 attempts)

### Problem 5: Which Is Greater? (Procedure, Layer 1)

**Type**: `tap-to-select`

**Prompt**:
```
i18n key: lesson.integers.practice.p5.prompt
"Which is greater: -8 or -3?"
```

**Visualization**: Number line from -10 to 0. Both -8 and -3 highlighted with
dots and labels.

**Interaction**:
- Two large tappable cards side by side:
  - Left card: "-8" (blue text, size 32px, card 120x80px)
  - Right card: "-3" (blue text, size 32px, card 120x80px)
- Cards have hover/tap state: border changes to `#8b5cf6` (violet)
- Student taps one card to select it
- Selected card gets a thick border (3px `#8b5cf6`)

**Correct Answer**: -3

**Feedback on Correct**:
- The -3 card turns `#34d399`
- On the number line, an arrow draws from -8 to -3 pointing RIGHT
- Label above arrow: "-8 < -3" in KaTeX
- Below: "Right! -3 is further right on the number line, so it's greater."
- XP: +8

**Feedback on Incorrect** (student chose -8):
- The -8 card turns `#ef4444` briefly
- Targeted feedback: "It feels like -8 should be greater because 8 > 3,
  right? But on the number line, -3 is further RIGHT -- and further right
  always means greater."
- Arrow from -8 to -3 with label "-8 < -3"
- This directly addresses the #1 misconception

### Problem 6: Absolute Value (Procedure, Layer 1)

**Type**: `number-input-with-visual`

**Prompt**:
```
i18n key: lesson.integers.practice.p6.prompt
"What is |-6|?"
```

**Visualization**: Number line from -8 to 8. The point -6 is marked with a
blue dot.

**Interaction**:
- Numeric input field (positive integers only -- no minus sign needed)
- Placeholder: "Distance from zero"
- On submit: validate

**Correct Answer**: 6

**Feedback on Correct**:
- An arc draws from -6 to 0, labeled "6 units"
- Text: "Correct! |-6| = 6. The absolute value is the distance from zero,
  which is always positive (or zero)."
- The arc animation: draw from -6 toward 0, 0.5s, easeInOut, color `#60a5fa`
- XP: +8

**Feedback on Incorrect**:
- If student answers -6: "Almost! Absolute value measures DISTANCE, and
  distance is never negative. |-6| means 'how far is -6 from zero?' -- that's
  6 units."
- If any other answer: "|-6| asks: how far is -6 from zero? Count the spaces
  on the number line."
- Show the arc animation as a hint

### Problem 7: Explain Why -5 < -2 (Understanding, Layer 2)

**Type**: `free-text-with-visual`

**Prompt**:
```
i18n key: lesson.integers.practice.p7.prompt
"Why is -5 less than -2? Explain using the number line."
```

**Visualization**: Number line from -6 to 0, with -5 and -2 highlighted.

**Interaction**:
- Free text input area (textarea)
- Min length: 20 characters (prevents single-word answers)
- Max length: 500 characters
- Character counter in bottom-right of textarea
- Placeholder: "Explain in your own words..." (i18n)
- "Check" button enables when min length reached

**Evaluation**:
This response is evaluated by the AI explanation evaluator
(`server/services/ai/explanation-evaluator.ts`). The evaluator scores 0-5
based on:

| Score | Criteria |
|-------|---------|
| 0 | No meaningful content, off-topic |
| 1 | Mentions "less" or "smaller" but no reasoning |
| 2 | References the number line but vaguely |
| 3 | Correctly states that -5 is further left (or further from zero in the negative direction) |
| 4 | Explains the "further right = greater" rule clearly |
| 5 | Uses the rule, possibly references distance from zero or gives an analogy (building floors, temperature) |

**Key phrases the evaluator looks for** (not exhaustive, AI interprets
semantically):
- "further left" / "more to the left"
- "further right means greater"
- "further from zero" (in context of negatives being less)
- "deeper" / "lower" (building/temperature analogy)
- "number line" / "position"

**Feedback**:
- Score 0-2: "Good start! Think about where -5 and -2 are on the number
  line. Which one is further to the right?"
- Score 3: "Nice! You're on the right track. Can you also explain WHY
  being further right means greater?"
- Score 4-5: "Excellent explanation! You clearly understand how the number
  line shows us which integer is greater."
- After feedback, the number line animates the comparison (arrow from -5 to -2)
  regardless of score -- reinforcement

**XP**: 0-16 based on quality score (score * 3.2, rounded, for layer 2
understanding problems)

### Problem 8: Submarine Problem (Understanding, Layer 2)

**Type**: `interactive-scenario`

**Prompt**:
```
i18n key: lesson.integers.practice.p8.prompt
"A submarine is at -200m (200 meters below sea level).
It rises 50m. Where is it now?"
```

**Visualization**: A vertical cross-section scene:

- Water surface at y=0, labeled "Sea Level" in `#fbbf24`
- Water fills below, blue gradient (darker deeper)
- A small submarine icon at -200 position (simplified SVG, 40x20 units)
- Vertical number line on the right side, range [-250, 50], step 50
- Grid lines every 50 units, subtle (`#ffffff10`)

**Interaction**:
1. When the student reads the problem, the submarine is at -200
2. A "Rise 50m" button appears
3. On tap: the submarine animates upward from -200 to -150:
   - Duration: 1.2s, easeInOut
   - Trail of bubbles behind the submarine (3-5 small circles, random
     horizontal offsets, falling downward as submarine rises, fade out over 0.8s)
   - A movement arrow on the number line shows the +50 movement
4. The student then types the final position in a number input field
   - Accepts negative numbers

**Correct Answer**: -150

**Feedback on Correct**:
- The -150 position highlights on the vertical number line
- Text: "Correct! -200 + 50 = -150. The submarine rose 50m but it's still
  150m below sea level."
- The submarine does a small celebratory wobble (rotate -5deg to +5deg, spring, 0.4s)
- XP: +16 (understanding correct, base)

**Feedback on Incorrect**:
- Common errors:
  - -250 (subtracted instead of added): "The submarine ROSE, which means it
    went UP. Rising means adding, not subtracting."
  - 150 (dropped the negative): "Good math! But the submarine started below
    sea level (-200). Rising 50m puts it at -200 + 50 = -150. It's still
    underwater!"
  - -50 (only moved 50 from zero): "Start at where the submarine was: -200.
    Then move UP 50: -200 + 50 = -150."

### Problem 9: Money Balance (Understanding, Layer 2)

**Type**: `number-input-with-scenario`

**Prompt**:
```
i18n key: lesson.integers.practice.p9.prompt
"You have $10 and spend $15.
Represent your balance as an integer."
```

**Visualization**: A simple wallet/balance visual:

- Starting state: wallet icon with "$10" displayed, colored `#34d399`
- After spending: animated money leaving the wallet
  1. "$10" shrinks: animate from $10 to $0 (counting down, 0.8s)
  2. Continue past zero: $0 to -$5 (counting down, 0.4s)
  3. Wallet color transitions from `#34d399` -> `#fbbf24` (at 0) -> `#ef4444` (negative)
  4. A "You owe $5" annotation appears in red

Below the wallet: a horizontal number line from -10 to 15, showing the
movement from +10 to -5.

**Interaction**:
- Number input field
- Accepts negative numbers
- Placeholder: "Your balance"

**Correct Answer**: -5

**Feedback on Correct**:
- Text: "Correct! $10 - $15 = -$5. When you spend more than you have,
  your balance goes negative -- you owe money!"
- The number line highlights: arrow from +10 moving left 15 units to -5
- XP: +16

**Feedback on Incorrect**:
- If student answers 5: "Almost! But you owe money, so the balance is
  negative. You're $5 below zero: -5."
- If student answers -15: "Not quite. You started with $10 and spent $15.
  10 - 15 = -5."

### Practice Session Flow

```
Problem 1 (Recall)
    |
    v
Problem 2 (Recall)
    |
    v
Problem 3 (Recall)
    |
    v  [Progress: "3/9 -- Layer 1: Procedures"]
    |
Problem 4 (Procedure)
    |
    v
Problem 5 (Procedure)  <-- Targets misconception #1
    |
    v
Problem 6 (Procedure)
    |
    v  [Progress: "6/9 -- Layer 2: Understanding"]
    |
Problem 7 (Understanding) <-- Free text, AI-evaluated
    |
    v
Problem 8 (Understanding) <-- Interactive scenario
    |
    v
Problem 9 (Understanding) <-- Real-world application
    |
    v  [Practice Complete -- Summary]
```

### Practice Summary Screen

After all 9 problems, a summary screen appears:

```
+--------------------------------------------------+
|               Practice Complete!                   |
|                                                    |
|  [Stars: based on performance]                     |
|                                                    |
|  Correct: 7/9                                      |
|  XP Earned: +72                                    |
|                                                    |
|  Layer Breakdown:                                  |
|  Recall:        3/3  ===                           |
|  Procedure:     2/3  ==                            |
|  Understanding: 2/3  ==                            |
|                                                    |
|  [Continue to Reflection]                          |
+--------------------------------------------------+
```

- Stars: 3 stars for 9/9, 2 stars for 7-8/9, 1 star for 5-6/9, 0 stars for <5/9
- XP animation: counter rolls up from 0 to total XP earned
- Layer breakdown uses colored progress bars:
  - Recall: `#60a5fa`
  - Procedure: `#34d399`
  - Understanding: `#f472b6`

---

## 9. Stage 7: Reflection (1 min)

### Prompt

```
i18n key: lesson.integers.reflection.prompt
"Explain why -5 is less than -2, even though 5 is greater than 2."
```

This is deliberately the same as Problem 7 but rephrased slightly. Students
who struggled on Problem 7 get a second chance to articulate the concept.
Students who succeeded get retrieval practice (same concept, slightly different
context).

### UI Layout

```
+--------------------------------------------------+
|  Reflection                                        |
|                                                    |
|  "Explain why -5 is less than -2, even though      |
|   5 is greater than 2."                            |
|                                                    |
|  +----------------------------------------------+ |
|  |                                                | |
|  |  [Textarea: 4 lines visible, expandable]      | |
|  |                                                | |
|  +----------------------------------------------+ |
|  Character count: 0 / 500               [Submit]  |
|                                                    |
|  Tip: Use what you learned about the number line.  |
+--------------------------------------------------+
```

| Property | Value |
|----------|-------|
| Textarea rows | 4 (expandable to 8) |
| Min characters | 20 (Submit button disabled until met) |
| Max characters | 500 |
| Placeholder | "In your own words..." (i18n: `lesson.integers.reflection.placeholder`) |
| Tip text | "Use what you learned about the number line." (i18n: `lesson.integers.reflection.tip`) |
| Submit button | Pill, `#8b5cf6` (violet-500) background, 44px height |

### Submission Flow

1. Student types reflection and taps "Submit"
2. Submit button shows loading state (spinner, text changes to "Evaluating...")
3. API call: `lesson.submitReflection({conceptId: "NO-1.2", reflectionText: "..."})`
4. Response (typically < 2s):
   - `qualityScore`: 0-5
   - `xpEarned`: 0-80 (based on quality)
   - `feedback`: AI-generated encouragement
   - `ahaDetected`: boolean
   - `multiplier`: XP multiplier

5. Display feedback:

```
+--------------------------------------------------+
|  Great explanation!                                |
|                                                    |
|  "You clearly understand that position on the      |
|   number line determines which integer is greater.  |
|   Nicely done connecting it to the distance from    |
|   zero concept!"                                   |
|                                                    |
|  XP Earned: +64                                    |
|                                                    |
|  [View on Number Line]        [Complete Lesson]    |
+--------------------------------------------------+
```

6. If `ahaDetected: true`:
   - Trigger the `<AhaMoment>` celebration animation:
     - Particle burst from center of screen (gold particles)
     - Text: "Aha Moment!" in large gold text, easeOutBack scale 0 -> 1
     - Sound effect placeholder: chime
     - Duration: 2.0s, then fade
   - XP multiplier applied (typically 1.5x)

7. "View on Number Line" button (optional):
   - Tapping this shows the number line with the -5 vs -2 comparison animation
     (same as Stage 3 Prompt 2)
   - Serves as reinforcement

8. "Complete Lesson" button:
   - Triggers lesson completion flow
   - API call: `lesson.completeStage({conceptId: "NO-1.2", stage: 7})`
   - Transition to lesson completion screen

### Lesson Completion Screen

```
+--------------------------------------------------+
|            Lesson Complete!                        |
|                                                    |
|  NO-1.2: Integers                                  |
|                                                    |
|  [Animated number line with all integers glowing]  |
|                                                    |
|  Total XP:  +186                                   |
|  Time:      18 minutes                             |
|                                                    |
|  What's Next:                                      |
|  -> NO-1.2a: Integer Addition & Subtraction        |
|     "Now that you know integers, learn to          |
|      combine them!"                                |
|                                                    |
|  [Return to Map]          [Start Next Lesson]      |
+--------------------------------------------------+
```

- Total XP rolls up with counter animation (0 -> final, 1.5s)
- The successor topic (NO-1.2a) is shown with its hook text
- "Return to Map" goes to the Knowledge Nebula
- "Start Next Lesson" checks prerequisites and launches NO-1.2a

---

## 10. Technical Specifications

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-positive` | `#34d399` | Positive integers, correct answers, emerald-400 |
| `--color-negative` | `#60a5fa` | Negative integers, blue-400 |
| `--color-zero` | `#fbbf24` | Zero, boundary, emphasis, amber-400 |
| `--color-incorrect` | `#ef4444` | Wrong answers, red-500 |
| `--color-accent` | `#8b5cf6` | Interactive elements, violet-500 |
| `--color-highlight` | `#f472b6` | Surprise/discovery, pink-400 |
| `--color-bg-primary` | `#0f172a` | Scene background, slate-900 |
| `--color-bg-card` | `#1e293b` | Card/panel background, slate-800 |
| `--color-text-primary` | `#f1f5f9` | Primary text, slate-100 |
| `--color-text-secondary` | `#94a3b8` | Secondary text, slate-400 |
| `--color-text-muted` | `#475569` | Muted text, slate-600 |

All colors meet WCAG 2.1 AA contrast requirements against their expected
backgrounds. Positive/Negative colors are distinguishable for common forms
of color blindness (protanopia, deuteranopia) because they differ in both
hue AND luminance.

### Animation Timing Constants

| Constant | Value | Usage |
|----------|-------|-------|
| `SPRING_DEFAULT` | `{ damping: 20, stiffness: 300 }` | Standard spring for most transitions |
| `SPRING_BOUNCY` | `{ damping: 15, stiffness: 300 }` | Bouncy spring for celebrations |
| `SPRING_STIFF` | `{ damping: 25, stiffness: 400 }` | Stiff spring for snapping |
| `FADE_FAST` | `0.15s` | Quick fades (dismissals) |
| `FADE_NORMAL` | `0.3s` | Standard fades |
| `FADE_SLOW` | `0.5s` | Dramatic fades |
| `DRAW_NORMAL` | `0.5s` | Standard line/path draw |
| `DRAW_SLOW` | `1.0s` | Dramatic line draws (hook, comparisons) |
| `HOLD_BRIEF` | `1.5s` | Brief pause for reading |
| `HOLD_STANDARD` | `3.0s` | Standard auto-dismiss time |
| `HOLD_LONG` | `4.0s` | Longer reading time (prompts) |

### SVG Specifications

| Specification | Value |
|---------------|-------|
| Renderer | SVG (all scenes in this lesson) |
| Primary viewBox | `[-12, -6, 24, 12]` (number line scenes) |
| Thermometer viewBox | `[0, 0, 400, 600]` |
| Line stroke widths | Axis: 2px, tick: 1px, dashed: 1px, highlight: 3px |
| Font rendering | KaTeX for all mathematical notation; system font for UI text |
| Coordinate system | Mathematical (y increases upward) for number line scenes; SVG default (y increases downward) for thermometer |

### Gesture Configuration

| Gesture | Library | Configuration |
|---------|---------|---------------|
| Drag point | `@use-gesture/react` `useDrag` | `axis: 'x'`, `bounds: {left: -10, right: 10}`, `rubberband: 0.15` |
| Drag to reorder | `@use-gesture/react` `useDrag` | `axis: 'x'`, no bounds, `threshold: 5` |
| Card carousel swipe | `@use-gesture/react` `useDrag` | `axis: 'x'`, `swipe.velocity: 0.3`, `swipe.distance: 50` |
| Tap integer | Native `onClick` / `onPointerDown` | `pointerType` check for touch vs mouse |
| Compare mode taps | Native `onClick` | With state machine: idle -> firstSelected -> secondSelected -> showing |

### Touch Targets

All interactive elements meet the 44px minimum:

| Element | Rendered Size | Touch Area |
|---------|--------------|------------|
| Draggable point | 16px diameter (r=0.4 in viewBox) | 48px (transparent overlay circle) |
| Number line labels | ~14px text | 44x44px tap area centered on label |
| Toggle switches | 80x44px | 80x44px |
| Buttons (Continue, Check, etc.) | 48px height | Full button area |
| Compare toggle | 44px height | Full button area |
| Carousel arrows | 44x44px | 44x44px |

### State Management

This lesson uses React Context for local state (NOT Zustand, which is for
global state):

```typescript
interface IntegerLessonState {
  // Navigation
  currentStage: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  stageCompleted: Record<number, boolean>;

  // Stage 1: Hook
  hookAnimationComplete: boolean;
  hookReplayCount: number;

  // Stage 2: Spatial
  interactionCount: number;
  currentPointPosition: number;
  compareMode: boolean;
  compareFirstSelection: number | null;

  // Stage 3: Discovery
  currentPromptIndex: number; // 0-3

  // Stage 4: Symbol Bridge
  currentNotationIndex: number; // 0-2

  // Stage 5: Real World
  viewedCards: Set<number>; // 0-3

  // Stage 6: Practice
  currentProblem: number; // 0-8
  problemResults: Array<{
    problemId: string;
    correct: boolean;
    attempts: number;
    hintsUsed: number;
    responseTimeMs: number;
    answer: string;
  }>;

  // Stage 7: Reflection
  reflectionText: string;
  reflectionSubmitted: boolean;
  reflectionScore: number | null;
}
```

---

## 11. Accessibility

### Screen Reader Announcements (aria-live regions)

| Event | Announcement |
|-------|-------------|
| Stage 1 animation start | "Thermometer animation: temperature dropping from 5 degrees to below zero." |
| Stage 1 animation complete | "Animation complete. The temperature dropped below zero to negative 5 degrees. Press the Continue button to proceed." |
| Stage 2 point dragged | "Point at [value]. [Positive/Negative/Zero]." (announced on each snap) |
| Stage 2 opposite shown | "[Value] and [opposite] are opposites, each [distance] units from zero." |
| Stage 2 comparison shown | "[larger] is greater than [smaller]. Further right on the number line means greater." |
| Stage 3 prompt shown | Full prompt text read aloud |
| Stage 4 notation shown | Notation description in natural language (e.g., "The set of integers, written Z, includes all whole numbers: ..., -3, -2, -1, 0, 1, 2, 3, ...") |
| Stage 6 problem presented | Full problem text |
| Stage 6 feedback | "Correct!" or "Incorrect. [Feedback text]" |
| Stage 7 submission | "Reflection submitted. [Feedback text]. [XP] experience points earned." |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move focus between interactive elements |
| `Enter` / `Space` | Activate buttons, submit answers |
| `Arrow Left/Right` | Move draggable point by 1 unit (Stage 2) |
| `Arrow Left/Right` | Navigate carousel cards (Stage 5) |
| `Escape` | Cancel drag, dismiss highlights, exit compare mode |
| `1-9` number keys | Direct input for number fields |
| `-` key | Toggle negative sign in number inputs |

### ARIA Attributes

```html
<!-- Number line -->
<svg role="img" aria-label="Number line from negative 10 to positive 10">
  <!-- Each tick mark -->
  <g role="button" aria-label="Negative 3" tabindex="0">
    <!-- tick mark SVG elements -->
  </g>
</svg>

<!-- Draggable point -->
<circle
  role="slider"
  aria-label="Draggable point"
  aria-valuemin="-10"
  aria-valuemax="10"
  aria-valuenow="3"
  aria-valuetext="3, positive"
  tabindex="0"
/>

<!-- Compare mode toggle -->
<button
  role="switch"
  aria-checked="false"
  aria-label="Compare mode: tap two numbers to compare"
/>

<!-- Problem toggles -->
<div role="group" aria-label="Is negative 3 an integer?">
  <button role="radio" aria-checked="true" aria-label="Yes">Yes</button>
  <button role="radio" aria-checked="false" aria-label="No">No</button>
</div>
```

### Reduced Motion Support

When `prefers-reduced-motion: reduce` is detected:

| Animation | Replacement |
|-----------|-------------|
| Hook thermometer animation | Static final state with all labels visible |
| Number line draw | Instant appearance |
| Spring animations | Instant snap (no overshoot) |
| Highlight pulses | Static highlight (no animation) |
| Zero-crossing flash | Static color change only |
| Trail/glow effects | Disabled entirely |
| Ice crystal rotation | Static crystals |
| Particle bursts (Aha Moment) | Simple text display only |

---

## 12. Offline & Performance

### Offline Support (Serwist + Dexie.js)

This lesson is fully available offline once cached:

| Asset | Cache Strategy | Size Estimate |
|-------|---------------|---------------|
| `lesson.mdx` | Precache (build-time) | ~5KB |
| `animations.json` | Precache (build-time) | ~8KB |
| `problems.json` | Precache (build-time) | ~4KB |
| `meta.json` | Precache (build-time) | ~1KB |
| KaTeX fonts | Runtime cache (stale-while-revalidate) | ~100KB (shared) |
| SVG icons (thermometer, building, wallet, elevator) | Precache | ~12KB |
| Total per-lesson | -- | ~30KB unique + ~100KB shared |

**Offline behavior**:
- All stages 1-6 work fully offline
- Stage 7 (Reflection): If offline, the reflection text is stored in
  Dexie.js (`pendingReflections` table) and submitted when connectivity
  returns. The student sees: "Your reflection has been saved and will be
  evaluated when you're back online." (i18n: `lesson.offline.reflectionSaved`)
- Practice results are stored locally and synced on reconnection
- XP is calculated locally using client-side estimates and reconciled server-side

### Performance Budgets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (lesson load) | < 2.0s on 4G | Playwright + Lighthouse CI |
| FPS during drag | >= 55fps P95 | Playwright performance trace |
| FPS during hook animation | >= 55fps P95 | Playwright performance trace |
| SVG element count (max scene) | < 150 elements | Build-time static analysis |
| JS bundle (lesson chunk) | < 40KB gzipped | Build-time webpack analysis |
| Memory (peak) | < 50MB | Chrome DevTools memory snapshot |
| Time to interactive (Stage 2) | < 1.0s after stage transition | Performance mark |

### GPU Tier Adaptation

Detected via `detect-gpu` library at app initialization:

| GPU Tier | Adaptations |
|----------|-------------|
| High (tier 3) | All effects enabled |
| Medium (tier 2) | Disable trail/glow effect; reduce ice crystal count to 3; simplify gradient transitions |
| Low (tier 1) | Disable all continuous animations (crystal rotation, pulse); static backgrounds; disable zero-crossing flash |
| Fallback (tier 0) | Same as Low + disable all spring animations (use linear) |

---

## 13. i18n Keys

All user-facing strings in this lesson are externalized. Below is the complete
key map. Values shown are English (`en.json`).

```json
{
  "lesson": {
    "integers": {
      "meta": {
        "title": "Integers: The Number Line Below Zero",
        "shortTitle": "Integers",
        "description": "Discover that numbers extend below zero and learn how negative numbers work on the number line."
      },
      "hook": {
        "continue": "Continue"
      },
      "spatial": {
        "prompt0": "Drag the point along the number line. Watch what happens at zero!",
        "prompt3": "Try tapping a number to find its opposite.",
        "prompt6": "Hit the Compare button to see which number is greater.",
        "prompt10": "Great exploring! Ready to discover something cool?",
        "zeroOpposite": "Zero is its own opposite!",
        "compareTapTwo": "Tap two numbers to compare",
        "furtherRightGreater": "Further right = greater",
        "sameNumberEqual": "Same number! They're equal.",
        "compareButtonLabel": "Compare",
        "comparingLabel": "Comparing..."
      },
      "discovery": {
        "prompt1": "Notice how every positive number has a twin on the other side of zero.\n3 and -3. 7 and -7.\nThese are called OPPOSITES.",
        "prompt2": "Here's something weird:\n-5 is LESS than -2, even though 5 is greater than 2.\nWhy?",
        "prompt3": "Think about it like floors in a building:\nFloor -5 (5 floors underground) is DEEPER than Floor -2 (2 floors underground).\nGoing deeper means going further from zero — but the number gets SMALLER.",
        "prompt4": "Where does zero fit?\nIt's not positive OR negative — it's the boundary between two worlds.",
        "ack": "I see it!",
        "deeperSmaller": "Deeper = smaller number"
      },
      "symbols": {
        "next": "Next",
        "replay": "Replay",
        "integerSet": "The integers include all whole numbers — positive, negative, and zero.",
        "distanceFromZero": "distance from zero",
        "oppositeOf": "Opposite of"
      },
      "realworld": {
        "swipeMore": "Swipe to see more examples",
        "temp": {
          "title": "Temperature",
          "desc": "Below zero in winter",
          "example": "Moscow in January: −15°C"
        },
        "elevation": {
          "title": "Elevation",
          "desc": "Below sea level",
          "example": "Death Valley: −86m, Mariana Trench: −10,994m"
        },
        "money": {
          "title": "Money",
          "desc": "Owing money means a negative balance",
          "example": "If you owe $20, your balance is −$20"
        },
        "elevator": {
          "title": "Elevator",
          "desc": "Parking levels below ground",
          "example": "B1 = −1, B2 = −2, B3 = −3"
        }
      },
      "practice": {
        "hintButton": "Hint",
        "skipButton": "Skip",
        "checkButton": "Check Answer",
        "correct": "Correct!",
        "tryAgain": "Try again",
        "p1": {
          "prompt": "Place the point at −4 on the number line.",
          "hint": "Negative numbers are to the LEFT of zero. Count 4 spaces to the left.",
          "incorrect": "Not quite. −4 is here."
        },
        "p2": {
          "prompt": "What is the opposite of 7?",
          "hint": "The opposite of a number is the same distance from zero, on the other side. 7 is 7 units to the RIGHT of zero, so its opposite is 7 units to the LEFT.",
          "incorrect_same": "The opposite is on the OTHER side of zero. 7 is positive, so its opposite is negative.",
          "incorrect_other": "Not quite. The opposite of 7 is the same distance from zero, but on the other side."
        },
        "p3": {
          "prompt": "Which of these are integers?",
          "correct_all": "Perfect! Integers are whole numbers — positive, negative, and zero. No fractions or decimals.",
          "incorrect_zero": "Zero IS an integer! It's the boundary between positive and negative integers.",
          "incorrect_decimal": "2.5 has a decimal part, so it's NOT an integer. Integers are whole numbers only."
        },
        "p4": {
          "prompt": "Order from least to greatest: 3, −5, 0, −1, 4",
          "hint": "Remember: further LEFT on the number line = LESS. Look at the number line below.",
          "correct": "Perfect ordering!"
        },
        "p5": {
          "prompt": "Which is greater: −8 or −3?",
          "correct": "Right! −3 is further right on the number line, so it's greater.",
          "incorrect": "It feels like −8 should be greater because 8 > 3, right? But on the number line, −3 is further RIGHT — and further right always means greater."
        },
        "p6": {
          "prompt": "What is |−6|?",
          "hint": "Absolute value measures distance from zero. How many units is −6 from 0?",
          "correct": "Correct! |−6| = 6. The absolute value is the distance from zero, which is always positive (or zero).",
          "incorrect_negative": "Almost! Absolute value measures DISTANCE, and distance is never negative. |−6| means 'how far is −6 from zero?' — that's 6 units.",
          "incorrect_other": "|−6| asks: how far is −6 from zero? Count the spaces on the number line."
        },
        "p7": {
          "prompt": "Why is −5 less than −2? Explain using the number line.",
          "placeholder": "Explain in your own words...",
          "feedback_low": "Good start! Think about where −5 and −2 are on the number line. Which one is further to the right?",
          "feedback_mid": "Nice! You're on the right track. Can you also explain WHY being further right means greater?",
          "feedback_high": "Excellent explanation! You clearly understand how the number line shows us which integer is greater."
        },
        "p8": {
          "prompt": "A submarine is at −200m (200 meters below sea level). It rises 50m. Where is it now?",
          "riseButton": "Rise 50m",
          "correct": "Correct! −200 + 50 = −150. The submarine rose 50m but it's still 150m below sea level.",
          "incorrect_subtracted": "The submarine ROSE, which means it went UP. Rising means adding, not subtracting.",
          "incorrect_no_negative": "Good math! But the submarine started below sea level (−200). Rising 50m puts it at −200 + 50 = −150. It's still underwater!",
          "incorrect_from_zero": "Start at where the submarine was: −200. Then move UP 50: −200 + 50 = −150."
        },
        "p9": {
          "prompt": "You have $10 and spend $15. Represent your balance as an integer.",
          "placeholder": "Your balance",
          "correct": "Correct! $10 − $15 = −$5. When you spend more than you have, your balance goes negative — you owe money!",
          "incorrect_positive": "Almost! But you owe money, so the balance is negative. You're $5 below zero: −5.",
          "incorrect_other": "Not quite. You started with $10 and spent $15. 10 − 15 = −5."
        },
        "summary": {
          "title": "Practice Complete!",
          "correct_label": "Correct",
          "xp_label": "XP Earned",
          "layer_recall": "Recall",
          "layer_procedure": "Procedure",
          "layer_understanding": "Understanding",
          "continue": "Continue to Reflection"
        }
      },
      "reflection": {
        "title": "Reflection",
        "prompt": "Explain why −5 is less than −2, even though 5 is greater than 2.",
        "placeholder": "In your own words...",
        "tip": "Use what you learned about the number line.",
        "submit": "Submit",
        "submitting": "Evaluating...",
        "viewOnNumberLine": "View on Number Line",
        "completeLesson": "Complete Lesson"
      },
      "completion": {
        "title": "Lesson Complete!",
        "totalXp": "Total XP",
        "time": "Time",
        "whatsNext": "What's Next:",
        "nextLesson": "Integer Addition & Subtraction",
        "nextHook": "Now that you know integers, learn to combine them!",
        "returnToMap": "Return to Map",
        "startNext": "Start Next Lesson"
      }
    }
  }
}
```

---

## 14. Content Files Manifest

The following files must be created in `src/content/domains/numbers-operations/NO-1.2/`:

| File | Purpose | Size Estimate |
|------|---------|---------------|
| `meta.json` | Topic metadata: ID, name, prerequisites, successors, grade, hook text | ~500B |
| `lesson.mdx` | Stage content text, prompt cards, instructions (references animation IDs) | ~5KB |
| `animations.json` | All MathScene definitions for all 7 stages (the JSON structures in this document) | ~8KB |
| `problems.json` | Problem bank (9 problems with all metadata, answers, feedback, hints) | ~4KB |

### meta.json Structure

```json
{
  "id": "NO-1.2",
  "name": "Integers",
  "domain": "numbers-operations",
  "gradeLevel": 6,
  "description": "Discover that numbers extend below zero. The integer number line is the foundation for all work with signed numbers.",
  "contentPath": "numbers-operations/NO-1.2",
  "prerequisites": ["NO-1.1"],
  "successors": ["NO-1.2a", "AL-3.1"],
  "estimatedMinutes": 25,
  "hook": "Mariana Trench (−10,994m) vs Everest (+8,849m) — 'stack them, which wins?'",
  "visualRepresentations": [
    "horizontal-number-line",
    "vertical-number-line",
    "thermometer",
    "elevation-cross-section",
    "building-floors"
  ],
  "tags": ["integers", "negative-numbers", "number-line", "opposites", "absolute-value"]
}
```

### problems.json Structure

```json
{
  "conceptId": "NO-1.2",
  "problems": [
    {
      "id": "NO-1.2-p1",
      "layer": 0,
      "difficultyB": -1.5,
      "discriminationA": 1.0,
      "templateType": "drag-to-position",
      "content": {
        "prompt": "lesson.integers.practice.p1.prompt",
        "targetValue": -4,
        "numberLineRange": [-10, 10],
        "tolerance": 0,
        "maxAttempts": 3,
        "hint": "lesson.integers.practice.p1.hint",
        "feedback": {
          "correct": "lesson.integers.practice.correct",
          "incorrect": "lesson.integers.practice.p1.incorrect"
        }
      },
      "isTransfer": false
    }
  ]
}
```

(Full problems.json would contain all 9 problems in this format.)

---

## 15. XP & Gamification Integration

### XP Breakdown for This Lesson

| Source | XP Range | Condition |
|--------|----------|-----------|
| Lesson started | 10 | Automatic on Stage 1 entry |
| Hook completed | 10 | Stage 1 continue tapped |
| Spatial exploration | 20-40 | Base 20 + 2 per interaction beyond minimum 10 (max 30 extra = 40 total; capped at 20 extra interactions) |
| Discovery completed | 20 | All 4 prompts acknowledged |
| Symbol Bridge completed | 10 | All 3 notations viewed |
| Real-World Anchor viewed | 10 | All 4 cards viewed |
| Practice - Recall (x3) | 0-18 | 6 per correct answer |
| Practice - Procedure (x3) | 0-24 | 8 per correct answer |
| Practice - Understanding (x3) | 0-48 | 16 per correct answer |
| Reflection | 0-80 | Based on quality score (0-5) * 16 |
| **Total possible** | **10 + 10 + 40 + 20 + 10 + 10 + 18 + 24 + 48 + 80 = 270** | |
| **Expected typical** | **~180** | |

### XP Multipliers That May Apply

| Multiplier | Value | Trigger |
|------------|-------|---------|
| Streak bonus | 1.1x-1.5x | Active Neural Pulse streak (length-dependent) |
| Connection Maker | 1.2x | Reflection references prior concept (NO-1.1) |
| First-time bonus | 1.25x | First lesson completion ever |
| Aha Moment | 1.5x (on reflection XP only) | AI detects genuine insight in reflection |

### Gamification Events

| Event | When | System |
|-------|------|--------|
| `lesson.started` | Stage 1 entry | XpEvent logged |
| `lesson.stage.completed` | Each stage transition | Progress updated |
| `lesson.completed` | Stage 7 submitted | XpEvent, Achievement check, Streak check |
| `practice.problem.correct` | Each correct answer | XpEvent logged |
| `reflection.submitted` | Stage 7 submit | XpEvent, Aha detection |

### Potential Achievement Triggers

| Achievement | Criteria | Rarity |
|-------------|----------|--------|
| "Below Zero Explorer" | Complete NO-1.2 | Common |
| "Mirror Master" | Use tap-to-show-opposite for all 10 positive integers | Uncommon |
| "Perfect Integer Practice" | 9/9 correct on first attempt | Rare |
| "Deep Diver" | Reference Mariana Trench or temperature in reflection | Uncommon (hidden) |

---

## 16. AI Tutor Integration

### When the AI Tutor Is Available

The AI tutor (bottom sheet panel) is available during:
- Stage 2 (Spatial Experience) -- if the student seems stuck (no interaction for 30s)
- Stage 6 (Practice) -- after 2 incorrect attempts on any problem
- Stage 7 (Reflection) -- always available as "Need help?" button

### AI Tutor Contextual Prompts

The tutor receives the following context for this lesson:

```typescript
{
  conceptId: "NO-1.2",
  conceptName: "Integers",
  currentStage: number,
  stageDescription: string,
  studentState: {
    interactionCount: number,
    problemResults: ProblemResult[],
    commonErrors: string[],
  },
  guidelines: {
    mode: "socratic",
    neverRevealAnswer: true,
    useNumberLineMetaphor: true,
    addressMisconceptions: [
      "negative-greater-confusion",
      "zero-not-number",
      "negative-not-real"
    ],
    allowedSceneCommands: [
      "highlight-number-line-point",
      "draw-comparison-arrow",
      "show-opposite-connection",
      "animate-distance-from-zero"
    ]
  }
}
```

### Example AI Tutor Interactions

**Scenario**: Student gets Problem 5 wrong (chose -8 as greater than -3):

```
Student: [selects -8]
System: [marks incorrect, shows feedback]
Tutor (auto-triggers after 2nd incorrect): "Hey! This one is tricky. Let me
  ask you something: on the number line, which direction means 'greater'?"
  [Scene command: highlight the right-pointing arrow on the number line]
Student: "Right?"
Tutor: "Exactly! Now look at -8 and -3. Which one is further to the right?"
  [Scene command: highlight -8 and -3 with dots]
Student: "-3"
Tutor: "So which one is greater?"
Student: "-3!"
Tutor: "You got it! The confusing part is that 8 is bigger than 3 as a
  positive number, but when they're negative, the one closer to zero is
  actually greater. Does that make sense?"
```

### Scene Commands the AI Tutor May Issue

```typescript
// Highlight a specific integer on the number line
{ action: "create", object: {
    type: "point", id: "tutor-highlight",
    position: [-3, 0], radius: 0.5,
    style: { fill: "transparent", stroke: "#8b5cf6", strokeWidth: 3 }
  }
}

// Draw a comparison arrow
{ action: "create", object: {
    type: "vector", id: "tutor-arrow",
    from: [-8, 0.5], to: [-3, 0.5],
    color: "#34d399", label: "-8 < -3"
  }
}

// Show distance from zero
{ action: "animate", sequence: {
    trigger: "auto",
    steps: [
      { action: "draw", target: "tutor-arc", duration: 0.5 }
    ]
  }
}
```

---

## 17. Testing Requirements

### Unit Tests (Vitest) -- `tests/unit/math/integers.test.ts`

```typescript
// DR-2: Test every math computation
describe("Integer Lesson Math", () => {
  test("opposite of positive integer is negative", () => {
    expect(opposite(7)).toBe(-7);
    expect(opposite(1)).toBe(-1);
    expect(opposite(0)).toBe(0); // Edge case: opposite of 0 is 0
  });

  test("opposite of negative integer is positive", () => {
    expect(opposite(-3)).toBe(3);
    expect(opposite(-10)).toBe(10);
  });

  test("absolute value is always non-negative", () => {
    expect(absoluteValue(-6)).toBe(6);
    expect(absoluteValue(6)).toBe(6);
    expect(absoluteValue(0)).toBe(0);
  });

  test("integer comparison uses position on number line", () => {
    expect(compareIntegers(-5, -2)).toBe(-1); // -5 < -2
    expect(compareIntegers(-2, -5)).toBe(1);  // -2 > -5
    expect(compareIntegers(-3, -3)).toBe(0);  // equal
    expect(compareIntegers(-1, 1)).toBe(-1);  // -1 < 1
    expect(compareIntegers(0, -1)).toBe(1);   // 0 > -1
  });

  test("integer ordering from least to greatest", () => {
    expect(orderIntegers([3, -5, 0, -1, 4])).toEqual([-5, -1, 0, 3, 4]);
    expect(orderIntegers([-10, -1, -5])).toEqual([-10, -5, -1]);
  });

  test("snap to nearest integer", () => {
    expect(snapToInteger(2.3)).toBe(2);
    expect(snapToInteger(2.7)).toBe(3);
    expect(snapToInteger(-2.5)).toBe(-3); // or -2, specify rounding rule
    expect(snapToInteger(0.1)).toBe(0);
    expect(snapToInteger(-0.1)).toBe(0);
  });

  test("submarine problem: -200 + 50 = -150", () => {
    expect(-200 + 50).toBe(-150);
  });

  test("money problem: 10 - 15 = -5", () => {
    expect(10 - 15).toBe(-5);
  });
});
```

### Integration Tests -- `tests/integration/lesson-flow/integers.test.ts`

```typescript
describe("Integer Lesson Flow", () => {
  test("stage progression follows NLS order (1-7)", async () => {
    // Verify stages cannot be accessed out of order
    // Verify each stage completion unlocks the next
  });

  test("interaction counter requires minimum 10 before continue", async () => {
    // Verify continue button does not appear before 10 interactions
    // Verify each interaction type increments counter correctly
  });

  test("practice problems submit correctly via tRPC", async () => {
    // Submit answer to practice.submitAnswer
    // Verify XP calculation
    // Verify ReviewLog created with correct layer
  });

  test("reflection submission triggers AI evaluation", async () => {
    // Submit reflection via lesson.submitReflection
    // Verify qualityScore returned
    // Verify XP calculation based on score
  });

  test("lesson completion updates StudentConceptState", async () => {
    // Verify all 3 layers (recall, procedure, understanding) are initialized
    // Verify status changes from 0 (learning) based on practice results
  });

  test("offline mode stores reflection for later sync", async () => {
    // Simulate offline condition
    // Submit reflection
    // Verify stored in Dexie pendingReflections table
  });
});
```

### E2E Tests (Playwright) -- `tests/e2e/integers-lesson.spec.ts`

```typescript
describe("NO-1.2 Integers Lesson E2E", () => {
  test("complete full lesson flow from hook to reflection", async ({ page }) => {
    // Navigate to lesson
    // Wait for hook animation
    // Tap continue
    // Perform 10+ interactions on number line
    // Progress through discovery prompts
    // View symbol bridge notations
    // Swipe through real-world cards
    // Complete all 9 practice problems
    // Submit reflection
    // Verify completion screen
  });

  test("number line drag snaps to integers", async ({ page }) => {
    // Navigate to Stage 2
    // Drag point to non-integer position
    // Verify it snaps on release
    // Verify value display shows correct integer
  });

  test("compare mode shows correct comparison", async ({ page }) => {
    // Navigate to Stage 2
    // Tap Compare button
    // Tap -5 then -2
    // Verify arrow points from -5 to -2 (right)
    // Verify label shows "-5 < -2"
  });

  test("practice problem 5 handles misconception feedback", async ({ page }) => {
    // Navigate to Stage 6, Problem 5
    // Select -8 (incorrect)
    // Verify specific misconception feedback appears
    // Verify correct answer shown with explanation
  });

  test("lesson works on mobile viewport", async ({ page }) => {
    // Set viewport to 375x667 (iPhone SE)
    // Complete all stages
    // Verify touch targets are >= 44px
    // Verify no horizontal overflow
  });

  test("reduced motion preference is respected", async ({ page }) => {
    // Enable prefers-reduced-motion
    // Load lesson
    // Verify hook shows static state immediately
    // Verify no spring animations
  });
});
```

### Visual Regression Tests (Storybook + Chromatic)

Each interactive scene should have Storybook stories for visual regression:

| Story | States to Capture |
|-------|------------------|
| `HookThermometer` | Initial, mid-countdown (at 2C), at zero, below zero (at -3C), final state |
| `NumberLineExplorer` | Empty, point at -5, point at 0, point at 7, opposite-highlight (3/-3), compare mode active |
| `DiscoveryPrompts` | Each of 4 prompts with associated animation state |
| `SymbolBridge` | Each of 3 notations |
| `RealWorldCards` | Each of 4 cards |
| `PracticeProblem1` | Empty, point placed correctly, point placed incorrectly |
| `PracticeProblem4` | Chips unordered, chips ordered correctly, chips ordered incorrectly |
| `PracticeProblem8` | Submarine at -200, submarine at -150 (after rise) |

### Performance Tests

```typescript
describe("Integer Lesson Performance", () => {
  test("hook animation maintains >= 55fps P95", async ({ page }) => {
    // Start performance trace
    // Play hook animation
    // Analyze frame times
    // Assert P95 >= 55fps
  });

  test("number line drag maintains >= 55fps P95", async ({ page }) => {
    // Start performance trace
    // Drag point rapidly across full range
    // Analyze frame times
    // Assert P95 >= 55fps
  });

  test("lesson chunk size < 40KB gzipped", async () => {
    // Build production bundle
    // Measure NO-1.2 chunk size
    // Assert < 40KB gzipped
  });

  test("SVG element count < 150 in all scenes", async ({ page }) => {
    // For each stage, count SVG children
    // Assert < 150
  });
});
```

---

## Appendix A: Stage Transition Animations

| From | To | Transition |
|------|----|-----------|
| Hook -> Spatial | Cross-fade: Hook scene fades out (0.4s), Spatial scene fades in (0.4s, 0.2s delay). Total: 0.6s. |
| Spatial -> Discovery | Number line persists; draggable point fades out (0.2s); discovery prompt card slides up from bottom (0.35s, spring). |
| Discovery -> Symbol Bridge | Prompt card slides down (0.25s); number line resets highlights (0.3s); symbol notation begins auto-play. |
| Symbol Bridge -> Real World | All notations fade out (0.4s); carousel slides in from right (0.4s, spring). |
| Real World -> Practice | Carousel slides out left (0.3s); practice card slides in from bottom (0.35s, spring). |
| Practice -> Reflection | Practice summary fades out (0.3s); reflection card slides in from right (0.35s, spring). |
| Reflection -> Completion | Reflection card fades out (0.3s); completion screen fades in from center/scale (0.5s, easeOutBack). |

---

## Appendix B: SRS Integration Notes

After lesson completion, the following `StudentConceptState` records are
created or updated for concept `NO-1.2`:

| Layer | Initial Stability | Initial Difficulty | Status | Derived From |
|-------|-------------------|-------------------|--------|-------------|
| 0 (Recall) | FSRS default (1.0) | Adjusted based on P1-P3 results | 0 (learning) | Problems 1-3 accuracy |
| 1 (Procedure) | FSRS default (1.0) | Adjusted based on P4-P6 results | 0 (learning) | Problems 4-6 accuracy |
| 2 (Understanding) | FSRS default (1.0) | Adjusted based on P7-P9 + reflection | 0 (learning) | Problems 7-9 + reflection score |

The first review for this concept will be scheduled based on FSRS's initial
interval calculation (typically 1-3 days for "learning" status).

---

## Appendix C: Related Components

| Component Path | Usage in This Lesson |
|----------------|---------------------|
| `src/components/math-scene/svg/NumberLine.tsx` | Primary visualization for Stages 2-6 |
| `src/components/math-scene/svg/DraggablePoint.tsx` | Stage 2 draggable point |
| `src/components/math-scene/svg/Annotation.tsx` | KaTeX labels throughout |
| `src/components/math-scene/animation/Sequencer.tsx` | All animation sequences |
| `src/components/lesson/stages/Hook.tsx` | Stage 1 wrapper |
| `src/components/lesson/stages/SpatialExperience.tsx` | Stage 2 wrapper |
| `src/components/lesson/stages/GuidedDiscovery.tsx` | Stage 3 wrapper |
| `src/components/lesson/stages/SymbolBridge.tsx` | Stage 4 wrapper |
| `src/components/lesson/stages/RealWorldAnchor.tsx` | Stage 5 wrapper |
| `src/components/lesson/stages/Practice.tsx` | Stage 6 wrapper |
| `src/components/lesson/stages/Reflection.tsx` | Stage 7 wrapper |
| `src/components/lesson/LessonPlayer.tsx` | Stage orchestration |
| `src/components/lesson/ProblemCard.tsx` | Practice problem rendering |
| `src/components/gamification/AhaMoment.tsx` | Celebration animation |
| `src/components/ai-tutor/TutorPanel.tsx` | AI tutor bottom sheet |
| `src/components/ai-tutor/SceneCommander.tsx` | AI tutor scene manipulation |
