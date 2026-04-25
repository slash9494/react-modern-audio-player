import { FC, useCallback, useRef } from "react";
import { VolumeSlider } from "./Content";
import Dropdown from "@/components/Dropdown";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { VolumeIcon } from "../../Button";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { useVolumeSliderPlacement } from "./useVolume";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { useResolvedGridArea } from "../../../hooks/useResolvedGridArea";

export type VolumeProps = GridItemLayoutProps;

export const Volume: FC<VolumeProps> = ({ gridArea, visible, ...rest }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { muted } = usePlaybackContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const toggleMute = useCallback(
    () => audioPlayerDispatch({ type: "SET_MUTED", muted: !muted }),
    [audioPlayerDispatch, muted]
  );
  const {
    activeUI: { volumeSlider: volumeSliderEl },
    volumeSliderPlacement: contextVolumePlacement,
  } = useUIContext();
  const volumeSliderPlacement = useVolumeSliderPlacement({
    triggerRef,
    initialState: "bottom",
  });

  const resolvedGridArea = useResolvedGridArea("volume", gridArea);

  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true} {...rest}>
      <Dropdown
        placement={contextVolumePlacement || volumeSliderPlacement}
        triggerType="hover"
        disabled={volumeSliderEl === false}
        data-testid="volume-dropdown"
      >
        <Dropdown.Trigger
          ref={triggerRef}
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={muted}
          onClick={toggleMute}
          className="rmap-volume-trigger"
          data-testid="volume-trigger-btn"
          data-muted={String(muted)}
        >
          <VolumeIcon />
        </Dropdown.Trigger>
        <Dropdown.Content role="tooltip">
          <VolumeSlider
            placement={contextVolumePlacement || volumeSliderPlacement}
          />
        </Dropdown.Content>
      </Dropdown>
    </Grid.Item>
  );
};
