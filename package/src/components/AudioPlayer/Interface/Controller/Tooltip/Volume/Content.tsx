import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { VolumeSliderPlacement } from "@/components/AudioPlayer/Context/StateContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { ChangeEvent, FC, useCallback, useRef } from "react";
import "./Content.css";

export const VolumeSlider: FC<{ placement: VolumeSliderPlacement }> = ({
  placement,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { curAudioState } = usePlaybackContext();
  const { elementRefs } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const onChangeVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (curAudioState.muted) {
        audioPlayerDispatch({ type: "SET_MUTED", muted: false });
      }

      const { value } = e.target;
      const parsedValue = parseFloat(value);
      audioPlayerDispatch({
        type: "SET_VOLUME",
        volume: parsedValue,
      });
    },
    [curAudioState.muted, audioPlayerDispatch]
  );

  const volumeValue =
    (curAudioState.volume ?? elementRefs?.audioEl?.volume ?? 0) * 100;

  return (
    <div
      ref={contentRef}
      className="volume-content-container"
      data-placement={placement}
      data-testid="volume-slider"
      style={
        {
          "--rm-audio-player-volume-value": `${volumeValue}%`,
        } as React.CSSProperties
      }
    >
      <div className="volume-panel-wrapper">
        <input
          className="volume-slider-input"
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={curAudioState.volume}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.01"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};
