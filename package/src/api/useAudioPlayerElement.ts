import { useResourceContext } from "@/hooks/context/useResourceContext";
import type { ElementRefs } from "@/components/AudioPlayer/Context/StateContext";

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
