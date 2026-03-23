"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import type {
  AnimationSequence,
  Interaction,
  SceneCommand,
  SceneDefinition,
  SceneObject,
} from "@/components/math-scene/animation/types";
import { useSequencer } from "@/components/math-scene/animation/Sequencer";
import { cn } from "@/lib/utils/cn";
import CoordinateGrid from "@/components/math-scene/svg/CoordinateGrid";
import Annotation from "@/components/math-scene/svg/Annotation";

// ============================================================
// Imperative Handle
// ============================================================

export interface MathSceneHandle {
  executeCommand: (cmd: SceneCommand) => void;
  play: (sequenceId: string) => void;
  reset: () => void;
}

// ============================================================
// Props
// ============================================================

interface MathSceneProps {
  scene: SceneDefinition;
  className?: string;
  onInteraction?: (
    interactionId: string,
    data: Record<string, number>,
  ) => void;
  onAnimationComplete?: (sequenceId: string) => void;
}

// ============================================================
// Object Renderer
// ============================================================

/**
 * Renders a single SceneObject as its corresponding SVG component.
 * New object types should be added here as their SVG components are created.
 */
function SceneObjectRenderer({
  obj,
  viewBox,
  interactions,
  onInteraction,
}: {
  obj: SceneObject;
  viewBox: [number, number, number, number];
  interactions: Interaction[];
  onInteraction?: (
    interactionId: string,
    data: Record<string, number>,
  ) => void;
}) {
  // Resolve interactions that target this object
  const objectInteractions = useMemo(
    () => interactions.filter((i) => i.target === obj.id),
    [interactions, obj.id],
  );

  // Build interaction event handlers
  const interactionHandlers: Record<string, () => void> = {};
  for (const interaction of objectInteractions) {
    if (interaction.type === "click") {
      interactionHandlers.onClick = () => {
        onInteraction?.(interaction.id, {});
      };
    }
    if (interaction.type === "hover") {
      interactionHandlers.onMouseEnter = () => {
        onInteraction?.(interaction.id, {});
      };
    }
  }

  switch (obj.type) {
    case "coordinateGrid":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          <CoordinateGrid
            step={obj.step}
            majorStep={obj.majorStep}
            color={obj.color}
            opacity={obj.opacity}
            style={obj.style}
            viewBox={viewBox}
          />
        </g>
      );

    case "axes":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          {/* Axes SVG component — to be implemented in T028 */}
          <line
            x1={viewBox[0]}
            y1={0}
            x2={viewBox[0] + viewBox[2]}
            y2={0}
            stroke={obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.05}
          />
          <line
            x1={0}
            y1={viewBox[1]}
            x2={0}
            y2={viewBox[1] + viewBox[3]}
            stroke={obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.05}
          />
        </g>
      );

    case "point":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          <circle
            cx={obj.position[0]}
            cy={obj.position[1]}
            r={obj.radius ?? 0.15}
            fill={obj.style?.fill ?? "#3b82f6"}
            stroke={obj.style?.stroke}
            strokeWidth={obj.style?.strokeWidth}
          />
          {obj.label && (
            <text
              x={obj.position[0] + (obj.labelOffset?.[0] ?? 0.3)}
              y={obj.position[1] + (obj.labelOffset?.[1] ?? -0.3)}
              fontSize={obj.style?.fontSize ?? 0.4}
              fill={obj.style?.fill ?? "#000"}
            >
              {obj.label}
            </text>
          )}
        </g>
      );

    case "line":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          {/* Line — from/to can be coordinate tuples or ID refs (resolved later) */}
          <line
            x1={Array.isArray(obj.from) ? obj.from[0] : 0}
            y1={Array.isArray(obj.from) ? obj.from[1] : 0}
            x2={Array.isArray(obj.to) ? obj.to[0] : 0}
            y2={Array.isArray(obj.to) ? obj.to[1] : 0}
            stroke={obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.05}
            strokeDasharray={obj.dashed ? "0.2 0.1" : undefined}
          />
        </g>
      );

    case "vector":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          <line
            x1={obj.from[0]}
            y1={obj.from[1]}
            x2={obj.to[0]}
            y2={obj.to[1]}
            stroke={obj.color ?? obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.06}
            markerEnd="url(#arrowhead)"
          />
        </g>
      );

    case "functionPlot":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          {/* FunctionPlot — full implementation in dedicated SVG component */}
          <path
            d=""
            stroke={obj.color ?? "#3b82f6"}
            strokeWidth={obj.thickness ?? 0.06}
            fill="none"
          />
        </g>
      );

    case "numberLine":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          {/* NumberLine — full implementation in dedicated SVG component */}
          <line
            x1={obj.range[0]}
            y1={0}
            x2={obj.range[1]}
            y2={0}
            stroke={obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.05}
          />
        </g>
      );

    case "fractionBar":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          {/* FractionBar — full implementation in dedicated SVG component */}
          <rect
            x={0}
            y={0}
            width={obj.width ?? 4}
            height={obj.height ?? 1}
            fill={obj.unshadedColor ?? "#e5e7eb"}
            stroke={obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.03}
          />
        </g>
      );

    case "geometricShape":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          {/* GeometricShape — renders based on shape sub-type */}
          {obj.vertices && (
            <polygon
              points={obj.vertices.map(([x, y]) => `${x},${y}`).join(" ")}
              fill={obj.style?.fill ?? "none"}
              stroke={obj.style?.stroke ?? "#000"}
              strokeWidth={obj.style?.strokeWidth ?? 0.05}
            />
          )}
          {obj.shape === "circle" && obj.center && (
            <circle
              cx={obj.center[0]}
              cy={obj.center[1]}
              r={obj.radius ?? 1}
              fill={obj.style?.fill ?? "none"}
              stroke={obj.style?.stroke ?? "#000"}
              strokeWidth={obj.style?.strokeWidth ?? 0.05}
            />
          )}
          {obj.shape === "rectangle" &&
            !obj.vertices &&
            obj.center &&
            obj.width &&
            obj.height && (
              <rect
                x={obj.center[0] - obj.width / 2}
                y={obj.center[1] - obj.height / 2}
                width={obj.width}
                height={obj.height}
                fill={obj.style?.fill ?? "none"}
                stroke={obj.style?.stroke ?? "#000"}
                strokeWidth={obj.style?.strokeWidth ?? 0.05}
              />
            )}
        </g>
      );

    case "angle":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          {/* Angle — full arc/ray implementation in dedicated SVG component */}
          <line
            x1={obj.vertex[0]}
            y1={obj.vertex[1]}
            x2={obj.ray1End[0]}
            y2={obj.ray1End[1]}
            stroke={obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.05}
          />
          <line
            x1={obj.vertex[0]}
            y1={obj.vertex[1]}
            x2={obj.ray2End[0]}
            y2={obj.ray2End[1]}
            stroke={obj.style?.stroke ?? "#000"}
            strokeWidth={obj.style?.strokeWidth ?? 0.05}
          />
        </g>
      );

    case "annotation":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          {...interactionHandlers}
        >
          <Annotation
            position={obj.position}
            latex={obj.latex}
            anchor={obj.anchor}
            style={{ ...obj.style, fontSize: obj.style?.fontSize ?? 0.7 }}
            opacity={obj.opacity}
          />
        </g>
      );

    case "group":
      return (
        <g
          data-scene-id={obj.id}
          style={{
            opacity: obj.opacity,
            display: obj.visible === false ? "none" : undefined,
          }}
          transform={buildGroupTransform(obj.transform)}
          {...interactionHandlers}
        >
          {obj.children.map((child) => (
            <SceneObjectRenderer
              key={child.id}
              obj={child}
              viewBox={viewBox}
              interactions={interactions}
              onInteraction={onInteraction}
            />
          ))}
        </g>
      );
  }
}

/**
 * Build an SVG transform string from a GroupObject's transform spec.
 */
function buildGroupTransform(
  transform?: {
    translate?: [number, number];
    rotate?: number;
    scale?: number | [number, number];
  },
): string | undefined {
  if (!transform) return undefined;
  const parts: string[] = [];
  if (transform.translate) {
    parts.push(`translate(${transform.translate[0]}, ${transform.translate[1]})`);
  }
  if (transform.rotate !== undefined) {
    parts.push(`rotate(${transform.rotate})`);
  }
  if (transform.scale !== undefined) {
    if (Array.isArray(transform.scale)) {
      parts.push(`scale(${transform.scale[0]}, ${transform.scale[1]})`);
    } else {
      parts.push(`scale(${transform.scale})`);
    }
  }
  return parts.length > 0 ? parts.join(" ") : undefined;
}

// ============================================================
// MathScene Component
// ============================================================

/**
 * T036 - MathScene
 *
 * Root component that interprets a SceneDefinition JSON and renders
 * an interactive, animated SVG math visualization. Acts as the single
 * entry point for the Animation DSL.
 *
 * - Renders all scene objects as SVG elements via SceneObjectRenderer
 * - Runs auto-triggered animation sequences on mount
 * - Supports drag, click, and hover interactions
 * - Exposes an imperative handle for AI tutor scene commands
 */
const MathScene = forwardRef<MathSceneHandle, MathSceneProps>(
  function MathScene({ scene, className, onInteraction, onAnimationComplete }, ref) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const sequencer = useSequencer(svgRef);
    const sequencesMapRef = useRef<Map<string, AnimationSequence>>(new Map());

    // Index animation sequences by id for lookup
    const sequencesMap = useMemo(() => {
      const map = new Map<string, AnimationSequence>();
      for (const seq of scene.animations) {
        if (seq.id) {
          map.set(seq.id, seq);
        }
      }
      return map;
    }, [scene.animations]);

    // Keep the ref in sync
    sequencesMapRef.current = sequencesMap;

    // Play a sequence by ID and notify on completion
    const playSequenceById = useCallback(
      async (sequenceId: string) => {
        const seq = sequencesMapRef.current.get(sequenceId);
        if (!seq) return;
        await sequencer.play(seq);
        onAnimationComplete?.(sequenceId);
      },
      [sequencer, onAnimationComplete],
    );

    // Run auto-triggered sequences on mount
    useEffect(() => {
      const autoSequences = scene.animations.filter(
        (seq) => seq.trigger === "auto",
      );
      if (autoSequences.length === 0) return;

      let cancelled = false;

      async function runAutoSequences() {
        for (const seq of autoSequences) {
          if (cancelled) break;
          await sequencer.play(seq);
          if (seq.id) {
            onAnimationComplete?.(seq.id);
          }
        }
      }

      void runAutoSequences();

      return () => {
        cancelled = true;
        sequencer.pause();
      };
      // We intentionally only run this on mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Imperative handle for external control
    useImperativeHandle(
      ref,
      () => ({
        executeCommand(cmd: SceneCommand) {
          switch (cmd.action) {
            case "animate":
              void sequencer.play(cmd.sequence).then(() => {
                if (cmd.sequence.id) {
                  onAnimationComplete?.(cmd.sequence.id);
                }
              });
              break;
            case "reset":
              sequencer.reset();
              break;
            case "create":
            case "modify":
            case "remove":
            case "clear":
              // These commands require scene state management (T037+)
              // and will be connected when the scene state store is built
              break;
          }
        },
        play(sequenceId: string) {
          void playSequenceById(sequenceId);
        },
        reset() {
          sequencer.reset();
        },
      }),
      [sequencer, onAnimationComplete, playSequenceById],
    );

    const [vx, vy, vw, vh] = scene.viewBox;

    return (
      <div
        className={cn("math-scene-container", className)}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          aspectRatio: `${vw} / ${vh}`,
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`${vx} ${vy} ${vw} ${vh}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={`Math scene: ${scene.id}`}
          style={{
            width: "100%",
            height: "100%",
            overflow: "visible",
            background: scene.background ?? "transparent",
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* SVG Defs for reusable markers */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
            </marker>
          </defs>

          {/* Render all scene objects */}
          {scene.objects.map((obj) => (
            <SceneObjectRenderer
              key={obj.id}
              obj={obj}
              viewBox={scene.viewBox}
              interactions={scene.interactions}
              onInteraction={onInteraction}
            />
          ))}
        </svg>
      </div>
    );
  },
);

MathScene.displayName = "MathScene";

export default MathScene;
