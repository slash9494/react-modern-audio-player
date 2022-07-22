import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC, useMemo } from "react";
import { StyledBtn } from "./StyledBtn";
import { ImPrevious, ImNext } from "react-icons/im";
import { Icon } from "../Icon";

interface PrevNnextBtnProps {
  type: "prev" | "next";
  visible: boolean;
}

export const PrevNnextBtn: FC<PrevNnextBtnProps> = ({ type, visible }) => {
  const { customIcons } = useNonNullableContext(audioPlayerStateContext);
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

  return visible ? (
    <StyledBtn onClick={onClickBtn} className="prev-n-next-button">
      {PrevNnextIcon}
    </StyledBtn>
  ) : null;
};
