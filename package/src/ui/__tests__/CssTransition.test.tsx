import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CssTransition } from "../CssTransition";

// Latest-ref regression: timer callbacks must invoke the most recent
// onEntered / onExited prop, not the closure captured at the first
// render. Without the latest-ref mirrors the effect would either skip
// re-binding (stale callback fires) or restart the timers on every
// parent re-render that recreates the callback identity.

describe("CssTransition latest-ref callback handling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("invokes the LATEST onEntered when the prop changes between mount and timer fire", () => {
    const firstCallback = vi.fn();
    const replacedCallback = vi.fn();

    const { rerender } = render(
      <CssTransition
        visible={true}
        name="rmap-test"
        enterTime={20}
        leaveTime={20}
        clearTime={300}
        onEntered={firstCallback}
      >
        <div className="rmap-test-child" />
      </CssTransition>
    );

    rerender(
      <CssTransition
        visible={true}
        name="rmap-test"
        enterTime={20}
        leaveTime={20}
        clearTime={300}
        onEntered={replacedCallback}
      >
        <div className="rmap-test-child" />
      </CssTransition>
    );

    act(() => {
      vi.advanceTimersByTime(25);
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(replacedCallback).toHaveBeenCalledTimes(1);
  });

  it("invokes the LATEST onExited after toggling visible=false with a fresh callback", () => {
    const firstExitCallback = vi.fn();
    const replacedExitCallback = vi.fn();

    const { rerender } = render(
      <CssTransition
        visible={true}
        name="rmap-test"
        enterTime={20}
        leaveTime={20}
        clearTime={300}
        onExited={firstExitCallback}
      >
        <div />
      </CssTransition>
    );

    act(() => {
      vi.advanceTimersByTime(25);
    });
    expect(firstExitCallback).not.toHaveBeenCalled();

    rerender(
      <CssTransition
        visible={false}
        name="rmap-test"
        enterTime={20}
        leaveTime={20}
        clearTime={300}
        onExited={replacedExitCallback}
      >
        <div />
      </CssTransition>
    );

    vi.advanceTimersByTime(25);

    expect(firstExitCallback).not.toHaveBeenCalled();
    expect(replacedExitCallback).toHaveBeenCalledTimes(1);
  });

  it("does NOT restart the enter timer when only the callback identity changes", () => {
    // Parent re-renders that recreate inline arrow callbacks should not
    // cancel + restart the in-flight transition timer. If the timer were
    // tied to callback identity, advancing past enterTime once would not
    // be enough — the rerender would have reset the clock.
    const callback = vi.fn();

    const { rerender } = render(
      <CssTransition
        visible={true}
        name="rmap-test"
        enterTime={20}
        leaveTime={20}
        clearTime={300}
        onEntered={() => callback("first identity")}
      >
        <div />
      </CssTransition>
    );

    act(() => {
      vi.advanceTimersByTime(10);
    });

    rerender(
      <CssTransition
        visible={true}
        name="rmap-test"
        enterTime={20}
        leaveTime={20}
        clearTime={300}
        onEntered={() => callback("second identity")}
      >
        <div />
      </CssTransition>
    );

    act(() => {
      vi.advanceTimersByTime(15);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("second identity");
  });
});
