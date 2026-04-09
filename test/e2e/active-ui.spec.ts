import { test, expect } from "./fixtures/player.fixture";

test.describe("progressType", () => {
  test("'bar' → progress-bar visible, waveform hidden via CSS", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "bar" });
    await expect(playerPageLazy.progressBar).toBeVisible();
    // WaveformProgress is always mounted but hidden via CSS when inactive
    const waveform = playerPageLazy.page.locator("#rm-waveform");
    await expect(waveform).not.toBeVisible();
  });

  test("'waveform' → waveform container visible, progress-bar absent from DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ progressType: "waveform" });
    const waveform = playerPageLazy.page.locator("#rm-waveform");
    // wavesurfer lazy-loads; wait for the container to become visible
    await expect(waveform).toBeVisible({ timeout: 10000 });
    // BarProgress returns null when !isActive → not in DOM
    await expect(playerPageLazy.progressBar).toHaveCount(0);
  });
});

test.describe("activeUI — element presence", () => {
  test("playButton: false → play-btn not in DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: true, playButton: false },
    });
    await expect(playerPageLazy.playBtn).toHaveCount(0);
  });

  test("playButton: true → play-btn visible", async ({ playerPageLazy }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: false, playButton: true },
    });
    await expect(playerPageLazy.playBtn).toBeVisible();
  });

  test("repeatType: false → repeat-btn not in DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: true, repeatType: false },
    });
    await expect(playerPageLazy.repeatBtn).toHaveCount(0);
  });

  test("prevNnext: false → prev-btn / next-btn not in DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: true, prevNnext: false },
    });
    await expect(playerPageLazy.prevBtn).toHaveCount(0);
    await expect(playerPageLazy.nextBtn).toHaveCount(0);
  });

  test("volume: false → volume-trigger-btn not in DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: true, volume: false },
    });
    await expect(playerPageLazy.volumeTriggerBtn).toHaveCount(0);
  });

  test("trackTime: false → track-current-time not in DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: true, trackTime: false },
    });
    await expect(playerPageLazy.trackCurrentTime).toHaveCount(0);
  });

  test("playList: 'sortable' → playlist-trigger-btn visible", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: true, playList: "sortable" },
    });
    await expect(playerPageLazy.playlistTriggerBtn).toBeVisible();
  });

  test("playList: false → playlist-trigger-btn not in DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: true, playList: false },
    });
    await expect(playerPageLazy.playlistTriggerBtn).toHaveCount(0);
  });

  test("all: false, playButton: true → only play-btn in DOM", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: false, playButton: true },
    });
    await expect(playerPageLazy.playBtn).toBeVisible();
    await expect(playerPageLazy.repeatBtn).toHaveCount(0);
    await expect(playerPageLazy.volumeTriggerBtn).toHaveCount(0);
    await expect(playerPageLazy.playlistTriggerBtn).toHaveCount(0);
    await expect(playerPageLazy.trackCurrentTime).toHaveCount(0);
    await expect(playerPageLazy.progressBar).toHaveCount(0);
    await expect(playerPageLazy.prevBtn).toHaveCount(0);
    await expect(playerPageLazy.nextBtn).toHaveCount(0);
  });
});

test.describe("customIcon — override", () => {
  test("customIcons.play provided → custom element visible instead of default SVG", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: false, playButton: true },
      customIconTestIds: { play: "custom-play-icon" },
    });
    const customIcon = playerPageLazy.page.getByTestId("custom-play-icon");
    await expect(customIcon).toBeVisible();
    // Default SVG should not be present
    const defaultSvg = playerPageLazy.playBtn.locator(
      'svg[aria-hidden="true"]'
    );
    await expect(defaultSvg).toHaveCount(0);
  });

  test("customIcons.pause provided → custom element visible when playing", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: false, playButton: true },
      customIconTestIds: { pause: "custom-pause-icon" },
    });
    // Click play and wait for isPlaying state to trigger re-render
    await playerPageLazy.playBtn.click();
    const customIcon = playerPageLazy.page.getByTestId("custom-pause-icon");
    await expect(customIcon).toBeVisible({ timeout: 10000 });
  });

  test("customIcons.prev provided → custom element visible in prev-btn", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: false, playButton: true, prevNnext: true },
      customIconTestIds: { prev: "custom-prev-icon" },
    });
    const customIcon = playerPageLazy.page.getByTestId("custom-prev-icon");
    await expect(customIcon).toBeVisible();
  });

  test("no customIcon → default SVG icon present", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      activeUI: { all: false, playButton: true },
    });
    const defaultSvg = playerPageLazy.playBtn.locator(
      'svg[aria-hidden="true"]'
    );
    await expect(defaultSvg).toBeVisible();
  });
});
