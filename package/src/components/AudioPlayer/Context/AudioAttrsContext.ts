import { createContext } from "react";
import { AudioNativeProps } from "./StateContext";

/**
 * Native HTML <audio> attributes that the consumer passes through
 * `audioInitialState`. Held in its own context so the <Audio> element can
 * spread them onto the underlying media element without forcing every
 * playback consumer to re-render whenever a primitive playback field
 * (isPlaying / volume / muted / repeatType / isLoadedMetaData) changes.
 *
 * Sourced directly from the `audioInitialState` prop, not from reducer
 * state, so the value object is stable across per-tick `SET_AUDIO_STATE`
 * dispatches and only changes when the consumer hands in a new
 * `audioInitialState` reference.
 */
export type AudioAttrsContext = Omit<
  AudioNativeProps,
  "volume" | "muted" | "src"
>;

export const audioAttrsContext = createContext<AudioAttrsContext | null>(null);
audioAttrsContext.displayName = "AudioAttrsContext";
