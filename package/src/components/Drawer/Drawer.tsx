import React, {
  PropsWithChildren,
  useRef,
  FC,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import { DrawerContext, drawerContext } from "./DrawerContext";
import { DrawerTrigger } from "./DrawerTrigger";
import { DrawerContent } from "./DrawerContent";
import { appearanceIn, appearanceOut } from "../CssTransition";
import useClickOutside from "@/hooks/useClickOutside";

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

  useClickOutside(drawerRef, () => {
    if (!outboundClickActive) return;
    setIsOpen(false);
    onOpenChange && onOpenChange(false);
  });
  useLayoutEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  return (
    <DrawerContainer className="drawer-container" ref={drawerRef}>
      <drawerContext.Provider value={{ isOpen, setIsOpen, onOpenChange }}>
        <>
          {placement === "top" && content}
          {trigger}
          {placement === "bottom" && content}
        </>
      </drawerContext.Provider>
    </DrawerContainer>
  );
};

type DrawerComponent = typeof Drawer & {
  Trigger: typeof DrawerTrigger;
  Content: typeof DrawerContent;
};

export default Drawer as DrawerComponent;

export const DrawerContainer = styled.div`
  position: relative;
  min-width: 20px;
  min-height: 20px;
  .drawer-trigger-wrapper {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    display: flex;
  }

  .drawer-content-wrapper {
    transform-origin: center top;
  }

  .drawer-content-wrapper-enter {
    animation: ${appearanceIn} 0.25s ease-out normal forwards;
  }

  .drawer-content-wrapper-leave {
    animation: ${appearanceOut} 0.1s ease-in forwards;
  }
`;
