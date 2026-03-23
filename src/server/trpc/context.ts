import { prisma } from "@/server/db/prisma";
import type { PrismaClient } from "@/server/db/prisma";
import type { Student } from "@prisma/client";
// Clerk auth will be added in T014
// import { auth } from "@clerk/nextjs/server";

export interface Context {
  db: PrismaClient;
  student: Student | null;
  userId: string | null;
}

export async function createContext(): Promise<Context> {
  // TODO: Wire Clerk auth in T014
  return { db: prisma, student: null, userId: null };
}
