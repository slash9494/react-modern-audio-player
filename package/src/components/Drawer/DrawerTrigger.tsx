import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, PropsWithChildren } from "react";
import { drawerContext } from "./DrawerContext";

export const DrawerTrigger: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { isOpen, setIsOpen, onOpenChange } =
    useNonNullableContext(drawerContext);
  return (
    <div
      className={"drawer-trigger-wrapper"}
      onClick={() => {
        setIsOpen(!isOpen);
        onOpenChange && onOpenChange(!isOpen);
      }}
    >
      {children}
    </div>
  );
};
