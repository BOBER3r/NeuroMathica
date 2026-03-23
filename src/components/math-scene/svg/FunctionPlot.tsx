"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { line, curveMonotoneX } from "d3-shape";
import { evaluateExpression } from "@/lib/math/algebra";
import type { FunctionPlotObject } from "@/components/math-scene/animation/types";

interface FunctionPlotProps extends Omit<FunctionPlotObject, "type" | "id"> {
  className?: string;
}

/**
 * T032 - FunctionPlot
 * Samples the function across the domain, converts to SVG path using
 * d3-shape line generator with curveMonotoneX. Handles discontinuities
 * (NaN/Infinity) by breaking the path into segments.
 */
export default function FunctionPlot({
  fn,
  domain = [-10, 10],
  color = "#e53e3e",
  thickness = 0.06,
  samples = 200,
  style,
  opacity = 1,
  className,
}: FunctionPlotProps) {
  const strokeColor = style?.stroke ?? color;

  // Sample the function and build path segments
  const pathSegments = useMemo(() => {
    const [xMin, xMax] = domain;
    const dx = (xMax - xMin) / samples;

    // Sample all points
    const points: Array<{ x: number; y: number; valid: boolean }> = [];
    for (let i = 0; i <= samples; i++) {
      const x = xMin + i * dx;
      let y: number;
      let valid = true;

      try {
        y = evaluateExpression(fn, { x });
        if (!Number.isFinite(y)) {
          valid = false;
          y = 0;
        }
      } catch {
        valid = false;
        y = 0;
      }

      points.push({ x, y, valid });
    }

    // Break into continuous segments at discontinuities
    const segments: [number, number][][] = [];
    let currentSegment: [number, number][] = [];

    for (const point of points) {
      if (point.valid) {
        currentSegment.push([point.x, point.y]);
      } else {
        if (currentSegment.length > 0) {
          segments.push(currentSegment);
          currentSegment = [];
        }
      }
    }
    if (currentSegment.length > 0) {
      segments.push(currentSegment);
    }

    // Generate SVG path strings using d3 line generator
    const lineGenerator = line<[number, number]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curveMonotoneX);

    return segments
      .map((seg) => lineGenerator(seg))
      .filter((d): d is string => d !== null);
  }, [fn, domain, samples]);

  return (
    <g
      className={className}
      aria-label={`Function plot: ${fn}`}
      opacity={opacity}
    >
      {pathSegments.map((d, i) => (
        <motion.path
          key={`segment-${i}`}
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: i * 0.1 }}
        />
      ))}
    </g>
  );
}
