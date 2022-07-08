import { FC } from "react";
import styled from "styled-components";
import { useNonNullableContext } from "../../../../hooks/useNonNullableContext";
import { audioPlayerStateContext } from "../../../../lib/audioContext/StateContext";
import { PlayBtn, PrevNnextBtn, RepeatTypeBtn } from "./Button";
import { Volume, SortablePlayList } from "./Dropdown";
import { Progress } from "./Input";
import { View } from "@react-spectrum/view";

/**
 * //TODO
 * UI 정리, 애니메이션
 * refactoring with a reference to SLASH22
 */

const PlaySetBtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

// TODO : controller placement

export const Controller: FC = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);
  return (
    <>
      <View gridArea={"row1-3"}>
        <Progress
          active={
            activeUI.progress !== undefined ? !!activeUI.progress : activeUI.all
          }
          type={activeUI.progress}
        />
      </View>
      <View gridArea={"row1-2"}>
        <RepeatTypeBtn active={activeUI.repeatType ?? activeUI.all} />
      </View>
      <View gridArea={"row2-2"} justifySelf={"center"}>
        <PlaySetBtnsWrapper className="btn-wrapper">
          <PrevNnextBtn
            type="prev"
            active={activeUI.prevNnext ?? activeUI.all}
          />
          <PlayBtn active={activeUI.playButton ?? activeUI.all} />
          <PrevNnextBtn
            type="next"
            active={activeUI.prevNnext ?? activeUI.all}
          />
        </PlaySetBtnsWrapper>
      </View>
      <Volume active={activeUI.volume ?? activeUI.all} />
      {/* <SortablePlayList active={activeUI.playList ?? activeUI.all} /> */}
    </>
  );
};
