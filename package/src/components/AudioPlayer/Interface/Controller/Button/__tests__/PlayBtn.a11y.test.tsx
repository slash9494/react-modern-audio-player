import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { PlayBtn } from "../TransportControls/PlayBtn";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
const mockDispatch = vi.fn();

const makePlaybackValue = (isPlaying: boolean) => ({
  isPlaying,
  repeatType: "ALL" as const,
  muted: false,
  volume: 0.5,
  isLoadedMetaData: undefined,
  audioResetKey: 0,
});

const renderPlayBtn = (isPlaying: boolean) =>
  render(
    <playbackContext.Provider value={makePlaybackValue(isPlaying)}>
      <resourceContext.Provider value={{}}>
        <audioPlayerDispatchContext.Provider value={mockDispatch}>
          <PlayBtn />
        </audioPlayerDispatchContext.Provider>
      </resourceContext.Provider>
    </playbackContext.Provider>
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

  it("has no axe violations", async () => {
    const { container } = renderPlayBtn(false);
    expect(await axe(container)).toHaveNoViolations();
  });
});
