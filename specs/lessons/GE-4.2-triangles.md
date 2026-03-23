# Lesson Design — GE-4.2 Triangles

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `GE-4.2` |
| **Name** | Triangles |
| **Grade** | 7 |
| **Domain** | geometry |
| **Prerequisites** | GE-4.1a (Angle Relationships) |
| **Successors** | GE-4.3 (Triangle Congruence) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/TrianglesLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Every triangle's angles sum to exactly 180°, and triangles are classified by their sides (scalene/isosceles/equilateral) and angles (acute/right/obtuse).

### 1.2 Learning Objectives
- Students can classify triangles by side lengths: scalene, isosceles, equilateral
- Students can classify triangles by angles: acute, right, obtuse
- Students understand and can apply the triangle angle sum property (180°)
- Students can find a missing angle given two angles of a triangle
- Students can explain why three angles always sum to 180°

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Equilateral = right triangle" | Confusing side and angle classifications | Side-by-side comparison with dual classification |
| "Angle sum depends on triangle size" | Confusing area with angles | Animation scales triangle while angles stay same |
| "Obtuse triangles have all obtuse angles" | Overgeneralizing the name | Visual shows obtuse triangle with exactly ONE obtuse angle |
| "Isosceles has ALL sides equal" | Confusing isosceles with equilateral | Color-coded sides: two same, one different |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | "Tearing corners to make a straight line" |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Interactive triangle with adjustable vertices |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers 180° rule and classification |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps visual properties to formal names |
| Real World | Hippocampus | Episodic memory | Relevance | Architecture, bridges, pizza slices |
| Practice | Basal ganglia | Procedural encoding | Mastery | Classification and angle-finding |
| Reflection | Prefrontal | Metacognition | Pride | Explains why 180° always works |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: A colorful triangle appears. Each angle corner has a different color (red, blue, green).
t=1.0s: The three corners "tear off" and float to center.
t=2.0s: The three angle wedges rotate and snap together — forming a straight line (180°)!
t=3.0s: Text: "Every triangle. Every time. 180°."
t=4.0s: A different triangle appears, corners tear again — same result: straight line.
t=5.5s: Text: "It's not a coincidence — it's geometry."
t=6.5s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Angle colors: red `#f87171`, blue `#60a5fa`, green `#34d399`
- Triangle outline: `#94a3b8`

**Continue Trigger**: Appears after 6.5 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Interactive triangle where students adjust vertices and see angle measures update in real time.

**Scene Layout**:
```
+---------------------------------------------+
|  Angle readouts: A = 60° B = 60° C = 60°   |
|  Sum: 180° (always!)                         |
+---------------------------------------------+
|  SVG Triangle (adjustable via tap)           |
|  - Three vertices (tappable to cycle shapes) |
|  - Angle arcs shown at each vertex           |
|  - Side lengths labeled                      |
+---------------------------------------------+
|  Classification:                             |
|  By sides: [Equilateral]  By angles: [Acute] |
+---------------------------------------------+
|  [New Shape] button to cycle presets         |
|  [Continue] (after 6 interactions)           |
+---------------------------------------------+
```

**Triangle Presets** (cycled by tapping "New Shape"):
1. Equilateral: 60°, 60°, 60° — sides 5, 5, 5
2. Right isosceles: 90°, 45°, 45° — sides 5, 5, 7.07
3. Obtuse scalene: 120°, 35°, 25° — sides 4, 6, 8
4. Acute isosceles: 80°, 50°, 50° — sides 5, 5, 6
5. Right scalene: 90°, 30°, 60° — sides 3, 5.2, 6

**Continue Trigger**: `interactions >= 6`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (5 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "No matter how you change the triangle, the three angles ALWAYS sum to 180°." | Angle values update, sum stays 180 | Angle sum property | "I see it!" |
| 2 | "Count the equal sides: 0 equal = scalene, 2 equal = isosceles, 3 equal = equilateral." | Side labels highlight with colors | Side classification | "I see it!" |
| 3 | "Now look at the LARGEST angle: all < 90° = acute, one = 90° = right, one > 90° = obtuse." | Largest angle pulses | Angle classification | "I see it!" |
| 4 | "A triangle can be BOTH 'isosceles' AND 'right' — two labels, one for sides, one for angles!" | Dual label animates | Dual classification | "Got it!" |
| 5 | "If you know two angles, the third is always 180° minus the other two. Try it!" | Equation: ? = 180° - 60° - 80° = 40° | Finding missing angle | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `∠A + ∠B + ∠C = 180°` | Three colored arcs sum to straight line | red, blue, green |
| 2 | Side classification table | 3 triangle silhouettes | purple |
| 3 | Angle classification table | 3 triangle silhouettes with arcs | amber |
| 4 | `∠C = 180° − ∠A − ∠B` | Missing angle formula | cyan |

**Final Summary**: "Angles sum to 180°. Classify by sides (scalene/isosceles/equilateral) and by angles (acute/right/obtuse)."

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Architecture | Building | "Roof trusses use triangles for strength" | Equilateral/isosceles trusses |
| Bridges | Bridge | "Bridge supports are triangles — most rigid shape" | Right triangles in support beams |
| Pizza | Pizza slice | "A pizza cut into 8 slices: each is an isosceles triangle with 45° tip" | `360° ÷ 8 = 45°` |
| Navigation | Compass | "Triangulation: finding position using three reference points" | Angle sum in surveying |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "A triangle with sides 3, 3, 5 is called..." | 4 options | "Isosceles" | "Two equal sides = isosceles." |
| 2 | Recall | multiple-choice | "A triangle with angles 60°, 60°, 60° is classified as..." | 4 options | "Acute (and equilateral)" | "All angles < 90° = acute. All angles equal = equilateral." |
| 3 | Recall | true-false | "A triangle can have two obtuse angles." | True/False | False | "False! Two obtuse angles would sum to more than 180° — impossible." |
| 4 | Procedure | numeric-input | "Two angles are 70° and 55°. The third angle = ?" | Single number | 55 | "180° − 70° − 55° = 55°. This is also an acute triangle!" |
| 5 | Procedure | multiple-choice | "A triangle has angles 90°, 45°, and ___. Find the missing angle." | 4 options | "45°" | "180° − 90° − 45° = 45°. This is a right isosceles triangle." |
| 6 | Procedure | multiple-choice | "Classify a triangle with sides 3, 4, 5 and a 90° angle." | 4 options | "Right scalene" | "One 90° angle = right. All sides different = scalene." |
| 7 | Understanding | multiple-choice | "Why can a triangle have at most ONE right angle?" | 4 options | "Two right angles = 180°, leaving 0° for the third" | "90° + 90° = 180° already. The third angle would be 0° — not a triangle!" |
| 8 | Understanding | multiple-choice | "If you make a triangle bigger but keep the shape, what happens to the angles?" | 4 options | "They stay the same" | "Scaling a triangle changes side lengths but not angles — they still sum to 180°." |
| 9 | Understanding | multiple-choice | "Every equilateral triangle is also..." | 4 options | "Acute and isosceles" | "All 60° angles are acute. And it has (at least) two equal sides, so it's isosceles too!" |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Imagine tearing off the three corners of any triangle and lining them up. Why do they always form a straight line (180°)? What does this tell us about triangles?"

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
| angleA | #f87171 | First angle arc |
| angleB | #60a5fa | Second angle arc |
| angleC | #34d399 | Third angle arc |
| sides | #a78bfa | Side length labels |
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
// Single file: src/components/lessons/TrianglesLesson.tsx
// Named export: export function TrianglesLesson({ onComplete }: Props)
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
- SVG triangle vertex positions calculated mathematically
