import { useCallback } from "react";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { useTimeContext } from "@/hooks/context/useTimeContext";

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
