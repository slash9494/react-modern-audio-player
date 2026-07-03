import { describe, it, expect } from "vitest";
import { formatClockTime } from "../getTime";

describe("formatClockTime", () => {
  it("formats 0 seconds as 00:00", () => {
    expect(formatClockTime(0)).toBe("00:00");
  });

  it("formats seconds only (under 1 minute)", () => {
    expect(formatClockTime(9)).toBe("00:09");
    expect(formatClockTime(59)).toBe("00:59");
  });

  it("formats exactly 1 minute", () => {
    expect(formatClockTime(60)).toBe("01:00");
  });

  it("formats minutes and seconds under 1 hour", () => {
    expect(formatClockTime(90)).toBe("01:30");
  });

  it("formats the last second before 1 hour as 59:59", () => {
    expect(formatClockTime(3599)).toBe("59:59");
  });

  it("formats exactly 1 hour with an hour segment", () => {
    expect(formatClockTime(3600)).toBe("1:00:00");
  });

  it("formats multi-hour durations with zero-padded minutes and seconds", () => {
    expect(formatClockTime(18685)).toBe("5:11:25");
  });

  it("returns the placeholder for Infinity (live stream duration)", () => {
    expect(formatClockTime(Infinity)).toBe("--:--");
  });

  it("returns the placeholder for NaN (metadata not loaded)", () => {
    expect(formatClockTime(NaN)).toBe("--:--");
  });

  it("returns the placeholder for negative input", () => {
    expect(formatClockTime(-1)).toBe("--:--");
  });
});
