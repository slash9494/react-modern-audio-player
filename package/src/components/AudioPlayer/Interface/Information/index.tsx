import Grid from "@/components/Grid";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { FC } from "react";
import { Artwork } from "./Artwork";
import { TrackInfo } from "./TrackInfo";
import { TrackTime } from "./TrackTime";

export const Information: FC = () => {
  const { playList, curIdx } = useTrackContext();
  const { interfacePlacement, activeUI } = useUIContext();

  const isTrackInfoActive =
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
        visible={isTrackInfoActive}
      >
        <TrackInfo />
      </Grid.Item>

      <TrackTime />
    </>
  );
};
