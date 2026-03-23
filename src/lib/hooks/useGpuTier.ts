"use client";

import { useState, useEffect } from "react";

export type GpuQuality = "high" | "medium" | "low";

interface GpuTierResult {
  quality: GpuQuality;
  tier: number;
  isMobile: boolean;
}

export function useGpuTier(): GpuTierResult {
  const [result, setResult] = useState<GpuTierResult>({
    quality: "medium",
    tier: 2,
    isMobile: false,
  });

  useEffect(() => {
    async function detect() {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      let quality: GpuQuality = "medium";
      let tier = 2;

      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
        if (gl && gl instanceof WebGLRenderingContext) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          const renderer = debugInfo
            ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            : "";

          const rendererStr = String(renderer).toLowerCase();

          // Detect high-end GPUs
          if (
            /nvidia|radeon rx|geforce rtx|apple m[1-9]|apple gpu/i.test(rendererStr) &&
            !isMobile
          ) {
            quality = "high";
            tier = 3;
          }
          // Detect low-end / software renderers
          else if (
            /swiftshader|llvmpipe|software|mesa|intel hd [1-3]/i.test(rendererStr) ||
            (isMobile && /adreno [1-4]\d{2}|mali-[gt][1-5]/i.test(rendererStr))
          ) {
            quality = "low";
            tier = 1;
          }

          canvas.remove();
        }
      } catch {
        // WebGL not available — default to medium
      }

      // Hardware concurrency as fallback signal
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        quality = "low";
        tier = 1;
      }

      setResult({ quality, tier, isMobile });
    }

    detect();
  }, []);

  return result;
}
