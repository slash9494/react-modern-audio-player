import { test as base, expect, Page, Locator } from "@playwright/test";

export class PlayerPage {
  readonly page: Page;

  readonly player: Locator;
  readonly playBtn: Locator;
  readonly prevBtn: Locator;
  readonly nextBtn: Locator;
  readonly repeatBtn: Locator;
  readonly volumeTriggerBtn: Locator;
  readonly volumeSlider: Locator;
  readonly progressBar: Locator;
  readonly trackTitle: Locator;
  readonly trackCurrentTime: Locator;
  readonly playlistTriggerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.player = page.getByTestId("audio-player");
    this.playBtn = page.getByTestId("play-btn");
    this.prevBtn = page.getByTestId("prev-btn");
    this.nextBtn = page.getByTestId("next-btn");
    this.repeatBtn = page.getByTestId("repeat-btn");
    this.volumeTriggerBtn = page.getByTestId("volume-trigger-btn");
    this.volumeSlider = page.getByTestId("volume-slider");
    this.progressBar = page.getByTestId("progress-bar");
    this.trackTitle = page.getByTestId("track-title");
    this.trackCurrentTime = page.getByTestId("track-current-time");
    this.playlistTriggerBtn = page.getByTestId("playlist-trigger-btn");
  }

  async goto() {
    await this.page.goto("/");
    await this.player.waitFor({ state: "visible" });
  }

  playlistItems() {
    return this.page.getByTestId("playlist-item");
  }
}

export const test = base.extend<{ playerPage: PlayerPage }>({
  playerPage: async ({ page }, use) => {
    const playerPage = new PlayerPage(page);
    await playerPage.goto();
    await use(playerPage);
  },
});

export { expect };
