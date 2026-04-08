import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import React, { useCallback } from "react";

export const useProgressKeyDown = (
  onSeek?: (newTime: number, duration: number) => void
) => {
  const { isLoadedMetaData } = usePlaybackContext();
  const { elementRefs } = useResourceContext();

  return useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!elementRefs?.audioEl || !isLoadedMetaData) return;
      const audio = elementRefs.audioEl;
      let newTime: number | null = null;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          newTime = Math.min(audio.currentTime + 5, audio.duration);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          newTime = Math.max(audio.currentTime - 5, 0);
          break;
        case "Home":
          event.preventDefault();
          newTime = 0;
          break;
        case "End":
          event.preventDefault();
          newTime = audio.duration;
          break;
        default:
          break;
      }
      if (newTime !== null && isFinite(audio.duration)) {
        audio.currentTime = newTime;
        onSeek?.(newTime, audio.duration);
      }
    },
    [elementRefs?.audioEl, isLoadedMetaData, onSeek]
  );
};
