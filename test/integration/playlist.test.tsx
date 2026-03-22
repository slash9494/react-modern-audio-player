import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { renderPlayer } from "./fixtures/render";

describe("Playlist interaction", () => {
  let portalTarget: HTMLDivElement;

  beforeEach(() => {
    portalTarget = document.createElement("div");
    portalTarget.className = "sortable-play-list";
    document.body.appendChild(portalTarget);
  });

  afterEach(() => {
    portalTarget.remove();
  });

  it("6-1: playlist trigger button is visible", () => {
    renderPlayer();
    expect(screen.getByTestId("playlist-trigger-btn")).toBeInTheDocument();
  });

  it("6-2: clicking playlist trigger shows all 5 tracks", async () => {
    renderPlayer();

    await act(async () => {
      fireEvent.click(screen.getByTestId("playlist-trigger-btn"));
    });

    await waitFor(() => {
      const items = screen.getAllByTestId("playlist-item");
      expect(items).toHaveLength(5);
    });
  });

  it("6-3: clicking a playlist item switches to that track", async () => {
    renderPlayer();

    await act(async () => {
      fireEvent.click(screen.getByTestId("playlist-trigger-btn"));
    });

    let track3: HTMLElement | undefined;
    await waitFor(() => {
      const items = screen.getAllByTestId("playlist-item");
      expect(items).toHaveLength(5);
      track3 = items.find((el) => el.textContent?.includes("Track 3"));
    });

    if (!track3) {
      throw new Error("Track 3 not found in playlist");
    }

    await act(async () => {
      fireEvent.click(track3);
    });

    await waitFor(() => {
      expect(screen.getByTestId("track-title")).toHaveTextContent("Track 3");
    });
  });
});
