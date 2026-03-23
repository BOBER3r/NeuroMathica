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
import { DecimalsLesson } from "../DecimalsLesson";

describe("DecimalsLesson", () => {
  it("renders without throwing", () => {
    expect(() => render(<DecimalsLesson />)).not.toThrow();
  });

  it("accepts onComplete prop", () => {
    expect(() => render(<DecimalsLesson onComplete={() => {}} />)).not.toThrow();
  });
});
