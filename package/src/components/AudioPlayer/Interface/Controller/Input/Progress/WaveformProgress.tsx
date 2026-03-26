import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { FC, useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";
import { useWaveSurfer } from "./useWavesurfer";

const WaveformWrapper = styled.div`
  ${({ isActive }: { isActive: boolean }) => css`
    display: flex;
    width: 100%;
    #rm-waveform {
      width: 100%;
      wave {
        cursor: pointer !important;
      }

      ${!isActive &&
      css`
        height: 0;
        opacity: 0;
        pointer-events: none;
      `}
    }
  `}
`;

export const WaveformProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { elementRefs, curAudioState } = useNonNullableContext(
    audioPlayerStateContext
  );

  useWaveSurfer(waveformRef);

  // apply current time to waveform when progress is active
  useEffect(() => {
    if (
      !isActive ||
      !elementRefs?.waveformInst ||
      !elementRefs?.audioEl ||
      !curAudioState.isLoadedMetaData ||
      curAudioState.isPlaying
    )
      return;

    elementRefs.waveformInst.seekTo(
      elementRefs.audioEl.currentTime / elementRefs.audioEl.duration
    );
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
      elementRefs?.waveformInst?.seekTo(newTime / duration);
    },
    [elementRefs?.waveformInst]
  );
  const handleKeyDown = useProgressKeyDown(onSeek);

  return (
    <WaveformWrapper className="waveform-wrapper" isActive={isActive}>
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
    </WaveformWrapper>
  );
};
