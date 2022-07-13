import { FC } from "react";
import { PlayList, CurAudioState } from "../../lib/audioContext/StateContext";
export declare type AudioInitialState = Pick<
  CurAudioState,
  "autoPlay" | "muted" | "volume"
>;
export interface AudioPlayerProps {
  playList: PlayList;
  audioInitialState: AudioInitialState;
}
export declare const AudioPlayerWithProvider: FC<AudioPlayerProps>;
