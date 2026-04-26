import { drawerContext } from "@/components/Drawer/DrawerContext";
import { CssTransition } from "@/ui/CssTransition";
import SortableList from "@/components/SortableList";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { useTrackContext } from "@/components/AudioPlayer/Context/hooks/useTrackContext";
import {
  playListPortalContext,
  playListEmptyContext,
} from "@/components/AudioPlayer/Interface/contexts";
import { FC, useContext } from "react";
import ReactDOM from "react-dom";
import { PlayListItem } from "./PlayListItem";
import { usePlayList } from "./usePlayList";
import "./PlayList.css";

export const PlayList: FC = () => {
  const { playList } = useTrackContext();
  const { isOpen, setIsOpen } = useNonNullableContext(drawerContext);
  const portalNode = useContext(playListPortalContext);
  const emptyNode = useContext(playListEmptyContext);
  const { cssTransitionEventProps, sortableItemEventProps } = usePlayList({
    setIsOpen,
  });
  const {
    onClick: onClickItem,
    onDragStart: onDragStartItem,
    ...otherSortableItemEventProps
  } = sortableItemEventProps;

  if (!portalNode) return <></>;
  const isEmpty = playList.length === 0;
  if (isEmpty && !emptyNode) return <></>;

  return ReactDOM.createPortal(
    <CssTransition
      visible={isOpen}
      name={"rmap-playlist-content"}
      enterTime={20}
      leaveTime={20}
      clearTime={300}
      {...cssTransitionEventProps}
    >
      <div className="rmap-playlist-container">
        {isEmpty ? (
          emptyNode
        ) : (
          <SortableList>
            {/** //TODO : change props event to context  */}
            {playList.map((data, index) => (
              <SortableList.Item
                key={data.id}
                index={index}
                listData={playList}
                onClick={() => onClickItem(index)}
                onDragStart={() => onDragStartItem(index)}
                {...otherSortableItemEventProps}
              >
                <PlayListItem data={data} />
              </SortableList.Item>
            ))}
          </SortableList>
        )}
      </div>
    </CssTransition>,
    portalNode
  );
};
