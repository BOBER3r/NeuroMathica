"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { usePinch } from "@use-gesture/react";
import type { NumberLineObject } from "@/components/math-scene/animation/types";

interface NumberLineProps extends Omit<NumberLineObject, "type" | "id"> {
  /** Vertical center position in scene coordinates. */
  y?: number;
  className?: string;
}

/**
 * T029 - NumberLine
 * Horizontal number line with range, step markers, optional highlight range
 * (colored rectangle behind), and interactive zoom via pinch gesture.
 */
export default function NumberLine({
  range,
  step,
  markers,
  highlightRange,
  y = 0,
  style,
  opacity = 1,
  className,
}: NumberLineProps) {
  const [visibleRange, setVisibleRange] = useState<[number, number]>(range);
  const groupRef = useRef<SVGGElement>(null);

  const [rangeMin, rangeMax] = visibleRange;
  const lineLength = rangeMax - rangeMin;

  const strokeColor = style?.stroke ?? "#1a202c";
  const strokeWidth = style?.strokeWidth ?? 0.05;
  const fontSize = style?.fontSize ?? 0.35;
  const tickHeight = fontSize * 0.8;

  // Pinch-to-zoom gesture
  usePinch(
    ({ offset: [scale] }) => {
      const center = (range[0] + range[1]) / 2;
      const halfSpan = ((range[1] - range[0]) / 2) / scale;
      setVisibleRange([center - halfSpan, center + halfSpan]);
    },
    {
      target: groupRef,
      scaleBounds: { min: 0.25, max: 4 },
      from: [1, 0],
    },
  );

  // Generate step positions
  const stepPositions: number[] = [];
  const firstStep = Math.ceil(rangeMin / step) * step;
  for (let v = firstStep; v <= rangeMax; v += step) {
    stepPositions.push(v);
  }

  const renderMarker = useCallback(
    (marker: NonNullable<NumberLineObject["markers"]>[number]) => {
      const { value, label, color = "#e53e3e", style: markerStyle = "dot" } = marker;
      if (value < rangeMin || value > rangeMax) return null;

      const r = fontSize * 0.35;

      return (
        <g key={`marker-${value}`} aria-label={label ?? `Marker at ${value}`}>
          {markerStyle === "dot" && (
            <motion.circle
              cx={value}
              cy={y}
              r={r}
              fill={color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
            />
          )}
          {markerStyle === "open" && (
            <motion.circle
              cx={value}
              cy={y}
              r={r}
              fill="white"
              stroke={color}
              strokeWidth={strokeWidth}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
            />
          )}
          {markerStyle === "arrow-right" && (
            <motion.polygon
              points={`${value - r},${y - r} ${value + r},${y} ${value - r},${y + r}`}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          {markerStyle === "arrow-left" && (
            <motion.polygon
              points={`${value + r},${y - r} ${value - r},${y} ${value + r},${y + r}`}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          {label && (
            <text
              x={value}
              y={y - tickHeight - fontSize * 0.5}
              textAnchor="middle"
              fill={color}
              fontSize={fontSize * 0.9}
            >
              {label}
            </text>
          )}
        </g>
      );
    },
    [rangeMin, rangeMax, y, fontSize, strokeWidth, tickHeight],
  );

  return (
    <g
      ref={groupRef}
      className={className}
      aria-label={`Number line from ${rangeMin} to ${rangeMax}`}
      opacity={opacity}
      style={{ touchAction: "none" }}
    >
      {/* Highlight range rectangle */}
      {highlightRange && (
        <motion.rect
          x={Math.max(highlightRange.from, rangeMin)}
          y={y - tickHeight * 0.6}
          width={
            Math.min(highlightRange.to, rangeMax) -
            Math.max(highlightRange.from, rangeMin)
          }
          height={tickHeight * 1.2}
          fill={highlightRange.color}
          opacity={0.25}
          rx={tickHeight * 0.1}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}

      {/* Main line */}
      <motion.line
        x1={rangeMin}
        y1={y}
        x2={rangeMax}
        y2={y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Arrow tips */}
      <line
        x1={rangeMin}
        y1={y}
        x2={rangeMin + lineLength * 0.015}
        y2={y - tickHeight * 0.4}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <line
        x1={rangeMin}
        y1={y}
        x2={rangeMin + lineLength * 0.015}
        y2={y + tickHeight * 0.4}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <line
        x1={rangeMax}
        y1={y}
        x2={rangeMax - lineLength * 0.015}
        y2={y - tickHeight * 0.4}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <line
        x1={rangeMax}
        y1={y}
        x2={rangeMax - lineLength * 0.015}
        y2={y + tickHeight * 0.4}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      {/* Step ticks and labels */}
      {stepPositions.map((v) => (
        <g key={`step-${v}`}>
          <line
            x1={v}
            y1={y - tickHeight * 0.5}
            x2={v}
            y2={y + tickHeight * 0.5}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.7}
          />
          <text
            x={v}
            y={y + tickHeight * 0.5 + fontSize}
            textAnchor="middle"
            dominantBaseline="hanging"
            fill={strokeColor}
            fontSize={fontSize}
          >
            {Math.round(v * 1000) / 1000}
          </text>
        </g>
      ))}

      {/* Markers */}
      {markers?.map(renderMarker)}
    </g>
  );
}
