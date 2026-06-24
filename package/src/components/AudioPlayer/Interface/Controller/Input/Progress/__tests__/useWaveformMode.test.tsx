import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FC, ReactNode } from "react";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { AudioData } from "@/components/AudioPlayer/Context";
import {
  getWaveformMode,
  useWaveformMode,
  LARGE_FILE_THRESHOLD_SEC,
} from "../useWaveformMode";

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
}: {
  playList: AudioData[];
  curPlayId: number;
  audioEl: HTMLAudioElement;
}) => {
  const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <trackContext.Provider value={{ playList, curPlayId, curIdx: 0 }}>
      <resourceContext.Provider
        value={{ elementRefs: { audioEl, waveformInst: undefined as never } }}
      >
        {children}
      </resourceContext.Provider>
    </trackContext.Provider>
  );
  return renderHook(() => useWaveformMode(), { wrapper });
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
});

describe("useWaveformMode result shape", () => {
  it("returns both the derived mode and the selected curTrack", () => {
    const track = makeAudioData({ isLive: true });
    const { result } = renderUseWaveformMode({
      playList: [track],
      curPlayId: track.id,
      audioEl: makeAudioEl(FINITE_DURATION),
    });

    expect(result.current).toEqual({ mode: "live", curTrack: track });
  });
});
