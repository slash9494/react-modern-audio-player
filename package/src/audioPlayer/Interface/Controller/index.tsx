import { FC } from "react";
import "./Controller.css";
import { useUIContext } from "@/audioPlayer/Context/hooks/useUIContext";
import { TransportControls, RepeatTypeBtn } from "./Transport";
import { SortablePlayList } from "./PlayList";
import { Progress } from "./Progress";
import { SpeedSelector } from "./Speed";
import { Volume } from "./Volume";

export * from "./Transport";
export * from "./PlayList";
export * from "./Progress";
export * from "./Speed";
export * from "./Volume";

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
