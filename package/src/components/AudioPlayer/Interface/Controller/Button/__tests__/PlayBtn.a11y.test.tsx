import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { PlayBtn } from "../PlayBtn";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

const mockDispatch = vi.fn();

const makeState = (isPlaying: boolean) => ({
  playList: [{ src: "test.mp3", id: 1 }],
  curPlayId: 1,
  curIdx: 0,
  curAudioState: {
    isPlaying,
    repeatType: "ALL" as const,
    muted: false,
    volume: 0.5,
  },
  activeUI: {},
  playListPlacement: "bottom" as const,
});

const renderPlayBtn = (isPlaying: boolean) =>
  render(
    <audioPlayerStateContext.Provider value={makeState(isPlaying) as any}>
      <audioPlayerDispatchContext.Provider value={mockDispatch}>
        <PlayBtn />
      </audioPlayerDispatchContext.Provider>
    </audioPlayerStateContext.Provider>
  );

describe("PlayBtn accessibility", () => {
  it('has aria-label "Play" when not playing', () => {
    renderPlayBtn(false);
    expect(screen.getByRole("button", { name: "Play" })).toBeDefined();
  });

  it('has aria-label "Pause" when playing', () => {
    renderPlayBtn(true);
    expect(screen.getByRole("button", { name: "Pause" })).toBeDefined();
  });

  it('has type="button"', () => {
    renderPlayBtn(false);
    expect(screen.getByRole("button", { name: "Play" })).toHaveAttribute(
      "type",
      "button"
    );
  });
});
