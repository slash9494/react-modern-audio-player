import "@testing-library/jest-dom";
import { vi } from "vitest";

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

// wavesurfer.js uses Canvas API which is not supported in jsdom
vi.mock("wavesurfer.js", () => ({
  default: {
    create: vi.fn().mockReturnValue({
      load: vi.fn(),
      on: vi.fn(),
      destroy: vi.fn(),
      setVolume: vi.fn(),
      pause: vi.fn(),
      play: vi.fn(),
    }),
  },
}));
