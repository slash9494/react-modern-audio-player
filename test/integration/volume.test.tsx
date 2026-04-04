import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AudioPlayerWithProviders, {
  PlayList,
  ActiveUI,
} from "../../package/src";

const playList: PlayList = [
  { name: "Track 1", writer: "LYH", img: "", src: "track1.mp3", id: 1 },
];

function renderWithVolume(volume: number) {
  const activeUI: ActiveUI = { all: true, progress: "bar" };
  const { container } = render(
    <AudioPlayerWithProviders
      playList={playList.map((t) => ({ ...t }))}
      audioInitialState={{ muted: true, volume, curPlayId: 1 }}
      activeUI={activeUI}
    />
  );
  const audio = container.querySelector("audio") as HTMLAudioElement;
  return { container, audio };
}

describe("Volume integration", () => {
  it("applies volume 0 to the audio element", () => {
    const { audio } = renderWithVolume(0);
    expect(audio.volume).toBe(0);
  });

  it("applies volume 0.5 to the audio element", () => {
    const { audio } = renderWithVolume(0.5);
    expect(audio.volume).toBe(0.5);
  });

  it("applies volume 1 to the audio element", () => {
    const { audio } = renderWithVolume(1);
    expect(audio.volume).toBe(1);
  });

  it("mute button toggles muted state while preserving volume", () => {
    const { audio } = renderWithVolume(0.5);
    expect(audio.volume).toBe(0.5);

    const muteBtn = screen.getByTestId("volume-trigger-btn");
    expect(muteBtn).toHaveAttribute("data-muted", "true");

    fireEvent.click(muteBtn);
    expect(muteBtn).toHaveAttribute("data-muted", "false");
    expect(audio.volume).toBe(0.5);
  });
});

describe("Volume tooltip (slider)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function openVolumeTooltip() {
    const dropdown = screen
      .getByTestId("volume-trigger-btn")
      .closest(".rmap-dropdown-container");
    expect(dropdown).not.toBeNull();
    act(() => {
      fireEvent.mouseEnter(dropdown!);
      vi.advanceTimersByTime(200);
    });
    return dropdown!;
  }

  it("hovering volume button reveals the volume slider", () => {
    renderWithVolume(0.5);
    openVolumeTooltip();
    expect(screen.getByTestId("volume-slider")).toBeInTheDocument();
  });

  it("changing volume slider to 0 sets audio element volume to 0", () => {
    const { audio } = renderWithVolume(0.5);
    openVolumeTooltip();

    const slider = screen.getByLabelText("Volume");
    fireEvent.change(slider, { target: { value: "0" } });

    expect(audio.volume).toBe(0);
  });

  it("changing volume slider to 1 sets audio element volume to 1", () => {
    const { audio } = renderWithVolume(0.3);
    openVolumeTooltip();

    const slider = screen.getByLabelText("Volume");
    fireEvent.change(slider, { target: { value: "1" } });

    expect(audio.volume).toBe(1);
  });

  it("mouse leave hides the volume slider", () => {
    renderWithVolume(0.5);
    const dropdown = openVolumeTooltip();
    expect(screen.getByTestId("volume-slider")).toBeInTheDocument();

    // close — chained timers across re-renders:
    // useDropdown(100ms) → setIsOpen(false)
    // CssTransition leaveTime(60ms) → onExited
    // CssTransition clearTime(300ms) → renderable=false → unmount
    act(() => {
      fireEvent.mouseLeave(dropdown);
    });
    // each act+runAllTimers processes one layer of scheduled timers
    act(() => vi.runAllTimers());
    act(() => vi.runAllTimers());
    act(() => vi.runAllTimers());
    expect(screen.queryByTestId("volume-slider")).not.toBeInTheDocument();
  });
});
