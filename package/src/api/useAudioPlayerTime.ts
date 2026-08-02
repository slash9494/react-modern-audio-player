import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audio-player/Context/dispatchContext";
import { useTimeContext } from "@/audio-player/Context/hooks/useTimeContext";

export interface AudioPlayerTimeControls {
  currentTime: number;
  duration: number;
  seek: (time: number) => void;
}

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
