import { CSSProperties, useMemo } from "react";
import { DropdownContentPlacement, DropdownSize } from "./DropdownContent";

export const useDropdownPlacementStyle = (
  placement: DropdownContentPlacement,
  dropdownSize: DropdownSize | undefined
): CSSProperties | undefined => {
  return useMemo(() => {
    if (!dropdownSize) return undefined;
    return {
      position: "absolute" as const,
      top: placement === "bottom" ? `${dropdownSize.height}px` : undefined,
      marginTop: placement === "bottom" ? "5px" : undefined,
      bottom: placement === "top" ? `${dropdownSize.height}px` : undefined,
      marginBottom: placement === "top" ? "5px" : undefined,
      left: placement === "right" ? `${dropdownSize.width}px` : undefined,
      right: placement === "left" ? `${dropdownSize.width}px` : undefined,
    };
  }, [dropdownSize, placement]);
};
