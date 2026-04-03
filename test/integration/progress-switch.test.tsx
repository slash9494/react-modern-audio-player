import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioPlayerWithProviders, {
  PlayList,
  ActiveUI,
} from "../../package/src";

const playList: PlayList = [
  { name: "Track 1", writer: "LYH", img: "", src: "track1.mp3", id: 1 },
];

const renderWithProgress = (progress: ActiveUI["progress"]) =>
  render(
    <AudioPlayerWithProviders
      playList={playList}
      audioInitialState={{ muted: true, volume: 0.2, curPlayId: 1 }}
      activeUI={{ all: true, progress }}
    />
  );

const renderSwitchable = () => {
  const result = render(
    <AudioPlayerWithProviders
      playList={playList}
      audioInitialState={{ muted: true, volume: 0.2, curPlayId: 1 }}
      activeUI={{ all: true, progress: "bar" }}
    />
  );

  const rerenderWith = (progress: ActiveUI["progress"]) => {
    result.rerender(
      <AudioPlayerWithProviders
        playList={playList}
        audioInitialState={{ muted: true, volume: 0.2, curPlayId: 1 }}
        activeUI={{ all: true, progress }}
      />
    );
  };

  return { ...result, rerenderWith };
};

describe("Progress initial rendering", () => {
  it("7-4: bar mode — waveform wrapper is not in DOM", () => {
    const { container } = renderWithProgress("bar");
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    expect(container.querySelector(".waveform-wrapper")).toBeNull();
  });

  it("7-5: waveform mode — waveform is active, bar is absent", () => {
    const { container } = renderWithProgress("waveform");
    expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
    const waveform = container.querySelector(".waveform-wrapper");
    expect(waveform).toBeInTheDocument();
    expect(waveform?.getAttribute("data-active")).toBe("true");
  });
});

// currentTime preservation tests moved to e2e (progress-switch.spec.ts)
// — jsdom cannot reproduce WaveSurfer load() resetting currentTime

describe("Progress mode switching — DOM persistence", () => {
  it("7-8: waveform mounts on first activation then persists", () => {
    const { container, rerenderWith } = renderSwitchable();

    const waveform = () => container.querySelector(".waveform-wrapper");

    // bar start — no waveform in DOM
    expect(waveform()).toBeNull();

    // first activation — mounts
    rerenderWith("waveform");
    expect(waveform()).toBeInTheDocument();
    expect(waveform()?.getAttribute("data-active")).toBe("true");

    // back to bar — waveform stays mounted but hidden
    rerenderWith("bar");
    expect(waveform()).toBeInTheDocument();
    expect(waveform()?.getAttribute("data-active")).toBe("false");

    // waveform again — still mounted, no re-init
    rerenderWith("waveform");
    expect(waveform()).toBeInTheDocument();
    expect(waveform()?.getAttribute("data-active")).toBe("true");
  });
});
