import { AudioPlayerWithProvider } from "./components/AudioPlayer";
import { PlayList } from "./lib/audioContext/StateContext";
import "./style";

const playList: PlayList = [
  {
    name: "Relax And Sleep",
    writer: "Anton Vlasov",
    img: "/images/audio-1.jpg",
    src: "/public/audio/audio-1.mp3",
    id: 1,
    index: 0,
  },
  {
    name: "Don't You Think Lose",
    writer: "Anton Vlasov",
    img: "/images/audio-2.jpg",
    src: "/public/audio/audio-2.mp3",
    id: 2,
    index: 1,
  },
  {
    name: "The Cradle of Your Soul dsdasdasdas",
    writer: "lemonaudiostudio",
    img: "/images/audio-3.jpg",
    src: "/public/audio/audio-3.mp3",
    id: 3,
    index: 2,
  },
  {
    name: "Spirit Blossom",
    writer: "RomanBelov",
    img: "/images/audio-4.jpg",
    src: "/public/audio/audio-4.mp3",
    id: 4,
    index: 3,
  },
  {
    name: "Everything Feels New",
    writer: "EvgenyBardyuzha",
    img: "/images/audio-5.jpg",
    src: "/public/audio/audio-5.mp3",
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
        playerPlacement={"bottom"}
        activeUI={{
          all: true,
          trackTime: "separation mode",
          progress: "waveform",
        }}
        interfacePlacement={{
          templateArea: {
            trackTimeDuration: "row1-5",
            progress: "row1-4",
            playButton: "row1-6",
            repeatType: "row1-7",
            volume: "row1-8",
          },
        }}
      />
    </div>
  );
}

export default App;
