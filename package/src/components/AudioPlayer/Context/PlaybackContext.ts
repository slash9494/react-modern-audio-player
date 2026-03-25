import { createContext } from "react";
import { AudioState } from "./StateContext";

export interface PlaybackContext {
  curAudioState: AudioState;
}

export const playbackContext = createContext<PlaybackContext | null>(null);
