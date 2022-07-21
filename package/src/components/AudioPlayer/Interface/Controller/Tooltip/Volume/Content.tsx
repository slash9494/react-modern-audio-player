import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import {
  audioPlayerStateContext,
  PlayerPlacement,
} from "@/components/AudioPlayer/Context/StateContext";
import { ChangeEvent, FC, useCallback, useRef } from "react";
import styled, { css } from "styled-components";

export type VolumeSliderPlacement = "bottom" | "top";

export const VolumeSlider: FC<{ placement: VolumeSliderPlacement }> = ({
  placement,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { curAudioState } = useNonNullableContext(audioPlayerStateContext);
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
  return (
    <VolumeSliderContainer
      contentPlacement={placement}
      volumeValue={curAudioState.volume * 100}
      ref={contentRef}
      className="volume-content-container"
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
        />
      </div>
    </VolumeSliderContainer>
  );
};

const VolumeSliderContainer = styled.div`
  ${({
    contentPlacement,
    volumeValue,
  }: {
    contentPlacement?: PlayerPlacement;
    volumeValue: number;
  }) => css`
    --rs-audio-player-volume-value: ${volumeValue}%;
    position: relative;
    height: 119px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${contentPlacement?.includes("top") &&
    css`
      bottom: auto;
    `}

    .volume-panel-wrapper {
      width: 30px;
      background-color: var(--rs-audio-player-volume-panel-background);
      border: 1px solid var(--rs-audio-player-volume-panel-border);
      border-radius: 5px;
      height: 118px;
      box-shadow: 0 2px 4px rgb(0 0 0 /10%);
      position: absolute;
      bottom: 5px;
      ${contentPlacement?.includes("bottom") &&
      css`
        transform: rotateX(180deg);
        top: 5px;
      `}
      &:before {
        content: "";
        bottom: -10px;
        left: 7.9px;
        border-color: transparent transparent
          var(--rs-audio-player-volume-panel-border)
          var(--rs-audio-player-volume-panel-border);
        border-style: solid;
        border-width: 5px;
        box-shadow: -3px 3px 4px rgb(0 0 0 / 10%);
        position: absolute;
        width: 0;
        height: 0;
        box-sizing: border-box;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        pointer-events: none;
        z-index: 0;
      }
      &:after {
        content: "";
        bottom: -8px;
        left: 9px;
        border-color: transparent transparent
          var(--rs-audio-player-volume-panel-background)
          var(--rs-audio-player-volume-panel-background);
        border-style: solid;
        border-width: 4px;
        z-index: 1;
        position: absolute;
        width: 0;
        height: 0;
        box-sizing: border-box;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        pointer-events: none;
      }
    }

    input {
      &[type="range"] {
        margin-left: 14px;
        position: absolute;
        display: block;
        top: -45px;
        left: 0;
        height: 2px;
        width: 92px;
        -webkit-appearance: none;
        background-color: var(--rs-audio-player-volume-background);
        outline-color: transparent;
        transform-origin: 75px 75px;
        transform: rotate(-90deg);
      }

      &:focus {
        outline-color: transparent;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 12px;
        overflow: visible;
        background: var(--rs-audio-player-volume-thumb);
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 12px;
        overflow: visible;
        background: var(--rs-audio-player-volume-thumb);
        border: none;
      }
      &::-moz-range-track {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        overflow: visible;
        color: transparent;
        cursor: pointer;
        border-radius: 2%/50%;
        border-color: transparent;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 3px;
        background-image: linear-gradient(
          90deg,
          var(--rs-audio-player-volume-fill) var(--rs-audio-player-volume-value),
          var(--rs-audio-player-volume-track)
            var(--rs-audio-player-volume-value)
        );
      }

      &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        overflow: visible;
        color: transparent;
        cursor: pointer;
        border-radius: 2%/50%;
        border-color: transparent;
        background-color: transparent;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 3px;
        background-image: linear-gradient(
          90deg,
          var(--rs-audio-player-volume-fill) var(--rs-audio-player-volume-value),
          var(--rs-audio-player-volume-track)
            var(--rs-audio-player-volume-value)
        );
      }
    }
  `}
`;
