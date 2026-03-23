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
import { FractionsLesson } from "../FractionsLesson";

describe("FractionsLesson", () => {
  it("renders without throwing", () => {
    expect(() => render(<FractionsLesson />)).not.toThrow();
  });

  it("accepts onComplete prop", () => {
    expect(() => render(<FractionsLesson onComplete={() => {}} />)).not.toThrow();
  });
});
