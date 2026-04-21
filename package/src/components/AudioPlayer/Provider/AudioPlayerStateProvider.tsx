import {
  audioPlayerDispatchContext,
  audioPlayerReducer,
  AudioPlayerStateContext,
  AudioState,
  DEFAULT_AUDIO_STATE,
  defaultInterfacePlacement,
  defaultInterfacePlacementMaxLength,
  Placements,
  playbackContext,
  AudioAttrsContext,
  audioAttrsContext,
  timeContext,
  trackContext,
  uiContext,
  resourceContext,
  AudioPlayerStateProviderProps,
} from "@/components/AudioPlayer/Context";
import { clampVolume } from "@/utils/clampVolume";
import { PropsWithChildren, useMemo, useReducer } from "react";

function createInitialState<T extends number>(
  props: AudioPlayerStateProviderProps<T>
): AudioPlayerStateContext {
  const {
    playList,
    audioInitialState,
    activeUI: activeUIProp,
    placement: placementProp,
    customIcons,
    coverImgsCss,
  } = props;

  const curAudioState: AudioState = {
    isPlaying: audioInitialState?.isPlaying ?? DEFAULT_AUDIO_STATE.isPlaying,
    repeatType: audioInitialState?.repeatType ?? DEFAULT_AUDIO_STATE.repeatType,
    volume:
      typeof audioInitialState?.volume === "number"
        ? clampVolume(audioInitialState.volume)
        : DEFAULT_AUDIO_STATE.volume,
    muted: audioInitialState?.muted ?? DEFAULT_AUDIO_STATE.muted,
  };

  const activeUI = activeUIProp || { playButton: true };

  const placement: Placements<T | 10> = {
    playerPlacement: placementProp?.player,
    playListPlacement: placementProp?.playList || "bottom",
    interfacePlacement: placementProp?.interface || {
      templateArea: {
        playButton: defaultInterfacePlacement.templateArea["playButton"],
      },
    },
    volumeSliderPlacement: placementProp?.volumeSlider,
  };

  const isEmpty = playList.length === 0;
  const requestedId = audioInitialState?.curPlayId;
  const requestedIdx =
    requestedId == null
      ? -1
      : playList.findIndex((audioData) => audioData.id === requestedId);

  return {
    playList,
    curPlayId: isEmpty
      ? 0
      : requestedIdx >= 0
      ? (requestedId as number)
      : playList[0].id,
    curIdx: isEmpty ? -1 : requestedIdx >= 0 ? requestedIdx : 0,
    curAudioState,
    activeUI,
    audioResetKey: 0,
    seekRequestKey: 0,
    ...(placement as Placements<10>),
    customIcons,
    coverImgsCss,
  };
}

interface AudioPlayerStateProviderOwnProps<T extends number = number>
  extends AudioPlayerStateProviderProps<T> {
  colorScheme?: "light" | "dark";
}

export const AudioPlayerStateProvider = <
  TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength
>({
  children,
  colorScheme,
  ...initProps
}: PropsWithChildren<
  AudioPlayerStateProviderOwnProps<TInterfacePlacementLength>
>) => {
  const [state, dispatch] = useReducer(
    audioPlayerReducer,
    initProps as AudioPlayerStateProviderProps<TInterfacePlacementLength>,
    createInitialState
  );

  const timeValue = useMemo(
    () => ({
      currentTime:
        state.curAudioState.currentTime ?? DEFAULT_AUDIO_STATE.currentTime,
      duration: state.curAudioState.duration ?? DEFAULT_AUDIO_STATE.duration,
      seekRequestKey: state.seekRequestKey,
    }),
    [
      state.curAudioState.currentTime,
      state.curAudioState.duration,
      state.seekRequestKey,
    ]
  );

  const playbackValue = useMemo(
    () => ({
      isPlaying: state.curAudioState.isPlaying ?? DEFAULT_AUDIO_STATE.isPlaying,
      volume: state.curAudioState.volume ?? DEFAULT_AUDIO_STATE.volume,
      muted: state.curAudioState.muted ?? DEFAULT_AUDIO_STATE.muted,
      repeatType: state.curAudioState.repeatType,
      isLoadedMetaData: state.curAudioState.isLoadedMetaData,
      audioResetKey: state.audioResetKey,
    }),
    [
      state.curAudioState.isPlaying,
      state.curAudioState.isLoadedMetaData,
      state.curAudioState.volume,
      state.curAudioState.muted,
      state.curAudioState.repeatType,
      state.audioResetKey,
    ]
  );

  const trackValue = useMemo(
    () => ({
      playList: state.playList,
      curPlayId: state.curPlayId,
      curIdx: state.curIdx,
    }),
    [state.playList, state.curPlayId, state.curIdx]
  );

  const { audioInitialState } = initProps;
  const playListExpanded = audioInitialState?.playListExpanded;

  const uiValue = useMemo(
    () => ({
      activeUI: state.activeUI,
      playListPlacement: state.playListPlacement,
      playerPlacement: state.playerPlacement,
      interfacePlacement: state.interfacePlacement,
      volumeSliderPlacement: state.volumeSliderPlacement,
      colorScheme,
      playListExpanded,
    }),
    [
      state.activeUI,
      state.playListPlacement,
      state.playerPlacement,
      state.interfacePlacement,
      state.volumeSliderPlacement,
      colorScheme,
      playListExpanded,
    ]
  );

  const audioNativeAttrsValue = useMemo<AudioAttrsContext>(() => {
    if (!audioInitialState) return {};
    const {
      isPlaying: _isPlaying,
      repeatType: _repeatType,
      isLoadedMetaData: _isLoadedMetaData,
      currentTime: _currentTime,
      duration: _duration,
      volume: _volume,
      muted: _muted,
      curPlayId: _curPlayId,
      playListExpanded: _playListExpanded,
      ...nativeAttrs
    } = audioInitialState;

    return nativeAttrs;
  }, [audioInitialState]);

  // Intentionally subscribing to sub-properties (audioEl, waveformInst)
  // instead of state.elementRefs to avoid unnecessary rerenders.
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <timeContext.Provider value={timeValue}>
      <playbackContext.Provider value={playbackValue}>
        <trackContext.Provider value={trackValue}>
          <uiContext.Provider value={uiValue}>
            <resourceContext.Provider value={resourceValue}>
              <audioAttrsContext.Provider value={audioNativeAttrsValue}>
                <audioPlayerDispatchContext.Provider value={dispatch}>
                  {children}
                </audioPlayerDispatchContext.Provider>
              </audioAttrsContext.Provider>
            </resourceContext.Provider>
          </uiContext.Provider>
        </trackContext.Provider>
      </playbackContext.Provider>
    </timeContext.Provider>
  );
};
