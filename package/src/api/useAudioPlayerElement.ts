import { useResourceContext } from "@/audioPlayer/Context/hooks/useResourceContext";
import type { ElementRefs } from "@/audioPlayer/Context/state";

export interface AudioPlayerElementControls {
  audioEl: ElementRefs["audioEl"] | undefined;
  waveformInst: ElementRefs["waveformInst"] | undefined;
}

/**
 * Subscribes to the resource slice. Both refs stay `undefined` until the
 * player has mounted and attached them, so guard before use. Must run inside
 * a Client Component nested under the player provider, or the guard throws.
 */
export const useAudioPlayerElement = (): AudioPlayerElementControls => {
  const { elementRefs } = useResourceContext();

  return {
    audioEl: elementRefs?.audioEl,
    waveformInst: elementRefs?.waveformInst,
  };
};
