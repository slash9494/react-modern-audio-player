import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, useRef } from "react";
import styled from "styled-components";
import { useProgress } from "./useProgress";

export const BarProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { curAudioState } = useNonNullableContext(audioPlayerStateContext);

  const ratio =
    (curAudioState.currentTime ?? 0) / (curAudioState.duration || 1);
  const barWidth = progressBarRef.current?.clientWidth ?? 0;

  const eventProps = useProgress();

  return isActive ? (
    <BarProgressWrapper
      className="bar-progress-wrapper"
      data-testid="progress-bar"
      {...eventProps}
    >
      <div className="rm-player-progress-bar" ref={progressBarRef}>
        <div
          className="rm-player-progress"
          style={{ transform: `scaleX(${ratio})` }}
        />
      </div>
      <div
        className="rm-player-progress-handle"
        style={{ transform: `translateX(${ratio * barWidth}px)` }}
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
