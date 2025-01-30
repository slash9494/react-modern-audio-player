import { AudioData } from '../../../../../../AudioPlayer/Context';
import { CssTransitionProps } from '../../../../../../CssTransition';
import { UseSortableListItemProps } from '../../../../../../SortableList/useSortableListItem';
import { SortablePlayListProps } from ".";
interface UsePlayListReturn {
    cssTransitionEventProps: Partial<CssTransitionProps>;
    sortableItemEventProps: Omit<UseSortableListItemProps<AudioData>, "onDragStart" | "onClick" | "index" | "listData"> & {
        onDragStart: (index: number) => void;
        onClick: (index: number) => void;
    };
}
export declare const usePlayList: ({ setIsOpen, }: {
    setIsOpen: SortablePlayListProps["setIsOpen"];
}) => UsePlayListReturn;
export {};
