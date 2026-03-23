# Lesson Design — GE-4.1a Angle Relationships

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `GE-4.1a` |
| **Name** | Angle Relationships |
| **Grade** | 7 |
| **Domain** | geometry |
| **Prerequisites** | GE-4.1 (Angles) |
| **Successors** | GE-4.2 (Triangles) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/AngleRelationshipsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> When lines intersect, they create angle pairs with special relationships —
> vertical angles are equal, supplementary angles sum to 180 degrees.

### 1.2 Learning Objectives
- Students can identify vertical angles (opposite angles formed by intersecting lines)
- Students understand that vertical angles are always equal
- Students can identify supplementary angles (adjacent angles that sum to 180 degrees)
- Students can find missing angles using these relationships
- Students can explain WHY vertical angles are equal using the supplementary relationship

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Vertical" means up-and-down | Everyday meaning of "vertical" | Emphasize "vertex" = where lines cross; vertical angles are ACROSS the vertex |
| Adjacent angles are equal | Confusion with vertical angles | Color-coding: adjacent angles get different colors, vertical angles match |
| Supplementary means "equal" | Confuse with complementary or vertical | Visual: adjacent angles unfold to a straight line (180 degrees) |
| Angles only come in pairs | Miss that 4 angles form two pairs | Full intersection shows all 4 angles with both pair relationships |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity, wonder | Scissors crossing creates visible angle pairs |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement, flow | Dragging to rotate a line shows angles updating in real-time |
| Discovery | Prefrontal | Pattern recognition | Insight | Student discovers vertical = equal and adjacent = 180 |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps relationships to equations |
| Real World | Hippocampus | Episodic memory | Relevance | Scissors, clock hands, roads |
| Practice | Basal ganglia | Procedural encoding | Mastery | Find missing angles |
| Reflection | Prefrontal | Metacognition | Pride | Explain why vertical angles are equal |

### 2.2 Key Neuroscience Principles Applied
- **Embodied cognition**: Dragging to rotate lines activates motor cortex for angle understanding
- **Spatial before symbolic**: See angle relationships BEFORE learning angle addition equations
- **Progressive complexity**: Single intersection first, then parallel lines later (successor)
- **Pattern discovery**: Student notices equality/supplementary before being told

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Purpose**: Two lines cross and create a surprising pattern.

**Animation Script**:
```
t=0.0s: Dark background. One horizontal line draws across center.
t=1.0s: A second line rotates in from 0 degrees to about 60 degrees, crossing the first.
t=2.0s: The 4 angles flash in alternating colors (pair A = indigo, pair B = amber).
t=3.0s: Angle values appear: 60, 120, 60, 120.
t=4.0s: Text: "Notice anything?"
t=5.0s: The matching angles glow brighter. Text: "Opposite angles are always equal."
t=6.0s: Adjacent angles flash: "60 + 120 = 180"
t=7.0s: The second line slowly rotates to 45 degrees. Values update: 45, 135, 45, 135.
t=8.0s: Text: "No matter the angle, these rules never break."
t=9.0s: Continue button fades in.
```

**Visual Design**:
- Background: `#0f172a`
- Line A: `#475569`
- Line B: `#94a3b8`
- Angle pair 1 (vertical): `#818cf8` (indigo)
- Angle pair 2 (vertical): `#f59e0b` (amber)
- Intersection point: white dot

**Continue Trigger**: After 9 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Two intersecting lines with a draggable rotation handle. Angles update in real-time.

**Scene Layout**:
```
+---------------------------------------------+
|  Angle readout: A=60  B=120  C=60  D=120    |
+---------------------------------------------+
|  SVG: Two intersecting lines at center       |
|  - Line 1: fixed horizontal                  |
|  - Line 2: draggable rotation                |
|  - 4 angle arcs with colors and values       |
|  - Drag handle on Line 2 endpoint            |
+---------------------------------------------+
|  Relationships display:                      |
|  "A = C (vertical)"  "A + B = 180"          |
|  Interactions: 5/10                          |
|  [Continue] (after 10 interactions)          |
+---------------------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Drag line endpoint | @use-gesture drag | Line rotates, all 4 angle arcs and values update in real-time | angle state updates |
| Tap angle arc | Tap | Angle pulses, its pair highlights (vertical or supplementary) | Interaction counted |
| Tap preset buttons | Tap 30/45/60/90 | Line snaps to preset angle with spring | Quick exploration |

**Constraints**:
- Angle minimum: 5 degrees (lines don't overlap)
- Angle maximum: 175 degrees (lines don't overlap)
- Snaps to notable angles (30, 45, 60, 90) when within 3 degrees
- Updates at 60fps during drag

**Continue Trigger**: `interactions >= 10` (mix of drags and taps)

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (4 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Look at the angles across from each other (like A and C). Drag the line around. What do you notice about their values?" | A and C highlight in same color, values shown | Vertical angles equal | "They're always equal!" |
| 2 | "Now look at angles NEXT to each other (A and B). Add them up. What's the total?" | A and B highlight, sum shown: "A + B = 180" | Supplementary relationship | "They add to 180!" |
| 3 | "Angles across the intersection point are called VERTICAL angles. They're always equal because they share the same pair of supplementary partners." | Diagram shows: A + B = 180 and C + B = 180, so A must equal C | WHY vertical angles are equal | "I see it!" |
| 4 | "Angles next to each other on a straight line are SUPPLEMENTARY. They always add to 180 degrees because a straight line is 180 degrees!" | Adjacent angles unfold to a straight line animation | WHY supplementary = 180 | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | Vertical angles: angle A = angle C | Highlights A and C across vertex | indigo |
| 2 | Vertical angles: angle B = angle D | Highlights B and D across vertex | amber |
| 3 | Supplementary: angle A + angle B = 180 degrees | A and B arcs unfold to straight line | indigo + amber |
| 4 | Finding missing angle: If angle A = 65 degrees, angle B = 180 - 65 = 115 degrees | Calculation shown step by step | green for answer |
| 5 | And angle C = 65 degrees (vertical), angle D = 115 degrees (vertical) | All 4 angles filled in | all colors |

**Final Summary**: "Vertical angles are equal. Adjacent angles on a line sum to 180 degrees."

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Scissors | Scissors icon | "Open scissors form vertical angles -- the two openings are always equal!" | Vertical angles |
| Clock | Clock icon | "When clock hands point at 2:00 and 8:00, they form vertical angles" | Equal opposite angles |
| Road intersection | Road icon | "Two roads crossing create 4 angles. If one is 70 degrees, you know all four!" | Finding all angles |
| Letter X | X icon | "The letter X is two lines crossing -- the top and bottom angles match!" | Visual vertical angles |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "What are vertical angles?" | 4 options | "Angles across from each other at an intersection" | "Vertical angles are opposite each other where two lines cross -- they share a vertex." |
| 2 | Recall | true-false | "Vertical angles add up to 180 degrees." | True/False | False | "False! Vertical angles are EQUAL. SUPPLEMENTARY (adjacent) angles add to 180." |
| 3 | Recall | multiple-choice | "Two supplementary angles add up to..." | 4 options | "180 degrees" | "Supplementary angles always add to 180 degrees because they form a straight line." |
| 4 | Procedure | numeric-input | "Two lines cross. One angle is 70 degrees. What is the angle next to it?" | Single number | 110 | "Adjacent angles are supplementary: 180 - 70 = 110 degrees." |
| 5 | Procedure | numeric-input | "Two lines cross. One angle is 40 degrees. What is the vertical angle?" | Single number | 40 | "Vertical angles are equal! The angle across is also 40 degrees." |
| 6 | Procedure | multiple-choice | "Two lines cross. One angle is 55 degrees. What are all four angles?" | 4 options | "55, 125, 55, 125" | "Vertical: 55 = 55. Supplementary: 180 - 55 = 125. The four angles are 55, 125, 55, 125." |
| 7 | Understanding | multiple-choice | "Why are vertical angles always equal?" | 4 options | "Because both are supplementary to the same angle" | "If A + B = 180 and C + B = 180, then A and C must be equal!" |
| 8 | Understanding | multiple-choice | "Can two vertical angles both be 100 degrees?" | 4 options | "Yes, and the other pair would be 80 degrees each" | "If vertical angles are 100 degrees, adjacent = 180 - 100 = 80 degrees. Works!" |
| 9 | Understanding | multiple-choice | "If all four angles at an intersection are equal, what is each angle?" | 4 options | "90 degrees" | "If all angles are equal and adjacent ones sum to 180: each must be 180/2 = 90 degrees. The lines are perpendicular!" |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Explain to a friend WHY vertical angles are always equal. Hint: use the fact that both vertical angles are supplementary to the SAME angle."

**Rules**:
- Minimum 20 characters
- NOT graded
- Skip available
- Encouraging feedback

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| angleA | #818cf8 | Angle pair A (and C) |
| angleB | #f59e0b | Angle pair B (and D) |
| line | #94a3b8 | Lines |
| vertex | #ffffff | Intersection point |
| success | #34d399 | Correct answers |
| error | #f87171 | Incorrect answers |
| bgPrimary | #0f172a | Background |
| bgSurface | #1e293b | Cards |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring", damping: 20, stiffness: 300 };
const SPRING_POP = { type: "spring", damping: 15, stiffness: 400 };
const FADE = { duration: 0.3, ease: "easeOut" };
```

---

## 5. Technical Implementation

### 5.1 Dependencies
- react, framer-motion
- @use-gesture/react (useDrag for rotating the line)

### 5.2 SVG Angle Geometry
```typescript
const DEG = Math.PI / 180;
// Line endpoint from center
const endX = (angleDeg: number, radius: number) => radius * Math.cos(angleDeg * DEG);
const endY = (angleDeg: number, radius: number) => -radius * Math.sin(angleDeg * DEG); // SVG y inverted

// Arc path for angle fill
function arcPath(startDeg: number, endDeg: number, radius: number): string { ... }
```

### 5.3 Drag-to-Rotate
```typescript
// Convert pointer position to angle relative to center
const pointerAngle = Math.atan2(-(clientY - centerY), clientX - centerX) / DEG;
// Normalize to 0-360
```
