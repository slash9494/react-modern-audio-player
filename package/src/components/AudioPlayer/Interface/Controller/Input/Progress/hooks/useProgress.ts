import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useCurrentTrack } from "@/components/AudioPlayer/Context/hooks/useCurrentTrack";
import { safeRatio } from "@/utils/safeRatio";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import { isLiveTrack } from "./isLiveTrack";

const SEEK_DEBOUNCE_MS = 120;

type UseProgressResult = {
  progressProps: HTMLAttributes<HTMLDivElement>;
  previewRatio: number | null;
  hoverRatio: number | null;
};

export const useProgress = (): UseProgressResult => {
  const { isLoadedMetaData, audioResetKey } = usePlaybackContext();
  const { elementRefs } = useResourceContext();
  const curTrack = useCurrentTrack();
  const [isTimeChangeActive, setTimeChangeActive] = useState(false);
  const [previewRatio, setPreviewRatio] = useState<number | null>(null);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);

  const seekTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSeekTimeRef = useRef<number | null>(null);

  const commitSeek = useCallback(
    (time: number) => {
      if (!elementRefs?.audioEl) return;
      elementRefs.audioEl.currentTime = time;
    },
    [elementRefs?.audioEl]
  );

  const scheduleSeek = useCallback(
    (time: number) => {
      if (seekTimerRef.current) clearTimeout(seekTimerRef.current);
      pendingSeekTimeRef.current = time;
      seekTimerRef.current = setTimeout(() => {
        commitSeek(time);
        pendingSeekTimeRef.current = null;
        seekTimerRef.current = null;
      }, SEEK_DEBOUNCE_MS);
    },
    [commitSeek]
  );

  const flushSeek = useCallback(() => {
    if (pendingSeekTimeRef.current == null) return;
    if (seekTimerRef.current) clearTimeout(seekTimerRef.current);
    const pendingTime = pendingSeekTimeRef.current;
    pendingSeekTimeRef.current = null;
    seekTimerRef.current = null;
    commitSeek(pendingTime);
  }, [commitSeek]);

  const getSeekTarget = useCallback(
    (
      event: MouseEvent<HTMLDivElement>
    ): { ratio: number; time: number } | null => {
      if (!elementRefs?.audioEl || !isLoadedMetaData) return null;
      if (isLiveTrack(curTrack, elementRefs.audioEl.duration)) return null;
      const { clientX } = event;
      const { clientWidth } = event.currentTarget;
      const boundingRect = event.currentTarget.getBoundingClientRect();
      const curPositionX = clientX - boundingRect.x;
      // Integer clientX vs fractional rect.x can push the raw ratio slightly
      // outside [0,1] at the edges — surfacing "--:--" or a time past the end.
      const ratio = Math.min(
        1,
        Math.max(0, safeRatio(curPositionX, clientWidth))
      );
      const time = ratio * elementRefs.audioEl.duration;
      return { ratio, time };
    },
    [isLoadedMetaData, elementRefs?.audioEl, curTrack]
  );

  const moveAudioTime = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const seekTarget = getSeekTarget(event);
      if (!seekTarget) return;
      setPreviewRatio(seekTarget.ratio);
      scheduleSeek(seekTarget.time);
    },
    [getSeekTarget, scheduleSeek]
  );

  const trackHover = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const seekTarget = getSeekTarget(event);
      // null = live track or metadata not loaded: no tooltip either
      setHoverRatio(seekTarget ? seekTarget.ratio : null);
    },
    [getSeekTarget]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      trackHover(event);
      if (isTimeChangeActive) moveAudioTime(event);
    },
    [trackHover, isTimeChangeActive, moveAudioTime]
  );

  const clickSeek = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const seekTarget = getSeekTarget(event);
      if (!seekTarget) return;
      commitSeek(seekTarget.time);
    },
    [getSeekTarget, commitSeek]
  );

  useEffect(() => {
    if (!isTimeChangeActive) return;
    const preventSelection = (event: Event) => event.preventDefault();
    document.addEventListener("selectstart", preventSelection);
    return () => {
      document.removeEventListener("selectstart", preventSelection);
    };
  }, [isTimeChangeActive]);

  useEffect(
    () => () => {
      if (seekTimerRef.current) clearTimeout(seekTimerRef.current);
    },
    []
  );

  useEffect(() => {
    if (seekTimerRef.current) clearTimeout(seekTimerRef.current);
    seekTimerRef.current = null;
    pendingSeekTimeRef.current = null;
    setPreviewRatio(null);
    setHoverRatio(null);
    setTimeChangeActive(false);
  }, [curTrack?.id, audioResetKey]);

  return {
    progressProps: {
      onMouseDown: () => setTimeChangeActive(true),
      onMouseUp: () => {
        setTimeChangeActive(false);
        flushSeek();
        setPreviewRatio(null);
        // Touch taps synthesize mousemove but never mouseleave, pinning the
        // tooltip; clearing here hides it — desktop re-shows on the next move.
        setHoverRatio(null);
      },
      onMouseLeave: () => {
        setTimeChangeActive(false);
        flushSeek();
        setPreviewRatio(null);
        setHoverRatio(null);
      },
      onMouseMove: handleMouseMove,
      onClick: clickSeek,
    },
    previewRatio,
    hoverRatio,
  };
};
