import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  HTMLAttributes,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { audioPlayerDispatchContext } from "../Context";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { useTimeContext } from "@/hooks/context/useTimeContext";

const SEEK_SYNC_THRESHOLD_SEC = 0.25;

export const useAudio = (): HTMLAttributes<HTMLAudioElement> => {
  const { isPlaying, volume, repeatType, audioResetKey } = usePlaybackContext();
  const { currentTime } = useTimeContext();
  const { elementRefs } = useResourceContext();
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
    if (repeatType === "ONE") {
      elementRefs.audioEl.currentTime = 0;
      elementRefs.audioEl.play();
      return;
    }
    audioPlayerDispatch({ type: "NEXT_AUDIO" });
  }, [audioPlayerDispatch, repeatType, elementRefs?.audioEl]);

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

  const hasMountedRef = useRef(false);

  /** audio reset — triggered by NEXT_AUDIO / PREV_AUDIO via audioResetKey */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    elementRefs.audioEl.currentTime = 0;
  }, [audioResetKey, elementRefs?.audioEl]);

  /** play */
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (isPlaying) {
      void elementRefs.audioEl.play().catch(() => {
        audioPlayerDispatch({
          type: "SET_AUDIO_STATE",
          audioState: { isPlaying: false },
        });
      });
    } else {
      elementRefs.audioEl.pause();
    }
  }, [elementRefs?.audioEl, isPlaying, audioPlayerDispatch]);

  /** volume */
  useEffect(() => {
    if (!elementRefs?.audioEl || volume == null) return;
    elementRefs.audioEl.volume = volume;
  }, [elementRefs?.audioEl, volume]);

  /** seek sync — react to external seek() dispatches by writing the
   * target time back to the underlying media element (and waveform cursor
   * when wavesurfer is active). Skipped when the delta is below the
   * timeupdate-tick threshold to avoid feeding back our own onTimeUpdate
   * dispatches into another seek. */
  useEffect(() => {
    const audioEl = elementRefs?.audioEl;
    if (!audioEl || currentTime == null) return;
    if (Math.abs(audioEl.currentTime - currentTime) <= SEEK_SYNC_THRESHOLD_SEC)
      return;
    audioEl.currentTime = currentTime;
    const waveform = elementRefs?.waveformInst;
    if (waveform && audioEl.duration) {
      waveform.seekTo(currentTime / audioEl.duration);
    }
  }, [currentTime, elementRefs?.audioEl, elementRefs?.waveformInst]);

  return {
    onTimeUpdate,
    onEnded,
    onLoadedMetadata,
  };
};
