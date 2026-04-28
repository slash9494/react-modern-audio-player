import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FC, ReactNode, useRef } from "react";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { timeContext } from "@/components/AudioPlayer/Context/TimeContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";
import { useWaveSurfer } from "../useWavesurfer";

// useWaveSurfer's track-change effect registers a `ready` callback that, when
// fired by wavesurfer, calls audioEl.play() if playback was active. This is the
// recovery path when wavesurfer.load() races with useAudio's play() and aborts
// it. Tested at the hook level with an injected waveformInst so the dynamic
// wavesurfer.js import never runs.

interface MockWaveSurfer {
  load: ReturnType<typeof vi.fn>;
  on: ReturnType<typeof vi.fn>;
  un: ReturnType<typeof vi.fn>;
  seekTo: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  drawer: { fireEvent: ReturnType<typeof vi.fn> };
  backend: { media: HTMLMediaElement | null; mediaListeners: object };
  isReady: boolean;
}

const makeWaveformInst = (): MockWaveSurfer => ({
  load: vi.fn(),
  on: vi.fn(),
  un: vi.fn(),
  seekTo: vi.fn(),
  destroy: vi.fn(),
  drawer: { fireEvent: vi.fn() },
  backend: { media: null, mediaListeners: {} },
  isReady: false,
});

const makeAudioEl = (currentTime = 0, duration = 180) => {
  const audioEl = document.createElement("audio");
  audioEl.setAttribute("src", "track1.mp3");
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

const Harness: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useWaveSurfer(ref);
  return <div ref={ref} />;
};

interface WrapperProps {
  curPlayId: number;
  isPlaying: boolean;
  audioEl: HTMLAudioElement;
  waveformInst: MockWaveSurfer;
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({
  curPlayId,
  isPlaying,
  audioEl,
  waveformInst,
  children,
}) => (
  <uiContext.Provider
    value={{ activeUI: { progress: "waveform" }, playListPlacement: "bottom" }}
  >
    <trackContext.Provider value={{ playList: [], curPlayId, curIdx: 0 }}>
      <timeContext.Provider
        value={{ currentTime: 0, duration: 180, seekRequestKey: 0 }}
      >
        <playbackContext.Provider
          value={{
            isPlaying,
            repeatType: "ALL",
            muted: false,
            volume: 0.5,
            isLoadedMetaData: true,
            audioResetKey: 0,
          }}
        >
          <resourceContext.Provider
            value={{
              elementRefs: {
                audioEl,
                waveformInst: waveformInst as never,
              },
            }}
          >
            <audioPlayerDispatchContext.Provider value={vi.fn()}>
              {children}
            </audioPlayerDispatchContext.Provider>
          </resourceContext.Provider>
        </playbackContext.Provider>
      </timeContext.Provider>
    </trackContext.Provider>
  </uiContext.Provider>
);

const findReadyCallback = (waveformInst: MockWaveSurfer) => {
  const readyCall = waveformInst.on.mock.calls.find(
    ([event]) => event === "ready"
  );
  if (!readyCall) throw new Error("ready callback never registered");
  return readyCall[1] as () => void;
};

describe("useWaveSurfer onReady recovery", () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = vi
      .fn()
      .mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it("calls audioEl.play() from the ready callback when wasPlaying=true (track swap autoplay backstop)", () => {
    const audioEl = makeAudioEl();
    const waveformInst = makeWaveformInst();
    const { rerender } = render(
      <Wrapper
        curPlayId={1}
        isPlaying={true}
        audioEl={audioEl}
        waveformInst={waveformInst}
      >
        <Harness />
      </Wrapper>
    );

    // Trigger a track swap so the track-change effect runs and registers
    // a fresh `ready` listener with the latest `wasPlaying` snapshot.
    rerender(
      <Wrapper
        curPlayId={2}
        isPlaying={true}
        audioEl={audioEl}
        waveformInst={waveformInst}
      >
        <Harness />
      </Wrapper>
    );

    expect(waveformInst.load).toHaveBeenCalledWith(audioEl);
    const onReady = findReadyCallback(waveformInst);

    onReady();

    expect(audioEl.play).toHaveBeenCalled();
  });

  it("does NOT call audioEl.play() from the ready callback when wasPlaying=false (paused track swap)", () => {
    const audioEl = makeAudioEl();
    const waveformInst = makeWaveformInst();
    const { rerender } = render(
      <Wrapper
        curPlayId={1}
        isPlaying={false}
        audioEl={audioEl}
        waveformInst={waveformInst}
      >
        <Harness />
      </Wrapper>
    );
    rerender(
      <Wrapper
        curPlayId={2}
        isPlaying={false}
        audioEl={audioEl}
        waveformInst={waveformInst}
      >
        <Harness />
      </Wrapper>
    );

    const onReady = findReadyCallback(waveformInst);
    onReady();

    expect(audioEl.play).not.toHaveBeenCalled();
  });

  it("restores saved currentTime on non-track-change ready (e.g. wavesurfer reinit) but NOT on track swap", () => {
    // Same curPlayId across renders → !isTrackChange → savedTime path uses
    // the live audioEl.currentTime. On a real track swap savedTime is forced
    // to 0 to avoid resurrecting the previous track's position.
    const audioEl = makeAudioEl(45);
    const waveformInst = makeWaveformInst();
    render(
      <Wrapper
        curPlayId={1}
        isPlaying={false}
        audioEl={audioEl}
        waveformInst={waveformInst}
      >
        <Harness />
      </Wrapper>
    );

    const onReady = findReadyCallback(waveformInst);
    onReady();

    // !isTrackChange + savedTime > 0 + duration > 0 → restore time and seek
    expect(audioEl.currentTime).toBe(45);
    expect(waveformInst.seekTo).toHaveBeenCalledWith(45 / 180);
  });
});
