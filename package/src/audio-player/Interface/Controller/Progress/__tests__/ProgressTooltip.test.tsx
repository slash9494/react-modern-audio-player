import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { ProgressTooltip } from "../ProgressTooltip";

const queryTooltip = (container: HTMLElement) =>
  container.querySelector(".rmap-progress-tooltip");

describe("ProgressTooltip", () => {
  it("renders nothing when ratio is null", () => {
    const { container } = render(
      <ProgressTooltip ratio={null} duration={100} placement="top" />
    );
    expect(queryTooltip(container)).toBeNull();
  });

  it("renders nothing when duration is zero", () => {
    const { container } = render(
      <ProgressTooltip ratio={0.5} duration={0} placement="top" />
    );
    expect(queryTooltip(container)).toBeNull();
  });

  it("renders nothing when duration is Infinity", () => {
    const { container } = render(
      <ProgressTooltip ratio={0.5} duration={Infinity} placement="top" />
    );
    expect(queryTooltip(container)).toBeNull();
  });

  it("renders nothing when ratio is NaN", () => {
    const { container } = render(
      <ProgressTooltip ratio={NaN} duration={100} placement="top" />
    );
    expect(queryTooltip(container)).toBeNull();
  });

  it("renders nothing when ratio is Infinity", () => {
    const { container } = render(
      <ProgressTooltip ratio={Infinity} duration={100} placement="top" />
    );
    expect(queryTooltip(container)).toBeNull();
  });

  it("renders nothing when ratio is negative", () => {
    const { container } = render(
      <ProgressTooltip ratio={-0.1} duration={100} />
    );
    expect(queryTooltip(container)).toBeNull();
  });

  it("renders nothing when ratio is greater than 1", () => {
    const { container } = render(
      <ProgressTooltip ratio={1.1} duration={100} />
    );
    expect(queryTooltip(container)).toBeNull();
  });

  it("shows the clock time at the hovered ratio", () => {
    const { container } = render(
      <ProgressTooltip ratio={0.5} duration={100} />
    );
    expect(queryTooltip(container)).toHaveTextContent("00:50");
  });

  it("positions the tooltip at the hovered ratio", () => {
    const { container } = render(
      <ProgressTooltip ratio={0.5} duration={100} />
    );
    expect(queryTooltip(container)).toHaveStyle({ left: "50%" });
  });

  describe("horizontal clamping", () => {
    const TOOLTIP_WIDTH = 40;
    const CONTAINER_WIDTH = 200;
    let originalOffsetWidth: PropertyDescriptor | undefined;

    beforeEach(() => {
      originalOffsetWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        "offsetWidth"
      );
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        get: () => TOOLTIP_WIDTH,
      });
    });

    afterEach(() => {
      if (originalOffsetWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "offsetWidth",
          originalOffsetWidth
        );
      } else {
        delete (HTMLElement.prototype as { offsetWidth?: number }).offsetWidth;
      }
    });

    it("clamps the center to tooltipWidth/2 at the start (ratio 0)", () => {
      const { container } = render(
        <ProgressTooltip
          ratio={0}
          duration={100}
          placement="top"
          containerWidth={CONTAINER_WIDTH}
        />
      );
      expect(queryTooltip(container)).toHaveStyle({
        left: `${TOOLTIP_WIDTH / 2}px`,
      });
    });

    it("clamps the center to containerWidth - tooltipWidth/2 at the end (ratio 1)", () => {
      const { container } = render(
        <ProgressTooltip
          ratio={1}
          duration={100}
          placement="top"
          containerWidth={CONTAINER_WIDTH}
        />
      );
      expect(queryTooltip(container)).toHaveStyle({
        left: `${CONTAINER_WIDTH - TOOLTIP_WIDTH / 2}px`,
      });
    });

    it("keeps the center on the cursor in the middle (ratio 0.5)", () => {
      const { container } = render(
        <ProgressTooltip
          ratio={0.5}
          duration={100}
          placement="top"
          containerWidth={CONTAINER_WIDTH}
        />
      );
      expect(queryTooltip(container)).toHaveStyle({
        left: `${0.5 * CONTAINER_WIDTH}px`,
      });
    });

    it("falls back to the percentage position when containerWidth is 0", () => {
      const { container } = render(
        <ProgressTooltip
          ratio={0.5}
          duration={100}
          placement="top"
          containerWidth={0}
        />
      );
      expect(queryTooltip(container)).toHaveStyle({ left: "50%" });
    });
  });
});
