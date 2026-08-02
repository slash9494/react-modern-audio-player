import { useUIContext } from "@/audio-player/Context/hooks/useUIContext";
import { useAutoPlacement } from "@/audio-player/Interface/hooks";
import type { TooltipPlacement } from "@/ui/Tooltip";

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
