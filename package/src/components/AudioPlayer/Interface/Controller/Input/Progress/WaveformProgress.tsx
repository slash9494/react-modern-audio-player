import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { FC, useCallback, useEffect, useRef } from "react";
import { safeRatio } from "@/utils/safeRatio";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";
import { useWaveSurfer } from "./useWavesurfer";
import "./WaveformProgress.css";

export const WaveformProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { curAudioState } = usePlaybackContext();
  const { elementRefs } = useResourceContext();

  useWaveSurfer(waveformRef);

  useEffect(() => {
    if (
      !isActive ||
      !elementRefs?.waveformInst ||
      !elementRefs?.audioEl ||
      !curAudioState.isLoadedMetaData ||
      curAudioState.isPlaying
    )
      return;

    const ratio = safeRatio(
      elementRefs.audioEl.currentTime,
      elementRefs.audioEl.duration
    );
    elementRefs.waveformInst.seekTo(ratio);
  }, [
    isActive,
    curAudioState.isLoadedMetaData,
    elementRefs?.waveformInst,
    elementRefs?.audioEl,
    curAudioState.isPlaying,
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
    <div className="waveform-wrapper" data-active={isActive}>
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
