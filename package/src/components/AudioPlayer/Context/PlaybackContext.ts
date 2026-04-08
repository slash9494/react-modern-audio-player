import { createContext } from "react";
import { RepeatType } from "./StateContext";

export interface PlaybackContext {
  isPlaying: boolean | undefined;
  volume: number | undefined;
  muted: boolean | undefined;
  repeatType: RepeatType;
  isLoadedMetaData: boolean | undefined;
  audioResetKey: number;
}

export const playbackContext = createContext<PlaybackContext | null>(null);
