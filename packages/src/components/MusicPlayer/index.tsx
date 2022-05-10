import { FC, useContext, useLayoutEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useNonNullableContext } from "../../hooks/useNonNullableContext";
import { MusicPlayerProvider } from "../../lib/musicContext";
import { musicPlayerDispatchContext } from "../../lib/musicContext/dispatchContext";
import {
  PlayList,
  CurAudioState,
  musicPlayerStateContext,
  DropdownPlacement,
  PlayerPlacement,
} from "../../lib/musicContext/StateContext";
import { Controller } from "./Controller";
import { Player } from "./Player";
import { GlobalStyle } from "../../GlobalStyle";

interface MusicPlayerContainerProps {
  placement: PlayerPlacement;
}

const MusicPlayerContainer = styled.div`
  ${({ placement }: MusicPlayerContainerProps) => css`
    position: fixed;
    width: 100%;
    border: 1px solid red;
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
`;

export type AudioInitialState = Pick<
  CurAudioState,
  "autoPlay" | "muted" | "volume"
>;

export interface MusicPlayerProps {
  playList: PlayList;
  audioInitialState: AudioInitialState;
  cssStyle?: React.CSSProperties;
  playerPlacement?: PlayerPlacement;
  dropdownPlacement?: DropdownPlacement;
}

const MusicPlayer: FC<MusicPlayerProps> = ({
  playList,
  audioInitialState,
  cssStyle,
  playerPlacement,
  dropdownPlacement,
}) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const audioInitialStateRef = useRef<AudioInitialState>(audioInitialState);
  const { playerPlacement: contextPlayerPlacement } = useNonNullableContext(
    musicPlayerStateContext
  );
  const musicPlayerDispatch = useNonNullableContext(musicPlayerDispatchContext);
  useLayoutEffect(() => {
    musicPlayerDispatch({ type: "UPDATE_PLAY_LIST", playList });
  }, [musicPlayerDispatch, playList]);
  useLayoutEffect(() => {
    musicPlayerDispatch({
      type: "SET_INITIAL_AUDIO_STATE",
      audioInitialState: audioInitialStateRef.current,
    });
  }, [musicPlayerDispatch]);
  useLayoutEffect(() => {
    musicPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      dropdownPlacement,
    });
  }, [dropdownPlacement, musicPlayerDispatch, playerPlacement]);

  return (
    <MusicPlayerContainer
      ref={playerContainerRef}
      style={{ ...cssStyle }}
      placement={contextPlayerPlacement}
    >
      <Player />
      <Controller />
      <div className="sortable-play-list-content-wrapper" />
    </MusicPlayerContainer>
  );
};

export const MusicPlayerWithProvider: FC<MusicPlayerProps> = (props) => (
  <MusicPlayerProvider>
    <GlobalStyle />
    <MusicPlayer {...props} />
  </MusicPlayerProvider>
);
