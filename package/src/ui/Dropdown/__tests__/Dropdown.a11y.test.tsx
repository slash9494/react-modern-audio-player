import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { DropdownTrigger } from "../DropdownTrigger";
import { dropdownContext, type DropdownContext } from "../DropdownContext";

const createDropdownContextValue = (
  overrides: Partial<DropdownContext> = {}
): DropdownContext => ({
  dropdownRef: { current: document.createElement("div") },
  isOpen: false,
  placement: "bottom",
  setIsOpen: vi.fn(),
  onOpenChange: undefined,
  dropdownId: "test-dropdown",
  ...overrides,
});

const TriggerWrapper = ({
  contextOverrides = {},
  children = "Toggle",
  ...triggerProps
}: {
  contextOverrides?: Partial<DropdownContext>;
  children?: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children"
>) => (
  <dropdownContext.Provider
    value={createDropdownContextValue(contextOverrides)}
  >
    <DropdownTrigger {...triggerProps}>{children}</DropdownTrigger>
  </dropdownContext.Provider>
);

describe("DropdownTrigger accessibility", () => {
  it("renders as a native button element", () => {
    render(<TriggerWrapper />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.tagName).toBe("BUTTON");
  });

  it('has type="button"', () => {
    render(<TriggerWrapper />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("type", "button");
  });

  it("aria-expanded reflects isOpen=false", () => {
    render(<TriggerWrapper contextOverrides={{ isOpen: false }} />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("aria-expanded reflects isOpen=true", () => {
    render(<TriggerWrapper contextOverrides={{ isOpen: true }} />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("aria-controls matches dropdownId", () => {
    render(
      <TriggerWrapper contextOverrides={{ dropdownId: "my-dropdown-id" }} />
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("aria-controls", "my-dropdown-id");
  });

  it("accepts a forwarded ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <dropdownContext.Provider value={createDropdownContextValue()}>
        <DropdownTrigger ref={ref}>Toggle</DropdownTrigger>
      </dropdownContext.Provider>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Toggle" }));
  });

  it("merges additional className with base class", () => {
    render(<TriggerWrapper className="custom-class" />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.className).toContain("rmap-dropdown-trigger");
    expect(trigger.className).toContain("custom-class");
  });

  it("applies base class when no additional className is provided", () => {
    render(<TriggerWrapper />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.className).toContain("rmap-dropdown-trigger");
  });

  it("has no axe violations", async () => {
    const { container } = render(<TriggerWrapper />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations when expanded", async () => {
    const { container } = render(
      <TriggerWrapper contextOverrides={{ isOpen: true }} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
