import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import {
  audioPlayerStateContext,
  AudioNativeProps,
} from "@/components/AudioPlayer/Context/StateContext";
import { FC, useEffect, useRef } from "react";
import { useBasicAudio } from "./useBasicAudio";

export const Basic: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { curAudioState, curPlayId, playList } = useNonNullableContext(
    audioPlayerStateContext
  );
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);
  const curPlayedAudioData = playList.find(
    (audioData) => audioData.id === curPlayId
  );
  const audioNativeStates: AudioNativeProps = Object.fromEntries(
    Object.entries(curAudioState).filter((state) => {
      if (
        state[0] === "isPlaying" ||
        state[0] === "repeatType" ||
        state[0] === "curPlayId"
      ) {
        return false;
      }
      return true;
    })
  );

  const useAudioEventProps = useBasicAudio();

  useEffect(() => {
    if (!audioRef.current) return;
    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: { audioEl: audioRef.current },
    });
  }, [audioRef.current, audioPlayerDispatch]);

  return (
    <audio
      id="rs-audio-player-audio"
      autoPlay={curAudioState.isPlaying}
      ref={audioRef}
      src={curPlayedAudioData!.src}
      {...useAudioEventProps}
      {...audioNativeStates}
    ></audio>
  );
};
