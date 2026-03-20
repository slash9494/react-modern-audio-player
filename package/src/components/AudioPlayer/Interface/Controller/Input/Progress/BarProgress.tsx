import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useRefsDispatch } from "@/hooks/useRefsDispatch";
import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { useProgress } from "./useProgress";

export const BarProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);
  const progressHandleRef = useRef<HTMLDivElement>(null);
  useRefsDispatch(
    {
      refs: {
        progressBarEl: progressBarRef,
        progressValueEl: progressValueRef,
        progressHandleEl: progressHandleRef,
      },
    },
    [isActive]
  );

  const { elementRefs, curAudioState } = useNonNullableContext(
    audioPlayerStateContext
  );
  useEffect(() => {
    if (
      !progressBarRef.current ||
      !progressValueRef.current ||
      !progressHandleRef.current ||
      !elementRefs?.audioEl ||
      !curAudioState.isLoadedMetaData ||
      curAudioState.isPlaying
    )
      return;

    const progressBarWidth = progressBarRef.current.clientWidth;
    const progressHandlePosition =
      (elementRefs.audioEl.currentTime / elementRefs.audioEl.duration) *
      progressBarWidth;

    progressValueRef.current.style.transform = `scaleX(${
      elementRefs.audioEl.currentTime / elementRefs.audioEl.duration
    })`;
    progressHandleRef.current.style.transform = `translateX(${progressHandlePosition}px)`;
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
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        audio.currentTime = Math.max(audio.currentTime - 5, 0);
        break;
      case "Home":
        event.preventDefault();
        audio.currentTime = 0;
        break;
      case "End":
        event.preventDefault();
        audio.currentTime = audio.duration;
        break;
      default:
        break;
    }
  };

  return isActive ? (
    <BarProgressWrapper
      className="bar-progress-wrapper"
      data-testid="progress-bar"
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
      aria-valuetext={`${formatTime(elementRefs?.audioEl?.currentTime ?? 0)} of ${formatTime(elementRefs?.audioEl?.duration ?? 0)}`}
      onKeyDown={handleKeyDown}
      {...eventProps}
    >
      <div className="rm-player-progress-bar" ref={progressBarRef}>
        <div className="rm-player-progress" ref={progressValueRef}></div>
      </div>
      <div className="rm-player-progress-handle" ref={progressHandleRef} />
    </BarProgressWrapper>
  ) : null;
};

const BarProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 18px;
  padding: 8px 0;
  cursor: pointer;
  position: relative;
  align-items: center;
  .rm-player-progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--rm-audio-player-progress-bar-background);
  }
  .rm-player-progress {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--rm-audio-player-progress-bar);
    transform-origin: 0 0;
    transform: scaleX(0);
  }
  .rm-player-progress-handle {
    position: absolute;
    left: -4px;
    background-color: var(--rm-audio-player-progress-bar);
    border-radius: 100%;
    height: 8px;
    width: 8px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover {
    .rm-player-progress-handle {
      opacity: 1;
    }
  }
`;
