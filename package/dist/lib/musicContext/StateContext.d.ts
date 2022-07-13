export declare type AudioNativeProps = React.AudioHTMLAttributes<HTMLAudioElement>;
export declare type AUdioCustomProps = {
    isPlaying: boolean;
    repeatType?: RepeatType;
    volume?: number;
};
export declare type RepeatType = "ALL" | "SHUFFLE" | "NONE";
export interface AudioData {
    src: string;
    id: number;
    name?: string;
    artist?: string;
    img?: string;
}
export declare type PlayList = Array<AudioData>;
export declare type CurAudioState = AudioNativeProps & AUdioCustomProps;
export interface AudioPlayerStateContext {
    playList: PlayList;
    curAudioState: CurAudioState;
}
export declare const audioPlayerStateContext: import("react").Context<AudioPlayerStateContext | null>;
