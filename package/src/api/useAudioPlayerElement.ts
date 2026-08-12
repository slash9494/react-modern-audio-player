import { useResourceContext } from "@/audioPlayer/Context/hooks/useResourceContext";
import type { ElementRefs } from "@/audioPlayer/Context/StateContext";

export interface AudioPlayerElementControls {
  audioEl: ElementRefs["audioEl"] | undefined;
  waveformInst: ElementRefs["waveformInst"] | undefined;
}

export const useAudioPlayerElement = (): AudioPlayerElementControls => {
  const { elementRefs } = useResourceContext();

  return {
    audioEl: elementRefs?.audioEl,
    waveformInst: elementRefs?.waveformInst,
  };
};
