import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { formatClockTime } from "@/utils/getTime";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { safeRatio } from "@/utils/safeRatio";
import { ProgressTooltip } from "./ProgressTooltip";
import { useProgress, useProgressKeyDown, useWaveSurfer } from "./hooks";
import type { WaveformModeResult } from "./hooks";
import { useAutoPlacement } from "@/components/AudioPlayer/Interface/hooks";
import "./WaveformProgress.css";

export const WaveformProgress: FC<{
  isActive: boolean;
  waveformMode: WaveformModeResult;
}> = ({ isActive, waveformMode }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const { isLoadedMetaData, isPlaying } = usePlaybackContext();
  const { elementRefs } = useResourceContext();
  const { timeTooltipPlacement } = useUIContext();

  const autoPlacement = useAutoPlacement({
    triggerRef: wrapperRef,
    initialState: "top",
  });
  const tooltipPlacement =
    timeTooltipPlacement ?? (autoPlacement === "bottom" ? "bottom" : "top");

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    setWrapperWidth(el.offsetWidth);
    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setWrapperWidth(entry.contentBoxSize[0].inlineSize);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  const { isWaveformReady } = useWaveSurfer(waveformRef, waveformMode);

  useEffect(() => {
    if (
      !isActive ||
      !elementRefs?.waveformInst ||
      !elementRefs?.audioEl ||
      !isLoadedMetaData ||
      isPlaying
    )
      return;

    const ratio = safeRatio(
      elementRefs.audioEl.currentTime,
      elementRefs.audioEl.duration
    );
    elementRefs.waveformInst.seekTo(ratio);
  }, [
    isActive,
    isLoadedMetaData,
    elementRefs?.waveformInst,
    elementRefs?.audioEl,
    isPlaying,
  ]);

  const { progressProps, previewRatio, hoverRatio } = useProgress();

  const isDragging = previewRatio != null;

  const onSeek = useCallback(
    (newTime: number, duration: number) => {
      if (!duration) return;
      elementRefs?.waveformInst?.seekTo(safeRatio(newTime, duration));
    },
    [elementRefs?.waveformInst]
  );
  const handleKeyDown = useProgressKeyDown(onSeek);

  const currentTime = elementRefs?.audioEl?.currentTime ?? 0;
  const duration = elementRefs?.audioEl?.duration ?? 0;
  const sliderRatio = previewRatio ?? safeRatio(currentTime, duration);

  return (
    <div
      ref={wrapperRef}
      className="rmap-waveform-wrapper"
      data-active={isActive}
      data-ready={isWaveformReady}
    >
      {isActive && !isWaveformReady && (
        <div className="rmap-waveform-skeleton" aria-hidden="true" />
      )}
      {/* Cursor-only mid-drag: the fill recommits after useProgress's debounce, so it must not stretch yet. */}
      {isDragging && (
        <div
          className="rmap-waveform-cursor"
          style={{ transform: `translateX(${previewRatio * 100}%)` }}
        />
      )}
      <div
        id="rm-waveform"
        ref={waveformRef}
        role="slider"
        tabIndex={isActive ? 0 : -1}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderRatio * 100)}
        aria-valuetext={`${formatClockTime(currentTime)} of ${formatClockTime(
          duration
        )}`}
        onKeyDown={handleKeyDown}
        {...progressProps}
      />
      <ProgressTooltip
        ratio={previewRatio ?? hoverRatio}
        duration={duration}
        placement={tooltipPlacement}
        containerWidth={wrapperWidth}
      />
    </div>
  );
};
