import PlayerLogo from "./assets/images/noname.png";
import { useState } from "react";
import { AudioPlayerWithProvider, PlayerPlacement, PlayList } from "../src";
const playList: PlayList = [
  {
    name: "React Modern Audio Player-1",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/08/23/audio_d16737dc28.mp3",
    id: 1,
  },
  {
    name: "React Modern Audio Player-1",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3",
    id: 2,
  },
  {
    name: "React Modern Audio Player-1",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/08/03/audio_54ca0ffa52.mp3",
    id: 3,
  },
  {
    name: "React Modern Audio Player-1",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: "https://cdn.pixabay.com/audio/2022/07/25/audio_3266b47d61.mp3",
    id: 4,
  },
  {
    name: "React Modern Audio Player-1",
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

function App() {
  const [progressType, setProgressType] = useState("waveform");
  const [playerPlacement, setPlayerPlacement] = useState("static");
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
          button
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
        <AudioPlayerWithProvider
          playList={playList}
          audioInitialState={initialState}
          placement={{
            interface: {
              templateArea: {
                playList: "row1-3",
                progress: "row2-2",
                playButton: "row3-2",
                repeatType: "row3-3",
                volume: "row3-1",
                trackTimeCurrent: "row2-1",
                trackTimeDuration: "row2-3",
              },
            },
            player: playerPlacement as PlayerPlacement,
          }}
          activeUI={{
            // all: true,
            progress: progressType as "bar" | "waveform",
            playButton: true,
            repeatType: true,
            volume: true,
            playList: "sortable",
            prevNnext: true,
            trackTime: true,
          }}
        />
      </div>
    </div>
  );
}

export default App;
