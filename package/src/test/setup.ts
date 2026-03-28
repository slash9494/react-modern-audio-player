import "@testing-library/jest-dom";
import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import { expect, vi } from "vitest";

expect.extend(axeMatchers);

// HTMLMediaElement is not supported in jsdom — mock play/pause/load
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLMediaElement.prototype.load = vi.fn();

// ResizeObserver is not available in jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// matchMedia is not available in jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// wavesurfer.js uses Canvas API which is not supported in jsdom.
// on() stores callbacks by event so tests can trigger them via __emit if needed.
vi.mock("wavesurfer.js", () => ({
  default: {
    create: vi.fn().mockImplementation(() => {
      const handlers: Record<string, ((...args: unknown[]) => void)[]> = {};
      return {
        load: vi.fn(),
        on: vi
          .fn()
          .mockImplementation(
            (event: string, cb: (...args: unknown[]) => void) => {
              if (!handlers[event]) handlers[event] = [];
              handlers[event].push(cb);
            }
          ),
        destroy: vi.fn(),
        setVolume: vi.fn(),
        pause: vi.fn(),
        play: vi.fn(),
        seekTo: vi.fn(),
        getCurrentTime: vi.fn().mockReturnValue(0),
        drawBuffer: vi.fn(),
        drawer: {
          fireEvent: vi.fn(),
        },
        __emit: (event: string, ...args: unknown[]) => {
          handlers[event]?.forEach((cb) => cb(...args));
        },
      };
    }),
  },
}));
