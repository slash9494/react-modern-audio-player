import Grid from "@/components/Grid";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "@/components/AudioPlayer/Context/StateContext";
import { FC } from "react";
import { Artwork } from "./Artwork";
import { TrackInfo } from "./TrackInfo";
import { TrackTimeCurrent, TrackTimeDuration } from "./TrackTime";

export const Information: FC = () => {
  const { interfacePlacement, playList, curIdx, activeUI } =
    useNonNullableContext(audioPlayerStateContext);
  const trackInfoActive =
    Boolean(
      playList[curIdx]?.customTrackInfo ??
        playList[curIdx]?.writer ??
        playList[curIdx]?.name
    ) && Boolean(activeUI.trackInfo ?? activeUI.all);

  return (
    <>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.artwork ||
          interfacePlacement?.templateArea?.artwork ||
          defaultInterfacePlacement.templateArea.artwork
        }
        visible={Boolean(
          playList[curIdx]?.img && (activeUI.artwork ?? activeUI.all)
        )}
      >
        <Artwork />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.trackInfo ||
          interfacePlacement?.templateArea?.trackInfo ||
          defaultInterfacePlacement.templateArea.trackInfo
        }
        visible={trackInfoActive}
      >
        <TrackInfo />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.trackTimeCurrent ||
          interfacePlacement?.templateArea?.trackTimeCurrent ||
          defaultInterfacePlacement.templateArea.trackTimeCurrent
        }
        visible={Boolean(activeUI.trackTime ?? activeUI.all)}
      >
        <TrackTimeCurrent />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.trackTimeDuration ||
          interfacePlacement?.templateArea?.trackTimeDuration ||
          defaultInterfacePlacement.templateArea.trackTimeDuration
        }
        visible={Boolean(activeUI.trackTime ?? activeUI.all)}
      >
        <TrackTimeDuration />
      </Grid.Item>
    </>
  );
};
