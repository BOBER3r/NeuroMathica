"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function OnboardingTastePage() {
  const router = useRouter();
  const [explored, setExplored] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-nm-bg-primary p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4"
      >
        <h2 className="text-xl font-bold text-nm-text-primary">
          Try it yourself
        </h2>
        <p className="text-sm text-nm-text-secondary">
          Drag the triangle vertex and watch the squares change
        </p>
      </motion.div>

      {/* Pythagorean theorem micro-lesson placeholder */}
      <div
        className="flex-1 rounded-2xl bg-nm-bg-secondary p-4"
        onPointerDown={() => setExplored(true)}
      >
        <svg viewBox="0 0 300 250" className="h-full w-full">
          <rect width="300" height="250" fill="transparent" />
          {/* Grid */}
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 25}
              y1="0"
              x2={i * 25}
              y2="250"
              stroke="var(--nm-bg-surface)"
              strokeOpacity="0.3"
            />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 25}
              x2="300"
              y2={i * 25}
              stroke="var(--nm-bg-surface)"
              strokeOpacity="0.3"
            />
          ))}
          {/* Triangle */}
          <polygon
            points="75,200 225,200 225,75"
            fill="none"
            stroke="var(--nm-accent-indigo)"
            strokeWidth="2.5"
          />
          {/* Square on side a (bottom) */}
          <rect
            x="75"
            y="200"
            width="150"
            height="150"
            fill="var(--nm-accent-indigo)"
            fillOpacity="0.1"
            stroke="var(--nm-accent-indigo)"
            strokeOpacity="0.5"
            strokeWidth="1"
            transform="translate(0, 0)"
            style={{ display: "none" }}
          />
          {/* Labels */}
          <text x="150" y="220" textAnchor="middle" fill="var(--nm-accent-indigo)" fontSize="14" fontWeight="bold">a = 6</text>
          <text x="235" y="140" textAnchor="start" fill="var(--nm-accent-emerald)" fontSize="14" fontWeight="bold">b = 5</text>
          <text x="140" y="130" textAnchor="end" fill="var(--nm-accent-amber)" fontSize="14" fontWeight="bold">c = ?</text>
          {/* Annotation */}
          <text x="150" y="30" textAnchor="middle" fill="var(--nm-text-secondary)" fontSize="12">
            a² + b² = c²
          </text>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: explored ? 1 : 0.3 }}
        className="mt-6"
      >
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!explored}
          onClick={() => router.push("/onboarding/identity")}
        >
          {explored ? "Amazing! Create Account" : "Interact with the triangle first"}
        </Button>
      </motion.div>
    </div>
  );
}
