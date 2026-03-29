import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Grid from "@/components/Grid";

describe("Grid — style prop mapping", () => {
  it("renders div with display: grid", () => {
    const { container } = render(<Grid />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.display).toBe("grid");
  });

  it("columns array → gridTemplateColumns joined by space", () => {
    const { container } = render(
      <Grid columns={["1fr", "2fr", "fit-content(100px)"]} />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("1fr 2fr fit-content(100px)");
  });

  it("single-element columns array", () => {
    const { container } = render(<Grid columns={["100px"]} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("100px");
  });

  it("areas array → gridTemplateAreas each row quoted", () => {
    const { container } = render(<Grid areas={["a b", "c d"]} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateAreas).toBe('"a b" "c d"');
  });

  it("alignItems prop applied", () => {
    const { container } = render(<Grid alignItems="center" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.alignItems).toBe("center");
  });

  it("justifyContent prop applied", () => {
    const { container } = render(<Grid justifyContent="space-between" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.justifyContent).toBe("space-between");
  });

  it("minHeight prop applied", () => {
    const { container } = render(<Grid minHeight="50px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.minHeight).toBe("50px");
  });
});

describe("Grid — edge cases", () => {
  it("no columns prop → gridTemplateColumns not set", () => {
    const { container } = render(<Grid />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("");
  });

  it("empty columns array → gridTemplateColumns not set", () => {
    const { container } = render(<Grid columns={[]} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateColumns).toBe("");
  });

  it("empty areas array → gridTemplateAreas not set", () => {
    const { container } = render(<Grid areas={[]} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gridTemplateAreas).toBe("");
  });
});

describe("Grid — className & children", () => {
  it("UNSAFE_className applied", () => {
    const { container } = render(<Grid UNSAFE_className="my-grid" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toBe("my-grid");
  });

  it("children rendered", () => {
    const { getByTestId } = render(
      <Grid>
        <div data-testid="child" />
      </Grid>
    );
    expect(getByTestId("child")).toBeInTheDocument();
  });
});
