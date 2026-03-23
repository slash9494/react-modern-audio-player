import { describe, it, expect } from "vitest";
import { screen, fireEvent, act } from "@testing-library/react";
import { renderPlayer } from "./fixtures/render";

// play/pause/load are already mocked globally in src/test/setup.ts

describe("Progress Bar Integration", () => {
  it("7-1: progress bar is visible", () => {
    renderPlayer();
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
  });

  it("7-2: clicking progress bar sets audio currentTime", async () => {
    renderPlayer();

    const audio = document.querySelector("audio") as HTMLAudioElement;
    expect(audio).not.toBeNull();

    Object.defineProperty(audio, "duration", {
      configurable: true,
      get: () => 100,
    });

    await act(async () => {
      fireEvent(audio, new Event("loadedmetadata"));
    });

    const progressBar = screen.getByTestId("progress-bar");

    Object.defineProperty(progressBar, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        x: 0,
        y: 0,
        width: 200,
        height: 18,
        left: 0,
        top: 0,
        right: 200,
        bottom: 18,
      }),
    });

    Object.defineProperty(progressBar, "clientWidth", {
      configurable: true,
      get: () => 200,
    });

    await act(async () => {
      fireEvent.click(progressBar, { clientX: 100 });
    });

    expect(audio.currentTime).toBeGreaterThan(0);
  });

  it("7-3: current time display starts at 00:00", () => {
    renderPlayer();
    expect(screen.getByTestId("track-current-time").textContent).toBe("00:00");
  });
});
