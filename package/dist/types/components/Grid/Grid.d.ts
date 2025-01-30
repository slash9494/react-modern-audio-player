/// <reference types="react" />
import { Grid as SpectrumGrid } from "@react-spectrum/layout";
import { GridItem } from "./Item";
export declare const Grid: import("react").ForwardRefExoticComponent<import("@react-spectrum/layout").GridProps & import("react").RefAttributes<import("@react-types/shared").DOMRefValue<HTMLDivElement>>>;
declare type GridComponent = typeof SpectrumGrid & {
    Item: typeof GridItem;
};
declare const _default: GridComponent;
export default _default;
