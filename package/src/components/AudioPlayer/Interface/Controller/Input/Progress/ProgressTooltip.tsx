import { FC } from "react";
import { formatClockTime } from "@/utils/getTime";
import "./ProgressTooltip.css";

export const ProgressTooltip: FC<{
  ratio: number | null;
  duration: number;
}> = ({ ratio, duration }) => {
  if (ratio == null || !duration || !isFinite(duration)) return null;
  return (
    <div
      className="rmap-progress-tooltip"
      style={{ left: `${ratio * 100}%` }}
      aria-hidden="true"
    >
      {formatClockTime(ratio * duration)}
    </div>
  );
};
