import { describe, it, expect, vi } from "vitest";

// Mock framer-motion to avoid act() warnings in jsdom
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

import { render } from "@testing-library/react";
import { MeanMedianModeLesson } from "../MeanMedianModeLesson";

describe("MeanMedianModeLesson", () => {
  it("renders without throwing", () => {
    expect(() => render(<MeanMedianModeLesson />)).not.toThrow();
  });

  it("accepts onComplete prop", () => {
    expect(() => render(<MeanMedianModeLesson onComplete={() => {}} />)).not.toThrow();
  });
});
