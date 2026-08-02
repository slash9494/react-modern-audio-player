import { ReactNode } from "react";

export type AudioNativeProps = Omit<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  "autoPlay"
>;

export type RepeatType = "ALL" | "SHUFFLE" | "ONE" | "NONE";
export type AudioCustomProps = {
  isLoadedMetaData?: boolean;
  isPlaying?: boolean;
  repeatType?: RepeatType;
  volume?: number;
  currentTime?: number;
  duration?: number;
  playbackRate?: number;
};

export const DEFAULT_AUDIO_STATE = {
  isPlaying: false,
  volume: 1,
  muted: false,
  repeatType: "ALL" as RepeatType,
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
} as const;

export type AudioData = {
  src: string;
  id: number;
  name?: string;
  writer?: string;
  img?: string;
  description?: string | ReactNode;
  customTrackInfo?: string | ReactNode;
  // Mirrors wavesurfer.js 6.6.4 Peaks shape; forwarded verbatim to waveform.load().
  // TODO : v3 removes wavesurfer — redefine this for the canvas renderer.
  peaks?: number[] | number[][];
  isLive?: boolean;
  preload?: "none" | "metadata" | "auto";
  duration?: number;
};

export type AudioState = AudioNativeProps &
  Omit<AudioCustomProps, "repeatType"> & {
    repeatType: RepeatType;
  };
