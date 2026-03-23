-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concept" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gradeLevel" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "contentPath" TEXT NOT NULL,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConceptPrerequisite" (
    "conceptId" TEXT NOT NULL,
    "prerequisiteId" TEXT NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "ConceptPrerequisite_pkey" PRIMARY KEY ("conceptId","prerequisiteId")
);

-- CreateTable
CREATE TABLE "TopicConfusion" (
    "topicA" TEXT NOT NULL,
    "topicB" TEXT NOT NULL,
    "confusionScore" DOUBLE PRECISION NOT NULL,
    "sampleSize" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TopicConfusion_pkey" PRIMARY KEY ("topicA","topicB")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "layer" INTEGER NOT NULL,
    "difficultyB" DOUBLE PRECISION NOT NULL,
    "discriminationA" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "templateType" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "explanationPrompt" TEXT,
    "isTransfer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "gradeLevel" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diagnosticCompleted" BOOLEAN NOT NULL DEFAULT false,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "currentLevel" INTEGER NOT NULL DEFAULT 1,
    "neurons" INTEGER NOT NULL DEFAULT 0,
    "avatarConfig" JSONB NOT NULL DEFAULT '{}',
    "themeId" TEXT NOT NULL DEFAULT 'default-dark',
    "soundEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentConceptState" (
    "studentId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "layer" INTEGER NOT NULL,
    "stability" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "difficulty" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "lastReview" TIMESTAMP(3),
    "nextReview" TIMESTAMP(3),
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "lapseCount" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StudentConceptState_pkey" PRIMARY KEY ("studentId","conceptId","layer")
);

-- CreateTable
CREATE TABLE "StudentFsrsParams" (
    "studentId" TEXT NOT NULL,
    "params" DOUBLE PRECISION[],
    "fittedAt" TIMESTAMP(3),
    "reviewCountAtFit" INTEGER NOT NULL DEFAULT 0,
    "loss" DOUBLE PRECISION,

    CONSTRAINT "StudentFsrsParams_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "ReviewLog" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "problemId" TEXT,
    "layer" INTEGER NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseTimeMs" INTEGER,
    "outcome" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "hintsUsed" INTEGER NOT NULL DEFAULT 0,
    "studentAnswer" TEXT,
    "errorType" INTEGER,
    "stabilityBefore" DOUBLE PRECISION,
    "retrievabilityBefore" DOUBLE PRECISION,
    "stabilityAfter" DOUBLE PRECISION,

    CONSTRAINT "ReviewLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "sessionType" INTEGER NOT NULL,
    "problemsAttempted" INTEGER NOT NULL DEFAULT 0,
    "problemsCorrect" INTEGER NOT NULL DEFAULT 0,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionProblem" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "responseTimeMs" INTEGER,
    "outcome" INTEGER,
    "hintsUsed" INTEGER NOT NULL DEFAULT 0,
    "studentAnswer" TEXT,

    CONSTRAINT "SessionProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XpEvent" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "multiplierReason" TEXT,
    "lessonId" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "XpEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreakState" (
    "studentId" TEXT NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "streakMode" TEXT NOT NULL DEFAULT 'daily',
    "scheduledDays" INTEGER[],
    "shieldsAvailable" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),
    "streakDecayFloor" INTEGER NOT NULL DEFAULT 0,
    "isOnBreak" BOOLEAN NOT NULL DEFAULT false,
    "breakStartDate" TIMESTAMP(3),
    "breakEndDate" TIMESTAMP(3),
    "repairsUsedThisMonth" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StreakState_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "AchievementDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "neuronReward" INTEGER NOT NULL,
    "criteria" JSONB NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "iconUrl" TEXT,

    CONSTRAINT "AchievementDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementUnlock" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AchievementUnlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyCircle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyCircle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyCircleMembership" (
    "studentId" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'member',

    CONSTRAINT "StudyCircleMembership_pkey" PRIMARY KEY ("studentId","circleId")
);

-- CreateTable
CREATE TABLE "TutorConversation" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "conceptId" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sceneCommands" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TutorMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Concept_domainId_gradeLevel_idx" ON "Concept"("domainId", "gradeLevel");

-- CreateIndex
CREATE INDEX "TopicConfusion_confusionScore_idx" ON "TopicConfusion"("confusionScore" DESC);

-- CreateIndex
CREATE INDEX "Problem_conceptId_layer_idx" ON "Problem"("conceptId", "layer");

-- CreateIndex
CREATE UNIQUE INDEX "Student_clerkUserId_key" ON "Student"("clerkUserId");

-- CreateIndex
CREATE INDEX "Student_clerkUserId_idx" ON "Student"("clerkUserId");

-- CreateIndex
CREATE INDEX "StudentConceptState_studentId_nextReview_idx" ON "StudentConceptState"("studentId", "nextReview");

-- CreateIndex
CREATE INDEX "StudentConceptState_studentId_status_idx" ON "StudentConceptState"("studentId", "status");

-- CreateIndex
CREATE INDEX "ReviewLog_studentId_reviewedAt_idx" ON "ReviewLog"("studentId", "reviewedAt");

-- CreateIndex
CREATE INDEX "ReviewLog_conceptId_reviewedAt_idx" ON "ReviewLog"("conceptId", "reviewedAt");

-- CreateIndex
CREATE INDEX "Session_studentId_startedAt_idx" ON "Session"("studentId", "startedAt");

-- CreateIndex
CREATE INDEX "SessionProblem_sessionId_position_idx" ON "SessionProblem"("sessionId", "position");

-- CreateIndex
CREATE INDEX "XpEvent_studentId_timestamp_idx" ON "XpEvent"("studentId", "timestamp");

-- CreateIndex
CREATE INDEX "AchievementUnlock_studentId_idx" ON "AchievementUnlock"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementUnlock_studentId_achievementId_key" ON "AchievementUnlock"("studentId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyCircle_inviteCode_key" ON "StudyCircle"("inviteCode");

-- CreateIndex
CREATE INDEX "TutorMessage_conversationId_timestamp_idx" ON "TutorMessage"("conversationId", "timestamp");

-- AddForeignKey
ALTER TABLE "Concept" ADD CONSTRAINT "Concept_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConceptPrerequisite" ADD CONSTRAINT "ConceptPrerequisite_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConceptPrerequisite" ADD CONSTRAINT "ConceptPrerequisite_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentConceptState" ADD CONSTRAINT "StudentConceptState_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentConceptState" ADD CONSTRAINT "StudentConceptState_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFsrsParams" ADD CONSTRAINT "StudentFsrsParams_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewLog" ADD CONSTRAINT "ReviewLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewLog" ADD CONSTRAINT "ReviewLog_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewLog" ADD CONSTRAINT "ReviewLog_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionProblem" ADD CONSTRAINT "SessionProblem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionProblem" ADD CONSTRAINT "SessionProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpEvent" ADD CONSTRAINT "XpEvent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreakState" ADD CONSTRAINT "StreakState_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementUnlock" ADD CONSTRAINT "AchievementUnlock_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementUnlock" ADD CONSTRAINT "AchievementUnlock_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "AchievementDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyCircleMembership" ADD CONSTRAINT "StudyCircleMembership_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyCircleMembership" ADD CONSTRAINT "StudyCircleMembership_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "StudyCircle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorMessage" ADD CONSTRAINT "TutorMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "TutorConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
