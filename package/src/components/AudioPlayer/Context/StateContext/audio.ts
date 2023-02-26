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

export type AudioState = AudioNativeProps & AudioCustomProps;
