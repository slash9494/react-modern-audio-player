import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Volume } from "../index";
import { playbackContext } from "@/components/AudioPlayer/Context/PlaybackContext";
import { resourceContext } from "@/components/AudioPlayer/Context/ResourceContext";
import {
  uiContext,
  UIContext,
} from "@/components/AudioPlayer/Context/UIContext";
import { audioPlayerDispatchContext } from "@/components/AudioPlayer/Context/dispatchContext";

const mockDispatch = vi.fn();

const makePlaybackValue = (muted = false) => ({
  isPlaying: false,
  repeatType: "ALL" as const,
  muted,
  volume: 0.5,
  isLoadedMetaData: undefined,
  audioResetKey: 0,
  playbackRate: 1,
});

const baseUIValue: UIContext = {
  activeUI: { all: true, volume: true },
  playListPlacement: "bottom" as const,
};

interface RenderOptions {
  muted?: boolean;
  triggerType?: "click" | "hover";
  placement?: "top" | "bottom" | "left" | "right";
}

const renderVolume = ({
  muted = false,
  triggerType,
  placement,
}: RenderOptions = {}) =>
  render(
    <uiContext.Provider value={baseUIValue}>
      <playbackContext.Provider value={makePlaybackValue(muted)}>
        <resourceContext.Provider value={{}}>
          <audioPlayerDispatchContext.Provider value={mockDispatch}>
            <Volume triggerType={triggerType} placement={placement} />
          </audioPlayerDispatchContext.Provider>
        </resourceContext.Provider>
      </playbackContext.Provider>
    </uiContext.Provider>
  );

// Click-mode opens via the trigger button itself, then DropdownContent's
// dropdownSize useEffect fires before the CssTransition enterTime (20ms)
// promotes the panel to renderable. Mirror the SpeedSelector test helper —
// fake timers + flushing two layers makes the reveal deterministic.
const openMenuByClickingTrigger = () => {
  const trigger = screen.getByTestId("volume-trigger-btn");
  act(() => {
    fireEvent.click(trigger);
  });
  act(() => vi.runAllTimers());
  act(() => vi.runAllTimers());
};

// Hover-mode adds an extra 100ms lazyChangeVisible step in useDropdown
// before the same dropdownSize / CssTransition chain.
const openMenuByHoveringTrigger = () => {
  const dropdown = screen.getByTestId("volume-dropdown");
  act(() => {
    fireEvent.mouseEnter(dropdown);
  });
  act(() => vi.runAllTimers());
  act(() => vi.runAllTimers());
  act(() => vi.runAllTimers());
};

describe("Volume compound triggerType prop", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('triggerType="click" switches the panel role from tooltip to dialog', () => {
    renderVolume({ triggerType: "click" });

    openMenuByClickingTrigger();

    // Volume/index.tsx:48 — `contentRole = resolvedTriggerType === "hover"
    // ? "tooltip" : "dialog"`. Click mode must yield dialog semantics
    // (interactive popover), and the tooltip role must NOT be present.
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).toBeNull();
    // Sanity: the slider itself is rendered under the dialog.
    expect(screen.getByTestId("volume-slider")).toBeInTheDocument();
  });

  it("default (no triggerType) preserves hover behavior: trigger click toggles mute, click does NOT open the panel", () => {
    renderVolume();

    const trigger = screen.getByTestId("volume-trigger-btn");
    expect(trigger).toHaveAttribute("data-muted", "false");

    // Click the trigger — useDropdown's click handler short-circuits in
    // hover mode (`if (triggerType !== "click") return;` — useDropdown.ts:39),
    // so the panel must stay closed. The Volume component's own onClick
    // (toggleMute) still fires and dispatches SET_MUTED.
    act(() => {
      fireEvent.click(trigger);
    });
    act(() => vi.runAllTimers());
    act(() => vi.runAllTimers());

    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByTestId("volume-slider")).toBeNull();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_MUTED",
      muted: true,
    });
    expect(mockDispatch.mock.calls).toHaveLength(1);
  });

  it("default (no triggerType): hover-open exposes role=tooltip on the panel", () => {
    renderVolume();

    openMenuByHoveringTrigger();

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByTestId("volume-slider")).toBeInTheDocument();
  });

  it('compound placement="left" forwards to the VolumeSlider data-placement attribute', () => {
    // VolumeSlider/Content.tsx:51 — `<div data-placement={placement} ...>`
    // is the cleanest DOM-observable for the resolved placement.
    renderVolume({ triggerType: "click", placement: "left" });

    openMenuByClickingTrigger();

    const slider = screen.getByTestId("volume-slider");
    expect(slider).toHaveAttribute("data-placement", "left");
  });
});
