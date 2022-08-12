import { FC, useRef } from "react";
import { VolumeSlider } from "./Content";
import Dropdown from "@/components/Dropdown";
import { VolumeTriggerBtn } from "../../Button";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useVolumeSliderPlacement } from "./useVolume";

// TODO : apply event callback props

export const Volume: FC = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {
    activeUI: { volumeSlider: volumeSliderEl },
  } = useNonNullableContext(audioPlayerStateContext);
  const volumeSliderPlacement = useVolumeSliderPlacement({
    ref: triggerRef,
    initialState: "bottom",
  });

  return (
    <Dropdown
      placement={volumeSliderPlacement}
      triggerType="hover"
      disabled={!volumeSliderEl}
    >
      <Dropdown.Trigger>
        <VolumeTriggerBtn ref={triggerRef} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <VolumeSlider placement={volumeSliderPlacement} />
      </Dropdown.Content>
    </Dropdown>
  );
};
