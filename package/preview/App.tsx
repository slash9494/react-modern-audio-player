import PlayerLogo from "./assets/images/noname.png";
import { useState } from "react";
import AudioPlayerWithProviders, {
  ActiveUI,
  AudioPlayerStateContext,
  CustomIcons,
  InterfacePlacement,
  PlayerPlacement,
  PlayList,
  PlayListPlacement,
  VolumeSliderPlacement,
} from "../src";

const playList: PlayList = [
  {
    name: "Track 1",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/08/23/audio_d16737dc28.mp3",
    id: 1,
  },
  {
    name: "Track 2",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/01/21/audio_c44fddb424.mp3",
    id: 2,
  },
  {
    name: "Track 3",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/08/03/audio_54ca0ffa52.mp3",
    id: 3,
  },
  {
    name: "Track 4",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/07/25/audio_3266b47d61.mp3",
    id: 4,
  },
  {
    name: "Track 5",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
    id: 5,
  },
];

const initialState = {
  muted: true,
  volume: 0.2,
  curPlayId: 1,
};

interface TestConfig {
  playerPlacement?: PlayerPlacement;
  progressType?: "bar" | "waveform";
  activeUI?: Partial<ActiveUI>;
  interfaceTemplateArea?: InterfacePlacement["templateArea"];
  volumeSliderPlacement?: VolumeSliderPlacement;
  playListPlacement?: PlayListPlacement;
  customIconTestIds?: Partial<Record<keyof CustomIcons, string>>;
}

function parseTestConfig(): TestConfig {
  try {
    const raw = new URLSearchParams(window.location.search).get("config");
    return raw ? (JSON.parse(atob(raw)) as TestConfig) : {};
  } catch {
    return {};
  }
}

function App() {
  const testConfig = parseTestConfig();

  const [progressType, setProgressType] = useState<"bar" | "waveform">(
    testConfig.progressType ?? "bar"
  );
  const [playerPlacement, setPlayerPlacement] = useState<string>(
    testConfig.playerPlacement ?? "static"
  );

  const playListPlacement: PlayListPlacement =
    testConfig.playListPlacement ?? "bottom";

  const placement = {
    interface: {
      templateArea: testConfig.interfaceTemplateArea ?? {},
      customComponentsArea: {
        test1: "row1-10",
      },
    } as InterfacePlacement<11>,
    player: playerPlacement as PlayerPlacement,
    playList: playListPlacement,
    volumeSlider: testConfig.volumeSliderPlacement,
  };

  const activeUI: ActiveUI = testConfig.activeUI ?? {
    all: true,
    progress: progressType as "bar" | "waveform",
  };

  const customIcons: CustomIcons | undefined = testConfig.customIconTestIds
    ? Object.fromEntries(
        Object.entries(testConfig.customIconTestIds).map(([key, testId]) => [
          key,
          <span
            key={key}
            data-testid={testId}
            style={{ display: "inline-block", width: "1em", height: "1em" }}
          />,
        ])
      )
    : undefined;

  const CustomComponent = ({
    audioPlayerState,
  }: {
    audioPlayerState?: AudioPlayerStateContext;
  }) => {
    const audioEl = audioPlayerState?.elementRefs?.audioEl;
    const handOverTime = () => {
      if (audioEl) {
        audioEl.currentTime += 30;
      }
    };
    return (
      <>
        <button onClick={handOverTime}>+30</button>
      </>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: " 100vh",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
        }}
      >
        React modern audio player
        <button
          onClick={() =>
            setProgressType((prev) => (prev === "bar" ? "waveform" : "bar"))
          }
        >
          progress type
        </button>
        <button
          onClick={() => {
            switch (playerPlacement) {
              case "static":
                setPlayerPlacement("top-left");
                break;
              case "top-left":
                setPlayerPlacement("bottom-left");
                break;
              case "bottom-left":
                setPlayerPlacement("static");
                break;
              default:
                break;
            }
          }}
        >
          change player placement
        </button>
      </h1>
      <div>
        <AudioPlayerWithProviders
          playList={playList}
          audioInitialState={initialState}
          placement={placement}
          activeUI={activeUI}
          customIcons={customIcons}
        >
          <AudioPlayerWithProviders.CustomComponent id="test1">
            <CustomComponent />
          </AudioPlayerWithProviders.CustomComponent>
        </AudioPlayerWithProviders>
      </div>
    </div>
  );
}

export default App;
