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
  onReorder?: (newListData: ListData<T>) => void;
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
  onReorder: onReorderCb,
  onClick: onClickCb,
}) => {
  const reorder = (targetIndex: number, currentEl: HTMLElement | null) => {
    if (targetIndex < 0 || targetIndex >= listData.length) return;
    const curListData = [...listData];
    const movedItem = curListData.splice(index, 1)[0];
    curListData.splice(targetIndex, 0, movedItem);
    const newListData = curListData.map((item, idx) => ({
      ...item,
      index: idx,
    }));
    const parent = currentEl?.parentElement ?? null;
    onReorderCb?.(newListData);
    // Restore focus to the moved item at its new DOM position after re-render.
    if (parent) {
      requestAnimationFrame(() => {
        const next = parent.children[targetIndex] as HTMLElement | undefined;
        next?.focus();
      });
    }
  };

  return {
    tabIndex: 0,
    draggable,
    onKeyDown: (e: React.KeyboardEvent<HTMLLIElement>) => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          e.currentTarget.click();
          break;
        case "ArrowUp":
          e.preventDefault();
          if (draggable && e.altKey) {
            reorder(index - 1, e.currentTarget);
          } else {
            const prev = e.currentTarget
              .previousElementSibling as HTMLElement | null;
            prev?.focus();
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (draggable && e.altKey) {
            reorder(index + 1, e.currentTarget);
          } else {
            const next = e.currentTarget
              .nextElementSibling as HTMLElement | null;
            next?.focus();
          }
          break;
      }
    },
    onDragStart: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.add("rmap-drag-start");
      onDragStartCb?.(e);
    },
    onDragEnd: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("rmap-drag-start");
    },
    onDragEnter: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.add("rmap-drag-over");
    },
    onDragLeave: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("rmap-drag-over");
    },
    onDragOver: (e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onDragOverCb?.(e);
    },
    onDrop: (e: React.DragEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.currentTarget.classList.remove("rmap-drag-over");
      const curListData = [...listData];
      const draggedItem = listData[dragStartIdx];
      curListData.splice(dragStartIdx, 1);
      const newListData = [
        ...curListData.slice(0, index),
        draggedItem,
        ...curListData.slice(index, curListData.length),
      ].map((item, idx) => ({ ...item, index: idx }));

      onDropCb?.(e, newListData);
    },
    onClick: (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      onClickCb?.(e);
    },
  };
};
