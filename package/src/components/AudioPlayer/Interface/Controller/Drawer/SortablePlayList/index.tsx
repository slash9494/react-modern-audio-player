import { FC, useState } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { InterfaceChildrenProps } from "../../../types";
import Drawer from "@/components/Drawer";
import { PlayList } from "./Content";
import { PlayListTriggerBtn } from "../../Button";

export const SortablePlayList: FC<InterfaceChildrenProps> = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return activeUI.playList ?? activeUI.all ? (
    <Drawer onOpenChange={setIsOpen}>
      <Drawer.Trigger>
        <PlayListTriggerBtn isOpen={isOpen} />
      </Drawer.Trigger>
      <Drawer.Content>
        <PlayList isOpen={isOpen} setIsOpen={setIsOpen} />
      </Drawer.Content>
    </Drawer>
  ) : null;
};
