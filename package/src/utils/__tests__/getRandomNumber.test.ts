import { describe, it, expect } from "vitest";
import { getRandomNumber } from "../getRandomNumber";

describe("getRandomNumber", () => {
  it("returns a number within the given range", () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomNumber(0, 5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it("returns the only possible value when min equals max", () => {
    expect(getRandomNumber(3, 3)).toBe(3);
  });

  it("returns an integer", () => {
    const result = getRandomNumber(0, 10);
    expect(Number.isInteger(result)).toBe(true);
  });
});
