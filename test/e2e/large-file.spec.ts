import { test, expect } from "./fixtures/player.fixture";

test.describe("Large-file longform stabilization (e2e)", () => {
  test("L-5: long-form gate falls back to an interactive bar without full decode", async ({
    playerPageLazy,
  }) => {
    // duration 21600s (6h) > LARGE_FILE_THRESHOLD_SEC (1800s) and no peaks →
    // long-form gate. Progress swaps the hidden waveform for a plain BarProgress
    // seekbar, so the control stays interactive without blocking on a wavesurfer
    // decode of the long file.
    await playerPageLazy.gotoWithConfig({
      curPlayId: 1,
      trackOverrides: { 1: { duration: 21600 } },
      progressType: "waveform",
    });
    const { playBtn, progressBar } = playerPageLazy;

    // Interactivity budget: the bar fallback is present and visible within ~5s,
    // i.e. without waiting on a full long-file decode.
    await expect(progressBar).toBeVisible({ timeout: 5000 });

    // Play control is immediately interactive (enabled + clickable). Actual
    // network playback of the real long src is not asserted here — it is not
    // deterministic in CI — but the click must resolve against an enabled
    // control, proving the long-form path does not block the UI on decode.
    await expect(playBtn).toBeEnabled({ timeout: 5000 });
    await playBtn.click();
  });
});
