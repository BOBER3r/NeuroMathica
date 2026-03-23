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
import { IntegerMultDivLesson } from "../IntegerMultDivLesson";

describe("IntegerMultDivLesson", () => {
  it("renders without throwing", () => {
    expect(() => render(<IntegerMultDivLesson />)).not.toThrow();
  });

  it("accepts onComplete prop", () => {
    expect(() => render(<IntegerMultDivLesson onComplete={() => {}} />)).not.toThrow();
  });
});
