import { useUIContext } from "@/hooks/context/useUIContext";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { defaultInterfacePlacement } from "@/components/AudioPlayer/Context/StateContext";
import { FC, useEffect, useState } from "react";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";
import "./Progress.css";

export type ProgressType = "bar" | "waveform";

export interface ProgressProps extends GridItemLayoutProps {
  /**
   * Override which progress renderer to show. When omitted, falls back to
   * `activeUI.progress`. Used when the preset is disabled but the compound
   * `<AudioPlayer.Progress />` is still placed explicitly — without this,
   * the component would render an empty grid slot.
   */
  type?: ProgressType;
}

function resolveProgressType(
  override: ProgressType | undefined,
  activeProgress: "bar" | "waveform" | false | undefined
): ProgressType {
  if (override) return override;
  if (activeProgress === "waveform") return "waveform";
  return "bar";
}

export const Progress: FC<ProgressProps> = ({ gridArea, visible, type }) => {
  const { activeUI, interfacePlacement } = useUIContext();
  const progressType = resolveProgressType(type, activeUI.progress);
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
