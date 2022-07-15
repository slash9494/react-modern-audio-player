import { CssTransition } from "components/CssTransition";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  PlayerPlacement,
} from "lib/audioContext/StateContext";
import React, {
  FC,
  forwardRef,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import classNames from "classnames";

export interface DropdownCommonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hoverTriggerActive?: boolean;
  outboundClickActive?: boolean;
}

// TODO: 선언적인 컴포넌트로 다시 작성해야 함.

export const DropdownTrigger = forwardRef(
  (
    {
      children,
      setIsOpen,
      hoverTriggerActive,
      outboundClickActive,
    }: PropsWithChildren<DropdownCommonProps>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    return (
      <div
        className={classNames("dropdown-trigger-wrapper", {
          hoverActive: isMouseEnter,
        })}
        onClick={
          !hoverTriggerActive ? () => setIsOpen((prev) => !prev) : undefined
        }
        ref={ref}
        onMouseEnter={
          hoverTriggerActive
            ? () => {
                setIsOpen(true);
                setIsMouseEnter(true);
              }
            : undefined
        }
        onMouseLeave={
          hoverTriggerActive
            ? () => {
                setIsMouseEnter(false);
                setIsOpen(false);
              }
            : undefined
        }
      >
        {children}
      </div>
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownContent = forwardRef(
  (
    {
      children,
      classNames,
      hoverTriggerActive,
      setIsOpen,
    }: PropsWithChildren<DropdownCommonProps & { classNames?: string }>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={classNames}
        ref={ref}
        onMouseEnter={hoverTriggerActive ? () => setIsOpen(true) : undefined}
        onMouseLeave={hoverTriggerActive ? () => setIsOpen(false) : undefined}
      >
        {children}
      </div>
    );
  }
);
DropdownContent.displayName = "DropdownContent";

export interface StyledDropdownProps {
  TriggerEl: (isOpen: boolean) => React.ReactElement;
  ContentEl: () => React.ReactElement;
  outboundClickActive?: boolean;
  hoverTriggerActive?: boolean;
  hoverContentsHeight?: number;
}

export const StyledDropdown: FC<StyledDropdownProps> = ({
  TriggerEl,
  ContentEl,
  outboundClickActive = false,
  hoverTriggerActive = false,
  hoverContentsHeight,
}) => {
  const { dropdownPlacement, playerPlacement } = useNonNullableContext(
    audioPlayerStateContext
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);

  useLayoutEffect(() => {
    if (!outboundClickActive || hoverTriggerActive) return;
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      if (
        contentRef.current &&
        !contentRef.current.contains(target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(target as Node)
      ) {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outboundClickActive, hoverTriggerActive]);

  return (
    <StyledDropdownContainer
      contentRef={contentRef.current}
      playerPlacement={playerPlacement}
      hoverContentsHeight={hoverContentsHeight}
      className="dropdown-container"
    >
      {dropdownPlacement === "bottom" && (
        <DropdownTrigger
          setIsOpen={setIsOpen}
          ref={triggerRef}
          hoverTriggerActive={hoverTriggerActive}
          outboundClickActive={outboundClickActive}
        >
          {TriggerEl(isOpen)}
        </DropdownTrigger>
      )}

      <CssTransition
        visible={isOpen}
        name={"dropdown-content-wrapper"}
        enterTime={20}
        leaveTime={60}
        clearTime={300}
        onExited={onExited}
        onEntered={onEntered}
      >
        <DropdownContent
          ref={contentRef}
          setIsOpen={setIsOpen}
          hoverTriggerActive={hoverTriggerActive}
        >
          {ContentEl()}
        </DropdownContent>
      </CssTransition>

      {dropdownPlacement === "top" && (
        <DropdownTrigger
          setIsOpen={setIsOpen}
          ref={triggerRef}
          hoverTriggerActive={hoverTriggerActive}
          outboundClickActive={outboundClickActive}
        >
          {TriggerEl(isOpen)}
        </DropdownTrigger>
      )}
    </StyledDropdownContainer>
  );
};

interface StyledDropdownContainerProps {
  contentRef: HTMLDivElement | null;
  playerPlacement?: PlayerPlacement;
  hoverContentsHeight?: number;
}

export const StyledDropdownContainer = styled.div`
  ${({
    playerPlacement,
    hoverContentsHeight,
  }: StyledDropdownContainerProps) => css`
    position: relative;
    min-width: 20px;
    min-height: 20px;
    .dropdown-trigger-wrapper {
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

    .dropdown-trigger-wrapper.hover-content-active {
      width: 100%;
      height: ${hoverContentsHeight ? `${hoverContentsHeight}px;` : "200px"};
    }

    .dropdown-content-wrapper {
      transform-origin: center top;
    }

    .dropdown-content-wrapper-enter {
      animation: appearanceIn 0.25s ease-out normal forwards;
    }

    .dropdown-content-wrapper-leave {
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
