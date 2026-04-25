import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AudioPlayerContainer } from "@/components/AudioPlayer/Container/AudioPlayerContainer";
import type { AudioPlayerContainerProps } from "@/components/AudioPlayer/Container/AudioPlayerContainer";
import type { UIContext } from "@/components/AudioPlayer/Context/UIContext";
import type { PlayerPlacement } from "@/components/AudioPlayer/Context/StateContext";

vi.mock("@/components/AudioPlayer/Context/hooks/useUIContext");

import { useUIContext } from "@/components/AudioPlayer/Context/hooks/useUIContext";

const baseUIContext: UIContext = {
  activeUI: {},
  playListPlacement: "bottom",
  playerPlacement: undefined,
  interfacePlacement: undefined,
  volumeSliderPlacement: undefined,
};

function mockPlacement(playerPlacement?: PlayerPlacement) {
  vi.mocked(useUIContext).mockReturnValue({
    ...baseUIContext,
    playerPlacement,
  });
}

function renderContainer(
  props: AudioPlayerContainerProps = {},
  playerPlacement?: PlayerPlacement
) {
  mockPlacement(playerPlacement);
  return render(
    <AudioPlayerContainer {...props}>
      <div data-testid="child" />
    </AudioPlayerContainer>
  );
}

describe("base class", () => {
  beforeEach(() => {
    mockPlacement(undefined);
  });

  it("rmap-player-provider class always present", () => {
    const { container } = renderContainer();
    const el = container.firstChild as HTMLElement;
    expect(el.classList.contains("rmap-player-provider")).toBe(true);
  });

  it("rootContainerProps.className appended", () => {
    const { container } = renderContainer({
      rootContainerProps: { className: "custom-class" },
    });
    const el = container.firstChild as HTMLElement;
    expect(el.className).toBe("rmap-player-provider custom-class");
  });

  it("no trailing space when className absent", () => {
    const { container } = renderContainer();
    const el = container.firstChild as HTMLElement;
    expect(el.className).toBe("rmap-player-provider");
  });
});

describe("default styles", () => {
  it("width defaults to 100%", () => {
    const { container } = renderContainer();
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("100%");
  });

  it("position is static when no placement", () => {
    const { container } = renderContainer({}, undefined);
    const el = container.firstChild as HTMLElement;
    expect(el.style.position).toBe("static");
  });
});

describe("placement → position: fixed", () => {
  it.each<[PlayerPlacement, Partial<CSSStyleDeclaration>]>([
    ["bottom", { bottom: "0px" }],
    ["top", { top: "0px" }],
    ["bottom-left", { bottom: "0px", left: "0px" }],
    ["bottom-right", { bottom: "0px", right: "0px" }],
    ["top-left", { top: "0px", left: "0px" }],
    ["top-right", { top: "0px", right: "0px" }],
  ])(
    "%s → position: fixed + correct inset",
    async (placement, expectedInsets) => {
      let container!: HTMLElement;
      await act(async () => {
        ({ container } = renderContainer({}, placement));
      });
      const el = container.firstChild as HTMLElement;
      expect(el.style.position).toBe("fixed");
      for (const [prop, value] of Object.entries(expectedInsets)) {
        expect(el.style[prop as keyof CSSStyleDeclaration]).toBe(value);
      }
    }
  );
});

describe("style override", () => {
  it("rootContainerProps.style.width overrides default", async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = renderContainer({
        rootContainerProps: { style: { width: "500px" } },
      }));
    });
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("500px");
  });

  it("rootContainerProps.style.position overrides computed position", async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = renderContainer(
        { rootContainerProps: { style: { position: "relative" } } },
        "bottom"
      ));
    });
    const el = container.firstChild as HTMLElement;
    expect(el.style.position).toBe("relative");
  });

  it("arbitrary CSS properties added", async () => {
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = renderContainer({
        rootContainerProps: { style: { zIndex: 100 } },
      }));
    });
    const el = container.firstChild as HTMLElement;
    expect(el.style.zIndex).toBe("100");
  });
});

describe("HTMLAttributes forwarding", () => {
  it("id forwarded", () => {
    const { container } = renderContainer({
      rootContainerProps: { id: "player-root" },
    });
    const el = container.firstChild as HTMLElement;
    expect(el.id).toBe("player-root");
  });

  it("data-* attribute forwarded", () => {
    const { container } = renderContainer({
      rootContainerProps: { "data-testid": "provider" } as never,
    });
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("data-testid")).toBe("provider");
  });

  it("aria-* attribute forwarded", () => {
    const { container } = renderContainer({
      rootContainerProps: { "aria-label": "audio player" } as never,
    });
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-label")).toBe("audio player");
  });

  it("onClick forwarded", () => {
    const handleClick = vi.fn();
    const { container } = renderContainer({
      rootContainerProps: { onClick: handleClick },
    });
    (container.firstChild as HTMLElement).click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});

describe("children", () => {
  it("children rendered inside the provider", () => {
    const { getByTestId } = renderContainer();
    expect(getByTestId("child")).toBeInTheDocument();
  });
});
