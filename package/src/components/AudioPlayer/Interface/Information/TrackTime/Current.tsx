import { FC } from "react";
import { TrackTimeContainer } from "./TrackTimeContainer";
import { TrackTimeChildrenProps } from "./Types";
import { useTimeContext } from "@/hooks/context/useTimeContext";
import { getTimeWithPadStart } from "@/utils/getTime";

export const Current: FC<TrackTimeChildrenProps> = ({ position }) => {
  const { currentTime } = useTimeContext();

  return (
    <TrackTimeContainer
      position={position}
      className="track-time-current-container"
    >
      <span className="track-current-time" data-testid="track-current-time">
        {getTimeWithPadStart(currentTime)}
      </span>
    </TrackTimeContainer>
  );
};
