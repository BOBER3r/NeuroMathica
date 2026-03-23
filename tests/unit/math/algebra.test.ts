import { describe, it, expect } from "vitest";
import {
  solveLinear,
  solveQuadratic,
  evaluateLinear,
  slopeIntercept,
  evaluateExpression,
  interpolateLinear,
} from "@/lib/math/algebra";

// ---------------------------------------------------------------------------
// solveLinear
// ---------------------------------------------------------------------------
describe("solveLinear", () => {
  it("solves 2x + 4 = 0 => x = -2", () => {
    expect(solveLinear(2, 4)).toBeCloseTo(-2, 10);
  });

  it("solves -3x + 9 = 0 => x = 3", () => {
    expect(solveLinear(-3, 9)).toBeCloseTo(3, 10);
  });

  it("solves x + 0 = 0 => x = 0", () => {
    expect(solveLinear(1, 0)).toBeCloseTo(0, 10);
  });

  it("returns null when a = 0", () => {
    expect(solveLinear(0, 5)).toBeNull();
  });

  it("returns null when a = 0 and b = 0 (infinite solutions)", () => {
    expect(solveLinear(0, 0)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// solveQuadratic
// ---------------------------------------------------------------------------
describe("solveQuadratic", () => {
  it("finds two real roots of x^2 - 5x + 6 = 0", () => {
    const roots = solveQuadratic(1, -5, 6);
    expect(roots).toHaveLength(2);
    const sorted = [...roots].sort((a, b) => a - b);
    expect(sorted[0]).toBeCloseTo(2, 10);
    expect(sorted[1]).toBeCloseTo(3, 10);
  });

  it("finds one repeated root of x^2 - 4x + 4 = 0", () => {
    const roots = solveQuadratic(1, -4, 4);
    expect(roots).toHaveLength(1);
    expect(roots[0]).toBeCloseTo(2, 10);
  });

  it("returns empty array for no real roots (x^2 + 1 = 0)", () => {
    const roots = solveQuadratic(1, 0, 1);
    expect(roots).toHaveLength(0);
  });

  it("handles negative leading coefficient", () => {
    const roots = solveQuadratic(-1, 0, 4); // -x^2 + 4 = 0 => x = +/-2
    const sorted = [...roots].sort((a, b) => a - b);
    expect(sorted[0]).toBeCloseTo(-2, 10);
    expect(sorted[1]).toBeCloseTo(2, 10);
  });

  it("throws when a = 0", () => {
    expect(() => solveQuadratic(0, 2, 1)).toThrow("cannot be zero");
  });
});

// ---------------------------------------------------------------------------
// evaluateLinear
// ---------------------------------------------------------------------------
describe("evaluateLinear", () => {
  it("evaluates y = 2x + 3 at x = 4", () => {
    expect(evaluateLinear(2, 3, 4)).toBeCloseTo(11, 10);
  });

  it("evaluates y = -x + 5 at x = 5", () => {
    expect(evaluateLinear(-1, 5, 5)).toBeCloseTo(0, 10);
  });

  it("evaluates y = 0x + 7 (constant function)", () => {
    expect(evaluateLinear(0, 7, 100)).toBeCloseTo(7, 10);
  });

  it("evaluates at x = 0", () => {
    expect(evaluateLinear(3, 2, 0)).toBeCloseTo(2, 10);
  });
});

// ---------------------------------------------------------------------------
// slopeIntercept
// ---------------------------------------------------------------------------
describe("slopeIntercept", () => {
  it("computes y = 2x + 1 from (0,1) and (1,3)", () => {
    const result = slopeIntercept(0, 1, 1, 3);
    expect(result).not.toBeNull();
    expect(result!.slope).toBeCloseTo(2, 10);
    expect(result!.intercept).toBeCloseTo(1, 10);
  });

  it("computes negative slope", () => {
    const result = slopeIntercept(0, 4, 2, 0);
    expect(result).not.toBeNull();
    expect(result!.slope).toBeCloseTo(-2, 10);
    expect(result!.intercept).toBeCloseTo(4, 10);
  });

  it("computes zero slope (horizontal line)", () => {
    const result = slopeIntercept(1, 5, 3, 5);
    expect(result).not.toBeNull();
    expect(result!.slope).toBeCloseTo(0, 10);
    expect(result!.intercept).toBeCloseTo(5, 10);
  });

  it("returns null for vertical line", () => {
    expect(slopeIntercept(2, 1, 2, 5)).toBeNull();
  });

  it("computes from points not at origin", () => {
    const result = slopeIntercept(2, 3, 4, 7);
    expect(result).not.toBeNull();
    expect(result!.slope).toBeCloseTo(2, 10);
    expect(result!.intercept).toBeCloseTo(-1, 10);
  });
});

// ---------------------------------------------------------------------------
// evaluateExpression
// ---------------------------------------------------------------------------
describe("evaluateExpression", () => {
  describe("basic arithmetic", () => {
    it("evaluates addition", () => {
      expect(evaluateExpression("2 + 3")).toBeCloseTo(5, 10);
    });

    it("evaluates subtraction", () => {
      expect(evaluateExpression("10 - 4")).toBeCloseTo(6, 10);
    });

    it("evaluates multiplication", () => {
      expect(evaluateExpression("3 * 7")).toBeCloseTo(21, 10);
    });

    it("evaluates division", () => {
      expect(evaluateExpression("15 / 3")).toBeCloseTo(5, 10);
    });

    it("respects operator precedence", () => {
      expect(evaluateExpression("2 + 3 * 4")).toBeCloseTo(14, 10);
    });
  });

  describe("variables", () => {
    it("substitutes a single variable", () => {
      expect(evaluateExpression("x + 1", { x: 5 })).toBeCloseTo(6, 10);
    });

    it("substitutes multiple variables", () => {
      expect(evaluateExpression("x + y", { x: 3, y: 7 })).toBeCloseTo(10, 10);
    });

    it("evaluates 2*x + 1 at x = 3", () => {
      expect(evaluateExpression("2*x + 1", { x: 3 })).toBeCloseTo(7, 10);
    });

    it("throws for undefined variable", () => {
      expect(() => evaluateExpression("x + 1")).toThrow("Undefined variable");
    });
  });

  describe("exponents", () => {
    it("evaluates x^2", () => {
      expect(evaluateExpression("x^2", { x: 5 })).toBeCloseTo(25, 10);
    });

    it("evaluates 2^10", () => {
      expect(evaluateExpression("2^10")).toBeCloseTo(1024, 10);
    });

    it("right-associative: 2^3^2 = 2^(3^2) = 2^9 = 512", () => {
      expect(evaluateExpression("2^3^2")).toBeCloseTo(512, 10);
    });
  });

  describe("parentheses", () => {
    it("handles simple parentheses", () => {
      expect(evaluateExpression("(2 + 3) * 4")).toBeCloseTo(20, 10);
    });

    it("handles nested parentheses", () => {
      expect(evaluateExpression("((2 + 3) * (4 - 1))")).toBeCloseTo(15, 10);
    });

    it("handles deeply nested parentheses", () => {
      expect(evaluateExpression("(((1 + 2)))")).toBeCloseTo(3, 10);
    });
  });

  describe("math functions", () => {
    it("evaluates sin(0)", () => {
      expect(evaluateExpression("sin(0)")).toBeCloseTo(0, 10);
    });

    it("evaluates cos(0)", () => {
      expect(evaluateExpression("cos(0)")).toBeCloseTo(1, 10);
    });

    it("evaluates sqrt(16)", () => {
      expect(evaluateExpression("sqrt(16)")).toBeCloseTo(4, 10);
    });

    it("evaluates abs(-5)", () => {
      expect(evaluateExpression("abs(-5)")).toBeCloseTo(5, 10);
    });

    it("evaluates sin(pi/2) using variable", () => {
      expect(
        evaluateExpression("sin(x)", { x: Math.PI / 2 }),
      ).toBeCloseTo(1, 10);
    });
  });

  describe("implicit multiplication", () => {
    it("evaluates 2x as 2*x", () => {
      expect(evaluateExpression("2x", { x: 5 })).toBeCloseTo(10, 10);
    });

    it("evaluates 3(x+1)", () => {
      expect(evaluateExpression("3(x+1)", { x: 2 })).toBeCloseTo(9, 10);
    });
  });

  describe("unary operators", () => {
    it("handles unary minus", () => {
      expect(evaluateExpression("-5")).toBeCloseTo(-5, 10);
    });

    it("handles unary minus with expression", () => {
      expect(evaluateExpression("-x + 3", { x: 2 })).toBeCloseTo(1, 10);
    });
  });

  describe("complex expressions", () => {
    it("evaluates x^2 + 2*x + 1 at x=4 -> 25", () => {
      expect(
        evaluateExpression("x^2 + 2*x + 1", { x: 4 }),
      ).toBeCloseTo(25, 10);
    });

    it("evaluates quadratic formula component", () => {
      // sqrt(b^2 - 4*a*c) with a=1, b=5, c=6
      expect(
        evaluateExpression("sqrt(b^2 - 4*a*c)", { a: 1, b: 5, c: 6 }),
      ).toBeCloseTo(1, 10);
    });
  });

  describe("error handling", () => {
    it("throws on division by zero", () => {
      expect(() => evaluateExpression("1/0")).toThrow("Division by zero");
    });

    it("throws on unexpected character", () => {
      expect(() => evaluateExpression("2 & 3")).toThrow("Unexpected character");
    });
  });
});

// ---------------------------------------------------------------------------
// interpolateLinear
// ---------------------------------------------------------------------------
describe("interpolateLinear", () => {
  it("interpolates at the midpoint", () => {
    expect(interpolateLinear(1.5, 1, 0, 2, 10)).toBeCloseTo(5, 10);
  });

  it("returns y1 when x = x1", () => {
    expect(interpolateLinear(0, 0, 5, 10, 15)).toBeCloseTo(5, 10);
  });

  it("returns y2 when x = x2", () => {
    expect(interpolateLinear(10, 0, 5, 10, 15)).toBeCloseTo(15, 10);
  });

  it("extrapolates beyond the range", () => {
    expect(interpolateLinear(3, 0, 0, 1, 2)).toBeCloseTo(6, 10);
  });

  it("throws when x1 = x2", () => {
    expect(() => interpolateLinear(1, 2, 3, 2, 5)).toThrow(
      "x1 and x2 must be different",
    );
  });
});
