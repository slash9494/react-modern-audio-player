import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import {
  audioPlayerStateContext,
  PlayerPlacement,
} from "lib/audioContext/StateContext";
import { ChangeEvent, FC, useCallback, useMemo, useRef } from "react";
import styled, { css } from "styled-components";
import { StyledDropdown } from "./StyledDropdown";
import { TbVolume3, TbVolume, TbVolume2 } from "react-icons/tb";
import { IconBaseProps } from "react-icons/lib";
import { Icon } from "../Icon";
import { InterfaceChildrenProps } from "../../types";

export const Volume: FC<InterfaceChildrenProps> = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { curAudioState, playerPlacement, iconImgs, activeUI } =
    useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClickMuted = useCallback(
    () =>
      audioPlayerDispatch({ type: "SET_MUTED", muted: !curAudioState.muted }),
    [audioPlayerDispatch, curAudioState.muted]
  );
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

  const VolumeIcon = useMemo(() => {
    const volumeOpt: IconBaseProps = {
      size: "80%",
    };
    if (curAudioState.muted)
      return (
        <Icon
          render={<TbVolume3 {...volumeOpt} />}
          customImg={iconImgs?.muted}
        />
      );
    const volumeState = (value: number) => {
      if (value === 0) return "mute";
      if (value <= 0.5) return "low";
      if (value > 0.5) return "high";
    };
    switch (volumeState(curAudioState.volume)) {
      case "mute":
        return (
          <Icon
            render={<TbVolume3 {...volumeOpt} />}
            customImg={iconImgs?.muted}
          />
        );
      case "low":
        return (
          <Icon
            render={<TbVolume2 {...volumeOpt} />}
            customImg={iconImgs?.volumeHalf}
          />
        );
      case "high":
        return (
          <Icon
            render={<TbVolume {...volumeOpt} />}
            customImg={iconImgs?.volumeFull}
          />
        );
      default:
        return null;
    }
  }, [
    curAudioState.muted,
    curAudioState.volume,
    iconImgs?.muted,
    iconImgs?.volumeFull,
    iconImgs?.volumeHalf,
  ]);

  const TriggerEl = useMemo(() => {
    return (
      <TriggerElContainer onClick={onClickMuted}>
        {VolumeIcon}
      </TriggerElContainer>
    );
  }, [onClickMuted, VolumeIcon]);

  const ContentEl = useMemo(() => {
    return (
      <ContentElContainer
        playerPlacement={playerPlacement}
        volumeValue={curAudioState.volume * 100}
        ref={contentRef}
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
            step="0.1"
          />
        </div>
      </ContentElContainer>
    );
  }, [curAudioState.volume, onChangeVolume, playerPlacement]);
  return activeUI.volume ?? activeUI.all ? (
    <StyledDropdown
      TriggerEl={() => TriggerEl}
      ContentEl={() => ContentEl}
      hoverTriggerActive
      hoverContentsHeight={200}
    />
  ) : null;
};

const TriggerElContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentElContainer = styled.div`
  ${({
    playerPlacement,
    volumeValue,
  }: {
    playerPlacement?: PlayerPlacement;
    volumeValue: number;
  }) => css`
    --rs-audio-player-volume-value: ${volumeValue}%;

    position: absolute;
    bottom: 0;
    padding: 1rem;
    padding-left: 0;
    ${playerPlacement?.includes("top") &&
    css`
      bottom: auto;
    `}

    .volume-panel-wrapper {
      position: absolute;
      width: 30px;
      left: -3px;
      bottom: 14px;
      background-color: var(--rs-audio-player-volume-panel-background, #f2f2f2);
      border: 1px solid #ccc;
      height: 118px;
      box-shadow: 0 2px 4px rgb(0 0 0 /10%);
      ${playerPlacement?.includes("top") &&
      css`
        transform: rotateX(180deg);
        bottom: -115px;
      `}
      &:before {
        content: "";
        bottom: -10px;
        left: 7.9px;
        border-color: transparent transparent
          var(--rs-audio-player-volume-panel-border, #ccc)
          var(--rs-audio-player-volume-panel-border, #ccc);
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
          var(--rs-audio-player-volume-panel-background, #f2f2f2)
          var(--rs-audio-player-volume-panel-background, #f2f2f2);
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
        background-color: var(--rs-audio-player-volume-background, #ccc);
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
        background: var(--rs-audio-player-volume-thumb, #e5e5e5);
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 12px;
        overflow: visible;
        background: var(--rs-audio-player-volume-thumb, #e5e5e5);
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
          var(--rs-audio-player-volume-fill, rgba(0, 0, 0, 0.5))
            var(--rs-audio-player-volume-value),
          var(--rs-audio-player-volume-track, #ababab)
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
          var(--rs-audio-player-volume-fill, rgba(0, 0, 0, 0.5))
            var(--rs-audio-player-volume-value),
          var(--rs-audio-player-volume-track, #ababab)
            var(--rs-audio-player-volume-value)
        );
      }
    }
  `}
`;
