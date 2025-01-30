/// <reference types="react" />
import { TrackTimePosition } from "./Types";
export interface TrackTimeContainerProps {
    position: TrackTimePosition;
    childrenClassName: string;
}
export declare const TrackTimeContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, TrackTimeContainerProps>> & string;
