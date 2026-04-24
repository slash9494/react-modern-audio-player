import { FC } from "react";
import Drawer from "@/components/Drawer";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { useUIContext } from "@/hooks/context/useUIContext";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import { PlayList } from "./Content";
import { PlayListIcon } from "./PlayListIcon";

export interface SortablePlayListProps extends GridItemLayoutProps {
  initialExpanded?: boolean;
}

export const SortablePlayList: FC<SortablePlayListProps> = ({
  initialExpanded,
  gridArea,
  visible,
}) => {
  const { playListExpanded, interfacePlacement } = useUIContext();
  const initialOpen = initialExpanded ?? playListExpanded;
  const resolvedGridArea =
    gridArea ??
    interfacePlacement?.itemCustomArea?.playList ??
    interfacePlacement?.templateArea?.playList ??
    defaultInterfacePlacement.templateArea.playList;
  return (
    <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true}>
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
