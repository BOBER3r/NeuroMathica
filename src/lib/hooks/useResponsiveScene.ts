"use client";

import { useState, useEffect } from "react";

export type ViewportClass = "compact" | "standard" | "large";

interface ResponsiveScene {
  viewportClass: ViewportClass;
  width: number;
  height: number;
  scale: number;
  touchTargetSize: number;
}

function classifyViewport(width: number): ViewportClass {
  if (width < 480) return "compact";
  if (width < 1024) return "standard";
  return "large";
}

export function useResponsiveScene(): ResponsiveScene {
  const [scene, setScene] = useState<ResponsiveScene>({
    viewportClass: "standard",
    width: 768,
    height: 512,
    scale: 1,
    touchTargetSize: 44,
  });

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const viewportClass = classifyViewport(width);

      const scale =
        viewportClass === "compact"
          ? 0.75
          : viewportClass === "standard"
            ? 1
            : 1.25;

      const touchTargetSize =
        viewportClass === "compact" ? 48 : 44;

      setScene({ viewportClass, width, height, scale, touchTargetSize });
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scene;
}
