import React, { PropsWithChildren, FC } from "react";
import { DrawerContext } from "./DrawerContext";
import { DrawerTrigger } from "./DrawerTrigger";
import { DrawerContent } from "./DrawerContent";
export interface DrawerProps extends Omit<Partial<DrawerContext>, "setIsOpen"> {
    outboundClickActive?: boolean;
    placement?: "bottom" | "top";
}
declare const Drawer: FC<PropsWithChildren<DrawerProps>>;
declare type DrawerComponent = typeof Drawer & {
    Trigger: typeof DrawerTrigger;
    Content: typeof DrawerContent;
};
declare const _default: DrawerComponent;
export default _default;
export declare const DrawerContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
