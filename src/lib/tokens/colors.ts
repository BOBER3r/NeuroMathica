/**
 * Design-token constants that mirror the CSS custom properties in globals.css.
 * Use these for inline `style` props where Tailwind classes aren't possible
 * (e.g. SVG fills, Framer Motion dynamic values).
 *
 * For normal layout / text, prefer the Tailwind classes:
 *   bg-nm-bg-primary, text-nm-accent-emerald, etc.
 */

export const colors = {
  bg: {
    primary: "#0f172a",
    secondary: "#1e293b",
    surface: "#334155",
    elevated: "#475569",
  },
  text: {
    primary: "#f1f5f9",
    secondary: "#94a3b8",
    muted: "#64748b",
  },
  accent: {
    indigo: "#818cf8",
    cyan: "#22d3ee",
    emerald: "#34d399",
    amber: "#fbbf24",
    rose: "#fb7185",
    violet: "#a78bfa",
  },
  domain: {
    numbers: "#60a5fa",
    numberTheory: "#a78bfa",
    algebra: "#34d399",
    geometry: "#fbbf24",
    statistics: "#fb7185",
  },
  functional: {
    success: "#34d399",
    warning: "#fbbf24",
    error: "#fb7185",
    info: "#60a5fa",
  },
} as const;

export type AccentColor = keyof typeof colors.accent;
export type FunctionalColor = keyof typeof colors.functional;
