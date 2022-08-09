import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useLayoutEffect, useEffect } from "react";
import { AudioPlayerProps } from ".";
import { audioPlayerDispatchContext } from "../Context";

export const usePropsStateEffect = ({
  placement = {},
  activeUI,
  coverImgsCss,
  audioInitialState,
  playList,
  customIcons,
}: AudioPlayerProps) => {
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
};
