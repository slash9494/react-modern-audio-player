import { FC, useRef } from "react";
import { VolumeSlider } from "./Content";
import Dropdown from "@/components/Dropdown";
import { VolumeTriggerBtn } from "../../Button";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useVolumeSliderPlacement } from "./useVolume";

// TODO : apply event callback props

// TODO : fix ignoring volume drag when clicking on volume slider

export const Volume: FC = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {
    activeUI: { volumeSlider: volumeSliderEl },
    volumeSliderPlacement: contextVolumePlacement,
  } = useNonNullableContext(audioPlayerStateContext);
  const volumeSliderPlacement = useVolumeSliderPlacement({
    triggerRef,
    initialState: "bottom",
  });

  return (
    <Dropdown
      placement={contextVolumePlacement || volumeSliderPlacement}
      triggerType="hover"
      disabled={!(volumeSliderEl ?? true)}
    >
      <Dropdown.Trigger>
        <VolumeTriggerBtn ref={triggerRef} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <VolumeSlider
          placement={contextVolumePlacement || volumeSliderPlacement}
        />
      </Dropdown.Content>
    </Dropdown>
  );
};
