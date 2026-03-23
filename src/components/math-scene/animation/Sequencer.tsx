"use client";

import { useCallback, useRef, useState } from "react";
import { animate } from "framer-motion";
import type {
  AnimationSequence,
  AnimationStep,
  BaseStep,
  CameraMoveStep,
  FadeInStep,
  HighlightStep,
  MoveToStep,
  TransformStep,
} from "@/components/math-scene/animation/types";
import { toFramerEasing } from "@/components/math-scene/animation/easing";
import type { EasingName } from "@/components/math-scene/animation/easing";

/**
 * Build a Framer Motion transition object from a BaseStep.
 */
function buildTransition(step: BaseStep): {
  duration: number;
  delay: number;
  ease: readonly [number, number, number, number] | "anticipate";
} {
  const easeName: EasingName = step.ease ?? "easeInOut";
  const easeValue = toFramerEasing(easeName);
  return {
    duration: step.duration,
    delay: step.delay ?? 0,
    ease: easeValue,
  };
}

/**
 * Resolve a target element inside the SVG by its scene ID.
 */
function resolveTarget(
  sceneRef: React.RefObject<SVGSVGElement | null>,
  targetId: string,
): SVGElement | HTMLElement | null {
  const root = sceneRef.current;
  if (!root) return null;
  return root.querySelector<SVGElement | HTMLElement>(
    `[data-scene-id="${targetId}"]`,
  );
}

/**
 * Compute initial transform offsets for fadeIn directions.
 */
function fadeInInitialValues(from?: FadeInStep["from"]): Record<string, number> {
  switch (from) {
    case "left":
      return { x: -30 };
    case "right":
      return { x: 30 };
    case "top":
      return { y: -30 };
    case "bottom":
      return { y: 30 };
    case "scale":
      return { scale: 0 };
    default:
      return {};
  }
}

/**
 * Compute final transform targets for fadeIn directions.
 */
function fadeInFinalValues(from?: FadeInStep["from"]): Record<string, number> {
  switch (from) {
    case "left":
    case "right":
      return { x: 0 };
    case "top":
    case "bottom":
      return { y: 0 };
    case "scale":
      return { scale: 1 };
    default:
      return {};
  }
}

/**
 * Execute a single animation step against the SVG scene.
 * Returns a Promise that resolves when the animation completes.
 */
async function executeStep(
  sceneRef: React.RefObject<SVGSVGElement | null>,
  step: AnimationStep,
  abortSignal: AbortSignal,
): Promise<void> {
  if (abortSignal.aborted) return;

  switch (step.action) {
    case "wait": {
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, step.duration * 1000);
        const onAbort = () => {
          clearTimeout(timer);
          reject(new DOMException("Aborted", "AbortError"));
        };
        abortSignal.addEventListener("abort", onAbort, { once: true });
      });
      return;
    }

    case "parallel": {
      await Promise.all(
        step.steps.map((subStep) =>
          executeStep(sceneRef, subStep, abortSignal),
        ),
      );
      return;
    }

    case "fadeIn": {
      const el = step.target ? resolveTarget(sceneRef, step.target) : null;
      if (!el) return;
      const transition = buildTransition(step);
      const initialTransform = fadeInInitialValues(step.from);
      const finalTransform = fadeInFinalValues(step.from);

      // Set initial state
      el.style.opacity = "0";
      for (const [key, val] of Object.entries(initialTransform)) {
        el.style.setProperty(key, String(val));
      }

      const targets: Record<string, number> = { opacity: 1, ...finalTransform };
      await animate(el, targets, transition);
      return;
    }

    case "fadeOut": {
      const el = step.target ? resolveTarget(sceneRef, step.target) : null;
      if (!el) return;
      const transition = buildTransition(step);
      await animate(el, { opacity: 0 }, transition);
      return;
    }

    case "draw": {
      const el = step.target ? resolveTarget(sceneRef, step.target) : null;
      if (!el) return;
      const transition = buildTransition(step);

      // Find all <path>, <line>, <polyline>, <polygon>, <circle>, <ellipse>
      // elements within the target (or the target itself)
      const pathElements = el.tagName === "path"
        ? [el as SVGGeometryElement]
        : Array.from(el.querySelectorAll<SVGGeometryElement>(
            "path, line, polyline, polygon, circle, ellipse",
          ));

      await Promise.all(
        pathElements.map((pathEl) => {
          if ("getTotalLength" in pathEl && typeof pathEl.getTotalLength === "function") {
            const length = pathEl.getTotalLength();
            pathEl.style.strokeDasharray = String(length);
            pathEl.style.strokeDashoffset = String(length);
            return animate(
              pathEl,
              { strokeDashoffset: "0" },
              transition,
            );
          }
          // Fallback: fade in if not a path-like element
          return animate(pathEl, { opacity: [0, 1] }, transition);
        }),
      );
      return;
    }

    case "transform": {
      const el = step.target ? resolveTarget(sceneRef, step.target) : null;
      if (!el) return;
      const transition = buildTransition(step);
      const typedStep = step as TransformStep;
      const props: Record<string, string | number> = {};
      for (const [key, value] of Object.entries(typedStep.properties)) {
        props[key] = value;
      }
      await animate(el, props, transition);
      return;
    }

    case "morphTo": {
      // MorphTo applies the targetState properties as CSS/SVG animations
      const el = step.target ? resolveTarget(sceneRef, step.target) : null;
      if (!el) return;
      const transition = buildTransition(step);
      const targetState = step.targetState;
      const morphProps: Record<string, string | number> = {};

      if (targetState.opacity !== undefined) {
        morphProps.opacity = targetState.opacity;
      }
      if (targetState.style) {
        if (targetState.style.fill) morphProps.fill = targetState.style.fill;
        if (targetState.style.stroke) morphProps.stroke = targetState.style.stroke;
        if (targetState.style.strokeWidth !== undefined) {
          morphProps.strokeWidth = targetState.style.strokeWidth;
        }
      }

      if (Object.keys(morphProps).length > 0) {
        await animate(el, morphProps, transition);
      }
      return;
    }

    case "moveTo": {
      const el = step.target ? resolveTarget(sceneRef, step.target) : null;
      if (!el) return;
      const transition = buildTransition(step);
      const typedStep = step as MoveToStep;
      const [targetX, targetY] = typedStep.position;
      await animate(
        el,
        { x: targetX, y: targetY },
        transition,
      );
      return;
    }

    case "highlight": {
      const el = step.target ? resolveTarget(sceneRef, step.target) : null;
      if (!el) return;
      const transition = buildTransition(step);
      const typedStep = step as HighlightStep;
      const highlightProps: Record<string, string | number | number[]> = {};

      if (typedStep.color) {
        highlightProps.fill = typedStep.color;
        highlightProps.stroke = typedStep.color;
      }

      if (typedStep.pulse) {
        // Pulse animation: scale up and back
        await animate(
          el,
          {
            ...highlightProps,
            scale: [1, 1.15, 1],
          },
          {
            duration: transition.duration,
            delay: transition.delay,
            ease: "easeInOut",
          },
        );
      } else if (Object.keys(highlightProps).length > 0) {
        await animate(el, highlightProps, transition);
      }
      return;
    }

    case "cameraMove": {
      const root = sceneRef.current;
      if (!root) return;
      const transition = buildTransition(step);
      const typedStep = step as CameraMoveStep;
      const [newX, newY, newW, newH] = typedStep.viewBox;

      // Animate viewBox by interpolating its components
      const currentViewBox = root.getAttribute("viewBox")?.split(" ").map(Number);
      const fromX = currentViewBox?.[0] ?? 0;
      const fromY = currentViewBox?.[1] ?? 0;
      const fromW = currentViewBox?.[2] ?? newW;
      const fromH = currentViewBox?.[3] ?? newH;

      await animate(0, 1, {
        duration: transition.duration,
        delay: transition.delay,
        ease: transition.ease,
        onUpdate: (progress: number) => {
          const vx = fromX + (newX - fromX) * progress;
          const vy = fromY + (newY - fromY) * progress;
          const vw = fromW + (newW - fromW) * progress;
          const vh = fromH + (newH - fromH) * progress;
          root.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
        },
      });
      return;
    }
  }
}

export interface SequencerControls {
  play: (sequence: AnimationSequence) => Promise<void>;
  pause: () => void;
  reset: () => void;
  isPlaying: boolean;
}

/**
 * T026 - useSequencer
 *
 * A hook that provides declarative animation timeline playback for
 * MathScene SVG elements. Processes AnimationSequence steps sequentially
 * (or in parallel for ParallelStep), animating DOM elements found via
 * `[data-scene-id]` attributes.
 */
export function useSequencer(
  sceneRef: React.RefObject<SVGSVGElement | null>,
): SequencerControls {
  const [isPlaying, setIsPlaying] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const initialViewBoxRef = useRef<string | null>(null);

  const play = useCallback(
    async (sequence: AnimationSequence): Promise<void> => {
      // Abort any in-progress playback
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Capture initial viewBox for reset
      if (sceneRef.current && !initialViewBoxRef.current) {
        initialViewBoxRef.current =
          sceneRef.current.getAttribute("viewBox") ?? null;
      }

      setIsPlaying(true);

      try {
        for (const step of sequence.steps) {
          if (controller.signal.aborted) break;
          await executeStep(sceneRef, step, controller.signal);
        }
      } catch (error: unknown) {
        // Ignore abort errors, rethrow everything else
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }
        throw error;
      } finally {
        if (abortControllerRef.current === controller) {
          setIsPlaying(false);
        }
      }
    },
    [sceneRef],
  );

  const pause = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    // Abort any running animation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsPlaying(false);

    const root = sceneRef.current;
    if (!root) return;

    // Restore initial viewBox
    if (initialViewBoxRef.current) {
      root.setAttribute("viewBox", initialViewBoxRef.current);
    }

    // Reset all scene elements to their default visual state
    const sceneElements = root.querySelectorAll<SVGElement | HTMLElement>(
      "[data-scene-id]",
    );
    sceneElements.forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.strokeDasharray = "";
      el.style.strokeDashoffset = "";
    });
  }, [sceneRef]);

  return { play, pause, reset, isPlaying };
}
