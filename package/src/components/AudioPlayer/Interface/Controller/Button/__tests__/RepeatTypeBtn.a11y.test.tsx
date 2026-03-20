import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { RepeatTypeBtn } from "../RepeatTypeBtn";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { RepeatType } from "@/components/AudioPlayer/Context/StateContext";

const mockDispatch = vi.fn();

const makeState = (repeatType: RepeatType) => ({
  playList: [{ src: "test.mp3", id: 1 }],
  curPlayId: 1,
  curIdx: 0,
  curAudioState: {
    isPlaying: false,
    repeatType,
    muted: false,
    volume: 0.5,
  },
  activeUI: {},
  playListPlacement: "bottom" as const,
});

const renderRepeatBtn = (repeatType: RepeatType) =>
  render(
    <audioPlayerStateContext.Provider value={makeState(repeatType) as any}>
      <audioPlayerDispatchContext.Provider value={mockDispatch}>
        <RepeatTypeBtn />
      </audioPlayerDispatchContext.Provider>
    </audioPlayerStateContext.Provider>
  );

describe("RepeatTypeBtn accessibility", () => {
  it.each([
    ["ALL", "Repeat: All tracks"],
    ["ONE", "Repeat: One track"],
    ["NONE", "Repeat: Off"],
    ["SHUFFLE", "Shuffle"],
  ] as [RepeatType, string][])(
    'repeatType "%s" has aria-label "%s"',
    (repeatType, expectedLabel) => {
      renderRepeatBtn(repeatType);
      expect(screen.getByRole("button", { name: expectedLabel })).toBeDefined();
    }
  );

  it('has type="button"', () => {
    renderRepeatBtn("ALL");
    expect(
      screen.getByRole("button", { name: "Repeat: All tracks" })
    ).toHaveAttribute("type", "button");
  });
});
