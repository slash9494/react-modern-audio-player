import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
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
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "id",
      "playlist-drawer"
    );
  });

  it("Escape key closes the drawer", async () => {
    const onOpenChange = vi.fn();
    render(<DrawerWrapper initialOpen={true} onOpenChange={onOpenChange} />);
    const dialog = screen.getByRole("dialog");
    await userEvent.type(dialog, "{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
