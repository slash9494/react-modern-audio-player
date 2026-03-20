import { FC, useCallback, useMemo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext, RepeatType } from "@/components/AudioPlayer/Context/StateContext";
import { StyledBtn } from "./StyledBtn";
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
} from "react-icons/tb";
import { Icon } from "../Icon";

export const RepeatTypeBtn: FC = () => {
  const { curAudioState, customIcons } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeRepeatType = useCallback(() => {
    switch (curAudioState.repeatType) {
      case "ALL":
        audioPlayerDispatch({ type: "SET_REPEAT_TYPE", repeatType: "ONE" });
        break;
      case "ONE":
        audioPlayerDispatch({ type: "SET_REPEAT_TYPE", repeatType: "NONE" });
        break;
      case "NONE":
        audioPlayerDispatch({ type: "SET_REPEAT_TYPE", repeatType: "SHUFFLE" });
        break;
      case "SHUFFLE":
        audioPlayerDispatch({ type: "SET_REPEAT_TYPE", repeatType: "ALL" });
        break;
      default:
        break;
    }
  }, [curAudioState.repeatType, audioPlayerDispatch]);
  const RepeatIcon = useMemo(() => {
    switch (curAudioState.repeatType) {
      case "ALL":
        return (
          <Icon render={<TbRepeat />} customIcon={customIcons?.repeatAll} />
        );
      case "ONE":
        return (
          <Icon render={<TbRepeatOnce />} customIcon={customIcons?.repeatOne} />
        );
      case "NONE":
        return (
          <Icon render={<TbRepeatOff />} customIcon={customIcons?.repeatNone} />
        );
      case "SHUFFLE":
        return (
          <Icon
            render={<TbArrowsShuffle />}
            customIcon={customIcons?.repeatShuffle}
          />
        );
      default:
        null;
    }
  }, [
    curAudioState.repeatType,
    customIcons?.repeatAll,
    customIcons?.repeatNone,
    customIcons?.repeatOne,
    customIcons?.repeatShuffle,
  ]);

  const repeatAriaLabels: Record<RepeatType, string> = {
    ALL: "Repeat: All tracks",
    ONE: "Repeat: One track",
    NONE: "Repeat: Off",
    SHUFFLE: "Shuffle",
  };

  return (
    <StyledBtn
      type="button"
      aria-label={curAudioState.repeatType ? repeatAriaLabels[curAudioState.repeatType] : undefined}
      onClick={changeRepeatType}
      className="repeat-button"
      data-testid="repeat-btn"
      data-repeattype={curAudioState.repeatType}
    >
      {RepeatIcon}
    </StyledBtn>
  );
};
