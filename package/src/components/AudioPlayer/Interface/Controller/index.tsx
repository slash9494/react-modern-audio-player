import { FC } from "react";
import "./Controller.css";
import { useUIContext } from "@/hooks/context/useUIContext";
import { PlayButton, RepeatTypeBtn } from "./Button";
import { SortablePlayList } from "./Drawer";
import { Progress } from "./Input";
import { Volume } from "./Tooltip";

export const Controller: FC = () => {
  const { activeUI } = useUIContext();

  return (
    <>
      <Progress visible={Boolean(activeUI.progress ?? activeUI.all)} />
      <RepeatTypeBtn visible={Boolean(activeUI.repeatType ?? activeUI.all)} />
      <PlayButton visible={Boolean(activeUI.playButton ?? activeUI.all)} />
      <Volume visible={Boolean(activeUI.volume ?? activeUI.all)} />
      <SortablePlayList visible={Boolean(activeUI.playList ?? activeUI.all)} />
    </>
  );
};
