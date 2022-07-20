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
  const active =
    activeUI.progress !== undefined ? !!activeUI.progress : activeUI.all;
  const CurProgress = useMemo(() => {
    if (activeUI.progress === "waveform") return <WaveformProgress />;
    return <BarProgress />;
  }, [activeUI.progress]);
  return active ? (
    <ProgressContainer className="progress-container">
      {CurProgress}
    </ProgressContainer>
  ) : null;
};
