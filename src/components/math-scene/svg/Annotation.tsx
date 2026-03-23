"use client";

import { motion } from "framer-motion";
import type { AnnotationObject } from "@/components/math-scene/animation/types";

interface AnnotationProps extends Omit<AnnotationObject, "type" | "id"> {
  className?: string;
}

/**
 * Convert LaTeX string to readable plain text for SVG rendering.
 * SVG foreignObject + KaTeX is unreliable, so we render as SVG text.
 */
function latexToText(latex: string): string {
  return latex
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\textbf\{([^}]*)\}/g, "$1")
    .replace(/\\times/g, "\u00D7")
    .replace(/\\div/g, "\u00F7")
    .replace(/\\pm/g, "\u00B1")
    .replace(/\\leq/g, "\u2264")
    .replace(/\\geq/g, "\u2265")
    .replace(/\\neq/g, "\u2260")
    .replace(/\\approx/g, "\u2248")
    .replace(/\\infty/g, "\u221E")
    .replace(/\\pi/g, "\u03C0")
    .replace(/\\theta/g, "\u03B8")
    .replace(/\\alpha/g, "\u03B1")
    .replace(/\\beta/g, "\u03B2")
    .replace(/\\sqrt\{([^}]*)\}/g, "\u221A($1)")
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "$1/$2")
    .replace(/\{,\}/g, ",")
    .replace(/\{/g, "")
    .replace(/\}/g, "")
    .replace(/\^(\w)/g, "$1")
    .replace(/\^{([^}]*)}/g, "$1")
    .replace(/_(\w)/g, "$1")
    .replace(/_{([^}]*)}/g, "$1")
    .replace(/\$/g, "")
    .replace(/\\\\/g, "")
    .trim();
}

function anchorToTextAnchor(anchor: AnnotationProps["anchor"]): "start" | "middle" | "end" {
  switch (anchor) {
    case "left": return "start";
    case "right": return "end";
    default: return "middle";
  }
}

function anchorToDy(anchor: AnnotationProps["anchor"]): string {
  switch (anchor) {
    case "top": return "1em";
    case "bottom": return "-0.3em";
    default: return "0.35em";
  }
}

export default function Annotation({
  position,
  latex,
  anchor = "center",
  style,
  opacity = 1,
  className,
}: AnnotationProps) {
  const [px, py] = position;
  const fontSize = style?.fontSize ?? 0.8;
  const fillColor = style?.fill ?? "currentColor";
  const text = latexToText(latex);

  return (
    <motion.text
      x={px}
      y={py}
      className={className}
      textAnchor={anchorToTextAnchor(anchor)}
      dominantBaseline="central"
      dy={anchorToDy(anchor)}
      fill={fillColor}
      fontSize={fontSize}
      fontFamily="system-ui, -apple-system, sans-serif"
      opacity={opacity}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.4 }}
      aria-label={latex}
    >
      {text}
    </motion.text>
  );
}
