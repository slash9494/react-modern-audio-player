/// <reference types="react" />
export interface DropdownContext {
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    placement: "top" | "bottom" | "left" | "right";
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange?: (isOpen: boolean) => void;
}
export declare const dropdownContext: import("react").Context<DropdownContext | null>;
