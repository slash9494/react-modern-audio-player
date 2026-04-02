import { FC, PropsWithChildren } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { dropdownContext } from "./DropdownContext";

export const DropdownTrigger: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { isOpen, dropdownId } = useNonNullableContext(dropdownContext);
  return (
    <div
      className="dropdown-trigger-wrapper"
      aria-expanded={isOpen}
      aria-controls={dropdownId}
    >
      {children}
    </div>
  );
};
