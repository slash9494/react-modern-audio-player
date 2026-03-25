import { FC, memo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { StyledBtn } from "./StyledBtn";
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
} from "react-icons/tb";
import { Icon } from "../Icon";

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
      onClick={changeRepeatType}
      className="repeat-button"
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
