import { prisma } from "@/server/db/prisma";
import { probability2PL, updateAbility, selectNextItem } from "./irt";

interface DiagnosticResult {
  abilities: Record<string, number>; // domain -> theta
  recommendedStartConcepts: string[];
  totalQuestions: number;
  correctCount: number;
}

interface DiagnosticProblem {
  id: string;
  conceptId: string;
  domainId: string;
  difficultyB: number;
  discriminationA: number;
  content: unknown;
}

/**
 * Generate a diagnostic assessment: 15-20 CAT-style problems
 * spanning the prerequisite graph, estimating ability per domain cluster.
 */
export async function generateDiagnosticProblems(
  maxQuestions: number = 15,
): Promise<DiagnosticProblem[]> {
  // Get problems from each domain for coverage
  const domains = await prisma.domain.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      concepts: {
        include: {
          problems: {
            where: { layer: 1 }, // procedural — good for assessment
            orderBy: { difficultyB: "asc" },
            take: 5,
          },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  const allProblems: DiagnosticProblem[] = [];

  for (const domain of domains) {
    for (const concept of domain.concepts) {
      for (const problem of concept.problems) {
        allProblems.push({
          id: problem.id,
          conceptId: concept.id,
          domainId: domain.id,
          difficultyB: problem.difficultyB,
          discriminationA: problem.discriminationA,
          content: problem.content,
        });
      }
    }
  }

  // Select problems adaptively using IRT
  const selected: DiagnosticProblem[] = [];
  let ability = { theta: 0, standardError: 1.5 };
  const usedIds = new Set<string>();

  for (let i = 0; i < maxQuestions && allProblems.length > 0; i++) {
    const available = allProblems.filter((p) => !usedIds.has(p.id));
    if (available.length === 0) break;

    // Select next item targeting 70% success (diagnostic is harder)
    const items = available.map((p) => ({
      difficultyB: p.difficultyB,
      discriminationA: p.discriminationA,
    }));

    const selectedItem = selectNextItem(ability, items, 0.70);

    const match = available.find(
      (p) =>
        Math.abs(p.difficultyB - selectedItem.difficultyB) < 0.001 &&
        Math.abs(p.discriminationA - selectedItem.discriminationA) < 0.001,
    );

    if (match) {
      selected.push(match);
      usedIds.add(match.id);
    }
  }

  return selected;
}

/**
 * Process diagnostic results and assign initial SRS states.
 */
export async function processDiagnosticResults(
  studentId: string,
  responses: Array<{
    problemId: string;
    conceptId: string;
    domainId: string;
    correct: boolean;
    difficultyB: number;
    discriminationA: number;
  }>,
): Promise<DiagnosticResult> {
  // Track ability per domain
  const domainAbilities: Record<string, { theta: number; standardError: number }> = {};
  let correctCount = 0;

  for (const response of responses) {
    if (!domainAbilities[response.domainId]) {
      domainAbilities[response.domainId] = { theta: 0, standardError: 1.5 };
    }

    const ability = domainAbilities[response.domainId]!;
    const updated = updateAbility(
      ability,
      { difficultyB: response.difficultyB, discriminationA: response.discriminationA },
      response.correct,
    );

    domainAbilities[response.domainId] = updated;

    if (response.correct) correctCount++;
  }

  // Assign initial SRS states based on demonstrated ability
  const conceptAbilities = new Map<string, number>();
  for (const response of responses) {
    const domainAbility = domainAbilities[response.domainId];
    if (domainAbility) {
      const prob = probability2PL(domainAbility.theta, {
        difficultyB: response.difficultyB,
        discriminationA: response.discriminationA,
      });

      const existing = conceptAbilities.get(response.conceptId) ?? 0;
      conceptAbilities.set(
        response.conceptId,
        Math.max(existing, prob),
      );
    }
  }

  // Create initial StudentConceptState records
  for (const [conceptId, masteryProb] of conceptAbilities) {
    const status = masteryProb > 0.85 ? 1 : 0; // reviewing if high mastery
    const stability = masteryProb > 0.85 ? 5.0 : 1.0;

    for (const layer of [0, 1, 2]) {
      await prisma.studentConceptState.upsert({
        where: {
          studentId_conceptId_layer: { studentId, conceptId, layer },
        },
        update: { status, stability },
        create: {
          studentId,
          conceptId,
          layer,
          status,
          stability,
          difficulty: 5.0,
        },
      });
    }
  }

  // Mark diagnostic complete
  await prisma.student.update({
    where: { id: studentId },
    data: { diagnosticCompleted: true },
  });

  // Determine recommended start concepts (high ability domains → skip ahead)
  const abilities: Record<string, number> = {};
  for (const [domain, ability] of Object.entries(domainAbilities)) {
    abilities[domain] = ability.theta;
  }

  // Find root concepts that are unlocked
  const rootConcepts = await prisma.concept.findMany({
    where: {
      prerequisites: { none: {} },
    },
    select: { id: true, domainId: true },
  });

  return {
    abilities,
    recommendedStartConcepts: rootConcepts.map((c) => c.id),
    totalQuestions: responses.length,
    correctCount,
  };
}
