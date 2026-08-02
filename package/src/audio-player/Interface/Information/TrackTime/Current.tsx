import { FC } from "react";
import { TrackTimeContainer } from "./TrackTimeContainer";
import { TrackTimeChildrenProps } from "./Types";
import { useTimeContext } from "@/audio-player/Context/hooks/useTimeContext";
import { formatClockTime } from "@/utils/getTime";

export const Current: FC<TrackTimeChildrenProps> = ({ position }) => {
  const { currentTime } = useTimeContext();

  return (
    <TrackTimeContainer position={position} className="rmap-track-time-current">
      <span
        className="rmap-track-current-time"
        data-testid="track-current-time"
      >
        {formatClockTime(currentTime)}
      </span>
    </TrackTimeContainer>
  );
};
