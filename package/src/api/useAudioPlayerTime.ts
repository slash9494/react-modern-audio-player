import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audioPlayer/Context/dispatchContext";
import { useTimeContext } from "@/audioPlayer/Context/hooks/useTimeContext";

export interface AudioPlayerTimeControls {
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
}

/**
 * Subscribes to the time slice, which advances on every `timeupdate` tick —
 * the most re-render-heavy of the sub-hooks. Must run inside a Client
 * Component nested under the player provider, or the context guard throws.
 */
export const useAudioPlayerTime = (): AudioPlayerTimeControls => {
  const dispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { currentTime, duration } = useTimeContext();

  const seek = useCallback(
    (time: number) => {
      dispatch({ type: "SEEK", time });
    },
    [dispatch]
  );

  return { currentTime, duration, seek };
};
