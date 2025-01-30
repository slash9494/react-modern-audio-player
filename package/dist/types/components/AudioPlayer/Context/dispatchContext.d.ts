import { Dispatch } from "react";
import { RepeatType, PlayList, PlayListPlacement, PlayerPlacement, ActiveUI, ElementRefs, CustomIcons, InterfacePlacement, CoverImgsCss, VolumeSliderPlacement, defaultInterfacePlacementMaxLength, AudioState } from "./StateContext";
export declare type AudioContextAction<TInterfacePlacementLength extends number = typeof defaultInterfacePlacementMaxLength> = {
    type: "NEXT_AUDIO";
} | {
    type: "PREV_AUDIO";
} | {
    type: "UPDATE_PLAY_LIST";
    playList: PlayList;
} | {
    type: "SET_AUDIO_STATE";
    audioState: AudioState;
} | {
    type: "SET_INITIAL_STATES";
    audioState: AudioState;
    curPlayId: number;
} | {
    type: "CHANGE_PLAYING_STATE";
    state?: boolean;
} | {
    type: "SET_CURRENT_AUDIO";
    currentIndex: number;
    currentAudioId: number;
} | {
    type: "SET_REPEAT_TYPE";
    repeatType: RepeatType;
} | {
    type: "SET_VOLUME";
    volume: number;
} | {
    type: "SET_MUTED";
    muted: boolean;
} | {
    type: "SET_ACTIVE_UI";
    activeUI: ActiveUI;
} | {
    type: "SET_ELEMENT_REFS";
    elementRefs: ElementRefs;
} | {
    type: "SET_CUSTOM_ICONS";
    customIcons: CustomIcons;
} | {
    type: "SET_COVER_IMGS_CSS";
    coverImgsCss: CoverImgsCss;
} | {
    type: "SET_PLACEMENTS";
    playerPlacement?: PlayerPlacement;
    playListPlacement?: PlayListPlacement;
    interfacePlacement?: InterfacePlacement<TInterfacePlacementLength>;
    volumeSliderPlacement?: VolumeSliderPlacement;
};
export declare type AudioPlayerDispatchContext = Dispatch<AudioContextAction>;
export declare const audioPlayerDispatchContext: import("react").Context<AudioPlayerDispatchContext | null>;
