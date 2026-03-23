"use client";

import { useMemo } from "react";
import { useGpuTier } from "./useGpuTier";

const DPR_CAPS: Record<string, number> = {
  high: 2,
  medium: 1.5,
  low: 1,
};

export function useAdaptivePixelRatio(): number {
  const { quality } = useGpuTier();

  return useMemo(() => {
    const deviceDpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
    const cap = DPR_CAPS[quality] ?? 1.5;
    return Math.min(deviceDpr, cap);
  }, [quality]);
}
