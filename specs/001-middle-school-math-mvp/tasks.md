# Tasks: NeuroMathica Middle School Math MVP

**Input**: Design documents from `/specs/001-middle-school-math-mvp/`
**Prerequisites**: plan.md (required), curriculum.md, gamification-design.md, data-model.md, contracts/

**User Stories** (derived from plan.md — no formal spec.md):
- **US1 (P1)**: Core Lesson Experience — student browses topics, opens lesson, completes 7-stage NLS
- **US2 (P2)**: Spaced Repetition & Practice — daily review sessions with adaptive difficulty
- **US3 (P3)**: Gamification — XP, leveling, streaks, achievements, Knowledge Nebula
- **US4 (P4)**: AI Tutor — Socratic guidance with canvas-aware visual responses
- **US5 (P5)**: Onboarding & Auth — signup, diagnostic assessment, personalized start
- **US6 (P6)**: Offline & PWA — service worker, offline lessons, background sync

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1-US6)
- Exact file paths from plan.md project structure

---

## Phase 1: Setup

**Purpose**: Project initialization, tooling, configuration

- [X] T001 Initialize Next.js 15+ project with TypeScript strict mode, App Router, and pnpm in project root
- [X] T002 Configure tsconfig.json with strict: true, noImplicitAny, path aliases (@/ for src/) in tsconfig.json
- [X] T003 [P] Install and configure Tailwind CSS 4 with design tokens (dark theme palette: navy/charcoal + neon accents) in tailwind.config.ts
- [X] T004 [P] Install and configure ESLint with no-explicit-any rule, Prettier in .eslintrc.cjs
- [X] T005 [P] Install and configure Vitest with TypeScript support in vitest.config.ts
- [X] T006 [P] Create PWA manifest with app name, icons, theme color, display: standalone in public/manifest.json
- [X] T007 [P] Configure next-intl with English locale, externalize all strings in src/lib/i18n/config.ts and src/lib/i18n/messages/en.json
- [X] T008 [P] Create docker-compose.yml with PostgreSQL 16 and Redis 7 services in docker-compose.yml
- [X] T009 [P] Create .env.example with DATABASE_URL, REDIS_URL, CLERK keys, ANTHROPIC_API_KEY, NEXT_PUBLIC_APP_URL in .env.example
- [X] T009a [P] Create globals.css with dark theme CSS variables (navy/charcoal base + neon accents), Tailwind base styles, KaTeX font imports, touch-action/overscroll-behavior mobile fixes in src/app/globals.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T010 Install Prisma and create full database schema (18 models: Domain, Concept, ConceptPrerequisite, Problem, Student, StudentConceptState, StudentFsrsParams, ReviewLog, Session, SessionProblem, XpEvent, StreakState, AchievementDefinition, AchievementUnlock, StudyCircle, StudyCircleMembership, TutorConversation, TutorMessage, TopicConfusion) in prisma/schema.prisma
- [X] T011 Create initial Prisma migration and verify schema applies cleanly via prisma migrate dev
- [X] T012 Create database seed script: insert 5 domains, 72 concepts with prerequisite relationships, and achievement definitions in prisma/seed.ts
- [X] T013 [P] Install and configure tRPC with Next.js App Router: create root router, context with Prisma client, and HTTP handler in src/server/trpc/router.ts, src/server/trpc/context.ts, src/app/api/trpc/[trpc]/route.ts
- [X] T014 [P] Install and configure Clerk: create auth middleware, sign-in/sign-up pages, and student record auto-creation on first login in src/app/(auth)/sign-in/page.tsx, src/app/(auth)/sign-up/page.tsx, src/server/trpc/context.ts
- [X] T015 [P] Create auth tRPC router with getSession, updateProfile, exportData (GDPR data export), and deleteAccount (GDPR right to erasure, cascading delete of all student data) procedures in src/server/trpc/routers/auth.ts
- [X] T016 [P] Create shared UI primitives: Button, Card, BottomSheet, ProgressBar components with Tailwind dark theme in src/components/ui/Button.tsx, src/components/ui/Card.tsx, src/components/ui/BottomSheet.tsx, src/components/ui/ProgressBar.tsx
- [X] T017 [P] Create root layout with font loading (Inter variable + KaTeX fonts), providers (tRPC, Clerk, Zustand, next-intl), and viewport meta in src/app/layout.tsx
- [X] T018 [P] Create app layout with BottomTabs navigation (Learn, Practice, Progress, Profile) in src/app/(app)/layout.tsx and src/components/navigation/BottomTabs.tsx
- [X] T019 [P] Create Zustand stores: user-store (auth + preferences), lesson-store (current lesson state), practice-store (current session state) in src/lib/stores/user-store.ts, src/lib/stores/lesson-store.ts, src/lib/stores/practice-store.ts
- [X] T020 Create curriculum graph service: load 72-topic DAG from seed data, expose prerequisite checking and topic status resolution in src/server/services/content/curriculum-graph.ts
- [X] T021 Create curriculum tRPC router with getDomains, getConcept, getGraph, getTopicStatus procedures in src/server/trpc/routers/curriculum.ts (depends on T020)
- [X] T022 [P] Create pure math utility library with arithmetic, geometry, algebra, statistics helper functions and epsilon comparisons in src/lib/math/arithmetic.ts, src/lib/math/geometry.ts, src/lib/math/algebra.ts, src/lib/math/statistics.ts
- [X] T023 [P] Create math correctness tests for all math utility functions (DR-2) in tests/unit/math/arithmetic.test.ts, tests/unit/math/geometry.test.ts, tests/unit/math/algebra.test.ts, tests/unit/math/statistics.test.ts
- [X] T023a [P] Install ioredis and create Redis client singleton for FSRS scheduling queues and session caching in src/server/db/redis.ts, wire into tRPC context in src/server/trpc/context.ts
- [X] T023b [P] Create tRPC rate limiting middleware: configure per-router limits (tutor: 60/min, practice.submitAnswer: 120/min, gamification.claimReward: 10/min, default: 300/min) in src/server/trpc/middleware/rate-limit.ts

**Checkpoint**: Foundation ready — database, auth, API infrastructure, navigation, stores, curriculum graph all operational. User story implementation can now begin.

---

## Phase 3: User Story 1 — Core Lesson Experience (Priority: P1) MVP

**Goal**: Student can browse math domains and topics, open a lesson, and experience the full 7-stage Neural Learning Sequence with interactive visualizations.

**Independent Test**: Navigate to Learn tab → select a domain → select a topic → complete all 7 NLS stages for one lesson (NO-1.1 Place Value) → see completion state

### MathScene Animation Engine (Core IP)

- [X] T024 [P] [US1] Create MathScene DSL TypeScript types matching animation-dsl.md schema (SceneDefinition, SceneObject, AnimationSequence, Interaction) in src/components/math-scene/animation/types.ts
- [X] T025 [P] [US1] Create custom easing functions library (linear, easeInOut, easeOutBack, spring) using d3-ease in src/components/math-scene/animation/easing.ts
- [X] T026 [US1] Create animation Sequencer component: declarative timeline that sequences FadeIn, Draw, Transform, MorphTo, MoveTo, Highlight, Wait, Parallel steps using Framer Motion in src/components/math-scene/animation/Sequencer.tsx
- [X] T027 [P] [US1] Create CoordinateGrid SVG component with configurable step, major step, color, opacity using Framer Motion in src/components/math-scene/svg/CoordinateGrid.tsx
- [X] T028 [P] [US1] Create Axes SVG component with labels, tick marks, arrow heads in src/components/math-scene/svg/Axes.tsx
- [X] T029 [P] [US1] Create NumberLine SVG component with range, step, markers, highlight range, interactive zoom via @use-gesture in src/components/math-scene/svg/NumberLine.tsx
- [X] T030 [P] [US1] Create FractionBar SVG component with numerator, denominator, shaded/unshaded colors, animated splitting in src/components/math-scene/svg/FractionBar.tsx
- [X] T031 [P] [US1] Create GeometricShape SVG component supporting triangle, rectangle, circle, polygon, regularPolygon with draggable vertices and measurement display in src/components/math-scene/svg/GeometricShape.tsx
- [X] T032 [P] [US1] Create FunctionPlot SVG component that parses math expression strings (install mathjs or expr-eval as expression evaluator), renders as smooth SVG paths using d3-shape with configurable domain, color, thickness in src/components/math-scene/svg/FunctionPlot.tsx and src/lib/math/expression-parser.ts
- [X] T033 [P] [US1] Create DraggablePoint SVG component with @use-gesture drag handling, snap-to-grid, axis constraints, and visual focus indicator in src/components/math-scene/svg/DraggablePoint.tsx
- [X] T034 [P] [US1] Create Annotation SVG component that renders KaTeX LaTeX strings positioned on the scene with animated transitions in src/components/math-scene/svg/Annotation.tsx
- [X] T035 [P] [US1] Create Vector and Angle SVG components in src/components/math-scene/svg/Vector.tsx and src/components/math-scene/svg/Angle.tsx
- [X] T036 [US1] Create MathScene root component: parses SceneDefinition JSON, instantiates scene objects, wires interactions and animation sequences, auto-selects SVG renderer in src/components/math-scene/MathScene.tsx (depends on T024-T035)
- [X] T037 [P] [US1] Create accessibility layer: A11yLayer (parallel hidden DOM for ARIA labels) and SceneDescription (aria-live announcements for scene changes) in src/components/math-scene/accessibility/A11yLayer.tsx and src/components/math-scene/accessibility/SceneDescription.tsx
- [X] T038 [P] [US1] Create responsive scene hook: useResponsiveScene that classifies viewport (compact/standard/large) and adapts scene parameters in src/lib/hooks/useResponsiveScene.ts
- [X] T039 [P] [US1] Create GPU tier detection hook: useGpuTier using detect-gpu library, returns quality level (high/medium/low) in src/lib/hooks/useGpuTier.ts
- [X] T040 [P] [US1] Create adaptive pixel ratio hook: useAdaptivePixelRatio that caps DPR based on GPU tier (high=2, medium=1.5, low=1) in src/lib/hooks/useAdaptivePixelRatio.ts
- [X] T040a [P] [US1] Create Web Worker for heavy math computations: expression evaluation, complex curve sampling, and animation precomputation offloaded from main thread (CP-V: "Heavy computations MUST be offloaded to Web Workers") in src/lib/workers/math-worker.ts

### Lesson Player (7-Stage NLS)

- [X] T041 [US1] Create LessonPlayer component: orchestrates 7 NLS stages in sequence, tracks completion per stage, manages stage transitions in src/components/lesson/LessonPlayer.tsx (depends on T036)
- [X] T042 [P] [US1] Create Hook stage component (Stage 1): renders hook animation from animations.json, auto-plays stunning visual, 30-60s in src/components/lesson/stages/Hook.tsx
- [X] T043 [P] [US1] Create SpatialExperience stage component (Stage 2): renders interactive MathScene, tracks manipulation diversity (drag count, exploration patterns), 2-4 min in src/components/lesson/stages/SpatialExperience.tsx
- [X] T044 [P] [US1] Create GuidedDiscovery stage component (Stage 3): renders MathScene with guided text overlay prompts, detects when student identifies relationship, 3-5 min in src/components/lesson/stages/GuidedDiscovery.tsx
- [X] T045 [P] [US1] Create SymbolBridge stage component (Stage 4): overlays KaTeX notation onto existing spatial scene with per-symbol animation, 2-3 min in src/components/lesson/stages/SymbolBridge.tsx
- [X] T046 [P] [US1] Create RealWorldAnchor stage component (Stage 5): renders real-world context text + embedded illustration, 1-2 min in src/components/lesson/stages/RealWorldAnchor.tsx
- [X] T047 [US1] Create Practice stage component (Stage 6): renders ProblemCard components, submits answers, shows feedback, tracks accuracy (basic version — full adaptive engine in US2) in src/components/lesson/stages/Practice.tsx
- [X] T048 [US1] Create Reflection stage component (Stage 7): text input for self-explanation, submits to server for storage, ~1 min in src/components/lesson/stages/Reflection.tsx
- [X] T049 [P] [US1] Create ProblemCard component: renders problem content (text + optional mini MathScene), answer input (text/multiple choice), submit button, feedback display, and mandatory "why does this work?" explanation prompt after correct answer (CP-I) in src/components/lesson/ProblemCard.tsx
- [X] T050 [P] [US1] Create LessonNav component: back arrow + stage progress dots, hides bottom tabs during lesson in src/components/navigation/LessonNav.tsx

### Content Pipeline

- [X] T051 [US1] Create lesson content loader service: reads MDX lesson files + animations.json + problems.json + meta.json from src/content/domains/ and returns structured lesson data in src/server/services/content/lesson-loader.ts
- [X] T052 [US1] Create lesson tRPC router with getLesson, completeStage, submitReflection, getLessonProgress procedures in src/server/trpc/routers/lesson.ts (depends on T051)
- [X] T053 [US1] Create first complete lesson content: NO-1.1 (Place Value) with all 7 NLS stages — lesson.mdx, animations.json (place-value blocks, zoomable number line), problems.json (minimum 3 problems per layer: recall, procedure, understanding = 9+ problems, each with explanationPrompt field per CP-I), meta.json in src/content/domains/numbers-operations/NO-1.1/

### Pages & Navigation

- [X] T054 [US1] Create Learn page (domain list): server component fetching domains with concept counts, card grid layout in src/app/(app)/learn/page.tsx
- [X] T055 [US1] Create Topic detail page: server component showing concept info, prerequisites status, lesson list, "Start Lesson" button in src/app/(app)/learn/[topicId]/page.tsx
- [X] T056 [US1] Create Lesson player page: client component boundary, dynamic imports Three.js/R3F, loading skeleton, wraps LessonPlayer in src/app/(app)/learn/[topicId]/[lessonId]/page.tsx and src/app/(app)/learn/[topicId]/[lessonId]/loading.tsx

### Progress Tracking (basic)

- [X] T057 [US1] Create progress tRPC router with getOverview and getConceptStates procedures (basic version — returns lesson completion states per student) in src/server/trpc/routers/progress.ts

**Checkpoint**: Student can browse domains → select topic → complete full 7-stage lesson with interactive MathScene visualizations → see completion. This is the MVP core.

---

## Phase 4: User Story 2 — Spaced Repetition & Practice (Priority: P2)

**Goal**: Student receives daily review sessions with FSRS-scheduled problems, IRT-adapted difficulty, interleaved topics, and frustration detection.

**Independent Test**: Complete 3+ lessons → next day, open Practice tab → receive generated session with interleaved review problems → answer problems → see difficulty adapt → see next review dates update

### SRS Engine

- [X] T058 [US2] Implement FSRS algorithm: stability/difficulty state update, power-law forgetting curve R(t), next review interval computation, auto-grading from response time/hints/correctness in src/server/services/srs/fsrs.ts
- [X] T059 [US2] Implement prerequisite graph checker: given a concept, verify all prerequisites are above 0.70 retrievability, insert prerequisite refreshers if degraded in src/server/services/srs/prerequisite-graph.ts (depends on T020)
- [X] T060 [US2] Implement IRT difficulty adaptation: 2-Parameter Logistic model, Bayesian ability update after each response, adaptive item selection targeting 85% success rate in src/server/services/srs/irt.ts
- [X] T061 [US2] Implement session interleaver: round-robin across 3-4 topic clusters, weighted by confusion pairs, respects 20% new / 80% review ratio in src/server/services/srs/interleaver.ts
- [X] T062 [US2] Implement rote memorization detector: flags high procedure stability + low understanding stability, systematic error patterns, transfer failure in src/server/services/srs/rote-detector.ts
- [X] T063 [P] [US2] Write unit tests for FSRS algorithm: verify stability updates, forgetting curve computation, interval calculation, auto-grading logic with epsilon comparisons in tests/unit/srs/fsrs.test.ts
- [X] T064 [P] [US2] Write unit tests for IRT: verify probability computation, Bayesian ability update, item selection targeting in tests/unit/srs/irt.test.ts
- [X] T065 [P] [US2] Write unit tests for interleaver: verify topic distribution, confusion-pair weighting, new/review ratio in tests/unit/srs/interleaver.test.ts

### Practice API & UI

- [X] T066 [US2] Create practice tRPC router with generateSession, getNextProblem, submitAnswer, getSessionSummary, getDiagnostic procedures in src/server/trpc/routers/practice.ts (depends on T058-T061)
- [X] T067 [US2] Create Practice page: session generation on mount, problem cards in sequence, progress indicator, session summary on completion, emotional state indicator in src/app/(app)/practice/page.tsx
- [X] T068 [US2] Enhance Practice stage (Stage 6 in LessonPlayer) to use IRT-based problem selection and FSRS state updates instead of basic problem list in src/components/lesson/stages/Practice.tsx (depends on T060, T066)
- [X] T069 [US2] Add frustration/boredom detection to practice session: track consecutive failures/successes, response time patterns, trigger difficulty adjustment or confidence builder problems in src/server/services/srs/irt.ts (enhancement to T060)

### Review Forecast

- [X] T070 [US2] Add getReviewForecast procedure to progress router: return items due today/tomorrow/this week in src/server/trpc/routers/progress.ts (enhancement to T057). Note: getStreak moved to gamification router (T078) for consistent streak ownership

**Checkpoint**: Full adaptive practice system operational — FSRS scheduling, IRT difficulty, interleaving, frustration detection, session generation.

---

## Phase 5: User Story 3 — Gamification (Priority: P3)

**Goal**: Student earns understanding-weighted XP, levels up through the Neuron Scale, maintains Neural Pulse streaks, unlocks achievements, and views progress on the Knowledge Nebula.

**Independent Test**: Complete a lesson → see XP earned (weighted toward reflection quality) → see level increase → maintain 3-day streak → unlock "First Light" achievement → view Knowledge Nebula with lit stars

### Gamification Engine (Backend)

- [X] T071 [US3] Implement XP calculator: 11 XP sources with weights, 4 multipliers (Deep Dive, Connection Maker, Struggle Bonus, First Try Clarity), neuron conversion in src/server/services/gamification/xp-calculator.ts
- [X] T072 [US3] Implement level engine: Neuron Scale 1-100 with 10 tiers, XP thresholds per level, tier boundary gate evaluation in src/server/services/gamification/level-engine.ts
- [X] T073 [US3] Implement streak manager: Neural Pulse logic — configurable schedule, 5-layer protection (weekend grace, shields, repair, decay-not-death, break mode), streak day validation in src/server/services/gamification/streak-manager.ts
- [X] T074 [US3] Implement achievement engine: evaluate 48 achievement criteria across 6 categories, rarity classification, unlock detection after each action in src/server/services/gamification/achievement-engine.ts
- [X] T075 [P] [US3] Write unit tests for XP calculator: verify all 11 sources, multiplier stacking, neuron conversion in tests/unit/gamification/xp-calculator.test.ts
- [X] T076 [P] [US3] Write unit tests for streak manager: verify decay logic, shield activation, repair window, break mode, weekend grace in tests/unit/gamification/streak-manager.test.ts
- [X] T077 [P] [US3] Write unit tests for level engine: verify tier boundaries, gate requirements, XP thresholds in tests/unit/gamification/level-engine.test.ts

### Gamification API

- [X] T078 [US3] Create gamification tRPC router with getXpHistory, getLevelInfo, getAchievements, getStreak, getLeaderboard, claimReward procedures in src/server/trpc/routers/gamification.ts (depends on T071-T074). Note: getStreak consolidated here from progress router for consistent streak ownership
- [X] T079 [US3] Integrate XP awarding into lesson completion flow: call xp-calculator after each NLS stage completion, emit XP events, check level-up and achievement triggers in src/server/trpc/routers/lesson.ts (enhancement)
- [X] T080 [US3] Integrate XP awarding into practice session flow: award practice XP per session, spaced repetition review XP, check streak day completion in src/server/trpc/routers/practice.ts (enhancement)

### Gamification UI

- [X] T081 [P] [US3] Create XpDisplay component: animated XP gain notification with source label and multiplier breakdown in src/components/gamification/XpDisplay.tsx
- [X] T082 [P] [US3] Create LevelBadge component: current tier name + level number + progress bar to next level in src/components/gamification/LevelBadge.tsx
- [X] T083 [P] [US3] Create StreakIndicator component: Neural Pulse count + shield count + schedule mode indicator in src/components/gamification/StreakIndicator.tsx
- [X] T084 [P] [US3] Create AchievementCard component: rarity-styled card with name, description, progress, locked/unlocked state, share button for rare+ in src/components/gamification/AchievementCard.tsx
- [X] T085 [P] [US3] Create AhaMoment celebration component: Neuron Flash animation, encouraging quote, reflection capture prompt, triggered by struggle-then-breakthrough detection in src/components/gamification/AhaMoment.tsx
- [X] T086 [US3] Create KnowledgeNebula component: SVG constellation map of 72 topics in 5 color-coded clusters, topic states (locked/available/in-progress/mastered/review-due), pinch-to-zoom, tap-to-inspect, animated ship showing suggested path in src/components/gamification/KnowledgeNebula.tsx
- [X] T087 [US3] Create Progress page: KnowledgeNebula as hero, LevelBadge + StreakIndicator in header, recent activity feed, weekly stats (explanation quality, accuracy, time) in src/app/(app)/progress/page.tsx
- [X] T088 [US3] Create Profile page: avatar display (placeholder for MVP — just tier badge + name), achievement grid, theme selector, settings (streak schedule, sound, notifications) in src/app/(app)/profile/page.tsx

**Checkpoint**: Full gamification loop — earn XP from understanding, level up, maintain streaks, unlock achievements, visualize progress as a growing constellation.

---

## Phase 6: User Story 4 — AI Tutor (Priority: P4)

**Goal**: Student can ask the AI tutor questions during any lesson stage and receive Socratic guidance with canvas-aware visual responses.

**Independent Test**: During a lesson → tap "Ask Tutor" → type a question about the current visualization → tutor responds with text AND generates a new animation on the canvas → tutor uses Socratic questioning

### AI Backend

- [X] T089 [US4] Implement AI tutor service: Claude API integration with system prompt for Socratic mode, student model context, current scene state awareness, streaming response in src/server/services/ai/tutor.ts
- [X] T090 [US4] Implement explanation evaluator: Claude API call that rates student reflection text quality (0-5 scale), detects prior concept references, identifies aha moments in src/server/services/ai/explanation-evaluator.ts
- [X] T091 [US4] Implement misconception detector: analyze error patterns in student answers, identify systematic errors (e.g., 1/2+1/3=2/5), suggest targeted re-teaching in src/server/services/ai/misconception-detector.ts
- [X] T092 [US4] Create AI tutor tRPC router with sendMessage (streaming), getConversation, generateVisualization procedures in src/server/trpc/routers/ai-tutor.ts (depends on T089)

### AI Tutor UI

- [X] T093 [US4] Create TutorPanel component: bottom sheet that slides up during lessons, chat message list, text input, streaming response display in src/components/ai-tutor/TutorPanel.tsx
- [X] T094 [US4] Create SceneCommander component: receives AI-generated scene commands (create/modify/animate/remove), validates and executes against current MathScene state in src/components/ai-tutor/SceneCommander.tsx (depends on T036)
- [X] T095 [P] [US4] Create TutorAvatar component: placeholder avatar for MVP (static image or simple CSS animation — Rive integration deferred to post-MVP) in src/components/ai-tutor/TutorAvatar.tsx
- [X] T096 [US4] Integrate TutorPanel into LessonPlayer: available during stages 2-6, passes current scene state to tutor, SceneCommander executes visual responses in src/components/lesson/LessonPlayer.tsx (enhancement)
- [X] T097 [US4] Integrate explanation evaluator into Reflection stage: AI rates quality, returns score + feedback + multiplier, feeds into gamification XP in src/components/lesson/stages/Reflection.tsx (enhancement, depends on T090)

**Checkpoint**: AI tutor accessible during lessons, responds Socratically with text + canvas animations, evaluates student reflections.

---

## Phase 7: User Story 5 — Onboarding & Auth (Priority: P5)

**Goal**: New student experiences the "wow moment" onboarding (no signup required), creates account, completes diagnostic assessment, and gets personalized starting point.

**Independent Test**: Open app as new user → see hook animation (no login) → experience micro-lesson → create account → complete 15-question diagnostic → see Knowledge Nebula with personalized available/locked states

- [X] T098 [US5] Create onboarding hook page: fullscreen fractal/Mandelbrot animation (no auth required), interactive, "Continue" button in src/app/(app)/onboarding/page.tsx
- [X] T099 [US5] Create onboarding micro-lesson: condensed Pythagorean theorem spatial exploration (drag triangle, watch squares), no auth required in src/app/(app)/onboarding/taste/page.tsx
- [X] T100 [US5] Create onboarding identity page: avatar creation (placeholder — basic name + theme selection for MVP), triggers account creation via Clerk in src/app/(app)/onboarding/identity/page.tsx
- [X] T101 [US5] Implement diagnostic assessment service: generate 15-20 CAT-style problems spanning prerequisite graph, estimate ability per concept cluster, assign initial SRS states in src/server/services/srs/diagnostic.ts (depends on T058, T060)
- [X] T102 [US5] Create diagnostic assessment page: adaptive problems with progress indicator, no timer, results visualization showing concept map with strengths/gaps in src/app/(app)/onboarding/diagnostic/page.tsx
- [X] T103 [US5] Create onboarding completion page: "Spark I" level reveal, Knowledge Nebula zooms out showing exploration space, first available star highlighted, "Start Learning" CTA in src/app/(app)/onboarding/complete/page.tsx

**Checkpoint**: Complete new-user flow from anonymous hook through authenticated diagnostic to personalized Knowledge Nebula.

---

## Phase 8: User Story 6 — Offline & PWA (Priority: P6)

**Goal**: Core lessons work offline, student progress syncs when connectivity returns, app is installable as PWA.

**Independent Test**: Install PWA → load 3 lessons while online → go offline → navigate to those lessons → complete stages → go back online → verify progress synced

- [X] T104 [US6] Configure Serwist service worker with Next.js: precache app shell + core CSS/JS, runtime cache for lesson content (StaleWhileRevalidate) and assets (CacheFirst) in next.config.ts and src/app/sw-register.tsx
- [X] T105 [US6] Create Dexie.js offline database schema: lessonProgress, pendingActions tables with synced flag in src/lib/offline/db.ts
- [X] T106 [US6] Implement offline sync service: queue actions in IndexedDB when offline, replay on visibilitychange + connectivity restore, retry logic with max 5 attempts in src/lib/offline/sync.ts
- [X] T107 [US6] Create useOfflineSync hook: detects online/offline state, shows sync indicator, triggers sync on reconnect in src/lib/hooks/useOfflineSync.ts
- [X] T108 [US6] Implement proactive lesson prefetching: when student completes lesson N, prefetch lesson N+1 content and animation assets into cache in src/lib/offline/sync.ts (enhancement)
- [X] T109 [P] [US6] Add offline indicator to app layout: subtle banner when offline, sync progress indicator when reconnecting in src/app/(app)/layout.tsx (enhancement)

**Checkpoint**: PWA installable, lessons available offline, progress syncs automatically.

---

## Phase 9: Content Authoring — First 5 Lesson Batch

**Purpose**: Create initial content for 5 lessons (enough to demonstrate the full Grade 6 Semester 1a beginning)

- [X] T110 [P] Create lesson content for NO-1.2 (Integers): lesson.mdx, animations.json (number lines, thermometer, chip model), problems.json, meta.json in src/content/domains/numbers-operations/NO-1.2/
- [X] T111 [P] Create lesson content for NO-1.2a (Integer Add/Sub): lesson.mdx, animations.json (arrows, zero-pairs, walking), problems.json, meta.json in src/content/domains/numbers-operations/NO-1.2a/
- [X] T112 [P] Create lesson content for NO-1.4 (Fractions): lesson.mdx, animations.json (fraction bars, circles, fraction wall), problems.json, meta.json in src/content/domains/numbers-operations/NO-1.4/
- [X] T113 [P] Create lesson content for NT-2.1 (Factors & Multiples): lesson.mdx, animations.json (factor rectangles, Venn diagram), problems.json, meta.json in src/content/domains/number-theory/NT-2.1/
- [X] T114 [P] Create lesson content for GE-4.1 (Angles): lesson.mdx, animations.json (protractor, billiards), problems.json, meta.json in src/content/domains/geometry/GE-4.1/

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Quality, performance, accessibility, testing

- [ ] T115 [P] Accessibility audit: verify all MathScene SVG elements have ARIA labels, keyboard navigation works for all interactive elements, color-blind safe palette applied in src/components/math-scene/
- [ ] T116 [P] Performance audit: verify 60fps on mid-range mobile (test on real device), check bundle sizes against budget (<170KB eager), set up Lighthouse CI in next.config.ts
- [ ] T117 [P] Create Storybook configuration and stories for all MathScene primitives (CoordinateGrid, NumberLine, FractionBar, GeometricShape, FunctionPlot, DraggablePoint) for visual review (DR-3) in .storybook/ and src/components/math-scene/svg/*.stories.tsx
- [X] T118 [P] Create Playwright E2E tests: onboarding flow, lesson completion flow, practice session flow in tests/e2e/onboarding.spec.ts, tests/e2e/lesson-complete.spec.ts, tests/e2e/practice-session.spec.ts
- [X] T119 [P] Create social tRPC router with createCircle, joinCircle, getCircle, leaveCircle procedures (basic Study Circle implementation) in src/server/trpc/routers/social.ts
- [X] T120 [P] Create public content authoring guide: document MathScene DSL JSON schema, MDX lesson format, problems.json structure, meta.json format, and contribution workflow so community contributors can author lessons without access to proprietary code (CP-VII) in docs/content-authoring-guide.md
- [X] T121 Run full test suite (vitest + playwright), fix any failures, verify all math correctness tests pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **US1 Core Lessons (Phase 3)**: Depends on Phase 2 — this is the MVP
- **US2 Practice (Phase 4)**: Depends on Phase 2; independent of US1 at the engine level, but enhanced by US1 lesson data
- **US3 Gamification (Phase 5)**: Depends on Phase 2; integrates with US1 (lesson XP) and US2 (practice XP) but can be built independently
- **US4 AI Tutor (Phase 6)**: Depends on Phase 2 + US1 MathScene engine (T036)
- **US5 Onboarding (Phase 7)**: Depends on Phase 2 + US1 lesson player + US2 diagnostic engine + US3 level/nebula
- **US6 Offline (Phase 8)**: Depends on Phase 2 + US1 content pipeline
- **Content (Phase 9)**: Depends on US1 content pipeline (T051-T053)
- **Polish (Phase 10)**: Depends on all user stories

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependencies on other stories. **This is the MVP.**
- **US2 (P2)**: Can start after Phase 2 — SRS engine is independent. Practice UI integrates with US1 lesson data.
- **US3 (P3)**: Can start after Phase 2 — gamification engine is independent. XP integration needs US1+US2 completion hooks.
- **US4 (P4)**: Can start after Phase 2 — needs US1 MathScene engine for SceneCommander.
- **US5 (P5)**: Depends on US1 (lesson player), US2 (diagnostic), US3 (level/nebula). Build last.
- **US6 (P6)**: Can start after Phase 2 — needs US1 content pipeline.

### Parallel Opportunities

**Within Phase 2** (after T010-T011):
- T013, T014, T015, T016, T017, T018, T019, T022, T023 can all run in parallel

**Within US1 MathScene** (after T024-T025):
- T027-T035 (all SVG primitives) can run in parallel
- T037-T040 (accessibility, hooks) can run in parallel

**Within US1 Lesson Player** (after T036):
- T042-T046, T049-T050 can run in parallel

**Across User Stories** (after Phase 2):
- US1 MathScene engine + US2 SRS engine + US3 Gamification engine can be built in parallel
- US6 Offline can be built alongside any user story

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 (Core Lesson Experience)
4. **STOP and VALIDATE**: One student can browse topics and complete a full 7-stage lesson with interactive visualizations
5. Deploy to Vercel for early testing

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 → Test independently → Deploy (MVP!)
3. US2 → Daily practice with adaptive review → Deploy
4. US3 → Gamification makes it engaging → Deploy
5. US4 → AI tutor adds depth → Deploy
6. US5 → Polished onboarding → Deploy
7. US6 → Offline capability → Deploy
8. Content batch → First 5+ lessons → Deploy
9. Polish → Accessibility, performance, E2E tests → Production launch

### Parallel Team Strategy (3 developers)

After Phase 2:
- **Dev A**: US1 (MathScene engine + lesson player) → US4 (AI tutor needs MathScene)
- **Dev B**: US2 (SRS engine + practice) → US5 (onboarding needs diagnostic)
- **Dev C**: US3 (gamification engine + nebula) → US6 (offline/PWA) → Content authoring

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Math correctness tests (DR-2) are included where math computations occur
- Content authoring (Phase 9) can be parallelized extensively — each lesson is independent
- Total remaining lessons (67) can be authored incrementally after MVP launch
