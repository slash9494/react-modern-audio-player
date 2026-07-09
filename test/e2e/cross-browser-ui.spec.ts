import { test } from "./fixtures/player.fixture";

// Placeholder: cross-browser UI-consistency pipeline (chromium/firefox/webkit).
// Deferred — planned scope, in priority order:
//
// Layer 1 — layout invariants during the waveform loading flow
//   Click a track (audio fetch delayed via page.route to pin the loading
//   window open deterministically), then assert at BOTH the skeleton phase
//   and the ready phase:
//   - progress container height stays constant (~80px, no collapse, no
//     layout jump when the skeleton swaps to the painted waveform)
//   - no horizontal overflow on the player (scrollWidth <= clientWidth)
//   - the skeleton overlay fully covers the container while
//     data-ready="false", and is gone once bars paint
//   - controls row keeps its y-position across the swap (no push-down)
//   These are DOM-box assertions, so the same expectations run unchanged on
//   all three engines — that IS the cross-browser consistency check.
//
// Layer 2 (optional, needs baseline upkeep) — toHaveScreenshot on the stable
//   end state only, with the waveform canvas masked (decode timing and
//   anti-aliasing differ per engine); transient states are never
//   pixel-compared.
//
// Anti-flake rules: no pixel assertions on transient states, no real remote
// audio (route-delayed local fixtures only), state transitions observed via
// data-ready / skeleton presence rather than timing sleeps.
test.describe.skip("Cross-browser UI consistency (planned)", () => {
  test("L1: waveform loading flow keeps layout stable", async () => {
    // Implemented in a follow-up — see the PR description for the full plan.
  });
});
