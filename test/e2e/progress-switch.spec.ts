import { test, expect } from "./fixtures/player.fixture";

test.describe("Progress mode switching (e2e)", () => {
  test("7-6: first bar → waveform switch preserves playback position", async ({
    playerPageLazy,
  }) => {
    // Start in bar mode (default)
    await playerPageLazy.gotoWithConfig({ progressType: "bar" });
    const { playBtn, trackCurrentTime, page } = playerPageLazy;

    // Play and wait for time to advance
    await playBtn.click();
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 10000 })
      .not.toBe("00:00");

    // Let it play to accumulate time
    await page.waitForTimeout(3000);
    await playBtn.click();

    // Record exact currentTime before switch
    const currentTimeBefore = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });
    expect(currentTimeBefore).toBeGreaterThan(2);

    // Switch to waveform via in-page button (NOT page reload)
    await page.getByRole("button", { name: "progress type" }).click();

    // Wait for waveform to init
    const wave = page.locator("#rm-waveform wave").first();
    await expect(wave).toBeVisible({ timeout: 10000 });

    // Check currentTime was NOT reset
    const currentTimeAfter = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });

    // currentTime should be within 1 second of the value before switch
    expect(currentTimeAfter).toBeGreaterThanOrEqual(currentTimeBefore - 1);
  });

  test("7-7: waveform renders canvas with wave element", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "waveform" });

    // WaveSurfer v6 creates 2 <wave> elements (waveform + progress overlay)
    const wave = playerPageLazy.page.locator("#rm-waveform wave").first();
    await expect(wave).toBeVisible({ timeout: 10000 });
  });

  test("7-8: waveform seek click updates playback position", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "waveform" });
    const { playBtn, trackCurrentTime, page } = playerPageLazy;

    // Play briefly to load audio
    await playBtn.click();
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 10000 })
      .not.toBe("00:00");
    await playBtn.click();

    // Get waveform bounding box and click at ~50% position
    const waveform = page.locator("#rm-waveform");
    const box = await waveform.boundingBox();
    expect(box).not.toBeNull();

    if (box) {
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
    }

    await page.waitForTimeout(500);

    const currentTimeAfterSeek = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });
    expect(currentTimeAfterSeek).toBeGreaterThan(5);
  });

  test("7-9: waveform keyboard seek works", async ({ playerPageLazy }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "waveform" });
    const { playBtn, trackCurrentTime, page } = playerPageLazy;

    await playBtn.click();
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 10000 })
      .not.toBe("00:00");
    await playBtn.click();

    const timeBefore = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });

    const waveform = page.locator("#rm-waveform");
    await waveform.focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(300);

    const timeAfter = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });

    expect(timeAfter).toBeGreaterThan(timeBefore);
  });

  test("7-10: waveform switch then next track plays from start", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "bar" });
    const { playBtn, trackCurrentTime, nextBtn, trackTitle, page } =
      playerPageLazy;

    // Play and accumulate time
    await playBtn.click();
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 10000 })
      .not.toBe("00:00");
    await page.waitForTimeout(2000);

    // Switch to waveform while playing
    await page.getByRole("button", { name: "progress type" }).click();
    const wave = page.locator("#rm-waveform wave").first();
    await expect(wave).toBeVisible({ timeout: 10000 });

    // Record current track title
    const firstTrack = await trackTitle.textContent();

    // Click next track
    await nextBtn.click();
    await page.waitForTimeout(1000);

    // Track should have changed
    const secondTrack = await trackTitle.textContent();
    expect(secondTrack).not.toBe(firstTrack);

    // Audio should be playing (not stuck)
    const isPlaying = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio ? !audio.paused : false;
    });
    expect(isPlaying).toBe(true);

    // currentTime should be near 0 (new track just started)
    const currentTime = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });
    expect(currentTime).toBeLessThan(5);
  });

  test("7-11: waveform switch preserves playback — audio continues playing", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "bar" });
    const { playBtn, trackCurrentTime, page } = playerPageLazy;

    // Play and accumulate time
    await playBtn.click();
    await expect
      .poll(() => trackCurrentTime.textContent(), { timeout: 10000 })
      .not.toBe("00:00");
    await page.waitForTimeout(2000);

    // Record time before switch
    const timeBefore = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });

    // Switch to waveform while still playing
    await page.getByRole("button", { name: "progress type" }).click();
    const wave = page.locator("#rm-waveform wave").first();
    await expect(wave).toBeVisible({ timeout: 10000 });

    // Wait a moment for playback to resume
    await page.waitForTimeout(1500);

    // Audio should still be playing
    const isPlaying = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio ? !audio.paused : false;
    });
    expect(isPlaying).toBe(true);

    // Time should have advanced past the saved position
    const timeAfter = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });
    expect(timeAfter).toBeGreaterThan(timeBefore);
  });
});
