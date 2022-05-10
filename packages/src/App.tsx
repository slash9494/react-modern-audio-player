import { MusicPlayerWithProvider } from "./components/MusicPlayer";
import { PlayList } from "./lib/musicContext/StateContext";

const playList: PlayList = [
  {
    name: "Relax And Sleep",
    artist: "Anton Vlasov",
    img: "/public/images/music-1.jpg",
    src: "/public/music/music-1.mp3",
    id: 1,
  },
  {
    name: "Don't You Think Lose",
    artist: "Anton Vlasov",
    img: "/public/images/music-2.jpg",
    src: "/public/music/music-2.mp3",
    id: 2,
  },
  {
    name: "The Cradle of Your Soul",
    artist: "lemonmusicstudio",
    img: "/public/images/music-3.jpg",
    src: "/public/music/music-3.mp3",
    id: 3,
  },
  {
    name: "Spirit Blossom",
    artist: "RomanBelov",
    img: "/public/images/music-4.jpg",
    src: "/public/music/music-4.mp3",
    id: 4,
  },
  {
    name: "Everything Feels New",
    artist: "EvgenyBardyuzha",
    img: "/public/images/music-5.jpg",
    src: "/public/music/music-5.mp3",
    id: 5,
  },
];

function App() {
  return (
    <div>
      <MusicPlayerWithProvider
        playList={playList}
        audioInitialState={{ autoPlay: true, muted: true, volume: 0.5 }}
        cssStyle={{ width: "500px" }}
      />
    </div>
  );
}

export default App;
