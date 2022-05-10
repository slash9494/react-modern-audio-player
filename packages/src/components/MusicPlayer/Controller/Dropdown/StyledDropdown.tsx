import { CssTransition } from "components/CssTransition";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { musicPlayerStateContext } from "lib/musicContext/StateContext";
import React, {
  FC,
  forwardRef,
  PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";

export interface DropdownTriggerProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownTrigger = forwardRef(
  (
    { children, setIsOpen }: PropsWithChildren<DropdownTriggerProps>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className="dropdown-trigger-wrapper"
        onClick={() => setIsOpen((prev) => !prev)}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

export const DropdownContent = forwardRef(
  (
    { children, classNames }: PropsWithChildren<{ classNames?: string }>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className={classNames} ref={ref}>
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
  // TODO : feature - dropdown open event with hovering trigger
  hoverTriggerActive?: boolean;
}

interface StyledDropdownContainerProps {
  contentClassName?: string;
}

export const StyledDropdownContainer = styled.div`
  ${({ contentClassName }: StyledDropdownContainerProps) => css`
    .dropdown-trigger-wrapper {
      cursor: pointer;
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

export const StyledDropdown: FC<StyledDropdownProps> = ({
  TriggerEl,
  ContentEl,
  outboundClickActive = false,
  hoverTriggerActive = false,
}) => {
  const { dropdownPlacement } = useNonNullableContext(musicPlayerStateContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);

  // TODO: feature - dropdown close event except dropdown content
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
    <StyledDropdownContainer contentClassName={contentRef.current?.className}>
      {dropdownPlacement === "bottom" && (
        <DropdownTrigger setIsOpen={setIsOpen} ref={triggerRef}>
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
        <DropdownContent ref={contentRef}>
          <ContentEl />
        </DropdownContent>
      </CssTransition>

      {dropdownPlacement === "top" && (
        <DropdownTrigger setIsOpen={setIsOpen} ref={triggerRef}>
          {TriggerEl(isOpen)}
        </DropdownTrigger>
      )}
    </StyledDropdownContainer>
  );
};
