import { test, expect } from "./fixtures/player.fixture";

test.describe("Track navigation", () => {
  test("3-1: next button moves to next track", async ({ playerPage }) => {
    const { nextBtn, trackTitle } = playerPage;
    const initialTitle = await trackTitle.textContent();

    await nextBtn.click();

    await expect
      .poll(() => trackTitle.textContent(), { timeout: 3000 })
      .not.toBe(initialTitle);
  });

  test("3-2: prev button moves to previous track", async ({ playerPage }) => {
    const { nextBtn, prevBtn, trackTitle } = playerPage;

    // Move to track 2 first
    await nextBtn.click();
    await expect
      .poll(() => trackTitle.textContent(), { timeout: 3000 })
      .toBe("Track 2");

    // Go back to track 1
    await prevBtn.click();
    await expect
      .poll(() => trackTitle.textContent(), { timeout: 3000 })
      .toBe("Track 1");
  });

  test("3-3 [edge]: repeatType=NONE, next on last track stops player", async ({
    playerPage,
  }) => {
    const { nextBtn, repeatBtn } = playerPage;

    // Cycle repeat to NONE: ALL → ONE → NONE
    await repeatBtn.click(); // ALL → ONE
    await repeatBtn.click(); // ONE → NONE

    // Navigate to last track (5 tracks, start at 1 → click next 4 times)
    await nextBtn.click();
    await nextBtn.click();
    await nextBtn.click();
    await nextBtn.click();
    await expect
      .poll(() => playerPage.trackTitle.textContent(), { timeout: 3000 })
      .toBe("Track 5");

    // Play to confirm audio is active before testing stop behavior
    await playerPage.playBtn.click();
    await expect
      .poll(() => playerPage.trackCurrentTime.textContent(), { timeout: 5000 })
      .not.toBe("00:00");

    // On last track with NONE — next should stop (not wrap)
    await nextBtn.click();

    // Still on last track, player stopped
    await expect(playerPage.trackTitle).toHaveText("Track 5");
    await expect(playerPage.trackCurrentTime).toHaveText("00:00");
    await expect
      .poll(
        () =>
          playerPage.page.evaluate(() => {
            const audio = document.getElementById(
              "rm-audio-player-audio"
            ) as HTMLAudioElement | null;
            return audio?.paused ?? true;
          }),
        { timeout: 3000 }
      )
      .toBe(true);
  });

  test("3-4 [edge]: repeatType=NONE, prev on first track stays on first track", async ({
    playerPage,
  }) => {
    const { prevBtn, repeatBtn, trackTitle } = playerPage;

    // Cycle to NONE
    await repeatBtn.click(); // ALL → ONE
    await repeatBtn.click(); // ONE → NONE

    await prevBtn.click();

    // Should still be on Track 1
    await expect(trackTitle).toHaveText("Track 1");
  });

  test("3-5 [edge]: prev after >1s resets current track to start", async ({
    playerPage,
  }) => {
    const { playBtn, prevBtn, trackTitle, trackCurrentTime } = playerPage;

    // Play and wait until audio has advanced past 1 second
    await playBtn.click();
    await playerPage.page.waitForFunction(
      () => {
        const audio = document.getElementById(
          "rm-audio-player-audio"
        ) as HTMLAudioElement | null;
        return audio != null && audio.currentTime > 1;
      },
      { timeout: 10000 }
    );

    // Click prev — reducer checks audioEl.currentTime > 1 and resets to 00:00
    await prevBtn.click();

    await expect(trackTitle).toHaveText("Track 1");
    await expect(trackCurrentTime).toHaveText("00:00");
  });

  test("3-6 [edge]: repeatType=ALL, next on last track wraps to first track", async ({
    playerPage,
  }) => {
    const { nextBtn, trackTitle } = playerPage;

    // Default is ALL — navigate to last track
    await nextBtn.click();
    await nextBtn.click();
    await nextBtn.click();
    await nextBtn.click();
    await expect
      .poll(() => trackTitle.textContent(), { timeout: 3000 })
      .toBe("Track 5");

    // Next on last → wrap to first
    await nextBtn.click();
    await expect
      .poll(() => trackTitle.textContent(), { timeout: 3000 })
      .toBe("Track 1");
  });
});

// Autoplay continuity across a track swap is the player's headline behavior:
// the new track must not just *load* but actually *keep playing*. The previous
// auto-progression path silently depended on the wavesurfer onReady callback
// calling audioEl.play() — bar-only players had no equivalent, and a
// wavesurfer.load() race on the waveform path could abort the play() call
// without anyone resuming it. These specs guard both modes against future
// drift by checking the audio element's `paused` state on the new track,
// not just the visible track title.
for (const progressType of ["bar", "waveform"] as const) {
  test.describe(`Track autoplay continuity — ${progressType} progress`, () => {
    const audioPausedAfterIdle = (page: import("@playwright/test").Page) =>
      page.evaluate(() => {
        const audio = document.getElementById(
          "rm-audio-player-audio"
        ) as HTMLAudioElement | null;
        return audio?.paused ?? true;
      });

    test(`3-7 [${progressType}]: clicking next-btn during playback keeps audio playing on the new track`, async ({
      playerPageLazy,
    }) => {
      await playerPageLazy.gotoWithConfig({ progressType });
      const { page, playBtn, nextBtn, trackTitle } = playerPageLazy;

      await playBtn.click();
      await expect
        .poll(() => audioPausedAfterIdle(page), { timeout: 5000 })
        .toBe(false);

      const initialTitle = await trackTitle.textContent();

      await nextBtn.click();

      // Title swapped to the next track...
      await expect
        .poll(() => trackTitle.textContent(), { timeout: 3000 })
        .not.toBe(initialTitle);
      // ...AND the new src is actually playing — not stuck paused while the
      // play button still shows the "playing" icon.
      await expect
        .poll(() => audioPausedAfterIdle(page), { timeout: 5000 })
        .toBe(false);
    });

    test(`3-8 [${progressType}]: 'ended' event auto-progresses and keeps audio playing on the new track`, async ({
      playerPageLazy,
    }) => {
      await playerPageLazy.gotoWithConfig({ progressType });
      const { page, playBtn, trackTitle } = playerPageLazy;

      await playBtn.click();
      await expect
        .poll(() => audioPausedAfterIdle(page), { timeout: 5000 })
        .toBe(false);

      const initialTitle = await trackTitle.textContent();

      // Simulate end-of-track without waiting for the real ~3-minute audio.
      // React attaches non-bubbling media handlers (including `ended`) directly
      // to the element, so a plain dispatchEvent on the <audio> reaches the
      // onEnded handler and triggers NEXT_AUDIO.
      await page.evaluate(() => {
        const audio = document.getElementById(
          "rm-audio-player-audio"
        ) as HTMLAudioElement | null;
        audio?.dispatchEvent(new Event("ended"));
      });

      await expect
        .poll(() => trackTitle.textContent(), { timeout: 3000 })
        .not.toBe(initialTitle);
      await expect
        .poll(() => audioPausedAfterIdle(page), { timeout: 5000 })
        .toBe(false);
    });
  });
}
