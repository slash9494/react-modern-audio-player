import { useState, useEffect } from "react";
import { VolumeSliderPlacement } from "./Content";

export const useVolumeSliderPlacement = ({
  ref,
  initialState,
}: {
  ref: React.RefObject<HTMLElement>;
  initialState: VolumeSliderPlacement;
}) => {
  const [volumeSliderPlacement, setVolumeSliderPlacement] =
    useState<VolumeSliderPlacement>(initialState);
  useEffect(() => {
    if (ref.current) {
      const placementValidation = () => {
        if (ref.current!.getBoundingClientRect().top < window.innerHeight / 2) {
          return "bottom";
        }
        return "top";
      };
      setVolumeSliderPlacement(placementValidation());
    }
  }, [ref.current]);
  return volumeSliderPlacement;
};
