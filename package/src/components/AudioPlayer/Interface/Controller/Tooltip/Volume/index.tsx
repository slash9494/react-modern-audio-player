import { FC, useEffect, useRef, useState } from "react";
import { VolumeSlider, VolumeSliderPlacement } from "./Content";
import Dropdown from "@/components/Dropdown";
import { VolumeTriggerBtn } from "../../Button";

export const Volume: FC = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
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
    <Dropdown placement={volumeSliderPlacement} triggerType="hover">
      <Dropdown.Trigger>
        <VolumeTriggerBtn ref={triggerRef} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <VolumeSlider placement={volumeSliderPlacement} />
      </Dropdown.Content>
    </Dropdown>
  );
};
