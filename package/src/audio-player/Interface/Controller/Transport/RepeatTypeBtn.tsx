import { FC, memo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audio-player/Context/dispatchContext";
import { usePlaybackContext } from "@/audio-player/Context/hooks/usePlaybackContext";
import { useResourceContext } from "@/audio-player/Context/hooks/useResourceContext";
import { RepeatType } from "@/audio-player/Context/StateContext";
import { StyledBtn } from "@/ui/StyledBtn";
import Grid, { GridItemLayoutProps } from "@/ui/Grid";
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
} from "@/ui/icons";
import { IconSlot } from "@/ui/IconSlot";
import { useResolvedGridArea } from "../../hooks/useResolvedGridArea";

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

    const resolvedGridArea = useResolvedGridArea("repeatType", gridArea);

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
            <IconSlot
              render={<TbRepeat />}
              customIcon={customIcons?.repeatAll}
            />
          )}
          {repeatType === "ONE" && (
            <IconSlot
              render={<TbRepeatOnce />}
              customIcon={customIcons?.repeatOne}
            />
          )}
          {repeatType === "NONE" && (
            <IconSlot
              render={<TbRepeatOff />}
              customIcon={customIcons?.repeatNone}
            />
          )}
          {repeatType === "SHUFFLE" && (
            <IconSlot
              render={<TbArrowsShuffle />}
              customIcon={customIcons?.repeatShuffle}
            />
          )}
        </StyledBtn>
      </Grid.Item>
    );
  }
);
