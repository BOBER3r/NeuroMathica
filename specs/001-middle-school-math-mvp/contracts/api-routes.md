# API Contracts: tRPC Router Definitions

**Date**: 2026-03-22 | **Plan**: [../plan.md](../plan.md)

All API routes use tRPC with end-to-end type safety. The tRPC router is mounted
at `/api/trpc/[trpc]` in Next.js App Router.

## Router Structure

```
appRouter
├── auth
│   ├── getSession          # Current user session
│   └── updateProfile       # Display name, grade level, preferences
├── curriculum
│   ├── getDomains          # All domains with concept counts
│   ├── getConcept          # Single concept with prereqs + successors
│   ├── getGraph            # Full dependency DAG (for Knowledge Nebula)
│   └── getTopicStatus      # Student's status for a concept (locked/available/etc)
├── lesson
│   ├── getLesson           # Full lesson content for a concept
│   ├── completeStage       # Mark NLS stage as completed
│   ├── submitReflection    # Stage 7 self-explanation text
│   └── getLessonProgress   # Current stage + completion state
├── practice
│   ├── generateSession     # Generate a daily review/practice session
│   ├── getNextProblem      # Get next problem (IRT-selected)
│   ├── submitAnswer        # Submit answer + get feedback
│   ├── getSessionSummary   # Post-session stats
│   └── getDiagnostic       # Generate diagnostic assessment (cold start)
├── progress
│   ├── getOverview         # Student dashboard data
│   ├── getConceptStates    # All SRS states for Knowledge Nebula
│   ├── getStreak           # Current streak state
│   └── getReviewForecast   # Items due today, tomorrow, this week
├── gamification
│   ├── getXpHistory        # Recent XP events with sources
│   ├── getLevelInfo        # Current level, tier, XP to next
│   ├── getAchievements     # All achievements (locked + unlocked)
│   ├── getLeaderboard      # Study Circle weekly leaderboard
│   └── claimReward         # Spend neurons on cosmetic item
├── social
│   ├── createCircle        # Create a Study Circle
│   ├── joinCircle          # Join via invite code
│   ├── getCircle           # Circle members + stats
│   └── leaveCircle         # Leave a circle
└── tutor
    ├── sendMessage         # Send message to AI tutor
    ├── getConversation     # Load conversation history
    └── generateVisualization  # AI generates MathScene commands
```

## Key Route Specifications

### practice.generateSession

```typescript
// Input
{
  sessionType: "review" | "mixed" | "diagnostic";
  maxItems?: number;     // default 25
  maxMinutes?: number;   // default 20
}

// Output
{
  sessionId: string;
  items: Array<{
    conceptId: string;
    conceptName: string;
    layer: 0 | 1 | 2;
    reason: "scheduled_review" | "prerequisite_refresh" | "new_material";
    priority: "high" | "normal" | "low";
  }>;
  composition: {
    reviewCount: number;
    newCount: number;
    topicClusters: string[];  // 3-4 interleaved clusters
  };
}
```

### practice.submitAnswer

```typescript
// Input
{
  sessionId: string;
  problemId: string;
  answer: string;
  responseTimeMs: number;
  hintsUsed: number;
}

// Output
{
  correct: boolean;
  grade: 1 | 2 | 3 | 4;            // Auto-derived (AGAIN/HARD/GOOD/EASY)
  explanation?: string;               // Why the answer is correct/incorrect
  xpEarned: number;
  stabilityChange: {
    before: number;
    after: number;
  };
  emotionalState: "engaged" | "productive_struggle" | "frustrated" | "bored";
  nextAction: "continue" | "easier_problem" | "confidence_builder" | "concept_reteach";
}
```

### lesson.submitReflection

```typescript
// Input
{
  conceptId: string;
  reflectionText: string;             // Student's self-explanation
}

// Output
{
  qualityScore: number;               // 0-5 (AI-evaluated)
  xpEarned: number;                   // 0-80 based on quality
  feedback: string;                   // AI feedback on explanation
  referencesPriorConcept: boolean;    // Triggers Connection Maker multiplier
  ahaDetected: boolean;               // Triggers Aha Moment celebration
  multiplier: number;                 // Applied XP multiplier
}
```

### tutor.sendMessage

```typescript
// Input
{
  conversationId?: string;            // null for new conversation
  conceptId: string;
  message: string;
  currentSceneState?: Json;           // What the canvas currently shows
}

// Output (streamed)
{
  conversationId: string;
  response: string;                   // Streamed text response
  sceneCommands?: Array<{             // Optional canvas modifications
    action: "create" | "modify" | "animate" | "remove";
    target?: string;                  // Object ID
    type?: string;                    // "point" | "line" | "vector" | etc
    properties?: Record<string, any>;
    animate?: string;                 // "fadeIn" | "grow" | "morphTo" | etc
  }>;
  mode: "socratic" | "direct";       // Socratic by default
}
```

### progress.getOverview

```typescript
// Output
{
  student: {
    level: number;
    tierName: string;                 // "Synapse", "Circuit", etc.
    totalXp: number;
    xpToNextLevel: number;
    neurons: number;
  };
  streak: {
    current: number;
    longest: number;
    shieldsAvailable: number;
    todayCompleted: boolean;
  };
  curriculum: {
    totalConcepts: number;            // 72
    mastered: number;
    inProgress: number;
    available: number;
    reviewDue: number;
  };
  recentActivity: Array<{
    date: string;                     // ISO date
    xpEarned: number;
    conceptsReviewed: number;
    lessonsCompleted: number;
  }>;
  weeklyStats: {
    explanationQualityAvg: number;    // 0-5
    practiceAccuracy: number;         // 0-1
    totalTimeMinutes: number;
  };
}
```

## Authentication

All routes except `auth.getSession` require authentication via Clerk.
The tRPC context extracts the Clerk user ID and resolves the Student record.

```typescript
// server/trpc/context.ts
export async function createContext(opts: CreateNextContextOptions) {
  const { userId } = await auth();
  const student = userId
    ? await db.student.findUnique({ where: { clerkUserId: userId } })
    : null;
  return { db, student, userId };
}
```

Protected routes use a middleware that throws if `ctx.student` is null.

## Rate Limits

| Route Group | Limit | Window |
|-------------|-------|--------|
| tutor.* | 60 requests | per minute |
| practice.submitAnswer | 120 requests | per minute |
| gamification.claimReward | 10 requests | per minute |
| All others | 300 requests | per minute |

## Error Codes

| Code | Meaning |
|------|---------|
| UNAUTHORIZED | Not authenticated |
| FORBIDDEN | Student doesn't have access (e.g., concept locked) |
| NOT_FOUND | Resource doesn't exist |
| PREREQUISITE_NOT_MET | Concept prerequisites not satisfied |
| RATE_LIMITED | Too many requests |
| SESSION_EXPIRED | Practice session timed out |
