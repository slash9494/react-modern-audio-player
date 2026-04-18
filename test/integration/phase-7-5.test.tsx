import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioPlayerWithProviders, { PlayList } from "../../package/src";

const basePlayList: PlayList = [
  { name: "Track 1", writer: "LYH", img: "", src: "track1.mp3", id: 1 },
  { name: "Track 2", writer: "LYH", img: "", src: "track2.mp3", id: 2 },
];

function createPortalTarget(): HTMLDivElement {
  const el = document.createElement("div");
  el.className = "sortable-play-list";
  document.body.appendChild(el);
  return el;
}

describe("Phase 7.5 — multi-instance unique ID (#11/#15)", () => {
  let portalTarget: HTMLDivElement;

  beforeEach(() => {
    portalTarget = createPortalTarget();
  });

  afterEach(() => {
    portalTarget.remove();
  });

  it("renders two players with distinct container IDs", () => {
    const { container } = render(
      <>
        <AudioPlayerWithProviders
          playList={basePlayList.map((t) => ({ ...t }))}
          activeUI={{ all: true }}
        />
        <AudioPlayerWithProviders
          playList={basePlayList.map((t) => ({ ...t }))}
          activeUI={{ all: true }}
        />
      </>
    );

    const containers = container.querySelectorAll(".rmap-player-container");
    expect(containers).toHaveLength(2);
    const [first, second] = Array.from(containers);
    expect(first.id).toMatch(/^rm-audio-player-/);
    expect(second.id).toMatch(/^rm-audio-player-/);
    expect(first.id).not.toBe(second.id);
  });

  it("ids do not contain colons (safe for CSS/JS selectors)", () => {
    const { container } = render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((t) => ({ ...t }))}
        activeUI={{ all: true }}
      />
    );
    const playerEl = container.querySelector(".rmap-player-container");
    expect(playerEl?.id).toBeTruthy();
    expect(playerEl?.id).not.toContain(":");
  });

  it("audio element ID is derived from the player instance ID", () => {
    const { container } = render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((t) => ({ ...t }))}
        activeUI={{ all: true }}
      />
    );
    const audio = container.querySelector("audio");
    expect(audio?.id).toMatch(/^rm-audio-player-audio-/);
  });
});

describe("Phase 7.5 — playListExpanded (#21)", () => {
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
        playList={basePlayList.map((t) => ({ ...t }))}
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
        playList={basePlayList.map((t) => ({ ...t }))}
        audioInitialState={{ curPlayId: 1, playListExpanded: true }}
        activeUI={{ all: true }}
      />
    );
    const trigger = screen.getByTestId("playlist-trigger-btn");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Phase 7.5 — compound slots (additive)", () => {
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
        playList={basePlayList.map((t) => ({ ...t }))}
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
        playList={basePlayList.map((t) => ({ ...t }))}
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
        playList={basePlayList.map((t) => ({ ...t }))}
        activeUI={{ all: true }}
      />
    );
    expect(screen.getByTestId("play-btn")).toBeInTheDocument();
    expect(screen.getByTestId("volume-trigger-btn")).toBeInTheDocument();
    expect(screen.getByTestId("repeat-btn")).toBeInTheDocument();
    expect(screen.getByTestId("playlist-trigger-btn")).toBeInTheDocument();
  });

  it("dev-mode warns when compound duplicates a preset", () => {
    // Warning hook no-ops under production — this assertion would silently pass.
    expect(process.env.NODE_ENV).not.toBe("production");
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {
      /* suppress */
    });
    render(
      <AudioPlayerWithProviders
        playList={basePlayList.map((t) => ({ ...t }))}
        activeUI={{ all: true }}
      >
        <AudioPlayerWithProviders.Volume gridArea="1/5/1/6" />
      </AudioPlayerWithProviders>
    );
    const messages = warnSpy.mock.calls.map((c) => String(c[0]));
    expect(
      messages.some((m) =>
        m.includes("Both preset and compound 'Volume' are rendered")
      )
    ).toBe(true);
    warnSpy.mockRestore();
  });
});
