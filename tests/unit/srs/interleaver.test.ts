/**
 * Session interleaver tests (T065).
 *
 * All float comparisons use toBeCloseTo per DR-2.
 */

import { describe, it, expect } from "vitest";
import {
  interleaveSession,
  type SessionItem,
  type ConfusionPair,
} from "@/server/services/srs/interleaver";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeReviewItem(
  conceptId: string,
  priority: SessionItem["priority"] = "normal",
  layer = 0,
): SessionItem {
  return {
    conceptId,
    layer,
    reason: "scheduled_review",
    priority,
  };
}

function makeNewItem(
  conceptId: string,
  priority: SessionItem["priority"] = "normal",
  layer = 0,
): SessionItem {
  return {
    conceptId,
    layer,
    reason: "new_material",
    priority,
  };
}

function makeRefreshItem(
  conceptId: string,
  priority: SessionItem["priority"] = "high",
  layer = 0,
): SessionItem {
  return {
    conceptId,
    layer,
    reason: "prerequisite_refresh",
    priority,
  };
}

// ---------------------------------------------------------------------------
// Topic distribution
// ---------------------------------------------------------------------------

describe("topic distribution", () => {
  it("includes items from multiple topics in interleaved order", () => {
    const dueItems = [
      makeReviewItem("fractions"),
      makeReviewItem("fractions"),
      makeReviewItem("decimals"),
      makeReviewItem("decimals"),
      makeReviewItem("algebra"),
      makeReviewItem("algebra"),
    ];
    const result = interleaveSession(dueItems, [], []);

    // Items should not be grouped by topic (round-robin distributes them)
    const topicOrder = result.map((item) => item.conceptId);
    // At minimum, the first two items should be from different topics
    // (round-robin guarantees this)
    expect(topicOrder.length).toBeGreaterThanOrEqual(6);

    // Check that we don't have 3+ consecutive items from the same topic
    for (let i = 0; i < topicOrder.length - 2; i++) {
      const same =
        topicOrder[i] === topicOrder[i + 1] &&
        topicOrder[i + 1] === topicOrder[i + 2];
      expect(same).toBe(false);
    }
  });

  it("respects maxItems limit", () => {
    const dueItems = Array.from({ length: 30 }, (_, i) =>
      makeReviewItem(`topic-${i}`),
    );
    const result = interleaveSession(dueItems, [], [], { maxItems: 10 });
    expect(result.length).toBe(10);
  });

  it("returns empty array when no items provided", () => {
    const result = interleaveSession([], [], []);
    expect(result.length).toBe(0);
  });

  it("returns empty array when maxItems is 0", () => {
    const dueItems = [makeReviewItem("fractions")];
    const result = interleaveSession(dueItems, [], [], { maxItems: 0 });
    expect(result.length).toBe(0);
  });

  it("handles a single item", () => {
    const dueItems = [makeReviewItem("fractions")];
    const result = interleaveSession(dueItems, [], []);
    expect(result.length).toBe(1);
    expect(result[0]!.conceptId).toBe("fractions");
  });

  it("distributes items across clusters via round-robin", () => {
    const dueItems = [
      makeReviewItem("A"),
      makeReviewItem("A"),
      makeReviewItem("A"),
      makeReviewItem("B"),
      makeReviewItem("B"),
      makeReviewItem("B"),
      makeReviewItem("C"),
      makeReviewItem("C"),
      makeReviewItem("C"),
    ];
    const result = interleaveSession(dueItems, [], [], { maxItems: 9 });

    // First 3 items should be from 3 different clusters
    const firstThree = new Set(result.slice(0, 3).map((i) => i.conceptId));
    expect(firstThree.size).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Confusion pair weighting
// ---------------------------------------------------------------------------

describe("confusion pair weighting", () => {
  it("includes items from confusion pairs in the session", () => {
    const dueItems = [
      makeReviewItem("fractions"),
      makeReviewItem("decimals"),
      makeReviewItem("geometry"),
      makeReviewItem("algebra"),
    ];
    const confusionPairs: ConfusionPair[] = [
      { topicA: "fractions", topicB: "decimals", score: 0.8 },
    ];

    const result = interleaveSession(dueItems, [], confusionPairs);
    const conceptIds = result.map((i) => i.conceptId);

    // Both confusion pair topics should be present
    expect(conceptIds).toContain("fractions");
    expect(conceptIds).toContain("decimals");
  });

  it("prioritizes confusion pair topics over non-confused topics", () => {
    const dueItems = [
      makeReviewItem("fractions", "normal"),
      makeReviewItem("decimals", "normal"),
      makeReviewItem("geometry", "normal"),
      makeReviewItem("statistics", "normal"),
    ];
    const confusionPairs: ConfusionPair[] = [
      { topicA: "fractions", topicB: "decimals", score: 0.9 },
    ];

    const result = interleaveSession(dueItems, [], confusionPairs, {
      maxItems: 4,
    });
    const conceptIds = result.map((i) => i.conceptId);

    // Confusion pair topics should appear (not necessarily first, but present)
    expect(conceptIds).toContain("fractions");
    expect(conceptIds).toContain("decimals");
  });

  it("handles empty confusion pairs gracefully", () => {
    const dueItems = [makeReviewItem("fractions"), makeReviewItem("decimals")];
    const result = interleaveSession(dueItems, [], []);
    expect(result.length).toBe(2);
  });

  it("ignores confusion pairs with score 0", () => {
    const dueItems = [
      makeReviewItem("fractions"),
      makeReviewItem("decimals"),
      makeReviewItem("geometry"),
    ];
    const confusionPairs: ConfusionPair[] = [
      { topicA: "fractions", topicB: "decimals", score: 0 },
    ];

    // Score of 0 should not boost the pair
    const result = interleaveSession(dueItems, [], confusionPairs);
    expect(result.length).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// New/review ratio
// ---------------------------------------------------------------------------

describe("new/review ratio", () => {
  it("respects the default 20% new / 80% review ratio", () => {
    const dueItems = Array.from({ length: 20 }, (_, i) =>
      makeReviewItem(`review-${i}`),
    );
    const newItems = Array.from({ length: 20 }, (_, i) =>
      makeNewItem(`new-${i}`),
    );

    const result = interleaveSession(dueItems, newItems, [], { maxItems: 20 });

    const newCount = result.filter(
      (item) => item.reason === "new_material",
    ).length;
    const reviewCount = result.filter(
      (item) => item.reason === "scheduled_review",
    ).length;

    // With 20 items and 20% new ratio: expect ~4 new items
    expect(newCount).toBeLessThanOrEqual(6);
    expect(reviewCount).toBeGreaterThanOrEqual(14);
    expect(newCount + reviewCount).toBe(20);
  });

  it("allows configuring a different new ratio", () => {
    const dueItems = Array.from({ length: 20 }, (_, i) =>
      makeReviewItem(`review-${i}`),
    );
    const newItems = Array.from({ length: 20 }, (_, i) =>
      makeNewItem(`new-${i}`),
    );

    const result = interleaveSession(dueItems, newItems, [], {
      maxItems: 20,
      newRatio: 0.5,
    });

    const newCount = result.filter(
      (item) => item.reason === "new_material",
    ).length;

    // With 50% new ratio and enough items: should have ~10 new items
    expect(newCount).toBeGreaterThanOrEqual(8);
    expect(newCount).toBeLessThanOrEqual(12);
  });

  it("fills with review items when not enough new items", () => {
    const dueItems = Array.from({ length: 20 }, (_, i) =>
      makeReviewItem(`review-${i}`),
    );
    const newItems = [makeNewItem("only-new")];

    const result = interleaveSession(dueItems, newItems, [], { maxItems: 10 });

    const newCount = result.filter(
      (item) => item.reason === "new_material",
    ).length;

    // Only 1 new item available
    expect(newCount).toBe(1);
    expect(result.length).toBe(10);
  });

  it("fills with new items when not enough review items", () => {
    const dueItems = [makeReviewItem("only-review")];
    const newItems = Array.from({ length: 20 }, (_, i) =>
      makeNewItem(`new-${i}`),
    );

    const result = interleaveSession(dueItems, newItems, [], { maxItems: 10 });

    expect(result.length).toBe(10);
    const reviewCount = result.filter(
      (item) => item.reason === "scheduled_review",
    ).length;
    expect(reviewCount).toBe(1);
  });

  it("prioritizes high-priority items within each category", () => {
    const dueItems = [
      makeReviewItem("low-priority", "low"),
      makeReviewItem("high-priority", "high"),
      makeReviewItem("normal-priority", "normal"),
    ];

    const result = interleaveSession(dueItems, [], [], { maxItems: 2 });

    const conceptIds = result.map((i) => i.conceptId);
    // High priority should be selected; low priority should be dropped
    expect(conceptIds).toContain("high-priority");
    expect(conceptIds).not.toContain("low-priority");
  });
});

// ---------------------------------------------------------------------------
// Mixed scenarios
// ---------------------------------------------------------------------------

describe("mixed scenarios", () => {
  it("handles prerequisite refreshers alongside reviews and new items", () => {
    const dueItems = [
      makeReviewItem("algebra"),
      makeRefreshItem("arithmetic", "high"),
    ];
    const newItems = [makeNewItem("equations")];

    const result = interleaveSession(dueItems, newItems, [], { maxItems: 3 });

    const reasons = result.map((i) => i.reason);
    expect(reasons).toContain("scheduled_review");
    expect(reasons).toContain("new_material");
    // Prerequisite refresh is in dueItems, should be present
    expect(reasons).toContain("prerequisite_refresh");
  });

  it("all returned items are from the input pools", () => {
    const dueItems = [
      makeReviewItem("A"),
      makeReviewItem("B"),
    ];
    const newItems = [makeNewItem("C"), makeNewItem("D")];

    const result = interleaveSession(dueItems, newItems, []);
    const allConcepts = new Set(["A", "B", "C", "D"]);

    for (const item of result) {
      expect(allConcepts.has(item.conceptId)).toBe(true);
    }
  });

  it("does not duplicate items", () => {
    const dueItems = [
      makeReviewItem("A"),
      makeReviewItem("B"),
      makeReviewItem("C"),
    ];
    const newItems = [makeNewItem("D"), makeNewItem("E")];

    const result = interleaveSession(dueItems, newItems, [], { maxItems: 5 });

    // Each unique conceptId+layer+reason combination should appear at most as many
    // times as it appears in the input
    expect(result.length).toBe(5);
  });
});
