"use client";

import type { SceneObject } from "@/components/math-scene/animation/types";

interface A11yLayerProps {
  objects: SceneObject[];
  sceneLabel: string;
}

function getObjectDescription(obj: SceneObject): string {
  switch (obj.type) {
    case "coordinateGrid":
      return `Coordinate grid with step size ${obj.step}`;
    case "axes":
      return `Axes${obj.labels ? ` labeled ${obj.labels.x ?? "x"} and ${obj.labels.y ?? "y"}` : ""}`;
    case "point":
      return `Point${obj.label ? ` ${obj.label}` : ""} at (${obj.position[0]}, ${obj.position[1]})${obj.draggable ? ", draggable" : ""}`;
    case "line":
      return `Line segment`;
    case "vector":
      return `Vector${obj.label ? ` ${obj.label}` : ""} from (${obj.from[0]}, ${obj.from[1]}) to (${obj.to[0]}, ${obj.to[1]})`;
    case "functionPlot":
      return `Graph of function ${obj.fn}`;
    case "numberLine":
      return `Number line from ${obj.range[0]} to ${obj.range[1]}`;
    case "fractionBar":
      return `Fraction bar showing ${obj.numerator}/${obj.denominator}`;
    case "geometricShape":
      return `${obj.shape}${obj.showMeasurements ? " with measurements shown" : ""}`;
    case "angle":
      return `Angle at vertex (${obj.vertex[0]}, ${obj.vertex[1]})${obj.showMeasurement ? " with measurement" : ""}`;
    case "annotation":
      return `Mathematical notation: ${obj.latex}`;
    case "group":
      return `Group of ${obj.children.length} objects`;
    default:
      return "Mathematical object";
  }
}

export function A11yLayer({ objects, sceneLabel }: A11yLayerProps) {
  const visibleObjects = objects.filter((obj) => obj.visible !== false);

  return (
    <div
      className="sr-only"
      role="list"
      aria-label={sceneLabel}
    >
      {visibleObjects.map((obj) => (
        <div key={obj.id} role="listitem">
          {getObjectDescription(obj)}
        </div>
      ))}
    </div>
  );
}
