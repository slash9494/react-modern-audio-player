import {
  audioPlayerDispatchContext,
  audioPlayerStateContext,
} from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { FC, useLayoutEffect } from "react";
import styled from "styled-components";

const WaveformWrapper = styled.div`
  display: flex;
  width: 100%;
  #rm-waveform {
    width: 100%;
    wave {
      cursor: pointer !important;
    }
  }
`;

export const WaveformProgress: FC<{ isActive: boolean }> = ({ isActive }) => {
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const { elementRefs } = useNonNullableContext(audioPlayerStateContext);

  useLayoutEffect(() => {
    if (!isActive && elementRefs?.waveformInst) {
      elementRefs.waveformInst.destroy();
      audioPlayerDispatch({
        type: "SET_ELEMENT_REFS",
        elementRefs: { waveformInst: undefined },
      });
    }
  }, [audioPlayerDispatch, elementRefs?.waveformInst, isActive]);

  return isActive ? (
    <WaveformWrapper className="waveform-wrapper">
      <div id="rm-waveform" />
    </WaveformWrapper>
  ) : null;
};
