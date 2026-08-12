import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { FC, ReactNode } from "react";
import { resourceContext } from "@/audioPlayer/Context/ResourceContext";
import { trackContext } from "@/audioPlayer/Context/TrackContext";
import { playbackContext } from "@/audioPlayer/Context/PlaybackContext";
import { AudioData } from "@/audioPlayer/Context";
import {
  getWaveformMode,
  useWaveformMode,
  LARGE_FILE_THRESHOLD_SEC,
  LARGE_FILE_BYTES,
  __resetWaveformSizeCache,
} from "../hooks/useWaveformMode";

beforeEach(() => {
  __resetWaveformSizeCache();
});

const FINITE_DURATION = 180;

const makeAudioEl = (duration: number) => {
  const audioEl = document.createElement("audio");
  Object.defineProperty(audioEl, "duration", {
    value: duration,
    writable: true,
  });
  return audioEl;
};

const makeAudioData = (overrides: Partial<AudioData> = {}): AudioData => ({
  src: "track.mp3",
  id: 1,
  ...overrides,
});

const renderUseWaveformMode = ({
  playList,
  curPlayId,
  audioEl,
  isLoadedMetaData = true,
  enabled = true,
}: {
  playList: AudioData[];
  curPlayId: number;
  audioEl: HTMLAudioElement;
  isLoadedMetaData?: boolean;
  enabled?: boolean;
}) => {
  const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <trackContext.Provider value={{ playList, curPlayId, curIdx: 0 }}>
      <resourceContext.Provider
        value={{ elementRefs: { audioEl, waveformInst: undefined as never } }}
      >
        <playbackContext.Provider
          value={{
            isPlaying: false,
            volume: 1,
            muted: false,
            repeatType: "ALL",
            isLoadedMetaData,
            audioResetKey: 0,
            playbackRate: 1,
          }}
        >
          {children}
        </playbackContext.Provider>
      </resourceContext.Provider>
    </trackContext.Provider>
  );
  return renderHook(() => useWaveformMode(enabled), { wrapper });
};

describe("getWaveformMode live mode", () => {
  it("returns 'live' when audioData.isLive is true", () => {
    expect(
      getWaveformMode(makeAudioData({ isLive: true }), FINITE_DURATION)
    ).toBe("live");
  });

  it("returns 'live' when audioEl duration is Infinity", () => {
    expect(getWaveformMode(makeAudioData(), Infinity)).toBe("live");
  });

  it("prioritizes live over peaks when isLive is true", () => {
    expect(
      getWaveformMode(
        makeAudioData({ isLive: true, peaks: [0.1, 0.2] }),
        FINITE_DURATION
      )
    ).toBe("live");
  });

  it("prioritizes live over the large-file threshold when isLive is true", () => {
    expect(
      getWaveformMode(makeAudioData({ isLive: true, duration: 7200 }), 7200)
    ).toBe("live");
  });
});

describe("getWaveformMode normal mode with peaks", () => {
  it("returns 'normal' when peaks are present", () => {
    expect(
      getWaveformMode(makeAudioData({ peaks: [0.1, 0.2] }), FINITE_DURATION)
    ).toBe("normal");
  });

  it("prioritizes peaks over the large-file threshold", () => {
    expect(
      getWaveformMode(
        makeAudioData({ peaks: [0.1, 0.2], duration: 7200 }),
        7200
      )
    ).toBe("normal");
  });
});

describe("getWaveformMode faux mode for large files", () => {
  it("returns 'faux' when duration exceeds the large-file threshold and no peaks exist", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: LARGE_FILE_THRESHOLD_SEC + 1 }),
        LARGE_FILE_THRESHOLD_SEC + 1
      )
    ).toBe("faux");
  });

  it("returns 'normal' at exactly the large-file threshold (exclusive boundary)", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: LARGE_FILE_THRESHOLD_SEC }),
        LARGE_FILE_THRESHOLD_SEC
      )
    ).toBe("normal");
  });
});

describe("getWaveformMode large-file auto-detection from audioEl duration", () => {
  it("returns 'faux' from the detected audioEl duration when audioData has no duration", () => {
    expect(getWaveformMode(makeAudioData(), LARGE_FILE_THRESHOLD_SEC + 1)).toBe(
      "faux"
    );
  });

  it("returns 'normal' when audioData.duration overrides an oversized audioEl duration", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: FINITE_DURATION }),
        LARGE_FILE_THRESHOLD_SEC + 1
      )
    ).toBe("normal");
  });

  it("returns 'faux' when audioData.duration overrides a short audioEl duration", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: LARGE_FILE_THRESHOLD_SEC + 1 }),
        FINITE_DURATION
      )
    ).toBe("faux");
  });

  it("returns 'normal' (not 'faux') from a pre-metadata NaN audioEl duration", () => {
    expect(getWaveformMode(makeAudioData(), NaN)).toBe("normal");
  });
});

describe("getWaveformMode normal mode fallback", () => {
  it("returns 'normal' for a short file with no peaks", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: FINITE_DURATION }),
        FINITE_DURATION
      )
    ).toBe("normal");
  });

  it("returns 'normal' when audioData is undefined", () => {
    expect(getWaveformMode(undefined, FINITE_DURATION)).toBe("normal");
  });

  it("returns 'normal' when audioEl duration is NaN", () => {
    expect(getWaveformMode(makeAudioData(), NaN)).toBe("normal");
  });
});

describe("getWaveformMode byte-size signal", () => {
  it("returns 'faux' when isOversizeBytes is true for a short flagless file", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: FINITE_DURATION }),
        FINITE_DURATION,
        true
      )
    ).toBe("faux");
  });

  it("returns 'normal' when isOversizeBytes is false for a short flagless file", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: FINITE_DURATION }),
        FINITE_DURATION,
        false
      )
    ).toBe("normal");
  });

  it("returns 'normal' when isOversizeBytes is omitted (2-arg backward compatibility)", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: FINITE_DURATION }),
        FINITE_DURATION
      )
    ).toBe("normal");
  });

  it("prioritizes live over isOversizeBytes when isLive is true", () => {
    expect(
      getWaveformMode(makeAudioData({ isLive: true }), FINITE_DURATION, true)
    ).toBe("live");
  });

  it("prioritizes peaks over isOversizeBytes", () => {
    expect(
      getWaveformMode(
        makeAudioData({ peaks: [0.1, 0.2] }),
        FINITE_DURATION,
        true
      )
    ).toBe("normal");
  });

  it("prioritizes the large-file duration threshold over an isOversizeBytes false signal", () => {
    expect(
      getWaveformMode(
        makeAudioData({ duration: LARGE_FILE_THRESHOLD_SEC + 1 }),
        LARGE_FILE_THRESHOLD_SEC + 1,
        false
      )
    ).toBe("faux");
  });
});

describe("useWaveformMode track selection", () => {
  it("selects the track whose id matches curPlayId as curTrack", () => {
    const playList = [
      makeAudioData({ id: 1 }),
      makeAudioData({ id: 2 }),
      makeAudioData({ id: 3 }),
    ];
    const { result } = renderUseWaveformMode({
      playList,
      curPlayId: 2,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current.curTrack?.id).toBe(2);
  });
});

describe("useWaveformMode audioEl duration wiring", () => {
  it("derives 'live' from the audioEl duration when it is Infinity", () => {
    const track = makeAudioData();
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(Infinity),
    });

    expect(result.current.mode).toBe("live");
  });

  it("derives 'normal' (not 'live') from the audioEl duration when it is NaN — regression guard", () => {
    const track = makeAudioData();
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(NaN),
    });

    expect(result.current.mode).toBe("normal");
  });

  it("ignores the audioEl duration until metadata has loaded for a flagless long-form track", () => {
    const track = makeAudioData();
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(LARGE_FILE_THRESHOLD_SEC + 1),
      isLoadedMetaData: false,
    });

    expect(result.current.mode).toBe("normal");
  });

  it("derives 'faux' from the audioEl duration once metadata has loaded for a flagless long-form track", () => {
    const track = makeAudioData();
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(LARGE_FILE_THRESHOLD_SEC + 1),
      isLoadedMetaData: true,
    });

    expect(result.current.mode).toBe("faux");
  });
});

describe("useWaveformMode result shape", () => {
  it("returns both the derived mode and the selected curTrack", () => {
    const track = makeAudioData({ isLive: true });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current).toEqual({
      mode: "live",
      curTrack: track,
      sizeGatePending: false,
    });
  });
});

describe("useWaveformMode byte size-gate", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  const makeHeadResponse = (contentLength: string | null) => ({
    headers: {
      get: (name: string) => (name === "content-length" ? contentLength : null),
    },
  });

  it("gates to 'faux' when a short flagless file exceeds the byte threshold", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(makeHeadResponse(String(LARGE_FILE_BYTES + 1)));
    const track = makeAudioData({ src: "oversize-60mb.flac" });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current.mode).toBe("normal");
    await waitFor(() => expect(result.current.mode).toBe("faux"));
    expect(global.fetch).toHaveBeenCalledWith(
      "oversize-60mb.flac",
      expect.objectContaining({ method: "HEAD" })
    );
  });

  it("stays 'normal' when the file is under the byte threshold", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(makeHeadResponse(String(10 * 1024 * 1024)));
    const track = makeAudioData({ src: "small-10mb.mp3" });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(result.current.mode).toBe("normal");
  });

  it("stays 'normal' when the HEAD request rejects (CORS-closed)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("CORS"));
    const track = makeAudioData({ src: "cors-closed.mp3" });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(result.current.mode).toBe("normal");
  });

  it("skips the HEAD request and stays 'normal' when the track provides peaks", () => {
    global.fetch = vi.fn();
    const track = makeAudioData({ src: "with-peaks.mp3", peaks: [0.1, 0.2] });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current.mode).toBe("normal");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("skips the HEAD request when the duration already gates to 'faux'", () => {
    global.fetch = vi.fn();
    const track = makeAudioData({
      src: "long-form.mp3",
      duration: LARGE_FILE_THRESHOLD_SEC + 1,
    });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(LARGE_FILE_THRESHOLD_SEC + 1),
    });

    expect(result.current.mode).toBe("faux");
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe("useWaveformMode content-length cache lifecycle", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  const makeHeadResponse = (contentLength: string | null) => ({
    headers: {
      get: (name: string) => (name === "content-length" ? contentLength : null),
    },
  });

  it("caches a header-less 200 verdict and dedupes the HEAD across a remount", async () => {
    global.fetch = vi.fn().mockResolvedValue(makeHeadResponse(null));
    const track = makeAudioData({ src: "headerless-200.mp3" });

    const first = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() =>
      expect(first.result.current.sizeGatePending).toBe(false)
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(first.result.current.mode).toBe("normal");
    first.unmount();

    const second = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() =>
      expect(second.result.current.sizeGatePending).toBe(false)
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(second.result.current.mode).toBe("normal");
  });

  it("re-probes the same src after a true transient failure (no response is not cached)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network"));
    const track = makeAudioData({ src: "transient-network-error.mp3" });

    const first = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() =>
      expect(first.result.current.sizeGatePending).toBe(false)
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);

    renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });

  it("shares one in-flight HEAD across concurrent probes of the same src and applies the oversize verdict", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(makeHeadResponse(String(LARGE_FILE_BYTES + 1)));
    const track = makeAudioData({ src: "dedup-oversize-60mb.flac" });

    const first = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });
    const second = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(first.result.current.mode).toBe("faux"));
    await waitFor(() => expect(second.result.current.mode).toBe("faux"));
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe("useWaveformMode oversize dev warning", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  const makeHeadResponse = (contentLength: string | null) => ({
    headers: {
      get: (name: string) => (name === "content-length" ? contentLength : null),
    },
  });

  it("warns once with the src when a flagless file exceeds the byte threshold", async () => {
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    global.fetch = vi
      .fn()
      .mockResolvedValue(makeHeadResponse(String(LARGE_FILE_BYTES + 1)));
    const track = makeAudioData({ src: "warn-oversize-60mb.flac" });
    renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(warnSpy).toHaveBeenCalledTimes(1));
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("warn-oversize-60mb.flac")
    );
  });

  it("does not warn when the file is under the byte threshold", async () => {
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    global.fetch = vi
      .fn()
      .mockResolvedValue(makeHeadResponse(String(10 * 1024 * 1024)));
    const track = makeAudioData({ src: "warn-small-10mb.mp3" });
    renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("warns only once across repeated call sites for the same oversize src", async () => {
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    global.fetch = vi
      .fn()
      .mockResolvedValue(makeHeadResponse(String(LARGE_FILE_BYTES + 1)));
    const track = makeAudioData({ src: "warn-dedupe-60mb.flac" });

    renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });
    renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(warnSpy).toHaveBeenCalledTimes(1));
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("does not warn for live, short normal, or peaks-provided tracks", async () => {
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    global.fetch = vi
      .fn()
      .mockResolvedValue(makeHeadResponse(String(10 * 1024 * 1024)));

    const liveTrack = makeAudioData({ src: "warn-live.mp3", isLive: true });
    renderUseWaveformMode({
      playList: [liveTrack],
      curPlayId: liveTrack.id,
      audioEl: makeAudioEl(Infinity),
    });

    const peaksTrack = makeAudioData({
      src: "warn-peaks.mp3",
      peaks: [0.1, 0.2],
    });
    renderUseWaveformMode({
      playList: [peaksTrack],
      curPlayId: peaksTrack.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    const normalTrack = makeAudioData({ src: "warn-normal.mp3" });
    renderUseWaveformMode({
      playList: [normalTrack],
      curPlayId: normalTrack.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(warnSpy).not.toHaveBeenCalled();
  });
});

describe("useWaveformMode sizeGatePending", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  const makeDeferredHead = () => {
    let resolveBytes!: (contentLength: string | null) => void;
    const headResponse = new Promise<{
      headers: { get: (name: string) => string | null };
    }>((resolve) => {
      resolveBytes = (contentLength) =>
        resolve({
          headers: {
            get: (name) => (name === "content-length" ? contentLength : null),
          },
        });
    });
    global.fetch = vi.fn().mockReturnValue(headResponse) as never;
    return { resolveBytes };
  };

  it("pends a candidate until its HEAD resolves, then settles to 'normal' for a small file", async () => {
    const { resolveBytes } = makeDeferredHead();
    const track = makeAudioData({ src: "pending-small.mp3" });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current.sizeGatePending).toBe(true);
    expect(result.current.mode).toBe("normal");

    resolveBytes(String(10 * 1024 * 1024));

    await waitFor(() => expect(result.current.sizeGatePending).toBe(false));
    expect(result.current.mode).toBe("normal");
  });

  it("pends a candidate until its HEAD resolves, then settles to 'faux' for an oversized file", async () => {
    const { resolveBytes } = makeDeferredHead();
    const track = makeAudioData({ src: "pending-oversize.flac" });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current.sizeGatePending).toBe(true);
    expect(result.current.mode).toBe("normal");

    resolveBytes(String(LARGE_FILE_BYTES + 1));

    await waitFor(() => expect(result.current.mode).toBe("faux"));
    expect(result.current.sizeGatePending).toBe(false);
  });

  it("never pends a non-candidate track (peaks / live / long-form)", () => {
    global.fetch = vi.fn();

    const peaksTrack = makeAudioData({
      src: "nopend-peaks.mp3",
      peaks: [0.1, 0.2],
    });
    const { result: peaksResult } = renderUseWaveformMode({
      playList: [peaksTrack],
      curPlayId: peaksTrack.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });
    expect(peaksResult.current.sizeGatePending).toBe(false);

    const liveTrack = makeAudioData({ src: "nopend-live.mp3", isLive: true });
    const { result: liveResult } = renderUseWaveformMode({
      playList: [liveTrack],
      curPlayId: liveTrack.id,
      audioEl: makeAudioEl(Infinity),
    });
    expect(liveResult.current.sizeGatePending).toBe(false);

    const longFormTrack = makeAudioData({
      src: "nopend-longform.mp3",
      duration: LARGE_FILE_THRESHOLD_SEC + 1,
    });
    const { result: longFormResult } = renderUseWaveformMode({
      playList: [longFormTrack],
      curPlayId: longFormTrack.id,
      audioEl: makeAudioEl(LARGE_FILE_THRESHOLD_SEC + 1),
    });
    expect(longFormResult.current.sizeGatePending).toBe(false);

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("skips the HEAD probe and reports no pending gate when disabled", () => {
    global.fetch = vi.fn();
    const track = makeAudioData({ src: "disabled-candidate.mp3" });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
      enabled: false,
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.sizeGatePending).toBe(false);
    expect(result.current.mode).toBe("normal");
  });
});

describe("useWaveformMode fail-open when AbortController is unavailable", () => {
  const originalFetch = global.fetch;
  const originalAbortController = global.AbortController;
  const HEAD_TIMEOUT_MS = 8000;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    global.fetch = originalFetch;
    global.AbortController = originalAbortController;
    vi.restoreAllMocks();
  });

  it("times out a hung untimed HEAD and settles to 'normal' instead of pinning sizeGatePending", async () => {
    // No AbortController → fetchWithTimeout cannot cancel → the HEAD runs untimed.
    global.AbortController = undefined as never;
    // A HEAD that never settles: without the manual fail-open timer this would
    // pin sizeGatePending forever.
    global.fetch = vi
      .fn()
      .mockReturnValue(new Promise(() => undefined)) as never;

    const track = makeAudioData({ src: "hung-untimed-head.mp3" });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current.sizeGatePending).toBe(true);
    expect(result.current.mode).toBe("normal");

    await act(async () => {
      vi.advanceTimersByTime(HEAD_TIMEOUT_MS);
    });

    expect(result.current.sizeGatePending).toBe(false);
    expect(result.current.mode).toBe("normal");
  });
});
