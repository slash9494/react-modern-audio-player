import type { AudioData } from "../../package/src";
import { test, expect, PlayerPage } from "./fixtures/player.fixture";

// Playback against REAL external sources — the only spec here that leaves the
// machine. Every assertion rides on third-party uptime, so it is intentionally
// non-deterministic and stays out of the default `yarn test:e2e` run.
//
// Run it with: E2E_REAL=1 npx playwright test live-stream.real
//
// Each test walks an ordered candidate list and keeps the first source that
// actually starts playing, so one dead mirror does not sink the run. When none
// of them plays the test skips rather than fails: a withdrawn archive.org item
// is an outage, not a defect in this library.
//
// Exact match, not truthiness: `Boolean("false")` is true, so a runner setting
// E2E_REAL=false to opt out would turn the suite on anyway.
const realSourcesEnabled = process.env.E2E_REAL === "1";

const PLAYBACK_TIMEOUT_MS = 30000;
const SOURCE_ATTEMPT_TIMEOUT_MS = 15000;
const NAVIGATION_BUDGET_MS = 5000;
const SUSTAINED_PLAYBACK_SECONDS = 2;

// Ordered by preference. Every entry is under 10h so the duration renders as
// H:MM:SS (single leading hour digit).
const LONGFORM_SOURCES = [
  // 8.0h — the same item preview/playList.ts ships as track 7.
  "https://archive.org/download/8HOURSOfRelaxingNatureMusicWithBirdsongMeditationWorkStudySleepRelaxation/8%20HOURS%20of%20Relaxing%20Nature%20Music%20with%20Birdsong%20-%20Meditation%2C%20Work%2C%20Study%2C%20Sleep%2C%20Relaxation.mp3",
  // 5.1h
  "https://archive.org/download/accessingunknown/Abstract%20Electro%20Accessing%20Unknown%20Particles%20%28full-5-hours%29.mp3",
  // 6.0h
  "https://archive.org/download/luminescent-ledge-ambience/luma_ambience.mp3",
];

const LIVE_STREAM_SOURCES = [
  // The same host preview/playList.ts ships as track 6.
  "https://stream.radioparadise.com/mp3-192",
  "https://icecast.radiofrance.fr/fip-midfi.mp3",
  "https://stream.srg-ssr.ch/m/rsj/mp3_128",
];

// A walk of failed attempts plus the duration assertion overruns Playwright's
// 30s default. Derived, so adding a mirror cannot silently reintroduce that.
const WORST_CASE_ATTEMPTS = Math.max(
  LONGFORM_SOURCES.length,
  LIVE_STREAM_SOURCES.length
);
const TEST_TIMEOUT_MS =
  WORST_CASE_ATTEMPTS * (SOURCE_ATTEMPT_TIMEOUT_MS + NAVIGATION_BUDGET_MS) +
  PLAYBACK_TIMEOUT_MS;

// The attempt to play IS the reachability check. A host answering HTTP does not
// mean the browser can decode what it serves — ice1.somafm.com replies 200 to
// HEAD in half a second and then never plays — so no cheaper probe tells the
// truth. Returns the source left loaded in the page, ready to be asserted on.
//
// Sustained progress, not `paused`, is the signal. `play()` flips `paused` to
// false synchronously, so a dead host reads as "playing" ~1ms after the click
// and only reverts ~1.5s later once it sets `error`. `currentTime` moves off
// zero solely when frames decode — but a host that serves one chunk and drops
// also ticks briefly, and accepting that would strand the walk on a source
// which then fails the assertion with healthy mirrors left untried. Requiring
// a couple of seconds of decoded audio outlasts that failure mode.
const playFirstWorkingSource = async (
  playerPage: PlayerPage,
  candidates: readonly string[],
  overrides: Partial<AudioData> = {}
): Promise<string | null> => {
  for (const candidate of candidates) {
    // Navigation and the click belong inside the try: a candidate that fails
    // to mount a playable player is exactly the case the walk exists for, and
    // letting it throw here would strand the remaining mirrors untried.
    try {
      await playerPage.gotoWithConfig({
        curPlayId: 1,
        // src last: the candidate under test always wins over the overrides.
        trackOverrides: { 1: { ...overrides, src: candidate } },
        progressType: "waveform",
      });
      await playerPage.playBtn.click();
      await playerPage.page.waitForFunction(
        (minSeconds) => {
          const audioEl = document.querySelector("audio");
          return audioEl?.paused === false && audioEl.currentTime > minSeconds;
        },
        SUSTAINED_PLAYBACK_SECONDS,
        { timeout: SOURCE_ATTEMPT_TIMEOUT_MS }
      );
      return candidate;
    } catch {
      // Never reached sustained playback — fall through to the next mirror.
    }
  }
  return null;
};

test.describe("Live-stream real sources (opt-in)", () => {
  test.describe.configure({ timeout: TEST_TIMEOUT_MS });

  test.skip(
    !realSourcesEnabled,
    "hits third-party hosts — set E2E_REAL=1 (see comment above)"
  );

  test("S-real-1: archive.org longform MP3 plays and shows finite duration", async ({
    playerPageLazy,
  }) => {
    const source = await playFirstWorkingSource(
      playerPageLazy,
      LONGFORM_SOURCES
    );
    test.skip(!source, "no longform mirror started playing");

    // A long but finite file reports an H:MM:SS duration.
    const durationText = playerPageLazy.page.locator(".rmap-track-duration");
    await expect(durationText).toHaveText(/^\d:\d{2}:\d{2}$/, {
      timeout: PLAYBACK_TIMEOUT_MS,
    });
  });

  test("S-real-2: Icecast live stream plays without hanging", async ({
    playerPageLazy,
  }) => {
    const source = await playFirstWorkingSource(
      playerPageLazy,
      LIVE_STREAM_SOURCES,
      { isLive: true }
    );
    test.skip(!source, "no live-stream host started playing");

    // An Icecast live stream has no finite duration → placeholder.
    const durationText = playerPageLazy.page.locator(".rmap-track-duration");
    await expect(durationText).toHaveText("--:--", {
      timeout: PLAYBACK_TIMEOUT_MS,
    });
  });
});
