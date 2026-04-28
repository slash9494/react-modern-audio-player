import { createContext } from "react";
import { RepeatType } from "./StateContext";

export interface PlaybackContext {
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  repeatType: RepeatType;
  isLoadedMetaData: boolean | undefined;
  audioResetKey: number;
  playbackRate: number;
}

export const playbackContext = createContext<PlaybackContext | null>(null);
playbackContext.displayName = "PlaybackContext";
