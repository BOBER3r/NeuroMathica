"use client";

import { motion } from "framer-motion";
import type { FractionBarObject } from "@/components/math-scene/animation/types";

interface FractionBarProps extends Omit<FractionBarObject, "type" | "id"> {
  /** Top-left position in scene coordinates. Defaults to [0, 0]. */
  position?: [number, number];
  className?: string;
}

/**
 * T030 - FractionBar
 * Renders a rectangular bar divided into `denominator` equal sections,
 * with `numerator` sections shaded. Animated splitting via motion.rect.
 * Optional label shows "numerator/denominator" below the bar.
 */
export default function FractionBar({
  numerator,
  denominator,
  width = 4,
  height = 1,
  shadedColor = "#4299e1",
  unshadedColor = "#e2e8f0",
  showLabel = true,
  position = [0, 0],
  opacity = 1,
  style,
  className,
}: FractionBarProps) {
  const [px, py] = position;
  const sectionWidth = width / denominator;
  const strokeColor = style?.stroke ?? "#2d3748";
  const strokeWidth = style?.strokeWidth ?? 0.03;
  const fontSize = style?.fontSize ?? 0.4;

  const sections = Array.from({ length: denominator }, (_, i) => i);

  return (
    <g
      className={className}
      aria-label={`Fraction bar showing ${numerator} out of ${denominator}`}
      opacity={opacity}
    >
      {/* Sections */}
      {sections.map((i) => {
        const isShaded = i < numerator;
        return (
          <motion.rect
            key={`section-${i}`}
            x={px + i * sectionWidth}
            y={py}
            width={sectionWidth}
            height={height}
            fill={isShaded ? shadedColor : unshadedColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Outer border for clean edges */}
      <rect
        x={px}
        y={py}
        width={width}
        height={height}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 1.5}
      />

      {/* Label */}
      {showLabel && (
        <motion.text
          x={px + width / 2}
          y={py + height + fontSize * 1.5}
          textAnchor="middle"
          dominantBaseline="hanging"
          fill={strokeColor}
          fontSize={fontSize}
          initial={{ opacity: 0, y: py + height + fontSize * 2 }}
          animate={{ opacity: 1, y: py + height + fontSize * 1.5 }}
          transition={{ duration: 0.3, delay: denominator * 0.05 + 0.2 }}
          aria-label={`${numerator} over ${denominator}`}
        >
          {numerator}/{denominator}
        </motion.text>
      )}
    </g>
  );
}
