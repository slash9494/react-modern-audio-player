import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { useTimeContext } from "@/components/AudioPlayer/Context/hooks/useTimeContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { FC, useCallback, useEffect, useRef } from "react";
import { safeRatio } from "@/utils/safeRatio";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";
import { useWaveSurfer } from "./useWavesurfer";
import { useWaveformMode } from "./useWaveformMode";
import "./WaveformProgress.css";

export const WaveformProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { isLoadedMetaData, isPlaying } = usePlaybackContext();
  const { elementRefs } = useResourceContext();

  useWaveSurfer(waveformRef);

  const { mode } = useWaveformMode();

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

  const { progressProps, previewRatio } = useProgress();
  const { currentTime, duration } = useTimeContext();

  // CSS scaleX fill overlay for live drag/playback position. wavesurfer's own
  // progress is width-based (per-frame layout → janky on drag) and faux mode
  // draws no progress at all, so a single compositor-only overlay (like
  // BarProgress) covers both. Shown for faux always; for normal only while
  // dragging — wavesurfer keeps drawing its colored fill during playback.
  const progressRatio = previewRatio ?? safeRatio(currentTime, duration);
  const showProgressOverlay = mode === "faux" || previewRatio != null;

  const onSeek = useCallback(
    (newTime: number, duration: number) => {
      if (!duration) return;
      elementRefs?.waveformInst?.seekTo(safeRatio(newTime, duration));
    },
    [elementRefs?.waveformInst]
  );
  const handleKeyDown = useProgressKeyDown(onSeek);

  return (
    <div
      className="rmap-waveform-wrapper"
      data-active={isActive}
      data-waveform-mode={mode}
    >
      {showProgressOverlay && (
        <div
          className="rmap-waveform-progress"
          style={{ transform: `scaleX(${progressRatio})` }}
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
        aria-valuenow={Math.round(
          (previewRatio ??
            safeRatio(
              elementRefs?.audioEl?.currentTime ?? 0,
              elementRefs?.audioEl?.duration ?? 0
            )) * 100
        )}
        aria-valuetext={`${getTimeWithPadStart(
          elementRefs?.audioEl?.currentTime ?? 0
        )} of ${getTimeWithPadStart(elementRefs?.audioEl?.duration ?? 0)}`}
        onKeyDown={handleKeyDown}
        {...progressProps}
      />
    </div>
  );
};
