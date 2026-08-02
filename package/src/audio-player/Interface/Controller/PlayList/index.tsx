import { FC } from "react";
import Drawer from "@/ui/Drawer";
import Grid, { GridItemLayoutProps } from "@/ui/Grid";
import { useUIContext } from "@/audio-player/Context/hooks/useUIContext";
import { useResolvedGridArea } from "../../hooks/useResolvedGridArea";
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
  const resolvedGridArea = useResolvedGridArea("playList", gridArea);
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
