"use client";

import { useEffect, useRef, useState } from "react";

interface SceneDescriptionProps {
  description: string;
}

export function SceneDescription({ description }: SceneDescriptionProps) {
  const [currentDescription, setCurrentDescription] = useState(description);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (description !== currentDescription) {
      setCurrentDescription(description);
    }
  }, [description, currentDescription]);

  return (
    <div
      ref={liveRegionRef}
      role="status"
      aria-live="polite"
      aria-atomic
      className="sr-only"
    >
      {currentDescription}
    </div>
  );
}
