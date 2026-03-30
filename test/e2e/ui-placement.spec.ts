import { test, expect, PlayerPage } from "./fixtures/player.fixture";
import type { Locator } from "@playwright/test";

test.describe("PlayerPlacement — position", () => {
  test("static (default) → position is not fixed", async ({ playerPage }) => {
    const provider = playerPage.page.locator(".rm-audio-player-provider");
    const position = await provider.evaluate(
      (el) => getComputedStyle(el).position
    );
    expect(position).not.toBe("fixed");
  });

  const fixedPlacements: Array<{
    placement: string;
    insets: Record<string, string>;
  }> = [
    { placement: "bottom", insets: { bottom: "0px" } },
    { placement: "top", insets: { top: "0px" } },
    { placement: "top-left", insets: { top: "0px", left: "0px" } },
    { placement: "top-right", insets: { top: "0px", right: "0px" } },
    { placement: "bottom-left", insets: { bottom: "0px", left: "0px" } },
    { placement: "bottom-right", insets: { bottom: "0px", right: "0px" } },
  ];

  for (const { placement, insets } of fixedPlacements) {
    test(`${placement} → position: fixed with correct insets`, async ({
      playerPageLazy,
    }) => {
      await playerPageLazy.gotoWithConfig({ playerPlacement: placement });
      const provider = playerPageLazy.page.locator(".rm-audio-player-provider");

      const position = await provider.evaluate(
        (el) => getComputedStyle(el).position
      );
      expect(position).toBe("fixed");

      const allInsets = ["top", "right", "bottom", "left"] as const;

      for (const [prop, expected] of Object.entries(insets)) {
        const value = await provider.evaluate(
          (el, p) => getComputedStyle(el).getPropertyValue(p),
          prop
        );
        expect(value).toBe(expected);
      }

      for (const prop of allInsets.filter((p) => !(p in insets))) {
        const value = await provider.evaluate(
          (el, p) => getComputedStyle(el).getPropertyValue(p),
          prop
        );
        expect(value).toBe("auto");
      }
    });
  }
});

test.describe("InterfacePlacement — gridArea inline styles", () => {
  // Helper: find the closest ancestor with gridArea set in inline style
  async function getAncestorGridArea(locator: Locator): Promise<string> {
    return locator.evaluate((el) => {
      let current: HTMLElement | null = el as HTMLElement;
      while (current) {
        if (current.style.gridArea) return current.style.gridArea;
        current = current.parentElement;
      }
      return "";
    });
  }

  test("default placement → playButton GridItem has gridArea from defaultInterfacePlacement", async ({
    playerPage,
  }) => {
    // default playButton templateArea is "row1-8"
    const gridArea = await getAncestorGridArea(playerPage.playBtn);
    expect(gridArea).toBe("row1-8");
  });

  test("custom templateArea: playButton='row1-3' → playBtn wrapper gridArea matches", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      interfaceTemplateArea: { playButton: "row1-3" },
    });
    const gridArea = await getAncestorGridArea(playerPageLazy.playBtn);
    expect(gridArea).toBe("row1-3");
  });

  test("custom templateArea: progress='row2-1' → progress GridItem gridArea matches", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({
      interfaceTemplateArea: { progress: "row2-1" },
    });
    const gridArea = await getAncestorGridArea(playerPageLazy.progressBar);
    expect(gridArea).toBe("row2-1");
  });
});

test.describe("VolumeSliderPlacement — dropdown direction", () => {
  // DropdownContent uses styled-components (not inline styles),
  // so we must use getComputedStyle on the parent container of the volume-slider.
  async function getDropdownComputedProp(
    playerPage: PlayerPage,
    volumeSliderPlacement: string,
    prop: string
  ) {
    await playerPage.gotoWithConfig({ volumeSliderPlacement });
    await playerPage.volumeTriggerBtn.hover();
    await playerPage.volumeSlider.waitFor({ state: "visible", timeout: 3000 });

    const contentContainer = playerPage.volumeSlider.locator("..");
    return contentContainer.evaluate(
      (el, p) => getComputedStyle(el).getPropertyValue(p),
      prop
    );
  }

  test("'bottom' → dropdown top CSS is set (appears below)", async ({
    playerPageLazy,
  }) => {
    const topVal = await getDropdownComputedProp(
      playerPageLazy,
      "bottom",
      "top"
    );
    expect(topVal).not.toBe("auto");
  });

  test("'top' → dropdown bottom CSS is set (appears above)", async ({
    playerPageLazy,
  }) => {
    const bottomVal = await getDropdownComputedProp(
      playerPageLazy,
      "top",
      "bottom"
    );
    expect(bottomVal).not.toBe("auto");
  });

  test("'left' → dropdown right CSS is set (appears to left)", async ({
    playerPageLazy,
  }) => {
    const rightVal = await getDropdownComputedProp(
      playerPageLazy,
      "left",
      "right"
    );
    expect(rightVal).not.toBe("auto");
  });

  test("'right' → dropdown left CSS is set (appears to right)", async ({
    playerPageLazy,
  }) => {
    const leftVal = await getDropdownComputedProp(
      playerPageLazy,
      "right",
      "left"
    );
    expect(leftVal).not.toBe("auto");
  });
});

test.describe("PlayListPlacement — DOM order", () => {
  test("'bottom' (default) → sortable-play-list after interface-grid", async ({
    playerPage,
  }) => {
    const isBottomPlacement = await playerPage.page.evaluate(() => {
      const list = document.querySelector(".sortable-play-list");
      const grid = document.querySelector(".interface-grid");
      if (!list || !grid) return null;
      // DOCUMENT_POSITION_FOLLOWING means grid comes before list in DOM
      return Boolean(
        grid.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
    expect(isBottomPlacement).toBe(true);
  });

  test("'top' → sortable-play-list before interface-grid", async ({
    playerPageLazy,
  }) => {
    await playerPageLazy.gotoWithConfig({ playListPlacement: "top" });

    const isTopPlacement = await playerPageLazy.page.evaluate(() => {
      const list = document.querySelector(".sortable-play-list");
      const grid = document.querySelector(".interface-grid");
      if (!list || !grid) return null;
      return Boolean(
        list.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
    expect(isTopPlacement).toBe(true);
  });
});
