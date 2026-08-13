import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { audioPlayerDispatchContext } from "@/audioPlayer/Context/dispatchContext";
import { useAudioAttrsContext } from "@/audioPlayer/Context/hooks/useAudioAttrsContext";
import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";
import { useCurrentTrack } from "@/audioPlayer/Context/hooks/useCurrentTrack";
import React, { useEffect, useRef } from "react";
import { useAudio } from "./useAudio";

export const Audio = React.memo<{
  audioRef?: React.MutableRefObject<HTMLAudioElement>;
}>(({ audioRef: propsAudioRef }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { muted } = usePlaybackContext();
  const nativeAudioAttrs = useAudioAttrsContext();
  const audioPlayerDispatch = useNonNullableContext(audioPlayerDispatchContext);

  const curTrack = useCurrentTrack();

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
      preload={curTrack?.preload ?? "metadata"}
      {...nativeAudioAttrs}
      muted={muted}
      ref={audioRef}
      src={curTrack?.src}
      {...useAudioEventProps}
    ></audio>
  );
});

Audio.displayName = "Audio";
