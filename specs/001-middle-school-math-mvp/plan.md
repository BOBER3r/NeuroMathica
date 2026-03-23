# Implementation Plan: NeuroMathica Middle School Math MVP

**Branch**: `001-middle-school-math-mvp` | **Date**: 2026-03-22 | **Spec**: [curriculum.md](curriculum.md)
**Input**: Constitution + user requirements for full middle school math platform

## Summary

Build the MVP of NeuroMathica: a mobile-first, PWA-based math learning platform
covering the complete middle school curriculum (72 topics, grades 6-8). The core
experience is interactive 3Blue1Brown-quality visualizations following the 7-stage
Neural Learning Sequence, with FSRS-based spaced repetition, understanding-weighted
gamification, and AI tutoring via Claude API. English only, i18n infrastructure
from day one. Target: engaging enough for a disengaged 15-year-old.

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode, no `any`)
**Primary Dependencies**: Next.js 15+ (App Router), Framer Motion, React Three Fiber,
KaTeX, Zustand, @use-gesture/react, tRPC, Prisma, Clerk, Serwist, Dexie.js
**Storage**: PostgreSQL (primary via Prisma), Redis (SRS queues, session cache)
**Testing**: Vitest (unit + integration), Playwright (E2E), Storybook (visual)
**Target Platform**: Web (PWA) — mobile browsers primary, desktop secondary.
Capacitor wrapper for iOS/Android App Store in Phase 2.
**Project Type**: Full-stack web application (Next.js monorepo)
**Performance Goals**: 60fps animations on mid-range mobile (P95 ≥ 55fps),
<3s LCP on 4G, <100KB initial JS bundle (excluding lazy chunks)
**Constraints**: GDPR/COPPA compliant, offline-capable for lessons, <170KB
eager JS, WebGL context survival on iOS background/foreground
**Scale/Scope**: MVP targets 1K-10K students, 72 curriculum topics, ~15 screens,
~200 interactive visualizations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Status | How Addressed |
|---|-----------|--------|---------------|
| I | Understanding Over Memorization | PASS | 7-stage NLS with reflection stage; XP weighted toward explanation quality; 3-layer SRS model tracks understanding separately from procedure |
| II | Visual First, Symbolic Second | PASS | Every topic has spatial representation defined before any formula; `<MathScene>` renders visuals first, `<SymbolBridge>` overlay comes in stage 4 |
| III | No Dead-End Content | PASS | 72-topic dependency DAG audited: every topic has ≥1 backward + ≥1 forward link; Knowledge Nebula visualizes connections |
| IV | Accessibility Is Architecture | PASS | SVG primary renderer (DOM-native ARIA); parallel accessibility tree for R3F scenes; WCAG 2.1 AA; 44px touch targets; color-blind safe palette; dyslexia font option |
| V | Performance Is UX | PASS | SVG+Framer for 70% of content (<200 elements); R3F for complex scenes; GPU tier detection with graceful degradation; DPR capped at 2x; CI performance budgets |
| VI | Privacy by Design | PASS | Clerk handles COPPA; data minimization in schema; encrypted at rest (Prisma + PG); no data selling; student data export/delete endpoints |
| VII | Open Curriculum, Proprietary Platform | PASS | Curriculum in MDX+JSON (CC BY-SA); platform code proprietary; content authoring format documented publicly |

| # | Dev Rule | Status | How Addressed |
|---|----------|--------|---------------|
| DR-1 | TypeScript Strict | PASS | `strict: true` in all tsconfig files; ESLint no-explicit-any rule |
| DR-2 | Test Math Correctness | PASS | Vitest suites for every math computation; epsilon comparisons for floats |
| DR-3 | Animation Review | PASS | Storybook for visual review; Playwright visual regression; pedagogical review checklist in PR template |
| DR-4 | Content-Code Separation | PASS | Lessons in MDX + JSON animation configs; `<MathScene>` renders from JSON; content authors never touch engine code |
| DR-5 | Mobile-First | PASS | PWA architecture; touch-first gestures via @use-gesture; bottom-tab navigation; thumb-zone optimization |
| DR-6 | Offline-First | PASS | Serwist service worker; Dexie.js IndexedDB; background sync; proactive lesson prefetching |
| DR-7 | i18n from Day One | PASS | next-intl configured; all strings in locale files; RTL-ready layout structure; English only for MVP |

## Project Structure

### Documentation (this feature)

```text
specs/001-middle-school-math-mvp/
├── plan.md                # This file
├── research.md            # Technology decisions & competitive analysis
├── curriculum.md          # 72 topics with dependency graph & hooks
├── gamification-design.md # XP, leveling, streaks, achievements
├── data-model.md          # Entity-relationship model
├── quickstart.md          # Developer setup guide
├── contracts/
│   ├── api-routes.md      # tRPC router definitions
│   └── animation-dsl.md   # MathScene JSON schema
└── tasks.md               # Implementation tasks (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/                           # Next.js App Router
│   ├── (app)/                     # Main app layout (with bottom tabs)
│   │   ├── layout.tsx             # App shell: tabs, viewport meta, SW registration
│   │   ├── learn/
│   │   │   ├── page.tsx           # Domain list (server component)
│   │   │   └── [topicId]/
│   │   │       ├── page.tsx       # Topic detail + lesson list
│   │   │       └── [lessonId]/
│   │   │           ├── page.tsx   # Lesson player (client boundary)
│   │   │           └── loading.tsx
│   │   ├── practice/
│   │   │   └── page.tsx           # Daily review session
│   │   ├── progress/
│   │   │   └── page.tsx           # Knowledge Nebula + stats
│   │   └── profile/
│   │       └── page.tsx           # Settings, avatar, achievements
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── api/
│   │   └── trpc/[trpc]/route.ts   # tRPC HTTP handler
│   ├── globals.css
│   └── layout.tsx                 # Root layout: fonts, providers, metadata
│
├── components/
│   ├── math-scene/                # Custom <MathScene> abstraction
│   │   ├── MathScene.tsx          # Auto-selects SVG or R3F renderer
│   │   ├── svg/                   # SVG renderer + Framer Motion
│   │   │   ├── CoordinateGrid.tsx
│   │   │   ├── Axes.tsx
│   │   │   ├── FunctionPlot.tsx
│   │   │   ├── NumberLine.tsx
│   │   │   ├── FractionBar.tsx
│   │   │   ├── GeometricShape.tsx
│   │   │   ├── Vector.tsx
│   │   │   ├── Angle.tsx
│   │   │   ├── DraggablePoint.tsx
│   │   │   └── Annotation.tsx     # KaTeX labels
│   │   ├── three/                 # R3F renderer (lazy-loaded)
│   │   │   ├── Scene3D.tsx
│   │   │   ├── Solid.tsx
│   │   │   ├── CrossSection.tsx
│   │   │   └── Net.tsx            # Surface area unfolding
│   │   ├── animation/
│   │   │   ├── Sequencer.tsx      # Declarative animation timeline
│   │   │   ├── types.ts           # Animation primitives (FadeIn, Transform, etc.)
│   │   │   └── easing.ts          # Custom easing functions
│   │   └── accessibility/
│   │       ├── A11yLayer.tsx      # Parallel accessibility tree for canvas
│   │       └── SceneDescription.tsx # aria-live announcements
│   │
│   ├── lesson/                    # Neural Learning Sequence stages
│   │   ├── LessonPlayer.tsx       # Orchestrates 7 stages
│   │   ├── stages/
│   │   │   ├── Hook.tsx           # Stage 1: Hook animation
│   │   │   ├── SpatialExperience.tsx  # Stage 2: Interactive exploration
│   │   │   ├── GuidedDiscovery.tsx    # Stage 3: AI-guided discovery
│   │   │   ├── SymbolBridge.tsx       # Stage 4: Notation overlay
│   │   │   ├── RealWorldAnchor.tsx    # Stage 5: Real-world context
│   │   │   ├── Practice.tsx           # Stage 6: Adaptive problems
│   │   │   └── Reflection.tsx         # Stage 7: Self-explanation
│   │   └── ProblemCard.tsx
│   │
│   ├── gamification/
│   │   ├── XpDisplay.tsx
│   │   ├── LevelBadge.tsx
│   │   ├── StreakIndicator.tsx
│   │   ├── AchievementCard.tsx
│   │   ├── AhaMoment.tsx          # Celebration animation
│   │   └── KnowledgeNebula.tsx    # Constellation progress map
│   │
│   ├── ai-tutor/
│   │   ├── TutorPanel.tsx         # Bottom sheet AI tutor
│   │   ├── TutorAvatar.tsx        # Rive-powered character
│   │   └── SceneCommander.tsx     # AI generates MathScene commands
│   │
│   ├── navigation/
│   │   ├── BottomTabs.tsx
│   │   └── LessonNav.tsx          # Back arrow + progress dots
│   │
│   └── ui/                        # Shared UI primitives
│       ├── Button.tsx
│       ├── BottomSheet.tsx
│       ├── Card.tsx
│       └── ProgressBar.tsx
│
├── server/
│   ├── trpc/
│   │   ├── router.ts             # Root tRPC router
│   │   ├── context.ts            # Auth + DB context
│   │   └── routers/
│   │       ├── lesson.ts         # Lesson CRUD + content delivery
│   │       ├── progress.ts       # Student progress + SRS state
│   │       ├── practice.ts       # Session generation + problem selection
│   │       ├── gamification.ts   # XP, levels, streaks, achievements
│   │       ├── ai-tutor.ts       # Claude API integration
│   │       └── auth.ts           # User management
│   │
│   ├── services/
│   │   ├── srs/
│   │   │   ├── fsrs.ts           # FSRS algorithm implementation
│   │   │   ├── prerequisite-graph.ts  # DAG traversal + gate checking
│   │   │   ├── interleaver.ts    # Session interleaving logic
│   │   │   ├── irt.ts            # Item Response Theory adaptation
│   │   │   └── rote-detector.ts  # Memorization without understanding detection
│   │   ├── gamification/
│   │   │   ├── xp-calculator.ts  # XP source weighting + multipliers
│   │   │   ├── level-engine.ts   # Level progression + tier gates
│   │   │   ├── streak-manager.ts # Neural Pulse streak logic
│   │   │   └── achievement-engine.ts  # Achievement criteria evaluation
│   │   ├── ai/
│   │   │   ├── tutor.ts          # Claude API: Socratic guidance
│   │   │   ├── explanation-evaluator.ts  # AI rates reflection quality
│   │   │   └── misconception-detector.ts # Error pattern analysis
│   │   └── content/
│   │       ├── lesson-loader.ts  # MDX + animation config loader
│   │       └── curriculum-graph.ts  # Topic dependency DAG
│   │
│   └── db/
│       ├── schema.prisma         # Prisma schema
│       └── seed.ts               # Seed curriculum data
│
├── content/                       # Lesson content (MDX + JSON)
│   ├── domains/
│   │   ├── numbers-operations/
│   │   │   ├── NO-1.1/           # Place Value
│   │   │   │   ├── lesson.mdx    # 7-stage content
│   │   │   │   ├── animations.json  # MathScene configs per stage
│   │   │   │   ├── problems.json    # Practice problem bank
│   │   │   │   └── meta.json        # Prerequisites, successors, hooks
│   │   │   ├── NO-1.2/
│   │   │   └── ...
│   │   ├── number-theory/
│   │   ├── algebra/
│   │   ├── geometry/
│   │   └── statistics-probability/
│   └── curriculum-graph.json      # Full dependency DAG
│
├── lib/
│   ├── math/                      # Pure math utilities
│   │   ├── arithmetic.ts
│   │   ├── geometry.ts
│   │   ├── algebra.ts
│   │   └── statistics.ts
│   ├── hooks/
│   │   ├── useAdaptivePixelRatio.ts
│   │   ├── useGpuTier.ts
│   │   ├── useResponsiveScene.ts
│   │   └── useOfflineSync.ts
│   ├── stores/
│   │   ├── lesson-store.ts       # Current lesson state
│   │   ├── practice-store.ts     # Current practice session state
│   │   └── user-store.ts         # Auth + preferences
│   ├── offline/
│   │   ├── db.ts                 # Dexie.js schema
│   │   └── sync.ts              # Background sync logic
│   └── i18n/
│       ├── config.ts             # next-intl configuration
│       └── messages/
│           └── en.json           # English locale strings
│
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker (generated by Serwist)
│   └── icons/                    # PWA icons
│
├── tests/
│   ├── unit/
│   │   ├── math/                 # Math correctness tests (DR-2)
│   │   ├── srs/                  # FSRS, IRT, interleaver tests
│   │   └── gamification/         # XP, levels, streak logic tests
│   ├── integration/
│   │   ├── trpc/                 # API route tests
│   │   └── lesson-flow/          # NLS stage progression tests
│   └── e2e/
│       ├── onboarding.spec.ts
│       ├── lesson-complete.spec.ts
│       └── practice-session.spec.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

**Structure Decision**: Single Next.js monorepo. The backend lives in `src/server/`
using tRPC + Prisma with Next.js API routes. This avoids premature microservice
extraction while keeping a clean server/client boundary. Content lives in
`src/content/` as MDX + JSON, Git-versioned (DR-4, Principle VII). The
`<MathScene>` component system in `src/components/math-scene/` is the animation
engine — the most architecturally significant component.

## Complexity Tracking

| Aspect | Justification |
|--------|--------------|
| Custom `<MathScene>` abstraction | No existing library provides interactive math primitives with SVG accessibility + declarative animation sequencing. Building this is the core IP. Simpler alternative (raw SVG) rejected because content authors need declarative components, not imperative SVG code. Note: 3D renderer (R3F) deferred to post-MVP; Grade 6-7 content is 2D-only. GE-4.7/4.7a/4.8 (Volume, Surface Area, Cross-Sections) will require R3F when authored. |
| FSRS + IRT + prerequisite DAG | Off-the-shelf SRS (Anki algorithm) treats items independently. Math requires prerequisite awareness + 3-layer knowledge model. The added complexity directly serves Principle I (understanding over memorization). |
| Triple-renderer architecture (SVG + R3F + Rive) | Single renderer cannot satisfy both accessibility (SVG) and 3D visualization (WebGL) and character animation (Rive). Each serves a distinct need. Simpler alternative (R3F only) rejected because canvas is opaque to screen readers (Principle IV). |
