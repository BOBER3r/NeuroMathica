# Lesson Design — SP-5.3 Box Plots

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `SP-5.3` |
| **Name** | Box Plots |
| **Grade** | 6 |
| **Domain** | statistics-probability |
| **Prerequisites** | SP-5.1 (Mean, Median, Mode) |
| **Successors** | SP-5.4 (Probability Basics) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/BoxPlotsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> A box plot summarizes a data set with just five numbers — minimum, Q1, median, Q3, and maximum — showing where data clusters and how spread out it is.

### 1.2 Learning Objectives
- Students can identify the five-number summary: min, Q1, median, Q3, max
- Students can read a box plot and extract the five-number summary
- Students can construct a box plot from a data set
- Students understand that each section of a box plot contains 25% of the data
- Students can compare two data sets using side-by-side box plots

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "The bigger box section has more data" | Confusing area with count | Animate dots into each quartile — same count, different spread |
| "The median is always in the middle of the box" | Think box = equal halves | Show skewed data where median is off-center |
| "Q1 and Q3 are the 1st and 3rd data values" | Literal interpretation of "quartile" | Show quartile = value at the 25% and 75% boundary |
| "Whiskers mean outliers" | Confusing whisker endpoints with extreme values | Whiskers go to min and max (in this intro) |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | Data dots collapse into a box plot |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Drag data points, watch box plot update live |
| Discovery | Prefrontal | Pattern recognition | Insight | Each quartile has same count, different spread |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Five-number summary notation |
| Real World | Hippocampus | Episodic memory | Relevance | Test scores, temperatures, sports stats |
| Practice | Basal ganglia | Procedural encoding | Mastery | Read and build box plots |
| Reflection | Prefrontal | Metacognition | Pride | Why box plots are useful |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: 20 scattered dots appear on a number line (test scores: 55-95)
t=1.5s: Dots sort themselves left to right
t=2.5s: Vertical lines appear at min, Q1, median, Q3, max
t=3.5s: A box draws around Q1-Q3, whiskers extend to min and max
t=4.5s: Text: "20 numbers. 5 landmarks. 1 picture."
t=5.5s: Text: "This is a box plot."
t=6.5s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Dots: `#818cf8`
- Box: `#34d399` fill, `#34d399` stroke
- Median line: `#f59e0b`
- Whiskers: `#94a3b8`

**Continue Trigger**: Appears after 6.5 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Scene Layout**:
```
+-------------------------------+
|  Number line (0-100)           |
|  Data dots shown above line    |
+-------------------------------+
|  Box plot renders below line   |
|  Labels: min, Q1, med, Q3, max|
+-------------------------------+
|  Add/Remove data buttons       |
|  Preset data sets (A, B, C)   |
|  Interaction dots  | Continue  |
+-------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap preset data set (A/B/C) | Tap | Dots rearrange, box plot redraws with spring | `dataset` changes |
| Tap "Add Point" then tap number line | Tap | New dot drops in, box plot updates | `data` grows |
| Tap a dot to remove | Tap | Dot pops away, box plot updates | `data` shrinks |

**Presets**: A = [55,60,65,70,72,75,78,80,82,85,90,95], B = [20,22,25,50,55,58,60,62,65,80,85,90], C = [40,42,43,44,45,46,47,48,49,50,51,95]

**Continue Trigger**: `interactions >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Count the dots in each section. Each part of the box plot contains about 25% of the data!" | Dots color-coded by quartile, counts shown | Equal count per quartile | "I see it!" |
| 2 | "A wider section means the data is more spread out there — not that there's more data." | Skewed dataset shown, wide right whisker | Width = spread, not count | "I see it!" |
| 3 | "The five-number summary tells the whole story: Min, Q1, Median, Q3, Max." | Each value labels pops in with its name | Five-number summary | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | Min = smallest value | Arrow to left whisker tip | #94a3b8 |
| 2 | Q1 = 25th percentile | Arrow to left box edge | #60a5fa |
| 3 | Median = 50th percentile | Arrow to center line | #f59e0b |
| 4 | Q3 = 75th percentile | Arrow to right box edge | #60a5fa |
| 5 | Max = largest value | Arrow to right whisker tip | #94a3b8 |
| 6 | IQR = Q3 - Q1 | Bracket spanning the box | #34d399 |

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Test Scores | Clipboard icon | "Compare two classes' test results with box plots" | Side-by-side comparison |
| Daily Temperatures | Thermometer icon | "A month of temperatures at a glance" | Spread and center |
| Sports Stats | Basketball icon | "Points per game for two players" | Consistency vs range |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "The five-number summary includes..." | 4 options | "Min, Q1, Median, Q3, Max" | "These five values define the entire box plot." |
| 2 | Recall | multiple-choice | "The box in a box plot spans from..." | 4 options | "Q1 to Q3" | "The box shows the interquartile range — the middle 50% of data." |
| 3 | Recall | multiple-choice | "The line inside the box represents..." | 4 options | "The median" | "The center line marks the median — the middle value." |
| 4 | Procedure | numeric-input | "Data: 3, 5, 7, 9, 11. What is the median?" | Number | 7 | "The middle value of the sorted data is 7." |
| 5 | Procedure | numeric-input | "Data: 2, 4, 6, 8, 10, 12. What is Q1?" | Number | 4 | "Q1 is the median of the lower half: 2, 4, 6. Q1 = 4." |
| 6 | Procedure | numeric-input | "If Q1 = 20 and Q3 = 45, what is the IQR?" | Number | 25 | "IQR = Q3 - Q1 = 45 - 20 = 25." |
| 7 | Understanding | multiple-choice | "A box plot has a very long right whisker. This means..." | 4 options | "There are some high values far from the rest" | "A long whisker shows data stretching far in that direction." |
| 8 | Understanding | multiple-choice | "Each section of a box plot contains about..." | 4 options | "25% of the data" | "The four sections (two whiskers, two box halves) each hold about 25%." |
| 9 | Understanding | multiple-choice | "Two box plots: A has a wider box than B. This tells you..." | 4 options | "A's middle 50% is more spread out" | "A wider box (larger IQR) means more variability in the middle half." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Why might a box plot be more useful than just listing all the numbers? When would you want to see the full data instead?"

**Rules**: Minimum 20 characters, not graded, skip available.

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| box | #34d399 | Box fill |
| median | #f59e0b | Median line |
| whisker | #94a3b8 | Whisker lines |
| dots | #818cf8 | Data points |
| quartile | #60a5fa | Q1/Q3 labels |
| primary | #8b5cf6 | Buttons |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
```
