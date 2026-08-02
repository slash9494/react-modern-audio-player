import { describe, it, expect } from "vitest";
import { AudioData } from "@/audio-player/Context";
import { isLiveTrack } from "../hooks/isLiveTrack";

const makeAudioData = (overrides: Partial<AudioData> = {}): AudioData => ({
  src: "track.mp3",
  id: 1,
  ...overrides,
});

describe("isLiveTrack", () => {
  it("returns true when audioData.isLive is true", () => {
    expect(isLiveTrack(makeAudioData({ isLive: true }), 180)).toBe(true);
  });

  it("returns true when audioEl duration is Infinity", () => {
    expect(isLiveTrack(makeAudioData(), Infinity)).toBe(true);
  });

  it("returns false when audioEl duration is NaN", () => {
    expect(isLiveTrack(makeAudioData(), NaN)).toBe(false);
  });

  it("returns false for a finite duration with no live flag", () => {
    expect(isLiveTrack(makeAudioData(), 180)).toBe(false);
  });
});
