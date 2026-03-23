# Lesson Design — SP-5.4 Probability Basics

---

## 0. Metadata

| Field | Value |
|-------|-------|
| **Concept ID** | `SP-5.4` |
| **Name** | Probability Basics |
| **Grade** | 7 |
| **Domain** | statistics-probability |
| **Prerequisites** | SP-5.1 (Mean, Median, Mode) |
| **Successors** | SP-5.5 (Compound Events) |
| **Duration** | 25 minutes |
| **Component File** | `src/components/lessons/ProbabilityLesson.tsx` |

---

## 1. Learning Design

### 1.1 Core Insight (1 sentence)
> Probability measures how likely an event is on a scale from 0 (impossible) to 1 (certain), calculated as the number of favorable outcomes divided by total possible outcomes.

### 1.2 Learning Objectives
- Students can define probability as favorable outcomes / total outcomes
- Students can identify sample spaces for simple experiments (coins, dice, spinners)
- Students can calculate theoretical probability for single events
- Students understand the difference between theoretical and experimental probability
- Students can express probability as a fraction, decimal, and percent

### 1.3 Common Misconceptions

| Misconception | Why Students Have It | How We Address It |
|---------------|---------------------|-------------------|
| "If I flip 3 heads, the next must be tails" | Gambler's fallacy — expecting balance | Simulate many flips and show each is independent |
| "Probability of 1/6 means I'll get it in 6 tries" | Confusing probability with guarantee | Run experiments showing variation |
| "More outcomes = higher probability" | Confusing total with favorable | Highlight the ratio: favorable/total |
| "Unlikely means impossible" | Binary thinking | Scale from 0 to 1 with examples |

---

## 2. Neuroscience Framework

### 2.1 Stage-by-Stage Cognitive Architecture

| Stage | Brain Region | Cognitive Process | Emotional Target | Why This Order |
|-------|-------------|-------------------|------------------|----------------|
| Hook | VTA/dopamine | Novelty detection | Curiosity | Spin a wheel — can you predict the result? |
| Spatial | Parietal (IPS) | Spatial reasoning | Engagement | Build sample spaces, run experiments |
| Discovery | Prefrontal | Pattern recognition | Insight | Experimental results approach theoretical probability |
| Symbol | Angular gyrus | Symbolic encoding | Confidence | P(E) = favorable / total |
| Real World | Hippocampus | Episodic memory | Relevance | Weather forecasts, games, sports |
| Practice | Basal ganglia | Procedural encoding | Mastery | Calculate probabilities |
| Reflection | Prefrontal | Metacognition | Pride | What probability really means |

---

## 3. Stage Specifications

### 3.1 Hook (30-60 seconds)

**Animation Script**:
```
t=0.0s: A colorful spinner appears (4 equal sections: red, blue, green, yellow)
t=1.0s: Spinner spins and lands on blue
t=2.0s: Text: "Could you predict that?"
t=3.0s: Spinner spins again — lands on red
t=4.0s: Text: "How about now? Can you predict the next one?"
t=5.0s: Text: "You can't predict exactly, but you CAN measure how likely each color is."
t=6.0s: Continue button fades in
```

**Visual Design**:
- Background: `#0f172a`
- Spinner sections: red `#f87171`, blue `#60a5fa`, green `#34d399`, yellow `#fbbf24`
- Text: `#f8fafc`

**Continue Trigger**: Appears after 6 seconds

---

### 3.2 Spatial Experience (2-4 minutes)

**Scene Layout**:
```
+-------------------------------+
|  Spinner / Die / Coin selector|
+-------------------------------+
|  Visual: spinner/die/coin      |
|  [Spin / Roll / Flip] button  |
|  Results tally below           |
|  Fraction display: X out of Y |
+-------------------------------+
|  Interaction dots  | Continue  |
+-------------------------------+
```

**Interactions**:

| Interaction | Input | Visual Feedback | State Change |
|-------------|-------|-----------------|--------------|
| Tap Spin/Roll/Flip | Tap | Animation plays, result highlights | `results` grows, `tally` updates |
| Tap experiment selector (Coin/Die/Spinner) | Tap | Visual switches with morph animation | `experiment` changes |

**Constraints**: Min 10 experiments to unlock continue.

**Continue Trigger**: `interactions >= 10`

---

### 3.3 Guided Discovery (3-5 minutes)

| # | Prompt Text | Visual | Insight Target | Button Text |
|---|-------------|--------|----------------|-------------|
| 1 | "Look at your results. Are all outcomes equally likely with a fair die?" | Tally chart highlighted, theoretical = 1/6 each | Equal likelihood | "I see it!" |
| 2 | "Theoretical probability is what SHOULD happen. Experimental is what DID happen. With more trials, they get closer!" | Side-by-side theoretical vs experimental bars | Theoretical vs experimental | "I see it!" |
| 3 | "Probability = favorable outcomes / total outcomes. For a die showing even: 3 favorable (2,4,6) out of 6 total = 3/6 = 1/2." | Formula builds with labeled parts | P = favorable/total | "Got it!" |

---

### 3.4 Symbol Bridge (2-3 minutes)

| Step | Notation | Visual Connection | Color |
|------|----------|-------------------|-------|
| 1 | P(Event) = favorable / total | Formula with labeled arrows | #818cf8 |
| 2 | 0 = impossible, 1 = certain | Number line from 0 to 1 | #f59e0b |
| 3 | P(heads) = 1/2 = 0.5 = 50% | Coin with fraction/decimal/percent | #34d399 |

**Continue Trigger**: All notation revealed

---

### 3.5 Real World Anchor (1-2 minutes)

| Scenario | Icon | Example | Highlighted Math |
|----------|------|---------|-----------------|
| Weather Forecast | Cloud icon | "30% chance of rain means P(rain) = 0.3" | Percent to decimal |
| Board Games | Dice icon | "Probability of rolling a 6: 1/6" | P = 1/6 |
| Basketball | Basketball icon | "A player makes 80% of free throws: P(make) = 0.8" | Experimental probability |

**Continue Trigger**: Immediate

---

### 3.6 Practice (5-10 minutes)

| # | Layer | Type | Prompt | Answer Format | Correct Answer | Feedback |
|---|-------|------|--------|---------------|----------------|----------|
| 1 | Recall | multiple-choice | "Probability is calculated as..." | 4 options | "Favorable outcomes / Total outcomes" | "Count the outcomes you want, divide by all possible outcomes." |
| 2 | Recall | multiple-choice | "A probability of 0 means the event is..." | 4 options | "Impossible" | "0 = can never happen. 1 = always happens." |
| 3 | Recall | multiple-choice | "The sample space for flipping a coin is..." | 4 options | "{Heads, Tails}" | "The sample space lists all possible outcomes." |
| 4 | Procedure | multiple-choice | "P(rolling a 3 on a standard die) = ?" | 4 options | "1/6" | "One favorable outcome (3) out of six total: 1/6." |
| 5 | Procedure | multiple-choice | "A bag has 3 red and 5 blue marbles. P(red) = ?" | 4 options | "3/8" | "3 favorable (red) out of 8 total: 3/8." |
| 6 | Procedure | numeric-input | "A spinner has 8 equal sections, 2 are green. What is P(green) as a percent?" | Number | 25 | "P(green) = 2/8 = 1/4 = 25%." |
| 7 | Understanding | multiple-choice | "You flip a coin 5 times and get 5 heads. The probability of heads on the 6th flip is..." | 4 options | "1/2" | "Each flip is independent. Past results don't change future probability." |
| 8 | Understanding | multiple-choice | "Theoretical vs experimental probability: as you do more trials..." | 4 options | "Experimental gets closer to theoretical" | "The Law of Large Numbers: more trials = closer to theoretical." |
| 9 | Understanding | multiple-choice | "Which probability is impossible?" | 4 options | "P = -0.5" | "Probability is always between 0 and 1 (inclusive). Negative probabilities don't exist." |

---

### 3.7 Reflection (1-2 minutes)

**Prompt**: "In your own words, explain the difference between theoretical and experimental probability. Why might they be different?"

**Rules**: Minimum 20 characters, not graded, skip available.

---

## 4. Visual Design Specs

### 4.1 Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| spinner-red | #f87171 | Red section |
| spinner-blue | #60a5fa | Blue section |
| spinner-green | #34d399 | Green section |
| spinner-yellow | #fbbf24 | Yellow section |
| probability | #818cf8 | Formula accent |
| primary | #8b5cf6 | Buttons |

### 4.2 Animation Presets
```typescript
const SPRING = { type: "spring" as const, damping: 20, stiffness: 300 };
```
