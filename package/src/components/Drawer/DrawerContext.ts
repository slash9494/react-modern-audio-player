import { createContext } from "react";

export interface DrawerContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChange?: (isOpen: boolean) => void;
  drawerId: string;
}

export const drawerContext = createContext<DrawerContext | null>(null);
