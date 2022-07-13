import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

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
    <TrackTimeCurrentContainer>
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
    <TrackTimeDurationContainer>
      <span className="slash">/</span>
      <span ref={trackDurationRef} className="track-duration">
        00:00
      </span>
    </TrackTimeDurationContainer>
  ) : null;
};
const TrackTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 16px;
  font-family: monospace;
  font-size: 1.2rem;
`;

const TrackTimeCurrentContainer = styled(TrackTimeContainer)`
  .track-current-time {
    font-weight: 700;
    letter-spacing: -0.1rem;
    color: var(--rs-audio-player-track-current-time-color, #39c1de);
  }
`;

const TrackTimeDurationContainer = styled(TrackTimeContainer)`
  .track-duration {
    display: flex;
    color: var(--rs-audio-track-duration-color, #8c8c8c);
    letter-spacing: -0.1rem;
  }
  .slash {
    margin: 0 0.3rem;
  }
`;
