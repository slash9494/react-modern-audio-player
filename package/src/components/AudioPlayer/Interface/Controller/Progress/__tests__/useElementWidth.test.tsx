import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RefObject } from "react";
import { useElementWidth } from "../hooks/useElementWidth";

let observerCallbacks: ResizeObserverCallback[] = [];
let observedDisconnects: number;

class TriggerResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    observerCallbacks.push(callback);
  }
  observe() {
    /* noop */
  }
  unobserve() {
    /* noop */
  }
  disconnect() {
    observedDisconnects += 1;
  }
}

const triggerResize = () => {
  const observer = {} as ResizeObserver;
  observerCallbacks.forEach((cb) => cb([], observer));
};

const makeElement = (initialWidth: number) => {
  const el = document.createElement("div");
  let offsetWidth = initialWidth;
  Object.defineProperty(el, "offsetWidth", {
    configurable: true,
    get: () => offsetWidth,
  });
  const setOffsetWidth = (next: number) => {
    offsetWidth = next;
  };
  return { ref: { current: el } as RefObject<HTMLElement>, setOffsetWidth };
};

beforeEach(() => {
  observerCallbacks = [];
  observedDisconnects = 0;
  vi.stubGlobal("ResizeObserver", TriggerResizeObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("useElementWidth", () => {
  it("measures the element width synchronously on mount", () => {
    const { ref } = makeElement(120);
    const { result } = renderHook(() => useElementWidth(ref));

    expect(result.current).toBe(120);
  });

  it("returns 0 while no element is attached", () => {
    const ref = { current: null } as RefObject<HTMLElement>;
    const { result } = renderHook(() => useElementWidth(ref));

    expect(result.current).toBe(0);
  });

  it("tracks width changes reported by the ResizeObserver", () => {
    const { ref, setOffsetWidth } = makeElement(120);
    const { result } = renderHook(() => useElementWidth(ref));
    expect(result.current).toBe(120);

    setOffsetWidth(240);
    act(() => triggerResize());

    expect(result.current).toBe(240);
  });

  it("measures once without throwing on engines lacking ResizeObserver", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const { ref } = makeElement(80);

    const { result } = renderHook(() => useElementWidth(ref));

    expect(result.current).toBe(80);
    expect(observerCallbacks).toHaveLength(0);
  });

  it("disconnects the observer on unmount", () => {
    const { ref } = makeElement(120);
    const { unmount } = renderHook(() => useElementWidth(ref));
    expect(observedDisconnects).toBe(0);

    unmount();

    expect(observedDisconnects).toBe(1);
  });
});
