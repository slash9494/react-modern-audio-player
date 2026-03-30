import { FC } from "react";
import styled from "styled-components";
import { TrackTimeContainer } from "./Styles";
import { TrackTimeChildrenProps } from "./Types";
import { useTimeContext } from "@/hooks/context/useTimeContext";
import { getTimeWithPadStart } from "@/utils/getTime";

export const Current: FC<TrackTimeChildrenProps> = ({ position }) => {
  const { currentTime } = useTimeContext();

  return (
    <TrackTimeCurrentContainer
      position={position}
      className="track-time-current-container"
      childrenClassName="track-current-time"
    >
      <span className="track-current-time" data-testid="track-current-time">
        {getTimeWithPadStart(currentTime)}
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
