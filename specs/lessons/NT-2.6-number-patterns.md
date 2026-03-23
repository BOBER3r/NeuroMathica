# Lesson Design — NT-2.6 Number Patterns

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `NT-2.6` |
| **Name** | Number Patterns |
| **Grade** | 6 |
| **Domain** | number-theory |
| **Prerequisites** | NT-2.1 (Factors & Multiples) |
| **Successors** | AL-3.1 (Variables & Expressions) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/NumberPatternsLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Number patterns follow rules — arithmetic sequences add the same amount each time, geometric sequences multiply by the same amount, and finding the rule lets you predict any term.

### 1.2 Learning Objectives
- Students can identify arithmetic sequences (constant difference) and geometric sequences (constant ratio)
- Students can determine the common difference or common ratio
- Students can predict the next term(s) in a pattern
- Students can explain the rule generating a given sequence
- Students understand the difference between additive and multiplicative patterns

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "All patterns are arithmetic" | Most early examples are additive | Show geometric sequences side by side |
| "The rule is just the next number" | Focus on individual terms, not the pattern | Highlight the differences/ratios between terms |
| "You can only find the next term, not any term" | Haven't generalized the rule | Show how the rule lets you jump to the 100th term |
| "Decreasing sequences aren't patterns" | Associate patterns with growth | Include sequences that subtract or divide |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | Growing dot pattern begs: "what comes next?" |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Build sequences by adding blocks |
| Discovery | Prefrontal | Pattern recognition | Insight | Discovers constant difference vs constant ratio |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | a_n = a_1 + (n-1)*d, a_n = a_1 * r^(n-1) |
| Real World | Hippocampus | Episodic memory | Relevance | Stacking chairs, doubling bacteria, savings |
| Practice | Basal ganglia | Procedural encoding | Mastery | Identify rule, predict terms |
| Reflection | Prefrontal | Metacognition | Pride | Why patterns are powerful |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: Dots appear: 2, 4, 6, 8, ...
t=1.5s: The "?" appears for the next term
t=2.5s: Answer "10" fills in with a pop
t=3.0s: New sequence appears: 3, 6, 12, 24, ...
t=4.5s: "?" appears — this one grows much faster!
t=5.5s: Answer "48" fills in
t=6.0s: Text: "One adds. One multiplies. Both follow rules."
t=7.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Arithmetic sequence: `#34d399`
- Geometric sequence: `#f59e0b`
- Question mark: `#f87171` pulsing

**Continue Trigger**: Appears after 7 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Scene Layout**:
```
+-------------------------------+
|  Sequence display: _ _ _ _ ?  |
|  (blocks/dots showing terms)  |
+-------------------------------+
|  Rule selector:                |
|    [+2] [+3] [+5] [*2] [*3]  |
|  Starting number: [1-10]      |
|  "Generate" button            |
+-------------------------------+
|  Generated sequence shown      |
|  Interaction dots  | Continue  |
+-------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap rule button | Tap | Highlights selected rule | `rule` changes |
| Tap starting number | Tap | Number updates with spring | `start` changes |
| Tap Generate | Tap | Sequence builds term by term with stagger animation | `sequence` updates |

**Constraints**: Min 8 interactions to unlock continue.

**Continue Trigger**: `interactions >= 8`

---

### 3.3 Guided Discovery (3-5 minutes)

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Look at 2, 5, 8, 11. What's the difference between each pair?" | Difference arrows appear: +3, +3, +3 | Constant difference | "I see it!" |
| 2 | "Now look at 2, 6, 18, 54. What's the ratio between each pair?" | Ratio arrows appear: x3, x3, x3 | Constant ratio | "I see it!" |
| 3 | "Adding the same number = arithmetic. Multiplying by the same number = geometric. The rule predicts ANY term!" | Both sequences side by side with labels | Two pattern types | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | d = difference between terms | Arrows labeled +d between terms | #34d399 |
| 2 | Arithmetic: next = current + d | Formula overlaid on sequence | #60a5fa |
| 3 | r = ratio between terms | Arrows labeled x r between terms | #f59e0b |
| 4 | Geometric: next = current * r | Formula overlaid on sequence | #818cf8 |

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Savings Account | Piggy bank icon | "Save $5/week: 5, 10, 15, 20..." | Arithmetic, d = 5 |
| Bacteria Growth | Microscope icon | "Bacteria double every hour: 1, 2, 4, 8..." | Geometric, r = 2 |
| Stacking Chairs | Chair icon | "Each row adds 2 more chairs" | Arithmetic, d = 2 |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "3, 7, 11, 15, ... What type of sequence?" | 2 options | "Arithmetic" | "The difference is constant: +4 each time." |
| 2 | Recall | multiple-choice | "2, 6, 18, 54, ... What type of sequence?" | 2 options | "Geometric" | "The ratio is constant: multiply by 3 each time." |
| 3 | Recall | numeric-input | "4, 9, 14, 19, _. What comes next?" | Number | 24 | "The common difference is +5. So 19 + 5 = 24." |
| 4 | Procedure | numeric-input | "1, 3, 9, 27, _. What comes next?" | Number | 81 | "The common ratio is 3. So 27 * 3 = 81." |
| 5 | Procedure | numeric-input | "10, 7, 4, 1, _. What comes next?" | Number | -2 | "The common difference is -3. So 1 + (-3) = -2." |
| 6 | Procedure | multiple-choice | "What is the common difference of 6, 11, 16, 21?" | 4 options | "5" | "11 - 6 = 5, 16 - 11 = 5. The difference is 5." |
| 7 | Understanding | multiple-choice | "Which grows faster: arithmetic (+3) or geometric (*3), starting from 1?" | 2 options | "Geometric" | "Geometric: 1, 3, 9, 27 vs Arithmetic: 1, 4, 7, 10. Multiplying outpaces adding." |
| 8 | Understanding | multiple-choice | "5, 10, 20, 40 — the common ratio is..." | 4 options | "2" | "10/5 = 2, 20/10 = 2, 40/20 = 2. Multiply by 2 each time." |
| 9 | Understanding | multiple-choice | "Can a sequence be both arithmetic and geometric?" | 3 options | "Only if all terms are equal (like 5, 5, 5, 5)" | "A constant sequence has d = 0 and r = 1, satisfying both definitions." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "Describe a pattern you see in your everyday life. Is it arithmetic, geometric, or something else?"

**Rules**: Minimum 20 characters, not graded, skip available.

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| arithmetic | #34d399 | Arithmetic sequences |
| geometric | #f59e0b | Geometric sequences |
| difference | #60a5fa | Difference arrows |
| primary | #818cf8 | Buttons, accent |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
```
