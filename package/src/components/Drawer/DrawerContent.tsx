import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { CssTransition } from "../CssTransition";
import { drawerContext } from "./DrawerContext";

export type DrawerContentPlacement = "top" | "bottom" | "left" | "right";

export type DrawerContentProps = HTMLAttributes<HTMLDivElement> & {
  placement?: DrawerContentPlacement;
  isWithAnimation?: boolean;
};

export const DrawerContent: FC<PropsWithChildren<DrawerContentProps>> = ({
  children,
  isWithAnimation = true,
  ...drawerContentProps
}) => {
  const { isOpen, setIsOpen } = useNonNullableContext(drawerContext);
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);

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
      <DrawerContentContainer {...drawerContentProps}>
        {children}
      </DrawerContentContainer>
    </CssTransition>
  ) : (
    <DrawerContentContainer {...drawerContentProps}>
      {children}
    </DrawerContentContainer>
  );
};

const DrawerContentContainer = styled.div`
  ${({ placement }: DrawerContentProps) => css`
    position: absolute;
    top: ${placement === "top" ? "0" : undefined};
    bottom: ${placement === "bottom" ? "0" : undefined};
    left: ${placement === "left" ? "0" : undefined};
    right: ${placement === "right" ? "0" : undefined};
  `}
`;
