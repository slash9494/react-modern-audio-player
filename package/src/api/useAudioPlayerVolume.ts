import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";

export interface AudioPlayerVolumeControls {
  volume: number;
  muted: boolean;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

/**
 * Subscribes to the playback slice shared with `useAudioPlayerPlayback`, so it
 * re-renders on play/pause too. Volume is clamped to [0, 1], with non-finite
 * values falling back to 1. Must run inside a Client Component nested under
 * the player provider, or the guard throws.
 */
export const useAudioPlayerVolume = (): AudioPlayerVolumeControls => {
  const dispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { volume, muted } = usePlaybackContext();

  const setVolume = useCallback(
    (vol: number) => {
      dispatch({ type: "SET_VOLUME", volume: vol });
    },
    [dispatch]
  );

  const toggleMute = useCallback(() => {
    dispatch({ type: "SET_MUTED", muted: !muted });
  }, [dispatch, muted]);

  return { volume, muted, setVolume, toggleMute };
};
