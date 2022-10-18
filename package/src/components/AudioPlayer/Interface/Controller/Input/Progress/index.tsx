import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC } from "react";
import styled from "styled-components";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";

const ProgressContainer = styled.div`
  min-width: 100px;
`;

export const Progress: FC = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);

  return (
    <ProgressContainer className="progress-container">
      <WaveformProgress isActive={activeUI.progress === "waveform"} />
      <BarProgress isActive={activeUI.progress !== "waveform"} />
    </ProgressContainer>
  );
};
