import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import {
  loadLesson,
  listLessons,
  listDomains,
  LessonNotFoundError,
} from "@/server/services/content/lesson-loader";
import { calculateXp } from "@/server/services/gamification/xp-calculator";
import { evaluateExplanation } from "@/server/services/ai/explanation-evaluator";

export const lessonRouter = router({
  /**
   * Loads full lesson content by conceptId.
   * Maps conceptId to contentPath via the database, then reads from file system.
   */
  getLesson: publicProcedure
    .input(z.object({ conceptId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      // Look up the concept in the database to get its contentPath
      const concept = await ctx.db.concept.findUnique({
        where: { id: input.conceptId },
        select: { contentPath: true },
      });

      if (!concept) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Concept not found: ${input.conceptId}`,
        });
      }

      try {
        const lesson = await loadLesson(concept.contentPath);
        return lesson;
      } catch (error) {
        if (error instanceof LessonNotFoundError) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Lesson content not found for concept: ${input.conceptId}`,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to load lesson content",
          cause: error,
        });
      }
    }),

  /**
   * Marks a lesson stage as completed for the authenticated student.
   * Updates or creates the StudentConceptState record.
   */
  completeStage: protectedProcedure
    .input(
      z.object({
        conceptId: z.string().min(1),
        stage: z.enum([
          "hook",
          "spatial",
          "discovery",
          "symbol",
          "realWorld",
          "practice",
          "reflection",
        ]),
        layer: z.number().int().min(0).max(2).default(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const studentId = ctx.student.id;

      // Map stages to numeric progress for status tracking
      const stageOrder: Record<string, number> = {
        hook: 1,
        spatial: 2,
        discovery: 3,
        symbol: 4,
        realWorld: 5,
        practice: 6,
        reflection: 7,
      };

      const stageNumber = stageOrder[input.stage];
      if (stageNumber === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid stage: ${input.stage}`,
        });
      }

      const isComplete = input.stage === "reflection";

      // Upsert the StudentConceptState
      const state = await ctx.db.studentConceptState.upsert({
        where: {
          studentId_conceptId_layer: {
            studentId,
            conceptId: input.conceptId,
            layer: input.layer,
          },
        },
        update: {
          // Move to "reviewing" status when all stages are complete
          status: isComplete ? 1 : 0,
          lastReview: isComplete ? new Date() : undefined,
          reviewCount: isComplete ? { increment: 1 } : undefined,
        },
        create: {
          studentId,
          conceptId: input.conceptId,
          layer: input.layer,
          status: isComplete ? 1 : 0,
          stability: 1.0,
          difficulty: 5.0,
          lastReview: isComplete ? new Date() : null,
          reviewCount: isComplete ? 1 : 0,
        },
      });

      // Award XP based on stage (T079)
      const xpSourceMap: Record<string, Parameters<typeof calculateXp>[0]> = {
        hook: "lesson_completion",
        spatial: "exploration_depth",
        discovery: "discovery_insight",
        symbol: "lesson_completion",
        realWorld: "real_world_connection",
        practice: "practice_session",
        reflection: "lesson_completion",
      };

      const xpSource = xpSourceMap[input.stage] ?? "lesson_completion";
      const xpResult = calculateXp(xpSource, {});

      if (xpResult.finalAmount > 0) {
        await ctx.db.xpEvent.create({
          data: {
            studentId,
            amount: xpResult.finalAmount,
            source: xpSource,
            multiplier: xpResult.multipliers.length > 0
              ? xpResult.multipliers.reduce((acc, m) => acc * m.value, 1)
              : 1.0,
            lessonId: input.conceptId,
          },
        });

        await ctx.db.student.update({
          where: { id: studentId },
          data: {
            totalXp: { increment: xpResult.finalAmount },
            neurons: { increment: xpResult.neuronsEarned },
          },
        });
      }

      return {
        conceptId: input.conceptId,
        stage: input.stage,
        completed: true,
        status: state.status,
        xpEarned: xpResult.finalAmount,
      };
    }),

  /**
   * Saves a student's reflection text for a lesson (Stage 7).
   * Records the reflection as a ReviewLog entry.
   */
  submitReflection: protectedProcedure
    .input(
      z.object({
        conceptId: z.string().min(1),
        reflectionText: z.string().min(1).max(5000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const studentId = ctx.student.id;

      // Verify the concept exists
      const concept = await ctx.db.concept.findUnique({
        where: { id: input.conceptId },
        select: { id: true },
      });

      if (!concept) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Concept not found: ${input.conceptId}`,
        });
      }

      // Evaluate reflection quality with AI (T097)
      let qualityScore = 1;
      let feedback = "Thank you for your reflection!";
      let referencesPriorConcept = false;
      let ahaDetected = false;
      let xpMultiplier = 1.0;

      try {
        const evaluation = await evaluateExplanation(
          input.reflectionText,
          concept.id,
          "",
          ctx.student.currentLevel,
        );
        qualityScore = evaluation.qualityScore;
        feedback = evaluation.feedback;
        referencesPriorConcept = evaluation.referencesPriorConcept;
        ahaDetected = evaluation.ahaDetected;
        xpMultiplier = evaluation.xpMultiplier;
      } catch {
        // AI evaluation failed — use defaults
      }

      // Log the reflection as a review event at the understanding layer
      const reviewLog = await ctx.db.reviewLog.create({
        data: {
          studentId,
          conceptId: input.conceptId,
          layer: 2, // understanding layer
          outcome: 1, // correct (reflection submitted)
          grade: Math.min(4, Math.max(1, Math.round(qualityScore))) as 1 | 2 | 3 | 4,
          studentAnswer: input.reflectionText,
        },
      });

      // Award reflection XP (T079)
      const xpResult = calculateXp("reflection_quality", {
        qualityScore,
        referencesPrior: referencesPriorConcept,
      });

      if (xpResult.finalAmount > 0) {
        await ctx.db.xpEvent.create({
          data: {
            studentId,
            amount: xpResult.finalAmount,
            source: "reflection_quality",
            multiplier: xpMultiplier,
            multiplierReason: referencesPriorConcept ? "Connection Maker" : undefined,
            lessonId: input.conceptId,
          },
        });

        await ctx.db.student.update({
          where: { id: studentId },
          data: {
            totalXp: { increment: xpResult.finalAmount },
            neurons: { increment: xpResult.neuronsEarned },
          },
        });
      }

      return {
        conceptId: input.conceptId,
        reviewLogId: reviewLog.id,
        saved: true,
        qualityScore,
        feedback,
        referencesPriorConcept,
        ahaDetected,
        xpEarned: xpResult.finalAmount,
        xpMultiplier,
      };
    }),

  /**
   * Returns the current lesson progress for the authenticated student.
   * Includes concept state across all layers and review information.
   */
  getLessonProgress: protectedProcedure
    .input(z.object({ conceptId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const studentId = ctx.student.id;

      // Get all layer states for this concept
      const states = await ctx.db.studentConceptState.findMany({
        where: {
          studentId,
          conceptId: input.conceptId,
        },
        orderBy: { layer: "asc" },
      });

      // Get the most recent review log for this concept
      const lastReview = await ctx.db.reviewLog.findFirst({
        where: {
          studentId,
          conceptId: input.conceptId,
        },
        orderBy: { reviewedAt: "desc" },
        select: {
          reviewedAt: true,
          outcome: true,
          layer: true,
        },
      });

      // Determine overall status
      const layerStates = states.map((s) => ({
        layer: s.layer,
        status: s.status,
        stability: s.stability,
        difficulty: s.difficulty,
        lastReview: s.lastReview,
        nextReview: s.nextReview,
        reviewCount: s.reviewCount,
      }));

      const isStarted = states.length > 0;
      const allMastered =
        states.length > 0 && states.every((s) => s.status === 2);

      return {
        conceptId: input.conceptId,
        isStarted,
        allMastered,
        layers: layerStates,
        lastReview: lastReview
          ? {
              reviewedAt: lastReview.reviewedAt,
              outcome: lastReview.outcome,
              layer: lastReview.layer,
            }
          : null,
      };
    }),

  /**
   * Lists all available lessons within a domain.
   */
  listLessons: publicProcedure
    .input(z.object({ domainId: z.string().min(1) }))
    .query(async ({ input }) => {
      const lessons = await listLessons(input.domainId);
      return { domainId: input.domainId, lessons };
    }),

  /**
   * Lists all content domains.
   */
  listDomains: publicProcedure.query(async () => {
    const domains = await listDomains();
    return { domains };
  }),
});
