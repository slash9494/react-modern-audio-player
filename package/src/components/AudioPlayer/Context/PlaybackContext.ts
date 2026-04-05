import { createContext } from "react";
import { AudioState } from "./StateContext";

export interface PlaybackContext {
  curAudioState: AudioState;
  audioResetKey: number;
}

export const playbackContext = createContext<PlaybackContext | null>(null);
