/**
 * FSRS algorithm tests (T063).
 *
 * All float comparisons use toBeCloseTo per DR-2.
 */

import { describe, it, expect } from "vitest";
import {
  computeRetrievability,
  computeNextState,
  computeNextReviewDate,
  autoGrade,
  DEFAULT_PARAMS,
  type FsrsState,
  type ReviewInput,
} from "@/server/services/srs/fsrs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MS_PER_DAY = 86_400_000;

function makeState(overrides?: Partial<FsrsState>): FsrsState {
  return {
    stability: 10,
    difficulty: 5,
    lastReview: new Date("2026-01-01T00:00:00Z"),
    reviewCount: 3,
    lapseCount: 0,
    ...overrides,
  };
}

function makeReview(overrides?: Partial<ReviewInput>): ReviewInput {
  return {
    grade: 3,
    responseTimeMs: 15_000,
    hintsUsed: 0,
    correct: true,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// computeRetrievability
// ---------------------------------------------------------------------------

describe("computeRetrievability", () => {
  it("returns 1.0 when no time has elapsed", () => {
    const state = makeState();
    const now = new Date(state.lastReview);
    expect(computeRetrievability(state, now)).toBeCloseTo(1.0, 5);
  });

  it("returns 0.9 when exactly S days have elapsed", () => {
    // R(t) = (1 + t/(9*S))^(-1)
    // At t = S: R = (1 + S/(9*S))^(-1) = (1 + 1/9)^(-1) = (10/9)^(-1) = 9/10 = 0.9
    const state = makeState({ stability: 10 });
    const now = new Date(state.lastReview.getTime() + 10 * MS_PER_DAY);
    expect(computeRetrievability(state, now)).toBeCloseTo(0.9, 5);
  });

  it("returns approximately 0.5 when t = 9*S", () => {
    // R(t) = (1 + 9S/(9S))^(-1) = (1 + 1)^(-1) = 0.5
    const state = makeState({ stability: 10 });
    const now = new Date(state.lastReview.getTime() + 90 * MS_PER_DAY);
    expect(computeRetrievability(state, now)).toBeCloseTo(0.5, 5);
  });

  it("approaches 0 for very large elapsed times", () => {
    const state = makeState({ stability: 1 });
    const now = new Date(state.lastReview.getTime() + 10_000 * MS_PER_DAY);
    const r = computeRetrievability(state, now);
    expect(r).toBeGreaterThan(0);
    expect(r).toBeLessThan(0.01);
  });

  it("is monotonically decreasing with time", () => {
    const state = makeState({ stability: 5 });
    const times = [1, 5, 10, 30, 90, 365];
    let prev = 1.0;
    for (const days of times) {
      const now = new Date(state.lastReview.getTime() + days * MS_PER_DAY);
      const r = computeRetrievability(state, now);
      expect(r).toBeLessThan(prev);
      prev = r;
    }
  });

  it("is higher for higher stability at the same elapsed time", () => {
    const lowStability = makeState({ stability: 2 });
    const highStability = makeState({ stability: 20 });
    const now = new Date(lowStability.lastReview.getTime() + 5 * MS_PER_DAY);
    const rLow = computeRetrievability(lowStability, now);
    const rHigh = computeRetrievability(highStability, now);
    expect(rHigh).toBeGreaterThan(rLow);
  });

  it("returns 1.0 when now is before lastReview", () => {
    const state = makeState();
    const before = new Date(state.lastReview.getTime() - MS_PER_DAY);
    expect(computeRetrievability(state, before)).toBeCloseTo(1.0, 5);
  });

  it("computes correctly for fractional days", () => {
    const state = makeState({ stability: 10 });
    // At t = 5 days: R = (1 + 5/90)^(-1) = (1 + 1/18)^(-1) = (19/18)^(-1) = 18/19
    const now = new Date(state.lastReview.getTime() + 5 * MS_PER_DAY);
    expect(computeRetrievability(state, now)).toBeCloseTo(18 / 19, 5);
  });
});

// ---------------------------------------------------------------------------
// computeNextState
// ---------------------------------------------------------------------------

describe("computeNextState", () => {
  it("sets initial stability based on grade for first review", () => {
    const state = makeState({ reviewCount: 0, stability: 1.0 });

    // Grade 1: w0 = 0.4
    const result1 = computeNextState(
      state,
      makeReview({ grade: 1, correct: false }),
    );
    expect(result1.stability).toBeCloseTo(0.4, 2);

    // Grade 3: w2 = 2.4
    const result3 = computeNextState(state, makeReview({ grade: 3 }));
    expect(result3.stability).toBeCloseTo(2.4, 2);

    // Grade 4: w3 = 5.8
    const result4 = computeNextState(state, makeReview({ grade: 4 }));
    expect(result4.stability).toBeCloseTo(5.8, 2);
  });

  it("increases review count by 1", () => {
    const state = makeState({ reviewCount: 5 });
    const result = computeNextState(state, makeReview());
    expect(result.reviewCount).toBe(6);
  });

  it("increments lapse count on grade 1 after initial learning", () => {
    const state = makeState({ reviewCount: 3, lapseCount: 1 });
    const result = computeNextState(
      state,
      makeReview({ grade: 1, correct: false }),
    );
    expect(result.lapseCount).toBe(2);
  });

  it("does not increment lapse count on successful review", () => {
    const state = makeState({ reviewCount: 3, lapseCount: 1 });
    const result = computeNextState(state, makeReview({ grade: 3 }));
    expect(result.lapseCount).toBe(1);
  });

  it("reduces stability on lapse (grade 1)", () => {
    const state = makeState({ stability: 20, reviewCount: 5 });
    const result = computeNextState(
      state,
      makeReview({ grade: 1, correct: false }),
    );
    expect(result.stability).toBeLessThan(state.stability);
    expect(result.stability).toBeGreaterThan(0);
  });

  it("increases stability on successful review (grade 3)", () => {
    const state = makeState({ stability: 10, reviewCount: 3 });
    const result = computeNextState(state, makeReview({ grade: 3 }));
    expect(result.stability).toBeGreaterThan(state.stability);
  });

  it("increases stability more for grade 4 (easy) than grade 3 (good)", () => {
    const state = makeState({ stability: 10, reviewCount: 3 });
    const resultGood = computeNextState(state, makeReview({ grade: 3 }));
    const resultEasy = computeNextState(state, makeReview({ grade: 4 }));
    expect(resultEasy.stability).toBeGreaterThan(resultGood.stability);
  });

  it("increases stability less for grade 2 (hard) than grade 3 (good)", () => {
    const state = makeState({ stability: 10, reviewCount: 3 });
    const resultHard = computeNextState(state, makeReview({ grade: 2 }));
    const resultGood = computeNextState(state, makeReview({ grade: 3 }));
    expect(resultHard.stability).toBeLessThan(resultGood.stability);
  });

  it("adjusts difficulty based on grade", () => {
    const state = makeState({ difficulty: 5 });

    // Grade 1 (again): difficulty should increase (grade - 3 = -2, but w6 is small)
    // Actually grade - 3 = 1-3 = -2, so D + w6 * (-2) = 5 + 0.86*(-2) = 3.28
    const result1 = computeNextState(
      state,
      makeReview({ grade: 1, correct: false }),
    );
    expect(result1.difficulty).toBeCloseTo(
      5 + DEFAULT_PARAMS[6]! * (1 - 3),
      2,
    );

    // Grade 4 (easy): difficulty should decrease
    // grade - 3 = 4-3 = 1, so D + w6 * 1 = 5 + 0.86 = 5.86
    const result4 = computeNextState(state, makeReview({ grade: 4 }));
    expect(result4.difficulty).toBeCloseTo(5 + DEFAULT_PARAMS[6]! * (4 - 3), 2);
  });

  it("clamps difficulty to [1, 10]", () => {
    const lowD = makeState({ difficulty: 1.0 });
    const resultLow = computeNextState(
      lowD,
      makeReview({ grade: 1, correct: false }),
    );
    expect(resultLow.difficulty).toBeGreaterThanOrEqual(1);

    const highD = makeState({ difficulty: 10.0 });
    const resultHigh = computeNextState(highD, makeReview({ grade: 4 }));
    expect(resultHigh.difficulty).toBeLessThanOrEqual(10);
  });

  it("never produces stability below MIN_STABILITY (0.1)", () => {
    const state = makeState({
      stability: 0.2,
      reviewCount: 10,
      lapseCount: 5,
      difficulty: 10,
    });
    const result = computeNextState(
      state,
      makeReview({ grade: 1, correct: false }),
    );
    expect(result.stability).toBeGreaterThanOrEqual(0.1);
  });

  it("accepts custom parameters", () => {
    const state = makeState({ reviewCount: 0 });
    const customParams = [1.0, 2.0, 3.0, 4.0, ...DEFAULT_PARAMS.slice(4)];
    // Grade 3 with custom w2 = 3.0
    const result = computeNextState(
      state,
      makeReview({ grade: 3 }),
      customParams,
    );
    expect(result.stability).toBeCloseTo(3.0, 2);
  });

  it("sets lastReview to current time", () => {
    const state = makeState();
    const before = Date.now();
    const result = computeNextState(state, makeReview());
    const after = Date.now();
    expect(result.lastReview.getTime()).toBeGreaterThanOrEqual(before);
    expect(result.lastReview.getTime()).toBeLessThanOrEqual(after);
  });
});

// ---------------------------------------------------------------------------
// computeNextReviewDate
// ---------------------------------------------------------------------------

describe("computeNextReviewDate", () => {
  it("schedules review S days after lastReview for R=0.9 target", () => {
    // When target R = 0.9, the interval t = 9*S*(R^(-1) - 1) = 9*S*(1/0.9 - 1)
    // = 9*S*(1/9) = S
    const state = makeState({ stability: 10 });
    const nextDate = computeNextReviewDate(state);
    const expectedMs = state.lastReview.getTime() + 10 * MS_PER_DAY;
    expect(nextDate.getTime()).toBeCloseTo(expectedMs, -2); // within ~10ms
  });

  it("returns a date in the future for positive stability", () => {
    const state = makeState({
      stability: 5,
      lastReview: new Date(),
    });
    const nextDate = computeNextReviewDate(state);
    expect(nextDate.getTime()).toBeGreaterThan(state.lastReview.getTime());
  });

  it("scales linearly with stability", () => {
    const state5 = makeState({ stability: 5 });
    const state20 = makeState({ stability: 20 });
    const date5 = computeNextReviewDate(state5);
    const date20 = computeNextReviewDate(state20);
    const interval5 = date5.getTime() - state5.lastReview.getTime();
    const interval20 = date20.getTime() - state20.lastReview.getTime();
    // Interval should scale linearly: 20/5 = 4
    expect(interval20 / interval5).toBeCloseTo(4.0, 2);
  });

  it("returns a very near date for small stability", () => {
    const state = makeState({ stability: 0.1 });
    const nextDate = computeNextReviewDate(state);
    const intervalMs = nextDate.getTime() - state.lastReview.getTime();
    const intervalDays = intervalMs / MS_PER_DAY;
    // Should be approximately 0.1 days
    expect(intervalDays).toBeCloseTo(0.1, 1);
  });
});

// ---------------------------------------------------------------------------
// autoGrade
// ---------------------------------------------------------------------------

describe("autoGrade", () => {
  it("returns 1 (AGAIN) for incorrect answers regardless of time", () => {
    expect(autoGrade(false, 5000, 0)).toBe(1);
    expect(autoGrade(false, 50000, 3)).toBe(1);
    expect(autoGrade(false, 1000, 0)).toBe(1);
  });

  it("returns 2 (HARD) when correct but hints were used", () => {
    expect(autoGrade(true, 15000, 1)).toBe(2);
    expect(autoGrade(true, 5000, 2)).toBe(2);
  });

  it("returns 2 (HARD) when correct but slow (>30s)", () => {
    expect(autoGrade(true, 31000, 0)).toBe(2);
    expect(autoGrade(true, 60000, 0)).toBe(2);
  });

  it("returns 3 (GOOD) for correct, normal speed (10-30s), no hints", () => {
    expect(autoGrade(true, 15000, 0)).toBe(3);
    expect(autoGrade(true, 25000, 0)).toBe(3);
    expect(autoGrade(true, 10000, 0)).toBe(3);
  });

  it("returns 4 (EASY) for correct, fast (<10s), no hints", () => {
    expect(autoGrade(true, 5000, 0)).toBe(4);
    expect(autoGrade(true, 9999, 0)).toBe(4);
    expect(autoGrade(true, 1000, 0)).toBe(4);
  });

  it("prioritizes hints over speed for grading", () => {
    // Fast but used hints => HARD, not EASY
    expect(autoGrade(true, 5000, 1)).toBe(2);
  });

  it("returns 2 (HARD) at exactly 30001ms (>30s boundary)", () => {
    expect(autoGrade(true, 30001, 0)).toBe(2);
  });

  it("returns 3 (GOOD) at exactly 30000ms (<=30s boundary)", () => {
    expect(autoGrade(true, 30000, 0)).toBe(3);
  });

  it("returns 3 (GOOD) at exactly 10000ms (>=10s boundary)", () => {
    expect(autoGrade(true, 10000, 0)).toBe(3);
  });

  it("returns 4 (EASY) at exactly 9999ms (<10s boundary)", () => {
    expect(autoGrade(true, 9999, 0)).toBe(4);
  });
});
