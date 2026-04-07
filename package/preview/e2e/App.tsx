import { ReactElement } from "react";
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
 * `/e2e.html?config=base64(json)` to drive deterministic UI scenarios.
 * Every field in the config overrides a default; missing fields fall back
 * to the values used by the e2e suite (which were the original demo defaults
 * before the codesandbox-style demo was introduced).
 *
 * This file is intentionally minimal: no Editor controls, no demo
 * `CustomComponent`, no theme cycling — exactly what the test contract
 * needs and nothing else. The "demo" experience lives in `App.tsx`
 * (loaded by `index.html`), which is decoupled from this fixture.
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

  return (
    <div style={{ width: "100%", padding: "1rem", boxSizing: "border-box" }}>
      <AudioPlayerWithProviders
        playList={playList}
        audioInitialState={initialState}
        activeUI={{
          ...((config.activeUI as ActiveUI) ?? { all: true }),
          progress: config.progressType ?? "bar",
        }}
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
    </div>
  );
}

export default App;
