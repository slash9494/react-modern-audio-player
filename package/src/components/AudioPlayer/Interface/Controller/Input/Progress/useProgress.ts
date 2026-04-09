import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { safeRatio } from "@/utils/safeRatio";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
} from "react";

export const useProgress = (): HTMLAttributes<HTMLDivElement> => {
  const { isLoadedMetaData } = usePlaybackContext();
  const { elementRefs } = useResourceContext();
  const [isTimeChangeActive, setTimeChangeActive] = useState(false);

  const moveAudioTime = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!elementRefs?.audioEl || !isLoadedMetaData) return;
      const { clientX } = e;
      const { clientWidth } = e.currentTarget;
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const curPositionX = clientX - boundingRect.x;
      const curPositionTime =
        safeRatio(curPositionX, clientWidth) * elementRefs.audioEl.duration;
      elementRefs.audioEl.currentTime = curPositionTime;
    },
    [isLoadedMetaData, elementRefs?.audioEl]
  );

  // Block native text selection while user is dragging the progress bar.
  // Uses addEventListener with cleanup so we never leave a stale global
  // handler attached to `document` after unmount or when dragging ends.
  useEffect(() => {
    if (!isTimeChangeActive) return;
    const preventSelection = (event: Event) => event.preventDefault();
    document.addEventListener("selectstart", preventSelection);
    return () => {
      document.removeEventListener("selectstart", preventSelection);
    };
  }, [isTimeChangeActive]);

  return {
    onMouseDown: () => setTimeChangeActive(true),
    onMouseUp: () => setTimeChangeActive(false),
    onMouseLeave: () => setTimeChangeActive(false),
    onMouseMove: isTimeChangeActive ? moveAudioTime : undefined,
    onClick: moveAudioTime,
  };
};
