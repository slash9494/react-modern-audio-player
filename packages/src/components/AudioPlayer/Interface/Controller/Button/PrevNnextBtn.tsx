import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "lib/audioContext/dispatchContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { FC, useMemo } from "react";
import { StyledBtn } from "./StyledBtn";
import { ImPrevious, ImNext } from "react-icons/im";
import { Icon } from "../Icon";
import { ControllerChildrenProps } from "../types";

interface PrevNnextBtnProps extends ControllerChildrenProps {
  type: "prev" | "next";
}

export const PrevNnextBtn: FC<PrevNnextBtnProps> = ({ type, active }) => {
  const { iconImgs } = useNonNullableContext(audioPlayerStateContext);
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const onClickBtn = () => {
    if (type === "next") {
      audioPlayerDispatch({ type: "NEXT_AUDIO" });
    }
    if (type === "prev") {
      audioPlayerDispatch({ type: "PREV_AUDIO" });
    }
  };
  const PrevNnextIcon = useMemo(() => {
    if (type === "next") {
      return <Icon render={<ImNext />} customImg={iconImgs?.next} />;
    }
    if (type === "prev") {
      return <Icon render={<ImPrevious />} customImg={iconImgs?.prev} />;
    }
    return null;
  }, [iconImgs?.next, iconImgs?.prev, type]);

  return active ? (
    <StyledBtn onClick={onClickBtn}>{PrevNnextIcon}</StyledBtn>
  ) : null;
};
