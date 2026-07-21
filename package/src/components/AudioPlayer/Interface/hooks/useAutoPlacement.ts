import { DropdownContentPlacement } from "@/components/Dropdown";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { useState, useEffect } from "react";

export const useAutoPlacement = ({
  triggerRef,
  initialState,
}: {
  triggerRef: React.RefObject<HTMLElement>;
  initialState: DropdownContentPlacement;
}) => {
  const { playerPlacement } = useUIContext();
  const [autoPlacement, setAutoPlacement] =
    useState<DropdownContentPlacement>(initialState);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const resolvePlacement = (): DropdownContentPlacement =>
      trigger.getBoundingClientRect().top < window.innerHeight / 2
        ? "bottom"
        : "top";

    // setState to the same string is a no-op re-render, so unconditional
    // remeasurement on every scroll/resize burst stays cheap.
    const measure = () => setAutoPlacement(resolvePlacement());

    const initialMeasureTimeout = setTimeout(measure, 0);

    // Coalesce scroll/resize bursts into one getBoundingClientRect per frame.
    let scheduledFrame: number | null = null;
    const scheduleMeasure = () => {
      if (scheduledFrame !== null) return;
      scheduledFrame = requestAnimationFrame(() => {
        scheduledFrame = null;
        measure();
      });
    };

    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    // Absent on the same legacy engines fetchWithTimeout guards for; the
    // scroll/resize listeners still degrade gracefully without it.
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;
    resizeObserver?.observe(trigger);

    return () => {
      clearTimeout(initialMeasureTimeout);
      if (scheduledFrame !== null) cancelAnimationFrame(scheduledFrame);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      resizeObserver?.disconnect();
    };
  }, [playerPlacement, triggerRef]);
  return autoPlacement;
};
