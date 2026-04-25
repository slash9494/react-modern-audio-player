import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioPlayerWithProviders, { PlayList } from "../../package/src";

const basePlayList: PlayList = [
  { name: "Track 1", writer: "LYH", img: "", src: "track1.mp3", id: 1 },
  { name: "Track 2", writer: "LYH", img: "", src: "track2.mp3", id: 2 },
];

function createPortalTarget(): HTMLDivElement {
  const element = document.createElement("div");
  element.className = "sortable-play-list";
  document.body.appendChild(element);
  return element;
}

describe("multi-instance playlist portal isolation", () => {
  it("renders two independent <audio> elements for two player instances", () => {
    const { container } = render(
      <>
        <AudioPlayerWithProviders
          playList={basePlayList.map((track) => ({ ...track }))}
          activeUI={{ all: true }}
        />
        <AudioPlayerWithProviders
          playList={basePlayList.map((track) => ({ ...track }))}
          activeUI={{ all: true }}
        />
      </>
    );

    const containers = container.querySelectorAll(".rmap-player-container");
    expect(containers).toHaveLength(2);
    const audios = container.querySelectorAll("audio");
    expect(audios).toHaveLength(2);
    // Distinct DOM nodes — state isolation relies on these refs, not on IDs
    expect(audios[0]).not.toBe(audios[1]);
  });

  it("each instance owns its own .rmap-sortable-playlist portal target", () => {
    const { container } = render(
      <>
        <AudioPlayerWithProviders
          playList={basePlayList.map((track) => ({ ...track }))}
          activeUI={{ all: true }}
        />
        <AudioPlayerWithProviders
          playList={basePlayList.map((track) => ({ ...track }))}
          activeUI={{ all: true }}
        />
      </>
    );
    const targets = container.querySelectorAll(".rmap-sortable-playlist");
    expect(targets).toHaveLength(2);
    expect(targets[0]).not.toBe(targets[1]);
  });
});

describe("playListExpanded (#21)", () => {
  let portalTarget: HTMLDivElement;

  beforeEach(() => {
    portalTarget = createPortalTarget();
  });

  afterEach(() => {
    portalTarget.remove();
  });

  it("drawer starts closed by default", () => {
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        audioInitialState={{ curPlayId: 1 }}
        activeUI={{ all: true }}
      />
    );
    const trigger = screen.getByTestId("playlist-trigger-btn");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("drawer starts open when playListExpanded=true", () => {
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        audioInitialState={{ curPlayId: 1, playListExpanded: true }}
        activeUI={{ all: true }}
      />
    );
    const trigger = screen.getByTestId("playlist-trigger-btn");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});

describe("compound slots (additive)", () => {
  let portalTarget: HTMLDivElement;

  beforeEach(() => {
    portalTarget = createPortalTarget();
  });

  afterEach(() => {
    portalTarget.remove();
  });

  it("static members are attached on default export", () => {
    expect(AudioPlayerWithProviders.Progress).toBeDefined();
    expect(AudioPlayerWithProviders.Volume).toBeDefined();
    expect(AudioPlayerWithProviders.PlayList).toBeDefined();
    expect(AudioPlayerWithProviders.PlayListEmpty).toBeDefined();
    expect(AudioPlayerWithProviders.PlayButton).toBeDefined();
    expect(AudioPlayerWithProviders.RepeatButton).toBeDefined();
    expect(AudioPlayerWithProviders.Artwork).toBeDefined();
    expect(AudioPlayerWithProviders.TrackInfo).toBeDefined();
    expect(AudioPlayerWithProviders.TrackTime).toBeDefined();
    expect(AudioPlayerWithProviders.CustomComponent).toBeDefined();
  });

  it("compound Volume renders alongside preset when activeUI.volume is true", () => {
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: true }}
      >
        <AudioPlayerWithProviders.Volume gridArea="1/5/1/6" />
      </AudioPlayerWithProviders>
    );
    const triggers = screen.getAllByTestId("volume-trigger-btn");
    expect(triggers.length).toBe(2);
  });

  it("compound Volume replaces preset when activeUI.volume is false", () => {
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: true, volume: false }}
      >
        <AudioPlayerWithProviders.Volume gridArea="1/5/1/6" />
      </AudioPlayerWithProviders>
    );
    const triggers = screen.getAllByTestId("volume-trigger-btn");
    expect(triggers.length).toBe(1);
  });

  it("preset mode renders unchanged when no compound children are provided", () => {
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: true }}
      />
    );
    expect(screen.getByTestId("play-btn")).toBeInTheDocument();
    expect(screen.getByTestId("volume-trigger-btn")).toBeInTheDocument();
    expect(screen.getByTestId("repeat-btn")).toBeInTheDocument();
    expect(screen.getByTestId("playlist-trigger-btn")).toBeInTheDocument();
  });

  it("compound Progress renders a bar even when activeUI.progress is false", () => {
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: true, progress: false }}
      >
        <AudioPlayerWithProviders.Progress />
      </AudioPlayerWithProviders>
    );
    // Preset is disabled but the compound is explicitly placed — it must
    // fall back to the "bar" renderer instead of mounting nothing.
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
  });

  it("compound Progress honors explicit type prop over activeUI", () => {
    const { container } = render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: true, progress: "bar" }}
      >
        <AudioPlayerWithProviders.Progress type="waveform" />
      </AudioPlayerWithProviders>
    );
    // Preset renders "bar"; compound renders "waveform". Both should coexist.
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    expect(container.querySelector(".rmap-waveform-wrapper")).not.toBeNull();
  });

  it("grid template preserves a compound slot's area when its preset is disabled (sparse templateArea)", () => {
    const { container } = render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: false, artwork: true, volume: false }}
        placement={{
          interface: {
            templateArea: {
              artwork: "row1-1",
              volume: "row1-2",
            },
          },
        }}
      >
        <AudioPlayerWithProviders.Volume />
      </AudioPlayerWithProviders>
    );
    // Without the effectiveActiveUI fix, the grid would only have one
    // column (artwork alone → maxCol=1) and the compound Volume's default
    // gridArea "row1-2" would fall back to implicit tracks. With the fix
    // the grid template keeps both columns.
    const grid = container.querySelector(
      ".rmap-interface-grid"
    ) as HTMLElement | null;
    expect(grid).not.toBeNull();
    const areas = grid?.style.gridTemplateAreas ?? "";
    expect(areas).toContain("row1-2");
  });

  it("dev-mode warns when compound duplicates a preset", () => {
    // Warning hook no-ops under production — this assertion would silently pass.
    expect(process.env.NODE_ENV).not.toBe("production");
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {
      /* suppress */
    });
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: true }}
      >
        <AudioPlayerWithProviders.Volume gridArea="1/5/1/6" />
      </AudioPlayerWithProviders>
    );
    const messages = warnSpy.mock.calls.map(([firstArg]) => String(firstArg));
    expect(
      messages.some((message) =>
        message.includes("Both preset and compound 'Volume' are rendered")
      )
    ).toBe(true);
    warnSpy.mockRestore();
  });
});

describe("PlayListEmpty compound slot", () => {
  let portalTarget: HTMLDivElement;

  beforeEach(() => {
    portalTarget = createPortalTarget();
  });

  afterEach(() => {
    portalTarget.remove();
  });

  it("renders the fallback content inside the drawer when playList is empty", () => {
    render(
      <AudioPlayerWithProviders
        playList={[]}
        activeUI={{ all: true }}
        audioInitialState={{ playListExpanded: true }}
      >
        <AudioPlayerWithProviders.PlayListEmpty>
          <div data-testid="empty-fallback">No tracks yet</div>
        </AudioPlayerWithProviders.PlayListEmpty>
      </AudioPlayerWithProviders>
    );
    expect(screen.getByTestId("empty-fallback")).toBeInTheDocument();
    expect(screen.getByTestId("empty-fallback")).toHaveTextContent(
      "No tracks yet"
    );
  });

  it("does not render anything inline — the slot is a marker", () => {
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((track) => ({ ...track }))}
        activeUI={{ all: true }}
      >
        <AudioPlayerWithProviders.PlayListEmpty>
          <div data-testid="inline-marker">should never render</div>
        </AudioPlayerWithProviders.PlayListEmpty>
      </AudioPlayerWithProviders>
    );
    // playList is non-empty, so fallback is not shown anywhere
    expect(screen.queryByTestId("inline-marker")).not.toBeInTheDocument();
  });

  it("keeps the default empty behavior (no fallback rendered) when the slot is omitted", () => {
    const { container } = render(
      <AudioPlayerWithProviders
        playList={[]}
        activeUI={{ all: true }}
        audioInitialState={{ playListExpanded: true }}
      />
    );
    const playlistContainer = container.querySelector(
      ".rmap-playlist-container"
    );
    expect(playlistContainer).toBeNull();
  });

  it("does not trigger the duplicate-slot warning", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {
      /* suppress */
    });
    render(
      <AudioPlayerWithProviders
        playList={[]}
        activeUI={{ all: true }}
        audioInitialState={{ playListExpanded: true }}
      >
        <AudioPlayerWithProviders.PlayListEmpty>
          <div>empty</div>
        </AudioPlayerWithProviders.PlayListEmpty>
      </AudioPlayerWithProviders>
    );
    const messages = warnSpy.mock.calls.map(([firstArg]) => String(firstArg));
    expect(
      messages.some((message) =>
        message.includes("Both preset and compound 'PlayListEmpty'")
      )
    ).toBe(false);
    warnSpy.mockRestore();
  });
});
