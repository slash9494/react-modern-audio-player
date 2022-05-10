import { createContext } from "react";

export type AudioNativeProps = React.AudioHTMLAttributes<HTMLAudioElement>;
export type AUdioCustomProps = {
  isPlaying: boolean;
  repeatType?: RepeatType;
  volume?: number;
  currentTime?: number;
  duration?: number;
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

export interface activeUI {
  playButton: boolean;
  playList: boolean;
  prevNnext: boolean;
  volume: boolean;
  speed: boolean;
  repeatType: boolean;
  musicInfo: boolean;
  time: boolean;
  progressBar: boolean;
}

export type DropdownPlacement = "bottom" | "top";
export type PlayerPlacement =
  | "bottom"
  | "top"
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

export interface MusicPlayerStateContext {
  playList: PlayList;
  curPlayId: number;
  curAudioState: CurAudioState;
  activeUI: Partial<activeUI>;
  dropdownPlacement: DropdownPlacement;
  playerPlacement: PlayerPlacement;
}

export const musicPlayerStateContext =
  createContext<MusicPlayerStateContext | null>(null);
