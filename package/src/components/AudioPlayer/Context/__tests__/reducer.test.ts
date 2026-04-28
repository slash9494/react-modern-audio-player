import { describe, it, expect } from "vitest";
import { audioPlayerReducer } from "../reducer";
import { AudioPlayerStateContext } from "../StateContext";

const makeBaseState = (): AudioPlayerStateContext => ({
  playList: [
    { id: 1, src: "track1.mp3" },
    { id: 2, src: "track2.mp3" },
    { id: 3, src: "track3.mp3" },
  ],
  curPlayId: 1,
  curIdx: 0,
  curAudioState: {
    isPlaying: false,
    repeatType: "ALL",
    volume: 0.8,
    muted: false,
    isLoadedMetaData: false,
  },
  activeUI: {},
  playListPlacement: "bottom",
  audioResetKey: 0,
  seekRequestKey: 0,
  elementRefs: {
    audioEl: document.createElement("audio"),
  },
});

describe("NEXT_AUDIO", () => {
  it("returns state unchanged when playlist is empty", () => {
    const state = {
      ...makeBaseState(),
      playList: [],
      curIdx: -1,
      curPlayId: 0,
    };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next).toBe(state);
  });

  it("advances to next track (normal)", () => {
    const state = { ...makeBaseState(), curIdx: 0, curPlayId: 1 };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curIdx).toBe(1);
    expect(next.curPlayId).toBe(2);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });

  it("wraps around to first track when at end (repeatType ALL)", () => {
    const state = { ...makeBaseState(), curIdx: 2, curPlayId: 3 };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curIdx).toBe(0);
    expect(next.curPlayId).toBe(1);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });

  it("stops playing when at last track with repeatType NONE", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curIdx: 2,
      curPlayId: 3,
      curAudioState: {
        ...base.curAudioState,
        repeatType: "NONE" as const,
      },
    };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curAudioState.isPlaying).toBe(false);
    expect(next.curIdx).toBe(2);
    expect(next.curPlayId).toBe(3);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });

  it("picks a different random index when repeatType SHUFFLE", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curIdx: 0,
      curAudioState: {
        ...base.curAudioState,
        repeatType: "SHUFFLE" as const,
      },
    };
    // SHUFFLE must never return the current index
    const nexts = Array.from({ length: 50 }, () =>
      audioPlayerReducer(state, { type: "NEXT_AUDIO" })
    );
    expect(nexts.every((s) => s.curIdx !== 0)).toBe(true);
    expect(
      nexts.every((s) => s.curPlayId === state.playList[s.curIdx].id)
    ).toBe(true);
    expect(
      nexts.every((s) => s.audioResetKey === state.audioResetKey + 1)
    ).toBe(true);
  });

  it("does not hang when repeatType SHUFFLE and playList has only one track", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      playList: [{ id: 1, src: "track1.mp3" }],
      curIdx: 0,
      curPlayId: 1,
      curAudioState: {
        ...base.curAudioState,
        repeatType: "SHUFFLE" as const,
        isLoadedMetaData: true,
      },
    };
    // Regression: getRandomIdx used to spin forever when min === max,
    // and the SHUFFLE branch used to flip isLoadedMetaData to false on
    // the only track — disabling the progress bar.
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curIdx).toBe(0);
    expect(next.curPlayId).toBe(1);
    expect(next.curAudioState.isLoadedMetaData).toBe(true);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });
});

describe("PREV_AUDIO", () => {
  it("goes to previous track (normal)", () => {
    const state = { ...makeBaseState(), curIdx: 1, curPlayId: 2 };
    const next = audioPlayerReducer(state, {
      type: "PREV_AUDIO",
      currentTime: 0,
    });
    expect(next.curIdx).toBe(0);
    expect(next.curPlayId).toBe(1);
    // audioResetKey bumps on every src-changing PREV branch so useAudio's
    // play effect re-fires play() against the new track. Mirrors NEXT_AUDIO.
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });

  it("wraps around to last track when at first (repeatType ALL)", () => {
    const state = { ...makeBaseState(), curIdx: 0, curPlayId: 1 };
    const next = audioPlayerReducer(state, {
      type: "PREV_AUDIO",
      currentTime: 0,
    });
    expect(next.curIdx).toBe(2);
    expect(next.curPlayId).toBe(3);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });

  it("resets current track (stays) when payload currentTime > 1", () => {
    // Reducer is now pure: rewind decision uses the action payload only,
    // so the test no longer needs to construct a mock <audio> element.
    const state = { ...makeBaseState(), curIdx: 1, curPlayId: 2 };
    const next = audioPlayerReducer(state, {
      type: "PREV_AUDIO",
      currentTime: 5,
    });
    expect(next.curIdx).toBe(1);
    expect(next.curPlayId).toBe(2);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });

  it("stays on first track when repeatType NONE and curIdx is 0", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curIdx: 0,
      curPlayId: 1,
      curAudioState: {
        ...base.curAudioState,
        repeatType: "NONE" as const,
      },
    };
    const next = audioPlayerReducer(state, {
      type: "PREV_AUDIO",
      currentTime: 0,
    });
    expect(next.curIdx).toBe(0);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
  });

  it("picks a different random index when repeatType SHUFFLE", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curIdx: 1,
      curPlayId: 2,
      curAudioState: {
        ...base.curAudioState,
        repeatType: "SHUFFLE" as const,
      },
    };
    // SHUFFLE must never return the current index
    const nexts = Array.from({ length: 50 }, () =>
      audioPlayerReducer(state, { type: "PREV_AUDIO", currentTime: 0 })
    );
    expect(nexts.every((s) => s.curIdx !== 1)).toBe(true);
    expect(
      nexts.every((s) => s.curPlayId === state.playList[s.curIdx].id)
    ).toBe(true);
    expect(
      nexts.every((s) => s.audioResetKey === state.audioResetKey + 1)
    ).toBe(true);
  });

  it("with one-track playlist always rewinds (any repeatType, never disables metadata)", () => {
    const base = makeBaseState();
    const singleTrackState = {
      ...base,
      playList: [{ id: 1, src: "track1.mp3" }],
      curIdx: 0,
      curPlayId: 1,
      curAudioState: {
        ...base.curAudioState,
        isLoadedMetaData: true,
      },
    };
    // Repeat for every mode — pressing PREV must rewind, keep curIdx,
    // bump audioResetKey, and never flip isLoadedMetaData to false
    // (which would disable Progress interactions).
    (["ALL", "ONE", "NONE", "SHUFFLE"] as const).forEach((mode) => {
      const state = {
        ...singleTrackState,
        audioResetKey: 0,
        curAudioState: { ...singleTrackState.curAudioState, repeatType: mode },
      };
      const next = audioPlayerReducer(state, {
        type: "PREV_AUDIO",
        currentTime: 0,
      });
      expect(next.curIdx).toBe(0);
      expect(next.curPlayId).toBe(1);
      expect(next.curAudioState.isLoadedMetaData).toBe(true);
      expect(next.audioResetKey).toBe(1);
      expect(next.curAudioState.currentTime).toBe(0);
    });
  });
});

describe("CHANGE_PLAYING_STATE", () => {
  it("toggles isPlaying from false to true", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curAudioState: { ...base.curAudioState, isPlaying: false },
    };
    const next = audioPlayerReducer(state, { type: "CHANGE_PLAYING_STATE" });
    expect(next.curAudioState.isPlaying).toBe(true);
  });

  it("toggles isPlaying from true to false", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curAudioState: { ...base.curAudioState, isPlaying: true },
    };
    const next = audioPlayerReducer(state, { type: "CHANGE_PLAYING_STATE" });
    expect(next.curAudioState.isPlaying).toBe(false);
  });

  it("sets isPlaying to true when explicit state: true is provided", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "CHANGE_PLAYING_STATE",
      state: true,
    });
    expect(next.curAudioState.isPlaying).toBe(true);
  });

  it("sets isPlaying to false when explicit state: false is provided", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curAudioState: { ...base.curAudioState, isPlaying: true },
    };
    const next = audioPlayerReducer(state, {
      type: "CHANGE_PLAYING_STATE",
      state: false,
    });
    expect(next.curAudioState.isPlaying).toBe(false);
  });
});

describe("SET_REPEAT_TYPE", () => {
  it.each([
    ["ALL" as const],
    ["ONE" as const],
    ["NONE" as const],
    ["SHUFFLE" as const],
  ])("sets repeatType to %s", (repeatType) => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_REPEAT_TYPE",
      repeatType,
    });
    expect(next.curAudioState.repeatType).toBe(repeatType);
  });
});

describe("UPDATE_PLAY_LIST", () => {
  it("updates playlist and recalculates curIdx", () => {
    const newPlayList = [
      { id: 3, src: "track3.mp3" },
      { id: 1, src: "track1.mp3" },
    ];
    const state = { ...makeBaseState(), curPlayId: 1 };
    const next = audioPlayerReducer(state, {
      type: "UPDATE_PLAY_LIST",
      playList: newPlayList,
    });
    expect(next.playList).toEqual(newPlayList);
    expect(next.curIdx).toBe(1);
  });

  it("resets to first track when curPlayId not in new playlist", () => {
    const state = makeBaseState();
    const newPlayList = [{ id: 99, src: "other.mp3" }];
    const next = audioPlayerReducer(state, {
      type: "UPDATE_PLAY_LIST",
      playList: newPlayList,
    });
    expect(next.playList).toEqual(newPlayList);
    expect(next.curPlayId).toBe(99);
    expect(next.curIdx).toBe(0);
    expect(next.audioResetKey).toBe(state.audioResetKey + 1);
    expect(next.curAudioState.currentTime).toBe(0);
  });

  it("handles empty playlist update gracefully", () => {
    const state = makeBaseState();
    const next = audioPlayerReducer(state, {
      type: "UPDATE_PLAY_LIST",
      playList: [],
    });
    expect(next.playList).toEqual([]);
    expect(next.curPlayId).toBe(0);
    expect(next.curIdx).toBe(-1);
    expect(next.curAudioState.isPlaying).toBe(false);
    expect(next.curAudioState.currentTime).toBe(0);
  });
});

describe("SET_VOLUME", () => {
  it("updates volume in curAudioState", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_VOLUME",
      volume: 0.5,
    });
    expect(next.curAudioState.volume).toBe(0.5);
  });

  it("clamps volume above 1 to 1", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_VOLUME",
      volume: 2,
    });
    expect(next.curAudioState.volume).toBe(1);
  });

  it("clamps volume below 0 to 0", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_VOLUME",
      volume: -1,
    });
    expect(next.curAudioState.volume).toBe(0);
  });

  it("defaults to 1 for NaN", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_VOLUME",
      volume: NaN,
    });
    expect(next.curAudioState.volume).toBe(1);
  });

  it("defaults to 1 for Infinity", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_VOLUME",
      volume: Infinity,
    });
    expect(next.curAudioState.volume).toBe(1);
  });
});

describe("SET_MUTED", () => {
  it("sets muted to true", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_MUTED",
      muted: true,
    });
    expect(next.curAudioState.muted).toBe(true);
  });

  it("sets muted to false", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curAudioState: { ...base.curAudioState, muted: true },
    };
    const next = audioPlayerReducer(state, { type: "SET_MUTED", muted: false });
    expect(next.curAudioState.muted).toBe(false);
  });
});

describe("SET_PLAYBACK_RATE", () => {
  it("sets playbackRate to the dispatched value", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_PLAYBACK_RATE",
      playbackRate: 1.5,
    });
    expect(next.curAudioState.playbackRate).toBe(1.5);
  });

  it("replaces an existing playbackRate", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curAudioState: { ...base.curAudioState, playbackRate: 1.5 },
    };
    const next = audioPlayerReducer(state, {
      type: "SET_PLAYBACK_RATE",
      playbackRate: 0.75,
    });
    expect(next.curAudioState.playbackRate).toBe(0.75);
  });

  // playbackRate is delegated to HTMLMediaElement, which both rejects
  // unsupported rates and emits ratechange events. The reducer must NOT
  // clamp — assert the stored value equals the input exactly across the
  // supported range and beyond.
  it.each([0, 0.0625, 2, 4, 16])(
    "accepts edge value %s without clamping",
    (rate) => {
      const next = audioPlayerReducer(makeBaseState(), {
        type: "SET_PLAYBACK_RATE",
        playbackRate: rate,
      });
      expect(next.curAudioState.playbackRate).toBe(rate);
    }
  );

  it("does not mutate other curAudioState slices", () => {
    const base = makeBaseState();
    const state = {
      ...base,
      curAudioState: {
        ...base.curAudioState,
        isPlaying: true,
        volume: 0.42,
        muted: true,
        repeatType: "ONE" as const,
        currentTime: 17,
      },
    };
    const next = audioPlayerReducer(state, {
      type: "SET_PLAYBACK_RATE",
      playbackRate: 1.25,
    });
    expect(next.curAudioState.playbackRate).toBe(1.25);
    expect(next.curAudioState.isPlaying).toBe(true);
    expect(next.curAudioState.volume).toBe(0.42);
    expect(next.curAudioState.muted).toBe(true);
    expect(next.curAudioState.repeatType).toBe("ONE");
    expect(next.curAudioState.currentTime).toBe(17);
  });

  it("does not mutate sibling state slices (playList/curIdx/seekRequestKey/audioResetKey)", () => {
    const state = {
      ...makeBaseState(),
      audioResetKey: 7,
      seekRequestKey: 3,
    };
    const next = audioPlayerReducer(state, {
      type: "SET_PLAYBACK_RATE",
      playbackRate: 2,
    });
    expect(next.playList).toBe(state.playList);
    expect(next.curIdx).toBe(state.curIdx);
    expect(next.curPlayId).toBe(state.curPlayId);
    expect(next.audioResetKey).toBe(7);
    expect(next.seekRequestKey).toBe(3);
  });
});

describe("SEEK", () => {
  it("sets curAudioState.currentTime to the payload time", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SEEK",
      time: 42,
    });
    expect(next.curAudioState.currentTime).toBe(42);
  });

  it("increments seekRequestKey so useAudio's keyed effect fires", () => {
    const state = { ...makeBaseState(), seekRequestKey: 3 };
    const next = audioPlayerReducer(state, { type: "SEEK", time: 10 });
    expect(next.seekRequestKey).toBe(4);
  });

  it("increments on each SEEK even when the target time is the same", () => {
    // Effect is keyed on seekRequestKey identity, so repeat seeks to the
    // same position must still trigger it (e.g. user drags slider and
    // releases at the starting value).
    let state = { ...makeBaseState(), seekRequestKey: 0 };
    state = audioPlayerReducer(state, { type: "SEEK", time: 30 });
    expect(state.seekRequestKey).toBe(1);
    state = audioPlayerReducer(state, { type: "SEEK", time: 30 });
    expect(state.seekRequestKey).toBe(2);
  });
});
