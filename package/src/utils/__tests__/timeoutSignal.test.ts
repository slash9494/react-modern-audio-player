import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createTimeoutSignal } from "../timeoutSignal";

describe("createTimeoutSignal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns a non-aborted signal that aborts after ms", () => {
    const result = createTimeoutSignal(8000);
    expect(result).not.toBeNull();
    expect(result!.signal.aborted).toBe(false);

    vi.advanceTimersByTime(8000);
    expect(result!.signal.aborted).toBe(true);
  });

  it("does not abort when cancel() runs before the timeout", () => {
    const result = createTimeoutSignal(8000);
    result!.cancel();

    vi.advanceTimersByTime(16000);
    expect(result!.signal.aborted).toBe(false);
  });

  it("returns null when AbortController is unavailable", () => {
    const original = globalThis.AbortController;
    // @ts-expect-error force the undefined-API branch
    globalThis.AbortController = undefined;
    try {
      expect(createTimeoutSignal(8000)).toBeNull();
    } finally {
      globalThis.AbortController = original;
    }
  });
});
