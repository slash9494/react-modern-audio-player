import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { DrawerContent } from "../DrawerContent";
import { drawerContext } from "../DrawerContext";

const DrawerWrapper = ({
  initialOpen = true,
  onOpenChange,
}: {
  initialOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <drawerContext.Provider value={{ isOpen, setIsOpen, onOpenChange }}>
      <DrawerContent isWithAnimation={false}>
        <button>Item 1</button>
        <button>Item 2</button>
      </DrawerContent>
    </drawerContext.Provider>
  );
};

describe("DrawerContent accessibility", () => {
  it('has role="dialog" when open', () => {
    render(<DrawerWrapper initialOpen={true} />);
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it('has aria-modal="true"', () => {
    render(<DrawerWrapper initialOpen={true} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it('has aria-label="Playlist"', () => {
    render(<DrawerWrapper initialOpen={true} />);
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Playlist"
    );
  });

  it('has id="playlist-drawer"', () => {
    render(<DrawerWrapper initialOpen={true} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("id", "playlist-drawer");
  });

  it("Escape key closes the drawer", () => {
    const onOpenChange = vi.fn();
    render(<DrawerWrapper initialOpen={true} onOpenChange={onOpenChange} />);
    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Tab wraps from last to first focusable element", async () => {
    render(<DrawerWrapper initialOpen={true} />);
    const buttons = screen.getAllByRole("button");
    const last = buttons[buttons.length - 1];
    last.focus();
    await userEvent.tab();
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("Shift+Tab wraps from first to last focusable element", async () => {
    render(<DrawerWrapper initialOpen={true} />);
    const buttons = screen.getAllByRole("button");
    buttons[0].focus();
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(buttons[buttons.length - 1]);
  });

  it("has no axe violations", async () => {
    const { container } = render(<DrawerWrapper initialOpen={true} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
