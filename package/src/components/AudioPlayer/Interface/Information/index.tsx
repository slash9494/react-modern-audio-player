import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { FC } from "react";
import { Artwork } from "./Artwork";
import { TrackInfo } from "./TrackInfo";
import { TrackTime } from "./TrackTime";

export const Information: FC = () => {
  const { playList, curIdx } = useTrackContext();
  const { activeUI } = useUIContext();

  const isTrackInfoActive =
    Boolean(
      playList[curIdx]?.customTrackInfo ??
        playList[curIdx]?.writer ??
        playList[curIdx]?.name
    ) && Boolean(activeUI.trackInfo ?? activeUI.all);

  return (
    <>
      <Artwork
        visible={Boolean(
          playList[curIdx]?.img && (activeUI.artwork ?? activeUI.all)
        )}
      />
      <TrackInfo visible={isTrackInfoActive} />
      <TrackTime visible={Boolean(activeUI.trackTime ?? activeUI.all)} />
    </>
  );
};
