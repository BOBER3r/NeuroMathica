import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const gamificationRouter = router({
  getXpHistory: protectedProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(100).optional().default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const events = await ctx.db.xpEvent.findMany({
        where: { studentId: ctx.student.id },
        orderBy: { timestamp: "desc" },
        take: input.limit,
      });

      return events.map((e) => ({
        id: e.id,
        amount: e.amount,
        source: e.source,
        multiplier: e.multiplier,
        multiplierReason: e.multiplierReason,
        timestamp: e.timestamp,
      }));
    }),

  getLevelInfo: protectedProcedure.query(({ ctx }) => {
    const student = ctx.student;
    // Simple level calc for now — enhanced by level-engine in T072
    const xpForCurrentLevel = Math.floor(100 * Math.pow(1.15, student.currentLevel - 1));
    const xpForNextLevel = Math.floor(100 * Math.pow(1.15, student.currentLevel));

    const tiers = [
      "Spark", "Signal", "Synapse", "Circuit", "Network",
      "Cortex", "Hemisphere", "Resonance", "Architect", "Transcendent",
    ];
    const tierIndex = Math.min(Math.floor((student.currentLevel - 1) / 10), 9);

    return {
      level: student.currentLevel,
      tierName: tiers[tierIndex] ?? "Spark",
      totalXp: student.totalXp,
      xpToNextLevel: xpForNextLevel - student.totalXp,
      neurons: student.neurons,
      progressPercent: xpForNextLevel > xpForCurrentLevel
        ? ((student.totalXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100
        : 0,
    };
  }),

  getAchievements: protectedProcedure.query(async ({ ctx }) => {
    const [definitions, unlocks] = await Promise.all([
      ctx.db.achievementDefinition.findMany({
        where: { isHidden: false },
        orderBy: { category: "asc" },
      }),
      ctx.db.achievementUnlock.findMany({
        where: { studentId: ctx.student.id },
      }),
    ]);

    const unlockedIds = new Set(unlocks.map((u) => u.achievementId));

    return definitions.map((def) => ({
      id: def.id,
      name: def.name,
      description: def.description,
      category: def.category,
      rarity: def.rarity,
      xpReward: def.xpReward,
      neuronReward: def.neuronReward,
      iconUrl: def.iconUrl,
      unlocked: unlockedIds.has(def.id),
      unlockedAt: unlocks.find((u) => u.achievementId === def.id)?.unlockedAt ?? null,
    }));
  }),

  getStreak: protectedProcedure.query(async ({ ctx }) => {
    const streak = await ctx.db.streakState.findUnique({
      where: { studentId: ctx.student.id },
    });

    if (!streak) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        shieldsAvailable: 0,
        streakMode: "daily",
        todayCompleted: false,
        isOnBreak: false,
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCompleted = streak.lastActiveDate
      ? streak.lastActiveDate >= today
      : false;

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      shieldsAvailable: streak.shieldsAvailable,
      streakMode: streak.streakMode,
      todayCompleted,
      isOnBreak: streak.isOnBreak,
    };
  }),

  getLeaderboard: protectedProcedure
    .input(z.object({ circleId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (input.circleId) {
        const members = await ctx.db.studyCircleMembership.findMany({
          where: { circleId: input.circleId },
          include: {
            student: {
              select: { id: true, displayName: true, totalXp: true, currentLevel: true },
            },
          },
        });

        return members
          .map((m) => ({
            studentId: m.student.id,
            displayName: m.student.displayName,
            totalXp: m.student.totalXp,
            level: m.student.currentLevel,
            isCurrentUser: m.studentId === ctx.student.id,
          }))
          .sort((a, b) => b.totalXp - a.totalXp);
      }

      return [];
    }),

  claimReward: protectedProcedure
    .input(
      z.object({
        rewardId: z.string(),
        neuronCost: z.number().int().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.student.neurons < input.neuronCost) {
        return { success: false, reason: "Insufficient neurons" };
      }

      await ctx.db.student.update({
        where: { id: ctx.student.id },
        data: { neurons: { decrement: input.neuronCost } },
      });

      return { success: true };
    }),
});
