"use client";

import { motion } from "framer-motion";
import type { CoordinateGridObject } from "@/components/math-scene/animation/types";

interface CoordinateGridProps
  extends Pick<CoordinateGridObject, "step" | "majorStep" | "color" | "opacity" | "style"> {
  viewBox: [number, number, number, number];
  className?: string;
}

/**
 * T027 - CoordinateGrid
 * Renders grid lines within the SVG viewBox. Major-step lines are
 * slightly thicker and darker for visual hierarchy.
 */
export default function CoordinateGrid({
  step,
  majorStep,
  color = "#4a5568",
  opacity = 0.15,
  viewBox,
  className,
}: CoordinateGridProps) {
  const [vx, vy, vw, vh] = viewBox;
  const minX = vx;
  const maxX = vx + vw;
  const minY = vy;
  const maxY = vy + vh;

  const verticalLines: { x: number; isMajor: boolean }[] = [];
  const horizontalLines: { y: number; isMajor: boolean }[] = [];

  // Compute the first grid line at or after the minimum bound
  const startX = Math.ceil(minX / step) * step;
  for (let x = startX; x <= maxX; x += step) {
    const isMajor = majorStep !== undefined && majorStep > 0
      ? Math.abs(Math.round(x / majorStep) * majorStep - x) < step * 0.01
      : false;
    verticalLines.push({ x, isMajor });
  }

  const startY = Math.ceil(minY / step) * step;
  for (let y = startY; y <= maxY; y += step) {
    const isMajor = majorStep !== undefined && majorStep > 0
      ? Math.abs(Math.round(y / majorStep) * majorStep - y) < step * 0.01
      : false;
    horizontalLines.push({ y, isMajor });
  }

  return (
    <g
      className={className}
      aria-label="Coordinate grid"
      role="presentation"
    >
      {verticalLines.map(({ x, isMajor }) => (
        <motion.line
          key={`v-${x}`}
          x1={x}
          y1={minY}
          x2={x}
          y2={maxY}
          stroke={color}
          strokeWidth={isMajor ? 0.06 : 0.03}
          opacity={isMajor ? opacity * 2 : opacity}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMajor ? opacity * 2 : opacity }}
          transition={{ duration: 0.4 }}
        />
      ))}
      {horizontalLines.map(({ y, isMajor }) => (
        <motion.line
          key={`h-${y}`}
          x1={minX}
          y1={y}
          x2={maxX}
          y2={y}
          stroke={color}
          strokeWidth={isMajor ? 0.06 : 0.03}
          opacity={isMajor ? opacity * 2 : opacity}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMajor ? opacity * 2 : opacity }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </g>
  );
}
