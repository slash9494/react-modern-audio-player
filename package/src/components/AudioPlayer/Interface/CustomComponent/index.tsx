import Grid from "@/components/Grid";
import { GridItemProps } from "@/components/Grid/Item";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useTimeContext } from "@/components/AudioPlayer/Context/hooks/useTimeContext";
import { useTrackContext } from "@/components/AudioPlayer/Context/hooks/useTrackContext";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
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
  const audioPlayerState = {
    curAudioState: {
      isPlaying: playback.isPlaying,
      volume: playback.volume,
      muted: playback.muted,
      repeatType: playback.repeatType,
      isLoadedMetaData: playback.isLoadedMetaData,
      currentTime: time.currentTime,
      duration: time.duration,
    },
    audioResetKey: playback.audioResetKey,
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
