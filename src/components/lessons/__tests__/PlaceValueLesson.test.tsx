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
import { PlaceValueLesson } from "../PlaceValueLesson";

describe("PlaceValueLesson", () => {
  it("renders without throwing", () => {
    expect(() => render(<PlaceValueLesson />)).not.toThrow();
  });

  it("accepts onComplete prop", () => {
    expect(() => render(<PlaceValueLesson onComplete={() => {}} />)).not.toThrow();
  });
});
