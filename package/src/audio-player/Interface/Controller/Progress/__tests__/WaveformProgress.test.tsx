import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { playbackContext } from "@/audio-player/Context/PlaybackContext";
import { timeContext } from "@/audio-player/Context/TimeContext";
import { resourceContext } from "@/audio-player/Context/ResourceContext";
import { audioPlayerDispatchContext } from "@/audio-player/Context/dispatchContext";
import { uiContext } from "@/audio-player/Context/UIContext";
import { trackContext } from "@/audio-player/Context/TrackContext";
import { AudioData } from "@/audio-player/Context";
import { Progress } from "../index";

const mockDispatch = vi.fn();
const mockAudioEl = document.createElement("audio");
Object.defineProperty(mockAudioEl, "duration", { value: 180, writable: true });

const renderProgress = (progress: "bar" | "waveform") =>
  render(
    <uiContext.Provider
      value={{ activeUI: { progress }, playListPlacement: "bottom" }}
    >
      <trackContext.Provider value={{ playList: [], curPlayId: 1, curIdx: 0 }}>
        <timeContext.Provider
          value={{ currentTime: 0, duration: 180, seekRequestKey: 0 }}
        >
          <playbackContext.Provider
            value={{
              isPlaying: false,
              repeatType: "ALL",
              muted: false,
              volume: 0.5,
              isLoadedMetaData: false,
              audioResetKey: 0,
            }}
          >
            <resourceContext.Provider
              value={{ elementRefs: { audioEl: mockAudioEl } }}
            >
              <audioPlayerDispatchContext.Provider value={mockDispatch}>
                <Progress />
              </audioPlayerDispatchContext.Provider>
            </resourceContext.Provider>
          </playbackContext.Provider>
        </timeContext.Provider>
      </trackContext.Provider>
    </uiContext.Provider>
  );

beforeEach(() => {
  mockDispatch.mockClear();
});

describe("WaveformProgress deferred initialization", () => {
  it("does not trigger WaveSurfer init when starting in bar mode", () => {
    renderProgress("bar");
    expect(mockDispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: "SET_ELEMENT_REFS" })
    );
  });

  it("waveform wrapper is not in DOM when starting in bar mode", () => {
    const { container } = renderProgress("bar");
    expect(container.querySelector(".rmap-waveform-wrapper")).toBeNull();
    expect(container.querySelector("#rm-waveform")).toBeNull();
  });
});

describe("WaveformProgress accessibility", () => {
  it("waveform slider has correct ARIA attributes when active", () => {
    const { container } = renderProgress("waveform");
    const slider = container.querySelector("#rm-waveform");
    expect(slider).not.toBeNull();
    expect(slider?.getAttribute("tabindex")).toBe("0");
    expect(slider?.getAttribute("role")).toBe("slider");
    expect(slider?.getAttribute("aria-label")).toBe("Seek");
    expect(slider?.getAttribute("aria-valuemin")).toBe("0");
    expect(slider?.getAttribute("aria-valuemax")).toBe("100");
    expect(slider?.getAttribute("aria-valuenow")).toBe("0");
  });
});

// A track with precomputed peaks skips the byte-size HEAD probe, so mode is
// "normal" with no pending gate — the ready callback registers synchronously
// and the test stays deterministic (no fetch, no timers).
const makeReadyableWaveformInst = ({ syncLoadEmit = false } = {}) => {
  const handlers: Record<string, ((...args: unknown[]) => void)[]> = {};
  const emitRedraw = (...args: unknown[]) =>
    handlers.redraw?.forEach((cb) => cb(...args));
  return {
    // Mirrors wavesurfer 6.6.4: peaks-provided load() fires "redraw"
    // synchronously (with the peaks) before returning.
    load: vi.fn((_audioEl?: unknown, peaks?: unknown) => {
      if (syncLoadEmit && Array.isArray(peaks) && peaks.length > 0) {
        emitRedraw(peaks);
      }
    }),
    on: vi.fn((event: string, cb: (...args: unknown[]) => void) => {
      (handlers[event] ??= []).push(cb);
    }),
    un: vi.fn(),
    seekTo: vi.fn(),
    destroy: vi.fn(),
    drawer: { fireEvent: vi.fn() },
    backend: { media: null, mediaListeners: {} },
    isReady: false,
    emitReady: () => handlers.ready?.forEach((cb) => cb()),
    emitRedraw,
    emitError: () => handlers.error?.forEach((cb) => cb()),
  };
};

const renderReadyableWaveform = (
  waveformInst: ReturnType<typeof makeReadyableWaveformInst>
) => {
  const audioEl = document.createElement("audio");
  audioEl.setAttribute("src", "ready-track.mp3");
  Object.defineProperty(audioEl, "duration", { value: 180, writable: true });
  Object.defineProperty(audioEl, "currentTime", { value: 0, writable: true });

  const playList: AudioData[] = [
    { src: "ready-track.mp3", id: 1, peaks: [0.1, 0.5, 0.9] },
  ];

  return render(
    <uiContext.Provider
      value={{
        activeUI: { progress: "waveform" },
        playListPlacement: "bottom",
      }}
    >
      <trackContext.Provider value={{ playList, curPlayId: 1, curIdx: 0 }}>
        <timeContext.Provider
          value={{ currentTime: 0, duration: 180, seekRequestKey: 0 }}
        >
          <playbackContext.Provider
            value={{
              isPlaying: false,
              repeatType: "ALL",
              muted: false,
              volume: 0.5,
              isLoadedMetaData: true,
              audioResetKey: 0,
            }}
          >
            <resourceContext.Provider
              value={{
                elementRefs: { audioEl, waveformInst: waveformInst as never },
              }}
            >
              <audioPlayerDispatchContext.Provider value={mockDispatch}>
                <Progress />
              </audioPlayerDispatchContext.Provider>
            </resourceContext.Provider>
          </playbackContext.Provider>
        </timeContext.Provider>
      </trackContext.Provider>
    </uiContext.Provider>
  );
};

describe("WaveformProgress loading skeleton", () => {
  it("shows the skeleton until a redraw paints real bars, then clears it", () => {
    const waveformInst = makeReadyableWaveformInst();
    const { container } = renderReadyableWaveform(waveformInst);

    expect(container.querySelector(".rmap-waveform-skeleton")).not.toBeNull();

    act(() => {
      waveformInst.emitRedraw([0.1, 0.5]);
    });

    expect(container.querySelector(".rmap-waveform-skeleton")).toBeNull();
  });

  it("keeps the skeleton up on an empty-peaks redraw (pre-decode/resize draw)", () => {
    const waveformInst = makeReadyableWaveformInst();
    const { container } = renderReadyableWaveform(waveformInst);

    act(() => {
      waveformInst.emitRedraw([]);
    });

    expect(container.querySelector(".rmap-waveform-skeleton")).not.toBeNull();
  });

  it("keeps the skeleton up on ready alone (bars have not painted yet)", () => {
    const waveformInst = makeReadyableWaveformInst();
    const { container } = renderReadyableWaveform(waveformInst);

    act(() => {
      waveformInst.emitReady();
    });

    expect(container.querySelector(".rmap-waveform-skeleton")).not.toBeNull();
  });

  it("clears the skeleton when load() emits redraw synchronously (peaks track)", () => {
    // Regresses the listener registration order: the settling redraw fires
    // inside load(), so a listener registered after load() would miss it.
    const waveformInst = makeReadyableWaveformInst({ syncLoadEmit: true });
    const { container } = renderReadyableWaveform(waveformInst);

    expect(container.querySelector(".rmap-waveform-skeleton")).toBeNull();
  });

  it("clears the skeleton on error (decode failure must not pulse forever)", () => {
    const waveformInst = makeReadyableWaveformInst();
    const { container } = renderReadyableWaveform(waveformInst);

    expect(container.querySelector(".rmap-waveform-skeleton")).not.toBeNull();

    act(() => {
      waveformInst.emitError();
    });

    expect(container.querySelector(".rmap-waveform-skeleton")).toBeNull();
  });
});
