import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";
import { AudioPlayerProps } from ".";
import {
  audioPlayerDispatchContext,
  InterfacePlacement,
  PlayerPlacement,
  PlayListPlacement,
  VolumeSliderPlacement,
  TimeTooltipPlacement,
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
      timeTooltip: timeTooltipPlacement,
    } = placement as {
      player?: PlayerPlacement;
      playList?: PlayListPlacement;
      interface?: InterfacePlacement;
      volumeSlider?: VolumeSliderPlacement;
      timeTooltip?: TimeTooltipPlacement;
    };
    audioPlayerDispatch({
      type: "SET_PLACEMENTS",
      playerPlacement,
      playListPlacement,
      interfacePlacement,
      volumeSliderPlacement,
      timeTooltipPlacement,
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
