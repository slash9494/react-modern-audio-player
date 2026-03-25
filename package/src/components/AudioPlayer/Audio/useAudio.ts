import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { HTMLAttributes, SyntheticEvent, useCallback, useEffect } from "react";
import {
  audioPlayerStateContext,
  audioPlayerDispatchContext,
} from "../Context";

export const useAudio = (): HTMLAttributes<HTMLAudioElement> => {
  const { curAudioState, elementRefs, audioResetKey } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      if (event.currentTarget.readyState === 0) return;
      const currentTime = event.currentTarget.currentTime;
      audioPlayerDispatch({
        type: "SET_AUDIO_STATE",
        audioState: { currentTime },
      });
    },
    [audioPlayerDispatch]
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
      const { duration } = e.currentTarget;
      audioPlayerDispatch({
        type: "SET_AUDIO_STATE",
        audioState: { isLoadedMetaData: true, duration },
      });
    },
    [audioPlayerDispatch]
  );

  /** audio reset — triggered by NEXT_AUDIO / PREV_AUDIO via audioResetKey */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    elementRefs.audioEl.currentTime = 0;
    audioPlayerDispatch({
      type: "SET_AUDIO_STATE",
      audioState: { currentTime: 0 },
    });
  }, [audioResetKey]);

  /** play */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (curAudioState.isPlaying) {
      elementRefs.audioEl.play();
    } else {
      elementRefs.audioEl.pause();
    }
  }, [elementRefs?.audioEl, curAudioState.isPlaying, audioPlayerDispatch]);

  /** volume */
  useEffect(() => {
    if (!elementRefs?.audioEl || !curAudioState.volume) return;
    elementRefs.audioEl.volume = curAudioState.volume;
  }, [elementRefs?.audioEl, curAudioState.volume]);

  return {
    onTimeUpdate,
    onEnded,
    onLoadedMetadata,
  };
};
