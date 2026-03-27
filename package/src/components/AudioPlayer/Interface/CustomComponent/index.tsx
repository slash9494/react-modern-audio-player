import Grid from "@/components/Grid";
import { GridItemProps } from "@/components/Grid/Item";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import React, { FC } from "react";

// TODO : apply collection component

export type CustomComponentProps = {
  children?: React.ReactNode;
  id: string;
} & GridItemProps;

export const CustomComponent: FC<CustomComponentProps> = ({
  children,
  id,
  ...gridItemProps
}) => {
  const playback = usePlaybackContext();
  const track = useTrackContext();
  const ui = useUIContext();
  const resource = useResourceContext();

  // Assemble full state shape for backward-compat with custom component children
  const audioPlayerState = { ...playback, ...track, ...ui, ...resource };

  const gridArea = ui.interfacePlacement?.customComponentsArea?.[id];

  return (
    <Grid.Item
      UNSAFE_className="custom_component"
      gridArea={gridArea}
      {...gridItemProps}
    >
      {React.cloneElement(children as React.ReactElement, { audioPlayerState })}
    </Grid.Item>
  );
};
