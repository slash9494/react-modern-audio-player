import { ActiveUI } from "lib/audioContext/StateContext";
import { FC, useMemo } from "react";
import { ControllerChildrenProps } from "../../types";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";

interface _ProgressProps extends ControllerChildrenProps {
  type: ActiveUI["progress"];
}

export const Progress: FC<_ProgressProps> = ({ active, type }) => {
  const CurProgress = useMemo(() => {
    if (type === "waveform") return <WaveformProgress />;
    return <BarProgress />;
  }, [type]);
  return active ? <div className="progress-wrapper">{CurProgress}</div> : null;
};
