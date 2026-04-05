import React, {
  PropsWithChildren,
  useRef,
  FC,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { DrawerContext, drawerContext } from "./DrawerContext";
import { DrawerTrigger } from "./DrawerTrigger";
import { DrawerContent } from "./DrawerContent";
import useClickOutside from "@/hooks/useClickOutside";
import "./Drawer.css";

export interface DrawerProps extends Omit<Partial<DrawerContext>, "setIsOpen"> {
  outboundClickActive?: boolean;
  placement?: "bottom" | "top";
}

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
  outboundClickActive = false,
  placement = "bottom",
  children,
  isOpen: isOpenProp,
  onOpenChange,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [trigger, content] = React.Children.toArray(children);
  const [isOpen, setIsOpen] = useState(false);
  const drawerId = useId();

  useClickOutside(drawerRef, () => {
    if (!outboundClickActive) return;
    setIsOpen(false);
    onOpenChange && onOpenChange(false);
  });
  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, onOpenChange, drawerId }),
    [isOpen, setIsOpen, onOpenChange, drawerId]
  );

  return (
    <div className="rmap-drawer-container" ref={drawerRef}>
      <drawerContext.Provider value={contextValue}>
        <>
          {placement === "top" && content}
          {trigger}
          {placement === "bottom" && content}
        </>
      </drawerContext.Provider>
    </div>
  );
};

type DrawerComponent = typeof Drawer & {
  Trigger: typeof DrawerTrigger;
  Content: typeof DrawerContent;
};

export default Drawer as DrawerComponent;
