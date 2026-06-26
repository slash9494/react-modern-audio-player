import { test, expect } from "./fixtures/player.fixture";

test.describe("Live-stream stabilization (e2e)", () => {
  test("S-4: live track duration never renders Infinity:NaN", async ({
    playerPageLazy,
  }) => {
    // isLive forces the live waveform path. The displayed duration must never
    // degrade to a broken "Infinity:NaN"/"NaN" string. With a finite real src
    // the value is either the live placeholder "--:--" or a finite time —
    // getTimeWithPadStart guards non-finite/negative inputs into "--:--".
    await playerPageLazy.gotoWithConfig({
      curPlayId: 1,
      trackOverrides: { 1: { isLive: true } },
      progressType: "waveform",
    });
    const { page } = playerPageLazy;

    const durationText = page.locator(".rmap-track-duration");
    await expect(durationText).toBeVisible({ timeout: 10000 });

    const text = (await durationText.textContent())?.trim() ?? "";
    expect(text).not.toContain("Infinity");
    expect(text).not.toContain("NaN");
    // Either the live placeholder or a well-formed finite time.
    expect(text).toMatch(/^(--:--|\d{1,2}(:\d{2}){1,2})$/);
  });

  test("S-5: live bar-fallback seek keeps currentTime finite", async ({
    playerPageLazy,
  }) => {
    // isLive swaps the hidden waveform for a plain BarProgress seekbar. Seeking
    // on that fallback must never drive currentTime to NaN/Infinity.
    await playerPageLazy.gotoWithConfig({
      curPlayId: 1,
      trackOverrides: { 1: { isLive: true } },
      progressType: "waveform",
    });
    const { progressBar, page } = playerPageLazy;

    const timeBefore = await page.evaluate(
      () => document.querySelector("audio")?.currentTime ?? 0
    );
    expect(Number.isFinite(timeBefore)).toBe(true);

    // Seek by clicking the bar at ~50% (same pattern as progress-switch 7-8).
    await expect(progressBar).toBeVisible({ timeout: 10000 });
    const box = await progressBar.boundingBox();
    expect(box).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await page.mouse.click(box!.x + box!.width * 0.5, box!.y + box!.height / 2);

    // The live code path must never produce a NaN/Infinity currentTime. We poll
    // until the read settles to a finite, non-negative value.
    await expect
      .poll(
        async () => {
          const time = await page.evaluate(
            () => document.querySelector("audio")?.currentTime ?? 0
          );
          return Number.isFinite(time) && time >= 0;
        },
        { timeout: 5000 }
      )
      .toBe(true);
  });
});
