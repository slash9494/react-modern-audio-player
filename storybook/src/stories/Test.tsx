import AudioPlayer from "../../../package/dist/index.es.js";
import { PlayList } from "../../../package/dist/types/components/AudioPlayer/Context";
// import AudioPlayer from 'react-modern-audio-player';
// import { PlayList } from 'react-modern-audio-player/dist/types/components/AudioPlayer/Context';

const playList: PlayList = [
  {
    name: "Relax And Sleep",
    writer: "Anton Vlasov",
    img: "/images/audio-1.jpg",
    src: "/audio/audio-1.mp3",
    id: 1,
    index: 0,
  },
  {
    name: "Don't You Think Lose",
    writer: "Anton Vlasov",
    img: "/images/audio-2.jpg",
    src: "/audio/audio-2.mp3",
    id: 2,
    index: 1,
  },
  {
    name: "The Cradle of Your Soul dsdasdasdas",
    writer: "lemonaudiostudio",
    img: "/images/audio-3.jpg",
    src: "/audio/audio-3.mp3",
    id: 3,
    index: 2,
  },
  {
    name: "Spirit Blossom",
    writer: "RomanBelov",
    img: "/images/audio-4.jpg",
    src: "/audio/audio-4.mp3",
    id: 4,
    index: 3,
  },
  {
    name: "Everything Feels New",
    writer: "EvgenyBardyuzha",
    img: "/images/audio-5.jpg",
    src: "/audio/audio-5.mp3",
    id: 5,
    index: 4,
  },
];

export const Test = () => {
  return (
    <div>
      <AudioPlayer
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
          // player: "bottom-left",
        }}
        // activeUI={{
        //   all: true,
        //   trackTime: "separation-mode",
        //   // progress: 'waveform',
        // }}
      />
    </div>
  );
};
