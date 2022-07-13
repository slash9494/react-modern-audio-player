import { useNonNullableContext } from "hooks/useNonNullableContext";
import { audioPlayerStateContext } from "lib/audioContext/StateContext";
import { FC, useMemo } from "react";
import { InterfaceChildrenProps } from "../../../types";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";

export const Progress: FC<InterfaceChildrenProps> = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);
  const active =
    activeUI.progress !== undefined ? !!activeUI.progress : activeUI.all;
  const CurProgress = useMemo(() => {
    if (activeUI.progress === "waveform") return <WaveformProgress />;
    return <BarProgress />;
  }, [activeUI.progress]);
  return active ? <div className="progress-wrapper">{CurProgress}</div> : null;
};
