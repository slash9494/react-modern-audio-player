import { useRefsDispatch } from "@/hooks/useRefsDispatch";
import { FC, useRef } from "react";
import styled from "styled-components";
import { useBarProgress } from "./useBarProgress";

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

  const eventProps = useBarProgress();

  return isActive ? (
    <BarProgressWrapper className="bar-progress-wrapper" {...eventProps}>
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
  &:hover {
    .rm-player-progress-handle {
      opacity: 1;
    }
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
`;
