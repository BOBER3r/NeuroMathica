# Animation DSL: MathScene JSON Schema

**Date**: 2026-03-22 | **Plan**: [../plan.md](../plan.md)

The MathScene DSL defines how lesson content authors describe interactive
mathematical visualizations in JSON. The `<MathScene>` React component
interprets this JSON and renders the appropriate SVG or R3F scene.

## Scene Definition

```typescript
interface SceneDefinition {
  id: string;
  renderer: "auto" | "svg" | "three";     // "auto" selects based on content
  viewBox: [number, number, number, number]; // [xMin, yMin, width, height]
  background?: string;                      // Default: "transparent"
  objects: SceneObject[];
  animations: AnimationSequence[];
  interactions: Interaction[];
}
```

## Scene Objects

```typescript
type SceneObject =
  | CoordinateGridObject
  | AxesObject
  | PointObject
  | LineObject
  | VectorObject
  | FunctionPlotObject
  | NumberLineObject
  | FractionBarObject
  | GeometricShapeObject
  | AngleObject
  | AnnotationObject
  | GroupObject;

interface BaseObject {
  id: string;
  visible?: boolean;           // Default: true
  opacity?: number;            // 0-1, default: 1
  style?: StyleProperties;
}

interface StyleProperties {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontSize?: number;
  fontFamily?: string;
}
```

### Core Math Objects

```typescript
interface CoordinateGridObject extends BaseObject {
  type: "coordinateGrid";
  step: number;                // Grid line spacing
  majorStep?: number;          // Bold grid line spacing
  color?: string;
  opacity?: number;
}

interface AxesObject extends BaseObject {
  type: "axes";
  labels?: { x?: string; y?: string };
  tickStep?: { x: number; y: number };
  arrowHeads?: boolean;
}

interface PointObject extends BaseObject {
  type: "point";
  position: [number, number];
  radius?: number;
  label?: string;              // KaTeX string
  labelOffset?: [number, number];
  draggable?: boolean;
  dragConstraint?: "x" | "y" | "none"; // Axis-locked dragging
  snapToGrid?: number;         // Snap interval
}

interface LineObject extends BaseObject {
  type: "line";
  from: [number, number] | string;  // Coordinates or object ID reference
  to: [number, number] | string;
  dashed?: boolean;
  arrowHead?: "none" | "end" | "both";
}

interface VectorObject extends BaseObject {
  type: "vector";
  from: [number, number];
  to: [number, number];
  color?: string;
  label?: string;
}

interface FunctionPlotObject extends BaseObject {
  type: "functionPlot";
  fn: string;                  // Math expression: "x^2", "sin(x)", "2*x+1"
  domain?: [number, number];   // x range
  color?: string;
  thickness?: number;
  samples?: number;            // Point count (default: 200)
}

interface NumberLineObject extends BaseObject {
  type: "numberLine";
  range: [number, number];
  step: number;
  markers?: Array<{
    value: number;
    label?: string;
    color?: string;
    style?: "dot" | "open" | "arrow-left" | "arrow-right";
  }>;
  highlightRange?: {
    from: number;
    to: number;
    color: string;
  };
}

interface FractionBarObject extends BaseObject {
  type: "fractionBar";
  numerator: number;
  denominator: number;
  width?: number;
  height?: number;
  shadedColor?: string;
  unshadedColor?: string;
  showLabel?: boolean;
}

interface GeometricShapeObject extends BaseObject {
  type: "geometricShape";
  shape: "triangle" | "rectangle" | "circle" | "polygon" | "regularPolygon";
  vertices?: [number, number][];    // For triangle, polygon
  center?: [number, number];        // For circle, regularPolygon
  radius?: number;
  sides?: number;                   // For regularPolygon
  width?: number;                   // For rectangle
  height?: number;
  showMeasurements?: boolean;       // Display side lengths, angles
  draggableVertices?: boolean;
}

interface AngleObject extends BaseObject {
  type: "angle";
  vertex: [number, number];
  ray1End: [number, number];
  ray2End: [number, number];
  showArc?: boolean;
  showMeasurement?: boolean;
  arcRadius?: number;
}

interface AnnotationObject extends BaseObject {
  type: "annotation";
  position: [number, number];
  latex: string;               // KaTeX string
  anchor?: "center" | "left" | "right" | "top" | "bottom";
  background?: boolean;        // Semi-transparent background
}

interface GroupObject extends BaseObject {
  type: "group";
  children: SceneObject[];
  transform?: {
    translate?: [number, number];
    rotate?: number;           // Degrees
    scale?: number | [number, number];
  };
}
```

## Animation Sequences

```typescript
interface AnimationSequence {
  id?: string;
  trigger: "auto" | "click" | "scroll" | "stage-enter";
  steps: AnimationStep[];
}

type AnimationStep =
  | FadeInStep
  | FadeOutStep
  | DrawStep
  | TransformStep
  | MorphToStep
  | MoveToStep
  | HighlightStep
  | CameraMoveStep
  | WaitStep
  | ParallelStep;

interface BaseStep {
  target?: string;             // Object ID
  duration: number;            // Seconds
  ease?: string;               // "linear" | "easeInOut" | "spring" | "easeOutBack"
  delay?: number;
}

interface FadeInStep extends BaseStep {
  action: "fadeIn";
  from?: "left" | "right" | "top" | "bottom" | "scale";
}

interface FadeOutStep extends BaseStep {
  action: "fadeOut";
}

interface DrawStep extends BaseStep {
  action: "draw";              // SVG path draw animation
}

interface TransformStep extends BaseStep {
  action: "transform";
  properties: Record<string, number | string>; // Any animatable property
}

interface MorphToStep extends BaseStep {
  action: "morphTo";
  targetState: Partial<SceneObject>; // Morph to new state
}

interface MoveToStep extends BaseStep {
  action: "moveTo";
  position: [number, number];
}

interface HighlightStep extends BaseStep {
  action: "highlight";
  color?: string;
  pulse?: boolean;
}

interface CameraMoveStep extends BaseStep {
  action: "cameraMove";
  viewBox: [number, number, number, number];
}

interface WaitStep {
  action: "wait";
  duration: number;
}

interface ParallelStep {
  action: "parallel";
  steps: AnimationStep[];      // Run these simultaneously
}
```

## Interactions

```typescript
interface Interaction {
  id: string;
  type: "drag" | "slider" | "click" | "hover";
  target: string;              // Object ID
  onUpdate?: UpdateBinding[];  // Live bindings while interacting
  onComplete?: string;         // Animation sequence ID to trigger
}

interface UpdateBinding {
  source: "x" | "y" | "value" | "angle";
  target: string;              // Object ID to update
  property: string;            // Property path
  transform?: string;          // Math expression: "value * 2 + 1"
}
```

## Example: Pythagorean Theorem Lesson (Stage 2)

```json
{
  "id": "pythagorean-spatial",
  "renderer": "svg",
  "viewBox": [-1, -1, 12, 10],
  "objects": [
    { "type": "coordinateGrid", "id": "grid", "step": 1, "opacity": 0.15 },
    {
      "type": "geometricShape", "id": "triangle",
      "shape": "triangle",
      "vertices": [[0, 0], [3, 0], [3, 4]],
      "draggableVertices": true,
      "showMeasurements": true,
      "style": { "stroke": "#3b82f6", "strokeWidth": 2, "fill": "transparent" }
    },
    {
      "type": "geometricShape", "id": "square-a",
      "shape": "rectangle",
      "style": { "fill": "#3b82f620", "stroke": "#3b82f6" }
    },
    {
      "type": "geometricShape", "id": "square-b",
      "shape": "rectangle",
      "style": { "fill": "#10b98120", "stroke": "#10b981" }
    },
    {
      "type": "geometricShape", "id": "square-c",
      "shape": "rectangle",
      "style": { "fill": "#f59e0b20", "stroke": "#f59e0b" }
    },
    {
      "type": "annotation", "id": "label-a",
      "position": [1.5, -0.5],
      "latex": "a^2 = 9"
    },
    {
      "type": "annotation", "id": "label-b",
      "position": [3.5, 2],
      "latex": "b^2 = 16"
    },
    {
      "type": "annotation", "id": "label-c",
      "position": [0.5, 3],
      "latex": "c^2 = 25"
    }
  ],
  "animations": [
    {
      "trigger": "auto",
      "steps": [
        { "action": "fadeIn", "target": "grid", "duration": 0.3 },
        { "action": "draw", "target": "triangle", "duration": 1.5, "ease": "easeInOut" },
        { "action": "wait", "duration": 0.5 },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "square-a", "duration": 0.8, "from": "scale" },
            { "action": "fadeIn", "target": "label-a", "duration": 0.5, "delay": 0.3 }
          ]
        },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "square-b", "duration": 0.8, "from": "scale" },
            { "action": "fadeIn", "target": "label-b", "duration": 0.5, "delay": 0.3 }
          ]
        },
        {
          "action": "parallel",
          "steps": [
            { "action": "fadeIn", "target": "square-c", "duration": 0.8, "from": "scale" },
            { "action": "fadeIn", "target": "label-c", "duration": 0.5, "delay": 0.3 }
          ]
        }
      ]
    }
  ],
  "interactions": [
    {
      "id": "drag-vertices",
      "type": "drag",
      "target": "triangle",
      "onUpdate": [
        {
          "source": "value",
          "target": "square-a",
          "property": "computed",
          "transform": "recomputeSquareOnSide('a')"
        },
        {
          "source": "value",
          "target": "label-a",
          "property": "latex",
          "transform": "formatAreaLabel('a')"
        }
      ]
    }
  ]
}
```

## AI Tutor Scene Commands

The AI tutor generates MathScene commands using the same object/animation schema.
Commands are sent as an array of operations:

```typescript
type SceneCommand =
  | { action: "create"; object: SceneObject }
  | { action: "modify"; targetId: string; properties: Partial<SceneObject> }
  | { action: "animate"; sequence: AnimationSequence }
  | { action: "remove"; targetId: string }
  | { action: "clear" }
  | { action: "reset" };
```

The `SceneCommander` component in the AI tutor pipeline validates and executes
these commands against the current scene state.
