import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { FC, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useProgress } from "./useProgress";
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
  const { curAudioState } = usePlaybackContext();
  const { elementRefs } = useResourceContext();

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
  }, [isActive, curAudioState.isLoadedMetaData]);

  const eventProps = useProgress();
  return (
    <WaveformWrapper className="waveform-wrapper" isActive={isActive}>
      <div id="rm-waveform" ref={waveformRef} {...eventProps} />
    </WaveformWrapper>
  );
};
