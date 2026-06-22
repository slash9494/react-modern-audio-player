import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FC, ReactNode, MouseEvent } from "react";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { AudioData } from "@/components/AudioPlayer/Context";
import { useProgress } from "../useProgress";

// useProgress.moveAudioTime translates a pointer position on the progress bar
// into audioEl.currentTime. Live streams must bail out before computing a seek
// position — otherwise the click would write NaN/Infinity into currentTime and
// break playback. "Live" is either a non-finite duration OR an explicit
// `isLive` flag on the track (a stream can report a finite underlying
// duration). The live-stream guard calls isLiveTrack directly, decoupled
// from the waveform render mode.

const PROGRESS_BAR_WIDTH = 200;
const INITIAL_CURRENT_TIME = 30;

const makeAudioEl = (duration: number) => {
  const audioEl = document.createElement("audio");
  Object.defineProperty(audioEl, "currentTime", {
    value: INITIAL_CURRENT_TIME,
    writable: true,
  });
  Object.defineProperty(audioEl, "duration", {
    value: duration,
    writable: true,
  });
  return audioEl;
};

const makeClickAt = (clientX: number) => {
  const target = document.createElement("div");
  Object.defineProperty(target, "clientWidth", { value: PROGRESS_BAR_WIDTH });
  target.getBoundingClientRect = () =>
    ({ x: 0, width: PROGRESS_BAR_WIDTH } as DOMRect);
  return {
    clientX,
    currentTarget: target,
  } as unknown as MouseEvent<HTMLDivElement>;
};

const renderUseProgress = (
  audioEl: HTMLAudioElement,
  trackOverride?: Partial<AudioData>
) => {
  const curTrack: AudioData = { id: 1, src: "", ...trackOverride };
  const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <trackContext.Provider
      value={{ playList: [curTrack], curPlayId: 1, curIdx: 0 }}
    >
      <playbackContext.Provider
        value={{
          isPlaying: false,
          repeatType: "ALL",
          muted: false,
          volume: 0.5,
          isLoadedMetaData: true,
          audioResetKey: 0,
        }}
      >
        <resourceContext.Provider
          value={{ elementRefs: { audioEl, waveformInst: undefined as never } }}
        >
          {children}
        </resourceContext.Provider>
      </playbackContext.Provider>
    </trackContext.Provider>
  );
  return renderHook(() => useProgress(), { wrapper });
};

describe("useProgress moveAudioTime live-stream guard", () => {
  it("does not change currentTime on click when duration is Infinity", () => {
    const audioEl = makeAudioEl(Infinity);
    const { result } = renderUseProgress(audioEl);

    result.current.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 2));

    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);
  });

  it("does not change currentTime on move when duration is Infinity", () => {
    const audioEl = makeAudioEl(Infinity);
    const { result } = renderUseProgress(audioEl);

    result.current.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 4));

    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);
  });

  it("seeks to the clicked position when duration is finite (positive control)", () => {
    const DURATION = 120;
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    result.current.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 2));

    expect(audioEl.currentTime).toBe(DURATION / 2);
  });

  it("does not change currentTime on click when isLive even if duration is finite", () => {
    const audioEl = makeAudioEl(120);
    const { result } = renderUseProgress(audioEl, { isLive: true });

    result.current.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 2));

    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);
  });
});
