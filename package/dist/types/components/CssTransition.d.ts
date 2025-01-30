import { FC, PropsWithChildren } from "react";
export declare const appearanceIn: import("styled-components/dist/models/Keyframes").default;
export declare const appearanceOut: import("styled-components/dist/models/Keyframes").default;
export interface CssTransitionProps {
    visible: boolean;
    name: string;
    leaveTime: number;
    enterTime: number;
    clearTime: number;
    onExited?: () => void;
    onEntered?: () => void;
    className?: string;
}
export declare const CssTransition: FC<PropsWithChildren<CssTransitionProps>>;
