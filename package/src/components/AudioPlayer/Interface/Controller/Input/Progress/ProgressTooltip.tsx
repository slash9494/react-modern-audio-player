import { FC, useRef } from "react";
import { Tooltip, TooltipPlacement } from "@/components/Tooltip";
import { formatClockTime } from "@/utils/getTime";
import { useElementWidth } from "./hooks";

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
  const tooltipWidth = useElementWidth(tooltipRef);

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
