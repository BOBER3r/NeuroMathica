"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import type { GeometricShapeObject } from "@/components/math-scene/animation/types";
import { distance } from "@/lib/math/geometry";

interface GeometricShapeProps extends Omit<GeometricShapeObject, "type" | "id"> {
  /** Called when a draggable vertex is moved. */
  onChange?: (vertices: [number, number][]) => void;
  className?: string;
}

/**
 * Compute vertices for a regular polygon given center, radius, and number of sides.
 */
function computeRegularPolygon(
  center: [number, number],
  radius: number,
  sides: number,
): [number, number][] {
  const [cx, cy] = center;
  const verts: [number, number][] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
    verts.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }
  return verts;
}

/**
 * Compute vertices for a rectangle from center + width/height.
 */
function computeRectangleVertices(
  center: [number, number],
  w: number,
  h: number,
): [number, number][] {
  const [cx, cy] = center;
  const hw = w / 2;
  const hh = h / 2;
  return [
    [cx - hw, cy - hh],
    [cx + hw, cy - hh],
    [cx + hw, cy + hh],
    [cx - hw, cy + hh],
  ];
}

/**
 * Format a number for measurement display.
 */
function formatMeasurement(n: number): string {
  return n % 1 === 0 ? String(n) : n.toFixed(2);
}

/**
 * Compute angle at vertex B in triangle A-B-C, in degrees.
 */
function angleDeg(
  a: [number, number],
  b: [number, number],
  c: [number, number],
): number {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [cx, cy] = c;
  const ba = [ax - bx, ay - by] as const;
  const bc = [cx - bx, cy - by] as const;
  const dot = ba[0] * bc[0] + ba[1] * bc[1];
  const magBA = Math.sqrt(ba[0] ** 2 + ba[1] ** 2);
  const magBC = Math.sqrt(bc[0] ** 2 + bc[1] ** 2);
  if (magBA === 0 || magBC === 0) return 0;
  const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
  return (Math.acos(cosAngle) * 180) / Math.PI;
}

/**
 * DraggableVertex - sub-component for individual draggable vertices.
 */
function DraggableVertex({
  pos,
  index,
  onMove,
}: {
  pos: [number, number];
  index: number;
  onMove: (index: number, newPos: [number, number]) => void;
}) {
  const bind = useDrag(
    ({ offset: [ox, oy] }) => {
      onMove(index, [ox, oy]);
    },
    {
      from: () => [pos[0], pos[1]],
    },
  );

  return (
    <circle
      {...bind()}
      cx={pos[0]}
      cy={pos[1]}
      r={0.15}
      fill="#e53e3e"
      stroke="#c53030"
      strokeWidth={0.03}
      cursor="grab"
      style={{ touchAction: "none" }}
      aria-label={`Draggable vertex ${index + 1}`}
      role="slider"
    />
  );
}

/**
 * T031 - GeometricShape
 * Supports triangle, rectangle, circle, polygon, and regularPolygon.
 * Shows measurements if showMeasurements is true.
 * Draggable vertices if draggableVertices is true.
 */
export default function GeometricShape({
  shape,
  vertices: initialVertices,
  center,
  radius,
  sides,
  width: shapeWidth,
  height: shapeHeight,
  showMeasurements = false,
  draggableVertices = false,
  style,
  opacity = 1,
  onChange,
  className,
}: GeometricShapeProps) {
  const fillColor = style?.fill ?? "#bee3f8";
  const strokeColor = style?.stroke ?? "#2b6cb0";
  const strokeWidth = style?.strokeWidth ?? 0.05;
  const fontSize = style?.fontSize ?? 0.3;

  // Resolve vertices from shape definition
  const resolvedInitial = useMemo((): [number, number][] => {
    switch (shape) {
      case "triangle":
      case "polygon":
        return initialVertices ?? [];
      case "rectangle":
        if (initialVertices && initialVertices.length === 4) return initialVertices;
        if (center && shapeWidth !== undefined && shapeHeight !== undefined) {
          return computeRectangleVertices(center, shapeWidth, shapeHeight);
        }
        return [];
      case "regularPolygon":
        if (center && radius !== undefined && sides !== undefined) {
          return computeRegularPolygon(center, radius, sides);
        }
        return [];
      case "circle":
        return []; // Circle does not use vertices
      default:
        return [];
    }
  }, [shape, initialVertices, center, radius, sides, shapeWidth, shapeHeight]);

  const [verts, setVerts] = useState<[number, number][]>(resolvedInitial);

  const handleVertexMove = useCallback(
    (index: number, newPos: [number, number]) => {
      setVerts((prev) => {
        const next = [...prev] as [number, number][];
        next[index] = newPos;
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  // Build polygon points string
  const pointsStr = verts.map(([x, y]) => `${x},${y}`).join(" ");

  // Render circle
  if (shape === "circle") {
    const [cx, cy] = center ?? [0, 0];
    const r = radius ?? 1;

    return (
      <g
        className={className}
        aria-label={`Circle with radius ${r}`}
        opacity={opacity}
      >
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          initial={{ r: 0 }}
          animate={{ r }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {showMeasurements && (
          <>
            {/* Radius line */}
            <line
              x1={cx}
              y1={cy}
              x2={cx + r}
              y2={cy}
              stroke={strokeColor}
              strokeWidth={strokeWidth * 0.6}
              strokeDasharray={`${strokeWidth * 3} ${strokeWidth * 2}`}
            />
            <text
              x={cx + r / 2}
              y={cy - fontSize * 0.5}
              textAnchor="middle"
              fill={strokeColor}
              fontSize={fontSize}
            >
              r = {formatMeasurement(r)}
            </text>
          </>
        )}
      </g>
    );
  }

  // Render polygon-based shapes
  if (verts.length < 3) return null;

  // Compute measurements
  const sideLengths: number[] = verts.map((v, i) => {
    const next = verts[(i + 1) % verts.length];
    if (!next) return 0;
    return distance(v[0], v[1], next[0], next[1]);
  });

  const angles: number[] = verts.map((v, i) => {
    const prev = verts[(i - 1 + verts.length) % verts.length];
    const next = verts[(i + 1) % verts.length];
    if (!prev || !next) return 0;
    return angleDeg(prev, v, next);
  });

  return (
    <g className={className} opacity={opacity} aria-label={`${shape} shape`}>
      {/* Main shape polygon */}
      <motion.polygon
        points={pointsStr}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Measurements */}
      {showMeasurements && (
        <g aria-label="Measurements">
          {/* Side lengths */}
          {verts.map((v, i) => {
            const next = verts[(i + 1) % verts.length];
            if (!next) return null;
            const mx = (v[0] + next[0]) / 2;
            const my = (v[1] + next[1]) / 2;
            const len = sideLengths[i];
            if (len === undefined) return null;

            // Offset label perpendicular to the side
            const dx = next[0] - v[0];
            const dy = next[1] - v[1];
            const mag = Math.sqrt(dx * dx + dy * dy);
            const nx = mag > 0 ? -dy / mag : 0;
            const ny = mag > 0 ? dx / mag : 0;
            const offset = fontSize * 0.8;

            return (
              <text
                key={`side-${i}`}
                x={mx + nx * offset}
                y={my + ny * offset}
                textAnchor="middle"
                dominantBaseline="central"
                fill={strokeColor}
                fontSize={fontSize}
              >
                {formatMeasurement(len)}
              </text>
            );
          })}

          {/* Angles */}
          {verts.map((v, i) => {
            const deg = angles[i];
            if (deg === undefined) return null;
            // Place angle label slightly inside the vertex
            const centroid = verts.reduce(
              (acc, [x, y]) => [acc[0] + x / verts.length, acc[1] + y / verts.length],
              [0, 0] as [number, number],
            );
            const dx = centroid[0] - v[0];
            const dy = centroid[1] - v[1];
            const mag = Math.sqrt(dx * dx + dy * dy);
            const labelOffset = fontSize * 2;
            const lx = v[0] + (mag > 0 ? (dx / mag) * labelOffset : 0);
            const ly = v[1] + (mag > 0 ? (dy / mag) * labelOffset : 0);

            return (
              <text
                key={`angle-${i}`}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#805ad5"
                fontSize={fontSize * 0.85}
              >
                {formatMeasurement(deg)}°
              </text>
            );
          })}
        </g>
      )}

      {/* Draggable vertices */}
      {draggableVertices &&
        verts.map((v, i) => (
          <DraggableVertex
            key={`drag-${i}`}
            pos={v}
            index={i}
            onMove={handleVertexMove}
          />
        ))}
    </g>
  );
}
