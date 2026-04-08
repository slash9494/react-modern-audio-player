import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FC, ReactNode, SyntheticEvent } from "react";
import { useAudio } from "../useAudio";
import { RepeatType } from "@/components/AudioPlayer/Context/StateContext";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { timeContext } from "@/components/AudioPlayer/Context/TimeContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

// useAudio's seek sync effect mirrors playbackCurrentTime back into the
// underlying <audio> element and waveform cursor. These tests fence the
// guards (NaN/0/Infinity duration, missing waveform), the threshold skip
// that prevents onTimeUpdate feedback, and the [0, 1] clamp.

const TRACK_DURATION_SEC = 180;
const SEEK_SYNC_THRESHOLD_SEC = 0.25;

const makePlaybackValue = (repeatType: RepeatType = "ALL") => ({
  isPlaying: false,
  volume: 0.5,
  muted: false,
  repeatType,
  isLoadedMetaData: true,
  audioResetKey: 0,
});

interface HarnessOptions {
  playbackCurrentTime: number;
  audioElCurrentTime: number;
  audioElDuration: number;
  waveformInst?: {
    seekTo: (ratio: number) => void;
    getCurrentTime: () => number;
  };
  repeatType?: RepeatType;
  dispatch?: ReturnType<typeof vi.fn>;
}

const makeAudioEl = (currentTime: number, duration: number) => {
  const audioEl = document.createElement("audio");
  Object.defineProperty(audioEl, "currentTime", {
    value: currentTime,
    writable: true,
  });
  Object.defineProperty(audioEl, "duration", {
    value: duration,
    writable: true,
  });
  return audioEl;
};

const renderUseAudio = (options: HarnessOptions) => {
  const audioEl = makeAudioEl(
    options.audioElCurrentTime,
    options.audioElDuration
  );
  const dispatch = options.dispatch ?? vi.fn();
  const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <timeContext.Provider
      value={{
        currentTime: options.playbackCurrentTime,
        duration: TRACK_DURATION_SEC,
      }}
    >
      <playbackContext.Provider value={makePlaybackValue(options.repeatType)}>
        <resourceContext.Provider
          value={{
            elementRefs: {
              audioEl,
              waveformInst: options.waveformInst as never,
            },
          }}
        >
          <audioPlayerDispatchContext.Provider value={dispatch}>
            {children}
          </audioPlayerDispatchContext.Provider>
        </resourceContext.Provider>
      </playbackContext.Provider>
    </timeContext.Provider>
  );
  const { result } = renderHook(() => useAudio(), { wrapper });
  return { audioEl, dispatch, result };
};

describe("useAudio seek sync effect", () => {
  let waveformSeekTo: ReturnType<typeof vi.fn>;
  let waveformInst: HarnessOptions["waveformInst"];

  beforeEach(() => {
    waveformSeekTo = vi.fn();
    waveformInst = {
      seekTo: waveformSeekTo,
      getCurrentTime: vi.fn(() => 0),
    };
  });

  it("writes audioEl.currentTime and waveform cursor when delta exceeds the feedback threshold", () => {
    const { audioEl } = renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: TRACK_DURATION_SEC,
      waveformInst,
    });

    expect(audioEl.currentTime).toBe(60);
    expect(waveformSeekTo).toHaveBeenCalledTimes(1);
    expect(waveformSeekTo).toHaveBeenCalledWith(60 / TRACK_DURATION_SEC);
  });

  it("skips both DOM write and waveform cursor when delta is within the feedback threshold", () => {
    const audioElCurrentTime = 60;
    const playbackCurrentTime =
      audioElCurrentTime + SEEK_SYNC_THRESHOLD_SEC / 2;
    const { audioEl } = renderUseAudio({
      playbackCurrentTime,
      audioElCurrentTime,
      audioElDuration: TRACK_DURATION_SEC,
      waveformInst,
    });

    expect(audioEl.currentTime).toBe(audioElCurrentTime);
    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("still writes audioEl.currentTime even when waveformInst is absent", () => {
    const { audioEl } = renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: TRACK_DURATION_SEC,
      waveformInst: undefined,
    });

    expect(audioEl.currentTime).toBe(60);
  });

  it("does not call waveform.seekTo when audioEl.duration is NaN (metadata not loaded)", () => {
    renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: NaN,
      waveformInst,
    });

    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("does not call waveform.seekTo when audioEl.duration is 0", () => {
    renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: 0,
      waveformInst,
    });

    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("does not call waveform.seekTo when audioEl.duration is Infinity (live stream)", () => {
    renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: Infinity,
      waveformInst,
    });

    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("clamps the ratio to 1 when playbackCurrentTime exceeds audioEl.duration (track-change race)", () => {
    renderUseAudio({
      playbackCurrentTime: 240,
      audioElCurrentTime: 0,
      audioElDuration: 120,
      waveformInst,
    });

    expect(waveformSeekTo).toHaveBeenCalledTimes(1);
    expect(waveformSeekTo).toHaveBeenCalledWith(1);
  });

  it("clamps the ratio to 0 when playbackCurrentTime is negative", () => {
    renderUseAudio({
      playbackCurrentTime: -5,
      audioElCurrentTime: 60,
      audioElDuration: TRACK_DURATION_SEC,
      waveformInst,
    });

    expect(waveformSeekTo).toHaveBeenCalledTimes(1);
    expect(waveformSeekTo).toHaveBeenCalledWith(0);
  });
});

describe("useAudio play effect — initial mount", () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = vi
      .fn()
      .mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it("calls audioEl.play() when isPlaying=true on initial mount with an audioEl present", () => {
    const audioEl = makeAudioEl(0, TRACK_DURATION_SEC);
    const dispatch = vi.fn();
    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <timeContext.Provider
        value={{ currentTime: 0, duration: TRACK_DURATION_SEC }}
      >
        <playbackContext.Provider
          value={{ ...makePlaybackValue(), isPlaying: true }}
        >
          <resourceContext.Provider
            value={{
              elementRefs: { audioEl, waveformInst: undefined as never },
            }}
          >
            <audioPlayerDispatchContext.Provider value={dispatch}>
              {children}
            </audioPlayerDispatchContext.Provider>
          </resourceContext.Provider>
        </playbackContext.Provider>
      </timeContext.Provider>
    );
    renderHook(() => useAudio(), { wrapper });
    expect(audioEl.play).toHaveBeenCalledTimes(1);
  });
});

describe("useAudio onEnded handler", () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = vi
      .fn()
      .mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it("repeat ONE — flushSync-dispatches currentTime=0 so the seek sync effect resets audioEl before play() runs", () => {
    // Regression: previously onEnded wrote audioEl.currentTime = 0 directly
    // without dispatching state. A pending onTimeUpdate dispatch (queued at
    // ~end) would render after the reset and the seek sync effect treated
    // the stale state as the "desired" position, jumping the freshly-
    // restarted track straight back to its end. The fix routes the reset
    // through dispatch under flushSync so React commits the seek sync
    // effect ahead of the play() call. Static-context harness can only
    // observe the dispatch contract; the DOM-write half is exercised by
    // the seek sync effect describe block above.
    const dispatch = vi.fn();
    const playSpy = window.HTMLMediaElement.prototype.play as ReturnType<
      typeof vi.fn
    >;
    const { result } = renderUseAudio({
      playbackCurrentTime: 178,
      audioElCurrentTime: 178,
      audioElDuration: TRACK_DURATION_SEC,
      repeatType: "ONE",
      dispatch,
    });

    const playCallsBefore = playSpy.mock.calls.length;

    act(() => {
      result.current.onEnded?.({} as SyntheticEvent<HTMLAudioElement, Event>);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_AUDIO_STATE",
      audioState: { currentTime: 0 },
    });
    expect(playSpy.mock.calls.length).toBeGreaterThan(playCallsBefore);
  });

  it("non-ONE repeat — dispatches NEXT_AUDIO instead of touching DOM directly", () => {
    const dispatch = vi.fn();
    const { audioEl, result } = renderUseAudio({
      playbackCurrentTime: 178,
      audioElCurrentTime: 178,
      audioElDuration: TRACK_DURATION_SEC,
      repeatType: "ALL",
      dispatch,
    });

    act(() => {
      result.current.onEnded?.({} as SyntheticEvent<HTMLAudioElement, Event>);
    });

    expect(audioEl.currentTime).toBe(178);
    expect(dispatch).toHaveBeenCalledWith({ type: "NEXT_AUDIO" });
  });
});
