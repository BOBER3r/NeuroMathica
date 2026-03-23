/**
 * IRT 2-Parameter Logistic model tests (T064).
 *
 * All float comparisons use toBeCloseTo per DR-2.
 */

import { describe, it, expect } from "vitest";
import {
  probability2PL,
  fisherInformation,
  updateAbility,
  selectNextItem,
  type IrtItem,
  type StudentAbility,
} from "@/server/services/srs/irt";

// ---------------------------------------------------------------------------
// probability2PL
// ---------------------------------------------------------------------------

describe("probability2PL", () => {
  it("returns 0.5 when theta equals item difficulty", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    expect(probability2PL(0, item)).toBeCloseTo(0.5, 5);
  });

  it("returns 0.5 for any discrimination when theta = b", () => {
    const item: IrtItem = { difficultyB: 2.0, discriminationA: 3.0 };
    expect(probability2PL(2.0, item)).toBeCloseTo(0.5, 5);
  });

  it("returns value > 0.5 when theta > b", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    expect(probability2PL(1.0, item)).toBeGreaterThan(0.5);
  });

  it("returns value < 0.5 when theta < b", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    expect(probability2PL(-1.0, item)).toBeLessThan(0.5);
  });

  it("approaches 1.0 for very high theta", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    expect(probability2PL(10, item)).toBeCloseTo(1.0, 3);
  });

  it("approaches 0.0 for very low theta", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    expect(probability2PL(-10, item)).toBeCloseTo(0.0, 3);
  });

  it("is steeper with higher discrimination", () => {
    const lowA: IrtItem = { difficultyB: 0, discriminationA: 0.5 };
    const highA: IrtItem = { difficultyB: 0, discriminationA: 2.0 };
    const theta = 1.0;
    const pLow = probability2PL(theta, lowA);
    const pHigh = probability2PL(theta, highA);
    // Higher discrimination => further from 0.5 when theta != b
    expect(Math.abs(pHigh - 0.5)).toBeGreaterThan(Math.abs(pLow - 0.5));
  });

  it("computes the known analytical value for a=1, b=0, theta=1", () => {
    // P = 1 / (1 + exp(-1)) = 1 / (1 + 0.36788...) = 0.73106...
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    expect(probability2PL(1.0, item)).toBeCloseTo(0.7310585786, 5);
  });

  it("is symmetric around the difficulty point", () => {
    const item: IrtItem = { difficultyB: 2.0, discriminationA: 1.5 };
    const pAbove = probability2PL(3.0, item);
    const pBelow = probability2PL(1.0, item);
    // P(b + d) + P(b - d) should = 1
    expect(pAbove + pBelow).toBeCloseTo(1.0, 5);
  });

  it("is monotonically increasing with theta", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    const thetas = [-3, -2, -1, 0, 1, 2, 3];
    let prev = 0;
    for (const theta of thetas) {
      const p = probability2PL(theta, item);
      expect(p).toBeGreaterThan(prev);
      prev = p;
    }
  });
});

// ---------------------------------------------------------------------------
// fisherInformation
// ---------------------------------------------------------------------------

describe("fisherInformation", () => {
  it("is maximized when theta equals item difficulty", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    const infoAtB = fisherInformation(0, item);
    const infoAway = fisherInformation(2, item);
    expect(infoAtB).toBeGreaterThan(infoAway);
  });

  it("equals a^2 * 0.25 when theta = b (P=0.5)", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 2.0 };
    // I = a^2 * P * (1-P) = 4 * 0.5 * 0.5 = 1.0
    expect(fisherInformation(0, item)).toBeCloseTo(1.0, 5);
  });

  it("scales with the square of discrimination", () => {
    const item1: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    const item2: IrtItem = { difficultyB: 0, discriminationA: 2.0 };
    const ratio =
      fisherInformation(0, item2) / fisherInformation(0, item1);
    expect(ratio).toBeCloseTo(4.0, 5);
  });

  it("is always non-negative", () => {
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    for (const theta of [-5, -2, 0, 2, 5]) {
      expect(fisherInformation(theta, item)).toBeGreaterThanOrEqual(0);
    }
  });
});

// ---------------------------------------------------------------------------
// updateAbility
// ---------------------------------------------------------------------------

describe("updateAbility", () => {
  it("increases theta after a correct response on a matched-difficulty item", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    const updated = updateAbility(ability, item, true);
    expect(updated.theta).toBeGreaterThan(0);
  });

  it("decreases theta after an incorrect response on a matched-difficulty item", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };
    const updated = updateAbility(ability, item, false);
    expect(updated.theta).toBeLessThan(0);
  });

  it("reduces standard error after any response", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.5 };
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };

    const afterCorrect = updateAbility(ability, item, true);
    expect(afterCorrect.standardError).toBeLessThan(ability.standardError);

    const afterIncorrect = updateAbility(ability, item, false);
    expect(afterIncorrect.standardError).toBeLessThan(ability.standardError);
  });

  it("moves theta more for higher discrimination items", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const lowA: IrtItem = { difficultyB: 0, discriminationA: 0.5 };
    const highA: IrtItem = { difficultyB: 0, discriminationA: 2.0 };

    const afterLow = updateAbility(ability, lowA, true);
    const afterHigh = updateAbility(ability, highA, true);

    expect(Math.abs(afterHigh.theta)).toBeGreaterThan(
      Math.abs(afterLow.theta),
    );
  });

  it("produces symmetric updates for correct/incorrect at theta=b", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const item: IrtItem = { difficultyB: 0, discriminationA: 1.0 };

    const afterCorrect = updateAbility(ability, item, true);
    const afterIncorrect = updateAbility(ability, item, false);

    // At theta = b, P = 0.5, so the update magnitudes should be equal (opposite sign)
    expect(Math.abs(afterCorrect.theta)).toBeCloseTo(
      Math.abs(afterIncorrect.theta),
      3,
    );
  });

  it("clamps standard error to minimum of 0.1", () => {
    // After many responses, SE should not go below 0.1
    let ability: StudentAbility = { theta: 0, standardError: 0.15 };
    const item: IrtItem = { difficultyB: 0, discriminationA: 2.0 };

    for (let i = 0; i < 50; i++) {
      ability = updateAbility(ability, item, true);
    }
    expect(ability.standardError).toBeGreaterThanOrEqual(0.1);
  });

  it("clamps standard error to maximum of 3.0", () => {
    // Even with a starting SE of 3, it should not exceed the max
    const ability: StudentAbility = { theta: 0, standardError: 3.0 };
    const item: IrtItem = { difficultyB: 5, discriminationA: 0.01 };
    // Very low discrimination = very little information = SE stays high
    const updated = updateAbility(ability, item, true);
    expect(updated.standardError).toBeLessThanOrEqual(3.0);
  });
});

// ---------------------------------------------------------------------------
// selectNextItem
// ---------------------------------------------------------------------------

describe("selectNextItem", () => {
  const items: IrtItem[] = [
    { difficultyB: -2.0, discriminationA: 1.0 }, // Very easy
    { difficultyB: -1.0, discriminationA: 1.0 },
    { difficultyB: 0.0, discriminationA: 1.0 }, // Medium
    { difficultyB: 1.0, discriminationA: 1.0 },
    { difficultyB: 2.0, discriminationA: 1.0 }, // Very hard
  ];

  it("selects item closest to target success probability (default 0.85)", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const selected = selectNextItem(ability, items);
    // P = 0.85 => theta - b = ln(0.85/0.15) / a = ln(5.67) / 1 ≈ 1.735
    // So b ≈ theta - 1.735 = -1.735
    // Closest item should be b = -2.0 or b = -1.0
    const selectedP = probability2PL(ability.theta, selected);
    // Check that selected item is close to 0.85
    expect(Math.abs(selectedP - 0.85)).toBeLessThan(0.15);
  });

  it("selects easier items in frustrated mode (target 0.92)", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const normal = selectNextItem(ability, items, 0.85);
    const frustrated = selectNextItem(ability, items, 0.92);

    const normalP = probability2PL(ability.theta, normal);
    const frustratedP = probability2PL(ability.theta, frustrated);

    // Frustrated mode should select an item with higher success probability
    expect(frustratedP).toBeGreaterThanOrEqual(normalP - 0.05);
  });

  it("selects harder items in bored mode (target 0.75)", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const normal = selectNextItem(ability, items, 0.85);
    const bored = selectNextItem(ability, items, 0.75);

    const normalP = probability2PL(ability.theta, normal);
    const boredP = probability2PL(ability.theta, bored);

    // Bored mode should select an item with lower success probability
    expect(boredP).toBeLessThanOrEqual(normalP + 0.05);
  });

  it("throws on empty item pool", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    expect(() => selectNextItem(ability, [])).toThrow(
      "Cannot select from an empty item pool",
    );
  });

  it("returns the only item when pool has one item", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const singleItem: IrtItem[] = [{ difficultyB: 0, discriminationA: 1.0 }];
    const selected = selectNextItem(ability, singleItem);
    expect(selected.difficultyB).toBeCloseTo(0, 5);
    expect(selected.discriminationA).toBeCloseTo(1.0, 5);
  });

  it("adapts selection based on student ability", () => {
    const lowAbility: StudentAbility = { theta: -2, standardError: 1.0 };
    const highAbility: StudentAbility = { theta: 2, standardError: 1.0 };

    const selectedLow = selectNextItem(lowAbility, items, 0.85);
    const selectedHigh = selectNextItem(highAbility, items, 0.85);

    // High-ability student should get harder items
    expect(selectedHigh.difficultyB).toBeGreaterThan(selectedLow.difficultyB);
  });

  it("picks the item whose P is closest to target, not just any close item", () => {
    const ability: StudentAbility = { theta: 0, standardError: 1.0 };
    const target = 0.85;
    const selected = selectNextItem(ability, items, target);
    const selectedP = probability2PL(ability.theta, selected);
    const selectedDistance = Math.abs(selectedP - target);

    // Verify no other item is closer to the target
    for (const item of items) {
      const p = probability2PL(ability.theta, item);
      const distance = Math.abs(p - target);
      expect(distance).toBeGreaterThanOrEqual(selectedDistance - 1e-10);
    }
  });
});
