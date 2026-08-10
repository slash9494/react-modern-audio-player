import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { useAutoPlacement } from "@/components/AudioPlayer/Interface/hooks";
import type { TooltipPlacement } from "@/components/Tooltip";

export const useTooltipPlacement = (
  wrapperRef: React.RefObject<HTMLElement>
): TooltipPlacement => {
  const { timeTooltipPlacement } = useUIContext();
  const autoPlacement = useAutoPlacement({
    triggerRef: wrapperRef,
    initialState: "top",
  });
  return (
    timeTooltipPlacement ?? (autoPlacement === "bottom" ? "bottom" : "top")
  );
};
