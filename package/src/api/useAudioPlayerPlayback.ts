import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";
import type { RepeatType } from "@/audioPlayer/Context/state";

export interface AudioPlayerPlaybackControls {
  isPlaying: boolean;
  repeatType: RepeatType;
  playbackRate: number;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setPlaybackRate: (rate: number) => void;
}

/**
 * Subscribes to the playback slice, so it re-renders only on play/pause,
 * repeat, and rate changes. Must run inside a Client Component nested under
 * the player provider, or the context guard throws.
 */
export const useAudioPlayerPlayback = (): AudioPlayerPlaybackControls => {
  const dispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { isPlaying, repeatType, playbackRate } = usePlaybackContext();

  const play = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE", state: true });
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE", state: false });
  }, [dispatch]);

  const togglePlay = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE" });
  }, [dispatch]);

  const setPlaybackRate = useCallback(
    (rate: number) => {
      dispatch({ type: "SET_PLAYBACK_RATE", playbackRate: rate });
    },
    [dispatch]
  );

  return {
    isPlaying,
    repeatType,
    playbackRate,
    play,
    pause,
    togglePlay,
    setPlaybackRate,
  };
};
