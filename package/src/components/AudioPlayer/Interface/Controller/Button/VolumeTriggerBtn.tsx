import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { forwardRef, memo } from "react";
import { IconBaseProps } from "react-icons/lib";
import { TbVolume3, TbVolume2, TbVolume } from "react-icons/tb";
import { Icon } from "../Icon";
import { StyledBtn } from "@/ui/StyledBtn";

export const VolumeTriggerBtn = memo(
  forwardRef<HTMLButtonElement>((_, ref) => {
    const { curAudioState } = usePlaybackContext();
    const { customIcons, elementRefs } = useResourceContext();
    const audioPlayerDispatch = useNonNullableContext(
      audioPlayerDispatchContext
    );
    const changeMuteState = () =>
      audioPlayerDispatch({ type: "SET_MUTED", muted: !curAudioState.muted });

    const volumeOpt: IconBaseProps = { size: "100%" };
    const volume = curAudioState.volume || elementRefs?.audioEl?.volume || 0;
    const isLowVolume = volume > 0 && volume <= 0.5;
    const isHighVolume = volume > 0.5;

    return (
      <StyledBtn
        onClick={changeMuteState}
        className="volume-trigger-container"
        data-testid="volume-trigger-btn"
        data-muted={String(curAudioState.muted)}
        ref={ref}
      >
        {curAudioState.muted || volume === 0 ? (
          <Icon
            render={<TbVolume3 {...volumeOpt} />}
            customIcon={customIcons?.volumeMuted}
          />
        ) : isLowVolume ? (
          <Icon
            render={<TbVolume2 {...volumeOpt} />}
            customIcon={customIcons?.volumeHalf}
          />
        ) : isHighVolume ? (
          <Icon
            render={<TbVolume {...volumeOpt} />}
            customIcon={customIcons?.volumeFull}
          />
        ) : null}
      </StyledBtn>
    );
  })
);
VolumeTriggerBtn.displayName = "VolumeTriggerBtn";
