# Lesson Design — GE-4.2a Triangle Properties

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `GE-4.2a` |
| **Name** | Triangle Properties |
| **Grade** | 7 |
| **Domain** | geometry |
| **Prerequisites** | GE-4.2 (Triangles) |
| **Successors** | GE-4.3 (Similarity & Congruence) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/TrianglePropsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> A triangle's sides and angles obey strict rules — the sum of any two sides must exceed the third, exterior angles equal the sum of the remote interior angles, and a midsegment is parallel to one side and half its length.

### 1.2 Learning Objectives
- Students can apply the triangle inequality theorem to determine whether three side lengths can form a triangle
- Students can calculate exterior angles using the exterior angle theorem
- Students understand that a midsegment connects midpoints and is parallel to the opposite side at half the length
- Students can explain why some side-length combinations fail to close into a triangle

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Any three lengths can make a triangle" | Haven't encountered the inequality constraint | Interactive builder shows sides failing to meet |
| "Exterior angle equals the adjacent interior angle" | Confusing supplementary with remote-interior sum | Visual proof animating remote interior angles sliding into the exterior angle |
| "Midsegment = median" | Both involve midpoints | Side-by-side comparison: median goes to vertex, midsegment connects two midpoints |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | "Can these three sticks form a triangle?" |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Drag side lengths to build/fail at triangles |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers the inequality rule, exterior angle theorem, midsegment |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Formal notation: a + b > c, exterior = remote1 + remote2, midsegment = side/2 |
| Real World | Hippocampus | Episodic memory | Relevance | Bridges, roof trusses, surveying |
| Practice | Basal ganglia | Procedural encoding | Mastery | Apply all three properties |
| Reflection | Prefrontal | Metacognition | Pride | Explain why the inequality matters |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: Three line segments appear labeled 3, 4, 5
t=1.0s: They swing together and form a triangle — success glow
t=2.0s: New segments appear labeled 1, 2, 10
t=3.0s: They try to connect — two short sides can't reach — they flop apart with a wobble
t=4.0s: Text: "Not every trio of sides can make a triangle..."
t=5.0s: Text: "What's the rule?"
t=6.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Success triangle: `#34d399` stroke
- Failed sides: `#f87171` stroke with wobble
- Text: `#f8fafc`

**Continue Trigger**: Appears after 6 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Scene Layout**:
```
+-------------------------------+
|  Instruction text             |
+-------------------------------+
|  SVG canvas                   |
|  - Three draggable side bars  |
|  - Triangle assembly area     |
|  - Status: "Valid / Invalid"  |
+-------------------------------+
|  Interaction dots  | Continue |
+-------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap preset side lengths | Tap button | Bars update length with spring | `sides` state updates |
| Toggle side set | Tap numbered buttons (1-6) | Triangle redraws or shows failure | `currentSet` changes |

**Presets**: (3,4,5), (5,5,5), (2,3,10), (7,10,5), (1,1,100), (6,8,10)

**Constraints**: Min 8 interactions to unlock continue.

**Continue Trigger**: `interactions >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts**:

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Look at the sets that worked. What do you notice about the shortest two sides compared to the longest?" | Highlight valid sets, flash sum vs longest | Observation | "I see it!" |
| 2 | "Now look at the exterior angle. It equals the two non-adjacent interior angles added together!" | Exterior angle fills with two interior angle colors combined | Exterior angle theorem | "I see it!" |
| 3 | "Connect the midpoints of two sides. The segment is parallel to the third side and exactly half as long!" | Midsegment draws, measurement labels appear | Midsegment theorem | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | a + b > c | Arrow from two short sides to longest | #34d399 |
| 2 | Exterior angle = Remote Interior 1 + Remote Interior 2 | Angles slide and combine | #60a5fa |
| 3 | Midsegment = (1/2) * parallel side | Midsegment shrinks to half | #f59e0b |

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios**:

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Bridge Trusses | Bridge icon | "Engineers check triangle inequality to ensure beams connect" | a + b > c |
| Roof Framing | House icon | "Rafter lengths must satisfy the inequality" | Side constraints |
| Land Surveying | Compass icon | "Surveyors verify triangle closure from measured sides" | All three inequalities |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "Can sides 3, 4, 8 form a triangle?" | Yes / No | No | "3 + 4 = 7 < 8, so the two shorter sides can't reach." |
| 2 | Recall | multiple-choice | "Can sides 5, 7, 10 form a triangle?" | Yes / No | Yes | "5 + 7 = 12 > 10 — all three inequalities hold." |
| 3 | Recall | multiple-choice | "The exterior angle theorem states the exterior angle equals..." | 4 options | "The sum of the two remote interior angles" | "The exterior angle equals the sum of the two non-adjacent interior angles." |
| 4 | Procedure | numeric-input | "Interior angles are 50 and 60. What is the exterior angle adjacent to the third?" | Number | 110 | "Exterior = 50 + 60 = 110." |
| 5 | Procedure | numeric-input | "A triangle has sides 10, 14, 18. The midsegment parallel to the side of length 18 is..." | Number | 9 | "Midsegment = 18 / 2 = 9." |
| 6 | Procedure | multiple-choice | "Which set of sides CANNOT form a triangle?" | 4 options: (3,5,7) (2,4,7) (6,6,6) (4,5,8) | (2,4,7) | "2 + 4 = 6 < 7, violating the triangle inequality." |
| 7 | Understanding | multiple-choice | "Why can't sides 1, 1, 3 form a triangle?" | 4 options | "1 + 1 = 2, which is less than 3" | "The two shorter sides together are too short to bridge the gap." |
| 8 | Understanding | multiple-choice | "If an exterior angle is 130, what is the sum of the two remote interior angles?" | 4 options | 130 | "By the exterior angle theorem, they are equal." |
| 9 | Understanding | multiple-choice | "A midsegment is always ___ to the third side" | 4 options | "parallel and half the length" | "A midsegment connects two midpoints and is parallel at half the length." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "In your own words, explain why two short sticks can't always form a triangle with a long stick."

**Rules**: Minimum 20 characters, not graded, skip available.

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| valid | #34d399 | Valid triangle / success |
| invalid | #f87171 | Invalid / error |
| exterior | #60a5fa | Exterior angle |
| midsegment | #f59e0b | Midsegment highlight |
| primary | #818cf8 | Buttons, accent |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
```
