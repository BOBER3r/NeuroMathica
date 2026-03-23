import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../trpc";

function generateInviteCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

const MAX_CIRCLE_MEMBERS = 8;

export const socialRouter = router({
  createCircle: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Generate a unique invite code with retry
      let inviteCode = generateInviteCode();
      let attempts = 0;
      while (attempts < 10) {
        const existing = await ctx.db.studyCircle.findUnique({
          where: { inviteCode },
        });
        if (!existing) break;
        inviteCode = generateInviteCode();
        attempts++;
      }
      if (attempts >= 10) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate a unique invite code",
        });
      }

      const circle = await ctx.db.studyCircle.create({
        data: {
          name: input.name,
          inviteCode,
          members: {
            create: {
              studentId: ctx.student.id,
              role: "admin",
            },
          },
        },
        include: {
          members: true,
        },
      });

      return circle;
    }),

  joinCircle: protectedProcedure
    .input(
      z.object({
        inviteCode: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const circle = await ctx.db.studyCircle.findUnique({
        where: { inviteCode: input.inviteCode },
        include: { members: true },
      });

      if (!circle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No circle found with that invite code",
        });
      }

      if (circle.members.length >= MAX_CIRCLE_MEMBERS) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "This circle has reached the maximum of 8 members",
        });
      }

      const alreadyMember = circle.members.some(
        (m) => m.studentId === ctx.student.id,
      );
      if (alreadyMember) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You are already a member of this circle",
        });
      }

      await ctx.db.studyCircleMembership.create({
        data: {
          studentId: ctx.student.id,
          circleId: circle.id,
          role: "member",
        },
      });

      const updatedCircle = await ctx.db.studyCircle.findUniqueOrThrow({
        where: { id: circle.id },
        include: { members: true },
      });

      return updatedCircle;
    }),

  getCircle: protectedProcedure
    .input(
      z.object({
        circleId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const circle = await ctx.db.studyCircle.findUnique({
        where: { id: input.circleId },
        include: {
          members: {
            include: {
              student: {
                select: {
                  id: true,
                  displayName: true,
                  currentLevel: true,
                  totalXp: true,
                },
              },
            },
          },
        },
      });

      if (!circle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Circle not found",
        });
      }

      const isMember = circle.members.some(
        (m) => m.studentId === ctx.student.id,
      );
      if (!isMember) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a member of this circle",
        });
      }

      return {
        id: circle.id,
        name: circle.name,
        inviteCode: circle.inviteCode,
        createdAt: circle.createdAt,
        members: circle.members.map((m) => ({
          studentId: m.studentId,
          role: m.role,
          joinedAt: m.joinedAt,
          displayName: m.student.displayName,
          level: m.student.currentLevel,
          totalXp: m.student.totalXp,
        })),
      };
    }),

  leaveCircle: protectedProcedure
    .input(
      z.object({
        circleId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const membership = await ctx.db.studyCircleMembership.findUnique({
        where: {
          studentId_circleId: {
            studentId: ctx.student.id,
            circleId: input.circleId,
          },
        },
      });

      if (!membership) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You are not a member of this circle",
        });
      }

      // Remove the member
      await ctx.db.studyCircleMembership.delete({
        where: {
          studentId_circleId: {
            studentId: ctx.student.id,
            circleId: input.circleId,
          },
        },
      });

      // Get remaining members
      const remaining = await ctx.db.studyCircleMembership.findMany({
        where: { circleId: input.circleId },
        orderBy: { joinedAt: "asc" },
      });

      if (remaining.length === 0) {
        // No members left — delete the circle
        await ctx.db.studyCircle.delete({
          where: { id: input.circleId },
        });
        return { circleDeleted: true };
      }

      // If the leaving member was an admin, check if any admins remain
      if (membership.role === "admin") {
        const hasAdmin = remaining.some((m) => m.role === "admin");
        if (!hasAdmin) {
          // Promote the oldest remaining member to admin
          const oldest = remaining[0];
          if (oldest) {
            await ctx.db.studyCircleMembership.update({
              where: {
                studentId_circleId: {
                  studentId: oldest.studentId,
                  circleId: input.circleId,
                },
              },
              data: { role: "admin" },
            });
          }
        }
      }

      return { circleDeleted: false };
    }),
});
