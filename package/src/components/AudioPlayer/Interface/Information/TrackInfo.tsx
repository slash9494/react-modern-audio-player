import { useTrackContext } from "@/components/AudioPlayer/Context/hooks/useTrackContext";
import { FC, memo } from "react";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { useResolvedGridArea } from "../useResolvedGridArea";
import "./TrackInfo.css";

export type TrackInfoProps = GridItemLayoutProps;

export const TrackInfo: FC<TrackInfoProps> = memo(function TrackInfo({
  gridArea,
  visible,
  ...rest
}) {
  const { playList, curIdx } = useTrackContext();
  const curPlayData = playList[curIdx];

  const resolvedGridArea = useResolvedGridArea("trackInfo", gridArea);

  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true} {...rest}>
      <div className="rmap-track-info-container">
        {curPlayData?.customTrackInfo ? (
          curPlayData.customTrackInfo
        ) : (
          <>
            {curPlayData?.name && (
              <span className="title" data-testid="track-title">
                {curPlayData.name}
              </span>
            )}
            {curPlayData?.writer && (
              <span className="writer">{curPlayData.writer}</span>
            )}
          </>
        )}
      </div>
    </Grid.Item>
  );
});

TrackInfo.displayName = "TrackInfo";
