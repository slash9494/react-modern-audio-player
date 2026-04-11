import { ButtonHTMLAttributes, forwardRef } from "react";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { dropdownContext } from "./DropdownContext";
import { StyledBtn } from "@/ui/StyledBtn";

type DropdownTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
>;

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ children, className, ...props }, ref) => {
  const { isOpen, dropdownId } = useNonNullableContext(dropdownContext);
  const mergedClassName = className
    ? `rmap-dropdown-trigger ${className}`
    : "rmap-dropdown-trigger";

  return (
    <StyledBtn
      className={mergedClassName}
      type="button"
      aria-expanded={isOpen}
      aria-controls={dropdownId}
      ref={ref}
      {...props}
    >
      {children}
    </StyledBtn>
  );
});
DropdownTrigger.displayName = "DropdownTrigger";
