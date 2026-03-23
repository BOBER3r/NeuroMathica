# Lesson Design — SP-5.2 Data Displays

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `SP-5.2` |
| **Name** | Data Displays |
| **Grade** | 6 |
| **Domain** | statistics-probability |
| **Prerequisites** | SP-5.1 (Mean, Median, Mode) |
| **Successors** | SP-5.3 (Probability) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/DataDisplaysLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Different data types need different displays — bar graphs compare categories, line graphs show change over time, histograms show frequency distributions, and pie charts show parts of a whole.

### 1.2 Learning Objectives
- Students can identify and create bar graphs, line graphs, histograms, and pie charts
- Students can choose the appropriate display for a given data type
- Students understand categorical vs numerical vs time-series data
- Students can read and interpret each chart type
- Students can explain why a particular display is best for specific data

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "Bar graphs and histograms are the same" | Both use bars | Side-by-side comparison: bars have gaps (categories) vs no gaps (ranges) |
| "Pie charts work for any data" | Pie charts are visually appealing | Show pie chart failure with time-series data |
| "Line graphs connect any data points" | Don't understand time-series requirement | Demonstrate nonsensical line graph with categories |
| "Taller bar = more important" | Confusing height with significance | Emphasize that height = quantity, not importance |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | "Same data, four different looks" |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Interactive chart builder |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers which chart fits which data type |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | Maps data types to chart types formally |
| Real World | Hippocampus | Episodic memory | Relevance | Sports stats, weather, surveys |
| Practice | Basal ganglia | Procedural encoding | Mastery | Choosing and reading charts |
| Reflection | Prefrontal | Metacognition | Pride | Explains chart selection reasoning |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: Data table appears: "Favorite Fruit" with counts: Apple 12, Banana 8, Orange 6, Grape 4
t=1.0s: Data transforms into a bar graph — bars rise up with spring animation
t=2.0s: Same data morphs into a pie chart — slices fan out
t=3.0s: Text appears as line graph (looks wrong — line connecting categories makes no sense!)
t=4.0s: Red X over line graph. Text: "Wrong chart for this data!"
t=5.0s: Text: "Every chart tells a story. Choose the right one."
t=6.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Bar colors: varied pastels per category
- Correct chart: green border `#34d399`
- Wrong chart: red border `#f87171`

**Continue Trigger**: Appears after 6 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Purpose**: Students match data sets with the correct chart type.

**Scene Layout**:
```
+---------------------------------------------+
|  Data description:                           |
|  "Monthly temperatures Jan-June"             |
+---------------------------------------------+
|  Four chart type buttons:                    |
|  [Bar Graph] [Line Graph]                    |
|  [Histogram] [Pie Chart]                     |
+---------------------------------------------+
|  Preview: shows selected chart with data     |
|  (animated build of chart)                   |
+---------------------------------------------+
|  Feedback: "Line graph - correct! Shows      |
|  change over time."                          |
|  [Next Data Set]                             |
|  [Continue] (after 5 correct matches)        |
+---------------------------------------------+
```

**Data Sets** (6 scenarios):
1. "Favorite colors in class" → Bar Graph (categorical comparison)
2. "Temperature each month" → Line Graph (change over time)
3. "Test scores grouped by range" → Histogram (frequency distribution)
4. "Budget breakdown: rent, food, transport, savings" → Pie Chart (parts of whole)
5. "Number of books read per student" → Histogram (frequency distribution)
6. "Sales per product category" → Bar Graph (categorical comparison)

**Continue Trigger**: `correctCount >= 4 && interactions >= 6`

---

### 3.3 Guided Discovery (3-5 minutes)

**Prompts** (5 prompts):

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "BAR GRAPHS compare separate CATEGORIES. Each bar is a different thing." | Bar graph with labeled categories, gaps between bars | Categorical data → bar | "I see it!" |
| 2 | "LINE GRAPHS show how something CHANGES OVER TIME. The line connects the journey." | Line graph with time axis, smooth curve | Time-series → line | "I see it!" |
| 3 | "HISTOGRAMS group NUMBERS into ranges. Bars touch because ranges are continuous." | Histogram with touching bars, range labels | Numerical ranges → histogram | "I see it!" |
| 4 | "PIE CHARTS show PARTS OF A WHOLE. All slices must add up to 100%." | Pie chart with percentage labels summing to 100 | Parts of whole → pie | "Got it!" |
| 5 | "The key question: Is your data categories, time-series, numerical ranges, or parts of a whole?" | Decision flowchart | Data type → chart type | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

**Notation Sequence**:

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | Categories → Bar Graph | Category icons to bars | purple |
| 2 | Time Series → Line Graph | Clock icon to line | amber |
| 3 | Numerical Ranges → Histogram | Number range icon to histogram | cyan |
| 4 | Parts of Whole → Pie Chart | Circle icon to pie | green |

**Final Summary**: "Ask: What type of data? Then choose: Bar (categories), Line (time), Histogram (ranges), Pie (parts of whole)."

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

**Scenarios** (4 cards):

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Sports | Ball | "Points per game this season → Line Graph" | Time series tracking |
| Weather | Cloud | "Rain vs. sunshine days per month → Bar Graph" | Category comparison |
| School | Book | "Test score distribution → Histogram" | Frequency ranges |
| Allowance | Coins | "How you spend your money → Pie Chart" | Parts of whole = 100% |

**Continue Trigger**: Immediate (button always visible)

---

### 3.6 Practice (5-10 minutes)

**9 Problems**:

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "Which chart is best for comparing favorite pizza toppings?" | 4 options | "Bar graph" | "Pizza toppings are categories — bar graph is the best choice for comparing categories." |
| 2 | Recall | multiple-choice | "What makes histograms different from bar graphs?" | 4 options | "Histogram bars touch (continuous ranges)" | "Histograms show continuous ranges — bars touch. Bar graphs show separate categories — bars have gaps." |
| 3 | Recall | true-false | "A pie chart is good for showing change over time." | True/False | False | "False! Pie charts show parts of a whole. Use a line graph for change over time." |
| 4 | Procedure | multiple-choice | "Data: Student heights (140-145: 3, 145-150: 7, 150-155: 5). Which display?" | 4 options | "Histogram" | "Height ranges are continuous numerical data — histogram is the right choice." |
| 5 | Procedure | multiple-choice | "A bar graph shows: Math 25, Science 18, English 22, Art 15 students. Which subject is most popular?" | 4 options | "Math (25 students)" | "The tallest bar (Math, 25) represents the most popular subject." |
| 6 | Procedure | multiple-choice | "A pie chart shows: Rent 40%, Food 30%, Transport 20%, Other 10%. If total budget is $2000, how much for food?" | 4 options | "$600" | "30% of $2000 = 0.30 × 2000 = $600." |
| 7 | Understanding | multiple-choice | "Why would a line graph be misleading for 'favorite color' data?" | 4 options | "It implies order/connection between categories that doesn't exist" | "Line graphs suggest a trend between connected points — colors have no natural order." |
| 8 | Understanding | multiple-choice | "Why must pie chart slices sum to 100%?" | 4 options | "They represent ALL parts of one whole" | "A pie chart shows how one whole is divided — all parts together must equal the whole." |
| 9 | Understanding | multiple-choice | "A student uses a pie chart for 'temperature each month.' What's wrong?" | 4 options | "Temperatures aren't parts of a whole — use a line graph" | "Monthly temperatures are time-series data showing change, not parts of a total." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Your friend collected data about how students get to school (walk, bus, car, bike). They want to make a chart. Which type would you recommend and why?"

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
| bar1 | #818cf8 | Bar graph color 1 |
| bar2 | #f59e0b | Bar graph color 2 |
| bar3 | #34d399 | Bar graph color 3 |
| bar4 | #f87171 | Bar graph color 4 |
| line | #22d3ee | Line graph color |
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
// Single file: src/components/lessons/DataDisplaysLesson.tsx
// Named export: export function DataDisplaysLesson({ onComplete }: Props)
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
- SVG chart positions calculated mathematically (bar widths, pie arc paths)
