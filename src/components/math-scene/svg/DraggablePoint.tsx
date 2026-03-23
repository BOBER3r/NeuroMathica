"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import katex from "katex";
import type { PointObject } from "@/components/math-scene/animation/types";

interface DraggablePointProps extends Omit<PointObject, "type" | "id"> {
  /** Called when the point is dragged to a new position. */
  onChange?: (pos: [number, number]) => void;
  className?: string;
}

/**
 * T033 - DraggablePoint
 * Renders a circle at position. If draggable, uses @use-gesture/react useDrag.
 * Supports snapToGrid and axis constraints (dragConstraint).
 * Visual focus indicator (ring) on hover/drag. Optional KaTeX label.
 */
export default function DraggablePoint({
  position,
  radius = 0.15,
  label,
  labelOffset = [0.3, -0.3],
  draggable = false,
  dragConstraint = "none",
  snapToGrid,
  style,
  opacity = 1,
  onChange,
  className,
}: DraggablePointProps) {
  const [pos, setPos] = useState<[number, number]>(position);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const groupRef = useRef<SVGGElement>(null);

  const fillColor = style?.fill ?? "#e53e3e";
  const strokeColor = style?.stroke ?? "#c53030";
  const strokeWidth = style?.strokeWidth ?? 0.02;

  const snapValue = useCallback(
    (val: number): number => {
      if (snapToGrid && snapToGrid > 0) {
        return Math.round(val / snapToGrid) * snapToGrid;
      }
      return val;
    },
    [snapToGrid],
  );

  const bind = useDrag(
    ({ offset: [ox, oy], first, last }) => {
      if (!draggable) return;

      if (first) setIsDragging(true);
      if (last) setIsDragging(false);

      let newX = ox;
      let newY = oy;

      // Apply axis constraints
      if (dragConstraint === "x") {
        newY = position[1];
      } else if (dragConstraint === "y") {
        newX = position[0];
      }

      // Apply grid snapping
      newX = snapValue(newX);
      newY = snapValue(newY);

      const newPos: [number, number] = [newX, newY];
      setPos(newPos);
      onChange?.(newPos);
    },
    {
      from: () => [pos[0], pos[1]],
      enabled: draggable,
    },
  );

  // Render KaTeX label as HTML string
  const labelHtml = useMemo(() => {
    if (!label) return null;
    try {
      return katex.renderToString(label, {
        throwOnError: false,
        displayMode: false,
      });
    } catch {
      return label;
    }
  }, [label]);

  const showFocusRing = isHovered || isDragging;

  return (
    <g
      ref={groupRef}
      className={className}
      aria-label={
        label
          ? `Point ${label} at (${pos[0]}, ${pos[1]})`
          : `Point at (${pos[0]}, ${pos[1]})`
      }
      role={draggable ? "slider" : undefined}
      opacity={opacity}
      style={draggable ? { touchAction: "none" } : undefined}
    >
      {/* Focus ring */}
      {showFocusRing && (
        <motion.circle
          cx={pos[0]}
          cy={pos[1]}
          r={radius * 2}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          opacity={0.35}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 0.15 }}
        />
      )}

      {/* Point circle */}
      <motion.circle
        {...(draggable ? (bind() as Record<string, unknown>) : {})}
        cx={pos[0]}
        cy={pos[1]}
        r={radius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        cursor={draggable ? "grab" : "default"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
        whileHover={draggable ? { scale: 1.2 } : undefined}
      />

      {/* KaTeX label */}
      {labelHtml && (
        <foreignObject
          x={pos[0] + labelOffset[0]}
          y={pos[1] + labelOffset[1]}
          width={2}
          height={1}
          overflow="visible"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            style={{
              fontSize: "0.35px",
              lineHeight: 1,
              color: strokeColor,
              whiteSpace: "nowrap",
            }}
            dangerouslySetInnerHTML={{ __html: labelHtml }}
          />
        </foreignObject>
      )}
    </g>
  );
}
