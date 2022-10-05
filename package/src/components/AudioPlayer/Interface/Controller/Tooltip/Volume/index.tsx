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
    activeUI: { volumeSlider: volumeSliderEl, all: allEl },
    volumeSliderPlacement: ContextVolumePlacement,
  } = useNonNullableContext(audioPlayerStateContext);
  const volumeSliderPlacement = useVolumeSliderPlacement({
    triggerRef,
    initialState: "bottom",
  });

  return (
    <Dropdown
      placement={ContextVolumePlacement || volumeSliderPlacement}
      triggerType="hover"
      disabled={!(volumeSliderEl ?? allEl)}
    >
      <Dropdown.Trigger>
        <VolumeTriggerBtn ref={triggerRef} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <VolumeSlider
          placement={ContextVolumePlacement || volumeSliderPlacement}
        />
      </Dropdown.Content>
    </Dropdown>
  );
};
