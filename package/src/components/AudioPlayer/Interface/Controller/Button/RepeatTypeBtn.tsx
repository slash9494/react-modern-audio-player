import { FC, useCallback, useMemo } from "react";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { StyledBtn } from "./StyledBtn";
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
} from "react-icons/tb";
import { Icon } from "../Icon";
import { InterfaceChildrenProps } from "../../types";

export const RepeatTypeBtn: FC<InterfaceChildrenProps> = () => {
  const { curAudioState, iconImgs, activeUI } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClick = useCallback(() => {
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
        return <Icon render={<TbRepeat />} customImg={iconImgs?.repeatAll} />;
      case "ONE":
        return (
          <Icon render={<TbRepeatOnce />} customImg={iconImgs?.repeatOne} />
        );
      case "NONE":
        return (
          <Icon render={<TbRepeatOff />} customImg={iconImgs?.repeatNone} />
        );
      case "SHUFFLE":
        return (
          <Icon
            render={<TbArrowsShuffle />}
            customImg={iconImgs?.repeatShuffle}
          />
        );
      default:
        null;
    }
  }, [
    curAudioState.repeatType,
    iconImgs?.repeatAll,
    iconImgs?.repeatNone,
    iconImgs?.repeatOne,
    iconImgs?.repeatShuffle,
  ]);

  return activeUI.repeatType ?? activeUI.all ? (
    <StyledBtn onClick={onClick}>{RepeatIcon}</StyledBtn>
  ) : null;
};
