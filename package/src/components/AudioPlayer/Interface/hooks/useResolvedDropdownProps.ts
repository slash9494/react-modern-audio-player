import type { DropdownContentPlacement } from "@/ui/Dropdown";
import { useAutoPlacement } from "./useAutoPlacement";

type TriggerType = "click" | "hover";

interface UseResolvedDropdownPropsParams {
  triggerType: TriggerType | undefined;
  placement: DropdownContentPlacement | undefined;
  contextPlacement: DropdownContentPlacement | undefined;
  triggerRef: React.RefObject<HTMLElement>;
  defaults: {
    triggerType: TriggerType;
    placement: DropdownContentPlacement;
  };
}

export const useResolvedDropdownProps = ({
  triggerType,
  placement,
  contextPlacement,
  triggerRef,
  defaults,
}: UseResolvedDropdownPropsParams) => {
  const autoPlacement = useAutoPlacement({
    triggerRef,
    initialState: defaults.placement,
  });
  const resolvedTriggerType = triggerType ?? defaults.triggerType;
  const resolvedPlacement = placement ?? contextPlacement ?? autoPlacement;
  // tooltip role is wrong for click-opened interactive panels; use dialog there.
  const contentRole: "tooltip" | "dialog" =
    resolvedTriggerType === "hover" ? "tooltip" : "dialog";
  return {
    triggerType: resolvedTriggerType,
    placement: resolvedPlacement,
    contentRole,
  };
};
