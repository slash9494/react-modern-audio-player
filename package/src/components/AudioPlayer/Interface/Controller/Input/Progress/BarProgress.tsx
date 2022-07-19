import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

// TODO : useBarProgress 생성.

export const BarProgress: FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);
  const progressHandleRef = useRef<HTMLDivElement>(null);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { elementRefs } = useNonNullableContext(audioPlayerStateContext);

  const [isTimeChangeActive, setTimeChangeActive] = useState(false);

  const onMoveAudioTime = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!elementRefs?.audioEl) return;
      const { clientX } = e;
      const { clientWidth } = e.currentTarget;
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const curPositionX = clientX - boundingRect.x;
      const curPositionPercent = curPositionX / clientWidth;
      const curPositionTime = curPositionPercent * elementRefs.audioEl.duration;
      elementRefs.audioEl.currentTime = curPositionTime;
    },
    [elementRefs?.audioEl]
  );
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
    <BarProgressWrapper
      onMouseDown={() => setTimeChangeActive(true)}
      onMouseUp={() => setTimeChangeActive(false)}
      onMouseLeave={() => setTimeChangeActive(false)}
      onMouseMove={isTimeChangeActive ? onMoveAudioTime : undefined}
      onClick={onMoveAudioTime}
      className="bar-progress-wrapper"
    >
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
