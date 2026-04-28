import { renderHook, render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FC, ReactNode, SyntheticEvent } from "react";
import { useAudio } from "../useAudio";
import { RepeatType } from "@/components/AudioPlayer/Context/StateContext";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { timeContext } from "@/components/AudioPlayer/Context/TimeContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

// useAudio's seek sync effect only writes audioEl.currentTime (and the
// waveform cursor) when a SEEK dispatch has incremented seekRequestKey.
// Ordinary onTimeUpdate echoes, which only change playbackCurrentTime,
// must never reach the DOM write path — otherwise a slow React commit
// could resurrect a stale state and seek the live audio backwards.

const TRACK_DURATION_SEC = 180;

const makePlaybackValue = (
  repeatType: RepeatType = "ALL",
  playbackRate = 1
) => ({
  isPlaying: false,
  volume: 0.5,
  muted: false,
  repeatType,
  isLoadedMetaData: true,
  audioResetKey: 0,
  playbackRate,
});

interface HarnessOptions {
  playbackCurrentTime: number;
  audioElCurrentTime: number;
  audioElDuration: number;
  seekRequestKey?: number;
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
        seekRequestKey: options.seekRequestKey ?? 0,
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

  it("applies playbackCurrentTime to audioEl and waveform when seekRequestKey is non-zero on mount", () => {
    const { audioEl } = renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: TRACK_DURATION_SEC,
      seekRequestKey: 1,
      waveformInst,
    });

    expect(audioEl.currentTime).toBe(60);
    expect(waveformSeekTo).toHaveBeenCalledTimes(1);
    expect(waveformSeekTo).toHaveBeenCalledWith(60 / TRACK_DURATION_SEC);
  });

  it("does NOT write audioEl.currentTime when seekRequestKey is 0, even when playbackCurrentTime is far from DOM (stale onTimeUpdate echo scenario)", () => {
    // Regression for the old 0.25s-delta heuristic: a state commit that
    // arrives after audio has already progressed ahead in real playback
    // would look like a "user seek" under the old logic and drag audio
    // backwards. The new keyed approach requires a SEEK dispatch to apply.
    const { audioEl } = renderUseAudio({
      playbackCurrentTime: 10,
      audioElCurrentTime: 60,
      audioElDuration: TRACK_DURATION_SEC,
      seekRequestKey: 0,
      waveformInst,
    });

    expect(audioEl.currentTime).toBe(60);
    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("still writes audioEl.currentTime when waveformInst is absent", () => {
    const { audioEl } = renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: TRACK_DURATION_SEC,
      seekRequestKey: 1,
      waveformInst: undefined,
    });

    expect(audioEl.currentTime).toBe(60);
  });

  it("does not call waveform.seekTo when audioEl.duration is NaN (metadata not loaded)", () => {
    renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: NaN,
      seekRequestKey: 1,
      waveformInst,
    });

    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("does not call waveform.seekTo when audioEl.duration is 0", () => {
    renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: 0,
      seekRequestKey: 1,
      waveformInst,
    });

    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("does not call waveform.seekTo when audioEl.duration is Infinity (live stream)", () => {
    renderUseAudio({
      playbackCurrentTime: 60,
      audioElCurrentTime: 10,
      audioElDuration: Infinity,
      seekRequestKey: 1,
      waveformInst,
    });

    expect(waveformSeekTo).not.toHaveBeenCalled();
  });

  it("clamps the ratio to 1 when playbackCurrentTime exceeds audioEl.duration (track-change race)", () => {
    renderUseAudio({
      playbackCurrentTime: 240,
      audioElCurrentTime: 0,
      audioElDuration: 120,
      seekRequestKey: 1,
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
      seekRequestKey: 1,
      waveformInst,
    });

    expect(waveformSeekTo).toHaveBeenCalledTimes(1);
    expect(waveformSeekTo).toHaveBeenCalledWith(0);
  });
});

describe("useAudio seek sync effect — rerender behavior", () => {
  it("does not re-apply after an onTimeUpdate echo with the same seekRequestKey", () => {
    const waveformSeekTo = vi.fn();
    const waveformInst = {
      seekTo: waveformSeekTo,
      getCurrentTime: vi.fn(() => 0),
    };
    const audioEl = makeAudioEl(10, TRACK_DURATION_SEC);

    const HookHost: FC = () => {
      useAudio();
      return null;
    };

    const Harness: FC<{
      playbackCurrentTime: number;
      seekRequestKey: number;
    }> = ({ playbackCurrentTime, seekRequestKey }) => (
      <timeContext.Provider
        value={{
          currentTime: playbackCurrentTime,
          duration: TRACK_DURATION_SEC,
          seekRequestKey,
        }}
      >
        <playbackContext.Provider value={makePlaybackValue()}>
          <resourceContext.Provider
            value={{
              elementRefs: {
                audioEl,
                waveformInst: waveformInst as never,
              },
            }}
          >
            <audioPlayerDispatchContext.Provider value={vi.fn()}>
              <HookHost />
            </audioPlayerDispatchContext.Provider>
          </resourceContext.Provider>
        </playbackContext.Provider>
      </timeContext.Provider>
    );

    const { rerender } = render(
      <Harness playbackCurrentTime={60} seekRequestKey={1} />
    );
    expect(audioEl.currentTime).toBe(60);
    expect(waveformSeekTo).toHaveBeenCalledTimes(1);

    // Simulate audio advancing past the seek target during normal
    // playback. The onTimeUpdate echo rerenders with the advanced
    // playbackCurrentTime but the same seekRequestKey.
    audioEl.currentTime = 61.5;
    rerender(<Harness playbackCurrentTime={61.5} seekRequestKey={1} />);

    expect(audioEl.currentTime).toBe(61.5);
    expect(waveformSeekTo).toHaveBeenCalledTimes(1);
  });

  it("re-applies when seekRequestKey increments (new SEEK dispatch)", () => {
    const waveformSeekTo = vi.fn();
    const waveformInst = {
      seekTo: waveformSeekTo,
      getCurrentTime: vi.fn(() => 0),
    };
    const audioEl = makeAudioEl(10, TRACK_DURATION_SEC);

    const HookHost: FC = () => {
      useAudio();
      return null;
    };

    const Harness: FC<{
      playbackCurrentTime: number;
      seekRequestKey: number;
    }> = ({ playbackCurrentTime, seekRequestKey }) => (
      <timeContext.Provider
        value={{
          currentTime: playbackCurrentTime,
          duration: TRACK_DURATION_SEC,
          seekRequestKey,
        }}
      >
        <playbackContext.Provider value={makePlaybackValue()}>
          <resourceContext.Provider
            value={{
              elementRefs: {
                audioEl,
                waveformInst: waveformInst as never,
              },
            }}
          >
            <audioPlayerDispatchContext.Provider value={vi.fn()}>
              <HookHost />
            </audioPlayerDispatchContext.Provider>
          </resourceContext.Provider>
        </playbackContext.Provider>
      </timeContext.Provider>
    );

    const { rerender } = render(
      <Harness playbackCurrentTime={60} seekRequestKey={1} />
    );
    expect(audioEl.currentTime).toBe(60);
    expect(waveformSeekTo).toHaveBeenCalledTimes(1);

    rerender(<Harness playbackCurrentTime={90} seekRequestKey={2} />);
    expect(audioEl.currentTime).toBe(90);
    expect(waveformSeekTo).toHaveBeenCalledTimes(2);
    expect(waveformSeekTo).toHaveBeenLastCalledWith(90 / TRACK_DURATION_SEC);
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
        value={{
          currentTime: 0,
          duration: TRACK_DURATION_SEC,
          seekRequestKey: 0,
        }}
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

  it("repeat ONE — dispatches SEEK { time: 0 } under flushSync and then calls play()", () => {
    // Regression for the jump-to-end bug: the reset must travel through
    // SEEK so the seek sync effect applies audioEl.currentTime = 0 before
    // play() runs. The static-context harness only observes the dispatch
    // contract; the DOM-write half is exercised by the seek sync effect
    // describe block above.
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

    expect(dispatch).toHaveBeenCalledWith({ type: "SEEK", time: 0 });
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

// useAudio's playbackRate sync effect mirrors the volume effect — when the
// PlaybackContext value changes, the next render writes audioEl.playbackRate.
// Effect deps are [audioEl, playbackRate], so unchanged playbackRate must
// not trigger a redundant DOM write, and a missing audioEl must be a no-op.
describe("useAudio playbackRate sync effect", () => {
  // Replace the prototype getter/setter with a vi.fn() so we can both
  // read the value back and count writes deterministically. This avoids
  // any reliance on jsdom's playbackRate behavior, which has historically
  // varied across versions.
  const installPlaybackRateSpy = (audioEl: HTMLAudioElement) => {
    let internalRate = 1;
    const setter = vi.fn((value: number) => {
      internalRate = value;
    });
    Object.defineProperty(audioEl, "playbackRate", {
      configurable: true,
      get: () => internalRate,
      set: setter,
    });
    return setter;
  };

  const HookHost: FC = () => {
    useAudio();
    return null;
  };

  const PlaybackRateHarness: FC<{
    audioEl: HTMLAudioElement | undefined;
    playbackRate: number;
  }> = ({ audioEl, playbackRate }) => (
    <timeContext.Provider
      value={{
        currentTime: 0,
        duration: TRACK_DURATION_SEC,
        seekRequestKey: 0,
      }}
    >
      <playbackContext.Provider value={makePlaybackValue("ALL", playbackRate)}>
        <resourceContext.Provider
          value={{
            elementRefs: audioEl
              ? { audioEl, waveformInst: undefined as never }
              : undefined,
          }}
        >
          <audioPlayerDispatchContext.Provider value={vi.fn()}>
            <HookHost />
          </audioPlayerDispatchContext.Provider>
        </resourceContext.Provider>
      </playbackContext.Provider>
    </timeContext.Provider>
  );

  it("writes audioEl.playbackRate on initial mount with a non-default rate", () => {
    const audioEl = makeAudioEl(0, TRACK_DURATION_SEC);
    const setter = installPlaybackRateSpy(audioEl);

    render(<PlaybackRateHarness audioEl={audioEl} playbackRate={1.5} />);

    expect(setter).toHaveBeenCalledTimes(1);
    expect(setter).toHaveBeenLastCalledWith(1.5);
    expect(audioEl.playbackRate).toBe(1.5);
  });

  it("writes audioEl.playbackRate when playbackRate changes between renders", () => {
    const audioEl = makeAudioEl(0, TRACK_DURATION_SEC);
    const setter = installPlaybackRateSpy(audioEl);

    const { rerender } = render(
      <PlaybackRateHarness audioEl={audioEl} playbackRate={1} />
    );
    // Initial commit applies once with the default rate.
    expect(setter).toHaveBeenCalledTimes(1);
    expect(setter).toHaveBeenLastCalledWith(1);

    rerender(<PlaybackRateHarness audioEl={audioEl} playbackRate={2} />);
    expect(setter).toHaveBeenCalledTimes(2);
    expect(setter).toHaveBeenLastCalledWith(2);
    expect(audioEl.playbackRate).toBe(2);
  });

  it("does NOT re-write audioEl.playbackRate when playbackRate is unchanged across renders", () => {
    const audioEl = makeAudioEl(0, TRACK_DURATION_SEC);
    const setter = installPlaybackRateSpy(audioEl);

    const { rerender } = render(
      <PlaybackRateHarness audioEl={audioEl} playbackRate={1.25} />
    );
    expect(setter).toHaveBeenCalledTimes(1);

    // Re-render with the SAME playbackRate — useEffect deps are identity
    // based on [audioEl, playbackRate], so the effect must not re-run.
    rerender(<PlaybackRateHarness audioEl={audioEl} playbackRate={1.25} />);
    expect(setter).toHaveBeenCalledTimes(1);
  });

  it("is a no-op when no audioEl is attached (does not throw)", () => {
    expect(() => {
      render(<PlaybackRateHarness audioEl={undefined} playbackRate={1.5} />);
    }).not.toThrow();
  });

  it("re-applies playbackRate on loadedmetadata after a track change", () => {
    // Browsers reset audioEl.playbackRate to 1 when a new source loads.
    // The standalone sync effect can't catch this (same audioEl ref + same
    // React playbackRate value, so deps are unchanged), so onLoadedMetadata
    // must re-apply the state-driven rate to survive a track swap.
    const audioEl = makeAudioEl(0, TRACK_DURATION_SEC);
    const setter = installPlaybackRateSpy(audioEl);

    const dispatch = vi.fn();
    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <timeContext.Provider
        value={{
          currentTime: 0,
          duration: TRACK_DURATION_SEC,
          seekRequestKey: 0,
        }}
      >
        <playbackContext.Provider value={makePlaybackValue("ALL", 1.5)}>
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

    const { result } = renderHook(() => useAudio(), { wrapper });

    // Initial mount commits the standalone effect once.
    expect(setter).toHaveBeenCalledTimes(1);
    expect(setter).toHaveBeenLastCalledWith(1.5);
    expect(audioEl.playbackRate).toBe(1.5);

    // Simulate the browser resetting playbackRate to 1 on a src swap.
    audioEl.playbackRate = 1;
    expect(setter).toHaveBeenCalledTimes(2);
    expect(audioEl.playbackRate).toBe(1);

    // Fire the loadedmetadata callback the way React would after the new
    // source is parsed. The callback only reads currentTarget.duration and
    // writes currentTarget.volume / currentTarget.playbackRate, so a
    // minimal stub event is sufficient.
    act(() => {
      result.current.onLoadedMetadata?.({
        currentTarget: audioEl,
      } as unknown as SyntheticEvent<HTMLAudioElement, Event>);
    });

    expect(setter).toHaveBeenCalledTimes(3);
    expect(setter).toHaveBeenLastCalledWith(1.5);
    expect(audioEl.playbackRate).toBe(1.5);
  });
});
