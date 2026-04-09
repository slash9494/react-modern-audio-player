import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";
import { AudioPlayerProps } from ".";
import {
  audioPlayerDispatchContext,
  InterfacePlacement,
  PlayerPlacement,
  PlayListPlacement,
  VolumeSliderPlacement,
} from "../Context";

export const usePropsStateEffect = <TInterfacePlacementLength extends number>({
  placement = {},
  activeUI,
  coverImgsCss,
  audioInitialState,
  playList,
  customIcons,
}: Omit<AudioPlayerProps<TInterfacePlacementLength>, "children">) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  useDidUpdateEffect(() => {
    const {
      player: playerPlacement,
      playList: playListPlacement,
      interface: interfacePlacement,
      volumeSlider: volumeSliderPlacement,
    } = placement as {
      player?: PlayerPlacement;
      playList?: PlayListPlacement;
      interface?: InterfacePlacement;
      volumeSlider?: VolumeSliderPlacement;
    };
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      playListPlacement,
      interfacePlacement,
      volumeSliderPlacement,
    });
  }, [audioPlayerDispatch, placement]);

  useDidUpdateEffect(() => {
    if (!activeUI) return;
    audioPlayerDispatch({ type: "SET_ACTIVE_UI", activeUI });
  }, [activeUI, audioPlayerDispatch]);

  useDidUpdateEffect(() => {
    if (!coverImgsCss) return;
    audioPlayerDispatch({ type: "SET_COVER_IMGS_CSS", coverImgsCss });
  }, [audioPlayerDispatch, coverImgsCss]);

  useDidUpdateEffect(() => {
    if (!audioInitialState) return;
    audioPlayerDispatch({
      type: "SET_INITIAL_STATES",
      audioState: audioInitialState,
      curPlayId: audioInitialState.curPlayId,
    });
  }, [audioInitialState, audioPlayerDispatch]);

  useDidUpdateEffect(() => {
    audioPlayerDispatch({ type: "UPDATE_PLAY_LIST", playList });
  }, [audioPlayerDispatch, playList]);

  useDidUpdateEffect(() => {
    if (!customIcons) return;
    audioPlayerDispatch({ type: "SET_CUSTOM_ICONS", customIcons });
  }, [customIcons, audioPlayerDispatch]);
};
