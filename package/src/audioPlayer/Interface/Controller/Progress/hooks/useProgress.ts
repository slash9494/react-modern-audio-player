import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/audioPlayer/Context/hooks/useResourceContext";
import { useCurrentTrack } from "@/audioPlayer/Context/hooks/useCurrentTrack";
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

export const SEEK_DEBOUNCE_MS = 120;

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
  // Element captured on mousedown so the document-level drag can measure against
  // it after the pointer leaves the bar (document events have no useful currentTarget).
  const progressElRef = useRef<HTMLDivElement | null>(null);

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
      clientX: number,
      element: HTMLElement
    ): { ratio: number; time: number } | null => {
      if (!elementRefs?.audioEl || !isLoadedMetaData) return null;
      if (isLiveTrack(curTrack, elementRefs.audioEl.duration)) return null;
      const { clientWidth } = element;
      const boundingRect = element.getBoundingClientRect();
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

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const seekTarget = getSeekTarget(event.clientX, event.currentTarget);
      // null = live track or metadata not loaded: no tooltip and no seek.
      setHoverRatio(seekTarget ? seekTarget.ratio : null);
      if (!isTimeChangeActive || !seekTarget) return;
      setPreviewRatio(seekTarget.ratio);
      scheduleSeek(seekTarget.time);
    },
    [getSeekTarget, isTimeChangeActive, scheduleSeek]
  );

  const clickSeek = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const seekTarget = getSeekTarget(event.clientX, event.currentTarget);
      if (!seekTarget) return;
      commitSeek(seekTarget.time);
    },
    [getSeekTarget, commitSeek]
  );

  useEffect(() => {
    if (!isTimeChangeActive) return;

    const handleDocumentMouseMove = (event: globalThis.MouseEvent) => {
      const element = progressElRef.current;
      if (!element) return;
      const seekTarget = getSeekTarget(event.clientX, element);
      // Drives the active seek beyond the bar's bounds; mirrors handleMouseMove.
      setHoverRatio(seekTarget ? seekTarget.ratio : null);
      if (!seekTarget) return;
      setPreviewRatio(seekTarget.ratio);
      scheduleSeek(seekTarget.time);
    };

    const endDrag = () => {
      setTimeChangeActive(false);
      // Idempotent with the element onMouseUp for the same release: flushSeek
      // early-returns once nothing is pending.
      flushSeek();
      setPreviewRatio(null);
      // Released off the bar → no mouseleave fires; clear hover so the tooltip
      // doesn't linger pinned at the clamped edge (mirrors element onMouseUp).
      setHoverRatio(null);
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", endDrag);
    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", endDrag);
    };
  }, [isTimeChangeActive, getSeekTarget, scheduleSeek, flushSeek]);

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
    progressElRef.current = null;
    setPreviewRatio(null);
    setHoverRatio(null);
    setTimeChangeActive(false);
  }, [curTrack?.id, audioResetKey]);

  return {
    progressProps: {
      onMouseDown: (event: MouseEvent<HTMLDivElement>) => {
        progressElRef.current = event.currentTarget;
        setTimeChangeActive(true);
      },
      onMouseUp: () => {
        setTimeChangeActive(false);
        flushSeek();
        setPreviewRatio(null);
        // Touch taps synthesize mousemove but never mouseleave, pinning the
        // tooltip; clearing here hides it — desktop re-shows on the next move.
        setHoverRatio(null);
      },
      onMouseLeave: () => {
        setHoverRatio(null);
        // Document mouseup owns end-of-drag now; only drop the preview when a
        // drag isn't in progress so leaving the bar mid-drag keeps the cursor.
        if (!isTimeChangeActive) setPreviewRatio(null);
      },
      onMouseMove: handleMouseMove,
      onClick: clickSeek,
    },
    previewRatio,
    hoverRatio,
  };
};
