/// <reference types="react" />
import { ViewProps } from "@react-spectrum/view";
import { DOMRefValue } from "@react-types/shared";
export interface GridItemProps extends Omit<ViewProps<5>, "children"> {
    visible?: boolean;
    children: React.ReactNode;
}
export declare const GridItem: import("react").ForwardRefExoticComponent<GridItemProps & import("react").RefAttributes<import("react").RefAttributes<DOMRefValue<HTMLElement>>>>;
