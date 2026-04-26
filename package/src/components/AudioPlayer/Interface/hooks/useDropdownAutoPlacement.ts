import { DropdownContentPlacement } from "@/components/Dropdown";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { useState, useEffect } from "react";

export const useDropdownAutoPlacement = ({
  triggerRef,
  initialState,
}: {
  triggerRef: React.RefObject<HTMLElement>;
  initialState: DropdownContentPlacement;
}) => {
  const { playerPlacement } = useUIContext();
  const [autoPlacement, setAutoPlacement] =
    useState<DropdownContentPlacement>(initialState);

  useEffect(() => {
    if (triggerRef.current) {
      const placementValidation = (): DropdownContentPlacement => {
        if (
          triggerRef.current!.getBoundingClientRect().top <
          window.innerHeight / 2
        ) {
          return "bottom";
        }
        return "top";
      };

      const autoPlacementTimeout = setTimeout(() => {
        setAutoPlacement(placementValidation());
      }, 0);
      return () => {
        clearTimeout(autoPlacementTimeout);
      };
    }
  }, [playerPlacement, triggerRef]);
  return autoPlacement;
};
