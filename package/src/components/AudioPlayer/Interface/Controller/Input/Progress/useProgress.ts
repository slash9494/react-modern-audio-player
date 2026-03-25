import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { HTMLAttributes, useCallback, useState, MouseEvent } from "react";

export const useProgress = (): HTMLAttributes<HTMLDivElement> => {
  const { curAudioState } = usePlaybackContext();
  const { elementRefs } = useResourceContext();
  const [isTimeChangeActive, setTimeChangeActive] = useState(false);

  const moveAudioTime = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!elementRefs?.audioEl || !curAudioState?.isLoadedMetaData) return;
      const { clientX } = e;
      const { clientWidth } = e.currentTarget;
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const curPositionX = clientX - boundingRect.x;
      const curPositionPercent = curPositionX / clientWidth;
      const curPositionTime = curPositionPercent * elementRefs.audioEl.duration;
      elementRefs.audioEl.currentTime = curPositionTime;
    },
    [curAudioState?.isLoadedMetaData, elementRefs?.audioEl]
  );

  const setSelectStartActive = useCallback(
    (state: boolean) => (document.onselectstart = () => state),
    []
  );

  return {
    onMouseDown: () => setTimeChangeActive(true),
    onMouseUp: () => setTimeChangeActive(false),
    onMouseLeave: () => setTimeChangeActive(false),
    onMouseMove: isTimeChangeActive ? moveAudioTime : undefined,
    onClick: moveAudioTime,
    onMouseOver: () => setSelectStartActive(false),
    onMouseOut: () => isTimeChangeActive && setSelectStartActive(true),
  };
};
