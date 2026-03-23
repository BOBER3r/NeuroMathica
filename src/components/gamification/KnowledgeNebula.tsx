"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { cn } from "@/lib/utils/cn";

type TopicStatus = "locked" | "available" | "in_progress" | "mastered" | "review_due";

interface TopicNode {
  id: string;
  name: string;
  domainId: string;
  status: TopicStatus;
  x: number;
  y: number;
}

interface PrerequisiteEdge {
  from: string;
  to: string;
}

interface KnowledgeNebulaProps {
  /** Array of topics to render as stars. */
  topics: TopicNode[];
  /** Prerequisite connections between topics. */
  edges?: PrerequisiteEdge[];
  /** Domain metadata for color coding. */
  domains?: Array<{ id: string; name: string; color: string }>;
  /** Called when a topic star is tapped. */
  onTopicTap?: (id: string) => void;
}

/**
 * CSS variable domain colors from globals.css.
 * Falls back to the domain `color` field from the DB when available.
 */
const DOMAIN_COLOR_VARS: Record<string, string> = {
  "numbers-operations": "var(--nm-domain-numbers)",
  "number-theory":      "var(--nm-domain-number-theory)",
  algebra:              "var(--nm-domain-algebra)",
  geometry:             "var(--nm-domain-geometry)",
  "statistics-probability": "var(--nm-domain-statistics)",
};

function getDomainColor(
  domainId: string,
  domains?: Array<{ id: string; name: string; color: string }>,
): string {
  if (domains) {
    const domain = domains.find((d) => d.id === domainId);
    if (domain?.color) return domain.color;
  }
  return DOMAIN_COLOR_VARS[domainId] ?? "var(--nm-accent-indigo)";
}

/** Star radius by topic status. */
const STATUS_RADIUS: Record<TopicStatus, number> = {
  locked: 4,
  available: 5,
  in_progress: 5,
  mastered: 6,
  review_due: 5,
};

/** Opacity by topic status. */
const STATUS_OPACITY: Record<TopicStatus, number> = {
  locked: 0.2,
  available: 0.65,
  in_progress: 0.55,
  mastered: 1,
  review_due: 0.7,
};

/** SVG viewBox dimensions. Topics should have x/y in this coordinate space. */
const VB_WIDTH = 800;
const VB_HEIGHT = 600;

/**
 * SVG constellation map of the 72-topic curriculum.
 * Renders topics as color-coded stars in domain clusters, with lines for
 * prerequisite connections. Supports pinch-to-zoom and pan via @use-gesture/react.
 * SVG-based for DOM accessibility.
 */
function KnowledgeNebula({
  topics,
  edges = [],
  domains,
  onTopicTap,
}: KnowledgeNebulaProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Transform state for pan + zoom
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });

  const bindGesture = useGesture(
    {
      onDrag: ({ delta: [dx, dy] }) => {
        setTransform((prev) => ({
          ...prev,
          x: prev.x + dx,
          y: prev.y + dy,
        }));
      },
      onPinch: ({ offset: [scale] }) => {
        setTransform((prev) => ({
          ...prev,
          scale: Math.min(Math.max(scale, 0.5), 3),
        }));
      },
    },
    {
      drag: { filterTaps: true },
      pinch: { scaleBounds: { min: 0.5, max: 3 } },
    },
  );

  const handleTopicClick = useCallback(
    (id: string) => {
      onTopicTap?.(id);
    },
    [onTopicTap],
  );

  // Build a lookup for fast edge rendering
  const topicMap = new Map(topics.map((t) => [t.id, t]));

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        "bg-nm-bg-primary border border-nm-bg-surface/20",
        "touch-none",
      )}
      style={{ aspectRatio: `${VB_WIDTH} / ${VB_HEIGHT}` }}
      {...bindGesture()}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
        className="h-full w-full"
        role="img"
        aria-label="Knowledge Nebula — curriculum constellation map"
      >
        <defs>
          {/* Glow filter for mastered stars */}
          <filter id="nm-star-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Amber pulse filter for review-due */}
          <filter id="nm-amber-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor="var(--nm-accent-amber)" floodOpacity="0.4" result="amber" />
            <feComposite in="amber" in2="blur" operator="in" result="amberBlur" />
            <feMerge>
              <feMergeNode in="amberBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}
          style={{ transformOrigin: "center" }}
        >
          {/* Prerequisite connection lines */}
          {edges.map((edge) => {
            const from = topicMap.get(edge.from);
            const to = topicMap.get(edge.to);
            if (!from || !to) return null;

            const fromMastered = from.status === "mastered";
            const toUnlocked = to.status !== "locked";

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={
                  fromMastered && toUnlocked
                    ? "var(--nm-accent-indigo)"
                    : "var(--nm-bg-elevated)"
                }
                strokeWidth={fromMastered && toUnlocked ? 1 : 0.5}
                strokeOpacity={fromMastered && toUnlocked ? 0.4 : 0.15}
                strokeDasharray={toUnlocked ? "none" : "4 4"}
              />
            );
          })}

          {/* Topic stars */}
          {topics.map((topic) => {
            const color = getDomainColor(topic.domainId, domains);
            const radius = STATUS_RADIUS[topic.status];
            const opacity = STATUS_OPACITY[topic.status];
            const isMastered = topic.status === "mastered";
            const isReviewDue = topic.status === "review_due";
            const isAvailable = topic.status === "available";
            const isInteractive = topic.status !== "locked";

            return (
              <g
                key={topic.id}
                role="button"
                tabIndex={isInteractive ? 0 : -1}
                aria-label={`${topic.name} — ${topic.status.replace("_", " ")}`}
                className={isInteractive ? "cursor-pointer" : "cursor-default"}
                onClick={() => {
                  if (isInteractive) handleTopicClick(topic.id);
                }}
                onKeyDown={(e) => {
                  if (isInteractive && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleTopicClick(topic.id);
                  }
                }}
              >
                {/* Outer glow ring for mastered */}
                {isMastered && (
                  <circle
                    cx={topic.x}
                    cy={topic.y}
                    r={radius + 4}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.5}
                    strokeOpacity={0.3}
                    filter="url(#nm-star-glow)"
                  />
                )}

                {/* Star circle */}
                <motion.circle
                  cx={topic.x}
                  cy={topic.y}
                  r={radius}
                  fill={color}
                  fillOpacity={opacity}
                  filter={
                    isMastered
                      ? "url(#nm-star-glow)"
                      : isReviewDue
                        ? "url(#nm-amber-glow)"
                        : undefined
                  }
                  animate={
                    isAvailable
                      ? { fillOpacity: [opacity, opacity + 0.25, opacity] }
                      : isReviewDue
                        ? { fillOpacity: [opacity, 0.9, opacity], fill: ["var(--nm-accent-amber)", color, "var(--nm-accent-amber)"] }
                        : undefined
                  }
                  transition={
                    isAvailable || isReviewDue
                      ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                      : undefined
                  }
                />

                {/* Label (shown for non-locked topics when zoomed in enough) */}
                {topic.status !== "locked" && (
                  <text
                    x={topic.x}
                    y={topic.y + radius + 12}
                    textAnchor="middle"
                    fill="var(--nm-text-secondary)"
                    fontSize={8}
                    fontWeight={500}
                    opacity={0.75}
                    className="pointer-events-none select-none"
                  >
                    {topic.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export { KnowledgeNebula };
export type { KnowledgeNebulaProps, TopicNode, TopicStatus, PrerequisiteEdge };
