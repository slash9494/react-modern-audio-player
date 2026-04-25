import { FC, memo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { useResourceContext } from "@/components/AudioPlayer/Context/hooks/useResourceContext";
import { StyledBtn } from "@/ui/StyledBtn";
import { ImPrevious } from "@/components/icons";
import { Icon } from "../../Icon";

interface PrevBtnProps {
  isVisible: boolean;
}

export const PrevBtn: FC<PrevBtnProps> = memo(function PrevBtn({ isVisible }) {
  const { customIcons, elementRefs } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const handlePrev = () => {
    const currentTime = elementRefs?.audioEl?.currentTime ?? 0;
    audioPlayerDispatch({ type: "PREV_AUDIO", currentTime });
  };

  return isVisible ? (
    <StyledBtn
      type="button"
      aria-label="Previous track"
      onClick={handlePrev}
      className="rmap-prev-btn"
      data-testid="prev-btn"
    >
      <Icon render={<ImPrevious />} customIcon={customIcons?.prev} />
    </StyledBtn>
  ) : null;
});
