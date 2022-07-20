import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import {
  audioPlayerStateContext,
  TrackTimeUI,
} from "@/components/AudioPlayer/Context/StateContext";
import { FC, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

export const TrackTimeCurrent: FC = () => {
  const trackCurTimeRef = useRef<HTMLSpanElement>(null);
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useEffect(() => {
    if (trackCurTimeRef.current) {
      const trackCurTimeEl = trackCurTimeRef.current;
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { trackCurTimeEl },
      });
    }
  }, [trackCurTimeRef.current, audioPlayerDispatch]);
  return activeUI.trackTime ?? activeUI.all ? (
    <TrackTimeCurrentContainer
      type={activeUI.trackTime}
      className="track-time-current-container"
    >
      <span ref={trackCurTimeRef} className="track-current-time">
        00:00
      </span>
    </TrackTimeCurrentContainer>
  ) : null;
};

export const TrackTimeDuration: FC = () => {
  const trackDurationRef = useRef<HTMLSpanElement>(null);
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useEffect(() => {
    if (trackDurationRef.current) {
      const trackDurationEl = trackDurationRef.current;
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { trackDurationEl },
      });
    }
  }, [trackDurationRef.current, audioPlayerDispatch]);
  return activeUI.trackTime ?? activeUI.all ? (
    <TrackTimeDurationContainer
      type={activeUI.trackTime}
      className="track-time-duration-container"
    >
      <span ref={trackDurationRef} className="track-duration">
        00:00
      </span>
    </TrackTimeDurationContainer>
  ) : null;
};

interface TrackTimeContainerProps {
  type?: TrackTimeUI;
}
const TrackTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 16px;
  font-family: monospace;
  font-size: 1.2rem;
`;

const TrackTimeCurrentContainer = styled(TrackTimeContainer)`
  ${({ type }: TrackTimeContainerProps) => css`
    .track-current-time {
      font-weight: 700;
      letter-spacing: -0.1rem;
      color: var(--rs-audio-player-track-current-time);
      margin-right: ${type !== "separation-mode" && "-10px"};
    }
  `}
`;

const TrackTimeDurationContainer = styled(TrackTimeContainer)`
  ${({ type }: TrackTimeContainerProps) => css`
    .track-duration {
      display: flex;
      color: var(--rs-audio-player-track-duration);
      letter-spacing: -0.1rem;
    }
    ${type !== "separation-mode" &&
    css`
      .track-duration:before {
        content: "/";
        margin: 0 0.3rem;
      }
    `}
  `}
`;
