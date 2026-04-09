import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { VolumeSliderPlacement } from "@/components/AudioPlayer/Context/StateContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { ChangeEvent, FC, useCallback, useMemo, useRef } from "react";
import "./Content.css";

export const VolumeSlider: FC<{ placement: VolumeSliderPlacement }> = ({
  placement,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { volume, muted } = usePlaybackContext();
  const { elementRefs } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const onChangeVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (muted) {
        audioPlayerDispatch({ type: "SET_MUTED", muted: false });
      }

      const { value } = e.target;
      const parsedValue = parseFloat(value);
      audioPlayerDispatch({
        type: "SET_VOLUME",
        volume: parsedValue,
      });
    },
    [muted, audioPlayerDispatch]
  );

  const resolvedVolume = volume ?? elementRefs?.audioEl?.volume ?? 0;
  const volumeValue = resolvedVolume * 100;
  const volumePercent = Math.round(volumeValue);

  const volumeStyle = useMemo(
    () =>
      ({
        "--rm-audio-player-volume-value": `${volumeValue}%`,
      } as React.CSSProperties),
    [volumeValue]
  );

  return (
    <div
      ref={contentRef}
      className="rmap-volume-container"
      data-placement={placement}
      data-testid="volume-slider"
      style={volumeStyle}
    >
      <div className="rmap-volume-panel">
        <input
          className="rmap-volume-slider"
          type="range"
          style={{ cursor: "pointer" }}
          value={resolvedVolume}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.01"
          aria-label={muted ? "Volume (muted)" : "Volume"}
          aria-valuetext={`${volumePercent} percent`}
        />
      </div>
    </div>
  );
};
