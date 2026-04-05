import { FC } from "react";
import { TrackTimeContainer } from "./TrackTimeContainer";
import { TrackTimeChildrenProps } from "./Types";
import { useTimeContext } from "@/hooks/context/useTimeContext";
import { getTimeWithPadStart } from "@/utils/getTime";

export const Duration: FC<TrackTimeChildrenProps> = ({ position }) => {
  const { duration } = useTimeContext();

  return (
    <TrackTimeContainer
      position={position}
      className="rmap-track-time-duration"
    >
      <span className="rmap-track-duration">
        {getTimeWithPadStart(duration)}
      </span>
    </TrackTimeContainer>
  );
};
