import { ReactElement } from "react";
import { AudioData } from "./audio";

export type PlayList = Array<AudioData>;

export type ActiveUI = Partial<{
  all: boolean;
  playButton: boolean;
  playList: boolean;
  prevNnext: boolean;
  volume: boolean;
  repeatType: boolean;
  trackTime: boolean;
  trackInfo: boolean;
  artwork: boolean;
  progress: "waveform" | "bar" | false;
}>;

export type IconImgs = Partial<{
  play: ReactElement<HTMLElement>;
  pause: ReactElement<HTMLElement>;
  prev: ReactElement<HTMLElement>;
  next: ReactElement<HTMLElement>;
  repeatOne: ReactElement<HTMLElement>;
  repeatAll: ReactElement<HTMLElement>;
  repeatNone: ReactElement<HTMLElement>;
  repeatShuffle: ReactElement<HTMLElement>;
  volumeFull: ReactElement<HTMLElement>;
  volumeHalf: ReactElement<HTMLElement>;
  muted: ReactElement<HTMLElement>;
  dropDown: ReactElement<HTMLElement>;
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
