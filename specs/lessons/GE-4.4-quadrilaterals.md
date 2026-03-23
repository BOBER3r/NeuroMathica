# Lesson Design — GE-4.4 Quadrilaterals

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `GE-4.4` |
| **Name** | Quadrilaterals |
| **Grade** | 6 |
| **Domain** | geometry |
| **Prerequisites** | GE-4.1 (Angles) |
| **Successors** | GE-4.5 (Area & Perimeter) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/QuadrilateralsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> All quadrilaterals have angles summing to 360°, and special quadrilaterals (squares, rectangles, parallelograms, trapezoids, rhombi) form a hierarchy based on their properties.

### 1.2 Learning Objectives
- Students can identify and name the five main quadrilateral types
- Students understand the property hierarchy (every square is a rectangle, every rectangle is a parallelogram)
- Students can apply the 360° angle sum to find missing angles
- Students can list key properties of each type (parallel sides, equal sides, right angles)
- Students can explain why quadrilateral angles sum to 360°

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "A square is not a rectangle" | Different everyday names imply different categories | Venn diagram shows containment hierarchy |
| "Trapezoids have no parallel sides" | Confusing with general quadrilaterals | Animation highlights the one pair of parallel sides |
| "Angle sum depends on the shape type" | Haven't generalized from triangles | Split any quadrilateral into two triangles: 2 × 180° = 360° |
| "Rhombus has right angles" | Confusing with square | Morph animation: rhombus slides into square by making angles 90° |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | "Four sides, five names — a family tree" |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Interactive quadrilateral with property checking |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers hierarchy and 360° rule |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps visual properties to formal definitions |
| Real World | Hippocampus | Episodic memory | Relevance | Windows, screens, tiles, kites |
| Practice | Basal ganglia | Procedural encoding | Mastery | Identification and angle problems |
| Reflection | Prefrontal | Metacognition | Pride | Explains hierarchy |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: A generic quadrilateral (irregular 4-gon) appears.
t=0.5s: It morphs into a trapezoid — one pair of sides become parallel (glow).
t=1.5s: Morphs into parallelogram — both pairs parallel.
t=2.5s: Morphs into rectangle — angles snap to 90°.
t=3.5s: Morphs into square — all sides equalize.
t=4.5s: Morphs into rhombus — sides stay equal, angles tilt away from 90°.
t=5.5s: Text: "One family. Five special members."
t=6.5s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Shape outline: transitions through colors for each type
- Parallel side markers: amber `#f59e0b`
- Right angle markers: cyan `#22d3ee`

**Continue Trigger**: Appears after 6.5 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Tap through quadrilateral types and see their properties highlighted.

**Scene Layout**:
```
+---------------------------------------------+
|  Shape name: "Parallelogram"                 |
+---------------------------------------------+
|  SVG shape with highlighted properties:      |
|  - Parallel side arrows                      |
|  - Equal side tick marks                     |
|  - Angle measures                            |
|  - Right angle squares (if applicable)       |
+---------------------------------------------+
|  Properties checklist (auto-updates):        |
|  [x] Opposite sides parallel                 |
|  [x] Opposite sides equal                    |
|  [ ] All angles 90°                          |
|  [ ] All sides equal                         |
+---------------------------------------------+
|  [Prev Shape] [Next Shape]                   |
|  [Continue] (after viewing all 5 shapes)     |
+---------------------------------------------+
```

**Shapes** (5 presets):
1. Trapezoid: one pair parallel, no other special properties
2. Parallelogram: opposite sides parallel & equal, opposite angles equal
3. Rectangle: parallelogram + all right angles
4. Rhombus: parallelogram + all sides equal
5. Square: rectangle + rhombus (all properties)

**Continue Trigger**: `viewedCount >= 5 && interactions >= 6`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (5 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Draw a diagonal in any quadrilateral — you get TWO triangles. Each has 180°. So the quad has..." | Diagonal line splits quad, angles labeled | 360° sum | "I see it!" |
| 2 | "2 × 180° = 360°! Every quadrilateral, no matter how weird, has angles summing to 360°." | Sum equation animates | Generalized rule | "I see it!" |
| 3 | "A square is a special rectangle (all sides equal). A rectangle is a special parallelogram (all 90° angles)." | Venn diagram builds up | Hierarchy | "I see it!" |
| 4 | "The rhombus is a parallelogram with all sides equal. Make the angles 90° and it becomes a square!" | Rhombus morphs to square | Rhombus-square relationship | "Got it!" |
| 5 | "The trapezoid stands alone — only ONE pair of parallel sides. It's the independent cousin!" | Trapezoid highlighted separately | Trapezoid distinction | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `∠A + ∠B + ∠C + ∠D = 360°` | Four angle arcs sum | multi-color |
| 2 | Properties table for each type | Grid with checkmarks | purple |
| 3 | Hierarchy: Trap → Parallel → Rect/Rhombus → Square | Tree diagram | amber |
| 4 | `∠D = 360° − ∠A − ∠B − ∠C` | Missing angle formula | cyan |

**Final Summary**: "Angles sum to 360°. Special quads form a hierarchy based on parallel sides, equal sides, and right angles."

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Windows | Window | "Most windows are rectangles — four right angles" | Rectangle properties |
| Tiles | Tile | "Floor tiles: squares tessellate perfectly" | Square angle = 90°, 4×90° = 360° |
| Kites | Kite | "A kite is a special quadrilateral with two pairs of adjacent equal sides" | Kite properties |
| Baseball | Diamond | "A baseball diamond is actually a square rotated 45°" | Square = rhombus with 90° angles |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "Which quadrilateral has exactly ONE pair of parallel sides?" | 4 options | "Trapezoid" | "Trapezoid has exactly one pair of parallel sides." |
| 2 | Recall | multiple-choice | "Every square is also a..." | 4 options | "Rectangle, rhombus, and parallelogram" | "A square has ALL the special properties — it belongs to every category." |
| 3 | Recall | true-false | "A rectangle is always a square." | True/False | False | "False! A rectangle needs all sides equal to be a square. Not all rectangles have that." |
| 4 | Procedure | numeric-input | "A quadrilateral has angles 90°, 110°, and 80°. The fourth angle = ?" | Single number | 80 | "360° − 90° − 110° − 80° = 80°." |
| 5 | Procedure | multiple-choice | "A parallelogram has one angle of 70°. What are the other three angles?" | 4 options | "110°, 70°, 110°" | "Opposite angles are equal. Adjacent angles are supplementary (sum to 180°)." |
| 6 | Procedure | multiple-choice | "Which shape has all sides equal but NOT necessarily right angles?" | 4 options | "Rhombus" | "A rhombus has four equal sides. It only becomes a square when angles are 90°." |
| 7 | Understanding | multiple-choice | "Why do quadrilateral angles sum to 360°?" | 4 options | "A diagonal splits it into two triangles (2 × 180°)" | "Any quadrilateral can be split into two triangles. 2 × 180° = 360°." |
| 8 | Understanding | multiple-choice | "Is every rhombus a rectangle?" | 4 options | "No — only when all angles are 90°" | "A rhombus has equal sides but angles can be non-right. Only a square is both." |
| 9 | Understanding | multiple-choice | "What property does a parallelogram have that a trapezoid does NOT?" | 4 options | "TWO pairs of parallel sides" | "Parallelogram: both pairs parallel. Trapezoid: only one pair." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Explain why every square is a rectangle but not every rectangle is a square. What extra property does a square have?"

**Rules**:
- Minimum 20 characters
- NOT graded
- Skip button available
- After submission: encouraging feedback + XP

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| parallel | #f59e0b | Parallel side markers |
| rightAngle | #22d3ee | Right angle indicators |
| equalSides | #a78bfa | Equal side tick marks |
| shape | #60a5fa | Shape outlines |
| bgPrimary | #0f172a | Main background |
| bgSurface | #1e293b | Cards |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring", damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring", damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" };
```

---

## 5. Technical Implementation

### 5.1 Component Structure
```typescript
"use client";
// Single file: src/components/lessons/QuadrilateralsLesson.tsx
// Named export: export function QuadrilateralsLesson({ onComplete }: Props)
```

### 5.2 Dependencies
- react (useState, useEffect, useCallback, useMemo, useRef)
- framer-motion (motion, AnimatePresence)

### 5.3 Rules
- TypeScript strict, no `any`
- `useRef()` with argument
- All touch targets 44px+
- No setTimeout auto-advance in practice
- Feedback stays until Next tap
- SVG polygon vertex positions calculated for each shape type
