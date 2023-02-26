import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import {
  audioPlayerStateContext,
  AudioNativeProps,
} from "@/components/AudioPlayer/Context/StateContext";
import React, { FC, useEffect, useRef } from "react";
import { useAudio } from "./useAudio";

// TODO : optimize large audio files

export const Audio: FC<{
  audioRef?: React.MutableRefObject<HTMLAudioElement>;
}> = ({ audioRef: propsAudioRef }) => {
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
        state[0] === "curPlayId" ||
        state[0] === "isLoadedMetaData"
      ) {
        return false;
      }
      return true;
    })
  );

  const useAudioEventProps = useAudio();

  useEffect(() => {
    if (!audioRef.current) return;

    audioPlayerDispatch({
      type: "SET_ELEMENT_REFS",
      elementRefs: { audioEl: audioRef.current },
    });

    if (propsAudioRef) {
      propsAudioRef.current = audioRef.current;
    }
  }, [audioPlayerDispatch, propsAudioRef]);

  return (
    <audio
      id="rm-audio-player-audio"
      autoPlay={curAudioState.isPlaying}
      ref={audioRef}
      src={curPlayedAudioData?.src}
      {...useAudioEventProps}
      {...audioNativeStates}
    ></audio>
  );
};
