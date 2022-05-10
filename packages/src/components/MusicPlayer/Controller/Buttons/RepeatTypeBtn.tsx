import { FC, useCallback } from "react";
import { useNonNullableContext } from "hooks/useNonNullableContext";
import { musicPlayerDispatchContext } from "lib/musicContext/dispatchContext";
import { musicPlayerStateContext } from "lib/musicContext/StateContext";
import { StyledBtn } from "./StyledBtn";

export const RepeatTypeBtn: FC = () => {
  const { curAudioState, curPlayId, playList, activeUI } =
    useNonNullableContext(musicPlayerStateContext);
  const musicPlayerDispatch = useNonNullableContext(musicPlayerDispatchContext);
  const onClick = useCallback(() => {
    switch (curAudioState.repeatType) {
      case "ALL":
        musicPlayerDispatch({ type: "SET_REPEAT_TYPE", repeatType: "SHUFFLE" });
        break;
      case "NONE":
        musicPlayerDispatch({ type: "SET_REPEAT_TYPE", repeatType: "ALL" });
        break;
      case "SHUFFLE":
        musicPlayerDispatch({ type: "SET_REPEAT_TYPE", repeatType: "NONE" });
        break;
      default:
        break;
    }
  }, [curAudioState.repeatType, musicPlayerDispatch]);
  return (
    <StyledBtn onClick={onClick}>
      {curAudioState.repeatType === "ALL" && (
        <img src="/public/images/repeat.svg" alt="" />
      )}
      {curAudioState.repeatType === "NONE" && (
        <img src="/public/images/repeat-once.svg" alt="" />
      )}
      {curAudioState.repeatType === "SHUFFLE" && (
        <img src="/public/images/repeat-shuffle.svg" alt="" />
      )}
    </StyledBtn>
  );
};
