import { ReactNode } from "react";
export declare type AudioNativeProps = Omit<React.AudioHTMLAttributes<HTMLAudioElement>, "autoPlay">;
export declare type RepeatType = "ALL" | "SHUFFLE" | "ONE" | "NONE";
export declare type AudioCustomProps = {
    isLoadedMetaData?: boolean;
    isPlaying?: boolean;
    repeatType?: RepeatType;
    volume?: number;
    currentTime?: number;
    duration?: number;
};
export declare type AudioData = {
    src: string;
    id: number;
    name?: string | ReactNode;
    writer?: string | ReactNode;
    img?: string;
    description?: string | ReactNode;
    customTrackInfo?: string | ReactNode;
};
export declare type AudioState = AudioNativeProps & AudioCustomProps;
