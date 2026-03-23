# NeuroMathica Gamification System Design

**Date**: 2026-03-22 | **Constitution Alignment**: All systems checked against 7 Core Principles + Pedagogical Framework

---

## 1. XP & Leveling System

### XP Sources & Weights

| Action | XP | Rationale |
|--------|-----|-----------|
| Complete lesson (all 7 NLS stages) | 100 base | Full pipeline completion |
| Reflection quality (AI-evaluated, Stage 7) | 0-80 bonus | HIGHEST single-action bonus — rewards explanation, not speed [CP-I] |
| Interactive exploration (Stage 2) | 20-40 bonus | Rewards genuine manipulation diversity (tried negatives? extremes?) [PF-3] |
| Guided discovery insight (Stage 3) | 30 bonus | Identified relationship before AI revealed it |
| Practice set completion (Stage 6) | 50 base | Interleaved problems, not blocked drills [PF-5] |
| Explanation badge (AI rates "teaches the concept") | 50-100 bonus | Deep understanding demonstration |
| Spaced repetition review session | 30 per session | Returning at optimal spacing [PF-4] |
| Peer help (verified by helped student) | 40-80 | Confirmed improvement in understanding |
| Real-world connection (photo + explanation, AI-verified) | 60 | Anchoring concepts to the world |
| Daily consistency | 15 | Deliberately small vs understanding-based XP |
| Cross-topic connection | 75 | Identifies how topics relate [CP-III] |

**Design constraint**: No XP for speed. Zero. Speed bonuses contradict PF-6 (Math Anxiety Reduction).

### XP Multipliers

| Multiplier | Value | Trigger |
|------------|-------|---------|
| Deep Dive | 1.5× | >2 min in spatial exploration beyond minimum |
| Connection Maker | 1.3× | References prior concept in reflection |
| Struggle Bonus | 1.4× | Got wrong → retried → explained correctly |
| First Try Clarity | 1.2× | First explanation attempt rated high-quality |

NO speed multiplier. NO "complete in under X minutes" bonus.

### Level System: The Neuron Scale (1-100)

| Tier | Levels | Name | Theme | Mathematical Competence |
|------|--------|------|-------|------------------------|
| 1 | 1-10 | Spark | Single neuron firing | Foundational number sense, basic operations |
| 2 | 11-20 | Signal | Electrical signal | Fractions/decimals mastery, coordinate plane |
| 3 | 21-30 | Synapse | Connections forming | Linear relationships, proportional reasoning |
| 4 | 31-40 | Circuit | Neural circuits | Equation solving, data & statistics |
| 5 | 41-50 | Network | Neural network | Systems, transformations, probability |
| 6 | 51-60 | Cortex | Brain region activation | Quadratics, exponential thinking |
| 7 | 61-70 | Hemisphere | Half-brain integration | Trig foundations, polynomials |
| 8 | 71-80 | Resonance | Full-brain sync | Functions & modeling |
| 9 | 81-90 | Architect | Building structures | Pre-calculus, mathematical modeling |
| 10 | 91-100 | Transcendent | Beyond limits | Advanced integration, proof construction |

**Tier Boundary Gates**: Require BOTH XP threshold AND competence demonstration:
- 3 problems of increasing difficulty
- 1 explanation prompt ("Explain [concept] as if teaching a younger student")
- 1 connection prompt ("How does [concept A] relate to [concept B]?")
- NO timer. Student can take as long as needed [PF-6]

---

## 2. Streak System: "Neural Pulse"

### Earning a Streak Day (requires ANY ONE)

- Complete ≥1 full lesson (all 7 NLS stages)
- Complete spaced repetition review (minimum 5 items)
- Write quality reflection (AI-rated ≥ 3/5)
- Help a peer (confirmed helpful)
- Complete challenge problem with explanation

NOT earned by: just logging in, answering one easy question, or opening/closing a lesson without engaging.

### Streak Rewards

| Streak | Reward |
|--------|--------|
| 3 days | "Neural Pulse" badge lights up, 50 XP |
| 7 days | Streak shield unlocked, 200 XP |
| 14 days | Profile frame "Consistent Thinker", 400 XP |
| 30 days | Exclusive avatar item, 800 XP |
| 60 days | Rare profile effect, 1500 XP |
| 100 days | Legendary status marker, 3000 XP |
| 365 days | "Annual Architect" badge — extremely rare |

### Five-Layer Streak Protection (HUMANE, not punitive)

**1. Automatic Weekend Grace.** Students configure learning schedule (weekdays only, 6 days, every day). Non-scheduled days do NOT break streak.

**2. Streak Shields.** Earned per 7-day streak. Max stockpile: 3. Auto-activates on missed scheduled day. NEVER purchasable with money.

**3. Streak Repair.** If broken, 48-hour window to repair by completing double session. Streak restored with small visual indicator (healed crack). Max 2 repairs per 30-day period.

**4. Streak Decay, Not Death.** After break >48hrs: drops 1/day missed, floor at 50% of peak. Example: 30-day streak, miss 4 days = 26 (not 0). Re-ignite with 3 consecutive days.

**5. Break Mode.** Explicit pause up to 14 days (vacation, exams, mental health). Streak freezes, resumes exactly. No penalty, no guilt. Gentle "welcome back" message.

### Anti-Anxiety Design

- Streak is NOT the most prominent screen element (unlike Duolingo's flame)
- Appears in profile section, not home screen hero
- Push notifications about streaks are opt-in, not default
- Language always positive: "Keep your pulse going!" not "Don't lose your streak!"
- No "sad owl" equivalent. No guilt-based re-engagement [PF-6]

---

## 3. Achievement System

### 6 Categories

#### Exploration (Electric Blue)

| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| First Light | Complete first lesson | Common |
| Cartographer | Explore 5 topic areas on knowledge map | Common |
| Edge Walker | Test 10+ edge cases in spatial exploration | Uncommon |
| Bridge Builder | Identify connection system hadn't linked | Rare |
| Dimension Hopper | Lessons in 3 domains in one day | Uncommon |
| The Questioner | Ask AI tutor 50 "why" questions | Uncommon |
| Uncharted | Among first 100 to complete new lesson | Rare |
| Polymath | Active progress in 8+ topic areas | Rare |

#### Mastery (Gold)

| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Solid Ground | 90%+ on topic mastery assessment (incl. explanation) | Common |
| The Teacher | Explanation rated 5/5 by AI | Uncommon |
| Pythagorean Explorer | Find & photograph 5 real-world right triangles | Rare |
| Fraction Whisperer | Explain fractions via 3 visual models | Uncommon |
| Equation Architect | Solve system AND explain geometric meaning | Rare |
| Zero Hero | Explain division by zero 3 different ways | Rare |
| Proof Constructor | Construct valid mathematical proof | Epic |
| The Explainer | 10 explanations rated 5/5 | Epic |
| Function Detective | Identify function type from real dataset | Rare |

#### Creativity (Purple)

| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Another Way | Solve using different method than taught | Uncommon |
| Pattern Hunter | Identify pattern before lesson reveals it | Uncommon |
| Storyteller | Write valid real-world story problem (AI-verified) | Rare |
| Elegant Solution | Solve in significantly fewer steps | Epic |
| Math Artist | Create design demonstrating math principle | Rare |
| Conjecture Maker | Propose non-trivial conjecture AI confirms | Legendary |

#### Persistence (Amber)

| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Second Wind | Wrong → review → solve harder version correctly | Common |
| Unbreakable | 30-day Neural Pulse streak | Uncommon |
| Debugging Mind | Correctly identify and explain own error | Rare |
| Marathon Thinker | 20+ minutes on one problem, eventually solved | Rare |
| Growth Graph | Explanation quality +2 points over 30 days | Epic |
| Iron Pulse | 100-day streak | Epic |
| Phoenix | Lose streak → repair → extend 30+ days beyond | Rare |
| Iteration Master | Revise explanation 3+ times with improving clarity | Uncommon |

#### Collaboration (Green)

| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| First Assist | Help another, receive "this helped" | Common |
| Peer Tutor | 5 students confirm understanding improved | Rare |
| The Translator | Explain concept differently than lesson did | Rare |
| Hive Mind | Team completes collaborative multi-step problem | Uncommon |
| Community Pillar | 20 "this helped" confirmations | Epic |

#### Discovery (Cyan)

| Achievement | Requirement | Rarity |
|-------------|-------------|--------|
| Eyes Open | Submit first real-world math sighting | Common |
| Urban Geometer | Document 5 geometric patterns in your area | Uncommon |
| Data Detective | Collect real data and correctly analyze with stats | Rare |
| Nature's Numbers | Find Fibonacci, golden ratio, or fractal in nature | Rare |
| Sports Analyst | Use stats/geometry to analyze a real sports play | Rare |
| Math is Everywhere | Earn from 5 real-world categories | Legendary |

### Rarity Tiers

| Rarity | Earn Rate | Visual | Shareability |
|--------|-----------|--------|-------------|
| Common | ~60% | Subtle glow, white border | Not shareable |
| Uncommon | ~30% | Blue glow, animated border | Profile shareable |
| Rare | ~10% | Purple glow, particle effect | Custom card image |
| Epic | ~3% | Gold glow, animated background | Animated card |
| Legendary | <1% | Prismatic holographic | Auto-generated trading card with avatar, date, QR code |

---

## 4. Progress Visualization: Knowledge Nebula

### Space/Constellation Metaphor

5 color-coded constellations forming the curriculum graph:
- **Numbers & Operations**: warm orange/red
- **Number Theory**: amber
- **Algebra**: electric blue
- **Geometry**: green/teal
- **Statistics & Probability**: purple

### Topic States

| State | Visual | Description |
|-------|--------|-------------|
| LOCKED | Dim star, subtle outline | Prerequisites not met. Tap to see what's needed |
| AVAILABLE | Pulsing softly, brighter | Ready to explore |
| IN PROGRESS | Glowing, ring showing % | Actively learning |
| MASTERED | Full brightness + constellation lines | Completed with understanding |
| REVIEW DUE | Slightly dimmed pulse | Spaced repetition review needed [PF-4] |

### Interactions

- Pinch to zoom: overview → individual topics → sub-skills [DR-5]
- Tap locked star: shows prerequisites with glowing path, estimated time, preview (Hook content)
- Tap mastered star: mastery date, explanation quality, connected topics, review option
- Small animated ship shows suggested "next star" path (advisory, not mandatory)
- When all topics in cluster mastered: constellation "completes" with animation

### Progress Bars (The Honest Approach)

Two-layer visualization:
1. **Topics Explored** (top bar): "7 of 10 algebra topics started" — always moving forward
2. **Depth Meter** (bottom bar): "Average mastery: 73%" — honest about understanding

Depth gradient: green (80-100%), blue (60-79%), yellow (40-59%). NEVER red. NEVER "failing" color [PF-6].

---

## 5. Social & Competitive Elements

### Leaderboard Design (Opt-In, Multi-Dimensional)

- **NO global leaderboard.** No "top student" ranking.
- **Study Circle leaderboards** (3-8 friends, opt-in): Weekly Understanding Score = explanation quality (40%) + concepts mastered (30%) + reviews completed (20%) + peer help (10%)
- **Class leaderboards**: teacher-controlled, teacher chooses metric
- **Personal Bests**: always visible — compete against yourself
- **Collaborative**: Study Circle vs other circles (average score, incentivizes helping weakest member)

**NEVER on leaderboard**: speed of completion, raw problem count, individual class ranking without teacher opt-in.

### Friend Challenges

- **"Mind Meld"**: Both solve same problems, compare APPROACHES not speed. "Your friend used method X — explain why both work"
- **"Teach Me"**: Student A explains to B, B takes assessment. Both earn XP
- **"Real-World Race"**: 1 week to find best real-world example. Community votes
- **"Constellation Quests"**: Multi-step group problems requiring different math skills

---

## 6. Reward Mechanics

### Core Principle

Rewards are cosmetic/expressive ONLY. Never capability-gating. Zero-reward student has identical learning experience to max-reward student [CP-IV].

### Avatar System ("Neural Avatar")

| Category | Examples | How Earned |
|----------|----------|------------|
| Base Styles | 8 body types, skin tones, hair | At signup (inclusive) |
| Math Wear | Hoodies with equation designs | Every 5 levels |
| Neural Effects | Glowing aura, particle trail, holographic | Tier boundaries (every 10 levels) |
| Topic Badges | Pinnable mastery badges | Topic mastery completion |
| Achievement Frames | Profile frames | Specific achievements |
| Animated Backgrounds | Mathematical patterns (fractals, tessellations) | Streak milestones |

### Theme System

| Theme | Unlock |
|-------|--------|
| Default Dark/Light | At signup |
| Midnight Circuit (navy + neon blue) | Level 10 |
| Solar Flare (dark + warm orange/gold) | Level 20 |
| Deep Space (black + starfield) | Level 30 |
| Holographic (iridescent) | Level 40 |
| Matrix Green (terminal aesthetic) | 10 algebra topics |
| Coral Reef (oceanic teals) | 10 geometry topics |
| Aurora (northern lights gradient) | 60-day streak |
| Custom (full color picker) | Level 50+ |

ALL themes MUST maintain WCAG 2.1 AA contrast ratios [CP-IV].

### Visualization Mode Unlocks

| Mode | Description | Unlock |
|------|-------------|--------|
| Wireframe | Blueprint-style spatial explorations | Geometry mastery tier |
| Particle Mode | Shapes rendered as particle systems | Level 35+ |
| Neon Glow | All math objects with neon rendering | Level 25+ |
| X-Ray | See inside 3D shapes with transparency | Geometry achievement |
| Sketch Mode | Hand-drawn rendering style | Creativity achievement set |

### Currency: "Neurons"

- Earned: 100 XP = 10 Neurons
- Spent on: cosmetics in avatar shop ONLY
- CANNOT be purchased with real money
- CANNOT buy streak shields, XP boosts, or any gameplay advantage
- Revenue model: subscription-based (parent/school flat fee), NOT microtransactions

### "Aha Moment" Celebrations

**Detection signals**:
- Got wrong 2+ times → got right AND wrote quality explanation
- >3 min in spatial exploration → correctly identified relationship
- Explanation quality score jumped significantly
- Connected two previously unconnected concepts

**Response** (brief, not interruptive):
1. **Neuron Flash**: brief neural network animation from answer area
2. **The Quote**: "That's the connection!" — celebrates understanding, not correctness
3. **Reflection Prompt**: "What clicked?" — captures the aha moment [CP-I]
4. **Struggle Badge**: "This took X attempts. Understanding is STRONGER because it was hard"
5. **Optional Share**: generates shareable card

**Routine correct answers**: just a clean checkmark. Celebration is RESERVED for understanding, not routine correctness.

---

## 7. Anti-Patterns: BANNED

### Timer Pressure — BANNED [PF-6]

No countdown timers on any problem. No "solve in under 60 seconds" bonuses. No speed-based XP. No visual urgency indicators. Session duration tracked for analytics but NEVER shown to student.

### Pay-to-Win — BANNED

No selling XP boosts, streak shields, hint tokens, skip tokens. No locking curriculum behind paywalls. No loot boxes or gacha. No "energy" systems. No limited-time purchase urgency.

### Punishment — BANNED

No losing XP for wrong answers. No losing levels. No losing cosmetics. No "lives" system. No red/negative scoring. No public shame. No guilt notifications.

- Wrong answer → "Interesting approach! Let's explore why that doesn't quite work here."
- Inactivity → "We've been working on cool new lessons while you were away."
- Struggle → "This is tough. Most mathematicians took a while with this too."

### Addictive Dark Patterns — BANNED

No infinite scroll. No variable ratio reinforcement (slot machine mechanics). No "one more" exploitation loops. Push notifications max 1/day, learning content only. Session cap at 45 minutes with gentle suggestion. Screen time dashboard visible to student and parent/guardian.

### Social Comparison Anxiety — MANAGED

No rank without opt-in. No "X students solved this faster." No competitive push notifications by default. All social features opt-in.

---

## 8. Visual Identity for Teens

| Element | Direction |
|---------|-----------|
| Default mode | Dark (deep navy/charcoal + electric accents: neon blue, cyan, magenta, amber) |
| Typography | Clean geometric sans-serif (Inter/Space Grotesk) + monospace for equations. Dyslexia alternative available [CP-IV] |
| Icons | Minimal line-art, not cartoon |
| Animations | Physics-based (spring, inertia), not bounce/wobble |
| Illustrations | Abstract geometric art, neural network visuals — NOT cartoons/clipart |
| Containers | Glassmorphism / frosted glass with blur |
| Sound — correct | Short sine wave + click (subtle, satisfying) |
| Sound — aha moment | Resonant chord progression (major resolve, discovery feel) |
| Sound — wrong | Soft lower-pitch tone (NOT a buzzer, NOT negative) [PF-6] |
| Sound — level up | Crescendo, electronic/orchestral hybrid |

**Visual tone references**: Arc Browser, Discord, Spotify, Linear, Valorant UI

---

## 9. Onboarding (First 5 Minutes)

| Time | Stage | Content |
|------|-------|---------|
| 0:00-0:30 | Hook (no signup) | Stunning fractal/Mandelbrot zoom, interactive. "Every shape from one equation: z = z² + c" |
| 0:30-1:30 | Taste | Micro-lesson: drag right triangle vertices, watch area squares animate, discover Pythagorean relationship |
| 1:30-2:30 | Identity | Quick avatar creation, theme choice, choose starting star |
| 2:30-4:00 | First Star | Condensed lesson, first star lights up, "Spark I" |
| 4:00-5:00 | Social Hook | "Know anyone learning math? Start a Study Circle" — share code, or skip |

**Critical**: Account creation happens AFTER hook and taste, not before.

---

## 10. Implementation Data Model

```typescript
// Core types for gamification engine

type XpSource =
  | 'lesson_completion'       // 100 base
  | 'reflection_quality'      // 0-80 bonus
  | 'interactive_exploration' // 20-40 bonus
  | 'guided_discovery_insight'// 30 bonus
  | 'practice_completion'     // 50 base
  | 'explanation_badge'       // 50-100 bonus
  | 'spaced_repetition_review'// 30 per session
  | 'peer_help'               // 40-80
  | 'real_world_connection'   // 60
  | 'daily_consistency'       // 15
  | 'cross_topic_connection'  // 75
  | 'achievement_bonus';

type AchievementCategory =
  | 'exploration' | 'mastery' | 'creativity'
  | 'persistence' | 'collaboration' | 'discovery';

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

type TopicStatus = 'locked' | 'available' | 'in_progress' | 'mastered' | 'review_due';

type EmotionalState = 'engaged' | 'productive_struggle' | 'frustrated' | 'bored';

interface XpCalculation {
  base: number;
  reflectionBonus: number;         // 0-80 from AI evaluation
  explorationBonus: number;        // 20-40 from manipulation diversity
  discoveryBonus: number;          // 0 or 30
  multiplier: number;              // product of applicable multipliers
  total: number;                   // floor((base + bonuses) * multiplier)
  neuronsEarned: number;           // floor(total / 10)
}

interface StreakConfig {
  mode: 'daily' | 'weekday' | 'custom';
  scheduledDays: number[];         // 0=Sun through 6=Sat
  shieldsMax: 3;
  decayFloorPercent: 0.5;          // Never below 50% of peak
  repairWindowHours: 48;
  repairsPerMonth: 2;
  breakMaxDays: 14;
}

interface LevelConfig {
  tierSize: 10;                    // 10 levels per tier
  tiers: Array<{
    name: string;                  // "Spark", "Signal", etc.
    xpPerLevel: number;            // XP needed per level within tier
    gateRequired: boolean;         // Competence check at tier boundary
  }>;
}
```

---

## Constitution Compliance

| Principle | How This System Complies |
|-----------|-------------------------|
| CP-I: Understanding Over Memorization | XP weighted toward explanation (0-80) over practice (50). Tier gates require explanation |
| CP-II: Visual First, Symbolic Second | Knowledge Nebula is primary progress view. Exploration XP rewards spatial interaction |
| CP-III: No Dead-End Content | Graph visualization shows connections. Cross-topic XP. Bridge Builder achievement |
| CP-IV: Accessibility | All themes WCAG 2.1 AA. Sound mutable. Cosmetics non-functional. Touch targets ≥44px |
| CP-V: Performance Is UX | Celebrations brief and non-blocking. Nebula renders progressively |
| CP-VI: Privacy by Design | No real names in social. Shareable cards use avatars. Study Circles self-selected |
| CP-VII: Open Curriculum, Proprietary Platform | Achievement criteria and XP formulas are proprietary |
| PF-6: Math Anxiety Reduction | NO timers, NO punishment, streak decay not death, wrong answers neutral, celebrations reward struggle |
