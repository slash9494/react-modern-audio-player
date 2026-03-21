import { test, expect } from "./fixtures/player.fixture";

test.describe("Volume & mute", () => {
  test("4-1: volume trigger button is visible", async ({ playerPage }) => {
    await expect(playerPage.volumeTriggerBtn).toBeVisible();
  });

  test("4-2: clicking volume button toggles muted state", async ({
    playerPage,
  }) => {
    const { volumeTriggerBtn } = playerPage;

    const initialMuted = await volumeTriggerBtn.getAttribute("data-muted");
    await volumeTriggerBtn.click();

    const afterMuted = await volumeTriggerBtn.getAttribute("data-muted");
    expect(afterMuted).not.toBe(initialMuted);
  });

  test("4-3: clicking volume button twice restores original muted state", async ({
    playerPage,
  }) => {
    const { volumeTriggerBtn } = playerPage;

    const initialMuted = await volumeTriggerBtn.getAttribute("data-muted");
    await volumeTriggerBtn.click();
    await volumeTriggerBtn.click();

    const finalMuted = await volumeTriggerBtn.getAttribute("data-muted");
    expect(finalMuted).toBe(initialMuted);
  });

  test("4-4: volume slider is visible after hovering volume button", async ({
    playerPage,
  }) => {
    const { volumeTriggerBtn, volumeSlider } = playerPage;

    await volumeTriggerBtn.hover();
    await expect(volumeSlider).toBeVisible();
  });
});
