import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { StyledBtn } from "@/ui/StyledBtn";
import { FC, PropsWithChildren, useCallback } from "react";
import { drawerContext } from "./DrawerContext";

type DrawerTriggerProps = PropsWithChildren<{
  "aria-label"?: string;
  "data-testid"?: string;
}>;

export const DrawerTrigger: FC<DrawerTriggerProps> = ({
  children,
  "aria-label": ariaLabel,
  "data-testid": testId,
}) => {
  const { isOpen, setIsOpen, onOpenChange, drawerId } =
    useNonNullableContext(drawerContext);

  const toggle = useCallback(() => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  }, [isOpen, setIsOpen, onOpenChange]);

  return (
    <StyledBtn
      className="rmap-drawer-trigger"
      type="button"
      aria-expanded={isOpen}
      aria-controls={drawerId}
      aria-label={ariaLabel}
      data-testid={testId}
      onClick={toggle}
    >
      {children}
    </StyledBtn>
  );
};
