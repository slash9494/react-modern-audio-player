import { describe, it, expect, beforeEach } from "vitest";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { renderPlayer } from "./fixtures/render";

describe("Playlist interaction", () => {
  beforeEach(() => {
    const portalTarget = document.createElement("div");
    portalTarget.className = "sortable-play-list";
    document.body.appendChild(portalTarget);
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

    await waitFor(() => {
      const items = screen.getAllByTestId("playlist-item");
      expect(items).toHaveLength(5);
    });

    await act(async () => {
      const items = screen.getAllByTestId("playlist-item");
      fireEvent.click(items[2]);
    });

    await waitFor(() => {
      expect(screen.getByTestId("track-title")).toHaveTextContent("Track 3");
    });
  });
});
