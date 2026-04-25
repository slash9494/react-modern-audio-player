import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { FC, useCallback } from "react";
import { Current } from "./Current";
import { Duration } from "./Duration";
import { TrackTimePosition } from "./Types";
import { useResolvedGridArea } from "../../useResolvedGridArea";

export type TrackTimeProps = Pick<GridItemLayoutProps, "visible">;

export const TrackTime: FC<TrackTimeProps> = ({ visible }) => {
  const currentGridArea = useResolvedGridArea("trackTimeCurrent");
  const durationGridArea = useResolvedGridArea("trackTimeDuration");

  const parsePosition = useCallback(
    (str: string) => +str.split(/[^\d]/).join(""),
    []
  );
  const currentTimePosition = parsePosition(currentGridArea);
  const durationTimePosition = parsePosition(durationGridArea);

  const getPosition = useCallback(
    (positionNumber: number): TrackTimePosition => {
      switch (positionNumber) {
        case 1:
          return "right";
        case -1:
          return "left";
        default:
          return "separation";
      }
    },
    []
  );
  const positions = {
    current: getPosition(currentTimePosition - durationTimePosition),
    duration: getPosition(durationTimePosition - currentTimePosition),
  };

  const resolvedVisible = visible ?? true;

  return (
    <>
      <Grid.Item gridArea={currentGridArea} visible={resolvedVisible}>
        <Current position={positions.current} />
      </Grid.Item>
      <Grid.Item gridArea={durationGridArea} visible={resolvedVisible}>
        <Duration position={positions.duration} />
      </Grid.Item>
    </>
  );
};
