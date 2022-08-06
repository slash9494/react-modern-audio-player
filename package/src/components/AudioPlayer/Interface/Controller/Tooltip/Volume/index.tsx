import { FC, useEffect, useRef, useState } from "react";
import { VolumeSlider, VolumeSliderPlacement } from "./Content";
import Dropdown from "@/components/Dropdown";
import { VolumeTriggerBtn } from "../../Button";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";

// TODO : apply event callback props

export const Volume: FC = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {
    activeUI: { volumeSlider },
  } = useNonNullableContext(audioPlayerStateContext);
  const [volumeSliderPlacement, setVolumeSliderPlacement] =
    useState<VolumeSliderPlacement>("bottom");
  useEffect(() => {
    if (triggerRef.current) {
      const placementValidation = () => {
        if (
          triggerRef.current!.getBoundingClientRect().top <
          window.innerHeight / 2
        ) {
          return "bottom";
        }
        return "top";
      };
      setVolumeSliderPlacement(placementValidation());
    }
  }, [triggerRef.current]);

  return (
    <Dropdown
      placement={volumeSliderPlacement}
      triggerType="hover"
      disabled={!volumeSlider}
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
