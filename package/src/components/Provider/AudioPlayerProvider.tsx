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
import { PropsWithChildren, useReducer } from "react";
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
    isPlaying: audioInitialState?.isPlaying || false,
    repeatType: audioInitialState?.repeatType || "ALL",
    volume: audioInitialState?.volume || 1,
    muted: audioInitialState?.muted,
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
    ...(placement as Placements<10>),
    ...otherProps,
  });

  return (
    <playbackContext.Provider value={{ curAudioState: state.curAudioState }}>
      <trackContext.Provider
        value={{
          playList: state.playList,
          curPlayId: state.curPlayId,
          curIdx: state.curIdx,
        }}
      >
        <uiContext.Provider
          value={{
            activeUI: state.activeUI,
            playListPlacement: state.playListPlacement,
            playerPlacement: state.playerPlacement,
            interfacePlacement: state.interfacePlacement,
            volumeSliderPlacement: state.volumeSliderPlacement,
          }}
        >
          <resourceContext.Provider
            value={{
              elementRefs: state.elementRefs,
              customIcons: state.customIcons,
              coverImgsCss: state.coverImgsCss,
            }}
          >
            <audioPlayerDispatchContext.Provider value={dispatch}>
              {children}
            </audioPlayerDispatchContext.Provider>
          </resourceContext.Provider>
        </uiContext.Provider>
      </trackContext.Provider>
    </playbackContext.Provider>
  );
};
