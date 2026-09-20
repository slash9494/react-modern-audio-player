import { FC } from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { AudioPlayerStateProvider } from "@/audioPlayer/Provider/AudioPlayerStateProvider";
import { InitialStates } from "@/audioPlayer/Context/state";
import { usePlaybackContext } from "@/audioPlayer/Context/hooks/usePlaybackContext";
import { CustomComponent } from "..";

// `audioResetKey` is a remount signal rather than audio state, so the legacy
// shape keeps it at the top level — every other playback field belongs to
// `curAudioState`.
const PLAYBACK_KEY_OUTSIDE_CUR_AUDIO_STATE = "audioResetKey";

type LegacyPlayerState = { curAudioState: Record<string, unknown> };

const playList = [{ id: 1, src: "a.mp3" }];

function renderCustomComponentChild(
  audioInitialState: Omit<InitialStates, "curPlayId"> = {}
) {
  const received: {
    state: LegacyPlayerState | null;
    playbackKeys: string[];
  } = { state: null, playbackKeys: [] };

  const ChildProbe: FC<{ audioPlayerState?: LegacyPlayerState }> = ({
    audioPlayerState,
  }) => {
    received.state = audioPlayerState ?? null;
    return null;
  };

  const PlaybackKeyProbe: FC = () => {
    received.playbackKeys = Object.keys(usePlaybackContext());
    return null;
  };

  render(
    <AudioPlayerStateProvider
      playList={playList}
      audioInitialState={{ curPlayId: 1, ...audioInitialState }}
    >
      <PlaybackKeyProbe />
      <CustomComponent id="probe">
        <ChildProbe />
      </CustomComponent>
    </AudioPlayerStateProvider>
  );

  return received;
}

describe("CustomComponent legacy state", () => {
  it("exposes every playback context field on curAudioState", () => {
    const { state, playbackKeys } = renderCustomComponentChild();
    const expectedKeys = playbackKeys.filter(
      (key) => key !== PLAYBACK_KEY_OUTSIDE_CUR_AUDIO_STATE
    );

    expect(expectedKeys.length).toBeGreaterThan(0);
    expect(Object.keys(state!.curAudioState)).toEqual(
      expect.arrayContaining(expectedKeys)
    );
  });

  it("carries the playbackRate value through to the child", () => {
    const { state } = renderCustomComponentChild({ playbackRate: 1.25 });

    expect(state!.curAudioState.playbackRate).toBe(1.25);
  });

  it("merges currentTime and duration from the time context", () => {
    const { state } = renderCustomComponentChild();

    expect(state!.curAudioState).toMatchObject({ currentTime: 0, duration: 0 });
  });
});
