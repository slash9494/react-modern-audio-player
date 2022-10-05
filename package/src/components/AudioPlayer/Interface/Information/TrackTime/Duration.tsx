import { FC, useRef } from "react";
import styled from "styled-components";
import { TrackTimeContainer } from "./Styles";
import { TrackTimeChildrenProps } from "./Types";
import { useRefsDispatch } from "@/hooks/useRefsDispatch";

export const Duration: FC<TrackTimeChildrenProps> = ({ position }) => {
  const trackDurationRef = useRef<HTMLSpanElement>(null);

  useRefsDispatch(
    {
      refs: { trackDurationEl: trackDurationRef },
    },
    []
  );

  return (
    <TrackTimeDurationContainer
      position={position}
      className="track-time-duration-container"
      childrenClassName="track-duration"
    >
      <span ref={trackDurationRef} className="track-duration">
        00:00
      </span>
    </TrackTimeDurationContainer>
  );
};

const TrackTimeDurationContainer = styled(TrackTimeContainer)`
  .track-duration {
    display: flex;
    color: var(--rm-audio-player-track-duration);
    letter-spacing: -0.1rem;
  }
`;
