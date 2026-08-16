import { HTMLAttributes, useRef } from "react";
import { DropdownProps } from "./Dropdown";

export const useDropdown = ({
  clickArea,
  triggerType,
  isOpen,
  setIsOpen,
  onOpenChange,
}: {
  clickArea: "root" | "content";
  triggerType?: DropdownProps["triggerType"];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange?: (isOpen: boolean) => void;
}): HTMLAttributes<HTMLDivElement> => {
  const timer = useRef<number>();
  const lazyChangeVisible = (nextState: boolean) => {
    const clear = () => {
      clearTimeout(timer.current);
      timer.current = undefined;
    };
    const handler = (nextState: boolean) => {
      setIsOpen(nextState);
      onOpenChange && onOpenChange(nextState);
      clear();
    };
    clear();
    if (nextState) {
      timer.current = window.setTimeout(() => handler(true), 100);
      return;
    }
    timer.current = window.setTimeout(() => handler(false), 100);
  };
  const mouseEventHandler = (next: boolean) => {
    triggerType === "hover" && lazyChangeVisible(next);
  };
  const clickEventHandler = () => {
    if (triggerType !== "click") return;
    setIsOpen(!isOpen);
    onOpenChange && onOpenChange(!isOpen);
  };
  const preventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };
  return {
    onClick: clickArea === "content" ? preventHandler : clickEventHandler,
    onKeyUp: () => mouseEventHandler(true),
    onMouseEnter: () => mouseEventHandler(true),
    onMouseLeave: () => mouseEventHandler(false),
    onFocus: () => mouseEventHandler(true),
    onBlur: () => mouseEventHandler(false),
  };
};
