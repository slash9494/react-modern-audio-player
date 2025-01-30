import { FC, PropsWithChildren } from "react";
export declare type DrawerContentPlacement = "top" | "bottom" | "left" | "right";
export declare type DrawerContentProps = {
    isWithAnimation?: boolean;
};
export declare const DrawerContent: FC<PropsWithChildren<DrawerContentProps>>;
