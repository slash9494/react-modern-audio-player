import { FC } from "react";
import { Tooltip } from "@/components/Tooltip";
import { formatClockTime } from "@/utils/getTime";

export interface ProgressTooltipProps {
  ratio: number | null;
  duration: number;
}

export const ProgressTooltip: FC<ProgressTooltipProps> = ({
  ratio,
  duration,
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
    >
      {formatClockTime(ratio * duration)}
    </Tooltip>
  );
};
