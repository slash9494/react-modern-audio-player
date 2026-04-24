import { FC } from "react";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { useUIContext } from "@/hooks/context/useUIContext";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import { PlayBtn } from "./PlayBtn";
import { PrevBtn } from "./PrevBtn";
import { NextBtn } from "./NextBtn";

export type TransportControlsProps = GridItemLayoutProps;

export const TransportControls: FC<TransportControlsProps> = ({
  gridArea,
  visible,
}) => {
  const { activeUI, interfacePlacement } = useUIContext();
  const isPrevNextVisible = Boolean(activeUI.prevNnext ?? activeUI.all);

  const resolvedGridArea =
    gridArea ??
    interfacePlacement?.itemCustomArea?.playButton ??
    interfacePlacement?.templateArea?.playButton ??
    defaultInterfacePlacement.templateArea.playButton;

  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true}>
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
