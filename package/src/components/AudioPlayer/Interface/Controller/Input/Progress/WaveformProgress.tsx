import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { FC, useCallback, useEffect, useRef } from "react";
import { safeRatio } from "@/utils/safeRatio";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";
import { useWaveSurfer } from "./useWavesurfer";
import "./WaveformProgress.css";

export const WaveformProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { isLoadedMetaData, isPlaying } = usePlaybackContext();
  const { elementRefs } = useResourceContext();

  useWaveSurfer(waveformRef);

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

  const eventProps = useProgress();

  const onSeek = useCallback(
    (newTime: number, duration: number) => {
      if (!duration) return;
      elementRefs?.waveformInst?.seekTo(safeRatio(newTime, duration));
    },
    [elementRefs?.waveformInst]
  );
  const handleKeyDown = useProgressKeyDown(onSeek);

  return (
    <div className="rmap-waveform-wrapper" data-active={isActive}>
      <div
        id="rm-waveform"
        ref={waveformRef}
        role="slider"
        tabIndex={isActive ? 0 : -1}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(
          ((elementRefs?.audioEl?.currentTime ?? 0) /
            (elementRefs?.audioEl?.duration || 1)) *
            100
        )}
        aria-valuetext={`${getTimeWithPadStart(
          elementRefs?.audioEl?.currentTime ?? 0
        )} of ${getTimeWithPadStart(elementRefs?.audioEl?.duration ?? 0)}`}
        onKeyDown={handleKeyDown}
        {...eventProps}
      />
    </div>
  );
};
