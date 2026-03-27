import { FC } from "react";
import Drawer from "@/components/Drawer";
import { PlayList } from "./Content";
import { PlayListIcon } from "./PlayListIcon";

export const SortablePlayList: FC = () => {
  return (
    <Drawer>
      <Drawer.Trigger aria-label="Playlist" data-testid="playlist-trigger-btn">
        <PlayListIcon />
      </Drawer.Trigger>
      <Drawer.Content aria-label="Playlist">
        <PlayList />
      </Drawer.Content>
    </Drawer>
  );
};
