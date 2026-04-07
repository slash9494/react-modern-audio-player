import { useState } from "react";
import { Agentation } from "agentation";
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
              player: PlayerPlacement;
              interface: InterfacePlacement<11>;
              playList: PlayListPlacement;
              volumeSlider: VolumeSliderPlacement | undefined;
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

        {process.env.NODE_ENV === "development" && (
          <Agentation endpoint="http://localhost:4747" />
        )}
      </div>

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
