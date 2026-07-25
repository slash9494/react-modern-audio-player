import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FC, ReactNode, RefObject } from "react";
import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { useAutoPlacement } from "../useAutoPlacement";

const VIEWPORT_HEIGHT = 1000;
const ABOVE_MIDLINE = 100;
const BELOW_MIDLINE = 700;

const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <uiContext.Provider
    value={{ activeUI: { all: true }, playListPlacement: "bottom" }}
  >
    {children}
  </uiContext.Provider>
);

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

const makeTrigger = (top: number) => {
  const el = document.createElement("div");
  let rectTop = top;
  el.getBoundingClientRect = () => ({ top: rectTop } as DOMRect);
  const setTop = (next: number) => {
    rectTop = next;
  };
  return { ref: { current: el } as RefObject<HTMLElement>, setTop };
};

beforeEach(() => {
  observerCallbacks = [];
  observedDisconnects = 0;
  vi.stubGlobal("ResizeObserver", TriggerResizeObserver);
  Object.defineProperty(window, "innerHeight", {
    value: VIEWPORT_HEIGHT,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("useAutoPlacement initial measurement", () => {
  it("measures 'bottom' when the trigger sits above the viewport midline", async () => {
    const { ref } = makeTrigger(ABOVE_MIDLINE);
    const { result } = renderHook(
      () => useAutoPlacement({ triggerRef: ref, initialState: "top" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current).toBe("bottom"));
  });

  it("measures 'top' when the trigger sits below the viewport midline", async () => {
    const { ref } = makeTrigger(BELOW_MIDLINE);
    const { result } = renderHook(
      () => useAutoPlacement({ triggerRef: ref, initialState: "bottom" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current).toBe("top"));
  });
});

describe("useAutoPlacement recompute", () => {
  it("re-measures when the trigger element resizes (ResizeObserver)", async () => {
    const { ref, setTop } = makeTrigger(ABOVE_MIDLINE);
    const { result } = renderHook(
      () => useAutoPlacement({ triggerRef: ref, initialState: "top" }),
      { wrapper }
    );
    await waitFor(() => expect(result.current).toBe("bottom"));

    setTop(BELOW_MIDLINE);
    act(() => triggerResize());

    await waitFor(() => expect(result.current).toBe("top"));
  });

  it("re-measures on window scroll", async () => {
    const { ref, setTop } = makeTrigger(ABOVE_MIDLINE);
    const { result } = renderHook(
      () => useAutoPlacement({ triggerRef: ref, initialState: "top" }),
      { wrapper }
    );
    await waitFor(() => expect(result.current).toBe("bottom"));

    setTop(BELOW_MIDLINE);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => expect(result.current).toBe("top"));
  });

  it("re-measures on window resize", async () => {
    const { ref, setTop } = makeTrigger(BELOW_MIDLINE);
    const { result } = renderHook(
      () => useAutoPlacement({ triggerRef: ref, initialState: "bottom" }),
      { wrapper }
    );
    await waitFor(() => expect(result.current).toBe("top"));

    setTop(ABOVE_MIDLINE);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    await waitFor(() => expect(result.current).toBe("bottom"));
  });
});

describe("useAutoPlacement without ResizeObserver", () => {
  it("still measures and does not throw on engines lacking ResizeObserver", async () => {
    vi.stubGlobal("ResizeObserver", undefined);
    const { ref, setTop } = makeTrigger(ABOVE_MIDLINE);
    const { result } = renderHook(
      () => useAutoPlacement({ triggerRef: ref, initialState: "top" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current).toBe("bottom"));

    setTop(BELOW_MIDLINE);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => expect(result.current).toBe("top"));
  });
});

describe("useAutoPlacement cleanup", () => {
  it("removes window listeners and disconnects the observer on unmount", async () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { ref } = makeTrigger(ABOVE_MIDLINE);
    const { result, unmount } = renderHook(
      () => useAutoPlacement({ triggerRef: ref, initialState: "top" }),
      { wrapper }
    );
    await waitFor(() => expect(result.current).toBe("bottom"));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(observedDisconnects).toBe(1);
  });
});
