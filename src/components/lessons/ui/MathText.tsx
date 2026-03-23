"use client";

/**
 * MathText — unified text rendering for NeuroMathica lessons.
 *
 * Converts raw LaTeX strings AND escaped unicode into readable text.
 * Use this for ANY text in lessons that might contain math notation.
 *
 * Usage:
 *   <MathText text="\alpha + \beta = 90\circ" />
 *   <MathText text="Perpendicular bisector \u2014 no ruler needed!" />
 *   <MathText text="a² + b² = c²" />
 */

interface MathTextProps {
  text: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
}

/**
 * Converts LaTeX and unicode escapes to readable plain text.
 * This is the SINGLE SOURCE OF TRUTH for text rendering in lessons.
 */
export function cleanMathText(raw: string): string {
  return raw
    // Unicode escapes that leaked into JSX
    .replace(/\\u2014/g, "\u2014")   // em dash —
    .replace(/\\u2013/g, "\u2013")   // en dash –
    .replace(/\\u2212/g, "\u2212")   // minus −
    .replace(/\\u00D7/g, "\u00D7")   // times ×
    .replace(/\\u00F7/g, "\u00F7")   // division ÷
    .replace(/\\u00B1/g, "\u00B1")   // plus-minus ±
    .replace(/\\u2264/g, "\u2264")   // ≤
    .replace(/\\u2265/g, "\u2265")   // ≥
    .replace(/\\u2260/g, "\u2260")   // ≠
    .replace(/\\u2248/g, "\u2248")   // ≈
    .replace(/\\u221E/g, "\u221E")   // ∞
    .replace(/\\u03C0/g, "\u03C0")   // π
    .replace(/\\u03B8/g, "\u03B8")   // θ
    .replace(/\\u03B1/g, "\u03B1")   // α
    .replace(/\\u03B2/g, "\u03B2")   // β
    .replace(/\\u03B3/g, "\u03B3")   // γ
    .replace(/\\u2192/g, "\u2192")   // →
    .replace(/\\u2190/g, "\u2190")   // ←
    .replace(/\\u21BA/g, "\u21BA")   // ↺
    .replace(/\\u2713/g, "\u2713")   // ✓
    .replace(/\\u2717/g, "\u2717")   // ✗
    .replace(/\\u00B0/g, "\u00B0")   // °
    .replace(/\\u00B7/g, "\u00B7")   // ·
    // LaTeX commands → readable text
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\theta/g, "θ")
    .replace(/\\pi/g, "π")
    .replace(/\\infty/g, "∞")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\pm/g, "±")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\neq/g, "≠")
    .replace(/\\approx/g, "≈")
    .replace(/\\circ/g, "°")
    .replace(/\\degree/g, "°")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\leftarrow/g, "←")
    .replace(/\\cdot/g, "·")
    .replace(/\\sqrt\{([^}]*)\}/g, "√($1)")
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "$1/$2")
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\textbf\{([^}]*)\}/g, "$1")
    .replace(/\\mathbb\{([^}]*)\}/g, "$1")
    .replace(/\{,\}/g, ",")
    .replace(/\{/g, "")
    .replace(/\}/g, "")
    .replace(/\\\\/g, "")
    .replace(/\$/g, "")
    .trim();
}

export function MathText({ text, className, as: Tag = "span" }: MathTextProps) {
  return <Tag className={className}>{cleanMathText(text)}</Tag>;
}
