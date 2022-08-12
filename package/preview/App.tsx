import { AudioPlayerWithProvider } from "@/components/AudioPlayer";
import { PlayList } from "@/components/AudioPlayer/Context";
import audio1 from "./assets/audio/audio-1.mp3";
import audio1Img from "./assets/images/audio-1.jpg";
import audio2 from "./assets/audio/audio-2.mp3";
import audio2Img from "./assets/images/audio-2.jpg";
import audio3 from "./assets/audio/audio-3.mp3";
import audio3Img from "./assets/images/audio-3.jpg";
import audio4 from "./assets/audio/audio-4.mp3";
import audio4Img from "./assets/images/audio-4.jpg";
import audio5 from "./assets/audio/audio-5.mp3";
import audio5Img from "./assets/images/audio-5.jpg";
import PlayerLogo from "./assets/images/noname.png";

// TODO : test
const playList: PlayList = [
  {
    name: "React Modern Audio Player-1",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: `${audio1}`,
    id: 1,
    index: 0,
  },
  {
    name: "React Modern Audio Player-2",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: `${audio2}`,
    id: 2,
    index: 1,
  },
  {
    name: "React Modern Audio Player-3",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: `${audio3}`,
    id: 3,
    index: 2,
  },
  {
    name: "React Modern Audio Player-4",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: `${audio4}`,
    id: 4,
    index: 3,
  },
  {
    name: "React Modern Audio Player-5",
    writer: "LYH",
    img: `${PlayerLogo}`,
    src: `${audio5}`,
    id: 5,
    index: 4,
  },
];

function App() {
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
      </h1>
      <div>
        <AudioPlayerWithProvider playList={playList} />
      </div>
    </div>
  );
}

export default App;
