import { useUIContext } from "@/hooks/context/useUIContext";
import { FC, useEffect, useState } from "react";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";
import "./Progress.css";

export const Progress: FC = () => {
  const { activeUI } = useUIContext();
  const isWaveform = activeUI.progress === "waveform";
  const isBar = activeUI.progress === "bar";
  const [waveformMounted, setWaveformMounted] = useState(isWaveform);

  useEffect(() => {
    if (isWaveform && !waveformMounted) setWaveformMounted(true);
  }, [isWaveform, waveformMounted]);

  return (
    <div className="progress-container">
      {waveformMounted && <WaveformProgress isActive={isWaveform} />}
      {isBar && <BarProgress />}
    </div>
  );
};
