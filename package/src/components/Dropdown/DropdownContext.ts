import { createContext } from "react";
export interface DropdownContext {
  dropdownRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  placement: "top" | "bottom" | "left" | "right";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange?: (isOpen: boolean) => void;
}

export const dropdownContext = createContext<DropdownContext | null>(null);
