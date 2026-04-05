import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GridItem } from "@/components/Grid/Item";

describe("GridItem — visibility", () => {
  it("visible=true (default) → renders div", () => {
    const { container } = render(<GridItem />);
    expect(container.firstChild).not.toBeNull();
  });

  it("visible=false → returns null", () => {
    const { container } = render(<GridItem visible={false} />);
    expect(container.firstChild).toBeNull();
  });
});

describe("GridItem — default styles", () => {
  it("justifySelf defaults to 'center'", () => {
    const { container } = render(<GridItem />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.justifySelf).toBe("center");
  });

  it("padding defaults to '0 5px'", () => {
    const { container } = render(<GridItem />);
    const el = container.firstChild as HTMLElement;
    // jsdom normalizes shorthand: "0 5px" → individual sides
    expect(el.style.paddingTop).toBe("0px");
    expect(el.style.paddingRight).toBe("5px");
    expect(el.style.paddingBottom).toBe("0px");
    expect(el.style.paddingLeft).toBe("5px");
  });
});

describe("GridItem — style prop mapping", () => {
  it("gridArea prop sets style.gridArea", () => {
    const { container } = render(<GridItem gridArea="row1-3" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridArea).toBe("row1-3");
  });

  it("width prop sets style.width", () => {
    const { container } = render(<GridItem width="100%" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("100%");
  });

  it("justifySelf prop overrides default", () => {
    const { container } = render(<GridItem justifySelf="start" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.justifySelf).toBe("start");
  });

  it("padding prop overrides default", () => {
    const { container } = render(<GridItem padding="10px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.paddingTop).toBe("10px");
    expect(el.style.paddingRight).toBe("10px");
    expect(el.style.paddingBottom).toBe("10px");
    expect(el.style.paddingLeft).toBe("10px");
  });
});

describe("GridItem — style prop override (spread order)", () => {
  it("style prop overrides default justifySelf", () => {
    const { container } = render(
      <GridItem style={{ justifySelf: "flex-end" }} />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.justifySelf).toBe("flex-end");
  });

  it("style prop overrides default padding", () => {
    const { container } = render(<GridItem style={{ padding: "20px" }} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.paddingTop).toBe("20px");
  });

  it("style prop beats explicit padding prop (spread last)", () => {
    // padding="10px" is set first, style.padding="30px" spreads last → wins
    const { container } = render(
      <GridItem padding="10px" style={{ padding: "30px" }} />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.paddingTop).toBe("30px");
  });

  it("style prop adds extra properties", () => {
    const { container } = render(
      <GridItem style={{ backgroundColor: "red" }} />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.backgroundColor).toBe("red");
  });
});

describe("GridItem — HTMLAttributes forwarding", () => {
  it("aria-label forwarded", () => {
    const { container } = render(<GridItem aria-label="play button area" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-label")).toBe("play button area");
  });

  it("data-testid forwarded", () => {
    const { getByTestId } = render(<GridItem data-testid="grid-item" />);
    expect(getByTestId("grid-item")).toBeInTheDocument();
  });

  it("id forwarded", () => {
    const { container } = render(<GridItem id="my-item" />);
    const el = container.firstChild as HTMLElement;
    expect(el.id).toBe("my-item");
  });

  it("onClick forwarded", () => {
    const handleClick = vi.fn();
    const { container } = render(<GridItem onClick={handleClick} />);
    fireEvent.click(container.firstChild as HTMLElement);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("children rendered", () => {
    const { getByTestId } = render(
      <GridItem>
        <span data-testid="child-node" />
      </GridItem>
    );
    expect(getByTestId("child-node")).toBeInTheDocument();
  });
});
