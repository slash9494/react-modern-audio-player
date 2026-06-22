import { test, expect } from "./fixtures/player.fixture";

test.describe("Large-file longform stabilization (e2e)", () => {
  test("L-5: faux waveform mode is interactive without waiting for full decode", async ({
    playerPageLazy,
  }) => {
    // duration 21600s (6h) > LARGE_FILE_THRESHOLD_SEC (1800s) and no peaks →
    // faux gate. The player must enter faux mode and stay interactive without
    // blocking on a wavesurfer decode of the long file.
    await playerPageLazy.gotoWithConfig({
      curPlayId: 1,
      trackOverrides: { 1: { duration: 21600 } },
      progressType: "waveform",
    });
    const { playBtn, page } = playerPageLazy;

    const fauxWrapper = page.locator(
      '.rmap-waveform-wrapper[data-waveform-mode="faux"]'
    );
    // Interactivity budget: faux wrapper present and visible within ~5s,
    // i.e. without waiting on a full long-file decode.
    await expect(fauxWrapper).toBeVisible({ timeout: 5000 });

    // Faux bars render on the waveform element inside the faux wrapper.
    const fauxWaveform = fauxWrapper.locator("#rm-waveform");
    await expect(fauxWaveform).toBeVisible({ timeout: 5000 });

    // Play control is immediately interactive (enabled + clickable). Actual
    // network playback of the real long src is not asserted here — it is not
    // deterministic in CI — but the click must resolve against an enabled
    // control, proving the faux path does not block the UI on decode.
    await expect(playBtn).toBeEnabled({ timeout: 5000 });
    await playBtn.click();
  });
});
