import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";
import Grid, { GridItemLayoutProps } from "@/components/Grid";
import { FC, useEffect, useState } from "react";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";
import { usePlacedGridArea } from "../../../usePlacedGridArea";
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

export const Progress: FC<ProgressProps> = ({
  gridArea,
  visible,
  type,
  width,
  ...rest
}) => {
  const { activeUI } = useUIContext();
  const progressType: ProgressType =
    type ?? (activeUI.progress === "waveform" ? "waveform" : "bar");
  const isWaveform = progressType === "waveform";
  const isBar = progressType === "bar";
  const [waveformMounted, setWaveformMounted] = useState(isWaveform);

  useEffect(() => {
    if (isWaveform && !waveformMounted) setWaveformMounted(true);
  }, [isWaveform, waveformMounted]);

  const resolvedGridArea = usePlacedGridArea("progress", gridArea);

  return (
    <Grid.Item
      gridArea={resolvedGridArea}
      width={width ?? "100%"}
      visible={visible ?? true}
      {...rest}
    >
      <div className="rmap-progress-container">
        {waveformMounted && <WaveformProgress isActive={isWaveform} />}
        {isBar && <BarProgress />}
      </div>
    </Grid.Item>
  );
};
