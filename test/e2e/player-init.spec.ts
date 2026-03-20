import { test, expect } from "./fixtures/player.fixture";

test.describe("Player render & initialization", () => {
  test("1-1: player is rendered in the DOM", async ({ playerPage }) => {
    await expect(playerPage.player).toBeVisible();
  });

  test("1-2: play button is visible on initial load", async ({
    playerPage,
  }) => {
    await expect(playerPage.playBtn).toBeVisible();
  });

  test("1-3: first track title is displayed", async ({ playerPage }) => {
    await expect(playerPage.trackTitle).toBeVisible();
    await expect(playerPage.trackTitle).not.toBeEmpty();
  });

  test("1-4: current time starts at 00:00", async ({ playerPage }) => {
    await expect(playerPage.trackCurrentTime).toHaveText("00:00");
  });
});
