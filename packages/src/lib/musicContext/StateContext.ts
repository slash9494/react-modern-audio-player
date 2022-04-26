import { createContext } from "react";

export type AudioNativeProps = React.AudioHTMLAttributes<HTMLAudioElement>;
export type AUdioCustomProps = {
  isPlaying: boolean;
  repeatType?: RepeatType;
  volume?: number;
};
export type RepeatType = "ALL" | "SHUFFLE" | "NONE";

export interface AudioData {
  src: string;
  id: number;
  name?: string;
  artist?: string;
  img?: string;
}

export type PlayList = Array<AudioData>;
export type CurAudioState = AudioNativeProps & AUdioCustomProps;

export interface MusicPlayerStateContext {
  playList: PlayList;
  curAudioState: CurAudioState;
}

export const musicPlayerStateContext =
  createContext<MusicPlayerStateContext | null>(null);
