import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Student } from "@prisma/client";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.student) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, student: ctx.student as Student } });
});
export const createCallerFactory = t.createCallerFactory;
