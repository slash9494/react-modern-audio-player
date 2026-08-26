import Grid from "@/ui/Grid";
import { GridItemProps } from "@/ui/Grid/Item";
import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";
import { useTimeContext } from "@/audioPlayer/Context/hooks/useTimeContext";
import { useTrackContext } from "@/audioPlayer/Context/hooks/useTrackContext";
import { useUIContext } from "@/audioPlayer/Context/hooks/useUIContext";
import { useResourceContext } from "@/audioPlayer/Context/hooks/useResourceContext";
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
  const time = useTimeContext();
  const track = useTrackContext();
  const ui = useUIContext();
  const resource = useResourceContext();

  // Assemble full state shape for backward-compat with custom component
  // children. The internal playbackContext was flattened in v2 — reconstruct
  // the legacy `curAudioState` shape here so external consumers continue to
  // see the nested object they were originally written against.
  const { audioResetKey, ...playbackState } = playback;
  const audioPlayerState = {
    // Spread, never a hand-written field list: the previous list silently
    // dropped `playbackRate` when it was added to playbackContext.
    curAudioState: {
      ...playbackState,
      currentTime: time.currentTime,
      duration: time.duration,
    },
    audioResetKey,
    ...time,
    ...track,
    ...ui,
    ...resource,
  };

  const gridArea = ui.interfacePlacement?.customComponentsArea?.[id];

  return (
    <Grid.Item
      UNSAFE_className="rmap-custom-component"
      gridArea={gridArea}
      {...gridItemProps}
    >
      {React.cloneElement(children as React.ReactElement, { audioPlayerState })}
    </Grid.Item>
  );
};
