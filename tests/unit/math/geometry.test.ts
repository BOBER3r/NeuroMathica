import { describe, it, expect } from "vitest";
import {
  distance,
  midpoint,
  slope,
  triangleArea,
  triangleAreaFromSides,
  pythagorean,
  rectangleArea,
  circleArea,
  circleCircumference,
  degreesToRadians,
  radiansToDegrees,
  angleBetweenPoints,
  polygonArea,
  isRightTriangle,
} from "@/lib/math/geometry";

// ---------------------------------------------------------------------------
// distance
// ---------------------------------------------------------------------------
describe("distance", () => {
  it("computes distance between two points", () => {
    expect(distance(0, 0, 3, 4)).toBeCloseTo(5, 10);
  });

  it("returns 0 for same point", () => {
    expect(distance(2, 3, 2, 3)).toBeCloseTo(0, 10);
  });

  it("handles negative coordinates", () => {
    expect(distance(-1, -1, 2, 3)).toBeCloseTo(5, 10);
  });

  it("handles horizontal distance", () => {
    expect(distance(0, 0, 5, 0)).toBeCloseTo(5, 10);
  });

  it("handles vertical distance", () => {
    expect(distance(0, 0, 0, 7)).toBeCloseTo(7, 10);
  });
});

// ---------------------------------------------------------------------------
// midpoint
// ---------------------------------------------------------------------------
describe("midpoint", () => {
  it("computes midpoint of two points", () => {
    const [mx, my] = midpoint(0, 0, 4, 6);
    expect(mx).toBeCloseTo(2, 10);
    expect(my).toBeCloseTo(3, 10);
  });

  it("midpoint of same point is that point", () => {
    const [mx, my] = midpoint(3, 5, 3, 5);
    expect(mx).toBeCloseTo(3, 10);
    expect(my).toBeCloseTo(5, 10);
  });

  it("handles negative coordinates", () => {
    const [mx, my] = midpoint(-2, -4, 2, 4);
    expect(mx).toBeCloseTo(0, 10);
    expect(my).toBeCloseTo(0, 10);
  });

  it("handles fractional midpoints", () => {
    const [mx, my] = midpoint(0, 0, 1, 1);
    expect(mx).toBeCloseTo(0.5, 10);
    expect(my).toBeCloseTo(0.5, 10);
  });
});

// ---------------------------------------------------------------------------
// slope
// ---------------------------------------------------------------------------
describe("slope", () => {
  it("computes positive slope", () => {
    expect(slope(0, 0, 2, 4)).toBeCloseTo(2, 10);
  });

  it("computes negative slope", () => {
    expect(slope(0, 4, 2, 0)).toBeCloseTo(-2, 10);
  });

  it("computes zero slope (horizontal line)", () => {
    expect(slope(0, 3, 5, 3)).toBeCloseTo(0, 10);
  });

  it("returns null for vertical line", () => {
    expect(slope(2, 0, 2, 5)).toBeNull();
  });

  it("computes fractional slope", () => {
    expect(slope(0, 0, 3, 1)).toBeCloseTo(1 / 3, 10);
  });
});

// ---------------------------------------------------------------------------
// triangleArea
// ---------------------------------------------------------------------------
describe("triangleArea", () => {
  it("computes area of a right triangle at origin", () => {
    expect(triangleArea(0, 0, 4, 0, 0, 3)).toBeCloseTo(6, 10);
  });

  it("computes area of a unit triangle", () => {
    expect(triangleArea(0, 0, 1, 0, 0.5, 1)).toBeCloseTo(0.5, 10);
  });

  it("returns 0 for collinear points", () => {
    expect(triangleArea(0, 0, 1, 1, 2, 2)).toBeCloseTo(0, 10);
  });

  it("handles negative coordinates", () => {
    expect(triangleArea(-1, -1, 3, -1, -1, 2)).toBeCloseTo(6, 10);
  });

  it("order of vertices does not affect area", () => {
    const a1 = triangleArea(0, 0, 5, 0, 0, 5);
    const a2 = triangleArea(0, 5, 5, 0, 0, 0);
    expect(a1).toBeCloseTo(a2, 10);
  });
});

// ---------------------------------------------------------------------------
// triangleAreaFromSides (Heron's formula)
// ---------------------------------------------------------------------------
describe("triangleAreaFromSides", () => {
  it("computes area of 3-4-5 right triangle", () => {
    expect(triangleAreaFromSides(3, 4, 5)).toBeCloseTo(6, 10);
  });

  it("computes area of equilateral triangle", () => {
    // Area of equilateral triangle side 2 = sqrt(3)
    expect(triangleAreaFromSides(2, 2, 2)).toBeCloseTo(Math.sqrt(3), 10);
  });

  it("handles large triangles", () => {
    expect(triangleAreaFromSides(13, 14, 15)).toBeCloseTo(84, 10);
  });

  it("throws for invalid triangle", () => {
    expect(() => triangleAreaFromSides(1, 2, 10)).toThrow("triangle inequality");
  });

  it("throws for non-positive sides", () => {
    expect(() => triangleAreaFromSides(0, 3, 4)).toThrow("positive");
    expect(() => triangleAreaFromSides(-1, 3, 4)).toThrow("positive");
  });
});

// ---------------------------------------------------------------------------
// pythagorean
// ---------------------------------------------------------------------------
describe("pythagorean", () => {
  it("computes hypotenuse of 3-4 triangle", () => {
    expect(pythagorean(3, 4)).toBeCloseTo(5, 10);
  });

  it("computes hypotenuse of 5-12 triangle", () => {
    expect(pythagorean(5, 12)).toBeCloseTo(13, 10);
  });

  it("computes hypotenuse of 1-1 triangle", () => {
    expect(pythagorean(1, 1)).toBeCloseTo(Math.SQRT2, 10);
  });

  it("handles zero leg", () => {
    expect(pythagorean(0, 5)).toBeCloseTo(5, 10);
  });
});

// ---------------------------------------------------------------------------
// rectangleArea
// ---------------------------------------------------------------------------
describe("rectangleArea", () => {
  it("computes area of a rectangle", () => {
    expect(rectangleArea(5, 3)).toBeCloseTo(15, 10);
  });

  it("handles square", () => {
    expect(rectangleArea(4, 4)).toBeCloseTo(16, 10);
  });

  it("handles zero dimension", () => {
    expect(rectangleArea(0, 5)).toBeCloseTo(0, 10);
  });

  it("handles fractional dimensions", () => {
    expect(rectangleArea(2.5, 3.5)).toBeCloseTo(8.75, 10);
  });
});

// ---------------------------------------------------------------------------
// circleArea
// ---------------------------------------------------------------------------
describe("circleArea", () => {
  it("computes area of unit circle", () => {
    expect(circleArea(1)).toBeCloseTo(Math.PI, 10);
  });

  it("computes area of circle with radius 5", () => {
    expect(circleArea(5)).toBeCloseTo(25 * Math.PI, 10);
  });

  it("handles zero radius", () => {
    expect(circleArea(0)).toBeCloseTo(0, 10);
  });
});

// ---------------------------------------------------------------------------
// circleCircumference
// ---------------------------------------------------------------------------
describe("circleCircumference", () => {
  it("computes circumference of unit circle", () => {
    expect(circleCircumference(1)).toBeCloseTo(2 * Math.PI, 10);
  });

  it("computes circumference of circle with radius 3", () => {
    expect(circleCircumference(3)).toBeCloseTo(6 * Math.PI, 10);
  });

  it("handles zero radius", () => {
    expect(circleCircumference(0)).toBeCloseTo(0, 10);
  });
});

// ---------------------------------------------------------------------------
// degreesToRadians / radiansToDegrees
// ---------------------------------------------------------------------------
describe("degreesToRadians", () => {
  it("converts 0 degrees", () => {
    expect(degreesToRadians(0)).toBeCloseTo(0, 10);
  });

  it("converts 90 degrees", () => {
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2, 10);
  });

  it("converts 180 degrees", () => {
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI, 10);
  });

  it("converts 360 degrees", () => {
    expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI, 10);
  });

  it("converts negative degrees", () => {
    expect(degreesToRadians(-45)).toBeCloseTo(-Math.PI / 4, 10);
  });
});

describe("radiansToDegrees", () => {
  it("converts 0 radians", () => {
    expect(radiansToDegrees(0)).toBeCloseTo(0, 10);
  });

  it("converts pi/2 radians", () => {
    expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90, 10);
  });

  it("converts pi radians", () => {
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180, 10);
  });

  it("converts 2*pi radians", () => {
    expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360, 10);
  });

  it("round-trips with degreesToRadians", () => {
    expect(radiansToDegrees(degreesToRadians(123.456))).toBeCloseTo(123.456, 10);
  });
});

// ---------------------------------------------------------------------------
// angleBetweenPoints
// ---------------------------------------------------------------------------
describe("angleBetweenPoints", () => {
  it("returns 0 for point to the right", () => {
    expect(angleBetweenPoints(0, 0, 1, 0)).toBeCloseTo(0, 10);
  });

  it("returns 90 for point above", () => {
    expect(angleBetweenPoints(0, 0, 0, 1)).toBeCloseTo(90, 10);
  });

  it("returns 180 for point to the left", () => {
    expect(angleBetweenPoints(0, 0, -1, 0)).toBeCloseTo(180, 10);
  });

  it("returns 270 for point below", () => {
    expect(angleBetweenPoints(0, 0, 0, -1)).toBeCloseTo(270, 10);
  });

  it("returns 45 for diagonal", () => {
    expect(angleBetweenPoints(0, 0, 1, 1)).toBeCloseTo(45, 10);
  });
});

// ---------------------------------------------------------------------------
// polygonArea (shoelace formula)
// ---------------------------------------------------------------------------
describe("polygonArea", () => {
  it("computes area of a unit square", () => {
    expect(
      polygonArea([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ]),
    ).toBeCloseTo(1, 10);
  });

  it("computes area of a triangle", () => {
    expect(
      polygonArea([
        [0, 0],
        [4, 0],
        [0, 3],
      ]),
    ).toBeCloseTo(6, 10);
  });

  it("computes area of a rectangle", () => {
    expect(
      polygonArea([
        [0, 0],
        [5, 0],
        [5, 3],
        [0, 3],
      ]),
    ).toBeCloseTo(15, 10);
  });

  it("works regardless of winding order", () => {
    const cw = polygonArea([
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ]);
    const ccw = polygonArea([
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
    ]);
    expect(cw).toBeCloseTo(ccw, 10);
  });

  it("throws for fewer than 3 vertices", () => {
    expect(() =>
      polygonArea([
        [0, 0],
        [1, 1],
      ]),
    ).toThrow("at least 3 vertices");
  });
});

// ---------------------------------------------------------------------------
// isRightTriangle
// ---------------------------------------------------------------------------
describe("isRightTriangle", () => {
  it("identifies 3-4-5 as a right triangle", () => {
    expect(isRightTriangle(3, 4, 5)).toBe(true);
  });

  it("identifies 5-12-13 as a right triangle", () => {
    expect(isRightTriangle(5, 12, 13)).toBe(true);
  });

  it("works regardless of side order", () => {
    expect(isRightTriangle(5, 3, 4)).toBe(true);
    expect(isRightTriangle(13, 5, 12)).toBe(true);
  });

  it("rejects non-right triangle", () => {
    expect(isRightTriangle(3, 4, 6)).toBe(false);
  });

  it("handles floating-point right triangle", () => {
    expect(isRightTriangle(1, 1, Math.SQRT2)).toBe(true);
  });
});
