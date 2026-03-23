"use client";

import { motion } from "framer-motion";
import type { AxesObject } from "@/components/math-scene/animation/types";

interface AxesProps extends Omit<AxesObject, "type" | "id"> {
  /** The SVG viewBox as [x, y, width, height]. */
  viewBox: [number, number, number, number];
  className?: string;
}

/**
 * T028 - Axes
 * Renders X and Y axes with optional labels, tick marks at tickStep
 * intervals, and optional arrowheads.
 */
export default function Axes({
  labels,
  tickStep,
  arrowHeads = true,
  viewBox,
  style,
  opacity = 1,
  className,
}: AxesProps) {
  const [vx, vy, vw, vh] = viewBox;
  const minX = vx;
  const maxX = vx + vw;
  const minY = vy;
  const maxY = vy + vh;

  const strokeColor = style?.stroke ?? "#1a202c";
  const strokeWidth = style?.strokeWidth ?? 0.05;
  const fontSize = style?.fontSize ?? 0.35;
  const arrowSize = strokeWidth * 5;

  // Generate tick positions
  const xTicks: number[] = [];
  const yTicks: number[] = [];

  if (tickStep) {
    const xStart = Math.ceil(minX / tickStep.x) * tickStep.x;
    for (let x = xStart; x <= maxX; x += tickStep.x) {
      if (Math.abs(x) > tickStep.x * 0.01) {
        xTicks.push(x);
      }
    }

    const yStart = Math.ceil(minY / tickStep.y) * tickStep.y;
    for (let y = yStart; y <= maxY; y += tickStep.y) {
      if (Math.abs(y) > tickStep.y * 0.01) {
        yTicks.push(y);
      }
    }
  }

  const tickSize = fontSize * 0.4;
  const markerId = `axes-arrow-${String(minX)}-${String(minY)}`;

  return (
    <g
      className={className}
      aria-label="Coordinate axes"
      opacity={opacity}
    >
      {/* Arrow marker definition */}
      {arrowHeads && (
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth={arrowSize * 40}
            markerHeight={arrowSize * 40}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill={strokeColor} />
          </marker>
        </defs>
      )}

      {/* X axis */}
      <motion.line
        x1={minX}
        y1={0}
        x2={maxX}
        y2={0}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        markerEnd={arrowHeads ? `url(#${markerId})` : undefined}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Y axis */}
      <motion.line
        x1={0}
        y1={minY}
        x2={0}
        y2={maxY}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        markerEnd={arrowHeads ? `url(#${markerId})` : undefined}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* X-axis ticks and labels */}
      {xTicks.map((x) => (
        <g key={`xtick-${x}`}>
          <line
            x1={x}
            y1={-tickSize}
            x2={x}
            y2={tickSize}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.7}
          />
          <text
            x={x}
            y={tickSize + fontSize}
            textAnchor="middle"
            dominantBaseline="hanging"
            fill={strokeColor}
            fontSize={fontSize}
          >
            {Math.round(x * 100) / 100}
          </text>
        </g>
      ))}

      {/* Y-axis ticks and labels */}
      {yTicks.map((y) => (
        <g key={`ytick-${y}`}>
          <line
            x1={-tickSize}
            y1={y}
            x2={tickSize}
            y2={y}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.7}
          />
          <text
            x={-(tickSize + fontSize * 0.3)}
            y={y}
            textAnchor="end"
            dominantBaseline="central"
            fill={strokeColor}
            fontSize={fontSize}
          >
            {Math.round(y * 100) / 100}
          </text>
        </g>
      ))}

      {/* Axis labels */}
      {labels?.x && (
        <text
          x={maxX - fontSize}
          y={fontSize * 1.5}
          textAnchor="end"
          fill={strokeColor}
          fontSize={fontSize * 1.2}
          fontStyle="italic"
          aria-label={`X axis: ${labels.x}`}
        >
          {labels.x}
        </text>
      )}
      {labels?.y && (
        <text
          x={fontSize * 0.5}
          y={maxY - fontSize * 0.3}
          textAnchor="start"
          fill={strokeColor}
          fontSize={fontSize * 1.2}
          fontStyle="italic"
          aria-label={`Y axis: ${labels.y}`}
        >
          {labels.y}
        </text>
      )}
    </g>
  );
}
