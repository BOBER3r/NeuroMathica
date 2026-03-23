"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { VectorObject } from "@/components/math-scene/animation/types";

interface VectorProps extends Omit<VectorObject, "type" | "id"> {
  className?: string;
}

/**
 * T035 - Vector
 * Renders an arrow from `from` to `to` with an SVG marker arrowhead.
 * Optional color and label (positioned at midpoint).
 */
export default function Vector({
  from,
  to,
  color = "#2b6cb0",
  label,
  style,
  opacity = 1,
  className,
}: VectorProps) {
  const strokeWidth = style?.strokeWidth ?? 0.06;
  const fontSize = style?.fontSize ?? 0.35;
  const strokeColor = style?.stroke ?? color;

  // Unique marker ID based on coords to avoid conflicts
  const markerId = useMemo(
    () => `vector-arrow-${from[0]}-${from[1]}-${to[0]}-${to[1]}`.replace(/[.-]/g, "_"),
    [from, to],
  );

  // Midpoint for label
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;

  // Perpendicular offset for label placement
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const mag = Math.sqrt(dx * dx + dy * dy);
  const nx = mag > 0 ? -dy / mag : 0;
  const ny = mag > 0 ? dx / mag : 0;
  const labelOffset = fontSize * 1.2;

  return (
    <g
      className={className}
      aria-label={`Vector from (${from[0]}, ${from[1]}) to (${to[0]}, ${to[1]})${label ? `: ${label}` : ""}`}
      opacity={opacity}
    >
      {/* Arrowhead marker definition */}
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth={strokeWidth * 60}
          markerHeight={strokeWidth * 60}
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 Z" fill={strokeColor} />
        </marker>
      </defs>

      {/* Vector line with arrowhead */}
      <motion.line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Optional label at midpoint */}
      {label && (
        <motion.text
          x={mx + nx * labelOffset}
          y={my + ny * labelOffset}
          textAnchor="middle"
          dominantBaseline="central"
          fill={strokeColor}
          fontSize={fontSize}
          fontStyle="italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  );
}
