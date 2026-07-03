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
};

export const useProgress = (): UseProgressResult => {
  const { isLoadedMetaData } = usePlaybackContext();
  const { elementRefs } = useResourceContext();
  const curTrack = useCurrentTrack();
  const [isTimeChangeActive, setTimeChangeActive] = useState(false);
  const [previewRatio, setPreviewRatio] = useState<number | null>(null);

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
    (e: MouseEvent<HTMLDivElement>): { ratio: number; time: number } | null => {
      if (!elementRefs?.audioEl || !isLoadedMetaData) return null;
      if (isLiveTrack(curTrack, elementRefs.audioEl.duration)) return null;
      const { clientX } = e;
      const { clientWidth } = e.currentTarget;
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const curPositionX = clientX - boundingRect.x;
      const ratio = safeRatio(curPositionX, clientWidth);
      const time = ratio * elementRefs.audioEl.duration;
      return { ratio, time };
    },
    [isLoadedMetaData, elementRefs?.audioEl, curTrack]
  );

  const moveAudioTime = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const seekTarget = getSeekTarget(e);
      if (!seekTarget) return;
      setPreviewRatio(seekTarget.ratio);
      scheduleSeek(seekTarget.time);
    },
    [getSeekTarget, scheduleSeek]
  );

  const clickSeek = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const seekTarget = getSeekTarget(e);
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

  return {
    progressProps: {
      onMouseDown: () => setTimeChangeActive(true),
      onMouseUp: () => {
        setTimeChangeActive(false);
        flushSeek();
        setPreviewRatio(null);
      },
      onMouseLeave: () => {
        setTimeChangeActive(false);
        flushSeek();
        setPreviewRatio(null);
      },
      onMouseMove: isTimeChangeActive ? moveAudioTime : undefined,
      onClick: clickSeek,
    },
    previewRatio,
  };
};
