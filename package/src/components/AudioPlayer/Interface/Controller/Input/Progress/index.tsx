import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC } from "react";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";

export const Progress: FC = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);

  return (
    <div className="progress-container">
      <WaveformProgress isActive={activeUI.progress === "waveform"} />
      <BarProgress isActive={activeUI.progress !== "waveform"} />
    </div>
  );
};
