/**
 * Session interleaving logic.
 *
 * Builds an optimally interleaved study session that mixes review items,
 * prerequisite refreshers, and new material across topic clusters. Weights
 * toward confusion pairs and respects a configurable new/review ratio.
 *
 * Task: T061
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SessionItem {
  conceptId: string;
  layer: number;
  reason: "scheduled_review" | "prerequisite_refresh" | "new_material";
  priority: "high" | "normal" | "low";
}

export interface ConfusionPair {
  topicA: string;
  topicB: string;
  score: number;
}

export interface InterleaveOptions {
  /** Maximum number of items in the session (default 20). */
  maxItems?: number;
  /** Fraction of items that should be new material (default 0.2 = 20%). */
  newRatio?: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_MAX_ITEMS = 20;
const DEFAULT_NEW_RATIO = 0.2;

/** Priority weights for sorting. */
const PRIORITY_WEIGHT: Record<string, number> = {
  high: 3,
  normal: 2,
  low: 1,
};

// ---------------------------------------------------------------------------
// Core function
// ---------------------------------------------------------------------------

/**
 * Build an interleaved session from due review items and new material.
 *
 * Algorithm:
 * 1. Enforce the new/review ratio by limiting new items.
 * 2. Merge items into a single pool, applying priority weights.
 * 3. Boost items that appear in confusion pairs (they benefit from
 *    interleaving the most).
 * 4. Distribute items using round-robin across topic clusters (3-4 clusters)
 *    to maximize interleaving benefit.
 * 5. Trim to maxItems.
 *
 * @param dueItems       - Items due for review.
 * @param newItems        - New material items.
 * @param confusionPairs  - Known confusion pairs with scores.
 * @param options         - Session configuration.
 * @returns Ordered array of session items.
 */
export function interleaveSession(
  dueItems: SessionItem[],
  newItems: SessionItem[],
  confusionPairs: readonly ConfusionPair[],
  options?: InterleaveOptions,
): SessionItem[] {
  const maxItems = options?.maxItems ?? DEFAULT_MAX_ITEMS;
  const newRatio = options?.newRatio ?? DEFAULT_NEW_RATIO;

  if (maxItems <= 0) {
    return [];
  }

  // --- Step 1: Enforce new/review ratio ---
  const maxNewItems = Math.max(1, Math.floor(maxItems * newRatio));
  const maxReviewItems = maxItems - maxNewItems;

  const selectedNew = selectByPriority(newItems, maxNewItems);
  const selectedReview = selectByPriority(dueItems, maxReviewItems);

  // If we have fewer review items than the max, we can add more new items
  const remainingSlots = maxItems - selectedReview.length - selectedNew.length;
  let extraNew: SessionItem[] = [];
  if (remainingSlots > 0 && newItems.length > selectedNew.length) {
    const remaining = newItems.filter((item) => !selectedNew.includes(item));
    extraNew = selectByPriority(remaining, remainingSlots);
  }

  // If we have fewer new items, fill with more review items
  let extraReview: SessionItem[] = [];
  if (
    remainingSlots > 0 &&
    extraNew.length < remainingSlots &&
    dueItems.length > selectedReview.length
  ) {
    const remaining = dueItems.filter(
      (item) => !selectedReview.includes(item),
    );
    extraReview = selectByPriority(
      remaining,
      remainingSlots - extraNew.length,
    );
  }

  const allItems = [
    ...selectedReview,
    ...extraReview,
    ...selectedNew,
    ...extraNew,
  ];

  if (allItems.length === 0) {
    return [];
  }

  // --- Step 2: Build confusion pair lookup for boosting ---
  const confusionTopics = buildConfusionSet(confusionPairs);

  // --- Step 3: Score and cluster items ---
  const scored = allItems.map((item) => ({
    item,
    confusionBoost: confusionTopics.has(item.conceptId) ? 1.5 : 1.0,
    priorityWeight: PRIORITY_WEIGHT[item.priority] ?? 2,
  }));

  // --- Step 4: Cluster by conceptId for round-robin distribution ---
  const clusters = new Map<string, typeof scored>();
  for (const entry of scored) {
    const key = entry.item.conceptId;
    const existing = clusters.get(key);
    if (existing) {
      existing.push(entry);
    } else {
      clusters.set(key, [entry]);
    }
  }

  // Sort items within each cluster by score (priority * confusion boost)
  for (const [, clusterItems] of clusters) {
    clusterItems.sort(
      (a, b) =>
        b.priorityWeight * b.confusionBoost -
        a.priorityWeight * a.confusionBoost,
    );
  }

  // Sort clusters: confusion-pair topics first, then by total priority
  const sortedClusterKeys = [...clusters.keys()].sort((a, b) => {
    const aHasConfusion = confusionTopics.has(a) ? 1 : 0;
    const bHasConfusion = confusionTopics.has(b) ? 1 : 0;
    if (aHasConfusion !== bHasConfusion) {
      return bHasConfusion - aHasConfusion;
    }
    const aTotal = (clusters.get(a) ?? []).reduce(
      (sum, e) => sum + e.priorityWeight,
      0,
    );
    const bTotal = (clusters.get(b) ?? []).reduce(
      (sum, e) => sum + e.priorityWeight,
      0,
    );
    return bTotal - aTotal;
  });

  // --- Step 5: Round-robin across clusters ---
  const result: SessionItem[] = [];
  const clusterPointers = new Map<string, number>();
  for (const key of sortedClusterKeys) {
    clusterPointers.set(key, 0);
  }

  let addedInRound = true;
  while (result.length < maxItems && addedInRound) {
    addedInRound = false;
    for (const key of sortedClusterKeys) {
      if (result.length >= maxItems) break;

      const clusterItems = clusters.get(key);
      if (!clusterItems) continue;

      const pointer = clusterPointers.get(key) ?? 0;
      if (pointer < clusterItems.length) {
        const entry = clusterItems[pointer];
        if (entry) {
          result.push(entry.item);
        }
        clusterPointers.set(key, pointer + 1);
        addedInRound = true;
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Select top items by priority, respecting a maximum count.
 */
function selectByPriority(
  items: SessionItem[],
  maxCount: number,
): SessionItem[] {
  if (items.length <= maxCount) {
    return [...items];
  }

  const sorted = [...items].sort((a, b) => {
    const aPriority = PRIORITY_WEIGHT[a.priority] ?? 2;
    const bPriority = PRIORITY_WEIGHT[b.priority] ?? 2;
    return bPriority - aPriority;
  });

  return sorted.slice(0, maxCount);
}

/**
 * Build a set of all concept IDs that appear in confusion pairs.
 */
function buildConfusionSet(pairs: readonly ConfusionPair[]): Set<string> {
  const set = new Set<string>();
  for (const pair of pairs) {
    if (pair.score > 0) {
      set.add(pair.topicA);
      set.add(pair.topicB);
    }
  }
  return set;
}
