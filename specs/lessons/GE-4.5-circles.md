# Lesson Design — GE-4.5 Circles

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `GE-4.5` |
| **Name** | Circles |
| **Grade** | 7 |
| **Domain** | geometry |
| **Prerequisites** | GE-4.1a (Angle Relationships) |
| **Successors** | GE-4.6 (Area & Perimeter) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/CirclesLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Every circle has a constant ratio between its circumference and diameter — that ratio is pi, giving us C = pi * d and C = 2 * pi * r.

### 1.2 Learning Objectives
- Students can identify radius, diameter, and circumference
- Students understand that diameter = 2 * radius
- Students can calculate circumference using C = pi * d or C = 2 * pi * r
- Students understand pi as a ratio that never changes regardless of circle size
- Students can explain the relationship between circumference and diameter

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Pi equals exactly 3.14" | Taught as a rounded value | Show pi is irrational — 3.14159... never ends |
| "Radius and diameter are the same" | Both measure across the circle | Visual: radius = half-way, diameter = all the way |
| "Circumference is the area inside" | Confusing perimeter with area | Rolling circle animation shows circumference = unrolled edge |
| "Pi only works for big circles" | Haven't tested multiple sizes | Interactive shows C/d = pi for any size circle |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | Rolling wheel unrolls to reveal pi |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Resize circles and watch C/d ratio stay constant |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers C/d = pi for every circle |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | C = pi * d, C = 2 * pi * r |
| Real World | Hippocampus | Episodic memory | Relevance | Wheels, pizzas, clocks |
| Practice | Basal ganglia | Procedural encoding | Mastery | Calculate circumference problems |
| Reflection | Prefrontal | Metacognition | Pride | Explain why pi is special |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: A circle (wheel) appears at left of screen
t=1.0s: The wheel rolls to the right, leaving a colored trail (the circumference unrolled)
t=2.0s: A diameter line appears inside the circle
t=3.0s: The diameter copies itself along the trail — fits 3 times with a bit left over
t=4.0s: Text appears: "3.14159..." with glowing pi symbol
t=5.0s: Text: "No matter the circle size, this ratio never changes."
t=6.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Circle stroke: `#818cf8`
- Trail: `#34d399`
- Pi text: `#f59e0b` glow

**Continue Trigger**: Appears after 6 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Scene Layout**:
```
+-------------------------------+
|  Interactive circle           |
|  - Radius line (labeled)      |
|  - Diameter line (labeled)    |
|  - Circumference highlight    |
+-------------------------------+
|  Slider: adjust radius 1-10   |
|  Live display:                 |
|    r = ?, d = ?, C = ?        |
|    C / d = 3.14159...         |
+-------------------------------+
|  Interaction dots  | Continue  |
+-------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Drag radius slider | Drag/tap | Circle resizes with spring, values update | `radius` changes |
| Tap to toggle radius/diameter/circumference labels | Tap label buttons | Highlighted part pulses | `activeLabel` toggles |

**Constraints**: Min 8 slider changes to unlock continue.

**Continue Trigger**: `interactions >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts**:

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Watch the ratio C / d as you change the radius. Does it change?" | C/d value highlighted, stays at 3.14159... | Pi is constant | "I see it!" |
| 2 | "The diameter is always twice the radius: d = 2r" | Radius doubles to show diameter | d = 2r relationship | "I see it!" |
| 3 | "Since C / d is always pi, we can write C = pi * d, or since d = 2r, C = 2 * pi * r!" | Formula builds step by step | Circumference formulas | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | C / d = pi | Arrow from circumference to diameter with ratio | #f59e0b |
| 2 | C = pi * d | Rearranged formula | #34d399 |
| 3 | d = 2r, so C = 2 * pi * r | Substitution animation | #818cf8 |

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios**:

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Bicycle Wheel | Wheel icon | "A 26-inch wheel travels 26*pi inches per rotation" | C = pi * d |
| Pizza | Pizza icon | "How much crust on a 14-inch pizza?" | C = pi * 14 |
| Clock Face | Clock icon | "The minute hand tip traces a circle every hour" | C = 2 * pi * r |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "The diameter of a circle is..." | 4 options | "Twice the radius" | "Diameter goes all the way across through the center: d = 2r" |
| 2 | Recall | multiple-choice | "Pi is approximately..." | 4 options | "3.14159" | "Pi is the ratio of circumference to diameter, approximately 3.14159" |
| 3 | Recall | multiple-choice | "Which formula gives circumference?" | 4 options | "C = pi * d" | "Circumference equals pi times diameter." |
| 4 | Procedure | numeric-input | "A circle has diameter 10. What is its circumference? (Use pi = 3.14, round to nearest tenth)" | Number | 31.4 | "C = pi * d = 3.14 * 10 = 31.4" |
| 5 | Procedure | numeric-input | "A circle has radius 7. What is its circumference? (Use pi = 3.14, round to nearest tenth)" | Number | 44.0 | "C = 2 * pi * r = 2 * 3.14 * 7 = 43.96, rounded to 44.0" |
| 6 | Procedure | numeric-input | "A wheel has circumference 62.8 cm. What is its diameter? (Use pi = 3.14)" | Number | 20 | "d = C / pi = 62.8 / 3.14 = 20" |
| 7 | Understanding | multiple-choice | "If you double the radius, the circumference..." | 4 options | "Also doubles" | "C = 2*pi*r. Double r means double C." |
| 8 | Understanding | multiple-choice | "Why is pi the same for every circle?" | 4 options | "Because all circles are the same shape, just different sizes" | "All circles are similar figures — the C/d ratio is a geometric constant." |
| 9 | Understanding | multiple-choice | "A tire rolls exactly one full turn. The distance traveled equals..." | 4 options | "The circumference" | "One rotation covers exactly one circumference of distance." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "In your own words, explain what pi is and why it shows up in every circle formula."

**Rules**: Minimum 20 characters, not graded, skip available.

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| radius | #818cf8 | Radius line |
| diameter | #60a5fa | Diameter line |
| circumference | #34d399 | Circumference arc |
| pi | #f59e0b | Pi symbol / ratio |
| primary | #8b5cf6 | Buttons |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
```
