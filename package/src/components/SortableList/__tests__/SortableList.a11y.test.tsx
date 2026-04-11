import { render, fireEvent } from "@testing-library/react";
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

const renderList = () => {
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
        >
          {item.name}
        </SortableListItem>
      ))}
    </SortableList>
  );
  const items = Array.from(
    result.container.querySelectorAll<HTMLLIElement>("li.rmap-sortable-item")
  );
  return { ...result, onReorder, onClick, items };
};

describe("SortableList accessibility", () => {
  describe("ARIA attributes", () => {
    it("container ul has aria-label", () => {
      const { container } = renderList();
      const ul = container.querySelector("ul.rmap-sortable-list-container");
      expect(ul).toHaveAttribute("aria-label", "Sortable list");
    });

    it("items are focusable with tabIndex=0", () => {
      const { items } = renderList();
      expect(items).toHaveLength(3);
      for (const item of items) {
        expect(item).toHaveAttribute("tabindex", "0");
      }
    });
  });

  describe("keyboard focus navigation", () => {
    it("ArrowDown moves focus to the next item", () => {
      const { items } = renderList();
      items[0].focus();
      expect(document.activeElement).toBe(items[0]);

      fireEvent.keyDown(items[0], { key: "ArrowDown" });
      expect(document.activeElement).toBe(items[1]);
    });

    it("ArrowUp moves focus to the previous item", () => {
      const { items } = renderList();
      items[1].focus();
      expect(document.activeElement).toBe(items[1]);

      fireEvent.keyDown(items[1], { key: "ArrowUp" });
      expect(document.activeElement).toBe(items[0]);
    });

    it("ArrowDown on the last item does not move focus", () => {
      const { items } = renderList();
      items[2].focus();

      fireEvent.keyDown(items[2], { key: "ArrowDown" });
      expect(document.activeElement).toBe(items[2]);
    });

    it("ArrowUp on the first item does not move focus", () => {
      const { items } = renderList();
      items[0].focus();

      fireEvent.keyDown(items[0], { key: "ArrowUp" });
      expect(document.activeElement).toBe(items[0]);
    });
  });

  describe("keyboard reorder", () => {
    it("Alt+ArrowDown reorders item down", () => {
      const { onReorder, items } = renderList();
      items[0].focus();

      fireEvent.keyDown(items[0], { key: "ArrowDown", altKey: true });

      expect(onReorder).toHaveBeenCalledTimes(1);
      const reordered = onReorder.mock.calls[0][0] as TestItem[];
      expect(reordered.map((d) => d.name)).toEqual([
        "Item B",
        "Item A",
        "Item C",
      ]);
    });

    it("Alt+ArrowUp reorders item up", () => {
      const { onReorder, items } = renderList();
      items[1].focus();

      fireEvent.keyDown(items[1], { key: "ArrowUp", altKey: true });

      expect(onReorder).toHaveBeenCalledTimes(1);
      const reordered = onReorder.mock.calls[0][0] as TestItem[];
      expect(reordered.map((d) => d.name)).toEqual([
        "Item B",
        "Item A",
        "Item C",
      ]);
    });

    it("Alt+ArrowDown on the last item does not reorder", () => {
      const { onReorder, items } = renderList();
      items[2].focus();

      fireEvent.keyDown(items[2], { key: "ArrowDown", altKey: true });
      expect(onReorder).not.toHaveBeenCalled();
    });

    it("Alt+ArrowUp on the first item does not reorder", () => {
      const { onReorder, items } = renderList();
      items[0].focus();

      fireEvent.keyDown(items[0], { key: "ArrowUp", altKey: true });
      expect(onReorder).not.toHaveBeenCalled();
    });
  });

  describe("keyboard activation", () => {
    it("Enter triggers click", () => {
      const { onClick, items } = renderList();
      items[0].focus();

      fireEvent.keyDown(items[0], { key: "Enter" });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Space triggers click", () => {
      const { onClick, items } = renderList();
      items[0].focus();

      fireEvent.keyDown(items[0], { key: " " });
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
