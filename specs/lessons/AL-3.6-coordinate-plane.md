# Lesson Design — AL-3.6 Coordinate Plane

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `AL-3.6` |
| **Name** | Coordinate Plane |
| **Grade** | 6 |
| **Domain** | algebra |
| **Prerequisites** | NO-1.1 (Place Value / Number Sense) |
| **Successors** | AL-3.7 (Graphing Linear Equations) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/CoordinatePlaneLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> The coordinate plane is a map where every point has an address (x, y) —
> x is how far right, y is how far up.

### 1.2 Learning Objectives
- Students can identify the x-axis, y-axis, and origin on a coordinate plane
- Students can plot points given (x, y) coordinates
- Students understand that x measures horizontal position and y measures vertical position
- Students can read coordinates from a plotted point
- Students can identify which quadrant a point is in

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| Mix up x and y (plot y first) | Alphabetical order feels wrong for "over then up" | Mnemonic: "Run before you jump" — x is running (horizontal), y is jumping (vertical) |
| Confuse (3,5) with (5,3) | Don't understand order matters | Interactive plotting shows different positions for swapped coordinates |
| Negative coordinates don't exist | Only seen positive numbers on grids | Grid extends into all 4 quadrants with color-coded regions |
| Origin is just "zero" | Don't see it as a reference point | Origin pulses as the "home base" from which all addresses are measured |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | "A treasure map needs coordinates" creates question |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement, flow | Tapping to place points builds embodied coordinate sense |
| Discovery | Prefrontal | Pattern recognition | Productive struggle then insight | Discovers that order matters and axes have meaning |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps grid positions to (x, y) notation |
| Real World | Hippocampus | Episodic memory | Relevance | Maps, games, seat assignments |
| Practice | Basal ganglia | Procedural encoding | Mastery | Consolidates coordinate reading and plotting |
| Reflection | Prefrontal | Metacognition | Pride | Explains why order matters |

### 2.2 Key Neuroscience Principles Applied
- **Spatial before symbolic**: Interactive grid before (x,y) notation
- **Embodied cognition**: Tapping on the grid to place points activates motor cortex
- **Progressive complexity**: Start with Quadrant I, then expand to all four
- **Self-explanation effect**: Reflection on why (3,5) differs from (5,3)

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Purpose**: Create wonder about how we describe positions.

**Animation Script**:
```
t=0.0s: Dark screen. A grid fades in — like graph paper glowing softly.
t=1.0s: Text: "Every point has an address."
t=2.0s: A dot appears at (3,4). Lines trace from axes to the dot.
t=3.0s: The address "(3, 4)" appears next to the dot.
t=4.0s: Another dot at (7,2). Lines trace. "(7, 2)" appears.
t=5.0s: A third dot at (1,6). Lines trace. "(1, 6)" appears.
t=6.0s: Text: "How far right. How far up."
t=7.0s: All dots connect to form a triangle shape.
t=8.0s: Continue button fades in.
```

**Visual Design**:
- Background: `#0f172a`
- Grid lines: `#1e293b` (subtle)
- Axes: `#475569` (brighter)
- Dots: `#818cf8` (indigo) with glow
- Coordinate text: `#f8fafc`
- Trace lines: `#34d399` (dashed)

**Continue Trigger**: Appears after 8 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Tap on grid to place points and see coordinates update in real-time.

**Scene Layout**:
```
+---------------------------------------------+
|  Coordinate display: (x, y) = (?, ?)        |
+---------------------------------------------+
|  Interactive SVG Grid (10x10, Quadrant I)    |
|  - Grid lines every unit                     |
|  - Numbered axes 0-10                        |
|  - Tap anywhere to place a point             |
|  - Dashed lines trace from point to axes     |
+---------------------------------------------+
|  Instruction: "Tap to place points!"         |
|  Points placed: 3/8                          |
|  [Continue] (after 8 points)                 |
+---------------------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap on grid | Tap/click | Point appears with spring pop, dashed trace lines to axes, coordinate label shows | Point added, count increments |
| Tap existing point | Tap | Point pulses, coordinate re-highlighted | Interaction counted |
| Clear all | Tap clear button | Points fade out | Reset points array |

**Constraints**:
- Grid snaps to nearest integer coordinate
- Maximum 20 points on screen (oldest removed)
- Points in Quadrant I only (x: 0-10, y: 0-10)

**Continue Trigger**: `pointsPlaced >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (4 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Notice: the FIRST number tells how far RIGHT the point is from the center." | Highlights x-values on all placed points, traces horizontal lines | x = horizontal | "I see it!" |
| 2 | "The SECOND number tells how far UP. Run first (x), then jump (y)!" | Highlights y-values, traces vertical lines | y = vertical | "I see it!" |
| 3 | "Look: (3, 5) and (5, 3) are DIFFERENT points! Order matters." | Two dots appear at (3,5) and (5,3), lines connect showing they're different | Order matters | "I see it!" |
| 4 | "The center point (0, 0) is called the ORIGIN. Every address is measured from here." | Origin pulses with glow, arrows radiate outward | Origin concept | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | `x-axis: horizontal (left-right)` | x-axis glows, arrow points right | `#60a5fa` (blue) |
| 2 | `y-axis: vertical (up-down)` | y-axis glows, arrow points up | `#34d399` (green) |
| 3 | `(x, y) = (3, 4)` | Point at (3,4) with labeled traces | blue x, green y |
| 4 | `Origin = (0, 0)` | Origin pulses | amber |
| 5 | Quadrant labels: I, II, III, IV | Grid extends to show negative axes, quadrant labels appear | each quadrant a different color |

**Final Summary**: "(x, y) means: go x units right, then y units up from the origin."

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Maps | Pin icon | "GPS uses coordinates (latitude, longitude) to find any place on Earth" | (x, y) as an address |
| Gaming | Joystick | "In Minecraft, every block has (x, y, z) coordinates" | Coordinates locate objects |
| Theater seats | Chair | "Row 3, Seat 7 is like coordinates (7, 3)" | Ordered pairs in life |
| Battleship | Ship | "B4 in Battleship = column B, row 4 = a coordinate!" | Grid reference system |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "Which axis runs horizontally (left to right)?" | 4 options | "x-axis" | "The x-axis is horizontal. Think: x looks like a cross on the ground!" |
| 2 | Recall | multiple-choice | "What is the coordinate of the origin?" | 4 options | "(0, 0)" | "The origin is at (0, 0) -- the starting point for all coordinates." |
| 3 | Recall | true-false | "In (5, 3), the 5 tells how far up the point is." | True/False | False | "False! The first number (5) is x = how far RIGHT. The second (3) is y = how far UP." |
| 4 | Procedure | tap-to-select | "Tap the point at (4, 6) on the grid." | Tap on grid | (4, 6) | "Correct! Go 4 right and 6 up." |
| 5 | Procedure | multiple-choice | "A point is 7 units right and 2 units up. What are its coordinates?" | 4 options | "(7, 2)" | "7 right = x is 7, 2 up = y is 2. The point is (7, 2)." |
| 6 | Procedure | tap-to-select | "Tap the point at (2, 8) on the grid." | Tap on grid | (2, 8) | "2 units right, 8 units up. You got it!" |
| 7 | Understanding | multiple-choice | "Are (4, 7) and (7, 4) the same point?" | 4 options | "No, they are different points" | "Order matters! (4,7) is 4 right, 7 up. (7,4) is 7 right, 4 up. Different locations!" |
| 8 | Understanding | multiple-choice | "A point is at (5, 0). Where does it sit?" | 4 options | "On the x-axis" | "When y = 0, the point sits directly on the x-axis. No vertical movement!" |
| 9 | Understanding | multiple-choice | "Why do we need TWO numbers to describe a point on a flat surface?" | 4 options | "Because a flat surface has two directions: horizontal and vertical" | "A flat plane is 2D, so we need 2 numbers -- one for each direction!" |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Explain to a friend why (3, 5) and (5, 3) are different points. Use the idea of 'running' and 'jumping' or any other analogy."

**Rules**:
- Minimum 20 characters
- NOT graded
- Skip available
- Encouraging feedback after submission

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| xAxis | #60a5fa | x-axis, horizontal traces |
| yAxis | #34d399 | y-axis, vertical traces |
| point | #818cf8 | Plotted points |
| origin | #fbbf24 | Origin marker |
| gridLine | #1e293b | Grid lines |
| axisLine | #475569 | Axis lines |
| bgPrimary | #0f172a | Background |
| bgSurface | #1e293b | Cards |
| success | #34d399 | Correct |
| error | #f87171 | Incorrect |

### 4.2 Component Sizing
- Grid: fills available width, aspect ratio 1:1
- Touch targets: 48px
- Grid cells: at least 30px for tap accuracy

### 4.3 Animation Presets
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
// Single file: src/components/lessons/CoordinatePlaneLesson.tsx
// Named export: export function CoordinatePlaneLesson({ onComplete }: Props)
```

### 5.2 Dependencies
- react (useState, useEffect, useCallback, useMemo, useRef)
- framer-motion (motion, AnimatePresence)
- No @use-gesture needed (tap-based grid interaction via onClick)

### 5.3 SVG Grid Positioning
```typescript
// Grid coordinate to pixel position
const MARGIN = 40;
const GRID_SIZE = 320; // will be responsive
const cellSize = GRID_SIZE / 10;
const toPixelX = (gridX: number) => MARGIN + gridX * cellSize;
const toPixelY = (gridY: number) => MARGIN + (10 - gridY) * cellSize; // SVG y is inverted
```
