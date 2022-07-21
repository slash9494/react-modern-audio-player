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

const playList: PlayList = [
  {
    name: "Relax And Sleep",
    writer: "Anton Vlasov",
    img: `${audio1Img}`,
    src: `${audio1}`,
    id: 1,
    index: 0,
  },
  {
    name: "audio1on't You Think Lose",
    writer: "Anton Vlasov",
    img: `${audio2Img}`,
    src: `${audio2}`,
    id: 2,
    index: 1,
  },
  {
    name: "The Cradle of Your Soul dsdasdasdas",
    writer: "lemonaudiostudio",
    img: `${audio3Img}`,
    src: `${audio3}`,
    id: 3,
    index: 2,
  },
  {
    name: "Spirit Blossom",
    writer: "RomanBelov",
    img: `${audio4Img}`,
    src: `${audio4}`,
    id: 4,
    index: 3,
  },
  {
    name: "Everything Feels New",
    writer: "EvgenyBardyuzha",
    img: `${audio5Img}`,
    src: `${audio5}`,
    id: 5,
    index: 4,
  },
];

function App() {
  return (
    <div>
      <AudioPlayerWithProvider
        playList={playList}
        audioInitialState={{
          muted: true,
          volume: 0.2,
          curPlayId: 1,
        }}
        placement={{
          interface: {
            templateArea: {
              trackTimeDuration: "row1-5",
              progress: "row1-4",
              playButton: "row1-6",
              repeatType: "row1-7",
              volume: "row1-8",
            },
          },
          player: "bottom",
        }}
        activeUI={{
          all: true,
          trackTime: "separation-mode",
        }}
      />
    </div>
  );
}

export default App;
