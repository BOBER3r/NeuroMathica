import { describe, it, expect } from "vitest";
import {
  calculateXp,
  type XpSource,
} from "@/server/services/gamification/xp-calculator";

// ---------------------------------------------------------------------------
// Fixed-value sources
// ---------------------------------------------------------------------------
describe("calculateXp — fixed-value sources", () => {
  const fixedSources: Array<{ source: XpSource; expected: number }> = [
    { source: "lesson_completion", expected: 100 },
    { source: "discovery_insight", expected: 30 },
    { source: "practice_session", expected: 50 },
    { source: "spaced_review", expected: 30 },
    { source: "real_world_connection", expected: 60 },
    { source: "first_try", expected: 25 },
    { source: "streak_day", expected: 20 },
    { source: "challenge_complete", expected: 75 },
  ];

  for (const { source, expected } of fixedSources) {
    it(`returns ${expected} base XP for "${source}"`, () => {
      const result = calculateXp(source);
      expect(result.baseAmount).toBe(expected);
      expect(result.finalAmount).toBe(expected);
      expect(result.multipliers).toHaveLength(0);
    });
  }
});

// ---------------------------------------------------------------------------
// Range-value sources
// ---------------------------------------------------------------------------
describe("calculateXp — reflection_quality (range 0-80)", () => {
  it("returns 0 XP for quality score 0", () => {
    const result = calculateXp("reflection_quality", { qualityScore: 0 });
    expect(result.baseAmount).toBe(0);
    expect(result.finalAmount).toBe(0);
  });

  it("returns 80 XP for quality score 5", () => {
    const result = calculateXp("reflection_quality", { qualityScore: 5 });
    expect(result.baseAmount).toBe(80);
    expect(result.finalAmount).toBe(80);
  });

  it("returns 48 XP for quality score 3", () => {
    const result = calculateXp("reflection_quality", { qualityScore: 3 });
    expect(result.baseAmount).toBe(48);
  });

  it("clamps quality score to 0-5 range", () => {
    const below = calculateXp("reflection_quality", { qualityScore: -2 });
    expect(below.baseAmount).toBe(0);

    const above = calculateXp("reflection_quality", { qualityScore: 10 });
    expect(above.baseAmount).toBe(80);
  });

  it("defaults to 0 when no qualityScore is provided", () => {
    const result = calculateXp("reflection_quality", {});
    expect(result.baseAmount).toBe(0);
  });
});

describe("calculateXp — exploration_depth (range 20-40)", () => {
  it("returns 20 XP for 0 interactions", () => {
    const result = calculateXp("exploration_depth", { interactionCount: 0 });
    expect(result.baseAmount).toBe(20);
  });

  it("returns 40 XP for 10+ interactions", () => {
    const result = calculateXp("exploration_depth", { interactionCount: 10 });
    expect(result.baseAmount).toBe(40);
  });

  it("returns 40 XP for 20 interactions (capped at max)", () => {
    const result = calculateXp("exploration_depth", { interactionCount: 20 });
    expect(result.baseAmount).toBe(40);
  });

  it("scales linearly between 20 and 40", () => {
    const result = calculateXp("exploration_depth", { interactionCount: 5 });
    expect(result.baseAmount).toBe(30);
  });
});

describe("calculateXp — peer_help (range 40-80)", () => {
  it("returns 40 XP for quality score 0", () => {
    const result = calculateXp("peer_help", { qualityScore: 0 });
    expect(result.baseAmount).toBe(40);
  });

  it("returns 80 XP for quality score 5", () => {
    const result = calculateXp("peer_help", { qualityScore: 5 });
    expect(result.baseAmount).toBe(80);
  });
});

// ---------------------------------------------------------------------------
// Multipliers
// ---------------------------------------------------------------------------
describe("calculateXp — multipliers", () => {
  it("applies deep_dive (1.5x) when time > 2x average", () => {
    const result = calculateXp("lesson_completion", {
      timeSpentMs: 300_000,
      averageTimeMs: 100_000,
    });
    expect(result.multipliers).toHaveLength(1);
    expect(result.multipliers[0]?.type).toBe("deep_dive");
    expect(result.multipliers[0]?.value).toBe(1.5);
    expect(result.finalAmount).toBe(150);
  });

  it("does NOT apply deep_dive when time is exactly 2x average", () => {
    const result = calculateXp("lesson_completion", {
      timeSpentMs: 200_000,
      averageTimeMs: 100_000,
    });
    expect(result.multipliers).toHaveLength(0);
    expect(result.finalAmount).toBe(100);
  });

  it("applies connection_maker (2.0x) when referencesPrior is true", () => {
    const result = calculateXp("practice_session", {
      referencesPrior: true,
    });
    expect(result.multipliers).toHaveLength(1);
    expect(result.multipliers[0]?.type).toBe("connection_maker");
    expect(result.multipliers[0]?.value).toBe(2.0);
    expect(result.finalAmount).toBe(100);
  });

  it("applies struggle_bonus (1.3x) when failuresBefore >= 2", () => {
    const result = calculateXp("challenge_complete", {
      failuresBefore: 3,
    });
    expect(result.multipliers).toHaveLength(1);
    expect(result.multipliers[0]?.type).toBe("struggle_bonus");
    expect(result.multipliers[0]?.value).toBe(1.3);
    expect(result.finalAmount).toBe(Math.floor(75 * 1.3));
  });

  it("does NOT apply struggle_bonus when failuresBefore < 2", () => {
    const result = calculateXp("challenge_complete", {
      failuresBefore: 1,
    });
    expect(result.multipliers).toHaveLength(0);
    expect(result.finalAmount).toBe(75);
  });

  it("applies first_try_clarity (1.2x) when first try + quality >= 4", () => {
    const result = calculateXp("lesson_completion", {
      isFirstTry: true,
      qualityScore: 4,
    });
    expect(result.multipliers).toHaveLength(1);
    expect(result.multipliers[0]?.type).toBe("first_try_clarity");
    expect(result.multipliers[0]?.value).toBe(1.2);
    expect(result.finalAmount).toBe(120);
  });

  it("does NOT apply first_try_clarity when quality < 4", () => {
    const result = calculateXp("lesson_completion", {
      isFirstTry: true,
      qualityScore: 3,
    });
    expect(result.multipliers).toHaveLength(0);
  });

  it("stacks multiple multipliers multiplicatively", () => {
    const result = calculateXp("lesson_completion", {
      referencesPrior: true,
      failuresBefore: 5,
      timeSpentMs: 500_000,
      averageTimeMs: 100_000,
    });
    // deep_dive (1.5) * connection_maker (2.0) * struggle_bonus (1.3) = 3.9
    expect(result.multipliers).toHaveLength(3);
    expect(result.finalAmount).toBe(Math.floor(100 * 1.5 * 2.0 * 1.3));
  });
});

// ---------------------------------------------------------------------------
// Neurons earned
// ---------------------------------------------------------------------------
describe("calculateXp — neurons earned", () => {
  it("earns 1 neuron per 100 XP", () => {
    const result = calculateXp("lesson_completion");
    expect(result.neuronsEarned).toBe(1);
  });

  it("floors neuron calculation", () => {
    const result = calculateXp("challenge_complete"); // 75 XP
    expect(result.neuronsEarned).toBe(0);
  });

  it("calculates neurons from final (multiplied) amount", () => {
    const result = calculateXp("lesson_completion", {
      referencesPrior: true, // 2.0x -> 200 XP
    });
    expect(result.neuronsEarned).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe("calculateXp — edge cases", () => {
  it("handles empty context object", () => {
    const result = calculateXp("lesson_completion", {});
    expect(result.baseAmount).toBe(100);
    expect(result.finalAmount).toBe(100);
    expect(result.multipliers).toHaveLength(0);
  });

  it("handles no context argument at all", () => {
    const result = calculateXp("streak_day");
    expect(result.baseAmount).toBe(20);
    expect(result.finalAmount).toBe(20);
  });

  it("does not apply deep_dive when averageTimeMs is 0", () => {
    const result = calculateXp("lesson_completion", {
      timeSpentMs: 300_000,
      averageTimeMs: 0,
    });
    expect(result.multipliers).toHaveLength(0);
  });
});
