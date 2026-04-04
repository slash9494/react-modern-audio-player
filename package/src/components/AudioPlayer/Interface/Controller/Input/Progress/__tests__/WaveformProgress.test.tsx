import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { timeContext } from "@/components/AudioPlayer/Context/TimeContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { AudioState } from "@/components/AudioPlayer/Context/StateContext";
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
        <timeContext.Provider value={{ currentTime: 0, duration: 180 }}>
          <playbackContext.Provider
            value={{
              curAudioState: {
                isPlaying: false,
                repeatType: "ALL",
                muted: false,
                volume: 0.5,
              } as AudioState,
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

  it("waveform slider is absent in bar mode (no tabIndex leak)", () => {
    const { container } = renderProgress("bar");
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
