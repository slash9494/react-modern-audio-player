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

## Comments

Comments are a **last resort**, not a default. Before writing any comment — inline, block, or JSDoc — ask: *can this be expressed through naming or code structure instead?* If yes, rewrite the code and drop the comment.

### Rules

1. **Prefer naming over comments.**
   - Extract intermediate values into named variables (`isFeedbackFromTimeUpdate`, `isTrackDurationReady`, `clampedRatio`).
   - Extract multi-step logic into named helper functions.
   - Rename ambiguous identifiers before explaining them.
2. **Prefer control flow over comments.**
   - Early-return named guards instead of commenting on conditional blocks.
   - Split a branching body into labeled constants rather than annotating each branch.
3. **Only comment when no amount of renaming or restructuring can convey the intent.** Valid cases:
   - **Non-obvious *why***: the reason for a decision that the code itself cannot show (historical incidents, upstream bugs, external contracts, race conditions that only manifest at runtime).
   - **Cross-file coupling**: invariants enforced elsewhere that a reader of this file cannot see.
   - **TODO / FIXME** with a concrete follow-up or ticket reference.
4. **Remove comments that restate the code.** `// increment counter` above `counter++` is noise.
5. **Remove comments that name identifiers the code already names.** If a block comment says "volume effect" above a `useEffect`, hoist that phrase into a named variable or a JSDoc on a named function instead — or drop it entirely when the hook body reads obviously.
6. **Long comments are a smell.** 3+ lines of comment to explain a function body means the function is under-named or under-decomposed. Refactor first.

### Anti-patterns vs. preferred form

```ts
// BAD — comment restates the check
// Skip if the delta is below the timeupdate tick threshold to avoid
// feeding back our own onTimeUpdate dispatches into another seek.
if (Math.abs(audioEl.currentTime - playbackCurrentTime) <= 0.25) return;

// GOOD — predicate name carries the reason
const seekDeltaSec = Math.abs(audioEl.currentTime - playbackCurrentTime);
const isFeedbackFromTimeUpdate = seekDeltaSec <= SEEK_SYNC_THRESHOLD_SEC;
if (isFeedbackFromTimeUpdate) return;
```

```ts
// BAD — label comment above a hook
// volume effect
useEffect(() => { ... }, [volume]);

// GOOD — no label needed; effect body self-explains with named values
useEffect(() => {
  if (!audioEl || playbackVolume == null) return;
  audioEl.volume = playbackVolume;
}, [audioEl, playbackVolume]);
```

```ts
// ACCEPTABLE — non-obvious *why* that code cannot show
// wavesurfer wraps the same <audio> element via the MediaElement backend
// (useWavesurfer.ts), so reading audioEl.currentTime covers both modes.
const currentTime = elementRefs?.audioEl?.currentTime ?? 0;
```

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
