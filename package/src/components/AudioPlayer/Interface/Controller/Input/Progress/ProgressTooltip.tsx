import { FC } from "react";
import { Tooltip, TooltipPlacement } from "@/components/Tooltip";
import { formatClockTime } from "@/utils/getTime";

export interface ProgressTooltipProps {
  ratio: number | null;
  duration: number;
  placement: TooltipPlacement;
}

export const ProgressTooltip: FC<ProgressTooltipProps> = ({
  ratio,
  duration,
  placement,
}) => {
  if (
    ratio == null ||
    !Number.isFinite(ratio) ||
    ratio < 0 ||
    ratio > 1 ||
    duration <= 0 ||
    !Number.isFinite(duration)
  ) {
    return null;
  }
  return (
    <Tooltip
      className="rmap-progress-tooltip"
      style={{ left: `${ratio * 100}%` }}
      placement={placement}
    >
      {formatClockTime(ratio * duration)}
    </Tooltip>
  );
};
