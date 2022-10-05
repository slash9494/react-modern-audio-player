import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "@/components/AudioPlayer/Context";
import Grid from "@/components/Grid";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, useCallback } from "react";
import { Current } from "./Current";
import { Duration } from "./Duration";
import { TrackTimePosition } from "./Types";

export const TrackTime: FC = () => {
  const { interfacePlacement, activeUI } = useNonNullableContext(
    audioPlayerStateContext
  );

  const parsePosition = useCallback(
    (str: string) => +str.split(/[^\d]/).join(""),
    []
  );
  const currentTimePosition = parsePosition(
    interfacePlacement?.itemCustomArea?.trackTimeCurrent ||
      interfacePlacement?.templateArea?.trackTimeCurrent ||
      defaultInterfacePlacement.templateArea.trackTimeCurrent
  );
  const durationTimePosition = parsePosition(
    interfacePlacement?.itemCustomArea?.trackTimeDuration ||
      interfacePlacement?.templateArea?.trackTimeDuration ||
      defaultInterfacePlacement.templateArea.trackTimeDuration
  );

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

  return (
    <>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.trackTimeCurrent ||
          interfacePlacement?.templateArea?.trackTimeCurrent ||
          defaultInterfacePlacement.templateArea.trackTimeCurrent
        }
        visible={Boolean(activeUI.trackTime ?? activeUI.all)}
      >
        <Current position={positions.current} />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.trackTimeDuration ||
          interfacePlacement?.templateArea?.trackTimeDuration ||
          defaultInterfacePlacement.templateArea.trackTimeDuration
        }
        visible={Boolean(activeUI.trackTime ?? activeUI.all)}
      >
        <Duration position={positions.duration} />
      </Grid.Item>
    </>
  );
};
