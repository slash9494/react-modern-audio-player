import { FC } from "react";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { usePlacedGridArea } from "../../../usePlacedGridArea";
import { PlayBtn } from "./PlayBtn";
import { PrevBtn } from "./PrevBtn";
import { NextBtn } from "./NextBtn";

export type TransportControlsProps = GridItemLayoutProps;

export const TransportControls: FC<TransportControlsProps> = ({
  gridArea,
  visible,
  ...rest
}) => {
  const { activeUI } = useUIContext();
  const isPrevNextVisible = Boolean(activeUI.prevNnext ?? activeUI.all);

  const resolvedGridArea = usePlacedGridArea("playButton", gridArea);

  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true} {...rest}>
      <div
        className="rmap-ctrl-btn-wrapper"
        role="group"
        aria-label="Playback controls"
      >
        <PrevBtn isVisible={isPrevNextVisible} />
        <PlayBtn />
        <NextBtn isVisible={isPrevNextVisible} />
      </div>
    </Grid.Item>
  );
};
