import { useState } from "react";
import AudioPlayerWithProviders, {
  ActiveUI,
  InterfaceGridTemplateArea,
  InterfacePlacement,
  PlayerPlacement,
  PlayListPlacement,
  ProgressUI,
  VolumeSliderPlacement,
  useAudioPlayer,
} from "../src";
import { playList } from "./playList";
import Editor from "./Editor";
import {
  CustomComponentsArea,
  defaultCustomComponentsArea,
} from "./playerMode";

/**
 * Demo entry — mirrors the public codesandbox demo at
 * https://codesandbox.io/s/basic-91y82y. Used as the dev playground
 * (`yarn dev` → http://localhost:5173) and what consumers see when they
 * land on the repo. The Playwright e2e fixture lives in `App.e2e.tsx`
 * (loaded via `e2e.html`) so demo refactors cannot break the test contract.
 */

const initialState = {
  muted: true,
  volume: 0.2,
  curPlayId: 1,
};

const CustomComponent = () => {
  const { currentTime, duration, seek, isPlaying, togglePlay } =
    useAudioPlayer();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button onClick={() => seek(currentTime + 30)}>+30s</button>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <span
        style={{
          minWidth: "80px",
          fontVariantNumeric: "tabular-nums",
          margin: "0 2px",
        }}
      >
        {currentTime.toFixed(0)}s / {duration.toFixed(0)}s
      </span>
    </div>
  );
};

function App() {
  const compoundDemo =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("compound") === "1";

  const [progressType, setProgressType] = useState<ProgressUI>("waveform");
  const [playerPlacement, setPlayerPlacement] =
    useState<PlayerPlacement>("bottom-left");
  const [interfacePlacement, setInterfacePlacement] =
    useState<InterfaceGridTemplateArea>();
  const [playListPlacement, setPlayListPlacement] =
    useState<PlayListPlacement>("bottom");
  const [volumeSliderPlacement, setVolumeSliderPlacement] =
    useState<VolumeSliderPlacement>();
  const [theme, setTheme] = useState<"dark" | "light" | undefined>();
  const [width, setWidth] = useState<string>("100%");
  const [activeUI, setActiveUI] = useState<ActiveUI>({ all: true });
  const [customComponentsArea, setCustomComponentsArea] =
    useState<CustomComponentsArea>(defaultCustomComponentsArea);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ margin: 0 }}>React Modern Audio Player</h3>

      <div style={{ width: "100%" }}>
        <AudioPlayerWithProviders
          playList={playList}
          audioInitialState={initialState}
          activeUI={{
            ...activeUI,
            progress: progressType,
          }}
          placement={
            {
              player: playerPlacement,
              interface: {
                templateArea: interfacePlacement,
                customComponentsArea,
              },
              playList: playListPlacement,
              volumeSlider: volumeSliderPlacement,
            } as {
              interface: InterfacePlacement<11>;
            }
          }
          colorScheme={theme}
          rootContainerProps={{
            style: { width },
          }}
        >
          <AudioPlayerWithProviders.CustomComponent id="test1">
            <CustomComponent />
          </AudioPlayerWithProviders.CustomComponent>
        </AudioPlayerWithProviders>

        {/* {process.env.NODE_E지NV === "development" && (
          <Agentation endpoint="http://localhost:4747" />
        )} */}
      </div>

      {compoundDemo && (
        <div
          data-testid="compound-demo"
          style={{ width: "100%", marginTop: "2rem" }}
        >
          <h4 style={{ margin: "0 0 0.5rem" }}>Compound mode demo</h4>
          <AudioPlayerWithProviders
            playList={playList}
            audioInitialState={{ curPlayId: 1, playListExpanded: true }}
            activeUI={{ all: true, volume: false, progress: "bar" }}
            rootContainerProps={{ style: { width: "100%" } }}
          >
            <AudioPlayerWithProviders.Volume />
          </AudioPlayerWithProviders>
        </div>
      )}

      <Editor
        setProgressType={setProgressType}
        setPlayerPlacement={setPlayerPlacement}
        setInterfacePlacement={setInterfacePlacement}
        setPlayListPlacement={setPlayListPlacement}
        setVolumeSliderPlacement={setVolumeSliderPlacement}
        setTheme={setTheme}
        setWidth={setWidth}
        setActiveUI={setActiveUI}
        setCustomComponentsArea={setCustomComponentsArea}
      />
    </div>
  );
}

export default App;
