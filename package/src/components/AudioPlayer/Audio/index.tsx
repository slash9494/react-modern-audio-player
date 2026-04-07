import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { AudioNativeProps } from "@/components/AudioPlayer/Context/StateContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import React, { FC, useEffect, useRef } from "react";
import { useAudio } from "./useAudio";

// TODO : optimize large audio files

export const Audio: FC<{
  audioRef?: React.MutableRefObject<HTMLAudioElement>;
}> = ({ audioRef: propsAudioRef }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { curAudioState } = usePlaybackContext();
  const { curPlayId, playList } = useTrackContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const curPlayedAudioData = playList.find(
    (audioData) => audioData.id === curPlayId
  );
  // Drop the React-side fields that are not valid HTML <audio> attributes
  // before spreading the rest onto the element. Destructuring makes the
  // intent obvious and removes the opaque `Object.entries → filter →
  // fromEntries` sequence.
  const {
    isPlaying: _isPlaying,
    repeatType: _repeatType,
    isLoadedMetaData: _isLoadedMetaData,
    ...audioNativeStates
  } = curAudioState as AudioNativeProps & {
    isPlaying?: unknown;
    repeatType?: unknown;
    isLoadedMetaData?: unknown;
  };

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
