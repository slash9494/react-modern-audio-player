# Class Naming Convention

This convention applies to **all** class names used in CSS files, JSX `className` attributes, test selectors, and any other references to DOM class names throughout the project.

## Prefix

All class names MUST use the `rmap-` prefix (**R**eact **M**odern **A**udio **P**layer).

This prevents collisions with host application styles and ensures consistent identification across all contexts — stylesheets, components, and tests.

## Format

```
rmap-{component}-{element}
```

- `{component}` — the UI component or feature area (kebab-case)
- `{element}` — the specific element within the component (kebab-case)
- Maximum depth: 3 segments after `rmap-` (e.g., `rmap-playlist-album-cover`)

## Rules

1. **Every class name** in `.css`, `className`, test queries, and selectors must start with `rmap-` — **except** state modifiers (see rule 4)
2. **kebab-case only** — no camelCase, no underscores
3. **No bare generic names** — `wrapper`, `container`, `content` alone are prohibited; always pair with a component scope (e.g., `rmap-volume-container`)
4. **State modifiers** are exempt from the `rmap-` prefix and use a CSS dot chain — `.rmap-playlist-item.cur-played`, `.rmap-sortable-item.drag-start`. State modifiers describe temporary visual states (e.g., `cur-played`, `drag-start`, `drag-over`). The state modifier class itself (e.g., `cur-played`) never needs a prefix; only the base class it chains onto must carry `rmap-`.

## CSS Custom Properties (Variables)

CSS custom properties keep the existing `--rm-audio-player-*` prefix.
These are public API for consumer theming and must NOT be renamed.

```css
/* Class names: rmap- */
.rmap-volume-panel { ... }

/* Variables: --rm-audio-player- (unchanged) */
background: var(--rm-audio-player-volume-panel-background);
```

## Keyframe Animations

Keyframe names also use `rmap-` prefix in kebab-case:

```css
@keyframes rmap-fade-in { ... }
@keyframes rmap-slide-up { ... }
```

## Reference Table

| Component      | Element        | Class Name                     |
| -------------- | -------------- | ------------------------------ |
| Root           | player         | `rmap-player-container`        |
| Interface      | container      | `rmap-interface-container`     |
| Interface      | grid           | `rmap-interface-grid`          |
| Controller     | button wrapper | `rmap-ctrl-btn-wrapper`        |
| PlayButton     | root           | `rmap-play-btn`                |
| RepeatButton   | root           | `rmap-repeat-btn`              |
| PrevNextButton | root           | `rmap-prev-next-btn`           |
| Progress       | container      | `rmap-progress-container`      |
| Progress       | bar            | `rmap-progress-bar`            |
| Progress       | handle         | `rmap-progress-handle`         |
| Waveform       | wrapper        | `rmap-waveform-wrapper`        |
| Volume         | container      | `rmap-volume-container`        |
| Volume         | panel          | `rmap-volume-panel`            |
| Volume         | slider         | `rmap-volume-slider`           |
| Volume         | trigger        | `rmap-volume-trigger`          |
| Artwork        | container      | `rmap-artwork-container`       |
| Artwork        | fallback       | `rmap-artwork-fallback`        |
| TrackInfo      | container      | `rmap-track-info-container`    |
| TrackTime      | current        | `rmap-track-time-current`      |
| TrackTime      | duration       | `rmap-track-time-duration`     |
| Playlist       | container      | `rmap-playlist-container`      |
| Playlist       | item           | `rmap-playlist-item`           |
| Playlist       | album cover    | `rmap-playlist-album-cover`    |
| Playlist       | album info     | `rmap-playlist-album-info`     |
| Drawer         | container      | `rmap-drawer-container`        |
| Drawer         | trigger        | `rmap-drawer-trigger`          |
| Dropdown       | container      | `rmap-dropdown-container`      |
| Dropdown       | trigger        | `rmap-dropdown-trigger`        |
| SortableList   | container      | `rmap-sortable-list-container` |
| SortableList   | item           | `rmap-sortable-list-item`      |
