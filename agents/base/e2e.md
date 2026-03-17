# E2E Test Rules

- E2E tests live in: e2e/
- File naming convention: `*.spec.ts`
- Each spec file maps to one user flow
- Tests must be independent — no shared state between tests
- Always use data-testid attributes for element selection
- Do not rely on CSS class names or text content for selectors

---

## Priority Order

## 1. Player Render and Initialization

- Verify the player mounts without errors
- Confirm default UI state (paused, first track loaded, correct metadata displayed)

## 2. Play / Pause Toggle

- Click play → player starts, button state updates
- Click pause → player stops, button state updates

## 3. Track Navigation (prev / next)

- Next advances to the next track
- Prev goes to the previous track
- Next on last track with repeatType NONE → player stops
- Prev within 1 second of track start → resets to 0, does not go to prev track
- Prev at first track with repeatType NONE → stays on first track

## 4. Volume and Mute Control

- Volume slider changes audio volume
- Mute button toggles muted state

## 5. Repeat Type Cycling

- Clicking repeat cycles: ALL → ONE → NONE → SHUFFLE → ALL
- repeatType ONE: track replays on end
- repeatType ALL: advances to next and wraps around

## 6. Playlist Interaction

- Opening the playlist shows all tracks
- Clicking a track in the playlist switches to that track

## 7. Progress Control

- Seeking via progress bar updates current time
- Current time display updates during playback

## 8. Browser Testing

- Verify the player renders and functions correctly across Chromium, Firefox, and WebKit
- Cover browser-specific audio API differences
- Use Playwright's multi-browser project configuration

## 9. Network & Cache Testing

- Simulate slow / offline network conditions using Playwright route interception
- Verify graceful degradation when the audio source is unreachable
- Confirm browser cache behavior does not break playback on reload

## 10. Accessibility Testing

- Verify keyboard navigation: tab order, space/enter on controls
- Confirm ARIA roles and labels are correct per player state
- Run axe-core or Playwright accessibility snapshot on the mounted player

## 11. Responsive Design Testing

- Test player layout at mobile (375px), tablet (768px), and desktop (1280px) viewports
- Confirm no overflow or layout breakage at common breakpoints
- Use Playwright `page.setViewportSize` for each scenario

## 12. Media File Format Support Testing

- Test playback with MP3, OGG, WAV, and AAC sources
- Verify the player handles unsupported formats without crashing or hanging

## 13. Performance Testing

- Measure time-to-first-play from component mount
- Monitor memory usage during long-running playback sessions
- Detect regressions using Playwright `--trace` or `performance.now()` markers

## 14. Library Compatibility Testing

- Test the player embedded in a plain React app (Vite or CRA)
- Test against the full peer dependency version range declared in `package.json`
- Confirm no console errors in React StrictMode
