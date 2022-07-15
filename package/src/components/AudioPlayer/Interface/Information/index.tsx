import Grid from "components/Grid";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "lib/audioContext/StateContext";
import { FC } from "react";
import { Artwork } from "./Artwork";
import { TrackInfo } from "./TrackInfo";
import { TrackTimeCurrent, TrackTimeDuration } from "./TrackTime";

export const Information: FC = () => {
  const { interfacePlacement } = useNonNullableContext(audioPlayerStateContext);
  return (
    <>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.artwork ||
          interfacePlacement?.templateArea?.artwork ||
          defaultInterfacePlacement.templateArea.artwork
        }
      >
        <Artwork />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.trackInfo ||
          interfacePlacement?.templateArea?.trackInfo ||
          defaultInterfacePlacement.templateArea.trackInfo
        }
        justifySelf={"center"}
      >
        <TrackInfo />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.trackTimeCurrent ||
          interfacePlacement?.templateArea?.trackTimeCurrent ||
          defaultInterfacePlacement.templateArea.trackTimeCurrent
        }
        justifySelf={"center"}
      >
        <TrackTimeCurrent />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.trackTimeDuration ||
          interfacePlacement?.templateArea?.trackTimeDuration ||
          defaultInterfacePlacement.templateArea.trackTimeDuration
        }
        justifySelf={"center"}
      >
        <TrackTimeDuration />
      </Grid.Item>
    </>
  );
};
