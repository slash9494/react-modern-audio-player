import { FC, useContext, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "../../hooks/useNonNullableContext";
import { MusicPlayerProvider } from "../../lib/musicContext";
import { musicPlayerDispatchContext } from "../../lib/musicContext/dispatchContext";
import { PlayList, CurAudioState } from "../../lib/musicContext/StateContext";
import { Control } from "./Control";
import { List } from "./List";
import { Player } from "./Player";

const MusicPlayerContainer = styled.div``;

export type AudioInitialState = Pick<
  CurAudioState,
  "autoPlay" | "muted" | "volume"
>;

interface MusicPlayerProps {
  playList: PlayList;
  audioInitialState: AudioInitialState;
}

const MusicPlayer: FC<MusicPlayerProps> = ({ playList, audioInitialState }) => {
  const audioInitialStateRef = useRef<AudioInitialState>(audioInitialState);
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

  return (
    <MusicPlayerContainer>
      <List />
      <Player />
      <Control />
    </MusicPlayerContainer>
  );
};

const MusicPlayerWithProvider: FC<MusicPlayerProps> = (props) => (
  <MusicPlayerProvider>
    <MusicPlayer {...props} />
  </MusicPlayerProvider>
);

export default MusicPlayerWithProvider;
