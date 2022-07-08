import { FC, useEffect, useLayoutEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useNonNullableContext } from "../../hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "../../lib/audioContext/dispatchContext";
import {
  ActiveUI,
  DropdownPlacement,
  IconImgs,
  audioPlayerStateContext,
  PlayerPlacement,
  PlayList,
  AudioInitialState,
  InterfacePlacement,
} from "../../lib/audioContext/StateContext";
import { Audio } from "./Audio";
import { Interface } from "./Interface";

// TODO : codesandBox , click scale animation, esm cjs test, file size, react-icons 사이즈 확인

export interface AudioPlayerProps {
  playList: PlayList;
  audioInitialState?: AudioInitialState;
  cssStyle?: React.CSSProperties; //TODO : useCSS;
  playerPlacement?: PlayerPlacement;
  dropdownPlacement?: DropdownPlacement;
  interfacePlacement?: InterfacePlacement;
  activeUI?: ActiveUI;
  iconImgs?: IconImgs;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  playList,
  audioInitialState,
  cssStyle,
  playerPlacement,
  dropdownPlacement,
  interfacePlacement,
  activeUI,
  iconImgs,
}) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const { playerPlacement: contextPlayerPlacement } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  useLayoutEffect(() => {
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      dropdownPlacement,
      interfacePlacement,
    });
  }, [
    dropdownPlacement,
    audioPlayerDispatch,
    playerPlacement,
    interfacePlacement,
  ]);
  useLayoutEffect(() => {
    if (activeUI) {
      audioPlayerDispatch({ type: "SET_ACTIVE_UI", activeUI });
    }
  }, [activeUI, audioPlayerDispatch]);

  useEffect(() => {
    if (audioInitialState) {
      audioPlayerDispatch({
        type: "SET_INITIAL_AUDIO_STATE",
        audioInitialState: audioInitialState,
      });
    }
  }, [audioInitialState, audioPlayerDispatch]);
  useEffect(() => {
    audioPlayerDispatch({ type: "UPDATE_PLAY_LIST", playList });
  }, [audioPlayerDispatch, playList]);
  useEffect(() => {
    if (iconImgs) {
      audioPlayerDispatch({ type: "SET_ICON_IMGS", iconImgs });
    }
  }, [iconImgs, audioPlayerDispatch]);

  return (
    <AudioPlayerContainer
      id="rs-audio-player"
      ref={playerContainerRef}
      style={{ ...cssStyle }}
      placement={contextPlayerPlacement}
    >
      <Audio />
      <Interface />
    </AudioPlayerContainer>
  );
};

interface AudioPlayerContainerProps {
  placement?: PlayerPlacement;
}

const AudioPlayerContainer = styled.div`
  ${({ placement }: AudioPlayerContainerProps) => css`
    width: 100%;
    border: 1px solid red;
    ${placement &&
    css`
      position: fixed;
      ${/bottom/.test(placement) &&
      css`
        bottom: 0;
      `}
      ${/top/.test(placement) &&
      css`
        top: 0;
      `}
    ${/left/.test(placement) &&
      css`
        left: 0;
      `}
    ${/right/.test(placement) &&
      css`
        right: 0;
      `}
    `}
  `}
`;
