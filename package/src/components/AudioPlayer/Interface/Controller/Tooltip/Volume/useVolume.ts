import {
  audioPlayerStateContext,
  VolumeSliderPlacement,
} from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useState, useEffect } from "react";

export const useVolumeSliderPlacement = ({
  triggerRef,
  initialState,
}: {
  triggerRef: React.RefObject<HTMLElement>;
  initialState: VolumeSliderPlacement;
}) => {
  const { playerPlacement } = useNonNullableContext(audioPlayerStateContext);
  const [volumeSliderPlacement, setVolumeSliderPlacement] =
    useState<VolumeSliderPlacement>(initialState);

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

      const volumeSliderPlacementTimeout = setTimeout(() => {
        setVolumeSliderPlacement(placementValidation());
      }, 0);
      return () => {
        clearTimeout(volumeSliderPlacementTimeout);
      };
    }
  }, [playerPlacement, triggerRef]);
  return volumeSliderPlacement;
};
