import { router, protectedProcedure } from "../trpc";

export const progressRouter = router({
  getOverview: protectedProcedure.query(async ({ ctx }) => {
    const student = ctx.student;
    const now = new Date();

    const [conceptStates, recentXp, reviewDueCount] = await Promise.all([
      ctx.db.studentConceptState.groupBy({
        by: ["status"],
        where: { studentId: student.id },
        _count: true,
      }),
      ctx.db.xpEvent.findMany({
        where: { studentId: student.id },
        orderBy: { timestamp: "desc" },
        take: 50,
      }),
      ctx.db.studentConceptState.count({
        where: {
          studentId: student.id,
          nextReview: { lte: now },
          status: { lt: 2 },
        },
      }),
    ]);

    const statusCounts = {
      learning: 0,
      reviewing: 0,
      mastered: 0,
    };
    for (const group of conceptStates) {
      if (group.status === 0) statusCounts.learning += group._count;
      else if (group.status === 1) statusCounts.reviewing += group._count;
      else if (group.status === 2) statusCounts.mastered += group._count;
    }

    return {
      student: {
        level: student.currentLevel,
        totalXp: student.totalXp,
        neurons: student.neurons,
      },
      curriculum: {
        totalConcepts: 72,
        mastered: statusCounts.mastered,
        inProgress: statusCounts.learning + statusCounts.reviewing,
        reviewDue: reviewDueCount,
      },
      recentXp: recentXp.map((e) => ({
        amount: e.amount,
        source: e.source,
        timestamp: e.timestamp,
      })),
    };
  }),

  getConceptStates: protectedProcedure.query(async ({ ctx }) => {
    const states = await ctx.db.studentConceptState.findMany({
      where: { studentId: ctx.student.id },
      include: { concept: { select: { id: true, name: true, domainId: true } } },
    });

    return states.map((s) => ({
      conceptId: s.conceptId,
      conceptName: s.concept.name,
      domainId: s.concept.domainId,
      layer: s.layer,
      stability: s.stability,
      difficulty: s.difficulty,
      status: s.status,
      nextReview: s.nextReview,
    }));
  }),

  getReviewForecast: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    weekEnd.setHours(23, 59, 59, 999);

    const [dueToday, dueTomorrow, dueThisWeek] = await Promise.all([
      ctx.db.studentConceptState.count({
        where: {
          studentId: ctx.student.id,
          nextReview: { lte: now },
          status: { lt: 2 },
        },
      }),
      ctx.db.studentConceptState.count({
        where: {
          studentId: ctx.student.id,
          nextReview: { gt: now, lte: tomorrow },
          status: { lt: 2 },
        },
      }),
      ctx.db.studentConceptState.count({
        where: {
          studentId: ctx.student.id,
          nextReview: { gt: now, lte: weekEnd },
          status: { lt: 2 },
        },
      }),
    ]);

    return { dueToday, dueTomorrow, dueThisWeek };
  }),
});
