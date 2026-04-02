import { useUIContext } from "@/hooks/context/useUIContext";
import { FC } from "react";
import styled from "styled-components";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";

const ProgressContainer = styled.div`
  min-width: 100px;
`;

export const Progress: FC = () => {
  const { activeUI } = useUIContext();

  return (
    <ProgressContainer className="progress-container">
      {activeUI.progress === "waveform" ? (
        <WaveformProgress />
      ) : (
        <BarProgress />
      )}
    </ProgressContainer>
  );
};
