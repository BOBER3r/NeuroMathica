/**
 * Prerequisite health checking for concepts.
 *
 * Queries the concept prerequisite graph and student SRS state to determine
 * whether all prerequisites for a given concept have sufficient retrievability.
 *
 * Task: T059
 */

import { prisma } from "@/server/db/prisma";
import { computeRetrievability } from "./fsrs";
import type { FsrsState } from "./fsrs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PrerequisiteHealthResult {
  /** Whether all prerequisites are above the minimum retrievability threshold. */
  healthy: boolean;
  /** Concept IDs whose retrievability has dropped below the threshold. */
  degraded: string[];
}

// ---------------------------------------------------------------------------
// Core functions
// ---------------------------------------------------------------------------

/**
 * Check whether all prerequisites for a concept are healthy (retrievability
 * above the minimum threshold) for a given student.
 *
 * A prerequisite is considered "healthy" when its *minimum* retrievability
 * across all three knowledge layers (recall, procedure, understanding) is
 * at or above `minRetrievability`.
 *
 * Prerequisites that the student has never reviewed are considered degraded.
 *
 * @param studentId         - The student to check.
 * @param conceptId         - The concept whose prerequisites to evaluate.
 * @param minRetrievability - Minimum acceptable R value (default 0.70).
 * @returns An object with `healthy` (boolean) and `degraded` (concept IDs).
 */
export async function checkPrerequisiteHealth(
  studentId: string,
  conceptId: string,
  minRetrievability: number = 0.7,
): Promise<PrerequisiteHealthResult> {
  const now = new Date();

  // Fetch prerequisite edges for this concept
  const prerequisites = await prisma.conceptPrerequisite.findMany({
    where: { conceptId },
    select: {
      prerequisiteId: true,
      strength: true,
    },
  });

  if (prerequisites.length === 0) {
    return { healthy: true, degraded: [] };
  }

  const prerequisiteIds = prerequisites.map((p) => p.prerequisiteId);

  // Fetch student states for all prerequisite concepts (all layers)
  const states = await prisma.studentConceptState.findMany({
    where: {
      studentId,
      conceptId: { in: prerequisiteIds },
    },
    select: {
      conceptId: true,
      layer: true,
      stability: true,
      difficulty: true,
      lastReview: true,
      reviewCount: true,
      lapseCount: true,
    },
  });

  // Group states by concept
  const statesByConceptId = new Map<string, typeof states>();
  for (const state of states) {
    const existing = statesByConceptId.get(state.conceptId);
    if (existing) {
      existing.push(state);
    } else {
      statesByConceptId.set(state.conceptId, [state]);
    }
  }

  const degraded: string[] = [];

  for (const prereqId of prerequisiteIds) {
    const conceptStates = statesByConceptId.get(prereqId);

    // No states at all means the student never studied this prerequisite
    if (!conceptStates || conceptStates.length === 0) {
      degraded.push(prereqId);
      continue;
    }

    // Check minimum retrievability across all layers
    let minR = Infinity;
    for (const s of conceptStates) {
      if (s.lastReview === null) {
        // Never reviewed this layer
        minR = 0;
        break;
      }

      const fsrsState: FsrsState = {
        stability: s.stability,
        difficulty: s.difficulty,
        lastReview: s.lastReview,
        reviewCount: s.reviewCount,
        lapseCount: s.lapseCount,
      };

      const r = computeRetrievability(fsrsState, now);
      if (r < minR) {
        minR = r;
      }
    }

    if (minR < minRetrievability) {
      degraded.push(prereqId);
    }
  }

  return {
    healthy: degraded.length === 0,
    degraded,
  };
}

/**
 * Get an ordered list of prerequisite concept IDs that need review
 * before the student should proceed to `conceptId`.
 *
 * Returns concepts sorted by retrievability (lowest first), so the most
 * urgent refreshers come first.
 *
 * @param studentId - The student to check.
 * @param conceptId - The target concept.
 * @returns Array of concept IDs that need review, ordered by urgency.
 */
export async function getPrerequisiteRefreshers(
  studentId: string,
  conceptId: string,
): Promise<string[]> {
  const now = new Date();

  // Fetch prerequisite edges
  const prerequisites = await prisma.conceptPrerequisite.findMany({
    where: { conceptId },
    select: {
      prerequisiteId: true,
      strength: true,
    },
  });

  if (prerequisites.length === 0) {
    return [];
  }

  const prerequisiteIds = prerequisites.map((p) => p.prerequisiteId);
  const strengthMap = new Map(
    prerequisites.map((p) => [p.prerequisiteId, p.strength]),
  );

  // Fetch student states
  const states = await prisma.studentConceptState.findMany({
    where: {
      studentId,
      conceptId: { in: prerequisiteIds },
    },
    select: {
      conceptId: true,
      layer: true,
      stability: true,
      difficulty: true,
      lastReview: true,
      reviewCount: true,
      lapseCount: true,
    },
  });

  // Group by concept, compute minimum retrievability per concept
  const minRetrievabilityByConceptId = new Map<string, number>();

  for (const prereqId of prerequisiteIds) {
    // Default: never studied = 0 retrievability
    minRetrievabilityByConceptId.set(prereqId, 0);
  }

  const statesByConceptId = new Map<string, typeof states>();
  for (const state of states) {
    const existing = statesByConceptId.get(state.conceptId);
    if (existing) {
      existing.push(state);
    } else {
      statesByConceptId.set(state.conceptId, [state]);
    }
  }

  for (const [cId, conceptStates] of statesByConceptId) {
    let minR = Infinity;
    for (const s of conceptStates) {
      if (s.lastReview === null) {
        minR = 0;
        break;
      }
      const fsrsState: FsrsState = {
        stability: s.stability,
        difficulty: s.difficulty,
        lastReview: s.lastReview,
        reviewCount: s.reviewCount,
        lapseCount: s.lapseCount,
      };
      const r = computeRetrievability(fsrsState, now);
      if (r < minR) {
        minR = r;
      }
    }
    minRetrievabilityByConceptId.set(cId, minR);
  }

  // Filter to concepts that need refresh (below threshold) and sort
  // by urgency: lower retrievability + higher prerequisite strength = more urgent
  const MIN_RETRIEVABILITY_THRESHOLD = 0.7;

  const needsRefresh = prerequisiteIds
    .filter((id) => {
      const r = minRetrievabilityByConceptId.get(id) ?? 0;
      return r < MIN_RETRIEVABILITY_THRESHOLD;
    })
    .map((id) => ({
      conceptId: id,
      retrievability: minRetrievabilityByConceptId.get(id) ?? 0,
      strength: strengthMap.get(id) ?? 1.0,
    }))
    .sort((a, b) => {
      // Sort by urgency score: lower R and higher strength = more urgent
      const urgencyA = (1 - a.retrievability) * a.strength;
      const urgencyB = (1 - b.retrievability) * b.strength;
      return urgencyB - urgencyA;
    })
    .map((entry) => entry.conceptId);

  return needsRefresh;
}
