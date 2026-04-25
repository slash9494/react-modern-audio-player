import React, { ReactElement, ReactNode, isValidElement, useMemo } from "react";
import { PLAYLIST_EMPTY_SLOT, PlayListEmptyProps } from "../PlayListEmpty";
import { resolveSlotKey } from "./slotMetaMap";

export interface CompoundSlots {
  compoundChildren: ReactElement[];
  playListEmptyNode: ReactNode;
}

export function useCompoundSlots(children: React.ReactNode): CompoundSlots {
  return useMemo(() => {
    const elements = React.Children.toArray(children).filter(isValidElement);
    const emptyElement = elements.find(isPlayListEmptySlot);
    return {
      compoundChildren: elements.filter(
        (element) => !isPlayListEmptySlot(element)
      ),
      playListEmptyNode: getPlayListEmptyChildren(emptyElement),
    };
  }, [children]);
}

function isPlayListEmptySlot(element: ReactElement): boolean {
  return resolveSlotKey(element) === PLAYLIST_EMPTY_SLOT;
}

function getPlayListEmptyChildren(
  element: ReactElement | undefined
): ReactNode {
  if (!element) return null;
  const props = element.props as PlayListEmptyProps | undefined;
  return props?.children ?? null;
}
