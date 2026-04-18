import { drawerContext } from "@/components/Drawer/DrawerContext";
import { CssTransition } from "@/ui/CssTransition";
import SortableList from "@/components/SortableList";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { playListPortalContext } from "@/components/AudioPlayer/Interface/playListPortalContext";
import { FC, useContext } from "react";
import ReactDOM from "react-dom";
import { PlayListItem } from "./PlayListItem";
import { usePlayList } from "./usePlayList";
import "./PlayList.css";

export const PlayList: FC = () => {
  const { playList } = useTrackContext();
  const { isOpen, setIsOpen } = useNonNullableContext(drawerContext);
  const portalNode = useContext(playListPortalContext);
  const { cssTransitionEventProps, sortableItemEventProps } = usePlayList({
    setIsOpen,
  });
  const {
    onClick: onClickItem,
    onDragStart: onDragStartItem,
    ...otherSortableItemEventProps
  } = sortableItemEventProps;

  if (playList.length === 0 || !portalNode) return <></>;

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
        <SortableList>
          {/** //TODO : change props event to context  */}
          {playList.map((data, index) => (
            <SortableList.Item
              key={`sortable-item-${index}`}
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
      </div>
    </CssTransition>,
    portalNode
  );
};
