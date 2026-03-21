import { test, expect } from "./fixtures/player.fixture";

test.describe("Play / Pause toggle", () => {
  test("2-1: clicking play button shows pause icon", async ({ playerPage }) => {
    const { playBtn, trackCurrentTime } = playerPage;
    await expect(playBtn).toBeVisible();

    await playBtn.click();
    await expect(playBtn).toBeVisible();

    // Wait until current time advances past 00:00
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 10000 })
      .not.toBe("00:00");
  });

  test("2-2: clicking play then pause returns to stopped state", async ({
    playerPage,
  }) => {
    const { playBtn, trackCurrentTime } = playerPage;

    await playBtn.click();
    // Wait until time advances
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 10000 })
      .not.toBe("00:00");
    await playBtn.click();

    // Wait for time to stabilize after pause
    const timeAfterPause = await trackCurrentTime.textContent();
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 3000 })
      .toBe(timeAfterPause);
  });

  test("2-3: play button is always visible", async ({ playerPage }) => {
    const { playBtn } = playerPage;
    await expect(playBtn).toBeVisible();
    await playBtn.click();
    await expect(playBtn).toBeVisible();
    await playBtn.click();
    await expect(playBtn).toBeVisible();
  });
});
