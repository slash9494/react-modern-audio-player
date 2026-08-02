import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { FC, ReactNode, MouseEvent } from "react";
import { playbackContext } from "@/audio-player/Context/PlaybackContext";
import { resourceContext } from "@/audio-player/Context/ResourceContext";
import { trackContext } from "@/audio-player/Context/TrackContext";
import { AudioData } from "@/audio-player/Context";
import { SEEK_DEBOUNCE_MS, useProgress } from "../hooks/useProgress";

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

    result.current.progressProps.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 2));

    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);
  });

  it("does not change currentTime on click at a quarter position when duration is Infinity", () => {
    const audioEl = makeAudioEl(Infinity);
    const { result } = renderUseProgress(audioEl);

    result.current.progressProps.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 4));

    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);
  });

  it("seeks to the clicked position when duration is finite (positive control)", () => {
    const DURATION = 120;
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    result.current.progressProps.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 2));

    expect(audioEl.currentTime).toBe(DURATION / 2);
  });

  it("does not change currentTime on click when isLive even if duration is finite", () => {
    const audioEl = makeAudioEl(120);
    const { result } = renderUseProgress(audioEl, { isLive: true });

    result.current.progressProps.onClick?.(makeClickAt(PROGRESS_BAR_WIDTH / 2));

    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);
  });
});

describe("useProgress drag seek debounce", () => {
  const DURATION = 200;
  const ratioAt = (clientX: number) => clientX / PROGRESS_BAR_WIDTH;
  const timeAt = (clientX: number) => ratioAt(clientX) * DURATION;

  const startDrag = (
    result: { current: ReturnType<typeof useProgress> },
    clientX: number
  ) => {
    act(() => result.current.progressProps.onMouseDown?.(makeClickAt(clientX)));
  };

  const dragTo = (
    result: { current: ReturnType<typeof useProgress> },
    clientX: number
  ) => {
    act(() => result.current.progressProps.onMouseMove?.(makeClickAt(clientX)));
  };

  const moveDocumentTo = (clientX: number) => {
    act(() => {
      document.dispatchEvent(
        new window.MouseEvent("mousemove", { clientX, bubbles: true })
      );
    });
  };

  const releaseOnDocument = () => {
    act(() => {
      document.dispatchEvent(
        new window.MouseEvent("mouseup", { bubbles: true })
      );
    });
  };

  const leaveBar = (result: { current: ReturnType<typeof useProgress> }) => {
    act(() => result.current.progressProps.onMouseLeave?.(makeClickAt(0)));
  };

  afterEach(() => {
    vi.useRealTimers();
  });

  it("sets previewRatio immediately on drag move before the debounce elapses", () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    dragTo(result, PROGRESS_BAR_WIDTH / 4);

    expect(result.current.previewRatio).toBe(ratioAt(PROGRESS_BAR_WIDTH / 4));
  });

  it("does not seek audioEl.currentTime before the debounce window elapses", () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    dragTo(result, PROGRESS_BAR_WIDTH / 4);

    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);
  });

  it("seeks audioEl.currentTime after the debounce window elapses", async () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    dragTo(result, PROGRESS_BAR_WIDTH / 4);
    await act(() => vi.advanceTimersByTimeAsync(SEEK_DEBOUNCE_MS));

    expect(audioEl.currentTime).toBe(timeAt(PROGRESS_BAR_WIDTH / 4));
  });

  it("commits only the last position when several moves arrive within one window", async () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    dragTo(result, PROGRESS_BAR_WIDTH / 4);
    dragTo(result, PROGRESS_BAR_WIDTH / 2);
    dragTo(result, (PROGRESS_BAR_WIDTH * 3) / 4);
    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);

    await act(() => vi.advanceTimersByTimeAsync(SEEK_DEBOUNCE_MS));

    expect(audioEl.currentTime).toBe(timeAt((PROGRESS_BAR_WIDTH * 3) / 4));
  });

  it("flushes the pending seek and clears previewRatio on mouse up", () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    dragTo(result, (PROGRESS_BAR_WIDTH * 3) / 4);
    act(() => result.current.progressProps.onMouseUp?.(makeClickAt(0)));

    expect(audioEl.currentTime).toBe(timeAt((PROGRESS_BAR_WIDTH * 3) / 4));
    expect(result.current.previewRatio).toBeNull();
  });

  it("commits immediately on click without waiting for the debounce window", () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    act(() =>
      result.current.progressProps.onClick?.(
        makeClickAt(PROGRESS_BAR_WIDTH / 2)
      )
    );

    expect(audioEl.currentTime).toBe(DURATION / 2);
  });

  it("keeps seeking from a document mousemove after the pointer leaves the bar", async () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    moveDocumentTo(PROGRESS_BAR_WIDTH + 40);

    expect(result.current.previewRatio).toBe(1);

    await act(() => vi.advanceTimersByTimeAsync(SEEK_DEBOUNCE_MS));

    expect(audioEl.currentTime).toBe(DURATION);
  });

  it("ends the drag on a document mouseup, flushing the pending seek and stopping later moves", async () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    moveDocumentTo(PROGRESS_BAR_WIDTH / 2);
    expect(audioEl.currentTime).toBe(INITIAL_CURRENT_TIME);

    releaseOnDocument();
    expect(audioEl.currentTime).toBe(timeAt(PROGRESS_BAR_WIDTH / 2));

    moveDocumentTo((PROGRESS_BAR_WIDTH * 3) / 4);
    await act(() => vi.advanceTimersByTimeAsync(SEEK_DEBOUNCE_MS));

    expect(audioEl.currentTime).toBe(timeAt(PROGRESS_BAR_WIDTH / 2));
  });

  it("clears the hover tooltip when the drag is released off the bar", () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    moveDocumentTo(PROGRESS_BAR_WIDTH + 40);
    expect(result.current.hoverRatio).toBe(1);

    releaseOnDocument();

    expect(result.current.hoverRatio).toBeNull();
    expect(result.current.previewRatio).toBeNull();
  });

  it("does not end the drag on mouse leave: it clears hover but a document mousemove still seeks", async () => {
    vi.useFakeTimers();
    const audioEl = makeAudioEl(DURATION);
    const { result } = renderUseProgress(audioEl);

    startDrag(result, PROGRESS_BAR_WIDTH / 4);
    moveDocumentTo(PROGRESS_BAR_WIDTH / 2);
    expect(result.current.hoverRatio).toBe(ratioAt(PROGRESS_BAR_WIDTH / 2));

    leaveBar(result);
    expect(result.current.hoverRatio).toBeNull();
    expect(result.current.previewRatio).toBe(ratioAt(PROGRESS_BAR_WIDTH / 2));

    moveDocumentTo((PROGRESS_BAR_WIDTH * 3) / 4);
    await act(() => vi.advanceTimersByTimeAsync(SEEK_DEBOUNCE_MS));

    expect(audioEl.currentTime).toBe(timeAt((PROGRESS_BAR_WIDTH * 3) / 4));
  });
});
