import { FC } from "react";
import { useNonNullableContext } from "../../../../hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "../../../../lib/audioContext/StateContext";
import { PlayBtn, PrevNnextBtn, RepeatTypeBtn } from "./Button";
import { Volume, SortablePlayList } from "./Dropdown";
import { Progress } from "./Input";
import { Flex } from "@react-spectrum/layout";
import Grid from "components/AudioPlayer/Grid";

/**
 * //TODO
 * UI 정리, 애니메이션
 * refactoring with a reference to SLASH22
 */

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
        <Flex
          UNSAFE_className="btn-wrapper"
          alignItems={"center"}
          gap={"0.2rem"}
        >
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
