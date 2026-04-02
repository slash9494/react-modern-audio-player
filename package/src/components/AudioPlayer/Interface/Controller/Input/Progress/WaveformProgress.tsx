import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { FC, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { safeRatio } from "@/utils/safeRatio";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";
import { useWaveSurfer } from "./useWavesurfer";

const WaveformWrapper = styled.div`
  display: flex;
  width: 100%;
  #rm-waveform {
    width: 100%;
    overflow: hidden;
    wave {
      cursor: pointer !important;
      overflow-x: hidden !important;
    }
  }
`;

export const WaveformProgress: FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { curAudioState } = usePlaybackContext();
  const { elementRefs } = useResourceContext();

  useWaveSurfer(waveformRef);

  // apply current time to waveform when progress is active
  useEffect(() => {
    if (
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
    <WaveformWrapper className="waveform-wrapper">
      <div
        id="rm-waveform"
        ref={waveformRef}
        role="slider"
        tabIndex={0}
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
    </WaveformWrapper>
  );
};
