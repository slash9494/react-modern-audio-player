import {
  audioPlayerDispatchContext,
  audioPlayerReducer,
  AudioState,
  defaultInterfacePlacement,
  defaultInterfacePlacementMaxLength,
  Placements,
} from "@/components/AudioPlayer/Context";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { clampVolume } from "@/utils/clampVolume";
import { PropsWithChildren, useMemo, useReducer } from "react";
import { AudioPlayerProps } from "../AudioPlayer/Player";

export const AudioPlayerProvider = <
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
>({
  children,
  ...props
}: PropsWithChildren<AudioPlayerProps<TInterfacePlacementLength>>) => {
  const {
    playList,
    audioInitialState,
    activeUI: activeUIProp,
    placement: placementProp,
    ...otherProps
  } = props;

  const curAudioState: AudioState = {
    isPlaying: audioInitialState?.isPlaying === true,
    repeatType: audioInitialState?.repeatType ?? "ALL",
    volume:
      typeof audioInitialState?.volume === "number"
        ? clampVolume(audioInitialState.volume)
        : 1,
    muted: audioInitialState?.muted === true,
  };

  const activeUI = activeUIProp || {
    playButton: true,
  };

  const placement: Placements<TInterfacePlacementLength | 10> = {
    playerPlacement: placementProp?.player,
    playListPlacement: placementProp?.playList || "bottom",
    interfacePlacement: placementProp?.interface || {
      templateArea: {
        playButton: defaultInterfacePlacement.templateArea["playButton"],
      },
    },
    volumeSliderPlacement: placementProp?.volumeSlider,
  };

  const [state, dispatch] = useReducer(audioPlayerReducer, {
    playList,
    curPlayId: audioInitialState?.curPlayId || 1,
    curIdx: audioInitialState?.curPlayId
      ? playList.findIndex(
          (audioData) => audioData.id === audioInitialState?.curPlayId
        )
      : 0,
    curAudioState,
    activeUI,
    audioResetKey: 0,
    ...(placement as Placements<10>),
    ...otherProps,
  });

  const playbackValue = useMemo(
    () => ({
      curAudioState: state.curAudioState,
      audioResetKey: state.audioResetKey,
    }),
    [state.curAudioState, state.audioResetKey]
  );

  const trackValue = useMemo(
    () => ({
      playList: state.playList,
      curPlayId: state.curPlayId,
      curIdx: state.curIdx,
    }),
    [state.playList, state.curPlayId, state.curIdx]
  );

  const uiValue = useMemo(
    () => ({
      activeUI: state.activeUI,
      playListPlacement: state.playListPlacement,
      playerPlacement: state.playerPlacement,
      interfacePlacement: state.interfacePlacement,
      volumeSliderPlacement: state.volumeSliderPlacement,
    }),
    [
      state.activeUI,
      state.playListPlacement,
      state.playerPlacement,
      state.interfacePlacement,
      state.volumeSliderPlacement,
    ]
  );

  const resourceValue = useMemo(
    () => ({
      elementRefs: state.elementRefs,
      customIcons: state.customIcons,
      coverImgsCss: state.coverImgsCss,
    }),
    [
      state.elementRefs?.audioEl,
      state.elementRefs?.waveformInst,
      state.customIcons,
      state.coverImgsCss,
    ]
  );

  return (
    <playbackContext.Provider value={playbackValue}>
      <trackContext.Provider value={trackValue}>
        <uiContext.Provider value={uiValue}>
          <resourceContext.Provider value={resourceValue}>
            <audioPlayerDispatchContext.Provider value={dispatch}>
              {children}
            </audioPlayerDispatchContext.Provider>
          </resourceContext.Provider>
        </uiContext.Provider>
      </trackContext.Provider>
    </playbackContext.Provider>
  );
};
