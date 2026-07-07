import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { timeContext } from "@/components/AudioPlayer/Context/TimeContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { AudioData } from "@/components/AudioPlayer/Context";
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
const makeReadyableWaveformInst = () => {
  const handlers: Record<string, ((...args: unknown[]) => void)[]> = {};
  return {
    load: vi.fn(),
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
    emitRedraw: () => handlers.redraw?.forEach((cb) => cb()),
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
  it("shows the skeleton until wavesurfer fires redraw, then clears it", () => {
    const waveformInst = makeReadyableWaveformInst();
    const { container } = renderReadyableWaveform(waveformInst);

    expect(container.querySelector(".rmap-waveform-skeleton")).not.toBeNull();

    act(() => {
      waveformInst.emitRedraw();
    });

    expect(container.querySelector(".rmap-waveform-skeleton")).toBeNull();
  });

  it("keeps the skeleton up on ready alone (bars have not painted yet)", () => {
    const waveformInst = makeReadyableWaveformInst();
    const { container } = renderReadyableWaveform(waveformInst);

    act(() => {
      waveformInst.emitReady();
    });

    expect(container.querySelector(".rmap-waveform-skeleton")).not.toBeNull();
  });
});
