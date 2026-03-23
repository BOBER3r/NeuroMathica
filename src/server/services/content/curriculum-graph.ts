import { prisma } from "@/server/db/prisma";

export interface TopicNode {
  id: string;
  name: string;
  domainId: string;
  gradeLevel: number;
  contentPath: string;
  prerequisites: string[];
  successors: string[];
}

export interface CurriculumGraph {
  nodes: Map<string, TopicNode>;
  domains: Array<{ id: string; name: string; color: string; sortOrder: number }>;
}

let cachedGraph: CurriculumGraph | null = null;

export async function loadCurriculumGraph(): Promise<CurriculumGraph> {
  if (cachedGraph) return cachedGraph;

  const [concepts, prerequisites, domains] = await Promise.all([
    prisma.concept.findMany({
      orderBy: [{ domainId: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.conceptPrerequisite.findMany(),
    prisma.domain.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const nodes = new Map<string, TopicNode>();

  for (const concept of concepts) {
    nodes.set(concept.id, {
      id: concept.id,
      name: concept.name,
      domainId: concept.domainId,
      gradeLevel: concept.gradeLevel,
      contentPath: concept.contentPath,
      prerequisites: [],
      successors: [],
    });
  }

  for (const prereq of prerequisites) {
    const concept = nodes.get(prereq.conceptId);
    const prerequisite = nodes.get(prereq.prerequisiteId);
    if (concept) concept.prerequisites.push(prereq.prerequisiteId);
    if (prerequisite) prerequisite.successors.push(prereq.conceptId);
  }

  cachedGraph = { nodes, domains };
  return cachedGraph;
}

export function invalidateCache(): void {
  cachedGraph = null;
}

export async function getPrerequisites(conceptId: string): Promise<string[]> {
  const graph = await loadCurriculumGraph();
  return graph.nodes.get(conceptId)?.prerequisites ?? [];
}

export async function getSuccessors(conceptId: string): Promise<string[]> {
  const graph = await loadCurriculumGraph();
  return graph.nodes.get(conceptId)?.successors ?? [];
}

export async function arePrerequisitesMet(
  studentId: string,
  conceptId: string,
  minRetrievability: number = 0.7,
): Promise<{ met: boolean; unmet: string[] }> {
  const prerequisites = await getPrerequisites(conceptId);
  if (prerequisites.length === 0) return { met: true, unmet: [] };

  const states = await prisma.studentConceptState.findMany({
    where: {
      studentId,
      conceptId: { in: prerequisites },
      layer: 2, // understanding layer
    },
  });

  const stateMap = new Map(states.map((s) => [s.conceptId, s]));
  const unmet: string[] = [];

  for (const prereqId of prerequisites) {
    const state = stateMap.get(prereqId);
    if (!state || state.status === 0) {
      unmet.push(prereqId);
      continue;
    }
    // Check retrievability using FSRS power-law forgetting curve
    if (state.lastReview) {
      const elapsedDays =
        (Date.now() - state.lastReview.getTime()) / (1000 * 60 * 60 * 24);
      const retrievability = Math.pow(
        1 + elapsedDays / (9 * state.stability),
        -1,
      );
      if (retrievability < minRetrievability) {
        unmet.push(prereqId);
      }
    } else {
      unmet.push(prereqId);
    }
  }

  return { met: unmet.length === 0, unmet };
}

export type TopicStatus =
  | "locked"
  | "available"
  | "in_progress"
  | "mastered"
  | "review_due";

export async function getTopicStatus(
  studentId: string,
  conceptId: string,
): Promise<TopicStatus> {
  const states = await prisma.studentConceptState.findMany({
    where: { studentId, conceptId },
  });

  if (states.length === 0) {
    const prereqResult = await arePrerequisitesMet(studentId, conceptId);
    return prereqResult.met ? "available" : "locked";
  }

  const allMastered = states.every((s) => s.status === 2);
  if (allMastered) {
    const hasReviewDue = states.some(
      (s) => s.nextReview && s.nextReview <= new Date(),
    );
    return hasReviewDue ? "review_due" : "mastered";
  }

  return "in_progress";
}
