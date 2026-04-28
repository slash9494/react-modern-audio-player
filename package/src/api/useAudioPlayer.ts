import { useAudioPlayerPlayback } from "./useAudioPlayerPlayback";
import { useAudioPlayerTrack } from "./useAudioPlayerTrack";
import { useAudioPlayerVolume } from "./useAudioPlayerVolume";
import { useAudioPlayerTime } from "./useAudioPlayerTime";
import type {
  RepeatType,
  AudioData,
} from "@/components/AudioPlayer/Context/StateContext";

export interface AudioPlayerControls {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  repeatType: RepeatType;
  muted: boolean;
  playbackRate: number;
  currentTrack: AudioData | null;
  currentIndex: number;
  playList: ReadonlyArray<AudioData>;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setTrack: (index: number) => void;
  setPlaybackRate: (rate: number) => void;
}

/**
 * Convenience facade that composes all domain sub-hooks into a single flat
 * object. Subscribes to every context slice — for fine-grained re-render
 * control, import the individual sub-hooks instead.
 */
export const useAudioPlayer = (): AudioPlayerControls => {
  const playback = useAudioPlayerPlayback();
  const track = useAudioPlayerTrack();
  const vol = useAudioPlayerVolume();
  const time = useAudioPlayerTime();

  return {
    isPlaying: playback.isPlaying,
    volume: vol.volume,
    currentTime: time.currentTime,
    duration: time.duration,
    repeatType: playback.repeatType,
    muted: vol.muted,
    playbackRate: playback.playbackRate,
    currentTrack: track.currentTrack,
    currentIndex: track.currentIndex,
    playList: track.playList,
    play: playback.play,
    pause: playback.pause,
    togglePlay: playback.togglePlay,
    next: track.next,
    prev: track.prev,
    seek: time.seek,
    setVolume: vol.setVolume,
    toggleMute: vol.toggleMute,
    setTrack: track.setTrack,
    setPlaybackRate: playback.setPlaybackRate,
  };
};
