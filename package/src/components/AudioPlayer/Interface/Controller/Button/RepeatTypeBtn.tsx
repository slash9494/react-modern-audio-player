import { FC, memo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { RepeatType } from "@/components/AudioPlayer/Context/StateContext";
import { StyledBtn } from "@/ui/StyledBtn";
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

export const RepeatTypeBtn: FC = memo(function RepeatTypeBtn() {
  const { curAudioState } = usePlaybackContext();
  const { customIcons } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeRepeatType = () => {
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
  };

  return (
    <StyledBtn
      type="button"
      aria-label={repeatAriaLabels[curAudioState.repeatType]}
      onClick={changeRepeatType}
      className="rmap-repeat-btn"
      data-testid="repeat-btn"
      data-repeattype={curAudioState.repeatType}
    >
      {curAudioState.repeatType === "ALL" && (
        <Icon render={<TbRepeat />} customIcon={customIcons?.repeatAll} />
      )}
      {curAudioState.repeatType === "ONE" && (
        <Icon render={<TbRepeatOnce />} customIcon={customIcons?.repeatOne} />
      )}
      {curAudioState.repeatType === "NONE" && (
        <Icon render={<TbRepeatOff />} customIcon={customIcons?.repeatNone} />
      )}
      {curAudioState.repeatType === "SHUFFLE" && (
        <Icon
          render={<TbArrowsShuffle />}
          customIcon={customIcons?.repeatShuffle}
        />
      )}
    </StyledBtn>
  );
});
