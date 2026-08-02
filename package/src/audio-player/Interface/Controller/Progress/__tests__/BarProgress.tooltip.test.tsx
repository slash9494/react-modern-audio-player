import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BarProgress } from "../BarProgress";
import type { AudioData } from "@/audio-player/Context";
import { playbackContext } from "@/audio-player/Context/PlaybackContext";
import { timeContext } from "@/audio-player/Context/TimeContext";
import { resourceContext } from "@/audio-player/Context/ResourceContext";
import { trackContext } from "@/audio-player/Context/TrackContext";
import { audioPlayerDispatchContext } from "@/audio-player/Context/dispatchContext";
import { uiContext } from "@/audio-player/Context/UIContext";

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
    <uiContext.Provider
      value={{ activeUI: { progress: "bar" }, playListPlacement: "bottom" }}
    >
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
    </uiContext.Provider>
  );

const mockSliderGeometry = (slider: HTMLElement) => {
  Object.defineProperty(slider, "clientWidth", { value: PROGRESS_BAR_WIDTH });
  slider.getBoundingClientRect = () =>
    ({
      x: 0,
      y: 0,
      width: PROGRESS_BAR_WIDTH,
      height: 0,
      top: 0,
      left: 0,
      right: PROGRESS_BAR_WIDTH,
      bottom: 0,
      toJSON: () => ({}),
    } as DOMRect);
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

const mockSliderTop = (slider: HTMLElement, top: number) => {
  Object.defineProperty(slider, "clientWidth", { value: PROGRESS_BAR_WIDTH });
  slider.getBoundingClientRect = () =>
    ({
      x: 0,
      y: top,
      width: PROGRESS_BAR_WIDTH,
      height: 0,
      top,
      left: 0,
      right: PROGRESS_BAR_WIDTH,
      bottom: top,
      toJSON: () => ({}),
    } as DOMRect);
};

describe("BarProgress tooltip auto-placement", () => {
  it("flips the tooltip below the bar when it sits in the upper half of the viewport", async () => {
    window.innerHeight = 768;
    renderBar();
    const slider = screen.getByRole("slider");
    mockSliderTop(slider, 100);

    fireEvent.mouseMove(slider, { clientX: PROGRESS_BAR_WIDTH / 2 });

    await waitFor(() =>
      expect(queryTooltip()).toHaveAttribute("data-placement", "bottom")
    );
  });

  it("keeps the tooltip above the bar when it sits in the lower half of the viewport", async () => {
    window.innerHeight = 768;
    renderBar();
    const slider = screen.getByRole("slider");
    mockSliderTop(slider, 600);

    fireEvent.mouseMove(slider, { clientX: PROGRESS_BAR_WIDTH / 2 });

    await waitFor(() =>
      expect(queryTooltip()).toHaveAttribute("data-placement", "top")
    );
  });
});
