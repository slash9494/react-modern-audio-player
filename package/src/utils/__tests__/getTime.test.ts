import { describe, it, expect } from "vitest";
import { getTimeWithPadStart } from "../getTime";

describe("getTimeWithPadStart", () => {
  it("formats 0 seconds as 00:00", () => {
    expect(getTimeWithPadStart(0)).toBe("00:00");
  });

  it("formats seconds only (under 1 minute)", () => {
    expect(getTimeWithPadStart(9)).toBe("00:09");
    expect(getTimeWithPadStart(59)).toBe("00:59");
  });

  it("formats exactly 1 minute", () => {
    expect(getTimeWithPadStart(60)).toBe("01:00");
  });

  it("formats minutes and seconds under 1 hour", () => {
    expect(getTimeWithPadStart(90)).toBe("01:30");
  });

  it("formats the last second before 1 hour as 59:59", () => {
    expect(getTimeWithPadStart(3599)).toBe("59:59");
  });

  it("formats exactly 1 hour with an hour segment", () => {
    expect(getTimeWithPadStart(3600)).toBe("1:00:00");
  });

  it("formats multi-hour durations with zero-padded minutes and seconds", () => {
    expect(getTimeWithPadStart(18685)).toBe("5:11:25");
  });

  it("returns the placeholder for Infinity (live stream duration)", () => {
    expect(getTimeWithPadStart(Infinity)).toBe("--:--");
  });

  it("returns the placeholder for NaN (metadata not loaded)", () => {
    expect(getTimeWithPadStart(NaN)).toBe("--:--");
  });

  it("returns the placeholder for negative input", () => {
    expect(getTimeWithPadStart(-1)).toBe("--:--");
  });
});
