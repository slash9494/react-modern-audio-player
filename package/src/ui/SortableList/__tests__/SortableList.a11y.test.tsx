import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
          key={item.name}
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
    it("ArrowDown moves focus to the next item", async () => {
      const user = userEvent.setup();
      const { items } = renderList();
      items[0].focus();
      expect(document.activeElement).toBe(items[0]);

      await user.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(items[1]);
    });

    it("ArrowUp moves focus to the previous item", async () => {
      const user = userEvent.setup();
      const { items } = renderList();
      items[1].focus();
      expect(document.activeElement).toBe(items[1]);

      await user.keyboard("{ArrowUp}");
      expect(document.activeElement).toBe(items[0]);
    });

    it("ArrowDown on the last item does not move focus", async () => {
      const user = userEvent.setup();
      const { items } = renderList();
      items[2].focus();

      await user.keyboard("{ArrowDown}");
      expect(document.activeElement).toBe(items[2]);
    });

    it("ArrowUp on the first item does not move focus", async () => {
      const user = userEvent.setup();
      const { items } = renderList();
      items[0].focus();

      await user.keyboard("{ArrowUp}");
      expect(document.activeElement).toBe(items[0]);
    });
  });

  describe("keyboard reorder", () => {
    it("Alt+ArrowDown reorders item down", async () => {
      const user = userEvent.setup();
      const { onReorder, items } = renderList();
      items[0].focus();

      await user.keyboard("{Alt>}{ArrowDown}{/Alt}");

      expect(onReorder).toHaveBeenCalledTimes(1);
      const reordered = onReorder.mock.calls[0][0] as TestItem[];
      expect(reordered.map((d) => d.name)).toEqual([
        "Item B",
        "Item A",
        "Item C",
      ]);
    });

    it("Alt+ArrowUp reorders item up", async () => {
      const user = userEvent.setup();
      const { onReorder, items } = renderList();
      items[1].focus();

      await user.keyboard("{Alt>}{ArrowUp}{/Alt}");

      expect(onReorder).toHaveBeenCalledTimes(1);
      const reordered = onReorder.mock.calls[0][0] as TestItem[];
      expect(reordered.map((d) => d.name)).toEqual([
        "Item B",
        "Item A",
        "Item C",
      ]);
    });

    it("Alt+ArrowDown on the last item does not reorder", async () => {
      const user = userEvent.setup();
      const { onReorder, items } = renderList();
      items[2].focus();

      await user.keyboard("{Alt>}{ArrowDown}{/Alt}");
      expect(onReorder).not.toHaveBeenCalled();
    });

    it("Alt+ArrowUp on the first item does not reorder", async () => {
      const user = userEvent.setup();
      const { onReorder, items } = renderList();
      items[0].focus();

      await user.keyboard("{Alt>}{ArrowUp}{/Alt}");
      expect(onReorder).not.toHaveBeenCalled();
    });
  });

  describe("keyboard activation", () => {
    it("Enter triggers click", async () => {
      const user = userEvent.setup();
      const { onClick, items } = renderList();
      items[0].focus();

      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Space triggers click", async () => {
      const user = userEvent.setup();
      const { onClick, items } = renderList();
      items[0].focus();

      await user.keyboard(" ");
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
