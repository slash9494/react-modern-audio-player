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

    // Wait until at least 2 seconds of playback have accumulated
    await expect
      .poll(
        async () => {
          return await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          );
        },
        { timeout: 10000 }
      )
      .toBeGreaterThan(2);
    await playBtn.click();

    // Record exact currentTime before switch
    const currentTimeBefore = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });

    // Switch to waveform via in-page button (NOT page reload)
    await page.getByRole("button", { name: "progress type" }).click();

    // Wait for waveform to init
    const wave = page.locator("#rm-waveform wave").first();
    await expect(wave).toBeVisible({ timeout: 10000 });

    // Wait for onReady callback to restore currentTime (varies by browser)
    await expect
      .poll(
        async () => {
          return await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          );
        },
        { timeout: 10000 }
      )
      .toBeGreaterThanOrEqual(currentTimeBefore - 1);
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
    await expect(waveform).toBeVisible({ timeout: 10000 });
    const box = await waveform.boundingBox();
    expect(box).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await page.mouse.click(box!.x + box!.width * 0.5, box!.y + box!.height / 2);

    await expect
      .poll(
        async () => {
          return await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          );
        },
        { timeout: 5000 }
      )
      .toBeGreaterThan(5);

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

    await expect
      .poll(
        async () => {
          return await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          );
        },
        { timeout: 5000 }
      )
      .toBeGreaterThanOrEqual(timeBefore + 1);
  });

  test("7-10: waveform switch then next track plays from start", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "bar" });
    const { playBtn, nextBtn, trackTitle, page } = playerPageLazy;

    // Play and accumulate time
    await playBtn.click();
    await expect
      .poll(
        async () =>
          await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          ),
        { timeout: 10000 }
      )
      .toBeGreaterThan(2);

    // Switch to waveform while playing
    await page.getByRole("button", { name: "progress type" }).click();
    const wave = page.locator("#rm-waveform wave").first();
    await expect(wave).toBeVisible({ timeout: 10000 });

    // Record current track title
    const firstTrack = await trackTitle.textContent();

    // Click next track
    await nextBtn.click();

    // Wait for track to change
    await expect
      .poll(() => trackTitle.textContent(), { timeout: 10000 })
      .not.toBe(firstTrack);

    // Wait for new track to start playing (WaveSurfer ready → play)
    await expect
      .poll(
        async () =>
          await page.evaluate(
            () => document.querySelector("audio")?.paused ?? true
          ),
        { timeout: 10000 }
      )
      .toBe(false);

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
    const { playBtn, page } = playerPageLazy;

    // Play and accumulate time
    await playBtn.click();
    await expect
      .poll(
        async () =>
          await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          ),
        { timeout: 10000 }
      )
      .toBeGreaterThan(2);

    // Record time before switch
    const timeBefore = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio?.currentTime ?? 0;
    });

    // Switch to waveform while still playing
    await page.getByRole("button", { name: "progress type" }).click();
    const wave = page.locator("#rm-waveform wave").first();
    await expect(wave).toBeVisible({ timeout: 10000 });

    // Wait for playback to resume and advance past saved position
    await expect
      .poll(
        async () => {
          return await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          );
        },
        { timeout: 15000 }
      )
      .toBeGreaterThan(timeBefore);

    // Audio should still be playing
    const isPlaying = await page.evaluate(() => {
      const audio = document.querySelector("audio");
      return audio ? !audio.paused : false;
    });
    expect(isPlaying).toBe(true);
  });
});
