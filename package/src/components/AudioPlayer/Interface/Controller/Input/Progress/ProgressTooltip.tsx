import { FC, useLayoutEffect, useRef, useState } from "react";
import { Tooltip, TooltipPlacement } from "@/components/Tooltip";
import { formatClockTime } from "@/utils/getTime";

export interface ProgressTooltipProps {
  ratio: number | null;
  duration: number;
  placement: TooltipPlacement;
  containerWidth?: number;
}

const hasRenderableProgress = (
  ratio: number | null,
  duration: number
): ratio is number =>
  ratio != null &&
  Number.isFinite(ratio) &&
  ratio >= 0 &&
  ratio <= 1 &&
  duration > 0 &&
  Number.isFinite(duration);

const clampCenter = (
  centerPx: number,
  tooltipWidth: number,
  containerWidth: number
) =>
  Math.min(
    Math.max(centerPx, tooltipWidth / 2),
    containerWidth - tooltipWidth / 2
  );

export const ProgressTooltip: FC<ProgressTooltipProps> = ({
  ratio,
  duration,
  placement,
  containerWidth = 0,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  const isRenderable = hasRenderableProgress(ratio, duration);

  useLayoutEffect(() => {
    if (!isRenderable) return;
    const el = tooltipRef.current;
    if (!el) return;
    setTooltipWidth(el.offsetWidth);

    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(() => {
      const node = tooltipRef.current;
      if (node) setTooltipWidth(node.offsetWidth);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [isRenderable]);

  if (!hasRenderableProgress(ratio, duration)) {
    return null;
  }

  const canClamp = containerWidth > 0 && tooltipWidth > 0;
  const left = canClamp
    ? `${clampCenter(ratio * containerWidth, tooltipWidth, containerWidth)}px`
    : `${ratio * 100}%`;

  return (
    <Tooltip
      ref={tooltipRef}
      className="rmap-progress-tooltip"
      style={{ left }}
      placement={placement}
    >
      {formatClockTime(ratio * duration)}
    </Tooltip>
  );
};
