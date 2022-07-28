import React, { PropsWithChildren, useRef } from "react";
import { FC, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { DropdownContext, dropdownContext } from "./DropdownContext";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownContent } from "./DropdownContent";
import { appearanceIn, appearanceOut } from "../CssTransition";
import useClickOutside from "@/hooks/useClickOutside";
import { useDropdown } from "./useDropdown";

export interface DropdownProps
  extends Omit<Partial<DropdownContext>, "setIsOpen"> {
  triggerType?: "click" | "hover";
  outboundClickActive?: boolean;
  placement?: DropdownContext["placement"];
  disabled?: boolean;
}

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  triggerType = "click",
  outboundClickActive = true,
  children,
  isOpen: isOpenProp,
  placement = "bottom",
  disabled = false,
  onOpenChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [trigger, content] = React.Children.toArray(children);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownEventProps = useDropdown({
    setIsOpen,
    isOpen,
    triggerType,
    clickArea: "root",
  });

  useClickOutside(dropdownRef, () => outboundClickActive && setIsOpen(false));
  useLayoutEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  return (
    <DropdownContainer
      className="dropdown-container"
      ref={dropdownRef}
      {...dropdownEventProps}
    >
      <dropdownContext.Provider
        value={{ dropdownRef, placement, isOpen, setIsOpen, onOpenChange }}
      >
        <>
          {trigger}
          {!disabled && content}
        </>
      </dropdownContext.Provider>
    </DropdownContainer>
  );
};

type DropdownComponent = typeof Dropdown & {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
};

export default Dropdown as DropdownComponent;

export const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  .dropdown-trigger-wrapper {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    display: flex;
  }

  .dropdown-content-wrapper {
    transform-origin: center top;
  }

  .dropdown-content-wrapper-enter {
    animation: ${appearanceIn} 0.25s ease-out normal forwards;
  }

  .dropdown-content-wrapper-leave {
    animation: ${appearanceOut} 0.1s ease-in forwards;
  }
`;
