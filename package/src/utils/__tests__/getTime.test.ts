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

  it("formats minutes and seconds", () => {
    expect(getTimeWithPadStart(90)).toBe("01:30");
    expect(getTimeWithPadStart(3661)).toBe("61:01");
  });

  it("pads single digit seconds with leading zero", () => {
    expect(getTimeWithPadStart(61)).toBe("01:01");
  });
});
