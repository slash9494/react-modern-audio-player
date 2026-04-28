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
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useTimeContext } from "@/components/AudioPlayer/Context/hooks/useTimeContext";

export const useAudio = (): HTMLAttributes<HTMLAudioElement> => {
  const {
    isPlaying,
    volume: playbackVolume,
    repeatType,
    audioResetKey,
    playbackRate,
  } = usePlaybackContext();
  const { currentTime: playbackCurrentTime, seekRequestKey } = useTimeContext();
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
        audioPlayerDispatch({ type: "SEEK", time: 0 });
      });
      elementRefs.audioEl.play();
      return;
    }
    audioPlayerDispatch({ type: "NEXT_AUDIO" });
  }, [audioPlayerDispatch, repeatType, elementRefs?.audioEl]);

  // Browsers reset audioEl.volume and audioEl.playbackRate to their defaults
  // on src change, and the standalone sync effects don't re-fire (same audioEl
  // ref, same React values). Re-apply here so state-driven values survive a
  // track swap.
  const reapplyAfterSrcChange = useCallback(
    (audioEl: HTMLAudioElement) => {
      if (playbackVolume != null) audioEl.volume = playbackVolume;
      if (playbackRate != null) audioEl.playbackRate = playbackRate;
    },
    [playbackVolume, playbackRate]
  );

  const onLoadedMetadata = useCallback(
    (e: SyntheticEvent<HTMLAudioElement, Event>) => {
      const { duration } = e.currentTarget;
      reapplyAfterSrcChange(e.currentTarget);
      audioPlayerDispatch({
        type: "SET_AUDIO_STATE",
        audioState: { isLoadedMetaData: true, duration },
      });
    },
    [audioPlayerDispatch, reapplyAfterSrcChange]
  );

  const hasSkippedInitialResetRef = useRef(false);
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (!hasSkippedInitialResetRef.current) {
      hasSkippedInitialResetRef.current = true;
      return;
    }
    elementRefs.audioEl.currentTime = 0;
  }, [audioResetKey, elementRefs?.audioEl]);

  // Re-runs on audioResetKey bump so a track swap (NEXT_AUDIO, SET_CURRENT_AUDIO,
  // SHUFFLE, etc.) re-issues play() against the new src. Without this, the
  // browser pauses on src change, isPlaying stays true, and effect deps don't
  // change — leaving the new track loaded but silent. Previously this worked
  // only because the wavesurfer onReady path called play() as a side effect.
  useEffect(() => {
    if (!elementRefs?.audioEl) return;
    if (isPlaying) {
      elementRefs.audioEl.play().catch((err) => {
        // AbortError = play() was interrupted (src swap mid-load,
        // pause() called before resolve, element detached, etc.). The
        // interrupting action is the source of truth for the next state,
        // not this catch — flipping isPlaying=false here would cause the
        // recovery path (next play effect run, or wavesurfer onReady)
        // to be cancelled by the resulting pause(). Real failures
        // (NotAllowedError, NotSupportedError, network errors) still need
        // to sync state back to "paused" so the UI matches reality.
        if ((err as DOMException | undefined)?.name === "AbortError") return;
        audioPlayerDispatch({
          type: "SET_AUDIO_STATE",
          audioState: { isPlaying: false },
        });
      });
    } else {
      elementRefs.audioEl.pause();
    }
  }, [elementRefs?.audioEl, isPlaying, audioPlayerDispatch, audioResetKey]);

  useEffect(() => {
    if (!elementRefs?.audioEl || playbackVolume == null) return;
    elementRefs.audioEl.volume = playbackVolume;
  }, [elementRefs?.audioEl, playbackVolume]);

  useEffect(() => {
    if (!elementRefs?.audioEl || playbackRate == null) return;
    elementRefs.audioEl.playbackRate = playbackRate;
  }, [elementRefs?.audioEl, playbackRate]);

  // Apply seeks explicitly signaled by a SEEK dispatch. Keyed on
  // seekRequestKey so ordinary onTimeUpdate echoes (which change
  // playbackCurrentTime) never reach the DOM write path and cannot
  // pull audio backwards when React commits land later than the
  // browser's real playback position.
  const lastAppliedSeekKeyRef = useRef(0);
  useEffect(() => {
    if (seekRequestKey === lastAppliedSeekKeyRef.current) return;
    lastAppliedSeekKeyRef.current = seekRequestKey;

    const audioEl = elementRefs?.audioEl;
    if (!audioEl || playbackCurrentTime == null) return;

    audioEl.currentTime = playbackCurrentTime;

    const waveform = elementRefs?.waveformInst;
    const trackDuration = audioEl.duration;
    const isTrackDurationReady =
      Number.isFinite(trackDuration) && trackDuration > 0;
    if (!waveform || !isTrackDurationReady) return;

    const rawRatio = playbackCurrentTime / trackDuration;
    const clampedRatio = Math.min(1, Math.max(0, rawRatio));
    waveform.seekTo(clampedRatio);
  }, [
    seekRequestKey,
    playbackCurrentTime,
    elementRefs?.audioEl,
    elementRefs?.waveformInst,
  ]);

  return {
    onTimeUpdate,
    onEnded,
    onLoadedMetadata,
  };
};
