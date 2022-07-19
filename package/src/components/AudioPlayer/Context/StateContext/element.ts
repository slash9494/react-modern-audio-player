import { ReactNode } from "react";
import { AudioData } from "./audio";

export type PlayList = Array<AudioData>;

export type TrackTimeUI = "separation mode" | "unification mode" | false;
export type ProgressUI = "waveform" | "bar" | false;
export type ActiveUI = Partial<{
  all: boolean;
  playButton: boolean;
  playList: boolean;
  prevNnext: boolean;
  volume: boolean;
  repeatType: boolean;
  trackTime: TrackTimeUI;
  trackInfo: boolean;
  artwork: boolean;
  progress: ProgressUI;
}>;

export type CustomIcons = Partial<{
  play: ReactNode;
  pause: ReactNode;
  prev: ReactNode;
  next: ReactNode;
  repeatOne: ReactNode;
  repeatAll: ReactNode;
  repeatNone: ReactNode;
  repeatShuffle: ReactNode;
  volumeFull: ReactNode;
  volumeHalf: ReactNode;
  volumeMuted: ReactNode;
  playList: ReactNode;
}>;

export type ElementRefs = Partial<{
  audioEl: HTMLAudioElement;
  trackCurTimeEl: HTMLSpanElement;
  trackDurationEl: HTMLSpanElement;
  progressBarEl: HTMLDivElement;
  progressValueEl: HTMLDivElement;
  progressHandleEl: HTMLDivElement;
  waveformInst: WaveSurfer;
}>;

export interface CoverImgsCss {
  artwork?: React.CSSProperties;
  listThumbnail?: React.CSSProperties;
}
