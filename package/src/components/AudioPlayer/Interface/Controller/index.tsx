import { FC } from "react";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import "./Controller.css";
import { useUIContext } from "@/hooks/context/useUIContext";
import { PlayBtn, PrevBtn, NextBtn, RepeatTypeBtn } from "./Button";
import { SortablePlayList } from "./Drawer";
import { Progress } from "./Input";
import Grid from "@/components/Grid";
import { Volume } from "./Tooltip";

export const Controller: FC = () => {
  const { interfacePlacement, activeUI } = useUIContext();
  const isPrevNextVisible = Boolean(activeUI.prevNnext ?? activeUI.all);

  return (
    <>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.progress ||
          interfacePlacement?.templateArea?.progress ||
          defaultInterfacePlacement.templateArea.progress
        }
        width={"100%"}
        visible={Boolean(
          activeUI.progress !== undefined ? activeUI.progress : activeUI.all
        )}
      >
        <Progress />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.repeatType ||
          interfacePlacement?.templateArea?.repeatType ||
          defaultInterfacePlacement.templateArea.repeatType
        }
        visible={Boolean(activeUI.repeatType ?? activeUI.all)}
      >
        <RepeatTypeBtn />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.playButton ||
          interfacePlacement?.templateArea?.playButton ||
          defaultInterfacePlacement.templateArea.playButton
        }
        visible={Boolean(activeUI.playButton ?? activeUI.all)}
      >
        <div className="rmap-ctrl-btn-wrapper">
          <PrevBtn isVisible={isPrevNextVisible} />
          <PlayBtn />
          <NextBtn isVisible={isPrevNextVisible} />
        </div>
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.volume ||
          interfacePlacement?.templateArea?.volume ||
          defaultInterfacePlacement.templateArea.volume
        }
        visible={Boolean(activeUI.volume ?? activeUI.all)}
      >
        <Volume />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemCustomArea?.playList ||
          interfacePlacement?.templateArea?.playList ||
          defaultInterfacePlacement.templateArea.playList
        }
        visible={Boolean(activeUI.playList ?? activeUI.all)}
      >
        <SortablePlayList />
      </Grid.Item>
    </>
  );
};
