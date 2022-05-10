import React, { FC, PropsWithChildren, useRef } from "react";

interface SortableListItemProps {
  index: number;
  draggable?: boolean;
  onDragStartCb?: (index: number) => void;
  onDropCb?: (index: number) => void;
  onClickCb?: (index: number) => void;
}

export const SortableListItem: FC<PropsWithChildren<SortableListItemProps>> = ({
  index,
  draggable,
  children,
  onDragStartCb,
  onDropCb,
  onClickCb,
}) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.stopPropagation();
    itemRef.current?.classList.add("dragstart");
    onDragStartCb && onDragStartCb(index);
  };
  const onDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.stopPropagation();
    itemRef.current?.classList.remove("dragstart");
  };
  const onDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
    e.stopPropagation();
    itemRef.current?.classList.add("dragover");
  };
  const onDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    e.stopPropagation();
    itemRef.current?.classList.remove("dragover");
  };
  const onDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.stopPropagation();
    itemRef.current?.classList.remove("dragover");
    onDropCb && onDropCb(index);
  };
  return (
    <li
      ref={itemRef}
      className="list-item"
      draggable={!!draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={onDrop}
    >
      {children}
    </li>
  );
};
