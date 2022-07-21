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

export interface AudioPlayerProps {
  playList: PlayList;
  audioInitialState?: AudioInitialState;
  activeUI?: ActiveUI;
  customIcons?: CustomIcons;
  coverImgsCss?: CoverImgsCss;
  placement?: {
    player?: PlayerPlacement;
    playList?: PlayListPlacement;
    interface?: InterfacePlacement;
  };
}

export const AudioPlayer: FC<AudioPlayerProps> = ({
  playList,
  audioInitialState,
  placement = {},
  activeUI,
  customIcons,
  coverImgsCss,
}) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  useLayoutEffect(() => {
    const {
      player: playerPlacement,
      playList: playListPlacement,
      interface: interfacePlacement,
    } = placement;
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      playListPlacement,
      interfacePlacement,
    });
  }, [audioPlayerDispatch, placement]);
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
