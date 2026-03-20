import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, KeyboardEvent, PropsWithChildren } from "react";
import { drawerContext } from "./DrawerContext";

export const DrawerTrigger: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { isOpen, setIsOpen, onOpenChange } =
    useNonNullableContext(drawerContext);

  const toggle = () => {
    setIsOpen(!isOpen);
    onOpenChange && onOpenChange(!isOpen);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={"drawer-trigger-wrapper"}
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
