import { FC, memo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/components/AudioPlayer/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { RepeatType } from "@/components/AudioPlayer/Context/StateContext";
import { StyledBtn } from "@/ui/StyledBtn";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
} from "@/components/icons";
import { Icon } from "../Icon";
import { usePlacedGridArea } from "../../usePlacedGridArea";

const repeatAriaLabels: Record<RepeatType, string> = {
  ALL: "Repeat: All tracks",
  ONE: "Repeat: One track",
  NONE: "Repeat: Off",
  SHUFFLE: "Shuffle",
};

// Cycle order: ALL → ONE → NONE → SHUFFLE → ALL.
const NEXT_REPEAT_TYPE: Record<RepeatType, RepeatType> = {
  ALL: "ONE",
  ONE: "NONE",
  NONE: "SHUFFLE",
  SHUFFLE: "ALL",
};

export type RepeatTypeBtnProps = GridItemLayoutProps;

export const RepeatTypeBtn: FC<RepeatTypeBtnProps> = memo(
  function RepeatTypeBtn({ gridArea, visible, ...rest }) {
    const { repeatType } = usePlaybackContext();
    const { customIcons } = useResourceContext();
    const audioPlayerDispatch = useNonNullableContext(
      audioPlayerDispatchContext
    );
    const changeRepeatType = () => {
      audioPlayerDispatch({
        type: "SET_REPEAT_TYPE",
        repeatType: NEXT_REPEAT_TYPE[repeatType],
      });
    };

    const resolvedGridArea = usePlacedGridArea("repeatType", gridArea);

    return (
      <Grid.Item
        gridArea={resolvedGridArea}
        visible={visible ?? true}
        {...rest}
      >
        <StyledBtn
          type="button"
          aria-label={repeatAriaLabels[repeatType]}
          onClick={changeRepeatType}
          className="rmap-repeat-btn"
          data-testid="repeat-btn"
          data-repeattype={repeatType}
        >
          {repeatType === "ALL" && (
            <Icon render={<TbRepeat />} customIcon={customIcons?.repeatAll} />
          )}
          {repeatType === "ONE" && (
            <Icon
              render={<TbRepeatOnce />}
              customIcon={customIcons?.repeatOne}
            />
          )}
          {repeatType === "NONE" && (
            <Icon
              render={<TbRepeatOff />}
              customIcon={customIcons?.repeatNone}
            />
          )}
          {repeatType === "SHUFFLE" && (
            <Icon
              render={<TbArrowsShuffle />}
              customIcon={customIcons?.repeatShuffle}
            />
          )}
        </StyledBtn>
      </Grid.Item>
    );
  }
);
