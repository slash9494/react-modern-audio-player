import AudioPlayer from "../../../package";
// import { SortableList } from "../../node_modules/react-simple-audio-player";

const playList = [
  {
    name: "Relax And Sleep",
    artist: "Anton Vlasov",
    img: "/public/images/audio-1.jpg",
    src: "/public/audio/audio-1.mp3",
    id: 1,
  },
  {
    name: "Don't You Think Lose",
    artist: "Anton Vlasov",
    img: "/public/images/audio-2.jpg",
    src: "/public/audio/audio-2.mp3",
    id: 2,
  },
  {
    name: "The Cradle of Your Soul",
    artist: "lemonaudiostudio",
    img: "/public/images/audio-3.jpg",
    src: "/public/audio/audio-3.mp3",
    id: 3,
  },
  {
    name: "Spirit Blossom",
    artist: "RomanBelov",
    img: "/public/images/audio-4.jpg",
    src: "/public/audio/audio-4.mp3",
    id: 4,
  },
  {
    name: "Everything Feels New",
    artist: "EvgenyBardyuzha",
    img: "/public/images/audio-5.jpg",
    src: "/public/audio/audio-5.mp3",
    id: 5,
  },
];

const dummyData = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
];
export const Test = () => {
  return (
    <>
      <AudioPlayer
        playList={playList}
        audioInitialState={{ autoPlay: true, muted: true, volume: 0.5 }}
      />
      {/* <SortableList
        data={dummyData}
        renderItem={(dummyData, index) => (
          <div key={index}>{dummyData.name}</div>
        )}
        onDropCb={(newData) => console.log(newData)}
      /> */}
    </>
  );
};
