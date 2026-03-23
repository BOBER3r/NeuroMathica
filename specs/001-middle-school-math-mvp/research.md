# Research: Middle School Math MVP

**Branch**: `001-middle-school-math-mvp` | **Date**: 2026-03-22

## 1. Visualization Technology Stack

### Decision: SVG + Framer Motion (primary) + React Three Fiber (3D) + Rive (polish)

**Rationale**: 80%+ of middle school math content is 2D (number lines, coordinate
planes, geometric shapes, fraction bars). SVG elements live in the DOM, providing
the best accessibility story (ARIA labels, keyboard focus, screen reader traversal)
which is mandated by Constitution Principle IV. Framer Motion's declarative
`<motion.circle>` API maps directly to content author JSON configs (DR-4).

For the ~20% of content requiring 3D (volume visualization, 3D solids,
cross-sections, surface area nets), React Three Fiber provides the same React
component model, keeping the mental model consistent for developers.

Rive handles non-mathematical animations: AI tutor character expressions, page
transitions, celebration animations, loading states.

**Alternatives considered**:
- **Three.js/R3F for everything**: Overkill for 2D, worse accessibility (canvas
  is opaque to screen readers), 220KB+ minimum bundle
- **PixiJS**: Best raw 2D performance but zero math primitives, poor React
  integration, no DOM accessibility
- **Konva.js**: Good React integration but Canvas2D performance ceiling risks
  failing 55fps P95 on complex scenes
- **D3.js as renderer**: React integration friction too high; used as computation
  layer only (d3-scale, d3-shape, d3-interpolate, d3-ease ~15KB)
- **Motion Canvas**: Excellent Manim-inspired API but not interactive, not
  embeddable in React. Study its API patterns, don't adopt its runtime.

### Custom Abstraction: `<MathScene>` Component

Auto-selects SVG or R3F based on scene content. Provides built-in math
primitives: `<CoordinateGrid>`, `<Axes>`, `<FunctionPlot>`, `<NumberLine>`,
`<GeometricShape>`, `<Vector>`, `<Angle>`, `<FractionBar>`. Declarative
animation sequencing inspired by Motion Canvas. JSON-serializable for AI tutor
scene generation.

### Math Rendering: KaTeX

~100x faster than MathJax. Synchronous rendering critical for mid-animation
equation appearance. Structured HTML output enables per-symbol animation with
Framer Motion (highlight, morph, fade). Middle school math uses a small LaTeX
subset — KaTeX covers it trivially.

### Bundle Budget

| Package | Gzipped | Loading |
|---------|---------|---------|
| framer-motion | ~30KB | Eager |
| @use-gesture/react | ~5KB | Eager |
| KaTeX + fonts | ~100KB | Eager |
| d3 modules (scale, shape, interpolate, ease) | ~15KB | Eager |
| react-spring | ~20KB | Eager |
| **Initial load** | **~170KB** | |
| three.js + R3F + drei | ~220KB | Lazy (3D scenes only) |
| @rive-app/react-canvas | ~60KB | Lazy (tutor character) |

---

## 2. Mobile Architecture

### Decision: PWA-first + Capacitor for App Store distribution

**Rationale**: The animation engine is WebGL/SVG-based. Any approach that forces
rewriting the rendering pipeline is disqualified. React Native's WebGL story is
fundamentally broken for canvas-heavy apps (expo-gl uses OpenGL ES, not WebGL;
react-native-webview adds bridge overhead). Flutter requires rewriting in Dart.
Native triples the codebase.

PWA + Capacitor gives: single codebase (95%+ sharing), native WebGL performance
in WKWebView/Chrome WebView, App Store distribution, native push notifications
via Capacitor plugins, and offline via service workers.

**Alternatives considered**:
- **React Native**: Eliminated — WebGL/canvas bridge overhead, two rendering
  pipelines required, zero code sharing for the animation engine
- **Flutter**: Eliminated — requires Dart rewrite, Flutter web is not a real
  website (Canvas blob, no SEO, no accessibility)
- **Native (Swift/Kotlin)**: Eliminated — 3 codebases for a startup
- **PWA-only (no Capacitor)**: Viable for initial launch but no App Store
  presence, which is critical for teen discovery

### Key Technical Details

- **Service Workers**: Serwist (maintained Workbox fork for Next.js)
- **Offline Storage**: Dexie.js (typed IndexedDB wrapper) for progress & pending syncs
- **GPU Detection**: detect-gpu library for adaptive quality tiers (high/medium/low)
- **Canvas DPR**: Cap at 2x even on 3x devices — invisible difference, 50% GPU savings
- **Min Android**: API 29 (Android 10) for modern Chromium WebView
- **iOS PWA**: Handle WebGL context loss on background, use 100dvh, env(safe-area-inset-*)

### App Architecture

```
Next.js App Router (PWA)
├── Server Components: lesson MDX, topic lists, progress data, curriculum graph
├── Client Components: Three.js/R3F scenes, @use-gesture, KaTeX, practice engine
├── Service Worker (Serwist): precache shell, runtime cache lessons/assets
├── IndexedDB (Dexie): student progress, pending syncs
└── Capacitor Shell (Phase 2): push notifications, haptics, App Store distribution
```

---

## 3. Curriculum Structure

### Decision: 72 topics across 5 domains, 3-year progression

| Domain | Topics | Examples |
|--------|--------|---------|
| Numbers & Operations | 18 | Integers, fractions, decimals, percents, ratios, scientific notation, square roots |
| Number Theory | 7 | Factors, primes, GCF/LCM, exponents, exponent rules |
| Algebra | 18 | Variables, equations (1-step through systems), functions, linear equations, graphing |
| Geometry | 19 | Angles, triangles, circles, area/volume, Pythagorean theorem, transformations |
| Statistics & Probability | 10 | Mean/median/mode, box plots, probability, scatter plots, sampling |

Full curriculum with dependency graph, visual representations, hooks, and real-world
anchors in `curriculum.md`.

**Key design decisions**:
- **Dependency DAG**: Every topic has ≥1 backward link and ≥1 forward link (Principle III)
- **Cross-domain connections**: 18 explicit inter-domain links for interleaving
- **Grade-banded sequencing**: Year 1 (23 topics), Year 2 (26 topics), Year 3 (23 topics)
- **Entry points**: NO-1.1 (Place Value) and GE-4.1 (Angles) are the two root nodes

---

## 4. Gamification System

### Decision: Understanding-weighted XP, Neural Pulse streaks, Knowledge Nebula progress

**Core principle**: XP is a proxy for demonstrated understanding, not time spent or
problems answered. Reflection/explanation XP (0-80 bonus) exceeds practice XP (50 base).
No speed bonuses. No timer pressure. No punishment mechanics.

| System | Design |
|--------|--------|
| **XP Sources** | Lesson completion (100), reflection quality (0-80), exploration (20-40), discovery insight (30), practice (50), peer help (40-80), real-world connection (60) |
| **Leveling** | "Neuron Scale" 1-100: Spark → Signal → Synapse → Circuit → Network → Cortex → Hemisphere → Resonance → Architect → Transcendent. Tier gates require competence demonstration. |
| **Streaks** | "Neural Pulse" with configurable schedule, automatic weekend grace, earned shields (not purchased), streak decay (not death), break mode. |
| **Progress** | "Knowledge Nebula" constellation map. 5 color-coded constellations. Topics as stars: locked → available → in-progress → mastered → review-due. |
| **Achievements** | 6 categories: Exploration, Mastery, Creativity, Persistence, Collaboration, Discovery. 5 rarity tiers. Legendary achievements generate shareable holographic cards. |
| **Rewards** | Cosmetic only (avatar items, themes, visualization modes). Single currency "Neurons" — earned, never purchasable. |
| **Anti-patterns** | NO timers, NO punishment, NO pay-to-win, NO loot boxes, NO guilt notifications, NO addictive dark patterns. Session cap at 45min with gentle suggestion. |

Full gamification specification in `gamification-design.md`.

---

## 5. Spaced Repetition & Adaptive Learning

### Decision: FSRS base + prerequisite DAG + 3-layer model + IRT + interleaving

**Algorithm layers**:

1. **FSRS Core**: Free Spaced Repetition Scheduler — tracks Stability (S) and
   Difficulty (D) per concept. Power-law forgetting curve. Pre-trained defaults
   with per-student parameter fitting after ~100 reviews.

2. **Three-Layer Knowledge Model**: Per concept tracks:
   - **Recall** (can they state the fact/formula?)
   - **Procedure** (can they execute the method?)
   - **Understanding** (can they explain WHY it works?)

3. **Prerequisite Graph**: Before reviewing a concept, check that prerequisites
   are above 0.70 retrievability. Insert prerequisite refreshers if degraded.

4. **IRT Difficulty Adaptation**: 2-Parameter Logistic model for real-time problem
   selection. Target 85% success rate. Backs off on frustration detection (3+
   consecutive failures → target 92%). Pushes harder on boredom (4+ consecutive
   successes → target 75%).

5. **Interleaving**: Round-robin across 3-4 topic clusters per session, weighted
   toward high-confusion pairs (area vs perimeter, ratios vs fractions).

6. **Rote Detection**: Flags students with high procedure stability but low
   understanding stability. Triggers conceptual re-teaching instead of more drill.

**Session composition**: 20% new material, 80% review (adjustable based on student state).

**Cold start**: 15-20 question diagnostic adaptive test → rough theta per concept
cluster → population priors → rapid personalization via inflated learning rates
for first 10 reviews.

**Auto-grading** (since middle schoolers won't self-rate reliably):
- Incorrect → AGAIN
- Correct + hints used or slow → HARD
- Correct + normal time → GOOD
- Correct + fast + no hints → EASY

---

## 6. Competitive Positioning

### Decision: "The Interactive 3Blue1Brown" — visual understanding platform

**The gap**: No product combines cinematic math visualization with interactivity,
adaptive explanation, and engaging gamification.

| Competitor | Their Moat | Our Differentiator |
|------------|-----------|-------------------|
| Khan Academy | Free, comprehensive | Our visuals are 10x better; spatial-before-symbolic pedagogy |
| Brilliant | Problem-first interactive | Our animations are cinematic + we add gamification + accessibility for weaker students |
| 3Blue1Brown | Visual beauty | We make it INTERACTIVE and adaptive |
| Duolingo Math | Habit formation | Our depth goes beyond arithmetic; XP rewards understanding |
| GeoGebra/Desmos | Free tools | We add guided learning, not just sandbox |
| IXL | Adaptive drill | Our drill serves understanding, not anxiety |

**MVP differentiators** (in priority order):
1. Interactive animated visualizations (explorable 3B1B)
2. Concept-level adaptive explanation (AI diagnoses misconceptions)
3. Math-native gamification (the math IS the game)

**Table stakes for MVP**: Step-by-step explanations, mobile-native experience,
progress tracking, adaptive difficulty, free tier with meaningful functionality.

---

## 7. Technology Stack (Consolidated)

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15+ (App Router, RSC, Streaming SSR) |
| Language | TypeScript (strict mode) |
| 2D Animation | SVG + Framer Motion |
| 3D Animation | Three.js + React Three Fiber + Drei (lazy-loaded) |
| Character Animation | Rive (lazy-loaded) |
| Math Rendering | KaTeX |
| Styling | Tailwind CSS 4 + CSS Modules for component-scoped |
| State | Zustand (global) + React Context (lesson/canvas) |
| Gestures | @use-gesture/react |
| Math Utilities | d3-scale, d3-shape, d3-interpolate, d3-ease |
| Physics Animation | react-spring |
| i18n | next-intl (English only initially, setup from day one) |
| Offline | Serwist (service workers) + Dexie.js (IndexedDB) |

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (via Next.js API routes initially, extract to standalone later) |
| API | tRPC (type-safe end-to-end with Next.js) |
| Database | PostgreSQL via Prisma ORM |
| Cache | Redis (session cache, SRS scheduling queues) |
| AI | Anthropic Claude API (AI tutor, explanation evaluation, misconception detection) |
| Auth | Clerk (social login + email/password, COPPA compliance, role-based access) |
| Hosting | Vercel (frontend) + Railway (PostgreSQL + Redis) |
| Content | MDX + JSON animation configs, Git-versioned |

### Mobile
| Layer | Technology |
|-------|-----------|
| Primary | PWA (Next.js + Serwist) |
| App Store | Capacitor (Phase 2) |
| Native Plugins | Push notifications, haptics, status bar, splash screen |
