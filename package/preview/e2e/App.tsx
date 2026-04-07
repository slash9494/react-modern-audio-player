import { ReactElement, useState } from "react";
import AudioPlayerWithProviders, {
  ActiveUI,
  CustomIcons,
  InterfaceGridTemplateArea,
  InterfacePlacement,
  PlayerPlacement,
  PlayListPlacement,
  ProgressUI,
  VolumeSliderPlacement,
} from "../../src";
import { playList } from "../playList";

/**
 * E2E test fixture entry.
 *
 * Playwright fixtures (`test/e2e/fixtures/player.fixture.ts`) navigate to
 * `/preview/e2e/?config=base64(json)` to drive deterministic UI scenarios.
 * Every field in the config overrides a default; missing fields fall back
 * to the values used by the e2e suite.
 *
 * Intentionally minimal: only the controls the e2e specs interact with —
 * a "change progress type" toggle (used by progress-switch.spec.ts to
 * test in-page bar↔waveform transitions). No demo widgets, no codesandbox
 * styling. The "demo" experience lives in `preview/App.tsx` and is
 * decoupled from this fixture.
 */

const initialState = {
  muted: true,
  volume: 0.2,
  curPlayId: 1,
};

interface TestConfig {
  playerPlacement?: PlayerPlacement;
  progressType?: ProgressUI;
  activeUI?: Partial<ActiveUI>;
  interfaceTemplateArea?: InterfaceGridTemplateArea;
  volumeSliderPlacement?: VolumeSliderPlacement;
  playListPlacement?: PlayListPlacement;
  customIconTestIds?: Partial<Record<keyof CustomIcons, string>>;
}

function parseTestConfig(): TestConfig {
  if (typeof window === "undefined") return {};
  try {
    const raw = new URLSearchParams(window.location.search).get("config");
    return raw ? (JSON.parse(atob(raw)) as TestConfig) : {};
  } catch {
    return {};
  }
}

function App() {
  const config = parseTestConfig();

  // When the test does NOT supply its own activeUI, default to "all on +
  // bar progress" so legacy specs (e.g. ui-placement) that only configure
  // templateArea still see a mounted BarProgress. When the test DOES supply
  // activeUI, we honor it verbatim — that path drives presence/absence
  // assertions like `{ all: false, playButton: true } → only play-btn`,
  // and silently injecting a default `progress: "bar"` would re-mount the
  // bar and break those specs.
  const hasActiveUIOverride = config.activeUI !== undefined;
  const [progressType, setProgressType] = useState<ProgressUI | undefined>(
    config.progressType ?? (hasActiveUIOverride ? undefined : "bar")
  );

  const customIcons: CustomIcons | undefined = config.customIconTestIds
    ? (Object.fromEntries(
        Object.entries(config.customIconTestIds).map(([key, testId]) => [
          key,
          <span
            key={key}
            data-testid={testId}
            style={{ display: "inline-block", width: "1em", height: "1em" }}
          />,
        ])
      ) as Record<keyof CustomIcons, ReactElement>)
    : undefined;

  const activeUI: ActiveUI = {
    ...((config.activeUI as ActiveUI) ?? { all: true }),
    ...(progressType !== undefined && { progress: progressType }),
  };

  return (
    <div style={{ width: "100%", padding: "1rem", boxSizing: "border-box" }}>
      <AudioPlayerWithProviders
        playList={playList}
        audioInitialState={initialState}
        activeUI={activeUI}
        customIcons={customIcons}
        placement={
          {
            player: config.playerPlacement ?? "static",
            interface: {
              templateArea: config.interfaceTemplateArea ?? {},
            },
            playList: config.playListPlacement ?? "bottom",
            volumeSlider: config.volumeSliderPlacement,
          } as {
            player: PlayerPlacement;
            interface: InterfacePlacement;
            playList: PlayListPlacement;
            volumeSlider: VolumeSliderPlacement | undefined;
          }
        }
      />

      {/*
        In-page toggle used by progress-switch.spec.ts (7-6, 7-10, 7-11) to
        flip between bar and waveform without a page reload, so wavesurfer
        re-init / position-preservation paths can be exercised.
       */}
      <button
        type="button"
        onClick={() =>
          setProgressType((prev) => (prev === "waveform" ? "bar" : "waveform"))
        }
        style={{ marginTop: "1rem" }}
      >
        change progress type
      </button>
    </div>
  );
}

export default App;
