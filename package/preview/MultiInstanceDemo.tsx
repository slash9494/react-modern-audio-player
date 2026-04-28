import AudioPlayerWithProviders, { ActiveUI } from "../src";
import { playList } from "./playList";

/**
 * Multi-instance demo (rendered when `?multi=1` is in the URL). Two
 * independent `<AudioPlayerWithProviders>` instances exercise per-provider
 * state isolation: pausing one does not affect the other, and each owns its
 * own `<audio>` element, playlist, volume, and theme.
 *
 * Inputs are pinned at module scope (instead of inline JSX objects) so the
 * parent App's editor-driven re-renders never hand new prop references down.
 * `usePropsStateEffect` treats each new `playList` / `audioInitialState`
 * reference as an authoritative override and dispatches `UPDATE_PLAY_LIST` +
 * `SET_INITIAL_STATES` — which would silently reset user-reordered playlists
 * and volume on every editor toggle.
 */

const MULTI_A_PLAYLIST = playList.slice(0, 3);
const MULTI_A_INITIAL_STATE = {
  curPlayId: 1,
  volume: 0.3,
  muted: true,
};
const MULTI_A_ACTIVE_UI: ActiveUI = { all: true, progress: "bar" };

// +100 offset keeps instance B's track IDs disjoint from instance A so the
// multi-instance demo can address each player's tracks without collisions.
const MULTI_B_PLAYLIST = playList
  .slice(2)
  .map((t) => ({ ...t, id: t.id + 100 }));
const MULTI_B_INITIAL_STATE = {
  curPlayId: playList[2].id + 100,
  volume: 0.6,
  muted: true,
};
const MULTI_B_ACTIVE_UI: ActiveUI = { all: true, progress: "waveform" };
const MULTI_ROOT_CONTAINER_PROPS = { style: { width: "100%" } };

export const MultiInstanceDemo = () => (
  <div
    data-testid="multi-demo"
    style={{
      width: "100%",
      marginTop: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}
  >
    <h4 style={{ margin: 0 }}>Multi-instance demo</h4>
    <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
      Two independent players. Pause one — the other keeps playing. Each has its
      own DOM id (derived from <code>useId()</code>), playlist state, volume,
      and theme.
    </p>
    <div data-testid="multi-instance-a">
      <AudioPlayerWithProviders
        playList={MULTI_A_PLAYLIST}
        audioInitialState={MULTI_A_INITIAL_STATE}
        activeUI={MULTI_A_ACTIVE_UI}
        colorScheme="light"
        rootContainerProps={MULTI_ROOT_CONTAINER_PROPS}
      />
    </div>
    <div data-testid="multi-instance-b">
      <AudioPlayerWithProviders
        playList={MULTI_B_PLAYLIST}
        audioInitialState={MULTI_B_INITIAL_STATE}
        activeUI={MULTI_B_ACTIVE_UI}
        colorScheme="dark"
        rootContainerProps={MULTI_ROOT_CONTAINER_PROPS}
      />
    </div>
  </div>
);
