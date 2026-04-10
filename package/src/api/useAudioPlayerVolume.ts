import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";

export interface AudioPlayerVolumeControls {
  volume: number;
  muted: boolean;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

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
