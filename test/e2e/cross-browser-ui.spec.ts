import { resolve } from "path";
import { test, expect } from "./fixtures/player.fixture";
import { requireBox, type BoundingBox } from "./helpers/boundingBox";
import type { Locator, Page } from "@playwright/test";

// Cross-browser UI consistency (chromium/firefox/webkit).
//
// Layer 1 asserts DOM box invariants, so every expectation below is written
// once and runs unchanged on all three engines — that IS the consistency
// check. Layer 2 (bottom of this file) pixel-compares stable end states only.
//
// Anti-flake rules: no pixel assertions on transient states, state changes are
// observed via data-ready / element presence rather than timing sleeps, and the
// audio request is fulfilled from a local fixture on a route delay, so the
// loading window stays open long enough to measure without a live CDN in it.

const WAVEFORM_HEIGHT_PX = 80;
// Default placement only: Content.css rotates the container 90deg for
// left/right placement, which swaps the box to roughly 119x32.
const VOLUME_SLIDER_BOX = { width: 32, height: 119 };
const SUBPIXEL_EPSILON = 0.5;
const READY_TIMEOUT_MS = 20000;
const AUDIO_DELAY_MS = 3000;
// 154s / 4.7MB clears both waveform fallback gates (30min, 50MB), so the real
// waveform still renders instead of the faux one.
const LOCAL_AUDIO_PATH = resolve(
  __dirname,
  "../../package/preview/assets/audio/audio-1.mp3"
);

// Drawer.css and Dropdown.css both open on a CSS animation, so the element is
// still growing when it first becomes visible and `toBeVisible` measures a
// smaller box. Await the animations themselves rather than sleeping or
// comparing consecutive reads — near the end of an ease-out the per-frame
// delta shrinks below any epsilon, which reads as "settled" while it is not.
// `animated` is the element the animation actually runs on. It is often an
// ancestor of the element being measured (the dropdown container animates, the
// slider inside it does not), and awaiting the wrong one returns instantly on
// an empty list — measuring mid-flight while looking like it waited.
const waitForSettledBox = async (
  target: Locator,
  animated: Locator = target
): Promise<BoundingBox> => {
  await animated.evaluate((element) =>
    Promise.all(
      element
        .getAnimations({ subtree: true })
        // A cancelled animation rejects `finished`; that is still "not running".
        .map((animation) => animation.finished.catch(() => undefined))
    )
  );
  return requireBox(target);
};

// Remote cover art paints on the CDN's schedule, not ours: webkit intermittently
// screenshotted a row whose thumbnail had not landed yet (~435px diff) even
// after `img.complete` was true. It is third-party content rather than this
// library's styling, so it is masked for the same reason the wave canvas is.
const REMOTE_IMAGE_SELECTORS = [
  ".rmap-playlist-album-cover",
  ".rmap-artwork-container",
];

const remoteImageMasks = (page: Page): Locator[] =>
  REMOTE_IMAGE_SELECTORS.map((selector) => page.locator(selector));

const horizontalOverflow = (page: Page, testId: string) =>
  page.evaluate((id) => {
    const el = document.querySelector(`[data-testid="${id}"]`);
    if (!el) return null;
    return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
  }, testId);

// Serves the local fixture so no assertion here rides on a CDN round-trip, and
// holds the loading window open: without the delay the request can resolve
// before the first measurement, and the skeleton phase becomes unobservable.
const delayAudioResponse = (page: Page) =>
  page.route("**/audio_*.mp3", async (route) => {
    await new Promise((resolveDelay) =>
      setTimeout(resolveDelay, AUDIO_DELAY_MS)
    );
    await route.fulfill({
      path: LOCAL_AUDIO_PATH,
      contentType: "audio/mpeg",
    });
  });

test.describe("Cross-browser UI consistency — Layer 1 (layout invariants)", () => {
  test("L1-1: waveform loading flow keeps layout stable", async ({
    playerPageLazy,
  }) => {
    const { page } = playerPageLazy;
    await delayAudioResponse(page);
    await playerPageLazy.gotoWithConfig({ progressType: "waveform" });

    const wrapper = page.locator(".rmap-waveform-wrapper");
    const skeleton = page.locator(".rmap-waveform-skeleton");
    const playBtn = page.getByTestId("play-btn");

    // --- skeleton phase -----------------------------------------------
    await expect(wrapper).toHaveAttribute("data-ready", "false");
    await expect(skeleton).toBeVisible();

    const wrapperLoading = await requireBox(wrapper);
    const skeletonBox = await requireBox(skeleton);
    const playBtnLoading = await requireBox(playBtn);
    const overflowLoading = await horizontalOverflow(page, "audio-player");

    expect(wrapperLoading.height).toBeCloseTo(WAVEFORM_HEIGHT_PX, 0);
    // The wrapper collapses to 0 before the canvas paints unless the skeleton
    // holds the height, which is what keeps the controls row from jumping.
    expect(skeletonBox.y).toBeCloseTo(wrapperLoading.y, 0);
    expect(skeletonBox.height).toBeCloseTo(wrapperLoading.height, 0);
    expect(skeletonBox.width).toBeCloseTo(wrapperLoading.width, 0);
    expect(overflowLoading?.scrollWidth).toBeLessThanOrEqual(
      overflowLoading?.clientWidth ?? 0
    );

    // --- ready phase --------------------------------------------------
    await expect(wrapper).toHaveAttribute("data-ready", "true", {
      timeout: READY_TIMEOUT_MS,
    });
    await expect(skeleton).toHaveCount(0);

    const wrapperReady = await requireBox(wrapper);
    const playBtnReady = await requireBox(playBtn);
    const overflowReady = await horizontalOverflow(page, "audio-player");

    expect(Math.abs(wrapperReady.height - wrapperLoading.height)).toBeLessThan(
      SUBPIXEL_EPSILON
    );
    expect(Math.abs(wrapperReady.y - wrapperLoading.y)).toBeLessThan(
      SUBPIXEL_EPSILON
    );
    // The swap must not push the controls row down.
    expect(Math.abs(playBtnReady.y - playBtnLoading.y)).toBeLessThan(
      SUBPIXEL_EPSILON
    );
    expect(overflowReady?.scrollWidth).toBeLessThanOrEqual(
      overflowReady?.clientWidth ?? 0
    );
  });

  test("L1-2: volume slider keeps one geometry across engines", async ({
    playerPage,
  }) => {
    const { page, volumeTriggerBtn, volumeSlider } = playerPage;
    const dropdown = page.getByTestId("volume-dropdown");

    await volumeTriggerBtn.click();
    await expect(dropdown).toBeVisible();
    await expect(volumeSlider).toBeVisible();

    // The thumb and track are vendor pseudo-elements (::-webkit-slider-thumb /
    // ::-moz-range-thumb) authored as two hand-synced rule sets. Neither engine
    // exposes their computed size to getComputedStyle — chromium reports the
    // host box, firefox "auto", webkit nothing — so their appearance is covered
    // by the Layer 2 snapshot. What DOM can hold here is the host geometry the
    // rotated slider depends on.
    const sliderBox = await waitForSettledBox(volumeSlider, dropdown);
    expect(sliderBox.width).toBeCloseTo(VOLUME_SLIDER_BOX.width, 0);
    expect(sliderBox.height).toBeCloseTo(VOLUME_SLIDER_BOX.height, 0);

    const overflow = await horizontalOverflow(page, "audio-player");
    expect(overflow?.scrollWidth).toBeLessThanOrEqual(
      overflow?.clientWidth ?? 0
    );
  });

  test("L1-3: opened playlist drawer settles to one layout", async ({
    playerPage,
  }) => {
    const { page, playlistTriggerBtn } = playerPage;
    const playlist = page.getByTestId("sortable-playlist");

    await playlistTriggerBtn.click();
    await expect(playlist).toBeVisible();

    // The list renders into a portal node outside the animating drawer body, so
    // its own subtree is what has to settle here.
    await waitForSettledBox(playlist);

    const items = page.getByTestId("playlist-item");
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    // Row height is driven by the text, so its absolute value is neither
    // portable (55 on macOS, 56 on the ubuntu runner) nor equal across engines
    // on one machine (chromium 56, firefox 58). Pinning a number — or demanding
    // one number everywhere — asserts font metrics, not layout. What must hold
    // is that the rows agree with each other: one ragged row is the real defect.
    const [firstHeight, ...restHeights] = await items.evaluateAll((nodes) =>
      nodes.map((node) => node.getBoundingClientRect().height)
    );
    expect(firstHeight).toBeGreaterThan(0);
    for (const height of restHeights) {
      expect(height).toBeCloseTo(firstHeight, 0);
    }

    const overflow = await horizontalOverflow(page, "audio-player");
    expect(overflow?.scrollWidth).toBeLessThanOrEqual(
      overflow?.clientWidth ?? 0
    );
  });
});

// Layer 2 — pixel comparison of stable end states only.
//
// Baselines are per-platform (…-chromium-darwin.png vs …-chromium-linux.png),
// so a macOS-generated set would fail on the ubuntu CI runner. The suite is
// therefore opt-in: run `E2E_SNAPSHOTS=1 npx playwright test cross-browser-ui
// --update-snapshots` on the platform you intend to gate, commit the files it
// writes, then keep E2E_SNAPSHOTS set wherever those baselines live.
const snapshotsEnabled = Boolean(process.env.E2E_SNAPSHOTS);

test.describe("Cross-browser UI consistency — Layer 2 (stable-state pixels)", () => {
  test.skip(
    !snapshotsEnabled,
    "needs platform baselines — set E2E_SNAPSHOTS=1 (see comment above)"
  );

  // Playwright's Desktop Safari preset uses deviceScaleFactor: 2 while Chrome
  // and Firefox use 1, so the webkit baselines are raster-doubled — an upgrade
  // that changes that preset invalidates only the webkit set, and CI cannot
  // catch it because Layer 2 is skipped there.

  test("L2-1: ready waveform player matches its baseline", async ({
    playerPageLazy,
  }) => {
    const { page } = playerPageLazy;
    await playerPageLazy.gotoWithConfig({ progressType: "waveform" });

    const wrapper = page.locator(".rmap-waveform-wrapper");
    await expect(wrapper).toHaveAttribute("data-ready", "true", {
      timeout: READY_TIMEOUT_MS,
    });
    // Decode timing and anti-aliasing of the drawn wave differ per engine, so
    // the canvas is masked and only the chrome around it is compared.
    await expect(playerPageLazy.player).toHaveScreenshot("waveform-ready.png", {
      mask: [page.locator("#rm-waveform"), ...remoteImageMasks(page)],
      animations: "disabled",
    });
  });

  test("L2-2: opened volume dropdown matches its baseline", async ({
    playerPage,
  }) => {
    const { page, volumeTriggerBtn } = playerPage;
    await volumeTriggerBtn.click();
    await expect(page.getByTestId("volume-dropdown")).toBeVisible();

    // Covers what DOM cannot reach: the vendor-prefixed thumb and track rules.
    await expect(page.getByTestId("volume-dropdown")).toHaveScreenshot(
      "volume-dropdown.png",
      { animations: "disabled" }
    );
  });

  test("L2-3: opened playlist drawer matches its baseline", async ({
    playerPage,
  }) => {
    const { page, playlistTriggerBtn } = playerPage;
    await playlistTriggerBtn.click();

    const playlist = page.getByTestId("sortable-playlist");
    await expect(playlist).toBeVisible();
    await waitForSettledBox(playlist);

    await expect(playlist).toHaveScreenshot("playlist-drawer.png", {
      mask: remoteImageMasks(page),
      animations: "disabled",
    });
  });
});
