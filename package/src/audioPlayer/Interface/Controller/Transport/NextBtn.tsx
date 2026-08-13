import { FC, memo } from "react";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audioPlayer/Context/dispatchContext";
import { useResourceContext } from "@/audioPlayer/Context/hooks/useResourceContext";
import { StyledBtn } from "@/ui/StyledBtn";
import { ImNext } from "@/ui/icons";
import { IconSlot } from "@/ui/IconSlot";

interface NextBtnProps {
  isVisible: boolean;
}

export const NextBtn: FC<NextBtnProps> = memo(function NextBtn({ isVisible }) {
  const { customIcons } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const handleNext = () => {
    audioPlayerDispatch({ type: "NEXT_AUDIO" });
  };

  return isVisible ? (
    <StyledBtn
      type="button"
      aria-label="Next track"
      onClick={handleNext}
      className="rmap-next-btn"
      data-testid="next-btn"
    >
      <IconSlot render={<ImNext />} customIcon={customIcons?.next} />
    </StyledBtn>
  ) : null;
});
