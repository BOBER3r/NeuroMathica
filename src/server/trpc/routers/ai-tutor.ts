import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { sendTutorMessage } from "@/server/services/ai/tutor";

export const aiTutorRouter = router({
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.string().optional(),
        conceptId: z.string(),
        message: z.string().min(1).max(2000),
        currentSceneState: z.unknown().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get or create conversation
      let conversationId = input.conversationId;
      if (!conversationId) {
        const conversation = await ctx.db.tutorConversation.create({
          data: {
            studentId: ctx.student.id,
            conceptId: input.conceptId,
          },
        });
        conversationId = conversation.id;
      }

      // Save student message
      await ctx.db.tutorMessage.create({
        data: {
          conversationId,
          role: "student",
          content: input.message,
        },
      });

      // Get conversation history
      const history = await ctx.db.tutorMessage.findMany({
        where: { conversationId },
        orderBy: { timestamp: "asc" },
        take: 20,
      });

      // Get concept info
      const concept = await ctx.db.concept.findUnique({
        where: { id: input.conceptId },
      });

      // Call AI tutor
      const result = await sendTutorMessage(input.message, {
        conceptName: concept?.name ?? input.conceptId,
        conceptDescription: concept?.description ?? "",
        currentStage: "lesson",
        studentLevel: ctx.student.currentLevel,
        sceneState: input.currentSceneState,
        conversationHistory: history.map((m) => ({
          role: m.role as "student" | "tutor",
          content: m.content,
        })),
      });

      // Save tutor response
      await ctx.db.tutorMessage.create({
        data: {
          conversationId,
          role: "tutor",
          content: result.response,
          sceneCommands: result.sceneCommands ? JSON.parse(JSON.stringify(result.sceneCommands)) : undefined,
        },
      });

      return {
        conversationId,
        response: result.response,
        sceneCommands: result.sceneCommands,
        mode: "socratic" as const,
      };
    }),

  getConversation: protectedProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ ctx, input }) => {
      const messages = await ctx.db.tutorMessage.findMany({
        where: { conversationId: input.conversationId },
        orderBy: { timestamp: "asc" },
      });

      return messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        sceneCommands: m.sceneCommands,
        timestamp: m.timestamp,
      }));
    }),
});
