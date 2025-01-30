import { FC } from "react";
export interface SortablePlayListProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
export declare const PlayList: FC<SortablePlayListProps>;
