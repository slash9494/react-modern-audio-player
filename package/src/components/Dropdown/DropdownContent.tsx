import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CssTransition } from "@/ui/CssTransition";
import { dropdownContext } from "./DropdownContext";
import { useDropdown } from "./useDropdown";
import { useDropdownPlacementStyle } from "./useDropdownPlacementStyle";

export type DropdownContentPlacement = "top" | "bottom" | "left" | "right";

export type DropdownContentProps = HTMLAttributes<HTMLDivElement> & {
  isWithAnimation?: boolean;
};

export interface DropdownSize {
  width: number;
  height: number;
}

export const DropdownContent: FC<PropsWithChildren<DropdownContentProps>> = ({
  children,
  isWithAnimation = true,
  ...dropdownContentProps
}) => {
  const { dropdownRef, placement, isOpen, setIsOpen, dropdownId } =
    useNonNullableContext(dropdownContext);
  const [dropdownSize, setDropdownSize] = useState<DropdownSize>();
  const { onClick } = useDropdown({
    setIsOpen,
    isOpen,
    clickArea: "content",
  });
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownSize({
        width: dropdownRef.current.offsetWidth,
        height: dropdownRef.current.offsetHeight,
      });
    }
  }, [dropdownRef]);

  const placementStyle = useDropdownPlacementStyle(placement, dropdownSize);

  const Content = useMemo(
    () =>
      dropdownSize ? (
        <div
          {...dropdownContentProps}
          id={dropdownId}
          style={placementStyle}
          onClick={onClick}
        >
          {children}
        </div>
      ) : null,
    [
      children,
      dropdownContentProps,
      dropdownSize,
      placementStyle,
      dropdownId,
      onClick,
    ]
  );

  return isWithAnimation ? (
    <CssTransition
      visible={isOpen}
      name={"dropdown-content-wrapper"}
      enterTime={20}
      leaveTime={60}
      clearTime={300}
      onExited={onExited}
      onEntered={onEntered}
    >
      {Content}
    </CssTransition>
  ) : isOpen ? (
    Content
  ) : null;
};
