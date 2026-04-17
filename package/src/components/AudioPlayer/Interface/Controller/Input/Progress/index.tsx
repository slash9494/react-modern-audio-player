import { useUIContext } from "@/hooks/context/useUIContext";
import Grid from "@/components/Grid";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import { FC, useEffect, useState } from "react";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";
import "./Progress.css";

export interface ProgressProps {
  gridArea?: string;
  visible?: boolean;
}

export const Progress: FC<ProgressProps> = ({ gridArea, visible }) => {
  const { activeUI, interfacePlacement } = useUIContext();
  const progressType = activeUI.progress ?? (activeUI.all ? "bar" : false);
  const isWaveform = progressType === "waveform";
  const isBar = progressType === "bar";
  const [waveformMounted, setWaveformMounted] = useState(isWaveform);

  useEffect(() => {
    if (isWaveform && !waveformMounted) setWaveformMounted(true);
  }, [isWaveform, waveformMounted]);

  const resolvedGridArea =
    gridArea ??
    interfacePlacement?.itemCustomArea?.progress ??
    interfacePlacement?.templateArea?.progress ??
    defaultInterfacePlacement.templateArea.progress;

  return (
    <Grid.Item
      gridArea={resolvedGridArea}
      width="100%"
      visible={visible ?? true}
    >
      <div className="rmap-progress-container">
        {waveformMounted && <WaveformProgress isActive={isWaveform} />}
        {isBar && <BarProgress />}
      </div>
    </Grid.Item>
  );
};
