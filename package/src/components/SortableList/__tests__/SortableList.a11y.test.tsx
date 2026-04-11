import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import SortableList from "../SortableList";
import { SortableListItem } from "../SortableListItem";

type TestItem = { index: number; name: string };

const testData: TestItem[] = [
  { index: 0, name: "Item A" },
  { index: 1, name: "Item B" },
  { index: 2, name: "Item C" },
];

const renderList = (overrides: Record<string, unknown> = {}) => {
  const onReorder = vi.fn();
  const onClick = vi.fn();
  const result = render(
    <SortableList>
      {testData.map((item, i) => (
        <SortableListItem
          key={i}
          index={i}
          listData={testData}
          dragStartIdx={0}
          onReorder={onReorder}
          onClick={onClick}
          {...overrides}
        >
          {item.name}
        </SortableListItem>
      ))}
    </SortableList>
  );
  return { ...result, onReorder, onClick };
};

describe("SortableList accessibility", () => {
  describe("ARIA attributes", () => {
    it('container has role="listbox" and aria-label', () => {
      renderList();
      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveAttribute("aria-label", "Sortable list");
    });

    it('items have role="option" and tabIndex=0', () => {
      renderList();
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      for (const option of options) {
        expect(option).toHaveAttribute("tabindex", "0");
      }
    });
  });

  describe("keyboard focus navigation", () => {
    it("ArrowDown moves focus to the next item", () => {
      renderList();
      const options = screen.getAllByRole("option");
      options[0].focus();
      expect(document.activeElement).toBe(options[0]);

      fireEvent.keyDown(options[0], { key: "ArrowDown" });
      expect(document.activeElement).toBe(options[1]);
    });

    it("ArrowUp moves focus to the previous item", () => {
      renderList();
      const options = screen.getAllByRole("option");
      options[1].focus();
      expect(document.activeElement).toBe(options[1]);

      fireEvent.keyDown(options[1], { key: "ArrowUp" });
      expect(document.activeElement).toBe(options[0]);
    });

    it("ArrowDown on the last item does not move focus", () => {
      renderList();
      const options = screen.getAllByRole("option");
      options[2].focus();

      fireEvent.keyDown(options[2], { key: "ArrowDown" });
      expect(document.activeElement).toBe(options[2]);
    });

    it("ArrowUp on the first item does not move focus", () => {
      renderList();
      const options = screen.getAllByRole("option");
      options[0].focus();

      fireEvent.keyDown(options[0], { key: "ArrowUp" });
      expect(document.activeElement).toBe(options[0]);
    });
  });

  describe("keyboard reorder", () => {
    it("Alt+ArrowDown reorders item down", () => {
      const { onReorder } = renderList();
      const options = screen.getAllByRole("option");
      options[0].focus();

      fireEvent.keyDown(options[0], { key: "ArrowDown", altKey: true });

      expect(onReorder).toHaveBeenCalledTimes(1);
      const reordered = onReorder.mock.calls[0][0] as TestItem[];
      expect(reordered.map((d) => d.name)).toEqual([
        "Item B",
        "Item A",
        "Item C",
      ]);
    });

    it("Alt+ArrowUp reorders item up", () => {
      const { onReorder } = renderList();
      const options = screen.getAllByRole("option");
      options[1].focus();

      fireEvent.keyDown(options[1], { key: "ArrowUp", altKey: true });

      expect(onReorder).toHaveBeenCalledTimes(1);
      const reordered = onReorder.mock.calls[0][0] as TestItem[];
      expect(reordered.map((d) => d.name)).toEqual([
        "Item B",
        "Item A",
        "Item C",
      ]);
    });

    it("Alt+ArrowDown on the last item does not reorder", () => {
      const { onReorder } = renderList();
      const options = screen.getAllByRole("option");
      options[2].focus();

      fireEvent.keyDown(options[2], { key: "ArrowDown", altKey: true });
      expect(onReorder).not.toHaveBeenCalled();
    });

    it("Alt+ArrowUp on the first item does not reorder", () => {
      const { onReorder } = renderList();
      const options = screen.getAllByRole("option");
      options[0].focus();

      fireEvent.keyDown(options[0], { key: "ArrowUp", altKey: true });
      expect(onReorder).not.toHaveBeenCalled();
    });
  });

  describe("keyboard activation", () => {
    it("Enter triggers click", () => {
      const { onClick } = renderList();
      const options = screen.getAllByRole("option");
      options[0].focus();

      fireEvent.keyDown(options[0], { key: "Enter" });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Space triggers click", () => {
      const { onClick } = renderList();
      const options = screen.getAllByRole("option");
      options[0].focus();

      fireEvent.keyDown(options[0], { key: " " });
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("automated a11y check", () => {
    it("has no axe violations", async () => {
      const { container } = renderList();
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
