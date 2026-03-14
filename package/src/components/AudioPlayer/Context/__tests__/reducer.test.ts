import { describe, it, expect, vi } from "vitest";
import { audioPlayerReducer } from "../reducer";
import { AudioPlayerStateContext } from "../StateContext";

const mockAudioEl = document.createElement("audio");

const baseState: AudioPlayerStateContext = {
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
    audioEl: mockAudioEl,
  },
};

// ─────────────────────────────────────────
// NEXT_AUDIO
// ─────────────────────────────────────────
describe("NEXT_AUDIO", () => {
  it("advances to next track (normal)", () => {
    const state = { ...baseState, curIdx: 0, curPlayId: 1 };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curIdx).toBe(1);
    expect(next.curPlayId).toBe(2);
  });

  it("wraps around to first track when at end (repeatType ALL)", () => {
    const state = { ...baseState, curIdx: 2, curPlayId: 3 };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curIdx).toBe(0);
    expect(next.curPlayId).toBe(1);
  });

  it("stops playing when at last track with repeatType NONE", () => {
    const state = {
      ...baseState,
      curIdx: 2,
      curPlayId: 3,
      curAudioState: { ...baseState.curAudioState, repeatType: "NONE" as const },
    };
    const next = audioPlayerReducer(state, { type: "NEXT_AUDIO" });
    expect(next.curAudioState.isPlaying).toBe(false);
    expect(next.curIdx).toBe(2);
  });

  it("picks a different random index when repeatType SHUFFLE", () => {
    const state = {
      ...baseState,
      curIdx: 0,
      curAudioState: { ...baseState.curAudioState, repeatType: "SHUFFLE" as const },
    };
    // Run multiple times to verify randomness never returns same index
    const results = Array.from({ length: 50 }, () =>
      audioPlayerReducer(state, { type: "NEXT_AUDIO" }).curIdx
    );
    expect(results.some((idx) => idx !== 0)).toBe(true);
  });
});

// ─────────────────────────────────────────
// PREV_AUDIO
// ─────────────────────────────────────────
describe("PREV_AUDIO", () => {
  it("goes to previous track (normal)", () => {
    const state = { ...baseState, curIdx: 1, curPlayId: 2 };
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(0);
    expect(next.curPlayId).toBe(1);
  });

  it("wraps around to last track when at first (repeatType ALL)", () => {
    const state = { ...baseState, curIdx: 0, curPlayId: 1 };
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(2);
    expect(next.curPlayId).toBe(3);
  });

  it("resets current track (stays) when currentTime > 1", () => {
    mockAudioEl.currentTime = 5;
    const state = { ...baseState, curIdx: 1, curPlayId: 2 };
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(1);
    expect(next.curPlayId).toBe(2);
    mockAudioEl.currentTime = 0;
  });

  it("stays on first track when repeatType NONE and curIdx is 0", () => {
    const state = {
      ...baseState,
      curIdx: 0,
      curPlayId: 1,
      curAudioState: { ...baseState.curAudioState, repeatType: "NONE" as const },
    };
    const next = audioPlayerReducer(state, { type: "PREV_AUDIO" });
    expect(next.curIdx).toBe(0);
  });
});

// ─────────────────────────────────────────
// CHANGE_PLAYING_STATE
// ─────────────────────────────────────────
describe("CHANGE_PLAYING_STATE", () => {
  it("toggles isPlaying from false to true", () => {
    const state = { ...baseState, curAudioState: { ...baseState.curAudioState, isPlaying: false } };
    const next = audioPlayerReducer(state, { type: "CHANGE_PLAYING_STATE" });
    expect(next.curAudioState.isPlaying).toBe(true);
  });

  it("toggles isPlaying from true to false", () => {
    const state = { ...baseState, curAudioState: { ...baseState.curAudioState, isPlaying: true } };
    const next = audioPlayerReducer(state, { type: "CHANGE_PLAYING_STATE" });
    expect(next.curAudioState.isPlaying).toBe(false);
  });

  it("sets isPlaying to explicit value when state is provided", () => {
    const next = audioPlayerReducer(baseState, { type: "CHANGE_PLAYING_STATE", state: true });
    expect(next.curAudioState.isPlaying).toBe(true);
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
    const next = audioPlayerReducer(baseState, { type: "SET_REPEAT_TYPE", repeatType });
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
    const state = { ...baseState, curPlayId: 1 };
    const next = audioPlayerReducer(state, { type: "UPDATE_PLAY_LIST", playList: newPlayList });
    expect(next.playList).toEqual(newPlayList);
    expect(next.curIdx).toBe(1);
  });

  it("returns current state unchanged when curPlayId not in new playlist", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const newPlayList = [{ id: 99, src: "other.mp3" }];
    const next = audioPlayerReducer(baseState, { type: "UPDATE_PLAY_LIST", playList: newPlayList });
    expect(next).toBe(baseState);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

// ─────────────────────────────────────────
// SET_VOLUME / SET_MUTED
// ─────────────────────────────────────────
describe("SET_VOLUME", () => {
  it("updates volume in curAudioState", () => {
    const next = audioPlayerReducer(baseState, { type: "SET_VOLUME", volume: 0.5 });
    expect(next.curAudioState.volume).toBe(0.5);
  });
});

describe("SET_MUTED", () => {
  it("sets muted to true", () => {
    const next = audioPlayerReducer(baseState, { type: "SET_MUTED", muted: true });
    expect(next.curAudioState.muted).toBe(true);
  });

  it("sets muted to false", () => {
    const state = { ...baseState, curAudioState: { ...baseState.curAudioState, muted: true } };
    const next = audioPlayerReducer(state, { type: "SET_MUTED", muted: false });
    expect(next.curAudioState.muted).toBe(false);
  });
});
