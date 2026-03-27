import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { safeRatio } from "@/utils/safeRatio";
import { FC, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";

export const BarProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  const { curAudioState } = usePlaybackContext();

  useLayoutEffect(() => {
    if (!progressBarRef.current) return;
    const updateWidth = () =>
      setBarWidth(progressBarRef.current?.clientWidth ?? 0);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(progressBarRef.current);
    return () => observer.disconnect();
  }, []);

  const progressRatio = safeRatio(
    curAudioState.currentTime ?? 0,
    curAudioState.duration ?? 0
  );

  const eventProps = useProgress();
  const handleKeyDown = useProgressKeyDown();

  return isActive ? (
    <BarProgressWrapper
      className="bar-progress-wrapper"
      data-testid="progress-bar"
      role="slider"
      tabIndex={0}
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progressRatio * 100)}
      aria-valuetext={`${getTimeWithPadStart(
        curAudioState.currentTime ?? 0
      )} of ${getTimeWithPadStart(curAudioState.duration ?? 0)}`}
      onKeyDown={handleKeyDown}
      {...eventProps}
    >
      <div className="rm-player-progress-bar" ref={progressBarRef}>
        <div
          className="rm-player-progress"
          style={{ transform: `scaleX(${progressRatio})` }}
        />
      </div>
      <div
        className="rm-player-progress-handle"
        style={{
          transform: `translateX(${progressRatio * barWidth}px)`,
        }}
      />
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
