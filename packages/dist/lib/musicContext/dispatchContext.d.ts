import { Dispatch } from "react";
import { AudioInitialState } from "../../components/AudioPlayer";
import { RepeatType, PlayList } from "./StateContext";
export declare type AudioContextAction = {
    type: "NEXT_MUSIC";
} | {
    type: "PREV_MUSIC";
} | {
    type: "UPDATE_PLAY_LIST";
    playList: PlayList;
} | {
    type: "SET_INITIAL_AUDIO_STATE";
    audioInitialState: AudioInitialState;
} | {
    type: "SET_PlAY_STATE";
} | {
    type: "SET_CURRENT_INDEX";
    currentIndex: number;
    currentAudioId: number;
} | {
    type: "SET_REPEAT_TYPE";
    repeatType: RepeatType;
};
export declare type AudioPlayerDispatchContext = Dispatch<AudioContextAction>;
export declare const audioPlayerDispatchContext: import("react").Context<AudioPlayerDispatchContext | null>;
