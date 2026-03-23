# Data Model: NeuroMathica Middle School Math MVP

**Date**: 2026-03-22 | **Plan**: [plan.md](plan.md)

## Entity-Relationship Overview

```
┌──────────┐     ┌───────────┐     ┌──────────────┐
│  Student  │────<│  Progress  │>────│   Concept    │
└──────────┘     └───────────┘     └──────────────┘
     │                │                    │
     │           ┌────┴─────┐         ┌────┴─────┐
     │           │ ReviewLog│         │Prerequisite│
     │           └──────────┘         └──────────┘
     │
     ├────<┌──────────────┐
     │     │ XpEvent      │
     │     └──────────────┘
     │
     ├────<┌──────────────┐     ┌──────────────┐
     │     │ Achievement  │>────│AchievementDef│
     │     │  Unlock      │     └──────────────┘
     │     └──────────────┘
     │
     ├────<┌──────────────┐
     │     │ StreakState   │
     │     └──────────────┘
     │
     ├────<┌──────────────┐     ┌──────────────┐
     │     │  Session     │────<│SessionProblem│
     │     └──────────────┘     └──────────────┘
     │
     └────<┌──────────────┐
           │ StudyCircle  │
           │  Membership  │
           └──────────────┘
```

## Prisma Schema

```prisma
// ============================================================
// CURRICULUM (read-mostly, seeded from curriculum-graph.json)
// ============================================================

model Domain {
  id          String    @id // e.g. "numbers-operations"
  name        String    // "Numbers & Operations"
  color       String    // Hex color for Knowledge Nebula
  sortOrder   Int
  concepts    Concept[]
}

model Concept {
  id            String   @id // e.g. "NO-1.4a"
  domainId      String
  domain        Domain   @relation(fields: [domainId], references: [id])
  name          String   // "Fraction Operations"
  description   String
  gradeLevel    Int      // 6, 7, or 8
  sortOrder     Int      // within domain
  contentPath   String   // "numbers-operations/NO-1.4a" -> maps to MDX

  // Dependency graph (Principle III: No Dead-End Content)
  prerequisites ConceptPrerequisite[] @relation("dependent")
  successors    ConceptPrerequisite[] @relation("prerequisite")

  // Relations
  problems      Problem[]
  studentStates StudentConceptState[]
  reviewLogs    ReviewLog[]

  @@index([domainId, gradeLevel])
}

model ConceptPrerequisite {
  conceptId      String
  concept        Concept @relation("dependent", fields: [conceptId], references: [id])
  prerequisiteId String
  prerequisite   Concept @relation("prerequisite", fields: [prerequisiteId], references: [id])
  strength       Float   @default(1.0) // 0-1: how critical is this prereq

  @@id([conceptId, prerequisiteId])
}

model TopicConfusion {
  topicA         String
  topicB         String
  confusionScore Float   // 0.0 = never confused, 1.0 = always confused
  sampleSize     Int     @default(0)

  @@id([topicA, topicB])
  @@index([confusionScore(sort: Desc)])
}

// ============================================================
// PROBLEMS (seeded from problems.json per concept)
// ============================================================

model Problem {
  id              String   @id @default(cuid())
  conceptId       String
  concept         Concept  @relation(fields: [conceptId], references: [id])
  layer           Int      // 0=recall, 1=procedure, 2=understanding
  difficultyB     Float    // IRT difficulty parameter
  discriminationA Float    @default(1.0) // IRT discrimination
  templateType    String   // e.g. "fraction-addition-visual", "explain-why"
  content         Json     // Problem text, options, solution, visualization config
  explanationPrompt String? // "Why does this work?" prompt shown after correct answer (CP-I MUST)
  isTransfer      Boolean  @default(false) // Transfer problem (tests understanding)

  sessionProblems SessionProblem[]
  reviewLogs      ReviewLog[]

  @@index([conceptId, layer])
}

// ============================================================
// STUDENTS
// ============================================================

model Student {
  id                  String    @id @default(cuid())
  clerkUserId         String    @unique // Clerk external ID
  displayName         String
  gradeLevel          Int?
  createdAt           DateTime  @default(now())
  diagnosticCompleted Boolean   @default(false)

  // Gamification state
  totalXp             Int       @default(0)
  currentLevel        Int       @default(1)
  neurons             Int       @default(0) // Cosmetic currency

  // Avatar & preferences
  avatarConfig        Json      @default("{}") // Avatar customization
  themeId             String    @default("default-dark")
  soundEnabled        Boolean   @default(true)

  // Relations
  conceptStates       StudentConceptState[]
  reviewLogs          ReviewLog[]
  xpEvents            XpEvent[]
  achievementUnlocks  AchievementUnlock[]
  streakState         StreakState?
  sessions            Session[]
  studyCircles        StudyCircleMembership[]
  fsrsParams          StudentFsrsParams?

  @@index([clerkUserId])
}

// ============================================================
// SPACED REPETITION STATE (hot table — queried every session)
// ============================================================

model StudentConceptState {
  studentId    String
  student      Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
  conceptId    String
  concept      Concept @relation(fields: [conceptId], references: [id])
  layer        Int     // 0=recall, 1=procedure, 2=understanding

  stability    Float   @default(1.0)  // FSRS: days for R to drop to 0.9
  difficulty   Float   @default(5.0)  // FSRS: 1-10 scale
  lastReview   DateTime?
  nextReview   DateTime?              // Precomputed for efficient querying
  reviewCount  Int     @default(0)
  lapseCount   Int     @default(0)
  status       Int     @default(0)    // 0=learning, 1=reviewing, 2=mastered

  @@id([studentId, conceptId, layer])
  @@index([studentId, nextReview]) // Critical: find due items for a student
  @@index([studentId, status])
}

model StudentFsrsParams {
  studentId       String   @id
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  params          Float[]  // w0..w14 (15 learnable parameters)
  fittedAt        DateTime?
  reviewCountAtFit Int     @default(0)
  loss            Float?   // Training loss for monitoring
}

// ============================================================
// REVIEW HISTORY (append-only, used for analytics + model training)
// ============================================================

model ReviewLog {
  id                  String   @id @default(cuid())
  studentId           String
  student             Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  conceptId           String
  concept             Concept  @relation(fields: [conceptId], references: [id])
  problemId           String?
  problem             Problem? @relation(fields: [problemId], references: [id])
  layer               Int      // 0=recall, 1=procedure, 2=understanding

  reviewedAt          DateTime @default(now())
  responseTimeMs      Int?
  outcome             Int      // 0=incorrect, 1=correct, 2=partial, 3=skipped
  grade               Int      // 1=again, 2=hard, 3=good, 4=easy (auto-derived)
  hintsUsed           Int      @default(0)
  studentAnswer       String?
  errorType           Int?     // 0=calculation, 1=conceptual, 2=procedural, 3=careless

  // Snapshot of SRS state at time of review (for model training)
  stabilityBefore     Float?
  retrievabilityBefore Float?
  stabilityAfter      Float?

  @@index([studentId, reviewedAt])
  @@index([conceptId, reviewedAt])
}

// ============================================================
// SESSIONS
// ============================================================

model Session {
  id              String    @id @default(cuid())
  studentId       String
  student         Student   @relation(fields: [studentId], references: [id], onDelete: Cascade)
  startedAt       DateTime  @default(now())
  endedAt         DateTime?
  sessionType     Int       // 0=review, 1=new_lesson, 2=diagnostic, 3=mixed
  problemsAttempted Int     @default(0)
  problemsCorrect Int       @default(0)
  xpEarned        Int       @default(0)

  problems        SessionProblem[]

  @@index([studentId, startedAt])
}

model SessionProblem {
  id              String   @id @default(cuid())
  sessionId       String
  session         Session  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  problemId       String
  problem         Problem  @relation(fields: [problemId], references: [id])
  position        Int      // Order within session
  responseTimeMs  Int?
  outcome         Int?     // 0=incorrect, 1=correct, 2=partial, 3=skipped
  hintsUsed       Int      @default(0)
  studentAnswer   String?

  @@index([sessionId, position])
}

// ============================================================
// GAMIFICATION
// ============================================================

model XpEvent {
  id            String   @id @default(cuid())
  studentId     String
  student       Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  timestamp     DateTime @default(now())
  amount        Int
  source        String   // XpSource enum value
  multiplier    Float    @default(1.0)
  multiplierReason String?
  lessonId      String?  // Concept ID if lesson-related
  metadata      Json     @default("{}")

  @@index([studentId, timestamp])
}

model StreakState {
  studentId         String   @id
  student           Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  currentStreak     Int      @default(0)
  longestStreak     Int      @default(0)
  streakMode        String   @default("daily") // daily, weekday, custom
  scheduledDays     Int[]    // 0=Sun, 1=Mon, ..., 6=Sat
  shieldsAvailable  Int      @default(0) // 0-3
  lastActiveDate    DateTime?
  streakDecayFloor  Int      @default(0)
  isOnBreak         Boolean  @default(false)
  breakStartDate    DateTime?
  breakEndDate      DateTime?
  repairsUsedThisMonth Int   @default(0)
}

model AchievementDefinition {
  id          String   @id // e.g. "pythagorean-explorer"
  name        String
  description String
  category    String   // exploration, mastery, creativity, persistence, collaboration, discovery
  rarity      String   // common, uncommon, rare, epic, legendary
  xpReward    Int
  neuronReward Int
  criteria    Json     // Evaluation criteria (interpreted by achievement engine)
  isHidden    Boolean  @default(false)
  iconUrl     String?

  unlocks     AchievementUnlock[]
}

model AchievementUnlock {
  id              String   @id @default(cuid())
  studentId       String
  student         Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  achievementId   String
  achievement     AchievementDefinition @relation(fields: [achievementId], references: [id])
  unlockedAt      DateTime @default(now())

  @@unique([studentId, achievementId])
  @@index([studentId])
}

// ============================================================
// SOCIAL
// ============================================================

model StudyCircle {
  id          String   @id @default(cuid())
  name        String
  inviteCode  String   @unique
  createdAt   DateTime @default(now())

  members     StudyCircleMembership[]
}

model StudyCircleMembership {
  studentId     String
  student       Student     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  circleId      String
  circle        StudyCircle @relation(fields: [circleId], references: [id], onDelete: Cascade)
  joinedAt      DateTime    @default(now())
  role          String      @default("member") // member, admin

  @@id([studentId, circleId])
}

// ============================================================
// AI TUTOR
// ============================================================

model TutorConversation {
  id          String   @id @default(cuid())
  studentId   String
  conceptId   String?
  startedAt   DateTime @default(now())
  messages    TutorMessage[]
}

model TutorMessage {
  id              String   @id @default(cuid())
  conversationId  String
  conversation    TutorConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  role            String   // "student" or "tutor"
  content         String
  sceneCommands   Json?    // MathScene commands generated by AI
  timestamp       DateTime @default(now())

  @@index([conversationId, timestamp])
}
```

## Key Design Decisions

### 1. Three-Layer SRS State

`StudentConceptState` has a composite key of `(studentId, conceptId, layer)` where
layer is 0 (recall), 1 (procedure), or 2 (understanding). This enables the rote
detection algorithm: when procedure stability is high but understanding stability
is low, the system triggers conceptual re-teaching instead of more drill.

### 2. Precomputed `nextReview`

The `nextReview` column is computed after each review and stored. This means the
"get due items" query is a simple indexed range scan:
`WHERE studentId = ? AND nextReview <= NOW() AND status < 2`
No per-query forgetting curve computation needed.

### 3. ReviewLog as Append-Only

`ReviewLog` is an immutable event stream. It grows at ~20 rows/student/day.
At 10K students and 365 days = ~73M rows/year. Partition by `reviewedAt` month
in production. Used for FSRS parameter fitting and analytics, never for real-time
queries during sessions.

### 4. Content as Files, Not Database

Lesson content (MDX, animation JSON, problem banks) lives in `src/content/` as
files, not in the database. This supports:
- Git versioning (DR-4, Principle VII)
- Static generation at build time (performance)
- Community contribution via PRs
- Offline caching via service worker

The database stores only the curriculum graph structure (Domain, Concept,
ConceptPrerequisite) and problem metadata (for IRT parameter tracking). The
actual content rendering happens from files.

### 5. Gamification State Separated

XP events, streak state, and achievement unlocks are separate tables rather than
denormalized onto the Student model. This allows:
- XP history replay and auditing
- Streak state machine logic without race conditions
- Achievement evaluation as a background job
- Easy A/B testing of gamification parameters

### 6. Study Circles via Invite Code

No friend request system (reduces privacy complexity for COPPA). Students share
a short invite code to join a Study Circle. Max 8 members enforced at application
layer.

## Indexes & Performance

| Query | Table | Index | Expected Latency |
|-------|-------|-------|-----------------|
| Get due items for student | StudentConceptState | `(studentId, nextReview)` | <5ms |
| Get student progress overview | StudentConceptState | `(studentId, status)` | <5ms |
| Insert review log | ReviewLog | Append-only | <2ms |
| Get recent XP events | XpEvent | `(studentId, timestamp)` | <3ms |
| Load curriculum graph | Concept + ConceptPrerequisite | `(domainId, gradeLevel)` | <10ms |
| Get student achievements | AchievementUnlock | `(studentId)` | <3ms |

## Data Volume Estimates (10K students, 1 year)

| Table | Rows | Growth |
|-------|------|--------|
| Student | 10K | Slow |
| Concept | 72 | Static |
| TopicConfusion | ~200 | Slow (updated from population error data) |
| Problem | ~5K | Slow (content additions) |
| StudentConceptState | 2.16M (10K × 72 × 3) | Slow (new students) |
| ReviewLog | 73M | ~200K/day |
| XpEvent | 36.5M | ~100K/day |
| Session | 3.65M | ~10K/day |
| SessionProblem | 73M | ~200K/day |

PostgreSQL handles this comfortably. Partition ReviewLog and SessionProblem by
month when approaching 100M rows.
