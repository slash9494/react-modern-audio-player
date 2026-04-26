import { describe, it, expect } from "vitest";
import { clampVolume } from "../clampVolume";

describe("clampVolume", () => {
  it("passes through valid values in [0, 1]", () => {
    expect(clampVolume(0)).toBe(0);
    expect(clampVolume(0.5)).toBe(0.5);
    expect(clampVolume(1)).toBe(1);
  });

  it("clamps values below 0 to 0", () => {
    expect(clampVolume(-0.1)).toBe(0);
    expect(clampVolume(-100)).toBe(0);
  });

  it("clamps values above 1 to 1", () => {
    expect(clampVolume(1.1)).toBe(1);
    expect(clampVolume(100)).toBe(1);
  });

  it("returns 1 for NaN", () => {
    expect(clampVolume(NaN)).toBe(1);
  });

  it("returns 1 for Infinity", () => {
    expect(clampVolume(Infinity)).toBe(1);
    expect(clampVolume(-Infinity)).toBe(1);
  });
});
