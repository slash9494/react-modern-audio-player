import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BarProgress } from "../BarProgress";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

const mockDispatch = vi.fn();
const mockAudioEl = document.createElement("audio");
Object.defineProperty(mockAudioEl, "duration", { value: 180, writable: true });
Object.defineProperty(mockAudioEl, "currentTime", {
  value: 0,
  writable: true,
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
    progressBarEl: { current: null },
    progressValueEl: { current: null },
    progressHandleEl: { current: null },
    trackCurTimeEl: { current: null },
    trackDurationEl: { current: null },
  },
});

const renderBar = () =>
  render(
    <audioPlayerStateContext.Provider value={makeState() as any}>
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

  it("ArrowRight seeks forward 5 seconds", async () => {
    renderBar();
    mockAudioEl.currentTime = 10;
    const slider = screen.getByRole("slider");
    await userEvent.type(slider, "{ArrowRight}");
    expect(mockAudioEl.currentTime).toBe(15);
  });

  it("ArrowLeft seeks backward 5 seconds", async () => {
    renderBar();
    mockAudioEl.currentTime = 20;
    const slider = screen.getByRole("slider");
    await userEvent.type(slider, "{ArrowLeft}");
    expect(mockAudioEl.currentTime).toBe(15);
  });

  it("Home seeks to 0", async () => {
    renderBar();
    mockAudioEl.currentTime = 60;
    const slider = screen.getByRole("slider");
    await userEvent.type(slider, "{Home}");
    expect(mockAudioEl.currentTime).toBe(0);
  });
});
