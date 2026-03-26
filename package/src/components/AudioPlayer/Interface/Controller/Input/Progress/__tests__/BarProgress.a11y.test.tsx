import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { BarProgress } from "../BarProgress";
import type { AudioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

const mockDispatch = vi.fn();
const mockAudioEl = document.createElement("audio");
Object.defineProperty(mockAudioEl, "duration", { value: 180, writable: true });
Object.defineProperty(mockAudioEl, "currentTime", {
  value: 0,
  writable: true,
});

beforeEach(() => {
  mockAudioEl.currentTime = 0;
  mockDispatch.mockClear();
});

const makeState = () => ({
  playList: [{ src: "test.mp3", id: 1 }],
  curPlayId: 1,
  curIdx: 0,
  curAudioState: {
    isPlaying: false,
    repeatType: "ALL" as const,
    muted: false,
    volume: 0.5,
    isLoadedMetaData: true,
  },
  activeUI: {},
  playListPlacement: "bottom" as const,
  elementRefs: {
    audioEl: mockAudioEl,
  },
});

const renderBar = () =>
  render(
    <audioPlayerStateContext.Provider
      value={makeState() as AudioPlayerStateContext}
    >
      <audioPlayerDispatchContext.Provider value={mockDispatch}>
        <BarProgress isActive={true} />
      </audioPlayerDispatchContext.Provider>
    </audioPlayerStateContext.Provider>
  );

describe("BarProgress accessibility", () => {
  it("has role slider", () => {
    renderBar();
    expect(screen.getByRole("slider")).toBeDefined();
  });

  it('has aria-label "Seek"', () => {
    renderBar();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-label", "Seek");
  });

  it("has tabIndex 0", () => {
    renderBar();
    expect(screen.getByRole("slider")).toHaveAttribute("tabindex", "0");
  });

  it("has aria-valuemin=0 and aria-valuemax=100", () => {
    renderBar();
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });

  it("ArrowRight seeks forward 5 seconds", () => {
    renderBar();
    mockAudioEl.currentTime = 10;
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(mockAudioEl.currentTime).toBe(15);
  });

  it("ArrowLeft seeks backward 5 seconds", () => {
    renderBar();
    mockAudioEl.currentTime = 20;
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(mockAudioEl.currentTime).toBe(15);
  });

  it("Home seeks to 0", () => {
    renderBar();
    mockAudioEl.currentTime = 60;
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "Home" });
    expect(mockAudioEl.currentTime).toBe(0);
  });

  it("End seeks to duration", () => {
    renderBar();
    mockAudioEl.currentTime = 60;
    const slider = screen.getByRole("slider");
    fireEvent.keyDown(slider, { key: "End" });
    expect(mockAudioEl.currentTime).toBe(180);
  });

  it("has no axe violations", async () => {
    const { container } = renderBar();
    expect(await axe(container)).toHaveNoViolations();
  });
});
