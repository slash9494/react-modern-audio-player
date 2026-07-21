import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
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
});
