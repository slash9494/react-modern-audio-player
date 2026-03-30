/**
 * Context isolation re-render tests
 *
 * Regression specs for the context-split refactor.
 * Each test asserts that dispatching an action that mutates one context slice
 * does NOT trigger re-renders in consumers of the other three slices.
 *
 * These tests assert that the context-split refactor correctly prevents
 * cross-context re-renders when unrelated state slices are mutated.
 */
import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { AudioPlayerProvider } from "@/components/Provider/AudioPlayerProvider";
import { InitialStates } from "@/components/AudioPlayer/Context/StateContext";
import {
  audioPlayerDispatchContext,
  AudioContextAction,
} from "@/components/AudioPlayer/Context/dispatchContext";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { usePlaybackContext } from "@/hooks/context/usePlaybackContext";
import { useTimeContext } from "@/hooks/context/useTimeContext";
import { useTrackContext } from "@/hooks/context/useTrackContext";
import { useUIContext } from "@/hooks/context/useUIContext";
import { useResourceContext } from "@/hooks/context/useResourceContext";

// ─────────────────────────────────────────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────────────────────────────────────────

const basePlayList = [
  { id: 1, src: "a.mp3" },
  { id: 2, src: "b.mp3" },
  { id: 3, src: "c.mp3" },
];

// ─────────────────────────────────────────────────────────────────────────────
// DispatchCapture
// Reads the dispatch context in render and stores it in a ref so tests can
// call dispatch outside of React without needing a button or user-event.
// Writing to a ref in the render body (not useEffect) is intentional —
// it populates the ref synchronously before render() returns.
// ─────────────────────────────────────────────────────────────────────────────

type DispatchRef = { current: ((action: AudioContextAction) => void) | null };

const DispatchCapture: FC<{ dispatchRef: DispatchRef }> = ({ dispatchRef }) => {
  dispatchRef.current = useNonNullableContext(audioPlayerDispatchContext);
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// renderIsolated
// Renders AudioPlayerProvider without StrictMode so render-body counters are
// not inflated by React's double-invoke behaviour in development.
// ─────────────────────────────────────────────────────────────────────────────

function renderIsolated(children: ReactNode, curPlayId = 1) {
  const dispatchRef: DispatchRef = { current: null };
  render(
    <AudioPlayerProvider
      playList={basePlayList}
      audioInitialState={{ curPlayId } as InitialStates}
    >
      <DispatchCapture dispatchRef={dispatchRef} />
      {children}
    </AudioPlayerProvider>
  );
  return dispatchRef as { current: (action: AudioContextAction) => void };
}

// ─────────────────────────────────────────────────────────────────────────────
// makeProbes
// Creates fresh probe component types and independent render counters per test.
// Components are defined inside this factory so each test gets unique function
// references — React will not try to reconcile across test renders.
// ─────────────────────────────────────────────────────────────────────────────

function makeProbes() {
  let playbackCount = 0;
  let timeCount = 0;
  let trackCount = 0;
  let uiCount = 0;
  let resourceCount = 0;

  const PlaybackProbe: FC = () => {
    usePlaybackContext();
    playbackCount++;
    return null;
  };
  const TimeProbe: FC = () => {
    useTimeContext();
    timeCount++;
    return null;
  };
  const TrackProbe: FC = () => {
    useTrackContext();
    trackCount++;
    return null;
  };
  const UIProbe: FC = () => {
    useUIContext();
    uiCount++;
    return null;
  };
  const ResourceProbe: FC = () => {
    useResourceContext();
    resourceCount++;
    return null;
  };

  /** Call after mounting to record the baseline render counts. */
  const snapshot = () => ({
    playbackCount,
    timeCount,
    trackCount,
    uiCount,
    resourceCount,
  });

  return {
    PlaybackProbe,
    TimeProbe,
    TrackProbe,
    UIProbe,
    ResourceProbe,
    snapshot,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** All four probes as a JSX fragment — mount them all for full isolation coverage. */
function AllProbes({
  PlaybackProbe,
  TimeProbe,
  TrackProbe,
  UIProbe,
  ResourceProbe,
}: ReturnType<typeof makeProbes>) {
  return (
    <>
      <PlaybackProbe />
      <TimeProbe />
      <TrackProbe />
      <UIProbe />
      <ResourceProbe />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────────────────────────────────────

describe("playbackContext isolation", () => {
  it("CHANGE_PLAYING_STATE only re-renders playback consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "CHANGE_PLAYING_STATE" }));

    const after = probes.snapshot();
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("SET_VOLUME only re-renders playback consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "SET_VOLUME", volume: 0.5 }));

    const after = probes.snapshot();
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("SET_VOLUME only re-renders playback consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "SET_VOLUME", volume: 0.5 }));

    const after = probes.snapshot();
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("SET_MUTED only re-renders playback consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "SET_MUTED", muted: true }));

    const after = probes.snapshot();
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("SET_REPEAT_TYPE only re-renders playback consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "SET_REPEAT_TYPE", repeatType: "ONE" }));

    const after = probes.snapshot();
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });
});

describe("trackContext isolation", () => {
  it("NEXT_AUDIO (repeatType ALL, curIdx 0) re-renders track, playback, and time consumers", () => {
    // NEXT_AUDIO updates curIdx/curPlayId (track), resets curAudioState.currentTime
    // to 0 and increments audioResetKey (playback), and resets time. UI and resource are unaffected.
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "NEXT_AUDIO" }));

    const after = probes.snapshot();
    expect(after.trackCount - base.trackCount).toBe(1);
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(1);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("UPDATE_PLAY_LIST only re-renders track consumers", () => {
    // Append a 4th track; curPlayId 1 is still present so reducer succeeds.
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({
        type: "UPDATE_PLAY_LIST",
        playList: [...basePlayList, { id: 4, src: "d.mp3" }],
      })
    );

    const after = probes.snapshot();
    expect(after.trackCount - base.trackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });
});

describe("timeContext isolation", () => {
  it("SET_AUDIO_STATE with currentTime only re-renders time consumers, not playback", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({
        type: "SET_AUDIO_STATE",
        audioState: { currentTime: 42 },
      })
    );

    const after = probes.snapshot();
    expect(after.timeCount - base.timeCount).toBe(1);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("SET_AUDIO_STATE with duration only re-renders time consumers, not playback", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({
        type: "SET_AUDIO_STATE",
        audioState: { duration: 180 },
      })
    );

    const after = probes.snapshot();
    expect(after.timeCount - base.timeCount).toBe(1);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("rapid currentTime updates do not re-render playback consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => {
      for (let t = 0; t < 10; t++) {
        dispatch.current({
          type: "SET_AUDIO_STATE",
          audioState: { currentTime: t },
        });
      }
    });

    const after = probes.snapshot();
    expect(after.timeCount - base.timeCount).toBeGreaterThanOrEqual(1);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });
});

describe("uiContext isolation", () => {
  it("SET_ACTIVE_UI only re-renders ui consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({
        type: "SET_ACTIVE_UI",
        activeUI: { playButton: true, volume: true },
      })
    );

    const after = probes.snapshot();
    expect(after.uiCount - base.uiCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  it("SET_PLACEMENTS only re-renders ui consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({ type: "SET_PLACEMENTS", playListPlacement: "top" })
    );

    const after = probes.snapshot();
    expect(after.uiCount - base.uiCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });
});

describe("resourceContext isolation", () => {
  it("SET_ELEMENT_REFS only re-renders resource consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({
        type: "SET_ELEMENT_REFS",
        elementRefs: { audioEl: document.createElement("audio") },
      })
    );

    const after = probes.snapshot();
    expect(after.resourceCount - base.resourceCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
  });

  it("SET_CUSTOM_ICONS only re-renders resource consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "SET_CUSTOM_ICONS", customIcons: {} }));

    const after = probes.snapshot();
    expect(after.resourceCount - base.resourceCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
  });

  it("SET_COVER_IMGS_CSS only re-renders resource consumers", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({
        type: "SET_COVER_IMGS_CSS",
        coverImgsCss: { artwork: { opacity: 1 } },
      })
    );

    const after = probes.snapshot();
    expect(after.resourceCount - base.resourceCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(0);
    expect(after.playbackCount - base.playbackCount).toBe(0);
    expect(after.trackCount - base.trackCount).toBe(0);
    expect(after.uiCount - base.uiCount).toBe(0);
  });
});

describe("cross-context actions — intentional multi-slice updates", () => {
  /**
   * PREV_AUDIO navigates to the previous track AND resets isLoadedMetaData.
   * Both trackContext (curIdx, curPlayId) and playbackContext (isLoadedMetaData)
   * should re-render. uiContext and resourceContext should not.
   *
   * Setup: start at curIdx 1 (curPlayId 2). No elementRefs, so the
   * "currentTime > 1 → stay on track" branch in the reducer does not fire.
   */
  it("PREV_AUDIO re-renders track, playback, and time, not ui or resource", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />, 2);
    const base = probes.snapshot();

    act(() => dispatch.current({ type: "PREV_AUDIO" }));

    const after = probes.snapshot();
    expect(after.trackCount - base.trackCount).toBe(1);
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(1);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });

  /**
   * SET_CURRENT_AUDIO changes curPlayId/curIdx AND sets isLoadedMetaData: false.
   * Both trackContext and playbackContext should re-render.
   */
  it("SET_CURRENT_AUDIO re-renders track, playback, and time, not ui or resource", () => {
    const probes = makeProbes();
    const dispatch = renderIsolated(<AllProbes {...probes} />);
    const base = probes.snapshot();

    act(() =>
      dispatch.current({
        type: "SET_CURRENT_AUDIO",
        currentIndex: 1,
        currentAudioId: 2,
      })
    );

    const after = probes.snapshot();
    expect(after.trackCount - base.trackCount).toBe(1);
    expect(after.playbackCount - base.playbackCount).toBe(1);
    expect(after.timeCount - base.timeCount).toBe(1);
    expect(after.uiCount - base.uiCount).toBe(0);
    expect(after.resourceCount - base.resourceCount).toBe(0);
  });
});
