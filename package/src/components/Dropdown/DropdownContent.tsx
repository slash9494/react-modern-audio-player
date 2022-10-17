import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { CssTransition } from "../CssTransition";
import { dropdownContext } from "./DropdownContext";
import { useDropdown } from "./useDropdown";

export type DropdownContentPlacement = "top" | "bottom" | "left" | "right";

export type DropdownContentProps = HTMLAttributes<HTMLDivElement> & {
  isWithAnimation?: boolean;
};

export interface DropdownSize {
  width: number;
  height: number;
}

export const DropdownContent: FC<PropsWithChildren<DropdownContentProps>> = ({
  children,
  isWithAnimation = true,
  ...dropdownContentProps
}) => {
  const { dropdownRef, placement, isOpen, setIsOpen } =
    useNonNullableContext(dropdownContext);
  const [dropdownSize, setDropdownSize] = useState<DropdownSize>();
  const { onClick } = useDropdown({
    setIsOpen,
    isOpen,
    clickArea: "content",
  });
  const onExited = () => setIsOpen(false);
  const onEntered = () => setIsOpen(true);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownSize({
        width: dropdownRef.current.offsetWidth,
        height: dropdownRef.current.offsetHeight,
      });
    }
  }, [dropdownRef]);

  const Content = useMemo(
    () =>
      dropdownSize ? (
        <DropdownContentContainer
          {...dropdownContentProps}
          dropdownSize={dropdownSize}
          placement={placement}
          onClick={onClick}
        >
          {children}
        </DropdownContentContainer>
      ) : null,
    [children, dropdownContentProps, dropdownSize, placement, onClick]
  );

  return isWithAnimation ? (
    <CssTransition
      visible={isOpen}
      name={"dropdown-content-wrapper"}
      enterTime={20}
      leaveTime={60}
      clearTime={300}
      onExited={onExited}
      onEntered={onEntered}
    >
      {Content}
    </CssTransition>
  ) : isOpen ? (
    Content
  ) : null;
};

interface DropdownContainerProps {
  placement: DropdownContentPlacement;
  dropdownSize: DropdownSize;
}

const DropdownContentContainer = styled.div`
  ${({ placement, dropdownSize }: DropdownContainerProps) => css`
    position: absolute;
    top: ${placement === "bottom" ? `${dropdownSize.height}px` : undefined};
    margin-top: ${placement === "bottom" ? `5px` : undefined};
    bottom: ${placement === "top" ? `${dropdownSize.height}px` : undefined};
    margin-bottom: ${placement === "top" ? `5px` : undefined};
    left: ${placement === "right" ? `${dropdownSize.width}px` : undefined};
    right: ${placement === "left" ? `${dropdownSize.width}px` : undefined};
  `}
`;
