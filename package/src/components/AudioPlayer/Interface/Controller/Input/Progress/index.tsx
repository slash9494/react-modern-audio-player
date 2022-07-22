import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC, useMemo } from "react";
import styled from "styled-components";
import { BarProgress } from "./BarProgress";
import { WaveformProgress } from "./WaveformProgress";

const ProgressContainer = styled.div`
  min-width: 200px;
  padding: 0 10px;
`;

export const Progress: FC = () => {
  const { activeUI } = useNonNullableContext(audioPlayerStateContext);
  const CurProgress = useMemo(() => {
    if (activeUI.progress === "waveform") return <WaveformProgress />;
    return <BarProgress />;
  }, [activeUI.progress]);
  return (
    <ProgressContainer className="progress-container">
      {CurProgress}
    </ProgressContainer>
  );
};
