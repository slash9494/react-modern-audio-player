import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { formatClockTime } from "@/utils/getTime";
import { FC, useCallback, useEffect, useRef } from "react";
import { safeRatio } from "@/utils/safeRatio";
import { ProgressTooltip } from "./ProgressTooltip";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";
import { useWaveSurfer } from "./useWavesurfer";
import type { WaveformModeResult } from "./useWaveformMode";
import "./WaveformProgress.css";

export const WaveformProgress: FC<{
  isActive: boolean;
  waveformMode: WaveformModeResult;
}> = ({ isActive, waveformMode }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { isLoadedMetaData, isPlaying } = usePlaybackContext();
  const { elementRefs } = useResourceContext();

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
      <ProgressTooltip ratio={previewRatio ?? hoverRatio} duration={duration} />
    </div>
  );
};
