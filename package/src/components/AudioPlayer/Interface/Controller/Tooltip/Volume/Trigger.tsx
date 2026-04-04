import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";
import { forwardRef, useCallback, useMemo } from "react";
import {
  SvgIconProps,
  TbVolume3,
  TbVolume2,
  TbVolume,
} from "@/components/icons";
import { Icon } from "../../Icon";
import "./Trigger.css";
export const Trigger = forwardRef<HTMLButtonElement>((_, ref) => {
  const { curAudioState } = usePlaybackContext();
  const { customIcons, elementRefs } = useResourceContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const changeMuteState = useCallback(
    () =>
      audioPlayerDispatch({ type: "SET_MUTED", muted: !curAudioState.muted }),
    [audioPlayerDispatch, curAudioState.muted]
  );

  const VolumeIcon = useMemo(() => {
    const volumeOpt: SvgIconProps = {
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
    switch (
      volumeState(curAudioState.volume || elementRefs?.audioEl?.volume || 0)
    ) {
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
    elementRefs?.audioEl?.volume,
  ]);
  return (
    <button
      onClick={changeMuteState}
      className="rmap-volume-trigger"
      ref={ref}
      type="button"
      aria-label="Toggle mute"
    >
      {VolumeIcon}
    </button>
  );
});
Trigger.displayName = "Trigger";
