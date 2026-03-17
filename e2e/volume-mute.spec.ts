import { test, expect } from "./fixtures/player.fixture";

// Note: the dev app initializes with muted: true

test.describe("Volume and mute control", () => {
  test("4-1: mute button toggles muted state off", async ({ playerPage }) => {
    const { volumeTriggerBtn } = playerPage;

    await expect(volumeTriggerBtn).toHaveAttribute("data-muted", "true");

    await volumeTriggerBtn.click();

    await expect(volumeTriggerBtn).toHaveAttribute("data-muted", "false");
  });

  test("4-2: mute button toggles muted state on again", async ({
    playerPage,
  }) => {
    const { volumeTriggerBtn } = playerPage;

    // Unmute first
    await volumeTriggerBtn.click();
    await expect(volumeTriggerBtn).toHaveAttribute("data-muted", "false");

    // Mute again
    await volumeTriggerBtn.click();
    await expect(volumeTriggerBtn).toHaveAttribute("data-muted", "true");
  });

  test("4-3: volume slider changes audio volume", async ({ playerPage }) => {
    const { volumeTriggerBtn, volumeSlider, page } = playerPage;

    await volumeTriggerBtn.hover();
    await expect(volumeSlider).toBeVisible();

    const input = volumeSlider.locator("input[type='range']");
    await input.fill("0.3");

    const volume = await page.evaluate(() => {
      const audio = document.getElementById(
        "rm-audio-player-audio"
      ) as HTMLAudioElement | null;
      return audio?.volume ?? -1;
    });
    expect(volume).toBeCloseTo(0.3, 1);
  });

  test("4-4: changing volume while muted unmutes the player", async ({
    playerPage,
  }) => {
    const { volumeTriggerBtn, volumeSlider } = playerPage;

    // Initial state is muted
    await expect(volumeTriggerBtn).toHaveAttribute("data-muted", "true");

    // Hover and change volume — onChangeVolume dispatches SET_MUTED false
    await volumeTriggerBtn.hover();
    await expect(volumeSlider).toBeVisible();

    const input = volumeSlider.locator("input[type='range']");
    await input.fill("0.6");

    await expect(volumeTriggerBtn).toHaveAttribute("data-muted", "false");
  });
});
