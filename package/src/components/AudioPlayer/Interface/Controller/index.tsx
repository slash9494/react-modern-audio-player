import { FC } from "react";
import { useNonNullableContext } from "../../../../hooks/useNonNullableContext";
import {
  audioPlayerStateContext,
  defaultInterfacePlacement,
} from "../../../../lib/audioContext/StateContext";
import { PlayBtn, PrevNnextBtn, RepeatTypeBtn } from "./Button";
import { Volume, SortablePlayList } from "./Dropdown";
import { Progress } from "./Input";
import { View } from "@react-spectrum/view";
import { Flex } from "@react-spectrum/layout";

/**
 * //TODO
 * UI 정리, 애니메이션
 * refactoring with a reference to SLASH22
 */

export const Controller: FC = () => {
  const { interfacePlacement } = useNonNullableContext(audioPlayerStateContext);

  return (
    <>
      <View
        gridArea={
          interfacePlacement?.progress || defaultInterfacePlacement.progress
        }
        justifySelf={"center"}
      >
        <Progress />
      </View>
      <View
        gridArea={
          interfacePlacement?.repeatType || defaultInterfacePlacement.repeatType
        }
        justifySelf={"center"}
      >
        <RepeatTypeBtn />
      </View>
      <View
        gridArea={
          interfacePlacement?.playButton || defaultInterfacePlacement.playButton
        }
        justifySelf={"center"}
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
      </View>
      <View
        gridArea={
          interfacePlacement?.volume || defaultInterfacePlacement.volume
        }
        justifySelf={"center"}
      >
        <Volume />
      </View>
      <View
        gridArea={
          interfacePlacement?.playList || defaultInterfacePlacement.playList
        }
        justifySelf={"center"}
      >
        <SortablePlayList />
      </View>
    </>
  );
};
