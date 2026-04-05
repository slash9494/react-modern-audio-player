import React, {
  PropsWithChildren,
  useRef,
  FC,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { DropdownContext, dropdownContext } from "./DropdownContext";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownContent } from "./DropdownContent";
import useClickOutside from "@/hooks/useClickOutside";
import { useDropdown } from "./useDropdown";
import "./Dropdown.css";

export interface DropdownProps
  extends Omit<Partial<DropdownContext>, "setIsOpen"> {
  triggerType?: "click" | "hover";
  outboundClickActive?: boolean;
  placement?: DropdownContext["placement"];
  disabled?: boolean;
  "data-testid"?: string;
}

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
  triggerType = "click",
  outboundClickActive = true,
  children,
  isOpen: isOpenProp,
  placement = "bottom",
  disabled = false,
  onOpenChange,
  "data-testid": testId,
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

  const dropdownId = useId();

  useClickOutside(dropdownRef, () => outboundClickActive && setIsOpen(false));
  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const contextValue = useMemo(
    () => ({
      dropdownRef,
      placement,
      isOpen,
      setIsOpen,
      onOpenChange,
      dropdownId,
    }),
    [placement, isOpen, onOpenChange, dropdownId]
  );

  return (
    <dropdownContext.Provider value={contextValue}>
      <div
        className="rmap-dropdown-container"
        ref={dropdownRef}
        data-testid={testId}
        {...dropdownEventProps}
      >
        <>
          {trigger}
          {!disabled && content}
        </>
      </div>
    </dropdownContext.Provider>
  );
};

type DropdownComponent = typeof Dropdown & {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
};

export default Dropdown as DropdownComponent;
