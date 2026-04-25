import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { FC, memo } from "react";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import "./TrackInfo.css";

export type TrackInfoProps = GridItemLayoutProps;

export const TrackInfo: FC<TrackInfoProps> = memo(function TrackInfo({
  gridArea,
  visible,
  ...rest
}) {
  const { playList, curIdx } = useTrackContext();
  const { interfacePlacement } = useUIContext();
  const curPlayData = playList[curIdx];

  const resolvedGridArea =
    gridArea ??
    interfacePlacement?.itemCustomArea?.trackInfo ??
    interfacePlacement?.templateArea?.trackInfo ??
    defaultInterfacePlacement.templateArea.trackInfo;

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
