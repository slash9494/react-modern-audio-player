import { FC } from "react";
import { Tooltip } from "@/components/Tooltip";
import { formatClockTime } from "@/utils/getTime";

export const ProgressTooltip: FC<{
  ratio: number | null;
  duration: number;
}> = ({ ratio, duration }) => {
  if (ratio == null || !duration || !isFinite(duration)) return null;
  return (
    <Tooltip
      className="rmap-progress-tooltip"
      style={{ left: `${ratio * 100}%` }}
    >
      {formatClockTime(ratio * duration)}
    </Tooltip>
  );
};
