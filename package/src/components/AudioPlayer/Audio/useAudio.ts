import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  HTMLAttributes,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { flushSync } from "react-dom";
import { audioPlayerDispatchContext } from "../Context";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { useTimeContext } from "@/hooks/context/useTimeContext";

const SEEK_SYNC_THRESHOLD_SEC = 0.25;

export const useAudio = (): HTMLAttributes<HTMLAudioElement> => {
  const {
    isPlaying,
    volume: playbackVolume,
    repeatType,
    audioResetKey,
  } = usePlaybackContext();
  const { currentTime: playbackCurrentTime } = useTimeContext();
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
      // flushSync forces the seek sync effect to write audioEl.currentTime
      // = 0 before play() runs, so the restart starts from 0 and a pending
      // onTimeUpdate at ~end cannot resurrect the stale position.
      flushSync(() => {
        audioPlayerDispatch({
          type: "SET_AUDIO_STATE",
          audioState: { currentTime: 0 },
        });
      });
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

  // Skip the very first audioResetKey effect run so the freshly-mounted
  // <audio> element keeps any consumer-set initial currentTime.
  const hasSkippedInitialResetRef = useRef(false);
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (!hasSkippedInitialResetRef.current) {
      hasSkippedInitialResetRef.current = true;
      return;
    }
    elementRefs.audioEl.currentTime = 0;
  }, [audioResetKey, elementRefs?.audioEl]);

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

  useEffect(() => {
    if (!elementRefs?.audioEl || playbackVolume == null) return;
    elementRefs.audioEl.volume = playbackVolume;
  }, [elementRefs?.audioEl, playbackVolume]);

  useEffect(() => {
    const audioEl = elementRefs?.audioEl;
    if (!audioEl || playbackCurrentTime == null) return;

    const seekDeltaSec = Math.abs(audioEl.currentTime - playbackCurrentTime);
    const isFeedbackFromTimeUpdate = seekDeltaSec <= SEEK_SYNC_THRESHOLD_SEC;
    if (isFeedbackFromTimeUpdate) return;

    audioEl.currentTime = playbackCurrentTime;

    const waveform = elementRefs?.waveformInst;
    const trackDuration = audioEl.duration;
    const isTrackDurationReady =
      Number.isFinite(trackDuration) && trackDuration > 0;
    if (!waveform || !isTrackDurationReady) return;

    const rawRatio = playbackCurrentTime / trackDuration;
    const clampedRatio = Math.min(1, Math.max(0, rawRatio));
    waveform.seekTo(clampedRatio);
  }, [playbackCurrentTime, elementRefs?.audioEl, elementRefs?.waveformInst]);

  return {
    onTimeUpdate,
    onEnded,
    onLoadedMetadata,
  };
};
