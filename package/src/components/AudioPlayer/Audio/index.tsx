import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { useAudioAttrsContext } from "@/hooks/context/useAudioAttrsContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import React, { useEffect, useRef } from "react";
import { useAudio } from "./useAudio";

// TODO : optimize large audio files

export const Audio = React.memo<{
  audioRef?: React.MutableRefObject<HTMLAudioElement>;
}>(({ audioRef: propsAudioRef }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { muted } = usePlaybackContext();
  const { curPlayId, playList } = useTrackContext();
  const nativeAudioAttrs = useAudioAttrsContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const curPlayedAudioData = playList.find(
    (audioData) => audioData.id === curPlayId
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
      {...nativeAudioAttrs}
      muted={muted}
      ref={audioRef}
      src={curPlayedAudioData?.src}
      {...useAudioEventProps}
    ></audio>
  );
});

Audio.displayName = "Audio";
