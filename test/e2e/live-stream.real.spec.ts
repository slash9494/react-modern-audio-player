import { test, expect } from "./fixtures/player.fixture";

// Manual verification against REAL external streaming sources. Excluded from CI.
// Un-skip locally or run with --grep to validate against live networks. These
// depend on third-party availability and are intentionally non-deterministic.
test.describe.skip("Live-stream real sources (manual)", () => {
  test("S-real-1: archive.org longform MP3 plays and shows finite duration", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      curPlayId: 1,
      trackOverrides: {
        // TODO: replace with a verified public ~5h archive.org MP3 URL
        1: { src: "https://archive.org/download/PLACEHOLDER/file.mp3" },
      },
      progressType: "waveform",
    });
    const { playBtn, page } = playerPageLazy;

    await playBtn.click();
    await expect
      .poll(
        async () =>
          await page.evaluate(
            () => document.querySelector("audio")?.paused ?? true
          ),
        { timeout: 30000 }
      )
      .toBe(false);

    // A long but finite file reports an H:MM:SS duration.
    const durationText = page.locator(".rmap-track-duration");
    await expect(durationText).toHaveText(/^\d:\d{2}:\d{2}$/, {
      timeout: 30000,
    });
  });

  test("S-real-2: SomaFM Icecast live stream plays without hanging", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      curPlayId: 1,
      trackOverrides: {
        1: {
          src: "https://ice1.somafm.com/groovesalad-128-mp3",
          isLive: true,
        },
      },
      progressType: "waveform",
    });
    const { playBtn, page } = playerPageLazy;

    await playBtn.click();
    await expect
      .poll(
        async () =>
          await page.evaluate(
            () => document.querySelector("audio")?.paused ?? true
          ),
        { timeout: 30000 }
      )
      .toBe(false);

    // An Icecast live stream has no finite duration → placeholder.
    const durationText = page.locator(".rmap-track-duration");
    await expect(durationText).toHaveText("--:--", { timeout: 30000 });
  });
});
