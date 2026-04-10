import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import type { RepeatType } from "@/components/AudioPlayer/Context/StateContext";

export interface AudioPlayerPlaybackControls {
  isPlaying: boolean;
  repeatType: RepeatType;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
}

export const useAudioPlayerPlayback = (): AudioPlayerPlaybackControls => {
  const dispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { isPlaying, repeatType } = usePlaybackContext();

  const play = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE", state: true });
  }, [dispatch]);

  const pause = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE", state: false });
  }, [dispatch]);

  const togglePlay = useCallback(() => {
    dispatch({ type: "CHANGE_PLAYING_STATE" });
  }, [dispatch]);

  return { isPlaying, repeatType, play, pause, togglePlay };
};
