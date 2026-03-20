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
