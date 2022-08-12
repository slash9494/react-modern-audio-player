import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { resetAudioValues } from "@/utils/resetAudioValues";
import { HTMLAttributes, SyntheticEvent, useCallback, useEffect } from "react";
import {
  audioPlayerStateContext,
  audioPlayerDispatchContext,
} from "../Context";

export const useBasicAudio = (): HTMLAttributes<HTMLAudioElement> => {
  const { curAudioState, elementRefs } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  // TODO : refactor dependency by exporting
  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      if (event.currentTarget.readyState === 0 || !elementRefs) return;
      const currentTime = event.currentTarget.currentTime;
      const duration = event.currentTarget.duration;

      const {
        trackCurTimeEl,
        progressBarEl,
        progressValueEl,
        progressHandleEl,
      } = elementRefs;
      if (trackCurTimeEl) {
        trackCurTimeEl.innerText = getTimeWithPadStart(currentTime);
      }

      if (progressBarEl && progressValueEl && progressHandleEl) {
        const progressBarWidth = progressBarEl.clientWidth;
        const progressHandlePosition =
          (currentTime / duration) * progressBarWidth;

        progressValueEl.style.transform = `scaleX(${currentTime / duration})`;
        progressHandleEl.style.transform = `translateX(${progressHandlePosition}px)`;
      }
    },
    [elementRefs]
  );
  const onEnded = useCallback(() => {
    if (!elementRefs?.audioEl) return;
    if (curAudioState.repeatType === "ONE") {
      elementRefs.audioEl.currentTime = 0;
      elementRefs.audioEl.play();
      return;
    }
    audioPlayerDispatch({ type: "NEXT_AUDIO" });
  }, [audioPlayerDispatch, curAudioState.repeatType, elementRefs?.audioEl]);
  const onLoadedMetadata = useCallback(
    (e: SyntheticEvent<HTMLAudioElement, Event>) => {
      if (!elementRefs) return;
      const { duration } = e.currentTarget;
      resetAudioValues(elementRefs, duration);
    },
    [elementRefs]
  );

  /** play */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (curAudioState.isPlaying) {
      elementRefs?.audioEl.play();
    } else {
      elementRefs?.audioEl.pause();
    }
  }, [elementRefs?.audioEl, curAudioState.isPlaying]);

  /** volume */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    elementRefs.audioEl.volume = curAudioState.volume;
  }, [elementRefs?.audioEl, curAudioState.volume]);

  return {
    onTimeUpdate,
    onEnded,
    onLoadedMetadata,
  };
};
