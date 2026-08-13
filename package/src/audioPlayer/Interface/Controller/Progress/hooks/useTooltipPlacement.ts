import { useUIContext } from "@/audioPlayer/Context/hooks/useUIContext";
import { useAutoPlacement } from "@/audioPlayer/Interface/hooks";
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
