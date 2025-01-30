import { FC, HTMLAttributes, PropsWithChildren } from "react";
export declare type DropdownContentPlacement = "top" | "bottom" | "left" | "right";
export declare type DropdownContentProps = HTMLAttributes<HTMLDivElement> & {
    isWithAnimation?: boolean;
};
export interface DropdownSize {
    width: number;
    height: number;
}
export declare const DropdownContent: FC<PropsWithChildren<DropdownContentProps>>;
