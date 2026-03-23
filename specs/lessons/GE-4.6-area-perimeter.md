# Lesson Design — GE-4.6 Area & Perimeter

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `GE-4.6` |
| **Name** | Area & Perimeter |
| **Grade** | 6 |
| **Domain** | geometry |
| **Prerequisites** | GE-4.4 (Quadrilaterals), GE-4.1 (Angles) |
| **Successors** | GE-4.7 (Surface Area & Volume) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/AreaPerimeterLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Perimeter measures the distance around a shape (walking the edge) while area measures the space inside (filling the surface) — two fundamentally different measurements of the same shape.

### 1.2 Learning Objectives
- Students can distinguish between area (square units) and perimeter (linear units)
- Students can calculate perimeter and area of rectangles, triangles, and circles
- Students understand why area uses squared units
- Students can apply area and perimeter formulas: P = 2l + 2w, A = l * w, A = (1/2) * b * h, A = pi * r^2
- Students can explain which real-world problems need area vs perimeter

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Area and perimeter are the same thing" | Both describe a shape's size | Walking around (perimeter) vs painting inside (area) animation |
| "Bigger perimeter = bigger area" | Intuitive but false | Same perimeter, different areas comparison |
| "Area units are the same as perimeter units" | Don't understand squared units | Grid squares fill the shape — count them |
| "Triangle area = base * height" | Forget the 1/2 factor | Show triangle is half of a rectangle |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | Fence (perimeter) vs grass (area) — same yard, different measures |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Drag to resize rectangles, watch perimeter and area change independently |
| Discovery | Prefrontal | Pattern recognition | Insight | Same perimeter can give different areas |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | P = 2l + 2w, A = lw, A = (1/2)bh, A = pi*r^2 |
| Real World | Hippocampus | Episodic memory | Relevance | Fencing a yard, painting a wall, buying carpet |
| Practice | Basal ganglia | Procedural encoding | Mastery | Calculate both for various shapes |
| Reflection | Prefrontal | Metacognition | Pride | When do you need area vs perimeter? |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: A rectangular yard appears with a house
t=1.0s: An ant walks along the fence (perimeter highlights in blue) — "How much fencing?"
t=2.5s: Green grass fills the inside (area highlights in green) — "How much grass seed?"
t=4.0s: Numbers appear: Perimeter = 40 ft, Area = 96 sq ft
t=5.0s: Text: "Same yard. Two different questions. Two different answers."
t=6.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Perimeter stroke: `#60a5fa`
- Area fill: `#34d399` with low opacity
- Text: `#f8fafc`

**Continue Trigger**: Appears after 6 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Scene Layout**:
```
+-------------------------------+
|  Interactive rectangle         |
|  - Drag corners to resize     |
|  - Grid squares visible inside|
|  - Perimeter path highlighted |
+-------------------------------+
|  Live values:                  |
|    Width: ?  Height: ?        |
|    Perimeter: ?  Area: ?      |
|  Shape selector: Rect/Tri/Circ|
+-------------------------------+
|  Interaction dots  | Continue  |
+-------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap width/height buttons (+/-) | Tap | Rectangle resizes with spring, values update | `width`/`height` changes |
| Tap shape selector | Tap | Shape morphs to new type | `shape` changes |

**Constraints**: Min 10 interactions to unlock continue.

**Continue Trigger**: `interactions >= 10`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts**:

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Make a 2x8 rectangle and a 4x4 rectangle. Both have perimeter 20 — but look at the areas!" | Both rectangles shown, areas highlighted: 16 vs 16... wait, 2x8=16, 4x4=16 too. Try 1x9 P=20 A=9 vs 5x5 P=20 A=25 | Same perimeter, different area | "I see it!" |
| 2 | "A triangle is exactly half a rectangle with the same base and height." | Rectangle splits diagonally, half fades away | Triangle = half rectangle | "I see it!" |
| 3 | "A circle's area counts the square units inside. It's pi times the radius squared: A = pi * r^2" | Grid squares fill circle, count approaches pi*r^2 | Circle area formula | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | P = 2l + 2w | Path traces around rectangle | #60a5fa |
| 2 | A = l * w | Grid squares fill inside | #34d399 |
| 3 | A = (1/2) * b * h | Triangle shown as half rectangle | #f59e0b |
| 4 | A = pi * r^2 | Circle with grid overlay | #818cf8 |

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Fencing a Garden | Fence icon | "How many feet of fence for a 12x8 garden?" | P = 2(12) + 2(8) = 40 ft |
| Painting a Wall | Paint roller icon | "How many square feet of paint for a 10x8 wall?" | A = 10 * 8 = 80 sq ft |
| Buying Carpet | Carpet icon | "How many square yards for a 4x3 room?" | A = 4 * 3 = 12 sq yd |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "Perimeter measures..." | 4 options | "The distance around a shape" | "Perimeter is the total length of all sides — the path around the edge." |
| 2 | Recall | multiple-choice | "Area is measured in..." | 4 options | "Square units" | "Area counts how many unit squares fit inside, so we use square units." |
| 3 | Recall | multiple-choice | "The formula for rectangle area is..." | 4 options | "A = length * width" | "Multiply length times width to get the number of unit squares." |
| 4 | Procedure | numeric-input | "A rectangle is 6 by 9. What is its perimeter?" | Number | 30 | "P = 2(6) + 2(9) = 12 + 18 = 30" |
| 5 | Procedure | numeric-input | "A rectangle is 6 by 9. What is its area?" | Number | 54 | "A = 6 * 9 = 54" |
| 6 | Procedure | numeric-input | "A triangle has base 10 and height 6. What is its area?" | Number | 30 | "A = (1/2) * 10 * 6 = 30" |
| 7 | Understanding | multiple-choice | "Two rectangles have the same perimeter. Must they have the same area?" | Yes / No | No | "A 1x9 and 5x5 rectangle both have P=20, but areas are 9 and 25." |
| 8 | Understanding | multiple-choice | "You need to buy fencing. Do you need area or perimeter?" | 2 options | "Perimeter" | "Fencing goes around the outside — that's perimeter!" |
| 9 | Understanding | multiple-choice | "Why is triangle area half of base * height?" | 4 options | "Because a triangle is half of a rectangle" | "Cut a rectangle along its diagonal and you get two triangles." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Give a real-life example where you would need to find area, and another where you would need perimeter. Why are they different?"

**Rules**: Minimum 20 characters, not graded, skip available.

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| perimeter | #60a5fa | Perimeter paths |
| area | #34d399 | Area fills |
| triangle | #f59e0b | Triangle highlights |
| circle | #818cf8 | Circle highlights |
| primary | #8b5cf6 | Buttons |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
```
