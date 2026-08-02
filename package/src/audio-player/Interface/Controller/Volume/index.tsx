import { FC, useCallback, useRef } from "react";
import { VolumeSlider } from "./Content";
import Dropdown from "@/ui/Dropdown";
import Grid, { GridItemLayoutProps } from "@/ui/Grid";
import { VolumeIcon } from "./VolumeIcon";
import { VolumeSliderPlacement } from "@/audio-player/Context/StateContext";
import { useUIContext } from "@/audio-player/Context/hooks/useUIContext";
import { usePlaybackContext } from "@/audio-player/Context/hooks/usePlaybackContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audio-player/Context/dispatchContext";
import { useResolvedGridArea } from "../../hooks/useResolvedGridArea";
import { useResolvedDropdownProps } from "../../hooks/useResolvedDropdownProps";

export * from "./VolumeIcon";

export interface VolumeProps extends GridItemLayoutProps {
  triggerType?: "click" | "hover";
  placement?: VolumeSliderPlacement;
}

export const Volume: FC<VolumeProps> = ({
  gridArea,
  visible,
  triggerType,
  placement,
  ...rest
}) => {
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

  const resolvedGridArea = useResolvedGridArea("volume", gridArea);

  const {
    triggerType: resolvedTriggerType,
    placement: resolvedPlacement,
    contentRole,
  } = useResolvedDropdownProps({
    triggerType,
    placement,
    contextPlacement: contextVolumePlacement,
    triggerRef,
    defaults: { triggerType: "hover", placement: "bottom" },
  });

  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true} {...rest}>
      <Dropdown
        placement={resolvedPlacement}
        triggerType={resolvedTriggerType}
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
        <Dropdown.Content role={contentRole}>
          <VolumeSlider placement={resolvedPlacement} />
        </Dropdown.Content>
      </Dropdown>
    </Grid.Item>
  );
};
