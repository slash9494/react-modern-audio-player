import { describe, it, expect, vi } from "vitest";
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
  elementRefs: {
    audioEl: document.createElement("audio"),
  },
});

// ─────────────────────────────────────────
// NEXT_AUDIO
// ─────────────────────────────────────────
describe("NEXT_AUDIO", () => {
  it("advances to next track (normal)", () => {
    const state = { ...makeBaseState(), curIdx: 0, curPlayId: 1 };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curIdx).toBe(1);
    expect(next.curPlayId).toBe(2);
  });

  it("wraps around to first track when at end (repeatType ALL)", () => {
    const state = { ...makeBaseState(), curIdx: 2, curPlayId: 3 };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curIdx).toBe(0);
    expect(next.curPlayId).toBe(1);
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
  });
});

// ─────────────────────────────────────────
// PREV_AUDIO
// ─────────────────────────────────────────
describe("PREV_AUDIO", () => {
  it("goes to previous track (normal)", () => {
    const state = { ...makeBaseState(), curIdx: 1, curPlayId: 2 };
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(0);
    expect(next.curPlayId).toBe(1);
  });

  it("wraps around to last track when at first (repeatType ALL)", () => {
    const state = { ...makeBaseState(), curIdx: 0, curPlayId: 1 };
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(2);
    expect(next.curPlayId).toBe(3);
  });

  it("resets current track (stays) when currentTime > 1", () => {
    const audioEl = document.createElement("audio");
    audioEl.currentTime = 5;
    const base = makeBaseState();
    const state = {
      ...base,
      curIdx: 1,
      curPlayId: 2,
      elementRefs: { audioEl },
    };
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(1);
    expect(next.curPlayId).toBe(2);
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
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(0);
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
      audioPlayerReducer(state, { type: "PREV_AUDIO" })
    );
    expect(nexts.every((s) => s.curIdx !== 1)).toBe(true);
    expect(
      nexts.every((s) => s.curPlayId === state.playList[s.curIdx].id)
    ).toBe(true);
  });
});

// ─────────────────────────────────────────
// CHANGE_PLAYING_STATE
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
// SET_REPEAT_TYPE
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
// UPDATE_PLAY_LIST
// ─────────────────────────────────────────
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

  it("returns current state unchanged when curPlayId not in new playlist", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
    const state = makeBaseState();
    const newPlayList = [{ id: 99, src: "other.mp3" }];
    const next = audioPlayerReducer(state, {
      type: "UPDATE_PLAY_LIST",
      playList: newPlayList,
    });
    expect(next).toBe(state);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

// ─────────────────────────────────────────
// SET_VOLUME / SET_MUTED
// ─────────────────────────────────────────
describe("SET_VOLUME", () => {
  it("updates volume in curAudioState", () => {
    const next = audioPlayerReducer(makeBaseState(), {
      type: "SET_VOLUME",
      volume: 0.5,
    });
    expect(next.curAudioState.volume).toBe(0.5);
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
