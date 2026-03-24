import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, KeyboardEvent, PropsWithChildren, useCallback } from "react";
import styled from "styled-components";
import { drawerContext } from "./DrawerContext";

export const DrawerTrigger: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { isOpen, setIsOpen, onOpenChange } =
    useNonNullableContext(drawerContext);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
    onOpenChange && onOpenChange(!isOpen);
  }, [isOpen, setIsOpen, onOpenChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <TriggerWrapper
      className="drawer-trigger-wrapper"
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls="playlist-drawer"
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      {children}
    </TriggerWrapper>
  );
};

const TriggerWrapper = styled.div`
  &:focus-visible {
    outline: 2px solid var(--rm-audio-player-progress-bar);
    outline-offset: 2px;
  }
`;
