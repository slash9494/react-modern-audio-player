import { ReactNode } from "react";

export type AudioNativeProps = Omit<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  "autoPlay"
>;

export type RepeatType = "ALL" | "SHUFFLE" | "ONE" | "NONE";
export type AudioCustomProps = {
  isPlaying: boolean;
  repeatType?: RepeatType;
  volume: number;
  currentTime?: number;
  duration?: number;
};

export type AudioData = {
  src: string;
  id: number;
  name?: string | ReactNode;
  writer?: string | ReactNode;
  img?: string;
  description?: string | ReactNode;
  customTrackInfo?: string | ReactNode;
};

export type CurAudioState = AudioNativeProps & AudioCustomProps;
export type AudioInitialState = Partial<CurAudioState> & {
  curPlayId: number;
};
