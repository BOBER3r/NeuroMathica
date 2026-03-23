import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    if (!ctx.student) return null;
    return {
      studentId: ctx.student.id,
      displayName: ctx.student.displayName,
      gradeLevel: ctx.student.gradeLevel,
      totalXp: ctx.student.totalXp,
      currentLevel: ctx.student.currentLevel,
      neurons: ctx.student.neurons,
      themeId: ctx.student.themeId,
      soundEnabled: ctx.student.soundEnabled,
      diagnosticCompleted: ctx.student.diagnosticCompleted,
    };
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        displayName: z.string().min(1).max(50).optional(),
        gradeLevel: z.number().int().min(6).max(8).optional(),
        themeId: z.string().optional(),
        soundEnabled: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.student.update({
        where: { id: ctx.student.id },
        data: input,
      });
    }),

  exportData: protectedProcedure.mutation(async ({ ctx }) => {
    const student = await ctx.db.student.findUnique({
      where: { id: ctx.student.id },
      include: {
        conceptStates: true,
        reviewLogs: true,
        xpEvents: true,
        achievementUnlocks: { include: { achievement: true } },
        streakState: true,
        sessions: { include: { problems: true } },
      },
    });
    return student;
  }),

  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.student.delete({
      where: { id: ctx.student.id },
    });
    return { success: true };
  }),
});
