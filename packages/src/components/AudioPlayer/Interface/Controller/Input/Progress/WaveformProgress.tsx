import { FC } from "react";
import styled from "styled-components";

const WaveformContainer = styled.div`
  display: flex;
  width: 200px;
  #rs-waveform {
    width: 100%;
    wave {
      cursor: pointer !important;
    }
  }
`;

export const WaveformProgress: FC = () => {
  return (
    <WaveformContainer className="waveform-container">
      <div id="rs-waveform" />
    </WaveformContainer>
  );
};
