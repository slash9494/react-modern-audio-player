import { render } from "@testing-library/react";
import AudioPlayerWithProviders, {
  PlayList,
  ActiveUI,
} from "../../../package/src";

const playList: PlayList = [
  { name: "Track 1", writer: "LYH", img: "", src: "track1.mp3", id: 1 },
  { name: "Track 2", writer: "LYH", img: "", src: "track2.mp3", id: 2 },
  { name: "Track 3", writer: "LYH", img: "", src: "track3.mp3", id: 3 },
  { name: "Track 4", writer: "LYH", img: "", src: "track4.mp3", id: 4 },
  { name: "Track 5", writer: "LYH", img: "", src: "track5.mp3", id: 5 },
];

const audioInitialState = { muted: true, volume: 0.2, curPlayId: 1 };
const activeUI: ActiveUI = { all: true, progress: "bar" };

export function renderPlayer() {
  return render(
    <AudioPlayerWithProviders
      playList={playList}
      audioInitialState={audioInitialState}
      activeUI={activeUI}
    />
  );
}
