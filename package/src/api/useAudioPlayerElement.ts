import { useResourceContext } from "@/audio-player/Context/hooks/useResourceContext";
import type { ElementRefs } from "@/audio-player/Context/StateContext";

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
