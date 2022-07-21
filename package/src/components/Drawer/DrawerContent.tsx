import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, PropsWithChildren, useMemo } from "react";
import { CssTransition } from "../CssTransition";
import { drawerContext } from "./DrawerContext";

export type DrawerContentPlacement = "top" | "bottom" | "left" | "right";

export type DrawerContentProps = {
  isWithAnimation?: boolean;
};

export const DrawerContent: FC<PropsWithChildren<DrawerContentProps>> = ({
  children,
  isWithAnimation = true,
}) => {
  const { isOpen, setIsOpen } = useNonNullableContext(drawerContext);
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);

  const Content = useMemo(
    () => <div className="drawer-content-container">{children}</div>,

    [children]
  );

  return isWithAnimation ? (
    <CssTransition
      visible={isOpen}
      name={"drawer-content-wrapper"}
      enterTime={20}
      leaveTime={60}
      clearTime={300}
      onExited={onExited}
      onEntered={onEntered}
    >
      {Content}
    </CssTransition>
  ) : (
    Content
  );
};
