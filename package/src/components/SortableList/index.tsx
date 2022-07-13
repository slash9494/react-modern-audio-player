import { useCallback, useEffect, useState } from "react";
import { SortableListItem } from "./SortableListItem";
import "./index.css";

export type ListData<T> = Array<T>;

export interface SortableListProps<
  T extends Record<string, any> & { index: number }
> {
  data: ListData<T>;
  renderItem: (item: T, index: number) => JSX.Element;
  onDropCb: (newData: ListData<T>) => void;
  onClickCb?: (index: number) => void;
}

export const SortableList = <
  T extends Record<string, any> & { index: number }
>({
  data: initialData,
  onDropCb,
  onClickCb,
  renderItem,
}: SortableListProps<T>) => {
  const [startIdx, setStartIdx] = useState<number>(0);
  const [listData, setListData] = useState<ListData<T>>(initialData);

  const onDragStart = (index: number) => setStartIdx(index);
  const onDrop = useCallback(
    (dropIdx: number) => {
      const curListData = [...listData];
      const draggedItem = listData[startIdx];
      curListData.splice(startIdx, 1);
      const newListData =
        startIdx < dropIdx
          ? [
              ...curListData.slice(0, dropIdx),
              draggedItem,
              ...curListData.slice(dropIdx, curListData.length),
            ]
          : [
              ...curListData.slice(0, dropIdx),
              draggedItem,
              ...curListData.slice(dropIdx, curListData.length),
            ];

      setListData(newListData.map((data, index) => ({ ...data, index })));
      onDropCb(newListData.map((data, index) => ({ ...data, index })));
    },
    [listData, onDropCb, startIdx]
  );

  return (
    <ul className="sortable-list">
      {listData.map((item, index) => (
        <SortableListItem
          key={`item-initial-idx-${index}`}
          index={index}
          draggable
          onDragStartCb={onDragStart}
          onDropCb={onDrop}
          onClickCb={onClickCb}
        >
          {renderItem(item, index)}
        </SortableListItem>
      ))}
    </ul>
  );
};
