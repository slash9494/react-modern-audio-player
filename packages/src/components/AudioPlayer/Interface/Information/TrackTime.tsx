import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

const TrackTimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  .track-current-time {
    font-weight: 700;
    letter-spacing: -0.1rem;
    color: var(--rs-audio-player-track-current-time-color, #39c1de);
  }
  .track-duration {
    color: var(--rs-audio-track-duration-color, #8c8c8c);
    letter-spacing: -0.1rem;
  }
  .track-duration::before {
    margin: 0 0.3rem;
    display: inline-block;
    content: "/";
  }
`;

export const TrackTime: FC = () => {
  const trackCurTimeRef = useRef<HTMLSpanElement>(null);
  const trackDurationRef = useRef<HTMLSpanElement>(null);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  useEffect(() => {
    if (trackCurTimeRef.current && trackDurationRef.current) {
      const trackCurTimeEl = trackCurTimeRef.current;
      const trackDurationEl = trackDurationRef.current;
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { trackCurTimeEl, trackDurationEl },
      });
    }
  }, [trackCurTimeRef, trackDurationRef, audioPlayerDispatch]);
  return (
    <TrackTimeContainer>
      <span ref={trackCurTimeRef} className="track-current-time">
        00:00
      </span>
      <span ref={trackDurationRef} className="track-duration">
        00:00
      </span>
    </TrackTimeContainer>
  );
};
