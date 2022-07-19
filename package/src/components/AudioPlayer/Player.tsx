import { View } from "@react-spectrum/view";
import { FC, useEffect, useLayoutEffect } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  ActiveUI,
  PlayListPlacement,
  CustomIcons,
  PlayerPlacement,
  PlayList,
  AudioInitialState,
  InterfacePlacement,
  CoverImgsCss,
  audioPlayerDispatchContext,
} from "@/components/AudioPlayer/Context";
import { Audio } from "./Audio";
import { Interface } from "./Interface";

// TODO : codesandBox , click scale animation, esm cjs test, file size, react-icons 사이즈 확인

export interface AudioPlayerProps {
  playList: PlayList;
  audioInitialState?: AudioInitialState;
  playerPlacement?: PlayerPlacement;
  playListPlacement?: PlayListPlacement;
  interfacePlacement?: InterfacePlacement;
  activeUI?: ActiveUI;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  playList,
  audioInitialState,
  playerPlacement,
  playListPlacement,
  interfacePlacement,
  activeUI,
  customIcons,
  coverImgsCss,
}) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  useLayoutEffect(() => {
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      playListPlacement,
      interfacePlacement,
    });
  }, [
    playListPlacement,
    audioPlayerDispatch,
    playerPlacement,
    interfacePlacement,
  ]);
  useLayoutEffect(() => {
    if (activeUI) {
      audioPlayerDispatch({ type: "SET_ACTIVE_UI", activeUI });
    }
  }, [activeUI, audioPlayerDispatch]);
  useLayoutEffect(() => {
    if (coverImgsCss) {
      audioPlayerDispatch({ type: "SET_COVER_IMGS_CSS", coverImgsCss });
    }
  }, [audioPlayerDispatch, coverImgsCss]);

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
    if (customIcons) {
      audioPlayerDispatch({ type: "SET_CUSTOM_ICONS", customIcons });
    }
  }, [customIcons, audioPlayerDispatch]);

  return (
    <View id="rs-audio-player" UNSAFE_className="rs-audio-player-container">
      <Audio />
      <Interface />
    </View>
  );
};
