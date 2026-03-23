import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import {
  loadCurriculumGraph,
  getTopicStatus,
} from "@/server/services/content/curriculum-graph";

export const curriculumRouter = router({
  getDomains: publicProcedure.query(async ({ ctx }) => {
    const domains = await ctx.db.domain.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        concepts: {
          select: { id: true },
        },
      },
    });

    return domains.map((d) => ({
      id: d.id,
      name: d.name,
      color: d.color,
      sortOrder: d.sortOrder,
      conceptCount: d.concepts.length,
    }));
  }),

  getConcept: publicProcedure
    .input(z.object({ conceptId: z.string() }))
    .query(async ({ ctx, input }) => {
      const concept = await ctx.db.concept.findUnique({
        where: { id: input.conceptId },
        include: {
          domain: true,
          prerequisites: {
            include: { prerequisite: { select: { id: true, name: true } } },
          },
          successors: {
            include: { concept: { select: { id: true, name: true } } },
          },
        },
      });

      if (!concept) return null;

      return {
        ...concept,
        prerequisites: concept.prerequisites.map((p) => ({
          id: p.prerequisite.id,
          name: p.prerequisite.name,
          strength: p.strength,
        })),
        successors: concept.successors.map((s) => ({
          id: s.concept.id,
          name: s.concept.name,
        })),
      };
    }),

  getGraph: publicProcedure.query(async () => {
    const graph = await loadCurriculumGraph();
    const nodes = Array.from(graph.nodes.values());
    return {
      nodes,
      domains: graph.domains,
    };
  }),

  getTopicStatus: protectedProcedure
    .input(z.object({ conceptId: z.string() }))
    .query(async ({ ctx, input }) => {
      const status = await getTopicStatus(ctx.student.id, input.conceptId);
      return { conceptId: input.conceptId, status };
    }),
});
