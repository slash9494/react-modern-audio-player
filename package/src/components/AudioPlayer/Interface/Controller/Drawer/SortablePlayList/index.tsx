import { FC, useState } from "react";
import Drawer from "@/components/Drawer";
import { PlayList } from "./Content";
import { PlayListIcon } from "./PlayListIcon";

export const SortablePlayList: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer onOpenChange={setIsOpen}>
      <Drawer.Trigger aria-label="Playlist" data-testid="playlist-trigger-btn">
        <PlayListIcon isOpen={isOpen} />
      </Drawer.Trigger>
      <Drawer.Content>
        <PlayList isOpen={isOpen} setIsOpen={setIsOpen} />
      </Drawer.Content>
    </Drawer>
  );
};
