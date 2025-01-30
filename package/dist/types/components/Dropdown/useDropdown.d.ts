import { HTMLAttributes } from "react";
import { DropdownProps } from "./Dropdown";
export declare const useDropdown: ({ clickArea, triggerType, isOpen, setIsOpen, onOpenChange, }: {
    clickArea: "root" | "content";
    triggerType?: DropdownProps["triggerType"];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange?: ((isOpen: boolean) => void) | undefined;
}) => HTMLAttributes<HTMLDivElement>;
