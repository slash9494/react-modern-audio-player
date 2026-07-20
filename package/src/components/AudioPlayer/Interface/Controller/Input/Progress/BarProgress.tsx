import { useTimeContext } from "@/components/AudioPlayer/Context/hooks/useTimeContext";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { formatClockTime } from "@/utils/getTime";
import { safeRatio } from "@/utils/safeRatio";
import { FC, useEffect, useRef, useState } from "react";
import { ProgressTooltip } from "./ProgressTooltip";
import { useProgress, useProgressKeyDown } from "./hooks";
import { useAutoPlacement } from "@/components/AudioPlayer/Interface/hooks";
import "./BarProgress.css";

export const BarProgress: FC = () => {
  const { currentTime, duration } = useTimeContext();
  const { timeTooltipPlacement } = useUIContext();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const autoPlacement = useAutoPlacement({
    triggerRef: wrapperRef,
    initialState: "top",
  });
  const tooltipPlacement =
    timeTooltipPlacement ?? (autoPlacement === "bottom" ? "bottom" : "top");

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    setWrapperWidth(el.offsetWidth);
    const resizeObserver = new ResizeObserver(([entry]) => {
      setWrapperWidth(entry.contentBoxSize[0].inlineSize);
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  const { progressProps, previewRatio, hoverRatio } = useProgress();
  const handleKeyDown = useProgressKeyDown();

  const ratio = previewRatio ?? safeRatio(currentTime, duration);

  const progressOffset = ratio * wrapperWidth;

  return (
    <div
      ref={wrapperRef}
      className="rmap-bar-progress-wrapper"
      data-testid="progress-bar"
      role="slider"
      tabIndex={0}
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      aria-valuetext={`${formatClockTime(currentTime)} of ${formatClockTime(
        duration
      )}`}
      onKeyDown={handleKeyDown}
      {...progressProps}
    >
      <div className="rmap-progress-bar">
        <div
          className="rmap-progress-fill"
          style={{ transform: `scaleX(${ratio})` }}
        />
      </div>
      <div
        className="rmap-progress-handle"
        style={{
          transform: `translateX(${progressOffset}px)`,
        }}
      />
      <ProgressTooltip
        ratio={previewRatio ?? hoverRatio}
        duration={duration}
        placement={tooltipPlacement}
      />
    </div>
  );
};
