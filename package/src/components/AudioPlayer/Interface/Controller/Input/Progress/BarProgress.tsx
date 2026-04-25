import { useTimeContext } from "@/components/AudioPlayer/Context/hooks/useTimeContext";
import { getTimeWithPadStart } from "@/utils/getTime";
import { safeRatio } from "@/utils/safeRatio";
import { FC, useEffect, useRef, useState } from "react";
import { useProgress } from "./useProgress";
import { useProgressKeyDown } from "./useProgressKeyDown";
import "./BarProgress.css";

export const BarProgress: FC = () => {
  const { currentTime, duration } = useTimeContext();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    setWrapperWidth(el.offsetWidth);
    const ro = new ResizeObserver(([entry]) => {
      setWrapperWidth(entry.contentBoxSize[0].inlineSize);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const progressRatio = safeRatio(currentTime, duration);

  const eventProps = useProgress();
  const handleKeyDown = useProgressKeyDown();

  const progressOffset = progressRatio * wrapperWidth;

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
      aria-valuenow={Math.round(progressRatio * 100)}
      aria-valuetext={`${getTimeWithPadStart(
        currentTime
      )} of ${getTimeWithPadStart(duration)}`}
      onKeyDown={handleKeyDown}
      {...eventProps}
    >
      <div className="rmap-progress-bar">
        <div
          className="rmap-progress-fill"
          style={{ transform: `scaleX(${progressRatio})` }}
        />
      </div>
      <div
        className="rmap-progress-handle"
        style={{
          transform: `translateX(${progressOffset}px)`,
        }}
      />
    </div>
  );
};
