// MathScene DSL TypeScript types — matches animation-dsl.md schema

// ============================================================
// STYLE
// ============================================================

export interface StyleProperties {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontSize?: number;
  fontFamily?: string;
}

// ============================================================
// SCENE OBJECTS
// ============================================================

export interface BaseObject {
  id: string;
  visible?: boolean;
  opacity?: number;
  style?: StyleProperties;
}

export interface CoordinateGridObject extends BaseObject {
  type: "coordinateGrid";
  step: number;
  majorStep?: number;
  color?: string;
}

export interface AxesObject extends BaseObject {
  type: "axes";
  labels?: { x?: string; y?: string };
  tickStep?: { x: number; y: number };
  arrowHeads?: boolean;
}

export interface PointObject extends BaseObject {
  type: "point";
  position: [number, number];
  radius?: number;
  label?: string;
  labelOffset?: [number, number];
  draggable?: boolean;
  dragConstraint?: "x" | "y" | "none";
  snapToGrid?: number;
}

export interface LineObject extends BaseObject {
  type: "line";
  from: [number, number] | string;
  to: [number, number] | string;
  dashed?: boolean;
  arrowHead?: "none" | "end" | "both";
}

export interface VectorObject extends BaseObject {
  type: "vector";
  from: [number, number];
  to: [number, number];
  color?: string;
  label?: string;
}

export interface FunctionPlotObject extends BaseObject {
  type: "functionPlot";
  fn: string;
  domain?: [number, number];
  color?: string;
  thickness?: number;
  samples?: number;
}

export interface NumberLineObject extends BaseObject {
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

export interface FractionBarObject extends BaseObject {
  type: "fractionBar";
  numerator: number;
  denominator: number;
  width?: number;
  height?: number;
  shadedColor?: string;
  unshadedColor?: string;
  showLabel?: boolean;
}

export interface GeometricShapeObject extends BaseObject {
  type: "geometricShape";
  shape: "triangle" | "rectangle" | "circle" | "polygon" | "regularPolygon";
  vertices?: [number, number][];
  center?: [number, number];
  radius?: number;
  sides?: number;
  width?: number;
  height?: number;
  showMeasurements?: boolean;
  draggableVertices?: boolean;
}

export interface AngleObject extends BaseObject {
  type: "angle";
  vertex: [number, number];
  ray1End: [number, number];
  ray2End: [number, number];
  showArc?: boolean;
  showMeasurement?: boolean;
  arcRadius?: number;
}

export interface AnnotationObject extends BaseObject {
  type: "annotation";
  position: [number, number];
  latex: string;
  anchor?: "center" | "left" | "right" | "top" | "bottom";
  background?: boolean;
}

export interface GroupObject extends BaseObject {
  type: "group";
  children: SceneObject[];
  transform?: {
    translate?: [number, number];
    rotate?: number;
    scale?: number | [number, number];
  };
}

export type SceneObject =
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

// ============================================================
// ANIMATION
// ============================================================

export interface BaseStep {
  target?: string;
  duration: number;
  ease?: "linear" | "easeInOut" | "spring" | "easeOutBack";
  delay?: number;
}

export interface FadeInStep extends BaseStep {
  action: "fadeIn";
  from?: "left" | "right" | "top" | "bottom" | "scale";
}

export interface FadeOutStep extends BaseStep {
  action: "fadeOut";
}

export interface DrawStep extends BaseStep {
  action: "draw";
}

export interface TransformStep extends BaseStep {
  action: "transform";
  properties: Record<string, number | string>;
}

export interface MorphToStep extends BaseStep {
  action: "morphTo";
  targetState: Partial<SceneObject>;
}

export interface MoveToStep extends BaseStep {
  action: "moveTo";
  position: [number, number];
}

export interface HighlightStep extends BaseStep {
  action: "highlight";
  color?: string;
  pulse?: boolean;
}

export interface CameraMoveStep extends BaseStep {
  action: "cameraMove";
  viewBox: [number, number, number, number];
}

export interface WaitStep {
  action: "wait";
  duration: number;
}

export interface ParallelStep {
  action: "parallel";
  steps: AnimationStep[];
}

export type AnimationStep =
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

export interface AnimationSequence {
  id?: string;
  trigger: "auto" | "click" | "scroll" | "stage-enter";
  steps: AnimationStep[];
}

// ============================================================
// INTERACTIONS
// ============================================================

export interface UpdateBinding {
  source: "x" | "y" | "value" | "angle";
  target: string;
  property: string;
  transform?: string;
}

export interface Interaction {
  id: string;
  type: "drag" | "slider" | "click" | "hover";
  target: string;
  onUpdate?: UpdateBinding[];
  onComplete?: string;
}

// ============================================================
// SCENE DEFINITION
// ============================================================

export interface SceneDefinition {
  id: string;
  renderer: "auto" | "svg" | "three";
  viewBox: [number, number, number, number];
  background?: string;
  objects: SceneObject[];
  animations: AnimationSequence[];
  interactions: Interaction[];
}

// ============================================================
// AI TUTOR SCENE COMMANDS
// ============================================================

export type SceneCommand =
  | { action: "create"; object: SceneObject }
  | { action: "modify"; targetId: string; properties: Partial<SceneObject> }
  | { action: "animate"; sequence: AnimationSequence }
  | { action: "remove"; targetId: string }
  | { action: "clear" }
  | { action: "reset" };
