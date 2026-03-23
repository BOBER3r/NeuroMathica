"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { AngleObject } from "@/components/math-scene/animation/types";
import Annotation from "./Annotation";

interface AngleProps extends Omit<AngleObject, "type" | "id"> {
  className?: string;
}

/**
 * Compute the angle in radians from the vertex to a point,
 * measured counter-clockwise from the positive x-axis.
 */
function angleRad(vertex: [number, number], point: [number, number]): number {
  return Math.atan2(point[1] - vertex[1], point[0] - vertex[0]);
}

/**
 * Normalize an angle to [0, 2*PI).
 */
function normalizeAngle(angle: number): number {
  return ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

/**
 * Build an SVG arc path between two angles at given radius from vertex.
 */
function buildArcPath(
  vertex: [number, number],
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const [vx, vy] = vertex;

  // Normalize both angles
  const a1 = normalizeAngle(startAngle);
  let a2 = normalizeAngle(endAngle);

  // Ensure we sweep the smaller arc (interior angle)
  let sweep = a2 - a1;
  if (sweep < 0) sweep += 2 * Math.PI;
  if (sweep > Math.PI) {
    // Swap direction for the smaller arc
    sweep = 2 * Math.PI - sweep;
    const startX = vx + radius * Math.cos(a2);
    const startY = vy + radius * Math.sin(a2);
    const endX = vx + radius * Math.cos(a1);
    const endY = vy + radius * Math.sin(a1);
    const largeArc = sweep > Math.PI ? 1 : 0;
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
  }

  const startX = vx + radius * Math.cos(a1);
  const startY = vy + radius * Math.sin(a1);
  const endX = vx + radius * Math.cos(a2);
  const endY = vy + radius * Math.sin(a2);
  const largeArc = sweep > Math.PI ? 1 : 0;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
}

/**
 * T035 - Angle
 * Renders two rays from vertex, with an optional arc and angle measurement.
 */
export default function Angle({
  vertex,
  ray1End,
  ray2End,
  showArc = false,
  showMeasurement = false,
  arcRadius = 0.5,
  style,
  opacity = 1,
  className,
}: AngleProps) {
  const strokeColor = style?.stroke ?? "#805ad5";
  const strokeWidth = style?.strokeWidth ?? 0.05;
  const fillColor = style?.fill ?? "rgba(128, 90, 213, 0.15)";

  // Compute angles
  const angle1 = angleRad(vertex, ray1End);
  const angle2 = angleRad(vertex, ray2End);

  // Compute the interior angle in degrees
  const angleDeg = useMemo(() => {
    const a1 = normalizeAngle(angle1);
    const a2 = normalizeAngle(angle2);
    let diff = Math.abs(a2 - a1);
    if (diff > Math.PI) diff = 2 * Math.PI - diff;
    return (diff * 180) / Math.PI;
  }, [angle1, angle2]);

  // Arc path
  const arcPath = useMemo(
    () => buildArcPath(vertex, arcRadius, angle1, angle2),
    [vertex, arcRadius, angle1, angle2],
  );

  // Midpoint of arc for measurement label
  const midAngle = useMemo(() => {
    const a1 = normalizeAngle(angle1);
    let a2 = normalizeAngle(angle2);
    let sweep = a2 - a1;
    if (sweep < 0) sweep += 2 * Math.PI;
    if (sweep > Math.PI) {
      // Smaller arc goes the other way
      return a1 - (2 * Math.PI - sweep) / 2;
    }
    return a1 + sweep / 2;
  }, [angle1, angle2]);

  const measurementPos: [number, number] = [
    vertex[0] + (arcRadius + 0.4) * Math.cos(midAngle),
    vertex[1] + (arcRadius + 0.4) * Math.sin(midAngle),
  ];

  return (
    <g
      className={className}
      aria-label={`Angle of ${Math.round(angleDeg)} degrees at vertex (${vertex[0]}, ${vertex[1]})`}
      opacity={opacity}
    >
      {/* Ray 1 */}
      <motion.line
        x1={vertex[0]}
        y1={vertex[1]}
        x2={ray1End[0]}
        y2={ray1End[1]}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Ray 2 */}
      <motion.line
        x1={vertex[0]}
        y1={vertex[1]}
        x2={ray2End[0]}
        y2={ray2End[1]}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Arc */}
      {showArc && (
        <motion.path
          d={arcPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.7}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        />
      )}

      {/* Filled arc wedge for visual clarity */}
      {showArc && (
        <path
          d={`${arcPath} L ${vertex[0]} ${vertex[1]} Z`}
          fill={fillColor}
          opacity={0.5}
        />
      )}

      {/* Vertex dot */}
      <motion.circle
        cx={vertex[0]}
        cy={vertex[1]}
        r={strokeWidth * 1.5}
        fill={strokeColor}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, delay: 0.4 }}
      />

      {/* Measurement label */}
      {showMeasurement && (
        <Annotation
          position={measurementPos}
          latex={`${Math.round(angleDeg * 10) / 10}^\\circ`}
          anchor="center"
          background
          style={{ fontSize: 0.3 }}
        />
      )}
    </g>
  );
}
