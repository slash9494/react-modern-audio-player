import { FC } from "react";
import Drawer from "@/components/Drawer";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { usePlacedGridArea } from "../../../usePlacedGridArea";
import { PlayList } from "./Content";
import { PlayListIcon } from "./PlayListIcon";

export interface SortablePlayListProps extends GridItemLayoutProps {
  initialExpanded?: boolean;
}

export const SortablePlayList: FC<SortablePlayListProps> = ({
  initialExpanded,
  gridArea,
  visible,
  ...rest
}) => {
  const { playListExpanded } = useUIContext();
  const initialOpen = initialExpanded ?? playListExpanded;
  const resolvedGridArea = usePlacedGridArea("playList", gridArea);
  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true} {...rest}>
      <Drawer initialOpen={initialOpen}>
        <Drawer.Trigger
          aria-label="Playlist"
          data-testid="playlist-trigger-btn"
        >
          <PlayListIcon />
        </Drawer.Trigger>
        <Drawer.Content aria-label="Playlist">
          <PlayList />
        </Drawer.Content>
      </Drawer>
    </Grid.Item>
  );
};
