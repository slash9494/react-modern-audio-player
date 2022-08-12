import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { forwardRef, useCallback, useMemo } from "react";
import { IconBaseProps } from "react-icons/lib";
import { TbVolume3, TbVolume2, TbVolume } from "react-icons/tb";
import { Icon } from "../Icon";
import { StyledBtn } from "./StyledBtn";

export const VolumeTriggerBtn = forwardRef<HTMLButtonElement>((_, ref) => {
  const { curAudioState, customIcons } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeMuteState = useCallback(
    () =>
      audioPlayerDispatch({ type: "SET_MUTED", muted: !curAudioState.muted }),
    [audioPlayerDispatch, curAudioState.muted]
  );

  const VolumeIcon = useMemo(() => {
    const volumeOpt: IconBaseProps = {
      size: "100%",
    };
    if (curAudioState.muted)
      return (
        <Icon
          render={<TbVolume3 {...volumeOpt} />}
          customIcon={customIcons?.volumeMuted}
        />
      );
    const volumeState = (value: number) => {
      if (value === 0) return "mute";
      if (value <= 0.5) return "low";
      if (value > 0.5) return "high";
    };
    switch (volumeState(curAudioState.volume)) {
      case "mute":
        return (
          <Icon
            render={<TbVolume3 {...volumeOpt} />}
            customIcon={customIcons?.volumeMuted}
          />
        );
      case "low":
        return (
          <Icon
            render={<TbVolume2 {...volumeOpt} />}
            customIcon={customIcons?.volumeHalf}
          />
        );
      case "high":
        return (
          <Icon
            render={<TbVolume {...volumeOpt} />}
            customIcon={customIcons?.volumeFull}
          />
        );
      default:
        return null;
    }
  }, [
    curAudioState.muted,
    curAudioState.volume,
    customIcons?.volumeMuted,
    customIcons?.volumeFull,
    customIcons?.volumeHalf,
  ]);
  return (
    <StyledBtn
      onClick={changeMuteState}
      className="volume-trigger-container"
      ref={ref}
    >
      {VolumeIcon}
    </StyledBtn>
  );
});
VolumeTriggerBtn.displayName = "VolumeTriggerBtn";
