import { test, expect } from "./fixtures/player.fixture";
import { requireBox, type BoundingBox } from "./helpers/boundingBox";
import type { Locator, Page } from "@playwright/test";

const EDGE_INSET_PX = 2;
const SUBPIXEL_EPSILON = 0.5;
const DURATION_TIMEOUT_MS = 10000;

// preload="metadata" makes duration finite without playback; ProgressTooltip
// returns null until duration > 0, so the tooltip cannot render before this.
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
      { timeout: DURATION_TIMEOUT_MS }
    )
    .toBe(true);

// The tooltip re-renders per mousemove, so its box is re-read after every move.
const readTooltipBoxAtHover = async (
  page: Page,
  tooltip: Locator,
  x: number,
  y: number
): Promise<BoundingBox> => {
  await page.mouse.move(x, y);
  await tooltip.waitFor({ state: "visible" });
  return requireBox(tooltip);
};

const expectTooltipWithinWrapper = (
  tooltip: BoundingBox,
  wrapper: BoundingBox
) => {
  expect(tooltip.x).toBeGreaterThanOrEqual(wrapper.x - SUBPIXEL_EPSILON);
  expect(tooltip.x + tooltip.width).toBeLessThanOrEqual(
    wrapper.x + wrapper.width + SUBPIXEL_EPSILON
  );
};

test.describe("Progress tooltip horizontal clamp", () => {
  test("keeps the hover tooltip within the bar wrapper at both edges and middle", async ({
    playerPageLazy,
  }) => {
    const { page, progressBar } = playerPageLazy;
    await playerPageLazy.gotoWithConfig({ progressType: "bar" });
    await waitForDurationLoaded(page);

    const wrapper = await requireBox(progressBar);
    const tooltip = page.locator(".rmap-progress-tooltip");
    const hoverCenterY = wrapper.y + wrapper.height / 2;

    const hoverTargets = [
      { label: "left edge", x: wrapper.x + EDGE_INSET_PX },
      { label: "middle", x: wrapper.x + wrapper.width / 2 },
      { label: "right edge", x: wrapper.x + wrapper.width - EDGE_INSET_PX },
    ];

    for (const target of hoverTargets) {
      const tooltipBox = await readTooltipBoxAtHover(
        page,
        tooltip,
        target.x,
        hoverCenterY
      );
      expectTooltipWithinWrapper(tooltipBox, wrapper);
    }
  });
});
