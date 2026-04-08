import { FC, memo, useMemo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { StyledBtn } from "@/ui/StyledBtn";
import { ImPrevious, ImNext } from "@/components/icons";
import { Icon } from "../Icon";

interface PrevNnextBtnProps {
  type: "prev" | "next";
  visible: boolean;
}

export const PrevNnextBtn: FC<PrevNnextBtnProps> = memo(function PrevNnextBtn({
  type,
  visible,
}) {
  const { customIcons, elementRefs } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeAudio = () => {
    if (type === "next") {
      audioPlayerDispatch({ type: "NEXT_AUDIO" });
    }
    if (type === "prev") {
      const currentTime =
        elementRefs?.waveformInst?.getCurrentTime() ??
        elementRefs?.audioEl?.currentTime ??
        0;
      audioPlayerDispatch({ type: "PREV_AUDIO", currentTime });
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
    <StyledBtn
      type="button"
      aria-label={type === "prev" ? "Previous track" : "Next track"}
      onClick={changeAudio}
      className="rmap-prev-next-btn"
      data-testid={`${type}-btn`}
    >
      {PrevNnextIcon}
    </StyledBtn>
  ) : null;
});
