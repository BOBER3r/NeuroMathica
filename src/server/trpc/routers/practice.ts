import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { calculateXp } from "@/server/services/gamification/xp-calculator";

export const practiceRouter = router({
  generateSession: protectedProcedure
    .input(
      z.object({
        sessionType: z.enum(["review", "mixed", "diagnostic"]),
        maxItems: z.number().int().min(1).max(50).optional().default(25),
        maxMinutes: z.number().int().min(5).max(60).optional().default(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get due items from SRS
      const dueItems = await ctx.db.studentConceptState.findMany({
        where: {
          studentId: ctx.student.id,
          nextReview: { lte: new Date() },
          status: { lt: 2 },
        },
        include: { concept: true },
        orderBy: { nextReview: "asc" },
        take: input.maxItems,
      });

      // Create session
      const session = await ctx.db.session.create({
        data: {
          studentId: ctx.student.id,
          sessionType:
            input.sessionType === "review" ? 0 :
            input.sessionType === "diagnostic" ? 2 : 3,
        },
      });

      return {
        sessionId: session.id,
        items: dueItems.map((item) => ({
          conceptId: item.conceptId,
          conceptName: item.concept.name,
          layer: item.layer as 0 | 1 | 2,
          reason: "scheduled_review" as const,
          priority: item.nextReview && item.nextReview < new Date()
            ? ("high" as const)
            : ("normal" as const),
        })),
        composition: {
          reviewCount: dueItems.length,
          newCount: 0,
          topicClusters: [...new Set(dueItems.map((i) => i.concept.domainId))],
        },
      };
    }),

  getNextProblem: protectedProcedure
    .input(z.object({ sessionId: z.string(), conceptId: z.string(), layer: z.number() }))
    .query(async ({ ctx, input }) => {
      const problem = await ctx.db.problem.findFirst({
        where: { conceptId: input.conceptId, layer: input.layer },
        orderBy: { difficultyB: "asc" },
      });
      return problem;
    }),

  submitAnswer: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        problemId: z.string(),
        answer: z.string(),
        responseTimeMs: z.number().int(),
        hintsUsed: z.number().int().min(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const problem = await ctx.db.problem.findUnique({
        where: { id: input.problemId },
      });

      if (!problem) {
        return { correct: false, grade: 1 as const, xpEarned: 0, emotionalState: "engaged" as const, nextAction: "continue" as const };
      }

      const content = problem.content as { solution?: string };
      const correct = input.answer.trim().toLowerCase() === String(content.solution ?? "").trim().toLowerCase();

      // Auto-grade
      let grade: 1 | 2 | 3 | 4;
      if (!correct) {
        grade = 1;
      } else if (input.hintsUsed > 0 || input.responseTimeMs > 30000) {
        grade = 2;
      } else if (input.responseTimeMs < 10000) {
        grade = 4;
      } else {
        grade = 3;
      }

      // Record in session
      const sessionProblemsCount = await ctx.db.sessionProblem.count({
        where: { sessionId: input.sessionId },
      });

      await ctx.db.sessionProblem.create({
        data: {
          sessionId: input.sessionId,
          problemId: input.problemId,
          position: sessionProblemsCount,
          responseTimeMs: input.responseTimeMs,
          outcome: correct ? 1 : 0,
          hintsUsed: input.hintsUsed,
          studentAnswer: input.answer,
        },
      });

      // Update session counters
      await ctx.db.session.update({
        where: { id: input.sessionId },
        data: {
          problemsAttempted: { increment: 1 },
          ...(correct ? { problemsCorrect: { increment: 1 } } : {}),
        },
      });

      // Award XP for practice (T080)
      let xpEarned = 0;
      if (correct) {
        const xpResult = calculateXp("spaced_review", {
          isFirstTry: input.hintsUsed === 0 && grade >= 3,
        });
        xpEarned = xpResult.finalAmount;

        if (xpEarned > 0) {
          await ctx.db.xpEvent.create({
            data: {
              studentId: ctx.student.id,
              amount: xpEarned,
              source: "spaced_review",
              multiplier: xpResult.multipliers.length > 0
                ? xpResult.multipliers.reduce((acc, m) => acc * m.value, 1)
                : 1.0,
            },
          });

          await ctx.db.student.update({
            where: { id: ctx.student.id },
            data: {
              totalXp: { increment: xpEarned },
              neurons: { increment: xpResult.neuronsEarned },
            },
          });

          await ctx.db.session.update({
            where: { id: input.sessionId },
            data: { xpEarned: { increment: xpEarned } },
          });
        }
      }

      return {
        correct,
        grade,
        xpEarned,
        emotionalState: "engaged" as const,
        nextAction: "continue" as const,
      };
    }),

  getSessionSummary: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const session = await ctx.db.session.findUnique({
        where: { id: input.sessionId },
        include: {
          problems: {
            include: { problem: { include: { concept: true } } },
            orderBy: { position: "asc" },
          },
        },
      });

      if (!session) return null;

      return {
        sessionId: session.id,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        problemsAttempted: session.problemsAttempted,
        problemsCorrect: session.problemsCorrect,
        accuracy: session.problemsAttempted > 0
          ? session.problemsCorrect / session.problemsAttempted
          : 0,
        xpEarned: session.xpEarned,
        conceptsReviewed: [
          ...new Set(session.problems.map((p) => p.problem.conceptId)),
        ],
      };
    }),
});
