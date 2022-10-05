import { FC, useRef } from "react";
import styled from "styled-components";
import { TrackTimeContainer } from "./Styles";
import { TrackTimeChildrenProps } from "./Types";
import { useRefsDispatch } from "@/hooks/useRefsDispatch";

export const Current: FC<TrackTimeChildrenProps> = ({ position }) => {
  const trackCurTimeRef = useRef<HTMLSpanElement>(null);

  useRefsDispatch(
    {
      refs: { trackCurTimeEl: trackCurTimeRef },
    },
    []
  );

  return (
    <TrackTimeCurrentContainer
      position={position}
      className="track-time-current-container"
      childrenClassName="track-current-time"
    >
      <span ref={trackCurTimeRef} className="track-current-time">
        00:00
      </span>
    </TrackTimeCurrentContainer>
  );
};

const TrackTimeCurrentContainer = styled(TrackTimeContainer)`
  .track-current-time {
    font-weight: 700;
    letter-spacing: -0.1rem;
    color: var(--rm-audio-player-track-current-time);
  }
`;
