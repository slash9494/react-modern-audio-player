import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { useBarProgress } from "./useBarProgress";

export const BarProgress: FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);
  const progressHandleRef = useRef<HTMLDivElement>(null);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const eventProps = useBarProgress();

  useEffect(() => {
    if (
      progressBarRef.current &&
      progressValueRef.current &&
      progressHandleRef.current
    ) {
      const progressBarEl = progressBarRef.current;
      const progressValueEl = progressValueRef.current;
      const progressHandleEl = progressHandleRef.current;
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { progressBarEl, progressValueEl, progressHandleEl },
      });
    }
  }, [
    progressHandleRef,
    progressBarRef,
    progressValueRef,
    audioPlayerDispatch,
  ]);

  return (
    <BarProgressWrapper className="bar-progress-wrapper" {...eventProps}>
      <div className="rs-player-progress-bar" ref={progressBarRef}>
        <div className="rs-player-progress" ref={progressValueRef}></div>
      </div>
      <div className="rs-player-progress-handle" ref={progressHandleRef} />
    </BarProgressWrapper>
  );
};

const BarProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 2px;
  padding: 0.5rem 0;
  cursor: pointer;
  position: relative;
  align-items: center;
  .rs-player-progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--rs-audio-player-progress-bar-background);
  }
  .rs-player-progress {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--rs-audio-player-progress-bar);
    transform-origin: 0 0;
    transform: scaleX(0);
  }
  &:hover {
    .rs-player-progress-handle {
      opacity: 1;
    }
  }
  .rs-player-progress-handle {
    position: absolute;
    left: -4px;
    background-color: var(--rs-audio-player-progress-bar);
    border-radius: 100%;
    height: 8px;
    width: 8px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
`;
