import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useBarProgress } from "./useBarProgress";

const WaveformWrapper = styled.div`
  ${({ isActive }: { isActive: boolean }) => css`
    display: flex;
    width: 100%;
    #rm-waveform {
      width: 100%;
      wave {
        cursor: pointer !important;
      }

      ${
        !isActive &&
        css`
          height: 0;
          opacity: 0;
          pointer-events: none;
        `
      }} 
    }
  `}
`;

export const WaveformProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const { elementRefs, curAudioState } = useNonNullableContext(
    audioPlayerStateContext
  );
  const eventProps = useBarProgress();

  useEffect(() => {
    if (!waveformRef.current || !elementRefs?.waveformInst) return;

    const redrawForm = () => {
      elementRefs.waveformInst?.drawBuffer();
    };
    const resizeObserver = new ResizeObserver(redrawForm);
    resizeObserver.observe(waveformRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRefs?.waveformInst, waveformRef]);

  useEffect(() => {
    if (
      !isActive ||
      !elementRefs?.waveformInst ||
      !elementRefs?.audioEl ||
      curAudioState.isPlaying
    )
      return;

    elementRefs.waveformInst.seekTo(
      elementRefs.audioEl.currentTime / elementRefs.audioEl.duration
    );
  }, [isActive]);

  return (
    <WaveformWrapper className="waveform-wrapper" isActive={isActive}>
      <div id="rm-waveform" ref={waveformRef} {...eventProps} />
    </WaveformWrapper>
  );
};
