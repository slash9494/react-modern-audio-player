import { FC } from "react";
import "./Controller.css";
import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import { TransportControls, RepeatTypeBtn } from "./Button";
import { SortablePlayList } from "./Drawer";
import { Progress } from "./Input";
import { SpeedSelector } from "./SpeedSelector";
import { Volume } from "./Tooltip";

export const Controller: FC = () => {
  const { activeUI } = useUIContext();
  const isVisible = (key: keyof typeof activeUI) =>
    Boolean(activeUI[key] ?? activeUI.all);

  return (
    <>
      <Progress visible={isVisible("progress")} />
      <RepeatTypeBtn visible={isVisible("repeatType")} />
      <TransportControls visible={isVisible("playButton")} />
      <Volume visible={isVisible("volume")} />
      <SpeedSelector visible={isVisible("playbackRate")} />
      <SortablePlayList visible={isVisible("playList")} />
    </>
  );
};
