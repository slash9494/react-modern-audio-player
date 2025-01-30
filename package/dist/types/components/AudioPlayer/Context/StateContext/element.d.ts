import { ReactNode } from "react";
import { AudioData } from "./audio";
export declare type PlayList = Array<AudioData>;
export declare type ProgressUI = "waveform" | "bar" | false;
export declare type PlayListUI = "sortable" | "unSortable" | false;
export declare type ActiveUI = Partial<{
    all: boolean;
    playButton: boolean;
    playList: PlayListUI;
    prevNnext: boolean;
    volume: boolean;
    volumeSlider: boolean;
    repeatType: boolean;
    trackTime: boolean;
    trackInfo: boolean;
    artwork: boolean;
    progress: ProgressUI;
}>;
export declare type CustomIcons = Partial<{
    play: ReactNode;
    pause: ReactNode;
    prev: ReactNode;
    next: ReactNode;
    repeatOne: ReactNode;
    repeatAll: ReactNode;
    repeatNone: ReactNode;
    repeatShuffle: ReactNode;
    volumeFull: ReactNode;
    volumeHalf: ReactNode;
    volumeMuted: ReactNode;
    playList: ReactNode;
}>;
export declare type ElementRefs = Partial<{
    audioEl: HTMLAudioElement;
    trackCurTimeEl: HTMLSpanElement;
    trackDurationEl: HTMLSpanElement;
    progressBarEl: HTMLDivElement;
    progressValueEl: HTMLDivElement;
    progressHandleEl: HTMLDivElement;
    waveformInst: WaveSurfer;
}>;
export interface CoverImgsCss {
    artwork?: React.CSSProperties;
    listThumbnail?: React.CSSProperties;
}
