import {
  AudioData,
  audioPlayerDispatchContext,
} from "@/components/AudioPlayer/Context";
import { CssTransitionProps } from "@/components/CssTransition";
import { UseSortableListItemProps } from "@/components/SortableList/useSortableListItem";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { useCallback, useState } from "react";
import { SortablePlayListProps } from ".";

interface UsePlayListReturn {
  cssTransitionEventProps: Partial<CssTransitionProps>;
  sortableItemEventProps: Omit<
    UseSortableListItemProps<AudioData>,
    "onDragStart" | "onClick" | "index" | "listData"
  > & {
    onDragStart: (index: number) => void;
    onClick: (index: number) => void;
  };
}

export const usePlayList = ({
  setIsOpen,
}: {
  setIsOpen: SortablePlayListProps["setIsOpen"];
}): UsePlayListReturn => {
  const { playList } = useTrackContext();
  const { activeUI } = useUIContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const [dragStartIdx, setDragStartIdx] = useState<number>(0);

  const onClickItem = useCallback(
    (index: number) => {
      audioPlayerDispatch({
        type: "SET_CURRENT_AUDIO",
        currentIndex: index,
        currentAudioId: playList[index].id,
      });
    },
    [audioPlayerDispatch, playList]
  );
  return {
    cssTransitionEventProps: {
      onExited: () => setIsOpen(false),
      onEntered: () => setIsOpen(true),
    },
    sortableItemEventProps: {
      draggable: activeUI.playList !== "unSortable",
      dragStartIdx,
      onDragStart: (index) => setDragStartIdx(index),
      onDrop: (e, newPlayList) =>
        audioPlayerDispatch({
          type: "UPDATE_PLAY_LIST",
          playList: newPlayList,
        }),
      onClick: (index) => onClickItem(index),
    },
  };
};
