import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { forwardRef, memo, useCallback } from "react";
import {
  SvgIconProps,
  TbVolume3,
  TbVolume2,
  TbVolume,
} from "@/components/icons";
import { Icon } from "../Icon";
import { StyledBtn } from "@/ui/StyledBtn";

const volumeOpt: SvgIconProps = { size: "100%" };

export const VolumeTriggerBtn = memo(
  forwardRef<HTMLButtonElement>((_, ref) => {
    const { curAudioState } = usePlaybackContext();
    const { customIcons, elementRefs } = useResourceContext();
    const audioPlayerDispatch = useNonNullableContext(
      audioPlayerDispatchContext
    );
    const changeMuteState = useCallback(
      () =>
        audioPlayerDispatch({ type: "SET_MUTED", muted: !curAudioState.muted }),
      [audioPlayerDispatch, curAudioState.muted]
    );
    const volume = curAudioState.volume ?? elementRefs?.audioEl?.volume ?? 0;
    const isLowVolume = volume > 0 && volume <= 0.5;
    const isHighVolume = volume > 0.5;

    return (
      <StyledBtn
        type="button"
        aria-label={curAudioState.muted ? "Unmute" : "Mute"}
        aria-pressed={curAudioState.muted}
        onClick={changeMuteState}
        className="rmap-volume-trigger"
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
