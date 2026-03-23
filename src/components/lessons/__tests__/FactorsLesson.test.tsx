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
import { FactorsLesson } from "../FactorsLesson";

describe("FactorsLesson", () => {
  it("renders without throwing", () => {
    expect(() => render(<FactorsLesson />)).not.toThrow();
  });

  it("accepts onComplete prop", () => {
    expect(() => render(<FactorsLesson onComplete={() => {}} />)).not.toThrow();
  });
});
