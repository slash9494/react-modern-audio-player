import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC, useMemo } from "react";
import { StyledBtn } from "./StyledBtn";
import { ImPrevious, ImNext } from "react-icons/im";
import { Icon } from "../Icon";
import { InterfaceChildrenProps } from "../../types";

interface PrevNnextBtnProps extends InterfaceChildrenProps {
  type: "prev" | "next";
}

export const PrevNnextBtn: FC<PrevNnextBtnProps> = ({ type }) => {
  const { customIcons, activeUI } = useNonNullableContext(
    audioPlayerStateContext
  );
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
      return <Icon render={<ImNext />} customIcon={customIcons?.next} />;
    }
    if (type === "prev") {
      return <Icon render={<ImPrevious />} customIcon={customIcons?.prev} />;
    }
    return null;
  }, [customIcons?.next, customIcons?.prev, type]);

  return activeUI.prevNnext ?? activeUI.all ? (
    <StyledBtn onClick={onClickBtn} className="prev-n-next-button">
      {PrevNnextIcon}
    </StyledBtn>
  ) : null;
};
