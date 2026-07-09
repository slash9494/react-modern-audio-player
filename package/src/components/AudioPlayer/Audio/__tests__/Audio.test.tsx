import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FC, ReactNode } from "react";
import { Audio } from "../index";
import { AudioAttrsContext } from "@/components/AudioPlayer/Context/AudioAttrsContext";
import { audioAttrsContext } from "@/components/AudioPlayer/Context/AudioAttrsContext";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { timeContext } from "@/components/AudioPlayer/Context/TimeContext";
import { trackContext } from "@/components/AudioPlayer/Context/TrackContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

const TRACK_DURATION_SEC = 180;

const renderAudio = (nativeAudioAttrs: AudioAttrsContext) => {
  const audioEl = document.createElement("audio");
  const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <audioAttrsContext.Provider value={nativeAudioAttrs}>
      <trackContext.Provider
        value={{
          playList: [{ id: 1, src: "track.mp3" }],
          curPlayId: 1,
          curIdx: 0,
        }}
      >
        <timeContext.Provider
          value={{
            currentTime: 0,
            duration: TRACK_DURATION_SEC,
            seekRequestKey: 0,
          }}
        >
          <playbackContext.Provider
            value={{
              isPlaying: false,
              repeatType: "ALL",
              muted: false,
              volume: 0.5,
              isLoadedMetaData: true,
              audioResetKey: 0,
              playbackRate: 1,
            }}
          >
            <resourceContext.Provider
              value={{
                elementRefs: { audioEl, waveformInst: undefined as never },
              }}
            >
              <audioPlayerDispatchContext.Provider value={vi.fn()}>
                {children}
              </audioPlayerDispatchContext.Provider>
            </resourceContext.Provider>
          </playbackContext.Provider>
        </timeContext.Provider>
      </trackContext.Provider>
    </audioAttrsContext.Provider>
  );
  const { container } = render(<Audio />, { wrapper });
  return container.querySelector("audio");
};

describe("Audio preload attribute", () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = vi
      .fn()
      .mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
    window.HTMLMediaElement.prototype.load = vi.fn();
  });

  it('defaults preload to "metadata" when no native attrs override it', () => {
    const audioEl = renderAudio({});
    expect(audioEl?.getAttribute("preload")).toBe("metadata");
  });

  it("lets nativeAudioAttrs override the default preload", () => {
    const audioEl = renderAudio({ preload: "auto" });
    expect(audioEl?.getAttribute("preload")).toBe("auto");
  });
});
