import { FC, useState } from "react";
import Drawer from "@/components/Drawer";
import { PlayList } from "./Content";
import { PlayListTriggerBtn } from "../../Button";

export const SortablePlayList: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer onOpenChange={setIsOpen}>
      <Drawer.Trigger>
        <PlayListTriggerBtn isOpen={isOpen} />
      </Drawer.Trigger>
      <Drawer.Content>
        <PlayList isOpen={isOpen} setIsOpen={setIsOpen} />
      </Drawer.Content>
    </Drawer>
  );
};
