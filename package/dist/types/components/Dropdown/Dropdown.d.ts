import React, { PropsWithChildren, FC } from "react";
import { DropdownContext } from "./DropdownContext";
import { DropdownTrigger } from "./DropdownTrigger";
import { DropdownContent } from "./DropdownContent";
export interface DropdownProps extends Omit<Partial<DropdownContext>, "setIsOpen"> {
    triggerType?: "click" | "hover";
    outboundClickActive?: boolean;
    placement?: DropdownContext["placement"];
    disabled?: boolean;
}
declare const Dropdown: FC<PropsWithChildren<DropdownProps>>;
declare type DropdownComponent = typeof Dropdown & {
    Trigger: typeof DropdownTrigger;
    Content: typeof DropdownContent;
};
declare const _default: DropdownComponent;
export default _default;
export declare const DropdownContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
