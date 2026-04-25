import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { RepeatTypeBtn } from "../RepeatTypeBtn";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { RepeatType } from "@/components/AudioPlayer/Context/StateContext";

const mockDispatch = vi.fn();

const makePlaybackValue = (repeatType: RepeatType) => ({
  isPlaying: false,
  repeatType,
  muted: false,
  volume: 0.5,
  isLoadedMetaData: undefined,
  audioResetKey: 0,
});

const uiValue = {
  activeUI: { all: true },
  playListPlacement: "bottom" as const,
};

const renderRepeatBtn = (repeatType: RepeatType) =>
  render(
    <uiContext.Provider value={uiValue}>
      <playbackContext.Provider value={makePlaybackValue(repeatType)}>
        <resourceContext.Provider value={{}}>
          <audioPlayerDispatchContext.Provider value={mockDispatch}>
            <RepeatTypeBtn />
          </audioPlayerDispatchContext.Provider>
        </resourceContext.Provider>
      </playbackContext.Provider>
    </uiContext.Provider>
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

  it("has no axe violations", async () => {
    const { container } = renderRepeatBtn("ALL");
    expect(await axe(container)).toHaveNoViolations();
  });
});
