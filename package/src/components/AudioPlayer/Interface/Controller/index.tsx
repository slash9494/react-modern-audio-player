import { FC } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "@/components/AudioPlayer/Context/StateContext";
import { PlayBtn, PrevNnextBtn, RepeatTypeBtn } from "./Button";
import { SortablePlayList } from "./Drawer";
import { Progress } from "./Input";
import { Flex } from "@react-spectrum/layout";
import Grid from "@/components/Grid";
import { Volume } from "./Tooltip";

export const Controller: FC = () => {
  const { interfacePlacement } = useNonNullableContext(audioPlayerStateContext);

  return (
    <>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.progress ||
          interfacePlacement?.templateArea?.progress ||
          defaultInterfacePlacement.templateArea.progress
        }
        width={"100%"}
      >
        <Progress />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.repeatType ||
          interfacePlacement?.templateArea?.repeatType ||
          defaultInterfacePlacement.templateArea.repeatType
        }
      >
        <RepeatTypeBtn />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.playButton ||
          interfacePlacement?.templateArea?.playButton ||
          defaultInterfacePlacement.templateArea.playButton
        }
      >
        <Flex UNSAFE_className="btn-wrapper" alignItems={"center"} gap={"10px"}>
          <PrevNnextBtn type="prev" />
          <PlayBtn />
          <PrevNnextBtn type="next" />
        </Flex>
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.volume ||
          interfacePlacement?.templateArea?.volume ||
          defaultInterfacePlacement.templateArea.volume
        }
      >
        <Volume />
      </Grid.Item>
      <Grid.Item
        gridArea={
          interfacePlacement?.itemArea?.playList ||
          interfacePlacement?.templateArea?.playList ||
          defaultInterfacePlacement.templateArea.playList
        }
      >
        <SortablePlayList />
      </Grid.Item>
    </>
  );
};
