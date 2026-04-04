# Code Naming Convention

All identifiers — variables, constants, functions, hooks, types, interfaces — must convey their **specific role, purpose, or meaning** at a glance. Generic or ambiguous names are prohibited.

---

## General Principles

1. **Name reveals intent** — a reader should understand *what it is* and *why it exists* without reading surrounding code
2. **Be specific, not generic** — `data`, `value`, `item`, `result`, `info`, `tmp` alone are prohibited; always qualify (e.g., `trackData`, `volumeValue`)
3. **Consistent vocabulary** — use the same word for the same concept across the codebase (see Vocabulary section)
4. **No unnecessary abbreviations** — abbreviate only when the short form is universally understood (e.g., `btn`, `el`, `ref`, `idx`, `ctx`)

---

## Variables & Constants

| Rule | Format | Example |
| --- | --- | --- |
| Local variables | camelCase | `isCurrentId`, `trackDuration` |
| Booleans | `is`/`has`/`should`/`can` prefix | `isPlaying`, `hasPlaylist`, `shouldAutoPlay` |
| Derived/computed | describe the result, not the operation | `currentTrackName` (not `getName`) |
| DOM element refs | `{purpose}El` or `{purpose}Ref` | `audioEl`, `waveformRef` |
| Enum-like constants | PascalCase or UPPER_SNAKE_CASE | `PlaybackState`, `MAX_VOLUME` |

---

## Functions

| Rule | Format | Example |
| --- | --- | --- |
| Regular functions | camelCase, verb-first | `calculateProgress`, `formatTrackTime` |
| Event handlers | `handle{Event}` | `handleClick`, `handleVolumeKeyDown` |
| Factories/builders | `make{Thing}` or `create{Thing}` | `makePlaybackValue`, `createAudioState` |
| Predicates | `is`/`has`/`can` prefix | `isValidTrack`, `hasNextTrack` |
| Callbacks (props) | `on{Event}` | `onClick`, `onTrackChange` |

---

## React Components

| Rule | Format | Example |
| --- | --- | --- |
| Components | PascalCase, noun | `PlayButton`, `VolumeSlider` |
| Hooks | `use{Purpose}` | `useVolume`, `useTrackContext` |
| Context providers | `{Domain}Provider` | `AudioPlayerProvider` |
| HOCs | `with{Feature}` | `withPlaybackControl` |

---

## Types & Interfaces

| Rule | Format | Example |
| --- | --- | --- |
| Interfaces | PascalCase, noun/adjective | `AudioPlayerProps`, `DrawerContext` |
| Type aliases | PascalCase | `ActiveUI`, `PlaybackState` |
| Generic params | Single uppercase or descriptive | `T`, `TData`, `TState` |
| No prefixes | Do NOT use `I` or `T` prefix | `PlayerProps` (not `IPlayerProps`) |

---

## Approved Abbreviations

Only the following abbreviations are permitted. All other words must be spelled out.

| Abbreviation | Full Word |
| --- | --- |
| `btn` | button |
| `el` | element |
| `ref` | reference |
| `idx` | index |
| `ctx` | context |
| `fn` | function |
| `cb` | callback |
| `prev` | previous |
| `cur` | current |
| `src` | source |
| `img` | image |
| `css` | CSS styles |
| `opt` | option(s) |
| `config` | configuration |

---

## Vocabulary Consistency

Use the same word for the same domain concept throughout the codebase.

| Concept | Standard Term | Avoid |
| --- | --- | --- |
| Currently playing track | `curPlayId` | `activeTrack`, `nowPlaying` |
| Audio data item | `audioData` / `trackData` | `item`, `data`, `song` |
| Playlist collection | `playList` | `tracks`, `songs`, `list` |
| Volume level | `volume` | `vol`, `level`, `gain` |
| Playback progress | `progress` | `position`, `seek` |
| UI visibility state | `isOpen` / `isVisible` | `show`, `display`, `active` |

---

## Anti-Patterns

```ts
// BAD — generic, meaningless
const data = fetchTracks();
const val = audio.currentTime;
const flag = id === curPlayId;
function process(x: number) { ... }

// GOOD — specific, purposeful
const trackList = fetchTracks();
const currentPlaybackTime = audio.currentTime;
const isCurrentId = id === curPlayId;
function normalizeVolume(rawValue: number) { ... }
```
