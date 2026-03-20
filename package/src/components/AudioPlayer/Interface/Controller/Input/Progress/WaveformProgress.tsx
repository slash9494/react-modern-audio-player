import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import React, { FC, useEffect, useRef } from "react";
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
  }, [isActive, curAudioState.isLoadedMetaData]);

  const eventProps = useProgress();

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!elementRefs?.audioEl || !curAudioState?.isLoadedMetaData) return;
    const audio = elementRefs.audioEl;
    let newTime: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        newTime = Math.min(audio.currentTime + 5, audio.duration);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        newTime = Math.max(audio.currentTime - 5, 0);
        break;
      case "Home":
        event.preventDefault();
        newTime = 0;
        break;
      case "End":
        event.preventDefault();
        newTime = audio.duration;
        break;
      default:
        break;
    }
    if (newTime !== null) {
      audio.currentTime = newTime;
      elementRefs.waveformInst?.seekTo(newTime / audio.duration);
    }
  };

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
        aria-valuetext={`${formatTime(elementRefs?.audioEl?.currentTime ?? 0)} of ${formatTime(elementRefs?.audioEl?.duration ?? 0)}`}
        onKeyDown={handleKeyDown}
        {...eventProps}
      />
    </WaveformWrapper>
  );
};
