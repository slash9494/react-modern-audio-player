import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerStateContext } from "@/components/AudioPlayer/Context/StateContext";
import { FC } from "react";
import { Basic } from "./Basic";
import { WaveSurferAudio } from "./WaveSurfer";

export const Audio: FC = () => {
  const { curPlayId, playList, activeUI } = useNonNullableContext(
    audioPlayerStateContext
  );
  const curPlayAudioData = playList.find(
    (audioData) => audioData.id === curPlayId
  );
  const playerValidation = curPlayAudioData && playList.length !== 0;

  // refactor declarative ui by props
  if (!playerValidation) return null;

  return activeUI.progress === "waveform" ? <WaveSurferAudio /> : <Basic />;
};
