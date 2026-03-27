import { FC } from "react";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { PlayBtn, PrevNnextBtn, RepeatTypeBtn } from "./Button";
import { SortablePlayList } from "./Drawer";
import { Progress } from "./Input";
import Grid from "@/components/Grid";
import { Volume } from "./Tooltip";

export const Controller: FC = () => {
  const { interfacePlacement, activeUI } = useUIContext();

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
        <div
          className="btn-wrapper"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <PrevNnextBtn
            type="prev"
            visible={Boolean(activeUI.prevNnext ?? activeUI.all)}
          />
          <PlayBtn />
          <PrevNnextBtn
            type="next"
            visible={Boolean(activeUI.prevNnext ?? activeUI.all)}
          />
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
