import { FC, memo } from "react";
import { useNonNullableContext } from "@/hooks/context/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import {
  RepeatType,
  defaultInterfacePlacement,
} from "@/components/AudioPlayer/Context/StateContext";
import { StyledBtn } from "@/ui/StyledBtn";
import Grid from "@/components/Grid";
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
} from "@/components/icons";
import { Icon } from "../Icon";

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

export interface RepeatTypeBtnProps {
  gridArea?: string;
  visible?: boolean;
}

export const RepeatTypeBtn: FC<RepeatTypeBtnProps> = memo(
  function RepeatTypeBtn({ gridArea, visible }) {
    const { repeatType } = usePlaybackContext();
    const { customIcons } = useResourceContext();
    const { interfacePlacement } = useUIContext();
    const audioPlayerDispatch = useNonNullableContext(
      audioPlayerDispatchContext
    );
    const changeRepeatType = () => {
      audioPlayerDispatch({
        type: "SET_REPEAT_TYPE",
        repeatType: NEXT_REPEAT_TYPE[repeatType],
      });
    };

    const resolvedGridArea =
      gridArea ??
      interfacePlacement?.itemCustomArea?.repeatType ??
      interfacePlacement?.templateArea?.repeatType ??
      defaultInterfacePlacement.templateArea.repeatType;

    return (
      <Grid.Item gridArea={resolvedGridArea} visible={visible ?? true}>
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
