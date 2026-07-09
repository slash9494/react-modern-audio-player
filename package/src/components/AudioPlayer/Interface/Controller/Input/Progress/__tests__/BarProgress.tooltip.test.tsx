import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BarProgress } from "../BarProgress";
import { AudioData } from "@/components/AudioPlayer/Context";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { timeContext } from "@/components/AudioPlayer/Context/TimeContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

const DURATION = 100;
const PROGRESS_BAR_WIDTH = 200;

const mockDispatch = vi.fn();
const mockAudioEl = document.createElement("audio");
Object.defineProperty(mockAudioEl, "duration", {
  value: DURATION,
  writable: true,
});
Object.defineProperty(mockAudioEl, "currentTime", { value: 0, writable: true });

beforeEach(() => {
  mockAudioEl.currentTime = 0;
  mockDispatch.mockClear();
});

const renderBar = (trackOverride?: Partial<AudioData>) =>
  render(
    <trackContext.Provider
      value={{
        playList: [{ id: 1, src: "track.mp3", ...trackOverride }],
        curPlayId: 1,
        curIdx: 0,
      }}
    >
      <timeContext.Provider
        value={{ currentTime: 0, duration: DURATION, seekRequestKey: 0 }}
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
            value={{ elementRefs: { audioEl: mockAudioEl } }}
          >
            <audioPlayerDispatchContext.Provider value={mockDispatch}>
              <BarProgress />
            </audioPlayerDispatchContext.Provider>
          </resourceContext.Provider>
        </playbackContext.Provider>
      </timeContext.Provider>
    </trackContext.Provider>
  );

const mockSliderGeometry = (slider: HTMLElement) => {
  Object.defineProperty(slider, "clientWidth", { value: PROGRESS_BAR_WIDTH });
  slider.getBoundingClientRect = () =>
    ({ x: 0, width: PROGRESS_BAR_WIDTH } as DOMRect);
};

const queryTooltip = () =>
  document.querySelector<HTMLElement>(".rmap-progress-tooltip");

describe("BarProgress hover tooltip", () => {
  it("shows the tooltip at the hovered position", () => {
    renderBar();
    const slider = screen.getByRole("slider");
    mockSliderGeometry(slider);

    fireEvent.mouseMove(slider, { clientX: PROGRESS_BAR_WIDTH / 2 });

    const tooltip = queryTooltip();
    expect(tooltip).toHaveTextContent("00:50");
    expect(tooltip).toHaveStyle({ left: "50%" });
  });

  it("clears the tooltip on mouse leave", () => {
    renderBar();
    const slider = screen.getByRole("slider");
    mockSliderGeometry(slider);

    fireEvent.mouseMove(slider, { clientX: PROGRESS_BAR_WIDTH / 2 });
    fireEvent.mouseLeave(slider);

    expect(queryTooltip()).toBeNull();
  });

  it("shows no tooltip for a live track", () => {
    renderBar({ isLive: true });
    const slider = screen.getByRole("slider");
    mockSliderGeometry(slider);

    fireEvent.mouseMove(slider, { clientX: PROGRESS_BAR_WIDTH / 2 });

    expect(queryTooltip()).toBeNull();
  });

  it("clamps the ratio at the edges (no negative or past-end time)", () => {
    renderBar();
    const slider = screen.getByRole("slider");
    mockSliderGeometry(slider);

    fireEvent.mouseMove(slider, { clientX: -3 });
    expect(queryTooltip()).toHaveTextContent("00:00");

    fireEvent.mouseMove(slider, { clientX: PROGRESS_BAR_WIDTH + 5 });
    const tooltip = queryTooltip();
    expect(tooltip).toHaveTextContent("01:40");
    expect(tooltip).toHaveStyle({ left: "100%" });
  });

  it("clears the tooltip on mouse up (touch taps never fire mouseleave)", () => {
    renderBar();
    const slider = screen.getByRole("slider");
    mockSliderGeometry(slider);

    fireEvent.mouseMove(slider, { clientX: PROGRESS_BAR_WIDTH / 2 });
    fireEvent.mouseUp(slider);

    expect(queryTooltip()).toBeNull();
  });
});
