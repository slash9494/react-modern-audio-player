import { ListData } from "./index";

export interface UseSortableListItemProps<T> {
  index: number;
  dragStartIdx: number;
  listData: ListData<T>;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop?: (
    e: React.DragEvent<HTMLLIElement>,
    newListData: ListData<T>
  ) => void;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export const useSortableListItem: <T>(
  props: UseSortableListItemProps<T>
) => React.LiHTMLAttributes<HTMLLIElement> = ({
  index,
  dragStartIdx,
  listData,
  draggable = true,
  onDragStart: onDragStartCb,
  onDragOver: onDragOverCb,
  onDrop: onDropCb,
  onClick: onClickCb,
}) => {
  return {
    draggable,
    onDragStart: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.add("dragstart");
      onDragStartCb && onDragStartCb(e);
    },
    onDragEnd: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("dragstart");
    },
    onDragEnter: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.add("dragover");
    },
    onDragLeave: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("dragover");
    },
    onDragOver: (e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onDragOverCb && onDragOverCb(e);
    },
    onDrop: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("dragover");
      const curListData = [...listData];
      const draggedItem = listData[dragStartIdx];
      curListData.splice(dragStartIdx, 1);
      const newListData = (
        dragStartIdx < index
          ? [
              ...curListData.slice(0, index),
              draggedItem,
              ...curListData.slice(index, curListData.length),
            ]
          : [
              ...curListData.slice(0, index),
              draggedItem,
              ...curListData.slice(index, curListData.length),
            ]
      ).map((item, idx) => ({ ...item, index: idx }));

      onDropCb && onDropCb(e, newListData);
    },
    onClick: (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      onClickCb && onClickCb(e);
    },
  };
};
