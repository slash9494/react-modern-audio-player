import { resolve } from "path";
import { test, expect } from "./fixtures/player.fixture";
import { requireBoundingBox, type BoundingBox } from "./helpers/boundingBox";
import type { Locator, Page } from "@playwright/test";

// Cross-browser UI consistency (chromium/firefox/webkit).
//
// Layer 1 asserts DOM box invariants, so every expectation below is written
// once and runs unchanged on all three engines — that IS the consistency
// check. Layer 2 (bottom of this file) pixel-compares stable end states only.
//
// Anti-flake rules: no pixel assertions on transient states, and state changes
// are observed via data-ready / element presence rather than timing sleeps.
//
// Only the tests that take playerPageLazy (L1-1, L2-1, L2-4) serve the audio
// from a local fixture — the playerPage fixture navigates during its own setup,
// so the rest have nowhere to register a route first and still reach the live
// CDN. Their assertions read geometry rather than audio metadata, so that is a
// latency risk, not a correctness one.

const WAVEFORM_HEIGHT_PX = 80;
// Default placement only: Content.css rotates the container 90deg for
// left/right placement, which swaps the box to roughly 119x32.
const VOLUME_SLIDER_BOX = { width: 32, height: 119 };
const SUBPIXEL_EPSILON = 0.5;
const READY_TIMEOUT_MS = 20000;
const AUDIO_DELAY_MS = 3000;
// 154s / 4.7MB clears both waveform fallback gates (30min, 50MB), so the real
// waveform still renders instead of the faux one. Its duration is also painted
// into the L2-1 baseline as text, so swapping this file means regenerating it.
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
  return requireBoundingBox(target);
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

// Serves the local fixture so no assertion here rides on a CDN round-trip.
// `delayMs` holds the loading window open where a test needs it: without a
// delay the request can resolve before the first measurement, and the skeleton
// phase becomes unobservable. Snapshot tests want the opposite — no delay, just
// the local file — so they pass nothing.
const serveLocalAudio = (page: Page, delayMs = 0) =>
  page.route("**/audio_*.mp3", async (route) => {
    // useWaveformMode probes this URL with HEAD for content-length. Holding the
    // probe for the download's artificial delay would move when the size gate
    // resolves relative to the fetch, which is the ordering under test.
    if (delayMs > 0 && route.request().method() === "GET") {
      await new Promise((resolveDelay) => setTimeout(resolveDelay, delayMs));
    }
    await route.fulfill({
      path: LOCAL_AUDIO_PATH,
      contentType: "audio/mpeg",
    });
  });

// An element screenshot is clipped to the border box, so everything the engine
// paints outside it — a focus outline sitting 2px out, a box-shadow dropped 2px
// down — is missing from the frame while the assertion still passes. Those
// rules are the reason the baselines below exist, so the page is clipped to the
// target's box grown by a margin instead of the element being shot directly.
const OUTSIDE_PAINT_MARGIN_PX = 8;

const clipAroundBox = (box: BoundingBox) => ({
  x: box.x - OUTSIDE_PAINT_MARGIN_PX,
  y: box.y - OUTSIDE_PAINT_MARGIN_PX,
  width: box.width + OUTSIDE_PAINT_MARGIN_PX * 2,
  height: box.height + OUTSIDE_PAINT_MARGIN_PX * 2,
});

// `:focus-visible` is the selector that draws the outline, and a bare
// `locator.focus()` leaves it inert — the baseline would record a control with
// no outline on it at all. Tabbing all the way to the target is not portable
// either: webkit follows the macOS default and skips <button> in the tab order,
// so play-btn is unreachable there. What all three engines agree on is that a
// scripted focus keeps :focus-visible when the focus it replaces was
// keyboard-driven, so one Tab sets the modality and focus() does the aiming.
const focusWithKeyboardModality = async (page: Page, target: Locator) => {
  await page.keyboard.press("Tab");
  await target.focus();
};

const expectFocusOutlineVisible = async (target: Locator) => {
  await expect(target).toBeFocused();
  const matchesFocusVisible = await target.evaluate((element) =>
    element.matches(":focus-visible")
  );
  expect(matchesFocusVisible).toBe(true);
};

// preload="metadata" makes duration finite without playback; ProgressTooltip
// returns null until duration > 0, so hovering before the metadata lands leaves
// nothing to photograph.
const waitForDurationLoaded = (page: Page) =>
  expect
    .poll(
      () =>
        page.evaluate(() => {
          const durationSeconds = document.querySelector("audio")?.duration;
          return (
            typeof durationSeconds === "number" &&
            Number.isFinite(durationSeconds) &&
            durationSeconds > 0
          );
        }),
      { timeout: READY_TIMEOUT_MS }
    )
    .toBe(true);

test.describe("Cross-browser UI consistency — Layer 1 (layout invariants)", () => {
  test("L1-1: waveform loading flow keeps layout stable", async ({
    playerPageLazy,
  }) => {
    const { page } = playerPageLazy;
    await serveLocalAudio(page, AUDIO_DELAY_MS);
    await playerPageLazy.gotoWithConfig({ progressType: "waveform" });

    const wrapper = page.locator(".rmap-waveform-wrapper");
    const skeleton = page.locator(".rmap-waveform-skeleton");
    const playBtn = page.getByTestId("play-btn");

    // --- skeleton phase -----------------------------------------------
    await expect(wrapper).toHaveAttribute("data-ready", "false");
    await expect(skeleton).toBeVisible();

    const wrapperLoading = await requireBoundingBox(wrapper);
    const skeletonBox = await requireBoundingBox(skeleton);
    const playBtnLoading = await requireBoundingBox(playBtn);
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

    const wrapperReady = await requireBoundingBox(wrapper);
    const playBtnReady = await requireBoundingBox(playBtn);
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
// Exact match, not truthiness: `Boolean("false")` is true, so a runner setting
// E2E_SNAPSHOTS=false to opt out would turn the suite on against no baselines.
const snapshotsEnabled = process.env.E2E_SNAPSHOTS === "1";

test.describe("Cross-browser UI consistency — Layer 2 (stable-state pixels)", () => {
  test.skip(
    !snapshotsEnabled,
    "needs platform baselines — set E2E_SNAPSHOTS=1 (see comment above)"
  );

  // Playwright's Desktop Safari preset runs at deviceScaleFactor 2 while Chrome
  // and Firefox run at 1, but `scale` defaults to "css" — one image pixel per
  // CSS pixel — so all three engines' baselines come out the same size. Passing
  // `scale: "device"` here would raster-double only the webkit set.

  test("L2-1: ready waveform player matches its baseline", async ({
    playerPageLazy,
  }) => {
    const { page } = playerPageLazy;
    // A baseline compared against a CDN-served file is a baseline of the CDN.
    await serveLocalAudio(page);
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

  test("L2-2: opened volume slider matches its baseline", async ({
    playerPage,
  }) => {
    const { page, volumeTriggerBtn, volumeSlider } = playerPage;
    const dropdown = page.getByTestId("volume-dropdown");

    await volumeTriggerBtn.click();
    await expect(volumeSlider).toBeVisible();
    const sliderBox = await waitForSettledBox(volumeSlider, dropdown);

    // Covers what DOM cannot reach: the vendor-prefixed thumb and track rules.
    // The `volume-dropdown` testid is on the Dropdown shell, whose box is the
    // 20px trigger icon rather than the panel it opens; shooting it yields the
    // speaker glyph and none of these rules.
    await expect(page).toHaveScreenshot("volume-slider.png", {
      clip: clipAroundBox(sliderBox),
      animations: "disabled",
    });
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

  test("L2-4: hovered progress tooltip matches its baseline", async ({
    playerPageLazy,
  }) => {
    const { page, progressBar } = playerPageLazy;
    // The label is the timestamp under the cursor, so the baseline text is a
    // function of the track's duration, not just of the styling under test.
    await serveLocalAudio(page);
    await playerPageLazy.gotoWithConfig({ progressType: "bar" });
    await waitForDurationLoaded(page);

    const barBox = await requireBoundingBox(progressBar);
    const tooltip = page.locator(".rmap-progress-tooltip");

    await page.mouse.move(
      barBox.x + barBox.width / 2,
      barBox.y + barBox.height / 2
    );
    await expect(tooltip).toBeVisible();

    const tooltipBox = await requireBoundingBox(tooltip);
    await expect(page).toHaveScreenshot("progress-tooltip.png", {
      clip: clipAroundBox(tooltipBox),
      animations: "disabled",
    });
  });

  test("L2-5: keyboard-focused play button matches its baseline", async ({
    playerPage,
  }) => {
    const { page, playBtn } = playerPage;

    await focusWithKeyboardModality(page, playBtn);
    await expectFocusOutlineVisible(playBtn);

    const playBtnBox = await requireBoundingBox(playBtn);
    await expect(page).toHaveScreenshot("play-btn-focused.png", {
      clip: clipAroundBox(playBtnBox),
      animations: "disabled",
    });
  });

  test("L2-6: opened speed menu matches its baseline", async ({
    playerPage,
  }) => {
    const { page } = playerPage;
    const dropdown = page.getByTestId("speed-selector-dropdown");
    const menu = page.locator(".rmap-speed-selector-menu");

    await page.getByTestId("speed-selector-trigger").click();
    await expect(menu).toBeVisible();

    // The opening animation runs on the dropdown content, not on the menu.
    const menuBox = await waitForSettledBox(menu, dropdown);
    await expect(page).toHaveScreenshot("speed-menu-open.png", {
      clip: clipAroundBox(menuBox),
      animations: "disabled",
    });
  });

  test("L2-7: keyboard-focused bar progress matches its baseline", async ({
    playerPage,
  }) => {
    const { page, progressBar } = playerPage;

    // Focus is also what reveals the round handle: it is opacity 0 until the
    // wrapper is hovered or focus-visible, so an idle bar hides half the rules.
    await focusWithKeyboardModality(page, progressBar);
    await expectFocusOutlineVisible(progressBar);

    const barBox = await requireBoundingBox(progressBar);
    await expect(page).toHaveScreenshot("bar-progress-focused.png", {
      clip: clipAroundBox(barBox),
      animations: "disabled",
    });
  });
});
