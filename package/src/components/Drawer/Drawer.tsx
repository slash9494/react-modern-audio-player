import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  PlayerPlacement,
} from "@/components/AudioPlayer/Context";
import React, { PropsWithChildren, ReactElement } from "react";
import { FC, useLayoutEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DrawerContext, drawerContext } from "./DrawerContext";
import { DrawerTrigger } from "./DrawerTrigger";
import { DrawerContent } from "./DrawerContent";

export interface DrawerProps extends Omit<Partial<DrawerContext>, "setIsOpen"> {
  outboundClickActive?: boolean;
}

const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
  outboundClickActive = false,
  children,
  isOpen: isOpenProp,
  onOpenChange,
}) => {
  const [trigger, content] = React.Children.toArray(children);

  const { playerPlacement } = useNonNullableContext(audioPlayerStateContext);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);
  useLayoutEffect(() => {
    if (!outboundClickActive) return;
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      if (
        !(content as ReactElement<HTMLDivElement>).props.contains(
          target as Node
        ) &&
        !(trigger as ReactElement<HTMLDivElement>).props.contains(
          target as Node
        )
      ) {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outboundClickActive]);

  return (
    <DrawerContainer
      playerPlacement={playerPlacement}
      className="drawer-container"
    >
      <drawerContext.Provider value={{ isOpen, setIsOpen, onOpenChange }}>
        <>
          {trigger}
          {content}
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

interface DrawerContainerProps {
  playerPlacement?: PlayerPlacement;
}

export const DrawerContainer = styled.div`
  ${({ playerPlacement }: DrawerContainerProps) => css`
    position: relative;
    min-width: 20px;
    min-height: 20px;
    .drawer-trigger-wrapper {
      width: 100%;
      height: 100%;
      cursor: pointer;
      position: absolute;
      bottom: ${playerPlacement?.includes("top") ? "auto" : 0};
      display: flex;
      align-items: ${playerPlacement?.includes("top")
        ? "flex-start"
        : "flex-end"};
    }

    .drawer-content-wrapper {
      transform-origin: center top;
    }

    .drawer-content-wrapper-enter {
      animation: appearanceIn 0.25s ease-out normal forwards;
    }

    .drawer-content-wrapper-leave {
      animation: appearanceOut 0.1s ease-in forwards;
    }

    @keyframes appearanceIn {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      60% {
        opacity: 0.75;
        transform: scale(1.05);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes appearanceOut {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.5);
      }
    }
  `}
`;
