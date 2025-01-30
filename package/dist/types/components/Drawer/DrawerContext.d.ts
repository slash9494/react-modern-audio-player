/// <reference types="react" />
export interface DrawerContext {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange?: (isOpen: boolean) => void;
}
export declare const drawerContext: import("react").Context<DrawerContext | null>;
