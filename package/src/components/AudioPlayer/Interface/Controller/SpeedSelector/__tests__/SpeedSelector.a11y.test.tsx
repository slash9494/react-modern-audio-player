import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { axe } from "vitest-axe";
import { SpeedSelector } from "../SpeedSelector";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import { uiContext } from "@/components/AudioPlayer/Context/UIContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

const mockDispatch = vi.fn();

const makePlaybackValue = (playbackRate = 1) => ({
  isPlaying: false,
  repeatType: "ALL" as const,
  muted: false,
  volume: 0.5,
  isLoadedMetaData: undefined,
  audioResetKey: 0,
  playbackRate,
});

const uiValue = {
  activeUI: { all: true, playbackRate: true },
  playListPlacement: "bottom" as const,
};

interface RenderOptions {
  playbackRate?: number;
  options?: number[];
  formatRate?: (rate: number) => string;
}

const renderSpeedSelector = ({
  playbackRate = 1,
  options,
  formatRate,
}: RenderOptions = {}) =>
  render(
    <uiContext.Provider value={uiValue}>
      <playbackContext.Provider value={makePlaybackValue(playbackRate)}>
        <resourceContext.Provider value={{}}>
          <audioPlayerDispatchContext.Provider value={mockDispatch}>
            <SpeedSelector options={options} formatRate={formatRate} />
          </audioPlayerDispatchContext.Provider>
        </resourceContext.Provider>
      </playbackContext.Provider>
    </uiContext.Provider>
  );

// Opening the Dropdown content traverses two timer layers:
// (1) DropdownContent computes dropdownSize on mount via useEffect, then
// (2) CssTransition flips renderable=true on visible commit and fires the
// enterTime timer (20ms). Fake timers + flushing keeps the test
// deterministic across environments — no real sleeps, no auto-retry.
const openMenuByClickingTrigger = () => {
  const trigger = screen.getByTestId("speed-selector-trigger");
  act(() => {
    fireEvent.click(trigger);
  });
  // Flush dropdownSize effect → CssTransition layout effect → enter timer.
  act(() => vi.runAllTimers());
  act(() => vi.runAllTimers());
};

describe("SpeedSelector accessibility", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the trigger button with the formatted current rate label", () => {
    renderSpeedSelector({ playbackRate: 1 });
    const trigger = screen.getByTestId("speed-selector-trigger");
    expect(trigger).toHaveAttribute(
      "aria-label",
      "Playback speed, currently 1×"
    );
    expect(trigger).toHaveTextContent("1×");
  });

  it("trigger label updates to reflect a non-default playbackRate", () => {
    renderSpeedSelector({ playbackRate: 1.5 });
    const trigger = screen.getByTestId("speed-selector-trigger");
    expect(trigger).toHaveAttribute(
      "aria-label",
      "Playback speed, currently 1.5×"
    );
    expect(trigger).toHaveTextContent("1.5×");
  });

  it('trigger has type="button"', () => {
    renderSpeedSelector();
    expect(screen.getByTestId("speed-selector-trigger")).toHaveAttribute(
      "type",
      "button"
    );
  });

  it("opens the menu on trigger click and exposes role=menu with menuitemradio options", () => {
    renderSpeedSelector({ playbackRate: 1 });
    expect(screen.queryByRole("menu")).toBeNull();

    openMenuByClickingTrigger();

    const menu = screen.getByRole("menu", { name: "Playback speed" });
    expect(menu).toBeInTheDocument();
    const options = screen.getAllByRole("menuitemradio");
    // Default option set: 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2 — 7 entries.
    expect(options).toHaveLength(7);
  });

  it("active option has aria-checked=true and all others aria-checked=false", () => {
    renderSpeedSelector({ playbackRate: 1 });
    openMenuByClickingTrigger();

    const options = screen.getAllByRole("menuitemradio");
    const checkedStates = options.map((opt) => ({
      rate: opt.getAttribute("data-rate"),
      checked: opt.getAttribute("aria-checked"),
    }));
    expect(checkedStates).toEqual([
      { rate: "0.5", checked: "false" },
      { rate: "0.75", checked: "false" },
      { rate: "1", checked: "true" },
      { rate: "1.25", checked: "false" },
      { rate: "1.5", checked: "false" },
      { rate: "1.75", checked: "false" },
      { rate: "2", checked: "false" },
    ]);
  });

  it("clicking an option dispatches SET_PLAYBACK_RATE with the selected rate", () => {
    renderSpeedSelector({ playbackRate: 1 });
    openMenuByClickingTrigger();

    const optionForOnePointFive = screen
      .getAllByRole("menuitemradio")
      .find((el) => el.getAttribute("data-rate") === "1.5");
    if (!optionForOnePointFive) throw new Error("expected 1.5x option");

    act(() => {
      fireEvent.click(optionForOnePointFive);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PLAYBACK_RATE",
      playbackRate: 1.5,
    });
  });

  it("uses the active option's aria-checked when playbackRate matches a non-default option", () => {
    renderSpeedSelector({ playbackRate: 1.75 });
    openMenuByClickingTrigger();

    const options = screen.getAllByRole("menuitemradio");
    const active = options.find(
      (opt) => opt.getAttribute("aria-checked") === "true"
    );
    if (!active) throw new Error("expected one active option");
    expect(active.getAttribute("data-rate")).toBe("1.75");
    // Exactly one active option at any time.
    expect(
      options.filter((opt) => opt.getAttribute("aria-checked") === "true")
    ).toHaveLength(1);
  });

  it("custom options prop overrides the default option set", () => {
    renderSpeedSelector({ playbackRate: 1, options: [1, 2] });
    openMenuByClickingTrigger();

    const options = screen.getAllByRole("menuitemradio");
    expect(options).toHaveLength(2);
    expect(options.map((opt) => opt.getAttribute("data-rate"))).toEqual([
      "1",
      "2",
    ]);
  });

  it("custom formatRate prop overrides the default formatter for trigger and options", () => {
    const formatRate = (rate: number) => `${rate}x`;
    renderSpeedSelector({ playbackRate: 1, formatRate });

    const trigger = screen.getByTestId("speed-selector-trigger");
    expect(trigger).toHaveAttribute(
      "aria-label",
      "Playback speed, currently 1x"
    );
    expect(trigger).toHaveTextContent("1x");

    openMenuByClickingTrigger();
    const options = screen.getAllByRole("menuitemradio");
    expect(options.map((opt) => opt.textContent)).toEqual([
      "0.5x",
      "0.75x",
      "1x",
      "1.25x",
      "1.5x",
      "1.75x",
      "2x",
    ]);
  });

  it("has no axe violations with the menu closed", async () => {
    const { container } = renderSpeedSelector({ playbackRate: 1 });
    // Drop fake timers so vitest-axe's internal awaits run on the real
    // microtask queue. axe never schedules wall-clock timers, so this
    // is purely a hygiene step that keeps the assertion deterministic.
    // Flush any pending fake timers first to avoid leaking scheduled work
    // across the timer-mode boundary.
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with the menu open", async () => {
    const { container } = renderSpeedSelector({ playbackRate: 1 });
    openMenuByClickingTrigger();
    // Confirm the menu is committed before scanning.
    expect(screen.getByRole("menu")).toBeInTheDocument();
    // Flush any pending fake timers first to avoid leaking scheduled work
    // across the timer-mode boundary.
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("static-property attach: SpeedSelector exposes the same dispatch contract on every option click", () => {
    // Regression guard: clicking a different option after opening the menu
    // must continue to dispatch a fresh SET_PLAYBACK_RATE — no stale
    // useCallback closure over a previous playbackRate.
    renderSpeedSelector({ playbackRate: 1 });
    openMenuByClickingTrigger();

    const optionForHalf = screen
      .getAllByRole("menuitemradio")
      .find((el) => el.getAttribute("data-rate") === "0.5");
    if (!optionForHalf) throw new Error("expected 0.5x option");
    act(() => {
      fireEvent.click(optionForHalf);
    });

    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: "SET_PLAYBACK_RATE",
      playbackRate: 0.5,
    });
    // Confirm setter spy interactions are not retained (clearMocks: true
    // in vitest config zeros mockDispatch between each `it` already, but
    // assert here explicitly to document the expectation).
    expect(mockDispatch.mock.calls).toHaveLength(1);
  });
});
