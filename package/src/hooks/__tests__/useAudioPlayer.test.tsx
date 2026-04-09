/**
 * useAudioPlayer — public hook API
 *
 * Tests verify that each action function dispatches the expected action and
 * that state reads are correctly derived from the context.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { AudioPlayerProvider } from "@/components/Provider/AudioPlayerProvider";
import { useAudioPlayer } from "../useAudioPlayer";

const basePlayList = [
  { id: 1, src: "a.mp3" },
  { id: 2, src: "b.mp3" },
  { id: 3, src: "c.mp3" },
];

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <AudioPlayerProvider playList={basePlayList}>{children}</AudioPlayerProvider>
);

beforeEach(() => {
  window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  window.HTMLMediaElement.prototype.pause = vi.fn();
  window.HTMLMediaElement.prototype.load = vi.fn();
});

describe("initial state", () => {
  it("returns correct defaults", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    expect(result.current.isPlaying).toBe(false);
    expect(result.current.volume).toBe(1);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(0);
    expect(result.current.repeatType).toBe("ALL");
    expect(result.current.muted).toBe(false);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentTrack).toEqual(basePlayList[0]);
    expect(result.current.playList).toEqual(basePlayList);
  });
});

describe("play / pause / togglePlay", () => {
  it("play() sets isPlaying to true", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.play());

    expect(result.current.isPlaying).toBe(true);
  });

  it("pause() sets isPlaying to false after play", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.play());
    act(() => result.current.pause());

    expect(result.current.isPlaying).toBe(false);
  });

  it("togglePlay() flips isPlaying", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.togglePlay());
    expect(result.current.isPlaying).toBe(true);

    act(() => result.current.togglePlay());
    expect(result.current.isPlaying).toBe(false);
  });
});

describe("next / prev", () => {
  it("next() advances to the next track", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.next());

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentTrack).toEqual(basePlayList[1]);
  });

  it("next() wraps around from last track to first (repeatType ALL)", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.next()); // 0 → 1
    act(() => result.current.next()); // 1 → 2
    act(() => result.current.next()); // 2 → 0 (wrap)

    expect(result.current.currentIndex).toBe(0);
  });

  it("prev() from index 1 moves to index 0", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.next()); // go to index 1 first
    act(() => result.current.prev());

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentTrack).toEqual(basePlayList[0]);
  });
});

describe("setTrack", () => {
  it("jumps to the specified index", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.setTrack(2));

    expect(result.current.currentIndex).toBe(2);
    expect(result.current.currentTrack).toEqual(basePlayList[2]);
  });

  it("does nothing for an out-of-range index", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.setTrack(99));

    expect(result.current.currentIndex).toBe(0);
  });
});

describe("setVolume", () => {
  it("updates volume", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.setVolume(0.5));

    expect(result.current.volume).toBe(0.5);
  });

  it("clamps volume above 1 to 1", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.setVolume(2));

    expect(result.current.volume).toBe(1);
  });

  it("clamps volume below 0 to 0", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => result.current.setVolume(-1));

    expect(result.current.volume).toBe(0);
  });
});

describe("seek", () => {
  it("dispatches the new currentTime so timeContext consumers see it", () => {
    // seek() is now a pure dispatch — DOM sync is handled by useAudio's
    // effect once the resulting state change reaches the <Audio> element.
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.seek(30);
    });

    expect(result.current.currentTime).toBe(30);
  });

  it("does not throw when audioEl is absent", () => {
    const { result } = renderHook(() => useAudioPlayer(), {
      wrapper: Wrapper,
    });

    expect(() => act(() => result.current.seek(30))).not.toThrow();
  });
});

describe("error handling", () => {
  it("throws when used outside AudioPlayerProvider", () => {
    expect(() => renderHook(() => useAudioPlayer())).toThrow();
  });
});
